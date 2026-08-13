// Simple Particle Effect for Prayer Display
class SimplePrayerParticles {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.particles = [];
        this.maxParticles = 30;
        this.init();
    }
    
    init() {
        this.createParticles();
    }
    
    createParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'prayer-particle';
            
            const size = Math.random() * 4 + 2;
            const colors = ['#FFD700', '#FFA500', '#FF8C00', '#FF6B00'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                box-shadow: 0 0 ${Math.random() * 15 + 5}px ${color};
                left: ${Math.random() * 100}%;
                animation-duration: ${Math.random() * 10 + 5}s;
                animation-delay: ${Math.random() * 5}s;
            `;
            
            this.container.appendChild(particle);
        }
    }
}

// Prayer Times Update for Simple Display - Using same API as timesprayer.js
class SimplePrayerTimes {
    constructor() {
        this.prayerNameEl = document.getElementById('simple-prayer-name');
        this.prayerTimeEl = document.getElementById('simple-prayer-time');
        this.countdownEl = document.getElementById('simple-countdown');
        
        this.init();
    }
    
    async init() {
        // Fetch prayer times from same API as timesprayer.js
        await this.fetchPrayerTimes('Cairo');
        setInterval(() => this.updateCountdown(), 1000);
    }
    
    async fetchPrayerTimes(city) {
        try {
            const response = await fetch(
                `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=egypt&method=5`
            );
            const data = await response.json();
            
            this.timings = data.data.timings;
            this.getNextPrayer();
            this.updatePrayerInfo();
        } catch (error) {
            console.error("Error fetching prayer times:", error);
            // Fallback times
            this.timings = {
                Fajr: '04:30',
                Dhuhr: '12:00',
                Asr: '15:30',
                Maghrib: '18:00',
                Isha: '19:30'
            };
            this.getNextPrayer();
            this.updatePrayerInfo();
        }
    }
    
    getNextPrayer() {
        const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
        const now = new Date();
        
        for (let name of prayerOrder) {
            const [hour, minute] = this.timings[name].split(":").map(Number);
            const prayerTime = new Date();
            prayerTime.setHours(hour, minute, 0, 0);
            
            if (prayerTime > now) {
                this.nextPrayer = {
                    name: this.translatePrayer(name),
                    time: this.timings[name],
                    date: prayerTime
                };
                return;
            }
        }
        
        // If no prayer left today, return first prayer of tomorrow
        this.nextPrayer = {
            name: this.translatePrayer(prayerOrder[0]),
            time: this.timings[prayerOrder[0]],
            date: new Date()
        };
        this.nextPrayer.date.setDate(this.nextPrayer.date.getDate() + 1);
    }
    
    translatePrayer(name) {
        const translations = {
            'Fajr': 'الفجر',
            'Dhuhr': 'الظهر',
            'Asr': 'العصر',
            'Maghrib': 'المغرب',
            'Isha': 'العشاء'
        };
        return translations[name] || name;
    }
    
    updatePrayerInfo() {
        if (this.nextPrayer && this.prayerNameEl) {
            this.prayerNameEl.textContent = this.nextPrayer.name;
        }
        
        if (this.nextPrayer && this.prayerTimeEl) {
            const [hours, minutes] = this.nextPrayer.time.split(':').map(Number);
            const period = hours >= 12 ? 'PM' : 'AM';
            const hours12 = hours % 12 || 12;
            this.prayerTimeEl.textContent = `${hours12}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
        }
    }
    
    updateCountdown() {
        if (!this.nextPrayer) return;
        
        const now = new Date();
        const diff = this.nextPrayer.date - now;
        
        if (diff <= 0) {
            if (this.countdownEl) {
                this.countdownEl.textContent = 'حان الآن';
            }
            this.getNextPrayer();
            this.updatePrayerInfo();
            return;
        }
        
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
    new SimplePrayerParticles('prayer-particles');
    new SimplePrayerTimes();
});
