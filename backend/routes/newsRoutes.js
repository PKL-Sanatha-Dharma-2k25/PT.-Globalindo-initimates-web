/* eslint-disable no-undef */

import express from 'express';
import * as newsController from '../controllers/newsController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES (tanpa token)
// ============================================

// GET all news (published only)
router.get('/', newsController.getAllNews);

// GET news by ID
router.get('/:id', newsController.getNewsById);

// ============================================
// PROTECTED ROUTES (dengan token - Admin only)
// ============================================

// CREATE news
router.post('/', verifyToken, newsController.createNews);

// UPDATE news
router.put('/:id', verifyToken, newsController.updateNews);

// DELETE news
router.delete('/:id', verifyToken, newsController.deleteNews);

export default router;