async function loadQuranicVerses() {
  try {
    const statusContainer = document.getElementById("status");
    
    if (!statusContainer) {
      console.warn("Status container not found");
      return;
    }

    // Add cache busting
    const cacheBuster = "v=" + Date.now() + Math.random();
    
    // Fetch the JSON data
    const response = await fetch("./data/status.json?" + cacheBuster);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();

    if (!data.status || data.status.length === 0) {
      console.warn("No status data found");
      statusContainer.innerHTML = "<p>لا توجد بيانات متاحة حالياً</p>";
      return;
    }

    // Loop through each verse in the fetched data
    data.status.forEach((verse, index) => {
      const verseHtml = `
        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mt-3">
          <div class="status-conainer position-relative" style="background: linear-gradient(135deg, ${verse.color}22 0%, ${verse.color}44 100%); border: 2px solid ${verse.color}; border-radius: 15px; padding: 20px; min-height: 200px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
            <div class="verse-icon" style="font-size: 3rem; margin-bottom: 15px; color: ${verse.color};">
              🤲
            </div>
            <div class="verse-text" style="font-size: 1.4rem; font-weight: bold; color: #333; line-height: 2; margin-bottom: 15px; font-family: 'Amiri', serif;">
              ${verse.text}
            </div>
            <div class="verse-info" style="font-size: 0.9rem; color: #666; margin-top: auto;">
              <span style="background: ${verse.color}; color: white; padding: 5px 15px; border-radius: 20px; font-weight: bold;">
                ${verse.surah} - آية ${verse.ayah}
              </span>
            </div>
            <div class="icons-name">
              <div class="bb position-absolute">
                <div class="ayy text-white" style="background: ${verse.color};">آيه🤎</div>
              </div>
            </div>
          </div>
        </div>
      `;

      // Append the HTML to the container
      statusContainer.innerHTML += verseHtml;
    });

    // Add event listeners after elements are added to the DOM
    addEventListeners();
  } catch (error) {
    console.error("Error fetching Quranic verses:", error);
    const statusContainer = document.getElementById("status");
    if (statusContainer) {
      statusContainer.innerHTML = "<p>حدث خطأ في تحميل البيانات. يرجى المحاولة مرة أخرى.</p>";
    }
  }
}

// Helper function to get video URL from video ID
function getVideoUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

// Helper function to get embed URL from video ID
function getEmbedUrl(videoId) {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

// Initialize YouTube Lite Embeds (click-to-load)
function initializeYouTubeLiteEmbeds() {
  document.querySelectorAll('.youtube-lite-embed').forEach(container => {
    container.addEventListener('click', function () {
      // Only load once
      if (this.classList.contains('loaded')) return;

      const videoId = this.dataset.videoId;
      const iframe = document.createElement('iframe');

      iframe.setAttribute('src', getEmbedUrl(videoId));
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
      iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
      iframe.setAttribute('allowfullscreen', '');
      iframe.className = 'status rounded-3 w-100';
      iframe.style.width = '100%';
      iframe.style.height = '300px';

      // Replace thumbnail with iframe
      this.innerHTML = '';
      this.appendChild(iframe);
      this.classList.add('loaded');
    });
  });
}

// Call the async function
loadQuranicVerses();

function addEventListeners() {
  // Download
  document.querySelectorAll(".downloadBtn").forEach((button) => {
    button.addEventListener("click", function () {
      const videoSrc = this.dataset.videoSrc;
      const videoId = getVideoId(videoSrc);
      const downloadUrl = `https://www.y2mate.com/en19/youtube/${videoId}`;
      window.open(downloadUrl, "_blank");
    });
  });

  // Share to Facebook
  document.querySelectorAll(".facebook").forEach((button) => {
    button.addEventListener("click", function () {
      const videoSrc = this.dataset.content;
      navigator.clipboard
        .writeText(videoSrc)
        .then(() => {
          const url = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(
            videoSrc
          )}`;
          window.open(url, "_blank");
        })
        .catch((err) => {
          console.error("Failed to copy to clipboard: ", err);
        });
    });
  });

  // Share to WhatsApp
  document.querySelectorAll(".whatsapp").forEach((button) => {
    button.addEventListener("click", function () {
      const videoSrc = this.dataset.videoSrc;
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        videoSrc
      )}`;
      window.open(url, "_blank");
    });
  });

  // Heart Button
  document.querySelectorAll(".heart").forEach((button) => {
    button.addEventListener("click", function () {
      const index = this.dataset.index;
      this.classList.toggle("active");
      // Increment logic can be added here
      console.log(`Heart clicked for item ${index}`);
    });
  });

  // Share to All Social Media
  document.querySelectorAll(".share").forEach((button) => {
    button.addEventListener("click", function () {
      const videoSrc = this.dataset.content;
      shareToAllSocialMedia(videoSrc);
    });
  });
}

function getVideoId(videoSrc) {
  return videoSrc.split("/").pop().split("?")[0];
}

function shareToAllSocialMedia(text) {
  // Facebook
  const fbUrl = `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(
    text
  )}`;
  window.open(fbUrl, "_blank");

  // WhatsApp
  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    text
  )}`;
  window.open(waUrl, "_blank");

  // Twitter
  const twUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}`;
  window.open(twUrl, "_blank");

  // Telegram
  const tgUrl = `https://t.me/share/url?url=${encodeURIComponent(text)}`;
  window.open(tgUrl, "_blank");
}
