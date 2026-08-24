const fs = require('fs');

const file = 'c:/Users/Admin/Desktop/data/about.html';
let content = fs.readFileSync(file, 'utf8');

const startStr = '<div class="about-hero-content">';
const endStr = '<!-- 5. Analytics Workflow -->';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    const fixedBlock = `<div class="about-hero-content">
            <h1>Turning Data Into <span>Meaningful Decisions</span></h1>
            <p>We transform complex data streams into actionable business intelligence, empowering organizations to see beyond the numbers.</p>
            <div class="hero-buttons">
                <a href="404.html" class="btn-primary">Explore Projects</a>
                <a href="404.html" class="btn-secondary">Contact Us</a>
            </div>
        </div>
    </section>

    <!-- Core Capabilities -->
    <section class="about-capabilities scroll-reveal">
        <div class="section-title">
            <h2>Our Core Capabilities</h2>
            <p>Empowering businesses through advanced analytics and intelligence.</p>
        </div>
        <div class="wwd-grid">
            <div class="wwd-card">
                <div class="wwd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10M18 20V4M6 20v-4"/></svg></div>
                <h4>Performance Analytics</h4>
                <p>Monitor KPIs in real-time to optimize operations and drive sustainable efficiency.</p>
            </div>
            <div class="wwd-card">
                <div class="wwd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg></div>
                <h4>Predictive Insights</h4>
                <p>Leverage advanced forecasting models to anticipate market shifts and customer behavior.</p>
            </div>
            <div class="wwd-card">
                <div class="wwd-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><path d="M9 9h6M9 13h6M9 17h6"/></svg></div>
                <h4>Reporting & Dashboards</h4>
                <p>Automated, pixel-perfect reports and interactive dashboards delivered on demand.</p>
            </div>
        </div>
    </section>

    `;
    
    content = content.substring(0, startIndex) + fixedBlock + content.substring(endIndex);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed about.html structure properly!');
} else {
    console.log('Could not find boundaries');
}
