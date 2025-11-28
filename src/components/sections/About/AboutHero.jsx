import React from 'react';
import { Award, Zap } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="relative min-h-[400px] md:min-h-[500px] overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center pt-20">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-700 rounded-full blur-3xl opacity-20 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20 translate-y-1/2"></div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/50 backdrop-blur-sm">
            <Award className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-semibold text-blue-300">About Our Company</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Get to Know <span className="text-orange-400">PT. Globalindo</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
            A trusted leader in intimate apparel manufacturing with commitment to quality, innovation, and sustainability
          </p>

          {/* CTA */}
          <div className="flex gap-4">
            <button className="px-6 md:px-8 py-3 md:py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Explore More
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce">
          <span className="text-xs font-semibold uppercase tracking-widest">Scroll down</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;