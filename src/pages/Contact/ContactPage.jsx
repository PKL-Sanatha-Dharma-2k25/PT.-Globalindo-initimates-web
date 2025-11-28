import React, { useEffect } from "react";
import ContactHero from "../../components/sections/Contact/ContactHero";
import ContactSection from "../../components/sections/Contact/ContactSection";

const ContactPage = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <main>
        <ContactHero onBack={onBack} />
        <ContactSection />
      </main>
    </div>
  );
};

export default ContactPage;