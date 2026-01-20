import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { LoaderProps } from '../types';

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      // Fade in text
      tl.fromTo(textRef.current, 
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.3 }
      );

      // Hold for 2 seconds
      tl.to({}, { duration: 1.1 });

      // Fade out text
      tl.to(textRef.current, {
        autoAlpha: 0,
        y: -10,
        duration: 0.4,
        ease: "power2.in"
      });

      // Animate columns sliding to bottom-right (reverse order for bottom-right effect)
      tl.to(columnsRef.current.slice().reverse(), {
        height: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.inOut"
      }, "-=0.2");
      
      // Fade out container
      tl.to(containerRef.current, {
        autoAlpha: 0,
        duration: 0.1
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-50 pointer-events-none"
    >
      {/* Text Content - Bottom Right Corner */}
      <div 
        ref={textRef}
        className="absolute bottom-12 right-12 z-10 text-black flex flex-col items-end"
      >
        <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest mb-2 opacity-70">
          Design by
        </p>
        <h1 className="font-crazy text-5xl md:text-7xl lg:text-8xl font-normal tracking-normal mb-3">
          Abhay Mallick
        </h1>
        <p className="font-sans text-xs md:text-sm tracking-wide opacity-60">
          Full Stack || UI/UX Developer
        </p>
      </div>

      {/* Curtain Columns */}
      <div className="w-full h-full grid grid-cols-5 max-w-[95%] mx-auto">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            ref={(el) => { if (el) columnsRef.current[i] = el; }}
            className="bg-foreground h-full w-full relative origin-bottom"
            style={{ borderLeft: '1px solid #111' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
