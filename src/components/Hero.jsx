// src/components/Hero.jsx
import React, { useRef, Suspense, lazy } from 'react';
import { ArrowRight, Github } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ProfileCard from './ProfileCard';
import { portfolioData } from '../data/portfolio_data';
import avatarImg from '../assets/pradeep.jpeg';

// Code-split: the WebGPU shard renderer (with its inline WGSL shaders) is
// only needed above the fold in the hero, so it should not block or bloat
// the app's main bundle.
const AeroShards = lazy(() => import('./AeroShards'));

const Hero = () => {
  const { github } = portfolioData.personalInfo;
  const heroRef = useRef(null);

  useGSAP(() => {
    gsap.from('.gsap-reveal', {
      y: 30,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      delay: 0.15,
      ease: 'power3.out',
    });
  }, { scope: heroRef });

  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[100dvh] w-full overflow-hidden flex items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8"
    >
      {/* AeroShards: hero-only WebGPU background, lazy-loaded */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: '#0a0810' }}>
        <Suspense fallback={null}>
          <AeroShards
            backgroundColor="#0a0810"
            shardColor="#896ABD"
            accentColor="#A855F7"
            placement="full"
            flow="stream"
            material="pearl"
            detail="balanced"
            interaction="repel"
            density={0.8}
            shardSize={0.95}
            glow={0.7}
            bloom={0.22}
            grain={0.025}
            chromaticAberration={0.0015}
            edgeSoftness={1.4}
          />
        </Suspense>
      </div>
      {/* Readability scrim: keeps text legible without dimming the whole effect */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/15 via-transparent to-[#050505] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          {/* Left: identity + CTAs */}
          <div className="text-center lg:text-left">
            <span className="gsap-reveal inline-block text-xs sm:text-sm font-semibold tracking-[0.2em] text-gray-400 mb-5 font-['DM_Sans']">
              AI / COMPUTER VISION ENGINEER
            </span>

            <h1 className="gsap-reveal text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6 font-['Syne'] text-white">
              Real-time vision systems, shipped to production.
            </h1>

            <p className="gsap-reveal text-base sm:text-lg text-gray-400 leading-relaxed mb-9 max-w-xl mx-auto lg:mx-0 font-['DM_Sans']">
              I build GPU-accelerated computer vision pipelines and the FastAPI
              backends that serve them, from YOLO inference to RAG systems.
            </p>

            <div className="gsap-reveal flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-black px-8 py-3 rounded-full font-semibold transition-all hover:bg-gray-200 hover:-translate-y-0.5"
              >
                View Projects <ArrowRight size={18} />
              </a>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full sm:w-auto glass px-8 py-3 rounded-full font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5"
              >
                <Github size={18} /> GitHub
              </a>
            </div>
          </div>

          {/* Right: identity card */}
          <div className="gsap-reveal flex justify-center lg:justify-end profile-card-scope">
            <div className="w-full max-w-[300px] sm:max-w-[340px]">
              <ProfileCard
                avatarUrl={avatarImg}
                name="Pradeep"
                title="AI / CV Engineer"
                handle="Mpradeep-dev"
                status="Open to work"
                contactText="Contact"
                showUserInfo
                enableTilt
                enableMobileTilt={false}
                onContactClick={scrollToContact}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
