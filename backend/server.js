// ============================================
// LOAD ENV VARIABLES FIRST!
// ============================================
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env dari current directory
dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log('🔍 DEBUG .env:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);

// ============================================
// THEN IMPORT EVERYTHING ELSE
// ============================================
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import multer from 'multer';

// ============================================
// IMPORT ROUTES
// ============================================
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import newsRoutes from './routes/newsRoutes.js';

const app = express();

// ============================================
// MIDDLEWARE
// ============================================
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files

// ============================================
// MULTER FILE UPLOAD
// ============================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'public/uploads/products');
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Upload endpoint (PUBLIC - tanpa token)
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }
  
  res.json({
    success: true,
    filePath: `uploads/products/${req.file.filename}`
  });
});

// ============================================
// DATABASE CONNECTION
// ============================================
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    console.error('❌ MongoDB error:', err.message);
    process.exit(1);
  });

// ============================================
// ROUTES REGISTRATION
// ============================================

// 🔓 PUBLIC ROUTES (tanpa token)
app.use('/api/auth', authRoutes);

// 📦 PRODUCT ROUTES - HYBRID (GET public, POST/PUT/DELETE protected)
// Middleware untuk protected routes ada di dalam productRoutes
app.use('/api/products', productRoutes);

// 📧 INQUIRY ROUTES - PUBLIC (tanpa token protection)
app.use('/api/inquiries', inquiryRoutes);

// 📰 NEWS ROUTES - HYBRID (GET public, POST/PUT/DELETE protected)
app.use('/api/news', newsRoutes);

// ============================================
// HEALTH CHECK (PUBLIC)
// ============================================
app.get('/api/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? '✅ Connected' : '❌ Disconnected';
  res.json({ 
    message: '✅ Backend is running!',
    mongoStatus: mongoStatus,
    timestamp: new Date()
  });
});

// ============================================
// ERROR HANDLING - PENTING URUTAN!
// ============================================

// Error handling middleware (untuk async errors)
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
  });
});

// 404 handler (PALING AKHIR!)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Health Check: GET http://localhost:${PORT}/api/health`);
  console.log(`🔐 Login: POST http://localhost:${PORT}/api/auth/login`);
  console.log(`📦 Products (GET public, POST/PUT/DELETE protected): http://localhost:${PORT}/api/products`);
  console.log(`📧 Inquiries (PUBLIC): POST http://localhost:${PORT}/api/inquiries`);
  console.log(`📰 News (GET public, POST/PUT/DELETE protected): http://localhost:${PORT}/api/news`);
});