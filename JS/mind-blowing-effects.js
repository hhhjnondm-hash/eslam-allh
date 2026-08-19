/* ============================================================
   MIND-BLOWING EFFECTS JAVASCRIPT - تأثيرات مذهلة
   من Shaders.com, Codrops, و CSSScript المتقدمة
   ============================================================ */

// ============================================================
// WEBGL LIQUID DISTORTION (Shaders.com style)
// ============================================================

class RafeeqLiquidDistortion {
    constructor(container) {
        this.container = container;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.points = [];
        this.mouse = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        this.container.style.position = 'relative';
        this.container.style.overflow = 'hidden';
        
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        
        this.container.appendChild(this.canvas);
        
        this.resize();
        this.createPoints();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        this.container.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }
    
    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }
    
    createPoints() {
        this.points = [];
        const gridSize = 20;
        
        for (let x = 0; x <= this.canvas.width; x += gridSize) {
            for (let y = 0; y <= this.canvas.height; y += gridSize) {
                this.points.push({
                    x: x,
                    y: y,
                    originX: x,
                    originY: y,
                    vx: 0,
                    vy: 0
                });
            }
        }
    }
    
    handleMouseMove(e) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.points.forEach(point => {
            const dx = this.mouse.x - point.x;
            const dy = this.mouse.y - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                const angle = Math.atan2(dy, dx);
                
                point.vx -= Math.cos(angle) * force * 2;
                point.vy -= Math.sin(angle) * force * 2;
            }
            
            // Spring back to original position
            point.vx += (point.originX - point.x) * 0.05;
            point.vy += (point.originY - point.y) * 0.05;
            
            // Apply velocity with damping
            point.x += point.vx;
            point.y += point.vy;
            point.vx *= 0.9;
            point.vy *= 0.9;
            
            // Draw point
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(245, 158, 11, ${0.3 - distance / 200})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ============================================================
// PARTICLE BURST SYSTEM (CSSScript style)
// ============================================================

class RafeeqParticleBurst {
    constructor() {
        this.burstContainer = document.createElement('div');
        this.burstContainer.className = 'rafeeq-particle-burst';
        document.body.appendChild(this.burstContainer);
        
        this.init();
    }
    
    init() {
        document.addEventListener('click', (e) => this.createBurst(e.clientX, e.clientY));
    }
    
    createBurst(x, y) {
        const particleCount = 20;
        const colors = ['#f59e0b', '#22c55e', '#3b82f6', '#ec4899', '#8b5cf6'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'rafeeq-burst-particle';
            
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = Math.random() * 100 + 50;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                left: ${x}px;
                top: ${y}px;
                --tx: ${tx}px;
                --ty: ${ty}px;
            `;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0, 0, 0.2, 1)'
            });
            
            this.burstContainer.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        }
    }
}

// ============================================================
// MAGNETIC 3D CARDS (Shadcn + Codrops style)
// ============================================================

class RafeeqMagnetic3D {
    constructor() {
        this.cards = document.querySelectorAll('.rafeeq-magnetic-3d');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            const cardElement = card.querySelector('.rafeeq-magnetic-3d-card');
            if (!cardElement) return;
            
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, cardElement));
            card.addEventListener('mouseleave', () => this.handleMouseLeave(cardElement));
        });
    }
    
    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;
        
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
    }
    
    handleMouseLeave(card) {
        card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
    }
}

// ============================================================
// INTERACTIVE PARTICLES (CSSScript style)
// ============================================================

class RafeeqInteractiveParticles {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'rafeeq-interactive-particles';
        document.body.appendChild(this.container);
        
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.maxParticles = 100;
        
        this.init();
    }
    
    init() {
        this.createParticles();
        this.animate();
        
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        window.addEventListener('resize', () => this.resize());
    }
    
    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'rafeeq-particle';
            
            const size = Math.random() * 4 + 2;
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const color = `rgba(245, 158, 11, ${Math.random() * 0.5 + 0.2})`;
            
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: ${color};
            `;
            
            this.container.appendChild(particle);
            
            this.particles.push({
                element: particle,
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                originalX: x,
                originalY: y
            });
        }
    }
    
    resize() {
        this.particles.forEach(particle => {
            particle.x = Math.random() * window.innerWidth;
            particle.y = Math.random() * window.innerHeight;
            particle.originalX = particle.x;
            particle.originalY = particle.y;
        });
    }
    
    animate() {
        this.particles.forEach(particle => {
            // Mouse repulsion
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                const angle = Math.atan2(dy, dx);
                
                particle.vx -= Math.cos(angle) * force * 3;
                particle.vy -= Math.sin(angle) * force * 3;
            }
            
            // Return to original position
            particle.vx += (particle.originalX - particle.x) * 0.01;
            particle.vy += (particle.originalY - particle.y) * 0.01;
            
            // Apply velocity
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Damping
            particle.vx *= 0.95;
            particle.vy *= 0.95;
            
            // Update DOM
            particle.element.style.left = `${particle.x}px`;
            particle.element.style.top = `${particle.y}px`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ============================================================
// DNA HELIX ANIMATION (Codrops style)
// ============================================================

class RafeeqDNAHelix {
    constructor(container) {
        this.container = container;
        this.dots = [];
        this.init();
    }
    
    init() {
        const strand1 = document.createElement('div');
        strand1.className = 'rafeeq-dna-strand';
        
        const strand2 = document.createElement('div');
        strand2.className = 'rafeeq-dna-strand';
        
        const dotCount = 20;
        
        for (let i = 0; i < dotCount; i++) {
            const dot1 = document.createElement('div');
            dot1.className = 'rafeeq-dna-dot';
            dot1.style.top = `${(i / dotCount) * 100}%`;
            dot1.style.animationDelay = `${i * 0.2}s`;
            strand1.appendChild(dot1);
            
            const dot2 = document.createElement('div');
            dot2.className = 'rafeeq-dna-dot';
            dot2.style.top = `${(i / dotCount) * 100}%`;
            dot2.style.animationDelay = `${i * 0.2 + 2}s`;
            strand2.appendChild(dot2);
        }
        
        this.container.appendChild(strand1);
        this.container.appendChild(strand2);
    }
}

// ============================================================
// MATRIX RAIN EFFECT (CSSScript style)
// ============================================================

class RafeeqMatrixRain {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'rafeeq-matrix-bg';
        document.body.appendChild(this.container);
        
        this.columns = [];
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
        
        this.init();
    }
    
    init() {
        const columnCount = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < columnCount; i++) {
            const column = document.createElement('div');
            column.className = 'rafeeq-matrix-column';
            column.style.left = `${i * 20}px`;
            column.style.animationDelay = `${Math.random() * 5}s`;
            column.style.animationDuration = `${Math.random() * 5 + 5}s`;
            
            let text = '';
            for (let j = 0; j < 20; j++) {
                text += this.chars[Math.floor(Math.random() * this.chars.length)] + '<br>';
            }
            column.innerHTML = text;
            
            this.container.appendChild(column);
            this.columns.push(column);
        }
    }
}

// ============================================================
// INTERACTIVE WAVE BACKGROUND (Codrops style)
// ============================================================

class RafeeqWaveBackground {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'rafeeq-wave-bg';
        document.body.appendChild(this.container);
        
        this.init();
    }
    
    init() {
        for (let i = 0; i < 3; i++) {
            const wave = document.createElement('div');
            wave.className = 'rafeeq-wave';
            this.container.appendChild(wave);
        }
    }
}

// ============================================================
// GLOWING ORB EFFECT (Shaders.com style)
// ============================================================

class RafeeqGlowingOrb {
    constructor(container) {
        this.container = container;
        this.init();
    }
    
    init() {
        const orb = document.createElement('div');
        orb.className = 'rafeeq-glowing-orb';
        this.container.appendChild(orb);
    }
}

// ============================================================
// CARD STACK EFFECT (Codrops style)
// ============================================================

class RafeeqCardStack {
    constructor(container) {
        this.container = container;
        this.init();
    }
    
    init() {
        this.container.className = 'rafeeq-card-stack';
        
        const cards = this.container.querySelectorAll('.rafeeq-stacked-card');
        cards.forEach((card, index) => {
            card.style.zIndex = cards.length - index;
        });
    }
}

// ============================================================
// SKROLL-TRIGGERED ANIMATIONS (Codrops style)
// ============================================================

class RafeeqScrollTrigger {
    constructor() {
        this.elements = document.querySelectorAll('[data-scroll-trigger]');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const trigger = entry.target.dataset.scrollTrigger;
                    entry.target.classList.add(trigger);
                }
            });
        }, { threshold: 0.3 });
        
        this.elements.forEach(el => observer.observe(el));
    }
}

// ============================================================
// PARALLAX MOUSE EFFECT (Codrops style)
// ============================================================

class RafeeqParallaxMouse {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax-mouse]');
        this.init();
    }
    
    init() {
        this.elements.forEach(element => {
            const depth = parseFloat(element.dataset.parallaxMouse) || 0.5;
            
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * depth;
                const y = (e.clientY - rect.top - rect.height / 2) * depth;
                
                element.style.transform = `translate(${x}px, ${y}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// ============================================================
// HOLOGRAPHIC TEXT EFFECT (Shaders.com style)
// ============================================================

class RafeeqHolographicText {
    constructor() {
        this.elements = document.querySelectorAll('.rafeeq-holographic');
        this.init();
    }
    
    init() {
        this.elements.forEach(element => {
            const text = element.textContent;
            element.setAttribute('data-text', text);
        });
    }
}

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all mind-blowing effects
    new RafeeqParticleBurst();
    new RafeeqMagnetic3D();
    new RafeeqInteractiveParticles();
    new RafeeqWaveBackground();
    new RafeeqScrollTrigger();
    new RafeeqParallaxMouse();
    new RafeeqHolographicText();
    
    // Initialize liquid distortion for specific containers
    const liquidContainers = document.querySelectorAll('.rafeeq-liquid-distortion');
    liquidContainers.forEach(container => {
        new RafeeqLiquidDistortion(container);
    });
    
    // Initialize DNA helix for specific containers
    const dnaContainers = document.querySelectorAll('.rafeeq-dna-container');
    dnaContainers.forEach(container => {
        new RafeeqDNAHelix(container);
    });
    
    // Initialize glowing orbs for specific containers
    const orbContainers = document.querySelectorAll('.rafeeq-glowing-orb-container');
    orbContainers.forEach(container => {
        new RafeeqGlowingOrb(container);
    });
    
    // Initialize card stacks for specific containers
    const stackContainers = document.querySelectorAll('.rafeeq-card-stack-container');
    stackContainers.forEach(container => {
        new RafeeqCardStack(container);
    });
    
    // Initialize matrix rain (optional - comment out if too distracting)
    // new RafeeqMatrixRain();
});

// Export for use in other files
window.RafeeqMindBlowingEffects = {
    RafeeqLiquidDistortion,
    RafeeqParticleBurst,
    RafeeqMagnetic3D,
    RafeeqInteractiveParticles,
    RafeeqDNAHelix,
    RafeeqMatrixRain,
    RafeeqWaveBackground,
    RafeeqGlowingOrb,
    RafeeqCardStack,
    RafeeqScrollTrigger,
    RafeeqParallaxMouse,
    RafeeqHolographicText
};