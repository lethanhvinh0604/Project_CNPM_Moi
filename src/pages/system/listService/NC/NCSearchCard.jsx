import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import APIClient from '../../../../api/client'
import ServiceDetailPopUp from '../../../../components/ServiceDetailPopUp'

import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import Snackbar from '@mui/material/Snackbar'

function NCSearchCard({ nc, setReload }) {
  const {
    MaNhacCong,
    HoTen,
    SDT,
    KinhNghiem,
    LoaiNhacCu,
    TinhTrang,
    Gia,
    DanhGia,
    HinhAnh
  } = nc
  const [newRating, setNewRating] = useState({
    HoTen: '',
    SoSao: '',
    BinhLuan: ''
  })
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [ncDetail, setNcDetail] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const userID = sessionStorage.getItem('userID')

  useEffect(() => {
    const apiClient = new APIClient('nhaccong')
    apiClient
      .findByID(MaNhacCong)
      .then((response) => {
        setNcDetail(response.data.nhaccong)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [MaNhacCong])

  const handleViewClick = () => {
    setIsPopupOpen(true)
    // Thêm MaNhacCong vào URL
    navigate(`${location.pathname}?MaNhacCong=${MaNhacCong}`, { replace: true })
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
    // Xóa MaNhacCong khỏi URL khi đóng popup
    const searchParams = new URLSearchParams(location.search)
    searchParams.delete('MaNhacCong')
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true
    })
  }

  const handleSave = () => {
    const apiClient = new APIClient('khachhang')
    apiClient
      .saveOption(userID, MaNhacCong)
      .then((response) => {
        if (response.status === 200) {
          alert('Lưu nhạc công thành công')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Gọi hàm để thêm đánh giá mới vào danh sách
    const updatedRatings = [
      ...DanhGia,
      { ...newRating, ThoiGian: new Date().toISOString() }
    ]
    const apiClient = new APIClient('nhaccong')
    apiClient
      .rating(MaNhacCong, newRating)
      .then((response) => {
        setReload(prev => !prev)
      })
      .catch((error) => {
        console.error(error)
      })
    setSnackbarOpen(true)
    // Reset form
    setNewRating({ HoTen: '', SoSao: '', BinhLuan: '' })
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewRating({ ...newRating, [name]: value })
  }

  const handleSnackbarClose = (event, reason) => {
    setSnackbarOpen(false)
  }

  const formatCurrency = (amount) => {
    // Chuyển đổi số thành chuỗi và sử dụng regex để thêm dấu phẩy
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'
  }

  return (
    <NCSearchCardWrapper>
      <div className="nc-img">
        <img src={HinhAnh[0]} alt={HoTen} />
      </div>
      <div className="nc-info">
        <h3>{HoTen}</h3>
        <ul>
          <li>Số điện thoại: {SDT}</li>
          <li>Kinh nghiệm: {!KinhNghiem ? 'Chưa có' : KinhNghiem}</li>
          <li>Loại nhạc cụ: {LoaiNhacCu}</li>
          <li>
            Tình trạng: <strong>{TinhTrang ? 'Còn trống' : 'Đã đặt'}</strong>
          </li>
          <li>
            <strong>Giá: {Gia ? formatCurrency(Gia) : 'Free'}</strong>
          </li>
        </ul>
      </div>
      <div className="nc-button">
        <button id="btn-primary" onClick={handleSave}>Lưu</button>
        <button id="btn-secoundary" onClick={handleViewClick}>
          Xem
        </button>
      </div>
      {isPopupOpen && (
        <ServiceDetailPopUp onClose={handleClosePopup}>
          <h2>{HoTen}</h2>
          <div className="popup-content">
            <div className="popup-img">
              <Carousel autoPlay interval={3000}>
                {HinhAnh.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${HoTen} ${index + 1}`}
                  />
                ))}
              </Carousel>
            </div>
            <div className="popup-info">
              <ul>
                <li>
                  <strong>Tên nhạc công:</strong> {HoTen}
                </li>
                <li>
                  <strong>Số điện thoại: </strong>
                  {SDT}
                </li>
                <li>
                  <strong>Kinh nghiệm: </strong>
                  {!KinhNghiem ? 'Chưa có' : KinhNghiem}
                </li>
                <li>
                  <strong>Loại nhạc cụ:</strong> {LoaiNhacCu}
                </li>
                <li>
                  <strong>Tình trạng: </strong>
                  {TinhTrang ? 'Còn trống' : 'Đã đặt'}
                </li>
                <li>
                  <strong>Giá:</strong> {formatCurrency(Gia)}
                </li>
              </ul>
              <h3>Đánh giá:</h3>
              <div className="rating-list">
                <ul>
                  {DanhGia.length > 0 ? (
                    DanhGia.map((danhGia, index) => (
                      <li key={index}>
                        <strong>{danhGia.HoTen}</strong> ({danhGia.SoSao} ⭐):{' '}
                        {danhGia.BinhLuan}
                        <br />
                        {/* <small>
                          {new Date(danhGia.ThoiGian).toLocaleDateString()}
                        </small> */}
                      </li>
                    ))
                  ) : (
                    <li>Chưa có đánh giá nào.</li>
                  )}
                </ul>
              </div>

              {/* Thêm phần Thêm đánh giá */}
              <form onSubmit={handleSubmit}>
                <h3>Thêm đánh giá</h3>
                <div className="form-group">
                  <input
                    type="text"
                    name="HoTen"
                    placeholder="Tên của bạn"
                    value={newRating.HoTen}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="number"
                    name="SoSao"
                    placeholder="Số sao (1-5)"
                    min="1"
                    max="5"
                    value={newRating.SoSao}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <textarea
                  name="BinhLuan"
                  placeholder="Nhận xét của bạn"
                  value={newRating.BinhLuan}
                  onChange={handleInputChange}
                  required
                />
                <button id="btn-primary" type="submit">
                  Gửi đánh giá
                </button>
              </form>
            </div>
          </div>

          <button id="btn-cancel" onClick={handleClosePopup}>
            Đóng
          </button>

          {/* Snackbar */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message="Đánh giá đã được gửi thành công!"
            sx={{
              width: '50%',
              fontSize: '1.6rem',
              '& .MuiSnackbarContent-root': {
                backgroundColor: 'var(--primary-color)',
                color: '#fff',
                fontSize: '1.6rem',
                borderRadius: '8px',
                boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)'
              },
              '& .MuiSnackbarContent-message': {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              },
              '& .MuiSnackbarContent-action': {
                marginLeft: 'auto'
              }
            }}
          />
        </ServiceDetailPopUp>
      )}
    </NCSearchCardWrapper>
  )
}

const NCSearchCardWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;

  .nc-img {
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }

  .nc-info {
    padding: 20px;

    h3 {
      color: var(--primary-color);
      font-size: 1.8rem;
      margin-bottom: 10px;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        font-size: 1.6rem;
        margin-bottom: 10px;

        strong {
          font-weight: 700;
        }
      }
    }
  }

  .nc-button {
    display: flex;
    padding: 20px;
    gap: 10px;

    button {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
`

export default NCSearchCard
