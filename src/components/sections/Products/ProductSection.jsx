import React, { useState, useEffect } from "react";
import { X, Package, Shield, Zap, Loader } from "lucide-react";

const API_URL = 'http://localhost:5000/api';

// ========================================
// PRODUCT DETAIL MODAL - RESPONSIVE
// ========================================
const ProductDetailModal = ({ product, onClose }) => {
  const [mainImage, setMainImage] = useState(product.mainImage || product.image);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_URL.replace('/api', '')}/${imagePath}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-black/50 backdrop-blur-sm overflow-y-auto lg:overflow-visible">
      <div className="relative bg-white rounded-t-3xl lg:rounded-2xl shadow-2xl w-full lg:max-w-6xl max-h-[95vh] lg:max-h-none overflow-y-auto">
        <button
          onClick={onClose}
          className="sticky lg:absolute top-4 right-4 z-20 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-all float-right"
        >
          <X className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 p-4 lg:p-8">
          {/* Left Side - Images */}
          <div className="lg:col-span-1 space-y-3 lg:space-y-4">
            {/* Main Image */}
            <div className="relative rounded-lg lg:rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 aspect-[3/4]">
              <img
                src={getImageUrl(mainImage)}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'%3E%3Crect fill='%23e5e7eb' width='300' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='14' fill='%23999' text-anchor='middle' dy='.3em'%3EImage not found%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            
            {/* Variant Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.variantImages && product.variantImages.slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`rounded-lg overflow-hidden cursor-pointer transition-all border-2 aspect-[1/1.2] ${
                    mainImage === img ? 'border-[#FF6600] shadow-lg' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={getImageUrl(img)}
                    alt={`variant-${idx}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 100'%3E%3Crect fill='%23e5e7eb' width='80' height='100'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Middle - Description & Features */}
          <div className="lg:col-span-1 space-y-3 lg:space-y-6 py-0 lg:py-2">
            {/* Title */}
            <div>
              <h1 className="text-xl lg:text-4xl font-black text-[#FF6600] mb-1">{product.name}</h1>
              <div className="h-1 w-24 bg-gradient-to-r from-[#FF6600] to-[#0D1B66] rounded-full mt-3"></div>
            </div>

            {/* Category */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white px-4 py-2 rounded-full" style={{backgroundColor: '#0D1B66'}}>
                {product.category}
              </span>
            </div>

            {/* Description Short */}
            <div className="bg-orange-50 p-3 lg:p-4 rounded-lg border-l-4 border-[#FF6600]">
              <p className="text-xs lg:text-sm text-gray-700 leading-relaxed font-semibold">
                {product.descriptionShort}
              </p>
            </div>

            {/* Description Long */}
            <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">
              {product.descriptionLong}
            </p>

            {/* Features List */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-xs lg:text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Features & Specifications</h3>
                <div className="grid grid-cols-2 gap-2 lg:gap-3">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-blue-50 p-2 rounded">
                      <Zap className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0 mt-0.5" style={{color: '#FF6600'}} />
                      <span className="text-xs lg:text-xs text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Additional Info */}
          <div className="lg:col-span-1 space-y-3 lg:space-y-6 flex flex-col justify-between py-0 lg:py-2">
            {/* 4 Layers Protection - Period Panty */}
            {product.layersProtection && product.layersProtection.length > 0 && (
              <div className="p-3 lg:p-4 rounded-lg border-2" style={{backgroundColor: '#FF660015', borderColor: '#FF6600'}}>
                <h4 className="text-xs lg:text-sm font-bold mb-2 lg:mb-4 flex items-center gap-2" style={{color: '#FF6600'}}>
                  <Shield className="w-4 h-4 lg:w-5 lg:h-5" />
                  {product.layersProtection.length} LAYERS
                </h4>
                <ul className="space-y-2 lg:space-y-3">
                  {product.layersProtection.map((layer, idx) => (
                    <li key={idx} className="text-xs text-gray-700">
                      <div className="flex gap-2">
                        <span className="text-[#FF6600] font-bold min-w-fit">L{idx + 1}:</span>
                        <span className="font-medium">{layer}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quality Info */}
            <div className="p-3 lg:p-4 rounded-lg border-l-4" style={{backgroundColor: '#0D1B6615', borderColor: '#0D1B66'}}>
              <h4 className="text-xs lg:text-sm font-bold mb-2 flex items-center gap-2" style={{color: '#0D1B66'}}>
                <Shield className="w-4 h-4 lg:w-5 lg:h-5" />
                PREMIUM QUALITY
              </h4>
              <p className="text-xs text-gray-700 leading-relaxed">
                International standards with high-quality materials.
              </p>
            </div>

            {/* Guarantee Badge */}
            <div className="p-3 rounded-lg border-2 border-dashed" style={{borderColor: '#0D1B66', backgroundColor: '#0D1B6608'}}>
              <p className="text-xs font-bold" style={{color: '#0D1B66'}}>✓ Quality Guaranteed</p>
              <p className="text-xs text-gray-600 mt-1">Customer satisfaction is our priority</p>
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

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    return `${API_URL.replace('/api', '')}/${imagePath}`;
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
            src={getImageUrl(product.image)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'%3E%3Crect fill='%23e5e7eb' width='300' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='14' fill='%23999' text-anchor='middle' dy='.3em'%3EImage not found%3C/text%3E%3C/svg%3E";
            }}
          />

          {/* Particles */}
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

        {/* Category Label at Bottom */}
        <div className="p-2 text-center bg-white">
          <p className="text-xs md:text-sm font-bold text-white bg-[#FF6600] px-3 py-1.5 rounded-full inline-block">
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
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // FETCH PRODUCTS FROM BACKEND
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      const data = await res.json();
      
      // Handle response format
      let productsList = [];
      if (Array.isArray(data)) {
        productsList = data;
      } else if (data.data && Array.isArray(data.data)) {
        productsList = data.data;
      } else if (data.products && Array.isArray(data.products)) {
        productsList = data.products;
      }

      setProducts(productsList);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // GET UNIQUE CATEGORIES
  const categories = ["All"];
  const uniqueCategories = [...new Set(products.map(p => p.category))];
  categories.push(...uniqueCategories.sort());

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

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
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

          .spinner {
            animation: spin 1s linear infinite;
          }
        `}
      </style>
      <section id="products" className="relative py-12 md:py-20 bg-white overflow-hidden">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="text-left mb-8 md:mb-16">
            <div className="flex items-center gap-3 mb-2">
              <p className="text-xs font-bold uppercase tracking-widest" style={{color: '#FF6600'}}>
                Discover Our
              </p>
              <div className="h-1 w-12 bg-gradient-to-r from-[#FF6600] to-transparent rounded-full"></div>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
             Style Meets <span style={{color: '#FF6600'}}>Comfort</span>
            </h2>

            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <div className="h-1 w-20 bg-gradient-to-r from-[#FF6600] via-[#0D1B66] to-transparent rounded-full"></div>
              <div className="h-1 w-20 bg-gradient-to-r from-[#0D1B66] to-transparent rounded-full"></div>
            </div>
            
            <p className="text-sm md:text-base text-gray-600 max-w-2xl">
              Engineered for real life. Our collections combine superior comfort with contemporary design, backed by rigorous quality testing.
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '3rem', paddingBottom: '3rem' }}>
              <Loader className="spinner" size={40} style={{ color: '#FF6600' }} />
            </div>
          ) : (
            <>
              {/* CATEGORY FILTER */}
              {categories.length > 0 && (
                <div className="mb-8 md:mb-12 flex flex-wrap gap-2 md:gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
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
              )}

              {/* Empty State */}
              {filteredProducts.length === 0 ? (
                <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
                  <p style={{ fontSize: '1.125rem' }}>No products found in this category</p>
                </div>
              ) : (
                <>
                  {/* MAIN ROW - 5 PRODUCTS */}
                  {filteredProducts.length > 0 && (
                    <div className="mb-8 md:mb-16">
                      <div className="hidden md:flex items-start justify-center gap-3 md:gap-4">
                        {filteredProducts.slice(0, 5).map((product, idx) => {
                          const heights = ['h-72 md:h-80', 'h-80 md:h-96', 'h-96 md:h-[420px]', 'h-80 md:h-96', 'h-72 md:h-80'];
                          return (
                            <div key={product._id || product.id} className={`w-1/5 ${heights[idx]}`}>
                              <ProductCard 
                                product={product}
                                onViewDetails={setSelectedProduct}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Mobile Grid - 2x3 for first 5 products */}
                      <div className="md:hidden grid grid-cols-2 gap-2">
                        {filteredProducts.slice(0, 5).map((product) => (
                          <div key={product._id || product.id} className="h-56">
                            <ProductCard 
                              product={product}
                              onViewDetails={setSelectedProduct}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SECONDARY ROW - 5 PRODUCTS */}
                  {filteredProducts.length > 5 && (
                    <div className="mb-8 md:mb-16">
                      <div className="hidden md:flex items-start justify-center gap-3 md:gap-4">
                        {filteredProducts.slice(5, 10).map((product, idx) => {
                          const heights = ['h-72 md:h-80', 'h-80 md:h-96', 'h-96 md:h-[420px]', 'h-80 md:h-96', 'h-72 md:h-80'];
                          return (
                            <div key={product._id || product.id} className={`w-1/5 ${heights[idx]}`}>
                              <ProductCard 
                                product={product}
                                onViewDetails={setSelectedProduct}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Mobile Grid - 2x3 for products 6-10 */}
                      <div className="md:hidden grid grid-cols-2 gap-2">
                        {filteredProducts.slice(5, 10).map((product) => (
                          <div key={product._id || product.id} className="h-56">
                            <ProductCard 
                              product={product}
                              onViewDetails={setSelectedProduct}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
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