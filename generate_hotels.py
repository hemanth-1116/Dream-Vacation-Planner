import json
import random
import uuid
import csv
import time

# No need for Unsplash access key anymore
# UNSPLASH_ACCESS_KEY = "your_key_here"

with open("places.json", "r", encoding="utf-8") as f:
    places = json.load(f)

backup_images = [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1576675782826-f74f3db0bb88?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1501117716987-c8e1ecb210d3?auto=format&fit=crop&w=800&q=80"
]

def generate_hotel_name(place_name):
    patterns = [
        f"Hotel {place_name} Deluxe",
        f"Inn {place_name} Retreat",
        f"Resort {place_name} Residency",
        f"Lodge {place_name} View",
        f"Suites {place_name} Heights",
        f"{place_name} Heritage Hotel",
        f"StayEasy {place_name} Inn",
        f"The {place_name} Grand",
        f"{place_name} Comfort Stay",
        f"Villa {place_name} Palace"
    ]
    return random.choice(patterns)

# Modified: Only return a backup image, no API calls
def fetch_unsplash_image(query):
    return random.choice(backup_images)

hotels = []
for place in places:
    num_hotels = 4
    used_names = set()
    for _ in range(num_hotels):
        name = generate_hotel_name(place["placeName"])
        while name in used_names:
            name = generate_hotel_name(place["placeName"])
        used_names.add(name)

        search_query = f"{name} {place['city']} hotel"
        image_url = fetch_unsplash_image(search_query)
        time.sleep(0.2)  # Reduced just to keep the flow natural

        hotel = {
            "id": str(uuid.uuid4()),
            "hotelName": name,
            "city": place["city"],
            "latitude": round(place["latitude"] + random.uniform(-0.01, 0.01), 6),
            "longitude": round(place["longitude"] + random.uniform(-0.01, 0.01), 6),
            "rating": round(random.uniform(3.5, 5.0), 1),
            "imageURL": image_url,
            "description": f"{name} near {place['placeName']} offers comfort and convenience with modern amenities."
        }
        hotels.append(hotel)

with open("hotels.json", "w", encoding="utf-8") as f:
    json.dump(hotels, f, indent=2)

with open("hotels.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=hotels[0].keys())
    writer.writeheader()
    writer.writerows(hotels)

print(f"✅ Successfully generated {len(hotels)} hotels with backup images. You're all set, Hemanth bhai! 🏨🔥")
