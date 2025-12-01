import React, { useState, useEffect } from "react";
import { X, Package, Shield, Zap } from "lucide-react";

// ========================================
// PRODUCT DATA
// ========================================
const products = [
  {
    id: 1,
    name: "Period Panty",
    image: "/images/Product/Picture1.png",
    category: "Period Panty",
    mainImage: "/images/Product/Picture1.png",
    descriptionShort: "4 layers protection dengan Soft cotton lining, Super absorbent & breathable padding layer, Leak-proof barrier, Cotton outer layer.",
    descriptionLong: "We produce various kinds of women's panties, one of which is period panty, where various functions, designs, colors and sizes are available. Dirancang dengan teknologi perlindungan 4 lapis untuk kenyamanan maksimal selama periode menstruasi.",
    variantImages: [
      "/images/Product/panty/Picture1.png",
      "/images/Product/panty/Picture2.png",
    ],
    features: [
      "Soft cotton lining",
      "Super absorbent padding",
      "Leak-proof barrier",
      "Cotton outer layer",
      "Berbagai warna",
      "Berbagai ukuran"
    ],
    layersProtection: [
      "Soft cotton lining",
      "Super absorbent & breathable padding layer",
      "Leak-proof barrier",
      "Cotton outer layer"
    ]
  },
  {
    id: 2,
    name: "Ladies Underwear",
    image: "/images/Product/under.png",
    category: "Ladies Underwear",
    mainImage: "/images/Product/under.png",
    descriptionShort: "We can make women's panties in all shapes and sizes, with the best quality.",
    descriptionLong: "Kami dapat membuat celana dalam wanita dalam berbagai bentuk dan ukuran dengan kualitas terbaik. Tersedia dalam berbagai desain, fungsi, dan warna untuk memenuhi kebutuhan Anda.",
    variantImages: [
      "/images/Product/underweare/Picture1.png",
      "/images/Product/underweare/Picture2.png",
    ],
    features: [
      "Semua bentuk tersedia",
      "Semua ukuran tersedia",
      "Kualitas terbaik",
      "Berbagai desain",
      "Berbagai fungsi",
      "Berbagai warna"
    ]
  },
  {
    id: 3,
    name: "Ladies Bra",
    image: "/images/Product/Picture4.png",
    category: "Ladies Bra",
    mainImage: "/images/Product/Picture4.png",
    descriptionShort: "We provide a wide range of bras in various sizes and shapes, ranging from wire-free to seamless.",
    descriptionLong: "Kami menyediakan berbagai macam bra dalam berbagai ukuran dan bentuk, mulai dari wire-free hingga seamless. Dirancang untuk kenyamanan dan dukungan optimal sepanjang hari.",
    variantImages: [
      "/images/Product/bra/Picture3.png",
      "/images/Product/bra/Picture4.png",
    ],
    features: [
      "Wire-free option",
      "Seamless design",
      "Berbagai ukuran",
      "Berbagai bentuk",
      "Kualitas premium",
      "Dukungan optimal"
    ]
  },
  {
    id: 4,
    name: "Ladies Shapewear",
    image: "/images/Product/Picture2.png",
    category: "Ladies Shapewear",
    mainImage: "/images/Product/Picture2.png",
    descriptionShort: "We can provide shapewear in any shape and size and specifically designed to achieve the ideal body shape.",
    descriptionLong: "Kami dapat menyediakan shapewear dalam bentuk apa pun dan ukuran apa pun dan dirancang khusus untuk mencapai bentuk tubuh ideal. Tersedia dalam berbagai pilihan desain dan warna untuk kenyamanan maksimal.",
    variantImages: [
      "/images/Product/Picture2.png",
      "/images/Product/Picture2.png",
    ],
    features: [
      "Bentuk tubuh ideal",
      "Semua ukuran tersedia",
      "Semua bentuk tersedia",
      "Desain khusus",
      "Kualitas premium",
      "Berbagai warna"
    ]
  },
  
  {
    id: 5,
    name: "Sport Wear",
    image: "/images/Product/Picture3.png",
    category: "Sport Wear",
    mainImage: "/images/Product/Picture3.png",
    descriptionShort: "We are capable to produce the complicated technique of the sport bra & Leggings. We are also capable of making various kinds of sportwear such as outerwear for sportwear jackets and pants.",
    descriptionLong: "Kami mampu memproduksi dengan teknik rumit untuk sport bra & leggings. Kami juga mampu membuat berbagai jenis sportwear seperti jaket dan celana olahraga. Tersedia dalam berbagai desain dan fungsi untuk performa maksimal.",
    variantImages: [
      "/images/Product/spoorrt/Picture7.png",
      "/images/Product/spoorrt/Picture8.png",
    ],
    features: [
      "Sport bra advanced technique",
      "Leggings with complex design",
      "Sport jackets available",
      "Sport pants available",
      "Moisture-wicking",
      "Flexible fit"
    ]
  },
  {
    id: 6,
    name: "Man's Underwear",
    image: "/images/Product/mu.png",
    category: "Man's Underwear",
    mainImage: "/images/Product/mu.png",
    descriptionShort: "We can work on men's underwear of any size and shape, as well as high quality for the convenience of users.",
    descriptionLong: "Kami dapat bekerja pada celana dalam pria dengan ukuran dan bentuk apa pun, serta kualitas tinggi untuk kenyamanan pengguna. Comfortable Men's Underwear yang dirancang untuk kenyamanan maksimal dan gaya modern.",
    variantImages: [
      "/images/Product/mu/Picture9.png",
      "/images/Product/mu/Picture10.png",
    ],
    features: [
      "Semua ukuran tersedia",
      "Semua bentuk tersedia",
      "Kualitas tinggi",
      "Kenyamanan pengguna",
      "Material premium",
      "Desain modern"
    ]
  },
  {
    id: 7,
    name: "Swimwear",
    image: "/images/Product/Picture5.png",
    category: "Swimwear",
    mainImage: "/images/Product/Picture5.png",
    descriptionShort: "We can produce various kinds of swimwear of various sizes, shapes, colors, and ages, even with special functions.",
    descriptionLong: "Kami dapat memproduksi berbagai jenis swimwear dengan berbagai ukuran, bentuk, warna, dan usia, bahkan dengan fungsi khusus. Period swimsuit dengan teknologi perlindungan untuk kenyamanan berenang dan aktivitas air.",
    variantImages: [
      "/images/Product/swim/Picture11.png",
      "/images/Product/swim/Picture12.png",
    ],
    features: [
      "Berbagai ukuran tersedia",
      "Berbagai bentuk tersedia",
      "Berbagai warna tersedia",
      "Untuk semua usia",
      "Fungsi khusus tersedia",
      "Water-resistant technology"
    ]
  },
  {
    id: 8,
    name: "Innerware (T-Shirt)",
    image: "/images/Product/kaos.png",
    category: "Innerware",
    mainImage: "/images/Product/kaos.png",
    descriptionShort: "We can provide t-shirts with various sizes and shapes as well as various functions that are used for various benefits.",
    descriptionLong: "Kami dapat menyediakan t-shirt dengan berbagai ukuran dan bentuk serta berbagai fungsi yang digunakan untuk berbagai keuntungan. Tersedia dalam berbagai desain dan material berkualitas tinggi untuk kenyamanan sehari-hari.",
    variantImages: [
      "/images/Product/Innerware/Picture13.png",
      "/images/Product/Innerware/Picture14.png",
    ],
    features: [
      "Berbagai ukuran tersedia",
      "Berbagai bentuk tersedia",
      "Berbagai fungsi tersedia",
      "Berbagai keuntungan",
      "Material berkualitas",
      "Desain modern"
    ]
  },
  {
    id: 9,
    name: "Hoodie",
    image: "/images/Product/hodie.png",
    category: "Hoodie",
    mainImage: "/images/Product/hodie.png",
    descriptionShort: "We can produce a wide range of hoodies of various sizes, shapes.",
    descriptionLong: "Kami dapat memproduksi berbagai hoodie dengan berbagai ukuran dan bentuk. Comfortable & Soft Hoodie yang dirancang untuk kenyamanan maksimal dalam penggunaan sehari-hari dan aktivitas santai.",
    variantImages: [
      "/images/Product/Hoodie/Picture16.png",
      "/images/Product/Hoodie/Picture17.png",
    ],
    features: [
      "Berbagai ukuran tersedia",
      "Berbagai bentuk tersedia",
      "Material lembut dan nyaman",
      "Kenyamanan maksimal",
      "Desain modern",
      "Mudah dirawat"
    ]
  },
  {
    id: 10,
    name: "Kids Wear",
    image: "/images/Product/ll.png",
    category: "Kids Wear",
    mainImage: "/images/Product/ll.png",
    descriptionShort: "We can produce various kinds of children's clothing with various types of shapes and sizes.",
    descriptionLong: "Kami dapat memproduksi berbagai jenis pakaian anak-anak dengan berbagai jenis bentuk dan ukuran. Children's clothing with child-friendly materials yang aman, nyaman, dan tahan lama untuk anak-anak.",
    variantImages: [
      "/images/Product/kids/Picture18.png",
      "/images/Product/kids/Picture19.png",
    ],
    features: [
      "Berbagai jenis pakaian",
      "Berbagai bentuk tersedia",
      "Berbagai ukuran tersedia",
      "Child-friendly materials",
      "Aman untuk anak-anak",
      "Nyaman dan tahan lama"
    ]
  }
];

// ========================================
// PRODUCT DETAIL MODAL - RESPONSIVE
// ========================================
const ProductDetailModal = ({ product, onClose }) => {
  const [mainImage, setMainImage] = useState(product.mainImage);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

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
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 400'%3E%3Crect fill='%23e5e7eb' width='300' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='14' fill='%23999' text-anchor='middle' dy='.3em'%3EImage not found%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            
            {/* Variant Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.variantImages.slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`rounded-lg overflow-hidden cursor-pointer transition-all border-2 aspect-[1/1.2] ${
                    mainImage === img ? 'border-[#FF6600] shadow-lg' : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <img
                    src={img}
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
          </div>

          {/* Right Side - Additional Info */}
          <div className="lg:col-span-1 space-y-3 lg:space-y-6 flex flex-col justify-between py-0 lg:py-2">
            {/* 4 Layers Protection - Period Panty */}
            {product.layersProtection && (
              <div className="p-3 lg:p-4 rounded-lg border-2" style={{backgroundColor: '#FF660015', borderColor: '#FF6600'}}>
                <h4 className="text-xs lg:text-sm font-bold mb-2 lg:mb-4 flex items-center gap-2" style={{color: '#FF6600'}}>
                  <Shield className="w-4 h-4 lg:w-5 lg:h-5" />
                  4 LAYERS
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Period Panty", "Ladies Underwear", "Ladies Bra", "Ladies Shapewear", "Sport Wear", "Man's Underwear", "Swimwear", "Innerware", "Hoodie", "Kids Wear"];

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

          {/* CATEGORY FILTER */}
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

          {/* MAIN ROW - 5 PRODUCTS */}
          {filteredProducts.length > 0 && (
            <div className="mb-8 md:mb-16">
              <div className="hidden md:flex items-start justify-center gap-3 md:gap-4">
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

              {/* Mobile Grid - 2x3 for first 5 products */}
              <div className="md:hidden grid grid-cols-2 gap-2">
                {filteredProducts.slice(0, 5).map((product) => (
                  <div key={product.id} className="h-56">
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
                    <div key={product.id} className={`w-1/5 ${heights[idx]}`}>
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
                  <div key={product.id} className="h-56">
                    <ProductCard 
                      product={product}
                      onViewDetails={setSelectedProduct}
                    />
                  </div>
                ))}
              </div>
            </div>
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