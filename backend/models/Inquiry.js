/* eslint-disable no-undef */

import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    phone: {
      type: String,
      required: [true, 'Phone is required']
    },
    subject: {
      type: String,
      required: [true, 'Subject is required']
    },
    message: {
      type: String,
      required: [true, 'Message is required']
    },
    status: {
      type: String,
      enum: ['pending', 'read', 'replied'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;