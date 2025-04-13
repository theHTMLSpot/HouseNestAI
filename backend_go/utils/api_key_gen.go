package utils

import (
	"crypto/rand"
	"encoding/base64"
)

// GenerateAPIKey generates a random API key of a given length
func GenerateAPIKey(length int) (string, error) {
	// Create a slice to hold random bytes
	key := make([]byte, length)
	_, err := rand.Read(key)
	if err != nil {
		return "", err
	}

	// Return a base64 encoded string of the random bytes
	return base64.URLEncoding.EncodeToString(key), nil
}
