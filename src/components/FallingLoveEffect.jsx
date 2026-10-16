import React, { useMemo } from 'react';

/**
 * Falling Love Effect component.
 * Renders romantic falling hearts and rose petals drifting down the screen.
 */
export default function FallingLoveEffect({ isActive = true, burst = 0 }) {
  // Generate random heart particles with smooth drifting parameters
  const hearts = useMemo(() => {
    const heartSymbols = ['💖', '💕', '💗', '❤️', '💓', '🌸', '✨', '🤍', '🌹'];
    return Array.from({ length: 24 }).map((_, i) => {
      const left = Math.random() * 96; // 0% to 96%
      const animationDuration = 5 + Math.random() * 6; // 5s to 11s
      const delay = Math.random() * 8; // 0s to 8s
      const size = 14 + Math.random() * 18; // 14px to 32px
      const symbol = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      const drift = -30 + Math.random() * 60; // horizontal drift

      return {
        id: i,
        symbol,
        left: `${left}%`,
        duration: `${animationDuration}s`,
        delay: `-${delay}s`,
        size: `${size}px`,
        drift: `${drift}px`,
      };
    });
  }, [burst]); // re-randomize on burst

  if (!isActive) return null;

  return (
    <div 
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute -top-8 select-none will-change-transform opacity-0"
          style={{
            left: h.left,
            fontSize: h.size,
            animation: `fallingHeartDrift ${h.duration} linear infinite`,
            animationDelay: h.delay,
            filter: 'drop-shadow(0 2px 8px rgba(255, 105, 180, 0.4))',
            '--drift-x': h.drift,
          }}
        >
          {h.symbol}
        </span>
      ))}
    </div>
  );
}
