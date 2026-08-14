let songIndex = 0;
let audioElement = new Audio("");
let masterplay = document.getElementById("masterplay");
let progressBar = document.getElementById("progressBar");
let title = document.getElementById("title");
let playerPoster = document.getElementById("player-poster");
const header = document.querySelector(".header");
const scrollBtn = document.getElementById("scroll-btn");
const menu = document.getElementById("menu-icon");
const navlist = document.querySelector(".nav-list");
const navlistEl = document.querySelectorAll(".nav-list li a");

const loader = document.getElementById("page-loader");

function showLoader() {
  try {
    if (loader && typeof loader.classList !== 'undefined' && loader.classList) {
      loader.classList.remove("hide");
    }
  } catch (error) {
    console.warn("Error in showLoader:", error);
  }
}

function hideLoader() {
  try {
    if (loader && typeof loader.classList !== 'undefined' && loader.classList) {
      loader.classList.add("hide");
    }
  } catch (error) {
    console.warn("Error in hideLoader:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const dropdownItems = document.querySelectorAll(".dropdown-item");

  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all items
      dropdownItems.forEach((item) => {
        item.parentElement.classList.remove("active-azkar");
      });

      // Add active class to the clicked item's parent li
      this.parentElement.classList.add("active-azkar");
    });
  });
});

navlist.addEventListener("click", (e) => {
  // remove active class from every element
  navlistEl.forEach((el) => {
    if (el.classList.contains("active")) el.classList.remove("active");
  });

  // add active class to current element
  if (e.target.tagName === "A") {
    if (!e.target.classList.contains("active"))
      e.target.classList.add("active");
  }
});

// Handle menu click
menu.onclick = () => {
  menu.classList.toggle("bx-x");
  navlist.classList.toggle("open");

  if (navlist.classList.contains("open")) {
    document.body.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
  }
};

// Only initialize scrolling button if it exists
window.addEventListener('DOMContentLoaded', function() {
  try {
    const scrollingUp = document.querySelector(".scrolling-up");
    
    if (scrollingUp) {
      window.onscroll = function () {
        if (window.scrollY >= 400) {
          scrollingUp.classList.add("show");
        } else {
          scrollingUp.classList.remove("show");
        }
      };

      scrollingUp.onclick = function () {
        window.scrollTo(0, 0);
      };
    } else {
      console.log("scrolling-up element not found on this page");
    }
  } catch (error) {
    console.warn("Error initializing scrolling button:", error);
  }
});

let audios = [];
// Only load audio data if we have audioElement and loader
if (audioElement && loader) {
  fetch(`https://quran-endpoint.vercel.app/quran`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < 114; i++) {
        audios.push(data.data[i].recitation.full.replace("http:", "https:"));
      }
      audioElement.src = audios[0];
      hideLoader(); // ⭐
    })
    .catch(() => hideLoader());
}

// Surah Api
let SurahsContainer = document.querySelector(".surhasContainer");

if (SurahsContainer) {
  getSurahs();
}

function getSurahs() {
  if (loader && typeof loader.classList !== 'undefined' && loader.classList) {
    showLoader();
  }

  fetch("https://api.alquran.cloud/v1/meta")
    .then((response) => response.json())
    .then((data) => {
      let surahs = data.data.surahs.references;
      let numberOfSurahs = 114;

      if (SurahsContainer) {
        SurahsContainer.innerHTML = "";
        for (let i = 0; i < numberOfSurahs; i++) {
          const revelationType = surahs[i].revelationType;
          const iconHtml =
            revelationType === "Meccan"
              ? '<i class="fa-solid fa-kaaba icon-kaaba text-dark"></i>'
              : '<i class="fa-solid fa-mosque icon-kaaba icon-color-surah"></i>';

          SurahsContainer.innerHTML += `
            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mt-3">
              <div class="surah">
                <div class="surah-txt">
                  <div class="ll">
                    <p class="mt-3">${surahs[i].number}</p>
                  </div>
                  <p class="mt-3 me-3 bbbb ">${surahs[i].name}</p>
                </div>
                <div class="ll ll-kaaba">${iconHtml}</div>
                <p class="mt-3 text-dark">${surahs[i].numberOfAyahs} آيات</p>
              </div>
            </div>
          `;
        }
      }

      if (loader && typeof loader.classList !== 'undefined' && loader.classList) {
        hideLoader();
      }

      let SurahsTitels = document.querySelectorAll(".surah");
      let popup = document.querySelector(".surah-popup");
      let AyatContainer = document.querySelector(".ayat");

      if (SurahsTitels.length > 0 && popup && AyatContainer) {

      SurahsTitels.forEach((title, index) => {
        title.addEventListener("click", () => {
          if (loader && typeof loader.classList !== 'undefined' && loader.classList) {
            showLoader();
          }

          fetch(`https://api.alquran.cloud/v1/surah/${index + 1}`)
            .then((response) => response.json())
            .then((data) => {
              AyatContainer.innerHTML = "";
              let Ayat = data.data.ayahs;

              popup.classList.add("active");

              let nameSurah = document.querySelector("#nameSurah");
              document.getElementById(
                "linkSurah"
              ).href = `https://quran.com/ar/${index + 1}`;
              nameSurah.innerHTML = surahs[index].name;

              let combinedAyat = "";

              Ayat.forEach((aya) => {
                let cleanedAyaText = aya.text
                  .trim()
                  .replace(/^بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ\s*/, "");

                combinedAyat += `${cleanedAyaText} ﴿${aya.numberInSurah}﴾ `;
              });

              AyatContainer.innerHTML = `

بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

${combinedAyat}

`;

              if (loader && typeof loader.classList !== 'undefined' && loader.classList) {
                hideLoader();
              }
            })
            .catch(() => {
              if (loader && typeof loader.classList !== 'undefined' && loader.classList) {
                hideLoader();
              }
            });
        });
      });

      let closePopup = document.querySelector(".close-popup");
      if (closePopup) {
        closePopup.addEventListener("click", () => {
          popup.classList.remove("active");
        });
      }
    }
    })
    .catch(() => {
      if (loader && typeof loader.classList !== 'undefined' && loader.classList) {
        hideLoader();
      }
    });
}
