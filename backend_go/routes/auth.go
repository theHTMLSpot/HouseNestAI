package routes

import (
	"druc/backend/utils"
	"fmt"
	"log"
	"net/http"

	"github.com/markbates/goth/gothic"
)

func GetAuthCallbackFunction(w http.ResponseWriter, r *http.Request) {

	user, err := gothic.CompleteUserAuth(w, r)
	if err != nil {
		fmt.Fprintln(w, r)
		return
	}
	fmt.Println(user)

	http.Redirect(w, r, "http://localhost:3000/dashboard", http.StatusFound)

}

func Logout(w http.ResponseWriter, r *http.Request) {
	gothic.Logout(w, r)
	w.Header().Set("Location", "/")
	w.WriteHeader(http.StatusTemporaryRedirect)
}

func AuthProvider(w http.ResponseWriter, r *http.Request) {
	if gothUser, err := gothic.CompleteUserAuth(w, r); err == nil {
		jwt, err := utils.GenerateJWT(gothUser.Email)
		if err != nil {
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
			log.Println("Failed to generate JWT:", err)
			return
		}

		log.Println("Authenticated:", gothUser.Email, gothUser.Provider)

		// Redirect with JWT token in query
		redirectURL := fmt.Sprintf("http://localhost:3000/dashboard?token=%s", jwt)
		http.Redirect(w, r, redirectURL, http.StatusFound)

	} else {
		gothic.BeginAuthHandler(w, r)
	}
}
