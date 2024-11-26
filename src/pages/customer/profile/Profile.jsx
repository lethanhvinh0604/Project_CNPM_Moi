import styled, { keyframes } from 'styled-components'
import { Helmet } from 'react-helmet'
import Sticky from 'react-sticky-el'

import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

import MainProfile from './MainProfile'

import { ProfileProvider } from '../../../context/ProfileContext'

function Profile() {
  return (
    <>
      <Helmet>
        <title>Thông tin cá nhân</title>
      </Helmet>
      <Sticky>
        <Header />
      </Sticky>
      <ProfileWrapper>
        <ProfileProvider>
          <MainProfile />
        </ProfileProvider>
      </ProfileWrapper>
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

const ProfileWrapper = styled.main`
  animation: ${fadeIn} 1s ease-in-out;
`

export default Profile
