import styled, { keyframes } from 'styled-components'
import { Helmet } from 'react-helmet'
import Sticky from 'react-sticky-el'

import Header from '../../../../components/Header'
import Footer from '../../../../components/Footer'

import ComboMain from './ComboMain'

import { ListNCProvider } from '../../../../context/ListNCContext'

function ListCombo() {
  return (
    <>
      <Helmet>
        <title>Danh sách combo món ăn</title>
      </Helmet>
      <Sticky>
        <Header />
      </Sticky>
      <ListComboWrapper>
        <ListNCProvider>
          <ComboMain />
        </ListNCProvider>
      </ListComboWrapper>
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

const ListComboWrapper = styled.main`
  animation: ${fadeIn} 1s ease-in-out;
`
const ListComboMainWrapper = styled.section``

export default ListCombo
