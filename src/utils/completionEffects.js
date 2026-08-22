import confetti from 'canvas-confetti';

export function triggerConfetti() {
  confetti({
    particleCount: 70,
    spread: 60,
    origin: { y: 0.75 },
    colors: ['#818cf8', '#34d399', '#fbbf24', '#f43f5e'],
    disableForReducedMotion: true,
  });
}

// Appends a progressive left-to-right verification sweep to any sorting trace
export function appendVerificationSweep(rawTrace, arrayLength) {
  const lastFrame = rawTrace[rawTrace.length - 1];
  if (!lastFrame) return rawTrace;

  const sweepFrames = [];
  const sortedIndices = [];

  for (let i = 0; i < arrayLength; i++) {
    sortedIndices.push(i);
    sweepFrames.push({
      array: [...lastFrame.array],
      comparing: [i], // Active scanner highlight
      swapping: [],
      sortedIndices: [...sortedIndices],
      activeLine: lastFrame.activeLine,
      isVerification: true,
    });
  }

  return [...rawTrace, ...sweepFrames];
}