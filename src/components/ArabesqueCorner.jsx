import React from 'react';

export default function ArabesqueCorner({ position = 'top-left', className = '', color = '#C8A882', size = 80 }) {
  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'scaleX(-1)';
      case 'bottom-left':
        return 'scaleY(-1)';
      case 'bottom-right':
        return 'scale(-1, -1)';
      default:
        return 'none';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-0 right-0';
      case 'bottom-left':
        return 'bottom-0 left-0';
      case 'bottom-right':
        return 'bottom-0 right-0';
      default:
        return 'top-0 left-0';
    }
  };

  return (
    <div
      className={`absolute pointer-events-none z-10 ${getPositionClasses()} ${className}`}
      style={{ transform: getTransform() }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-80"
      >
        {/* Outer decorative flourish border */}
        <path
          d="M 6 94 L 6 36 C 6 20 20 6 36 6 L 94 6"
          stroke={color}
          strokeWidth="1.2"
          strokeOpacity="0.75"
          fill="none"
        />
        {/* Inner delicate double line */}
        <path
          d="M 12 94 L 12 40 C 12 24 24 12 40 12 L 94 12"
          stroke={color}
          strokeWidth="0.8"
          strokeDasharray="3 2"
          strokeOpacity="0.5"
          fill="none"
        />
        {/* Intricate floral arabesque scroll */}
        <path
          d="M 8 8 C 22 22 18 45 32 45 C 44 45 42 22 26 18 C 16 16 16 28 24 30 C 30 32 32 24 26 22"
          stroke={color}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Floral leaf petaling */}
        <path
          d="M 28 8 C 32 18 48 18 52 28 C 42 32 36 24 28 8 Z"
          fill={color}
          fillOpacity="0.25"
          stroke={color}
          strokeWidth="0.8"
        />
        <path
          d="M 8 28 C 18 32 18 48 28 52 C 32 42 24 36 8 28 Z"
          fill={color}
          fillOpacity="0.25"
          stroke={color}
          strokeWidth="0.8"
        />
        {/* Accent dot / gemstone jewel */}
        <circle cx="16" cy="16" r="2.5" fill={color} />
        <circle cx="36" cy="12" r="1.5" fill={color} />
        <circle cx="12" cy="36" r="1.5" fill={color} />
        {/* Little decorative star sparkle */}
        <path
          d="M 60 12 Q 65 12 65 7 Q 65 12 70 12 Q 65 12 65 17 Q 65 12 60 12 Z"
          fill={color}
          opacity="0.7"
        />
        <path
          d="M 12 60 Q 12 65 7 65 Q 12 65 12 70 Q 12 65 17 65 Q 12 65 12 60 Z"
          fill={color}
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
