/* eslint-disable no-undef */

import express from 'express';
import * as inquiryController from '../controllers/inquiryController.js';

const router = express.Router();

// GET all inquiries (admin only)
router.get('/', inquiryController.getAllInquiries);

// GET inquiry by ID
router.get('/:id', inquiryController.getInquiryById);

// CREATE inquiry (PUBLIC - tanpa token)
router.post('/', inquiryController.createInquiry);

// UPDATE inquiry status (admin only)
router.put('/:id', inquiryController.updateInquiry);

// DELETE inquiry (admin only)
router.delete('/:id', inquiryController.deleteInquiry);

export default router;