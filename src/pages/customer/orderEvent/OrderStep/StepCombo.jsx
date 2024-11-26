import styled from 'styled-components'
import { OrderContext } from '../../../../context/OrderContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

function StepCombo({ luuCombo }) {
  const { selectedCombo, setSelectedCombo, setOrder } = useContext(OrderContext)
  const navigation = useNavigate()
  const handleComboChange = (e) => {
    const comboID = e.target.value
    const combo = luuCombo.find((combo) => combo.MaCombo === comboID)
    setSelectedCombo(combo)
    setOrder(prevOrder => ({
      ...prevOrder,
      DichVu: {
        ...prevOrder.DichVu,
        MaCombo: combo.MaCombo
      }
    }))
  }
  const handleClick = () => {
    navigation('/list-combo')
  }

  return (
    <StepComboWrapper>
      <h3>Chọn Thực Đơn</h3>
      <div className="step-content">
        <p>
          Hãy chọn các Combo Thực đơn mà bạn đã lưu, nếu bạn chưa có thì hãy xem
          danh sách Combo Thực đơn và lưu chúng lại nha
        </p>
        <div className="step-content-action">
          <select defaultValue="" onChange={handleComboChange}>
            <option value="" disabled hidden>
              Chọn Combo
            </option>
            {luuCombo.map((combo) => (
              <option key={combo.MaCombo} value={combo.MaCombo}>
                {combo.TenCombo}
              </option>
            ))}
          </select>
          <button id="btn-primary" onClick={handleClick}>Danh sách</button>
        </div>
      </div>

      <div className="step-preview">
        <h3>Xem trước:</h3>
        {selectedCombo ? (
          <div className="combo-info">
            <div className="combo-info-left">
              <img
                src={selectedCombo.HinhAnh[0]}
                alt={selectedCombo.TenCombo}
              />
            </div>
            <div className="combo-info-right">
              <h4>{selectedCombo.TenCombo}</h4>
              <div className="inline">
                <p>Loại Combo: {selectedCombo.LoaiCombo}</p>
                <p>Mô tả: {selectedCombo.MoTa}</p>
                <p>Giá: {selectedCombo.Gia.toLocaleString()} VND</p>
              </div>
              <p>Danh sách món ăn:</p>
              <ul>
                {selectedCombo.DanhSachMonAn.map((monAn, index) => (
                  <li key={index}>{monAn}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p>Chưa chọn Combo</p>
        )}
      </div>

      <div className="step-choose">
        {selectedCombo ? (
          <p>
            Bạn đã chọn {selectedCombo.TenCombo}
            <span>✔ </span>
          </p>
        ) : (
          <p>&nbsp;</p>
        )}
      </div>
    </StepComboWrapper>
  )
}

const StepComboWrapper = styled.div`
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
    .combo-info {
      display: flex;
      gap: 2rem;
      justify-content: center;
      padding: 2rem;
      .combo-info-left {
        width: 40%;
        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
        }
      }

      .combo-info-right {
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
        ul {
          list-style-type: circle;
          margin-left: 2rem;

          li {
            font-size: 1.6rem;
            line-height: 1.4;
            font-style: italic;
          }
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

export default StepCombo
