import styled, { keyframes } from 'styled-components'
import { Helmet } from 'react-helmet'
import Sticky from 'react-sticky-el'

import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'

import NCMain from './NCMain'

import { ListNCProvider } from '../../../../context/ListNCContext'

function ListNC() {
  return (
    <>
      <Helmet>
        <title>Danh sách nhạc công</title>
      </Helmet>
      <Sticky>
        <Header />
      </Sticky>
      <ListNCWrapper>
        <ListNCProvider>
          <NCMain />
        </ListNCProvider>
      </ListNCWrapper>
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

const ListNCWrapper = styled.main`
  animation: ${fadeIn} 1s ease-in-out;
`

export default ListNC
