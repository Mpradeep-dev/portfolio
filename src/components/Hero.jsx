// src/components/Hero.jsx
import React, { useRef } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Download, Mail, ChevronRight, Github, Linkedin } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';
import { useCursorSpot } from '../hooks/useCursorSpot';

const Hero = () => {
  const { name, title, tagline, github, linkedin } = portfolioData.personalInfo;
  const { cursorX, cursorY } = useCursorSpot();
  const heroRef = useRef(null);

  // Subtle card parallax (max 10px shift)
  const cardX = useTransform(cursorX, [-1, 1], [-10, 10]);
  const cardY = useTransform(cursorY, [-1, 1], [-10, 10]);

  useGSAP(() => {
    gsap.from('.gsap-reveal', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top 80%',
      },
    });
  }, { scope: heroRef });

  return (
    <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <motion.div style={{ x: cardX, y: cardY }}>
          <GlassCard className="p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col items-center text-center" delay={0}>

            {/* Spinning ring avatar */}
            <div className="relative w-28 h-28 sm:w-40 sm:h-40 mb-5 sm:mb-8 gsap-reveal">
              {/* Spinning ring */}
              <div
                className="absolute -inset-1 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(255,255,255,0.6), rgba(200,200,200,0.4), rgba(255,255,255,0.6))',
                  animation: 'spin-ring 6s linear infinite',
                }}
              />
              <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 bg-[#050505]">
                <img
                  src="https://github.com/Mpradeep-dev.png"
                  alt={name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3 sm:mb-4 font-['Syne'] gsap-reveal">
              Hi, I&apos;m <span className="text-gradient">{name}</span>
            </h1>

            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-300 mb-4 sm:mb-6 font-['DM_Sans'] gsap-reveal">
              {title}
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mb-7 sm:mb-10 leading-relaxed font-['DM_Sans'] gsap-reveal">
              {tagline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto gsap-reveal">
              <a
                href="#projects"
                className="flex items-center justify-center gap-2 w-full sm:w-auto glass px-8 py-3 rounded-full font-medium transition-all hover:border-white/40 hover:bg-white/10 hover:-translate-y-1"
              >
                View Projects <ChevronRight size={18} />
              </a>
              <a
                href="/pradeep_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white/10 border border-white/20 text-white px-8 py-3 rounded-full font-medium transition-all hover:bg-white/20 hover:border-white/40 hover:-translate-y-1"
              >
                <Download size={18} /> Download Resume
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 w-full sm:w-auto glass px-8 py-3 rounded-full font-medium transition-all hover:border-white/40 hover:bg-white/10 hover:-translate-y-1"
              >
                <Mail size={18} /> Contact Me
              </a>
            </div>

            <div className="flex gap-6 mt-8 sm:mt-12 gsap-reveal">
              <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-all">
                <Github size={28} />
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] transition-all">
                <Linkedin size={28} />
              </a>
            </div>

          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
