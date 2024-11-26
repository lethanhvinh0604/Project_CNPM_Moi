import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import APIClient from '../../../../api/client'
import ServiceDetailPopUp from '../../../../components/ServiceDetailPopUp'

import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

function ThiepSearchCard({ thiep }) {
  const { MaThiep, LoaiThiep, Gia, HinhAnh } = thiep
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [thiepDetail, setThiepDetail] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const userID = sessionStorage.getItem('userID')

  useEffect(() => {
    const apiClient = new APIClient('thiep')
    apiClient
      .findByID(MaThiep)
      .then((response) => {
        setThiepDetail(response.data.thiep)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [MaThiep])

  const handleViewClick = () => {
    setIsPopupOpen(true)
    // Thêm MaNhacCong vào URL
    navigate(`${location.pathname}?MaThiep=${MaThiep}`, { replace: true })
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
      .saveOption(userID, MaThiep)
      .then((response) => {
        if (response.status === 200) {
          alert('Lưu thiệp mời thành công')
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
    <ThiepSearchCardWrapper>
      <div className="thiep-img">
        <img src={HinhAnh[0]} alt={LoaiThiep} />
      </div>
      <div className="thiep-info">
        <h3>Thiệp {LoaiThiep}</h3>
        <ul>
          <li>
            <strong>Giá: {formatCurrency(Gia)}</strong>
          </li>
        </ul>
      </div>
      <div className="thiep-button">
        <button id="btn-primary" onClick={handleSave}>Lưu</button>
        <button id="btn-secoundary" onClick={handleViewClick}>
          Xem
        </button>
      </div>
      {isPopupOpen && (
        <ServiceDetailPopUp onClose={handleClosePopup}>
          <h2>{LoaiThiep}</h2>
          <div className="popup-content">
            <div className="popup-img">
              <Carousel autoPlay interval={3000}>
                {HinhAnh.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${LoaiThiep} ${index + 1}`}
                  />
                ))}
              </Carousel>
            </div>

            <div className="popup-info">
              <ul>
                <li>
                  <strong>Loại thiệp :</strong> {LoaiThiep}
                </li>
                <li>
                  <strong>Giá:</strong> {formatCurrency(Gia)}
                </li>
              </ul>
            </div>
          </div>

          <button id="btn-cancel" onClick={handleClosePopup}>
            Đóng
          </button>
        </ServiceDetailPopUp>
      )}
    </ThiepSearchCardWrapper>
  )
}

const ThiepSearchCardWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;

  .thiep-img {
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
  }

  .thiep-info {
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

  .thiep-button {
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

export default ThiepSearchCard
