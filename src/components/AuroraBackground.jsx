// src/components/AuroraBackground.jsx
import React from 'react';
import { motion as Motion, useTransform } from 'framer-motion';
import { useCursorSpot } from '../hooks/useCursorSpot';

const ORB_CONFIG = [
  { color: '#374151', size: 650, keyframe: 'float-1', duration: '18s', multiplier: 30, top: '10%', left: '15%' },
  { color: '#1f2937', size: 520, keyframe: 'float-2', duration: '22s', multiplier: 50, top: '50%', left: '60%' },
  { color: '#4b5563', size: 420, keyframe: 'float-3', duration: '15s', multiplier: 20, top: '70%', left: '25%' },
];

function Orb({ config, cursorX, cursorY }) {
  const parallaxX = useTransform(cursorX, [-1, 1], [-config.multiplier, config.multiplier]);
  const parallaxY = useTransform(cursorY, [-1, 1], [-config.multiplier, config.multiplier]);

  return (
    <Motion.div
      style={{ x: parallaxX, y: parallaxY, position: 'absolute', top: config.top, left: config.left }}
    >
      <div
        style={{
          width: config.size,
          height: config.size,
          borderRadius: '50%',
          background: config.color,
          filter: 'blur(120px)',
          opacity: 0.28,
          animation: `${config.keyframe} ${config.duration} ease-in-out infinite`,
        }}
      />
    </Motion.div>
  );
}

export default function AuroraBackground() {
  const { cursorX, cursorY } = useCursorSpot();

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {ORB_CONFIG.map((config, i) => (
        <Orb key={i} config={config} cursorX={cursorX} cursorY={cursorY} />
      ))}
    </div>
  );
}
