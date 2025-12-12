/* eslint-disable no-undef */

import News from '../models/News.js';

// ============================================
// GET ALL NEWS (Database only - Published)
// ============================================
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find({ status: 'published' })
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json({
      success: true,
      count: news.length,
      data: news
    });
  } catch (err) {
    console.error('Error getting news:', err.message);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ============================================
// GET NEWS BY ID
// ============================================
export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({
        success: false,
        error: 'Berita tidak ditemukan'
      });
    }
    
    res.json({
      success: true,
      data: news
    });
  } catch (err) {
    console.error('Error getting news:', err.message);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ============================================
// CREATE NEWS
// ============================================
export const createNews = async (req, res) => {
  try {
    const { title, content, category, image, excerpt, source, sourceUrl } = req.body;
    
    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        error: 'Title, content, dan category harus diisi'
      });
    }
    
    const newNews = new News({
      title,
      content,
      category,
      image: image || '',
      excerpt: excerpt || content.substring(0, 150),
      author: 'Admin',
      status: 'published',
      source: source || 'PT. Globalindo Intimates',
      sourceUrl: sourceUrl || ''
    });
    
    await newNews.save();
    
    res.status(201).json({
      success: true,
      message: 'Berita berhasil ditambahkan',
      data: newNews
    });
  } catch (err) {
    console.error('Error creating news:', err.message);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ============================================
// UPDATE NEWS
// ============================================
export const updateNews = async (req, res) => {
  try {
    const { title, content, category, image, excerpt, status, source, sourceUrl } = req.body;
    
    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({
        success: false,
        error: 'Berita tidak ditemukan'
      });
    }
    
    if (title) news.title = title;
    if (content) news.content = content;
    if (category) news.category = category;
    if (image) news.image = image;
    if (excerpt) news.excerpt = excerpt;
    if (status) news.status = status;
    if (source) news.source = source;
    if (sourceUrl !== undefined) news.sourceUrl = sourceUrl;
    
    await news.save();
    
    res.json({
      success: true,
      message: 'Berita berhasil diupdate',
      data: news
    });
  } catch (err) {
    console.error('Error updating news:', err.message);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ============================================
// DELETE NEWS
// ============================================
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    
    if (!news) {
      return res.status(404).json({
        success: false,
        error: 'Berita tidak ditemukan'
      });
    }
    
    res.json({
      success: true,
      message: 'Berita berhasil dihapus',
      data: news
    });
  } catch (err) {
    console.error('Error deleting news:', err.message);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};