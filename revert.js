const fs = require('fs');
let content = fs.readFileSync('dashboard-customer.html', 'utf-8');

// Revert My Analytics additions
const analyticsRegex = /\s*<!-- New Analytics Sections -->\s*<div class="dash-chart-row" style="margin-top: 2rem;" data-aos="fade-up">\s*<!-- Storage & Data Transfer Usage -->[\s\S]*?<!-- Geographical Traffic -->[\s\S]*?<\/table>\s*<\/div>\s*<\/div>/;

if(analyticsRegex.test(content)) {
    content = content.replace(analyticsRegex, "");
} else {
    console.log("Analytics block not found!");
}

// Revert Reports additions
const reportsRegex = /\s*<!-- 4\. Report Templates & 5\. Export Activity -->\s*<div class="dash-chart-row" style="margin-top: 2rem;" data-aos="fade-up">\s*<!-- Report Templates -->[\s\S]*?<!-- Recent Export Activity -->[\s\S]*?<\/table>\s*<\/div>\s*<\/div>/;

if(reportsRegex.test(content)) {
    content = content.replace(reportsRegex, "");
} else {
    console.log("Reports block not found!");
}

fs.writeFileSync('dashboard-customer.html', content, 'utf-8');
console.log("Reverted");
