import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  unit: {
    type: String,
    default: '/kg',
  },
  image: {
    type: String, 
    // This will be the path to the uploaded image or a URL
  },
  icon: {
    type: String, 
    default: 'fas fa-fish',
  },
  certification: {
    type: String,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  stockQuantity: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
