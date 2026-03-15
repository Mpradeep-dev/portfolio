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
                scale: 2.5, // Start heavily zoomed in
            },
            {
                scale: 1, // Zoom out to normal scale
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
            {/* Dark overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/70 mix-blend-multiply" />
        </div>
    );
}
