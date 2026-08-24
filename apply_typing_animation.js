const fs = require('fs');

const css = `
/* --- Premium Typing & Reveal Animation --- */
.anim-line-wrapper {
    display: inline-flex;
    align-items: flex-end;
}

.anim-cursor {
    display: inline-block;
    width: 3px;
    height: 1em;
    background-color: #ffffff;
    margin-left: 4px;
    vertical-align: text-bottom;
}

.anim-cursor.gradient-cursor {
    background-color: var(--secondary-color);
    box-shadow: 0 0 10px rgba(56, 189, 248, 0.6);
}

@keyframes blinkCursor {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
`;

const js = `
// Premium Typing & Reveal Animation
document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('animated-hero-title');
    if (!title) return;

    const wrappers = title.querySelectorAll('.anim-line-wrapper');
    const linesData = [];

    // Initial setup
    wrappers.forEach(wrapper => {
        const textSpan = wrapper.querySelector('.anim-line-text');
        const cursor = wrapper.querySelector('.anim-cursor');
        
        linesData.push({
            wrapper,
            textSpan,
            cursor,
            fullText: textSpan.textContent
        });
        
        textSpan.textContent = '';
        
        wrapper.style.opacity = '0';
        wrapper.style.transform = 'translateY(20px)';
        wrapper.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
        
        // Hide cursor initially
        cursor.style.opacity = '0';
        cursor.style.animation = 'none';
        cursor.classList.remove('hidden'); // Remove the hidden class from html
    });

    const typingSpeed = 40; // ms per char
    const lineDelay = 300; // ms between lines

    function typeLine(index) {
        if (index >= linesData.length) {
            // Keep last cursor blinking
            linesData[linesData.length - 1].cursor.style.animation = 'blinkCursor 0.8s step-end infinite';
            return;
        }

        const { wrapper, textSpan, cursor, fullText } = linesData[index];
        
        // Reveal wrapper
        wrapper.style.opacity = '1';
        wrapper.style.transform = 'translateY(0)';
        
        // Show cursor solid while typing
        cursor.style.opacity = '1';
        cursor.style.animation = 'none';

        let charIndex = 0;
        
        // Delay typing slightly so fade up starts first
        setTimeout(() => {
            const typingInterval = setInterval(() => {
                if (charIndex < fullText.length) {
                    textSpan.textContent += fullText.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typingInterval);
                    
                    // After typing finishes, blink cursor briefly before next line
                    cursor.style.animation = 'blinkCursor 0.8s step-end infinite';
                    
                    setTimeout(() => {
                        if (index < linesData.length - 1) {
                            cursor.style.opacity = '0';
                            cursor.style.animation = 'none';
                        }
                        typeLine(index + 1);
                    }, lineDelay);
                }
            }, typingSpeed);
        }, 200);
    }

    setTimeout(() => {
        typeLine(0);
    }, 300);
});
`;

fs.appendFileSync('c:/Users/Admin/Desktop/data/style.css', css);
fs.appendFileSync('c:/Users/Admin/Desktop/data/script.js', js);
console.log('Appended CSS and JS for typing animation.');
