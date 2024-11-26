import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import error403 from '../../assets/error.jpg'

function Page403() {
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
        <title>403 - Forbidden</title>
      </Helmet>
      <Page403Wrapper>
        <div className="img">
          <img src={error403} alt="403" />
        </div>
        <h1>403 - Forbidden</h1>
        <p>Xin lỗi, bạn không có quyền truy cập vào trang này</p>

        <div className="actions">
          <button id="btn-primary" onClick={handleRedirectToWelcome}>
            Quay lại trang chủ
          </button>
          <button id="btn-secoundary" onClick={handleRedirectToLogin}>
            Đăng nhập
          </button>
        </div>
      </Page403Wrapper>
    </>
  )
}

const Page403Wrapper = styled.section`
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
    gap: 10px;
  }
`

export default Page403
