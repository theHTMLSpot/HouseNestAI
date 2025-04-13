import requests

def get_coordinates(address):
    url = f"https://nominatim.openstreetmap.org/search?q={address}&format=json&limit=1"
    headers = {
        'User-Agent': 'house-nest-ai'
    }
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        raise Exception(f"Error: Received status code {response.status_code} from Nominatim")

    try:
        data = response.json()
    except Exception as e:
        raise Exception(f"Could not decode JSON: {e}")

    if not data:
        raise Exception(f"No data returned for address: {address}")

    latitude = float(data[0]['lat'])
    longitude = float(data[0]['lon'])

    return latitude, longitude
def haversine(lat1, lon1, lat2, lon2):
    import math
    R = 6371  # Radius of Earth in kilometers
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)

    a = math.sin(delta_phi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    distance = R * c  # Distance in kilometers
    return distance

def calculate_distance(address1: str, address2: str):
    lat1, lon1 = get_coordinates(address1)
    lat2, lon2 = get_coordinates(address2)

    if lat1 is None or lat2 is None:
        return None

    return haversine(lat1, lon1, lat2, lon2)

print(calculate_distance("1600 Pennsylvania Ave, Washington, DC", "10 Downing St, Westminster, London"))