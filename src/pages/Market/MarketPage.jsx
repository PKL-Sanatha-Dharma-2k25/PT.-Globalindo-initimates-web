import React from "react";
import MarketHero from "../../components/sections/Market/MarketHero";
import MarketSection from "../../components/sections/Market/MarketSection";

const MarketPage = () => {
  return (
    <div>
      {/* Market Hero */}
      <MarketHero />

      {/* Market Content */}
      <MarketSection id="market" />
    </div>
  );
};

export default MarketPage;