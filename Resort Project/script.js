// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu?.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Enhanced mobile menu animation
hamburger?.addEventListener('click', () => {
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        bar.style.transform = hamburger.classList.contains('active') 
            ? `rotate(${index === 1 ? 0 : index === 0 ? 45 : -45}deg) translate(${index === 1 ? '0' : index === 0 ? '6px, 6px' : '-6px, -6px'})`
            : 'none';
    });
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced navbar scroll effects
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.backdropFilter = 'blur(40px)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.85)';
        navbar.style.backdropFilter = 'blur(30px)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Enhanced parallax effects
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-background');
    const pageHeader = document.querySelector('.page-header-background, .page-header-background-contact');
    const ctaBackground = document.querySelector('.cta-background');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    if (pageHeader) {
        pageHeader.style.transform = `translateY(${rate * 0.5}px)`;
    }
    
    if (ctaBackground) {
        ctaBackground.style.transform = `translateY(${rate * 0.7}px)`;
    }
});

// Enhanced Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Enhanced scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.glass-card, .feature-card, .gallery-item, .room-card, .contact-item, .stat');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
    
    // Stagger animation for grid items
    const gridItems = document.querySelectorAll('.features-grid .feature-card, .gallery-grid .gallery-item, .rooms-grid .room-card');
    gridItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
});

// Enhanced contact form handling
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Basic validation
    if (!data.firstName || !data.lastName || !data.email || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.innerHTML = '<span style="display: inline-block; animation: spin 1s linear infinite;">⟳</span> Sending...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    
    setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
    }, 2500);
});

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</div>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10B981, #059669)' : 
                    type === 'error' ? 'linear-gradient(135deg, #EF4444, #DC2626)' : 
                    'linear-gradient(135deg, #FF6B6B, #4ECDC4)'};
        color: white;
        padding: 1.25rem 1.75rem;
        border-radius: 16px;
        box-shadow: 0 15px 40px rgba(0,0,0,0.3);
        z-index: 10000;
        max-width: 450px;
        transform: translateX(500px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(25px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        gap: 1.25rem;
    `;
    
    const icon = notification.querySelector('.notification-icon');
    icon.style.cssText = `
        font-size: 1.25rem;
        font-weight: bold;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    `;
    const notificationMessage = notification.querySelector('.notification-message');
    notificationMessage.style.cssText = `
        flex: 1;
        font-weight: 500;
        font-size: 1.05rem;
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.75rem;
        cursor: pointer;
        padding: 0;
        width: 28px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
        flex-shrink: 0;
    `;
    
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.backgroundColor = 'rgba(255,255,255,0.25)';
        closeButton.style.transform = 'scale(1.1)';
    });
    
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.backgroundColor = 'transparent';
        closeButton.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 6 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 6000);
    
    // Manual close
    closeButton.addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(500px) scale(0.9)';
    notification.style.opacity = '0';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 400);
}

// Enhanced button click effects with ripple
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
        `;
        
        // Add CSS for ripple animation
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                .btn { position: relative; overflow: hidden; }
                @keyframes ripple-animation {
                    to {
                        transform: scale(5);
                        opacity: 0;
                    }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        this.appendChild(ripple);
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 800);
    });
});

// Enhanced gallery lightbox effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-overlay h4')?.textContent || 'Gallery Image';
        
        if (img) {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <div class="lightbox-title">${title}</div>
                    <button class="lightbox-close">&times;</button>
                </div>
                <div class="lightbox-backdrop"></div>
            `;
            
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            `;
            
            const backdrop = lightbox.querySelector('.lightbox-backdrop');
            backdrop.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(10px);
            `;
            
            const content = lightbox.querySelector('.lightbox-content');
            content.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
                z-index: 1;
                transform: scale(0.8);
                transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            `;
            
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.style.cssText = `
                max-width: 100%;
                max-height: 100%;
                border-radius: 20px;
                box-shadow: 0 25px 80px rgba(0,0,0,0.6);
            `;
            
            const title = lightbox.querySelector('.lightbox-title');
            title.style.cssText = `
                position: absolute;
                bottom: -60px;
                left: 50%;
                transform: translateX(-50%);
                color: white;
                font-size: 1.5rem;
                font-weight: 600;
                text-align: center;
                background: rgba(0, 0, 0, 0.7);
                padding: 1rem 2rem;
                border-radius: 12px;
                backdrop-filter: blur(10px);
            `;
            
            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.style.cssText = `
                position: absolute;
                top: -50px;
                right: -50px;
                background: rgba(255,255,255,0.15);
                border: none;
                color: white;
                font-size: 2.5rem;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            `;
            
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.background = 'rgba(255, 107, 107, 0.8)';
                closeBtn.style.transform = 'scale(1.1)';
            });
            
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.background = 'rgba(255,255,255,0.15)';
                closeBtn.style.transform = 'scale(1)';
            });
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Fade in
            setTimeout(() => {
                lightbox.style.opacity = '1';
                content.style.transform = 'scale(1)';
            }, 10);
            
            // Close functionality
            const closeLightbox = () => {
                lightbox.style.opacity = '0';
                content.style.transform = 'scale(0.8)';
                document.body.style.overflow = 'auto';
                setTimeout(() => {
                    if (document.body.contains(lightbox)) {
                        document.body.removeChild(lightbox);
                    }
                }, 400);
            };
            
            closeBtn.addEventListener('click', closeLightbox);
            backdrop.addEventListener('click', closeLightbox);
            
            // Close with Escape key
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    closeLightbox();
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);
        }
    });
});

// Enhanced hover effects for cards
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.25)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.15)';
    });
});

// Floating elements animation
document.addEventListener('DOMContentLoaded', () => {
    const floatingElements = document.querySelectorAll('.feature-icon, .service-icon, .contact-icon');
    
    floatingElements.forEach((element, index) => {
        element.style.animation = \`float 3s ease-in-out infinite`;
        }
        element.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Add floating animation CSS
    if (!document.querySelector('#floating-styles')) {
        const style = document.createElement('style');
        style.id = 'floating-styles';
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
});

// Enhanced scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #FF6B6B, #4ECDC4);
        z-index: 10001;
        transition: width 0.1s ease;
        box-shadow: 0 2px 10px rgba(255, 107, 107, 0.3);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

createScrollProgress();

// Enhanced form interactions
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 0 0 4px rgba(255, 107, 107, 0.15)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
    
    // Add floating label effect
    if (input.type !== 'submit' && input.tagName !== 'SELECT') {
        input.addEventListener('input', function() {
            const label = this.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                if (this.value) {
                    label.style.transform = 'translateY(-25px) scale(0.85)';
                    label.style.color = '#FF6B6B';
                } else {
                    label.style.transform = 'translateY(0) scale(1)';
                    label.style.color = '';
                }
            }
        });
    }
});

// Smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
    // Page load animation
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    document.body.style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
});

// Enhanced navigation link transitions
document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hostname === window.location.hostname) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            // Page transition out
            document.body.style.opacity = '0';
            document.body.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        }
    });
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Date picker enhancement for contact form
const checkInDate = document.getElementById('checkIn');
const checkOutDate = document.getElementById('checkOut');

if (checkInDate && checkOutDate) {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    checkInDate.min = today;
    checkOutDate.min = today;
    
    checkInDate.addEventListener('change', () => {
        if (checkInDate.value) {
            checkOutDate.min = checkInDate.value;
            if (checkOutDate.value && checkOutDate.value <= checkInDate.value) {
                checkOutDate.value = '';
            }
        }
    });
}

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-color), #B8860B);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'scale(1)';
        scrollToTopBtn.style.pointerEvents = 'auto';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'scale(0.5)';
        scrollToTopBtn.style.pointerEvents = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'scale(1.1)';
    scrollToTopBtn.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.4)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'scale(1)';
    scrollToTopBtn.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
});

console.log('Azure Shores Resort - Enhanced luxury website loaded successfully! ✨🏖️');