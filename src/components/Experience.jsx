// src/components/Experience.jsx
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const { experience } = portfolioData;
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Title animation
    gsap.from('.exp-title', {
      y: 30,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    // Timeline line animation
    gsap.from('.timeline-line', {
      scaleY: 0,
      transformOrigin: 'top',
      ease: 'none',
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top 70%',
        end: 'bottom 50%',
        scrub: 1,
      },
    });

    // Experience Cards Scrub Animation
    gsap.utils.toArray('.exp-item').forEach((item) => {
      const card = item.querySelector('.experience-card');
      const dot = item.querySelector('.timeline-dot');

      // Dot pop-in
      gsap.from(dot, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
        },
      });

      // Card scale/rotate depth effect
      gsap.fromTo(card,
        {
          y: 50,
          opacity: 0,
          scale: 0.9,
          rotateX: 10,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section id="experience" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 w-full flex justify-center" style={{ perspective: '1000px' }}>
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 exp-title">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Syne'] text-gradient inline-block pb-2">Experience Timeline</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-pure-white)] to-[var(--color-silver-gray)] mx-auto rounded-full box-glow" />
        </div>

        {/* Timeline */}
        <div className="relative timeline-container">
          {/* Vertical neon line */}
          <div
            className="timeline-line absolute left-4 md:left-8 top-0 bottom-0 w-0.5"
            style={{ background: 'linear-gradient(to bottom, #ffffff, #c0c0c0)' }}
          />

          {experience.map((exp, idx) => (
            <div key={idx} className="exp-item relative pl-12 md:pl-20 mb-12">
              {/* Neon dot on timeline */}
              <div
                className="timeline-dot absolute left-[10px] md:left-[26px] top-6 w-3 h-3 rounded-full bg-[var(--color-pure-white)] shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              />

              <div className="experience-card will-change-transform">
                <GlassCard
                  delay={0}
                  className="border-l-2 border-l-transparent hover:border-l-[var(--color-pure-white)] transition-colors duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2 font-['Syne']">
                      <Briefcase size={20} className="text-[var(--color-pure-white)]" />
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-[var(--color-pure-white)] font-medium bg-[var(--color-pure-white)]/10 px-3 py-1 rounded-full w-fit">
                      <Calendar size={14} />
                      {exp.duration}
                    </div>
                  </div>

                  <h4 className="text-lg text-gray-300 font-medium mb-4 font-['DM_Sans']">{exp.company}</h4>

                  <ul className="space-y-3 mb-6">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="text-gray-400 text-base leading-relaxed flex items-start gap-2 font-['DM_Sans']">
                        <ChevronRight size={16} className="text-[var(--color-pure-white)] mt-1 flex-shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--color-glass-border)]">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium px-3 py-1 rounded-full border border-[var(--color-pure-white)]/30 text-[var(--color-pure-white)] bg-[var(--color-pure-white)]/5 font-['DM_Sans']"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </GlassCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
