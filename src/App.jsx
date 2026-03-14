import React from 'react';
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
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Hobbies />
        <Contact />
      </main>

      <footer className="py-8 text-center text-gray-500 border-t border-[var(--color-glass-border)] glass rounded-t-3xl mt-12 relative z-10 w-full backdrop-blur-xl">
        <p>© {new Date().getFullYear()} Pradeep M. All rights reserved.</p>
        <p className="text-sm mt-2">Designed with <span className="text-[var(--color-neon-blue)]">Glassmorphism</span> & Neon</p>
      </footer>
    </div>
  );
}

export default App;
