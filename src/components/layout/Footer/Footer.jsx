import React from "react";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

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
      url: 'https://instagram.com/globalindo-intimates',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      hoverColor: 'from-blue-500 to-blue-600',
      url: 'https://linkedin.com/company/globalindo-intimates',
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      hoverColor: 'from-blue-400 to-blue-500',
      url: 'https://twitter.com/globalindo-intimates',
    },
    {
      name: 'YouTube',
      icon: <Youtube className="w-5 h-5" />,
      hoverColor: 'from-red-500 to-red-600',
      url: 'https://youtube.com/@globalindo-intimates',
    },
  ];

  const quickLinks = [
    { label: 'About Us', page: 'about' },
    { label: 'Our Products', page: 'products' },
    { label: 'Our Team', page: 'team' },
    { label: 'Facilities', page: 'facilities' },
    { label: 'Contact', page: 'contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: colors.neutral.gray[900] }}>
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600"></div>
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12 md:py-16 lg:py-20 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-8">
          
          {/* Company Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/images/icon.PNG" 
                alt="Globalindo Intimates Logo"
                className="w-10 h-10 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  PT. Globalindo Intimates
                </h3>
                <p className="text-xs" style={{ color: colors.neutral.gray[400] }}>Excellence in Every Stitch</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed max-w-md" style={{ color: colors.neutral.gray[400] }}>
              Leading manufacturer of premium intimate apparel, committed to quality, innovation, and sustainable practices.
            </p>

            {/* Social Media */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center ${transitions.base} transform hover:-translate-y-1`}
                  title={social.name}
                  style={{ backgroundColor: colors.neutral.gray[800] }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.hoverColor} rounded-lg opacity-0 group-hover:opacity-100 ${transitions.base}`}></div>
                  <div className={`relative flex items-center justify-center ${transitions.base}`} style={{ color: colors.neutral.gray[400] }}>
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium relative inline-block" style={{ color: colors.neutral.white }}>
              Quick Links
              <div className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => onNavigateTo && onNavigateTo(link.page)}
                    className={`flex items-center gap-2 group text-sm ${transitions.base}`}
                    style={{ color: colors.neutral.gray[400], background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    onMouseEnter={(e) => e.currentTarget.style.color = colors.primary.orange}
                    onMouseLeave={(e) => e.currentTarget.style.color = colors.neutral.gray[400]}
                  >
                    <span className="w-0 group-hover:w-1.5 h-0.5 transition-all duration-300" style={{ backgroundColor: colors.primary.orange }}></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium relative inline-block" style={{ color: colors.neutral.white }}>
              Get in Touch
              <div className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></div>
            </h4>
            <ul className="space-y-2">
              {/* Address */}
              <li className="flex items-start gap-2" style={{ color: colors.neutral.gray[400] }}>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: colors.neutral.gray[800] }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.primary.orange }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-xs leading-snug">
                  Jalan Jombor Poka, RT.01/RW.01<br />
                  Jayan, Jombor, Kec. Ceper<br />
                  Kabupaten Klaten, Jawa Tengah 57465
                </p>
              </li>

              {/* Email */}
              <li className="flex items-center gap-2" style={{ color: colors.neutral.gray[400] }}>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colors.neutral.gray[800] }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.primary.orange }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a 
                  href="mailto:info@globalindo-intimates.com" 
                  className={`text-xs ${transitions.base}`}
                  style={{ color: colors.neutral.gray[400] }}
                  onMouseEnter={(e) => e.currentTarget.style.color = colors.primary.orange}
                  onMouseLeave={(e) => e.currentTarget.style.color = colors.neutral.gray[400]}
                >
                  info@globalindo-intimates.com
                </a>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-2" style={{ color: colors.neutral.gray[400] }}>
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: colors.neutral.gray[800] }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.primary.orange }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a 
                  href="tel:+62212301120" 
                  className={`text-xs ${transitions.base}`}
                  style={{ color: colors.neutral.gray[400] }}
                  onMouseEnter={(e) => e.currentTarget.style.color = colors.primary.orange}
                  onMouseLeave={(e) => e.currentTarget.style.color = colors.neutral.gray[400]}
                >
                  +62 212 301120
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" style={{ borderColor: colors.neutral.gray[700] }}></div>
          </div>
          <div className="relative flex justify-center">
            <span style={{ backgroundColor: colors.neutral.gray[900] }} className="px-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs mb-6" style={{ color: colors.neutral.gray[400] }}>
          <div className="flex items-center gap-2">
            <span>&copy; {currentYear} PT. Globalindo Intimates.</span>
            <span className="hidden md:inline">|</span>
            <span>All rights reserved.</span>
          </div>
          <div className="flex gap-4">
            <a 
              href="#privacy" 
              className={transitions.base}
              style={{ color: colors.neutral.gray[400] }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.primary.orange}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.neutral.gray[400]}
            >
              Privacy Policy
            </a>
            <span>|</span>
            <a 
              href="#terms" 
              className={transitions.base}
              style={{ color: colors.neutral.gray[400] }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.primary.orange}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.neutral.gray[400]}
            >
              Terms of Service
            </a>
            <span>|</span>
            <a 
              href="#sitemap" 
              className={transitions.base}
              style={{ color: colors.neutral.gray[400] }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.primary.orange}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.neutral.gray[400]}
            >
              Sitemap
            </a>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="flex justify-center">
          <button 
            onClick={scrollToTop}
            className={`group w-10 h-10 bg-orange-600 hover:bg-orange-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 border-none cursor-pointer`}
            style={{ backgroundColor: colors.primary.orange }}
            title="Back to Top"
          >
            <svg className="w-5 h-5 text-white group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: colors.neutral.white }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;