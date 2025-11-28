import React, { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import designTokens from "@/constants/designTokens";

const Navigation = ({ currentPage, onNavigateTo }) => {
  const { language, changeLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu structure
  const menuItems = [
    {
      id: "about",
      label: t('nav.whoWeAre'),
      hasDropdown: true,
      submenu: [
        { id: "company-profile", label: t('nav.about'), action: "company-profile" },
        { id: "team", label: t('nav.team'), action: "team" },
        { id: "facilities", label: t('nav.facilities'), action: "facilities" },
        { id: "csr", label: t('nav.csr'), action: "csr" },
      ],
    },
    { id: "market", label: t('nav.market'), hasDropdown: false },
    { id: "products", label: t('nav.products'), hasDropdown: false },
    { id: "news", label: t('nav.news'), hasDropdown: false },
    { id: "certification", label: t('nav.certifications'), hasDropdown: false },
  ];

  const languages = [
    { code: "EN", name: "English", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { code: "ID", name: "Indonesia", flag: "🇮🇩" },
    { code: "CN", name: "中文", flag: "🇨🇳" },
  ];

  const handleMenuClick = (pageId, action = null) => {
    const targetPage = action || pageId;
    onNavigateTo(targetPage);
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const handleLogoClick = () => {
    onNavigateTo("landing");
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100"
            : "bg-black/50 backdrop-blur-md border-b border-white/10"
        }`}
      >
        <div className={designTokens.spacing.container.default}>
          <div className="flex justify-between items-center h-12 sm:h-14 md:h-16">
            {/* Logo Only */}
            <img
              onClick={handleLogoClick}
              src="/images/gi.png"
              alt="PT. Globalindo Intimates"
              className="h-6 md:h-8 w-auto object-contain cursor-pointer transition-all duration-300 hover:opacity-80"
            />

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-4">
              {menuItems.map((item, index) => (
                <div key={item.id} className="relative group">
                  {/* Main Menu Item */}
                  <button
                    onClick={() => !item.hasDropdown && handleMenuClick(item.id)}
                    className={`group/btn relative px-4 xl:px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-1.5 ${
                      currentPage === item.id
                        ? scrolled
                          ? "text-orange-600"
                          : "text-orange-400"
                        : scrolled
                        ? "text-gray-700 hover:text-orange-600"
                        : "text-white hover:text-orange-400"
                    }`}
                    style={{
                      animationDelay: `${index * 0.05}s`,
                    }}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                    )}

                    {currentPage === item.id && !item.hasDropdown && (
                      <div
                        className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                          scrolled ? "bg-orange-600" : "bg-orange-400"
                        } shadow-lg ${
                          scrolled
                            ? "shadow-orange-600/50"
                            : "shadow-orange-400/50"
                        }`}
                      >
                        <div className="absolute inset-0 rounded-full animate-ping opacity-75"></div>
                      </div>
                    )}

                    <div
                      className={`absolute inset-0 rounded-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 ${
                        scrolled ? "bg-orange-50" : "bg-white/10"
                      }`}
                    ></div>
                  </button>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && (
                    <div
                      className={`absolute top-full left-0 mt-3 w-56 rounded-xl shadow-2xl border overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ${
                        scrolled
                          ? "bg-white border-gray-200"
                          : "bg-slate-900/98 backdrop-blur-lg border-white/20"
                      }`}
                    >
                      {item.submenu.map((subitem, idx) => (
                        <button
                          key={subitem.id}
                          onClick={() => handleMenuClick(subitem.id, subitem.action)}
                          className={`w-full text-left px-4 py-3.5 transition-all duration-200 flex items-center gap-3 group/item ${
                            idx !== item.submenu.length - 1
                              ? scrolled
                                ? "border-b border-gray-100"
                                : "border-b border-white/10"
                              : ""
                          } ${
                            currentPage === (subitem.action || subitem.id)
                              ? scrolled
                                ? "bg-orange-50 text-orange-600"
                                : "bg-orange-500/20 text-orange-400"
                              : scrolled
                              ? "text-gray-700 hover:bg-gray-50"
                              : "text-white hover:bg-white/5"
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            currentPage === (subitem.action || subitem.id)
                              ? scrolled
                                ? "bg-orange-600"
                                : "bg-orange-400"
                              : scrolled
                              ? "bg-gray-300 group-hover/item:bg-orange-600"
                              : "bg-white/30 group-hover/item:bg-orange-400"
                          }`}></div>
                          <span className="text-sm font-medium flex-1">{subitem.label}</span>
                          <svg className={`w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform group-hover/item:translate-x-1 ${
                            currentPage === (subitem.action || subitem.id)
                              ? scrolled
                                ? "text-orange-600"
                                : "text-orange-400"
                              : scrolled
                              ? "text-gray-400"
                              : "text-white/50"
                          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Contact Button */}
              <button
                onClick={() => handleMenuClick("contact")}
                className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-semibold transition-all duration-300 text-sm border-2 ${
                  currentPage === "contact"
                    ? scrolled
                      ? "border-orange-600 bg-orange-600 text-white shadow-lg hover:shadow-xl hover:shadow-orange-600/50"
                      : "border-orange-400 bg-orange-500/90 text-white shadow-lg hover:shadow-orange-500/50"
                    : scrolled
                    ? "border-gray-300 text-gray-700 hover:border-orange-600 hover:text-orange-600"
                    : "border-white/30 text-white hover:border-orange-400 hover:text-orange-400"
                }`}
              >
                {t('nav.contact')}
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
                    scrolled
                      ? "text-gray-700 bg-gray-100 hover:bg-orange-50 hover:text-orange-600"
                      : "text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                  }`}
                >
                  <span>{language}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      showLangMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showLangMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowLangMenu(false)}
                    ></div>
                    <div
                      className={`absolute top-full right-0 mt-2 w-44 rounded-xl shadow-2xl border overflow-hidden z-50 ${
                        scrolled
                          ? "bg-white border-gray-200"
                          : "bg-slate-900/95 backdrop-blur-lg border-white/20"
                      }`}
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            changeLanguage(lang.code);
                            setShowLangMenu(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                            language === lang.code
                              ? scrolled
                                ? "bg-orange-50 text-orange-600"
                                : "bg-orange-500/20 text-orange-400"
                              : scrolled
                              ? "text-gray-700 hover:bg-gray-50"
                              : "text-white hover:bg-white/10"
                          }`}
                        >
                          <span className="font-semibold text-sm">{lang.code}</span>
                          <span className="text-xs text-gray-400">
                            {lang.name}
                          </span>
                          {language === lang.code && (
                            <svg
                              className="w-4 h-4 ml-auto text-orange-500"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden relative p-2 rounded-lg transition-all duration-300 ${
                  scrolled
                    ? "text-gray-700 bg-gray-100 hover:bg-orange-50 hover:text-orange-600"
                    : "text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                }`}
                aria-label="Open menu"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300 top-16"
            onClick={() => setIsOpen(false)}
          ></div>

          <div
            className={`lg:hidden fixed top-16 right-0 bottom-0 z-[70] w-full max-w-sm bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 backdrop-blur-lg shadow-2xl transform transition-transform duration-500 ease-out overflow-y-auto ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-4 sm:p-6 space-y-1">
              {menuItems.map((item, index) => (
                <div key={item.id}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === item.id ? null : item.id
                          )
                        }
                        className={`group w-full text-left flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                          currentPage === item.id
                            ? "bg-orange-500/20 text-orange-400"
                            : "text-white hover:bg-white/10"
                        }`}
                        style={{
                          animationDelay: `${index * 0.05}s`,
                        }}
                      >
                        <span className="font-semibold text-base">{item.label}</span>
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${
                            activeDropdown === item.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {activeDropdown === item.id && (
                        <div className="pl-4 space-y-1">
                          {item.submenu.map((subitem) => (
                            <button
                              key={subitem.id}
                              onClick={() => handleMenuClick(subitem.id, subitem.action)}
                              className={`w-full text-left p-3 rounded-lg transition-all duration-200 text-sm ${
                                currentPage === (subitem.action || subitem.id)
                                  ? "bg-orange-500/20 text-orange-400"
                                  : "text-gray-300 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              {subitem.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => handleMenuClick(item.id)}
                      className={`group w-full text-left flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                        currentPage === item.id
                          ? "bg-orange-500/20 text-orange-400"
                          : "text-white hover:bg-white/10"
                      }`}
                      style={{
                        animationDelay: `${index * 0.05}s`,
                      }}
                    >
                      <span className="font-semibold text-base">{item.label}</span>
                      <svg
                        className={`w-5 h-5 transform transition-all duration-300 ${
                          currentPage === item.id
                            ? "translate-x-1 text-orange-400"
                            : "text-gray-500 group-hover:translate-x-1 group-hover:text-orange-400"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}

              {/* Mobile Contact Button */}
              <button
                onClick={() => handleMenuClick("contact")}
                className="w-full mt-4 flex items-center justify-center gap-2 p-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                {t('nav.contact')}
              </button>
            </div>

            {/* Mobile Language Selector */}
            <div className="p-4 sm:p-6 border-t border-white/10">
              <p className="text-xs font-semibold tracking-widest uppercase text-white/50 mb-3">
                Language
              </p>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-300 font-semibold text-sm ${
                      language === lang.code
                        ? "bg-orange-500/20 border border-orange-500/50 text-orange-400"
                        : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    {lang.code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navigation;