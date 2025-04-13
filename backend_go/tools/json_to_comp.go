package tools

import (
	"druc/backend/api"
	"druc/backend/comp"
	"encoding/json"
)

type RequestData struct {
	Ideal   DataStruct `json:"ideal"`
	Listing DataStruct `json:"listing"`
	Weights []float64  `json:"weights"`
}

type DataStruct struct {
	Name          string   `json:"name"`
	ListingType   string   `json:"listingType"`
	Description   string   `json:"description"`
	Bedrooms      int8     `json:"bedrooms"`
	Bathrooms     int8     `json:"bathrooms"`
	Location      string   `json:"location"`
	Price         float32  `json:"price"`
	Features      []string `json:"features"`
	Year          int16    `json:"year"`
	SquareFootage int16    `json:"squareFootage"`
}

func JsonToComp(jsonIdeal []byte, jsonListing []byte, weights []float64) (float64, error) {
	var ideal, listing DataStruct
	err := json.Unmarshal(jsonIdeal, &ideal)
	if err != nil {
		return 0, err
	}
	err = json.Unmarshal(jsonListing, &listing)

	if err != nil {
		return 0, err
	}

	distance, err := api.GetDistance(ideal.Location, listing.Location)

	if err != nil {
		return 0, err
	}

	// Calculate sub-scores
	spaceScore := comp.ScoreFromDifference(int(ideal.SquareFootage), int(listing.SquareFootage))
	yearScore := comp.ScoreFromDifference(int(ideal.Year), int(listing.Year))
	featureScore := comp.FeaturesScore(ideal.Features, listing.Features)
	priceScore := comp.ScoreFromDifference(int(ideal.Price), int(listing.Price))
	bedroomsScore := comp.ScoreFromDifference(int(ideal.Bathrooms), int(listing.Bedrooms))
	locationScore := comp.LocationScore(float64(distance))
	bathroomsScore := comp.ScoreFromDifference(int(ideal.Bathrooms), int(listing.Bathrooms))

	return comp.OverallScore(
		spaceScore,
		yearScore,
		featureScore,
		priceScore,
		bedroomsScore,
		locationScore,
		bathroomsScore,
		weights,
	)
}
