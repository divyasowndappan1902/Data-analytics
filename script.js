// Dashboard Hamburger Menu Toggle
const dashHamburger = document.querySelector('.dash-hamburger');
const dashSidebar = document.querySelector('.dash-sidebar');

if(dashHamburger && dashSidebar) {
    dashHamburger.addEventListener('click', () => {
        dashHamburger.classList.toggle('active');
        dashSidebar.classList.toggle('active');
    });
}
// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mainNavLinks = document.querySelector('.nav-links');

if(hamburger && mainNavLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mainNavLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
}
// script.js

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Counter animation
const counters = document.querySelectorAll('.animated-counter, .counter');
const speed = 200;

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

// Intersection Observer for stats / key metrics
const statsSection = document.querySelector('.stats, .key-metrics-section');
let countersStarted = false;

if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
            startCounters();
            countersStarted = true;
        }
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.scroll-reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Blog Category Filtering
const catButtons = document.querySelectorAll('.cat-btn');
const blogCards = document.querySelectorAll('.premium-blog-card');

if (catButtons.length > 0 && blogCards.length > 0) {
    catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            catButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// Contact Form Validation & Submission
const contactForm = document.getElementById('premium-contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const inputs = contactForm.querySelectorAll('input[required], textarea[required], select[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim() || (input.type === 'email' && !input.value.includes('@'))) {
                input.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                input.parentElement.classList.remove('invalid');
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending...';
            btn.style.opacity = '0.7';
            btn.style.pointerEvents = 'none';
            setTimeout(() => {
                  window.location.href = '404.html';
              }, 1500);
        }
    });
    
    // Clear validation on input
    const allInputs = contactForm.querySelectorAll('input, textarea, select');
    allInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.parentElement.classList.remove('invalid');
        });
    });
}

// FAQ Accordion Logic
const accordionHeaders = document.querySelectorAll('.accordion-header');

if (accordionHeaders.length > 0) {
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            
            // Is it already open?
            const isOpen = item.classList.contains('open');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(accItem => {
                accItem.classList.remove('open');
                accItem.querySelector('.accordion-content').style.maxHeight = null;
            });
            
            // If it wasn't open, open it
            if (!isOpen) {
                item.classList.add('open');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}

// Authentication Role Toggle & Redirect Logic
const authRoleToggle = document.getElementById('auth-role-toggle');
let currentAuthRole = 'admin'; // Default role

if (authRoleToggle) {
    const roleBtns = authRoleToggle.querySelectorAll('.role-btn');
    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('password');
    
    roleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            roleBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            
            // Update the state variable
            currentAuthRole = btn.getAttribute('data-role');
            
            // Slide animation logic
            if (currentAuthRole === 'customer') {
                authRoleToggle.classList.add('customer-active');
            } else {
                authRoleToggle.classList.remove('customer-active');
            }
        });
    });
}

// Form Submission & Redirects
const authLoginForm = document.getElementById('auth-login-form');
if (authLoginForm) {
    authLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const passInput = authLoginForm.querySelector('#password');
        const emailInput = authLoginForm.querySelector('#email');
        if (passInput && passInput.value.length < 8) {
            alert('Password must be at least 8 characters long.');
            passInput.parentElement.style.border = '1px solid #ef4444';
            passInput.parentElement.style.borderRadius = '8px';
            return; // Stop submission
        }
        
        if (emailInput) {
            localStorage.setItem('userEmail', emailInput.value);
            let namePart = emailInput.value.split('@')[0];
            namePart = namePart.split(/[._-]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
            localStorage.setItem('userName', namePart);
        }
        
        const btn = authLoginForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Authenticating...';
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            if (currentAuthRole === 'admin') {
                window.location.href = 'dashboard-admin.html';
            } else {
                window.location.href = 'dashboard-customer.html';
            }
        }, 800);
    });
}

const authSignupForm = document.getElementById('auth-signup-form');
if (authSignupForm) {
    authSignupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const passInput = authSignupForm.querySelector('#password');
        const emailInput = authSignupForm.querySelector('#email');
        const nameInput = authSignupForm.querySelector('#fname');
        if (passInput && passInput.value.length < 8) {
            alert('Password must be at least 8 characters long.');
            passInput.parentElement.style.border = '1px solid #ef4444';
            passInput.parentElement.style.borderRadius = '8px';
            return; // Stop submission
        }
        
        if (emailInput) {
            localStorage.setItem('userEmail', emailInput.value);
        }
        if (nameInput && nameInput.value.trim() !== '') {
            localStorage.setItem('userName', nameInput.value.trim());
        } else if (emailInput) {
            let namePart = emailInput.value.split('@')[0];
            namePart = namePart.split(/[._-]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
            localStorage.setItem('userName', namePart);
        }
        
        const btn = authSignupForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Account Created! Redirecting...';
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1200);
    });
}

// Active Navigation Link Highlight
const currentLocation = location.href;
const navLinks = document.querySelectorAll('.nav-links li a');

navLinks.forEach(link => {
    // Check if the link's href matches the current URL or if we are on the root index and it's the home link
    if (link.href === currentLocation || (currentLocation.endsWith('/') && link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
    }
});

// Dashboard Sidebar Navigation
const dashNavItems = document.querySelectorAll('.dash-nav-item');
const dashSections = document.querySelectorAll('.dash-section');
const dashHeaderTitle = document.querySelector('.dash-header h2');
const originalTitle = dashHeaderTitle ? dashHeaderTitle.innerText : '';

if (dashNavItems.length > 0) {
    dashNavItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            // Only prevent default if it's an empty link or hash link
            if(item.getAttribute('href') === '#' || item.getAttribute('href') === '') {
                e.preventDefault();
            }
            
            // Update active state on nav items
            dashNavItems.forEach(navItem => navItem.classList.remove('active'));
            item.classList.add('active');
            
            // Update header title
            const itemName = item.textContent.trim();
            if (dashHeaderTitle) {
                dashHeaderTitle.innerText = index === 0 ? originalTitle : itemName;
            }
            
            // Show corresponding section, hide others
            if (dashSections.length > 0) {
                dashSections.forEach((section, secIndex) => {
                    if (secIndex === index) {
                        section.style.display = '';
                    } else {
                        section.style.display = 'none';
                    }
                });
            }

            // Close mobile sidebar when an item is selected
            if (window.innerWidth <= 1024) {
                if (dashSidebar) dashSidebar.classList.remove('active');
                if (dashHamburger) dashHamburger.classList.remove('active');
            }
        });
    });
}

// Dynamic Profile Updates
document.addEventListener('DOMContentLoaded', () => {
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');
    
    if (userEmail || userName) {
        const userInfoContainer = document.querySelector('.dash-user-info');
        const avatarContainer = document.querySelector('.dash-avatar');
        
        if (userInfoContainer) {
            const nameEl = userInfoContainer.querySelector('h5');
            const emailEl = userInfoContainer.querySelector('p');
            
            if (nameEl && userName) {
                nameEl.textContent = userName;
            }
            if (emailEl && userEmail) {
                emailEl.textContent = userEmail;
            }
        }
        
        if (avatarContainer && userName) {
            // Get initials from name
            const parts = userName.split(' ');
            let initials = '';
            if (parts.length >= 2) {
                initials = (parts[0][0] + parts[1][0]).toUpperCase();
            } else if (parts.length === 1 && parts[0].length >= 2) {
                initials = parts[0].substring(0, 2).toUpperCase();
            } else if (parts.length === 1) {
                initials = parts[0].toUpperCase();
            }
            avatarContainer.textContent = initials;
        }
    }
});




const faqHeaders = document.querySelectorAll('.faq-header');
if (faqHeaders.length > 0) {
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            const icon = header.querySelector('.faq-icon');
            
            const isOpen = item.classList.contains('open');
            
            // Close all
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('open');
                faqItem.querySelector('.faq-content').style.maxHeight = null;
                faqItem.querySelector('.faq-icon').textContent = '+';
            });
            
            if (!isOpen) {
                item.classList.add('open');
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.textContent = '-';
            }
        });
    });
}


// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Process Steps Interactive Animation
document.addEventListener('DOMContentLoaded', () => {
    const processSteps = document.querySelectorAll('.process-steps .step');
    if (processSteps.length > 0) {
        // Initial state: first step active, others inactive
        processSteps.forEach((step, index) => {
            if (index === 0) {
                step.classList.add('active');
            } else {
                step.classList.add('inactive');
            }
            
            // Add loader element
            const loader = document.createElement('div');
            loader.className = 'step-loader';
            step.appendChild(loader);

            // Click event
            step.addEventListener('click', () => {
                if (step.classList.contains('active') || step.classList.contains('loading')) return;
                
                // Mark clicked step as loading
                step.classList.remove('inactive');
                step.classList.add('loading');
                
                // Dim all other steps
                processSteps.forEach(s => {
                    if (s !== step) {
                        s.classList.remove('active');
                        s.classList.add('inactive');
                    }
                });

                // Simulate 1.5s premium loading
                setTimeout(() => {
                    step.classList.remove('loading');
                    step.classList.add('active');
                }, 1500);
            });
        });
    }
});

// Subscribe Form Validation
document.addEventListener('DOMContentLoaded', () => {
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

        const showError = (input, message) => {
        input.style.border = '2px solid #ef4444';
        
        const container = input.closest('form') || input.closest('.form-group');
        let errorMsg = container.nextElementSibling;
        
        if (!errorMsg || !errorMsg.classList.contains('email-error-msg')) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'email-error-msg';
            errorMsg.style.color = '#ef4444';
            errorMsg.style.fontSize = '0.85rem';
            errorMsg.style.marginTop = '0.5rem';
            container.insertAdjacentElement('afterend', errorMsg);
        }
        errorMsg.textContent = message;
    };

    const removeError = (input) => {
        input.style.border = '';
        const container = input.closest('form') || input.closest('.form-group');
        const errorMsg = container.nextElementSibling;
        if (errorMsg && errorMsg.classList.contains('email-error-msg')) {
            errorMsg.remove();
        }
    };

    // Handle .newsletter-box (no form tag)
    const newsletterBoxes = document.querySelectorAll('.newsletter-box');
    newsletterBoxes.forEach(box => {
        const input = box.querySelector('input[type="email"]');
        const btn = box.querySelector('button');
        if (input && btn) {
            btn.addEventListener('click', (e) => {
                const val = input.value.trim();
                if (!val || !validateEmail(val)) {
                    e.preventDefault();
                    showError(input, 'Please enter your email address.');
                } else {
                    removeError(input);
                    // simulate success or redirect
                    window.location.href = '404.html';
                }
            });

            input.addEventListener('input', () => {
                if (input.value.trim() && validateEmail(input.value.trim())) {
                    removeError(input);
                }
            });
        }
    });

    // Handle .footer-form (has form tag)
    const footerForms = document.querySelectorAll('.footer-form, .newsletter-form');
    footerForms.forEach(form => {
        const input = form.querySelector('input[type="email"]');
        if (input) {
            // Remove required attribute so we can handle validation fully via JS
            input.removeAttribute('required');
            
            form.addEventListener('submit', (e) => {
                const val = input.value.trim();
                if (!val || !validateEmail(val)) {
                    e.preventDefault();
                    showError(input, 'Please enter your email address.');
                } else {
                    removeError(input);
                    // allow form submission to proceed
                }
            });

            input.addEventListener('input', () => {
                if (input.value.trim() && validateEmail(input.value.trim())) {
                    removeError(input);
                }
            });
        }
    });
});





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
                        el.style.transitionDelay = `${index * 100}ms`;
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
