import React, { useState, useEffect } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import Navigation from "./components/layout/Navigation/navigation";
import Footer from "./components/layout/Footer/Footer";
import HeroSection from "./components/sections/Hero/HeroSection";
import PreviewCards from "./components/sections/Landing/PreviewCards";
import LoginPage from "./pages/Admin/LoginPage";
import AdminPanel from "./pages/Admin/AdminPanel";

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

const BASE = "/company-profile"; // PREFIX UTAMA

const App = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken"));

  // Semua path menggunakan prefix BASE
  const pathMap = {
    [BASE + "/"]: "landing",
    [BASE + "/about"]: "about",
    [BASE + "/company-profile"]: "company-profile",
    [BASE + "/facilities"]: "facilities",
    [BASE + "/csr"]: "csr",
    [BASE + "/market"]: "market",
    [BASE + "/products"]: "products",
    [BASE + "/team"]: "team",
    [BASE + "/contact"]: "contact",
    [BASE + "/certification"]: "certification",
    [BASE + "/news"]: "news",
  };

  // Fungsi deteksi URL
  const handlePathChange = (path) => {
    console.log("🔍 Current path:", path);

    // Admin routes with prefix
    if (path === BASE + "/admin") {
      const token = localStorage.getItem("adminToken");
      if (token) {
        setCurrentPage("admin");
      } else {
        window.history.pushState({}, "", BASE + "/admin-login");
        setCurrentPage("admin-login");
      }
      return;
    }

    if (path === BASE + "/admin-login") {
      setCurrentPage("admin-login");
      return;
    }

    // Regular pages
    const page = pathMap[path];
    if (page) {
      setCurrentPage(page);
    } else {
      setCurrentPage("landing");
    }
  };

  useEffect(() => {
    let path = window.location.pathname;

    // Jika user buka root "/", redirect otomatis
    if (path === "/") {
      window.history.replaceState({}, "", BASE + "/");
      path = BASE + "/";
    }

    handlePathChange(path);

    const handlePopState = () => {
      handlePathChange(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Navigasi otomatis dengan prefix
  const handleNavigateTo = (page) => {
    setCurrentPage(page);
    const newPath = page === "landing" ? BASE + "/" : `${BASE}/${page}`;
    window.history.pushState({}, "", newPath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoginSuccess = (token) => {
    setAdminToken(token);
    setCurrentPage("admin");
    window.history.pushState({}, "", BASE + "/admin");
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setAdminToken(null);
    setCurrentPage("admin-login");
    window.history.pushState({}, "", BASE + "/admin-login");
  };

  return (
    <LanguageProvider>
      <div className="bg-white text-gray-800">

        {/* LOGIN PAGE */}
        {currentPage === "admin-login" && (
          <LoginPage onLoginSuccess={handleLoginSuccess} />
        )}

        {/* ADMIN PAGE (Protected) */}
        {currentPage === "admin" && adminToken ? (
          <AdminPanel onLogout={handleLogout} />
        ) : currentPage === "admin" && !adminToken ? (
          (() => {
            window.history.pushState({}, "", BASE + "/admin-login");
            setCurrentPage("admin-login");
            return null;
          })()
        ) : null}

        {/* REGULAR PAGES */}
        {currentPage !== "admin" && currentPage !== "admin-login" && (
          <>
            <Navigation currentPage={currentPage} onNavigateTo={handleNavigateTo} />

            {currentPage === "landing" && (
              <>
                <HeroSection />
                <PreviewCards onNavigateTo={handleNavigateTo} />
              </>
            )}

            {currentPage === "about" && <AboutPage onBack={() => handleNavigateTo("landing")} />}
            {currentPage === "company-profile" && <CompanyProfilePage onBack={() => handleNavigateTo("landing")} />}
            {currentPage === "facilities" && <FacilitiesPage onBack={() => handleNavigateTo("landing")} />}
            {currentPage === "csr" && <CSRPage onBack={() => handleNavigateTo("landing")} />}
            {currentPage === "market" && <MarketPage onBack={() => handleNavigateTo("landing")} />}
            {currentPage === "products" && <ProductPage onBack={() => handleNavigateTo("landing")} />}
            {currentPage === "team" && <TeamPage onBack={() => handleNavigateTo("landing")} />}
            {currentPage === "contact" && <ContactPage onBack={() => handleNavigateTo("landing")} />}
            {currentPage === "certification" && <CertificationPage onBack={() => handleNavigateTo("landing")} />}
            {currentPage === "news" && <NewsPage onBack={() => handleNavigateTo("landing")} />}

            <Footer />
          </>
        )}
      </div>
    </LanguageProvider>
  );
};

export default App;
