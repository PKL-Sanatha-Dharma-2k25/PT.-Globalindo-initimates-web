import React from "react";
import { ChevronLeft } from "lucide-react";
import AboutHero from "../../components/sections/About/AboutHero";
import AboutSection from "../../components/sections/About/AboutSection";

const AboutPage = ({ onBack }) => {
  return (
    <div>
      {/* Back Button Bar */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-600 font-semibold transition-colors duration-300 group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
        </div>
      </div>

      {/* About Hero */}
      <AboutHero />

      {/* About Content */}
      <AboutSection />
    </div>
  );
};

export default AboutPage;