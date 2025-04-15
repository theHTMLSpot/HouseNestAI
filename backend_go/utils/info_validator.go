package utils

import (
	"errors"
	"net/mail"
	"regexp"
	"strings"
)

// Check if name contains only valid characters (letters, numbers, underscores, hyphens)
var validName = regexp.MustCompile(`^[a-zA-Z0-9_\-]{2,32}$`)

func ValidateLoginInput(name, email, password string) error {
	name = strings.TrimSpace(name)
	email = strings.TrimSpace(email)
	password = strings.TrimSpace(password)

	if email == "" || password == "" {
		return errors.New("all fields are required")
	}

	if !validName.MatchString(name) && name != "" {
		return errors.New("name must be 2-32 characters, letters, numbers, _, - only")
	}

	// Use Go's built-in email validator
	if _, err := mail.ParseAddress(email); err != nil {
		return errors.New("invalid email format")
	}

	if len(password) < 6 {
		return errors.New("password must be at least 6 characters long")
	}

	return nil
}
