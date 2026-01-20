import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLHeadingElement>(null);

  const mainText = "We are a creative studio dedicated to building brands that stand the test of time. We blend strategy, design, and technology to shape culture.";
  const words = mainText.split(" ");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Text Reveal Animation (Scrub)
      // We animate the opacity of each word from 0.1 to 1 based on scroll position
      const wordElements = gsap.utils.toArray('.about-word');
      
      gsap.fromTo(wordElements, 
        { opacity: 0.1 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: textWrapperRef.current,
            start: "top 80%", // Start animating when top of text hits 80% viewport height
            end: "bottom 50%", // Finish when bottom of text hits 50% viewport height
            scrub: 1, // Smooth scrubbing
          }
        }
      );
      
      // 2. Sidebar Label Animation
      gsap.from(".about-tag", {
        x: -20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%"
        }
      });

      // 3. Bottom Columns Animation
      gsap.from(".about-detail", {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-details-container",
          start: "top 85%"
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-32 md:py-48 z-10 border-b border-white/10">
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Column 1: Label */}
        <div className="md:col-span-1">
          <span className="about-tag block font-mono text-xs text-white/50 uppercase tracking-widest sticky top-32">
            (About)
          </span>
        </div>

        {/* Column 2-5: Content */}
        <div className="md:col-span-4">
          {/* Main Statement with Scroll Reveal */}
          <h2 ref={textWrapperRef} className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight text-white uppercase flex flex-wrap gap-x-[0.3em] gap-y-2">
            {words.map((word, i) => (
              <span key={i} className="about-word opacity-10 inline-block">
                {word}
              </span>
            ))}
          </h2>
          
          <div className="about-details-container mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="about-detail">
              <h3 className="font-sans text-lg font-bold text-white mb-4">Philosophy</h3>
              <p className="font-sans text-white/60 text-sm leading-relaxed max-w-sm">
                 We believe in the power of subtraction. By removing the unnecessary, we reveal the essential. Our work is characterized by bold typography, immersive motion, and a relentless attention to detail.
              </p>
            </div>
            <div className="about-detail">
              <h3 className="font-sans text-lg font-bold text-white mb-4">Approach</h3>
              <p className="font-sans text-white/60 text-sm leading-relaxed max-w-sm">
                 Every project begins with a conversation. We dive deep into your goals to uncover unique opportunities. From there, we prototype rapidly, iterate constantly, and launch seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;