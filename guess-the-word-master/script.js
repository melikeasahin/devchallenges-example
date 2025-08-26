// script.js

const words = [
  "example",
  "javascript",
  "coding",
  "challenge",
  "banana",
  "react",
  "python",
  "master",
];
let currentWord = "";
let tries = 0;
let mistakes = 0;
let mistakeLetters = [];

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
  mistakeLetters = [];

  updateTries();
  updateMistakes();
}
updateTriesDots();

function createInputFields(length) {
  // Create number of input fields according to the number of letters
  const container = document.getElementById("inputContainer");
  container.innerHTML = ""; // Clear previous inputs

  for (let i = 0; i < length; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 1;
    input.classList.add("letter-input");
    // sadece aktif kutuda placeholder görünsün
    input.addEventListener("input", (e) => {
      handleInput();
      input.addEventListener("focus", () => {
        input.placeholder = "_";
      });

      input.addEventListener("blur", () => {
        input.placeholder = "";
      });

      // Otomatik sonraki input'a geç
      if (e.target.value && input.nextElementSibling) {
        input.nextElementSibling.focus();
      }
    });

    container.appendChild(input);
  }
  // ilk kutuya otomatik odaklan
  const firstInput = container.querySelector("input");
  if (firstInput) firstInput.focus();
}

function handleInput() {
  // Handle input change event
  const inputs = document.querySelectorAll(".letter-input");
  let userGuess = "";

  inputs.forEach((input) => {
    userGuess += input.value.toLowerCase();
  });

  // Tüm harfler girildiyse kontrol et
  if (userGuess.length === currentWord.length) {
    tries++;

    if (userGuess === currentWord) {
      alert("🎉 Success! You guessed the word!");
      generateRandomWord(); // Yeni kelimeyle devam
    } else {
      mistakes++;
      // Yanlış harfleri bul
      for (let i = 0; i < currentWord.length; i++) {
        if (userGuess[i] && userGuess[i] !== currentWord[i]) {
          const wrongLetter = userGuess[i];
          if (!mistakeLetters.includes(wrongLetter)) {
            mistakeLetters.push(wrongLetter);
          }
        }
      }

      alert("❌ Incorrect! Try again.");
    }

    updateTries();
    updateMistakes();

    if (tries >= 6) {
      setTimeout(() => {
        alert("😢 Too many mistakes! Starting over...");
        generateRandomWord();
      }, 100);
    }
  }
}
function updateTries() {
  document.getElementById("triesCount").textContent = tries;
}
updateTriesDots();

function updateMistakes() {
  const list = mistakeLetters.length > 0 ? mistakeLetters.join(", ") : "-";
  document.getElementById("mistakesList").textContent = list;
}

function resetGame() {
  // Handle game reset button
  generateRandomWord();
}
updateTriesDots();

function updateTriesDots() {
  const container = document.getElementById("triesDots");
  container.innerHTML = "";

  for (let i = 0; i < 6; i++) {
    const dot = document.createElement("span");
    dot.textContent = "●";
    dot.classList.add("tries-dot");

    if (i < tries) {
      dot.classList.add("used"); // kullanılmış olanları soluk göster
    }

    container.appendChild(dot);
  }
}

document
  .getElementById("randomButton")
  .addEventListener("click", generateRandomWord);
document.getElementById("resetButton").addEventListener("click", resetGame);

// Initial load
generateRandomWord();
