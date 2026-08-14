// Prayer Display with Particles
class PrayerDisplay {
    constructor() {
        this.prayerNameEl = document.getElementById('prayerName');
        this.prayerTimeEl = document.getElementById('prayerTime');
        this.countdownEl = document.getElementById('prayerCountdown');
        this.currentTimeEl = document.getElementById('currentTime');
        this.dateDisplayEl = document.getElementById('dateDisplay');
        this.particlesContainer = document.getElementById('mosqueParticles');
        
        this.init();
    }
    
    async init() {
        this.createParticles();
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
        await this.fetchPrayerTimes('Cairo');
        setInterval(() => this.updateCountdown(), 1000);
    }
    
    createParticles() {
        if (!this.particlesContainer) return;
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'mosque-particle';
            
            const size = Math.random() * 3 + 2;
            const colors = ['#FFD700', '#FFA500', '#FF8C00'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                box-shadow: 0 0 ${Math.random() * 10 + 5}px ${color};
                left: ${Math.random() * 100}%;
                animation-duration: ${Math.random() * 5 + 2}s;
                animation-delay: ${Math.random() * 3}s;
            `;
            
            this.particlesContainer.appendChild(particle);
        }
    }
    
    updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = hours >= 12 ? 'م' : 'ص';
        
        hours = hours % 12 || 12;
        
        const timeStr = `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;
        
        if (this.currentTimeEl) {
            this.currentTimeEl.textContent = `الوقت الآن: ${timeStr}`;
        }
    }
    
    async fetchPrayerTimes(city) {
        try {
            const response = await fetch(
                `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=egypt&method=5`
            );
            const data = await response.json();
            
            this.timings = data.data.timings;
            this.dateInfo = data.data.date;
            
            this.updateDateDisplay();
            this.getNextPrayer();
            this.updatePrayerInfo();
        } catch (error) {
            console.error("Error fetching prayer times:", error);
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
    
    updateDateDisplay() {
        if (!this.dateInfo || !this.dateDisplayEl) return;
        
        const dayName = this.getArabicDayName(this.dateInfo.gregorian.weekday.en);
        const hijriDate = this.dateInfo.hijri.date;
        const gregorianDate = this.dateInfo.gregorian.date;
        
        this.dateDisplayEl.textContent = `${dayName} | ${hijriDate} هـ / ${gregorianDate} م`;
    }
    
    getArabicDayName(day) {
        const days = {
            'Sunday': 'الأحد',
            'Monday': 'الإثنين',
            'Tuesday': 'الثلاثاء',
            'Wednesday': 'الأربعاء',
            'Thursday': 'الخميس',
            'Friday': 'الجمعة',
            'Saturday': 'السبت'
        };
        return days[day] || day;
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
            const period = hours >= 12 ? 'م' : 'ص';
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

document.addEventListener('DOMContentLoaded', () => {
    new PrayerDisplay();
});
