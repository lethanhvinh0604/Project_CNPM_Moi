import mongoose from 'mongoose'
import validator from 'validator'

const hoitruongSchema = new mongoose.Schema({
  MaHoiTruong: {
    type: String,
    required: [true, 'Mã hội trường là bắt buộc'],
    unique: true
  },
  TenHoiTruong: {
    type: String,
    required: [true, 'Tên hội trường là bắt buộc'],
    minlength: [2, 'Tên hội trường phải có ít nhất 2 ký tự']
  },
  SucChua: {
    type: Number,
    required: [true, 'Sức chứa là bắt buộc'],
    min: [1, 'Sức chứa phải lớn hơn 0']
  },
  Wifi: {
    type: Boolean,
    default: false
  },
  MoTa: {
    type: String,
    required: [true, 'Mô tả là bắt buộc'],
    minlength: [10, 'Mô tả phải có ít nhất 10 ký tự']
  },
  MayLanh: {
    type: Boolean,
    default: false
  },
  PhongKin: {
    type: Boolean,
    default: false
  },
  DienTich: {
    type: Number,
    required: [true, 'Diện tích là bắt buộc'],
    min: [0, 'Diện tích phải lớn hơn hoặc bằng 0']
  },
  SoPhong: {
    type: String,
    required: [true, 'Số phòng là bắt buộc'],
    validate: {
      validator: function (v) {
        return /^[A-Z]\d{3}$/.test(v) // Kiểm tra định dạng: 1 chữ cái + 3 chữ số
      },
      message: 'Số phòng không hợp lệ'
    }
  },
  ViTriLau: {
    type: String,
    required: [true, 'Vị trí lầu là bắt buộc']
  },
  Gia: {
    type: Number,
    required: [true, 'Giá là bắt buộc'],
    min: [0, 'Giá phải lớn hơn hoặc bằng 0']
  },
  TinhTrang: {
    type: Boolean,
    default: true
  },
  Active: {
    type: Boolean,
    default: true
  },
  HinhAnh: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.every((url) => validator.isURL(url)) // Đảm bảo danh sách hình ảnh tất cả là URL hợp lệ
      },
      message: 'Danh sách hình ảnh không hợp lệ'
    }
  }
})

const HoiTruong = mongoose.model('hoitruong', hoitruongSchema, 'HoiTruong')

export default HoiTruong
