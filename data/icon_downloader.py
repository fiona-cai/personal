import requests

skills = [
    {"name": "Next.js", "icon": "/icons/Nextjs.svg"},
]

base_url = "https://techicons.dev/"  # Replace with your actual base URL

for skill in skills:
    icon_url = base_url + skill["icon"]
    response = requests.get(icon_url)
    
    if response.status_code == 200:
        with open(f"{skill['name'].replace(' ', '_')}.svg", 'wb') as f:
            f.write(response.content)
        print(f"Downloaded: {skill['name']}")
    else:
        print(f"Failed to download: {skill['name']}")
