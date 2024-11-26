import { useContext, useState } from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import { OrderContext } from '../../../context/OrderContext'
import styled from 'styled-components'
import Loading from '../../system/Loading'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import StepHall from './OrderStep/StepHall'
import StepMC from './OrderStep/StepMC'
import StepNC from './OrderStep/StepNC'
import StepCombo from './OrderStep/StepCombo'
import StepThiep from './OrderStep/StepThiep'
import StepInfor from './OrderStep/StepInfor'
import APIClient from '../../../api/client'
import { useNavigate } from 'react-router-dom'

const steps = [
  'Chọn hội trường',
  'Chọn MC',
  'Chọn Nhạc Công',
  'Chọn Thực Đơn',
  'Chọn Thiệp',
  'Thông tin đặt'
]

function MainOrderStepper() {
  const { markdata, order, canCompleteOrder } =
    useContext(OrderContext)
  const navigation = useNavigate()
  const { LuuHoiTruong, LuuMC, LuuNhacCong, LuuCombo, LuuThiep } = markdata
  const [activeStep, setActiveStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const apiClient = new APIClient('dondathang')
  const [dialogOpen, setDialogOpen] = useState(false) // Trạng thái hiển thị Dialog
  const [dialogMessage, setDialogMessage] = useState('') // Nội dung thông báo từ server
  const [dialogTitle, setDialogTitle] = useState('') // Tiêu đề của Dialog

  const renderStepContent = (step) => {
    switch (step) {
    case 0:
      return <StepHall luuHoiTruong={LuuHoiTruong} />
    case 1:
      return <StepMC luuMC={LuuMC} />
    case 2:
      return <StepNC luuNhacCong={LuuNhacCong} />
    case 3:
      return <StepCombo luuCombo={LuuCombo} />
    case 4:
      return <StepThiep luuThiep={LuuThiep} />
    case 5:
      return <StepInfor/>
    default:
      return <Typography>Không có bước này</Typography>
    }
  }

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1)
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
    navigation('/')
  }

  const handleOrder = () => {
    apiClient
      .create(order)
      .then((response) => {
        if (response.status == 201) {
          showDialog(
            'Đặt sự kiện thành công',
            `Hãy đợi một thời gian ngắn để admin duyệt sự kiện nhé !`)
        }
      })
      .catch((error) => {
        console.log(error)
        const regex = /ValidationError: (.+?)<br>/
        const match = error.response.data.match(regex)
        if (match) {
          showDialog(
            'Lỗi khi đặt sự kiện',
            match[1] || 'Đã xảy ra lỗi.')
        }
        else {
          showDialog(
            'Lỗi khi đặt sự kiện',
            'Thời gian đăng ký không hợp lệ')
        }
      })
  }

  const handleReset = () => {
    const { valid, message } = canCompleteOrder()
    if (!valid) {
      alert(message)
      return
    } else {
      handleOrder()
    }
  }

  const handleComplete = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      handleReset()
    }, 1000)
  }

  return (
    <MainOrderStepperWrapper>
      {isLoading && <Loading />}
      <div className={isLoading ? 'blur-content' : ''}>
        <CustomStepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </CustomStepper>

        <div className="order-stepper-content">
          {renderStepContent(activeStep)}
        </div>

        <div className="order-stepper-action">
          {activeStep > 0 && (
            <button color="inherit" onClick={handleBack} id="btn-secoundary">
              Quay lại
            </button>
          )}
          <button
            id="btn-primary"
            onClick={
              activeStep === steps.length - 1 ? handleComplete : handleNext
            }
          >
            {activeStep === steps.length - 1 ? 'Hoàn tất' : 'Tiếp'}
          </button>
        </div>
      </div>

      {/* Dialog hiển thị thông báo */}
      <StyledDialog open={dialogOpen} onClose={closeDialog}>
        <StyledDialogTitle>{dialogTitle}</StyledDialogTitle>
        <StyledDialogContent>
          <p>{dialogMessage}</p>
        </StyledDialogContent>
        <StyledDialogActions>
          <button id="btn-primary" onClick={closeDialog}>
            Đóng
          </button>
        </StyledDialogActions>
      </StyledDialog>
    </MainOrderStepperWrapper>
  )
}

// eslint-disable-next-line no-unused-vars
const CustomStepper = styled(Stepper)(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: '20px',
  '& .MuiStep-root': {
    '& .MuiStepLabel-label': {
      color: 'var(--primary-color)',
      fontSize: '1.6rem'
    },
    '& .MuiStepIcon-root': {
      color: 'var(--primary-color)',
      fontSize: '2.4rem'
    }
  }
}))

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

const MainOrderStepperWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .blur-content {
    filter: blur(5px);
    pointer-events: none; /* Ngăn chặn tương tác với nội dung khi đang loading */
  }

  .order-stepper-content {
    flex-grow: 1;
    min-height: 400px;
  }

  .order-stepper-action {
    padding: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    width: 100%; /* Đảm bảo nó chiếm chiều rộng đầy đủ */
  }

  @media (max-width: 768px) {
    .order-stepper-action {
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
  }

  @media (max-width: 480px) {
    .order-stepper-action {
      padding: 10px;
    }
  }
`

export default MainOrderStepper
