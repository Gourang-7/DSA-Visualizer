// src/utils/audioEngine.js
let audioCtx = null;

// Must be called directly inside an onClick handler
export function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

export function playTone(value, maxValue = 100) {
  // If audio isn't initialized yet, fail silently without throwing errors
  if (!audioCtx || audioCtx.state === 'suspended') return;

  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  // Pitch maps to the value size (higher bar = higher pitch)
  osc.frequency.value = 200 + (value / maxValue) * 600;
  osc.type = 'sine';

  // Volume envelope to prevent clicking and create a "beep"
  gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 0.1);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}