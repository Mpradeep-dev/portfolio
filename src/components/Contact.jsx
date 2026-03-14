// src/components/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Github, Linkedin, Download } from 'lucide-react';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';

function FloatingInput({ id, label, type = 'text', isTextarea = false }) {
  const base = `
    w-full bg-black/20 border border-[var(--color-glass-border)] text-white rounded-lg px-4
    focus:outline-none focus:ring-2 focus:ring-[var(--color-pure-white)] focus:border-transparent
    transition-all placeholder-transparent peer
  `;

  return (
    <div className="relative">
      {isTextarea ? (
        <textarea id={id} rows={4} placeholder={label} className={`${base} py-3 resize-none`} />
      ) : (
        <input id={id} type={type} placeholder={label} className={`${base} py-3`} />
      )}
      <label
        htmlFor={id}
        className="
          absolute left-4 top-3 text-gray-400 text-sm transition-all duration-200
          peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500
          peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[var(--color-pure-white)] peer-focus:bg-[#050505] peer-focus:px-1
          peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[var(--color-pure-white)] peer-[&:not(:placeholder-shown)]:bg-[#050505] peer-[&:not(:placeholder-shown)]:px-1
        "
      >
        {label}
      </label>
    </div>
  );
}

const Contact = () => {
  const { github, linkedin, email } = portfolioData.personalInfo;
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 lg:pb-32">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Syne'] text-gradient inline-block pb-2">Get In Touch</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-pure-white)] to-[var(--color-silver-gray)] mx-auto rounded-full box-glow" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <h3 className="text-4xl font-bold text-white mb-6 font-['Syne']">
                Let&apos;s build something <span className="text-gradient">amazing</span> together.
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed font-['DM_Sans']">
                Whether you have a question, a project idea, or just want to say hi, my inbox is always open.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <a href={`mailto:${email}`} className="flex items-center gap-4 text-xl font-medium text-gray-300 hover:text-[var(--color-pure-white)] transition-colors group font-['DM_Sans']">
                <div className="p-3 glass rounded-full group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all">
                  <Mail className="text-[var(--color-pure-white)]" />
                </div>
                {email}
              </a>
              <div className="flex gap-4 mt-4 pt-4 border-t border-[var(--color-glass-border)] w-fit">
                <a href={github} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-gray-400 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all"><Github /></a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-gray-400 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all"><Linkedin /></a>
                <a href="/pradeep_resume.pdf" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-gray-400 hover:text-[var(--color-pure-white)] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all"><Download /></a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <FloatingInput id="name" label="Name" />
                <FloatingInput id="email" label="Email" type="email" />
                <FloatingInput id="message" label="Message" isTextarea />
                <button
                  type="submit"
                  className="w-full relative group overflow-hidden bg-gradient-to-r from-[var(--color-pure-white)] to-[var(--color-silver-gray)] text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all font-['DM_Sans']"
                >
                  {sent ? (
                    <span className="text-black font-semibold">✓ Message sent!</span>
                  ) : (
                    <span className="relative z-10 flex items-center gap-2">
                      Send Message <Send size={18} />
                    </span>
                  )}
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </button>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
