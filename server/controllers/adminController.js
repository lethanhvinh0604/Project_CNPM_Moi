import Admin from '../models/admin.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import HoiTruong from '../models/hoitruong.js'
import DatDichVu from '../models/datdichvu.js'
import MC from '../models/mc.js'
import Combo from '../models/combo.js'
import NhacCong from '../models/nhaccong.js'
import Thiep from '../models/thiepmoi.js'

const getByID = catchAsync(async (req, res, next) => {
  const admin = await Admin.findOne({ MaTK: req.params.id })

  if (!admin) {
    // trả về lỗi nếu không tìm thấy admin
    return next(new AppError('Admin không tồn tại', 404))
  }
  res.status(200).json({
    admin
  })
})

const getCount = catchAsync(async (req, res, next) => {
  const count = {
    hoiTruongActive: await HoiTruong.countDocuments({ Active: true }),
    hoiTruongUnactive: await HoiTruong.countDocuments({ Active: false }),
    datDichVu: await DatDichVu.countDocuments(),
    mc: await MC.countDocuments({ Active: true }),
    combo: await Combo.countDocuments({ Active: true }),
    nhacCong: await NhacCong.countDocuments({ Active: true }),
    thiep: await Thiep.countDocuments({ Active: true })
  }

  res.status(200).json({
    count
  })
})

const getMostBookedServices = catchAsync(async (req, res, next) => {
  // Lấy hội trường xuất hiện nhiều nhất
  const mostUsedHall = await DatDichVu.aggregate([
    {
      $match: {
        $and: [
          { 'DichVu.MaHoiTruong': { $ne: null } }, // Kiểm tra không phải null
          { 'DichVu.MaHoiTruong': { $ne: '' } } // Kiểm tra không phải chuỗi rỗng
        ]
      }
    },
    {
      $group: {
        _id: '$DichVu.MaHoiTruong', // Nhóm theo MaHoiTruong
        count: { $sum: 1 } // Đếm số lần xuất hiện
      }
    },
    { $sort: { count: -1 } }, // Sắp xếp giảm dần theo số lần xuất hiện
    { $limit: 1 }, // Chỉ lấy hội trường xuất hiện nhiều nhất
    {
      $lookup: {
        from: 'HoiTruong', // Tên collection cần join
        localField: '_id', // Trường trong pipeline hiện tại (MaHoiTruong)
        foreignField: 'MaHoiTruong', // Trường trong bảng HoiTruong
        as: 'details' // Tên trường chứa kết quả join
      }
    },
    { $unwind: '$details' }, // Bóc tách kết quả join thành một đối tượng riêng
    {
      $project: {
        _id: 0, // Ẩn _id
        id: '$_id',
        name: '$details.TenHoiTruong',
        count: 1 // Giữ lại trường count
      }
    }
  ])

  // Lấy dịch vụ MC xuất hiện nhiều nhất
  const mostUsedMC = await DatDichVu.aggregate([
    {
      $match: {
        $and: [
          { 'DichVu.MaMC': { $ne: null } }, // Kiểm tra không phải null
          { 'DichVu.MaMC': { $ne: '' } } // Kiểm tra không phải chuỗi rỗng
        ]
      }
    },
    {
      $group: {
        _id: '$DichVu.MaMC', // Nhóm theo MaMC
        count: { $sum: 1 } // Đếm số lần xuất hiện
      }
    },
    { $sort: { count: -1 } }, // Sắp xếp giảm dần theo số lần xuất hiện
    { $limit: 1 }, // Chỉ lấy MC xuất hiện nhiều nhất
    {
      $lookup: {
        from: 'MC', // Tên collection cần join
        localField: '_id', // Trường trong pipeline hiện tại (MaMC)
        foreignField: 'MaMC', // Trường trong bảng MC
        as: 'details' // Tên trường chứa kết quả join
      }
    },
    { $unwind: '$details' }, // Bóc tách kết quả join thành một đối tượng riêng
    {
      $project: {
        _id: 0, // Ẩn _id
        id: '$_id',
        name: '$details.HoTen',
        count: 1 // Giữ lại trường count
      }
    }
  ])

  // Lấy dịch vụ combo xuất hiện nhiều nhất
  const mostUsedCombo = await DatDichVu.aggregate([
    {
      $match: {
        $and: [
          { 'DichVu.MaCombo': { $ne: null } }, // Kiểm tra không phải null
          { 'DichVu.MaCombo': { $ne: '' } } // Kiểm tra không phải chuỗi rỗng
        ]
      }
    },
    {
      $group: {
        _id: '$DichVu.MaCombo', // Nhóm theo MaCombo
        count: { $sum: 1 } // Đếm số lần xuất hiện
      }
    },
    { $sort: { count: -1 } }, // Sắp xếp giảm dần theo số lần xuất hiện
    { $limit: 1 }, // Chỉ lấy combo xuất hiện nhiều nhất
    {
      $lookup: {
        from: 'Combo', // Tên collection cần join
        localField: '_id', // Trường trong pipeline hiện tại (MaCombo)
        foreignField: 'MaCombo', // Trường trong bảng Combo
        as: 'details' // Tên trường chứa kết quả join
      }
    },
    { $unwind: '$details' }, // Bóc tách kết quả join thành một đối tượng riêng
    {
      $project: {
        _id: 0, // Ẩn _id
        id: '$_id',
        name: '$details.TenCombo',
        count: 1 // Giữ lại trường count
      }
    }
  ])

  // Lấy dịch vụ nhạc công xuất hiện nhiều nhất
  const mostUsedNhacCong = await DatDichVu.aggregate([
    {
      $match: {
        $and: [
          { 'DichVu.MaNhacCong': { $ne: null } }, // Kiểm tra không phải null
          { 'DichVu.MaNhacCong': { $ne: '' } } // Kiểm tra không phải chuỗi rỗng
        ]
      }
    },
    {
      $group: {
        _id: '$DichVu.MaNhacCong', // Nhóm theo MaNC
        count: { $sum: 1 } // Đếm số lần xuất hiện
      }
    },
    { $sort: { count: -1 } }, // Sắp xếp giảm dần theo số lần xuất hiện
    { $limit: 1 }, // Chỉ lấy nhạc công xuất hiện nhiều nhất
    {
      $lookup: {
        from: 'NhacCong', // Tên collection cần join
        localField: '_id', // Trường trong pipeline hiện tại (MaNC)
        foreignField: 'MaNhacCong', // Trường trong bảng NhacCong
        as: 'details' // Tên trường chứa kết quả join
      }
    },
    { $unwind: '$details' }, // Bóc tách kết quả join thành một đối tượng riêng
    {
      $project: {
        _id: 0, // Ẩn _id
        id: '$_id',
        name: '$details.HoTen',
        count: 1 // Giữ lại trường count
      }
    }
  ])

  // Lấy dịch vụ thiệp mời xuất hiện nhiều nhất
  const mostUsedThiep = await DatDichVu.aggregate([
    {
      $match: {
        $and: [
          { 'DichVu.MaThiepMoi': { $ne: null } }, // Kiểm tra không phải null
          { 'DichVu.MaThiepMoi': { $ne: '' } } // Kiểm tra không phải chuỗi rỗng
        ]
      }
    },
    {
      $group: {
        _id: '$DichVu.MaThiepMoi', // Nhóm theo MaThiep
        count: { $sum: 1 } // Đếm số lần xuất hiện
      }
    },
    { $sort: { count: -1 } }, // Sắp xếp giảm dần theo số lần xuất hiện
    { $limit: 1 }, // Chỉ lấy thiệp mời xuất hiện nhiều nhất
    {
      $lookup: {
        from: 'ThiepMoi', // Tên collection cần join
        localField: '_id', // Trường trong pipeline hiện tại (MaThiep)
        foreignField: 'MaThiep', // Trường trong bảng ThiepMoi
        as: 'details' // Tên trường chứa kết quả join
      }
    },
    { $unwind: '$details' }, // Bóc tách kết quả join thành một đối tượng riêng
    {
      $project: {
        _id: 0, // Ẩn _id
        id: '$_id',
        name: '$details.LoaiThiep',
        count: 1 // Giữ lại trường count
      }
    }
  ])

  res.status(200).json({
    mostUsedHall: mostUsedHall[0] || null,
    mostUsedMC: mostUsedMC[0] || null,
    mostUsedCombo: mostUsedCombo[0] || null,
    mostUsedNhacCong: mostUsedNhacCong[0] || null,
    mostUsedThiep: mostUsedThiep[0] || null
  })
})

export default { getByID, getCount, getMostBookedServices }
