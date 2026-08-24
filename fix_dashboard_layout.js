const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf-8');

// 1. .dashboard-body
css = css.replace(
    /\.dashboard-body\s*\{[\s\S]*?\}/,
    (match) => {
        return match
            .replace(/height:\s*100vh;/, 'min-height: 100vh;')
            .replace(/overflow:\s*hidden;/, '');
    }
);

// 2. .dash-sidebar (make it sticky since the body will now scroll)
css = css.replace(
    /\.dash-sidebar\s*\{[\s\S]*?\}/,
    (match) => {
        // Only target the main one, not mobile media queries
        if (match.includes('width: 280px;')) {
            return match
                .replace(/height:\s*100%;/, 'height: 100vh;\n    position: sticky;\n    top: 0;')
                .replace(/height:\s*100vh;/, 'height: 100vh;'); // In case it was already 100vh
        }
        return match;
    }
);

// 3. .dash-main
css = css.replace(
    /\.dash-main\s*\{[\s\S]*?\}/,
    (match) => {
        return match
            .replace(/height:\s*100%;/, '')
            .replace(/overflow:\s*hidden;/, '');
    }
);

// 4. .dash-content
css = css.replace(
    /\.dash-content\s*\{[\s\S]*?\}/,
    (match) => {
        return match
            .replace(/overflow-y:\s*auto;/, '');
    }
);

fs.writeFileSync('style.css', css, 'utf-8');
console.log("Fixed dashboard layout for vertical scrolling");
