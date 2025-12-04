import React from 'react';
import { Award, ChevronDown, ArrowRight } from 'lucide-react';

const AboutHero = () => {
  const handleExploreClick = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap');
          
          .about-heading {
            font-family: 'Playfair Display', serif;
          }
          
          .about-body {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>
      <section 
        className="relative min-h-screen flex items-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/BgHero/about.png')"
        }}
      >
        {/* Overlay untuk kontras teks */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-20 -translate-y-1/2 z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20 translate-y-1/2 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            
            {/* Badge dengan Animasi Orange */}
            <div className="about-body inline-flex items-center gap-2.5 mb-8 px-4 py-2.5 rounded-md bg-orange-500/15 border border-orange-400/30 backdrop-blur-sm shadow-lg backdrop-blur-xl hover:shadow-orange-500/20 transition-all duration-300 group">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500 shadow-lg shadow-orange-500/50" />
              </span>
              <span className="text-xs md:text-sm font-medium text-orange-300 uppercase tracking-wide">About Our Company</span>
            </div>
            
            {/* Title */}
            <h1 className="about-heading text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-relaxed tracking-tight">
              <span className="text-orange-400 font-light">PT. Globalindo Intimates</span>
            </h1>
            
            {/* Description */}
            <p className="about-body text-sm md:text-base text-blue-100/70 mb-10 leading-relaxed max-w-xl font-light">
              A trusted apparel manufacturer delivering quality, innovation, and sustainable growth for global markets.
            </p>
            
            {/* CTA Button */}
            <button 
              onClick={handleExploreClick}
              className="about-body group relative px-8 md:px-10 py-3 md:py-3.5 bg-transparent border-2 border-orange-500 text-white font-light rounded-md transition-all duration-300 overflow-hidden flex items-center gap-2 cursor-pointer hover:shadow-lg hover:shadow-orange-500/50"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-orange-500 transition-transform duration-300 -z-10 group-hover:scale-100 scale-0 rounded-md" />
              
              {/* Button Content */}
              <span className="relative z-10 flex items-center gap-2 text-sm md:text-base">
                Explore More
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="about-body absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors duration-300 group cursor-pointer" onClick={handleExploreClick}>
            <span className="text-xs font-light uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Scroll</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutHero;