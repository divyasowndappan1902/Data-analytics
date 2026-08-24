const fs = require('fs');

const cssFile = 'c:/Users/Admin/Desktop/data/style.css';
let content = fs.readFileSync(cssFile, 'utf8');

const targetBlock = `.hero-content h1 span.anim-line-text {
    color: var(--secondary-color);
    text-shadow: 0 0 10px rgba(56, 189, 248, 0.5), 0 0 20px rgba(56, 189, 248, 0.3);
}

.hero-content h1 span.animated-gradient-text {
    color: #ffffff;
    text-shadow: none;
    background: none;
    -webkit-text-fill-color: #ffffff;
}`;

const replacementBlock = `.hero-content h1 span.anim-line-text {
    color: #ffffff;
    text-shadow: none;
}

.hero-content h1 span.animated-gradient-text {
    color: var(--secondary-color);
    text-shadow: 0 0 10px rgba(56, 189, 248, 0.5), 0 0 20px rgba(56, 189, 248, 0.3);
    background: none;
    -webkit-text-fill-color: var(--secondary-color);
}`;

content = content.replace(targetBlock, replacementBlock);
fs.writeFileSync(cssFile, content, 'utf8');
console.log('Fixed alternating colors to White, Blue, White!');
