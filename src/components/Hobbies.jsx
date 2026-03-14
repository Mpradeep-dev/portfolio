import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';
import { Gamepad2, Bitcoin, Cpu, Bot, ChevronRight, ChevronLeft, Hexagon, Globe2, Shapes, ScanLine } from 'lucide-react';

const iconMap = {
    "Gamepad2": <Hexagon size={32} className="text-[#00f3ff]" />,
    "Bitcoin": <Shapes size={32} className="text-[#f7931a]" />,
    "Cpu": <Globe2 size={32} className="text-[#9d00ff]" />,
    "Bot": <ScanLine size={32} className="text-[#00ff9d]" /> // Assuming ScanLine import can be shared or imported, for now let's use what we import
};

const hobbiesData = portfolioData.hobbies;

// Dummy games for the carousel since we don't have images
const defaultGames = [
    { id: 1, title: "Cyberpunk 2077", gradient: "from-yellow-400 to-red-500" },
    { id: 2, title: "Valorant", gradient: "from-red-500 to-pink-600" },
    { id: 3, title: "Age of Empires", gradient: "from-blue-500 to-indigo-600" }
];

const Hobbies = () => {
    const [activeGame, setActiveGame] = React.useState(0);

    const nextGame = () => setActiveGame((prev) => (prev + 1) % defaultGames.length);
    const prevGame = () => setActiveGame((prev) => (prev - 1 + defaultGames.length) % defaultGames.length);

    return (
        <section id="hobbies" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans text-gradient inline-block pb-2">Off the Keyboard</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] mx-auto rounded-full box-glow"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {hobbiesData.map((hobby, idx) => {
                        const isGaming = hobby.name === "Gaming";

                        return (
                            <GlassCard
                                key={idx}
                                delay={idx * 0.15}
                                className={isGaming ? "md:col-span-2 lg:col-span-2" : "col-span-1 border-t-4 border-t-[var(--color-neon-purple)]"}
                            >
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 rounded-xl bg-gray-800/50 shadow-inner">
                                            {iconMap[hobby.icon]}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">{hobby.name}</h3>
                                    </div>
                                    <p className="text-gray-400 mb-6">{hobby.description}</p>

                                    {isGaming && (
                                        <div className="mt-auto relative rounded-xl overflow-hidden glass aspect-video group">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={activeGame}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className={`absolute inset-0 bg-gradient-to-br ${defaultGames[activeGame].gradient} opacity-80 flex items-center justify-center`}
                                                >
                                                    <span className="text-2xl font-black text-white mix-blend-overlay tracking-widest uppercase">
                                                        {defaultGames[activeGame].title}
                                                    </span>
                                                </motion.div>
                                            </AnimatePresence>

                                            {/* Controls overlay */}
                                            <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={prevGame} className="p-2 rounded-full glass hover:bg-white/20 text-white">
                                                    <ChevronLeft size={20} />
                                                </button>
                                                <button onClick={nextGame} className="p-2 rounded-full glass hover:bg-white/20 text-white">
                                                    <ChevronRight size={20} />
                                                </button>
                                            </div>

                                            {/* Indicators */}
                                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                                                {defaultGames.map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`h-1.5 rounded-full transition-all ${i === activeGame ? 'w-6 bg-white shadow-[0_0_8px_white]' : 'w-2 bg-white/40'}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </GlassCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Hobbies;
