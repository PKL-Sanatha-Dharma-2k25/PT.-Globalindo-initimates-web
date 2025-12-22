import React, { useState, useEffect } from "react";
import { X, Package, Shield, Zap, ChevronLeft, ChevronRight } from "lucide-react";

// ========================================
// PRODUCT DATA
// ========================================
const products = [
  {
    id: 1,
    name: "Period Panty",
    image: import.meta.env.VITE_BASE_URL + "/images/Product/panty/p2.png",
    category: "Period Panty",
    mainImage: import.meta.env.VITE_BASE_URL + "/images/Product/panty/p2.png",
    descriptionShort:
      "Designed with 4-layer protection including a soft cotton lining, super absorbent and breathable padding, leak-proof barrier, and cotton outer layer.",
    descriptionLong:
      "We produce various types of women's underwear, including period panties available in multiple designs, colors, and sizes. Engineered with advanced 4-layer protection technology to provide maximum comfort, protection, and confidence during menstruation.",
    variantImages: [
      import.meta.env.VITE_BASE_URL + "/images/Product/panty/p1.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/panty/p3.png",
    ],
    features: [
      "Soft cotton lining",
      "Super absorbent padding",
      "Leak-proof barrier",
      "Cotton outer layer",
      "Available in various colors",
      "Available in multiple sizes",
    ],
    layersProtection: [
      "Soft cotton lining",
      "Super absorbent & breathable padding layer",
      "Leak-proof barrier",
      "Cotton outer layer",
    ],
  },

  {
    id: 2,
    name: "Ladies Underwear",
    image: import.meta.env.VITE_BASE_URL + "/images/Product/underweare/p1.png",
    category: "Ladies Underwear",
    mainImage: import.meta.env.VITE_BASE_URL + "/images/Product/underweare/p1.png",
    descriptionShort:
      "Women's underwear produced in various shapes and sizes with premium quality materials.",
    descriptionLong:
      "We manufacture ladies underwear in a wide range of shapes, sizes, and styles using high-quality materials. Designed to provide comfort, durability, and a perfect fit for everyday wear.",
    variantImages: [
      import.meta.env.VITE_BASE_URL + "/images/Product/underweare/p2.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/underweare/p3.png",
    ],
    features: [
      "Available in various shapes",
      "Available in all sizes",
      "Premium quality materials",
      "Multiple design options",
      "Functional and comfortable",
      "Wide range of colors",
    ],
  },

  {
    id: 3,
    name: "Ladies Bra",
    image: import.meta.env.VITE_BASE_URL + "/images/Product/bra/p1.png",
    category: "Ladies Bra",
    mainImage: import.meta.env.VITE_BASE_URL + "/images/Product/bra/p1.png",
    descriptionShort:
      "A wide selection of bras available in various sizes and styles, from wire-free to seamless designs.",
    descriptionLong:
      "Our ladies bra collection is designed to provide optimal comfort and support throughout the day. Available in various shapes, sizes, and constructions, including wire-free and seamless options.",
    variantImages: [
      import.meta.env.VITE_BASE_URL + "/images/Product/bra/p2.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/bra/p3.png",
    ],
    features: [
      "Wire-free options",
      "Seamless design",
      "Wide range of sizes",
      "Various bra shapes",
      "Premium quality fabric",
      "Optimal support and comfort",
    ],
  },
  {
    id: 4,
    name: "Man's Underwear",
    image: import.meta.env.VITE_BASE_URL + "/images/Product/mu/p1.png",
    category: "Man's Underwear",
    mainImage: import.meta.env.VITE_BASE_URL + "/images/Product/mu/p1.png",
    descriptionShort:
      "Men's underwear available in various sizes and shapes with high-quality materials for maximum comfort.",
    descriptionLong:
      "Our men's underwear is designed to provide comfort, durability, and a modern look. Manufactured in various sizes and styles using premium materials to ensure a perfect fit and long-lasting wear.",
    variantImages: [
      import.meta.env.VITE_BASE_URL + "/images/Product/mu/p1.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/mu/p2.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/mu/p3.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/mu/p4.png",
    ],
    features: [
      "Available in all sizes",
      "Various underwear shapes",
      "High-quality materials",
      "Comfort-focused design",
      "Premium fabric selection",
      "Modern style",
    ],
  },

 

  {
    id: 5,
    name: "Sport Wear",
    image: import.meta.env.VITE_BASE_URL + "/images/Product/spoorrt/p1.png",
    category: "Sport Wear",
    mainImage: import.meta.env.VITE_BASE_URL + "/images/Product/spoorrt/p1.png",
    descriptionShort:
      "High-performance sportswear produced with advanced techniques for sport bras, leggings, jackets, and pants.",
    descriptionLong:
      "We specialize in producing sportswear using complex and advanced manufacturing techniques. Our collection includes sport bras, leggings, jackets, and sport pants designed for flexibility, breathability, and optimal performance.",
    variantImages: [
      import.meta.env.VITE_BASE_URL + "/images/Product/spoorrt/p2.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/spoorrt/p3.png",
    ],
    features: [
      "Advanced sport bra construction",
      "Complex leggings design",
      "Sport jackets available",
      "Sport pants available",
      "Moisture-wicking fabric",
      "Flexible and comfortable fit",
    ],
  },
 {
    id: 6,
    name: "Hospital Uniform",
    image: import.meta.env.VITE_BASE_URL + "/images/Product/hospital/p1.png",
    category: "Hospital Uniform",
    mainImage: import.meta.env.VITE_BASE_URL + "/images/Product/hospital/p1.png",
    descriptionShort:
      "Professional hospital uniforms designed for comfort, durability, and ease of movement in medical environments.",
    descriptionLong:
      "We manufacture high-quality hospital uniforms for doctors, nurses, and healthcare professionals. Designed with breathable and durable fabrics, our uniforms provide comfort, hygiene, and flexibility for long working hours while maintaining a clean and professional appearance.",
    variantImages: [
      import.meta.env.VITE_BASE_URL + "/images/Product/hospital/p2.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/hospital/p3.png",
    ],
    features: [
      "Breathable and durable fabric",
      "Comfortable for long working hours",
      "Professional and clean appearance",
      "Flexible and easy to move",
      "Available in various sizes and colors",
      "Suitable for medical professionals",
    ],
  },

  {
    id: 7,
    name: "Swimwear",
    image: import.meta.env.VITE_BASE_URL + "/images/Product/swim/p1.png",
    category: "Swimwear",
    mainImage: import.meta.env.VITE_BASE_URL + "/images/Product/swim/p1.png",
    descriptionShort:
      "Swimwear produced in various sizes, shapes, colors, and age ranges, including special-function designs.",
    descriptionLong:
      "We produce a wide range of swimwear suitable for all ages and body types. Our swimwear is designed for comfort, durability, and water resistance, including special-function options such as period swimwear.",
    variantImages: [
      import.meta.env.VITE_BASE_URL + "/images/Product/swim/p2.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/swim/p3.png",
    ],
    features: [
      "Available in various sizes",
      "Multiple shapes and styles",
      "Wide range of colors",
      "Suitable for all ages",
      "Special-function swimwear",
      "Water-resistant technology",
    ],
  },

  {
    id: 8,
    name: "Innerwear (T-Shirt)",
    image: import.meta.env.VITE_BASE_URL + "/images/Product/Innerware/p1.png",
    category: "Innerware",
    mainImage: import.meta.env.VITE_BASE_URL + "/images/Product/Innerware/p1.png",
    descriptionShort:
      "T-shirts available in various sizes and shapes with multiple functional uses.",
    descriptionLong:
      "Our innerwear T-shirts are made from high-quality materials designed for everyday comfort. Available in various sizes, shapes, and functional designs suitable for daily activities.",
    variantImages: [
      import.meta.env.VITE_BASE_URL + "/images/Product/Innerware/p2.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/Innerware/p3.png",
    ],
    features: [
      "Available in various sizes",
      "Different shape options",
      "Multiple functional uses",
      "Comfortable for daily wear",
      "High-quality materials",
      "Modern design",
    ],
  },

  {
    id: 9,
    name: "Jackets & Hoodies",
    image: import.meta.env.VITE_BASE_URL + "/images/Product/Hoodie/p1.png",
    category: "Jackets & Hoodies",
    mainImage: import.meta.env.VITE_BASE_URL + "/images/Product/Hoodie/p1.png",
    descriptionShort:
      "A versatile collection of jackets and hoodies available in various sizes and styles.",
    descriptionLong:
      "Our jackets and hoodies are crafted using soft, durable, and comfortable materials, making them ideal for daily wear and casual activities. Designed with modern aesthetics and practical construction, they are available in various sizes, shapes, and styles to suit different needs.",
    variantImages: [
      import.meta.env.VITE_BASE_URL + "/images/Product/Hoodie/p2.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/Hoodie/p3.png",
    ],
    features: [
      "Available in multiple sizes",
      "Various jacket and hoodie styles",
      "Soft and comfortable fabric",
      "Designed for daily wear",
      "Modern and casual design",
      "Easy to maintain",
    ],
  },

  {
    id: 10,
    name: "Kids Wear",
    image: import.meta.env.VITE_BASE_URL + "/images/Product/kids/p1.png",
    category: "Kids Wear",
    mainImage: import.meta.env.VITE_BASE_URL + "/images/Product/kids/p1.png",
    descriptionShort:
      "Children's clothing produced in various shapes and sizes.",
    descriptionLong:
      "We manufacture children's clothing using child-friendly materials that are safe, comfortable, and durable. Designed in various styles and sizes suitable for everyday activities.",
    variantImages: [
      import.meta.env.VITE_BASE_URL + "/images/Product/kids/p2.png",
      import.meta.env.VITE_BASE_URL + "/images/Product/kids/p3.png",
    ],
    features: [
      "Various clothing types",
      "Available in different shapes",
      "Wide range of sizes",
      "Child-friendly materials",
      "Safe for children",
      "Comfortable and durable",
    ],
  },
];

// ========================================
// PRODUCT DETAIL MODAL - WITH CAROUSEL
// ========================================
const ProductDetailModal = ({ product, onClose }) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Combine main image + variant images
  const allImages = [product.mainImage, ...product.variantImages];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIdx((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIdx((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (touchStart - touchEnd > 50) {
      handleNextImage();
    } else if (touchEnd - touchStart > 50) {
      handlePrevImage();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl my-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-full transition-all"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-5 lg:p-6">
          {/* Left - Images Carousel */}
          <div className="lg:col-span-1 space-y-3">
            {/* Main Image with Carousel Controls */}
            <div 
              className="relative rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 aspect-[3/4] group"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={allImages[currentImageIdx]}
                alt={`${product.name}-${currentImageIdx}`}
                className="w-full h-full object-cover transition-opacity duration-300"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'%3E%3Crect fill='%23e5e7eb' width='300' height='400'/%3E%3C/svg%3E";
                }}
              />

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-semibold">
                {currentImageIdx + 1} / {allImages.length}
              </div>
            </div>

            {/* Thumbnail Strip - Scrollable */}
            <div className="relative">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-2 pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIdx(idx)}
                      className={`flex-shrink-0 rounded-md overflow-hidden transition-all border-2 w-16 h-20 ${
                        currentImageIdx === idx 
                          ? 'border-[#FF6600] shadow-lg ring-2 ring-[#FF6600]/30' 
                          : 'border-gray-300 hover:border-gray-400 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`thumbnail-${idx}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 100'%3E%3Crect fill='%23e5e7eb' width='80' height='100'/%3E%3C/svg%3E";
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Middle - Description & Features */}
          <div className="lg:col-span-1 space-y-4 py-1">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-[#FF6600]">{product.name}</h1>
              <div className="h-1 w-20 bg-gradient-to-r from-[#FF6600] to-[#0D1B66] rounded-full mt-2"></div>
            </div>

            <span className="text-xs font-bold text-white px-3 py-1 rounded-full inline-block" style={{backgroundColor: '#0D1B66'}}>
              {product.category}
            </span>

            <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-[#FF6600]">
              <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                {product.descriptionShort}
              </p>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              {product.descriptionLong}
            </p>

            <div>
              <h3 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.slice(0, 6).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-blue-50 p-2 rounded text-xs">
                    <Zap className="w-3 h-3 flex-shrink-0 mt-0.5" style={{color: '#FF6600'}} />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Additional Info */}
          <div className="lg:col-span-1 space-y-3 flex flex-col justify-between py-1">
            {product.layersProtection && (
              <div className="p-3 rounded-lg border-2" style={{backgroundColor: '#FF660015', borderColor: '#FF6600'}}>
                <h4 className="text-xs font-bold mb-2 flex items-center gap-2" style={{color: '#FF6600'}}>
                  <Shield className="w-4 h-4" />
                  4 LAYERS
                </h4>
                <ul className="space-y-2">
                  {product.layersProtection.map((layer, idx) => (
                    <li key={idx} className="text-xs text-gray-700">
                      <span className="text-[#FF6600] font-bold">L{idx + 1}:</span> {layer}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-3 rounded-lg border-l-4" style={{backgroundColor: '#0D1B6615', borderColor: '#0D1B66'}}>
              <h4 className="text-xs font-bold mb-1 flex items-center gap-2" style={{color: '#0D1B66'}}>
                <Shield className="w-4 h-4" />
                PREMIUM QUALITY
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                International standards with high-quality materials.
              </p>
            </div>

            <div className="p-2 rounded-lg border-2 border-dashed text-center" style={{borderColor: '#0D1B66', backgroundColor: '#0D1B6608'}}>
              <p className="text-xs font-bold" style={{color: '#0D1B66'}}>✓ Quality Guaranteed</p>
              <p className="text-xs text-gray-600 mt-0.5">Customer satisfaction priority</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

// ========================================
// PRODUCT CARD
// ========================================
const ProductCard = ({ product, onViewDetails }) => {
  const [particles, setParticles] = useState([]);

  const handleHover = () => {
    const newParticles = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const velocity = 80 + Math.random() * 40;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      newParticles.push({
        id: i,
        tx,
        ty,
        delay: i * 0.05,
      });
    }
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 800);
  };

  return (
    <div
      className="group cursor-pointer relative w-full h-full product-card-hover"
      onClick={() => onViewDetails(product)}
      onMouseEnter={handleHover}
    >
      <div className="relative rounded-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
        <div className="relative w-full flex-1 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'%3E%3Crect fill='%23e5e7eb' width='300' height='400'/%3E%3C/svg%3E";
            }}
          />

          {particles.map((particle) => (
            <div
              key={particle.id}
              className="particle"
              style={{
                left: '50%',
                top: '50%',
                '--tx': `${particle.tx}px`,
                '--ty': `${particle.ty}px`,
              }}
            >
              <div
                className="particle-dot"
                style={{
                  animationDelay: `${particle.delay}s`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="p-2 text-center bg-white">
          <p className="text-xs md:text-sm font-bold text-white bg-[#FF6600] px-3 py-1 rounded-full inline-block">
            {product.category}
          </p>
        </div>
      </div>
    </div>
  );
};

// ========================================
// MAIN PRODUCT SECTION
// ========================================
export default function ProductSection() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Period Panty", "Ladies Underwear", "Ladies Bra", "Sport Wear", "Man's Underwear", "Swimwear", "Innerware", "Jackets & Hoodies", "Kids Wear"];

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

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

          @keyframes particle-float {
            0% {
              opacity: 1;
              transform: translate(0, 0) scale(1);
            }
            100% {
              opacity: 0;
              transform: translate(var(--tx), var(--ty)) scale(0);
            }
          }

          @keyframes cardHover {
            0% {
              transform: scale(1) rotateZ(0deg);
            }
            50% {
              transform: scale(1.02) rotateZ(1deg);
            }
            100% {
              transform: scale(1.05) rotateZ(-1deg);
            }
          }

          .product-card-hover {
            transition: all 0.3s ease;
          }

          .product-card-hover:hover {
            animation: cardHover 0.6s ease-out forwards;
          }

          .particle {
            position: absolute;
            pointer-events: none;
          }

          .particle-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #FF6600;
            animation: particle-float 0.8s ease-out forwards;
          }
        `}
      </style>
      <section id="products" className="relative py-12 md:py-20 bg-white overflow-hidden">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-left mb-16">
            <div className="flex items-center gap-3 mb-2">
              <p className="text-xs font-bold uppercase tracking-widest" style={{color: '#FF6600'}}>
                Discover Our
              </p>
              <div className="h-1 w-12 bg-gradient-to-r from-[#FF6600] to-transparent rounded-full"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Style Meets <span style={{color: '#FF6600'}}>Comfort</span>
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-1 w-20 bg-gradient-to-r from-[#FF6600] via-[#0D1B66] to-transparent rounded-full"></div>
              <div className="h-1 w-20 bg-gradient-to-r from-[#0D1B66] to-transparent rounded-full"></div>
            </div>
            
            <p className="text-sm md:text-base text-gray-600 max-w-2xl">
              Engineered for real life. Our collections combine superior comfort with contemporary design, backed by rigorous quality testing.</p>
          </div>

          <div className="mb-12 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 md:px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'text-white shadow-lg'
                    : 'text-gray-700 border-2 border-gray-300 hover:border-[#FF6600] hover:text-[#FF6600]'
                }`}
                style={activeCategory === cat ? {backgroundColor: '#FF6600'} : {}}
              >
                {cat}
              </button>
            ))}
          </div>

          {filteredProducts.length > 0 && (
            <div className="mb-16">
              <div className="flex items-start justify-center gap-3 md:gap-4">
                {filteredProducts.slice(0, 5).map((product, idx) => {
                  const heights = ['h-72 md:h-80', 'h-80 md:h-96', 'h-96 md:h-[420px]', 'h-80 md:h-96', 'h-72 md:h-80'];
                  return (
                    <div key={product.id} className={`w-1/5 ${heights[idx]}`}>
                      <ProductCard 
                        product={product}
                        onViewDetails={setSelectedProduct}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {filteredProducts.length > 5 && (
            <div className="mb-16">
              <div className="flex items-start justify-center gap-3 md:gap-4">
                {filteredProducts.slice(5, 10).map((product, idx) => {
                  const heights = ['h-72 md:h-80', 'h-80 md:h-96', 'h-96 md:h-[420px]', 'h-80 md:h-96', 'h-72 md:h-80'];
                  return (
                    <div key={product.id} className={`w-1/5 ${heights[idx]}`}>
                      <ProductCard 
                        product={product}
                        onViewDetails={setSelectedProduct}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}