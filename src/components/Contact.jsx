// src/components/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Github, Linkedin, Download } from 'lucide-react';
import emailjs from '@emailjs/browser';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function FloatingInput({ id, label, type = 'text', isTextarea = false, value, onChange, required = true }) {
  const base = `
    w-full bg-black/20 border border-[var(--color-glass-border)] text-white rounded-lg px-4
    focus:outline-none focus:ring-2 focus:ring-[var(--color-pure-white)] focus:border-transparent
    transition-all placeholder-transparent peer
  `;

  return (
    <div className="relative">
      {isTextarea ? (
        <textarea id={id} name={id} rows={4} placeholder={label} required={required} value={value} onChange={onChange} className={`${base} py-3 resize-none`} />
      ) : (
        <input id={id} name={id} type={type} placeholder={label} required={required} value={value} onChange={onChange} className={`${base} py-3`} />
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
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS is not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('EmailJS send failed:', err);
      setStatus('error');
    }
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
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-pure-white)] to-[var(--color-silver-gray)] mx-auto rounded-full mb-8" />
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
                Let&apos;s build something <span className="text-gradient">useful</span>.
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed font-['DM_Sans']">
                Whether you have a question, a project idea, or just want to say hi, my inbox is always open.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <a href={`mailto:${email}`} className="flex items-center gap-4 text-xl font-medium text-gray-300 hover:text-[var(--color-pure-white)] transition-colors group font-['DM_Sans']">
                <div className="p-3 glass rounded-full transition-all">
                  <Mail className="text-[var(--color-pure-white)]" />
                </div>
                {email}
              </a>
              <div className="flex gap-4 mt-4 pt-4 border-t border-[var(--color-glass-border)] w-fit">
                <a href={github} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-gray-400 hover:text-white transition-all"><Github /></a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-gray-400 hover:text-white transition-all"><Linkedin /></a>
                <a href="/pradeep_resume.pdf" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-gray-400 hover:text-[var(--color-pure-white)] transition-all"><Download /></a>
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
                <FloatingInput id="name" label="Name" value={form.name} onChange={handleChange} />
                <FloatingInput id="email" label="Email" type="email" value={form.email} onChange={handleChange} />
                <FloatingInput id="message" label="Message" isTextarea value={form.message} onChange={handleChange} />
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full relative group overflow-hidden bg-gradient-to-r from-[var(--color-pure-white)] to-[var(--color-silver-gray)] text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all font-['DM_Sans'] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sent' ? (
                    <span className="text-black font-semibold">✓ Message sent!</span>
                  ) : status === 'error' ? (
                    <span className="text-black font-semibold">Failed to send — try again</span>
                  ) : status === 'sending' ? (
                    <span className="relative z-10 flex items-center gap-2">Sending...</span>
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
