// CannaBiz HR - Main JavaScript File
// Professional Cannabis HR Consulting Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollEffects();
    initializeForms();
    initializeFAQ();
    initializeBlogFiltering();
    initializeModals();
    initializeFundraising();
    initializeAnimations();
    initializeCalendar();
});

// Navigation Functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (hamburger.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(6px, 6px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
        
        // Close menu when clicking on links
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        });
    }
    
    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.service-card, .qualification, .value-point, .feature, .blog-post, .step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Services navigation sticky behavior
    const servicesNav = document.querySelector('.services-nav');
    if (servicesNav) {
        const servicesNavItems = servicesNav.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.service-section[id]');
        
        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop <= 200) {
                    current = section.getAttribute('id');
                }
            });
            
            servicesNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });
    }
}

// Form Handling
function initializeForms() {
    // Contact form
    const contactForm = document.getElementById('consultation-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactSubmission(this);
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-signup');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleNewsletterSubmission(this);
        });
    }
    
    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
}

function handleContactSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        console.log('Contact form data:', data);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleNewsletterSubmission(form) {
    const formData = new FormData(form);
    const email = formData.get('email');
    
    if (!validateEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';
    submitBtn.disabled = true;
    
    // Simulate subscription (replace with actual API call)
    setTimeout(() => {
        console.log('Newsletter subscription:', email);
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    clearFieldError(e);
    
    // Validate based on field type
    let isValid = true;
    let errorMessage = '';
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    } else if (field.type === 'email' && value && !validateEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address.';
    } else if (field.type === 'tel' && value && !validatePhone(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number.';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function clearFieldError(e) {
    const field = e.target;
    field.style.borderColor = '';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function showFieldError(field, message) {
    field.style.borderColor = 'hsl(5, 70%, 55%)';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = 'hsl(5, 70%, 55%)';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// FAQ Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked item if it wasn't already active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Blog Filtering
function initializeBlogFiltering() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter posts
                filterPosts(category, blogPosts);
            });
        });
    }
    
    // Load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Show more posts (simulate loading)
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                showNotification('No more articles to load.', 'info');
                this.textContent = 'Load More Articles';
                this.disabled = false;
            }, 1000);
        });
    }
}

function filterPosts(category, posts) {
    posts.forEach(post => {
        const postCategory = post.getAttribute('data-category');
        
        if (category === 'all' || postCategory === category) {
            post.style.display = 'block';
            setTimeout(() => {
                post.style.opacity = '1';
                post.style.transform = 'translateY(0)';
            }, 100);
        } else {
            post.style.opacity = '0';
            post.style.transform = 'translateY(20px)';
            setTimeout(() => {
                post.style.display = 'none';
            }, 300);
        }
    });
}

// Modal Functionality
function initializeModals() {
    const modal = document.getElementById('donation-modal');
    const tierBtns = document.querySelectorAll('.tier-btn');
    const closeBtn = document.querySelector('.close');
    
    if (modal) {
        // Open modal
        tierBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const amount = this.getAttribute('data-amount');
                openDonationModal(amount);
            });
        });
        
        // Close modal
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Amount button functionality
        const amountBtns = modal.querySelectorAll('.amount-btn');
        const customAmountInput = modal.querySelector('#custom-amount');
        
        amountBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                amountBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                if (customAmountInput) {
                    customAmountInput.value = '';
                }
            });
        });
        
        if (customAmountInput) {
            customAmountInput.addEventListener('input', function() {
                if (this.value) {
                    amountBtns.forEach(b => b.classList.remove('active'));
                }
            });
        }
    }
}

function openDonationModal(amount) {
    const modal = document.getElementById('donation-modal');
    const amountBtns = modal.querySelectorAll('.amount-btn');
    
    // Set selected amount
    amountBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-amount') === amount) {
            btn.classList.add('active');
        }
    });
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('donation-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Fundraising Page Functionality
function initializeFundraising() {
    // Animate progress bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const targetWidth = progressFill.style.width;
        progressFill.style.width = '0%';
        
        setTimeout(() => {
            progressFill.style.width = targetWidth;
        }, 1000);
    }
    
    // Animate statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        animateNumber(stat);
    });
}

function animateNumber(element) {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isDollar = target.includes('$');
    const numericValue = parseInt(target.replace(/[^\d]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    let current = 0;
    const increment = numericValue / 50;
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current).toString();
        if (isDollar) displayValue = '$' + displayValue.toLocaleString();
        if (isPercentage) displayValue += '%';
        
        element.textContent = displayValue;
    }, 50);
}

// Calendar Integration
function initializeCalendar() {
    const calendarBtn = document.getElementById('calendar-scheduler');
    const calendarModal = document.getElementById('calendar-modal');
    const closeCalendarBtn = document.getElementById('close-calendar');
    let calendar = null;
    
    if (calendarBtn && calendarModal) {
        // Open calendar modal
        calendarBtn.addEventListener('click', function() {
            calendarModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Initialize calendar if not already done
            if (!calendar) {
                calendar = new CannaBizCalendar('consultation-calendar');
            }
        });
        
        // Close calendar modal
        if (closeCalendarBtn) {
            closeCalendarBtn.addEventListener('click', closeCalendarModal);
        }
        
        // Close modal when clicking outside
        calendarModal.addEventListener('click', function(e) {
            if (e.target === calendarModal) {
                closeCalendarModal();
            }
        });
        
        // Listen for consultation booking events
        document.addEventListener('consultationBooked', function(e) {
            const booking = e.detail;
            
            // Auto-fill contact form with selected date/time
            const contactForm = document.getElementById('consultation-form');
            if (contactForm) {
                const messageField = contactForm.querySelector('#message');
                if (messageField) {
                    const currentMessage = messageField.value;
                    const schedulingInfo = `\n\nPreferred consultation time: ${booking.date.toLocaleDateString()} at ${booking.time}`;
                    messageField.value = currentMessage + schedulingInfo;
                }
            }
            
            closeCalendarModal();
            showNotification('Consultation time selected! Please complete the form below.', 'success');
        });
    }
    
    function closeCalendarModal() {
        calendarModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Animation Utilities
function initializeAnimations() {
    // Parallax effect for hero images
    const heroImages = document.querySelectorAll('.hero-bg-img, .header-bg-img');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        heroImages.forEach(img => {
            const rate = scrolled * -0.5;
            img.style.transform = `translateY(${rate}px)`;
        });
    });
    
    // Hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Utility Functions
function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    const colors = {
        success: 'hsl(120, 40%, 50%)',
        error: 'hsl(5, 70%, 55%)',
        warning: 'hsl(45, 85%, 60%)',
        info: 'hsl(210, 100%, 60%)'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    notification.textContent = message;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // In production, you might want to send this to an error reporting service
});

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-dependent functions can be called here
}, 16)); // ~60fps

// Accessibility Enhancements
document.addEventListener('keydown', function(e) {
    // Escape key to close modals
    if (e.key === 'Escape') {
        closeModal();
        closeSuccessMessage();
    }
    
    // Tab navigation improvements
    if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        // Add focus indicators
        focusableElements.forEach(el => {
            el.addEventListener('focus', function() {
                this.style.outline = '2px solid hsl(120, 25%, 35%)';
                this.style.outlineOffset = '2px';
            });
            
            el.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        });
    }
});

// Preload critical images
function preloadImages() {
    const images = [
        'https://pixabay.com/get/g18163e38789a16e20a0217a135e618da253be79aeec742116a79d25185332bf0f8a43dc4c8d088ff6759eb7a6a514be7cd18040c0443a9e57189907abba3ac3e_1280.jpg',
        'https://pixabay.com/get/ga5b01816e87b3b77b9834373b6adf03bbbd627254359f3221aaa9c30bc859ec6a7733ab351930f48b951eefa871c1cdbb5f71826d9166beecaa34298774bdd87_1280.jpg'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading when page loads
window.addEventListener('load', preloadImages);

// Service Worker Registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker would be registered here for offline functionality
        console.log('Service Worker support detected');
    });
}

// Analytics and Tracking (placeholder for future implementation)
function trackEvent(category, action, label) {
    // Google Analytics or other tracking service would be implemented here
    console.log('Event tracked:', { category, action, label });
}

// Track form submissions
document.addEventListener('submit', function(e) {
    const form = e.target;
    const formId = form.id || 'unknown-form';
    trackEvent('Form', 'Submit', formId);
});

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        const buttonText = e.target.textContent.trim();
        trackEvent('Button', 'Click', buttonText);
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        validatePhone,
        showNotification,
        debounce,
        throttle
    };
}
