// Particle Effect for Golden Mosque
class MosqueParticles {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.particles = [];
        this.maxParticles = 50;
        this.init();
    }
    
    init() {
        this.createParticles();
        this.animate();
    }
    
    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'mosque-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: #FFD700;
                border-radius: 50%;
                pointer-events: none;
                opacity: ${Math.random() * 0.5 + 0.3};
                box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(255, 215, 0, 0.8);
            `;
            
            this.particles.push({
                element: particle,
                x: Math.random() * 100,
                y: Math.random() * 100,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
            
            this.container.appendChild(particle);
        }
    }
    
    animate() {
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around
            if (particle.x < 0) particle.x = 100;
            if (particle.x > 100) particle.x = 0;
            if (particle.y < 0) particle.y = 100;
            if (particle.y > 100) particle.y = 0;
            
            particle.element.style.left = particle.x + '%';
            particle.element.style.top = particle.y + '%';
        });
        
        requestAnimationFrame(() => this.animate());
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
        
        // If no prayer left today, return first prayer of tomorrow
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
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MosqueParticles('mosqueParticles');
    new MosquePrayerTimes();
});
