import React, { useState } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import Navigation from "./components/layout/Navigation/navigation";
import Footer from "./components/layout/Footer/Footer";
import HeroSection from "./components/sections/Hero/HeroSection";
import PreviewCards from "./components/sections/Landing/PreviewCards";

// Page imports
import AboutPage from "./pages/About/AboutPage";
import CompanyProfilePage from "./pages/About/CompanyProfilePage";
import FacilitiesPage from "./pages/About/FacilitiesPage";
import CSRPage from "./pages/About/CSRPage";
import MarketPage from "./pages/Market/MarketPage";
import ProductPage from "./pages/Products/ProductPage";
import TeamPage from "./pages/Team/TeamPage";
import ContactPage from "./pages/Contact/ContactPage";
import CertificationPage from "./pages/Explore/CertificationPage";
import NewsPage from "./pages/News/NewsPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("landing");

  const handleNavigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <LanguageProvider>
      <div className="bg-white text-gray-800">
        <Navigation currentPage={currentPage} onNavigateTo={handleNavigateTo} />

        {currentPage === "landing" && (
          <>
            <HeroSection />
            <PreviewCards onNavigateTo={handleNavigateTo} />
          </>
        )}

        {currentPage === "about" && (
          <AboutPage onBack={() => handleNavigateTo("landing")} />
        )}

        {currentPage === "company-profile" && (
          <CompanyProfilePage onBack={() => handleNavigateTo("landing")} />
        )}

        {currentPage === "facilities" && (
          <FacilitiesPage onBack={() => handleNavigateTo("landing")} />
        )}

        {currentPage === "csr" && (
          <CSRPage onBack={() => handleNavigateTo("landing")} />
        )}

        {currentPage === "market" && (
          <MarketPage onBack={() => handleNavigateTo("landing")} />
        )}

        {currentPage === "products" && (
          <ProductPage onBack={() => handleNavigateTo("landing")} />
        )}

        {currentPage === "team" && (
          <TeamPage onBack={() => handleNavigateTo("landing")} />
        )}

        {currentPage === "contact" && (
          <ContactPage onBack={() => handleNavigateTo("landing")} />
        )}

        {currentPage === "certification" && (
          <CertificationPage onBack={() => handleNavigateTo("landing")} />
        )}

        {currentPage === "news" && (
          <NewsPage onBack={() => handleNavigateTo("landing")} />
        )}

        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;