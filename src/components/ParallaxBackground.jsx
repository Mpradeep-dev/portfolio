import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bgImage from '../assets/bg.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxBackground() {
    const bgRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(bgRef.current,
            {
                scale: 1.15, // Subtle zoom-in, kept close to native resolution to avoid upscaling artifacts
            },
            {
                scale: 1, // Settle to normal scale
                ease: 'none',
                scrollTrigger: {
                    trigger: document.body,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true, // Smooth scrub
                },
            });
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden w-full h-[100vh]">
            <div
                ref={bgRef}
                className="absolute inset-0 w-full h-full will-change-transform"
                style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />
            {/* Fine grain to mask JPEG gradient banding on the low-contrast background */}
            <div
                className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
            />
            {/* Dark overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/70 mix-blend-multiply" />
        </div>
    );
}
