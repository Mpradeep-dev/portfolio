// src/components/Hobbies.jsx
import React, { useState, useEffect, useRef } from 'react'; // useEffect still needed for auto-advance
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';
import { Cpu, Bitcoin, Bot, ChevronLeft, ChevronRight, Monitor, MemoryStick, Layers } from 'lucide-react';

// Steam CDN — public, no API key required
// URL pattern: https://cdn.akamai.steamstatic.com/steam/apps/{APP_ID}/header.jpg
const STEAM_CDN = (appId) => `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`;

const GRADIENT_FALLBACKS = [
  'from-cyan-500 to-blue-700',
  'from-yellow-400 to-red-600',
  'from-red-600 to-gray-900',
  'from-green-500 to-teal-800',
];

function GamingCarousel({ games }) {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % games.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [games.length]);

  const pause = () => clearInterval(intervalRef.current);
  const resume = () => {
    intervalRef.current = setInterval(() => setActive(prev => (prev + 1) % games.length), 4000);
  };

  const prev = () => setActive(p => (p - 1 + games.length) % games.length);
  const next = () => setActive(p => (p + 1) % games.length);

  const game = games[active];
  const coverUrl = STEAM_CDN(game.steamAppId);

  return (
    <div
      className="relative rounded-xl overflow-hidden aspect-video group mt-4"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0"
        >
          {/* Steam CDN image with gradient fallback if image fails to load */}
          <img
            src={coverUrl}
            alt={game.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div
            className={`w-full h-full bg-gradient-to-br ${GRADIENT_FALLBACKS[active % GRADIENT_FALLBACKS.length]} hidden absolute inset-0`}
          />
          {/* Frosted glass overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 glass rounded-b-xl border-t-0">
            <p className="text-white font-bold text-lg font-['Syne']">{game.title}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={prev} className="p-2 rounded-full glass hover:bg-white/20 text-white z-10">
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} className="p-2 rounded-full glass hover:bg-white/20 text-white z-10">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {games.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${i === active ? 'w-6 bg-white shadow-[0_0_8px_white]' : 'w-2 bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}

const HOBBY_ICONS = {
  Gamepad2: null, // handled separately
  Bitcoin: <Bitcoin size={32} className="text-[#f7931a]" />,
  Cpu: <Cpu size={32} className="text-[#9d00ff]" />,
  Bot: <Bot size={32} className="text-[#00ff9d]" />,
};

const Hobbies = () => {
  const hobbies = portfolioData.hobbies;
  const gamingHobby = hobbies.find(h => h.name === 'Gaming');
  const otherHobbies = hobbies.filter(h => h.name !== 'Gaming');

  return (
    <section id="hobbies" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Syne'] text-gradient inline-block pb-2">Off the Keyboard</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] mx-auto rounded-full box-glow" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gaming card — spans 2 columns */}
          {gamingHobby && (
            <GlassCard delay={0} className="md:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 rounded-xl bg-gray-800/50">
                  <Cpu size={32} className="text-[#00f3ff]" />
                </div>
                <h3 className="text-2xl font-bold text-white font-['Syne']">{gamingHobby.name}</h3>
              </div>
              <p className="text-gray-400 mb-2 font-['DM_Sans']">{gamingHobby.description}</p>
              <GamingCarousel games={gamingHobby.games} />
            </GlassCard>
          )}

          {/* Crypto card */}
          {otherHobbies.filter(h => h.name === 'Crypto trading').map((hobby, idx) => (
            <GlassCard key={idx} delay={0.15} className="border-t-4 border-t-[#f7931a]">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gray-800/50">{HOBBY_ICONS[hobby.icon]}</div>
                <h3 className="text-2xl font-bold text-white font-['Syne']">{hobby.name}</h3>
              </div>
              <p className="text-gray-400 mb-6 font-['DM_Sans']">{hobby.description}</p>
              {/* Decorative SVG candlestick bars (5 bars, spec-required) */}
              <svg viewBox="0 0 110 48" className="w-full mt-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {[
                  { x: 10, bodyY: 12, bodyH: 24, wickY1: 4,  wickY2: 42, bull: true  },
                  { x: 30, bodyY: 20, bodyH: 14, wickY1: 10, wickY2: 40, bull: false },
                  { x: 50, bodyY: 8,  bodyH: 28, wickY1: 2,  wickY2: 44, bull: true  },
                  { x: 70, bodyY: 22, bodyH: 12, wickY1: 14, wickY2: 38, bull: false },
                  { x: 90, bodyY: 10, bodyH: 22, wickY1: 4,  wickY2: 40, bull: true  },
                ].map((c, i) => (
                  <g key={i}>
                    {/* Wick */}
                    <line x1={c.x + 6} y1={c.wickY1} x2={c.x + 6} y2={c.wickY2}
                      stroke={c.bull ? '#00f3ff80' : '#ff00aa80'} strokeWidth="1" />
                    {/* Body */}
                    <rect x={c.x} y={c.bodyY} width="12" height={c.bodyH} rx="1"
                      fill={c.bull ? '#00f3ff30' : '#ff00aa30'}
                      stroke={c.bull ? '#00f3ff' : '#ff00aa'} strokeWidth="1" />
                  </g>
                ))}
              </svg>
            </GlassCard>
          ))}

          {/* Tech + AI cards */}
          {otherHobbies.filter(h => h.name !== 'Crypto trading').map((hobby, idx) => (
            <GlassCard key={idx} delay={(idx + 1) * 0.15} className="border-t-4 border-t-[var(--color-neon-purple)]">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gray-800/50">{HOBBY_ICONS[hobby.icon]}</div>
                <h3 className="text-2xl font-bold text-white font-['Syne']">{hobby.name}</h3>
              </div>
              <p className="text-gray-400 font-['DM_Sans']">{hobby.description}</p>
              {hobby.name === 'Technology exploration' && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { icon: <Cpu size={20} />, label: 'CPU / Silicon' },
                    { icon: <Monitor size={20} />, label: 'Display Tech' },
                    { icon: <MemoryStick size={20} />, label: 'RAM / Memory' },
                    { icon: <Layers size={20} />, label: 'GPU Architecture' },
                  ].map(({ icon, label }, i) => (
                    <div key={i} className="flex items-center gap-2 glass rounded-lg px-3 py-2 text-sm text-gray-300 font-['DM_Sans']">
                      <span className="text-[var(--color-neon-blue)]">{icon}</span>
                      {label}
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
