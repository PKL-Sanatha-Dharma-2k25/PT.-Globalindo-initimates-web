import React, { useEffect } from "react";
import CertificationHero from "../../components/sections/Explore/CertificationHero";
import CertificationSection from "../../components/sections/Explore/CertificationSection";

const CertificationPage = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => onBack(), 300);
  };

  return (
    <div className="bg-white">
      {/* Main Content */}
      <main>
        {/* Certification Hero */}
        <CertificationHero onBack={handleBack} />

        {/* Certification Content Section */}
        <CertificationSection id="certifications" />
      </main>
    </div>
  );
};

export default CertificationPage;