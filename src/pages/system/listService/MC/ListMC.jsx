import styled, { keyframes } from 'styled-components'
import { Helmet } from 'react-helmet'
import Sticky from 'react-sticky-el'
import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import MCMain from './MCMain'

import { ListNCProvider } from '../../../../context/ListNCContext'

function ListMC() {
  return (
    <>
      <Helmet>
        <title>Danh sách MC</title>
      </Helmet>
      <Sticky>
        <Header />
      </Sticky>
      <ListMCWrapper>
        <ListNCProvider>
          <MCMain />
        </ListNCProvider>
      </ListMCWrapper>
      <Footer />
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

const ListMCWrapper = styled.main`
  animation: ${fadeIn} 1s ease-in-out;
`
export default ListMC
