/*
 * Global Visual Effects JavaScript
 * Scroll reveal, magnetic effects, cursor follower, and interactive animations
 */

// ===== SCROLL REVEAL EFFECTS =====
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal-on-scroll');
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        this.observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            this.elements.forEach(el => this.observer.observe(el));
        } else {
            // Fallback for older browsers
            this.elements.forEach(el => el.classList.add('revealed'));
        }
    }
}

// ===== MAGNETIC EFFECTS =====
class MagneticEffect {
    constructor() {
        this.elements = document.querySelectorAll('.magnetic');
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            element.addEventListener('mousemove', (e) => this.handleMouseMove(e, element));
            element.addEventListener('mouseleave', () => this.handleMouseLeave(element));
        });
    }

    handleMouseMove(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        element.style.setProperty('--cursor-x', x + 'px');
        element.style.setProperty('--cursor-y', y + 'px');
        
        const moveX = (x - rect.width / 2) * 0.3;
        const moveY = (y - rect.height / 2) * 0.3;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    }

    handleMouseLeave(element) {
        element.style.transform = 'translate(0, 0) scale(1)';
    }
}

// ===== 3D TILT EFFECTS =====
class TiltEffect {
    constructor() {
        this.elements = document.querySelectorAll('.tilt-3d');
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            element.addEventListener('mousemove', (e) => this.handleMouseMove(e, element));
            element.addEventListener('mouseleave', () => this.handleMouseLeave(element));
        });
    }

    handleMouseMove(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.setProperty('--tilt-x', rotateX + 'deg');
        element.style.setProperty('--tilt-y', rotateY + 'deg');
    }

    handleMouseLeave(element) {
        element.style.setProperty('--tilt-x', '0deg');
        element.style.setProperty('--tilt-y', '0deg');
    }
}

// ===== CURSOR FOLLOWER =====
class CursorFollower {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor-follower';
        this.visible = false;
        this.init();
    }

    init() {
        // Don't show on touch devices
        if ('ontouchstart' in window) return;
        
        document.body.appendChild(this.cursor);
        
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mousedown', () => this.handleMouseDown());
        document.addEventListener('mouseup', () => this.handleMouseUp());
        
        // Add hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .card, .magnetic');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hovering'));
        });
    }

    handleMouseMove(e) {
        if (!this.visible) {
            this.visible = true;
            this.cursor.style.opacity = '1';
        }
        
        this.cursor.style.left = e.clientX + 'px';
        this.cursor.style.top = e.clientY + 'px';
    }

    handleMouseDown() {
        this.cursor.style.transform = 'scale(0.8)';
    }

    handleMouseUp() {
        this.cursor.style.transform = 'scale(1)';
    }
}

// ===== TEXT REVEAL ANIMATION =====
class TextReveal {
    constructor() {
        this.elements = document.querySelectorAll('.text-split-reveal');
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.animationDelay = `${index * 0.05}s`;
                element.appendChild(span);
            });
        });
    }
}

// ===== PARALLAX SCROLL =====
class ParallaxScroll {
    constructor() {
        this.elements = document.querySelectorAll('.parallax-element');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const scrollY = window.pageYOffset;
        
        this.elements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// ===== RIPPLE EFFECT =====
class RippleEffect {
    constructor() {
        this.elements = document.querySelectorAll('.ripple-button');
        this.init();
    }

    init() {
        this.elements.forEach(button => {
            button.addEventListener('click', (e) => this.createRipple(e, button));
        });
    }

    createRipple(e, button) {
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        const rect = button.getBoundingClientRect();
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }
}

// ===== WAVE EFFECT =====
class WaveEffect {
    constructor() {
        this.elements = document.querySelectorAll('.wave-effect');
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            element.addEventListener('click', () => this.createWave(element));
        });
    }

    createWave(element) {
        // Remove existing wave
        const existingWave = element.querySelector('.wave');
        if (existingWave) {
            existingWave.remove();
        }

        // Create new wave
        const wave = document.createElement('div');
        wave.className = 'wave';
        element.appendChild(wave);

        // Remove wave after animation
        setTimeout(() => wave.remove(), 1500);
    }
}

// ===== INITIALIZATION =====
function initGlobalEffects() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        // Initialize all effects
        new ScrollReveal();
        new MagneticEffect();
        new TiltEffect();
        new CursorFollower();
        new TextReveal();
        new ParallaxScroll();
        new RippleEffect();
        new WaveEffect();
    } else {
        // Add revealed class immediately for accessibility
        document.querySelectorAll('.reveal-on-scroll').forEach(el => {
            el.classList.add('revealed');
        });
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalEffects);
} else {
    initGlobalEffects();
}

// Export for manual initialization
window.globalEffects = {
    init: initGlobalEffects,
    ScrollReveal,
    MagneticEffect,
    TiltEffect,
    CursorFollower,
    TextReveal,
    ParallaxScroll,
    RippleEffect,
    WaveEffect
};