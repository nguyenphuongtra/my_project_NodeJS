const Product = require('../models/Product');
const Category = require('../models/Category');

exports.listProducts = async (req, res) => {
  try {
    const { category, price, brand, search } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }
    if (price) {
      const [min, max] = price.split('-');
      filter.price = { $gte: parseFloat(min), $lte: parseFloat(max) };
    }
    if (brand) {
      filter.brand = brand;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    const categories = await Category.find({});
    const products = await Product.find(filter).populate('category');
    res.render('products', {
      products,
      user: req.session.user,
      categories,
      search
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.productDetail = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).send('Không tìm thấy sản phẩm');

    const suggestedProducts = await Product.find({
      category: product.category._id,
      _id: { $ne: product._id }
    }).limit(5);

    res.render('productDetail', {
      product,
      suggestedProducts,
      user: req.session.user 
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

