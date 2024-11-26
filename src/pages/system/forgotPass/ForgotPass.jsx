import { useState } from 'react'
import imgLogin from '../../../assets/e-fp.png'
import BgLogin from '../../../assets/bg-v1.png'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { Helmet } from 'react-helmet'
import APIClient from '../../../api/client'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

function ForgotPass() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const [dialogOpen, setDialogOpen] = useState(false) // Trạng thái hiển thị Dialog
  const [dialogMessage, setDialogMessage] = useState('') // Nội dung thông báo từ server
  const [dialogTitle, setDialogTitle] = useState('') // Tiêu đề của Dialog

  const handleForgotPass = async () => {
    if (email === '') {
      setMessage('Vui lòng nhập email của bạn')
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage('Địa chỉ email không hợp lệ')
    } else {
      setMessage('')
      const client = new APIClient('system/reset-password')
      // const result = await client.create({ email })

      // if (result.status === 200) {
      //   alert('Đã gửi email khôi phục mật khẩu')
      //   navigate('/login')
      // } else {
      //   setMessage('Email không tồn tại trong hệ thống')
      // }
      client
        .create({ email })
        .then((response) => {
          if (response.status === 200) {
            alert('Đã gửi email khôi phục mật khẩu')
            navigate('/login')
          } else {
            showDialog('Lỗi', 'Email không tồn tại trong hệ thống')
          }
        })
        .catch((error) => {
          const regex = /Error: (.+?)<br>/
          const match = error.response.data.match(regex)
          if (match) {
            showDialog(
              'Lỗi khi quên mật khẩu',
              '\n Không tìm thấy người dùng với email này' ||
                'Đã xảy ra lỗi.'
            )
          }
          else {
            showDialog(
              'Lỗi khi quên mật khẩu',
              'Không tìm thấy người dùng với email này.'
            )
          }
        })
    }
  }

  // Các hàm xử lí mở, đóng Dialog
  // Hàm hiển thị Dialog
  const showDialog = (title, message) => {
    setDialogTitle(title)
    setDialogMessage(message)
    setDialogOpen(true)
  }
  // Hàm đóng Dialog
  const closeDialog = () => {
    setDialogOpen(false)
    navigate('/forgot-pass')
  }

  return (
    <>
      <Helmet>
        <title>Quên mật khẩu</title>
      </Helmet>
      <ForgotPassWrapper>
        <div className="wrapper">
          <div className="container">
            <div className="image">
              <img src={imgLogin} alt="Image" />
            </div>
            <div className="content">
              <h1>Quên mật khẩu</h1>

              <div className="input-email">
                <label>
                  Địa chỉ email: <span>*</span>
                </label>
                <br />
                <div className="input-box">
                  <PersonOutlineIcon className="input-icon" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {message && (
                <p
                  style={{
                    color: 'red',
                    textAlign: 'center',
                    marginTop: '20px',
                    fontSize: '1.6rem'
                  }}
                >
                  {message}
                </p>
              )}
              <div className="button">
                <button className="button-login" onClick={handleForgotPass}>
                  <ExitToAppIcon sx={{ paddingRight: '10px', fontSize: 35 }} />
                  Lấy lại mật khẩu
                </button>
                <button
                  className="button-cancel"
                  onClick={() => navigate('/login')}
                >
                  <CloseIcon
                    sx={{ paddingRight: '10px', fontSize: 35, color: 'red' }}
                  />
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dialog hiển thị thông báo */}
        <StyledDialog open={dialogOpen} onClose={closeDialog}>
          <StyledDialogTitle>
            <h2>{dialogTitle}</h2>
          </StyledDialogTitle>
          <StyledDialogContent>
            <p>{dialogMessage}</p>
          </StyledDialogContent>
          <StyledDialogActions>
            <button id="btn-primary" onClick={closeDialog}>
              Đóng
            </button>
          </StyledDialogActions>
        </StyledDialog>
      </ForgotPassWrapper>
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

// Custom Dialog
const StyledDialog = styled(Dialog)`
  & .MuiPaper-root {
    text-align: center;
    background-color: #f3f4f6;
    border-radius: 8px;
    padding: 16px;
  }
`
const StyledDialogTitle = styled(DialogTitle)`
  font-size: 2rem;
  text-transform: uppercase;
  color: var(--primary-color);
  font-weight: bold;
`
const StyledDialogContent = styled(DialogContent)`
  font-size: 1.6rem;
  color: var(--primary-color);
`
const StyledDialogActions = styled(DialogActions)`
  justify-content: center;
`

const ForgotPassWrapper = styled.main`
  animation: ${fadeIn} 1s ease-in-out;
  .wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-image: url(${BgLogin});
    background-size: cover;
    object-fit: cover;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        45deg,
        rgba(34, 25, 29, 0.12),
        rgba(243, 243, 250, 0.9)
      );
      animation: gradientShift 4s infinite alternate;
      z-index: 1;
    }
  }

  @keyframes gradientShift {
    0% {
      transform: translateY(-20%);
    }
    100% {
      transform: translateY(20%);
    }
  }

  .container {
    display: flex;
    gap: 30px;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 550px;
    padding-left: 0px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: #0000000f 0px 4px 20px 0px;
    z-index: 2;
    position: relative;
    overflow: hidden;

    .image {
      width: 50%;
      height: 100%;
      boder-radius: 8px 0 0 8px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px 0 0 8px;
        ${'' /* Tạo đường viền trắng bên ngoài ảnh */}
        border: 5px solid var(--primary-color);
      }
    }

    .content {
      width: 50%;
      flex: 1;
      h1 {
        margin-bottom: 30px;
        color: var(--primary-color);
        text-align: center;
        font-size: 4rem;
        font-style: normal;
        font-weight: 700;
        line-height: 1.6;
      }

      .input-email {
        margin-bottom: 20px;

        label {
          color: var(--primary-color);
          font-size: 2rem;
          font-style: normal;
          font-weight: 700;
          line-height: 1.6;
          margin-bottom: 10px;
          span {
            color: red;
          }
        }

        .input-box {
          display: flex;
          align-items: center;
          background: #f1f3f5;
          border-radius: 5px;
          padding: 0 10px;
          margin-top: 10px;
          transition: box-shadow 0.3s ease;

          .input-icon {
            color: #555;
            margin-right: 10px;
            font-size: 2rem;
          }

          input {
            flex: 1;
            height: 40px;
            border: none;
            color: #252525;
            font-size: 1.6rem;
            background: transparent;
            outline: none;

            &::placeholder {
              color: #999;
              font-size: 1.4rem;
            }
          }
          .toggle-password {
            cursor: pointer;
            color: #555;
            font-size: 1.8rem;
            margin-left: 10px;
            display: flex;
            align-items: center;
          }

          &:hover {
            box-shadow: 0 0 0 2px var(--primary-color);
          }

          &:focus-within {
            box-shadow: 0 0 0 2px var(--primary-color);
          }
        }
      }

      .input-pass .input-box {
        background: #f1f3f5;
      }

      .button {
        display: flex;
        gap: 20px;
        width: 100%;
        margin: 0 auto;
        justify-content: center;
        gap: 30px;
        margin-top: 50px;

        .button-login {
          background-color: var(--primary-color);
          color: #fff;
          font-size: 1.6rem;
          font-weight: 700;
          text-transform: uppercase;
          line-height: 1.6;
          border-radius: 5px;
          padding: 5px 50px;
          border: none;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: 0.3s all ease;

          &:hover {
            background-color: var(--hover-color-1);
            box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
          }
        }

        .button-cancel {
          background-color: #fff;
          color: var(--primary-color);
          font-size: 1.6rem;
          font-weight: 700;
          text-transform: uppercase;
          line-height: 1.6;
          border-radius: 5px;
          padding: 5px 50px;
          border: none;
          display: flex;
          align-items: center;
          cursor: pointer;
          text-decoration: none;
          transition: 0.3s all ease;

          &:hover {
            box-shadow: 0 0 0 2px var(--primary-color);
          }
        }

        @media (max-width: 1185px) {
          flex-direction: column;
          width: 100%;
          gap: 0px;

          .button-login,
          .button-cancel {
            width: 100%;
            margin-bottom: 10px;
          }
        }
      }

      .forgot {
        text-align: end;
        margin: 0px 10px;
        margin-top: 20px;
        a {
          color: var(--primary-color);
          font-size: 1.6rem;
          font-style: normal;
          font-weight: 700;
          line-height: 1.6;
          text-decoration: none;
          transition: 0.3s all ease;

          &:hover {
            color: var(--hover-color-1);
            text-decoration: underline;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    .container {
      flex-direction: column;
      width: 90%;
      height: auto;
      padding: 20px;
      gap: 20px;

      .image {
        width: 100%;
        height: 250px;
      }

      .content {
        width: 100%;

        .input-username .input-box,
        .input-pass .input-box {
          width: 100%;
        }

        .button {
          flex-direction: column;
          width: 100%;

          .button-login,
          .button-cancel {
            width: 100%;
            margin-bottom: 10px;
          }
        }

        .forgot {
          text-align: center;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .image {
      display: none;
    }
    .container {
      padding: 10px;

      .content .input-username label,
      .content .input-pass label {
        font-size: 1.6rem;
      }

      .content .input-box input {
        font-size: 1.4rem;
        padding-left: 5px;
      }
      .content .button {
        font-size: 1.4rem;
      }

      .content .forgot a {
        font-size: 1.4rem;
      }
    }
  }
`

export default ForgotPass
