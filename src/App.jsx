// src/App.jsx
import React, { useEffect } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import AuroraBackground from './components/AuroraBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Hobbies from './components/Hobbies';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import ParallaxBackground from './components/ParallaxBackground';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  // Reset scroll to top on page load
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.05, smoothWheel: true }}>
      <div className="min-h-screen selection:bg-[var(--color-silver-gray)] selection:text-black overflow-x-hidden">
        <CustomCursor />
        {/* z-0: background animations */}
        <ParallaxBackground />
        <AuroraBackground />

        {/* z-1: cursor spotlight radial gradient */}
        <div
          className="pointer-events-none fixed inset-0 z-[1]"
          style={{
            background: 'radial-gradient(600px circle at var(--cx, 50%) var(--cy, 50%), rgba(255,255,255,0.06), transparent 80%)'
          }}
        />

        {/* z-10+: all UI content */}
        <Navbar />
        <main className="relative z-10 w-full">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Hobbies />
          <Contact />
        </main>

        <footer className="relative z-10 py-8 text-center text-gray-500 border-t border-[var(--color-glass-border)] glass rounded-t-3xl mt-12 w-full backdrop-blur-xl">
          <p>© {new Date().getFullYear()} Pradeep M. All rights reserved.</p>
          <p className="text-sm mt-2 font-['DM_Sans']">Designed with <span className="text-[var(--color-pure-white)]">Glassmorphism</span> & Monochrome</p>
        </footer>
      </div>
    </ReactLenis>
  );
}

export default App;
