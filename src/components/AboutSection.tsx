import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Layers } from 'lucide-react';

import humanAiArt from '../assets/images/human_ai_synergy_art_1785958844338.jpg';
import ecosystemArt from '../assets/images/ecosystem_architecture_art_1785958853008.jpg';

interface PillarData {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  image: string;
  icon: React.ElementType;
  accent: string;
}

export const AboutSection: React.FC = () => {
  const pillars: PillarData[] = [
    {
      id: 'human-ai-synergy',
      title: 'Human-AI Synergy',
      tagline: 'Harmonious Co-Intelligence',
      desc: 'Not full AI, not full human, and not full automation — but a harmony of the best fit and combination. We unite human intuition with adaptive smart systems for natural, balanced synergy.',
      image: humanAiArt,
      icon: Sparkles,
      accent: '#c99f90',
    },
    {
      id: 'ecosystem-engineering',
      title: 'Ecosystem Engineering',
      tagline: 'Future-Proof Architecture',
      desc: 'Modular and extendable smart systems creating future-proof architecture. We connect disparate technologies into cohesive, self-organizing environments built to evolve.',
      image: ecosystemArt,
      icon: Layers,
      accent: '#b48a7b',
    },
  ];

  return (
    <section
      id="about"
      className="about min-h-screen w-full bg-white/75 backdrop-blur-md flex flex-col justify-center items-center px-4 sm:px-6 py-20 sm:py-32 relative z-10"
    >
      <div className="about-content max-w-5xl w-full text-center space-y-12 sm:space-y-16">
        {/* Category Eyebrow & Headline */}
        <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="font-heading text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#6e5d57] font-semibold"
          >
            Philosophical Core
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-2xl sm:text-5xl lg:text-6xl font-normal uppercase tracking-wider sm:tracking-[0.15em] text-[#332d2b] leading-tight"
          >
            The Future is <span className="text-[#c99f90] font-medium">Tactile.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-sm sm:text-xl font-medium text-[#4a403d] leading-relaxed max-w-2xl mx-auto"
          >
            Exelli-on is a multidisciplinary innovation hub. We bridge the gap between abstract artificial intelligence and physical human experience. We don't just build smart systems; we build ecosystems
          </motion.p>
        </div>

        {/* High-Art Visual Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 text-left pt-4 sm:pt-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, delay: idx * 0.2 }}
                className="group relative rounded-3xl overflow-hidden bg-[#fdfbf9] border border-[#d8b6a9]/40 shadow-xl shadow-[#d8b6a9]/10 hover:shadow-2xl hover:shadow-[#d8b6a9]/20 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Visual Art Header */}
                <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-[#f4ece6]">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf9] via-transparent to-black/10" />

                  {/* Top Floating Tag */}
                  <div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 flex items-center justify-between pointer-events-none gap-2">
                    <div className="px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#d8b6a9]/40 flex items-center space-x-1.5 sm:space-x-2 text-[9px] sm:text-[10px] font-heading font-semibold text-[#332d2b] tracking-wider uppercase shadow-xs min-w-0">
                      <Icon className="w-3.5 h-3.5 text-[#c99f90] shrink-0" />
                      <span className="truncate">{pillar.tagline}</span>
                    </div>
                    <span className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-[#332d2b]/80 backdrop-blur-md text-white font-heading text-[10px] tracking-widest font-mono shrink-0">
                      0{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-10 space-y-4 relative z-10 -mt-6 bg-gradient-to-b from-[#fdfbf9]/95 to-[#fdfbf9] backdrop-blur-sm rounded-t-3xl border-t border-[#d8b6a9]/20 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-heading font-semibold tracking-wide text-[#332d2b] group-hover:text-[#c99f90] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#524642] font-normal leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center space-x-2 text-[11px] font-heading tracking-widest uppercase text-[#c99f90] font-semibold">
                    <div className="w-2 h-2 rounded-full bg-[#c99f90]" />
                    <span>Foundational Pillar 0{idx + 1}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};



