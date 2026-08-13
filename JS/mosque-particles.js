// Advanced Particle Effect for Golden Mosque
class MosqueParticles {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.particles = [];
        this.maxParticles = 100;
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }
    
    init() {
        this.createParticles();
        this.addMouseInteraction();
        this.animate();
    }
    
    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'mosque-particle';
            
            const size = Math.random() * 6 + 2;
            const colors = ['#FFD700', '#FFA500', '#FF8C00', '#FF6B00', '#FF4500'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                opacity: ${Math.random() * 0.7 + 0.3};
                box-shadow: 0 0 ${Math.random() * 20 + 10}px ${color};
                filter: blur(${Math.random() * 2}px);
            `;
            
            this.particles.push({
                element: particle,
                x: Math.random() * 100,
                y: Math.random() * 100,
                speedX: (Math.random() - 0.5) * 0.8,
                speedY: (Math.random() - 0.5) * 0.8,
                size: size,
                originalSpeedX: (Math.random() - 0.5) * 0.8,
                originalSpeedY: (Math.random() - 0.5) * 0.8,
                phase: Math.random() * Math.PI * 2
            });
            
            this.container.appendChild(particle);
        }
    }
    
    addMouseInteraction() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX / window.innerWidth * 100;
            this.mouseY = e.clientY / window.innerHeight * 100;
        });
    }
    
    animate() {
        const time = Date.now() * 0.001;
        
        this.particles.forEach(particle => {
            // Add wave motion
            particle.x += particle.speedX + Math.sin(time + particle.phase) * 0.1;
            particle.y += particle.speedY + Math.cos(time + particle.phase) * 0.1;
            
            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 20) {
                particle.speedX += dx * 0.01;
                particle.speedY += dy * 0.01;
            }
            
            // Friction
            particle.speedX *= 0.99;
            particle.speedY *= 0.99;
            
            // Keep minimum speed
            if (Math.abs(particle.speedX) < 0.1) {
                particle.speedX = particle.originalSpeedX;
            }
            if (Math.abs(particle.speedY) < 0.1) {
                particle.speedY = particle.originalSpeedY;
            }
            
            // Wrap around
            if (particle.x < 0) particle.x = 100;
            if (particle.x > 100) particle.x = 0;
            if (particle.y < 0) particle.y = 100;
            if (particle.y > 100) particle.y = 0;
            
            // Pulsing effect
            const pulse = Math.sin(time * 2 + particle.phase) * 0.5 + 0.5;
            particle.element.style.opacity = 0.3 + pulse * 0.4;
            particle.element.style.transform = `scale(${0.8 + pulse * 0.4})`;
            
            particle.element.style.left = particle.x + '%';
            particle.element.style.top = particle.y + '%';
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Aurora Background Effect
class AuroraEffect {
    constructor() {
        this.container = document.querySelector('.golden-mosque-container');
        if (!this.container) return;
        
        this.init();
    }
    
    init() {
        const aurora = document.createElement('div');
        aurora.className = 'aurora-effect';
        aurora.innerHTML = `
            <div class="aurora-layer layer-1"></div>
            <div class="aurora-layer layer-2"></div>
            <div class="aurora-layer layer-3"></div>
        `;
        this.container.insertBefore(aurora, this.container.firstChild);
    }
}

// Holographic Text Effect
class HolographicText {
    constructor(element) {
        this.element = element;
        if (!this.element) return;
        
        this.init();
    }
    
    init() {
        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            this.element.style.textShadow = `
                ${rotateX}px ${rotateY}px 0 rgba(255, 215, 0, 0.5),
                ${-rotateX}px ${-rotateY}px 0 rgba(255, 165, 0, 0.5)
            `;
        });
        
        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            this.element.style.textShadow = 'none';
        });
    }
}

// Ripple Effect on Click
class RippleEffect {
    constructor(container) {
        this.container = container;
        if (!this.container) return;
        
        this.init();
    }
    
    init() {
        this.container.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            
            const rect = this.container.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
                border-radius: 50%;
                left: ${e.clientX - rect.left - size / 2}px;
                top: ${e.clientY - rect.top - size / 2}px;
                transform: scale(0);
                animation: rippleAnimation 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.container.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }
}

// Prayer Times Update for Golden Mosque
class MosquePrayerTimes {
    constructor() {
        this.prayerNameEl = document.getElementById('centerPrayerName');
        this.prayerTimeEl = document.getElementById('centerPrayerTime');
        this.countdownEl = document.getElementById('centerCountdown');
        
        this.prayers = [
            { name: 'الفجر', time: '04:30' },
            { name: 'الشروق', time: '06:00' },
            { name: 'الظهر', time: '12:00' },
            { name: 'العصر', time: '15:30' },
            { name: 'المغرب', time: '18:00' },
            { name: 'العشاء', time: '19:30' }
        ];
        
        this.init();
    }
    
    init() {
        this.updatePrayerInfo();
        setInterval(() => this.updateCountdown(), 1000);
        this.addTypingEffect();
    }
    
    getNextPrayer() {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        
        for (let prayer of this.prayers) {
            const [hours, minutes] = prayer.time.split(':').map(Number);
            const prayerTime = hours * 60 + minutes;
            
            if (prayerTime > currentTime) {
                return prayer;
            }
        }
        
        return this.prayers[0];
    }
    
    updatePrayerInfo() {
        const nextPrayer = this.getNextPrayer();
        
        if (this.prayerNameEl) {
            this.prayerNameEl.textContent = nextPrayer.name;
        }
        
        if (this.prayerTimeEl) {
            this.prayerTimeEl.textContent = nextPrayer.time;
        }
    }
    
    updateCountdown() {
        const nextPrayer = this.getNextPrayer();
        const now = new Date();
        const [hours, minutes] = nextPrayer.time.split(':').map(Number);
        
        let prayerDate = new Date();
        prayerDate.setHours(hours, minutes, 0, 0);
        
        if (prayerDate < now) {
            prayerDate.setDate(prayerDate.getDate() + 1);
        }
        
        const diff = prayerDate - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        if (this.countdownEl) {
            this.countdownEl.textContent = 
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }
    
    addTypingEffect() {
        if (!this.prayerNameEl) return;
        
        const originalText = this.prayerNameEl.textContent;
        this.prayerNameEl.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                this.prayerNameEl.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        typeWriter();
    }
}

// 3D Card Effect for Mosque
class Card3DEffect {
    constructor(element) {
        this.element = element;
        if (!this.element) return;
        
        this.init();
    }
    
    init() {
        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            this.element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    }
}

// Initialize all effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MosqueParticles('mosqueParticles');
    new AuroraEffect();
    new MosquePrayerTimes();
    
    // Apply holographic effect to prayer name
    const prayerName = document.getElementById('centerPrayerName');
    if (prayerName) {
        new HolographicText(prayerName);
    }
    
    // Apply 3D effect to mosque
    const mosqueShape = document.querySelector('.mosque-shape');
    if (mosqueShape) {
        new Card3DEffect(mosqueShape);
    }
    
    // Apply ripple effect to container
    const container = document.querySelector('.golden-mosque-container');
    if (container) {
        new RippleEffect(container);
    }
});
