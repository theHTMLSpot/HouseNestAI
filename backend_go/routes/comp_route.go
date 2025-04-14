package routes

import (
	"druc/backend/tools"
	"encoding/json"

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

	overallScore, err := tools.JsonToComp(idealBytes, listingBytes, data.Weights)
	if err != nil {
		http.Error(w, "Failed to compute overall score", http.StatusInternalServerError)
		return
	}

	// Return the overall score as JSON
	response := map[string]float64{"score": overallScore}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
