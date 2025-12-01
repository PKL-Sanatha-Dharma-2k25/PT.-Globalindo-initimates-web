import React, { useState, useEffect } from "react";
import { Award, Package, Users, Target, Building, ArrowRight, Zap, BarChart3, Bot, AlertCircle, Users2, Lightbulb, Grid3x3, Sparkles, Clock, BookOpen, Play } from "lucide-react";

const CompanyOverview = ({ onNavigateTo }) => {
  const [productImageIndex, setProductImageIndex] = useState({ 1: 0, 2: 0 });
  const [activeStats, setActiveStats] = useState(0);
  const [showVideoOverlay, setShowVideoOverlay] = useState(true);
  const [isVideoPaused, setIsVideoPaused] = useState(true);

  const products = [
    {
      id: 1,
      images: ["../images/Product/out1.jpg", "./images/Product/out2.jpg"],
      title: "Outerwear",
      description: "Bra & shapewear, sportswear, swimwear, activewear, and performance garments"
    },
    {
      id: 2,
      images: ["../images/Product/u1.jpg", "./images/Product/u2.JPG"],
      title: "Underwear",
      description: "Women's and men's underwear, period panty, plus size collections, briefs, boxers"
    }
  ];

  const customers = [
    { name: "Vanity Fair", logo: "https://i.pinimg.com/1200x/10/db/39/10db39d79b53d6a8e987cd59d0ed3bb3.jpg" },
    { name: "Levi's", logo: "https://i.pinimg.com/736x/87/fa/15/87fa15c38ff06ac69582263bbeaad6d5.jpg" },
    { name: "Fila", logo: "https://i.pinimg.com/1200x/24/d0/d1/24d0d14bca8f0ed3b80106affa350948.jpg" },
    { name: "Hanes Brand", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Hanes-logo.svg" },
    { name: "AAI", logo: "https://images.seeklogo.com/logo-png/37/1/aai-logo-png_seeklogo-374345.png" },
    { name: "WOLF", logo: "https://www.wolf-garten.eu/sites/g/files/xnuzat2486/files/WOLF-Garten.png" },
  ];

  const technologies = [
    { title: "Automatic Cutting", icon: Zap, desc: "Computer-controlled fabric cutting" },
    { title: "Real-Time Monitoring", icon: BarChart3, desc: "Sewing line productivity tracking" },
    { title: "AGV Robot", icon: Bot, desc: "Automated material delivery" },
    { title: "Metal Detector", icon: AlertCircle, desc: "Quality assurance system" }
  ];

  const culturalValues = [
    { title: "Always Teamwork", icon: Users2, description: "Work in team for better results" },
    { title: "Think Positive", icon: Lightbulb, description: "Positive mindset for solutions" },
    { title: "Set In Order", icon: Grid3x3, description: "Organized and efficient workspace" },
    { title: "Shine", icon: Sparkles, description: "Maintain cleanliness and excellence" },
    { title: "On Time", icon: Clock, description: "Discipline and professionalism" },
    { title: "Always Learning", icon: BookOpen, description: "Continuous growth and development" }
  ];

  const stats = [
    { label: "Founded Year", value: "2008" },
    { label: "Global Countries", value: "50+" },
    { label: "Total Employees", value: "3,800+" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProductImageIndex(prev => ({
        1: (prev[1] + 1) % products[0].images.length,
        2: (prev[2] + 1) % products[1].images.length
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStats((prev) => (prev + 1) % stats.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const BLUE = "#0D1B66";
  const ORANGE = "#FF6600";

  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap');

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Playfair Display', serif;
        }

        body, p, span, button, div {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes scrollRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-ring {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(255, 102, 0, 0.7);
          }
          50% { 
            box-shadow: 0 0 0 15px rgba(255, 102, 0, 0);
          }
        }

        @keyframes scale-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .animate-fade-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-pulse-ring {
          animation: pulse-ring 2s infinite;
        }

        .carousel-track-right {
          animation: scrollRight 20s linear infinite;
        }

        .tech-card {
          transition: all 0.3s ease;
          border: 1px solid rgba(13, 27, 102, 0.15);
        }

        .tech-card:hover {
          border-color: ${ORANGE};
          background: rgba(255, 102, 0, 0.05);
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(255, 102, 0, 0.15);
        }

        .culture-card {
          border: 1px solid rgba(13, 27, 102, 0.1);
          transition: all 0.3s ease;
        }

        .culture-card:hover {
          border-color: ${ORANGE};
          background: rgba(255, 102, 0, 0.03);
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(255, 102, 0, 0.1);
        }

        .stat-card {
          background: rgba(13, 27, 102, 0.08);
          border: 1px solid rgba(13, 27, 102, 0.2);
          transition: all 0.5s ease;
        }

        .stat-card.active {
          border-color: ${ORANGE};
          background: rgba(255, 102, 0, 0.12);
          box-shadow: 0 0 20px rgba(255, 102, 0, 0.2);
          transform: scale(1.03);
        }

        .btn-primary {
          background: ${ORANGE};
          transition: all 0.3s ease;
          box-shadow: 0 6px 16px rgba(255, 102, 0, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(255, 102, 0, 0.4);
        }

        .btn-secondary {
          border: 1.5px solid ${ORANGE};
          color: ${ORANGE};
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: rgba(255, 102, 0, 0.05);
        }

        .feature-badge {
          background: rgba(13, 27, 102, 0.08);
          border: 1px solid rgba(13, 27, 102, 0.2);
        }

        .product-card {
          background: white;
          border: 1px solid rgba(13, 27, 102, 0.1);
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .product-card:hover {
          border-color: ${ORANGE};
          transform: translateY(-6px);
          box-shadow: 0 12px 24px rgba(255, 102, 0, 0.12);
        }

        .gradient-text {
          color: ${ORANGE};
        }

        .play-button {
          animation: pulse-ring 2s infinite;
        }

        .video-overlay {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>

      {/* HERO SECTION */}
      <section className="relative py-12 md:py-16 bg-white pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 mb-4 feature-badge px-3 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ORANGE }}></div>
                <span className="text-xs uppercase tracking-wide font-medium" style={{ color: BLUE }}>Industry 4.0 Lighthouse Project 2019</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-3 text-gray-900">
                PT. Globalindo <br />
                <span className="gradient-text font-light">Intimates</span>
              </h1>

              <p className="text-sm md:text-base text-gray-700 mb-5 leading-relaxed font-light">
                Achieving Global Quality with Technology & Empowering The Surrounding Society. A manufacturer of women's underwear, reusable pads, men's underwear, t-shirts, camisoles, swimwear, hoodies, kids wear, and hospital uniforms focused on safety, high quality, and sizes for every shape.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-5">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className={`stat-card p-3 rounded-lg text-center transition-all ${
                      activeStats === idx ? "active" : ""
                    }`}
                  >
                    <div className="text-xl md:text-2xl font-light mb-1" style={{ color: ORANGE }}>{stat.value}</div>
                    <div className="text-xs font-light" style={{ color: BLUE }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <button onClick={() => onNavigateTo('company-profile')} className="btn-primary px-6 py-2.5 text-white font-medium text-sm rounded-lg inline-flex items-center gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="relative animate-float" style={{ animationDelay: "0.3s" }}>
              <div className="relative rounded-2xl overflow-hidden border-2 group" style={{ borderColor: BLUE, boxShadow: `0 0 30px rgba(13, 27, 102, 0.2)` }}>
                {/* Orange Gradient Overlay - Full Left Side Top to Bottom */}
                {isVideoPaused && (
                  <div className="absolute inset-0 z-10 pointer-events-none" style={{
                    background: 'linear-gradient(to right, rgba(255, 102, 0, 0.8) 0%, rgba(255, 102, 0, 0.5) 30%, rgba(255, 102, 0, 0) 60%)',
                    height: '100%',
                    top: '0%'
                  }}></div>
                )}

                {/* Play Button Overlay */}
                {showVideoOverlay && isVideoPaused && (
                  <div 
                    className="absolute inset-0 z-20 flex items-center justify-center bg-black/30 cursor-pointer video-overlay transition-all hover:bg-black/40"
                    onClick={() => {
                      setShowVideoOverlay(false);
                      setIsVideoPaused(false);
                    }}
                  >
                    <div className="relative">
                      <div 
                        className="play-button w-20 h-20 rounded-full bg-white text-orange-500 flex items-center justify-center shadow-2xl transform transition-transform hover:scale-110"
                      >
                        <Play className="w-10 h-10 fill-current ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-6 right-6 text-white text-sm font-medium bg-orange-500 px-3 py-1 rounded-full">
                      Click to Play
                    </div>
                  </div>
                )}

                <div style={{ paddingBottom: "56.25%" }} className="relative w-full">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={!isVideoPaused ? "https://www.youtube-nocookie.com/embed/jEWGb2kieic?autoplay=1&controls=1" : "https://www.youtube-nocookie.com/embed/jEWGb2kieic?autoplay=0&controls=1"}
                    title="Company Profile"
                    frameBorder="0"
                    allowFullScreen
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-10" style={{ backgroundColor: ORANGE }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="relative py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="mb-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 mb-3 feature-badge px-3 py-1.5 rounded-full">
              <Package className="w-3.5 h-3.5" style={{ color: ORANGE }} />
              <span className="text-xs font-medium uppercase tracking-wide" style={{ color: BLUE }}>Our Collections</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-2 text-gray-900">
              Innovation in Every <span className="gradient-text">Stitch</span>
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl font-light">
              Advanced fabrics, superior design, and sustainability in every piece
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
            {products.map((product, idx) => (
              <div key={product.id} className="group animate-fade-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                <div className="product-card rounded-xl overflow-hidden">
                  <div className="relative h-56 md:h-64 overflow-hidden bg-gray-200">
                    <img
                      src={product.images[productImageIndex[product.id]]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">{product.title}</h3>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light">{product.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => onNavigateTo('products')} className="btn-primary px-6 py-2.5 text-white font-medium text-sm rounded-lg inline-flex items-center gap-2">
              View All Products
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* TECH SECTION */}
      <section className="relative py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="mb-8 animate-fade-up">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-2 text-gray-900">
              Production <span className="gradient-text">Technology</span>
            </h2>
            <p className="text-sm md:text-base text-gray-600 font-light">Industry 4.0 advanced manufacturing systems</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
            {technologies.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div key={idx} className="tech-card p-4 md:p-5 rounded-lg group animate-fade-up" style={{ animationDelay: `${idx * 0.08}s` }}>
                  <div className="mb-3 inline-block p-2.5 rounded-lg transition-all" style={{ backgroundColor: `rgba(255, 102, 0, 0.1)` }}>
                    <Icon className="w-6 h-6" style={{ color: ORANGE }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1">{tech.title}</h3>
                  <p className="text-xs text-gray-600 font-light leading-relaxed">{tech.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button onClick={() => onNavigateTo('facilities')} className="btn-primary px-6 py-2.5 text-white font-medium text-sm rounded-lg inline-flex items-center gap-2">
              Explore More
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* BRANDS CAROUSEL */}
      <section className="relative py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 mb-8">
          <div className="text-center mb-10 animate-fade-up">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-2 text-gray-900">
              Trusted By <span className="gradient-text">Global Brands</span>
            </h2>
            <p className="text-sm md:text-base text-gray-600 font-light">Collaborating with world-renowned companies</p>
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="flex gap-6 carousel-track-right">
            {[...customers, ...customers, ...customers].map((customer, idx) => (
              <div key={idx} className="flex-shrink-0 w-32">
                <div className="flex items-center justify-center h-20 rounded-lg bg-white border p-3 hover:scale-105 transition-all" style={{ borderColor: `rgba(13, 27, 102, 0.15)` }}>
                  <img
                    src={customer.logo}
                    alt={customer.name}
                    className="h-10 object-contain opacity-65 hover:opacity-90 transition-opacity"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARKET REACH SECTION */}
      <section className="relative py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="mb-8 animate-fade-up flex justify-between items-start gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-2 text-gray-900">
                Global <span className="gradient-text">Market Reach</span>
              </h2>
              <p className="text-sm md:text-base text-gray-600 font-light">Distribution across key international markets</p>
            </div>
            <button onClick={() => onNavigateTo('market')} className="btn-primary px-6 py-2.5 text-white font-medium text-sm rounded-lg inline-flex items-center gap-2 whitespace-nowrap">
              View Markets
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 md:p-6 rounded-lg text-center border transition-all hover:scale-105" style={{ borderColor: `rgba(13, 27, 102, 0.1)`, boxShadow: `0 2px 8px rgba(0, 0, 0, 0.04)` }}>
              <div className="text-4xl md:text-5xl font-light mb-2" style={{ color: ORANGE }}>60%</div>
              <p className="text-base md:text-lg font-medium text-gray-900">USA</p>
            </div>
            <div className="p-5 md:p-6 rounded-lg text-center border transition-all hover:scale-105" style={{ borderColor: `rgba(13, 27, 102, 0.1)`, boxShadow: `0 2px 8px rgba(0, 0, 0, 0.04)` }}>
              <div className="text-4xl md:text-5xl font-light mb-2" style={{ color: ORANGE }}>30%</div>
              <p className="text-base md:text-lg font-medium text-gray-900">Korea</p>
            </div>
            <div className="p-5 md:p-6 rounded-lg text-center border transition-all hover:scale-105" style={{ borderColor: `rgba(13, 27, 102, 0.1)`, boxShadow: `0 2px 8px rgba(0, 0, 0, 0.04)` }}>
              <div className="text-4xl md:text-5xl font-light mb-2" style={{ color: ORANGE }}>10%</div>
              <p className="text-base md:text-lg font-medium text-gray-900">Europe</p>
            </div>
          </div>
        </div>
      </section>

      {/* CULTURE SECTION */}
      <section className="relative py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="mb-8 animate-fade-up">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-2 text-gray-900">
              Company <span className="gradient-text">Culture</span>
            </h2>
            <p className="text-sm md:text-base text-gray-600 font-light">Six values that guide our daily operations</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {culturalValues.map((culture, idx) => {
              const Icon = culture.icon;
              return (
                <div key={idx} className="culture-card p-4 md:p-5 rounded-lg text-center animate-fade-up" style={{ animationDelay: `${idx * 0.08}s` }}>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 transition-all" style={{ backgroundColor: `rgba(13, 27, 102, 0.1)` }}>
                    <Icon className="w-6 h-6" style={{ color: ORANGE }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm md:text-base font-medium text-gray-900 mb-2">{culture.title}</h3>
                  <p className="text-xs text-gray-600 font-light leading-relaxed">{culture.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center relative z-10 animate-fade-up">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-3 text-gray-900">
            Ready to Partner <span className="gradient-text">With Us?</span>
          </h2>
          <p className="text-sm md:text-base text-gray-700 mb-6 max-w-2xl mx-auto font-light">
            Join global brands trusting PT. Globalindo Intimates for quality manufacturing
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => onNavigateTo('contact')} className="btn-primary px-6 py-2.5 text-white font-medium text-sm rounded-lg inline-flex items-center justify-center gap-2">
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => onNavigateTo('catalog')} className="btn-secondary px-6 py-2.5 font-medium text-sm rounded-lg transition-all">
              Download Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyOverview;