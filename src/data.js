const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');
const bcrypt = require('bcrypt');
const User = require('./models/User');
mongoose
  .connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Đang kết nối với DB...'))
  .catch((err) => console.error(err));

async function seedData() {
  try {
    await Product.deleteMany({});
    await Category.deleteMany({});

    const categoriesData = [
      { name: 'Phone', description: 'Các dòng điện thoại iPhone' },
      { name: 'Laptop', description: 'Các dòng máy tính xách tay' },
      { name: 'Màn Hình', description: 'Các loại màn hình máy tính' },
      { name: 'Tai Nghe', description: 'Các loại tai nghe nhạc, tai nghe gaming' },
      { name: 'Đồng Hồ', description: 'Đồng hồ thông minh, đồng hồ đeo tay' }
    ];

    const categories = await Category.insertMany(categoriesData);
    const [catIphone, catLaptop, catManHinh, catTaiNghe, catDongHo] = categories;


    const productsData = [
     
      {
        name: 'iPhone 14 Pro Max',
        description: 'Màn hình 6.7 inch, chip A16 Bionic, 128GB',
        price: 30000000,
        category: catIphone._id,
        stock: 10,
        brand: 'Apple',
        images:['iphone-16-pro-max.webp']
      },
      {
        name: 'iPhone 13',
        description: 'Màn hình 6.1 inch, chip A15 Bionic, 128GB',
        price: 22000000,
        category: catIphone._id,
        stock: 15,
        brand: 'Apple',
        images:['iphone13.webp']
      },
      {
        name: 'iPhone 12 Mini',
        description: 'Màn hình 5.4 inch, chip A14 Bionic, 64GB',
        price: 17000000,
        category: catIphone._id,
        stock: 12,
        brand: 'Apple',
        images:['iphone12Mini.webp']
      },
      {
        name: 'iPhone SE (2022)',
        description: 'Thiết kế nhỏ gọn, chip A15 Bionic, 64GB',
        price: 13000000,
        category: catIphone._id,
        stock: 20,
        brand: 'Apple',
        images:['iphoneSE.webp']
      },

      {
        name: 'MacBook Air M1',
        description: 'Chip Apple M1, 8GB RAM, SSD 256GB',
        price: 25000000,
        category: catLaptop._id,
        stock: 8,
        brand: 'Apple',
        images:['MacBookAirM1.webp']
      },
      {
        name: 'MacBook Pro 14-inch',
        description: 'Hiệu năng mạnh mẽ, màn hình Liquid Retina XDR',
        price: 45000000,
        category: catLaptop._id,
        stock: 5,
        brand: 'Apple',
        images:['MacBookPro.webp']
      },
      {
        name: 'Dell XPS 13',
        description: 'Laptop siêu mỏng nhẹ, màn hình 13.3 inch FHD+',
        price: 32000000,
        category: catLaptop._id,
        stock: 10,
        brand: 'Dell',
        images:['DellXPS.webp']
      },
      {
        name: 'ASUS ROG Strix G15',
        description: 'Laptop gaming, CPU AMD Ryzen 7, RTX 3060',
        price: 35000000,
        category: catLaptop._id,
        stock: 7,
        brand: 'ASUS',
        images:['ASUSROGStrix.webp']
      },

      {
        name: 'Màn hình Samsung',
        description: 'Độ phân giải Full HD, tấm nền VA, tần số quét 75Hz',
        price: 3500000,
        category: catManHinh._id,
        stock: 20,
        brand: 'Samsung',
        images:['Manhinhsamsung.webp']
      },
      {
        name: 'Màn hình LG 27 inch 4K',
        description: 'Tấm nền IPS, HDR10, dành cho thiết kế đồ họa',
        price: 8000000,
        category: catManHinh._id,
        stock: 10,
        brand: 'LG',
        images:['manhinhlg.webp']
      },
      {
        name: 'Màn hình Dell UltraSharp',
        description: 'Độ phân giải QHD, tấm nền IPS, viền mỏng',
        price: 9000000,
        category: catManHinh._id,
        stock: 5,
        brand: 'Dell',
        images:['manhinhdell.webp']
      },
      {
        name: 'Màn hình ASUS TUF',
        description: 'Tần số quét 144Hz, 1ms, FreeSync Premium',
        price: 7000000,
        category: catManHinh._id,
        stock: 7,
        brand: 'ASUS',
        images:['manhinhasus.webp']
      },

      {
        name: 'AirPods Pro (2nd Gen)',
        description: 'Chống ồn chủ động, âm thanh vòm, hộp sạc không dây',
        price: 5500000,
        category: catTaiNghe._id,
        stock: 15,
        brand: 'Apple',
        images:['AirPodsPro.webp']
      },
      {
        name: 'Sony WH-1000XM4',
        description: 'Tai nghe chống ồn tốt, pin 30 giờ, LDAC',
        price: 7000000,
        category: catTaiNghe._id,
        stock: 10,
        brand: 'Sony',
        images:['SonyWH.webp']
      },
      {
        name: 'HyperX Cloud II',
        description: 'Tai nghe gaming, âm thanh 7.1, micro khử ồn',
        price: 2000000,
        category: catTaiNghe._id,
        stock: 20,
        brand: 'HyperX',
        images:['HyperX.webp']
      },
      {
        name: 'Razer BlackShark V2',
        description: 'Âm thanh THX, micro cardioid, đệm tai siêu êm',
        price: 2500000,
        category: catTaiNghe._id,
        stock: 12,
        brand: 'Razer',
        images:['RazerBlackShark.webp']
      },

      {
        name: 'Apple Watch Series 8',
        description: 'Màn hình luôn sáng, đo ECG, phát hiện té ngã',
        price: 10000000,
        category: catDongHo._id,
        stock: 10,
        brand: 'Apple',
        images:['AppleWatch.webp']
      },
      {
        name: 'Galaxy Watch 5',
        description: 'Chạy Wear OS, pin 2 ngày, đo nhịp tim, SpO2',
        price: 6000000,
        category: catDongHo._id,
        stock: 15,
        brand: 'Samsung',
        images:['GalaxyWatch.webp']
      },
      {
        name: 'Garmin Forerunner 245',
        description: 'Theo dõi chạy bộ chuyên nghiệp, GPS chính xác',
        price: 7000000,
        category: catDongHo._id,
        stock: 8,
        brand: 'Garmin',
        images:['GarminForerunner.webp']
      },
      {
        name: 'Xiaomi Mi Watch',
        description: 'Giá rẻ, pin trâu, theo dõi sức khỏe cơ bản',
        price: 2500000,
        category: catDongHo._id,
        stock: 20,
        brand: 'Xiaomi',
        images:['XiaomiMiWatch.webp']
      }
    ];

    await Product.insertMany(productsData);
    console.log('Dữ liệu đã được thêm thành công!');
  } catch (err) {
    console.error(err);
  }
}

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('admin1', 10);
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@gmail.com', 
      password: hashedPassword,
      role: 'admin'
    });
    await adminUser.save();
    console.log('Người dùng Admin đã được tạo thành công!');
  } catch (err) {
    console.error('Lỗi khi tạo người dùng admin:', err);
  }
}

async function seedAll() {
  try {
    await seedData();
    await createAdmin();
  } catch (error) {
    console.error('Lỗi trong quá trình tạo:', error);
  } finally {
    mongoose.connection.close();
    console.log('Đóng kết nối DB.');
  }
}

seedAll();
