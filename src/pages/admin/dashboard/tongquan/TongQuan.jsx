import StatisticsSummary from './StatisticsSummary'
import TopServices from './TopServices'
import ProfitChart from './ProfitChart'
import styled from 'styled-components'
import { AdminTQProvider } from '../../../../context/AdminTQContext'
import someTQData from '../../../../data/someTQData'

function TongQuan() {
  return (
    <AdminTQProvider>
      <div className="tongquan">
        <TongQuanWrapper>
          <h2>Tổng Quan</h2>
          <div className="hall-content">
            <div className="hall-content-detail">
              <StatisticsSummary />
            </div>
            <div className="hall-content-detail">
              <TopServices />
            </div>
          </div>
        </TongQuanWrapper>
      </div>
    </AdminTQProvider>
  )
}

const TongQuanWrapper = styled.section`
  font-family: 'Source Sans 3', sans-serif;
  background-color: #f1f3f5;
  h2 {
    color: var(--primary-color);
    width: 100%;
    font-size: 2.4rem;
    padding: 20px;
    text-align: center;
    text-transform: uppercase;
  }
  .hall-content {
    padding: 20px;
    display: grid;
    grid-template-rows: auto;
    gap: 20px;

    .hall-content-detail {
      padding: 20px;
      border: 1px solid #ccc;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: #0000000f 0px 4px 20px 0px;
    }
  }
`
export default TongQuan
