import { ProfileContext } from '../../../context/ProfileContext'
import styled from 'styled-components'
import { useContext, useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar
} from '@mui/material'

import APIClient from '../../../api/client'

function ChangePassword({ open, onClose }) {
  const { profile } = useContext(ProfileContext)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleChangePassword = async () => {
    const apiClient = new APIClient('system/change-password')
    try {
      await apiClient.create({
        email: profile.Email,
        oldPassword,
        newPassword
      })
      setSnackbarMessage('Đổi mật khẩu thành công')
    } catch (error) {
      setSnackbarMessage('Sai mật khẩu cũ')
    }
    setSnackbarOpen(true)
    onClose()
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }

  return (
    <>
      <StyledDialog open={open} onClose={onClose}>
        <StyledDialogTitle>
          <h2>Đổi mật khẩu</h2>
        </StyledDialogTitle>
        <StyledDialogContent>
          <ChangePasswordWrapper>
            <div className="content">
              <div className="content-group">
                <label>Email:</label>
                <input placeholder="Email" value={profile.Email} disabled />
              </div>
              <div className="content-group">
                <label>Mật khẩu cũ:</label>
                <input
                  placeholder="Mật khẩu cũ"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <div className="content-group">
                <label>Mật khẩu mới:</label>
                <input
                  placeholder="Mật khẩu mới"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
          </ChangePasswordWrapper>
        </StyledDialogContent>

        <StyledDialogActions>
          <button id="btn-cancel" onClick={onClose}>
            Hủy
          </button>
          <button
            id="btn-primary"
            onClick={handleChangePassword}
            color="primary"
          >
            Đổi mật khẩu
          </button>
        </StyledDialogActions>
      </StyledDialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        sx={{
          width: '50%',
          fontSize: '1.6rem',
          '& .MuiSnackbarContent-root': {
            backgroundColor: 'var(--primary-color)',
            color: '#fff',
            fontSize: '1.6rem',
            borderRadius: '8px',
            boxShadow: '0 3px 5px rgba(0, 0, 0, 0.3)'
          },
          '& .MuiSnackbarContent-message': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          },
          '& .MuiSnackbarContent-action': {
            marginLeft: 'auto'
          }
        }}
      />
    </>
  )
}

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

const ChangePasswordWrapper = styled.div`
  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 1.6rem;

    .content-group {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 5px;
    }

    input {
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  }
`

export default ChangePassword
