import React from "react";
import { Instagram, Linkedin, Youtube } from "lucide-react";

const designTokens = {
  colors: {
    primary: {
      blue: '#1e40af',
      orange: '#f97316',
    },
    neutral: {
      white: '#ffffff',
      black: '#000000',
      gray: {
        400: '#9ca3af',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
    },
  },
  transitions: {
    base: 'transition-all duration-300 ease-in-out',
  },
};

const { colors, transitions } = designTokens;

const Footer = ({ onNavigateTo }) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      hoverColor: 'from-orange-500 to-orange-600',
      url: 'https://www.instagram.com/explore/locations/59657656/ptglobalindo-intimates/',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      hoverColor: 'from-blue-500 to-blue-600',
      url: 'https://id.linkedin.com/company/globalindo-intimates',
    },
    {
      name: 'YouTube',
      icon: <Youtube className="w-5 h-5" />,
      hoverColor: 'from-red-500 to-red-600',
      url: 'https://www.youtube.com/watch?v=jEWGb2kieic',
    },
  ];

  const quickLinks = [
    { label: 'About Us', page: 'company-profile' },
    { label: 'Our Products', page: 'products' },
    { label: 'Our Team', page: 'team' },
    { label: 'Facilities', page: 'facilities' },
    { label: 'Contact', page: 'contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickLinkClick = (page) => {
    if (onNavigateTo) {
      onNavigateTo(page);
      setTimeout(scrollToTop, 100);
    } else {
      const pageMap = {
        'company-profile': '/company-profile',
        'products': '/products',
        'team': '/team',
        'facilities': '/facilities',
        'contact': '/contact',
      };

      const path = pageMap[page] || `/${page}`;
      window.history.pushState({}, "", path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      setTimeout(scrollToTop, 100);
    }
  };

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: colors.neutral.gray[900] }}>

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600"></div>

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-8 md:py-12 lg:py-20 relative z-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 mb-6 md:mb-8">

          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">

              {}
              <img 
                src="/company-profile/images/logo/icon.PNG"
                alt="Globalindo Intimates Logo"
                className="w-10 h-10 object-cover rounded-lg"
              />

              <div>
                <h3 className="text-base md:text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  PT. Globalindo Intimates
                </h3>
                <p className="text-xs" style={{ color: colors.neutral.gray[400] }}>
                  Quality In Every Single Stitch
                </p>
              </div>
            </div>

            <p className="text-xs md:text-sm leading-relaxed max-w-md" style={{ color: colors.neutral.gray[400] }}>
              Achieving Global Quality with Technology Empowering The Surrounding Society
            </p>

            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center ${transitions.base} transform hover:-translate-y-1`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.hoverColor} rounded-lg opacity-0 group-hover:opacity-100 ${transitions.base}`}></div>
                  <div className="relative flex items-center justify-center" style={{ color: colors.neutral.gray[400] }}>
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs md:text-sm font-medium relative inline-block" style={{ color: colors.neutral.white }}>
              Quick Links
              <div className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleQuickLinkClick(link.page)}
                    className="flex items-center gap-2 group text-xs md:text-sm transition-all duration-300 hover:pl-1"
                    style={{ 
                      color: colors.neutral.gray[400], 
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <span 
                      className="w-0 group-hover:w-1.5 h-0.5 transition-all duration-300 flex-shrink-0" 
                      style={{ backgroundColor: colors.primary.orange }}
                    ></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs md:text-sm font-medium relative inline-block" style={{ color: colors.neutral.white }}>
              Get in Touch
              <div className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
            </h4>
            <ul className="space-y-2">
              <li className="text-xs" style={{ color: colors.neutral.gray[400] }}>
                Jalan Jombor Poka, RT.01/RW.01<br />
                Jayan, Jombor, Kec. Ceper<br />
                Kabupaten Klaten, Jawa Tengah 57465
              </li>

              <li>
                <a 
                  href="mailto:info@globalindo-intimates.com"
                  style={{ color: colors.neutral.gray[400] }}
                  className="text-xs transition-all duration-300 hover:text-orange-500"
                >
                  info@globalindo-intimates.com
                </a>
              </li>

              <li>
                <a 
                  href="tel:+62212301120"
                  style={{ color: colors.neutral.gray[400] }}
                  className="text-xs transition-all duration-300 hover:text-orange-500"
                >
                  +62 212 301120
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs mt-6" style={{ color: colors.neutral.gray[400] }}>
          © {currentYear} PT. Globalindo Intimates. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
