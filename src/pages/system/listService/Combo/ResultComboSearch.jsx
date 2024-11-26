import styled from 'styled-components'
import ComboSearchCard from './ComboSearchCard'

function ResultComboSearch({ resultSearch, totalResults }) {
  return (
    <ResultSearchWrapper>
      <h2>Kết quả tìm kiếm: {totalResults} kết quả</h2>
      <div className="combo-container">
        {resultSearch.map((combo) => {
          return <ComboSearchCard key={combo.MaCombo} combo={combo} />
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
  .combo-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
`

export default ResultComboSearch
