import React from "react";
import CompanyProfileHero from "../../components/sections/About/CompanyProfileHero";
import CompanyProfileSection from "../../components/sections/About/CompanyProfileSection";

const CompanyProfilePage = () => {
  return (
    <div>
      {/* Company Profile Hero */}
      <CompanyProfileHero />

      {/* Company Profile Content Section */}
      <CompanyProfileSection id="company" />
    </div>
  );
};

export default CompanyProfilePage;