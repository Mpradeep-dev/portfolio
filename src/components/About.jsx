import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import GlassCard from './GlassCard';

export default function About() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        gsap.from('.about-card', {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        });
    }, { scope: sectionRef });

    return (
        <section id="about" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 w-full flex justify-center">
            <div className="container mx-auto max-w-5xl">
                <GlassCard className="about-card p-8 md:p-12 lg:p-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 font-['Syne'] text-gradient text-center">About Me</h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-[var(--color-pure-white)] to-[var(--color-silver-gray)] mx-auto rounded-full box-glow mb-10" />

                    <div className="text-gray-300 font-['DM_Sans'] text-lg leading-relaxed space-y-6 max-w-3xl mx-auto text-center md:text-left">
                        <p>
                            Hi there! I'm a passionate developer who loves solving complex problems and turning ideas into reality. Over the past few years, I've spent my time diving deep into building scalable systems and exploring the fascinating worlds of backend architecture and artificial intelligence.
                        </p>
                        <p>
                            For me, coding is more than just writing instructions for a machine; it's about crafting experiences and building tools that make a real difference. When I'm not deep in code, you'll probably find me exploring new tech trends, contributing to open source, or looking for the next challenging project to tackle. I believe in clean code, continuous learning, and having a bit of fun along the way.
                        </p>
                    </div>
                </GlassCard>
            </div>
        </section>
    );
}
