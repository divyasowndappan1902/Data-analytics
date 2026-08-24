import re

file_path = "c:/Users/Admin/Desktop/data/style.css"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# We need to find `.hero-content p { ... }` and insert our block after it.
# The content currently looks like:
# .hero-content p {
#     font-size: 1.1rem;
#     color: var(--text-muted);
#     margin-bottom: 2.5rem;
# }
#
#     display: grid;

target = r"(\.hero-content p \{[^}]+\})"

replacement = r"""\1

.hero-buttons {
    display: flex;
    gap: 1rem;
}

.hero-image {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    position: relative;
    z-index: 2;
}

.hero-image img {
    max-width: 70%;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    animation: float3d 6s ease-in-out infinite;
    transform-style: preserve-3d;
}

@keyframes float3d {
    0% { transform: perspective(1000px) translateY(0px) rotateX(0deg) rotateY(0deg); }
    50% { transform: perspective(1000px) translateY(-20px) rotateX(5deg) rotateY(-5deg); }
    100% { transform: perspective(1000px) translateY(0px) rotateX(0deg) rotateY(0deg); }
}

/* Services */
.services {
    padding: 5rem 5%;
    text-align: center;
}

.section-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.section-header p {
    color: var(--text-muted);
    margin-bottom: 3rem;
}

.services-grid {"""

# Because the file has `.hero-content p { ... } \n\n    display: grid;` we also replace the `.services-grid {` part that is mangled.

# Actually, the file has:
# .hero-content p { ... } \n\n    display: grid;
# Let's just use string replace.

target_str = """.hero-content p {
    font-size: 1.1rem;
    color: var(--text-muted);
    margin-bottom: 2.5rem;
}

    display: grid;"""

replacement_str = """.hero-content p {
    font-size: 1.1rem;
    color: var(--text-muted);
    margin-bottom: 2.5rem;
}

.hero-buttons {
    display: flex;
    gap: 1rem;
}

.hero-image {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    position: relative;
    z-index: 2;
}

.hero-image img {
    max-width: 70%;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    animation: float3d 6s ease-in-out infinite;
    transform-style: preserve-3d;
}

@keyframes float3d {
    0% { transform: perspective(1000px) translateY(0px) rotateX(0deg) rotateY(0deg); }
    50% { transform: perspective(1000px) translateY(-20px) rotateX(5deg) rotateY(-5deg); }
    100% { transform: perspective(1000px) translateY(0px) rotateX(0deg) rotateY(0deg); }
}

/* Services */
.services {
    padding: 5rem 5%;
    text-align: center;
}

.section-header h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.section-header p {
    color: var(--text-muted);
    margin-bottom: 3rem;
}

.services-grid {
    display: grid;"""

new_content = content.replace(target_str, replacement_str)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Fixed CSS file.")
