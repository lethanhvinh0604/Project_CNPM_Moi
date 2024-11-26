import mongoose from 'mongoose'
import validator from 'validator'

const datDichVuSchema = new mongoose.Schema({
  MaDDV: {
    type: String,
    required: [true, 'Phải có MaDDV'],
    validate: {
      validator: (value) => validator.isAlphanumeric(value), // Kiểm tra xem MaDDV có phải là chuỗi ký tự và số không
      message: 'MaDDV chỉ được chứa ký tự chữ và số'
    }
  },
  MaTK: {
    type: String,
    required: [true, 'Phải có MaTK']
  },
  ThoiDiemDat: {
    type: String,
    required: [true, 'Thời điểm đặt là bắt buộc']
  },
  ThoiDiemBatDau: {
    type: String,
    required: [true, 'Thời điểm bắt đầu là bắt buộc'],
    validate: {
      validator: function (v) {
        return v > this.ThoiDiemDat
      },
      message: 'Thời điểm bắt đầu phải sau thời điểm đặt'
    }
  },
  ThoiDiemKetThuc: {
    type: String,
    required: [true, 'Thời điểm kết thúc là bắt buộc'],
    validate: {
      validator: function (v) {
        return v > this.ThoiDiemBatDau
      },
      message: 'Thời điểm kết thúc phải sau thời điểm bắt đầu'
    }
  },
  SoGio: {
    type: Number,
    required: [true, 'Số giờ là bắt buộc'],
    min: [1, 'Số giờ phải ít nhất là 1']
  },
  TrangThai: {
    type: Boolean,
    default: false
  },
  DichVu: {
    SoLuongBan: {
      type: Number,
      min: [0, 'Số lượng bàn phải ít nhất là 1']
    },
    SoLuongThiep: {
      type: Number,
      min: [0, 'Số lượng thiệp phải ít nhất là 1']
    },
    MaMC: {
      type: String
    },
    MaNhacCong: {
      type: String
    },
    MaThiepMoi: {
      type: String
    },
    MaHoiTruong: {
      type: String
    },
    MaCombo: {
      type: String
    }
  },
  Note: {
    type: String
  },
  Active: {
    type: Boolean,
    default: true
  }
})

const DatDichVu = mongoose.model('datdichvu', datDichVuSchema, 'DatDichVu')

export default DatDichVu
