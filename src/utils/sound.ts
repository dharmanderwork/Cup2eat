// Procedural Web Audio API sound synthesizer
// Zero external file dependencies or 404 risks

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Procedural crisp "biscuit crunch" sound using white noise bursts and resonant low-pass clicks.
 */
export function playCrunchSound(isMutedOrVolume: boolean | number = false, optionalVolume?: number): void {
  if (isMutedOrVolume === true) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const rawVolume = typeof optionalVolume === 'number'
    ? optionalVolume
    : typeof isMutedOrVolume === 'number'
    ? isMutedOrVolume
    : 0.28;
  const volume = Math.min(1, Math.max(0.01, rawVolume));

  const now = ctx.currentTime;

  // 1. Generate crunchy noise burst (shattering wafer texture)
  const bufferSize = ctx.sampleRate * 0.15; // 150ms
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    // Envelope: quick attack, fast decay with multiple micro-peaks
    const t = i / bufferSize;
    const microBurst = Math.sin(t * 120) * 0.3 + 0.7;
    data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 22) * microBurst;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.setValueAtTime(2400, now);
  bandpass.frequency.exponentialRampToValueAtTime(800, now + 0.15);
  bandpass.Q.setValueAtTime(2.5, now);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

  noise.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + 0.16);

  // 2. Add subtle low-frequency "snap" body
  const osc = ctx.createOscillator();
  const oscGain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);

  oscGain.gain.setValueAtTime(0.22, now);
  oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  osc.connect(oscGain);
  oscGain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.09);
}

/**
 * Procedural gentle chime for UI switches and coffee warmth.
 */
export function playChimeSound(freq = 520, isMuted = false): void {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, now);
  osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.18);

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.26);
}
