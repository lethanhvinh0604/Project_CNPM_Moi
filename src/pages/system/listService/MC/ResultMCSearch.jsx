import styled from 'styled-components'
import MCSearchCard from './MCSearchCard'

function ResultMCSearch({ resultSearch, totalResults, setReload }) {
  return (
    <ResultSearchWrapper>
      <h2>Kết quả tìm kiếm: {totalResults} kết quả</h2>
      <div className="nc-container">
        {resultSearch.map((mc) => {
          return <MCSearchCard key={mc.MaNC} mc={mc} setReload={setReload}/>
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

export default ResultMCSearch
