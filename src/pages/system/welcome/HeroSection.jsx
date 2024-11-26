import styled from 'styled-components'
import Bg from '../../../assets/bg-v1.png'
// import Bg from '../../../assets/bg-v2.png'

function HeroSection() {
  return (
    <HeroSectionWrapper>
      <h1>Hội trường lý tưởng cho bạn</h1>
      <h3>
        Sự kiện trong mơ của bạn bắt đầu từ đây – Tìm kiếm hội trường hoàn hảo
        chỉ trong vài bước!
      </h3>
    </HeroSectionWrapper>
  )
}

const HeroSectionWrapper = styled.section`
  margin-bottom: 5rem;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  background-image: url(${Bg});
  background-size: cover;
  object-fit: cover;
  text-align: center;
  h1 {
    color: var(--primary-color);
    font-size: 6rem;
    margin-bottom: 2rem;
    text-transform: uppercase;

    @media (max-width: 1024px) {
      font-size: 4.5rem; /* Adjust for medium screens */
    }

    @media (max-width: 768px) {
      font-size: 3.5rem; /* Adjust for tablets */
    }

    @media (max-width: 480px) {
      font-size: 2.8rem; /* Adjust for smaller mobile devices */
    }
  }
  h3 {
    color: var(--secondary-color);
    font-size: 3rem;
    margin-bottom: 1rem;
    line-height: 1.5;
    @media (max-width: 1024px) {
      font-size: 2.5rem; /* Adjust for medium screens */
    }

    @media (max-width: 768px) {
      font-size: 2rem; /* Adjust for tablets */
    }

    @media (max-width: 480px) {
      font-size: 1.8rem; /* Adjust for smaller mobile devices */
    }
  }

  @media (max-width: 768px) {
    height: 60vh; /* Reduce height for tablets and smaller screens */
  }
`

export default HeroSection
