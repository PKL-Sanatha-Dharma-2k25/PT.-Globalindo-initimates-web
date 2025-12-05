import React, { useState, useEffect } from 'react';
import { Search, Calendar, ArrowRight, ArrowLeft, Loader, ExternalLink } from 'lucide-react';
import designTokens from '@/constants/designTokens';

const API_URL = 'http://localhost:5000/api';

export default function NewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
 

  // Fetch news from database only
  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/news`);
      const data = await res.json();
      
      if (data.success) {
        setNewsList(data.data);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter news - hapus filterType karena tidak ada type di database
  const filteredNews = newsList.filter(news => {
    const matchSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       (news.description && news.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                       (news.excerpt && news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchSearch;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'product': 'bg-blue-50 text-blue-700 border border-blue-200',
      'company': 'bg-indigo-50 text-indigo-700 border border-indigo-200',
      'industry': 'bg-amber-50 text-amber-700 border border-amber-200',
      'event': 'bg-red-50 text-red-700 border border-red-200',
      'other': 'bg-gray-50 text-gray-700 border border-gray-200'
    };
    return colors[category] || 'bg-gray-50 text-gray-700 border border-gray-200';
  };

  // Detail view
  if (selectedNews) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20 pb-12">
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
        
        <div style={{ maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
          {/* Back Button */}
          <button
            onClick={() => setSelectedNews(null)}
            className="flex items-center gap-2 font-semibold mb-8 transition-all hover:-translate-x-1"
            style={{ color: designTokens.colors.primary.orange }}
          >
            <ArrowLeft size={20} />
            Back to News
          </button>

          {/* Article */}
          <article style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            {/* Hero Image - FIXED: Support both image fields */}
            {(selectedNews.urlToImage || selectedNews.image) && (
              <div style={{ width: '100%', height: '400px', overflow: 'hidden', backgroundColor: '#e5e7eb' }}>
                <img
                  src={selectedNews.urlToImage || `http://localhost:5000/${selectedNews.image}`}
                  alt={selectedNews.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23E5E7EB" width="400" height="300"/%3E%3C/svg%3E';
                  }}
                />
              </div>
            )}

            {/* Content */}
            <div style={{ padding: '2rem' }}>
              {/* Title */}
              <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
                {selectedNews.title}
              </h1>

              {/* Meta Info - FIXED: Support both date fields and source fields */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid #e5e7eb', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563' }}>
                  <Calendar size={18} />
                  <span>{formatDate(selectedNews.publishedAt || selectedNews.createdAt)}</span>
                </div>
                <div>
                  <span className={getCategoryColor(selectedNews.category)}>
                    {selectedNews.category}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563' }}>
                  <span>✍️ {selectedNews.source || 'PT. Globalindo Intimates'}</span>
                </div>
              </div>

              {/* Main Content */}
              <div style={{ color: '#374151', lineHeight: '1.75', fontSize: '1rem', marginBottom: '2rem', whiteSpace: 'pre-wrap' }}>
                {selectedNews.content || selectedNews.description || selectedNews.excerpt}
              </div>

              {/* External Link Button or Source Info */}
              {selectedNews.sourceUrl && (
                <a
                  href={selectedNews.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    paddingLeft: '1.5rem',
                    paddingRight: '1.5rem',
                    paddingTop: '0.75rem',
                    paddingBottom: '0.75rem',
                    backgroundColor: designTokens.colors.primary.orange,
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(249, 115, 22, 0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Read on {selectedNews.source || 'Source'}
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </article>

          {/* Related News */}
          <div style={{ marginTop: '3rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>
              Related News
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {newsList
                .filter(n => n._id !== selectedNews._id && n.category === selectedNews.category)
                .slice(0, 3)
                .map(news => (
                  <button
                    key={news._id}
                    onClick={() => setSelectedNews(news)}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      overflow: 'hidden',
                      textAlign: 'left',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.15)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {(news.urlToImage || news.image) && (
                      <div style={{ width: '100%', height: '200px', overflow: 'hidden', backgroundColor: '#e5e7eb' }}>
                        <img
                          src={news.urlToImage || `http://localhost:5000/${news.image}`}
                          alt={news.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23E5E7EB" width="400" height="300"/%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                    )}
                    <div style={{ padding: '1rem' }}>
                      <h3 style={{ fontWeight: '600', color: '#111827', marginBottom: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {news.title}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {formatDate(news.publishedAt || news.createdAt)}
                      </p>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List view - PENTING: TAMBAHKAN id="news-section" DI SINI
  return (
    <div id="news-section" className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20 pb-12">
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
      
      <div style={{ maxWidth: '1200px', marginLeft: 'auto', marginRight: 'auto', paddingLeft: '1rem', paddingRight: '1rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ width: '32px', height: '1px', backgroundColor: designTokens.colors.primary.orange }}></div>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6b7280' }}>
              Latest Updates
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.875rem, 5vw, 2.25rem)', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
            Featured <span style={{ color: designTokens.colors.primary.orange }}>News</span>
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ height: '4px', width: '80px', background: `linear-gradient(to right, ${designTokens.colors.primary.orange}, ${designTokens.colors.primary.blue}, transparent)`, borderRadius: '9999px' }}></div>
            <div style={{ height: '4px', width: '80px', background: `linear-gradient(to right, ${designTokens.colors.primary.blue}, transparent)`, borderRadius: '9999px' }}></div>
          </div>

          <p style={{ fontSize: '1.125rem', color: '#4b5563', maxWidth: '500px' }}>
            Discover the latest developments and achievements from PT. Globalindo Intimates
          </p>
        </div>

        {/* Search */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '0.75rem', top: '0.75rem', color: '#9ca3af' }} size={20} />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                paddingLeft: '2.5rem',
                paddingRight: '1rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = designTokens.colors.primary.orange}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '3rem', paddingBottom: '3rem' }}>
            <Loader style={{ animation: 'spin 1s linear infinite', color: designTokens.colors.primary.orange }} size={40} />
          </div>
        ) : filteredNews.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
            <p style={{ fontSize: '1.125rem' }}>No news found matching your search</p>
          </div>
        ) : (
          <>
            {/* Featured News */}
            {filteredNews.length > 0 && (
              <button
                onClick={() => setSelectedNews(filteredNews[0])}
                style={{
                  width: '100%',
                  marginBottom: '2rem',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {(filteredNews[0].urlToImage || filteredNews[0].image) && (
                  <div style={{ height: '300px', overflow: 'hidden', backgroundColor: '#e5e7eb' }}>
                    <img
                      src={filteredNews[0].urlToImage || `http://localhost:5000/${filteredNews[0].image}`}
                      alt={filteredNews[0].title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23E5E7EB" width="400" height="300"/%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                )}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className={getCategoryColor(filteredNews[0].category)} style={{ display: 'inline-block', marginBottom: '1rem', width: 'fit-content' }}>
                    {filteredNews[0].category}
                  </div>
                  <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
                    {filteredNews[0].title}
                  </h2>
                  <p style={{ color: '#4b5563', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {filteredNews[0].excerpt || filteredNews[0].description}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem', color: '#6b7280' }}>
                    <span>{formatDate(filteredNews[0].publishedAt || filteredNews[0].createdAt)}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: designTokens.colors.primary.orange, fontWeight: '600' }}>
                      Read <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </button>
            )}

            {/* News Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {filteredNews.slice(1).map(news => (
                <button
                  key={news._id || news.title}
                  onClick={() => setSelectedNews(news)}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                    overflow: 'hidden',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.1)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {(news.urlToImage || news.image) && (
                    <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#e5e7eb' }}>
                      <img
                        src={news.urlToImage || `http://localhost:5000/${news.image}`}
                        alt={news.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23E5E7EB" width="400" height="300"/%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                  )}
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '0.75rem' }}>
                      <span className={getCategoryColor(news.category)} style={{ display: 'inline-block', padding: '4px 8px' }}>
                        {news.category}
                      </span>
                    </div>

                    <h3 style={{ fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {news.title}
                    </h3>

                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {news.excerpt || news.description}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem', color: '#6b7280' }}>
                      <span>{formatDate(news.publishedAt || news.createdAt)}</span>
                      <span style={{ color: designTokens.colors.primary.orange, fontWeight: '600' }}>Read →</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}