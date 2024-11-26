import styled from 'styled-components'
import Bg from '../../../assets/bg-v1.png'
// import Bg from '../../../assets/bg-v2.png'

function SecondHeroSection() {
  return (
    <SecondHeroSectionWrapper>
      <h1>Hãy đặt hội trường cho bạn ngay hôm nay!!!</h1>
    </SecondHeroSectionWrapper>
  )
}

const SecondHeroSectionWrapper = styled.section`
  height: 40vh;
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
    font-size: 4.5rem;
    margin-bottom: 2rem;

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

  @media (max-width: 768px) {
    height: 60vh; /* Reduce height for tablets and smaller screens */
  }
`

export default SecondHeroSection
