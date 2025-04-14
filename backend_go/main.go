package main

import (
	"druc/backend/auth"
	"druc/backend/db"
	"druc/backend/routes"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/markbates/goth/gothic"
)

func main() {
	db.InitializeMongoDB()
	defer db.DisconnectMongoDB()

	auth.NewAuth()

	r := mux.NewRouter()

	// Your API routes
	r.HandleFunc("/GetComp", routes.GetComp)

	// Auth routes for OAuth
	r.HandleFunc("/auth/{provider}", func(w http.ResponseWriter, r *http.Request) {
		gothic.BeginAuthHandler(w, r)
	})
	r.HandleFunc("/auth/{provider}/callback", func(w http.ResponseWriter, r *http.Request) {
		user, err := gothic.CompleteUserAuth(w, r)
		if err != nil {
			http.Redirect(w, r, "/auth/"+mux.Vars(r)["provider"], http.StatusTemporaryRedirect)
			return
		}
		log.Printf("User logged in: %#v\n", user)
		http.Redirect(w, r, "http://localhost:3000/dashboard", http.StatusTemporaryRedirect)
	})
	r.HandleFunc("/auth/logout", func(w http.ResponseWriter, r *http.Request) {
		gothic.Logout(w, r)
		http.Redirect(w, r, "http://localhost:3000", http.StatusTemporaryRedirect)
	})

	// 🆕 Account management routes (JWT auth)
	r.HandleFunc("/auth/signup", func(w http.ResponseWriter, r *http.Request) {
		name := r.FormValue("name")
		email := r.FormValue("email")
		password := r.FormValue("password")

		token, refreshToken, err := auth.NewAccount(name, email, password)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"token":"` + token + `", "refreshToken":"` + refreshToken + `"}`))
	}).Methods("POST")
	r.HandleFunc("/auth/login", func(w http.ResponseWriter, r *http.Request) {
		email := r.FormValue("email")
		inputPassword := r.FormValue("password")

		token, err := auth.GetAccount(email, inputPassword)
		if err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"token":"` + token + `"}`))
	}).Methods("POST")

	log.Println("Listening on :8000")
	log.Fatal(http.ListenAndServe(":8000", r))
}
