/* ============================================================
   PREMIUM EFFECTS JAVASCRIPT - تأثيرات متقدمة
   من Codrops, Shaders.com, و CSSScript
   ============================================================ */

// ============================================================
// ON-SCROLL SHAPE MORPH ANIMATIONS (Codrops style)
// ============================================================

class RafeeqMorphAnimation {
    constructor() {
        this.morphElements = document.querySelectorAll('.rafeeq-morph-shape');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });
        
        this.morphElements.forEach(el => observer.observe(el));
    }
}

// ============================================================
// 3D IMAGE ROTATIONS ON SCROLL (Codrops style)
// ============================================================

class Rafeeq3DRotation {
    constructor() {
        this.containers = document.querySelectorAll('.rafeeq-3d-rotate-container');
        this.init();
    }
    
    init() {
        this.containers.forEach(container => {
            const element = container.querySelector('.rafeeq-3d-rotate-element');
            if (!element) return;
            
            container.addEventListener('mousemove', (e) => {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                
                element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });
            
            container.addEventListener('mouseleave', () => {
                element.style.transform = 'rotateX(0) rotateY(0) scale(1)';
            });
        });
    }
}

// ============================================================
// SCROLL-DRIVEN ANIMATIONS (Codrops style)
// ============================================================

class RafeeqScrollAnimations {
    constructor() {
        this.scrollElements = document.querySelectorAll('.rafeeq-scroll-animate, .rafeeq-scroll-animate-left, .rafeeq-scroll-animate-right, .rafeeq-scroll-animate-scale');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        this.scrollElements.forEach(el => observer.observe(el));
    }
}

// ============================================================
// ADVANCED PARTICLE SYSTEM (CSSScript style)
// ============================================================

class RafeeqParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.maxParticles = 50;
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.createParticle();
        }
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'rafeeq-particle';
        
        const size = Math.random() * 4 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 4 + 4;
        const delay = Math.random() * 2;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            background: rgba(245, 158, 11, ${Math.random() * 0.5 + 0.3});
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }
}

// ============================================================
// SPOTLIGHT EFFECT (Shadcn style)
// ============================================================

class RafeeqSpotlight {
    constructor() {
        this.spotlights = document.querySelectorAll('.rafeeq-spotlight');
        this.init();
    }
    
    init() {
        this.spotlights.forEach(spotlight => {
            spotlight.addEventListener('mousemove', (e) => {
                const rect = spotlight.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                spotlight.style.setProperty('--spotlight-x', `${x}px`);
                spotlight.style.setProperty('--spotlight-y', `${y}px`);
            });
        });
    }
}

// ============================================================
// MAGNETIC EFFECT (Shadcn style)
// ============================================================

class RafeeqMagnetic {
    constructor() {
        this.magneticElements = document.querySelectorAll('.rafeeq-magnetic');
        this.init();
    }
    
    init() {
        this.magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }
}

// ============================================================
// CUSTOM CURSOR (Codrops style)
// ============================================================

class RafeeqCustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'rafeeq-custom-cursor';
        this.targetX = 0;
        this.targetY = 0;
        this.currentX = 0;
        this.currentY = 0;
        
        this.init();
    }
    
    init() {
        document.body.appendChild(this.cursor);
        
        document.addEventListener('mousemove', (e) => {
            this.targetX = e.clientX;
            this.targetY = e.clientY;
        });
        
        this.animate();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .rafeeq-card-interactive');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
        });
    }
    
    animate() {
        this.currentX += (this.targetX - this.currentX) * 0.1;
        this.currentY += (this.targetY - this.currentY) * 0.1;
        
        this.cursor.style.left = `${this.currentX - 10}px`;
        this.cursor.style.top = `${this.currentY - 10}px`;
        
        requestAnimationFrame(() => this.animate());
    }
}

// ============================================================
// TEXT WAVE ANIMATION (Codrops style)
// ============================================================

class RafeeqTextWave {
    constructor() {
        this.textWaves = document.querySelectorAll('.rafeeq-text-wave');
        this.init();
    }
    
    init() {
        this.textWaves.forEach(textWave => {
            const text = textWave.textContent;
            textWave.innerHTML = '';
            
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                textWave.appendChild(span);
            });
        });
    }
}

// ============================================================
// DUAL WAVE TEXT ANIMATION (Codrops style)
// ============================================================

class RafeeqDualWave {
    constructor() {
        this.dualWaves = document.querySelectorAll('.rafeeq-dual-wave');
        this.init();
    }
    
    init() {
        this.dualWaves.forEach(dualWave => {
            const text = dualWave.querySelector('.rafeeq-dual-wave-text');
            if (text) {
                text.setAttribute('data-text', text.textContent);
            }
        });
    }
}

// ============================================================
// ELASTIC GRID SCROLL (Codrops style)
// ============================================================

class RafeeqElasticGrid {
    constructor() {
        this.grids = document.querySelectorAll('.rafeeq-elastic-grid');
        this.init();
    }
    
    init() {
        this.grids.forEach(grid => {
            let isHovering = false;
            
            grid.addEventListener('mouseenter', () => {
                isHovering = true;
            });
            
            grid.addEventListener('mouseleave', () => {
                isHovering = false;
            });
            
            // Smooth expansion/contraction
            const updateGrid = () => {
                if (isHovering) {
                    grid.style.gap = 'var(--rafeeq-space-8)';
                } else {
                    grid.style.gap = 'var(--rafeeq-space-6)';
                }
                requestAnimationFrame(updateGrid);
            };
            
            updateGrid();
        });
    }
}

// ============================================================
// GLITCH EFFECT (Codrops style)
// ============================================================

class RafeeqGlitch {
    constructor() {
        this.glitchElements = document.querySelectorAll('.rafeeq-glitch');
        this.init();
    }
    
    init() {
        this.glitchElements.forEach(glitch => {
            const text = glitch.textContent;
            glitch.setAttribute('data-text', text);
            
            glitch.addEventListener('mouseenter', () => {
                glitch.classList.add('active');
            });
            
            glitch.addEventListener('mouseleave', () => {
                glitch.classList.remove('active');
            });
        });
    }
}

// ============================================================
// INTERACTIVE GLASS PANEL (Codrops style)
// ============================================================

class RafeeqGlassPanel {
    constructor() {
        this.panels = document.querySelectorAll('.rafeeq-glass-panel');
        this.init();
    }
    
    init() {
        this.panels.forEach(panel => {
            panel.addEventListener('mousemove', (e) => {
                const rect = panel.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                panel.style.background = `
                    radial-gradient(
                        circle at ${x}% ${y}%,
                        rgba(255, 255, 255, 0.15),
                        rgba(255, 255, 255, 0.05)
                    )
                `;
            });
            
            panel.addEventListener('mouseleave', () => {
                panel.style.background = 'rgba(255, 255, 255, 0.1)';
            });
        });
    }
}

// ============================================================
// NOISE OVERLAY (Texture effect)
// ============================================================

class RafeeqNoiseOverlay {
    constructor() {
        this.createNoiseOverlay();
    }
    
    createNoiseOverlay() {
        const noise = document.createElement('div');
        noise.className = 'rafeeq-noise-overlay';
        document.body.appendChild(noise);
    }
}

// ============================================================
// SMOOTH SCROLL (Codrops style)
// ============================================================

class RafeeqSmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
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
    }
}

// ============================================================
// PARALLAX EFFECT (Codrops style)
// ============================================================

class RafeeqParallax {
    constructor() {
        this.parallaxElements = document.querySelectorAll('[data-parallax]');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            this.parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all premium effects
    new RafeeqMorphAnimation();
    new Rafeeq3DRotation();
    new RafeeqScrollAnimations();
    new RafeeqSpotlight();
    new RafeeqMagnetic();
    new RafeeqTextWave();
    new RafeeqDualWave();
    new RafeeqElasticGrid();
    new RafeeqGlitch();
    new RafeeqGlassPanel();
    new RafeeqNoiseOverlay();
    new RafeeqSmoothScroll();
    new RafeeqParallax();
    
    // Initialize custom cursor (only on desktop)
    if (window.innerWidth > 768) {
        new RafeeqCustomCursor();
    }
    
    // Initialize particle systems for specific containers
    const particleContainers = document.querySelectorAll('.rafeeq-particle-container');
    particleContainers.forEach(container => {
        new RafeeqParticleSystem(container);
    });
});

// Export for use in other files
window.RafeeqEffects = {
    RafeeqMorphAnimation,
    Rafeeq3DRotation,
    RafeeqScrollAnimations,
    RafeeqParticleSystem,
    RafeeqSpotlight,
    RafeeqMagnetic,
    RafeeqCustomCursor,
    RafeeqTextWave,
    RafeeqDualWave,
    RafeeqElasticGrid,
    RafeeqGlitch,
    RafeeqGlassPanel,
    RafeeqNoiseOverlay,
    RafeeqSmoothScroll,
    RafeeqParallax
};