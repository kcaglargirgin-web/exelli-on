import React from 'react';
import { motion } from 'motion/react';
import { ExellionLogo } from './ExellionLogo';
import { ChevronDown } from 'lucide-react';

export const IntroSection: React.FC = () => {
  const scrollToNext = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="intro"
      className="intro min-h-screen w-full flex flex-col justify-between items-center px-6 pt-28 pb-12 relative overflow-hidden text-center bg-transparent"
    >
      {/* Top Spacer */}
      <div />

      {/* Center Logo & Hero Presentation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="my-auto space-y-10 relative z-10 flex flex-col items-center max-w-3xl"
      >
        {/* Floating EXELLI-ON Logo with Animated Background Orbital Ring */}
        <div className="relative group cursor-pointer">
          {/* Animated SVG Ring behind logo */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-10 pointer-events-none opacity-40 flex items-center justify-center"
          >
            <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-dashed border-[#d8b6a9]/60" />
          </motion.div>

          <div className="logo-container animate-float-logo filter drop-shadow-md px-4 relative z-10 transform group-hover:scale-105 transition-transform duration-500">
            <ExellionLogo width={400} color="#332d2b" className="max-w-[85vw]" />
          </div>
        </div>

        {/* Minimal Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-heading text-xs sm:text-sm text-[#4a403d] font-semibold tracking-[0.3em] uppercase max-w-lg"
        >
          Future Systems & Digital Ecosystems
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        onClick={scrollToNext}
        className="scroll-indicator cursor-pointer flex flex-col items-center space-y-2 text-[10px] sm:text-xs font-heading tracking-[0.25em] text-[#524642] font-semibold uppercase hover:text-[#000000] transition-colors relative z-10"
      >
        <span>Scroll to Shift Orbit</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#c99f90]" />
      </motion.div>
    </section>
  );
};

