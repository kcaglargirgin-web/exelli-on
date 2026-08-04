import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CAPABILITIES } from '../data/mockData';
import { CapabilityItem } from '../types';
import { Layers, Sparkles, Cpu, X, ArrowUpRight } from 'lucide-react';

export const WhatWeDoSection: React.FC = () => {
  const [selectedCap, setSelectedCap] = useState<CapabilityItem | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Layers':
        return Layers;
      case 'Sparkles':
        return Sparkles;
      case 'Cpu':
        return Cpu;
      default:
        return Layers;
    }
  };

  return (
    <section
      id="what-we-do"
      className="what-we-do min-h-screen w-full bg-[#f7f4f2]/40 backdrop-blur-sm flex flex-col justify-center items-center px-6 py-24 sm:py-32 relative z-10"
    >
      <div className="max-w-6xl w-full text-center space-y-16">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <div className="font-heading text-xs tracking-[0.3em] uppercase text-[#b4a59f]">
            CORE ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-[0.2em] text-[#332d2b]">
            Capabilities
          </h2>
        </motion.div>

        {/* 3D Glass Grid */}
        <div className="grid-3d grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {CAPABILITIES.map((cap, idx) => {
            const Icon = getIcon(cap.iconName);

            return (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 40, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                onClick={() => setSelectedCap(cap)}
                className="do-card do-card-glass p-8 rounded-2xl cursor-pointer group flex flex-col justify-between transition-all duration-300"
              >
                <div className="space-y-6">
                  {/* Top Icon */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-[#fdfbf9] text-[#d8b6a9] border border-[#d8b6a9]/30 group-hover:bg-[#d8b6a9] group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-heading text-xs text-[#b4a59f] group-hover:text-[#d8b6a9] transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-medium tracking-wider text-[#332d2b] group-hover:text-[#d8b6a9] transition-colors">
                    {cap.title}
                  </h3>

                  {/* Short Desc */}
                  <p className="text-sm font-light text-[#b4a59f] leading-relaxed">
                    {cap.shortDesc}
                  </p>
                </div>

                {/* Bottom Trigger Link */}
                <div className="pt-8 flex items-center justify-between text-xs font-heading tracking-wider uppercase text-[#b4a59f] group-hover:text-[#332d2b] transition-colors">
                  <span>Explore Spec</span>
                  <ArrowUpRight className="w-4 h-4 text-[#d8b6a9] group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Capability Detail Modal */}
      <AnimatePresence>
        {selectedCap && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#332d2b]/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl rounded-2xl bg-[#fdfbf9] border border-[#d8b6a9]/40 p-8 shadow-2xl relative text-[#332d2b] space-y-6"
            >
              <button
                onClick={() => setSelectedCap(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#f4f0ed] text-[#b4a59f] hover:text-[#332d2b] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="font-heading text-xs text-[#d8b6a9] tracking-widest uppercase">
                  Capability Dossier
                </span>
                <h3 className="text-2xl font-heading font-normal tracking-wide text-[#332d2b]">
                  {selectedCap.title}
                </h3>
              </div>

              <p className="text-sm text-[#b4a59f] font-light leading-relaxed">
                {selectedCap.detail}
              </p>

              <div className="p-4 rounded-xl bg-[#f7f4f2] border border-[#d8b6a9]/20 font-heading text-xs text-[#332d2b]">
                <span className="text-[#b4a59f] uppercase tracking-wider block mb-1">Performance Standard</span>
                <span>{selectedCap.metrics}</span>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setSelectedCap(null)}
                  className="px-6 py-2.5 rounded-full bg-[#d8b6a9] text-white font-heading text-xs tracking-widest uppercase hover:bg-[#c9a496] transition-colors"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
