import mongoose from 'mongoose'
import validator from 'validator'

const adminSchema = new mongoose.Schema({
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
    minlength: [2, 'Họ tên phải có ít nhất 2 ký tự']
  },
  SDT: {
    type: String,
    required: [true, 'Phải có số điện thoại'],
    validate: {
      validator: (value) => validator.isMobilePhone(value, 'vi-VN'), // Kiểm tra xem số điện thoại có hợp lệ không
      message: 'Số điện thoại không hợp lệ'
    }
  },
  NgaySinh: {
    type: String,
    validate: {
      validator: (value) =>
        validator.isDate(value, { format: 'YYYY-MM-DD', strictMode: true }), // Kiểm tra ngày sinh có đúng định dạng YYYY-MM-DD không
      message: 'Ngày sinh không hợp lệ, yêu cầu định dạng YYYY-MM-DD'
    }
  },
  NoiSong: {
    type: String,
    maxlength: [100, 'Nơi sống không được vượt quá 100 ký tự']
  }
})

const Admin = mongoose.model('admin', adminSchema, 'Admin')
//đối số thứ 1: tên của model, ví dụ bạn muốn gọi đến userID trong model này thì sẽ gọi bằng: user.userID
//đối số thứ 2: cấu trúc của đối tượng: Schema
//đối số thứ 3: tên collection <=> tên table mà muốn đưa dữ liệu vào

export default Admin
