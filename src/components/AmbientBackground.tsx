import React from 'react';
import { IsolineCanvas } from './IsolineCanvas';

interface AmbientBackgroundProps {
  activeSection: string;
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ activeSection }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Topology Isoline Curl-Noise Field Background */}
      <IsolineCanvas activeSection={activeSection} />

      {/* Upper right soft ambient lighting gradient */}
      <div
        className="absolute top-[5%] right-[-5%] w-[320px] h-[320px] sm:w-[600px] sm:h-[600px] rounded-full opacity-40 transition-colors duration-1000 ease-out pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(234, 218, 211, 0.6) 0%, rgba(234, 218, 211, 0) 70%)',
        }}
      />
      {/* Lower left soft ambient lighting gradient */}
      <div
        className="absolute bottom-[5%] left-[-5%] w-[320px] h-[320px] sm:w-[700px] sm:h-[700px] rounded-full opacity-45 transition-colors duration-1000 ease-out pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(224, 216, 213, 0.6) 0%, rgba(224, 216, 213, 0) 70%)',
        }}
      />
    </div>
  );
};

