const fs = require('fs');

const cssFile = 'c:/Users/Admin/Desktop/data/style.css';
let content = fs.readFileSync(cssFile, 'utf8');

const cardClasses = [
    '.service-card', '.testimonial-card', '.case-card', '.pricing-card', 
    '.mv-card', '.article-card', '.post-card', '.author-card', 
    '.location-card', '.int-card', '.h-blog-card', '.mv-glass-card', 
    '.wwd-card', '.tech-card', '.why-card', '.service-premium-card', 
    '.solution-card', '.featured-blog-card', '.premium-blog-card', 
    '.viz-card', '.info-card', '.help-card', '.map-overlay-card', 
    '.kpi-card', '.chart-card', '.table-card', '.insight-card', 
    '.team-card-v2', '.partner-logos-scroll span' // Just in case partners are considered cards
].join(', ');

const hoverClasses = cardClasses.split(', ').map(c => c + ':hover').join(', ');

const newCss = `
/* --- 360-Degree 3D Card Rotation Animation --- */
${cardClasses} {
    transition: transform 1.2s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 1.2s cubic-bezier(0.23, 1, 0.32, 1) !important;
    transform-style: preserve-3d;
    backface-visibility: visible;
}

${hoverClasses} {
    transform: perspective(1200px) rotateY(360deg) translateY(-10px) !important;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.15) !important;
    z-index: 10;
}
`;

fs.appendFileSync(cssFile, '\n' + newCss + '\n');
console.log('Appended 360 3D card rotation CSS.');
