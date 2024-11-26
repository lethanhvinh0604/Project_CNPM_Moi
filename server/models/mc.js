import mongoose from 'mongoose'
import validator from 'validator'

// Main document schema: Tạo schema cho MC
const mcSchema = new mongoose.Schema({
  MaMC: {
    type: String,
    required: [true, 'Mã MC là bắt buộc'],
    unique: true
  },
  HoTen: {
    type: String,
    required: [true, 'Họ tên là bắt buộc'],
    minlength: [2, 'Họ tên phải có ít nhất 2 ký tự']
  },
  SDT: {
    type: String,
    required: [true, 'Số điện thoại là bắt buộc'],
    validate: {
      validator: function (v) {
        return validator.isMobilePhone(v, 'vi-VN')
      },
      message: 'Số điện thoại không hợp lệ'
    }
  },
  KinhNghiem: {
    type: Number,
    required: [true, 'Kinh nghiệm là bắt buộc'],
    min: [0, 'Kinh nghiệm phải lớn hơn hoặc bằng 0']
  },
  TinhTrang: {
    type: Boolean,
    default: true
  },
  Active:{
    type:Boolean,
    default:true
  },
  Gia: {
    type: Number,
    required: [true, 'Giá là bắt buộc'],
    min: [0, 'Giá phải lớn hơn hoặc bằng 0']
  },
  DanhGia: [
    {
      HoTen: {
        type: String,
        required: [true, 'Họ tên là bắt buộc'],
        minlength: [2, 'Họ tên phải có ít nhất 2 ký tự']
      },
      SDT: {
        type: String,
        validate: {
          validator: function (v) {
            return validator.isMobilePhone(v, 'vi-VN')
          },
          message: 'Số điện thoại không hợp lệ'
        }
      },
      SoSao: {
        type: Number,
        required: [true, 'Số sao là bắt buộc'],
        min: [0, 'Số sao phải lớn hơn hoặc bằng 0'],
        max: [5, 'Số sao phải nhỏ hơn hoặc bằng 5']
      },
      BinhLuan: {
        type: String,
        required: [true, 'Bình luận là bắt buộc'],
        minlength: [10, 'Bình luận phải có ít nhất 10 ký tự']
      }
    }
  ],
  HinhAnh: {
    type: [String],
    required: [true, 'Hình ảnh là bắt buộc'],
    validate: {
      validator: function (v) {
        return v.every((url) => validator.isURL(url)) // Đảm bảo danh sách hình ảnh tất cả là URL hợp lệ
      },
      message: 'Danh sách hình ảnh không hợp lệ'
    }
  }
})

const MC = mongoose.model('mc', mcSchema, 'MC')

export default MC
