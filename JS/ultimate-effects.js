/* ============================================================
   ULTIMATE EFFECTS - تأثيرات متقدمة ورائدة
   من Shaders.com, Codrops, و UI-UX-Pro-Max
   ============================================================ */

// Advanced Particle System with Physics
class UltimateParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 200 };
        this.connections = [];
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        const numberOfParticles = Math.min((this.canvas.width * this.canvas.height) / 8000, 200);
        
        for (let i = 0; i < numberOfParticles; i++) {
            const size = Math.random() * 4 + 1;
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const directionX = (Math.random() - 0.5) * 2;
            const directionY = (Math.random() - 0.5) * 2;
            const color = this.getRandomNeonColor();
            
            this.particles.push({
                x, y, directionX, directionY, size, color,
                originalX: x,
                originalY: y,
                velocity: { x: 0, y: 0 },
                mass: Math.random() * 2 + 1
            });
        }
    }
    
    getRandomNeonColor() {
        const colors = [
            'rgba(255, 215, 0, 0.9)',   // Gold
            'rgba(255, 107, 53, 0.9)',  // Orange
            'rgba(155, 89, 182, 0.9)',  // Purple
            'rgba(52, 152, 219, 0.9)',  // Blue
            'rgba(233, 30, 99, 0.9)',   // Pink
            'rgba(255, 255, 255, 0.8)'  // White
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections first
        this.drawConnections();
        
        // Draw particles
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            // Apply physics
            this.applyPhysics(p);
            
            // Draw particle with glow
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = p.color;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }
    }
    
    applyPhysics(particle) {
        // Mouse attraction/repulsion
        if (this.mouse.x) {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.mouse.radius) {
                const force = (this.mouse.radius - distance) / this.mouse.radius;
                const angle = Math.atan2(dy, dx);
                
                // Repulsion force
                particle.velocity.x -= Math.cos(angle) * force * 2 / particle.mass;
                particle.velocity.y -= Math.sin(angle) * force * 2 / particle.mass;
            }
        }
        
        // Return to original position (spring force)
        const dx = particle.originalX - particle.x;
        const dy = particle.originalY - particle.y;
        particle.velocity.x += dx * 0.01;
        particle.velocity.y += dy * 0.01;
        
        // Apply velocity with damping
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        particle.velocity.x *= 0.95;
        particle.velocity.y *= 0.95;
        
        // Boundary check
        if (particle.x > this.canvas.width || particle.x < 0) {
            particle.directionX = -particle.directionX;
        }
        if (particle.y > this.canvas.height || particle.y < 0) {
            particle.directionY = -particle.directionY;
        }
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];
                
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = 1 - (distance / 150);
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(255, 215, 0, ${opacity * 0.3})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Holographic Effect for Cards
class HolographicEffect {
    constructor(card) {
        this.card = card;
        this.hologramLayer = document.createElement('div');
        this.hologramLayer.className = 'card-hologram';
        this.card.appendChild(this.hologramLayer);
        
        this.init();
    }
    
    init() {
        this.card.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.card.addEventListener('mouseleave', () => this.handleMouseLeave());
    }
    
    handleMouseMove(e) {
        const rect = this.card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((centerX - x) / centerX) * 10;
        
        this.card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    }
    
    handleMouseLeave() {
        this.card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
}

// Advanced 3D Tilt with Gyroscope
class GyroscopicTilt {
    constructor(element) {
        this.element = element;
        this.init();
    }
    
    init() {
        this.element.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.element.addEventListener('mouseleave', () => this.reset());
        
        // Device orientation for mobile
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (e) => this.handleOrientation(e));
        }
    }
    
    handleMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;
        
        this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }
    
    handleOrientation(e) {
        const rotateX = e.gamma * -0.5; // -90 to 90
        const rotateY = e.beta * -0.5;  // -180 to 180
        
        this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    
    reset() {
        this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
}

// Morphing Shapes Background
class MorphingShapes {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.shapes = [];
        
        this.resize();
        this.initShapes();
        this.animate();
        
        window.addEventListener('resize', () => {
            this.resize();
            this.initShapes();
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    initShapes() {
        this.shapes = [];
        const colors = ['#FFD700', '#FF6B35', '#9B59B6', '#3498DB', '#E91E63'];
        
        for (let i = 0; i < 8; i++) {
            this.shapes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 200 + 100,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                phase: Math.random() * Math.PI * 2,
                morphSpeed: Math.random() * 0.02 + 0.01
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const time = performance.now() * 0.001;
        
        this.shapes.forEach(shape => {
            // Update position
            shape.x += shape.vx;
            shape.y += shape.vy;
            
            // Bounce off edges
            if (shape.x < -shape.radius) shape.x = this.canvas.width + shape.radius;
            if (shape.x > this.canvas.width + shape.radius) shape.x = -shape.radius;
            if (shape.y < -shape.radius) shape.y = this.canvas.height + shape.radius;
            if (shape.y > this.canvas.height + shape.radius) shape.y = -shape.radius;
            
            // Morph shape
            const morphRadius = shape.radius + Math.sin(time * 2 + shape.phase) * 50;
            const sides = Math.floor(6 + Math.sin(time + shape.phase) * 2);
            
            // Draw morphing shape
            this.ctx.beginPath();
            for (let i = 0; i <= sides; i++) {
                const angle = (i / sides) * Math.PI * 2;
                const r = morphRadius + Math.sin(angle * 3 + time * 3) * 20;
                const x = shape.x + Math.cos(angle) * r;
                const y = shape.y + Math.sin(angle) * r;
                
                if (i === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.closePath();
            
            this.ctx.fillStyle = shape.color + '20';
            this.ctx.fill();
            this.ctx.strokeStyle = shape.color + '40';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Magnetic Navigation
class MagneticNav {
    constructor(nav) {
        this.nav = nav;
        this.links = nav.querySelectorAll('.nav-link-ultimate');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('mouseenter', (e) => this.handleMouseEnter(e, link));
            link.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, link));
            link.addEventListener('mousemove', (e) => this.handleMouseMove(e, link));
        });
    }
    
    handleMouseEnter(e, link) {
        link.style.transition = 'none';
    }
    
    handleMouseLeave(e, link) {
        link.style.transition = 'all 0.4s ease';
        link.style.transform = 'translate(0, 0)';
    }
    
    handleMouseMove(e, link) {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }
}

// Glitch Text Effect
class UltimateGlitch {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.init();
    }
    
    init() {
        this.element.addEventListener('mouseenter', () => this.glitch());
    }
    
    glitch() {
        let iterations = 0;
        const interval = setInterval(() => {
            this.element.textContent = this.originalText
                .split('')
                .map((letter, index) => {
                    if (index < iterations) {
                        return this.originalText[index];
                    }
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                })
                .join('');
            
            if (iterations >= this.originalText.length) {
                clearInterval(interval);
            }
            
            iterations += 1 / 2;
        }, 30);
    }
}

// Scroll Progress Indicator
class ScrollProgress {
    constructor() {
        this.progressBar = document.createElement('div');
        this.progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #FFD700, #FF6B35, #9B59B6);
            z-index: 99999;
            transition: width 0.1s ease;
            width: 0%;
        `;
        document.body.appendChild(this.progressBar);
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.updateProgress());
    }
    
    updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        
        this.progressBar.style.width = `${progress}%`;
    }
}

// Parallax Depth Effect
class ParallaxDepth {
    constructor() {
        this.elements = document.querySelectorAll('[data-depth]');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        this.elements.forEach(element => {
            const depth = parseFloat(element.dataset.depth) || 0.5;
            const yPos = -(scrollY * depth);
            element.style.transform = `translateY(${yPos}px) translateZ(${depth * 100}px)`;
        });
    }
}

// Initialize Ultimate Effects
document.addEventListener('DOMContentLoaded', () => {
    // Ultimate Particle System
    const particleCanvas = document.getElementById('ultimate-particles');
    if (particleCanvas) {
        new UltimateParticleSystem(particleCanvas);
    }
    
    // Holographic Effects for cards
    document.querySelectorAll('.card-ultimate').forEach(card => {
        new HolographicEffect(card);
    });
    
    // Gyroscopic Tilt
    document.querySelectorAll('[data-gyro]').forEach(element => {
        new GyroscopicTilt(element);
    });
    
    // Morphing Shapes
    const morphCanvas = document.getElementById('morph-shapes');
    if (morphCanvas) {
        new MorphingShapes(morphCanvas);
    }
    
    // Magnetic Navigation
    const nav = document.querySelector('.nav-ultimate');
    if (nav) {
        new MagneticNav(nav);
    }
    
    // Glitch Text
    document.querySelectorAll('.section-title-ultimate, .hero-title-ultimate').forEach(title => {
        new UltimateGlitch(title);
    });
    
    // Scroll Progress
    new ScrollProgress();
    
    // Parallax Depth
    new ParallaxDepth();
    
    // Loading Screen
    const loadingScreen = document.querySelector('.loading-ultimate');
    if (loadingScreen) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 2000);
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.nav-ultimate');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
});

// Export for use in other files
window.UltimateEffects = {
    UltimateParticleSystem,
    HolographicEffect,
    GyroscopicTilt,
    MorphingShapes,
    MagneticNav,
    UltimateGlitch,
    ScrollProgress,
    ParallaxDepth
};