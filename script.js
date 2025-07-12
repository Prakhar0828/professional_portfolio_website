/**
 * Portfolio Website JavaScript
 * Handles navigation, animations, form submission, and interactive features
 */

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

/**
 * Initialize all event listeners and functionality
 */
function initialize_portfolio() {
    setup_mobile_navigation();
    setup_smooth_scrolling();
    setup_scroll_animations();
    setup_contact_form();
    setup_navbar_scroll_effect();
    setup_skill_animations();
}

/**
 * Setup mobile navigation hamburger menu
 */
function setup_mobile_navigation() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/**
 * Setup smooth scrolling for navigation links
 */
function setup_smooth_scrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Setup scroll animations for elements
 */
function setup_scroll_animations() {
    const observer_options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observer_options);

    // Observe elements for animation
    const animate_elements = document.querySelectorAll('.timeline-item, .education-card, .skill-category, .project-card, .certification-card');
    animate_elements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

/**
 * Setup contact form submission
 */
function setup_contact_form() {
    if (contactForm) {
        contactForm.addEventListener('submit', handle_form_submission);
    }
}

/**
 * Handle contact form submission
 * @param {Event} e - Form submission event
 */
function handle_form_submission(e) {
    e.preventDefault();
    
    const form_data = new FormData(contactForm);
    const form_object = Object.fromEntries(form_data);
    
    // Validate form data
    if (validate_form_data(form_object)) {
        // Show success message (in a real app, you'd send this to a server)
        show_form_message('Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    } else {
        show_form_message('Please fill in all required fields correctly.', 'error');
    }
}

/**
 * Validate form data
 * @param {Object} data - Form data object
 * @returns {boolean} - Whether form data is valid
 */
function validate_form_data(data) {
    const required_fields = ['name', 'email', 'subject', 'message'];
    
    for (const field of required_fields) {
        if (!data[field] || data[field].trim() === '') {
            return false;
        }
    }
    
    // Basic email validation
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email_regex.test(data.email)) {
        return false;
    }
    
    return true;
}

/**
 * Show form submission message
 * @param {string} message - Message to display
 * @param {string} type - Message type ('success' or 'error')
 */
function show_form_message(message, type) {
    // Remove existing message
    const existing_message = document.querySelector('.form-message');
    if (existing_message) {
        existing_message.remove();
    }
    
    // Create new message element
    const message_element = document.createElement('div');
    message_element.className = `form-message form-message-${type}`;
    message_element.textContent = message;
    message_element.style.cssText = `
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 8px;
        font-weight: 500;
        text-align: center;
        ${type === 'success' ? 'background-color: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;' : 'background-color: #fee2e2; color: #991b1b; border: 1px solid #fecaca;'}
    `;
    
    contactForm.appendChild(message_element);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (message_element.parentNode) {
            message_element.remove();
        }
    }, 5000);
}

/**
 * Setup navbar scroll effect
 */
function setup_navbar_scroll_effect() {
    const navbar = document.querySelector('.navbar');
    let last_scroll_top = 0;
    
    window.addEventListener('scroll', () => {
        const scroll_top = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background on scroll
        if (scroll_top > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        last_scroll_top = scroll_top;
    });
}

/**
 * Setup skill bar animations
 */
function setup_skill_animations() {
    const skill_bars = document.querySelectorAll('.skill-progress');
    
    const skill_observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress_bar = entry.target;
                const target_width = progress_bar.style.width;
                
                // Reset width to 0 and animate to target
                progress_bar.style.width = '0%';
                setTimeout(() => {
                    progress_bar.style.width = target_width;
                }, 100);
                
                skill_observer.unobserve(progress_bar);
            }
        });
    }, { threshold: 0.5 });
    
    skill_bars.forEach(bar => {
        skill_observer.observe(bar);
    });
}

/**
 * Add typing effect to hero title
 */
function add_typing_effect() {
    const hero_title = document.querySelector('.hero-title');
    if (!hero_title) return;
    
    const text = hero_title.textContent;
    hero_title.textContent = '';
    
    let i = 0;
    const type_interval = setInterval(() => {
        if (i < text.length) {
            hero_title.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(type_interval);
        }
    }, 100);
}

/**
 * Setup project card hover effects
 */
function setup_project_hover_effects() {
    const project_cards = document.querySelectorAll('.project-card');
    
    project_cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Add scroll progress indicator
 */
function add_scroll_progress_indicator() {
    const progress_bar = document.createElement('div');
    progress_bar.className = 'scroll-progress';
    progress_bar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progress_bar);
    
    window.addEventListener('scroll', () => {
        const scroll_top = window.pageYOffset || document.documentElement.scrollTop;
        const doc_height = document.documentElement.scrollHeight - window.innerHeight;
        const scroll_percentage = (scroll_top / doc_height) * 100;
        
        progress_bar.style.width = scroll_percentage + '%';
    });
}

/**
 * Setup lazy loading for images (if any are added later)
 */
function setup_lazy_loading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const image_observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                image_observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        image_observer.observe(img);
    });
}

/**
 * Add copy email functionality
 */
function setup_copy_email_functionality() {
    const email_links = document.querySelectorAll('a[href^="mailto:"]');
    
    email_links.forEach(link => {
        link.addEventListener('click', (e) => {
            const email = link.href.replace('mailto:', '');
            
            // Copy to clipboard if supported
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    show_temporary_message('Email copied to clipboard!', link);
                });
            }
        });
    });
}

/**
 * Show temporary message near an element
 * @param {string} message - Message to display
 * @param {Element} element - Element to show message near
 */
function show_temporary_message(message, element) {
    const message_element = document.createElement('div');
    message_element.textContent = message;
    message_element.style.cssText = `
        position: absolute;
        background: #1f2937;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-size: 0.875rem;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(message_element);
    
    // Position message
    const rect = element.getBoundingClientRect();
    message_element.style.left = rect.left + 'px';
    message_element.style.top = (rect.bottom + 10) + 'px';
    
    // Show message
    setTimeout(() => {
        message_element.style.opacity = '1';
    }, 10);
    
    // Hide message after 2 seconds
    setTimeout(() => {
        message_element.style.opacity = '0';
        setTimeout(() => {
            if (message_element.parentNode) {
                message_element.remove();
            }
        }, 300);
    }, 2000);
}

/**
 * Add keyboard navigation support
 */
function setup_keyboard_navigation() {
    document.addEventListener('keydown', (e) => {
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Ctrl/Cmd + K to focus search (if search is added later)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            // Focus search input if it exists
            const search_input = document.querySelector('.search-input');
            if (search_input) {
                search_input.focus();
            }
        }
    });
}

/**
 * Add performance monitoring
 */
function setup_performance_monitoring() {
    // Monitor page load time
    window.addEventListener('load', () => {
        const load_time = performance.now();
        console.log(`Page loaded in ${load_time.toFixed(2)}ms`);
        
        // Log to analytics if needed
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                name: 'load',
                value: Math.round(load_time)
            });
        }
    });
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initialize_portfolio();
    add_typing_effect();
    setup_project_hover_effects();
    add_scroll_progress_indicator();
    setup_lazy_loading();
    setup_copy_email_functionality();
    setup_keyboard_navigation();
    setup_performance_monitoring();
});

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initialize_portfolio,
        setup_mobile_navigation,
        setup_smooth_scrolling,
        setup_scroll_animations,
        setup_contact_form,
        handle_form_submission,
        validate_form_data
    };
} 