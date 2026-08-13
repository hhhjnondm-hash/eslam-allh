// Fetch Quranic verses from a JSON file (simulated data for demonstration)
fetch("./data/ahadith.json")
  .then((response) => response.json())
  .then((data) => {
    const ahadithContainer = document.getElementById("ahadith");

    // Loop through each verse in the fetched data
    data.ahadith.forEach((verse, index) => {
      const verseHtml = `

      <div class="hadith mt-5">
        <p>${verse.text}</p>
        <p class="text-muted mt-2">${verse.source}</p>
        <p class="general-color mt-2">${verse.explanation}</p>
          <ul class="shapes">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
      </div>
          
          `;

      // Append the HTML to the container
      ahadithContainer.innerHTML += verseHtml;
    });
  });
