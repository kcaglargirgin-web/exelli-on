import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { IntroSection } from './components/IntroSection';
import { AboutSection } from './components/AboutSection';
import { WhatWeDoSection } from './components/WhatWeDoSection';
import { SolutionsSection } from './components/SolutionsSection';
import { ContactSection } from './components/ContactSection';
import { AmbientBackground } from './components/AmbientBackground';
import { AmbientAudioPlayer } from './components/AmbientAudioPlayer';

export default function App() {
  const [activeSection, setActiveSection] = useState('intro');

  // Intersection Observer for active nav state
  useEffect(() => {
    const sectionIds = ['intro', 'about', 'what-we-do', 'solutions', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { threshold: 0.15 }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <div id="smooth-wrapper" className="min-h-screen bg-[#fdfbf9] text-[#332d2b] relative font-sans antialiased selection:bg-[#d8b6a9]/30 selection:text-[#332d2b]">
      {/* 3D Planet Background & Ambient Lighting */}
      <AmbientBackground activeSection={activeSection} />

      {/* Ambient Audio Player */}
      <AmbientAudioPlayer />

      {/* Header Navigation */}
      <Header activeSection={activeSection} />

      {/* Main Single Page Scroll Journey */}
      <main className="relative z-10">
        {/* Intro */}
        <IntroSection />

        {/* About */}
        <AboutSection />

        {/* What We Do */}
        <WhatWeDoSection />

        {/* Solutions */}
        <SolutionsSection />

        {/* Contact */}
        <ContactSection />
      </main>
    </div>
  );
}
