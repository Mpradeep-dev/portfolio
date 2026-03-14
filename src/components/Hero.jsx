import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, ChevronRight, Github, Linkedin } from 'lucide-react';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';

const Hero = () => {
    const { name, title, summary, github, linkedin } = portfolioData.personalInfo;

    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-5xl">
                <GlassCard className="p-8 md:p-12 lg:p-16 flex flex-col items-center text-center relative z-10 box-glow">
                    {/* Animated floating spheres behind card could go here, but background handles overall gradient */}

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-32 h-32 md:w-40 md:h-40 rounded-full glass flex items-center justify-center mb-8 border-2 border-white/20 shadow-[0_0_30px_rgba(0,243,255,0.3)]"
                    >
                        {/* Using a placeholder for avatar as no image provided, using initials or an icon */}
                        <span className="text-5xl font-bold text-gradient">PM</span>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4"
                    >
                        Hi, I'm <span className="text-gradient">{name}</span>
                    </motion.h1>

                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-xl md:text-2xl font-medium text-gray-300 mb-6 neon-glow"
                    >
                        {title}
                    </motion.h2>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-base md:text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed"
                    >
                        {summary}
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                    >
                        <a href="#projects" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3 rounded-full font-medium transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:-translate-y-1">
                            View Projects <ChevronRight size={18} />
                        </a>

                        <a
                            href="/pradeep_resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] text-white px-8 py-3 rounded-full font-medium transition-all hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] hover:-translate-y-1"
                        >
                            <Download size={18} /> Download Resume
                        </a>

                        <a href="#contact" className="flex items-center justify-center gap-2 glass px-8 py-3 rounded-full font-medium transition-all hover:border-[var(--color-neon-purple)] hover:shadow-[0_0_15px_rgba(157,0,255,0.3)] hover:-translate-y-1">
                            <Mail size={18} /> Contact Me
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="flex gap-6 mt-12"
                    >
                        <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                            <Github size={28} />
                        </a>
                        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(0,119,181,0.8)] transition-all">
                            <Linkedin size={28} />
                        </a>
                    </motion.div>
                </GlassCard>
            </div>
        </section>
    );
};

export default Hero;
