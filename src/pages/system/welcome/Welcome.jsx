import styled, { keyframes } from 'styled-components'
import { Helmet } from 'react-helmet'
import Sticky from 'react-sticky-el'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import someHallData from '../../../data/someHallData'
import APIClient from '../../../api/client'

import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import HeroSection from './HeroSection'
import SomeHall from './SomeHall'
import SecondHeroSection from './SecondHeroSection'
import IntroService from './IntroService'

function Welcome() {
  const [topHoiTruong, setTopHoiTruong] = useState([])

  const [ref1, inView1] = useInView({ triggerOnce: true })
  const [ref2, inView2] = useInView({ triggerOnce: true })
  const [ref3, inView3] = useInView({ triggerOnce: true })
  const [refHero, inViewHero] = useInView({ triggerOnce: true })

  useEffect(() => {
    const apiClient = new APIClient('hoitruong/top')
    apiClient
      .find()
      .then((response) => {
        setTopHoiTruong(response.data.topHoiTruong)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <StickyWrapper>
        <Sticky>
          <Header />
        </Sticky>
      </StickyWrapper>
      <WelcomeWrapper>
        <div ref={refHero} className={`fade-up ${inViewHero ? 'visible' : ''}`}>
          <HeroSection />
        </div>
        <WelcomMainWrapper className="container">
          <div ref={ref1} className={`fade-up ${inView1 ? 'visible' : ''}`}>
            <SomeHall topHoiTruong={topHoiTruong} />
          </div>
          <div ref={ref2} className={`fade-up ${inView2 ? 'visible' : ''}`}>
            <IntroService />
          </div>
        </WelcomMainWrapper>
        <div ref={ref3} className={`fade-up ${inView3 ? 'visible' : ''}`}>
          <SecondHeroSection />
        </div>
      </WelcomeWrapper>
      <Footer />
    </>
  )
}

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const StickyWrapper = styled.div`
  position: relative;
  z-index: 1000; /* Đảm bảo Sticky không bị đè lên */
`

const WelcomMainWrapper = styled.section`
  /* Your existing styles */
`

const WelcomeWrapper = styled.main`
  height: auto;

  .fade-up {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s ease-out, transform 1s ease-out;
  }

  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
    animation: ${fadeInUp} 1s ease-out;
  }
`

export default Welcome
