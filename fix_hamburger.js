const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf-8');

// Fix 1: Add z-index: 1000 to .nav-links inside the media query so it stays under the hamburger icon (z-index 1001)
css = css.replace(
    /\.nav-links\s*\{([^}]*?position:\s*fixed;[^}]*?)\}/g,
    (match, p1) => {
        if (!p1.includes('z-index')) {
            return match.replace(/position:\s*fixed;/, 'position: fixed;\n        z-index: 1000;');
        }
        return match;
    }
);

// Fix 2: Make .dash-mobile-header sticky so it doesn't vanish on scroll
css = css.replace(
    /\.dash-mobile-header\s*\{([^}]*?)\}/g,
    (match, p1) => {
        if (!p1.includes('position: sticky')) {
            return match.replace(/display:\s*flex;/, 'display: flex;\n        position: sticky;\n        top: 0;');
        }
        return match;
    }
);

fs.writeFileSync('style.css', css, 'utf-8');
console.log("Hamburger menu mobile responsive fixes applied.");
