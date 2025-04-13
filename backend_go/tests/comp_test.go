package tests

import (
	"druc/backend/comp"
	"math"
	"testing"
)

func almostEqual(a, b float64) bool {
	return math.Abs(a-b) < 0.01
}

func TestOverallScore(t *testing.T) {
	score, err := comp.OverallScore(80, 90, 70, 60, 85, 75, 65, []float64{1, 1, 1, 1, 1, 1, 1})
	if err != nil {
		t.Fatal("Unexpected error:", err)
	}

	expected := (80 + 90 + 70 + 60 + 85 + 75 + 65) / 7
	if !almostEqual(score, float64(expected)) {
		t.Errorf("Expected %v, got %v", expected, score)
	}

	_, err = comp.OverallScore(80, 90, 70, 60, 85, 75, 65, []float64{1, 1})
	if err == nil {
		t.Error("Expected error for incorrect weights length")
	}
}

func TestLocationScore(t *testing.T) {
	score := comp.LocationScore(100)
	expected := 80.0
	if !almostEqual(score, expected) {
		t.Errorf("Expected %v, got %v", expected, score)
	}

	score = comp.LocationScore(600)
	if score != 0 {
		t.Errorf("Expected 0, got %v", score)
	}
}

func TestScoreFromDifference(t *testing.T) {
	if comp.ScoreFromDifference(100, 100) != 100 {
		t.Error("Expected 100 score for exact match")
	}

	if comp.ScoreFromDifference(100, 150) != 50 {
		t.Error("Expected 50 score for difference of 50")
	}

	if comp.ScoreFromDifference(0, 50) != 0 {
		t.Error("Expected 0 score when ideal is 0")
	}
}

func TestScoreWithMultiplier(t *testing.T) {
	if comp.ScoreWithMultiplier(100, 100, 2) != 100 {
		t.Error("Expected 100 score for exact match")
	}

	score := comp.ScoreWithMultiplier(100, 110, 2)
	expected := 100 - (20.0 / 100.0 * 100.0)
	if !almostEqual(score, expected) {
		t.Errorf("Expected %v, got %v", expected, score)
	}
}

func TestMatchType(t *testing.T) {
	if comp.MatchType("Apartment", "apartment") != 1 {
		t.Error("Expected match on case-insensitive strings")
	}

	if comp.MatchType("House", "Villa") != 0 {
		t.Error("Expected 0 for non-matching strings")
	}
}

func TestFeaturesScore(t *testing.T) {
	ideal := []string{"balcony", "garden", "no pets"}
	listing := []string{"Balcony", "Garden", "pet friendly"}

	score := comp.FeaturesScore(ideal, listing)
	expected := ((2.0 - 1.0) / 3.0) * 100
	if !almostEqual(score, expected) {
		t.Errorf("Expected %v, got %v", expected, score)
	}

	score = comp.FeaturesScore([]string{}, listing)
	if score != 0 {
		t.Error("Expected 0 score for empty ideal list")
	}
}
