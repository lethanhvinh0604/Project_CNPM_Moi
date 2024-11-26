import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Helmet } from 'react-helmet' // dùng để thay đổi title của trang
import { useNavigate } from 'react-router-dom'
import error404 from '../../assets/error.jpg'

function Page404() {
  const navigate = useNavigate()

  const handleRedirectToWelcome = () => {
    navigate('/')
  }
  return (
    <>
      <Helmet>
        <title>404 - Không tìm thấy trang</title>
      </Helmet>
      <Page404Wrapper>
        <div className="img">
          <img src={error404} alt="404" />
        </div>
        <h1>404 - Không tìm thấy trang</h1>
        <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại</p>
        <button id="btn-primary" onClick={handleRedirectToWelcome}>
          Quay lại trang chủ
        </button>
      </Page404Wrapper>
    </>
  )
}

const Page404Wrapper = styled.section`
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
`

export default Page404
