// src/components/Skills.jsx
import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';
import { ScanLine, Layers, Workflow, Boxes, Binary, ShieldCheck } from 'lucide-react';

const ICON_MAP = {
  'AI & Computer Vision': <ScanLine size={24} className="text-[#00f3ff]" />,
  'Backend Technologies': <Layers size={24} className="text-[#9d00ff]" />,
  'DevOps & Tools': <Workflow size={24} className="text-[#ff00ff]" />,
  'Databases': <Boxes size={24} className="text-[#00ff9d]" />,
  'Programming Languages': <Binary size={24} className="text-[#ffff00]" />,
  'Data & ML Libraries': <ShieldCheck size={24} className="text-[#ff3c00]" />,
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
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Syne'] text-gradient inline-block pb-2">Technical Arsenal</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] mx-auto rounded-full box-glow" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items], idx) => (
            <GlassCard key={category} delay={idx * 0.1} className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg glass bg-white/5">
                  {ICON_MAP[category]}
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide font-['Syne']">{category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, i) => (
                  <span
                    key={i}
                    className="glass px-3 py-1 text-sm rounded-full border border-[var(--color-neon-blue)]/20 text-gray-300 hover:border-[var(--color-neon-blue)] hover:text-white hover:shadow-[0_0_8px_rgba(0,243,255,0.4)] transition-all duration-200 cursor-default font-['DM_Sans']"
                  >
                    {skill}
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
