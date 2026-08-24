const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf-8');

// We need to remove overflow-x: hidden from the html block
css = css.replace(/html\s*\{[^}]*overflow-x:\s*hidden;[^}]*\}/g, (match) => {
    return match.replace(/overflow-x:\s*hidden;/g, '');
});

fs.writeFileSync('style.css', css, 'utf-8');
console.log("Double scrollbar fixed.");
