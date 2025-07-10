// bgm.js
export function setupBackgroundMusic() {
  const audio = document.getElementById('background-music');
  const soundButton = document.getElementById('sound-button');
  const soundIcon = document.getElementById('sound-icon');

  if (!audio || !soundButton || !soundIcon) return;

  // Set initial mute state from localStorage
  const muteState = localStorage.getItem('muteState') === 'true';
  audio.muted = muteState;
  soundIcon.src = muteState ? './icons/mute2.png' : './icons/unmuted.png';

  // Resume playback from saved time
  audio.addEventListener('loadedmetadata', () => {
    const savedTime = localStorage.getItem('audioTime');
    if (savedTime) {
      audio.currentTime = savedTime;
    }

    audio.play().catch(() => {
      console.log("Autoplay was prevented. User interaction may be required.");
    });
  });

  // Save current time on unload
  window.addEventListener('beforeunload', () => {
    localStorage.setItem('audioTime', audio.currentTime);
  });

  // Toggle mute/unmute and swap icon
  soundButton.addEventListener('click', () => {
    audio.muted = !audio.muted;
    soundIcon.src = audio.muted
      ? './icons/mute2.png'
      : './icons/unmuted.png';

    // Save mute state in localStorage
    localStorage.setItem('muteState', audio.muted);
  });
}
