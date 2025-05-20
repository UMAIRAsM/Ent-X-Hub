// script.js
const video = document.getElementById('video-player');
const playButton = document.querySelector('.play-button');
const volumeIcon = document.querySelector('.volume-icon');
const volumeBar = document.getElementById('volume');
const seekBar = document.getElementById('seek');
const timeDisplay = document.getElementById('time-display');
const fullscreenButton = document.querySelector('.fullscreen-button');

playButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playButton.classList.add('playing');
    } else {
        video.pause();
        playButton.classList.remove('playing');
    }
});

volumeIcon.addEventListener('click', () => {
    if (video.volume === 0) {
        video.volume = volumeBar.value;
        volumeBar.value = video.volume;
    } else {
        video.volume = 0;
        volumeBar.value = 0;
    }
});

volumeBar.addEventListener('input', () => {
    video.volume = volumeBar.value;
    if (video.volume === 0) {
        volumeIcon.classList.add('muted');
    } else {
        volumeIcon.classList.remove('muted');
    }
});

video.addEventListener('timeupdate', () => {
    const currentTime = video.currentTime;
    const duration = video.duration;
    const timeString = formatTime(currentTime) + ' / ' + formatTime(duration);
    timeDisplay.textContent = timeString;
    seekBar.value = (currentTime / duration) * 100;
});

seekBar.addEventListener('input', () => {
    const time = (seekBar.value / 100) * video.duration;
    video.currentTime = time;
});

fullscreenButton.addEventListener('click', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${padNumber(minutes)}:${padNumber(seconds)}`;
}

function padNumber(number) {
    return number.toString().padStart(2, '0');
}
