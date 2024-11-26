import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function ChartSection(data) {
  return (
    <div className="chart-section">
      <h3>Số tiền lợi nhuận:</h3>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="profit" fill="#00aaff" />
      </BarChart>
    </div>
  );
}
function CardTotalAmount (value) {
  return (
    <StatCard color={'#FFF3CD'}>
      <div className="stat-icon">{'💵'}</div>
      <div className="stat-value-label">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{"VND"}</div>
      </div>
    </StatCard>
  );
}

// Main ProfitChart function
function ProfitChart({ data, value }) {
  return (
    <ProfitChartWrapper>
      <div className="chart-section">
        {ChartSection(data)}
      </div>
      <div className="stat-card-section">
        {CardTotalAmount(value)}
      </div>
    </ProfitChartWrapper>
  );
}


const ProfitChartWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  position: relative;       // Để cho stat-card có thể di chuyển tự do trong bố cục
  h3 {
    font-size: 1.6rem;
    margin-bottom: 20px;
  }

  .chart-section {
    width: 75%;             // Biểu đồ chiếm 75% không gian
  }

  .stat-card-section {
    width: 20%;             // StatCard chiếm 20% không gian
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    margin-right: 500px;
  }
`;

const StatCard = styled.div`
  padding: 10px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
  text-align: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

  .stat-icon {
    font-size: 30px;
    margin-bottom: 10px;
  }

  .stat-value-label {
    display: flex;             
    align-items: center;
    justify-content: center;
  }

  .stat-value {
    font-size: 24px;
    margin-right: 5px;         
  }

  .stat-label {
    font-size: 24px;
  }
`;

export default ProfitChart;
