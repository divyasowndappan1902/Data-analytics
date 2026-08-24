const fs = require('fs');

const cssFile = 'c:/Users/Admin/Desktop/data/style.css';

const css = `
/* --- Hero Parallax Particles Animation --- */
.hero-particles, .hero-particles::before, .hero-particles::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1; /* Above background, below content */
}

/* Base glowing blue particles */
.hero-particles {
    background-image: radial-gradient(circle, rgba(56, 189, 248, 0.4) 2px, transparent 3px);
    background-size: 100px 100px;
    animation: particlesDrift 45s linear infinite;
}

/* Smaller, faster white particles */
.hero-particles::before {
    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.6) 1.5px, transparent 1.5px);
    background-size: 60px 60px;
    animation: particlesDrift 30s linear infinite reverse;
}

/* Large, blurry glowing orbs */
.hero-particles::after {
    background-image: radial-gradient(circle, rgba(56, 189, 248, 0.6) 4px, transparent 5px);
    background-size: 180px 180px;
    animation: particlesDrift 60s linear infinite;
    filter: blur(3px);
}

@keyframes particlesDrift {
    0% { background-position: 0px 0px; }
    100% { background-position: 1000px 1000px; }
}
`;

fs.appendFileSync(cssFile, '\n' + css + '\n');
console.log('Added hero particles animation CSS.');
