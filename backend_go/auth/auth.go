package auth

import (
	"context"
	"errors"
	"log"
	"os"
	"time"

	"druc/backend/db"
	"druc/backend/utils"

	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
	"github.com/markbates/goth"
	"github.com/markbates/goth/gothic"
	"github.com/markbates/goth/providers/google"
	"go.mongodb.org/mongo-driver/bson"
)

const (
	MaxAge = 86400 * 30
	IsProd = false
)

type User struct {
	Name           string `bson:"name"`
	Email          string `bson:"email"`
	HashedPassword string `bson:"hashed_password"`
	JWT            string `bson:"jwt"`
}

// 🔐 GetAccount fetches the user and validates their password
func GetAccount(email, inputPassword string) (string, error) {
	err := utils.ValidateLoginInput("", email, inputPassword)
	if err != nil {
		log.Println("Invalid login input:", err)
		return "", err
	}

	collection := db.MongoClient.Database(os.Getenv("MONGO_DB")).Collection("users")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var user User
	err = collection.FindOne(ctx, bson.M{"email": email}).Decode(&user)
	if err != nil {
		log.Println("User not found:", err)
		return "", errors.New("account not found")
	}

	match := utils.CheckPasswordHash(inputPassword, user.HashedPassword)
	if !match {
		log.Println("Password mismatch")
		return "", errors.New("invalid credentials")
	}

	// If user already has JWT, reuse it
	if user.JWT != "" {
		return user.JWT, nil
	}

	// Generate new JWT if missing
	JWT, err := utils.GenerateJWT(email)
	if err != nil {
		log.Println("JWT generation error:", err)
		return "", err
	}

	// Save it back to DB
	_, err = collection.UpdateOne(ctx, bson.M{"email": email}, bson.M{"$set": bson.M{"jwt": JWT}})
	if err != nil {
		log.Println("Failed to store new JWT:", err)
		return "", err
	}

	return JWT, nil
}

// 🆕 NewAccount registers a user if they don't exist
func NewAccount(name, email, password string) (string, string, error) {
	err := utils.ValidateLoginInput(name, email, password)
	if err != nil {
		log.Println("Invalid account input:", err)
		return "", "", err
	}

	collection := db.MongoClient.Database(os.Getenv("MONGO_DB")).Collection("users")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Check if user exists
	count, err := collection.CountDocuments(ctx, bson.M{"email": email})
	if err != nil {
		log.Println("Error checking existing user:", err)
		return "", "", err
	}
	if count > 0 {
		return "", "", errors.New("user already exists")
	}

	// Hash password and create JWT
	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		log.Println("Error hashing password:", err)
		return "", "", err
	}
	JWT, err := utils.GenerateJWT(email)
	if err != nil {
		log.Println("JWT generation error:", err)
		return "", "", err
	}

	// Insert user into DB
	user := User{
		Name:           name,
		Email:          email,
		HashedPassword: hashedPassword,
		JWT:            JWT,
	}
	_, err = collection.InsertOne(ctx, user)
	if err != nil {
		log.Println("Error inserting user:", err)
		return "", "", err
	}

	return JWT, hashedPassword, nil
}

// ⚙️ NewAuth configures Google OAuth & session store
func NewAuth() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error loading .env")
	}
	googleClientId := os.Getenv("GOOGLE_CLIENT_ID")
	googleClientSecret := os.Getenv("GOOGLE_CLIENT_SECRET")
	key := os.Getenv("AUTH_KEY")

	store := sessions.NewCookieStore([]byte(key))
	store.Options.Path = "/"
	store.Options.HttpOnly = true
	store.Options.Secure = IsProd

	gothic.Store = store

	goth.UseProviders(
		google.New(googleClientId, googleClientSecret, "http://localhost:8000/auth/google"),
	)
}
