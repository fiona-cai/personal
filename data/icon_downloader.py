import requests

skills = [
    {"name": "Python", "icon": "/icons/Python.svg"},
    {"name": "Java", "icon": "/icons/Java.svg"},
    {"name": "HTML", "icon": "/icons/HTML.svg"},
    {"name": "CSS", "icon": "/icons/CSS.svg"},
    {"name": "JavaScript", "icon": "/icons/JavaScript.svg"},
    {"name": "TypeScript", "icon": "/icons/TypeScript.svg"},
    {"name": "Angular", "icon": "/icons/Angular.svg"},
    {"name": "Spring", "icon": "/icons/Spring.svg"},
    {"name": "React", "icon": "/icons/React.svg"},
    {"name": "Node.js", "icon": "/icons/Node.js.svg"},
    {"name": "Next.js", "icon": "/icons/Next.js.svg"},
    {"name": "Three.js", "icon": "/icons/Three.js.svg"},
    {"name": "Tailwind CSS", "icon": "/icons/Tailwind_CSS.svg"},
    {"name": "Godot", "icon": "/icons/Godot.svg"},
    {"name": "jQuery", "icon": "/icons/jQuery.svg"},
    {"name": "Figma", "icon": "/icons/Figma.svg"},
    {"name": "LaTeX", "icon": "/icons/LaTeX.svg"},
    {"name": "Git", "icon": "/icons/Git.svg"},
    {"name": "Jenkins", "icon": "/icons/Jenkins.svg"},
    {"name": "Flask", "icon": "/icons/Flask.svg"},
    {"name": "Bootstrap", "icon": "/icons/Bootstrap.svg"},
    {"name": "Discord.js", "icon": "/icons/Discord.js.svg"},
    {"name": "Jira", "icon": "/icons/Jira.svg"},
    {"name": "JSON", "icon": "/icons/JSON.svg"},
    {"name": "OpenCV", "icon": "/icons/OpenCV.svg"},
    {"name": "Adobe Illustrator", "icon": "/icons/Adobe_Illustrator.svg"},
    {"name": "Adobe Premiere Pro", "icon": "/icons/Adobe_Premiere_Pro.svg"}
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
