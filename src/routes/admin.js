// routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Middleware kiểm tra quyền admin
function adminAuth(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  return res.status(403).send('Bạn không có quyền truy cập trang này');
}

// Dashboard
router.get('/', adminAuth, adminController.dashboard);

// Quản lý sản phẩm
router.get('/products', adminAuth, adminController.listProducts);
router.get('/products/add', adminAuth, adminController.addProductForm);
router.post('/products/add', adminAuth, adminController.addProduct);
router.get('/products/edit/:id', adminAuth, adminController.editProductForm);
router.post('/products/edit/:id', adminAuth, adminController.updateProduct);
router.get('/products/delete/:id', adminAuth, adminController.deleteProduct);

// Quản lý đơn hàng
router.get('/orders', adminAuth, adminController.listOrders);
router.get('/orders/:id', adminAuth, adminController.orderDetail);

// Quản lý danh mục
router.get('/categories', adminAuth, adminController.listCategories);
router.get('/categories/add', adminAuth, adminController.addCategoryForm);
router.post('/categories/add', adminAuth, adminController.addCategory);
router.get('/categories/edit/:id', adminAuth, adminController.editCategoryForm);
router.post('/categories/edit/:id', adminAuth, adminController.updateCategory);
router.get('/categories/delete/:id', adminAuth, adminController.deleteCategory);

// Quản lý người dùng
router.get('/users', adminAuth, adminController.listUsers);
router.post('/add', adminAuth, adminController.addProduct);

module.exports = router;
