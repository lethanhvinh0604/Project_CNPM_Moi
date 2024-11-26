import styled from 'styled-components'
import HallCard from './HallCard'

function SomeHall({ topHoiTruong }) {
  return (
    <SomeHallWrapper>
      <h2>Một Số Hội Trường Nổi Bật</h2>
      <div className="hall-container">
        {topHoiTruong.map((hall) => {
          return (
            <HallCard key={hall.hoitruong.MaHoiTruong} hall={hall.hoitruong} count={hall.count}/>
          )
        })}
      </div>
    </SomeHallWrapper>
  )
}

const SomeHallWrapper = styled.section`
  margin: 10rem 0;
  h2 {
    color: var(--primary-color);
    font-size: 3rem;
    margin-bottom: 5rem;
    text-align: center;
  }
  .hall-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
`

export default SomeHall
