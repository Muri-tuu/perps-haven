import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
    const heroRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from('.hero-title-char', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.05,
            ease: 'power4.out'
        })
            .from('.hero-subtitle', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.5')
            .from('.cta-btn', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.5');

    }, { scope: heroRef });

    const title = "PERPS HAVEN";
    const tagline = "Shine with style 💍 Elegant jewelry & accessories for every mood and moment. ✨";

    return (
        <section className="hero" ref={heroRef}>
            <div className="hero-content">
                <h1 className="hero-title">
                    {title.split('').map((char, index) => (
                        <span key={index} className="hero-title-char" style={{ display: 'inline-block', minWidth: char === ' ' ? '0.5em' : 'auto' }}>
                            {char}
                        </span>
                    ))}
                </h1>
                <p className="hero-subtitle">{tagline}</p>
                <a href="#gallery" className="cta-btn">Discover Collection</a>
            </div>
            {/* Overlay controlled by CSS variable for theme support */}
            <div className="hero-overlay"></div>
        </section>
    );
};

export default Hero;
