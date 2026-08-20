/**
 * ☀️ Wakeup Azkar Pro Max - Advanced Wakeup Azkar System
 * Interactive progress tracking with celebration effects
 */

class WakeupAzkarPro {
  constructor() {
    this.currentIndex = 0;
    this.azkarData = this.getAzkarData();
    this.container = null;
    this.init();
  }

  getAzkarData() {
    return [
      {
        title: 'الحمد لله الذي أحيانا',
        text: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا، وَإِلَيْهِ النُّشُورُ.',
        count: 'مرة واحدة'
      },
      {
        title: 'الحمد لله الذي عافاني في جسدي',
        text: 'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي، وَرَدَّ عَلَيَّ رُوحِي، وَأَذِنَ لِي بِذِكْرِهِ.',
        count: 'مرة واحدة'
      },
      {
        title: 'قراءة آخر عشر آيات من سورة آل عمران',
        text: 'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِأُولِي الْأَلْبَابِ\n\nحتى آخر السورة:\n\nفَاسْتَجَابَ لَهُمْ رَبُّهُمْ أَنِّي لَا أُضِيعُ عَمَلَ عَامِلٍ مِنْكُمْ مِنْ ذَكْرٍ أَوْ أُنْثَىٰ ۖ بَعْضُكُمْ مِنْ بَعْضٍ ۚ فَالَّذِينَ هَاجَرُوا وَأُخْرِجُوا مِنْ دِيَارِهِمْ وَأُوذُوا فِي سَبِيلِي وَقَاتَلُوا وَقُتِلُوا لَأُكَفِّرَنَّ عَنْهُمْ سَيِّئَاتِهِمْ وَلَأُدْخِلَنَّهُمْ جَنَّاتٍ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ ثَوَابًا مِنْ عِنْدِ اللَّهِ ۗ وَاللَّهُ عِنْدَهُ حُسْنُ الثَّوَابِ',
        count: 'مرة واحدة'
      },
      {
        title: 'دعاء الاستيقاظ من الليل - الجزء الأول',
        text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، الْحَمْدُ لِلَّهِ، وَسُبْحَانَ اللَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ.',
        count: 'مرة واحدة'
      },
      {
        title: 'دعاء الاستيقاظ من الليل - الجزء الثاني',
        text: 'اللَّهُمَّ اغْفِرْ لِي',
        count: 'مرة واحدة'
      },
      {
        title: 'عند الوضوء بعد الاستيقاظ',
        text: 'بِسْمِ اللَّهِ\n\nثم تتوضأ، ومن السنة أن تستنثر بالماء ثلاثًا؛ لأن الشيطان يبيت على خيشوم الإنسان.',
        count: 'مرة واحدة'
      },
      {
        title: 'عند الاستيقاظ لصلاة الفجر',
        text: 'إذا استيقظت لصلاة الفجر، تقول أذكار الاستيقاظ السابقة، ثم تتوضأ وتصلي الفجر، وبعد الصلاة تقول أذكار ما بعد الصلاة، ثم أذكار الصباح.',
        count: 'معلومات'
      }
    ];
  }

  init() {
    this.container = document.querySelector('.azkar-container');
    if (!this.container) return;

    this.renderAzkar();
    this.updateProgress();
  }

  renderAzkar() {
    const currentDhikr = this.azkarData[this.currentIndex];
    const progress = ((this.currentIndex + 1) / this.azkarData.length) * 100;

    this.container.innerHTML = `
      <div class="azkar-aurora"></div>
      
      <h1 class="azkar-title">☀️ أذكار الاستيقاظ من النوم</h1>
      
      <div class="azkar-card">
        <div class="progress-section">
          <div class="progress-label">
            <span>التقدم</span>
            <span class="progress-number">${this.currentIndex + 1} / ${this.azkarData.length}</span>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: ${progress}%"></div>
          </div>
        </div>
        
        <div class="dhikr-content">
          <div class="dhikr-number">الذكر رقم ${this.currentIndex + 1}</div>
          <h2 class="dhikr-title">${currentDhikr.title}</h2>
          <p class="dhikr-text">${currentDhikr.text.replace(/\n/g, '<br>')}</p>
          <p class="dhikr-count">التكرار: ${currentDhikr.count}</p>
        </div>
        
        <div class="navigation-buttons">
          <button class="nav-button secondary" id="prevBtn">
            ← السابق
          </button>
          <button class="nav-button primary" id="nextBtn">
            التالي →
          </button>
        </div>
      </div>
    `;

    this.attachEventListeners();
    
    // Enable/disable prev button based on current index
    const prevBtn = document.getElementById('prevBtn');
    if (prevBtn) {
      prevBtn.disabled = this.currentIndex === 0;
    }
  }

  attachEventListeners() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => this.previousDhikr());
      // Disable prev button at the start
      if (this.currentIndex === 0) {
        prevBtn.disabled = true;
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextDhikr());
    }
  }

  nextDhikr() {
    if (this.currentIndex < this.azkarData.length - 1) {
      this.currentIndex++;
      this.renderAzkar();
      this.updateProgress();
    } else {
      this.showCelebration();
    }
  }

  previousDhikr() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderAzkar();
      this.updateProgress();
    }
  }

  updateProgress() {
    const progress = ((this.currentIndex + 1) / this.azkarData.length) * 100;
    const progressBar = document.querySelector('.progress-bar-fill');
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }
  }

  showCelebration() {
    this.createConfetti();
    
    this.container.innerHTML = `
      <div class="azkar-aurora"></div>
      
      <div class="azkar-card">
        <div class="celebration-screen active">
          <div class="celebration-icon">🎉</div>
          <h1 class="celebration-title">أحسنت!</h1>
          <p class="celebration-message">بارك الله فيك</p>
          <p class="celebration-subtitle">لقد أكملت جميع أذكار الاستيقاظ</p>
          <button class="restart-button" id="restartBtn">
            إعادة الأذكار ↻
          </button>
        </div>
      </div>
    `;

    document.getElementById('restartBtn').addEventListener('click', () => {
      this.currentIndex = 0;
      this.renderAzkar();
      this.updateProgress();
    });
  }

  createConfetti() {
    const colors = ['#ffd700', '#ffaa00', '#667eea', '#764ba2', '#f093fb', '#4facfe'];
    
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = Math.random() * 100;
      const animationDuration = 3 + Math.random() * 2;
      const delay = Math.random() * 0.5;
      
      confetti.style.cssText = `
        left: ${left}%;
        background: ${color};
        animation-duration: ${animationDuration}s;
        animation-delay: ${delay}s;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      `;
      
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), animationDuration * 1000 + delay * 1000);
    }
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  new WakeupAzkarPro();
});
