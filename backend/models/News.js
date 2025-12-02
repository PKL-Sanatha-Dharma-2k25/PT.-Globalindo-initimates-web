/* eslint-disable no-undef */

import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 200
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    },
    excerpt: {
      type: String,
      trim: true,
      maxlength: 300
    },
    category: {
      type: String,
      enum: ['product', 'company', 'industry', 'event', 'other'],
      default: 'other'
    },
    author: {
      type: String,
      default: 'Admin'
    },
    image: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    },
    source: {
      type: String,
      default: 'PT. Globalindo Intimates'
    },
    sourceUrl: {
      type: String,
      default: ''
    },
    views: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('News', newsSchema);