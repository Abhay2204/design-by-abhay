import React, { useState } from 'react';
import Layout from './components/Layout';
import Loader from './components/Loader';
import Hero from './components/Hero';
import About from './components/About';
import ProjectItem from './components/ProjectItem';
import Services from './components/Services';
import Footer from './components/Footer';
import { PROJECTS } from './constants';
import { useSmoothScroll } from './hooks/useSmoothScroll';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  // Initialize Smooth Scroll
  useSmoothScroll();

  return (
    <main className="relative w-full min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-white selection:text-black">
      
      {/* Background Grid Lines */}
      <Layout />

      {/* Initial Page Load Transition */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* Main Content */}
      <div className="relative z-10">
        <Hero />
        
        <About />

        {/* Work / Projects Section */}
        <section className="relative w-full py-20 border-t border-white/10">
           <div className="w-[90%] mx-auto mb-10 md:mb-20">
              <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
                (Selected Work)
              </span>
           </div>
          {PROJECTS.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </section>

        <Services />
        
        <Footer />
      </div>

    </main>
  );
};

export default App;