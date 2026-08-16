import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, ShieldCheck, Sparkles } from 'lucide-react';

interface CompanyReference {
  id: string;
  name: string;
  category: string;
  logoFilename: string; // e.g. ankaref.png in /public/images/logos/
  accentColor: string;
  renderLogo: () => React.ReactNode;
}

export const companies: CompanyReference[] = [
  {
    id: 'ankaref',
    name: 'ANKAREF',
    category: 'IoT & Smart Technologies',
    logoFilename: 'ankaref_logo.jpg',
    accentColor: '#1d4ed8',
    renderLogo: () => (
      <div className="flex items-center gap-2.5">
        <svg className="w-8 h-8 text-blue-600" viewBox="0 0 32 32" fill="none">
          <path d="M16 6a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M16 11a5 5 0 0 1 5 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <circle cx="16" cy="20" r="3" fill="currentColor" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="font-extrabold tracking-widest text-xl text-slate-900 leading-none">ANKAREF</span>
          <span className="text-[9px] text-blue-600 font-mono tracking-wider font-bold uppercase mt-0.5">IoT & RFID Tech</span>
        </div>
      </div>
    ),
  },
  {
    id: 'turkish-aerospace',
    name: 'Turkish Aerospace',
    category: 'Aerospace & Defense',
    logoFilename: 'tai.png',
    accentColor: '#dc2626',
    renderLogo: () => (
      <div className="flex items-center gap-3">
        <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none">
          <path d="M60 10 L95 25 L65 45 Z" fill="#1e3a8a" />
          <path d="M90 30 L70 90 L80 32 Z" fill="#dc2626" />
        </svg>
        <div className="flex flex-col text-left">
          <span className="font-black italic tracking-tight text-base text-slate-700 leading-tight font-sans">
            TURKISH
          </span>
          <span className="font-black italic tracking-tight text-base text-slate-700 leading-none font-sans">
            AEROSPACE
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'atel',
    name: 'ATEL Technology',
    category: 'Electronics & Defense',
    logoFilename: 'atel_logo.jpg',
    accentColor: '#f97316',
    renderLogo: () => (
      <div className="flex items-center gap-2.5">
        <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none">
          <path d="M8 32 A20 20 0 0 1 32 32" stroke="#ea580c" strokeWidth="5" strokeLinecap="round" />
          <path d="M14 32 A13 13 0 0 1 28 32" stroke="#ea580c" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M20 32 A6 6 0 0 1 24 32" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <span className="font-extrabold text-2xl tracking-wider text-orange-600 font-sans">ATEL</span>
      </div>
    ),
  },
  {
    id: 'aselsan',
    name: 'ASELSAN',
    category: 'Defense Electronics & Avionics',
    logoFilename: 'aselsan.png',
    accentColor: '#0f2b80',
    renderLogo: () => (
      <div className="flex items-center">
        <span className="font-black text-2xl tracking-tighter text-[#0f2b80] font-sans lowercase">
          aselsan
        </span>
      </div>
    ),
  },
  {
    id: 'obss',
    name: 'OBSS',
    category: 'Software & Technology Services',
    logoFilename: 'OBSS_logo.png',
    accentColor: '#009cd8',
    renderLogo: () => (
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1">
          <svg className="w-16 h-7" viewBox="0 0 100 40" fill="none">
            <path d="M20 20 C20 10, 35 10, 35 20 C35 30, 50 30, 50 20 C50 10, 65 10, 65 20 C65 30, 80 30, 80 20 C80 10, 95 10, 95 20" stroke="#003853" strokeWidth="7" strokeLinecap="round" fill="none" />
            <path d="M50 20 C50 30, 65 30, 65 20 C65 10, 80 10, 80 20 C80 30, 95 30, 95 20" stroke="#009cd8" strokeWidth="7" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <span className="text-[8px] font-bold text-[#003853] tracking-tight uppercase">
          open business software solutions
        </span>
      </div>
    ),
  },
  {
    id: 'jlr',
    name: 'JLR',
    category: 'Jaguar Land Rover Automotive',
    logoFilename: 'jlr.png',
    accentColor: '#1e1e1e',
    renderLogo: () => (
      <div className="flex items-center">
        <span className="font-extrabold text-3xl tracking-widest text-slate-900 font-sans">
          JLR
        </span>
      </div>
    ),
  },
  {
    id: 'bcg',
    name: 'BCG',
    category: 'Boston Consulting Group',
    logoFilename: 'bcg.png',
    accentColor: '#047857',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        <span className="font-serif font-black text-2xl tracking-tighter text-emerald-800">BCG</span>
        <div className="h-6 w-px bg-slate-300 mx-1" />
        <span className="text-[10px] font-semibold text-slate-600 tracking-wider uppercase">Boston Consulting Group</span>
      </div>
    ),
  },
  {
    id: 'cea',
    name: 'CEA',
    category: 'Atomic & Alternative Energies',
    logoFilename: 'cea.jpg',
    accentColor: '#dc2626',
    renderLogo: () => (
      <div className="flex flex-col items-center justify-center bg-red-600 px-3 py-1.5 rounded-md text-white shadow-sm">
        <span className="text-[7px] font-bold tracking-widest uppercase opacity-90 leading-none">FROM RESEARCH TO INDUSTRY</span>
        <span className="font-serif italic font-bold text-xl tracking-wider leading-tight">cea</span>
        <div className="w-full h-0.5 bg-emerald-400 mt-0.5" />
      </div>
    ),
  },
  {
    id: 'euronext',
    name: 'Euronext',
    category: 'Pan-European Financial Exchange',
    logoFilename: 'euronext.png',
    accentColor: '#0284c7',
    renderLogo: () => (
      <div className="flex items-center gap-2">
        <svg className="w-8 h-8 text-sky-600" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="3" />
          <path d="M10 16h12M16 10v12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <span className="font-black text-xl tracking-tight text-slate-900 font-sans">EURONEXT</span>
      </div>
    ),
  },
  {
    id: 'stmicroelectronics',
    name: 'STMicroelectronics',
    category: 'Semiconductor Manufacturing',
    logoFilename: 'st.png',
    accentColor: '#032b5b',
    renderLogo: () => (
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center justify-center bg-[#032b5b] text-white font-extrabold italic text-base px-3 py-0.5 rounded-tl-xl rounded-br-xl shadow-sm">
          ST
        </div>
        <span className="font-semibold text-xs tracking-tight text-[#032b5b] font-serif">STMicroelectronics</span>
      </div>
    ),
  },
];

const CompanyLogoItem: React.FC<{ company: CompanyReference }> = ({ company }) => {
  const [imgError, setImgError] = useState(false);
  const imagePath = `/images/logos/${company.logoFilename}`;

  // Custom logo scale & constraint rules to keep each logo perfectly balanced and inside the box
  const getLogoClasses = (id: string) => {
    switch (id) {
      case 'atel':
        // Smaller to fit neatly inside box without overflowing
        return 'max-h-14 max-w-[170px] scale-90 group-hover:scale-95';
      case 'obss':
      case 'bcg':
      case 'cea':
      case 'euronext':
      case 'stmicroelectronics':
      case 'ankaref':
        // Extra large and clear
        return 'max-h-20 max-w-[230px] scale-125 group-hover:scale-135';
      default:
        // Default well-balanced size
        return 'max-h-16 max-w-[200px] scale-105 group-hover:scale-115';
    }
  };

  return (
    <div className="group relative flex items-center justify-center min-w-[250px] sm:min-w-[290px] h-28 px-6 py-4 mx-3 rounded-2xl bg-white/80 hover:bg-white border border-[#d8b6a9]/30 hover:border-[#c99f90]/80 shadow-sm hover:shadow-xl transition-all duration-300 backdrop-blur-sm cursor-pointer select-none overflow-hidden">
      {!imgError ? (
        <img
          src={imagePath}
          alt={`${company.name} logo`}
          className={`${getLogoClasses(
            company.id
          )} object-contain transition-all duration-300 opacity-90 group-hover:opacity-100`}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="transition-transform duration-300 group-hover:scale-105">
          {company.renderLogo()}
        </div>
      )}

      {/* Hover tooltip category */}
      <div className="absolute -bottom-2 opacity-0 group-hover:opacity-100 group-hover:bottom-2 transition-all duration-300 pointer-events-none text-[10px] font-medium tracking-wider text-[#332d2b]/80 bg-[#fdfbf9] px-2.5 py-0.5 rounded-full border border-[#d8b6a9]/50 shadow-sm z-30">
        {company.category}
      </div>
    </div>
  );
};

export const ReferencesSection: React.FC = () => {
  // Duplicate array 3 times for completely seamless infinite loop without breaks
  const tickerItems = [...companies, ...companies, ...companies];

  return (
    <section id="references" className="w-full py-16 sm:py-20 relative overflow-hidden bg-[#fbf8f5] border-t border-b border-[#d8b6a9]/25 z-10">
      {/* Decorative ambient background blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#d8b6a9]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-10 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#332d2b] tracking-wider uppercase font-heading">
            Distinguished Industry References
          </h2>
          
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#6e5d57] font-light leading-relaxed">
            Collaborating with world-class organization leaders in aerospace, defense electronics, deep tech, strategic consulting, and global financial markets.
          </p>
        </motion.div>
      </div>

      {/* Auto Sliding Marquee Ticker */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left & Right gradient fades for smooth mask */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#fbf8f5] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#fbf8f5] to-transparent z-20 pointer-events-none" />

        <div className="animate-marquee flex items-center">
          {tickerItems.map((company, index) => (
            <CompanyLogoItem key={`${company.id}-${index}`} company={company} />
          ))}
        </div>
      </div>
    </section>
  );
};
