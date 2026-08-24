const fs = require('fs');

const filePath = "c:/Users/Admin/Desktop/data/style.css";
let content = fs.readFileSync(filePath, 'utf-8');

const targetStr = `.hero-content p {
    font-size: 1.1rem;
    color: var(--text-muted);
    margin-bottom: 2.5rem;
}

    display: grid;`;

const replacementStr = `.hero-content p {
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
    display: grid;`;

if (content.includes(targetStr)) {
    content = content.replace(targetStr, replacementStr);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log("Fixed CSS file.");
} else {
    console.log("Target string not found in style.css");
}
