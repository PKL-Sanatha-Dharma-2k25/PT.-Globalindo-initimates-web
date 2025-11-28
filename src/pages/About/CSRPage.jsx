import React from "react";
import CSRHero from "../../components/sections/About/CSRHero";
import CSRSection from "../../components/sections/About/CSRSection";

const CSRPage = () => {
  return (
    <div>
      {/* CSR Hero */}
      <CSRHero />

      {/* CSR Content Section */}
      <CSRSection id="csr" />
    </div>
  );
};

export default CSRPage;