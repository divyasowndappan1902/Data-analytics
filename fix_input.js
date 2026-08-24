const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf-8');

// 1. Change input padding
css = css.replace(
    /padding:\s*1\.2rem;/g,
    (match, offset, str) => {
        // Only replace if it's inside the .input-group block
        if (str.substring(offset - 200, offset).includes('.input-group input')) {
            return 'padding: 1.6rem 1.2rem 0.6rem 1.2rem;';
        }
        return match;
    }
);

// 2. Change the floating label top/left/background
css = css.replace(
    /top:\s*-10px;\s*left:\s*10px;\s*font-size:\s*0\.8rem;\s*background:\s*var\(--card-bg\);\s*padding:\s*0 0\.5rem;/g,
    'top: 0.4rem;\n    left: 1.2rem;\n    font-size: 0.75rem;\n    background: transparent;\n    padding: 0;'
);

// 3. Fix the login-page specific override to also be transparent
css = css.replace(
    /background:\s*#161f30\s*!important;/g,
    'background: transparent !important;'
);

fs.writeFileSync('style.css', css, 'utf-8');
console.log("Fixed style.css for floating labels");
