import React, { useEffect } from "react";
import FacilitiesHero from "../../components/sections/About/FacilitiesHero";
import FacilitiesSection from "../../components/sections/About/FacilitiesSection";

const FacilitiesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      {/* Main Content */}
      <main>
        {/* Facilities Hero */}
        <FacilitiesHero />

        {/* Facilities Content Section */}
        <FacilitiesSection id="facilities" />
      </main>
    </div>
  );
};

export default FacilitiesPage;