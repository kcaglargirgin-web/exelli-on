import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const highlights = [
    {
      title: 'Human-AI Synergy',
      desc: 'Creating intelligent software that acts as an intuitive cognitive extension for human operators.',
      icon: Cpu,
    },
    {
      title: 'Ecosystem Engineering',
      desc: 'Connecting fragmented software systems into unified, self-sustaining enterprise architectures.',
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      id="about"
      className="about min-h-screen w-full bg-white/70 backdrop-blur-md flex flex-col justify-center items-center px-6 py-24 sm:py-32 relative z-10"
    >
      <div className="about-content max-w-3xl text-center space-y-8">
        {/* Category Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="font-heading text-xs tracking-[0.3em] uppercase text-[#6e5d57] font-semibold"
        >
          Philosophical Core
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-normal uppercase tracking-[0.15em] text-[#332d2b] leading-tight"
        >
          The Future is <span className="text-[#c99f90] font-medium">Tactile.</span>
        </motion.h2>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-lg sm:text-2xl font-medium text-[#4a403d] leading-relaxed max-w-2xl mx-auto"
        >
          Exelli-on is a multidisciplinary innovation hub. We bridge the gap between abstract artificial intelligence and physical human experience. We don't just build software; we build ecosystems.
        </motion.p>

        {/* Minimal Interactive Detail Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="pt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
        >
          {highlights.map((item, idx) => {
            const isSel = activeTab === idx;
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`p-8 rounded-2xl border transition-all duration-300 cursor-pointer space-y-4 ${
                  isSel
                    ? 'bg-[#fdfbf9] border-[#c99f90] shadow-md shadow-[#d8b6a9]/15'
                    : 'bg-white/90 border-[#d8b6a9]/35 hover:border-[#c99f90]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-[#f4f0ed] text-[#c99f90]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-heading text-[10px] tracking-widest text-[#6e5d57] font-semibold">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="font-heading text-sm text-[#221c1a] tracking-wider uppercase font-semibold">
                  {item.title}
                </h3>
                <p className="text-xs text-[#524642] font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
