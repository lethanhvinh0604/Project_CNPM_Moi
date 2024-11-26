import styled from 'styled-components'
import { OrderContext } from '../../../../context/OrderContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
function StepHall({ luuHoiTruong }) {
  const { selectedHall, setSelectedHall, setOrder } = useContext(OrderContext)
  const navigation = useNavigate()
  const handleHallChange = (e) => {
    const hallId = e.target.value
    const hall = luuHoiTruong.find((hall) => hall.MaHoiTruong === hallId)
    setSelectedHall(hall)
    setOrder(prevOrder => ({
      ...prevOrder,
      DichVu: {
        ...prevOrder.DichVu,
        MaHoiTruong: hall.MaHoiTruong
      }
    }))
  }

  const handleClick = () => {
    navigation('/list-hall')
  }
  return (
    <StepHallWrapper>
      <h3>Chọn Hội Trường</h3>
      <div className="step-content">
        <p>
          Hãy chọn các hội trường mà bạn đã lưu, nếu bạn chưa có thì hãy xem
          danh sách hội trường và lưu chúng lại nha
        </p>
        <div className="step-content-action">
          <select defaultValue="" onChange={handleHallChange}>
            <option value="" disabled hidden>
              Chọn hội trường
            </option>
            {luuHoiTruong.map((hall) => (
              <option key={hall.MaHoiTruong} value={hall.MaHoiTruong}>
                {hall.TenHoiTruong}
              </option>
            ))}
          </select>
          <button id="btn-primary" onClick={handleClick}>Danh sách</button>
        </div>
      </div>

      <div className="step-preview">
        <h3>Xem trước:</h3>
        {selectedHall ? (
          <div className="hall-info">
            <div className="hall-info-left">
              <img
                src={selectedHall.HinhAnh[0]}
                alt={selectedHall.TenHoiTruong}
              />
            </div>
            <div className="hall-info-right">
              <h4>{selectedHall.TenHoiTruong}</h4>
              <p>Sức chứa: {selectedHall.SucChua}</p>
              <div className="inline">
                <p>Wifi: {selectedHall.Wifi ? 'Có' : 'Không'}</p>
                <p>Máy lạnh: {selectedHall.MayLanh ? 'Có' : 'Không'}</p>
                <p>Phòng kín: {selectedHall.PhongKin ? 'Có' : 'Không'}</p>
              </div>
              <div className="inline">
                <p>Diện tích: {selectedHall.DienTich} m²</p>
                <p>Số phòng: {selectedHall.SoPhong}</p>
                <p>Vị trí lầu: {selectedHall.ViTriLau}</p>
              </div>
              <p>Mô tả: {selectedHall.MoTa}</p>
              <p>Giá: {selectedHall.Gia.toLocaleString()} VND</p>
              <p>
                Tình trạng: {selectedHall.TinhTrang ? 'Còn trống' : 'Đã đặt'}
              </p>
            </div>
          </div>
        ) : (
          <p>Vui lòng chọn một hội trường để xem chi tiết.</p>
        )}
      </div>

      <div className="step-choose">
        {selectedHall ? (
          <p>
            Bạn đã chọn {selectedHall.TenHoiTruong}
            <span>✔</span>
          </p>
        ) : (
          <p>&nbsp;</p>
        )}
      </div>
    </StepHallWrapper>
  )
}

const StepHallWrapper = styled.div`
  h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: 500;
  }

  p {
    font-size: 1.6rem;
    font-style: italic;
  }
  .step-content {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
    p {
      font-size: 1.6rem;
      padding-left: 2rem;
    }

    .step-content-action {
      align-self: flex-end;
      margin-left: auto;
      display: flex;
      gap: 1rem;
      align-items: center;

      button {
        width: 200px;
      }
    }
  }

  .step-preview {
    .hall-info {
      display: flex;
      gap: 2rem;
      justify-content: center;
      padding: 2rem;
      .hall-info-left {
        width: 40%;
        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
        }
      }

      .hall-info-right {
        width: 60%;
        p {
          font-size: 1.6rem;
          margin-bottom: 1rem;
        }
        h4 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .inline {
          display: flex;
          gap: 2rem;
        }
      }
    }
  }

  .step-choose {
    text-align: center;
    p {
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 700;

      span {
        color: val(--primary-color);
        padding-left: 1rem;
      }
    }
  }
`

export default StepHall
