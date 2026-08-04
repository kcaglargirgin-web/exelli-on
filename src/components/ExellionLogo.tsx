import React from 'react';

interface ExellionLogoProps {
  className?: string;
  color?: string;
  width?: number | string;
}

export const ExellionLogo: React.FC<ExellionLogoProps> = ({
  className = '',
  color = '#d8b6a9',
  width = 320,
}) => {
  return (
    <svg
      viewBox="0 0 810 140"
      width={width}
      className={`h-auto ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="EXELLI-ON Logo"
    >
      {/* First E (3 Horizontal bars) */}
      <g fill={color}>
        <rect x="25" y="32" width="55" height="9" rx="1.5" />
        <rect x="25" y="65" width="55" height="9" rx="1.5" />
        <rect x="25" y="98" width="55" height="9" rx="1.5" />
      </g>

      {/* X */}
      <path
        d="M 98 32 L 175 107 M 175 32 L 98 107"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="square"
      />

      {/* Second E (3 Horizontal bars) */}
      <g fill={color}>
        <rect x="195" y="32" width="55" height="9" rx="1.5" />
        <rect x="195" y="65" width="55" height="9" rx="1.5" />
        <rect x="195" y="98" width="55" height="9" rx="1.5" />
      </g>

      {/* L 1 */}
      <path
        d="M 275 32 L 275 107 L 335 107"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* L 2 */}
      <path
        d="M 360 32 L 360 107 L 420 107"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* I */}
      <line
        x1="455"
        y1="32"
        x2="455"
        y2="107"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="square"
      />

      {/* Hyphen (-) */}
      <line
        x1="485"
        y1="70"
        x2="525"
        y2="70"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="square"
      />

      {/* O */}
      <circle
        cx="600"
        cy="70"
        r="37.5"
        stroke={color}
        strokeWidth="7.5"
      />

      {/* N */}
      <path
        d="M 685 107 L 685 32 L 765 107 L 765 32"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
};
