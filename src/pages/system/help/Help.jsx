import styled, { keyframes } from 'styled-components'
import { Helmet } from 'react-helmet'
import Sticky from 'react-sticky-el'

import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

function Help() {
  return (
    <>
      <Helmet>
        <title>Trợ giúp</title>
      </Helmet>
      <Sticky>
        <Header />
      </Sticky>
      <HelpWrapper>
        <h2>Hướng Dẫn Sử Dụng Tài Khoản</h2>
        <div className="account-info">
          <h3>Tài khoản Admin</h3>
          <div className="account-details">
            <p>
              <strong>Username:</strong> admin1
            </p>
            <p>
              <strong>Password:</strong> Admin123!
            </p>
          </div>
        </div>
        <div className="account-info">
          <h3>Tài khoản User</h3>
          <div className="account-details">
            <p>
              <strong>Username:</strong> test222
            </p>
            <p>
              <strong>Password:</strong> User123!
            </p>
          </div>
        </div>
        <a
          href="/src/data/Hướng dẫn sử dụng.pdf"
          className="pdf-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Xem Hướng Dẫn PDF
        </a>
      </HelpWrapper>
      <Footer />
    </>
  )
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const HelpWrapper = styled.main`
  animation: ${fadeIn} 1s ease-in-out;

  background-color: #f1f3f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 4rem auto;

  text-align: center;

  h2 {
    color: var(--primary-color);
    font-size: 2.4rem;
    margin-bottom: 20px;
  }

  .account-info {
    margin-bottom: 20px;
    text-align: left;

    h3 {
      color: var(--primary-color);
      font-size: 1.8rem;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.6rem;
      line-height: 1.5;
      margin-bottom: 10px;
    }

    .account-details {
      background-color: #fff;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }

  .pdf-link {
    display: flex;
    width: 60%;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    font-size: 1.6rem;
    color: #fff;
    background-color: var(--primary-color);
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    margin: 20px auto 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--hover-color);
      color: var(--primary-color);
    }
  }
`

export default Help
