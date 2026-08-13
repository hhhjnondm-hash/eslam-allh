/*
 * Daily Gift Box JavaScript
 * Advanced gift box system with streak tracking, content variety, and smart selection
 * Inspired by shadcn/ui and Codrops design patterns
 */

// State management
let dailyBoxState = {
    isOpened: false,
    streak: 0,
    lastOpenDate: null,
    currentContent: null,
    milestones: [
        { days: 7, name: "أسبوع مع رفيق", reward: "badge" },
        { days: 30, name: "شهر مع رفيق", reward: "special_badge" },
        { days: 100, name: "100 يوم مع رفيق", reward: "golden_badge" }
    ]
};

// Content pool with different types
const contentPool = {
    verses: [
        { text: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ", source: "البقرة - آية 127", icon: "📖", type: "verse" },
        { text: "رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِنْ ذُرِّيَّتِنَا أُمَّةً مُسْلِمَةً لَكَ", source: "البقرة - آية 128", icon: "📖", type: "verse" },
        { text: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً", source: "آل عمران - آية 8", icon: "📖", type: "verse" },
        { text: "رَبَّنَا إِنَّنَا آمَنَّا فَاغْفِرْ لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ النَّارِ", source: "آل عمران - آية 16", icon: "📖", type: "verse" },
        { text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ", source: "البقرة - آية 201", icon: "📖", type: "verse" }
    ],
    duas: [
        { text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى", source: "دعاء استفتاح", icon: "🤲", type: "dua" },
        { text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْهَمِّ وَالْحُزْنِ وَالْعَجْزِ وَالْكَسَلِ وَالْبَخْلِ", source: "دعاء الهم", icon: "🤲", type: "dua" },
        { text: "اللَّهُمَّ اغْفِرْ لِي ذُنُوبِي كُلَّهَا قَدِيمَهَا وَحَدِيثَهَا", source: "دعاء المغفرة", icon: "🤲", type: "dua" },
        { text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً", source: "دعاء الحسنى", icon: "🤲", type: "dua" }
    ],
    facts: [
        { text: "سورة الكهف تُسمى 'قلب القرآن' وتحتوي على 4 قصص عظيمة", source: "معلومات قرآنية", icon: "💡", type: "fact" },
        { text: "آية الكرسي آية عظيمة تُقرأ عند النوم للحماية", source: "معلومات قرآنية", icon: "💡", type: "fact" },
        { text: "القرآن الكريم يحتوي على 114 سورة و 6236 آية", source: "معلومات قرآنية", icon: "💡", type: "fact" },
        { text: "أطول سورة في القرآن هي سورة البقرة بـ 286 آية", source: "معلومات قرآنية", icon: "💡", type: "fact" }
    ],
    quizzes: [
        { text: "ما هي السورة التي تُسمى 'قلب القرآن'؟", source: "سؤال قرآني", icon: "🧠", type: "quiz", answer: "سورة الكهف", action: "quiz" },
        { text: "كم عدد آيات سورة الفاتحة؟", source: "سؤال قرآني", icon: "🧠", type: "quiz", answer: "7 آيات", action: "quiz" },
        { text: "ما هي أول سورة نزلت في القرآن؟", source: "سؤال قرآني", icon: "🧠", type: "quiz", answer: "سورة العلق", action: "quiz" },
        { text: "ما هي أطول سورة في القرآن؟", source: "سؤال قرآني", icon: "🧠", type: "quiz", answer: "سورة البقرة", action: "quiz" }
    ],
    stories: [
        { text: "قصة أصحاب الكهف: فتية آمنوا بالله فآواهم الله الكهف", source: "قصة إسلامية", icon: "📚", type: "story" },
        { text: "قصة النبي يوسف: قصة الصبر والثقة بالله", source: "قصة إسلامية", icon: "📚", type: "story" },
        { text: "قصة النبي موسى: قصة النصر والتحرير", source: "قصة إسلامية", icon: "📚", type: "story" },
        { text: "قصة النبي إبراهيم: قصة التضحية والإيمان", source: "قصة إسلامية", icon: "📚", type: "story" }
    ],
    prophets: [
        { text: "النبي محمد ﷺ: خاتم الأنبياء والمرسلين", source: "معلومات عن النبي", icon: "🕌", type: "prophet" },
        { text: "النبي إبراهيم: أبو الأنبياء وأبو الأمة الإسلامية", source: "معلومات عن النبي", icon: "🕌", type: "prophet" },
        { text: "النبي موسى: كليم الله، نبي التوراة", source: "معلومات عن النبي", icon: "🕌", type: "prophet" },
        { text: "النبي عيسى: نبي الله عيسى بن مريم", source: "معلومات عن النبي", icon: "🕌", type: "prophet" }
    ],
    companions: [
        { text: "أبو بكر الصديق: أول الخلفاء الراشدين", source: "معلومات عن الصحابة", icon: "⭐", type: "companion" },
        { text: "عمر بن الخطاب: ثاني الخلفاء الراشدين", source: "معلومات عن الصحابة", icon: "⭐", type: "companion" },
        { text: "علي بن أبي طالب: رابع الخلفاء الراشدين", source: "معلومات عن الصحابة", icon: "⭐", type: "companion" },
        { text: "خالد بن الوليد: سيف الله المسلول", source: "معلومات عن الصحابة", icon: "⭐", type: "companion" }
    ],
    friday: [
        { text: "سورة الكهف: تُقرأ يوم الجمعة للحماية", source: "سورة الجمعة", icon: "🌙", type: "friday" },
        { text: "صلاة الجمعة: تجمع المسلمين في صلاة واحدة", source: "سورة الجمعة", icon: "🌙", type: "friday" },
        { text: "سورة الكهف: سورة النور والبركة", source: "سورة الجمعة", icon: "🌙", type: "friday" }
    ],
    badges: [
        { text: "🏆 إنجاز: افتاحت الصندوق 7 أيام متتالية!", source: "إنجاز", icon: "🏆", type: "badge" },
        { text: "🌟 إنجاز: أسبوع كامل مع رفيق!", source: "إنجاز", icon: "🌟", type: "badge" },
        { text: "⭐ إنجاز: شهر من الالتزام بالقرآن!", source: "إنجاز", icon: "⭐", type: "badge" }
    ]
};

// Initialize the daily box system
function initDailyBox() {
    loadState();
    checkDailyReset();
    updateUI();
    setupEventListeners();
}

// Load state from localStorage
function loadState() {
    try {
        const savedState = localStorage.getItem('dailyBoxState');
        if (savedState) {
            dailyBoxState = JSON.parse(savedState);
        }
    } catch (error) {
        console.error("Error loading state:", error);
    }
}

// Save state to localStorage
function saveState() {
    try {
        localStorage.setItem('dailyBoxState', JSON.stringify(dailyBoxState));
    } catch (error) {
        console.error("Error saving state:", error);
    }
}

// Check if it's a new day and reset if needed
function checkDailyReset() {
    const today = new Date().toDateString();
    const lastOpen = dailyBoxState.lastOpenDate;
    
    if (lastOpen !== today) {
        // It's a new day, reset for the day
        dailyBoxState.isOpened = false;
        dailyBoxState.currentContent = null;
        
        // Check if streak should be reset (if missed a day)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastOpen !== yesterday.toDateString()) {
            // Streak broken
            dailyBoxState.streak = 0;
        }
        
        saveState();
    }
}

// Get random content based on smart selection
function getRandomContent() {
    const allContent = [
        ...contentPool.verses,
        ...contentPool.duas,
        ...contentPool.facts,
        ...contentPool.quizzes,
        ...contentPool.stories,
        ...contentPool.prophets,
        ...contentPool.companions
    ];
    
    // Add Friday content if it's Friday
    const dayOfWeek = new Date().getDay();
    if (dayOfWeek === 5) { // Friday
        allContent.push(...contentPool.friday);
    }
    
    // Smart selection based on streak
    if (dailyBoxState.streak > 0 && dailyBoxState.streak % 7 === 0) {
        // Every 7 days, give a badge
        return contentPool.badges[Math.floor(Math.random() * contentPool.badges.length)];
    }
    
    // Return random content
    return allContent[Math.floor(Math.random() * allContent.length)];
}

// Update UI elements
function updateUI() {
    const streakCount = document.getElementById('streakCount');
    const progressFill = document.getElementById('progressFill');
    const nextMilestone = document.getElementById('nextMilestone');
    const openBtn = document.getElementById('openBtn');
    
    if (streakCount) {
        streakCount.textContent = dailyBoxState.streak;
    }
    
    if (progressFill) {
        const progress = Math.min((dailyBoxState.streak / 30) * 100, 100);
        progressFill.style.width = progress + '%';
    }
    
    if (nextMilestone) {
        const nextMilestoneObj = dailyBoxState.milestones.find(m => m.days > dailyBoxState.streak);
        if (nextMilestoneObj) {
            const daysToGo = nextMilestoneObj.days - dailyBoxState.streak;
            nextMilestone.textContent = `${daysToGo} يوم لـ ${nextMilestoneObj.name}`;
        } else {
            nextMilestone.textContent = "ممتاز! لقد حققت جميع الإنجازات";
        }
    }
    
    if (openBtn) {
        if (dailyBoxState.isOpened) {
            openBtn.textContent = "✅ صندوقك مفتوح";
            openBtn.disabled = true;
        } else {
            openBtn.textContent = "🔓 افتح صندوقك";
            openBtn.disabled = false;
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    const giftBox = document.getElementById('giftBox');
    const openBtn = document.getElementById('openBtn');
    const closeBtn = document.getElementById('closeBtn');
    const contentReveal = document.getElementById('contentReveal');
    const contentCard = document.querySelector('.content-card');
    
    if (giftBox) {
        giftBox.addEventListener('click', openBox);
        
        // Add 3D tilt effect
        giftBox.addEventListener('mousemove', (e) => {
            const rect = giftBox.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            giftBox.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        giftBox.addEventListener('mouseleave', () => {
            giftBox.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }
    
    if (openBtn) {
        openBtn.addEventListener('click', openBox);
        
        // Magnetic button effect
        openBtn.addEventListener('mousemove', (e) => {
            const rect = openBtn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            openBtn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
        });
        
        openBtn.addEventListener('mouseleave', () => {
            openBtn.style.transform = 'translate(0, 0) scale(1)';
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeContent);
    }
    
    if (contentReveal) {
        contentReveal.addEventListener('click', (e) => {
            if (e.target === contentReveal) {
                closeContent();
            }
        });
    }
    
    // Mouse tracking for content card glow effect
    if (contentCard) {
        contentCard.addEventListener('mousemove', (e) => {
            const rect = contentCard.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            contentCard.style.setProperty('--mouse-x', x + '%');
            contentCard.style.setProperty('--mouse-y', y + '%');
        });
    }
}

// Open the gift box
function openBox() {
    if (dailyBoxState.isOpened) {
        return; // Already opened today
    }
    
    const giftBox = document.getElementById('giftBox');
    const boxLid = document.getElementById('boxLid');
    
    // Add shaking animation
    if (giftBox) {
        giftBox.classList.add('gift-box-shaking');
    }
    
    // Open the box after shaking
    setTimeout(() => {
        if (giftBox) {
            giftBox.classList.remove('gift-box-shaking');
        }
        
        if (boxLid) {
            boxLid.classList.add('open');
        }
        
        // Select and show content
        const content = getRandomContent();
        dailyBoxState.currentContent = content;
        dailyBoxState.isOpened = true;
        dailyBoxState.streak++;
        dailyBoxState.lastOpenDate = new Date().toDateString();
        
        saveState();
        updateUI();
        
        // Show content modal
        setTimeout(() => {
            showContent(content);
            checkMilestones();
        }, 500);
    }, 1000);
}

// Show content in modal
function showContent(content) {
    const contentReveal = document.getElementById('contentReveal');
    const contentIcon = document.getElementById('contentIcon');
    const contentType = document.getElementById('contentType');
    const contentText = document.getElementById('contentText');
    const contentSource = document.getElementById('contentSource');
    const actionBtn = document.getElementById('actionBtn');
    
    if (!contentReveal) return;
    
    // Set content
    if (contentIcon) contentIcon.textContent = content.icon;
    
    if (contentType) {
        const typeLabels = {
            verse: "آية قرآنية",
            dua: "دعاء",
            fact: "معلومة قرآنية",
            quiz: "تحدي قرآني",
            story: "قصة إسلامية",
            prophet: "معلومات عن نبي",
            companion: "معلومات عن صحابي",
            friday: "محتوى يوم الجمعة",
            badge: "إنجاز"
        };
        contentType.textContent = typeLabels[content.type] || "مفاجأة";
    }
    
    if (contentText) contentText.textContent = content.text;
    
    if (contentSource) contentSource.textContent = content.source;
    
    // Handle action button based on content type
    if (actionBtn) {
        if (content.type === 'quiz') {
            actionBtn.textContent = "🎯 حل التحدي";
            actionBtn.href = "#"; // Could link to quiz section
            actionBtn.style.display = "inline-block";
        } else if (content.type === 'verse') {
            actionBtn.textContent = "📖 افتح الآية";
            actionBtn.href = "astmaa.html"; // Link to audio section
            actionBtn.style.display = "inline-block";
        } else if (content.type === 'badge') {
            actionBtn.textContent = "🏆 عرض الإنجازات";
            actionBtn.href = "#";
            actionBtn.style.display = "inline-block";
        } else {
            actionBtn.style.display = "none";
        }
    }
    
    // Show modal
    contentReveal.classList.add('active');
}

// Close content modal
function closeContent() {
    const contentReveal = document.getElementById('contentReveal');
    if (contentReveal) {
        contentReveal.classList.remove('active');
    }
}

// Check for milestone achievements
function checkMilestones() {
    dailyBoxState.milestones.forEach(milestone => {
        if (dailyBoxState.streak === milestone.days) {
            showMilestoneCelebration(milestone);
        }
    });
}

// Show milestone celebration
function showMilestoneCelebration(milestone) {
    // Create confetti effect
    createConfetti();
    
    // Show milestone notification
    const notification = document.createElement('div');
    notification.className = 'milestone-notification';
    notification.innerHTML = `
        <div class="milestone-content">
            <div class="milestone-icon">🎉</div>
            <h3>${milestone.name}</h3>
            <p>لقد حققت إنجازاً رائعاً!</p>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        z-index: 2000;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        animation: celebrate 1s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Create confetti effect
function createConfetti() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            z-index: 1500;
            animation: confetti-fall ${2 + Math.random() * 2}s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initDailyBox);