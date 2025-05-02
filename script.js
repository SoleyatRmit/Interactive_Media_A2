// JavaScript for Crafting Tutorial Media Player

// Grab references to elements we’ll need to control
const video = document.getElementById("custom-video-player");
const playPauseImg = document.getElementById("play-pause-img");
const progressBar = document.querySelector(".progress-bar");
const progressFill = document.getElementById("progress-bar-fill");

// This part creates a row underneath the video that shows both the time and a volume slider side-by-side.
// I thought this was a cleaner way to avoid overcrowding the main control bar.
const infoBar = document.createElement("div");
infoBar.className = "info-bar";
progressBar.parentElement.insertBefore(infoBar, progressBar.nextSibling);

// Display for current time and duration
const timeDisplay = document.createElement("div");
timeDisplay.className = "time-display";
timeDisplay.textContent = "0:00 / 0:00";

// Volume slider setup like YouTube, YouTube big inspiration for this.
// I actually added a hover feature so you need hover above the video to see the buttons but it was ugly.
const volumeWrapper = document.createElement("div");
volumeWrapper.className = "volume-wrapper";
const volumeIcon = document.createElement("img");
volumeIcon.src = "https://img.icons8.com/?size=30&id=reqgj3e1uKBy&format=png&color=000000";
volumeIcon.alt = "Volume";
const volumeSlider = document.createElement("input");
volumeSlider.type = "range";
volumeSlider.min = 0;
volumeSlider.max = 1;
volumeSlider.step = 0.01;
volumeSlider.value = video.volume;

// I grouped the icon + slider so it's easier to style together.
volumeWrapper.appendChild(volumeIcon);
volumeWrapper.appendChild(volumeSlider);
infoBar.appendChild(timeDisplay);
infoBar.appendChild(volumeWrapper);

// For volume changing
volumeSlider.addEventListener("input", () => {
  video.volume = volumeSlider.value;
});

// Hide the default browser controls (we're using our own)
video.removeAttribute("controls");

// Converts seconds to MM:SS (needed for time display)
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

// Update the custom progress bar + time as video plays
video.addEventListener("timeupdate", () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressFill.style.width = `${progress}%`;
  timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
});

// Clicking anywhere on the progress bar skips the video
progressBar.addEventListener("click", (e) => {
  const rect = progressBar.getBoundingClientRect();
  const offsetX = e.clientX - rect.left;
  const width = rect.width;
  const percentage = offsetX / width;
  video.currentTime = percentage * video.duration;
});

// The next few are custom video control functions for interaction

function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    // This is inverted because I want it to be like YouTube. So when the video is playing it'll show the pause button and vise versa
    playPauseImg.src = "https://img.icons8.com/?size=30&id=pSwquXkxwLD8&format=png&color=000000";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/?size=30&id=TlSnjmNzYgKT&format=png&color=000000";
  }
}

function goToTime(seconds) {
  video.currentTime = seconds;
  video.play();
}

function skipToStart() {
  video.currentTime = 0;
}

function skipToEnd() {
  video.currentTime = video.duration;
}

function rewind10() {
  video.currentTime = Math.max(video.currentTime - 10, 0);
}

function fastForward10() {
  video.currentTime = Math.min(video.currentTime + 10, video.duration);
}

function replayVideo() {
  video.currentTime = 0;
  video.play();
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}
