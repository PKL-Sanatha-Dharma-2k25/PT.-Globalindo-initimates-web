import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

const designTokens = {
  colors: {
    primary: {
      orange: '#FF6B35'
    }
  }
};

const CertificationHero = ({ 
  backgroundImage = "./images/BgHero/certificate.jpg" 
}) => {
  const scrollToSection = () => {
    const certificationSection = document.getElementById('certifications');
    if (certificationSection) {
      certificationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-black">
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt="Certifications Background"
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          
          {/* Badge dengan Animasi */}
          <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2.5 rounded-md bg-orange-500/15 border border-orange-400/30 backdrop-blur-sm shadow-lg hover:shadow-orange-500/20 transition-all duration-300 group">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500 shadow-lg shadow-orange-500/50" />
            </span>
            <span className="text-xs md:text-sm font-medium text-orange-300 uppercase tracking-wide">
              Certifications
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-relaxed tracking-tight">
            Quality Assured <br />
            <span 
              style={{ color: designTokens.colors.primary.orange }}
              className="font-light"
            >
              Globally Recognized
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm md:text-base text-white/60 font-light max-w-xl mb-10 leading-relaxed">
            International certifications validating our commitment to quality, safety, and environmental sustainability
          </p>

          {/* CTA Button */}
          <button 
            onClick={scrollToSection}
            className="group relative px-8 md:px-10 py-3 md:py-3.5 bg-transparent border-2 text-white font-light rounded-md transition-all duration-300 overflow-hidden"
            style={{ borderColor: designTokens.colors.primary.orange }}
          >
            {/* Animated Background */}
            <div 
              className="absolute inset-0 transition-transform duration-300 -z-10 group-hover:scale-100 scale-0 rounded-md"
              style={{ backgroundColor: designTokens.colors.primary.orange }}
            ></div>
            
            {/* Button Content */}
            <span className="flex items-center gap-2 relative z-10 text-sm md:text-base">
              <span>Explore Certifications</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={scrollToSection}
          className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors duration-300 group"
        >
          <span className="text-xs font-light uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default CertificationHero;