import styled, { keyframes } from 'styled-components'
import { Helmet } from 'react-helmet'
import Sticky from 'react-sticky-el'

import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'
import ThiepMain from './ThiepMain'

import { ListNCProvider } from '../../../../context/ListNCContext'


function ListThiep() {
  return (
    <>
      <Helmet>
        <title>Danh sách thiệp</title>
      </Helmet>
      <Sticky>
        <Header />
      </Sticky>
      <ListThiepWrapper>
        <ListNCProvider>
          <ThiepMain />
        </ListNCProvider>
      </ListThiepWrapper>
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

const ListThiepWrapper = styled.main`
  animation: ${fadeIn} 1s ease-in-out;
`

export default ListThiep
