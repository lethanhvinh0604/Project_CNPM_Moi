import mongoose from 'mongoose'
import validator from 'validator'

const comboSchema = new mongoose.Schema({
  MaCombo: {
    type: String,
    required: [true, 'Mã combo là bắt buộc'],
    unique: true
  },
  TenCombo: {
    type: String,
    required: [true, 'Tên combo là bắt buộc'],
    minlength: [2, 'Tên combo phải có ít nhất 2 ký tự']
  },
  LoaiCombo: {
    type: String,
    required: [true, 'Loại combo là bắt buộc'],
    enum: {
      values: ['Combo Âu - Á', 'Combo Thịt Đỏ', 'Combo Hải Sản', 'Combo Lẩu', 'Combo Chay'], // Ví dụ về các loại combo
      message: '{VALUE} không phải là một loại combo hợp lệ'
    }
  },
  MoTa: {
    type: String
  },
  Gia: {
    type: Number,
    required: [true, 'Giá là bắt buộc'],
    min: [0, 'Giá phải lớn hơn hoặc bằng 0']
  },
  DanhSachMonAn: {
    type: [String],
    required: [true, 'Trong combo không được thiếu món ăn']
  },
  Active: {
    type: Boolean,
    default: true
  },
  HinhAnh: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.every((url) => validator.isURL(url))
      },
      message: 'Hình ảnh không hợp lệ'
    }
  }
})

const Combo = mongoose.model('combo', comboSchema, 'Combo')

export default Combo
