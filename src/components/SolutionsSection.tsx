import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SOLUTIONS } from '../data/mockData';
import { SolutionItem } from '../types';
import { CheckCircle2, ArrowRight, X, Clock } from 'lucide-react';

export const SolutionsSection: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);

  return (
    <section
      id="solutions"
      className="solutions min-h-screen w-full bg-white/40 backdrop-blur-sm flex flex-col justify-center items-center px-6 py-24 sm:py-32 relative z-10"
    >
      <div className="max-w-5xl w-full text-center space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <div className="font-heading text-xs tracking-[0.3em] uppercase text-[#b4a59f]">
            DEPLOYABLE PRODUCTS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extralight uppercase tracking-[0.2em] text-[#332d2b]">
            Solutions
          </h2>
        </motion.div>

        {/* Solution Cards List */}
        <div className="space-y-16">
          {SOLUTIONS.map((sol, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <motion.div
                key={sol.id}
                initial={{ opacity: 0, y: 60, rotateX: 6 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.1 }}
                onClick={() => setSelectedSolution(sol)}
                className={`solution-card group p-8 sm:p-12 rounded-2xl bg-[#fdfbf9] border border-[#d8b6a9]/25 hover:border-[#d8b6a9]/60 transition-all duration-500 cursor-pointer flex flex-col md:flex-row items-center gap-8 md:gap-16 text-left ${
                  isEven ? 'md:flex-row-reverse text-right' : ''
                }`}
              >
                {/* Sol Number */}
                <div className="sol-number font-heading text-6xl sm:text-8xl font-extralight text-[#d8b6a9] opacity-35 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500 shrink-0">
                  {sol.number}
                </div>

                {/* Sol Info */}
                <div className={`sol-info flex-1 space-y-4 ${isEven ? 'md:items-end' : ''}`}>
                  <h3 className="text-2xl sm:text-3xl font-heading font-light text-[#332d2b] group-hover:text-[#d8b6a9] transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-sm sm:text-base font-light text-[#b4a59f] leading-relaxed">
                    {sol.description}
                  </p>

                  <div
                    className={`pt-2 flex items-center space-x-2 text-xs font-heading tracking-widest text-[#d8b6a9] group-hover:text-[#332d2b] transition-colors uppercase ${
                      isEven ? 'md:justify-end' : ''
                    }`}
                  >
                    <span>Inspect Solution</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Solution Detail Modal */}
      <AnimatePresence>
        {selectedSolution && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#332d2b]/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl rounded-2xl bg-[#fdfbf9] border border-[#d8b6a9]/40 p-8 sm:p-10 shadow-2xl relative text-[#332d2b] space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedSolution(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-[#f4f0ed] text-[#b4a59f] hover:text-[#332d2b] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <div className="font-heading text-xs text-[#d8b6a9] tracking-widest uppercase flex items-center space-x-2">
                  <span>SOLUTION // {selectedSolution.number}</span>
                </div>
                <h3 className="text-3xl font-heading font-light tracking-wide text-[#332d2b]">
                  {selectedSolution.title}
                </h3>
              </div>

              <p className="text-sm text-[#b4a59f] font-light leading-relaxed">
                {selectedSolution.longDescription}
              </p>

              {/* Key Benefits */}
              <div className="space-y-3 pt-2">
                <div className="font-heading text-xs text-[#332d2b] uppercase tracking-wider">
                  Key Deliverables
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-light text-[#332d2b]">
                  {selectedSolution.keyBenefits.map((ben, bIdx) => (
                    <div key={bIdx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-[#d8b6a9] shrink-0" />
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deployment Timeframe */}
              <div className="p-4 rounded-xl bg-[#f7f4f2] border border-[#d8b6a9]/30 flex items-center justify-between text-xs font-heading">
                <div className="flex items-center space-x-2 text-[#b4a59f]">
                  <Clock className="w-4 h-4 text-[#d8b6a9]" />
                  <span>Deployment Lead Time:</span>
                </div>
                <span className="text-[#332d2b] font-medium">{selectedSolution.deploymentTime}</span>
              </div>

              <div className="pt-4 flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedSolution(null)}
                  className="px-6 py-2.5 rounded-full border border-[#d8b6a9]/40 text-[#332d2b] font-heading text-xs tracking-widest uppercase hover:bg-[#f4f0ed] transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedSolution(null);
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#d8b6a9] text-white font-heading text-xs tracking-widest uppercase hover:bg-[#c9a496] transition-colors"
                >
                  Request Integration
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
