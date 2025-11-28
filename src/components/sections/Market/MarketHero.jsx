import React, { useState } from 'react';
import { TrendingUp, Globe, ChevronDown, ArrowRight } from 'lucide-react';

// Simulasi designTokens
const designTokens = {
  colors: {
    primary: {
      orange: '#FF6B35'
    }
  }
};

const MarketHero = ({ videoUrl = "/images/BgHero/Market.mp4" }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const scrollToSection = () => {
    const marketSection = document.getElementById('market');
    if (marketSection) {
      marketSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[480px] md:min-h-[560px] lg:h-[640px] overflow-hidden bg-black">
      
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          
          {/* Subtitle */}
          <div className="mb-8">
            <span 
              className="text-xs md:text-sm font-medium uppercase tracking-[0.15em] drop-shadow-lg inline-flex items-center gap-2 transition-all duration-300"
              style={{ color: designTokens.colors.primary.orange }}
            >
              <Globe className="w-3.5 h-3.5" />
              Global Markets
            </span>
          </div>

          {/* Accent Line */}
          <div 
            className="w-16 h-0.5 mb-8 rounded-full transition-all duration-300"
            style={{ backgroundColor: designTokens.colors.primary.orange }}
          ></div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-relaxed drop-shadow-lg tracking-tight">
            Think Global,
            <span 
              style={{ color: designTokens.colors.primary.orange }}
              className="font-light"
            >
              <br />
              Trade Local
            </span>
          </h1>

          {/* Description */}
          <p 
            className="text-sm md:text-base text-white/60 drop-shadow-lg font-light max-w-xl transition-all duration-300 mb-10 leading-relaxed"
          >
            Connecting markets across 50+ countries with world-class quality and reliability
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
            <span className="flex items-center gap-2 relative z-10">
              <TrendingUp className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
              <span className="text-sm md:text-base">View Market Data</span>
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
          <span className="text-xs font-light uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4 group-hover:animate-bounce" />
        </button>
      </div>

      {/* Video Loading Indicator */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-white animate-spin mx-auto mb-4"></div>
            <p className="text-white text-sm font-light">Loading...</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default MarketHero;