import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import APIClient from '../../../../api/client'
import ServiceDetailPopUp from '../../../../components/ServiceDetailPopUp'

import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import Snackbar from '@mui/material/Snackbar'

function MCSearchCard({ mc, setReload }) {
  const { MaMC, HoTen, SDT, KinhNghiem, TinhTrang, Gia, DanhGia, HinhAnh } = mc
  const [newRating, setNewRating] = useState({
    HoTen: '',
    SoSao: '',
    BinhLuan: ''
  })
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [mcDetail, setMCDetail] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const userID = sessionStorage.getItem('userID')
  const handleViewClick = () => {
    setIsPopupOpen(true)
    navigate(`${location.pathname}?MaMC=${MaMC}`, { replace: true })
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
    const searchParams = new URLSearchParams(location.search)
    searchParams.delete('MaMC')
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true
    })
  }
  useEffect(() => {
    const apiClient = new APIClient('mc')
    apiClient
      .findByID(MaMC)
      .then((response) => {
        setMCDetail(response.data.mc)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [MaMC])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Gọi hàm để thêm đánh giá mới vào danh sách
    const updatedRatings = [
      ...DanhGia,
      { ...newRating, ThoiGian: new Date().toISOString() }
    ]
    const apiClient = new APIClient('mc')
    apiClient
      .rating(MaMC, newRating)
      .then((response) => {
        setReload(prev => !prev)
      })
      .catch((error) => {
        alert(error)
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

  const handleSave = () => {
    const apiClient = new APIClient('khachhang')
    apiClient
      .saveOption(userID, MaMC)
      .then((response) => {
        if (response.status === 200) {
          alert('Lưu MC thành công')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const formatCurrency = (amount) => {
    // Chuyển đổi số thành chuỗi và sử dụng regex để thêm dấu phẩy
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'
  }
  return (
    <MCSearchCardWrapper>
      <div className="mc-img">
        <img src={HinhAnh} alt={HoTen} />
      </div>
      <div className="mc-info">
        <h3>{HoTen}</h3>
        <ul>
          <li>Số điện thoại: {SDT}</li>
          <li>Kinh nghiệm: {!KinhNghiem ? 'Chưa có' : KinhNghiem}</li>
          <li>Tình trạng: {TinhTrang ? 'Còn trống' : 'Đã đặt'}</li>
          <li>
            <strong>Giá: {formatCurrency(Gia)}</strong>
          </li>
        </ul>
      </div>
      <div className="mc-button">
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
                  <strong>Tên MC:</strong> {HoTen}
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
                  minLength={10}
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
    </MCSearchCardWrapper>
  )
}

const MCSearchCardWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;

  .mc-img {
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }

  .mc-info {
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

  .mc-button {
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

export default MCSearchCard
