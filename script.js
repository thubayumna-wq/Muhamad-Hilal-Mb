// ==================== DOM ELEMENTS ====================
const scrollProgress = document.querySelector('.scroll-progress');
const ctaButtons = document.querySelectorAll('.cta-button');
const skillCards = document.querySelectorAll('.skill-card');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// ==================== SCROLL PROGRESS BAR ====================
function updateScrollProgress() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ==================== REVEAL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            
            // Animate progress bars when visible
            if (entry.target.classList.contains('skill-card')) {
                const progressFill = entry.target.querySelector('.progress-fill');
                if (progressFill && !progressFill.style.width) {
                    const targetWidth = progressFill.parentElement.nextElementSibling.textContent;
                    progressFill.style.width = targetWidth;
                }
            }
        }
    });
}, observerOptions);

// Observe all cards and items
[...skillCards, ...portfolioItems].forEach(item => {
    observer.observe(item);
});

// ==================== CTA BUTTON INTERACTIONS ====================
ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ==================== SMOOTH SCROLL ====================
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

// ==================== MOBILE NAVIGATION ====================
function setupMobileNav() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Check if we need mobile menu (optional enhancement)
    if (window.innerWidth <= 768) {
        // Add mobile menu logic here if needed
    }
}

setupMobileNav();

// ==================== ANIMATIONS ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .reveal {
        animation: revealAnimation 0.8s ease-out forwards;
    }

    @keyframes revealAnimation {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ==================== PERFORMANCE MONITORING ====================
window.addEventListener('load', () => {
    console.log('Portfolio loaded successfully!');
    
    // Optional: Add performance metrics
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    }
});

// ==================== PREVENT LAYOUT SHIFT ====================
document.addEventListener('DOMContentLoaded', () => {
    // Ensure smooth rendering
    document.documentElement.style.scrollBehavior = 'smooth';
});
