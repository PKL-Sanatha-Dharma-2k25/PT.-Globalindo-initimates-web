import React, { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import designTokens from '@/constants/designTokens';

// ========================================
// GET NEWS BACKGROUND WITH VITE_BASE_URL
// ========================================
const getNewsBackground = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL || '';
  return `${baseUrl}/images/BgHero/newsbg.png`;
};

const NewsHero = () => {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);
  const backgroundImage = getNewsBackground();

  useEffect(() => {
    // Pre-load background image
    const img = new Image();
    img.onload = () => setBackgroundLoaded(true);
    img.onerror = () => {
      console.warn(`Failed to load news background: ${backgroundImage}`);
      setBackgroundLoaded(true); // Still show section even if image fails
    };
    img.src = backgroundImage;
  }, [backgroundImage]);

  const scrollToSection = () => {
    // Tunggu sedikit untuk memastikan DOM sudah ready
    setTimeout(() => {
      const newsSection = document.getElementById('news-section');
      if (newsSection) {
        newsSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn('Element dengan id news-section tidak ditemukan');
      }
    }, 100);
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Lato:wght@300;400;500;700&display=swap');
          
          .hero-heading {
            font-family: 'Playfair Display', serif;
          }
          
          .hero-text {
            font-family: 'Lato', sans-serif;
          }
        `}
      </style>

      <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-black">
        
        {/* Background Image - dengan fallback */}
        {backgroundLoaded && (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${backgroundImage}')`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          />
        )}

        {/* Fallback Gradient Background */}
        {!backgroundLoaded && (
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-black" />
        )}
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/50 z-5"></div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-full blur-3xl -translate-y-1/2 z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl translate-y-1/2 z-0"></div>
        
        {/* Content Container */}
        <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            
            {/* Badge dengan Animasi */}
            <div className="hero-text inline-flex items-center gap-2.5 mb-8 px-4 py-2.5 rounded-md bg-orange-500/15 border border-orange-400/30 backdrop-blur-sm shadow-lg hover:shadow-orange-500/20 transition-all duration-300 group">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500 shadow-lg shadow-orange-500/50" />
              </span>
              <span className="text-xs md:text-sm font-medium text-orange-300 uppercase tracking-wide">
                News & Publications
              </span>
            </div>
            
            {/* Title */}
            <h1 className="hero-heading text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-relaxed tracking-tight">
              Stay Updated <br />
              <span 
                style={{ color: designTokens.colors.primary.orange }}
                className="font-light"
              >
                With Latest News
              </span>
            </h1>
            
            {/* Description */}
            <p className="hero-text text-sm md:text-base text-white/70 font-light max-w-xl mb-10 leading-relaxed">
              Follow the latest developments and achievements in innovation, sustainability, and global growth.
            </p>
            
            {/* CTA Button */}
            <button 
              onClick={scrollToSection}
              className="hero-text group relative px-8 md:px-10 py-3 md:py-3.5 bg-transparent border-2 text-white font-light rounded-md transition-all duration-300 overflow-hidden flex items-center gap-2 hover:shadow-lg hover:shadow-orange-500/30"
              style={{ borderColor: designTokens.colors.primary.orange }}
            >
              {/* Animated Background */}
              <div 
                className="absolute inset-0 transition-transform duration-300 -z-10 group-hover:scale-100 scale-0 rounded-md"
                style={{ backgroundColor: designTokens.colors.primary.orange }}
              ></div>
              
              {/* Button Content */}
              <span className="flex items-center gap-2 relative z-10 text-sm md:text-base">
                <span>Read News</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={scrollToSection}
            className="hero-text flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors duration-300 group"
          >
            <span className="text-xs font-light uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">Scroll</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </section>
    </>
  );
};

export default NewsHero;