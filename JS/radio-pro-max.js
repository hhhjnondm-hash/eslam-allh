/**
 * 📻 Radio Pro Max - Advanced Islamic Radio Player
 * Modern radio player with advanced UI/UX effects
 */

// Radio Stations Data
const radioStations = [
    {
        id: 1,
        name: "محمود خليل الحصري",
        desc: "تلاوات قرآنية مميزة",
        icon: "fa-book-quran",
        avatar: "data/img/shaikh-Mahmoud-Khalil-Al-Hosary.webP",
        url: "https://server13.mp3quran.net/husr/002.mp3"
    },
    {
        id: 2,
        name: "عبدالباسط عبدالصمد",
        desc: "المصحف المجود",
        icon: "fa-microphone",
        avatar: "data/img/shaikh-Abdul-Basit-Abdul-Samad.webP",
        url: "https://server7.mp3quran.net/basit/Almusshaf-Al-Mojawwad/002.mp3"
    },
    {
        id: 3,
        name: "محمد صديق المنشاوي",
        desc: "تلاوات عذبة",
        icon: "fa-star",
        avatar: "data/img/shaikh-Muhammad-Siddiq_Al-Minshawi.webP",
        url: "https://server10.mp3quran.net/minsh/Almusshaf-Al-Mojawwad/002.mp3"
    },
    {
        id: 4,
        name: "مشاري العفاسي",
        desc: "صوت شجي",
        icon: "fa-heart",
        avatar: "data/img/shaikh-Mishari-Al-afasi.webP",
        url: "https://server8.mp3quran.net/afs/002.mp3"
    },
    {
        id: 5,
        name: "سعود الشريم",
        desc: "تلاوات متميزة",
        icon: "fa-mosque",
        avatar: "data/img/shaikh-saood-el-shoram.webP",
        url: "https://server7.mp3quran.net/shur/002.mp3"
    },
    {
        id: 6,
        name: "أبو بكر الشاطري",
        desc: "قراءة متقنة",
        icon: "fa-book-open",
        avatar: "data/img/shaikh-abubakr-as-shatery.webP",
        url: "https://server11.mp3quran.net/shatri/002.mp3"
    },
    {
        id: 7,
        name: "ماهر المعيقلي",
        desc: "صوت رخيم",
        icon: "fa-circle-play",
        avatar: "data/img/shaikh-Maher-Almaikula.webP",
        url: "https://server12.mp3quran.net/maher/002.mp3"
    },
    {
        id: 8,
        name: "ياسر الدوسري",
        desc: "تلاوات مؤثرة",
        icon: "fa-headphones",
        avatar: "data/img/shaikh-Yasser-Al-Dosary.webP",
        url: "https://server11.mp3quran.net/yasser/002.mp3"
    },
    {
        id: 9,
        name: "ناصر القطامي",
        desc: "قراءة واضحة",
        icon: "fa-wave-square",
        avatar: "data/img/shaikh-Naser-Al-Katamy.webP",
        url: "https://server6.mp3quran.net/qtm/002.mp3"
    },
    {
        id: 10,
        name: "خالد الجليل",
        desc: "صوت جميل",
        icon: "fa-music",
        avatar: "data/img/shaikh-khaled-galel.webP",
        url: "https://server10.mp3quran.net/jleel/002.mp3"
    },
    {
        id: 11,
        name: "سعد الغامدي",
        desc: "تلاوات مميزة",
        icon: "fa-record-vinyl",
        avatar: "data/img/shaikh-saad-el-3amde.webP",
        url: "https://server7.mp3quran.net/s_gmd/002.mp3"
    }
];

// Radio Player State
const radioState = {
    isPlaying: false,
    currentStation: null,
    currentStationIndex: 0,
    volume: 1,
    isMuted: false
};

// DOM Elements
const elements = {
    audio: document.getElementById('radio-audio'),
    playBtn: document.getElementById('play-btn'),
    playIcon: document.getElementById('play-icon'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    volumeBtn: document.getElementById('volume-btn'),
    volumeIcon: document.getElementById('volume-icon'),
    volumeSlider: document.getElementById('volume-slider'),
    stationGrid: document.getElementById('station-grid'),
    stationAvatar: document.getElementById('station-avatar'),
    stationName: document.getElementById('station-name'),
    visualizer: document.getElementById('visualizer')
};

// Initialize
function init() {
    renderStations();
    selectStation(radioStations[0]);
    setupEventListeners();
}

// Render Stations
function renderStations() {
    elements.stationGrid.innerHTML = '';
    
    radioStations.forEach((station, index) => {
        const card = document.createElement('div');
        card.className = 'station-card';
        card.dataset.id = station.id;
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <i class="fas ${station.icon} station-icon"></i>
            <div class="station-name">${station.name}</div>
            <div class="station-desc">${station.desc}</div>
        `;
        
        card.addEventListener('click', () => selectStation(station));
        elements.stationGrid.appendChild(card);
    });
}

// Select Station
function selectStation(station) {
    radioState.currentStation = station;
    radioState.currentStationIndex = radioStations.findIndex(s => s.id === station.id);
    
    // Update UI
    elements.stationName.textContent = station.name;
    elements.stationAvatar.src = station.avatar;
    
    // Update active state
    document.querySelectorAll('.station-card').forEach(card => {
        card.classList.remove('active');
        if (card.dataset.id == station.id) {
            card.classList.add('active');
        }
    });
    
    // Load and play audio
    elements.audio.src = station.url;
    if (radioState.isPlaying) {
        playAudio();
    }
}

// Play Audio
function playAudio() {
    // Prevent multiple play requests
    if (elements.audio.played.length > 0 && !elements.audio.paused) {
        return;
    }
    
    elements.audio.play().then(() => {
        radioState.isPlaying = true;
        elements.playIcon.className = 'fas fa-pause';
        elements.visualizer.classList.add('active');
    }).catch(error => {
        console.error('Error playing audio:', error);
        // Only show error if it's not an interruption
        if (error.name !== 'AbortError') {
            showError('حدث خطأ في تشغيل الصوت');
        }
    });
}

// Pause Audio
function pauseAudio() {
    elements.audio.pause();
    radioState.isPlaying = false;
    elements.playIcon.className = 'fas fa-play';
    elements.visualizer.classList.remove('active');
}

// Toggle Play/Pause
function togglePlay() {
    if (radioState.isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

// Play Previous Station
function playPrevious() {
    const prevIndex = radioState.currentStationIndex > 0 
        ? radioState.currentStationIndex - 1 
        : radioStations.length - 1;
    selectStation(radioStations[prevIndex]);
}

// Play Next Station
function playNext() {
    const nextIndex = radioState.currentStationIndex < radioStations.length - 1 
        ? radioState.currentStationIndex + 1 
        : 0;
    selectStation(radioStations[nextIndex]);
}

// Update Volume
function updateVolume(value) {
    radioState.volume = value;
    elements.audio.volume = value;
    
    // Update volume icon
    if (value === 0) {
        elements.volumeIcon.className = 'fas fa-volume-mute';
    } else if (value < 0.5) {
        elements.volumeIcon.className = 'fas fa-volume-low';
    } else {
        elements.volumeIcon.className = 'fas fa-volume-high';
    }
}

// Toggle Mute
function toggleMute() {
    if (radioState.volume > 0) {
        radioState.previousVolume = radioState.volume;
        updateVolume(0);
        elements.volumeSlider.value = 0;
        radioState.isMuted = true;
    } else {
        updateVolume(radioState.previousVolume || 1);
        elements.volumeSlider.value = radioState.previousVolume || 1;
        radioState.isMuted = false;
    }
}

// Show Error Message
function showError(message) {
    // Create toast notification
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255, 99, 71, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        animation: slideDown 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Setup Event Listeners
function setupEventListeners() {
    // Play/Pause
    elements.playBtn.addEventListener('click', togglePlay);
    
    // Previous/Next
    elements.prevBtn.addEventListener('click', playPrevious);
    elements.nextBtn.addEventListener('click', playNext);
    
    // Volume
    elements.volumeSlider.addEventListener('input', (e) => updateVolume(parseFloat(e.target.value)));
    elements.volumeBtn.addEventListener('click', toggleMute);
    
    // Audio Events
    elements.audio.addEventListener('playing', () => {
        elements.visualizer.classList.add('active');
    });
    
    elements.audio.addEventListener('pause', () => {
        elements.visualizer.classList.remove('active');
    });
    
    elements.audio.addEventListener('error', () => {
        showError('حدث خطأ في تحميل الصوت');
        pauseAudio();
    });
    
    elements.audio.addEventListener('stalled', () => {
        showError('انقطع الاتصال بالصوت');
    });
    
    // Keyboard Controls
    document.addEventListener('keydown', (e) => {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                togglePlay();
                break;
            case 'ArrowLeft':
                playPrevious();
                break;
            case 'ArrowRight':
                playNext();
                break;
            case 'ArrowUp':
                e.preventDefault();
                updateVolume(Math.min(1, radioState.volume + 0.1));
                elements.volumeSlider.value = radioState.volume;
                break;
            case 'ArrowDown':
                e.preventDefault();
                updateVolume(Math.max(0, radioState.volume - 0.1));
                elements.volumeSlider.value = radioState.volume;
                break;
            case 'KeyM':
                toggleMute();
                break;
        }
    });
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', init);
