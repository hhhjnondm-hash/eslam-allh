// Safe element selection with error handling
function safeGetElement(selector) {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.warn("Error getting element:", selector, error);
    return null;
  }
}

let containerSoura = safeGetElement(".souras-container");
let containerQuraa = safeGetElement(".container-quraa .content");
let imgQareaa = safeGetElement(".play-list-img");
let nameQareaa = safeGetElement(".name-player-list");
let audio = safeGetElement(".audio audio");
let playPause = safeGetElement(" #player");
let btnCentralVolume = safeGetElement(".btn-container");
let customRangeVolume = safeGetElement("#customRangeVolume");
let VolumControule = safeGetElement(".VolumControule");
let timeLineContainer = safeGetElement(".linePlay .line");
let totalTime = safeGetElement(".total-time");
let thumb = safeGetElement(".thumb");
let currentTime = safeGetElement(".current-time");
let avatarImg = safeGetElement(".audio .avatar img");
let avatarNama = safeGetElement(".avatar-name");
let btnBack = safeGetElement("#back");
let btnNext = safeGetElement("#next");
let btnRepeat = safeGetElement("#repeat");


let qareaTarget = "https://server11.mp3quran.net/shatri/";
let souraTarget = `001`;
let link = ``;
let repeat = false;
let isPlaying = false;
let audioTimeout = null; // Track audio operation timeout

// Simple safe play function
function safePlayAudio() {
  try {
    // Clear any pending audio operations
    if (audioTimeout) {
      clearTimeout(audioTimeout);
      audioTimeout = null;
    }
    
    // Small delay to ensure audio is ready
    audioTimeout = setTimeout(() => {
      if (audio && audio.src) {
        audio.play().then(() => {
          isPlaying = true;
          console.log("Audio playing successfully");
        }).catch(error => {
          console.error("Error playing audio:", error);
          isPlaying = false;
        });
      } else {
        console.warn("Audio element or source not available");
      }
    }, 100);
  } catch (error) {
    console.error("Error in safePlayAudio:", error);
  }
}

// Enhanced error handling and data loading
console.log("Loading Quran audio player...");

// get soura-name with error handling and cache busting
if (containerSoura) {
  const cacheBuster = "v=" + Date.now() + Math.random();
  fetch("./data/soura.json?" + cacheBuster)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log("Soura data loaded:", data);
      let d = data.suwar || data.surahs || []; // Handle different possible key names
      if (d.length === 0) {
        console.error("No surah data found");
        containerSoura.innerHTML = "<p>خطأ في تحميل بيانات السور</p>";
        return;
      }
      // Remove loading indicator
      let loadingIndicator = document.getElementById("soura-loading");
      if (loadingIndicator) loadingIndicator.remove();
      
      paintSouraName(d);
      clickSouraName();
    })
    .catch((error) => {
      console.error("Error loading soura data:", error);
      containerSoura.innerHTML = "<p>خطأ في تحميل بيانات السور</p>";
      let loadingIndicator = document.getElementById("soura-loading");
      if (loadingIndicator) loadingIndicator.remove();
    });
} else {
  console.warn("Soura container not found, skipping surah data loading");
}

// paint data-soura-name
const paintSouraName = (data) => {
  containerSoura.innerHTML = ""; // Clear container first
  for (let i = 0; i < data.length; i++) {
    containerSoura.innerHTML += `
        <div id="${data[i].id}" class="soura">
          <span id="${data[i].id}"  class="num">${data[i].id}</span> <span id="${data[i].id}"  class="name">${data[i].name}</span>
        </div>
    `;
  }
  // Set first surah as active
  let firstSoura = document.querySelector(".souras-container .soura");
  if (firstSoura) {
    firstSoura.classList.add("active");
    souraTarget = firstSoura.id;
    getLink();
  }
};

// click soura name
const clickSouraName = () => {
  let souraName = document.querySelectorAll(".souras-container .soura");
  souraName.forEach((e) => {
    e.addEventListener("click", (s) => {
      souraName.forEach((ex) => {
        ex.classList.remove("active");
      });
      s.target.closest('.soura').classList.add("active");
      souraTarget = s.target.closest('.soura').id;
      getLink();
      safePlayAudio();
    });
  });
};

// get qarea data with error handling and cache busting
if (containerQuraa) {
  const cacheBuster2 = "v=" + Date.now() + Math.random();
  fetch("./data/mashaykh.json?" + cacheBuster2)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log("Quraa data loaded:", data);
      let d = data.reciters || data.mashaykh || []; // Handle different possible key names
      if (d.length === 0) {
        console.error("No quraa data found");
        containerQuraa.innerHTML = "<p>خطأ في تحميل بيانات القراء</p>";
        return;
      }
      // Remove loading indicator
      let loadingIndicator = document.getElementById("quraa-loading");
      if (loadingIndicator) loadingIndicator.remove();
      
      praintImg(d);
      getQareaToTarget(d);
    })
    .catch((error) => {
      console.error("Error loading quraa data:", error);
      containerQuraa.innerHTML = "<p>خطأ في تحميل بيانات القراء</p>";
      let loadingIndicator = document.getElementById("quraa-loading");
      if (loadingIndicator) loadingIndicator.remove();
    });
} else {
  console.warn("Quraa container not found, skipping reciter data loading");
}

// praint data-img&name
const praintImg = (d) => {
  containerQuraa.innerHTML = ""; // Clear container first
  console.log("Printing", d.length, "reciters");
  
  for (let i = 0; i < d.length; i++) {
    // Use placeholder image if img is not available
    let imgUrl = d[i].img || `https://ui-avatars.com/api/?name=${encodeURIComponent(d[i].name)}&background=random`;
    
    // Add cache busting only for external images (not local ./data/img/)
    if (d[i].img && !d[i].img.startsWith('./data/img/')) {
      imgUrl += "?t=" + Date.now();
    }
    
    containerQuraa.innerHTML += `
          <div id="reciter-${d[i].id}" class="qareaa">
      <div class="img-qarea">
        <img id="img-${d[i].id}" src="${imgUrl}" alt="${d[i].name}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(d[i].name)}&background=random'">
      </div>
      <div class="text">
        <p id="name-${d[i].id}" >${d[i].name}</p>
      </div>
    </div>
    `;
  }
};

// qarea target
const getQareaToTarget = (d) => {
  let quraa = document.querySelectorAll(".container-quraa .content .qareaa");
  console.log("Setting up click handlers for", quraa.length, "reciters");
  
  quraa.forEach((e) => {
    e.addEventListener("click", (s) => {
      addActiveFromSoura(s.target);
      let targetElement = s.target.closest('.qareaa');
      let targetId = targetElement.id.replace('reciter-', '');
      console.log("Clicked reciter ID:", targetId, "element:", targetElement.id);
      
      let target = d.find(item => item.id == targetId);
      
      if (!target) {
        console.error("Quraa target not found:", targetId);
        return;
      }
      
      console.log("Selected reciter:", target.name, "with server:", target.moshaf[0].server);
      
      // Handle different data structures with better error handling
      let serverUrl = "";
      try {
        if (target.moshaf && Array.isArray(target.moshaf) && target.moshaf[0] && target.moshaf[0].server) {
          serverUrl = target.moshaf[0].server;
        } else if (target.server) {
          serverUrl = target.server;
        } else if (target.moshaf && typeof target.moshaf === 'object' && target.moshaf.server) {
          serverUrl = target.moshaf.server;
        } else {
          console.error("No server URL found for quraa:", target);
          serverUrl = "https://server11.mp3quran.net/shatri/";
        }
      } catch (error) {
        console.error("Error accessing moshaf data:", error);
        serverUrl = "https://server11.mp3quran.net/shatri/";
      }
      
      // Update global server URL
      qareaTarget = serverUrl;
      console.log("Updated qareaTarget to:", qareaTarget);
      
      let imgUrl = target.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(target.name)}&background=random`;
      
      // Add cache busting to image
      if (target.img) {
        imgUrl += "?t=" + Date.now();
      }
      
      console.log("Updating UI with:", target.name, "server:", serverUrl, "image:", imgUrl);
      
      imgQareaa.src = imgUrl;
      imgQareaa.classList.remove("rotate");
      setTimeout(() => imgQareaa.classList.add("rotate"), 100);
      avatarImg.src = imgUrl;
      avatarNama.textContent = target.name;
      nameQareaa.textContent = target.name;
      
      // Stop current audio before loading new one
      audio.pause();
      audio.currentTime = 0;
      
      getLink();
      safePlayAudio();
      addActiveFromSoura(+souraTarget);
    });
  });
};

btnRepeat.addEventListener("click", () => {
  btnRepeat.classList.toggle("active");
  if (btnRepeat.classList.contains("active")) {
    repeat = true;
  } else {
    repeat = false;
  }
});

audio.addEventListener("ended", () => {
  if (repeat) {
    getLink();
    safePlayAudio();
  } else {
    let currentSoura = parseInt(souraTarget);
    if (currentSoura >= 114) {
      return;
    } else {
      currentSoura++;
      souraTarget = currentSoura.toString();
      getLink();
      addActiveFromSoura(currentSoura);
      safePlayAudio();
    }
  }
});

getLink = () => {
  let currentSoura = parseInt(souraTarget);
  if (isNaN(currentSoura)) currentSoura = 1;
  
  // Format surah number to 3 digits
  souraTarget = currentSoura.toString().padStart(3, '0');
  
  link = `${qareaTarget}${souraTarget}.mp3`;
  console.log("Audio link:", link, "from server:", qareaTarget);
  
  // Clear any previous error handlers
  audio.onerror = null;
  
  // Force reload by adding timestamp
  let finalLink = link + "?t=" + Date.now();
  console.log("Forcing reload with timestamp:", finalLink);
  
  audio.src = finalLink;
  
  // Add error handling with fallback
  audio.onerror = function() {
    console.error("Error loading audio:", finalLink);
    
    // Always fallback to Shatri server if there's an error
    if (qareaTarget !== "https://server11.mp3quran.net/shatri/") {
      console.log("Trying Shatri server as fallback...");
      qareaTarget = "https://server11.mp3quran.net/shatri/";
      link = `${qareaTarget}${souraTarget}.mp3`;
      finalLink = link + "?t=" + Date.now();
      console.log("Fallback link:", finalLink);
      audio.src = finalLink;
    } else {
      console.error("Shatri server also failed, no more fallbacks");
    }
  };
  
  // Add success handler
  audio.onloadeddata = function() {
    console.log("Audio loaded successfully:", finalLink);
  };
};

// Initialize with first surah
getLink();

playPause.addEventListener("click", togglePaly);

function togglePaly() {
  if (audio.paused) {
    safePlayAudio();
  } else {
    audio.pause();
    isPlaying = false;
    playPause.innerHTML = `<i class="fa-solid fa-play"></i>`;
  }
}

btnCentralVolume.addEventListener("click", toggleMute);
customRangeVolume.addEventListener("input", (e) => {
  audio.volume = e.target.value;
  audio.muted = e.target.value === 0;
});

function toggleMute() {
  audio.muted = !audio.muted;
}

audio.addEventListener("volumechange", () => {
  customRangeVolume.value = audio.volume;
  let volumeLevel;
  if (audio.muted || audio.volume == 0) {
    customRangeVolume.value = 0;
    volumeLevel = "mute";
  } else if (audio.volume >= 0.7) {
    volumeLevel = "hight";
  } else if (audio.volume >= 0.5) {
    volumeLevel = "middle";
  } else {
    volumeLevel = "low";
  }

  VolumControule.dataset.volume = volumeLevel;
});

// time audio play
audio.addEventListener("loadeddata", () => {
  if (audio.duration && !isNaN(audio.duration)) {
    totalTime.textContent = formatDataTime(audio.duration);
  }
});

audio.addEventListener("timeupdate", () => {
  if (audio.currentTime && !isNaN(audio.currentTime)) {
    currentTime.textContent = formatDataTime(audio.currentTime);
    let percent = audio.currentTime / audio.duration;
    if (!isNaN(percent)) {
      timeLineContainer.style.setProperty("--preview-progress", percent);
    }
  }
});

function formatDataTime(time) {
  if (!time || isNaN(time)) return "00:00";
  
  let seconds = Math.floor(time % 60);
  let minutes = Math.floor(time / 60) % 60;
  let hours = Math.floor(time / 3600);

  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  if (hours === 0) {
    return `${minutes}:${seconds}`;
  } else {
    return `${hours}:${minutes}:${seconds}`;
  }
}

// time line
timeLineContainer.addEventListener("mouseover", handlerTimeLine);
timeLineContainer.addEventListener("mousedown", toggleIsScrubbing);

document.addEventListener("mouseup", (e) => {
  if (isScrubbing) toggleIsScrubbing(e);
});
document.addEventListener("mousemove", (e) => {
  if (isScrubbing) handlerTimeLine(e);
});

let isScrubbing = false;
let wasPaused;
function toggleIsScrubbing(e) {
  let rect = timeLineContainer.getBoundingClientRect();
  let percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;

  isScrubbing = (e.buttons & 1) == 1;

  timeLineContainer.classList.toggle("scrubbing", isScrubbing);
  if (isScrubbing) {
    wasPaused = audio.paused;
    audio.pause();
  } else {
    if (!wasPaused) {
      audio.currentTime = percent * audio.duration;
      audio.play().catch(e => console.log("Audio play error:", e));
    }
  }
  handlerTimeLine(e);
}

function handlerTimeLine(e) {
  let rect = timeLineContainer.getBoundingClientRect();
  let percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
  timeLineContainer.style.setProperty("--progress-position", percent);

  if (isScrubbing) {
    e.preventDefault();
    timeLineContainer.style.setProperty("--preview-progress", percent);
  }
}

// next And Prev btn
btnNext.addEventListener("click", changNextSoura);
btnBack.addEventListener("click", changPrevSoura);

function changNextSoura() {
  let currentSoura = parseInt(souraTarget);
  if (currentSoura >= 114) {
    return;
  } else {
    currentSoura++;
    souraTarget = currentSoura.toString();
    getLink();
    addActiveFromSoura(currentSoura);
    safePlayAudio();
  }
}

function changPrevSoura() {
  let currentSoura = parseInt(souraTarget);
  if (currentSoura <= 1) {
    return;
  } else {
    currentSoura--;
    souraTarget = currentSoura.toString();
    getLink();
    addActiveFromSoura(currentSoura);
    safePlayAudio();
  }
}

// add Active soura
function addActiveFromSoura(num) {
  let souraName = document.querySelectorAll(".souras-container .soura");
  souraName.forEach((e) => {
    e.classList.remove("active");
    if (e.id == num) {
      e.classList.add("active");
    }
  });
}

// Add loading indicator
console.log("Quran audio player initialized successfully");
