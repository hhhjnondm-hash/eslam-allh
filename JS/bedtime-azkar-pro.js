/**
 * 🌙 Bedtime Azkar Pro Max - Advanced Bedtime Azkar System
 * Interactive progress tracking with celebration effects
 */

class BedtimeAzkarPro {
  constructor() {
    this.currentIndex = 0;
    this.azkarData = this.getAzkarData();
    this.container = null;
    this.init();
  }

  getAzkarData() {
    return [
      {
        title: 'الوضوء والنوم على الجانب الأيمن',
        text: 'يُستحب أن تتوضأ وضوءك للصلاة، ثم تضطجع على شقك الأيمن.',
        count: 'مرة واحدة'
      },
      {
        title: 'آية الكرسي',
        text: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ.',
        count: 'مرة واحدة'
      },
      {
        title: 'آخر آيتين من سورة البقرة',
        text: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۝ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ ۝\n\nلَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذُنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ ۝',
        count: 'مرة واحدة'
      },
      {
        title: 'الإخلاص والفلق والناس - 3 مرات',
        text: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ\n\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَن\n\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ\n\nثم تمسح بهما ما استطعت من جسدك، تبدأ برأسك ووجهك وما أقبل من جسدك، وتفعل ذلك ثلاث مرات.',
        count: '3 مرات'
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
        title: 'التكبير - 34 مرة',
        text: 'اللَّهُ أَكْبَرُ',
        count: '34 مرة'
      },
      {
        title: 'باسمك اللهم أموت وأحيا',
        text: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا.',
        count: 'مرة واحدة'
      },
      {
        title: 'باسمك ربي وضعت جنبي',
        text: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ.',
        count: 'مرة واحدة'
      },
      {
        title: 'اللهم إنك خلقت نفسي',
        text: 'اللَّهُمَّ إِنَّكَ خَلَقْتَ نَفْسِي وَأَنْتَ تَوَفَّاهَا، لَكَ مَمَاتُهَا وَمَحْيَاهَا، إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا، وَإِنْ أَمَتَّهَا فَاغْفِرْ لَهَا. اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ.',
        count: 'مرة واحدة'
      },
      {
        title: 'اللهم قني عذابك',
        text: 'تضع يدك اليمنى تحت خدك وتقول:\n\nاللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادِكَ.',
        count: 'مرة واحدة'
      },
      {
        title: 'اللهم أسلمت نفسي إليك',
        text: 'اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْت.\n\nويُستحب أن يكون هذا من آخر كلامك قبل النوم، مع الوضوء والنوم على الجانب الأيمن.',
        count: 'مرة واحدة'
      },
      {
        title: 'دعاء آخر ثابت',
        text: 'اللَّهُمَّ رَبَّ السَّمَاوَاتِ السَّبْعِ وَرَبَّ الْعَرْشِ الْعَظِيمِ، رَبَّنَا وَرَبَّ كُلِّ شَيْءٍ، فَالِقُ الْحَبِّ وَالنَّوَى، وَمُنْزِلَ التَّوْرَاةِ وَالْإِنْجِيلِ وَالْفُرْقَانِ، أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ شَيْءٍ أَنْتَ آخِذٌ بِنَاصِيَتِهِ. اللَّهُمَّ أَنْتَ الْأَوَّلُ فَلَيْس قَبْلَكَ شَيْءٌ، وَأَنْتَ الْآخِرُ فَلَيْس بَعْدَكَ شَيْءٌ، وَأَنْتَ الظَّاهِرُ فَلَيْس فَوْقَكَ شَيْءٌ، وَأَنْتَ الْبَاطِنُ فَلَيْس دُونَكَ شَيْءٌ، اقْضِ عَنَّا الدَّيْنَ وَأَغْنِنَا مِنَ الْفَقْرِ.',
        count: 'مرة واحدة'
      },
      {
        title: 'سورة السجدة وسورة الملك',
        text: 'تَنْزِيلُ السَّجْدَةِ\n\nتَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ',
        count: 'مرة واحدة'
      },
      {
        title: 'إذا رجعت إلى فراشك بعد أن قمت منه',
        text: 'يُستحب أن تنفض فراشك بطرف ثوبك ثلاث مرات، وتقول:\n\nبِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ.',
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
      
      <h1 class="azkar-title">🌙 أذكار النوم</h1>
      
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
          <p class="celebration-subtitle">لقد أكملت جميع أذكار النوم</p>
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
  new BedtimeAzkarPro();
});
