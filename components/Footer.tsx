import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const Footer: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite Marquee Animation
      gsap.to(sliderRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });
    }, sliderRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="w-full min-h-screen flex flex-col justify-between bg-black z-20 relative border-t border-white/10 pt-24 pb-8">
      
      {/* Upper Content: Grid Layout */}
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8 flex-grow">
        
        {/* Column 1: Socials */}
        <div className="flex flex-col gap-6">
           <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
            (Socials)
          </span>
          <div className="flex flex-col gap-2">
            <a href="#" className="font-sans text-sm text-white/70 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="font-sans text-sm text-white/70 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="font-sans text-sm text-white/70 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="font-sans text-sm text-white/70 hover:text-white transition-colors">Awwwards</a>
          </div>
        </div>

        {/* Column 2: Portfolio / Menu */}
        <div className="flex flex-col gap-6">
           <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
            (Menu)
          </span>
          <div className="flex flex-col gap-2">
            <a href="#" className="font-sans text-sm text-white/70 hover:text-white transition-colors">Work</a>
            <a href="#" className="font-sans text-sm text-white/70 hover:text-white transition-colors">Services</a>
            <a href="#" className="font-sans text-sm text-white/70 hover:text-white transition-colors">About</a>
            <a href="#" className="font-sans text-sm text-white/70 hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        {/* Column 3-5: CTA */}
        <div className="md:col-span-3 flex flex-col justify-start pt-8 md:pt-0">
          <p className="font-display text-4xl md:text-5xl lg:text-6xl uppercase text-white leading-[0.9] mb-8 max-w-2xl">
            Have a project in mind? Let's build something extraordinary.
          </p>
          <div>
            <a href="mailto:hello@designbydylan.com" className="inline-block border border-white/20 rounded-full px-8 py-4 text-white hover:bg-white hover:text-black transition-colors duration-300 font-mono text-sm uppercase tracking-widest">
              Get in touch
            </a>
          </div>
        </div>
      </div>

      {/* Giant Text Marquee */}
      {/* Added significant vertical padding to prevent clipping of the large font */}
      <div className="w-full overflow-hidden py-20 mt-12 md:mt-0">
        <div ref={sliderRef} className="flex whitespace-nowrap w-fit">
          <h2 className="font-display text-[18vw] leading-[0.8] text-white/10 pr-12">
            DESIGN BY ABHAY ||
          </h2>
          <h2 className="font-display text-[18vw] leading-[0.8] text-white/10 pr-12">
            DESIGN BY ABHAY ||
          </h2>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-[90%] mx-auto flex justify-between items-end border-t border-white/10 pt-6">
        <div className="flex flex-col md:flex-row gap-4 font-mono text-xs text-white/40 uppercase">
          <span>Local time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div className="font-mono text-xs text-white/40 uppercase">
          &copy; 2026 Design by Abhay
        </div>
      </div>
    </footer>
  );
};

export default Footer;