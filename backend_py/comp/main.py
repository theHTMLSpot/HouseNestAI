import sys
import os
import json

# Add the comp directory to the path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../utils")))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../api")))

# Import contradictions from utils
try:
    from contradictions import contradictions_keywords
    from location import calculate_distance
   
except ImportError:
    print("Couldn't import modules")
    exit(404)

# Import location calculation


def overal(space_percentage: float, year_percentage: float, features_percentage: float,
           price_percentage: float, bedrooms_percentage: float, location_percentage: float,
           bathrooms_percentage: float, weights: list):
    
    # Now we need 7 weights
    if len(weights) != 7:
        raise ValueError("Weights must be a list of 7 values")
    
    overall_score = min(100, (
        space_percentage * weights[0] +
        year_percentage * weights[1] +
        features_percentage * weights[2] +
        price_percentage * weights[3] +
        bedrooms_percentage * weights[4] +
        location_percentage * weights[5] +
        bathrooms_percentage * weights[6]
    ) / sum(weights))

    return {
        "overal_procent": overall_score
    }



def location(distance_km: float):
    # Define max acceptable distance for full score (0 km = perfect, 500+ km = 0%)
    max_distance = 500.0
    score = max(0, 100 - (distance_km / max_distance) * 100)
    return {
        "procent": score
    }


def calculate_location_score(address1: str, address2: str):
    # Calculate distance between two addresses using the imported calculate_distance function
    distance = calculate_distance(address1, address2)
    
    if distance is None:
        return 0  # No valid distance found
    
    # Example: we return the inverse of the distance as a score (you may adjust this calculation)
    return max(0, 100 - distance)  # Adjust this scaling factor if necessary

def space(ideal: int, listing: int):
    difference = abs(ideal - listing)
    procent = 100 if difference == 0 else min(100, (difference / ideal) * 100)
    return {
        "procent": procent
    }

def year(ideal: int, listing: int):
    difference = abs(ideal - listing) * 20
    procent = 100 if difference == 0 else max(100 - (difference / ideal) * 100, 0)
    return {
        "procent": procent
    }

def price(ideal: int, listing: int):
    difference = abs(ideal - listing) * 20
    procent = 100 if difference == 0 else max(100 - (difference / ideal) * 100, 0)
    return {
        "procent": procent
    }

def bathrooms(ideal: int, listing: int):
    difference = abs(ideal - listing)
    procent = 100 if difference == 0 else max(100 - (difference / ideal) * 100, 0)
    return {
        "procent": procent
    }

def bedrooms(ideal: int, listing: int):
    difference = abs(ideal - listing)
    procent = 100 if difference == 0 else max(100 - (difference / ideal) * 100, 0)
    return {
        "procent": procent
    }

def typee(ideal: str, listing: str):
    match = 1 if ideal.lower() == listing.lower() else 0
    return {
        "match": match
    }

def features(ideal: list, listing: list):
    count = 0
    if not ideal:
        return {"procent": 0}

    for feature in ideal:
        matched = False
        for listing_feature in listing:
            for keyword in contradictions_keywords:
                if keyword in feature.lower() and contradictions_keywords[keyword] in listing_feature.lower():
                    count -= 1
                    matched = True
                    break
            if matched:
                break
            if feature.lower() == listing_feature.lower():
                count += 1
                break

    procent = min(100, (count / len(ideal)) * 100)
    return {
        "procent": procent,
    }



