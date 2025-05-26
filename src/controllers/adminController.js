// controllers/adminController.js
const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const User = require('../models/User');

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



// -------------------- Quản lý Sản phẩm --------------------
exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('category');
    res.render('adminProducts', { products, user: req.session.user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.addProductForm = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.render('adminAddProduct', { categories, user: req.session.user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock } = req.body;
    // Tuỳ ý xử lý upload ảnh nếu cần
    const product = new Product({
      name,
      description,
      price,
      category,
      brand,
      stock,
      images: [] // bạn có thể push file upload vào đây
    });
    await product.save();
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.editProductForm = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const categories = await Category.find({});
    if (!product) return res.status(404).send('Không tìm thấy sản phẩm');
    res.render('adminEditProduct', { product, categories, user: req.session.user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, stock } = req.body;
    await Product.findByIdAndUpdate(req.params.id, {
      name,
      description,
      price,
      category,
      brand,
      stock
      // images: ...
    });
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// -------------------- Quản lý Đơn hàng --------------------
exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user').sort({ createdAt: -1 });
    res.render('adminOrders', { orders, user: req.session.user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.orderDetail = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user')
      .populate('products.product');
    if (!order) return res.status(404).send('Không tìm thấy đơn hàng');
    res.render('adminOrderDetail', { order, user: req.session.user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// -------------------- Quản lý Danh mục --------------------
exports.listCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.render('adminCategories', { categories, user: req.session.user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.addCategoryForm = (req, res) => {
  res.render('adminAddCategory', { user: req.session.user });
};

exports.addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.redirect('/admin/categories');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.editCategoryForm = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send('Không tìm thấy danh mục');
    res.render('adminEditCategory', { category, user: req.session.user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    await Category.findByIdAndUpdate(req.params.id, { name, description });
    res.redirect('/admin/categories');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.redirect('/admin/categories');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// -------------------- Quản lý Người dùng --------------------
exports.listUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.render('adminUsers', { users, user: req.session.user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
