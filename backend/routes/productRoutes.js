import express from 'express';
import * as productController from '../controllers/productController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES (bisa diakses semua)
// ============================================

// GET semua produk - PUBLIC (tidak perlu token)
router.get('/', productController.getAllProducts);

// GET detail 1 produk - PUBLIC (tidak perlu token)
router.get('/:id', productController.getProductById);

// ============================================
// PROTECTED ROUTES (hanya admin dengan token)
// ============================================

// POST - Buat produk baru - PROTECTED
router.post('/', verifyToken, productController.createProduct);

// PUT - Edit produk - PROTECTED
router.put('/:id', verifyToken, productController.updateProduct);

// DELETE - Hapus produk - PROTECTED
router.delete('/:id', verifyToken, productController.deleteProduct);

export default router;