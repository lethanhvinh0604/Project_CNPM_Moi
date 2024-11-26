import styled from 'styled-components'
import { useContext } from 'react'
import { OrderContext } from '../../../../context/OrderContext'

import { useNavigate } from 'react-router-dom'
function StepMC({ luuMC }) {
  const { selectedMC, setSelectedMC, setOrder } = useContext(OrderContext)
  const navigation = useNavigate()
  const handleMCChange = (e) => {
    const mcID = e.target.value
    const mc = luuMC.find((mc) => mc.MaMC === mcID)
    setSelectedMC(mc)
    setOrder(prevOrder => ({
      ...prevOrder,
      DichVu: {
        ...prevOrder.DichVu,
        MaMC: mc.MaMC
      }
    }))
  }

  const handleClick = () => {
    navigation('/list-mc')
  }
  return (
    <StepMCWrapper>
      <h3>Chọn MC</h3>
      <div className="step-content">
        <p>
          Hãy chọn các MC mà bạn đã lưu, nếu bạn chưa có thì hãy xem danh sách
          MC và lưu chúng lại nha
        </p>
        <div className="step-content-action">
          <select defaultValue="" onChange={handleMCChange}>
            <option value="" disabled hidden >
              Chọn MC
            </option>
            {luuMC.map((mc) => (
              <option key={mc.MaMC} value={mc.MaMC}>
                {mc.HoTen}
              </option>
            ))}
          </select>
          <button id="btn-primary" onClick={handleClick}>Danh sách</button>
        </div>
      </div>

      <div className="step-preview">
        <h3>Xem trước:</h3>
        {selectedMC ? (
          <div className="mc-info">
            <div className="mc-info-left">
              <img src={selectedMC.HinhAnh} alt={selectedMC.TenMC} />
            </div>
            <div className="mc-info-right">
              <h4>{selectedMC.HoTen}</h4>
              <p>Số điện thoại: {selectedMC.SDT}</p>
              <p>Kinh nghiệm: {selectedMC.KinhNghiem} năm</p>
              <p>Giá: {selectedMC.Gia.toLocaleString()} VND</p>
              <p>Tình trạng: {selectedMC.TinhTrang ? 'Còn' : 'Hết'}</p>
            </div>
          </div>
        ) : (
          <p>Chưa chọn MC</p>
        )}
      </div>

      <div className="step-choose">
        {selectedMC ? (
          <p>
            Bạn đã chọn {selectedMC.HoTen}
            <span>✔ </span>
          </p>
        ) : (
          <p>&nbsp;</p>
        )}
      </div>
    </StepMCWrapper>
  )
}

const StepMCWrapper = styled.section`
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
    .mc-info {
      display: flex;
      gap: 2rem;
      justify-content: center;
      padding: 2rem;
      .mc-info-left {
        width: 40%;
        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
        }
      }

      .mc-info-right {
        width: 60%;
        p {
          font-size: 1.6rem;
          margin-bottom: 1rem;
        }
        h4 {
          font-size: 2rem;
          margin-bottom: 1rem;
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

export default StepMC
