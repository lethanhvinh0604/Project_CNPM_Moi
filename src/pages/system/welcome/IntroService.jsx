import styled from 'styled-components'

import service_one from '../../../assets/welcome-1.png'
import service_two from '../../../assets/welcome-2.png'
import service_three from '../../../assets/welcome-3.png'
import service_four from '../../../assets/welcome-4.png'
import service_five from '../../../assets/welcome-5.png'

function IntroService() {
  return (
    <IntroServiceWrapper>
      <h2>Các Dịch Vụ Đặt Thêm</h2>
      <div className="service-list">
        <div className="service-item-type-primary">
          <div className="service-item-info">
            <h3>
              Tìm Kiếm Hội Trường <strong>Phù Hợp</strong>
            </h3>
            <p>
              Dễ dàng tìm kiếm hội trường lý tưởng dựa trên các tiêu chí như sức
              chứa, diện tích, và các tiện ích đi kèm.
            </p>
          </div>
          <div className="service-item-img">
            <img src={service_one} alt="service" />
          </div>
        </div>
        <div className="service-item-type-secoundary">
          <div className="service-item-img">
            <img src={service_two} alt="service" />
          </div>
          <div className="service-item-info">
            <h3>
              Thuê MC <strong>Chuyên Nghiệp</strong>
            </h3>
            <p>
              Lựa chọn MC có sẵn phù hợp với sự kiện của bạn. Hệ thống sẽ tự
              động liệt kê các MC khả dụng theo lịch trình của bạn.
            </p>
          </div>
        </div>
        <div className="service-item-type-primary">
          <div className="service-item-info">
            <h3>
              Thuê Nhạc Công <strong>Tài Năng</strong>
            </h3>
            <p>
              Lựa chọn nhạc công từ danh sách các nghệ sĩ có lịch trình trống
              vào ngày sự kiện của bạn.
            </p>
          </div>
          <div className="service-item-img">
            <img src={service_three} alt="service" />
          </div>
        </div>
        <div className="service-item-type-secoundary">
          <div className="service-item-img">
            <img src={service_four} alt="service" />
          </div>
          <div className="service-item-info">
            <h3>
              Lên Thực Đơn <strong>Đa Dạng</strong>
            </h3>
            <p>
              Chọn từ các thực đơn có sẵn với nhiều tùy chọn món ăn cho sự kiện
              của bạn. Đặt số lượng bàn ăn và tùy chỉnh thực đơn theo ý muốn.
            </p>
          </div>
        </div>
        <div className="service-item-type-primary">
          <div className="service-item-info">
            <h3>
              Chọn Thiệp Mời <strong>Đẹp Mắt</strong>
            </h3>
            <p>
              Lựa chọn từ nhiều mẫu thiệp mời ấn tượng, phù hợp với phong cách
              sự kiện của bạn. Tùy chỉnh nội dung thiệp mời qua trao đổi trực
              tiếp với trung tâm.
            </p>
          </div>
          <div className="service-item-img">
            <img src={service_five} alt="service" />
          </div>
        </div>
      </div>
    </IntroServiceWrapper>
  )
}

const IntroServiceWrapper = styled.section`
  margin: 10rem 0;
  h2 {
    color: var(--primary-color);
    font-size: 3rem;
    margin-bottom: 5rem;
    text-align: center;
  }
  .service-list {
    display: flex;
    gap: 20px;
    flex-direction: column;
  }

  .service-item-img {
    width: 60%;
    img {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }
  }

  .service-item-info {
    width: 40%;
    padding: 20px;
    h3 {
      color: var(--primary-color);
      font-size: 3rem;
      margin-bottom: 10px;
      line-height: 1.6;
      font-weight: 500;

      strong {
        font-weight: 700;
      }
    }
    p {
      font-size: 1.6rem;
      line-height: 1.4;
    }
  }

  .service-item-type-primary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .service-item-img {
      img {
        border-radius: 0 10px 10px 0;
      }
    }
  }

  .service-item-type-secoundary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .service-item-img {
      img {
        border-radius: 10px 0 0 10px;
      }
    }
  }

  @media (max-width: 768px) {
    .service-list {
      flex-direction: column;
    }

    .service-item-type-primary,
    .service-item-type-secoundary {
      flex-direction: column;
      text-align: center;
    }

    .service-item-info,
    .service-item-img {
      width: 100%;
    }

    .service-item-img img {
      height: auto;
      border-radius: 10px;
    }

    h2 {
      font-size: 2.5rem;
    }

    .service-item-info h3 {
      font-size: 2.5rem;
    }

    .service-item-info p {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 2rem;
    }

    .service-item-info h3 {
      font-size: 2rem;
    }

    .service-item-info p {
      font-size: 1.2rem;
    }

    .service-item-img img {
      height: 250px;
    }
  }
`

export default IntroService
