import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import designTokens from '@/constants/designTokens';

const NewsHero = () => {
  const scrollToSection = () => {
    const newsSection = document.getElementById('news-section');
    if (newsSection) {
      newsSection.scrollIntoView({ behavior: 'smooth' });
    }
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

      <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-black">
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/BgHero/newsbg.jpg')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        ></div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        
        {/* Content Container */}
        <div className="relative z-10 w-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            
            {/* Subtitle */}
            <div className="mb-8">
              <span 
                className="hero-text text-xs md:text-sm font-medium uppercase tracking-[0.15em] drop-shadow-lg inline-block transition-all duration-300"
                style={{ color: designTokens.colors.primary.orange }}
              >
                News & Publications
              </span>
            </div>
            
            {/* Accent Line */}
            <div 
              className="w-16 h-0.5 mb-8 rounded-full transition-all duration-300"
              style={{ backgroundColor: designTokens.colors.primary.orange }}
            ></div>
            
            {/* Main Heading */}
            <h1 className="hero-heading text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-relaxed drop-shadow-lg tracking-tight">
              Stay Updated <br />
              <span 
                style={{ color: designTokens.colors.primary.orange }}
                className="font-light"
              >
                With Latest News
              </span>
            </h1>
            
            {/* Description */}
            <p 
              className="hero-text text-sm md:text-base text-white/60 drop-shadow-lg font-light max-w-xl transition-all duration-300 mb-10 leading-relaxed"
            >
              Follow the latest developments and achievements in innovation, sustainability, and global growth.
            </p>
            
            {/* CTA Button */}
            <button 
              onClick={scrollToSection}
              className="hero-text group relative px-8 md:px-10 py-3 md:py-3.5 bg-transparent border-2 text-white font-light rounded-md transition-all duration-300 overflow-hidden"
              style={{ borderColor: designTokens.colors.primary.orange }}
            >
              {/* Animated Background */}
              <div 
                className="absolute inset-0 transition-transform duration-300 -z-10 group-hover:scale-100 scale-0 rounded-md"
                style={{ backgroundColor: designTokens.colors.primary.orange }}
              ></div>
              
              {/* Button Content */}
              <span className="flex items-center gap-2 relative z-10">
                <span className="text-sm md:text-base">Read News</span>
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
            <span className="text-xs font-light uppercase tracking-widest">Scroll</span>
            <ChevronDown className="w-4 h-4 group-hover:animate-bounce" />
          </button>
        </div>
      </section>
    </>
  );
};

export default NewsHero;