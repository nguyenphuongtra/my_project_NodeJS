const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const qty = parseInt(quantity) || 1;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Sản phẩm không tồn tại');
    }

    if (!req.session.cart) {
      req.session.cart = [];
    }

    const index = req.session.cart.findIndex(item => item.product._id.toString() === productId);
    if (index !== -1) {
         req.session.cart[index].quantity += qty;
    } else {
      req.session.cart.push({ product, quantity: qty });
    }

    res.redirect('/cart');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.viewCart = (req, res) => {
  const cart = req.session.cart || [];
  res.render('cart', { cart, user: req.session.user });
};

exports.updateCart = (req, res) => {
  try {
    const { productId, action } = req.body;
    if (!req.session.cart) {
      req.session.cart = [];
    }
    const index = req.session.cart.findIndex(item => item.product._id.toString() === productId);
    if (index === -1) {
      return res.redirect('/cart');
    }

    if (action === 'increase') {
      req.session.cart[index].quantity += 1;
    } else if (action === 'decrease') {
      req.session.cart[index].quantity = Math.max(req.session.cart[index].quantity - 1, 1);
    }
    res.redirect('/cart');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.removeFromCart = (req, res) => {
  try {
    const { productId } = req.body;
    if (!req.session.cart) {
      req.session.cart = [];
    }
    req.session.cart = req.session.cart.filter(item => item.product._id.toString() !== productId);
    res.redirect('/cart');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.checkout = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Bạn cần đăng nhập để tiến hành thanh toán." });
  }
  req.session.cart = [];
  res.send("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
};
