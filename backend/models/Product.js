import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  image: String,
  mainImage: String,
  descriptionShort: String,
  descriptionLong: String,
  variantImages: [String],
  features: [String],
  layersProtection: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', productSchema);