import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import error401 from '../../assets/error.jpg' // Đảm bảo bạn có ảnh lỗi 401

function Page401() {
  const navigate = useNavigate()

  const handleRedirectToWelcome = () => {
    navigate('/')
  }

  const handleRedirectToLogin = () => {
    navigate('/login')
  }

  return (
    <>
      <Helmet>
        <title>401 - Không có quyền truy cập</title>
      </Helmet>
      <Page401Wrapper>
        <div className="img">
          <img src={error401} alt="401" />
        </div>
        <h1>401 - Không có quyền truy cập</h1>
        <p>Xin lỗi, bạn không có quyền truy cập vào trang này</p>

        <div className="actions">
          <button id="btn-primary" onClick={handleRedirectToWelcome}>
            Quay lại trang chủ
          </button>
          <button id="btn-secoundary" onClick={handleRedirectToLogin}>
            Đăng nhập
          </button>
        </div>
      </Page401Wrapper>
    </>
  )
}

const Page401Wrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  height: 100vh;

  .img {
    width: 100%;
    text-align: center;

    img {
      width: 100%;
      max-width: 400px;
      object-fit: cover;
    }
  }

  h1 {
    font-size: 4rem;
    color: var(--primary-color);
  }
  p {
    font-size: 2rem;
  }

  .actions {
    display: flex;
    gap: 20px;
  }
`

export default Page401
