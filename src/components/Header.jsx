import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Logo from '../assets/logo-v1.png'
// import Logo from '../assets/logo-v2.png'
import ListService from './ListService'

import Badge from '@mui/material/Badge'
import AvatarUser from './AvatarUser'
import OutputIcon from '@mui/icons-material/Output'

import APIClient from '../api/client'

function Header() {
  // const token = false // Change to true to see the logged in state: true or false
  // Lấy token từ Session Storage
  const token = sessionStorage.getItem('userAuth')
  const userID = sessionStorage.getItem('userID')
  const [user, setUser] = useState(null)

  // KIểm tra userID nếu bắt đầu bằng A thì là admin, nếu U thì là user
  const role = userID ? userID[0] : null

  useEffect(() => {
    if (token && role === 'U') {
      const apiClient = new APIClient('khachhang')
      apiClient
        .findByID(userID)
        .then((response) => {
          setUser(response.data.khachhang)
        })
        .catch((error) => {
          console.error(error)
        })
    } else if (token && role === 'A') {
      const apiClient = new APIClient('admin')
      apiClient
        .findByID(userID)
        .then((response) => {
          setUser(response.data.admin)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [userID, token, role])

  const handleLogout = () => {
    sessionStorage.removeItem('userAuth')
    sessionStorage.removeItem('userID')
    window.location.href = '/'
  }

  const handleProfileClick = () => {
    window.location.href = '/customer/profile'
  }

  const handleAdminClick = () => {
    window.location.href = '/admin/dashboard'
  }

  {
    if (!token) {
      return (
        <Navbar>
          <a className="nav-brand" href="/">
            <img src={Logo} alt="Udemy Logo" />
          </a>
          <div className="nav-link">
            <a href="/" className="link">
              Trang chủ
            </a>
            {/* <ListService /> */}
            <a href="/chat-ai" className="link">
              Chat AI
            </a>
          </div>
          <div className="authButtons">
            <a href="/login" className="login">
              Đăng nhập
            </a>
            <a href="/signup" className="signup">
              Đăng ký
            </a>
          </div>
        </Navbar>
      )
    } else if (user && role === 'U') {
      const HoTen = user.HoTen ? user.HoTen : 'User'
      return (
        <Navbar>
          <a className="nav-brand" href="/">
            <img src={Logo} alt="Udemy Logo" />
          </a>
          <div className="nav-link">
            <a href="/" className="link">
              Trang chủ
            </a>
            <ListService />
            <a href="/customer/order-event" className="link">
              Đặt dịch vụ
            </a>
            <a href="/chat-ai" className="link">
              Chat AI
            </a>
          </div>
          <div className="nav-other">
            <div onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
              <AvatarUser name={HoTen} size={40} />
            </div>
            <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <StyledBadge>
                <OutputIcon fontSize="large" />
              </StyledBadge>
            </a>
          </div>
        </Navbar>
      )
    } else if (user && role === 'A') {
      const HoTen = user.HoTen ? user.HoTen : 'Admin'
      return (
        <Navbar>
          <a className="nav-brand" href="/">
            <img src={Logo} alt="Udemy Logo" />
          </a>
          <div className="nav-link">
            <a href="/" className="link">
              Trang chủ
            </a>
            <ListService />
            {/* <a href="/admin/order-event" className="link">
              Đặt dịch vụ
            </a> */}
            <a href="/chat-ai" className="link">
              Chat AI
            </a>
          </div>
          <div className="nav-other">
            <div onClick={handleAdminClick} style={{ cursor: 'pointer' }}>
              <AvatarUser name={HoTen} size={40} />
            </div>
            <a onClick={handleLogout} style={{ cursor: 'pointer' }}>
              <StyledBadge>
                <OutputIcon fontSize="large" />
              </StyledBadge>
            </a>
          </div>
        </Navbar>
      )
    }
  }
}

const StyledBadge = styled(Badge)`
  cursor: pointer;
  color: var(--primary-color);
  transition: all 0.3s;
  ${'' /* giảm kích thước của badge */}
  .MuiBadge-badge {
    font-size: 1rem;
    font-weight: 600;
    padding: 0 2px;
    color: #fff;
    background-color: var(--primary-color);
  }
  .MuiSvgIcon-root {
    width: 2.6rem;
    height: 2.6rem;
    &:hover,
    &:focus {
      color: #000;
      ${'' /* Phóng to một chút */}
      transform: scale(1.1);
      transition: all 0.3s;
    }
  }
`

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  backdrop-filter: blur(10px);
  ${'' /* background-color: #fff; */}
  background-color: rgba(255, 255, 255, 0.8);
  border-bottom: 2px solid #f1f3f5;
  box-shadow: 0 2px 4px rgba(9, 8, 18, 0.07);

  .nav-brand {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 100px;
      margin-right: 10px;
    }
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 20px;

    .link {
      font-size: 16px;
      color: var(--primary-color);
      font-weight: 700;
      text-decoration: none;
      position: relative;
      padding: 5px 0;

      &:hover {
        color: var(--bold-color); /* Màu chữ khi hover */
      }

      &:hover::before {
        transform: scaleX(1);
      }

      &::before {
        content: '';
        position: absolute;
        bottom: -7px;
        width: 100%;
        height: 2px;
        background-color: var(--bold-color); /* Màu viền */
        transform: scaleX(0);
        transform-origin: center;
        transition: transform 0.3s ease-in-out;
      }
    }
  }

  .authButtons {
    display: flex;
    align-items: center;
    gap: 10px;

    .login,
    .signup {
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      text-transform: uppercase;
      cursor: pointer;
    }

    .login {
      background-color: var(--primary-color);
      color: #fff;

      &:hover,
      &:visited {
        background-color: var(--hover-color-1); /* Change background on hover */
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Add shadow */
        transition: all 0.3s;
      }
    }

    .signup {
      background-color: #f1f3f5;
      color: var(--primary-color);
      border: none;

      &:hover,
      &:visited {
        background-color: var(--hover-color-2) /* Change background on hover */
        color: var(--bold-color); /* Darken the text */
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Add shadow */
        transition: all 0.3s;
      }
    }
  }

  .nav-other {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  /* Responsive styles */
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;

    .nav-brand {
      img {
        width: 80px;
      }
    }

    .nav-link {
      gap: 10px;
      .link {
        font-size: 14px;
      }
    }

    .authButtons {
      gap: 5px;
      .login,
      .signup {
        padding: 8px 16px;
        font-size: 12px;
      }
    }

    .nav-other {
      gap: 10px;
    }
  }

  @media (max-width: 480px) {
    .nav-link {
      display: none; /* Hide navigation links on very small screens */
    }

    .authButtons {
      flex-direction: column; /* Stack buttons vertically */
      .login,
      .signup {
        width: 100%;
        text-align: center;
      }
    }

    .nav-other {
      display: none; /* Hide other items like avatar or badge on very small screens */
    }
  }
`
export default Header
