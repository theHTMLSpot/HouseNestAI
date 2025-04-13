package tests

import (
	"druc/backend/api"
	"testing"
)

func TestGetCoordinates(t *testing.T) {
	tests := []struct {
		address   string
		wantLat   float64
		wantLng   float64
		wantError bool
	}{
		{
			address:   "Grand Place, Brussels, Belgium",
			wantLat:   50.8467, // Accurate to the square
			wantLng:   4.3499,
			wantError: false,
		},
		{
			address:   "Nonexistent Address",
			wantLat:   0,
			wantLng:   0,
			wantError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.address, func(t *testing.T) {
			gotLat, gotLng, err := api.GetCoordinates(tt.address)
			if (err != nil) != tt.wantError {
				t.Errorf("GetCoordinates() error = %v, wantError %v", err, tt.wantError)
				return
			}

			if !tt.wantError {
				if !almostEqual(gotLat, tt.wantLat, 0.1) || !almostEqual(gotLng, tt.wantLng, 0.01) {
					t.Errorf("GetCoordinates() = (%v, %v), want (%v, %v)", gotLat, gotLng, tt.wantLat, tt.wantLng)
				}
			}
		})
	}
}

func TestGetDistance(t *testing.T) {
	tests := []struct {
		name      string
		address1  string
		address2  string
		wantDist  int
		wantError bool
	}{
		{
			name:      "Same address in Brussels",
			address1:  "Grand Place, Brussels, Belgium",
			address2:  "Grand Place, Brussels, Belgium",
			wantDist:  0,
			wantError: false,
		},
		{
			name:      "Brussels to Paris",
			address1:  "Grand Place, Brussels, Belgium",
			address2:  "Eiffel Tower, Paris, France",
			wantDist:  266, // Approx real-world driving distance is ~312 km, adjust if needed
			wantError: false,
		},
		{
			name:      "Invalid address",
			address1:  "asdfghjkl",
			address2:  "Eiffel Tower, Paris, France",
			wantDist:  0,
			wantError: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			gotDist, err := api.GetDistance(tt.address1, tt.address2)
			if (err != nil) != tt.wantError {
				t.Errorf("GetDistance() error = %v, wantError %v", err, tt.wantError)
				return
			}
			if !tt.wantError && !almostEqual(float64(gotDist), float64(tt.wantDist), 10) {
				t.Errorf("GetDistance() = %v, want %v", gotDist, tt.wantDist)
			}
		})
	}
}
