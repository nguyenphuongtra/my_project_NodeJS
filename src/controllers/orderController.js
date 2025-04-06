const Order = require('../models/Order');
const Product = require('../models/Product');

exports.checkout = async (req, res) => {
  try {
    const { products, shippingAddress, paymentMethod } = req.body;
    let totalAmount = 0;
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (product) {
        totalAmount += product.price * item.quantity;
      }
    }
    const order = new Order({
      user: req.session.user._id,
      products,
      shippingAddress,
      paymentMethod,
      totalAmount,
      status: 'pending'
    });
    await order.save();
    res.redirect('/orders/myorders');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.myOrders = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/users/login');
    const orders = await Order.find({ user: req.session.user._id }).populate('products.product');
    res.render('orders', { orders, user: req.session.user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
