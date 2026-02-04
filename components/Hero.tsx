import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3 }); // Wait for loader (2.5s) + curtain animation (0.5s)

      // Initial Reveal of Text Lines
      const lines = gsap.utils.toArray('.hero-line');
      
      // Mobile: Simpler, faster animation
      if (isMobile) {
        tl.fromTo(lines, 
          { autoAlpha: 0 },
          { 
            autoAlpha: 1, 
            duration: 0.8, 
            stagger: 0.1, 
            ease: "power2.out" 
          }
        );
      } else {
        // Desktop: Full animation
        tl.fromTo(lines, 
          { yPercent: 100, autoAlpha: 0 },
          { 
            yPercent: 0, 
            autoAlpha: 1, 
            duration: 1.2, 
            stagger: 0.15, 
            ease: "power4.out" 
          }
        );
      }

      // Scroll Parallax for Text - Disable on mobile for performance
      if (!isMobile) {
        gsap.to(textRef.current, {
          yPercent: 50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-transparent z-10"
    >
      <div ref={textRef} className="relative z-20 flex flex-col items-center justify-center mix-blend-difference">
        {/* Masked Lines - Adjusted padding and negative margins for tight fit without clipping */}
        <div className="overflow-hidden pt-8 pb-8 px-8 -mb-10 relative z-10">
          <h1 className="hero-line font-display text-[15vw] md:text-[16vw] leading-[0.85] text-white tracking-tighter text-center">
            CRAFTING
          </h1>
        </div>
        <div className="overflow-hidden pt-8 pb-8 px-8 -mb-10 relative z-10">
          <h1 className="hero-line font-display text-[15vw] md:text-[16vw] leading-[0.85] text-white tracking-tighter text-center">
            DIGITAL
          </h1>
        </div>
        {/* Extra padding specifically for the italic text which tends to clip. 
            Large negative margins compensate for the large padding to keep text vertically close. */}
        <div className="overflow-hidden pt-8 pb-16 px-16 -mx-8 relative z-10">
          <h1 className="hero-line font-display text-[15vw] md:text-[16vw] leading-[0.85] text-white tracking-tighter text-center italic opacity-80 pr-4">
            REALITIES
          </h1>
        </div>
      </div>

      <div className="absolute bottom-12 w-full px-8 flex justify-between items-end text-white mix-blend-difference z-30">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-widest opacity-60">Located in</span>
          <span className="font-sans text-sm font-medium">Chandrapur, Maharashtra, India</span>
        </div>
        <div className="flex flex-col gap-1 text-right">
          <span className="font-mono text-xs uppercase tracking-widest opacity-60">Scroll to Explore</span>
          <div className="w-px h-12 bg-white/50 mx-auto mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;