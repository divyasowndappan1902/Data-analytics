import urllib.request
from PIL import Image
import io
import os

url = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response:
    img_data = response.read()

img = Image.open(io.BytesIO(img_data))
img = img.resize((1200, 800), Image.Resampling.LANCZOS)
output_path = 'c:/Users/Admin/Desktop/data/assets/featured_dashboard.webp'
img.save(output_path, 'webp', quality=60, method=6)

print(f"Saved {output_path}. Size: {os.path.getsize(output_path) / 1024:.2f} KB")
