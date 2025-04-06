const mongoose = require('mongoose');
// Hàm định nghĩa cấu trúc dữ liệu của đơn hàng
const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }],
  totalAmount: Number,
  status: { type: String, default: 'pending' }, 
  shippingAddress: String,
  paymentMethod: String,
});

module.exports = mongoose.model('Order', OrderSchema);
