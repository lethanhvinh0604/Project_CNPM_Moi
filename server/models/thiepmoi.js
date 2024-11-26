import mongoose from 'mongoose'
import validator from 'validator'

const thiepmoiSchema = new mongoose.Schema({
  MaThiep: {
    type: String,
    required: [true, 'Mã thiệp là bắt buộc'],
    unique: true
  },
  LoaiThiep: {
    type: String,
    required: [true, 'Loại thiệp là bắt buộc']
  },
  Gia: {
    type: Number,
    required: [true, 'Giá là bắt buộc'],
    min: [0, 'Giá phải lớn hơn hoặc bằng 0']
  },
  HinhAnh: {
    type: [String],
    required: [true, 'Hình ảnh là bắt buộc'],
    validate: {
      validator: function (v) {
        return v.every((url) => validator.isURL(url)) // Đảm bảo danh sách hình ảnh tất cả là URL hợp lệ
      },
      message: 'Một hoặc nhiều URL hình ảnh không hợp lệ'
    }
  },
  Active: {
    type: Boolean,
    default: true
  }
})

const ThiepMoi = mongoose.model('thiepmoi', thiepmoiSchema, 'ThiepMoi')

export default ThiepMoi
