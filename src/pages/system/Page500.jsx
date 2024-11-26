import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import error500 from '../../assets/error.jpg' // Đảm bảo bạn có ảnh lỗi 500

function Page500() {
  const navigate = useNavigate()

  const handleRedirectToWelcome = () => {
    navigate('/')
  }

  return (
    <>
      <Helmet>
        <title>500 - Lỗi máy chủ</title>
      </Helmet>
      <Page500Wrapper>
        <div className="img">
          <img src={error500} alt="500" />
        </div>
        <h1>500 - Lỗi máy chủ</h1>
        <p>Xin lỗi, đã xảy ra lỗi trên máy chủ</p>

        <div className="actions">
          <button id="btn-primary" onClick={handleRedirectToWelcome}>
            Quay lại trang chủ
          </button>
        </div>
      </Page500Wrapper>
    </>
  )
}

const Page500Wrapper = styled.section`
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

export default Page500
