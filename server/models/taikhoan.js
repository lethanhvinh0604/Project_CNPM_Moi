import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

const taikhoanSchema = new mongoose.Schema({
  // Định nghĩa các thuộc tính
  MaTK: {
    type: String,
    required: [true, 'Mã tài khoản là bắt buộc'],
    unique: true,
    validate: {
      validator: function (v) {
        return validator.isAlphanumeric(v) // Chỉ cho phép ký tự chữ và số
      },
      message: 'Mã tài khoản chỉ được chứa các ký tự chữ và số'
    }
  },
  Pass: {
    type: String,
    required: [true, 'Mật khẩu là bắt buộc'],
    minlength: [8, 'Mật khẩu phải chứa ít nhất 8 ký tự'],
    validate: {
      validator: function (v) {
        return validator.isStrongPassword(v, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        }) // Kiểm tra độ mạnh của mật khẩu
      },
      message:
        'Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa, 1 số và 1 ký tự đặc biệt'
    }
  },
  UserName: {
    type: String,
    required: [true, 'Tên đăng nhập là bắt buộc'],
    unique: true,
    minlength: [4, 'Tên đăng nhập phải chứa ít nhất 4 ký tự'],
    validate: {
      validator: function (v) {
        return validator.isAlphanumeric(v) // Tên đăng nhập chỉ chứa chữ và số
      },
      message: 'Tên đăng nhập chỉ được chứa các ký tự chữ và số'
    }
  },
  Role: {
    type: String,
    required: true,
    enum: ['admin', 'user'],
    default: 'user'
  }
})

// Middleware mã hóa mật khẩu trước khi lưu vào database
taikhoanSchema.pre('save', async function (next) {
  this.Pass = await bcrypt.hash(this.Pass, 12)
  next()
})

// Middleware so sánh mật khẩu
taikhoanSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword)
}

// Thêm phương thức tạo mật khẩu mới
taikhoanSchema.methods.generateRandomPassword = function () {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?'

  // Chọn ngẫu nhiên 1 ký tự từ mỗi loại để đảm bảo mật khẩu đủ mạnh
  const getRandomChar = (chars) =>
    chars[Math.floor(Math.random() * chars.length)]

  const passwordArray = [
    getRandomChar(lowercase),
    getRandomChar(uppercase),
    getRandomChar(numbers),
    getRandomChar(symbols)
  ]

  // Thêm các ký tự ngẫu nhiên để đạt đủ độ dài (8-12 ký tự)
  const allChars = lowercase + uppercase + numbers + symbols
  for (let i = 4; i < 12; i++) {
    passwordArray.push(getRandomChar(allChars))
  }

  // Xáo trộn các ký tự để tránh thứ tự cố định
  return passwordArray.sort(() => 0.5 - Math.random()).join('')
}

const TaiKhoan = mongoose.model('taikhoan', taikhoanSchema, 'TaiKhoan')
//đối số thứ 1: tên của model, ví dụ bạn muốn gọi đến userID trong model này thì sẽ gọi bằng: user.userID
//đối số thứ 2: cấu trúc của đối tượng: Schema
//đối số thứ 3: tên collection <=> tên table mà muốn đưa dữ liệu vào

export default TaiKhoan
