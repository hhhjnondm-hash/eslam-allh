/**
 * 🕌 Salah Azkar Pro Max - Advanced Post-Prayer Azkar System
 * Interactive progress tracking with celebration effects
 */

class SalahAzkarPro {
  constructor() {
    this.currentIndex = 0;
    this.azkarData = this.getAzkarData();
    this.container = null;
    this.init();
  }

  getAzkarData() {
    return [
      {
        title: 'الاستغفار',
        text: 'أَسْتَغْفِرُ اللَّهَ\n\nأَسْتَغْفِرُ اللَّهَ\n\nأَسْتَغْفِرُ اللَّهَ',
        count: '3 مرات'
      },
      {
        title: 'اللهم أنت السلام',
        text: 'اللَّهُمَّ أَنْتَ السَّلَامُ، وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ.',
        count: 'مرة واحدة'
      },
      {
        title: 'لا إله إلا الله وحده لا شريك له',
        text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.',
        count: 'مرة واحدة'
      },
      {
        title: 'لا حول ولا قوة إلا بالله',
        text: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ.',
        count: 'مرة واحدة'
      },
      {
        title: 'لا إله إلا الله ولا نعبد إلا إياه',
        text: 'لَا إِلَهَ إِلَّا اللَّهُ، وَلَا نَعْبُدُ إِلَّا إِيَّاهُ، لَهُ النِّعْمَةُ وَلَهُ الْفَضْلُ، وَلَهُ الثَّنَاءُ الْحَسَنُ، لَا إِلَهَ إِلَّا اللَّهُ مُخْلِصِينَ لَهُ الدِّينَ وَلَوْ كَرِهَ الْكَافِرُونَ.',
        count: 'مرة واحدة'
      },
      {
        title: 'اللهم لا مانع لما أعطيت',
        text: 'اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ.',
        count: 'مرة واحدة'
      },
      {
        title: 'التسبيح - 33 مرة',
        text: 'سُبْحَانَ اللَّهِ',
        count: '33 مرة'
      },
      {
        title: 'التحميد - 33 مرة',
        text: 'الْحَمْدُ لِلَّهِ',
        count: '33 مرة'
      },
      {
        title: 'التكبير - 33 مرة',
        text: 'اللَّهُ أَكْبَرُ',
        count: '33 مرة'
      },
      {
        title: 'تتميم المائة',
        text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.',
        count: 'مرة واحدة'
      },
      {
        title: 'صيغة التسبيح والتحميد والتكبير - 33 مرة',
        text: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَاللَّهُ أَكْبَرُ',
        count: '33 مرة'
      },
      {
        title: 'صيغة أخرى - 25 مرة',
        text: 'سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ',
        count: '25 مرة'
      },
      {
        title: 'آية الكرسي',
        text: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ.',
        count: 'مرة واحدة'
      },
      {
        title: 'سورة الإخلاص',
        text: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
        count: 'مرة واحدة (3 مرات بعد الفجر والمغرب)'
      },
      {
        title: 'سورة الفلق',
        text: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ',
        count: 'مرة واحدة (3 مرات بعد الفجر والمغرب)'
      },
      {
        title: 'سورة الناس',
        text: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ',
        count: 'مرة واحدة (3 مرات بعد الفجر والمغرب)'
      },
      {
        title: 'الذكر الخاص بالفجر والمغرب',
        text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.',
        count: '10 مرات (بعد الفجر والمغرب)'
      },
      {
        title: 'الصلاة على النبي ﷺ',
        text: 'اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَى نَبِيِّنَا مُحَمَّدٍ.',
        count: 'مرة واحدة'
      },
      {
        title: 'الدعاء - ربنا آتنا',
        text: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً، وَفِي الْآخِرَةِ حَسَنَةً، وَقِنَا عَذَابَ النَّارِ.',
        count: 'مرة واحدة'
      },
      {
        title: 'الدعاء - اللهم أعني',
        text: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ.',
        count: 'مرة واحدة'
      },
      {
        title: 'الدعاء - اللهم اغفر لي',
        text: 'اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَعَافِنِي وَارْزُقْنِي.',
        count: 'مرة واحدة'
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
      
      <h1 class="azkar-title">🕌 أذكار بعد الصلاة</h1>
      
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
          <p class="celebration-subtitle">لقد أكملت جميع أذكار بعد الصلاة</p>
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
  new SalahAzkarPro();
});
