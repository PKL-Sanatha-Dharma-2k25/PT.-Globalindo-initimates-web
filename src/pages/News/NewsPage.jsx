// ============================================
// 📄 FILE 3: src/pages/News/NewsPage.jsx
// ============================================
import React, { useEffect } from 'react';
import NewsHero from '../../components/sections/News/NewsHero';
import NewsSection from '../../components/sections/News/NewsSection';

const NewsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="bg-white">
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <NewsHero />

        {/* News Section */}
        <NewsSection />
      </main>
    </div>
  );
};

export default NewsPage;