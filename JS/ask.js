document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("page-loader");
  const askContainer = document.getElementById("ask");

  loader.classList.remove("hide");

  fetch("./data/ask-answer.json")
    .then((response) => {
      if (!response.ok) throw new Error("Fetch failed");
      return response.json();
    })
    .then((data) => {
      askContainer.innerHTML = "";

      data.questions.forEach((verse) => {
        askContainer.innerHTML += `
          <div class="ask mt-5">
            <div class="general-color d-flex align-items-center fs-5 fw-medium">
              <div class="container-ask">
                <div class="ask-answer-icon">
                  <i class="fa-regular fa-comments fs-5 text-danger"></i>
                </div>
              </div>
              <span class="me-2">${verse.question}</span>
            </div>
            <hr />
            <p>${verse.answer}</p>
          </div>
        `;
      });

      loader.classList.add("hide");
    })
    .catch((err) => {
      console.error(err);
      loader.classList.add("hide");
      askContainer.innerHTML =
        "<p class='text-center text-danger'>تعذر تحميل البيانات</p>";
    });
});
