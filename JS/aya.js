// Fetch Quranic verses from a JSON file (simulated data for demonstration)
fetch("./data/aya.json")
  .then((response) => response.json())
  .then((data) => {
    const ayaContainer = document.getElementById("aya");

    // Loop through each verse in the fetched data
    data.ayat.forEach((verse, index) => {
      const contentId = `content${index}`;
      const buttonIdTelegram = `shareButtonTelegram${index}`;
      const buttonIdCopy = `copyButton${index}`;

      const verseHtml = `
            <div class="azkar-aya mt-4">
              <p id="${contentId}" class="text-end">${verse.text}</p>
              <div class="count-aya">
                <div>سورة ${verse.surah} - آية ${verse.ayah}</div>
              </div>
              <ul class="aya-icons">
              <li>
                  <button class="btn btn-white copy-button" id="${buttonIdCopy}" onclick="copyToClipboard('${verse.text}')">
                    <i class="fa-regular fa-clone share-icon fs-4"></i>
                  </button>
                </li>
                <li>
                  <button class="btn btn-white share-button" id="${buttonIdTelegram}" onclick="shareToTelegram('${verse.text}')">
                    <i class="fa-brands fa-telegram share-icon fs-4"></i>
                  </button>
                </li>
              </ul>
            </div>
          `;

      // Append the HTML to the container
      ayaContainer.innerHTML += verseHtml;
    });
  });

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {})
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}
function shareToTelegram(text) {
  const url = `https://t.me/share/url?url=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}