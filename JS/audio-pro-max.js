/**
 * 🎵 Audio Pro Max - Advanced Quran Audio Player
 * Modern audio player with advanced UI/UX effects
 */

// Audio Player State
const audioState = {
    isPlaying: false,
    currentReciter: null,
    currentSurah: null,
    isRepeat: false,
    isShuffle: false,
    volume: 1,
    quraaData: [],
    surahData: []
};

// DOM Elements
const elements = {
    audio: document.getElementById('audio-element'),
    playBtn: document.getElementById('play-btn'),
    playIcon: document.getElementById('play-icon'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    repeatBtn: document.getElementById('repeat-btn'),
    shuffleBtn: document.getElementById('shuffle-btn'),
    volumeBtn: document.getElementById('volume-btn'),
    volumeIcon: document.getElementById('volume-icon'),
    volumeSlider: document.getElementById('volume-slider'),
    progressBar: document.getElementById('progress-bar'),
    progressFill: document.getElementById('progress-fill'),
    currentTime: document.getElementById('current-time'),
    totalTime: document.getElementById('total-time'),
    playerAvatar: document.getElementById('player-avatar'),
    playerName: document.getElementById('player-name'),
    quraaGrid: document.getElementById('quraa-grid'),
    souraGrid: document.getElementById('soura-grid')
};

// Initialize
function init() {
    loadQuraaData();
    loadSurahData();
    setupEventListeners();
}

// Load Quraa Data
async function loadQuraaData() {
    try {
        const response = await fetch('./data/mashaykh.json?v=' + Date.now());
        const data = await response.json();
        audioState.quraaData = data.reciters || [];
        renderQuraa(audioState.quraaData);
        
        // Select first reciter by default
        if (audioState.quraaData.length > 0) {
            selectReciter(audioState.quraaData[0]);
        }
    } catch (error) {
        console.error('Error loading quraa data:', error);
        elements.quraaGrid.innerHTML = '<p class="error-text">خطأ في تحميل بيانات القراء</p>';
    }
}

// Load Surah Data
async function loadSurahData() {
    try {
        const response = await fetch('./data/soura.json?v=' + Date.now());
        const data = await response.json();
        audioState.surahData = data.suwar || data.surahs || [];
        renderSurah(audioState.surahData);
        
        // Select first surah by default
        if (audioState.surahData.length > 0) {
            selectSurah(audioState.surahData[0]);
        }
    } catch (error) {
        console.error('Error loading surah data:', error);
        elements.souraGrid.innerHTML = '<p class="error-text">خطأ في تحميل بيانات السور</p>';
    }
}

// Render Quraa Grid
function renderQuraa(quraa) {
    elements.quraaGrid.innerHTML = '';
    
    quraa.forEach((reciter, index) => {
        const card = document.createElement('div');
        card.className = 'quraa-card';
        card.dataset.id = reciter.id;
        card.style.animationDelay = `${index * 0.05}s`;
        
        const imgSrc = reciter.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(reciter.name)}&background=random`;
        
        card.innerHTML = `
            <img src="${imgSrc}" alt="${reciter.name}" class="quraa-img" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(reciter.name)}&background=random'">
            <div class="quraa-name">${reciter.name}</div>
        `;
        
        card.addEventListener('click', () => selectReciter(reciter));
        elements.quraaGrid.appendChild(card);
    });
}

// Render Surah Grid
function renderSurah(surahs) {
    elements.souraGrid.innerHTML = '';
    
    surahs.forEach((surah, index) => {
        const card = document.createElement('div');
        card.className = 'soura-card';
        card.dataset.id = surah.id;
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <div class="soura-num">${surah.id}</div>
            <div class="soura-name">${surah.name}</div>
        `;
        
        card.addEventListener('click', () => selectSurah(surah));
        elements.souraGrid.appendChild(card);
    });
}

// Select Reciter
function selectReciter(reciter) {
    audioState.currentReciter = reciter;
    
    // Update UI
    elements.playerName.textContent = reciter.name;
    const imgSrc = reciter.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(reciter.name)}&background=random`;
    elements.playerAvatar.src = imgSrc;
    
    // Update active state
    document.querySelectorAll('.quraa-card').forEach(card => {
        card.classList.remove('active');
        if (card.dataset.id == reciter.id) {
            card.classList.add('active');
        }
    });
    
    // Reload audio if surah is selected
    if (audioState.currentSurah) {
        loadAudio();
    }
}

// Select Surah
function selectSurah(surah) {
    audioState.currentSurah = surah;
    
    // Update active state
    document.querySelectorAll('.soura-card').forEach(card => {
        card.classList.remove('active');
        if (card.dataset.id == surah.id) {
            card.classList.add('active');
        }
    });
    
    // Load audio
    loadAudio();
}

// Load Audio
function loadAudio() {
    if (!audioState.currentReciter || !audioState.currentSurah) return;
    
    const serverUrl = audioState.currentReciter.moshaf[0].server;
    const surahId = String(audioState.currentSurah.id).padStart(3, '0');
    const audioUrl = `${serverUrl}${surahId}.mp3`;
    
    elements.audio.src = audioUrl;
    
    if (audioState.isPlaying) {
        playAudio();
    }
}

// Play Audio
function playAudio() {
    elements.audio.play().then(() => {
        audioState.isPlaying = true;
        elements.playIcon.className = 'fas fa-pause';
    }).catch(error => {
        console.error('Error playing audio:', error);
    });
}

// Pause Audio
function pauseAudio() {
    elements.audio.pause();
    audioState.isPlaying = false;
    elements.playIcon.className = 'fas fa-play';
}

// Toggle Play/Pause
function togglePlay() {
    if (audioState.isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

// Play Previous Surah
function playPrevious() {
    if (!audioState.currentSurah) return;
    
    const currentIndex = audioState.surahData.findIndex(s => s.id === audioState.currentSurah.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : audioState.surahData.length - 1;
    
    selectSurah(audioState.surahData[prevIndex]);
}

// Play Next Surah
function playNext() {
    if (!audioState.currentSurah) return;
    
    const currentIndex = audioState.surahData.findIndex(s => s.id === audioState.currentSurah.id);
    const nextIndex = currentIndex < audioState.surahData.length - 1 ? currentIndex + 1 : 0;
    
    selectSurah(audioState.surahData[nextIndex]);
}

// Toggle Repeat
function toggleRepeat() {
    audioState.isRepeat = !audioState.isRepeat;
    elements.repeatBtn.classList.toggle('active', audioState.isRepeat);
    elements.audio.loop = audioState.isRepeat;
}

// Toggle Shuffle
function toggleShuffle() {
    audioState.isShuffle = !audioState.isShuffle;
    elements.shuffleBtn.classList.toggle('active', audioState.isShuffle);
}

// Update Volume
function updateVolume(value) {
    audioState.volume = value;
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
    if (audioState.volume > 0) {
        audioState.previousVolume = audioState.volume;
        updateVolume(0);
        elements.volumeSlider.value = 0;
    } else {
        updateVolume(audioState.previousVolume || 1);
        elements.volumeSlider.value = audioState.previousVolume || 1;
    }
}

// Format Time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update Progress
function updateProgress() {
    const { currentTime, duration } = elements.audio;
    
    if (duration) {
        const progress = (currentTime / duration) * 100;
        elements.progressFill.style.width = `${progress}%`;
        elements.currentTime.textContent = formatTime(currentTime);
        elements.totalTime.textContent = formatTime(duration);
    }
}

// Seek Audio
function seekAudio(e) {
    const rect = elements.progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const duration = elements.audio.duration;
    
    if (duration) {
        elements.audio.currentTime = percentage * duration;
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Play/Pause
    elements.playBtn.addEventListener('click', togglePlay);
    
    // Previous/Next
    elements.prevBtn.addEventListener('click', playPrevious);
    elements.nextBtn.addEventListener('click', playNext);
    
    // Repeat/Shuffle
    elements.repeatBtn.addEventListener('click', toggleRepeat);
    elements.shuffleBtn.addEventListener('click', toggleShuffle);
    
    // Volume
    elements.volumeSlider.addEventListener('input', (e) => updateVolume(parseFloat(e.target.value)));
    elements.volumeBtn.addEventListener('click', toggleMute);
    
    // Progress
    elements.progressBar.addEventListener('click', seekAudio);
    
    // Audio Events
    elements.audio.addEventListener('timeupdate', updateProgress);
    elements.audio.addEventListener('loadedmetadata', updateProgress);
    elements.audio.addEventListener('ended', () => {
        if (audioState.isRepeat) {
            playAudio();
        } else if (audioState.isShuffle) {
            const randomIndex = Math.floor(Math.random() * audioState.surahData.length);
            selectSurah(audioState.surahData[randomIndex]);
        } else {
            playNext();
        }
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
                updateVolume(Math.min(1, audioState.volume + 0.1));
                elements.volumeSlider.value = audioState.volume;
                break;
            case 'ArrowDown':
                e.preventDefault();
                updateVolume(Math.max(0, audioState.volume - 0.1));
                elements.volumeSlider.value = audioState.volume;
                break;
        }
    });
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', init);
