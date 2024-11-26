import mongoose from 'mongoose'
import validator from 'validator'

const nhacCongSchema = new mongoose.Schema({
  MaNhacCong: {
    type: String,
    required: [true, 'Mã nhạc công là bắt buộc'],
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
  LoaiNhacCu: {
    type: String,
    required: [true, 'Loại nhạc cụ là bắt buộc']
  },
  TinhTrang: {
    type: Boolean,
    default: true
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
        required: [true, 'Họ tên người đánh giá là bắt buộc'],
        minlength: [2, 'Họ tên phải có ít nhất 2 ký tự']
      },
      SoSao: {
        type: Number,
        required: [true, 'Số sao là bắt buộc'],
        min: [0, 'Số sao phải lớn hơn hoặc bằng 0'],
        max: [5, 'Số sao không được lớn hơn 5']
      },
      BinhLuan: {
        type: String,
        required: [true, 'Bình luận là bắt buộc'],
        minlength: [5, 'Bình luận phải có ít nhất 5 ký tự']
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
  },
  Active: {
    type: Boolean,
    default: true
  }
})

const NhacCong = mongoose.model('nhaccong', nhacCongSchema, 'NhacCong')

export default NhacCong
