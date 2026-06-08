// src/components/Achievements.jsx
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy } from 'lucide-react';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const { achievements } = portfolioData;
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from('.achv-title', {
      y: 30,
      opacity: 0,
      duration: 1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
    });
  }, { scope: sectionRef });

  return (
    <section id="achievements" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 w-full flex justify-center">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 achv-title">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Syne'] text-gradient inline-block pb-2">Achievements</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-pure-white)] to-[var(--color-silver-gray)] mx-auto rounded-full box-glow" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {achievements.map((achv, idx) => (
            <GlassCard key={achv.title} delay={idx * 0.05} className="flex items-center gap-4 hover:scale-[1.02] transition-all duration-300">
              <div className="glass-icon-container shrink-0">
                <Trophy size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-['Syne'] leading-snug">{achv.title}</h3>
                <p className="text-sm text-gray-400 font-['DM_Sans'] mt-1">{achv.detail} · {achv.year}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
