import styled, { keyframes } from 'styled-components'
import { Helmet } from 'react-helmet'
import Header from '../../../components/Header'
import Bg from '../../../assets/bg-v1.png'
import MainOrder from './MainOrder'

import { OrderProvider } from '../../../context/OrderContext'

function OrderEvent() {
  return (
    <>
      <Helmet>
        <title>Đặt dich vụ </title>
      </Helmet>
      <Header />
      <OrderEventWrapper>
        <OrderProvider>
          <MainOrder />
        </OrderProvider>
      </OrderEventWrapper>
    </>
  )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const OrderEventWrapper = styled.main`
  height: 90vh;
  background-image: url(${Bg});
  background-size: cover;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 1s ease-in-out;

  @media (max-width: 768px) {
    height: 100vh;
  }

  @media (max-width: 425px) {
    height: 100%;
  }
`

export default OrderEvent
