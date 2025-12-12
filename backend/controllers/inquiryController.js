/* eslint-disable no-undef */

import Inquiry from '../models/Inquiry.js';

// Dynamic import emailService (loaded after dotenv is ready)

// ============================================
// GET ALL INQUIRIES (Admin)
// ============================================
export const getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (err) {
    console.error('Get inquiries error:', err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ============================================
// GET INQUIRY BY ID
// ============================================
export const getInquiryById = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        error: 'Inquiry not found'
      });
    }
    
    res.json({
      success: true,
      data: inquiry
    });
  } catch (err) {
    console.error('Get inquiry error:', err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ============================================
// CREATE INQUIRY (PUBLIC)
// ============================================
export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validasi
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Semua field harus diisi'
      });
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email tidak valid'
      });
    }

    const inquiry = new Inquiry({
      name,
      email,
      phone,
      subject,
      message,
      status: 'pending'
    });

    await inquiry.save();

    // Send email notifications (non-blocking)
    // Import dynamic saat dibutuhkan
    try {
      const { sendInquiryNotification, sendInquiryConfirmation } = await import('../utils/emailService.js');
      
      // Send to admin
      await sendInquiryNotification(inquiry);
      
      // Send confirmation to customer
      await sendInquiryConfirmation(inquiry);
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr.message);
      // Jangan reject inquiry jika email gagal
    }

    res.status(201).json({
      success: true,
      message: 'Inquiry berhasil dikirim',
      data: inquiry
    });
  } catch (err) {
    console.error('Create inquiry error:', err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ============================================
// UPDATE INQUIRY (Admin)
// ============================================
export const updateInquiry = async (req, res) => {
  try {
    const { status } = req.body;

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        error: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      message: 'Inquiry updated',
      data: inquiry
    });
  } catch (err) {
    console.error('Update inquiry error:', err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// ============================================
// DELETE INQUIRY (Admin)
// ============================================
export const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        error: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      message: 'Inquiry deleted'
    });
  } catch (err) {
    console.error('Delete inquiry error:', err);
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};