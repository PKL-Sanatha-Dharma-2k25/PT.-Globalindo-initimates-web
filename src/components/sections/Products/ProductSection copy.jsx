import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Sparkles, Package, Shield, Zap, Star, Award } from "lucide-react";

// ========================================
// IMPORT DESIGN TOKENS (Simulated)
// ========================================
const designTokens = {
  maxWidths: {
    content: 'max-w-7xl',
    narrow: 'max-w-5xl',
    wide: 'max-w-[1440px]',
    factoryCard: 'max-w-[420px]',
    cardMd: 'max-w-md',
    cardLg: 'max-w-lg',
    prose: 'max-w-prose',
  },
  typography: {
    h1: 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold',
    h2: 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold',
    h3: 'text-lg sm:text-xl lg:text-2xl font-bold',
    h4: 'text-base sm:text-lg lg:text-xl font-bold',
    bodyLg: 'text-sm md:text-base lg:text-lg leading-relaxed',
    bodyBase: 'text-xs md:text-sm lg:text-base leading-relaxed',
    bodySm: 'text-[10px] md:text-xs lg:text-sm leading-relaxed',
    label: 'text-xs md:text-sm font-medium',
    caption: 'text-[10px] md:text-xs text-gray-500',
  },
  spacing: {
    section: {
      py: 'py-10 md:py-14 lg:py-20 xl:py-24',
      mb: 'mb-6 md:mb-8 lg:mb-10 xl:mb-12',
    },
    container: {
      default: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
      narrow: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl',
      wide: 'container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]',
    },
    stack: {
      xs: 'space-y-2 md:space-y-2.5',
      sm: 'space-y-3 md:space-y-4',
      md: 'space-y-4 md:space-y-5 lg:space-y-6',
      lg: 'space-y-5 md:space-y-6 lg:space-y-8',
      xl: 'space-y-6 md:space-y-8 lg:space-y-10',
    },
    gridGap: {
      sm: 'gap-3 md:gap-4',
      md: 'gap-4 md:gap-5',
      lg: 'gap-6 md:gap-8',
      xl: 'gap-8 md:gap-10 lg:gap-12',
    },
  },
  cards: {
    feature: {
      container: 'card-feature max-w-2xl',
      gap: 'space-y-3 md:space-y-4',
    },
    info: {
      container: 'card-info max-w-[420px]',
      gap: 'space-y-2 md:space-y-2.5',
    },
    infoItem: {
      container: 'rounded-lg border',
      padding: 'p-2 md:p-2.5 lg:p-3',
      blue: 'bg-blue-50 border-blue-100',
      orange: 'bg-orange-50 border-orange-100',
    },
  },
  iconBox: {
    sm: 'w-7 h-7 md:w-8 md:h-8',
    md: 'w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10',
    iconSm: 'w-3.5 h-3.5 md:w-4 md:h-4',
    iconMd: 'w-4 h-4 md:w-5 md:h-5',
    base: 'bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm',
  },
  buttons: {
    primary: {
      blue: 'btn-primary-blue',
      orange: 'btn-primary-orange',
    },
    outline: 'btn-outline',
  },
  badges: {
    blue: 'inline-block bg-blue-900 text-white px-5 py-1.5 rounded-full font-bold text-sm',
    orange: 'inline-block bg-orange-500 text-white px-5 py-1.5 rounded-full font-bold text-sm',
    outline: {
      blue: 'inline-block border-2 border-blue-900 text-blue-900 px-5 py-1.5 rounded-full font-bold text-sm',
      orange: 'inline-block border-2 border-orange-500 text-orange-500 px-5 py-1.5 rounded-full font-bold text-sm',
    },
  },
  gradients: {
    text: {
      blue: 'gradient-text-blue',
      orange: 'gradient-text-orange',
    },
  },
  presets: {
    sectionHeader: {
      title: 'text-2xl sm:text-3xl md:text-4xl font-bold gradient-text-blue mb-2',
      subtitle: 'text-sm md:text-base text-gray-600',
      container: 'mb-8 md:mb-10 lg:mb-12',
    },
    cardHeader: {
      container: 'flex items-center gap-2.5 md:gap-3 mb-3',
      iconBlue: 'w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0',
      iconOrange: 'w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0',
    },
  },
  animations: {
    basic: {
      fadeIn: 'animate-fadeIn',
      slideUp: 'animate-slideUp',
    },
    hero: {
      float: 'animate-float',
      floatDelayed: 'animate-float-delayed',
      floatSlow: 'animate-float-slow',
    },
  },
};

// ========================================
// PRODUCT DATA
// ========================================
const products = [
  {
    id: 1,
    name: "Period Panty",
    image: import.meta.env.VITE_BASE_URL + "/images/Product/Picture1.png",
    category: "intimates",
    description: "Premium period panty with advanced leak-proof technology. Made from soft, breathable fabric that provides maximum comfort and protection during your cycle.",
    features: ["Leak-proof protection", "Ultra-soft fabric", "Breathable material", "Easy to wash"],
    additionalImages: [
      import.meta.env.VITE_BASE_URL + "/images/Product/Picture1.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/Picture1-2.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/Picture1-3.png"
    ],
    badge: "Bestseller",
    color: "blue"
  },
  {
    id: 2,
    name: "Ladies Underwear",
    image: import.meta.env.VITE_BASE_URL + "/images/Product/Picture4.png",
    category: "intimates",
    description: "Comfortable ladies underwear crafted from premium materials. Designed to provide all-day comfort with excellent breathability and perfect fit.",
    features: ["Soft material", "Breathable design", "Perfect fit", "Long-lasting quality"],
    additionalImages: [
      import.meta.env.VITE_BASE_URL + "/images/Product/Picture4.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/Picture4-2.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/Picture4-3.png"
    ],
    badge: "Bestseller",
    color: "orange"
  },
  {
    id: 3,
    name: "Ladies Bra",
    image: import.meta.env.VITE_BASE_URL + "/images/Product/Picture2.png",
    category: "intimates",
    description: "Premium ladies bra with superior support and comfort. Features adjustable straps and wire-free design for maximum comfort throughout the day.",
    features: ["Wire-free comfort", "Adjustable straps", "Breathable fabric", "Superior support"],
    additionalImages: [
      import.meta.env.VITE_BASE_URL + "/images/Product/Picture2.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/Picture2-2.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/Picture2-3.png"
    ],
    badge: "Premium",
    color: "blue"
  },
  {
    id: 4,
    name: "Ladies Apeweo",
    image: import.meta.env.VITE_BASE_URL + "/images/Product/Picture3.png",
    category: "apeweo",
    description: "Elegant ladies apeweo with modern design. Perfect for special occasions and daily wear with superior comfort and style.",
    features: ["Modern design", "Premium quality", "Comfortable fit", "Elegant style"],
    additionalImages: [
      import.meta.env.VITE_BASE_URL + "/images/Product/Picture3.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/Picture3-2.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/Picture3-3.png"
    ],
    badge: "Premium",
    color: "orange"
  },
  {
    id: 5,
    name: "Mans Underwear",
    image: import.meta.env.VITE_BASE_URL + "/images/Product/Picture5.png",
    category: "mens",
    description: "High-quality men's underwear designed for maximum comfort and durability. Features elastic waistband and breathable fabric for all-day wear.",
    features: ["Elastic waistband", "Breathable fabric", "Comfortable fit", "Durable construction"],
    additionalImages: [
      import.meta.env.VITE_BASE_URL + "/images/Product/Picture5.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/Picture5-2.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/Picture5-3.png"
    ],
    badge: "Quality",
    color: "blue"
  }
];

// ========================================
// PRODUCT DETAIL MODAL
// ========================================
const ProductDetailModal = ({ product, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const nextImage = () => {
    setImageLoaded(false);
    setCurrentImageIndex((prev) => 
      prev === product.additionalImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setImageLoaded(false);
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.additionalImages.length - 1 : prev - 1
    );
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 bg-black/70 backdrop-blur-md ${designTokens.animations.basic.fadeIn}`}>
      <div className={`relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto ${designTokens.animations.basic.slideUp}`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 md:top-3 md:right-3 z-20 p-1.5 bg-gradient-to-r from-blue-900 to-orange-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:rotate-90"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        <div className="relative grid md:grid-cols-2 gap-3 md:gap-4 p-3 md:p-4">
          {/* Image Gallery */}
          <div className="space-y-2">
            {/* Main Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-md group">
              <img
                src={product.additionalImages[currentImageIndex]}
                alt={product.name}
                className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                onLoad={() => setImageLoaded(true)}
              />
              
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-900/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-white" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-orange-500/90 backdrop-blur-sm rounded-full shadow-lg transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="w-3.5 h-3.5 text-white" />
              </button>

              {/* Counter */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gradient-to-r from-blue-900 to-orange-500 backdrop-blur-sm rounded-full shadow-lg">
                <span className="text-[10px] text-white font-bold tracking-wide">
                  {currentImageIndex + 1} / {product.additionalImages.length}
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-3 gap-2">
              {product.additionalImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setImageLoaded(false);
                    setCurrentImageIndex(index);
                  }}
                  className={`aspect-square rounded-md overflow-hidden transition-all duration-300 relative ${
                    currentImageIndex === index
                      ? 'ring-2 ring-orange-500 scale-95 shadow-lg'
                      : 'hover:scale-95 opacity-60 hover:opacity-100 shadow-sm hover:shadow-md'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col space-y-3">
            {/* Category & Badge */}
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 bg-gradient-to-r from-blue-900 to-orange-500 text-white text-[10px] font-bold rounded-full shadow tracking-wide uppercase">
                {product.category}
              </span>
              {product.badge && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-50 border border-orange-500 text-orange-500 text-[10px] font-bold rounded-full">
                  <Sparkles className="w-3 h-3" />
                  {product.badge}
                </span>
              )}
            </div>

            <h2 className="text-lg md:text-xl font-bold text-slate-900 leading-tight">
              {product.name}
            </h2>

            <div className="h-0.5 w-12 bg-gradient-to-r from-blue-900 via-orange-500 to-blue-900 rounded-full shadow-sm"></div>

            <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div>
              <h3 className="text-sm md:text-base font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-orange-500" />
                Key Features
              </h3>
              <div className="space-y-1.5">
                {product.features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="card-info group p-2"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-900 to-orange-500 rounded-md flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <Zap className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs text-slate-700 font-medium leading-relaxed">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Badge */}
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-50 to-orange-50 border border-blue-200">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-900" />
                <div>
                  <h4 className="text-xs font-medium text-slate-900">Quality Guaranteed</h4>
                  <p className="text-[10px] text-slate-600">International standards certified</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button className={`${designTokens.buttons.primary.blue} w-full py-2 text-sm flex items-center justify-center gap-1.5`}>
                <Package className="w-3.5 h-3.5" />
                Contact Us for Order
              </button>
              <button className={`${designTokens.buttons.outline} w-full py-2 text-sm`}>
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========================================
// PRODUCT CARD
// ========================================
const ProductCard = ({ product, index, onViewDetails }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 120);
    return () => clearTimeout(timer);
  }, [index]);

  const accentColor = product.color === 'blue' 
    ? 'from-blue-900 to-blue-700' 
    : 'from-orange-500 to-orange-600';

  const badgeColor = product.color === 'blue'
    ? 'from-blue-600 to-blue-700'
    : 'from-orange-500 to-orange-600';

  return (
    <div
      className={`group relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card with elegant border */}
      <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-orange-200 transform hover:-translate-y-2">
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${accentColor} opacity-10 rounded-bl-full`}></div>
        </div>

        {/* Image Container */}
        <div className="relative h-72 md:h-80 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Elegant gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Premium badge with icon */}
          {product.badge && (
            <div className={`absolute top-4 left-4 transform transition-all duration-500 ${
              isHovered ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'
            }`}>
              <div className={`bg-gradient-to-r ${badgeColor} backdrop-blur-sm px-3 py-2 rounded-xl shadow-xl border border-white/20`}>
                <div className="flex items-center gap-1.5">
                  <Star className={`${designTokens.iconBox.iconSm} text-white fill-white`} />
                  <span className={`${designTokens.typography.bodySm} text-white font-bold tracking-wide`}>
                    {product.badge}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Floating category tag */}
          <div className={`absolute top-4 right-4 transform transition-all duration-500 ${
            isHovered ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
          }`}>
            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-lg border border-gray-200">
              <span className={`${designTokens.typography.bodySm} font-bold ${designTokens.gradients.text.blue} uppercase tracking-wider`}>
                {product.category}
              </span>
            </div>
          </div>

          {/* Premium view button */}
          <div className={`absolute bottom-4 left-4 right-4 transform transition-all duration-500 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <button 
              onClick={() => onViewDetails(product)}
              className={`w-full bg-gradient-to-r ${accentColor} text-white py-3 rounded-xl font-semibold ${designTokens.typography.label} shadow-xl border-2 border-white/30 hover:scale-105 transform transition-all duration-300 flex items-center justify-center gap-2`}
            >
              <Sparkles className={designTokens.iconBox.iconSm} />
              View Details
            </button>
          </div>
        </div>

        {/* Elegant content section */}
        <div className={`${designTokens.cards.infoItem.padding} bg-gradient-to-b from-white to-slate-50/50`}>
          <div className="text-center space-y-2">
            <h3 className={`${designTokens.typography.h4} text-slate-800 group-hover:text-orange-500 transition-colors duration-300`}>
              {product.name}
            </h3>
            
            {/* Animated underline */}
            <div className="flex justify-center">
              <div className={`h-0.5 bg-gradient-to-r ${accentColor} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 w-16`}></div>
            </div>

            {/* Quality indicator */}
            <div className={`flex items-center justify-center gap-1 ${designTokens.typography.caption} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-1`}>
              <Award className={designTokens.iconBox.iconSm} />
              <span className="font-medium">Premium Quality</span>
            </div>
          </div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      </div>
    </div>
  );
};

// ========================================
// MAIN PRODUCT SECTION
// ========================================
export default function ProductSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <section id="products" className={`relative ${designTokens.spacing.section.py} bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden`}>
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 ${designTokens.animations.hero.float}`}></div>
          <div className={`absolute bottom-20 left-10 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 ${designTokens.animations.hero.floatDelayed}`}></div>
        </div>

        <div className={designTokens.spacing.container.default}>
          {/* ===== UPDATED HEADER ===== */}
          <div className={`${designTokens.maxWidths.narrow} ${designTokens.spacing.section.mb} mb-12 md:mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}>
            {/* Subtitle Label */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-orange-600"></div>
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">Our Products</span>
            </div>
            
            {/* Main Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 leading-tight">
              Premium <span className="font-semibold text-orange-600">Collection</span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-lg text-gray-600 max-w-2xl font-light">
              Meticulously crafted with premium materials and supported by medium production facilities. Each piece meets international quality standards, delivering exceptional comfort and lasting elegance.
            </p>
          </div>

          {/* Premium Products Grid */}
          <div className={`${designTokens.maxWidths.content} mx-auto`}>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 ${designTokens.spacing.gridGap.lg}`}>
              {products.map((product, index) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  index={index}
                  onViewDetails={setSelectedProduct}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}