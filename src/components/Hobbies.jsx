import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';
import { Cpu, Bitcoin, Bot, BookOpen, Monitor, MemoryStick, Layers, Gamepad2, ChevronRight, ChevronLeft } from 'lucide-react';

const HOBBY_ICONS = {
  Gamepad2: <Gamepad2 size={32} className="text-[#ff00aa]" />,
  Bitcoin: <Bitcoin size={32} className="text-[#f7931a]" />,
  Cpu: <Cpu size={32} className="text-[#9d00ff]" />,
  Bot: <Bot size={32} className="text-[#00ff9d]" />,
  BookOpen: <BookOpen size={32} className="text-[#00f3ff]" />,
};

const BORDER_COLORS = {
  Gamepad2: 'border-t-[#ff00aa]',
  Bitcoin: 'border-t-[#f7931a]',
  Cpu: 'border-t-[#9d00ff]',
  Bot: 'border-t-[#00ff9d]',
  BookOpen: 'border-t-[#00f3ff]',
};

const Hobbies = () => {
  const hobbies = portfolioData.hobbies;
  const [activeSlide, setActiveSlide] = useState(0);

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

        <div className="relative max-w-4xl mx-auto">
          {/* Slider Controls */}
          <div className="flex justify-between items-center mb-6 px-2">
            <button
              onClick={() => setActiveSlide((prev) => (prev - 1 + hobbies.length) % hobbies.length)}
              className="p-2 rounded-full glass hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              aria-label="Previous hobby"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {hobbies.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeSlide === idx ? 'bg-[var(--color-neon-blue)] w-8 shadow-[0_0_10px_var(--color-neon-blue)]' : 'bg-white/20 hover:bg-white/40'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveSlide((prev) => (prev + 1) % hobbies.length)}
              className="p-2 rounded-full glass hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              aria-label="Next hobby"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Slider Content */}
          <div className="relative min-h-[500px] overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <GlassCard delay={0} className={`border-t-4 ${BORDER_COLORS[hobbies[activeSlide].icon]} flex flex-col h-full bg-black/40 backdrop-blur-md`}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-gray-800/50 shrink-0 shadow-lg">
                      {HOBBY_ICONS[hobbies[activeSlide].icon]}
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white font-['Syne'] leading-tight mb-2">{hobbies[activeSlide].name}</h3>
                      <p className="text-gray-300 font-['DM_Sans'] text-base md:text-lg leading-relaxed">{hobbies[activeSlide].description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
                    <div>
                      {hobbies[activeSlide].subTitle && (
                        <h4 className="text-white/90 font-semibold font-['Syne'] mb-4 text-lg border-b border-white/10 pb-2 inline-block">
                          {hobbies[activeSlide].subTitle}
                        </h4>
                      )}

                      {hobbies[activeSlide].activities && (
                        <ul className="space-y-3">
                          {hobbies[activeSlide].activities.map((act, i) => (
                            <li key={i} className="flex flex-start gap-3 text-gray-300 text-base font-['DM_Sans'] group">
                              <ChevronRight size={18} className="shrink-0 mt-1 text-[var(--color-neon-blue)] opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                              <span className="group-hover:text-white transition-colors">{act}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className="flex flex-col justify-end">
                      {/* Specific Decorations per Hobby */}
                      {hobbies[activeSlide].name === 'Cryptocurrency Trading & Market Analysis' && (
                        <div className="p-4 rounded-xl bg-gray-900/50 border border-white/5">
                          <svg viewBox="0 0 110 48" className="w-full h-32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {[
                              { x: 10, bodyY: 12, bodyH: 24, wickY1: 4, wickY2: 42, bull: true },
                              { x: 30, bodyY: 20, bodyH: 14, wickY1: 10, wickY2: 40, bull: false },
                              { x: 50, bodyY: 8, bodyH: 28, wickY1: 2, wickY2: 44, bull: true },
                              { x: 70, bodyY: 22, bodyH: 12, wickY1: 14, wickY2: 38, bull: false },
                              { x: 90, bodyY: 10, bodyH: 22, wickY1: 4, wickY2: 40, bull: true },
                            ].map((c, i) => (
                              <g key={i}>
                                <line x1={c.x + 6} y1={c.wickY1} x2={c.x + 6} y2={c.wickY2} stroke={c.bull ? '#00f3ff80' : '#ff00aa80'} strokeWidth="1.5" />
                                <rect x={c.x} y={c.bodyY} width="12" height={c.bodyH} rx="2" fill={c.bull ? '#00f3ff30' : '#ff00aa30'} stroke={c.bull ? '#00f3ff' : '#ff00aa'} strokeWidth="1.5" />
                              </g>
                            ))}
                          </svg>
                        </div>
                      )}

                      {hobbies[activeSlide].name === 'Technology Exploration & Hardware Architecture' && (
                        <div className="grid grid-cols-2 gap-4 mt-auto">
                          {[
                            { icon: <Cpu size={24} />, label: 'CPU / Silicon' },
                            { icon: <Monitor size={24} />, label: 'Display Tech' },
                            { icon: <MemoryStick size={24} />, label: 'RAM / Memory' },
                            { icon: <Layers size={24} />, label: 'GPU Architecture' },
                          ].map(({ icon, label }, i) => (
                            <div key={i} className="flex flex-col items-center justify-center gap-3 p-4 glass rounded-xl text-sm text-gray-300 font-['DM_Sans'] hover:bg-white/5 transition-colors group">
                              <span className="text-[var(--color-neon-blue)] group-hover:scale-110 transition-transform">{icon}</span>
                              <span className="text-center font-medium">{label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {hobbies[activeSlide].gamesList && (
                        <div className="flex flex-wrap gap-3 mt-auto justify-end">
                          {hobbies[activeSlide].gamesList.map((game, i) => (
                            <span
                              key={i}
                              className={`glass px-4 py-2 text-sm rounded-full border ${game.includes('Alan Wake') ? 'border-[#ff00aa]/60 text-white shadow-[0_0_12px_rgba(255,0,170,0.5)] bg-[#ff00aa]/10' : 'border-white/10 text-gray-300 hover:border-white/40 hover:text-white'} font-['DM_Sans'] transition-all cursor-default relative overflow-hidden group`}
                            >
                              <span className="relative z-10">{game}</span>
                              {game.includes('Alan Wake') && (
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                              )}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
