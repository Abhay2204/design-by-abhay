import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { LoaderProps } from '../types';

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      // Animate columns sliding up
      tl.to(columnsRef.current, {
        height: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: "power4.inOut",
        delay: 0.2
      });
      
      // Fade out container just in case
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
      className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-center items-center"
    >
      <div className="w-full h-full grid grid-cols-5 max-w-[95%] mx-auto">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            ref={(el) => { if (el) columnsRef.current[i] = el; }}
            className="bg-foreground h-full w-full relative origin-top"
            style={{ borderLeft: '1px solid #111' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;
