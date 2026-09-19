import { Platform } from 'react-native';

export type SoundEffectType = 'bell' | 'shankh' | 'chime' | 'damru' | 'water';

// Local sound asset requirements for offline native playback
const LOCAL_SOUND_ASSETS: Record<SoundEffectType, any> = {
  bell: require('../../assets/sounds/bell.mp3'),
  shankh: require('../../assets/sounds/shankh.mp3'),
  chime: require('../../assets/sounds/chime.mp3'),
  damru: require('../../assets/sounds/damru.mp3'),
  water: require('../../assets/sounds/water.mp3'),
};

const REMOTE_SOUND_URLS: Record<SoundEffectType, string> = {
  bell: 'https://mahavyomastudio.com/apps/shiv-charcha/audio/bell.mp3',
  shankh: 'https://mahavyomastudio.com/apps/shiv-charcha/audio/shankh.mp3',
  chime: 'https://mahavyomastudio.com/apps/shiv-charcha/audio/chime.mp3',
  damru: 'https://mahavyomastudio.com/apps/shiv-charcha/audio/damru.mp3',
  water: 'https://mahavyomastudio.com/apps/shiv-charcha/audio/water.mp3',
};

let createAudioPlayerModule: any = null;
const getCreateAudioPlayer = () => {
  if (!createAudioPlayerModule && Platform.OS !== 'web') {
    try {
      createAudioPlayerModule = require('expo-audio').createAudioPlayer;
    } catch (e) {
      console.warn('expo-audio failed to load dynamically in audioPlayer.ts:', e);
    }
  }
  return createAudioPlayerModule;
};

// Player state
let activeNativePlayer: any = null;
let activeWebAudio: HTMLAudioElement | null = null;
const soundCache: { [key in SoundEffectType]?: HTMLAudioElement } = {};

/**
 * Play short devotional sound effect (Bell 🔔, Shankh 🐚, Chime 📿, Damru 🥁, Water 🌸)
 * 100% native crash-proof using expo-audio.
 */
export async function playSoundEffect(type: SoundEffectType) {
  try {
    if (Platform.OS !== 'web') {
      const createPlayer = getCreateAudioPlayer();
      const soundSrc = LOCAL_SOUND_ASSETS[type];
      if (createPlayer && soundSrc) {
        const sfxPlayer = createPlayer(soundSrc);
        sfxPlayer.play();
      }
    } else {
      if (typeof window !== 'undefined' && ('AudioContext' in window || (window as any).webkitAudioContext)) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(type === 'chime' ? 1046.5 : 880, ctx.currentTime);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.0);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.0);
      }
    }
  } catch (error) {
    // Fail silently — UI never crashes
  }
}

/**
 * Play continuous devotional chant / ambient track
 */
export async function playDevotionalAudio(audioUrl: string, onStatusUpdate?: (status: any) => void) {
  try {
    await stopDevotionalAudio();

    if (!audioUrl) return null;

    if (Platform.OS !== 'web') {
      const createPlayer = getCreateAudioPlayer();
      if (createPlayer) {
        const player = createPlayer({ uri: audioUrl });
        activeNativePlayer = player;
        if (player.addListener) {
          player.addListener('statusChange', (status: any) => {
            onStatusUpdate?.(status);
          });
        }
        player.play();
        return player;
      }
    } else {
      if (typeof window !== 'undefined' && (window as any).Audio) {
        const audio = new (window as any).Audio(audioUrl);
        activeWebAudio = audio;

        audio.onended = () => {
          onStatusUpdate?.({ didJustFinish: true });
        };

        await audio.play().catch(() => {});
        return audio;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function pauseDevotionalAudio() {
  try {
    if (activeNativePlayer && activeNativePlayer.pause) {
      activeNativePlayer.pause();
    } else if (activeWebAudio) {
      activeWebAudio.pause();
    }
  } catch {
    // Ignore
  }
}

export async function resumeDevotionalAudio() {
  try {
    if (activeNativePlayer && activeNativePlayer.play) {
      activeNativePlayer.play();
    } else if (activeWebAudio) {
      await activeWebAudio.play().catch(() => {});
    }
  } catch {
    // Ignore
  }
}

export async function stopDevotionalAudio() {
  try {
    if (activeNativePlayer) {
      if (activeNativePlayer.pause) activeNativePlayer.pause();
      if (activeNativePlayer.remove) activeNativePlayer.remove();
      activeNativePlayer = null;
    }
    if (activeWebAudio) {
      activeWebAudio.pause();
      activeWebAudio.currentTime = 0;
      activeWebAudio = null;
    }
  } catch {
    // Ignore
  }
}

export async function unloadAllSounds() {
  try {
    await stopDevotionalAudio();
  } catch {
    // Ignore
  }
}
