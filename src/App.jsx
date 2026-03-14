// src/App.jsx
import React from 'react';
import AuroraBackground from './components/AuroraBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Hobbies from './components/Hobbies';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen selection:bg-[var(--color-neon-purple)] selection:text-white overflow-x-hidden">
      {/* z-0: aurora orb background */}
      <AuroraBackground />

      {/* z-1: cursor spotlight radial gradient */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background: 'radial-gradient(600px circle at var(--cx, 50%) var(--cy, 50%), rgba(0,243,255,0.06), transparent 80%)'
        }}
      />

      {/* z-10+: all UI content */}
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Hobbies />
        <Contact />
      </main>

      <footer className="relative z-10 py-8 text-center text-gray-500 border-t border-[var(--color-glass-border)] glass rounded-t-3xl mt-12 w-full backdrop-blur-xl">
        <p>© {new Date().getFullYear()} Pradeep M. All rights reserved.</p>
        <p className="text-sm mt-2 font-['DM_Sans']">Designed with <span className="text-[var(--color-neon-blue)]">Glassmorphism</span> & Neon</p>
      </footer>
    </div>
  );
}

export default App;
