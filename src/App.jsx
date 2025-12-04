import React, { useState, useEffect } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import Navigation from "./components/layout/Navigation/navigation";
import Footer from "./components/layout/Footer/Footer";
import HeroSection from "./components/sections/Hero/HeroSection";
import PreviewCards from "./components/sections/Landing/PreviewCards";
import LoginPage from "./pages/Admin/LoginPage";
import AdminPanel from "./pages/Admin/AdminPanel";

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
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  // Mapping path ke page
  const pathMap = {
    "/": "landing",
    "/about": "about",
    "/company-profile": "company-profile",
    "/facilities": "facilities",
    "/csr": "csr",
    "/market": "market",
    "/products": "products",
    "/team": "team",
    "/contact": "contact",
    "/certification": "certification",
    "/news": "news",
  };

  // Function untuk detect dan set page berdasarkan path
  const handlePathChange = (path) => {
    console.log('🔍 Current path:', path);

    // Check admin routes
    if (path === "/company-profile/admin") {
      const token = localStorage.getItem('adminToken');
      console.log('🔐 Token found:', !!token);
      
      if (token) {
        setCurrentPage("admin");
      } else {
        window.history.pushState({}, "", "/admin-login");
        setCurrentPage("admin-login");
      }
      return;
    }

    if (path === "/admin-login") {
      setCurrentPage("admin-login");
      return;
    }

    if (path === "/admin") {
      const token = localStorage.getItem('adminToken');
      if (token) {
        setCurrentPage("admin");
      } else {
        window.history.pushState({}, "", "/admin-login");
        setCurrentPage("admin-login");
      }
      return;
    }

    // Check regular routes
    const page = pathMap[path];
    if (page) {
      setCurrentPage(page);
    } else {
      setCurrentPage("landing");
    }
  };

  // Detect URL path saat load dan saat ada perubahan
  useEffect(() => {
    const path = window.location.pathname;
    handlePathChange(path);

    // Listen untuk perubahan URL (back/forward button)
    const handlePopState = () => {
      handlePathChange(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigateTo = (page) => {
    setCurrentPage(page);
    // Update URL
    window.history.pushState({}, "", page === "landing" ? "/" : `/${page}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoginSuccess = (token) => {
    console.log('✅ Login success, token:', token);
    setAdminToken(token);
    setCurrentPage("admin");
    window.history.pushState({}, "", "/admin");
  };

  const handleLogout = () => {
    console.log('🚪 Logout');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdminToken(null);
    setCurrentPage("admin-login");
    window.history.pushState({}, "", "/admin-login");
  };

  return (
    <LanguageProvider>
      <div className="bg-white text-gray-800">
        {/* Login Page */}
        {currentPage === "admin-login" && (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        )}

        {/* Admin Panel (Protected) */}
        {currentPage === "admin" && adminToken ? (
          <AdminPanel onLogout={handleLogout} />
        ) : currentPage === "admin" && !adminToken ? (
          (() => {
            console.log('⚠️ No token for admin page, redirecting...');
            window.history.pushState({}, "", "/admin-login");
            setCurrentPage("admin-login");
            return null;
          })()
        ) : null}

        {/* Regular Pages */}
        {currentPage !== "admin" && currentPage !== "admin-login" && (
          <>
            {currentPage !== "admin" && (
              <Navigation currentPage={currentPage} onNavigateTo={handleNavigateTo} />
            )}

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
          </>
        )}
      </div>
    </LanguageProvider>
  );
};

export default App;