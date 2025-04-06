// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');


const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const adminRoutes = require('./routes/admin');
const cartRoutes = require('./routes/cart');
const apiRoutes = require('./routes/api');
const homeController = require('./controllers/homeController');


const app = express();

mongoose
  .connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secretKey',
  resave: false,
  saveUninitialized: false,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminRoutes);
app.use('/cart', cartRoutes);
app.use('/api', apiRoutes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', homeController.home);
app.get('/about', (req, res) => {
  res.render('about', { user: req.session.user });
});
app.get('/contact', (req, res) => {
  res.render('contact', {
    user: req.session.user 
  });
});
app.get('/', (req, res) => {
  res.render('index', { user: req.session.user });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get('/api/check-login', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});
app.get('/order-summary', (req, res) => {
  const cart = req.session.cart || [];
  
  let totalPrice = 0;
  cart.forEach(item => {
    totalPrice += item.product.price * item.quantity;
  });

  res.render('order', { cart, totalPrice, user: req.session.user });
});
app.get('/checkout', (req, res) => {
  const cart = req.session.cart || [];
  let totalPrice = 0;
  cart.forEach(item => {
    totalPrice += item.product.price * item.quantity;
  });
  res.render('checkout', { cart, totalPrice, user: req.session.user });
});
app.post('/checkout', (req, res) => {
  req.session.cart = [];
  res.send('Thanh toán thành công!');
});
