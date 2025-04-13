#backend/tests/comp_test.py
from comp import main

space = main.score
year = main.year
features = main.features
price = main.price
bedrooms = main.bedrooms
location = main.location
bathrooms = main.bathrooms

overal = main.overal


listing_features = [
    "modern_kitchen",          # match ✅
    "open_living_space",       # match ✅
    "carpet_floors",           # mismatch ❌
    "garage",                  # not in ideal ❌
    "garden_shed"              # not a direct match, partial maybe
]
ideal_features = [
    "modern_kitchen",
    "solar_panels",
    "garden",
    "open_living_space",
    "hardwood_floors"
]


space_score = space(15000,17500)["procent"]
year_score = year(2020, 2020)["procent"]
features_score = features(ideal_features, listing_features)["procent"]
price_score = price(12000, 12300)["procent"]
bedrooms_score = bedrooms(3, 3)["procent"]
location_score = location(5898.42)["procent"]
bathroom_score = bathrooms(3,5)["procent"]

weights = [90, 40, 100, 100, 40, 100, 10]

overall = overal(space_score, year_score, features_score, price_score, bedrooms_score, location_score, bathroom_score ,weights)

print(overall)

