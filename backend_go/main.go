package main

import (
	"druc/backend/tools"
	"encoding/json"
	"fmt"
	"net/http"
)

func GetComp(w http.ResponseWriter, r *http.Request) {
	// Parse JSON body into the tools.RequestData struct
	var data tools.RequestData
	if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Use JsonToComp to calculate the overall score based on the provided data
	idealBytes, err := json.Marshal(data.Ideal)
	if err != nil {
		http.Error(w, "Failed to process ideal data", http.StatusInternalServerError)
		return
	}
	listingBytes, err := json.Marshal(data.Listing)
	if err != nil {
		http.Error(w, "Failed to process listing data", http.StatusInternalServerError)
		return
	}
	weightBytes, err := json.Marshal(data.Weights)

	if err != nil {
		http.Error(w, "Failed to process weight data", http.StatusInternalServerError)
		return
	}
	weights := make([]float64, len(weightBytes))

	for i, byte_ := range weightBytes {
		weights[i] = float64(byte_)
	}

	overallScore, err := tools.JsonToComp(idealBytes, listingBytes, weights)
	fmt.Println(listingBytes)
	fmt.Println(idealBytes)
	fmt.Println(weights)
	if err != nil {
		http.Error(w, "Failed to compute overall score", http.StatusInternalServerError)
		return
	}

	// Return the overall score as JSON
	response := map[string]float64{"score": overallScore}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/GetComp", GetComp)
	http.ListenAndServe(":8000", nil)
}
