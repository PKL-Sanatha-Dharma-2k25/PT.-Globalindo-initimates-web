import React from "react";
import bgImage from "/images/BgHero/bg1.png";

// ========================================
// ✅ FIXED: Import dari @/constants bukan @/styles
// ========================================
import designTokens from '@/constants/designTokens';

const AboutSection = () => {
  return (
    <>
      <style>
        {`
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Playfair Display', serif;
          }
          body, p, span, button, div {
            font-family: 'Lato', sans-serif;
          }
        `}
      </style>
      <section id="about" className="section-padding relative overflow-hidden">
        
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${import.meta.env.VITE_BASE_URL + bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.20
          }}
        >
          <div className="absolute inset-0 bg-white/20 md:bg-transparent"></div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-gray-50/90 md:from-white/90 md:to-gray-50/90 z-0"></div>
        
        {/* Content */}
        <div className="relative z-10">
          {/* Container dengan max-width optimal */}
          <div className={designTokens.spacing.container.default}>
            
            {/* ===== STYLED HEADER (Simple & Clean Style) ===== */}
            <div className="mb-16 md:mb-20">
              {/* Subtitle Label */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-orange-600"></div>
                <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">About Us</span>
              </div>
              
              {/* Main Title - SAMA SEPERTI PRODUCT SECTION */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Get to Know <span className="text-orange-600">PT. Globalindo</span>
              </h2>

              {/* Decorative Lines - SAMA SEPERTI PRODUCT SECTION */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-1 w-20 bg-gradient-to-r from-orange-600 via-blue-900 to-transparent rounded-full"></div>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-900 to-transparent rounded-full"></div>
              </div>
              
              {/* Subtitle */}
              <p className="text-lg text-gray-600 max-w-xl font-light">
                A trusted leader in intimate apparel manufacturing with commitment to quality, innovation, and sustainability
              </p>
            </div>

            {/* Grid optimized dengan spacing yang pas */}
            <div className={`${designTokens.grids.twoCol.container} items-start`}>
              
              {/* ========================================
                  LEFT COLUMN
                  ======================================== */}
              <div className={designTokens.spacing.stack.lg}>
                
                {/* Video Section - Max width untuk control ukuran */}
                <div className={`relative group overflow-hidden rounded-xl md:rounded-2xl shadow-xl bg-gray-900 ${designTokens.maxWidths.wide} mx-auto`}>
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-xl md:rounded-2xl"
                      src="https://www.youtube-nocookie.com/embed/jEWGb2kieic?autoplay=1&mute=1&loop=1&playlist=jEWGb2kieic&controls=1&modestbranding=1&rel=0"
                      title="PT. Globalindo Intimates Company Profile"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl md:rounded-2xl"></div>
                </div>

                {/* Vision & Mission */}
                <div className={designTokens.spacing.stack.md}>
                  
                  {/* Vision Box */}
                  <div className={`${designTokens.cards.feature.container} hover:border-blue-200 mx-auto w-full`}>
                    <div className={designTokens.presets.cardHeader.container}>
                      {/* Icon size controlled */}
                      <div className={designTokens.presets.cardHeader.iconBlue}>
                        <svg className={`${designTokens.iconBox.iconMd} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                      <h3 className="text-blue-900 font-bold text-lg md:text-xl">Our Vision</h3>
                    </div>
                    {/* Typography optimized */}
                    <p className={`${designTokens.typography.bodyBase} text-gray-600`}>
                      To become a global company in the garment industry that always makes continuous improvement in aspects of quality, work safety and security as well as legality with an orientation towards long-term relationships that are mutually beneficial.
                    </p>
                  </div>

                  {/* Mission Box */}
                  <div className={`${designTokens.cards.feature.container} hover:border-orange-200 mx-auto w-full`}>
                    <div className={designTokens.presets.cardHeader.container}>
                      <div className={designTokens.presets.cardHeader.iconOrange}>
                        <svg className={`${designTokens.iconBox.iconMd} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-orange-600 font-bold text-lg md:text-xl">Our Mission</h3>
                    </div>
                    <div className={`${designTokens.typography.bodyBase} text-gray-600 space-y-2`}>
                      <p className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>
                        <span>Keeping better quality working environment & culture to produce excellent products.</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>
                        <span>Transforming to the new era of technology with Automation and digitalization.</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <span className="text-orange-500 mt-0.5 flex-shrink-0">•</span>
                        <span>Sustainable eco-friendly company, beneficiating surrounding communities.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================
                  RIGHT COLUMN
                  ======================================== */}
              <div className={designTokens.spacing.stack.lg}>
                
                {/* Who We Are */}
                <div className={`bg-gradient-to-br from-blue-50 to-white p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl border border-blue-100 ${designTokens.maxWidths.wide} mx-auto w-full`}>
                  <h3 className={`${designTokens.typography.h3} text-gray-800 mb-3 md:mb-4 flex items-center gap-2.5`}>
                    <span className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></span>
                    WHO WE ARE
                  </h3>
                  <p className={`${designTokens.typography.bodyBase} text-gray-700 mb-3`}>
                    <span className="text-orange-500 font-bold">PT. Globalindo Intimates</span> is a garment manufacturer producing women's and men's underwear, reusable pads, t-shirts, camisoles, swimwear, hoodies, kids wear, and hospital uniforms with a focus on safety, quality, and inclusivity for all sizes.
                  </p>
                  <p className={`${designTokens.typography.bodyBase} text-gray-700`}>
                    In 2018, the company began its digital transformation by upgrading machines with Industry 4.0 technology, and in 2019 was recognized by the Indonesian Ministry of Industry as a <span className="font-semibold text-blue-900">Lighthouse Industry 4.0 project</span>.
                  </p>
                </div>

                {/* Factory Cards - Grid optimized dengan justify-items-center */}
                <div className={designTokens.grids.twoCol.factory}>
                  
                  {/* ========================================
                      FACTORY 1
                      ======================================== */}
                  <div className={`${designTokens.cards.info.container} w-full`}>
                    <div className="text-center py-3">
                      <span className={designTokens.badges.orange}>Factory 1</span>
                    </div>
                    
                    <div className={`p-3 md:p-4 ${designTokens.cards.info.gap}`}>
                      
                      {/* Info Items dengan spacing optimal */}
                      <div className={`${designTokens.cards.infoItem.container} ${designTokens.cards.infoItem.padding} ${designTokens.cards.infoItem.orange}`}>
                        <div className="flex items-center gap-2">
                          <div className={`${designTokens.iconBox.sm} ${designTokens.iconBox.base}`}>
                            <svg className={`${designTokens.iconBox.iconSm} text-orange-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={`${designTokens.typography.bodySm} text-gray-500 block`}>Operation</span>
                            <p className={`${designTokens.typography.bodyBase} font-bold text-gray-800`}>2008</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`${designTokens.cards.infoItem.container} ${designTokens.cards.infoItem.padding} ${designTokens.cards.infoItem.orange}`}>
                        <div className="flex items-center gap-2">
                          <div className={`${designTokens.iconBox.sm} ${designTokens.iconBox.base}`}>
                            <svg className={`${designTokens.iconBox.iconSm} text-orange-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={`${designTokens.typography.bodySm} text-gray-500 block`}>Factory Area</span>
                            <p className={`${designTokens.typography.bodyBase} font-bold text-gray-800`}>32,000 m²</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`${designTokens.cards.infoItem.container} ${designTokens.cards.infoItem.padding} ${designTokens.cards.infoItem.orange}`}>
                        <div className="flex items-center gap-2">
                          <div className={`${designTokens.iconBox.sm} ${designTokens.iconBox.base}`}>
                            <svg className={`${designTokens.iconBox.iconSm} text-orange-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={`${designTokens.typography.bodySm} text-gray-500 block`}>Building Area</span>
                            <p className={`${designTokens.typography.bodyBase} font-bold text-gray-800`}>17,500 m²</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`${designTokens.cards.infoItem.container} ${designTokens.cards.infoItem.padding} ${designTokens.cards.infoItem.orange}`}>
                        <div className="flex items-center gap-2">
                          <div className={`${designTokens.iconBox.sm} ${designTokens.iconBox.base}`}>
                            <svg className={`${designTokens.iconBox.iconSm} text-orange-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={`${designTokens.typography.bodySm} text-gray-500 block`}>Employees</span>
                            <p className={`${designTokens.typography.bodyBase} font-bold text-gray-800`}>3,000</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`${designTokens.cards.infoItem.container} ${designTokens.cards.infoItem.padding} ${designTokens.cards.infoItem.orange}`}>
                        <div className="flex gap-2">
                          <div className={`${designTokens.iconBox.sm} ${designTokens.iconBox.base}`}>
                            <svg className={`${designTokens.iconBox.iconSm} text-orange-500`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`${designTokens.typography.bodySm} text-gray-500 font-semibold mb-1`}>Location</p>
                            <p className={`${designTokens.typography.bodySm} text-gray-600`}>
                              Jl. Raya Jogja Solo, Jombar, Ceper, Klaten Regency, Central Java 57465, Indonesia
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ========================================
                      FACTORY 2
                      ======================================== */}
                  <div className={`${designTokens.cards.info.container} w-full`}>
                    <div className="text-center py-3">
                      <span className={designTokens.badges.blue}>Factory 2</span>
                    </div>
                    
                    <div className={`p-3 md:p-4 ${designTokens.cards.info.gap}`}>
                      <div className={`${designTokens.cards.infoItem.container} ${designTokens.cards.infoItem.padding} ${designTokens.cards.infoItem.blue}`}>
                        <div className="flex items-center gap-2">
                          <div className={`${designTokens.iconBox.sm} ${designTokens.iconBox.base}`}>
                            <svg className={`${designTokens.iconBox.iconSm} text-blue-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={`${designTokens.typography.bodySm} text-gray-500 block`}>Operation</span>
                            <p className={`${designTokens.typography.bodyBase} font-bold text-gray-800`}>2013</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`${designTokens.cards.infoItem.container} ${designTokens.cards.infoItem.padding} ${designTokens.cards.infoItem.blue}`}>
                        <div className="flex items-center gap-2">
                          <div className={`${designTokens.iconBox.sm} ${designTokens.iconBox.base}`}>
                            <svg className={`${designTokens.iconBox.iconSm} text-blue-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={`${designTokens.typography.bodySm} text-gray-500 block`}>Factory Area</span>
                            <p className={`${designTokens.typography.bodyBase} font-bold text-gray-800`}>23,876 m²</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`${designTokens.cards.infoItem.container} ${designTokens.cards.infoItem.padding} ${designTokens.cards.infoItem.blue}`}>
                        <div className="flex items-center gap-2">
                          <div className={`${designTokens.iconBox.sm} ${designTokens.iconBox.base}`}>
                            <svg className={`${designTokens.iconBox.iconSm} text-blue-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={`${designTokens.typography.bodySm} text-gray-500 block`}>Building Area</span>
                            <p className={`${designTokens.typography.bodyBase} font-bold text-gray-800`}>12,634.5 m²</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`${designTokens.cards.infoItem.container} ${designTokens.cards.infoItem.padding} ${designTokens.cards.infoItem.blue}`}>
                        <div className="flex items-center gap-2">
                          <div className={`${designTokens.iconBox.sm} ${designTokens.iconBox.base}`}>
                            <svg className={`${designTokens.iconBox.iconSm} text-blue-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className={`${designTokens.typography.bodySm} text-gray-500 block`}>Employees</span>
                            <p className={`${designTokens.typography.bodyBase} font-bold text-gray-800`}>800</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className={`${designTokens.cards.infoItem.container} ${designTokens.cards.infoItem.padding} ${designTokens.cards.infoItem.blue}`}>
                        <div className="flex gap-2">
                          <div className={`${designTokens.iconBox.sm} ${designTokens.iconBox.base}`}>
                            <svg className={`${designTokens.iconBox.iconSm} text-blue-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`${designTokens.typography.bodySm} text-gray-500 font-semibold mb-1`}>Location</p>
                            <p className={`${designTokens.typography.bodySm} text-gray-600`}>
                              Jl. Raya Jogja Solo, Ngaran, Mlese, Klaten Regency, Central Java 57465, Indonesia
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;