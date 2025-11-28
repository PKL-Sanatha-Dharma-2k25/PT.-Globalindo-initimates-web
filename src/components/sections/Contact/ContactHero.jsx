import React from 'react';
import { Mail, Phone, ChevronDown, ChevronLeft, ArrowRight } from 'lucide-react';
import designTokens from '../../../constants/designTokens';

const ContactHero = ({ onBack, bgImage = "/images/BgHero/bgC.jpg" }) => {
  const scrollToSection = () => {
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[480px] md:min-h-[560px] lg:h-[640px] overflow-hidden bg-black">
      
      {/* Back Button - Top Left */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-8 left-6 md:left-12 lg:left-20 z-20 flex items-center gap-2 px-4 py-2.5 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-white font-light text-sm transition-all duration-300 group hover:bg-orange-600/90 hover:border-orange-600"
          title="Kembali ke halaman utama"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali</span>
        </button>
      )}

      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl">
          
          {/* Subtitle */}
          <div className="mb-8">
            <span 
              className="text-xs md:text-sm font-medium uppercase tracking-[0.15em] drop-shadow-lg inline-block transition-all duration-300"
              style={{ color: designTokens.colors.primary.orange }}
            >
              Get In Touch
            </span>
          </div>

          {/* Accent Line */}
          <div 
            className="w-16 h-0.5 mb-8 rounded-full transition-all duration-300"
            style={{ backgroundColor: designTokens.colors.primary.orange }}
          ></div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-relaxed drop-shadow-lg tracking-tight">
            Let's <br />
            <span 
              style={{ color: designTokens.colors.primary.orange }}
              className="font-light"
            >
              Connect
            </span>
          </h1>

          {/* Description */}
          <p 
            className="text-sm md:text-base text-white/60 drop-shadow-lg font-light max-w-xl transition-all duration-300 mb-10 leading-relaxed"
          >
            We're here to answer your questions and discuss how we can help bring your vision to life
          </p>

          {/* CTA Button */}
          <button 
            onClick={scrollToSection}
            className="group relative px-8 md:px-10 py-3 md:py-3.5 bg-transparent border-2 text-white font-light rounded-md transition-all duration-300 overflow-hidden flex items-center gap-2"
            style={{ borderColor: designTokens.colors.primary.orange }}
          >
            {/* Animated Background */}
            <div 
              className="absolute inset-0 transition-transform duration-300 -z-10 group-hover:scale-100 scale-0 rounded-md"
              style={{ backgroundColor: designTokens.colors.primary.orange }}
            ></div>
            
            {/* Button Content */}
            <span className="flex items-center gap-2 relative z-10">
              <Phone className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              <span className="text-sm md:text-base">Contact Us</span>
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
    </section>
  );
};

export default ContactHero;