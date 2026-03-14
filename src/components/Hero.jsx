// src/components/Hero.jsx
import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Download, Mail, ChevronRight, Github, Linkedin } from 'lucide-react';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';
import { useCursorSpot } from '../hooks/useCursorSpot';

const Hero = () => {
  const { name, title, summary, github, linkedin } = portfolioData.personalInfo;
  const { cursorX, cursorY } = useCursorSpot();

  // Subtle card parallax (max 10px shift)
  const cardX = useTransform(cursorX, [-1, 1], [-10, 10]);
  const cardY = useTransform(cursorY, [-1, 1], [-10, 10]);

  const stagger = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  });

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <motion.div style={{ x: cardX, y: cardY }}>
          <GlassCard className="p-8 md:p-12 lg:p-16 flex flex-col items-center text-center box-glow" delay={0}>

            {/* Spinning ring avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mb-8"
            >
              {/* Spinning conic-gradient ring */}
              <div
                style={{
                  width: 168,
                  height: 168,
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, #00f3ff, #9d00ff, #ff00aa, #00f3ff)',
                  animation: 'spin-ring 4s linear infinite',
                  position: 'absolute',
                  top: -4,
                  left: -4,
                }}
              />
              <div className="relative w-40 h-40 rounded-full glass flex items-center justify-center border-2 border-white/10 shadow-[0_0_30px_rgba(0,243,255,0.3)] bg-[#050505]">
                <span className="text-5xl font-bold text-gradient font-['Syne']">PM</span>
              </div>
            </motion.div>

            <motion.h1 {...stagger(0.2)} className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 font-['Syne']">
              Hi, I&apos;m <span className="text-gradient">{name}</span>
            </motion.h1>

            <motion.h2 {...stagger(0.3)} className="text-xl md:text-2xl font-medium text-gray-300 mb-6 neon-glow font-['DM_Sans']">
              {title}
            </motion.h2>

            <motion.p {...stagger(0.4)} className="text-base md:text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed font-['DM_Sans']">
              {summary}
            </motion.p>

            <motion.div {...stagger(0.5)} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="flex items-center justify-center gap-2 glass px-8 py-3 rounded-full font-medium transition-all hover:border-[var(--color-neon-blue)] hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:-translate-y-1"
              >
                View Projects <ChevronRight size={18} />
              </a>
              <a
                href="/pradeep_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] text-white px-8 py-3 rounded-full font-medium transition-all hover:shadow-[0_0_25px_rgba(0,243,255,0.5)] hover:-translate-y-1"
              >
                <Download size={18} /> Download Resume
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 glass px-8 py-3 rounded-full font-medium transition-all hover:border-[var(--color-neon-purple)] hover:shadow-[0_0_15px_rgba(157,0,255,0.3)] hover:-translate-y-1"
              >
                <Mail size={18} /> Contact Me
              </a>
            </motion.div>

            <motion.div {...stagger(0.7)} className="flex gap-6 mt-12">
              <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                <Github size={28} />
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] hover:drop-shadow-[0_0_8px_rgba(0,119,181,0.8)] transition-all">
                <Linkedin size={28} />
              </a>
            </motion.div>

          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
