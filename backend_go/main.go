package main

import (
	"druc/backend/auth"
	"druc/backend/db"
	"druc/backend/routes"
	"encoding/json"
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
	r.HandleFunc("/auth/{provider}", func(w http.ResponseWriter, req *http.Request) {
		gothic.BeginAuthHandler(w, req)
	})
	r.HandleFunc("/auth/{provider}/callback", func(w http.ResponseWriter, req *http.Request) {
		user, err := gothic.CompleteUserAuth(w, req)
		if err != nil {
			http.Redirect(w, req, "/auth/"+mux.Vars(req)["provider"], http.StatusTemporaryRedirect)
			return
		}
		log.Printf("User logged in: %#v\n", user)
		http.Redirect(w, req, "http://localhost:3000/dashboard", http.StatusTemporaryRedirect)
	})
	r.HandleFunc("/auth/logout/", func(w http.ResponseWriter, req *http.Request) {
		gothic.Logout(w, req)
		http.Redirect(w, req, "http://localhost:3000", http.StatusTemporaryRedirect)
	})

	// 🆕 Account management routes (JWT auth)
	r.HandleFunc("/auth/signup/", func(w http.ResponseWriter, req *http.Request) {

		name := req.FormValue("name")
		email := req.FormValue("email")
		password := req.FormValue("password")

		token, refreshToken, err := auth.NewAccount(name, email, password)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"token":"` + token + `", "refreshToken":"` + refreshToken + `"}`))
	}).Methods("POST")
	r.HandleFunc("/auth/login/", func(w http.ResponseWriter, req *http.Request) {
		email := req.FormValue("email")
		inputPassword := req.FormValue("password")

		token, err := auth.GetAccount(email, inputPassword)
		if err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"token":"` + token + `"}`))
	}).Methods("POST")

	r.HandleFunc("auth/GetInfo/{jwt}", func(w http.ResponseWriter, req *http.Request) {
		jwt := mux.Vars(req)["jwt"]
		if jwt == "" {
			http.Error(w, "No JWT Token", http.StatusBadRequest)
			return
		}

		user, err := auth.GetAccountFromJWT(jwt)

		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}

		jsonResp, err := json.Marshal(user)
		if err != nil {
			http.Error(w, "Failed to encode user data", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(jsonResp)

	}).Methods("POST")

	r.HandleFunc("auth/logout/{jwt}", func(w http.ResponseWriter, req *http.Request) {
		jwt := mux.Vars(req)["jwt"]
		if jwt == "" {
			http.Error(w, "No JWT Token", http.StatusBadRequest)
			return
		}

		err := auth.LogoutJWT(jwt)

		if err != nil {
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		}
	}).Methods("POST")

	log.Println("Listening on :8000")
	log.Fatal(http.ListenAndServe(":8000", r))
}
