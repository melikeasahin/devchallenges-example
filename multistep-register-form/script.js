document.addEventListener("DOMContentLoaded", () => {
  let currentStep = 1;
  const steps = document.querySelectorAll(".step");
  const dots = document.querySelectorAll(".dot");
  const stepText = document.querySelector(".step-indicator > div");
  const continueButtons = document.querySelectorAll(".continue");

  const summaryName = document.querySelector(".summary-name");
  const summaryEmail = document.querySelector(".summary-email");
  const summaryTopics = document.querySelector(".summary-topics");

  let selectedTopics = [];

  // Step gösterme fonksiyonu
  function showStep(step) {
    steps.forEach((el, index) => {
      el.classList.toggle("active", index === step - 1);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === step - 1);
    });

    stepText.textContent = `Step ${step} of 3`;
  }

  // Topic seçme
  document.querySelectorAll(".topic-option").forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.dataset.value;

      if (selectedTopics.includes(value)) {
        // Varsa çıkar
        selectedTopics = selectedTopics.filter((t) => t !== value);
        option.classList.remove("selected");
      } else {
        // Yoksa ekle
        selectedTopics.push(value);
        option.classList.add("selected");
      }
    });
  });

  // Devam butonları
  continueButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep === 1) {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !emailRegex.test(email)) {
          alert("Please enter a valid name and email.");
          return;
        }

        currentStep++;
        showStep(currentStep);
      } else if (currentStep === 2) {
        if (selectedTopics.length === 0) {
          alert("Please select at least one topic.");
          return;
        }

        // Bilgileri özet ekranına yaz
        summaryName.textContent = document.getElementById("name").value;
        summaryEmail.textContent = document.getElementById("email").value;
        summaryTopics.innerHTML = `
  <ul class="summary-list">
    ${selectedTopics.map((topic) => `<li>${topic}</li>`).join("")}
  </ul>
`;

        currentStep++;
        showStep(currentStep);
      } else if (currentStep === 3) {
        alert("✅ Success");
      }
    });
  });

  showStep(currentStep);
});
