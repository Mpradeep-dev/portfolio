# Glassmorphism UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the portfolio's flat glass aesthetic with true interactive glassmorphism — mouse-tracked cursor spotlight, per-card 3D tilt with spring physics, floating aurora orb background, and upgraded typography/tokens.

**Architecture:** A global `useCursorSpot` hook provides `MotionValue` objects and writes CSS vars consumed by an inline `CursorSpotlight` div and `AuroraBackground` component. `GlassCard` is rewritten with `useSpring`-driven `rotateX`/`rotateY` tilt. All other components are rewritten section by section, preserving data from `portfolio_data.js`.

**Tech Stack:** React 19, Framer Motion 12 (`useMotionValue`, `useSpring`, `useTransform`), Tailwind CSS 4, Lucide React, Steam CDN (game covers — no API key needed), Google Fonts (Syne + DM Sans)

**Spec:** `docs/superpowers/specs/2026-03-14-glassmorphism-redesign.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/hooks/useCursorSpot.js` | Global cursor tracker — returns MotionValues, writes CSS vars |
| Create | `src/components/AuroraBackground.jsx` | Floating orb background with mouse parallax |
| Rewrite | `src/components/GlassCard.jsx` | 3D tilt physics, glass reflection layer |
| Rewrite | `src/components/Navbar.jsx` | Always-glass pill, IntersectionObserver active link |
| Rewrite | `src/components/Hero.jsx` | Spinning ring avatar, cursor parallax, staggered entrance |
| Rewrite | `src/components/Skills.jsx` | Glass pill tags, no fake percentages |
| Rewrite | `src/components/Experience.jsx` | Neon vertical timeline, 3D tilt cards |
| Rewrite | `src/components/Projects.jsx` | GitHub API preserved, 3D tilt, language colors |
| Rewrite | `src/components/Hobbies.jsx` | Steam CDN covers, PC tech card, crypto card |
| Rewrite | `src/components/Contact.jsx` | Floating label inputs, 3s success message |
| Modify | `src/index.css` | Tokens, fonts, keyframes, .glass update, no wallpaper |
| Modify | `src/App.jsx` | Mount AuroraBackground + CursorSpotlight div |
| Modify | `src/data/portfolio_data.js` | Games list with steamAppId, updated tech description |

---

## Chunk 1: Foundation — CSS, Hook, Background, App Shell

### Task 1: Initialize git

**Files:** none

- [ ] **Step 1: Initialize git repo**

```bash
cd /home/pradeep/porfolio
git init
git add .
git commit -m "chore: initial commit — existing portfolio before glassmorphism redesign"
```

No API key needed. Game covers are served directly from Steam's public CDN — no registration, no auth, no rate limits for header images.

---

### Task 2: Update `index.css` — fonts, tokens, keyframes, .glass utility

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Add Google Fonts import at very top of `index.css`**

The `@import` must come before `@import "tailwindcss"`:

```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');
@import "tailwindcss";
```

- [ ] **Step 2: Replace the `@theme` block with updated tokens**

```css
@theme {
  --color-neon-blue: #00f3ff;
  --color-neon-purple: #9d00ff;
  --color-neon-pink: #ff00aa;
  --color-glass-bg: rgba(255, 255, 255, 0.04);
  --color-glass-border: rgba(255, 255, 255, 0.08);
  --color-glass-highlight: rgba(255, 255, 255, 0.12);
  --color-cursor-glow: rgba(0, 243, 255, 0.06);
  --color-dark-bg: #050505;
}
```

- [ ] **Step 3: Update `body` in `@layer base` — remove wallpaper, update font**

Replace entire `body` block:
```css
@layer base {
  body {
    background-color: var(--color-dark-bg);
    color: white;
    font-family: 'DM Sans', system-ui, sans-serif;
    min-height: 100vh;
  }
}
```
(Remove `background-image`, `background-size`, `background-position`, `background-attachment`.)

- [ ] **Step 4: Replace the `.glass` utility**

```css
@layer utilities {
  .glass {
    background: var(--color-glass-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--color-glass-border);
    box-shadow:
      inset 0 1px 0 var(--color-glass-highlight),
      0 8px 40px rgba(0, 0, 0, 0.4);
  }

  .text-gradient {
    background: linear-gradient(to right, var(--color-neon-blue), var(--color-neon-purple));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .neon-glow {
    text-shadow: 0 0 10px rgba(0, 243, 255, 0.7);
  }

  .box-glow {
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.3);
  }
}
```

- [ ] **Step 5: Add `@keyframes` at top level (NOT inside any @layer)**

After all `@layer` blocks, add at the file's top level:

```css
@keyframes float-1 {
  0%, 100% { transform: translate(0, 0); }
  33%       { transform: translate(80px, -60px); }
  66%       { transform: translate(-40px, 80px); }
}

@keyframes float-2 {
  0%, 100% { transform: translate(0, 0); }
  50%       { transform: translate(-100px, 60px); }
}

@keyframes float-3 {
  0%, 100% { transform: translate(0, 0); }
  40%       { transform: translate(60px, 40px); }
  80%       { transform: translate(-30px, -50px); }
}

@keyframes spin-ring {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
```

- [ ] **Step 6: Verify — run dev server, check no CSS errors in console**

```bash
npm run dev
```
Open browser. Body background should be `#050505` (no wallpaper image). No console errors.

- [ ] **Step 7: Lint check**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add src/index.css
git commit -m "feat: update CSS tokens, fonts, keyframes, glass utility for glassmorphism redesign"
```

---

### Task 3: Create `useCursorSpot` hook

**Files:**
- Create: `src/hooks/useCursorSpot.js`

- [ ] **Step 1: Create `src/hooks/` directory and the hook file**

```js
// src/hooks/useCursorSpot.js
import { useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

export function useCursorSpot() {
  const cursorX = useMotionValue(0); // normalized –1 to 1
  const cursorY = useMotionValue(0); // normalized –1 to 1

  useEffect(() => {
    const handler = (e) => {
      // Write px values for CSS var consumption (CursorSpotlight)
      document.documentElement.style.setProperty('--cx', e.clientX + 'px');
      document.documentElement.style.setProperty('--cy', e.clientY + 'px');
      // Write normalized values for Framer Motion useTransform consumption
      cursorX.set((e.clientX / window.innerWidth) * 2 - 1);
      cursorY.set((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return { cursorX, cursorY };
}
```

- [ ] **Step 2: Lint check**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useCursorSpot.js
git commit -m "feat: add useCursorSpot hook for global cursor tracking"
```

---

### Task 4: Create `AuroraBackground` component

**Files:**
- Create: `src/components/AuroraBackground.jsx`

- [ ] **Step 1: Create the component**

```jsx
// src/components/AuroraBackground.jsx
import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { useCursorSpot } from '../hooks/useCursorSpot';

const orbs = [
  { color: '#00f3ff', size: 600, keyframe: 'float-1', duration: '18s', multiplier: 30, top: '10%', left: '15%' },
  { color: '#9d00ff', size: 500, keyframe: 'float-2', duration: '22s', multiplier: 50, top: '50%', left: '60%' },
  { color: '#ff00aa', size: 400, keyframe: 'float-3', duration: '15s', multiplier: 20, top: '70%', left: '25%' },
];

export default function AuroraBackground() {
  const { cursorX, cursorY } = useCursorSpot();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {orbs.map((orb, i) => {
        const parallaxX = useTransform(cursorX, [-1, 1], [-orb.multiplier, orb.multiplier]);
        const parallaxY = useTransform(cursorY, [-1, 1], [-orb.multiplier, orb.multiplier]);

        return (
          <motion.div
            key={i}
            style={{ x: parallaxX, y: parallaxY, position: 'absolute', top: orb.top, left: orb.left }}
          >
            <div
              style={{
                width: orb.size,
                height: orb.size,
                borderRadius: '50%',
                background: orb.color,
                filter: 'blur(120px)',
                opacity: 0.35,
                animation: `${orb.keyframe} ${orb.duration} ease-in-out infinite`,
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
```

> **Note:** `useTransform` is called inside a `.map()`. This works because the array is static (never reorders), making hook call order stable. ESLint may warn; suppress with `// eslint-disable-next-line react-hooks/rules-of-hooks` per orb if needed, or refactor into an `Orb` sub-component (preferred for lint cleanliness — see Step 2 alternative).

- [ ] **Step 2: Refactor into Orb sub-component to fix hook-in-loop lint issue**

Replace the `orbs.map` render with a clean sub-component:

```jsx
// src/components/AuroraBackground.jsx
import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { useCursorSpot } from '../hooks/useCursorSpot';

const ORB_CONFIG = [
  { color: '#00f3ff', size: 600, keyframe: 'float-1', duration: '18s', multiplier: 30, top: '10%', left: '15%' },
  { color: '#9d00ff', size: 500, keyframe: 'float-2', duration: '22s', multiplier: 50, top: '50%', left: '60%' },
  { color: '#ff00aa', size: 400, keyframe: 'float-3', duration: '15s', multiplier: 20, top: '70%', left: '25%' },
];

function Orb({ config, cursorX, cursorY }) {
  const parallaxX = useTransform(cursorX, [-1, 1], [-config.multiplier, config.multiplier]);
  const parallaxY = useTransform(cursorY, [-1, 1], [-config.multiplier, config.multiplier]);

  return (
    <motion.div
      style={{ x: parallaxX, y: parallaxY, position: 'absolute', top: config.top, left: config.left }}
    >
      <div
        style={{
          width: config.size,
          height: config.size,
          borderRadius: '50%',
          background: config.color,
          filter: 'blur(120px)',
          opacity: 0.35,
          animation: `${config.keyframe} ${config.duration} ease-in-out infinite`,
        }}
      />
    </motion.div>
  );
}

export default function AuroraBackground() {
  const { cursorX, cursorY } = useCursorSpot();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {ORB_CONFIG.map((config, i) => (
        <Orb key={i} config={config} cursorX={cursorX} cursorY={cursorY} />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Lint check**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/AuroraBackground.jsx
git commit -m "feat: add AuroraBackground with floating orbs and cursor parallax"
```

---

### Task 5: Update `App.jsx` — mount AuroraBackground + CursorSpotlight

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Rewrite `App.jsx`**

```jsx
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
```

- [ ] **Step 2: Visual verification — run dev server**

```bash
npm run dev
```

Open browser. You should see:
- Dark `#050505` background (no wallpaper)
- 3 large blurred colored orbs floating (cyan, purple, pink)
- Moving the cursor should shift the orbs slightly
- A faint cyan radial glow following the cursor
- Existing sections still visible (they haven't changed yet)

- [ ] **Step 3: Lint check**

```bash
npm run lint
```

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: mount AuroraBackground and CursorSpotlight in App"
```

---

## Chunk 2: Core Interaction — GlassCard + Navbar

### Task 6: Rewrite `GlassCard`

**Files:**
- Rewrite: `src/components/GlassCard.jsx`

- [ ] **Step 1: Rewrite GlassCard with 3D tilt physics**

```jsx
// src/components/GlassCard.jsx
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '../utils/cn';

const GlassCard = ({ children, className, delay = 0, ...props }) => {
  const ref = useRef(null);

  // Spec: useSpring(useMotionValue(0)) with direct .set() — NOT useTransform chain
  const rotateX = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });

  function onMouseMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateX.set(((e.clientY - cy) / (rect.height / 2)) * -12); // –12° to +12°
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 12);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'glass p-6 relative group',
        'hover:border-[var(--color-neon-blue)] hover:shadow-[0_0_30px_rgba(0,243,255,0.15)] transition-colors duration-300',
        className
      )}
      {...props}
    >
      {/* Glass reflection layer — shifts with cursor via CSS, uses glass-highlight token */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(105deg, var(--color-glass-highlight) 0%, transparent 60%)',
        }}
      />
      {children}
    </motion.div>
  );
};

export default GlassCard;
```

> **Key changes from old GlassCard:**
> - `whileHover` scale/y-lift removed entirely
> - `overflow-hidden` removed (would flatten `preserve-3d`)
> - Glass reflection layer uses `--color-glass-highlight` token
> - `rotateX`/`rotateY` driven by spring-physics `useSpring`

- [ ] **Step 2: Visual verification**

```bash
npm run dev
```
Hover over any existing card. Cards should tilt in 3D toward the cursor. On mouse leave, spring back smoothly.

- [ ] **Step 3: Lint check**

```bash
npm run lint
```

- [ ] **Step 4: Commit**

```bash
git add src/components/GlassCard.jsx
git commit -m "feat: rewrite GlassCard with 3D tilt physics and glass reflection"
```

---

### Task 7: Rewrite `Navbar`

**Files:**
- Rewrite: `src/components/Navbar.jsx`

- [ ] **Step 1: Rewrite Navbar**

```jsx
// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../utils/cn';

const navLinks = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Hobbies', href: '#hobbies', id: 'hobbies' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll: used only for padding, not for glass toggle
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers = [];
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0, rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(obs => obs.disconnect());
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', scrolled ? 'py-4' : 'py-6')}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center justify-between px-6 py-3 mx-auto max-w-5xl rounded-full glass"
          style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
        >
          {/* Logo */}
          <a href="#home" className="text-xl font-bold tracking-tighter font-['Syne']">
            <span className="text-white">Pradeep</span>
            <span className="text-gradient">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex flex-col items-center text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="block w-1 h-1 rounded-full bg-[var(--color-neon-blue)] mx-auto mt-1 shadow-[0_0_6px_rgba(0,243,255,0.8)]" />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-4 right-4 mt-2"
          >
            <div className="glass rounded-2xl p-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'text-center py-2 font-medium transition-colors',
                    activeSection === link.id ? 'text-[var(--color-neon-blue)]' : 'text-gray-300 hover:text-white'
                  )}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
```

- [ ] **Step 2: Visual verification**

```bash
npm run dev
```
- Navbar should be glass at the very top of page (not transparent)
- Scroll down — padding should shrink, glass stays
- Active section dot appears under current section's nav link

- [ ] **Step 3: Lint check**

```bash
npm run lint
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: rewrite Navbar — always-glass, IntersectionObserver active section"
```

---

## Chunk 3: Hero, Skills, Experience

### Task 8: Rewrite `Hero`

**Files:**
- Rewrite: `src/components/Hero.jsx`

- [ ] **Step 1: Rewrite Hero**

```jsx
// src/components/Hero.jsx
import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Download, Mail, ChevronRight, Github, Linkedin } from 'lucide-react';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';
import { useCursorSpot } from '../hooks/useCursorSpot';

const Hero = () => {
  const { name, title, summary, github, linkedin } = portfolioData.personalInfo;
  const { cursorX, cursorY } = useCursorSpot();

  // Subtle card parallax (max 10px shift)
  const cardX = useTransform(cursorX, [-1, 1], [-10, 10]);
  const cardY = useTransform(cursorY, [-1, 1], [-10, 10]);

  const stagger = (delay) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  });

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <motion.div style={{ x: cardX, y: cardY }}>
          <GlassCard className="p-8 md:p-12 lg:p-16 flex flex-col items-center text-center box-glow" delay={0}>

            {/* Spinning ring avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mb-8"
            >
              {/* Spinning conic-gradient ring */}
              <div
                style={{
                  width: 168,
                  height: 168,
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, #00f3ff, #9d00ff, #ff00aa, #00f3ff)',
                  animation: 'spin-ring 4s linear infinite',
                  position: 'absolute',
                  top: -4,
                  left: -4,
                }}
              />
              <div className="relative w-40 h-40 rounded-full glass flex items-center justify-center border-2 border-white/10 shadow-[0_0_30px_rgba(0,243,255,0.3)] bg-[#050505]">
                <span className="text-5xl font-bold text-gradient font-['Syne']">PM</span>
              </div>
            </motion.div>

            <motion.h1 {...stagger(0.2)} className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 font-['Syne']">
              Hi, I'm <span className="text-gradient">{name}</span>
            </motion.h1>

            <motion.h2 {...stagger(0.3)} className="text-xl md:text-2xl font-medium text-gray-300 mb-6 neon-glow font-['DM_Sans']">
              {title}
            </motion.h2>

            <motion.p {...stagger(0.4)} className="text-base md:text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed font-['DM_Sans']">
              {summary}
            </motion.p>

            <motion.div {...stagger(0.5)} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="flex items-center justify-center gap-2 glass px-8 py-3 rounded-full font-medium transition-all hover:border-[var(--color-neon-blue)] hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:-translate-y-1"
              >
                View Projects <ChevronRight size={18} />
              </a>
              <a
                href="/pradeep_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] text-white px-8 py-3 rounded-full font-medium transition-all hover:shadow-[0_0_25px_rgba(0,243,255,0.5)] hover:-translate-y-1"
              >
                <Download size={18} /> Download Resume
              </a>
              <a
                href="#contact"
                className="flex items-center justify-center gap-2 glass px-8 py-3 rounded-full font-medium transition-all hover:border-[var(--color-neon-purple)] hover:shadow-[0_0_15px_rgba(157,0,255,0.3)] hover:-translate-y-1"
              >
                <Mail size={18} /> Contact Me
              </a>
            </motion.div>

            <motion.div {...stagger(0.7)} className="flex gap-6 mt-12">
              <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all">
                <Github size={28} />
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077b5] hover:drop-shadow-[0_0_8px_rgba(0,119,181,0.8)] transition-all">
                <Linkedin size={28} />
              </a>
            </motion.div>

          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
```

- [ ] **Step 2: Visual verification**

- Spinning multicolor ring around avatar initials
- Moving cursor shifts the hero card slightly (parallax)
- Staggered entrance animations play on load

- [ ] **Step 3: Lint + commit**

```bash
npm run lint
git add src/components/Hero.jsx
git commit -m "feat: rewrite Hero — spinning ring, cursor parallax, staggered entrance"
```

---

### Task 9: Rewrite `Skills`

**Files:**
- Rewrite: `src/components/Skills.jsx`

- [ ] **Step 1: Rewrite Skills with glass pill tags**

```jsx
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
```

- [ ] **Step 2: Visual verification**

- Skills section shows glass pill tags (no progress bars, no percentages)
- Hover on pills: neon blue border glow
- Cards tilt in 3D on hover

- [ ] **Step 3: Lint + commit**

```bash
npm run lint
git add src/components/Skills.jsx
git commit -m "feat: rewrite Skills — glass pill tags, remove fake progress bars"
```

---

### Task 10: Rewrite `Experience`

**Files:**
- Rewrite: `src/components/Experience.jsx`

- [ ] **Step 1: Rewrite Experience with neon timeline**

```jsx
// src/components/Experience.jsx
import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Syne'] text-gradient inline-block pb-2">Experience Timeline</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] mx-auto rounded-full box-glow" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical neon line */}
          <div
            className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5"
            style={{ background: 'linear-gradient(to bottom, #00f3ff, #9d00ff)' }}
          />

          {experience.map((exp, idx) => (
            <div key={idx} className="relative pl-12 md:pl-20 mb-12">
              {/* Neon dot on timeline */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="absolute left-[10px] md:left-[26px] top-6 w-3 h-3 rounded-full bg-[var(--color-neon-blue)] shadow-[0_0_8px_rgba(0,243,255,0.8)]"
              />

              <GlassCard
                delay={idx * 0.15}
                className="border-l-2 border-l-transparent hover:border-l-[var(--color-neon-blue)] transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2 font-['Syne']">
                    <Briefcase size={20} className="text-[var(--color-neon-blue)]" />
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-neon-purple)] font-medium bg-[var(--color-neon-purple)]/10 px-3 py-1 rounded-full w-fit">
                    <Calendar size={14} />
                    {exp.duration}
                  </div>
                </div>

                <h4 className="text-lg text-gray-300 font-medium mb-4 font-['DM_Sans']">{exp.company}</h4>

                <ul className="space-y-3 mb-6">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="text-gray-400 text-base leading-relaxed flex items-start gap-2 font-['DM_Sans']">
                      <ChevronRight size={16} className="text-[var(--color-neon-blue)] mt-1 flex-shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--color-glass-border)]">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium px-3 py-1 rounded-full border border-[var(--color-neon-blue)]/30 text-[var(--color-neon-blue)] bg-[var(--color-neon-blue)]/5 font-['DM_Sans']"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
```

- [ ] **Step 2: Visual verification**

- Vertical gradient line (cyan → purple) runs down left side
- Glowing neon dots appear at each entry
- Cards have neon left border on hover
- 3D tilt on each card

- [ ] **Step 3: Lint + commit**

```bash
npm run lint
git add src/components/Experience.jsx
git commit -m "feat: rewrite Experience — neon vertical timeline, 3D tilt cards"
```

---

## Chunk 4: Projects, Hobbies, Contact, Data

### Task 11: Rewrite `Projects`

**Files:**
- Rewrite: `src/components/Projects.jsx`

- [ ] **Step 1: Rewrite Projects**

```jsx
// src/components/Projects.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Star, ExternalLink, Code2 } from 'lucide-react';
import GlassCard from './GlassCard';

const LANG_COLORS = {
  Python: '#3572A5',
  Java: '#b07219',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Dart: '#00B4AB',
  'C++': '#f34b7d',
  Go: '#00ADD8',
  Rust: '#dea584',
};

const CATEGORIES = ['All', 'AI / ML', 'Backend', 'Web development', 'Experiments'];

function categorize(repo) {
  const name = repo.name.toLowerCase();
  const desc = (repo.description || '').toLowerCase();
  if (name.includes('ai') || desc.includes('ai') || desc.includes('model') || desc.includes('vision') || name.includes('drowsiness')) return 'AI / ML';
  if (name.includes('backend') || name.includes('api') || desc.includes('fastapi') || desc.includes('spring')) return 'Backend';
  if (name.includes('web') || name.includes('portfolio') || desc.includes('react') || desc.includes('frontend')) return 'Web development';
  return 'Experiments';
}

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('https://api.github.com/users/Mpradeep-dev/repos?sort=updated')
      .then(r => r.json())
      .then(data => {
        const enhanced = data
          .filter(r => !r.fork)
          .map(r => ({ ...r, category: categorize(r) }))
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(enhanced);
      })
      .catch(err => console.error('GitHub fetch failed', err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'All' ? repos : repos.filter(r => r.category === filter);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Syne'] text-gradient inline-block pb-2">Featured Projects</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] mx-auto rounded-full box-glow mb-8" />

          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 font-['DM_Sans'] ${
                  filter === cat
                    ? 'bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] text-white shadow-[0_0_15px_rgba(0,243,255,0.4)]'
                    : 'glass text-gray-300 hover:text-white hover:border-[var(--color-neon-blue)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[var(--color-neon-blue)] shadow-[0_0_15px_rgba(0,243,255,0.4)]" />
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filtered.map((repo) => (
                <motion.div
                  key={repo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard className="h-full flex flex-col items-start">
                    <div className="flex justify-between items-start w-full mb-4">
                      <div className="p-3 rounded-lg glass bg-[var(--color-neon-blue)]/10 text-[var(--color-neon-blue)]">
                        <Code2 size={24} />
                      </div>
                      <div className="flex gap-3 items-center">
                        {repo.stargazers_count > 0 && (
                          <div className="flex items-center gap-1 text-gray-400 text-sm">
                            <Star size={16} className="text-yellow-400" />
                            <span>{repo.stargazers_count}</span>
                          </div>
                        )}
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                          <Github size={20} />
                        </a>
                        {repo.homepage && (
                          <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-neon-blue)] transition-colors">
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 font-['Syne']">{repo.name.replace(/-/g, ' ')}</h3>
                    <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3 font-['DM_Sans']">
                      {repo.description || 'No description provided.'}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto w-full">
                      {repo.language && (
                        <span
                          className="text-xs font-semibold px-3 py-1 rounded-full border font-['DM_Sans']"
                          style={{
                            borderColor: (LANG_COLORS[repo.language] || '#888') + '60',
                            color: LANG_COLORS[repo.language] || '#ccc',
                            background: (LANG_COLORS[repo.language] || '#888') + '15',
                          }}
                        >
                          {repo.language}
                        </span>
                      )}
                      <span className="text-xs font-semibold px-3 py-1 rounded-full border border-gray-600/50 text-gray-300 bg-gray-800/30 font-['DM_Sans']">
                        {repo.category}
                      </span>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
```

- [ ] **Step 2: Lint + commit**

```bash
npm run lint
git add src/components/Projects.jsx
git commit -m "feat: rewrite Projects — language colors, 3D tilt cards, GitHub API preserved"
```

---

### Task 12: Update `portfolio_data.js`

**Files:**
- Modify: `src/data/portfolio_data.js`

- [ ] **Step 1: Update Gaming hobby and Technology description**

In `portfolio_data.js`, replace the `hobbies` array:

```js
hobbies: [
  {
    name: "Gaming",
    description: "Playing strategy and action games",
    icon: "Gamepad2",
    games: [
      { title: "Days Gone", steamAppId: "1259420" },
      { title: "Cyberpunk 2077", steamAppId: "1091500" },
      { title: "Resident Evil 4", steamAppId: "2050650" },
      { title: "Resident Evil 7 Biohazard", steamAppId: "418370" },
    ]
  },
  {
    name: "Crypto trading",
    description: "Analyzing markets and trading cryptocurrencies",
    icon: "Bitcoin",
  },
  {
    name: "Technology exploration",
    description: "Deep dives into PC hardware, silicon architecture, and performance tuning",
    icon: "Cpu"
  },
  {
    name: "AI experimentation",
    description: "Prototyping new AI ideas and playing with models",
    icon: "Bot"
  }
],
```

- [ ] **Step 2: Commit**

```bash
git add src/data/portfolio_data.js
git commit -m "feat: update hobbies data — RAWG game slugs, PC tech description"
```

---

### Task 13: Rewrite `Hobbies`

**Files:**
- Rewrite: `src/components/Hobbies.jsx`

- [ ] **Step 1: Rewrite Hobbies — RAWG carousel, PC tech card, crypto card**

```jsx
// src/components/Hobbies.jsx
import React, { useState, useEffect, useRef } from 'react'; // useEffect still needed for auto-advance
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';
import { Cpu, Bitcoin, Bot, ChevronLeft, ChevronRight, Monitor, MemoryStick, Layers } from 'lucide-react';

// Steam CDN — public, no API key required
// URL pattern: https://cdn.akamai.steamstatic.com/steam/apps/{APP_ID}/header.jpg
const STEAM_CDN = (appId) => `https://cdn.akamai.steamstatic.com/steam/apps/${appId}/header.jpg`;

const GRADIENT_FALLBACKS = [
  'from-cyan-500 to-blue-700',
  'from-yellow-400 to-red-600',
  'from-red-600 to-gray-900',
  'from-green-500 to-teal-800',
];

function GamingCarousel({ games }) {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % games.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [games.length]);

  const pause = () => clearInterval(intervalRef.current);
  const resume = () => {
    intervalRef.current = setInterval(() => setActive(prev => (prev + 1) % games.length), 4000);
  };

  const prev = () => setActive(p => (p - 1 + games.length) % games.length);
  const next = () => setActive(p => (p + 1) % games.length);

  const game = games[active];
  const coverUrl = STEAM_CDN(game.steamAppId);

  return (
    <div
      className="relative rounded-xl overflow-hidden aspect-video group mt-4"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0"
        >
          {/* Steam CDN image with gradient fallback if image fails to load */}
          <img
            src={coverUrl}
            alt={game.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div
            className={`w-full h-full bg-gradient-to-br ${GRADIENT_FALLBACKS[active % GRADIENT_FALLBACKS.length]} hidden absolute inset-0`}
          />
          {/* Frosted glass overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 glass rounded-b-xl border-t-0">
            <p className="text-white font-bold text-lg font-['Syne']">{game.title}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={prev} className="p-2 rounded-full glass hover:bg-white/20 text-white z-10">
          <ChevronLeft size={20} />
        </button>
        <button onClick={next} className="p-2 rounded-full glass hover:bg-white/20 text-white z-10">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {games.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-1.5 rounded-full transition-all ${i === active ? 'w-6 bg-white shadow-[0_0_8px_white]' : 'w-2 bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}

const HOBBY_ICONS = {
  Gamepad2: null, // handled separately
  Bitcoin: <Bitcoin size={32} className="text-[#f7931a]" />,
  Cpu: <Cpu size={32} className="text-[#9d00ff]" />,
  Bot: <Bot size={32} className="text-[#00ff9d]" />,
};

const Hobbies = () => {
  const hobbies = portfolioData.hobbies;
  const gamingHobby = hobbies.find(h => h.name === 'Gaming');
  const otherHobbies = hobbies.filter(h => h.name !== 'Gaming');

  return (
    <section id="hobbies" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-['Syne'] text-gradient inline-block pb-2">Off the Keyboard</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] mx-auto rounded-full box-glow" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Gaming card — spans 2 columns */}
          {gamingHobby && (
            <GlassCard delay={0} className="md:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 rounded-xl bg-gray-800/50">
                  <Cpu size={32} className="text-[#00f3ff]" />
                </div>
                <h3 className="text-2xl font-bold text-white font-['Syne']">{gamingHobby.name}</h3>
              </div>
              <p className="text-gray-400 mb-2 font-['DM_Sans']">{gamingHobby.description}</p>
              <GamingCarousel games={gamingHobby.games} />
            </GlassCard>
          )}

          {/* Crypto card */}
          {otherHobbies.filter(h => h.name === 'Crypto trading').map((hobby, idx) => (
            <GlassCard key={idx} delay={0.15} className="border-t-4 border-t-[#f7931a]">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gray-800/50">{HOBBY_ICONS[hobby.icon]}</div>
                <h3 className="text-2xl font-bold text-white font-['Syne']">{hobby.name}</h3>
              </div>
              <p className="text-gray-400 mb-6 font-['DM_Sans']">{hobby.description}</p>
              {/* Decorative SVG candlestick bars (5 bars, spec-required) */}
              <svg viewBox="0 0 110 48" className="w-full mt-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                {[
                  { x: 10, bodyY: 12, bodyH: 24, wickY1: 4,  wickY2: 42, bull: true  },
                  { x: 30, bodyY: 20, bodyH: 14, wickY1: 10, wickY2: 40, bull: false },
                  { x: 50, bodyY: 8,  bodyH: 28, wickY1: 2,  wickY2: 44, bull: true  },
                  { x: 70, bodyY: 22, bodyH: 12, wickY1: 14, wickY2: 38, bull: false },
                  { x: 90, bodyY: 10, bodyH: 22, wickY1: 4,  wickY2: 40, bull: true  },
                ].map((c, i) => (
                  <g key={i}>
                    {/* Wick */}
                    <line x1={c.x + 6} y1={c.wickY1} x2={c.x + 6} y2={c.wickY2}
                      stroke={c.bull ? '#00f3ff80' : '#ff00aa80'} strokeWidth="1" />
                    {/* Body */}
                    <rect x={c.x} y={c.bodyY} width="12" height={c.bodyH} rx="1"
                      fill={c.bull ? '#00f3ff30' : '#ff00aa30'}
                      stroke={c.bull ? '#00f3ff' : '#ff00aa'} strokeWidth="1" />
                  </g>
                ))}
              </svg>
            </GlassCard>
          ))}

          {/* Tech + AI cards */}
          {otherHobbies.filter(h => h.name !== 'Crypto trading').map((hobby, idx) => (
            <GlassCard key={idx} delay={(idx + 1) * 0.15} className="border-t-4 border-t-[var(--color-neon-purple)]">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gray-800/50">{HOBBY_ICONS[hobby.icon]}</div>
                <h3 className="text-2xl font-bold text-white font-['Syne']">{hobby.name}</h3>
              </div>
              <p className="text-gray-400 font-['DM_Sans']">{hobby.description}</p>
              {hobby.name === 'Technology exploration' && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { icon: <Cpu size={20} />, label: 'CPU / Silicon' },
                    { icon: <Monitor size={20} />, label: 'Display Tech' },
                    { icon: <MemoryStick size={20} />, label: 'RAM / Memory' },
                    { icon: <Layers size={20} />, label: 'GPU Architecture' },
                  ].map(({ icon, label }, i) => (
                    <div key={i} className="flex items-center gap-2 glass rounded-lg px-3 py-2 text-sm text-gray-300 font-['DM_Sans']">
                      <span className="text-[var(--color-neon-blue)]">{icon}</span>
                      {label}
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hobbies;
```

- [ ] **Step 2: Visual verification**

- Gaming carousel shows Steam CDN cover images (gradient fallback if image fails to load)
- Auto-advances every 4s
- Frosted glass overlay on bottom of carousel with game title
- Crypto card has decorative candlestick bars
- PC Tech card has mini spec-sheet grid
- All cards 3D tilt on hover

- [ ] **Step 3: Lint + commit**

```bash
npm run lint
git add src/components/Hobbies.jsx
git commit -m "feat: rewrite Hobbies — RAWG carousel, PC tech card, crypto candlestick"
```

---

### Task 14: Rewrite `Contact`

**Files:**
- Rewrite: `src/components/Contact.jsx`

- [ ] **Step 1: Rewrite Contact with floating labels and success message**

```jsx
// src/components/Contact.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Github, Linkedin, Download } from 'lucide-react';
import GlassCard from './GlassCard';
import { portfolioData } from '../data/portfolio_data';

function FloatingInput({ id, label, type = 'text', isTextarea = false }) {
  const base = `
    w-full bg-black/20 border border-[var(--color-glass-border)] text-white rounded-lg px-4
    focus:outline-none focus:ring-2 focus:ring-[var(--color-neon-blue)] focus:border-transparent
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
          peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[var(--color-neon-blue)] peer-focus:bg-[#050505] peer-focus:px-1
          peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[var(--color-neon-blue)] peer-[&:not(:placeholder-shown)]:bg-[#050505] peer-[&:not(:placeholder-shown)]:px-1
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
          <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] mx-auto rounded-full box-glow" />
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
                Let's build something <span className="text-gradient">amazing</span> together.
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed font-['DM_Sans']">
                Whether you have a question, a project idea, or just want to say hi, my inbox is always open.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <a href={`mailto:${email}`} className="flex items-center gap-4 text-xl font-medium text-gray-300 hover:text-[var(--color-neon-blue)] transition-colors group font-['DM_Sans']">
                <div className="p-3 glass rounded-full group-hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all">
                  <Mail className="text-[var(--color-neon-blue)]" />
                </div>
                {email}
              </a>
              <div className="flex gap-4 mt-4 pt-4 border-t border-[var(--color-glass-border)] w-fit">
                <a href={github} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-gray-400 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all"><Github /></a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-gray-400 hover:text-[#0077b5] hover:shadow-[0_0_15px_rgba(0,119,181,0.4)] transition-all"><Linkedin /></a>
                <a href="/pradeep_resume.pdf" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-gray-400 hover:text-[var(--color-neon-purple)] hover:shadow-[0_0_15px_rgba(157,0,255,0.4)] transition-all"><Download /></a>
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
                  className="w-full relative group overflow-hidden bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(0,243,255,0.5)] transition-all font-['DM_Sans']"
                >
                  {sent ? (
                    <span className="text-white font-semibold">✓ Message sent!</span>
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
```

- [ ] **Step 2: Visual verification**

- Form labels float up on focus
- Submit shows "✓ Message sent!" for 3 seconds, then resets
- Contact card tilts in 3D on hover

- [ ] **Step 3: Full final verification**

```bash
npm run dev
npm run lint
npm run build
```

Check full page top to bottom:
- Aurora orbs animate and shift with cursor
- Cursor spotlight follows mouse
- Navbar always glass, active dot tracks current section
- Hero: spinning ring, card parallax
- Skills: glass pill tags
- Experience: neon timeline
- Projects: GitHub cards with language colors, 3D tilt
- Hobbies: game carousel, crypto bars, PC tech grid
- Contact: floating labels, success message

- [ ] **Step 4: Final commit**

```bash
git add src/components/Contact.jsx
git commit -m "feat: rewrite Contact — floating label inputs, 3s success state"
git tag v1.0.0-glassmorphism
```

---

## Summary

| Task | Component | Status |
|------|-----------|--------|
| 1 | Git init + .env | ☐ |
| 2 | index.css — tokens, fonts, keyframes | ☐ |
| 3 | useCursorSpot hook | ☐ |
| 4 | AuroraBackground | ☐ |
| 5 | App.jsx — shell + spotlight | ☐ |
| 6 | GlassCard rewrite | ☐ |
| 7 | Navbar rewrite | ☐ |
| 8 | Hero rewrite | ☐ |
| 9 | Skills rewrite | ☐ |
| 10 | Experience rewrite | ☐ |
| 11 | Projects rewrite | ☐ |
| 12 | portfolio_data.js | ☐ |
| 13 | Hobbies rewrite | ☐ |
| 14 | Contact rewrite | ☐ |
