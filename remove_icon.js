const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(file => {
    let html = fs.readFileSync(file, 'utf-8');
    
    // Replace the login link with SVG with a simple login link
    const regex = /<li><a href="login\.html" class="btn-primary" style="display: inline-flex; align-items: center; gap: 0\.4rem;"><svg[^>]+>.*?<\/svg>Login<\/a><\/li>/g;
    
    if (regex.test(html)) {
        html = html.replace(regex, '<li><a href="login.html" class="btn-primary">Login</a></li>');
        fs.writeFileSync(file, html, 'utf-8');
        console.log(`Updated ${file}`);
    }
});
