/* eslint-disable no-undef */

import jwt from 'jsonwebtoken';

// ============================================
// VERIFY TOKEN MIDDLEWARE
// ============================================

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    console.log('🔍 Authorization header:', authHeader ? '✅ Ada' : '❌ Kosong');
    
    if (!authHeader) {
      console.log('❌ No authorization header');
      return res.status(401).json({
        success: false,
        error: 'No token provided'
      });
    }

    // Ekstrak token (format: "Bearer token123")
    const token = authHeader.split(' ')[1];
    
    console.log('🔑 Token:', token ? '✅ Ada' : '❌ Kosong');
    
    if (!token) {
      console.log('❌ No token after split');
      return res.status(401).json({
        success: false,
        error: 'Invalid token format'
      });
    }

    // Validasi JWT_SECRET ada
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET not defined in .env');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error'
      });
    }

    // Verifikasi token dengan JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log('✅ Token verified for:', decoded.username);
    
    // Simpan decoded data ke req.admin untuk digunakan di controller
    req.admin = decoded;
    
    // Lanjutkan ke next middleware/controller
    next();
    
  } catch (error) {
    console.error('❌ Token verification error:', error.message);
    
    // Jika token expired
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token sudah expired'
      });
    }
    
    // Jika token invalid
    res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }
};