import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import APIClient from '../../../../api/client'
import ServiceDetailPopUp from '../../../../components/ServiceDetailPopUp'

import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

function ComboSearchCard({ combo }) {
  const { MaCombo, TenCombo, LoaiCombo, MoTa, Gia, DanhSachMonAn, HinhAnh } = combo
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [comboDetail, setComboDetail] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const userID = sessionStorage.getItem('userID')
  useEffect(() => {
    const apiClient = new APIClient('combo')
    apiClient
      .findByID(MaCombo)
      .then((response) => {
        setComboDetail(response.data.combo)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [MaCombo])
  const handleViewClick = () => {
    setIsPopupOpen(true)
    navigate(`${location.pathname}?MaCombo=${MaCombo}`, { replace: true }) }

  const handleClosePopup = () => {
    setIsPopupOpen(false)
    const searchParams = new URLSearchParams(location.search)
    searchParams.delete('MaCombo')
    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true
    })
  }

  const handleSave = () => {
    const apiClient = new APIClient('khachhang')
    apiClient
      .saveOption(userID, MaCombo)
      .then((response) => {
        if (response.status === 200) {
          alert('Lưu combo thành công')
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
    <ComboSearchCardWrapper>
      <div className="combo-img">
        <img src={HinhAnh[0]} alt={TenCombo} />
      </div>
      <div className="combo-info">
        <h3>{TenCombo}</h3>
        <ul>
          <li>Loại combo: {LoaiCombo}</li>
          <li>
            <strong>Giá: {formatCurrency(Gia)}</strong>
          </li>
        </ul>
      </div>
      <div className="combo-button">
        <button id="btn-primary" onClick={handleSave}>Lưu</button>
        <button id="btn-secoundary" onClick={handleViewClick}>
          Xem
        </button>
      </div>

      {isPopupOpen && (
        <ServiceDetailPopUp onClose={handleClosePopup}>
          <h2>{TenCombo}</h2>
          <div className="popup-content">
            <div className="popup-img">
              <Carousel autoPlay interval={3000}>
                {HinhAnh.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${TenCombo} ${index + 1}`}
                  />
                ))}
              </Carousel>
            </div>
            <div className="popup-info">
              <ul>
                <li>
                  <strong>Tên combo:</strong> {TenCombo}
                </li>
                <li>
                  <strong>Loại combo:</strong> {LoaiCombo}
                </li>
                <li>
                  <strong>Giá:</strong> {formatCurrency(Gia)}
                </li>
                <li>
                  <strong>Mô tả:</strong> {MoTa}
                </li>
                <li>
                  <strong>Danh sách món ăn:</strong>{' '}
                  {DanhSachMonAn.map((monAn) => monAn).join(', ')}
                </li>
              </ul>
            </div>
          </div>

          <button id="btn-cancel" onClick={handleClosePopup}>
            Đóng
          </button>
        </ServiceDetailPopUp>
      )}
    </ComboSearchCardWrapper>
  )
}

const ComboSearchCardWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;

  .combo-img {
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }

  .combo-info {
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

  .combo-button {
    display: flex;
    padding: 20px;
    gap: 10px;

    button {
      width: 100%;
      display: flex; /* Sử dụng flexbox để căn giữa nội dung */
      justify-content: center; /* Căn giữa theo chiều ngang */
      align-items: center; /* Căn giữa theo chiều dọc */
      text-align: center;
    }
  }
`

export default ComboSearchCard
