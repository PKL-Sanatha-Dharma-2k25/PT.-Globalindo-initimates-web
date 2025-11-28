import React, { useEffect } from "react";
import TeamHero from "../../components/sections/Team/TeamHero";
import TeamSection from "../../components/sections/Team/TeamSection";

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <main>
        <TeamHero />
        <TeamSection />
      </main>
    </div>
  );
};

export default TeamPage;