/**
 * 🎨 Daily Gift Box Pro Max - Ultra Modern Interactions
 * Inspired by Aceternity UI, shadcn/ui, and GSAP
 * Advanced animations and magnetic effects
 */

class DailyBoxPro {
  constructor() {
    this.giftBox = document.getElementById('giftBox');
    this.boxLid = document.getElementById('boxLid');
    this.openBtn = document.getElementById('openBtn');
    this.contentModal = document.getElementById('contentModal');
    this.closeBtn = document.getElementById('closeBtn');
    this.streakCount = document.getElementById('streakCount');
    this.progressFill = document.getElementById('progressFill');
    this.nextMilestone = document.getElementById('nextMilestone');
    
    this.isOpened = false;
    this.streak = parseInt(localStorage.getItem('rafikStreak') || '0');
    this.lastOpenDate = localStorage.getItem('rafikLastOpen');
    
    this.init();
  }

  init() {
    this.setupParticles();
    this.setupMagneticEffect();
    this.setupSpotlightEffect();
    this.setupGiftBoxInteractions();
    this.updateStreakDisplay();
    this.checkDailyAvailability();
  }

  // Create enhanced particle system
  setupParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#ffd700'];
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 8 + 4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        animation-delay: ${Math.random() * 15}s;
        animation-duration: ${15 + Math.random() * 10}s;
        box-shadow: 0 0 ${size * 2}px ${color};
        opacity: ${0.3 + Math.random() * 0.4};
      `;
      
      container.appendChild(particle);
    }
  }

  // Magnetic button effect (Aceternity UI style)
  setupMagneticEffect() {
    const magneticElements = document.querySelectorAll('.magnetic-button');
    
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0) scale(1)';
      });
    });
  }

  // Spotlight effect on cards (shadcn/ui style)
  setupSpotlightEffect() {
    const cards = document.querySelectorAll('.bento-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        card.style.setProperty('--spotlight-x', `${x}%`);
        card.style.setProperty('--spotlight-y', `${y}%`);
      });
    });
  }

  // Gift box 3D interactions
  setupGiftBoxInteractions() {
    if (!this.giftBox) return;

    // 3D tilt effect
    this.giftBox.addEventListener('mousemove', (e) => {
      if (this.isOpened) return;
      
      const rect = this.giftBox.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      this.giftBox.style.transform = `
        rotateX(${y * 20}deg) 
        rotateY(${x * 20}deg) 
        scale(1.05)
      `;
    });

    this.giftBox.addEventListener('mouseleave', () => {
      if (!this.isOpened) {
        this.giftBox.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      }
    });

    // Click to open
    this.giftBox.addEventListener('click', () => this.openBox());
    this.openBtn.addEventListener('click', () => this.openBox());
    
    // Close modal
    this.closeBtn.addEventListener('click', () => this.closeModal());
    this.contentModal.addEventListener('click', (e) => {
      if (e.target === this.contentModal) this.closeModal();
    });
  }

  // Open the gift box
  openBox() {
    if (this.isOpened || !this.canOpenToday()) return;
    
    this.isOpened = true;
    
    // Shake animation
    this.giftBox.classList.add('shaking');
    
    setTimeout(() => {
      this.giftBox.classList.remove('shaking');
      
      // Open lid
      if (this.boxLid) {
        this.boxLid.classList.add('open');
      }
      
      // Disable button
      this.openBtn.disabled = true;
      this.openBtn.textContent = '🎉 تم الفتح!';
      
      // Show confetti
      this.createConfetti();
      
      // Show content after delay
      setTimeout(() => {
        this.showContent();
        this.updateStreak();
      }, 1000);
    }, 1500);
  }

  // Check if can open today
  canOpenToday() {
    if (!this.lastOpenDate) return true;
    
    const today = new Date().toDateString();
    const lastOpen = new Date(this.lastOpenDate).toDateString();
    
    return today !== lastOpen;
  }

  // Update streak counter
  updateStreak() {
    const today = new Date().toDateString();
    const lastOpen = this.lastOpenDate ? new Date(this.lastOpenDate) : null;
    
    if (lastOpen) {
      const diffDays = Math.floor((new Date() - lastOpen) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        this.streak++;
      } else if (diffDays > 1) {
        this.streak = 1;
      }
    } else {
      this.streak = 1;
    }
    
    localStorage.setItem('rafikStreak', this.streak.toString());
    localStorage.setItem('rafikLastOpen', today);
    
    this.updateStreakDisplay();
  }

  // Update streak display
  updateStreakDisplay() {
    if (this.streakCount) {
      this.streakCount.textContent = this.streak;
    }
    
    if (this.progressFill) {
      const progress = (this.streak % 7) / 7 * 100;
      this.progressFill.style.width = `${progress}%`;
    }
    
    if (this.nextMilestone) {
      const nextMilestone = Math.ceil(this.streak / 7) * 7;
      const daysLeft = nextMilestone - this.streak;
      this.nextMilestone.textContent = daysLeft > 0 
        ? `${daysLeft} يوم لتحقيق الهدف 🎯` 
        : '🎉 لقد حققت الهدف!';
    }
  }

  // Check daily availability
  checkDailyAvailability() {
    if (!this.canOpenToday()) {
      this.openBtn.disabled = true;
      this.openBtn.textContent = '⏰ عُد غداً';
    }
  }

  // Show content modal
  showContent() {
    const content = this.getRandomContent();
    
    document.getElementById('contentIcon').textContent = content.icon;
    document.getElementById('contentType').textContent = content.type;
    document.getElementById('contentText').textContent = content.text;
    document.getElementById('contentSource').textContent = content.source;
    
    const actionBtn = document.getElementById('actionBtn');
    if (content.actionUrl) {
      actionBtn.style.display = 'inline-block';
      actionBtn.href = content.actionUrl;
    } else {
      actionBtn.style.display = 'none';
    }
    
    this.contentModal.classList.add('active');
  }

  // Close modal
  closeModal() {
    this.contentModal.classList.remove('active');
  }

  // Create confetti effect
  createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#ffd700'];
    
    for (let i = 0; i < 100; i++) {
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

  // Get random content
  getRandomContent() {
    const contents = [
      {
        icon: '📖',
        type: 'آية كريمة',
        text: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ',
        source: 'سورة الطلاق: 2-3',
        actionUrl: 'surah.html'
      },
      {
        icon: '🤲',
        type: 'دعاء',
        text: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
        source: 'مسلم',
        actionUrl: 'ask-answer.html'
      },
      {
        icon: '💡',
        type: 'حكمة',
        text: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ',
        source: 'مسلم',
        actionUrl: 'reads.html'
      },
      {
        icon: '🌙',
        type: 'ذكر',
        text: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
        source: 'أذكار',
        actionUrl: 'morning-azkar.html'
      },
      {
        icon: '🕌',
        type: 'فضل',
        text: 'صَلَاةُ الرَّجُلِ فِي جَمَاعَةٍ تَزِيدُ عَلَى صَلَاتِهِ فِي سُوقِهِ بِضْعًا وَعِشْرِينَ دَرَجَةً',
        source: 'البخاري',
        actionUrl: 'timesprayer.html'
      },
      {
        icon: '📿',
        type: 'حديث',
        text: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
        source: 'البخاري',
        actionUrl: 'surah.html'
      },
      {
        icon: '🎯',
        type: 'تحدي',
        text: 'حاول حفظ 5 آيات جديدة اليوم!',
        source: 'تحدي يومي',
        actionUrl: 'surah.html'
      },
      {
        icon: '🌟',
        type: 'نصيحة',
        text: 'ابدأ يومك بقراءة القرآن لمدة 10 دقائق',
        source: 'نصيحة',
        actionUrl: 'surah.html'
      }
    ];
    
    return contents[Math.floor(Math.random() * contents.length)];
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  new DailyBoxPro();
});
