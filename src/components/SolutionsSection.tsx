import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { SOLUTIONS } from '../data/mockData';
import { SolutionItem } from '../types';
import { CheckCircle2, ArrowRight, X, AlertCircle, Sparkles, Layers } from 'lucide-react';

export const SolutionsSection: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);

  // Prevent background body scroll when modal is open
  useEffect(() => {
    if (selectedSolution) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedSolution]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedSolution(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleRequestIntegration = () => {
    setSelectedSolution(null);
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section
      id="solutions"
      className="solutions min-h-screen w-full bg-white/40 backdrop-blur-sm flex flex-col justify-center items-center px-4 sm:px-6 py-24 sm:py-32 relative z-10"
    >
      <div className="max-w-5xl w-full text-center space-y-12 sm:space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="space-y-3 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-5xl font-light uppercase tracking-[0.2em] text-[#332d2b]">
            Solutions
          </h2>
          <p className="text-sm sm:text-base text-[#5c4f4a] font-normal leading-relaxed">
            Practical, high-impact enterprise AI systems engineered to solve core operational bottlenecks and drive measurable value.
          </p>
        </motion.div>

        {/* Solution Cards List */}
        <div className="space-y-8 sm:space-y-10">
          {SOLUTIONS.map((sol, idx) => {
            return (
              <motion.div
                key={sol.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                onClick={() => setSelectedSolution(sol)}
                className="solution-card group p-6 sm:p-10 rounded-3xl bg-[#fdfbf9] border border-[#d8b6a9]/30 hover:border-[#c99f90] shadow-md hover:shadow-xl hover:shadow-[#d8b6a9]/15 transition-all duration-300 cursor-pointer text-left relative overflow-hidden"
              >
                {/* Solution Artwork Header */}
                {sol.image && (
                  <div className="relative h-44 sm:h-60 w-full overflow-hidden rounded-2xl bg-[#f4ece6] mb-6 border border-[#d8b6a9]/30">
                    <img
                      src={sol.image}
                      alt={sol.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf9] via-transparent to-black/20" />

                    {/* Floating Header Badges */}
                    <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none">
                      <div className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#d8b6a9]/40 flex items-center space-x-1.5 text-[10px] font-heading font-semibold text-[#332d2b] tracking-wider uppercase shadow-xs">
                        <Sparkles className="w-3 h-3 text-[#c99f90] shrink-0" />
                        <span>Exelli-on Architecture</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#332d2b]/85 backdrop-blur-md text-white font-heading text-[10px] tracking-widest font-mono">
                        SOL // {sol.number}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#d8b6a9]/20">
                  <div className="flex items-center space-x-4">
                    <span className="font-heading text-3xl sm:text-4xl font-extralight text-[#c99f90]">
                      {sol.number}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-heading font-semibold text-[#332d2b] group-hover:text-[#c99f90] transition-colors">
                        {sol.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6e5d57] mt-1 line-clamp-2">
                        {sol.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-xs font-heading tracking-widest text-[#c99f90] group-hover:text-[#332d2b] transition-colors uppercase font-semibold shrink-0">
                    <span>View Breakdown</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 3 Pillars Summary on Card */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-xs sm:text-sm">
                  {/* The Problem */}
                  <div className="space-y-2 p-4 rounded-2xl bg-[#fcf8f5] border border-[#d8b6a9]/25">
                    <div className="flex items-center space-x-2 text-[#9a4b3d] font-heading font-semibold text-[11px] uppercase tracking-wider">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>The Problem</span>
                    </div>
                    <p className="text-[#524642] text-xs leading-relaxed line-clamp-3">
                      {sol.problem}
                    </p>
                  </div>

                  {/* What We Do */}
                  <div className="space-y-2 p-4 rounded-2xl bg-[#f7f2ed] border border-[#d8b6a9]/25">
                    <div className="flex items-center space-x-2 text-[#8b6555] font-heading font-semibold text-[11px] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#c99f90]" />
                      <span>What We Do</span>
                    </div>
                    <p className="text-[#524642] text-xs leading-relaxed line-clamp-3">
                      {sol.whatWeDo}
                    </p>
                  </div>

                  {/* Key Deliverables */}
                  <div className="space-y-2 p-4 rounded-2xl bg-white border border-[#d8b6a9]/30">
                    <div className="flex items-center space-x-2 text-[#332d2b] font-heading font-semibold text-[11px] uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#c99f90]" />
                      <span>Key Deliverables</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-[#524642]">
                      {sol.keyDeliverables.slice(0, 2).map((del, dIdx) => (
                        <li key={dIdx} className="flex items-start space-x-1.5">
                          <span className="text-[#c99f90] font-bold">•</span>
                          <span className="line-clamp-1">{del}</span>
                        </li>
                      ))}
                      {sol.keyDeliverables.length > 2 && (
                        <li className="text-[11px] text-[#c99f90] font-semibold tracking-wider uppercase">
                          + {sol.keyDeliverables.length - 2} more deliverables
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Scope highlights for Digital / AI Twin on card */}
                {sol.scopeHighlights && (
                  <div className="mt-4 pt-4 border-t border-[#d8b6a9]/20 flex flex-wrap gap-1.5 items-center">
                    <span className="text-[10px] font-heading font-semibold tracking-wider uppercase text-[#6e5d57] mr-1.5">
                      Scope:
                    </span>
                    {sol.scopeHighlights.map((scope, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-0.5 rounded-full bg-[#f4ece6] text-[#4a403d] text-[10px] font-medium border border-[#d8b6a9]/30"
                      >
                        {scope.title}
                      </span>
                    ))}
                  </div>
                )}

                {/* Supported sectors list for WiseBrain on card */}
                {sol.sectorBullets && (
                  <div className="mt-4 pt-4 border-t border-[#d8b6a9]/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-heading font-semibold tracking-wider uppercase text-[#6e5d57]">
                        Sector-Specific Implementations (Not all-in-one generic):
                      </span>
                      <span className="text-[10px] text-[#c99f90] font-semibold">
                        {sol.sectorBullets.length} Sectors
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#524642]">
                      {sol.sectorBullets.slice(0, 4).map((bullet, bIdx) => (
                        <div key={bIdx} className="flex items-center space-x-1.5 text-[11px]">
                          <span className="text-[#c99f90] font-bold">•</span>
                          <span className="font-medium text-[#332d2b]">{bullet.sector}</span>
                        </div>
                      ))}
                    </div>
                    {sol.sectorBullets.length > 4 && (
                      <div className="text-[10px] text-[#c99f90] font-semibold tracking-wider uppercase pt-0.5">
                        + {sol.sectorBullets.length - 4} more sectors (view breakdown)
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Solution Detail Full Modal rendered via Portal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {selectedSolution && (
              <div
                id="solution-modal-container"
                className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8"
              >
                {/* Backdrop Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setSelectedSolution(null)}
                  className="fixed inset-0 bg-[#221c1a]/70 backdrop-blur-md cursor-pointer"
                />

                {/* Dialog Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 280 }}
                  className="relative w-full max-w-3xl max-h-[88vh] rounded-3xl bg-[#fdfbf9] border border-[#d8b6a9]/60 shadow-2xl z-10 text-left text-[#332d2b] flex flex-col overflow-hidden"
                >
                  {/* Pinned Modal Header */}
                  <div className="p-6 sm:p-8 pb-4 sm:pb-5 border-b border-[#d8b6a9]/25 flex items-start justify-between gap-4 bg-[#fdfbf9]">
                    <div className="space-y-1.5 pr-4">
                      <div className="font-heading text-xs text-[#c99f90] tracking-widest uppercase flex items-center space-x-2 font-semibold">
                        <span>SOLUTION // {selectedSolution.number}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-heading font-semibold tracking-wide text-[#332d2b]">
                        {selectedSolution.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6e5d57] font-normal leading-relaxed">
                        {selectedSolution.tagline}
                      </p>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedSolution(null)}
                      aria-label="Close solution details"
                      className="p-2.5 rounded-full bg-white/90 hover:bg-white text-[#332d2b] hover:text-[#c99f90] border border-[#d8b6a9]/40 backdrop-blur-md transition-all cursor-pointer shadow-xs shrink-0"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Scrollable Modal Content Body */}
                  <div className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-6">
                    {/* Solution Visual Artwork */}
                    {selectedSolution.image && (
                      <div className="relative h-48 sm:h-64 w-full overflow-hidden rounded-2xl bg-[#f4ece6] border border-[#d8b6a9]/40 shadow-sm">
                        <img
                          src={selectedSolution.image}
                          alt={selectedSolution.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover filter contrast-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#221c1a]/50 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-4 text-white/90 text-[11px] font-heading tracking-widest uppercase flex items-center space-x-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#c99f90]" />
                          <span>Architectural Blueprint // Solution {selectedSolution.number}</span>
                        </div>
                      </div>
                    )}

                    {/* The Problem */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-[#fcf8f5] border border-[#e8d2ca] space-y-2.5">
                      <div className="flex items-center space-x-2 text-[#9a4b3d] font-heading font-semibold text-xs uppercase tracking-wider">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>The Problem</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#4a403d] leading-relaxed">
                        {selectedSolution.problem}
                      </p>
                    </div>

                    {/* What We Do */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-[#f7f2ed] border border-[#d8b6a9]/40 space-y-2.5">
                      <div className="flex items-center space-x-2 text-[#8b6555] font-heading font-semibold text-xs uppercase tracking-wider">
                        <Sparkles className="w-4 h-4 shrink-0 text-[#c99f90]" />
                        <span>What We Do</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#4a403d] leading-relaxed">
                        {selectedSolution.whatWeDo}
                      </p>
                    </div>

                    {/* Digital / AI Twin Scope Highlights (Processes, Architecture, Operating Model) */}
                    {selectedSolution.scopeHighlights && (
                      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#d8b6a9]/40 space-y-4">
                        <div className="flex items-center space-x-2 text-[#332d2b] font-heading font-semibold text-xs uppercase tracking-wider">
                          <Layers className="w-4 h-4 shrink-0 text-[#c99f90]" />
                          <span>Core Twin Dimensions (Processes, Architecture & Operating Model)</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {selectedSolution.scopeHighlights.map((scope, sIdx) => (
                            <div
                              key={sIdx}
                              className="p-4 rounded-xl bg-[#fdfbf9] border border-[#d8b6a9]/30 space-y-1.5"
                            >
                              <div className="text-xs font-heading font-semibold text-[#332d2b] flex items-center space-x-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#c99f90]" />
                                <span>{scope.title}</span>
                              </div>
                              <p className="text-[11px] text-[#5c4f4a] leading-relaxed">
                                {scope.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key Deliverables */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#d8b6a9]/40 space-y-4">
                      <div className="flex items-center space-x-2 text-[#332d2b] font-heading font-semibold text-xs uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-[#c99f90]" />
                        <span>Key Deliverables</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#4a403d]">
                        {selectedSolution.keyDeliverables.map((del, dIdx) => (
                          <div
                            key={dIdx}
                            className="p-3 rounded-xl bg-[#fdfbf9] border border-[#d8b6a9]/25 flex items-start space-x-2.5"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#c99f90] shrink-0 mt-0.5" />
                            <span className="font-medium leading-snug">{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Sector-Specific Implementations for WiseBrain (Bulleted for each sector) */}
                    {selectedSolution.sectorBullets && (
                      <div className="p-5 sm:p-6 rounded-2xl bg-[#fcf8f5] border border-[#d8b6a9]/40 space-y-3.5">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-[#332d2b] font-heading font-semibold text-xs uppercase tracking-wider">
                            <Layers className="w-4 h-4 shrink-0 text-[#c99f90]" />
                            <span>What We Do For Each Sector (Sector-Specific Implementations)</span>
                          </div>
                          <p className="text-[11px] text-[#6e5d57]">
                            Engineered dedicatedly per industry vertical—not a generic all-in-one model:
                          </p>
                        </div>

                        <div className="space-y-2.5 pt-1">
                          {selectedSolution.sectorBullets.map((bullet, bIdx) => (
                            <div
                              key={bIdx}
                              className="p-3 rounded-xl bg-white border border-[#d8b6a9]/30 flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3 text-xs"
                            >
                              <div className="font-heading font-semibold text-[#332d2b] shrink-0 sm:w-56 flex items-center space-x-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#c99f90] shrink-0" />
                                <span>{bullet.sector}</span>
                              </div>
                              <div className="text-[#524642] text-xs leading-relaxed">
                                {bullet.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Supported Sectors Tags if no sectorBullets */}
                    {!selectedSolution.sectorBullets && selectedSolution.supportedDomains && (
                      <div className="p-5 sm:p-6 rounded-2xl bg-[#f4ece6]/50 border border-[#d8b6a9]/40 space-y-3">
                        <div className="flex items-center space-x-2 text-[#332d2b] font-heading font-semibold text-xs uppercase tracking-wider">
                          <Layers className="w-4 h-4 shrink-0 text-[#c99f90]" />
                          <span>Supported Sectors & Regulated Domains</span>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {selectedSolution.supportedDomains.map((dom, dIdx) => (
                            <span
                              key={dIdx}
                              className="px-3 py-1 rounded-full bg-white text-[#332d2b] text-xs font-medium border border-[#d8b6a9]/40 shadow-2xs"
                            >
                              {dom}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pinned Modal Footer */}
                  <div className="p-4 sm:p-6 border-t border-[#d8b6a9]/30 bg-[#fdfbf9] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={() => setSelectedSolution(null)}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-[#d8b6a9]/40 text-[#332d2b] font-heading text-xs tracking-widest uppercase hover:bg-[#f4ece6] transition-colors cursor-pointer font-medium"
                    >
                      Close
                    </button>
                    <button
                      onClick={handleRequestIntegration}
                      className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#c99f90] hover:bg-[#b88f7f] text-white font-heading text-xs tracking-widest uppercase transition-colors cursor-pointer font-semibold shadow-md shadow-[#c99f90]/20"
                    >
                      Request Integration
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};

