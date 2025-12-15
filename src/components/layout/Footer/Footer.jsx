import React from "react";
import { Instagram, Linkedin, Youtube, MapPin, Mail, Phone } from "lucide-react";

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

const Footer = () => {
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

  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: colors.neutral.gray[900] }}>

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-orange-500 to-blue-600"></div>

      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-6xl py-16 relative z-10">

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-12">

          {/* Company Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <img 
                src="/images/logo/icon.PNG"
                alt="Globalindo Intimates Logo"
                className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
              />
              <div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  PT. Globalindo Intimates
                </h3>
                <p className="text-xs" style={{ color: colors.neutral.gray[400] }}>
                  Quality In Every Single Stitch
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: colors.neutral.gray[400] }}>
              Achieving Global Quality with Technology Empowering The Surrounding Society
            </p>

            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center ${transitions.base} transform hover:-translate-y-1 hover:shadow-lg`}
                  title={social.name}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${social.hoverColor} rounded-lg opacity-0 group-hover:opacity-100 ${transitions.base}`}></div>
                  <div className="relative flex items-center justify-center" style={{ color: colors.neutral.gray[400] }}>
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            {/* Contact Info Column */}
            <div className="space-y-6">
              <h4 className="text-sm font-semibold" style={{ color: colors.neutral.white }}>
                Get in Touch
              </h4>
              
              {/* Address */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(249, 115, 22, 0.15)' }}>
                  <MapPin className="w-5 h-5" style={{ color: colors.primary.orange }} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium mb-1" style={{ color: colors.neutral.gray[400] }}>
                    Address
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: colors.neutral.gray[400] }}>
                    Jalan Jombor Poka, RT.01/RW.01<br />
                    Jayan, Jombor, Kec. Ceper<br />
                    Kabupaten Klaten, Jawa Tengah 57465
                  </p>
                </div>
              </div>

              {/* Email */}
              <a 
                href="mailto:info@globalindo-intimates.com"
                className={`flex gap-3 group ${transitions.base} hover:opacity-80`}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(249, 115, 22, 0.15)' }}>
                  <Mail className="w-5 h-5" style={{ color: colors.primary.orange }} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium mb-1" style={{ color: colors.neutral.gray[400] }}>
                    Email
                  </p>
                  <p className="text-xs group-hover:text-orange-500 transition-colors" style={{ color: colors.neutral.gray[400] }}>
                    info@globalindo-intimates.com
                  </p>
                </div>
              </a>
            </div>

            {/* Phone Section */}
            <div className="space-y-6">
              <div className="h-9"></div>
              
              <a 
                href="tel:+62212301120"
                className={`flex gap-3 group ${transitions.base} hover:opacity-80`}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(249, 115, 22, 0.15)' }}>
                  <Phone className="w-5 h-5" style={{ color: colors.primary.orange }} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium mb-1" style={{ color: colors.neutral.gray[400] }}>
                    Phone
                  </p>
                  <p className="text-xs group-hover:text-orange-500 transition-colors" style={{ color: colors.neutral.gray[400] }}>
                    +62 212 301120
                  </p>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="h-px" style={{ backgroundColor: 'rgba(156, 163, 175, 0.2)' }}></div>

        {/* Footer Bottom */}
        <div className="pt-8 text-center text-xs" style={{ color: colors.neutral.gray[400] }}>
          © {currentYear} PT. Globalindo Intimates. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;