import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Layers, ArrowUpRight, X, CheckCircle2, Clock, ShieldCheck, Zap } from 'lucide-react';

const humanAiArt = '/src/assets/images/human_ai_synergy_art_1785958844338.jpg';
const ecosystemArt = '/src/assets/images/ecosystem_architecture_art_1785958853008.jpg';

interface CapabilityDetail {
  title: string;
  horizon: string;
  desc: string;
  impact: string;
}

interface PillarData {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  image: string;
  icon: React.ElementType;
  accent: string;
  visionHorizon: string;
  capabilities: CapabilityDetail[];
}

export const AboutSection: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<PillarData | null>(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPillar(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const pillars: PillarData[] = [
    {
      id: 'human-ai-synergy',
      title: 'Human-AI Synergy',
      tagline: 'Harmonious Co-Intelligence',
      desc: 'Not full AI, not full human, and not full automation — but a harmony of the best fit and combination. We unite human intuition with adaptive smart systems for natural, balanced synergy.',
      image: humanAiArt,
      icon: Sparkles,
      accent: '#c99f90',
      visionHorizon:
        'Over the next 5 to 10 years (2026–2035), computing shifts from rigid prompt-response models to natural, co-adaptive co-intelligence. We design systems where human judgment provides the strategic spark while adaptive background agents handle high-dimensional computation, preserving human agency at every step.',
      capabilities: [
        {
          title: 'Neural-Symbolic Intent Mapping',
          horizon: 'Horizon 2026 – 2028',
          desc: 'Translating natural human speech, contextual gestures, and intent into zero-latency multi-step operational logic without complex manual prompting.',
          impact: 'Instant execution with zero cognitive friction',
        },
        {
          title: 'Biometric & Cognitive Load Balancing',
          horizon: 'Horizon 2027 – 2030',
          desc: 'Monitoring real-time operator focus and fatigue metrics to dynamically delegate repetitive analytical sub-tasks to background AI agents.',
          impact: 'Optimized operator endurance and focus preservation',
        },
        {
          title: 'Contextual Memory & Domain Symbiosis',
          horizon: 'Horizon 2028 – 2032',
          desc: 'Persistent neural knowledge engines that retain deep domain history, institutional nuances, and team preferences across multi-year lifecycles.',
          impact: 'Zero context loss across organizational shifts',
        },
        {
          title: 'Transparent Human Oversight & Veto',
          horizon: 'Horizon 2026 – 2035',
          desc: 'Built-in ethical audit trails and transparent decision paths ensuring human wisdom retains absolute oversight and override control.',
          impact: 'Uncompromising trust and strategic alignment',
        },
      ],
    },
    {
      id: 'ecosystem-engineering',
      title: 'Ecosystem Engineering',
      tagline: 'Future-Proof Architecture',
      desc: 'Modular and extendable smart systems creating future-proof architecture. We connect disparate technologies into cohesive, self-organizing environments built to evolve.',
      image: ecosystemArt,
      icon: Layers,
      accent: '#b48a7b',
      visionHorizon:
        'Looking toward 2035, enterprise infrastructure cannot rely on brittle monoliths. We build modular, self-healing smart architectures that dynamically adapt to new hardware, evolving protocols, and high-throughput edge nodes with continuous uptime.',
      capabilities: [
        {
          title: 'Modular Smart Mesh Architecture',
          horizon: 'Horizon 2026 – 2028',
          desc: 'Decoupled, micro-adaptable nodes that reconfigure, scale, and upgrade in real-time without system downtime or single failure points.',
          impact: 'Continuous evolution with 99.999% uptime resilience',
        },
        {
          title: 'Universal Hardware-Protocol Translation',
          horizon: 'Horizon 2027 – 2030',
          desc: 'Autonomous protocol adapters bridging physical equipment, IoT arrays, and legacy databases into next-generation neural backbones.',
          impact: 'Seamless integration across legacy and future tech',
        },
        {
          title: 'Self-Healing Edge Node Matrix',
          horizon: 'Horizon 2028 – 2032',
          desc: 'Localized edge computing units featuring autonomous threat prediction, instant anomaly quarantine, and peer-to-peer state recovery.',
          impact: 'Zero-latency edge execution with self-repair',
        },
        {
          title: 'Post-Quantum Adaptive Data Core',
          horizon: 'Horizon 2029 – 2035',
          desc: 'Cryptographically hardened, high-throughput streaming pipelines designed from the foundation for post-quantum security requirements.',
          impact: 'Future-proof enterprise data sovereignty',
        },
      ],
    },
  ];

  const handleScrollToContact = () => {
    setSelectedPillar(null);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      className="about min-h-screen w-full bg-white/75 backdrop-blur-md flex flex-col justify-center items-center px-6 py-24 sm:py-32 relative z-10"
    >
      <div className="about-content max-w-5xl w-full text-center space-y-16">
        {/* Category Eyebrow & Headline */}
        <div className="space-y-6 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="font-heading text-xs tracking-[0.3em] uppercase text-[#6e5d57] font-semibold"
          >
            Philosophical Core
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-normal uppercase tracking-[0.15em] text-[#332d2b] leading-tight"
          >
            The Future is <span className="text-[#c99f90] font-medium">Tactile.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-base sm:text-xl font-medium text-[#4a403d] leading-relaxed max-w-2xl mx-auto"
          >
            Exelli-on is a multidisciplinary innovation hub. We bridge the gap between abstract artificial intelligence and physical human experience. We don't just build smart systems; we build ecosystems
          </motion.p>
        </div>

        {/* High-Art Visual Showcase Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-left pt-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, delay: idx * 0.2 }}
                onClick={() => setSelectedPillar(pillar)}
                className="group relative rounded-3xl overflow-hidden bg-[#fdfbf9] border border-[#d8b6a9]/40 shadow-xl shadow-[#d8b6a9]/10 hover:shadow-2xl hover:shadow-[#d8b6a9]/20 transition-all duration-500 flex flex-col justify-between cursor-pointer"
              >
                {/* Visual Art Header */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#f4ece6]">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf9] via-transparent to-black/10" />

                  {/* Top Floating Tag */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                    <div className="px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#d8b6a9]/40 flex items-center space-x-2 text-[10px] font-heading font-semibold text-[#332d2b] tracking-wider uppercase shadow-xs">
                      <Icon className="w-3.5 h-3.5 text-[#c99f90]" />
                      <span>{pillar.tagline}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#332d2b]/80 backdrop-blur-md text-white font-heading text-[10px] tracking-widest font-mono">
                      0{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-8 sm:p-10 space-y-4 relative z-10 -mt-6 bg-gradient-to-b from-[#fdfbf9]/90 to-[#fdfbf9] backdrop-blur-sm rounded-t-3xl border-t border-[#d8b6a9]/20">
                  <h3 className="text-2xl font-heading font-semibold tracking-wide text-[#332d2b] group-hover:text-[#c99f90] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#524642] font-normal leading-relaxed">
                    {pillar.desc}
                  </p>

                  <div className="pt-4 flex items-center justify-between text-xs font-heading tracking-widest uppercase text-[#c99f90] group-hover:text-[#332d2b] transition-colors font-semibold">
                    <span>Explore Pillar Capabilities & Vision</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Visually Immersive Pillar Detail Popup Modal */}
      <AnimatePresence>
        {selectedPillar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPillar(null)}
              className="fixed inset-0 bg-[#221c1a]/60 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#fdfbf9] border border-[#d8b6a9]/50 rounded-3xl shadow-2xl overflow-y-auto z-10 text-left flex flex-col my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPillar(null)}
                className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#332d2b] hover:text-[#c99f90] border border-[#d8b6a9]/40 backdrop-blur-md transition-all cursor-pointer shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Hero Banner */}
              <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-[#f4ece6]">
                <img
                  src={selectedPillar.image}
                  alt={selectedPillar.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf9] via-[#fdfbf9]/40 to-black/20" />

                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-10 sm:right-10 space-y-2">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#d8b6a9]/50 text-[10px] font-heading font-semibold text-[#c99f90] uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{selectedPillar.tagline}</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-heading font-semibold text-[#332d2b] tracking-wide">
                    {selectedPillar.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body Content */}
              <div className="p-6 sm:p-10 space-y-8 flex-1">
                {/* 5-10 Year Horizon Vision Block */}
                <div className="p-6 sm:p-8 rounded-2xl bg-[#f7f2ed] border border-[#d8b6a9]/40 space-y-3">
                  <div className="flex items-center space-x-2 text-xs font-heading tracking-widest uppercase text-[#c99f90] font-semibold">
                    <Clock className="w-4 h-4 text-[#c99f90]" />
                    <span>5 - 10 Year Horizon Vision (2026 – 2035)</span>
                  </div>
                  <p className="text-sm sm:text-base text-[#4a403d] font-normal leading-relaxed">
                    {selectedPillar.visionHorizon}
                  </p>
                </div>

                {/* Capabilities Grid */}
                <div className="space-y-4">
                  <h4 className="text-xs font-heading tracking-[0.25em] uppercase text-[#6e5d57] font-semibold">
                    Core Capabilities & Emerging Systems
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {selectedPillar.capabilities.map((cap, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-5 rounded-2xl bg-white border border-[#d8b6a9]/30 hover:border-[#c99f90]/60 transition-all space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-heading tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#f4ece6] text-[#6e5d57] font-semibold">
                              {cap.horizon}
                            </span>
                            <span className="text-[10px] font-mono text-[#c99f90] font-semibold">
                              0{cIdx + 1}
                            </span>
                          </div>
                          <h5 className="font-heading text-sm text-[#221c1a] font-semibold tracking-wider">
                            {cap.title}
                          </h5>
                          <p className="text-xs text-[#524642] leading-relaxed">
                            {cap.desc}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#f4ece6] flex items-center space-x-2 text-[11px] text-[#332d2b] font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#c99f90] shrink-0" />
                          <span className="truncate">{cap.impact}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Action CTA Footer */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#d8b6a9]/30">
                  <div className="text-xs text-[#6e5d57] font-medium">
                    Ready to build next-generation systems with Exelli-on?
                  </div>
                  <button
                    onClick={handleScrollToContact}
                    className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#c99f90] hover:bg-[#b88f7f] text-white font-heading text-xs tracking-widest uppercase transition-colors cursor-pointer font-semibold shadow-md shadow-[#c99f90]/20"
                  >
                    Start Dialogue
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};


