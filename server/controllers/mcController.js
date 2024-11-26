import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import MC from '../models/mc.js'

const getAllMC = catchAsync(async (req, res, next) => {
  const {
    searchTerm,
    price,
    status,
    page = 1,
    limit = 10
  } = req.query;

  let query = {};
  if (req.user.MaTK[0] === 'U')
    query.Active = "true"
  if (searchTerm) {
    query.HoTen = { $regex: searchTerm, $options: 'i' };
  }


  if (status) {
    query.TinhTrang = status === 'true';
  }

  let mcQuery = MC.find(query);

  // Convert `price` value to integer and ensure it's either 1 or -1 for sorting
  const sortPrice = price === '1' ? 1 : price === '-1' ? -1 : null;
  if (sortPrice !== null) {
    mcQuery = mcQuery.sort({ Gia: sortPrice });
  } else {
    mcQuery = mcQuery.sort({ MaMC: 1 }); // Default sort by MaMC
  }

  const totalMC = await MC.countDocuments(query);
  const totalPages = Math.ceil(totalMC / limit);

  mcQuery = mcQuery.skip((page - 1) * limit).limit(limit);

  const mc = await mcQuery;

  res.status(200).json({
    status: 'success',
    mc,
    totalMC,
    totalPages
  });
});


const getMC = catchAsync(async (req, res, next) => {
  if (req.params.id !== null) {
    const mc = await MC.findOne({ MaMC: req.params.id })
    if (!mc) {
      return next(new AppError('Không tìm thấy MC với mã này', 404))
    }
    res.status(200).json({
      mc
    })
  }
})

const createMC = catchAsync(async (req, res, next) => {
  // Get current MC count to generate new MaMC
  const mcCount = await MC.countDocuments();

  // Generate MaMC in the format "Mxxx", e.g., "M001", "M002", ...
  const newMaMC = `M${String(mcCount + 1).padStart(3, '0')}`;

  // Add MaMC to the data from req.body
  const newMC = await MC.create({
    MaMC: newMaMC, // Automatically generated ID
    HoTen: req.body.HoTen,
    SDT: req.body.SDT,
    KinhNghiem: req.body.KinhNghiem,
    TinhTrang: req.body.TinhTrang,
    Gia: req.body.Gia,
    DanhGia: req.body.DanhGia,
    HinhAnh: req.body.HinhAnh
  });

  res.status(201).json({
    status: 'success',
    data: {
      mc: newMC
    }
  });
});

const updateMC = catchAsync(async (req, res, next) => {
  const updatedMC = await MC.findOneAndUpdate(
    { MaMC: req.params.id },
    req.body,
    {
      new: true, // Return the updated document
      runValidators: true // Run validators to ensure valid data
    }
  );

  if (!updatedMC) {
    return next(new AppError('Không tìm thấy MC với ID này', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      mc: updatedMC
    }
  });
});

const deleteMC = catchAsync(async (req, res, next) => {
  // Soft delete by setting Active to false, find by MaMC
  const mc = await MC.findOneAndUpdate(
    { MaMC: req.params.id },
    { Active: false, TinhTrang: false },
    {
      new: true, // Return the updated document
      runValidators: true // Run validators to ensure valid data
    }
  );

  if (!mc) {
    return next(new AppError('Không tìm thấy MC với ID này', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null // 204 No Content, no data to return
  });
});

const rating = catchAsync(async (req, res, next) => {
  const mc = await MC.findOne(
    { MaMC: req.params.id }
  );

  const content = req.body

  if (!mc) {
    return next(new AppError('Không tìm thấy MC với ID này', 404));
  }

  mc.DanhGia.push(content)
  await mc.save()
  res.status(200).send()
});

export default {
  getAllMC,
  getMC,
  createMC,
  updateMC,
  deleteMC,
  rating
};
