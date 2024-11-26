import styled from 'styled-components'
import { OrderContext } from '../../../../context/OrderContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

function StepThiep({ luuThiep }) {
  const { selectedThiep, setSelectedThiep, setOrder } = useContext(OrderContext)
  const navigation = useNavigate()
  const handleThiepChange = (e) => {
    const thiepID = e.target.value
    const thiep = luuThiep.find((thiep) => thiep.MaThiep === thiepID)
    setSelectedThiep(thiep)
    setOrder(prevOrder => ({
      ...prevOrder,
      DichVu: {
        ...prevOrder.DichVu,
        MaThiepMoi: thiep.MaThiep
      }
    }))
  }
  const handleClick = () => {
    navigation('/list-thiep')
  }
  return (
    <StepThiepWrapper>
      <h3>Chọn Thiệp</h3>
      <div className="step-content">
        <p>
          Hãy chọn các thiệp mà bạn đã lưu, nếu bạn chưa có thì hãy xem danh
          sách thiệp và lưu chúng lại nha
        </p>
        <div className="step-content-action">
          <select defaultValue="" onChange={handleThiepChange}>
            <option value="" disabled hidden>
              Chọn thiệp
            </option>
            {luuThiep.map((thiep) => (
              <option key={thiep.MaThiep} value={thiep.MaThiep}>
                {thiep.LoaiThiep}
              </option>
            ))}
          </select>
          <button id="btn-primary" onClick={handleClick}>Danh sách</button>
        </div>
      </div>

      <div className="step-preview">
        <h3>Xem trước:</h3>
        {selectedThiep ? (
          <div className="thiep-info">
            <div className="thiep-info-left">
              <img
                src={selectedThiep.HinhAnh[0]}
                alt={selectedThiep.LoaiThiep}
              />
            </div>
            <div className="thiep-info-right">
              <h4>{selectedThiep.LoaiThiep}</h4>
              <p>Giá: {selectedThiep.Gia.toLocaleString()} VND</p>
            </div>
          </div>
        ) : (
          <p>Chưa chọn thiệp</p>
        )}
      </div>

      <div className="step-choose">
        {selectedThiep ? (
          <p>
            Bạn đã chọn Thiệp {selectedThiep.LoaiThiep}
            <span>✔ </span>
          </p>
        ) : (
          <p>&nbsp;</p>
        )}
      </div>
    </StepThiepWrapper>
  )
}

const StepThiepWrapper = styled.div`
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
    .thiep-info {
      display: flex;
      gap: 2rem;
      justify-content: center;
      padding: 2rem;
      .thiep-info-left {
        width: 40%;
        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 10px;
        }
      }

      .thiep-info-right {
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

export default StepThiep
