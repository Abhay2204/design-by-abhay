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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Initialize Smooth Scroll
  useSmoothScroll();

  // Get unique categories
  const categories = ['All', 'UI/UX', 'E-Commerce', 'Portfolio'];
  
  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(project => {
        if (selectedCategory === 'UI/UX') return project.category === 'UI/UX' || project.category === 'WEB DESIGN';
        if (selectedCategory === 'E-Commerce') return project.category === 'E-COMMERCE';
        if (selectedCategory === 'Portfolio') return project.category === 'LUXURY' || project.category === 'FASHION' || project.category === 'ARCHITECTURE' || project.category === 'BOTANICAL' || project.category === 'PORTFOLIO';
        return false;
      });

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
              
              {/* Category Filter Buttons */}
              <div className="flex flex-wrap gap-3 mt-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      px-6 py-2 font-mono text-xs uppercase tracking-wider
                      border transition-all duration-300
                      ${selectedCategory === category 
                        ? 'bg-white text-black border-white' 
                        : 'bg-transparent text-white/70 border-white/20 hover:border-white/50 hover:text-white'
                      }
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>
           </div>
          {filteredProjects.map((project, index) => (
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