const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/register', (req, res) => res.render('register', { error: null, user: req.session.user }));
router.post('/register', userController.register);


router.get('/login', (req, res) => res.render('login', { error: null, user: req.session.user }));
router.post('/login', userController.login);
router.get('/logout', userController.logout);

module.exports = router;
  