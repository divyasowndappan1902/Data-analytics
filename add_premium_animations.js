const fs = require('fs');

// 1. Append CSS for animations
const cssToAdd = `
/* Premium Site-Wide Text Animations */
.premium-text-animate {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: opacity, transform;
}

p.premium-text-animate {
    transform: translateY(15px);
    transition-duration: 0.9s;
}

.premium-text-animate.text-animate-in {
    opacity: 1;
    transform: translateY(0);
}
`;
fs.appendFileSync('style.css', '\n' + cssToAdd + '\n');

// 2. Append JS for IntersectionObserver and stagger
const jsToAdd = `
// Premium Text Animations Observer
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    let staggerQueue = [];
    let staggerTimeout = null;

    const observer = new IntersectionObserver((entries) => {
        const intersecting = entries.filter(e => e.isIntersecting && !e.target.classList.contains('text-animate-in'));
        
        if (intersecting.length > 0) {
            intersecting.forEach(entry => {
                staggerQueue.push(entry.target);
                observer.unobserve(entry.target);
            });

            if (!staggerTimeout) {
                staggerTimeout = setTimeout(() => {
                    // Sort by vertical position on the page to ensure top-down staggering
                    staggerQueue.sort((a, b) => {
                        return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
                    });

                    staggerQueue.forEach((el, index) => {
                        el.style.transitionDelay = \`\${index * 100}ms\`;
                        // Force reflow
                        void el.offsetWidth;
                        el.classList.add('text-animate-in');
                    });

                    staggerQueue = [];
                    staggerTimeout = null;
                }, 50); // Small batching delay
            }
        }
    }, observerOptions);

    // Select all targeted elements
    const elementsToAnimate = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, .btn-primary, .btn-secondary, button');
    
    elementsToAnimate.forEach((el) => {
        // Skip elements that are already part of other complex structures if needed,
        // but for now apply to all as requested.
        
        // Remove AOS to prevent conflicts
        if (el.hasAttribute('data-aos')) {
            el.removeAttribute('data-aos');
        }
        
        el.classList.add('premium-text-animate');
        observer.observe(el);
    });
});
`;
fs.appendFileSync('script.js', '\n' + jsToAdd + '\n');

console.log("Added premium animations to style.css and script.js");
