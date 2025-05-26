# NexTech E-commerce Platform

NexTech là một nền tảng thương mại điện tử đơn giản được xây dựng với Node.js, Express, MongoDB và EJS. Dự án này hỗ trợ các chức năng cơ bản của một website bán hàng như quản lý sản phẩm, giỏ hàng, đặt hàng, quản trị viên, đăng ký/đăng nhập người dùng, và nhiều hơn nữa.

## Mục lục
- [Tính năng](#tính-năng)
- [Cài đặt](#cài-đặt)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Hướng dẫn sử dụng](#hướng-dẫn-sử-dụng)
- [Tài khoản mẫu](#tài-khoản-mẫu)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Đóng góp](#đóng-góp)

## Tính năng
- Đăng ký, đăng nhập, đăng xuất người dùng
- Quản lý sản phẩm, danh mục, đơn hàng (dành cho admin)
- Xem danh sách sản phẩm, chi tiết sản phẩm, tìm kiếm, lọc theo danh mục, giá, thương hiệu
- Thêm sản phẩm vào giỏ hàng, cập nhật/xóa sản phẩm trong giỏ
- Đặt hàng, xem lịch sử đơn hàng
- Trang chủ, giới thiệu, liên hệ
- Giao diện thân thiện, responsive với EJS và CSS

## Cài đặt
1. **Yêu cầu:**
   - Node.js >= 14
   - MongoDB (chạy local tại `mongodb://localhost:27017/ecommerce`)
2. **Clone dự án:**
   ```bash
   git clone https://github.com/nguyenphuongtra/my_project_NodeJS.git
   cd Project_team/src
   ```
3. **Cài đặt package:**
   ```bash
   npm install
   ```
4. **Khởi động server:**
   ```bash
   node server.js
   ```
5. **Truy cập:**
   - Mở trình duyệt tại [http://localhost:3000](http://localhost:3000)

## Cấu trúc thư mục
```
Project_team/
├── src/
│   ├── controllers/      # Controllers cho các chức năng
│   ├── models/           # Mongoose models
│   ├── public/           # Tài nguyên tĩnh (CSS, ảnh)
│   ├── routes/           # Định tuyến Express
│   ├── views/            # Giao diện EJS
│   ├── data.js           # Script seed dữ liệu mẫu
│   ├── server.js         # File khởi động server
│   └── package.json      # Thông tin package
└── README.md
```

## Hướng dẫn sử dụng
### 1. Đăng ký/Đăng nhập
- Người dùng có thể đăng ký tài khoản mới hoặc đăng nhập để mua hàng, quản lý đơn hàng.
- Admin có thể đăng nhập để quản trị sản phẩm, đơn hàng, danh mục, người dùng.

### 2. Quản lý sản phẩm
- Xem danh sách, chi tiết sản phẩm, lọc theo danh mục, giá, thương hiệu, tìm kiếm.
- Admin có thể thêm, sửa, xóa sản phẩm, danh mục.

### 3. Giỏ hàng & Đặt hàng
- Thêm sản phẩm vào giỏ, cập nhật số lượng, xóa sản phẩm.
- Tiến hành đặt hàng, chọn địa chỉ giao hàng, phương thức thanh toán.
- Xem lịch sử đơn hàng cá nhân.

### 4. Trang quản trị (Admin)
- Quản lý sản phẩm, đơn hàng, danh mục, người dùng.
- Chỉ tài khoản có quyền admin mới truy cập được.

## Tài khoản mẫu
- **Admin:**
  - Email: `admin@gmail.com`
  - Password: `admin1`
- **Khách hàng:**
  - Đăng ký mới hoặc sử dụng email bất kỳ.

## Công nghệ sử dụng
- Node.js, Express
- MongoDB, Mongoose
- EJS (template engine)
- express-session, bcrypt, body-parser
- HTML, CSS (custom)

## Đóng góp
Mọi đóng góp, báo lỗi hoặc ý tưởng mới đều được hoan nghênh! Hãy tạo issue hoặc pull request.

---
**© 2025 NexTech Team**
Tác giả: Nguyen Phuong Tra
Email: Nguyenthanhtra.240805@gmail.com
