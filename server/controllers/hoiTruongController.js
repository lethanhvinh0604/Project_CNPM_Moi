import HoiTruong from '../models/hoitruong.js'
import DatDichVu from '../models/datdichvu.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

const getTopHoiTruong = catchAsync(async (req, res, next) => {
  const topHoiTruong = await DatDichVu.aggregate([
    // { $match: { Active: true } }, // Chỉ lấy các dịch vụ đang active
    { $group: { _id: '$DichVu.MaHoiTruong', count: { $sum: 1 } } }, // Nhóm theo MaHoiTruong và đếm số lần xuất hiện
    { $sort: { count: -1 } }, // Sắp xếp giảm dần theo số lần xuất hiện
    { $limit: 4 }, // Lấy 4 hội trường xuất hiện nhiều nhất
    {
      $lookup: {
        // Kết hợp với thông tin hội trường
        from: 'HoiTruong',
        localField: '_id',
        foreignField: 'MaHoiTruong',
        as: 'hoitruong'
      }
    },
    { $unwind: '$hoitruong' } // Giải nén mảng hoitruong
  ])

  res.status(200).json({
    topHoiTruong
  })
})

const getAll = catchAsync(async (req, res, next) => {
  const {
    searchTerm,
    capacity,
    price,
    wifi,
    airConditioning,
    status,
    page = 1,
    limit = 8
  } = req.query;

  let query = {};
  if (req.user.MaTK[0] === 'U') query.Active = "true";

  // Adding filters based on query params
  if (searchTerm) {
    query.TenHoiTruong = { $regex: searchTerm, $options: 'i' };
  }
  if (wifi) {
    query.Wifi = wifi === 'true';
  }
  if (airConditioning) {
    query.MayLanh = airConditioning === 'true';
  }
  if (status) {
    query.TinhTrang = status === 'true';
  }

  // Create the base query for HoiTruong
  let hoitruongQuery = HoiTruong.find(query);

  // Sorting by price and capacity
  let sortCriteria = {};

  // Handle price sorting
  const sortPrice = price === '1' ? 1 : price === '-1' ? -1 : null;
  if (sortPrice !== null) {
    sortCriteria.Gia = sortPrice;
  }

  // Handle capacity sorting
  const sortSucChua = capacity === '1' ? 1 : capacity === '-1' ? -1 : null;
  if (sortSucChua !== null) {
    sortCriteria.SucChua = sortSucChua;
  }

  // Apply the combined sorting criteria to the query
  if (Object.keys(sortCriteria).length > 0) {
    hoitruongQuery = hoitruongQuery.sort(sortCriteria);
  } else {
    hoitruongQuery = hoitruongQuery.sort({ MaHoiTruong: 1 }); // Default sort by MaHoiTruong
  }

  // Pagination
  const totalHoiTruong = await HoiTruong.countDocuments(query);
  const totalPages = Math.ceil(totalHoiTruong / limit);

  hoitruongQuery = hoitruongQuery.skip((page - 1) * limit).limit(limit);

  // Execute the query
  const hoitruong = await hoitruongQuery;

  // Respond with the results
  res.status(200).json({
    status: 'success',
    hoitruong,
    totalHoiTruong,
    totalPages
  });
});

const getByID = catchAsync(async (req, res, next) => {
  if (req.params.id !== null) {
    const hoitruong = await HoiTruong.findOne({ MaHoiTruong: req.params.id })
    if (!hoitruong) {
      return next(new AppError('Không tìm thấy hội trường với mã này', 404))
    }
    res.status(200).json({
      hoitruong
    })
  }
})

const create = catchAsync(async (req, res, next) => {
  // Lấy số lượng nhạc công hiện có để sinh mã mới
  const hoitruongCount = await HoiTruong.countDocuments()

  // Tạo mã MaHoiTruong theo định dạng "Hxxx", ví dụ "H001", "H002", ...
  const newMaNhacCong = `H${String(hoitruongCount + 1).padStart(3, '0')}`

  // Thêm MaHoiTruong vào dữ liệu từ req.body
  const newHoiTruong = await HoiTruong.create({
    MaHoiTruong: newMaNhacCong, // Mã tự động sinh
    TenHoiTruong: req.body.TenHoiTruong,
    SucChua: req.body.SucChua,
    Wifi: req.body.Wifi,
    MoTa: req.body.MoTa,
    MayLanh: req.body.MayLanh,
    PhongKin: req.body.PhongKin,
    DienTich: req.body.DienTich,
    SoPhong: req.body.SoPhong,
    ViTriLau: req.body.ViTriLau,
    Gia: req.body.Gia,
    TinhTrang: req.body.TinhTrang,
    HinhAnh: req.body.HinhAnh
  })

  if (!newHoiTruong) {
    return next(new AppError('Tạo mới hội trường không thành công', 404))
  }
  res.status(201).send()
})

const update = catchAsync(async (req, res, next) => {
  const updateHoiTruong = await HoiTruong.findOneAndUpdate(
    { MaHoiTruong: req.params.id },
    req.body,
    {
      new: true, // Trả về document mới sau khi cập nhật
      runValidators: true // Chạy các validator để đảm bảo dữ liệu hợp lệ
    }
  )

  if (!updateHoiTruong) {
    return next(new AppError('Không tìm thấy hội trường với mã này', 404))
  }
  res.status(200).send()
})

const deleteByID = catchAsync(async (req, res, next) => {
  // Xóa ở đây là chuyển Active từ true sang false, tìm theo MaHoiTruong
  const hoitruong = await HoiTruong.findOneAndUpdate(
    { MaHoiTruong: req.params.id },
    {
      Active: false,
      TinhTrang: false
    },
    {
      new: true, // Trả về document mới sau khi cập nhật
      runValidators: true // Chạy các validator để đảm bảo dữ liệu hợp lệ
    }
  )

  if (!hoitruong) {
    return next(new AppError('Không tìm thấy hội trường với ID này', 404))
  }

  res.status(204).send()
})

export default {
  getAll,
  getByID,
  create,
  update,
  deleteByID,
  getTopHoiTruong
}
