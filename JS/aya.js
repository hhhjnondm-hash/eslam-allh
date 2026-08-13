// Fetch Quranic verses from a JSON file (simulated data for demonstration)
fetch("./data/aya.json")
  .then((response) => response.json())
  .then((data) => {
    const ayaContainer = document.getElementById("aya");

    // Loop through each verse in the fetched data
    data.ayat.forEach((verse, index) => {
      const contentId = `content${index}`;
      const buttonIdFacebook = `shareButtonFacebook${index}`;
      const buttonIdInstagram = `shareButtonInstagram${index}`;
      const buttonIdTwitter = `shareButtonTwitter${index}`;
      const buttonIdWhatsApp = `shareButtonWhatsApp${index}`;
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
                  <button class="btn btn-white share-button" id="${buttonIdTwitter}" onclick="shareToTwitter('${verse.text}')">
                    <i class="fa-brands fa-x-twitter share-icon fs-4"></i>
                  </button>
                </li>
                <li>
                  <button class="btn btn-white share-button" id="${buttonIdWhatsApp}" onclick="shareToWhatsApp('${verse.text}')">
                    <i class="fab fa-whatsapp share-icon fs-4"></i>
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
function shareToTwitter(text) {
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}`;
  window.open(url, "_blank");
}

function shareToWhatsApp(text) {
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}