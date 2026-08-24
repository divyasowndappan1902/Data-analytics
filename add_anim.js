const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf-8');
const h1Regex = /<h1 class="smoky-title">[\s\S]*?<\/h1>/;
const newH1 = `<h1 class="animated-gradient-title">Advanced Data<br>Science & Analytics<br>Solutions</h1>`;
if(h1Regex.test(html)) {
    html = html.replace(h1Regex, newH1);
    fs.writeFileSync('index.html', html, 'utf-8');
    console.log("Updated index.html");
} else {
    console.log("Could not find smoky-title in index.html");
}

// 2. Update style.css
let css = fs.readFileSync('style.css', 'utf-8');
const smokyCssRegex = /\/\* Smoky Text Animation \*\/[\s\S]*?@keyframes smoky \{[\s\S]*?\}/;
const newCss = `/* Gradient Text Animation */
.animated-gradient-title {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    line-height: 1.2;
    background: linear-gradient(to right, var(--secondary-color), #60a5fa, #818cf8, var(--secondary-color));
    background-size: 300% auto;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: gradientShine 4s linear infinite;
}

@keyframes gradientShine {
    to {
        background-position: 300% center;
    }
}`;
if (smokyCssRegex.test(css)) {
    css = css.replace(smokyCssRegex, newCss);
    fs.writeFileSync('style.css', css, 'utf-8');
    console.log("Updated style.css");
} else {
    console.log("Could not find smoky css in style.css, appending...");
    fs.appendFileSync('style.css', '\n\n' + newCss + '\n');
}
