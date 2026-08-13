let radioContainer = document.querySelector(".radio-container");
let containerSoura = document.querySelector(".souras-container");
let containerQuraa = document.querySelector(".container-quraa .content");
let imgQareaa = document.querySelector(".play-list-img");
let nameQareaa = document.querySelector(".name-player-list");
let audio = document.querySelector(".audio audio");
let playPause = document.querySelector(" #player");
let btnCentralVolume = document.querySelector(".btn-container");
let customRangeVolume = document.querySelector("#customRangeVolume");
let VolumControule = document.querySelector(".VolumControule");
let avatarImg = document.querySelector(".audio .avatar img");


let QareaAudio = 0;
let src = "https://backup.qurango.net/radio/mahmoud_khalil_alhussary";

let urls = []
// Add cache busting to ensure fresh data
const cacheBuster = "v=" + Date.now() + Math.random();
fetch("./data/radio.json?" + cacheBuster)
  .then((res) => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  })
  .then((data) => {
    console.log("Radio data loaded:", data);
    for (let i = 0; i < data.radios.length; i++) {
      urls.push(data.radios[i].url);
      radioContainer.innerHTML += `
      <div id="radio-${data.radios[i].id}" class="qarea">
    <img id="img-${data.radios[i].id}" src="${data.radios[i].img}" alt="${data.radios[i].name}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(data.radios[i].name)}&background=random'">
    <p id="name-${data.radios[i].id}">${data.radios[i].name}</p>
    </div>
    `;
    }
    if (document.querySelectorAll(".radio-container .qarea").length > 0) {
      document
        .querySelectorAll(".radio-container .qarea")[0]
        .classList.add("active");
      audio.src = src;
      clickQarea(data.radios);
    } else {
      console.error("No radio stations loaded");
      radioContainer.innerHTML = "<p>خطأ في تحميل محطات الراديو</p>";
    }
  })
  .catch((error) => {
    console.error("Error loading radio data:", error);
    radioContainer.innerHTML = "<p>خطأ في تحميل محطات الراديو</p>";
  });

const clickQarea = (d) => {
  let qareas = document.querySelectorAll(".radio-container .qarea");
  console.log("Setting up click handlers for", qareas.length, "radio stations");
  
  qareas.forEach((qarea) => {
    qarea.addEventListener("click", (s) => {
      qareas.forEach((e) => {
        e.classList.remove("active");
      });

      qarea.classList.add("active");
      let targetElement = s.target.closest('.qarea');
      let targetId = targetElement.id.replace('radio-', '');
      console.log("Clicked radio ID:", targetId, "element:", targetElement.id);
      
      let target = d.find(item => item.id == targetId);
      
      if (!target) {
        console.error("Radio target not found:", targetId);
        return;
      }
      
      console.log("Selected radio:", target.name, "URL:", target.url);
      
      src = target.url;
      
      // Clear any previous error handlers
      audio.onerror = null;
      
      audio.src = src;
      imgQareaa.src = target.img;
      // nameQareaa="FDGBFNHGh";
      imgQareaa.classList.toggle("rotate");
      avatarImg.src = target.img;
      nameQareaa.innerText = target.name;
      
      // Add error handling for radio streams
      audio.onerror = function() {
        console.error("Error loading radio stream:", src);
        nameQareaa.innerText = target.name + " (غير متاح)";
      };
      
      // Add success handler
      audio.onloadeddata = function() {
        console.log("Radio stream loaded successfully:", src);
        nameQareaa.innerText = target.name;
      };
      
      audio.play().catch(error => {
        console.error("Error playing radio:", error);
        nameQareaa.innerText = target.name + " (خطأ في التشغيل)";
      });
      
      cheek();
    });
  });
};


// playPause

playPause.addEventListener("click", togglePaly);

function togglePaly() {
  if (audio.paused) {
    audio.play();
    playPause.innerHTML = `
    <i class="fa-solid fa-pause"></i>
    `;
    cheek();
  } else {
    audio.pause();
    playPause.innerHTML = `
        <i class="fa-solid fa-play"></i>
        `;
    cheek();
  }
}

function cheek() {
  if (audio.paused) {
    playPause.innerHTML = `
      <i class="fa-solid fa-play"></i>
    `;
  } else {
    playPause.innerHTML = `
      <i class="fa-solid fa-pause"></i>
        `;
  }
}

cheek();

// volume btn

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

// add Active soura

function addActiveFromSoura(num) {
  let souraName = document.querySelectorAll(".radio-container .qarea ");
  souraName.forEach((e) => {
    e.classList.remove("active");
    if (e.id == `radio-${num}`) {
      e.classList.add("active");
    }
  });
}
