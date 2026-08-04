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
      window.speechSynthesis.cancel(); // clear ongoing queue

      // Phonetic spelling to ensure natural pronunciation: "Hi, welcome to exeli-in"
      const utterance = new SpeechSynthesisUtterance('Hi, welcome to exeli-in');
      utterance.rate = 0.92;
      utterance.pitch = 1.05;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      
      // Specifically target "Ava Multilingual Online (Natural)" or similar Ava voices
      let avaVoice = voices.find((v) =>
        v.name.toLowerCase().includes('ava') &&
        (v.name.toLowerCase().includes('multilingual') || v.name.toLowerCase().includes('online') || v.name.toLowerCase().includes('natural'))
      );

      if (!avaVoice) {
        avaVoice = voices.find((v) => v.name.toLowerCase().includes('ava'));
      }

      if (!avaVoice) {
        // Fallback to high quality English female voices if Ava isn't installed on the OS
        avaVoice = voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Natural') ||
              v.name.includes('Samantha') ||
              v.name.includes('Jenny') ||
              v.name.includes('Serena') ||
              v.name.includes('Female'))
        );
      }

      if (avaVoice) {
        utterance.voice = avaVoice;
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

    // Browser interaction listener to trigger audio play on first user gesture if autoplay was blocked
    const handleFirstGesture = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            playInitialWelcomeOnce();
          })
          .catch(() => {});
      }
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture);
    window.addEventListener('touchstart', handleFirstGesture);
    window.addEventListener('keydown', handleFirstGesture);

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
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
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          playInitialWelcomeOnce();
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


