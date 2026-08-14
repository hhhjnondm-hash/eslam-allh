function showLoader() {
  document.getElementById("page-loader").style.display = "flex";
}

function hideLoader() {
  document.getElementById("page-loader").style.display = "none";
}

showLoader();

let morningِِAzkarContainer = document.querySelector(
  ".morning-azkar-container"
);
let eveningAzkarContainer = document.querySelector(".evening-azkar-container");
let salahAzkarContainer = document.querySelector(".salah-azkar-container");
let tasbeehContainer = document.querySelector(".tasbeeh-azkar-container");
let bedtimeAzkarContainer = document.querySelector(".bedtime-azkar-container");
let wakeupAzkarContainer = document.querySelector(".wakeup-azkar-container");
let aya = document.querySelector(".aya-container");

function decreaseCount(index) {
  const countEl = document.getElementById(`count-${index}`);
  let currentCount = parseInt(countEl.textContent, 10);

  if (currentCount > 0) {
    currentCount--;
    countEl.textContent = currentCount;
  }
}

fetch("./data/azkar.json")
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.morningِِAzkar.length; i++) {
      morningِِAzkarContainer.innerHTML += `
      <div class="azkar mt-4">
<p class="text-end general-color"> ${data.morningِِAzkar[i].reference}  </p>
    <p class="text-end"> ${data.morningِِAzkar[i].content}  </p>
    ${data.morningِِAzkar[i].image ? `<img src="${data.morningِِAzkar[i].image}" alt="أذكار الصباح" class="azkar-image mt-2" style="max-width: 100%; border-radius: 8px;">` : ''}

    <button class="count" onclick="decreaseCount(${i})"><div id="count-${i}">${data.morningِِAzkar[i].count}</div></button>

    </div>

    `;
    }
     hideLoader(); // ✅ إضافة فقط
  });

// -----------------------------------------------------------------------------

fetch("./data/azkar.json")
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.eveningAzkar.length; i++) {
      eveningAzkarContainer.innerHTML += `
      <div class="azkar mt-4">
<p class="text-end general-color"> ${data.eveningAzkar[i].reference}  </p>
    <p class="text-end"> ${data.eveningAzkar[i].content}  </p>
    ${data.eveningAzkar[i].image ? `<img src="${data.eveningAzkar[i].image}" alt="أذكار المساء" class="azkar-image mt-2" style="max-width: 100%; border-radius: 8px;">` : ''}
    <button class="count" onclick="decreaseCount(${i})"><div id="count-${i}">${data.eveningAzkar[i].count}</div></button>
    </div>

    `;
    }
     hideLoader(); // ✅ إضافة فقط
  });

// -----------------------------------------------------------------------------

fetch("./data/azkar.json")
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.salahAzkar.length; i++) {
      salahAzkarContainer.innerHTML += `
        <div class="azkar mt-4">
          <p class="text-end general-color">${data.salahAzkar[i].reference}</p>
          <p class="text-end">${data.salahAzkar[i].content}</p>
          <p class="text-end text-color">${data.salahAzkar[i].description}</p>
          ${data.salahAzkar[i].image ? `<img src="${data.salahAzkar[i].image}" alt="أذكار بعد الصلاة" class="azkar-image mt-2" style="max-width: 100%; border-radius: 8px;">` : ''}

          <button class="count" onclick="decreaseCount(${i})">
            <div id="count-${i}">${data.salahAzkar[i].count}</div>
          </button>
        </div>
      `;
    }
     hideLoader(); // ✅ إضافة فقط
  });

// -----------------------------------------------------------------------------

fetch("./data/azkar.json")
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.tasbeeh.length; i++) {
      tasbeehContainer.innerHTML += `
      <div class="azkar mt-4">
     <p class="text-end general-color"> ${data.tasbeeh[i].reference}  </p>
    <p class="text-end"> ${data.tasbeeh[i].content}  </p>


     <button class="count" onclick="decreaseCount(${i})">
            <div id="count-${i}">${data.tasbeeh[i].count}</div>
          </button>
    </div>
  
    `;
    }
     hideLoader(); // ✅ إضافة فقط
  });

// -----------------------------------------------------------------------------

fetch("./data/azkar.json")
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.bedtimeAzkar.length; i++) {
      bedtimeAzkarContainer.innerHTML += `
    <div class="azkar mt-4">
<p class="text-end general-color"> ${data.bedtimeAzkar[i].reference}  </p>
  <p  class="text-end"> ${data.bedtimeAzkar[i].content}  </p>
  ${data.bedtimeAzkar[i].image ? `<img src="${data.bedtimeAzkar[i].image}" alt="أذكار النوم" class="azkar-image mt-2" style="max-width: 100%; border-radius: 8px;">` : ''}
  <button class="count" onclick="decreaseCount(${i})"><div id="count-${i}">${data.bedtimeAzkar[i].count}</div></button>
  </div>

  `;
    }
     hideLoader(); // ✅ إضافة فقط
  });

// -----------------------------------------------------------------------------

fetch("./data/azkar.json")
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.wakeupAzkar.length; i++) {
      wakeupAzkarContainer.innerHTML += `
      <div class="azkar mt-4">
  <p class="text-end general-color"> ${data.wakeupAzkar[i].reference}  </p>
    <p  class="text-end"> ${data.wakeupAzkar[i].content}  </p>
    ${data.wakeupAzkar[i].image ? `<img src="${data.wakeupAzkar[i].image}" alt="أذكار الاستيقاظ" class="azkar-image mt-2" style="max-width: 100%; border-radius: 8px;">` : ''}
    <button class="count" onclick="decreaseCount(${i})"><div id="count-${i}">${data.wakeupAzkar[i].count}</div></button>
    </div>
  
    `;
    }
     hideLoader(); // ✅ إضافة فقط
  });
// -----------------------------------------------------------------------------

// Function to share content to Telegram
function shareToFacebook(content) {
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    window.location.href
  )}&text=${encodeURIComponent(content)}`;
  window.open(shareUrl, "_blank");
}

//  Function to share content to Telegram
function shareToInstagram(content) {
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    window.location.href
  )}&text=${encodeURIComponent(content)}`;
  window.open(shareUrl, "_blank");
}

// Function to share content to Telegram
function shareToTwitter(content) {
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    window.location.href
  )}&text=${encodeURIComponent(content)}`;
  window.open(shareUrl, "_blank");
}

// Function to share content to WhatsApp
function shareToWhatsApp(content) {
  const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    content
  )}%0A${encodeURIComponent(window.location.href)}`;
  window.open(shareUrl, "_blank");
}

// Function to share content to Telegram
function shareToTelegram(content) {
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    window.location.href
  )}&text=${encodeURIComponent(content)}`;
  window.open(shareUrl, "_blank");
}

// Function to copy content to clipboard
function copyToClipboard(content) {
  navigator.clipboard
    .writeText(content)
    .then(() => {
      console.log("Copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}
