const fs = require('fs');

const cssFile = 'c:/Users/Admin/Desktop/data/style.css';
let content = fs.readFileSync(cssFile, 'utf8');

const startStr = '.hero-content h1 {';
const endStr = '.hero-buttons {';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const correctBlock = `.hero-content h1 {
    font-size: 4rem;
    line-height: 1.1;
    margin-bottom: 1.5rem;
}

.hero-content h1 span {
    /* override global span */
    background: none;
    -webkit-background-clip: initial;
    -webkit-text-fill-color: initial;
}

.hero-content h1 span.anim-line-text {
    color: #ffffff;
}

.hero-content h1 span.animated-gradient-text {
    color: var(--secondary-color);
    text-shadow: 0 0 10px rgba(56, 189, 248, 0.5), 0 0 20px rgba(56, 189, 248, 0.3);
}

.hero-content p {
    font-size: 1.1rem;
    color: var(--text-muted);
    margin-bottom: 2.5rem;
}

`;
    
    content = content.substring(0, startIndex) + correctBlock + content.substring(endIndex);
    fs.writeFileSync(cssFile, content, 'utf8');
    console.log('Fixed alternating colors completely and properly!');
} else {
    console.log('Could not find boundaries');
}
