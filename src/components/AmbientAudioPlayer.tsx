import React, { useState, useEffect, useRef } from 'react';
import { VolumeX } from 'lucide-react';

export const AmbientAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasSpokenRef = useRef(false);

  // High quality royalty-free atmospheric ambient space soundscape mp3
  const AMBIENT_AUDIO_URL =
    'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=space-ambient-111154.mp3';

  const speakWelcome = () => {
    if (!('speechSynthesis' in window)) return;

    try {
      // On iOS Safari / Chrome Mobile, synthesis might be paused
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel(); // clear ongoing queue

      // Phonetic spelling to ensure natural pronunciation: "Hi, welcome to exeli-in"
      const utterance = new SpeechSynthesisUtterance('Hi, welcome to exeli-in');
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();

      // Target "Ava Multilingual Online (Natural)" or Microsoft Edge / Chrome / Safari natural female voices
      let selectedVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes('ava') &&
          (v.name.toLowerCase().includes('multilingual') ||
            v.name.toLowerCase().includes('online') ||
            v.name.toLowerCase().includes('natural'))
      );

      if (!selectedVoice) {
        selectedVoice = voices.find((v) => v.name.toLowerCase().includes('ava'));
      }

      if (!selectedVoice) {
        // High quality natural female voices across Microsoft Edge, Chrome, Safari, Firefox
        // (e.g. Microsoft Ava Online, Microsoft Jenny Online, Microsoft Aria Online, Google US English, Samantha, Victoria)
        selectedVoice = voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.toLowerCase().includes('natural') ||
              v.name.toLowerCase().includes('online') ||
              v.name.includes('Jenny') ||
              v.name.includes('Aria') ||
              v.name.includes('Samantha') ||
              v.name.includes('Karen') ||
              v.name.includes('Victoria') ||
              v.name.includes('Serena') ||
              v.name.toLowerCase().includes('female'))
        );
      }

      if (!selectedVoice) {
        // Standard English fallback
        selectedVoice = voices.find((v) => v.lang.startsWith('en'));
      }

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.log('Speech synthesis error:', err);
    }
  };

  const playInitialWelcomeOnce = () => {
    if (hasSpokenRef.current) return;
    hasSpokenRef.current = true;
    speakWelcome();
  };

  useEffect(() => {
    const audio = new Audio(AMBIENT_AUDIO_URL);
    audio.loop = true;
    audio.volume = 0.04; // Very soft, subtle background ambient volume
    audioRef.current = audio;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {};
    }

    // Attempt autoplay immediately when page opens
    const startAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        playInitialWelcomeOnce();
      } catch (err) {
        // Browser blocked initial autoplay without interaction
        setIsPlaying(false);
      }
    };

    startAudio();

    // Browser interaction listener to trigger audio play on first user activity if initial autoplay was blocked
    const handleFirstGesture = () => {
      // Call speech SYNCHRONOUSLY within user gesture callstack for Mobile Safari / Chrome Mobile
      playInitialWelcomeOnce();

      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {});
      }
      removeGestureListeners();
    };

    const gestureEvents = [
      'click',
      'touchstart',
      'touchend',
      'pointerdown',
      'pointermove',
      'mousemove',
      'scroll',
      'wheel',
      'keydown',
    ];

    const removeGestureListeners = () => {
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, handleFirstGesture);
      });
    };

    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, handleFirstGesture, { passive: true, once: true });
    });

    return () => {
      removeGestureListeners();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Synchronous speech call on button click for mobile support
      speakWelcome();
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => console.error('Audio play error:', err));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center">
      {/* Ambient Audio Toggle Button */}
      <button
        onClick={toggleSound}
        id="ambient-audio-toggle"
        className={`group relative flex items-center space-x-2.5 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg cursor-pointer ${
          isPlaying
            ? 'bg-white/85 border-[#d8b6a9]/40 text-[#332d2b]'
            : 'bg-[#332d2b]/80 border-white/20 text-white hover:bg-[#332d2b]'
        }`}
        title={isPlaying ? 'Mute Ambient Sound' : 'Play Ambient Sound'}
      >
        {/* Animated Equalizer Waves when playing */}
        {isPlaying ? (
          <div className="flex items-end space-x-0.5 h-3.5 w-4">
            <span className="w-1 bg-[#d8b6a9] rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
            <span className="w-1 bg-[#d8b6a9] rounded-full animate-[bounce_1s_infinite_300ms] h-2/3" />
            <span className="w-1 bg-[#d8b6a9] rounded-full animate-[bounce_1s_infinite_200ms] h-5/6" />
          </div>
        ) : (
          <VolumeX className="w-4 h-4 text-white/70" />
        )}

        <span className="text-[10px] font-heading tracking-widest uppercase font-medium">
          {isPlaying ? 'AMBIENT SOUND' : 'ENABLE SOUND'}
        </span>

        {/* Pulse effect indicator */}
        {isPlaying && (
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d8b6a9] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d8b6a9]"></span>
          </span>
        )}
      </button>
    </div>
  );
};


