import styled from 'styled-components'
import MainOrderStepper from './MainOrderStepper'

function MainOrder() {
  const handleCancel = () => {
    window.history.back()
  }

  return (
    <OrderEventWrapper className="container">
      <div className="order-event-heading">
        <h2>Đặt dịch vụ</h2>
        <button id="btn-cancel" onClick={handleCancel}>
          Hủy
        </button>
      </div>
      <hr />
      <MainOrderStepper />
    </OrderEventWrapper>
  )
}

const OrderEventWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 600px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: #0000000f 0px 4px 20px 0px;

  hr {
    border: 0;
    border-top: 2px solid var(--primary-color);
    width: 100%;
  }

  .order-event-heading {
    display: flex;
    justify-content: space-between;
    align-items: center; /* Align all items to center vertically */
    padding: 1rem;
    width: 100%;
    height: auto;

    h2 {
      margin: 0;
      color: var(--primary-color);
      font-size: 2.4rem;
      margin-bottom: 0;
      align-self: center;
    }

    #btn-cancel {
      margin-top: 0;
      align-self: center;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 425px) {
    height: 100%;
  }
`

export default MainOrder
