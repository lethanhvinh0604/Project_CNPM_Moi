import React from 'react'
import styled from 'styled-components'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material'

function ErrorPopup({ open, onClose, onReload }) {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <StyledDialogTitle>
        <h2>Có lỗi xảy ra</h2>
      </StyledDialogTitle>
      <StyledDialogContent>
        <p>Đã xảy ra lỗi trong quá trình xử lý. Vui lòng thử lại.</p>
      </StyledDialogContent>
      <StyledDialogActions>
        <button id="btn-cancel" onClick={onClose}>
          Đóng
        </button>
        <button id="btn-primary" onClick={onReload}>
          Tải lại trang
        </button>
      </StyledDialogActions>
    </StyledDialog>
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

export default ErrorPopup
