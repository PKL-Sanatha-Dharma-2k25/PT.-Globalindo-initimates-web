// ============================================
// 📄 FILE 2: src/components/sections/News/NewsSection.jsx
// ============================================
import React, { useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import designTokens from '@/constants/designTokens';

const NewsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const news = [
    {
      id: 1,
      title: 'Free Trade Zone PT. Globalindo Intimates Ready to Boost Garment Exports from Klaten',
      category: 'Expansion',
      date: '2024',
      excerpt: 'PT. Globalindo Intimates opens a free trade zone to increase exports of high-quality garment products from Klaten to the global market.',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&h=400&fit=crop',
      url: 'https://www.inilah.com/kawasan-berikat-pt-globalindo-intimates-siap-dorong-ekspor-garmen-dari-klaten'
    },
    {
      id: 2,
      title: 'FTI UAJY Establishes Partnership with PT. Globalindo Intimates',
      category: 'Collaboration',
      date: '2022',
      excerpt: 'Faculty of Industrial Technology UAJY establishes strategic collaboration with PT. Globalindo Intimates for industrial development and research.',
      image: 'https://lldikti5.kemdikbud.go.id/assets/images/posts/medium/tn_lldikti5_20220627105502.jpg',
      url: 'https://lldikti5.kemdikbud.go.id/home/detailpost/fti-uajy-jalin-kerja-sama-dengan-pt-globalindo-intimates'
    },
    {
      id: 3,
      title: 'FT UDINUS and PT. Globalindo Intimates Build Robot Through MKBM Program',
      category: 'Innovation',
      date: '2023',
      excerpt: 'Collaboration between FT UDINUS and Globalindo in the MKBM program results in the development of advanced robots for the garment industry.',
      image: 'https://images.unsplash.com/photo-1485827404703-674cf45dd6f1?w=500&h=400&fit=crop',
      url: 'https://www.suaramerdeka.com/pendidikan/pr-041616654/ft-udinus-dan-pt-globalindo-intimates-akan-bangun-robot-lewat-program-mkbm'
    },
    {
      id: 5,
      title: 'Ministry of Industry Actively Improves Industrial HR Quality Amid Mass Layoffs',
      category: 'Industry',
      date: '2024',
      excerpt: 'The Ministry of Industry actively improves the quality of Human Resources (HR) in the industry through various training and development programs.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop',
      url: 'https://voi.id/ekonomi/395931/kemenperin-proaktif-tingkatkan-kualitas-sdm-industri-di-tengah-maraknya-phk-massal'
    }
  ];

  const categories = ['all', 'Expansion', 'Collaboration', 'Innovation', 'Technology', 'Industry'];

  const getCategoryColor = (category) => {
    const colors = {
      'Expansion': 'bg-red-50 text-red-700 border border-red-200',
      'Collaboration': 'bg-indigo-50 text-indigo-700 border border-indigo-200',
      'Innovation': 'bg-blue-50 text-blue-700 border border-blue-200',
      'Technology': 'bg-cyan-50 text-cyan-700 border border-cyan-200',
      'Industry': 'bg-amber-50 text-amber-700 border border-amber-200'
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border border-gray-200';
  };

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
      <section id="news-section" className={`${designTokens.spacing.section.py} bg-gradient-to-b from-white to-gray-50`}>
        <div className={designTokens.spacing.container.default}>
          {/* Section Header - UPDATED */}
          <div className="mb-20">
            {/* Subtitle Label */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-orange-600"></div>
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">Latest Updates</span>
            </div>

            {/* Main Title - SAMA SEPERTI HALAMAN LAIN */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured <span style={{ color: designTokens.colors.primary.orange }}>News</span>
            </h2>

            {/* Decorative Lines */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-1 w-20 bg-gradient-to-r from-orange-600 via-blue-900 to-transparent rounded-full"></div>
              <div className="h-1 w-20 bg-gradient-to-r from-blue-900 to-transparent rounded-full"></div>
            </div>

            {/* Subtitle */}
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover the latest developments and achievements from PT. Globalindo Intimates
            </p>
          </div>

          {/* Category Filter */}
          <div className={`flex flex-wrap gap-3 mb-16 ${designTokens.spacing.stack.md}`}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-base ${
                  selectedCategory === cat
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102'
                }`}
                style={{
                  backgroundColor: selectedCategory === cat ? designTokens.colors.primary.orange : undefined
                }}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          {/* News Grid */}
          <div className={designTokens.grids.threeCol.container}>
            {news
              .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
              .map((item, idx) => (
              <div
                key={item.id}
                className="group card-base flex flex-col overflow-hidden hover:-translate-y-2 transition-base"
                style={{
                  animationDelay: `${idx * 50}ms`
                }}
              >
                {/* Image Section with Badge */}
                <div className="relative overflow-hidden">
                  <div className="relative h-44 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover hover-scale"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23E5E7EB" width="400" height="300"/%3E%3Ctext x="50%" y="50%" font-size="16" fill="%239CA3AF" text-anchor="middle" dy=".3em"%3ENot Found%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  
                  {/* Category Badge - Floating */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md transition-base ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 flex flex-col">
                  {/* Date */}
                  <div className="flex items-center gap-2 mb-4">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: designTokens.colors.primary.orange }}
                    ></div>
                    <span className={`${designTokens.typography.bodySm} text-gray-500 font-medium`}>
                      {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`${designTokens.typography.h4} mb-3 truncate-2 group-hover:text-orange-600 transition-base leading-snug`}>
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  <p className={`${designTokens.typography.bodyBase} text-gray-600 truncate-2 mb-5 flex-1 leading-relaxed`}>
                    {item.excerpt}
                  </p>

                  {/* Read More Link with Arrow Animation */}
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 font-semibold transition-base group/btn"
                    style={{ color: designTokens.colors.primary.orange }}
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-16">
            <button 
              className={`${designTokens.buttons.sizes.md} border-2 font-bold rounded-lg transition-base hover-scale`}
              style={{
                borderColor: designTokens.colors.primary.orange,
                color: designTokens.colors.primary.orange
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = designTokens.colors.primary.orange;
                e.target.style.color = 'white';
                e.target.style.boxShadow = `0 10px 25px ${designTokens.colors.primary.orange}30`;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = designTokens.colors.primary.orange;
                e.target.style.boxShadow = 'none';
              }}
            >
              Load More Articles
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsSection;