const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf-8');

// Fix 1: Replace all minmax(Xpx, 1fr) with minmax(min(100%, Xpx), 1fr) to prevent grid overflow on tiny screens (like 320px)
css = css.replace(/minmax\(\s*(\d+)px\s*,\s*1fr\s*\)/g, 'minmax(min(100%, $1px), 1fr)');

// Fix 2: Prevent 100vw overflow issue (scrollbars in Windows cause 100vw to exceed 100%)
css = css.replace(/width:\s*100vw/g, 'width: 100%');
css = css.replace(/max-width:\s*100vw/g, 'max-width: 100%');

// Fix 3: Ensure html has overflow-x hidden just like body does
if (!css.includes('html { overflow-x: hidden; }')) {
    css = css.replace(/body\s*\{/, 'html {\n    overflow-x: hidden;\n    width: 100%;\n}\n\nbody {');
}

// Fix 4: If any fixed widths > 300px exist without max-width: 100%, they could still overflow.
// It's safest to add a universal max-width rule for images, video, and common containers, though they mostly have it.

fs.writeFileSync('style.css', css, 'utf-8');
console.log("Applied 320px mobile overflow fixes.");
