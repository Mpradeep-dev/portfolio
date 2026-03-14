import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Github, Linkedin, Download } from 'lucide-react';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';

const Contact = () => {
    const { github, linkedin, email } = portfolioData.personalInfo;

    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 lg:pb-32">
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-sans text-gradient inline-block pb-2">Get In Touch</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] mx-auto rounded-full box-glow"></div>
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
                            <h3 className="text-4xl font-bold text-white mb-6">Let's build something <span className="text-gradient hover:neon-glow transition-all cursor-crosshair">amazing</span> together.</h3>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                                Whether you have a question, a project idea, or just want to say hi, my inbox is always open. I'll try my best to get back to you!
                            </p>
                        </div>

                        <div className="flex flex-col space-y-4">
                            <a href={`mailto:${email}`} className="flex items-center gap-4 text-xl font-medium text-gray-300 hover:text-[var(--color-neon-blue)] transition-colors group">
                                <div className="p-3 glass rounded-full group-hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all">
                                    <Mail className="text-[var(--color-neon-blue)]" />
                                </div>
                                {email}
                            </a>

                            <div className="flex gap-4 mt-4 pt-4 border-t border-[var(--color-glass-border)] w-fit">
                                <a href={github} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-gray-400 hover:text-white hover:border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all">
                                    <Github />
                                </a>
                                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-gray-400 hover:text-[#0077b5] hover:border-[#0077b5] hover:shadow-[0_0_15px_rgba(0,119,181,0.5)] transition-all">
                                    <Linkedin />
                                </a>
                                <button className="p-3 glass rounded-full text-gray-400 hover:text-[var(--color-neon-purple)] hover:border-[var(--color-neon-purple)] hover:shadow-[0_0_15px_rgba(157,0,255,0.5)] transition-all">
                                    <Download />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <GlassCard className="p-8">
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full bg-black/20 border border-[var(--color-glass-border)] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-blue)] focus:border-transparent transition-all placeholder-gray-500"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full bg-black/20 border border-[var(--color-glass-border)] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-blue)] focus:border-transparent transition-all placeholder-gray-500"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        className="w-full bg-black/20 border border-[var(--color-glass-border)] text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-blue)] focus:border-transparent transition-all placeholder-gray-500 resize-none"
                                        placeholder="Your message here..."
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full relative group overflow-hidden bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Send Message <Send size={18} />
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
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
