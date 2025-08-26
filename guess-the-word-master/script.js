// script.js

const words = ["example", "javascript", "coding", "challenge"];
let currentWord = "";
let tries = 0;
let mistakes = 0;

function scrambleWord(word) {
  // Scramble and return the scrambled word
  const letters = word.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], [letters[i]]];
  }
  return letters.join("");
}

function generateRandomWord() {
  // Generate and display scrambled word
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  const scrambled = scrambleWord(currentWord);
  document.getElementById("scrambledWord").textContent = scrambled;
  createInputFields(currentWord.length);
  tries = 0;
  mistakes = 0;
}

function createInputFields(length) {
  // Create number of input fields according to the number of letters
  const container = document.getElementById("inputContainer");
  container.innerHTML = ""; // Clear previous inputs

  for (let i = 0; i < length; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.classList.add("letter-input");
    input.addEventListener("input", handleInput);
    container.appendChild(input);
  }
}

function handleInput(event) {
  // Handle input change event
  const inputs = document.querySelectorAll(".letter-input");
  let userGuess = "";

  inputs.forEach((input) => {
    userGuess += input.value.toLowerCase();
  });

  if (userGuess.length === currentWord.length) {
    tries++;

    if (userGuess === currentWord) {
      alert(`🎉 Doğru bildin! ${tries} denemede.`);
    } else {
      mistakes++;
      alert("❌ Yanlış! Tekrar dene.");
    }
  }
}

function resetGame() {
  // Handle game reset button
  generateRandomWord();
}

document
  .getElementById("randomButton")
  .addEventListener("click", generateRandomWord);
document.getElementById("resetButton").addEventListener("click", resetGame);

// Initial load
generateRandomWord();
