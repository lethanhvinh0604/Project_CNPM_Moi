import mongoose from 'mongoose'
import validator from 'validator'

const khachhangSchema = new mongoose.Schema({
  // Định nghĩa các thuộc tính
  MaTK: {
    type: String,
    required: [true, 'Phải có MaTK'],
    unique: true,
    validate: {
      validator: (value) => validator.isAlphanumeric(value), // Kiểm tra xem MaTK có phải là chuỗi ký tự và số không
      message: 'MaTK chỉ được chứa ký tự chữ và số'
    }
  },
  GioiTinh: {
    type: String,
    enum: ['Nam', 'Nữ', 'Khác'], // Chỉ chấp nhận các giá trị nhất định
    default: 'Khác' // Thiết lập giá trị mặc định
  },
  HoTen: {
    type: String,
    required: [true, 'Phải có họ tên'],
    minlength: [2, 'Họ tên phải có ít nhất 2 ký tự'],
    default: 'Người dùng mới'
  },
  SDT: {
    type: String,
    required: [true, 'Phải có số điện thoại'],
    validate: {
      // Kiểm tra xem số điện thoại có hợp lệ không: 10 hoặc 11 số, bắt đầu bằng 0, không dùng thư viện validator
      validator: (value) => /^0\d{9,10}$/.test(value),
      message: 'Số điện thoại không hợp lệ'
    },
    default: '0944853722'
  },
  Email: {
    type: String,
    validate: {
      validator: (value) => validator.isEmail(value), // Kiểm tra xem email có hợp lệ không
      message: 'Email không hợp lệ'
    },
    default: 'example@gmail.com'
  },
  NgaySinh: {
    type: String,
    validate: {
      validator: (value) =>
        validator.isDate(value, { format: 'YYYY-MM-DD', strictMode: true }), // Kiểm tra ngày sinh có đúng định dạng YYYY-MM-DD không
      message: 'Ngày sinh không hợp lệ, yêu cầu định dạng YYYY-MM-DD'
    },
    default: '2000-01-01'
  },
  NoiSong: {
    type: String,
    maxlength: [100, 'Nơi sống không được vượt quá 100 ký tự'],
    default: ''
  },
  LuuHoiTruong: {
    type: [String]
  },
  LuuMC: {
    type: [String]
  },
  LuuNhacCong: {
    type: [String]
  },
  LuuThiepMoi: {
    type: [String]
  },
  LuuCombo: {
    type: [String]
  }
})

const KhachHang = mongoose.model('khachhang', khachhangSchema, 'KhachHang')
//đối số thứ 1: tên của model, ví dụ bạn muốn gọi đến userID trong model này thì sẽ gọi bằng: user.userID
//đối số thứ 2: cấu trúc của đối tượng: Schema
//đối số thứ 3: tên collection <=> tên table mà muốn đưa dữ liệu vào

export default KhachHang
