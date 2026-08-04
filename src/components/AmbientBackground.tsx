import React from 'react';
import { PlanetCanvas } from './PlanetCanvas';

interface AmbientBackgroundProps {
  activeSection: string;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ activeSection }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 3D Interactive WebGL Planet Model with Orbit Color Changing */}
      <PlanetCanvas activeSection={activeSection} />

      {/* Upper right soft ambient lighting */}
      <div
        className="absolute top-[10%] right-[-5%] w-[300px] h-[300px] sm:w-[550px] sm:h-[550px] rounded-full blur-[40px] sm:blur-[110px] opacity-35 mix-blend-multiply transition-colors duration-1000 ease-out"
        style={{ backgroundColor: '#eadad3' }}
      />
      {/* Lower left soft ambient lighting */}
      <div
        className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] sm:w-[650px] sm:h-[650px] rounded-full blur-[40px] sm:blur-[120px] opacity-40 mix-blend-multiply transition-colors duration-1000 ease-out"
        style={{ backgroundColor: '#e0d8d5' }}
      />
    </div>
  );
};

