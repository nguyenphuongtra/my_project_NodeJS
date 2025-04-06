const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.render('register', { error: 'Email đã tồn tại', user: req.session.user });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    req.session.user = user;
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.render('login', { error: 'Thông tin đăng nhập không hợp lệ', user: req.session.user });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.render('login', { error: 'Thông tin đăng nhập không hợp lệ', user: req.session.user });

    req.session.user = user;
    res.redirect('/');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

exports.profile = async (req, res) => {
  if (!req.session.user) return res.redirect('/users/login');
  res.send(req.session.user);
};
