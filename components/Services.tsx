import React, { useRef } from 'react';

const SERVICES = [
  { id: 1, title: 'Brand Strategy', desc: 'Positioning, Voice, Identity' },
  { id: 2, title: 'Cinematography', desc: 'Photography, Video, Motion' },
  { id: 3, title: 'Web Design', desc: 'UI/UX, Prototyping, Systems' },
  { id: 4, title: 'Development', desc: 'React, Next.js, WebGL' },
];

const Services: React.FC = () => {
  return (
    <section className="relative w-full py-32 z-10">
      <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-1">
          <span className="font-mono text-xs text-white/50 uppercase tracking-widest sticky top-32">
            (Services)
          </span>
        </div>
        
        <div className="md:col-span-4 flex flex-col">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="group flex flex-col md:flex-row justify-between items-baseline py-12 border-t border-white/10 transition-colors duration-300 hover:bg-white/5 px-4 -mx-4"
            >
              <h3 className="font-display text-5xl md:text-6xl text-white group-hover:pl-4 transition-all duration-300 ease-out">
                {service.title}
              </h3>
              <p className="font-mono text-sm text-white/40 mt-2 md:mt-0 group-hover:text-white/80 transition-colors">
                {service.desc}
              </p>
            </div>
          ))}
          <div className="w-full border-t border-white/10" />
        </div>
      </div>
    </section>
  );
};

export default Services;