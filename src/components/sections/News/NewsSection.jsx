import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Loader } from 'lucide-react';
import designTokens from '@/constants/designTokens';

const API_URL = 'http://localhost:5000/api';

const NewsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(['all']);

  // Fetch news from backend
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/news`);
      const data = await res.json();
      
      if (data.success && data.data) {
        setNews(data.data);
        
        // Extract unique categories from fetched news
        const uniqueCategories = ['all', ...new Set(data.data.map(item => item.category))];
        setCategories(uniqueCategories);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'product': 'bg-red-50 text-red-700 border border-red-200',
      'company': 'bg-indigo-50 text-indigo-700 border border-indigo-200',
      'industry': 'bg-blue-50 text-blue-700 border border-blue-200',
      'event': 'bg-cyan-50 text-cyan-700 border border-cyan-200',
      'Expansion': 'bg-red-50 text-red-700 border border-red-200',
      'Collaboration': 'bg-indigo-50 text-indigo-700 border border-indigo-200',
      'Innovation': 'bg-blue-50 text-blue-700 border border-blue-200',
      'Technology': 'bg-cyan-50 text-cyan-700 border border-cyan-200',
      'Industry': 'bg-amber-50 text-amber-700 border border-amber-200'
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border border-gray-200';
  };

  // Filter news by selected category
  const filteredNews = news.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

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
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .spinner {
            animation: spin 1s linear infinite;
          }
        `}
      </style>
      <section id="news-section" className={`${designTokens.spacing.section.py} bg-gradient-to-b from-white to-gray-50`}>
        <div className={designTokens.spacing.container.default}>
          {/* Section Header */}
          <div className="mb-20">
            {/* Subtitle Label */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-orange-600"></div>
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">Latest Updates</span>
            </div>

            {/* Main Title */}
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
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
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

          {/* Loading State */}
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '3rem', paddingBottom: '3rem' }}>
              <Loader className="spinner" size={40} style={{ color: designTokens.colors.primary.orange }} />
            </div>
          ) : filteredNews.length === 0 ? (
            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
              <p style={{ fontSize: '1.125rem' }}>No news found in this category</p>
            </div>
          ) : (
            <>
              {/* News Grid */}
              <div className={designTokens.grids.threeCol.container}>
                {filteredNews.map((item, idx) => (
                  <div
                    key={item._id || item.id || idx}
                    className="group card-base flex flex-col overflow-hidden hover:-translate-y-2 transition-all"
                    style={{
                      animationDelay: `${idx * 50}ms`
                    }}
                  >
                    {/* Image Section with Badge */}
                    <div className="relative overflow-hidden">
                      <div className="relative h-44 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden">
                        <img 
                          src={item.image || item.urlToImage || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23E5E7EB" width="400" height="300"/%3E%3C/svg%3E'}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23E5E7EB" width="400" height="300"/%3E%3Ctext x="50%" y="50%" font-size="16" fill="%239CA3AF" text-anchor="middle" dy=".3em"%3ENot Found%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                      
                      {/* Category Badge - Floating */}
                      <div className="absolute top-3 right-3">
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md transition-all ${getCategoryColor(item.category)}`}>
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
                          {item.publishedAt ? new Date(item.publishedAt).getFullYear() : new Date(item.createdAt).getFullYear()}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className={`${designTokens.typography.h4} mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors leading-snug`}>
                        {item.title}
                      </h3>

                      {/* Excerpt */}
                      <p className={`${designTokens.typography.bodyBase} text-gray-600 line-clamp-2 mb-5 flex-1 leading-relaxed`}>
                        {item.excerpt || item.description || item.content}
                      </p>

                      {/* Read More Link with Arrow Animation */}
                      <a 
                        href={item.sourceUrl || '#'}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 font-semibold transition-all group/btn"
                        style={{ color: designTokens.colors.primary.orange }}
                        onClick={(e) => {
                          if (!item.sourceUrl) {
                            e.preventDefault();
                          }
                        }}
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
                  className={`${designTokens.buttons.sizes.md} border-2 font-bold rounded-lg transition-all hover:scale-105`}
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
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default NewsSection;