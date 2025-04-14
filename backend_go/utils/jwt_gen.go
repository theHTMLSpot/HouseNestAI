package utils

import (
	"log"
	"time"

	"os"

	"github.com/golang-jwt/jwt/v5"
	"github.com/joho/godotenv"
)

// 🔐 Make sure to store this securely

// Generates a JWT with user info
func GenerateJWT(email string) (string, error) {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error Loading .env")
	}

	var jwtSecret = os.Getenv("JWT_SECRET")
	claims := jwt.MapClaims{
		"email": email,
		"exp":   time.Now().Add(time.Hour * 72).Unix(), // expires in 3 days
		"iat":   time.Now().Unix(),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}
