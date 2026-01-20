import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '../types';

interface ProjectItemProps {
  project: Project;
  index: number;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for video
      if (videoRef.current && containerRef.current) {
        gsap.fromTo(videoRef.current, 
          { 
            yPercent: -20,
            scale: 1.2
          },
          {
            yPercent: 20,
            scale: 1.2,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom", // When top of container hits bottom of viewport
              end: "bottom top", // When bottom of container hits top of viewport
              scrub: true
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full py-24 md:py-32 flex flex-col justify-center items-center z-10 relative">
      <div className="w-[90%] md:w-[70%] lg:w-[60%] flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex justify-between items-end border-b border-white/20 pb-4 mb-4">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl uppercase">
            {project.title}
          </h2>
          <span className="font-mono text-sm md:text-base opacity-70 pb-2">
            (0{index + 1})
          </span>
        </div>

        {/* Video Container */}
        <div 
          ref={imageContainerRef}
          className="w-full aspect-[16/9] overflow-hidden bg-white/5 relative"
        >
          {/* 
            YouTube Iframe Parameters:
            autoplay=1: Starts automatically
            mute=1: Required for autoplay on most modern browsers
            controls=0: Hides player controls
            loop=1: Loops the video
            playlist=[ID]: Required for the loop parameter to work
            playsinline=1: Prevents fullscreen on iOS
            rel=0: Shows related videos from same channel (minimal distraction)
            showinfo=0: (Deprecated but kept for legacy support)
          */}
          <iframe 
            ref={videoRef}
            src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${project.videoId}&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1`}
            title={project.title}
            className="w-full h-full absolute top-0 left-0 pointer-events-none"
            style={{ border: 'none' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          {/* Overlay Tag */}
          <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 text-xs uppercase tracking-widest border border-white/20 z-10">
            {project.category}
          </div>
        </div>

        {/* Description / Link */}
        <div className="flex justify-between items-center mt-2">
          <p className="font-sans text-sm opacity-60 max-w-md">
            A strategic approach to brand identity and digital presence, focusing on user-centric design principles.
          </p>
          <a 
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm uppercase tracking-widest border-b border-white/50 hover:border-white transition-colors pb-1"
          >
            Visit Website
          </a>
        </div>

      </div>
    </div>
  );
};

export default ProjectItem;