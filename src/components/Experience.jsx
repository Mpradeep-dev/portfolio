import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

const Experience = () => {
    const { experience } = portfolioData;

    return (
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans text-gradient inline-block pb-2">Experience Timeline</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] mx-auto rounded-full box-glow"></div>
                </motion.div>

                <div className="relative border-l-2 border-[var(--color-glass-border)] ml-4 md:ml-0">
                    {/* Animated pulsing line could be added here overlaying the border */}

                    {experience.map((exp, idx) => (
                        <div key={idx} className="mb-12 relative pl-8 md:pl-12">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.2 }}
                                className="absolute -left-[11px] top-6 w-5 h-5 rounded-full bg-gradient-to-br from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] shadow-[0_0_10px_rgba(0,243,255,0.6)]"
                            ></motion.div>

                            <GlassCard delay={idx * 0.2} className="relative before:absolute before:content-[''] before:-left-8 md:before:-left-12 before:top-8 before:w-8 md:before:w-12 before:h-px before:bg-[var(--color-glass-border)]">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                    <h3 className="text-2xl font-bold text-white tracking-wide flex items-center gap-2">
                                        <Briefcase size={20} className="text-[var(--color-neon-blue)]" />
                                        {exp.role}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-[var(--color-neon-purple)] font-medium bg-[var(--color-neon-purple)]/10 px-3 py-1 rounded-full w-fit">
                                        <Calendar size={14} />
                                        {exp.duration}
                                    </div>
                                </div>

                                <h4 className="text-lg text-gray-300 font-medium mb-4">{exp.company}</h4>

                                <ul className="space-y-3 mb-6">
                                    {exp.responsibilities.map((resp, i) => (
                                        <li key={i} className="text-gray-400 text-base leading-relaxed flex items-start gap-2">
                                            <ChevronRight size={16} className="text-[var(--color-neon-blue)] mt-1 flex-shrink-0" />
                                            <span>{resp}</span>
                                        </li>
                                    ))}
                                </ul>

                                {exp.technologies && exp.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[var(--color-glass-border)]">
                                        {exp.technologies.map((tech, i) => (
                                            <span key={i} className="text-xs font-medium px-3 py-1 rounded-full border border-[var(--color-neon-blue)]/30 text-[var(--color-neon-blue)] bg-[var(--color-neon-blue)]/5">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </GlassCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
