const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf-8');

// Replace border-left with pseudo-element for perfect rounded corners
css = css.replace(
    /\.dash-nav-item\s*\{([^}]*?)\}/,
    (match, p1) => {
        if (!p1.includes('position: relative')) {
            return match.replace(/display:\s*flex;/, 'display: flex;\n    position: relative;\n    overflow: hidden;');
        }
        return match;
    }
);

css = css.replace(
    /\.dash-nav-item\.active\s*\{([^}]*?)\}/,
    (match, p1) => {
        return match.replace(/border-left:\s*4px\s*solid\s*var\(--primary-color\);/, '');
    }
);

css += `
.dash-nav-item.active::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: var(--primary-color);
}
`;

fs.writeFileSync('style.css', css, 'utf-8');
console.log("Sidebar active state fixed.");
