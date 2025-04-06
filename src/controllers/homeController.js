const Product = require('../models/Product');
const Category = require('../models/Category');
exports.home = async (req, res) => {
  try {
    const products = await Product.find({});
    const categories = await Category.find({});
    res.render('index', {
      user: req.session.user, 
      products ,
      categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Lỗi server");
  }
};
