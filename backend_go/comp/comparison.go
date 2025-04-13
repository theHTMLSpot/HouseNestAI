package comp

import (
	"errors"
	"math"
	"strings"

	"druc/backend/utils"
)

func OverallScore(
	space, year, features, price, bedrooms, location, bathrooms float64,
	weights []float64,
) (float64, error) {
	if len(weights) != 7 {
		return 0, errors.New("weights must be a slice of 7 values")
	}

	sum := 0.0
	for _, w := range weights {
		sum += w
	}

	score := (space*weights[0] +
		year*weights[1] +
		features*weights[2] +
		price*weights[3] +
		bedrooms*weights[4] +
		location*weights[5] +
		bathrooms*weights[6]) / sum

	return math.Min(100, score), nil
}

func LocationScore(distanceKm float64) float64 {
	maxDistance := 500.0
	score := 100 - (distanceKm/maxDistance)*100
	if score < 0 {
		return 0
	}
	return score
}

func ScoreFromDifference(ideal, listing int) float64 {
	if ideal == 0 {
		return 0
	}
	diff := math.Abs(float64(ideal - listing))
	score := 100 - (diff/float64(ideal))*100
	if score < 0 {
		return 0
	}
	return score
}

func ScoreWithMultiplier(ideal, listing, multiplier int) float64 {
	if ideal == 0 {
		return 0
	}
	diff := math.Abs(float64(ideal-listing) * float64(multiplier))
	score := 100 - (diff/float64(ideal))*100
	if score < 0 {
		return 0
	}
	return score
}

func MatchType(ideal, listing string) int {
	if strings.EqualFold(ideal, listing) {
		return 1
	}
	return 0
}

func FeaturesScore(ideal, listing []string) float64 {
	if len(ideal) == 0 {
		return 0
	}
	count := 0.0

	for _, feature := range ideal {
		matched := false
		for _, listingFeature := range listing {
			for key, contradiction := range utils.ContradictionsKeywords {
				if strings.Contains(strings.ToLower(feature), key) &&
					strings.Contains(strings.ToLower(listingFeature), contradiction) {
					count -= 1
					matched = true
					break
				}
			}
			if matched {
				break
			}
			if strings.EqualFold(feature, listingFeature) {
				count += 1
				break
			}
		}
	}

	procent := (count / float64(len(ideal)) / 2) * 100
	if procent > 100 {
		procent = 100
	}
	return procent
}
