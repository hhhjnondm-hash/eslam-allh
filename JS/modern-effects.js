/* ============================================================
   MODERN EFFECTS - PARTICLES & ANIMATIONS
   تأثيرات حركية متقدمة للموقع
   ============================================================ */

// Particle System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null, radius: 150 };
        
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
        const numberOfParticles = (this.canvas.width * this.canvas.height) / 9000;
        
        for (let i = 0; i < numberOfParticles; i++) {
            const size = Math.random() * 3 + 1;
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const directionX = (Math.random() * 2) - 1;
            const directionY = (Math.random() * 2) - 1;
            const color = this.getRandomColor();
            
            this.particles.push({
                x, y, directionX, directionY, size, color,
                originalX: x,
                originalY: y
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            'rgba(220, 156, 81, 0.8)',   // Gold
            'rgba(255, 215, 0, 0.6)',    // Light Gold
            'rgba(184, 134, 11, 0.7)',  // Dark Gold
            'rgba(255, 255, 255, 0.3)'   // White
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            // Mouse interaction
            if (this.mouse.x) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const directionX = forceDirectionX * force * 3;
                    const directionY = forceDirectionY * force * 3;
                    
                    p.x -= directionX;
                    p.y -= directionY;
                }
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
            
            // Connect particles
            this.connectParticles(i);
        }
    }
    
    connectParticles(index) {
        for (let j = index + 1; j < this.particles.length; j++) {
            const p1 = this.particles[index];
            const p2 = this.particles[j];
            
            const distance = Math.sqrt(
                (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2
            );
            
            if (distance < 120) {
                const opacity = 1 - (distance / 120);
                this.ctx.strokeStyle = `rgba(220, 156, 81, ${opacity * 0.5})`;
                this.ctx.lineWidth = 1;
                this.ctx.beginPath();
                this.ctx.moveTo(p1.x, p1.y);
                this.ctx.lineTo(p2.x, p2.y);
                this.ctx.stroke();
            }
        }
    }
    
    update() {
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            // Movement
            p.x += p.directionX;
            p.y += p.directionY;
            
            // Boundary check
            if (p.x > this.canvas.width || p.x < 0) {
                p.directionX = -p.directionX;
            }
            if (p.y > this.canvas.height || p.y < 0) {
                p.directionY = -p.directionY;
            }
            
            // Return to original position slowly
            const dx = p.originalX - p.x;
            const dy = p.originalY - p.y;
            p.x += dx * 0.01;
            p.y += dy * 0.01;
        }
    }
    
    animate() {
        this.draw();
        this.update();
        requestAnimationFrame(() => this.animate());
    }
}

// Scroll Reveal Animation
class ModernScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        this.init();
    }
    
    init() {
        this.checkScroll();
        window.addEventListener('scroll', () => this.checkScroll());
    }
    
    checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    }
}

// Magnetic Effect for Buttons
class ModernMagneticEffect {
    constructor() {
        this.elements = document.querySelectorAll('.magnetic');
        this.init();
    }
    
    init() {
        this.elements.forEach(element => {
            element.addEventListener('mousemove', (e) => this.handleMouseMove(e, element));
            element.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, element));
        });
    }
    
    handleMouseMove(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }
    
    handleMouseLeave(e, element) {
        element.style.transform = 'translate(0, 0)';
    }
}

// Parallax Effect
class ModernParallaxEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        this.elements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Smooth Scroll
class ModernSmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => this.handleClick(e, link));
        });
    }
    
    handleClick(e, link) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Typing Effect
class ModernTypingEffect {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.init();
    }
    
    init() {
        this.type();
    }
    
    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Counter Animation
class ModernCounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = target;
        this.duration = duration;
        this.startTime = null;
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.start();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(this.element);
    }
    
    start() {
        this.startTime = performance.now();
        this.animate();
    }
    
    animate(currentTime) {
        if (!this.startTime) this.startTime = currentTime;
        
        const elapsed = currentTime - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * this.target);
        
        this.element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame((time) => this.animate(time));
        } else {
            this.element.textContent = this.target;
        }
    }
}

// Glow Effect on Mouse Move
class ModernGlowEffect {
    constructor() {
        this.cards = document.querySelectorAll('.card-modern');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
            card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, card));
        });
    }
    
    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(220, 156, 81, 0.15), transparent 50%)`;
    }
    
    handleMouseLeave(e, card) {
        card.style.background = 'var(--bg-glass)';
    }
}

// 3D Tilt Effect
class ModernTiltEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-tilt]');
        this.init();
    }
    
    init() {
        this.elements.forEach(element => {
            element.addEventListener('mousemove', (e) => this.handleMouseMove(e, element));
            element.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, element));
        });
    }
    
    handleMouseMove(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }
    
    handleMouseLeave(e, element) {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
}

// Loading Screen
class ModernLoadingScreen {
    constructor() {
        this.screen = document.querySelector('.loading-screen');
        this.init();
    }
    
    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.screen.classList.add('hidden');
            }, 1000);
        });
    }
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    // Particle System
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        new ParticleSystem(canvas);
    }
    
    // Scroll Reveal
    new ModernScrollReveal();
    
    // Magnetic Effect
    new ModernMagneticEffect();
    
    // Parallax Effect
    new ModernParallaxEffect();
    
    // Smooth Scroll
    new ModernSmoothScroll();
    
    // Glow Effect
    new ModernGlowEffect();
    
    // 3D Tilt Effect
    new ModernTiltEffect();
    
    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        new ModernLoadingScreen();
    }
    
    // Header scroll effect
    const header = document.querySelector('.header-modern');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Text Reveal Animation
    const textRevealElements = document.querySelectorAll('.text-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    textRevealElements.forEach(el => revealObserver.observe(el));
    
    // Staggered animations
    const staggerElements = document.querySelectorAll('[class*="stagger-"]');
    staggerElements.forEach((el, index) => {
        const staggerClass = Array.from(el.classList).find(c => c.startsWith('stagger-'));
        if (staggerClass) {
            const delay = parseInt(staggerClass.replace('stagger-', '')) * 0.1;
            el.style.transitionDelay = `${delay}s`;
        }
    });
});

// Export for use in other files
window.ModernEffects = {
    ParticleSystem,
    ModernScrollReveal,
    ModernMagneticEffect,
    ModernParallaxEffect,
    ModernSmoothScroll,
    ModernTypingEffect,
    ModernCounterAnimation,
    ModernGlowEffect,
    ModernTiltEffect,
    ModernLoadingScreen
};