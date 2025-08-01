const songs = [
  {
    title: "Lost in the City Lights",
    author: "Cosmo Sheldrake",
    src: "./resources/lost-in-city-lights-145038.mp3",
    img: "./resources/cover-1.jpg",
  },
  {
    title: "Forest Lullaby",
    author: "Lesfm",
    src: "./resources/forest-lullaby-110624.mp3",
    img: "./resources/cover-2.jpg",
  },
];

let currentSongIndex = 0;
const audio = new Audio(songs[currentSongIndex].src);

document.getElementById("playButton").addEventListener("click", playPause);
document.getElementById("nextButton").addEventListener("click", nextSong);
document.getElementById("prevButton").addEventListener("click", prevSong);
audio.addEventListener("timeupdate", updateProgressBar);

function playPause() {
  const playBtn = document.getElementById("playButton");
  if (audio.paused) {
    audio.play();
    playBtnImg.src = "./resources/Play_fill.svg"; // veya ikon değişimi yap
  } else {
    audio.pause();
    playBtnImg.src = "./resources/Play_fill.svg";
  }
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  audio.play();
}

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  audio.load(); // <— BU ŞART!

  // Şarkı bilgilerini güncelle
  document.querySelector(".title").textContent = song.title;
  document.querySelector(".artist").textContent = song.author;
  document.querySelector(".cover").src = song.img;

  document.getElementById("progressBar").value = 0;
}

function updateProgressBar() {
  const progress = document.getElementById("progressBar");
  const currentTimeEl = document.getElementById("current-time");
  const durationEl = document.getElementById("duration");

  if (!isNaN(audio.duration)) {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent;

    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);

    progress.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percent}%, var(--text-primary) ${percent}%, var(--text-primary) 100%)`;
  }
}

document.getElementById("progressBar").addEventListener("input", function () {
  audio.currentTime = (this.value / 100) * audio.duration;
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
}

// Initial load
loadSong(currentSongIndex);
