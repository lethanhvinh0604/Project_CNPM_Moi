import styled from 'styled-components'
import { useState, useContext } from 'react'
import { AdminTQContext } from '../../../../context/AdminTQContext'

function StatisticsSummary() {
  const { countData } = useContext(AdminTQContext)
  console.log(countData)

  const statsData = [
    {
      label: 'Hội trường',
      value: countData.hoiTruongActive || 0,
      color: '#F8D7DA',
      icon: '🏛️'
    },
    { label: 'MC', value: countData.mc || 0, color: '#FFF3CD', icon: '🎤' },
    {
      label: 'Combo',
      value: countData.combo || 0,
      color: '#D4EDDA',
      icon: '🍽️'
    },
    {
      label: 'Nhạc công',
      value: countData.nhacCong || 0,
      color: '#D1ECF1',
      icon: '🎸'
    },
    {
      label: 'Thiệp mời',
      value: countData.thiep || 0,
      color: '#D1ECF1',
      icon: '✉️'
    },
    {
      label: 'Đơn thành công',
      value: countData.datDichVu || 0,
      color: '#CCE5FF',
      icon: '✅'
    },
    {
      label: 'Đơn thất bại',
      value: countData.hoiTruongUnactive || 0,
      color: '#F8D7DA',
      icon: '❌'
    }
  ]

  return (
    <StatisticsWrapper>
      <h3>Thống kê chung:</h3>
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <StatCard key={index} color={stat.color}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </StatCard>
        ))}
      </div>
    </StatisticsWrapper>
  )
}

const StatisticsWrapper = styled.div`
  padding: 20px;

  h3 {
    font-size: 1.6rem;
    margin-bottom: 20px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 20px;
  }

  @media (max-width: 1024px) {
    .stats-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 425px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }
`

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
  text-align: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

  .stat-icon {
    font-size: 30px;
    margin-bottom: 10px;
  }

  .stat-value {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .stat-label {
    font-size: 16px;
  }
`

export default StatisticsSummary
