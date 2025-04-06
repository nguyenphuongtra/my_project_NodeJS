const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/add', cartController.addToCart);

router.get('/', cartController.viewCart);

router.post('/update', cartController.updateCart);
 
router.post('/remove', cartController.removeFromCart);

router.post('/checkout', cartController.checkout);

module.exports = router;
router.post('/add-buy-now', (req, res) => {
    const { productId, quantity } = req.body;
    const qty = parseInt(quantity) || 1;
    
    if (!req.session.cart) {
      req.session.cart = [];
    }
  
    const index = req.session.cart.findIndex(item => item.product._id.toString() === productId);
    if (index !== -1) {
      req.session.cart[index].quantity += qty;
    } else {
      Product.findById(productId, (err, product) => {
        if (err || !product) {
          return res.redirect('back');
        }
        req.session.cart.push({ product, quantity: qty });
        return res.redirect('/order-summary');
      });
      return; 
    }
    res.redirect('/order-summary');
  });