import { useState, useContext } from 'react'
import { AdminTQContext } from '../../../../context/AdminTQContext'
import styled from 'styled-components'

function TopServices() {
  const { mostUsedData } = useContext(AdminTQContext)
  console.log(mostUsedData)

  const data = [
    {
      ma: 'Hội trường: ' + mostUsedData.mostUsedHall.id,
      name: mostUsedData.mostUsedHall.name,
      orders: mostUsedData.mostUsedHall.count || 0
    },
    {
      ma: 'MC: ' + mostUsedData.mostUsedMC.id,
      name: mostUsedData.mostUsedMC.name,
      orders: mostUsedData.mostUsedMC.count || 0
    },
    {
      ma: 'Combo: ' + mostUsedData.mostUsedCombo.id,
      name: mostUsedData.mostUsedCombo.name,
      orders: mostUsedData.mostUsedCombo.count || 0
    },
    {
      ma: 'Nhạc công: ' + mostUsedData.mostUsedNhacCong.id,
      name: mostUsedData.mostUsedNhacCong.name,
      orders: mostUsedData.mostUsedNhacCong.count || 0
    },
    {
      ma: 'Thiệp mời: ' + mostUsedData.mostUsedThiep.id,
      name: mostUsedData.mostUsedThiep.name,
      orders: mostUsedData.mostUsedThiep.count || 0
    }
  ]

  return (
    <TopServicesWrapper>
      <h3>Những hội trường và dịch vụ đứng đầu:</h3>
      <ul>
        {data.map((service, index) => (
          <li key={index}>
            <span className="service-name">{service.ma}</span>
            <span className="service-name">{service.name}</span>
            <span className="service-success">
              <SuccessRate>{service.orders}</SuccessRate> lượt đặt
            </span>
          </li>
        ))}
      </ul>
    </TopServicesWrapper>
  )
}

const TopServicesWrapper = styled.div`
  padding: 20px;

  h3 {
    font-size: 1.6rem;
    margin-bottom: 20px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Chia thành 2 cột */
    gap: 10px; /* Tạo khoảng cách giữa các mục */
    grid-auto-flow: row; /* Hiển thị từ trên xuống dưới và rồi sang phải */
    list-style-type: none;
    padding: 0;
    margin: 0;

    ${'' /* Tạo một đường line giữa hai cột */}
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 1px;
      background-color: #e0e0e0;
    }
  }

  li {
    display: flex;
    justify-content: space-between; /* Giúp các phần tử bên trong căn đều giữa tên dịch vụ và số lượng */
    align-items: center;
    padding: 10px;
    font-size: 1.2rem;
    border-bottom: 1px solid #e0e0e0;

    .service-name {
      flex: 1;
      text-align: left;
    }

    .service-orders {
      flex: 1;
      text-align: center;
    }

    .service-success {
      flex: 1;
      text-align: right;
    }
  }
`

const SuccessRate = styled.span`
  background-color: #d4edda;
  color: #28a745;
  padding: 2px 8px;
  border-radius: 5px;
`

export default TopServices
