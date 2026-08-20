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
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
                
                // Show success message
                formSuccess.classList.add('show');
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 5000);
                
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

