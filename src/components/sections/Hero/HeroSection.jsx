import React, { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import designTokens from '@/constants/designTokens';

const HeroSection = () => {
  const { t } = useLanguage();
  const [currentBg, setCurrentBg] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  const backgrounds = [
    '/images/BgHero/bg.jpg',
    '/images/BgHero/Picture1.png',
    '/images/BgHero/Picture2.png',
  ];

  // Background slideshow
  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Lato:wght@300;400;500;700&display=swap');
          
          .hero-heading {
            font-family: 'Playfair Display', serif;
          }
          
          .hero-body {
            font-family: 'Lato', sans-serif;
          }
        `}
      </style>

      <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900">
        
        {/* ========================================
            BACKGROUND IMAGES WITH FADE TRANSITION
            ======================================== */}
        <div className="absolute inset-0">
          {backgrounds.map((bg, index) => (
            <div
              key={index}
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${bg}')`,
                opacity: currentBg === index ? 1 : 0,
                zIndex: currentBg === index ? 1 : 0,
                transform: `scale(${currentBg === index ? 1.05 : 1})`,
                transition: 'opacity 1.5s ease-in-out, transform 8s ease-in-out'
              }}
            />
          ))}
        </div>
        
        {/* Gradient Overlays - Enhanced */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-blue-900/65 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-transparent to-transparent z-10" />
        
        {/* ========================================
            ANIMATED SHAPES - Parallax Effect
            ======================================== */}
        <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none z-10">
          {/* Orange Blob */}
          <div 
            className={`absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-orange-500/30 to-orange-600/10 rounded-full blur-3xl ${designTokens.animations.hero.float}`}
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          />
          {/* Blue Blob */}
          <div 
            className={`absolute bottom-20 right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-blue-500/5 rounded-full blur-3xl ${designTokens.animations.hero.floatDelayed}`}
            style={{
              transform: `translate(${-mousePosition.x}px, ${mousePosition.y}px)`,
              transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          />
          {/* Cyan Blob */}
          <div 
            className={`absolute top-1/3 right-10 w-72 h-72 bg-gradient-to-br from-cyan-400/15 to-cyan-500/5 rounded-full blur-3xl ${designTokens.animations.hero.floatSlow}`}
            style={{
              transform: `translate(${mousePosition.x * 0.5}px, ${-mousePosition.y}px)`,
              transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          />
        </div>

        {/* Grid Pattern - Subtle */}
        <div className="absolute inset-0 z-10 opacity-5 md:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* ========================================
            FLOATING PARTICLES - Enhanced
            ======================================== */}
        <div className="hidden md:block absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <div className={`absolute top-1/4 left-1/4 w-2 h-2 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full shadow-lg shadow-orange-400/50 ${designTokens.animations.hero.particle}`} />
          <div className={`absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full shadow-lg shadow-blue-400/50 ${designTokens.animations.hero.particleDelayed}`} />
          <div className={`absolute top-2/3 left-1/3 w-2.5 h-2.5 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full shadow-lg shadow-cyan-400/30 ${designTokens.animations.hero.particleSlow}`} />
          <div className={`absolute top-1/2 right-1/4 w-1 h-1 bg-white rounded-full shadow-lg shadow-white/50 ${designTokens.animations.hero.particle}`} />
          <div className={`absolute top-3/4 right-1/2 w-2 h-2 bg-gradient-to-br from-orange-300 to-orange-400 rounded-full shadow-lg shadow-orange-300/30 ${designTokens.animations.hero.particleDelayed}`} />
          <div className={`absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full shadow-lg shadow-blue-300/50 ${designTokens.animations.hero.particleSlow}`} />
        </div>

        {/* Side Decorations - Modern Lines */}
        <div className="hidden lg:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 opacity-40 hover:opacity-60 transition-opacity duration-500">
          <div className="flex flex-col gap-4 pl-8">
            <div className="h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-transparent rounded-full shadow-lg shadow-orange-500/30" style={{width: '80px'}} />
            <div className="h-0.5 bg-gradient-to-r from-blue-400 via-blue-300 to-transparent rounded-full" style={{width: '60px'}} />
            <div className="h-1 bg-gradient-to-r from-cyan-400 via-cyan-300 to-transparent rounded-full shadow-lg shadow-cyan-400/20" style={{width: '90px'}} />
          </div>
        </div>

        <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 opacity-40 hover:opacity-60 transition-opacity duration-500">
          <div className="flex flex-col gap-4 pr-8 items-end">
            <div className="h-1 bg-gradient-to-l from-orange-500 via-orange-400 to-transparent rounded-full shadow-lg shadow-orange-500/30" style={{width: '80px'}} />
            <div className="h-0.5 bg-gradient-to-l from-blue-400 via-blue-300 to-transparent rounded-full" style={{width: '60px'}} />
            <div className="h-1 bg-gradient-to-l from-cyan-400 via-cyan-300 to-transparent rounded-full shadow-lg shadow-cyan-400/20" style={{width: '90px'}} />
          </div>
        </div>
        
        {/* ========================================
            MAIN CONTENT - Improved Structure
            ======================================== */}
        <div className={`relative w-full z-20 pt-32 pb-20`}>
          <div className={designTokens.spacing.container.default}>
            <div className={`${designTokens.maxWidths.narrow} ${isLoaded ? designTokens.animations.basic.slideUp : 'opacity-0'}`}>
              
              {/* WELCOME BADGE - Enhanced */}
              <div className={`hero-body inline-flex items-center gap-2.5 ${designTokens.presets.hero.badge} mb-6 group shadow-lg backdrop-blur-xl hover:shadow-orange-500/20 transition-all duration-300`}>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500 shadow-lg shadow-orange-500/50" />
                </span>
                <span className="text-xs md:text-sm font-semibold tracking-wide text-white/90 group-hover:text-white transition-colors">
                  {t('hero.welcome')}
                </span>
              </div>

              {/* MAIN HEADING - Improved */}
              <h1 className={`hero-heading mb-6 ${designTokens.animations.basic.slideUp} leading-tight text-3xl md:text-4xl lg:text-5xl`} style={{animationFillMode: 'both'}}>
                <span className={`block ${designTokens.presets.hero.title} tracking-tight mb-3 pb-1`}>
                  {t('hero.titleMain')}
                </span>
                <span className={`block tracking-tight ${designTokens.gradients.text.orange} ${designTokens.animations.hero.gradient} pb-2`}>
                  {t('hero.titleHighlight')}
                </span>
              </h1>

              {/* SUBTITLE - Enhanced */}
              <div className={`hero-body mb-6 ${designTokens.animations.basic.slideUp} ${designTokens.spacing.stack.xs}`} 
                   style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
                <p className={`text-sm md:text-base ${designTokens.presets.hero.subtitle} leading-relaxed mb-2`}>
                  {t('hero.subtitle1').split('Technology').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className={`${designTokens.presets.hero.highlight}`}>
                          Technology
                          <span className={designTokens.presets.hero.highlightUnderline} />
                        </span>
                      )}
                    </span>
                  ))}
                </p>
                <p className={`text-sm md:text-base ${designTokens.presets.hero.subtitle} leading-relaxed`}>
                  {t('hero.subtitle2').split('Surrounding').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className={`${designTokens.presets.hero.highlight}`}>
                          Surrounding
                          <span className={designTokens.presets.hero.highlightUnderline} />
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>

              {/* CTA BUTTONS - HIDDEN BUTTON REMOVED */}
              {/* Products button has been hidden/removed */}

              {/* Trust Badges / Social Proof */}
              <div className={`hero-body mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-6 text-white/70 text-sm ${designTokens.animations.basic.slideUp}`} style={{animationDelay: '0.6s', animationFillMode: 'both'}}>
                <span className="text-white/60">{t('hero.trusted')}</span>
                <div className="flex gap-4 items-center">
                  <div className="text-xs bg-white/10 px-3 py-1 rounded-full">{t('hero.iso')}</div>
                  <div className="text-xs bg-white/10 px-3 py-1 rounded-full">{t('hero.sgs')}</div>
                  <div className="text-xs bg-white/10 px-3 py-1 rounded-full">{t('hero.global')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BACKGROUND NAVIGATION DOTS - Enhanced */}
        <div className="hero-body absolute bottom-8 right-8 flex gap-3 z-20 bg-white/5 backdrop-blur-custom px-4 py-3 rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300">
          {backgrounds.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBg(index)}
              className={`rounded-full transition-all duration-500 ${
                currentBg === index 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-400 w-10 h-2.5 shadow-lg shadow-orange-500/50' 
                  : 'bg-white/40 hover:bg-white/70 w-2.5 h-2.5'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* SCROLL INDICATOR - Enhanced */}
        <div className={`hero-body hidden md:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 ${designTokens.animations.hero.bounceSlow}`}>
          <div className="flex flex-col items-center gap-2 text-white/60 hover:text-orange-400 transition-all duration-300 cursor-pointer group">
            <span className="text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center group-hover:border-orange-400 transition-colors duration-300">
              <div className={`w-1 h-3 bg-white/60 rounded-full mt-2 ${designTokens.animations.hero.scroll} group-hover:bg-orange-400`} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;