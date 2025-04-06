  const Product = require('../models/Product');
  const Category = require('../models/Category');
  const Order = require('../models/Order');
  exports.dashboard = async (req, res) => {
    res.render('adminDashboard', { user: req.session.user });
  };

  exports.addProduct = async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.redirect('/admin');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  exports.updateProduct = async (req, res) => {
    try {
      await Product.findByIdAndUpdate(req.params.id, req.body);
      res.redirect('/admin');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  exports.deleteProduct = async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.redirect('/admin');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  exports.dashboard = async (req, res) => {
    try {
      const products = await Product.find({}).populate('category');
      const orders = await Order.find({}).populate('user');
  
      res.render('adminDashboard', {
        products,
        orders,
        user: req.session.user
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };