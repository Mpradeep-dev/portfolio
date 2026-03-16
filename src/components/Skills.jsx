// src/components/Skills.jsx
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';
import { ScanLine, Layers, Workflow, Boxes, Binary, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  'AI & Computer Vision': <div className="glass-icon-container"><ScanLine size={24} className="text-white" /></div>,
  'Backend Technologies': <div className="glass-icon-container"><Layers size={24} className="text-gray-300" /></div>,
  'DevOps & Tools': <div className="glass-icon-container"><Workflow size={24} className="text-gray-200" /></div>,
  'Databases': <div className="glass-icon-container"><Boxes size={24} className="text-gray-400" /></div>,
  'Programming Languages': <div className="glass-icon-container"><Binary size={24} className="text-white" /></div>,
  'Data & ML Libraries': <div className="glass-icon-container"><ShieldCheck size={24} className="text-gray-300" /></div>,
};

const Skills = () => {
  const { skills } = portfolioData;
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from('.skill-pill', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)',
      stagger: 0.03,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    gsap.from('.skills-title', {
      y: 30,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
      },
    });
  }, { scope: sectionRef });

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 w-full flex justify-center">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 skills-title">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Syne'] text-gradient inline-block pb-2">Technical Arsenal</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-pure-white)] to-[var(--color-silver-gray)] mx-auto rounded-full box-glow" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items], idx) => (
            <GlassCard key={category} delay={idx * 0.1} className="flex flex-col h-full hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                {ICON_MAP[category]}
                <h3 className="text-xl font-bold text-white tracking-wide font-['Syne']">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {items.map((skill, i) => (
                  <span
                    key={i}
                    className="skill-pill px-4 py-2 rounded-full text-sm font-medium bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] text-gray-300 hover:text-white hover:bg-[var(--color-glass-highlight)] transition-colors inline-flex"
                  >
                    {typeof skill === 'object' ? skill.name : skill}
                  </span>
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
