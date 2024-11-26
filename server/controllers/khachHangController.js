import KhachHang from '../models/khachhang.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

const getAll = catchAsync(async (req, res, next) => {
  const khachhang = await KhachHang.find().sort({ MaTK: 1 })
  res.status(200).json({
    khachhang
  })
})

const getByID = catchAsync(async (req, res, next) => {
  const khachhang = await KhachHang.findOne({ MaTK: req.params.id })

  if (!khachhang) {
    return next(new AppError('Khách hàng không tồn tại', 404))
  }
  res.status(200).json({
    khachhang
  })
})

const update = catchAsync(async (req, res, next) => {
  // Chuyển đổi các danh sách thành chỉ chứa mã
  // if (req.body.LuuHoiTruong) {
  //   req.body.LuuHoiTruong = req.body.LuuHoiTruong.map(
  //     (item) => item.MaHoiTruong
  //   )
  // }
  // if (req.body.LuuMC) {
  //   req.body.LuuMC = req.body.LuuMC.map((item) => item.MaMC)
  // }
  // if (req.body.LuuNhacCong) {
  //   req.body.LuuNhacCong = req.body.LuuNhacCong.map((item) => item.MaNhacCong)
  // }
  // if (req.body.LuuThiepMoi) {
  //   req.body.LuuThiepMoi = req.body.LuuThiepMoi.map((item) => item.MaThiep)
  // }
  // if (req.body.LuuCombo) {
  //   req.body.LuuCombo = req.body.LuuCombo.map((item) => item.MaCombo)
  // }

  // Thực hiện cập nhật trong database
  const updateKhachHang = await KhachHang.findOneAndUpdate(
    { MaTK: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true
    }
  )

  if (!updateKhachHang) {
    return next(new AppError('Không tìm thấy khách hàng với mã này', 404))
  }

  res.status(200).json({
  })
})

const saveOption = catchAsync(async (req, res, next) => {
  const khachhang = await KhachHang.findOne(
    { MaTK: req.params.id }
  )

  const option = req.params.option
  if (!khachhang || !option) {
    return next(new AppError('Không tìm thấy khách hàng với mã này', 404))
  }

  if (option[0] === 'H')
    khachhang.LuuHoiTruong.push(option)
  else if (option[0] === 'M')
    khachhang.LuuMC.push(option)
  else if (option[0] === 'N')
    khachhang.LuuNhacCong.push(option)
  else if (option[0] === 'T')
    khachhang.LuuThiepMoi.push(option)
  else if (option[0] === 'C')
    khachhang.LuuCombo.push(option)

  await khachhang.save()

  res.status(200).send()
})
export default {
  getAll,
  getByID,
  saveOption,
  update
}
