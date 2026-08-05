import React, { useState, useEffect } from 'react';
import { ExellionLogo } from './ExellionLogo';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#fdfbf9]/90 backdrop-blur-md border-b border-[#d8b6a9]/20 py-4 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => scrollTo('intro')}
          className="focus:outline-none transition-opacity hover:opacity-80 text-left cursor-pointer"
        >
          <ExellionLogo width={170} color="#332d2b" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-heading tracking-widest text-[#332d2b]/80 uppercase">
          {[
            { id: 'intro', label: 'Intro' },
            { id: 'about', label: 'Philosophical Core' },
            { id: 'solutions', label: 'Solutions' },
            { id: 'contact', label: 'Contact' },
          ].map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative py-1 transition-colors cursor-pointer ${
                  isActive ? 'text-[#332d2b] font-medium' : 'hover:text-[#332d2b]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#d8b6a9] transition-all" />
                )}
              </button>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollTo('contact')}
            className="px-6 py-2.5 rounded-full border border-[#d8b6a9] text-[#332d2b] font-heading text-[11px] tracking-widest uppercase hover:bg-[#d8b6a9] hover:text-white transition-all duration-300 cursor-pointer"
          >
            Start Dialogue
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#332d2b] focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fdfbf9] border-b border-[#d8b6a9]/30 px-6 py-6 space-y-4 text-center font-heading text-xs tracking-widest uppercase text-[#332d2b]">
          {[
            { id: 'intro', label: 'Intro' },
            { id: 'about', label: 'Philosophical Core' },
            { id: 'solutions', label: 'Solutions' },
            { id: 'contact', label: 'Contact' },
          ].map((item) => (
            <div key={item.id}>
              <button
                onClick={() => scrollTo(item.id)}
                className="w-full py-2 hover:text-[#d8b6a9] transition-colors"
              >
                {item.label}
              </button>
            </div>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="w-full mt-4 py-3 rounded-full bg-[#d8b6a9] text-white font-heading text-xs tracking-widest uppercase"
          >
            Start Dialogue
          </button>
        </div>
      )}
    </header>
  );
};
