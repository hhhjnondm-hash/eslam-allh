/**
 * 📖 Reads Pro Max - Advanced Quran Reading Player
 * Based on islameyat.site online system
 * Uses API for per-ayah audio synchronization
 */

// Reads Player State
const readsState = {
    isPlaying: false,
    currentReciter: null,
    currentSurah: null,
    isRepeat: false,
    isShuffle: false,
    volume: 1,
    quraaData: [],
    surahData: [],
    currentAyahIndex: 0,
    ayahsAudio: [],
    ayahsText: [],
    audioSource: 'api' // 'api' or 'reciter'
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
    quraaList: document.getElementById('quraa-list'),
    souraList: document.getElementById('soura-list'),
    surahTitle: document.getElementById('surah-title'),
    surahSubtitle: document.getElementById('surah-subtitle'),
    ayahsList: document.getElementById('ayahs-list'),
    currentAyahInfo: document.getElementById('current-ayah-info'),
    currentAyahNumber: document.getElementById('current-ayah-number'),
    apiSourceBtn: document.getElementById('api-source-btn'),
    reciterSourceBtn: document.getElementById('reciter-source-btn')
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
        readsState.quraaData = data.reciters || [];
        renderQuraa(readsState.quraaData);
        
        // Select first reciter by default
        if (readsState.quraaData.length > 0) {
            selectReciter(readsState.quraaData[0]);
        }
    } catch (error) {
        console.error('Error loading quraa data:', error);
        elements.quraaList.innerHTML = '<p class="error-text">خطأ في تحميل بيانات القراء</p>';
    }
}

// Load Surah Data
async function loadSurahData() {
    try {
        const response = await fetch('./data/soura.json?v=' + Date.now());
        const data = await response.json();
        readsState.surahData = data.suwar || data.surahs || [];
        renderSurah(readsState.surahData);
        
        // Select first surah by default
        if (readsState.surahData.length > 0) {
            selectSurah(readsState.surahData[0]);
        }
    } catch (error) {
        console.error('Error loading surah data:', error);
        elements.souraList.innerHTML = '<p class="error-text">خطأ في تحميل بيانات السور</p>';
    }
}

// Render Quraa List
function renderQuraa(quraa) {
    elements.quraaList.innerHTML = '';
    
    quraa.forEach((reciter, index) => {
        const item = document.createElement('div');
        item.className = 'quraa-item';
        item.dataset.id = reciter.id;
        item.style.animationDelay = `${index * 0.05}s`;
        
        const imgSrc = reciter.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(reciter.name)}&background=random`;
        
        item.innerHTML = `
            <img src="${imgSrc}" alt="${reciter.name}" class="quraa-item-img" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(reciter.name)}&background=random'">
            <div class="quraa-item-name">${reciter.name}</div>
        `;
        
        item.addEventListener('click', () => selectReciter(reciter));
        elements.quraaList.appendChild(item);
    });
}

// Render Surah List
function renderSurah(surahs) {
    elements.souraList.innerHTML = '';
    
    surahs.forEach((surah, index) => {
        const item = document.createElement('div');
        item.className = 'soura-item';
        item.dataset.id = surah.id;
        item.style.animationDelay = `${index * 0.05}s`;
        
        item.innerHTML = `
            <div class="soura-num">${surah.id}</div>
            <div class="soura-name">${surah.name}</div>
        `;
        
        item.addEventListener('click', () => selectSurah(surah));
        elements.souraList.appendChild(item);
    });
}

// Select Reciter
function selectReciter(reciter) {
    readsState.currentReciter = reciter;
    
    // Update UI
    elements.playerName.textContent = reciter.name;
    const imgSrc = reciter.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(reciter.name)}&background=random`;
    elements.playerAvatar.src = imgSrc;
    
    // Update active state
    document.querySelectorAll('.quraa-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.id == reciter.id) {
            item.classList.add('active');
        }
    });
    
    // Reload audio if surah is selected
    if (readsState.currentSurah) {
        loadAudio();
    }
}

// Select Surah - Fetch from API
async function selectSurah(surah) {
    readsState.currentSurah = surah;
    
    // Update active state
    document.querySelectorAll('.soura-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.id == surah.id) {
            item.classList.add('active');
        }
    });
    
    // Update surah info
    elements.surahTitle.textContent = `سورة ${surah.name}`;
    elements.surahSubtitle.textContent = 'جاري تحميل الآيات...';
    
    // Fetch ayahs from API
    await getAyahs(surah.id);
}

// Get Ayahs from API with Reciter Audio Support
async function getAyahs(surahNumber) {
    try {
        elements.ayahsList.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p class="loading-text">جاري تحميل الآيات...</p></div>';
        
        const response = await fetch(`https://api.quran.gading.dev/surah/${surahNumber}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        const surahData = data.data;
        
        // Update subtitle
        elements.surahSubtitle.textContent = `${surahData.numberOfVerses} آيات`;
        
        // Reset state
        readsState.currentAyahIndex = 0;
        readsState.ayahsAudio = [];
        readsState.ayahsText = [];
        
        // Store ayah data based on audio source
        if (readsState.audioSource === 'reciter' && readsState.currentReciter && readsState.currentReciter.moshaf && readsState.currentReciter.moshaf[0]) {
            // Use reciter's surah audio (single file for whole surah)
            const serverUrl = readsState.currentReciter.moshaf[0].server;
            const surahId = String(surahNumber).padStart(3, '0');
            const reciterAudioUrl = `${serverUrl}${surahId}.mp3`;
            
            // Store the same audio URL for all ayahs (we'll use time-based estimation)
            for (let i = 0; i < surahData.verses.length; i++) {
                readsState.ayahsAudio.push(reciterAudioUrl);
                readsState.ayahsText.push(surahData.verses[i].text.arab);
            }
            
            // Load the reciter audio
            elements.audio.src = reciterAudioUrl;
            elements.audio.load();
        } else {
            // Use API audio (per-ayah)
            for (let i = 0; i < surahData.verses.length; i++) {
                readsState.ayahsAudio.push(surahData.verses[i].audio.primary);
                readsState.ayahsText.push(surahData.verses[i].text.arab);
            }
        }
        
        // Render ayahs
        renderAyahs(surahData);
        
        // Start playing first ayah
        changeAyah(0);
        
    } catch (error) {
        console.error('Error loading ayahs:', error);
        elements.surahSubtitle.textContent = 'خطأ في تحميل الآيات';
        elements.ayahsList.innerHTML = '<p class="error-text">حدث خطأ في تحميل الآيات من API</p>';
    }
}

// Render Ayahs from API data
function renderAyahs(surahData) {
    elements.ayahsList.innerHTML = '';
    
    // Add Bismillah
    const bismillah = document.createElement('div');
    bismillah.className = 'ayah-item bismillah';
    bismillah.innerHTML = `
        <p class="ayah-text">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
    `;
    elements.ayahsList.appendChild(bismillah);
    
    // Add surah name
    const surahName = document.createElement('div');
    surahName.className = 'surah-name-display';
    surahName.innerHTML = `<h3>${surahData.name.long}</h3>`;
    elements.ayahsList.appendChild(surahName);
    
    // Render each ayah
    for (let i = 0; i < surahData.verses.length; i++) {
        const item = document.createElement('div');
        item.className = 'ayah-item';
        item.dataset.index = i;
        item.id = i;
        
        item.innerHTML = `
            <span class="ayah-number">${i + 1}</span>
            <p class="ayah-text">${surahData.verses[i].text.arab}</p>
        `;
        
        item.addEventListener('click', () => {
            readsState.currentAyahIndex = i;
            changeAyah(i);
            scrollToAyah(i);
        });
        
        elements.ayahsList.appendChild(item);
    }
    
    // Setup click handlers
    const ayahs = document.querySelectorAll('.ayah-item:not(.bismillah)');
    setupAyahClickHandlers(ayahs);
}

// Setup Ayah Click Handlers
function setupAyahClickHandlers(ayahs) {
    ayahs.forEach((ayah) => {
        ayah.addEventListener('click', () => {
            readsState.currentAyahIndex = parseInt(ayah.id);
            changeAyah(readsState.currentAyahIndex);
            scrollToAyah(readsState.currentAyahIndex);
        });
    });
}

// Change Ayah - Play specific ayah audio
function changeAyah(index) {
    if (index < readsState.ayahsText.length) {
        if (readsState.audioSource === 'reciter') {
            // For reciter audio, we use time-based estimation
            // Calculate approximate time for each ayah
            const duration = elements.audio.duration || 300; // fallback 5 minutes
            const ayahTime = duration / readsState.ayahsText.length;
            const startTime = index * ayahTime;
            
            elements.audio.currentTime = startTime;
            elements.audio.play();
        } else {
            // Use API per-ayah audio
            elements.audio.src = readsState.ayahsAudio[index];
            elements.audio.play();
        }
        
        ayaColorChange(index);
        readsState.isPlaying = true;
        elements.playIcon.className = 'fas fa-pause';
        updateAyahInfo();
    }
}

// Change Ayah Color
function ayaColorChange(index) {
    const ayahs = document.querySelectorAll('.ayah-item:not(.bismillah)');
    ayahs.forEach((ayah) => {
        ayah.classList.remove('active');
        if (parseInt(ayah.id) === index) {
            ayah.classList.add('active');
        }
    });
}

// Scroll to Ayah
function scrollToAyah(index) {
    const targetElements = document.querySelectorAll('.ayah-item:not(.bismillah)');
    if (index >= 0 && index < targetElements.length) {
        const targetElement = targetElements[index];
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Update Ayah Info Display
function updateAyahInfo() {
    if (elements.currentAyahNumber && readsState.ayahsText.length > 0) {
        elements.currentAyahNumber.textContent = `${readsState.currentAyahIndex + 1} / ${readsState.ayahsText.length}`;
    }
}

// Toggle Play/Pause
function togglePlay() {
    if (readsState.isPlaying) {
        elements.audio.pause();
        readsState.isPlaying = false;
        elements.playIcon.className = 'fas fa-play';
    } else {
        elements.audio.play();
        readsState.isPlaying = true;
        elements.playIcon.className = 'fas fa-pause';
    }
}

// Play Previous Ayah
function playPrevious() {
    if (readsState.currentAyahIndex > 0) {
        readsState.currentAyahIndex--;
        changeAyah(readsState.currentAyahIndex);
        scrollToAyah(readsState.currentAyahIndex);
    }
}

// Play Next Ayah
function playNext() {
    if (readsState.currentAyahIndex < readsState.ayahsText.length - 1) {
        readsState.currentAyahIndex++;
        changeAyah(readsState.currentAyahIndex);
        scrollToAyah(readsState.currentAyahIndex);
    }
}

// Toggle Repeat
function toggleRepeat() {
    readsState.isRepeat = !readsState.isRepeat;
    elements.repeatBtn.classList.toggle('active', readsState.isRepeat);
    elements.audio.loop = readsState.isRepeat;
}

// Toggle Shuffle (not applicable with per-ayah system)
function toggleShuffle() {
    readsState.isShuffle = !readsState.isShuffle;
    elements.shuffleBtn.classList.toggle('active', readsState.isShuffle);
}

// Update Volume
function updateVolume(value) {
    readsState.volume = value;
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
    if (readsState.volume > 0) {
        readsState.previousVolume = readsState.volume;
        updateVolume(0);
        elements.volumeSlider.value = 0;
    } else {
        updateVolume(readsState.previousVolume || 1);
        elements.volumeSlider.value = readsState.previousVolume || 1;
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

    // Audio Ended - Auto-advance to next ayah
    elements.audio.addEventListener('ended', () => {
        if (readsState.isRepeat) {
            changeAyah(readsState.currentAyahIndex);
            scrollToAyah(readsState.currentAyahIndex);
        } else {
            if (readsState.currentAyahIndex < readsState.ayahsText.length - 1) {
                readsState.currentAyahIndex++;
                changeAyah(readsState.currentAyahIndex);
                scrollToAyah(readsState.currentAyahIndex);
            } else {
                // End of surah
                readsState.isPlaying = false;
                elements.playIcon.className = 'fas fa-play';
                readsState.currentAyahIndex = 0;
            }
        }
    });
    
    // Audio Source Toggle
    if (elements.apiSourceBtn && elements.reciterSourceBtn) {
        elements.apiSourceBtn.addEventListener('click', () => {
            readsState.audioSource = 'api';
            elements.apiSourceBtn.classList.add('active');
            elements.reciterSourceBtn.classList.remove('active');
            
            // Reload current surah with new audio source
            if (readsState.currentSurah) {
                selectSurah(readsState.currentSurah);
            }
        });
        
        elements.reciterSourceBtn.addEventListener('click', () => {
            if (!readsState.currentReciter) {
                alert('الرجاء اختيار قارئ أولاً');
                return;
            }
            
            readsState.audioSource = 'reciter';
            elements.reciterSourceBtn.classList.add('active');
            elements.apiSourceBtn.classList.remove('active');
            
            // Reload current surah with new audio source
            if (readsState.currentSurah) {
                selectSurah(readsState.currentSurah);
            }
        });
    }
    
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
                updateVolume(Math.min(1, readsState.volume + 0.1));
                elements.volumeSlider.value = readsState.volume;
                break;
            case 'ArrowDown':
                e.preventDefault();
                updateVolume(Math.max(0, readsState.volume - 0.1));
                elements.volumeSlider.value = readsState.volume;
                break;
        }
    });
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', init);
