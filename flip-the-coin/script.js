const button = document.querySelector(".random");
const resultText = document.querySelector(".result");
const coinImage = document.querySelector(".image");
button.addEventListener("click", () => {
  const isHeads = Math.random() < 0.5; // Bu eksikti!
  const outcome = isHeads ? "Heads" : "Tails";
  resultText.textContent = outcome;
  coinImage.src = isHeads ? "./resources/heads.svg" : "./resources/tails.svg";
  coinImage.alt = outcome;
});
