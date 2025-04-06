const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

function adminAuth(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).send('Không có quyền truy cập');
  }
}

router.get('/', adminAuth, adminController.dashboard);

router.post('/products', adminAuth, adminController.addProduct);
router.post('/products/update/:id', adminAuth, adminController.updateProduct);
router.get('/products/delete/:id', adminAuth, adminController.deleteProduct);

module.exports = router;
