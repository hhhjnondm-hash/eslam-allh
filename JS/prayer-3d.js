// 3D Prayer Cards with Remaining Time
class Prayer3DCards {
  constructor() {
    this.timings = null;
    this.init();
  }
  
  async init() {
    await this.fetchPrayerTimes('Cairo');
    setInterval(() => this.updateRemainingTimes(), 1000);
  }
  
  async fetchPrayerTimes(city) {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=egypt&method=5`
      );
      const data = await response.json();
      this.timings = data.data.timings;
      this.updateRemainingTimes();
    } catch (error) {
      console.error("Error fetching prayer times:", error);
      this.timings = {
        Fajr: '04:30',
        Sunrise: '06:00',
        Dhuhr: '12:00',
        Asr: '15:30',
        Maghrib: '18:00',
        Isha: '19:30'
      };
      this.updateRemainingTimes();
    }
  }
  
  updateRemainingTimes() {
    if (!this.timings) return;
    
    const prayers = [
      { id: 'fajr', time: this.timings.Fajr },
      { id: 'sunrise', time: this.timings.Sunrise },
      { id: 'dhuhr', time: this.timings.Dhuhr },
      { id: 'asr', time: this.timings.Asr },
      { id: 'maghrib', time: this.timings.Maghrib },
      { id: 'isha', time: this.timings.Isha }
    ];
    
    const now = new Date();
    
    prayers.forEach(prayer => {
      const [hour, minute] = prayer.time.split(':').map(Number);
      const prayerTime = new Date();
      prayerTime.setHours(hour, minute, 0, 0);
      
      let diff = prayerTime - now;
      
      if (diff < 0) {
        // Prayer has passed, calculate for tomorrow
        prayerTime.setDate(prayerTime.getDate() + 1);
        diff = prayerTime - now;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      const remainingEl = document.getElementById(`${prayer.id}-remaining`);
      if (remainingEl) {
        if (hours > 0) {
          remainingEl.textContent = `${hours}س ${minutes}د`;
        } else if (minutes > 0) {
          remainingEl.textContent = `${minutes}د ${seconds}ث`;
        } else {
          remainingEl.textContent = `${seconds}ث`;
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Prayer3DCards();
});
