import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';
import { Code2, Server, Terminal, Database, Cpu, BrainCircuit, ScanLine, Layers, Boxes, Workflow, Binary, ShieldCheck } from 'lucide-react';

const iconMap = {
    "AI & Computer Vision": <ScanLine size={24} className="text-[#00f3ff]" />,
    "Backend Technologies": <Layers size={24} className="text-[#9d00ff]" />,
    "DevOps & Tools": <Workflow size={24} className="text-[#ff00ff]" />,
    "Databases": <Boxes size={24} className="text-[#00ff9d]" />,
    "Programming Languages": <Binary size={24} className="text-[#ffff00]" />,
    "Data & ML Libraries": <ShieldCheck size={24} className="text-[#ff3c00]" />
};

const Skills = () => {
    const { skills } = portfolioData;

    return (
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans text-gradient inline-block pb-2">Technical Arsenal</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] mx-auto rounded-full box-glow"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(skills).map(([category, items], idx) => (
                        <GlassCard key={category} delay={idx * 0.1} className="flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-lg glass bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                    {iconMap[category] || <Code2 size={24} className="text-white" />}
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-wide">{category}</h3>
                            </div>

                            <div className="flex-grow flex flex-col justify-end space-y-4">
                                {items.map((skill, i) => (
                                    <div key={i} className="w-full">
                                        <div className="flex justify-between text-sm text-gray-300 mb-1">
                                            <span>{skill}</span>
                                            <span className="text-[var(--color-neon-blue)]">{80 + Math.floor(Math.random() * 15)}%</span>
                                        </div>
                                        {/* Progress Bar Container */}
                                        <div className="w-full bg-gray-800/50 rounded-full h-1.5 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${80 + Math.floor(Math.random() * 15)}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                                                className="bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] h-full rounded-full shadow-[0_0_10px_rgba(0,243,255,0.5)]"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
