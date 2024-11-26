import styled from 'styled-components'
import NCSearchCard from './NCSearchCard'

function ResultNCSearch({ resultSearch, totalResults, setReload }) {
  return (
    <ResultSearchWrapper>
      <h2>Kết quả tìm kiếm: {totalResults} kết quả </h2>
      <div className="nc-container">
        {resultSearch.map((nc) => {
          return <NCSearchCard key={nc.MaNhacCong} nc={nc} setReload={setReload}/>
        })}
      </div>
    </ResultSearchWrapper>
  )
}

const ResultSearchWrapper = styled.section`
  margin: 10rem 0;
  h2 {
    color: var(--primary-color);
    font-size: 3rem;
    margin-bottom: 5rem;
    text-align: center;
  }
  .nc-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
`

export default ResultNCSearch
