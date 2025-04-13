package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math"
	"net/http"
	"net/url"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
)

type OpenCageResponse struct {
	Results []struct {
		Geometry struct {
			Lat float64 `json:"lat"`
			Lng float64 `json:"lng"`
		} `json:"geometry"`
	} `json:"results"`
}

func loadEnv() {
	envPath, err := filepath.Abs("../.env")
	if err != nil {
		fmt.Println("Failed to resolve .env path:", err)
		return
	}
	err = godotenv.Load(envPath)
	if err != nil {
		fmt.Println("Error loading .env file:", err)
	}
}

func GetCoordinates(address string) (float64, float64, error) {
	loadEnv() // Load the .env file

	apiKey := os.Getenv("OPENCAGE_API_KEY")
	if apiKey == "" {
		return 0, 0, fmt.Errorf("missing OPENCAGE_API_KEY in environment")
	}

	baseURL := "https://api.opencagedata.com/geocode/v1/json"
	params := url.Values{}
	params.Add("q", address)
	params.Add("key", apiKey)
	params.Add("limit", "1")

	resp, err := http.Get(fmt.Sprintf("%s?%s", baseURL, params.Encode()))
	if err != nil {
		return 0, 0, err
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)

	var ocResp OpenCageResponse
	err = json.Unmarshal(body, &ocResp)
	if err != nil {
		return 0, 0, err
	}

	if len(ocResp.Results) == 0 {
		return 0, 0, fmt.Errorf("no results found")
	}

	lat := ocResp.Results[0].Geometry.Lat
	lng := ocResp.Results[0].Geometry.Lng

	return lat, lng, nil
}

// getDistance returns the distance in kilometers between two addresses.
func GetDistance(address1 string, address2 string) (int, error) {
	lat1, lng1, err := GetCoordinates(address1)
	if err != nil {
		return 0, err
	}

	lat2, lng2, err := GetCoordinates(address2)
	if err != nil {
		return 0, err
	}

	// Convert degrees to radians
	const R = 6371.0 // Earth radius in kilometers

	lat1Rad := lat1 * math.Pi / 180
	lat2Rad := lat2 * math.Pi / 180
	dLat := (lat2 - lat1) * math.Pi / 180
	dLng := (lng2 - lng1) * math.Pi / 180

	a := math.Sin(dLat/2)*math.Sin(dLat/2) +
		math.Cos(lat1Rad)*math.Cos(lat2Rad)*
			math.Sin(dLng/2)*math.Sin(dLng/2)

	c := 2 * math.Atan2(math.Sqrt(a), math.Sqrt(1-a))

	distance := R * c

	return int(math.Round(distance)), nil
}
