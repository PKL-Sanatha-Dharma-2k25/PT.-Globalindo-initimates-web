import express from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// ============================================
// LOGIN - PUBLIC (tanpa middleware)
// ============================================
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('🔐 Login attempt:', username);

    // Get credentials dari .env
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

    // Validasi input
    if (!username || !password) {
      console.log('❌ Missing username or password');
      return res.status(400).json({
        success: false,
        error: 'Username dan password harus diisi'
      });
    }

    // Validasi credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      console.log('❌ Invalid credentials');
      return res.status(401).json({
        success: false,
        error: 'Invalid username or password'
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

    // Generate JWT token
    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    console.log('✅ Token generated for:', username);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { username, role: 'admin' }
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({
      success: false,
      error: 'Login failed: ' + err.message
    });
  }
});

// ============================================
// VERIFY TOKEN - PUBLIC (untuk cek token valid)
// ============================================
router.post('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    console.log('🔍 Verify token request');

    if (!token) {
      console.log('❌ No token provided');
      return res.status(401).json({
        success: false,
        error: 'No token provided'
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

    // Verifikasi dengan JWT_SECRET yang sama
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    console.log('✅ Token valid for:', decoded.username);

    res.json({
      success: true,
      user: decoded
    });
  } catch (err) {
    console.error('❌ Verify error:', err.message);
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Token sudah expired'
      });
    }

    res.status(401).json({
      success: false,
      error: 'Invalid token'
    });
  }
});

// ============================================
// CHECK AUTH - PROTECTED (gunakan verifyToken)
// ============================================
router.get('/check', verifyToken, (req, res) => {
  try {
    console.log('✅ Auth check for:', req.admin.username);
    
    res.json({
      success: true,
      user: req.admin
    });
  } catch (err) {
    console.error('❌ Auth check error:', err);
    res.status(500).json({
      success: false,
      error: 'Auth check failed'
    });
  }
});

export default router;