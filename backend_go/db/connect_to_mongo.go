package db

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

var MongoClient *mongo.Client

// InitializeMongoDB initializes the MongoDB client and connects to the database
func InitializeMongoDB() {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error Loading .env", err)
	}

	// Use the SetServerAPIOptions() method to set the version of the Stable API on the client
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	mongo_url := os.Getenv("MONGO_URL")
	opts := options.Client().ApplyURI(mongo_url).SetServerAPIOptions(serverAPI)

	// Create a new client and connect to the server
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	}

	// Assign the client to the global variable
	MongoClient = client

	// Send a ping to confirm a successful connection
	if err := MongoClient.Ping(context.TODO(), readpref.Primary()); err != nil {
		log.Fatal("Failed to ping MongoDB:", err)
	}
	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")
}

// DisconnectMongoDB disconnects from the MongoDB client
func DisconnectMongoDB() {
	if err := MongoClient.Disconnect(context.TODO()); err != nil {
		log.Fatal("Failed to disconnect from MongoDB:", err)
	}
	fmt.Println("Disconnected from MongoDB.")
}
