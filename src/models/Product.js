const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: {String},
  price: { type: Number, required: true },
  images: [String],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  ratings: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  options: {
    sizes: [String],
    colors: [String]
  },
  brand: String,
});

module.exports = mongoose.model('Product', ProductSchema);
