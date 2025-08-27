// script.js

const words = ["example", "javascript", "coding", "challenge", "flower"];
let currentWord = "";
let tries = 0;
let mistakes = 0;

function scrambleWord(word) {
  // Scramble and return the scrambled word
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

function generateRandomWord() {
  // Generate and display scrambled word
  currentWord = words[Math.floor(Math.random() * words.length)];
  const scrambled = scrambleWord(currentWord);
  document.querySelector(".latters").textContent = scrambled
    .split("")
    .join(" ");
  createInputFields(currentWord.length);
  tries = 0;
  mistakes = 0;
  document.getElementById("triesCount").textContent = "0";
  document.getElementById("mistakesList").textContent = "";
  const triesDots = document.getElementById("triesDots");
  triesDots.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const dot = document.createElement("div");
    dot.className = "tries-dot";
    triesDots.appendChild(dot);
  }

  const randomButton = document.getElementById("randomButton");
  if (randomButton) randomButton.disabled = true;
}

function createInputFields(length) {
  // Create number of input fields according to the number of letters
  const inputContainer = document.getElementById("inputContainer");
  inputContainer.innerHTML = "";
  for (let i = 0; i < length; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.classList.add("letter-box");
    input.addEventListener("input", handleInput);
    inputContainer.appendChild(input);
  }
  const firstInput = inputContainer.querySelector("input");
  if (firstInput) {
    firstInput.focus();
  }
}

function handleInput(event) {
  const input = event.target;

  if (input.value.length === 1) {
    const nextInput = input.nextElementSibling;
    if (nextInput) {
      nextInput.focus();
    }
  }

  const inputs = document.querySelectorAll("#inputContainer input");

  let guessedWord = "";
  inputs.forEach((inp) => {
    guessedWord += inp.value.toLowerCase();
  });

  if (guessedWord.length < currentWord.length) return;

  tries++;
  document.getElementById("triesCount").textContent = 5 - tries;

  const allDots = document.querySelectorAll(".tries-dot");
  if (tries <= 5) {
    allDots[tries - 1].classList.add("used");
  }

  if (guessedWord === currentWord.toLowerCase()) {
    alert("🎉 Success!");
    document.getElementById("randomButton").disabled = false;

    // Optionally fill all dots if guessed correctly
    allDots.forEach((dot) => dot.classList.add("used"));
    return;
  } else {
    mistakes++;

    const mistakesList = document.getElementById("mistakesList");
    const wrongLetters = [];

    for (let i = 0; i < currentWord.length; i++) {
      const correctChar = currentWord[i].toLowerCase();
      const guessedChar = guessedWord[i];

      if (guessedChar !== correctChar && guessedChar.trim() !== "") {
        wrongLetters.push(guessedChar);
      }
    }

    const existing = mistakesList.textContent.trim();
    const combined = existing
      ? existing + ", " + wrongLetters.join(", ")
      : wrongLetters.join(", ");
    mistakesList.textContent = combined;

    // Clear inputs for next guess
    inputs.forEach((inp) => (inp.value = ""));
    inputs[0].focus();
  }
  if (tries >= 5) {
    document.getElementById("randomButton").disabled = false;
    generateRandomWord();
    return;
  }
}

function resetGame() {
  // Handle game reset button
  generateRandomWord();
  const randomButton = document.getElementById("randomButton");
  if (randomButton) {
    randomButton.disabled = false;
  }
}

document
  .getElementById("randomButton")
  .addEventListener("click", generateRandomWord);
document.getElementById("resetButton").addEventListener("click", resetGame);

// Initial load
generateRandomWord();
