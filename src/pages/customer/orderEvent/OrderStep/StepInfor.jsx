import styled from 'styled-components'
import { OrderContext } from '../../../../context/OrderContext'
import { useContext, useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'

function StepInfor() {
  const { setOrder } = useContext(OrderContext)

  const [formData, setFormData] = useState({
    startTime: dayjs(),
    endTime: dayjs(),
    tableCount: 0,
    invitationCount: 0,
    note: ''
  })

  useEffect(() => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      Note: formData.note,
      ThoiDiemDat: dayjs().format('DD/MM/YYYY HH:mm:ss'),
      ThoiDiemBatDau: formData.startTime.format('DD/MM/YYYY HH:mm:ss'),
      ThoiDiemKetThuc: formData.endTime.format('DD/MM/YYYY HH:mm:ss'),
      SoGio: formData.endTime.diff(formData.startTime, 'hour'),
      DichVu: {
        ...prevOrder.DichVu,
        SoLuongBan: formData.tableCount,
        SoLuongThiep: formData.invitationCount
      }
    }))
  }, [formData, setOrder])

  const handleChange = (field, value) => {
    if (field === 'tableCount' || field === 'invitationCount') {
      // Regex to allow only positive integers (no decimal, no negative)
      const regex = /^[1-9]\d*$/; // Matches numbers like 1, 2, 123, etc., but NOT 0, 1.5, or -1

      if (value === '' || regex.test(value)) {
        setFormData({ ...formData, [field]: value })
      }
    }
    else
      setFormData({ ...formData, [field]: value })
  }

  return (
    <>
      <StepInforWrapper>
        <h3>Thông tin đặt sự kiện</h3>
        <div className="step-content">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
            <div className="form-row">
              <div className="form-group">
                <label className="label">Thời gian tổ chức sự kiện</label>
                <DateTimePicker
                  value={formData.startTime}
                  onChange={(newValue) => handleChange('startTime', newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputLabelProps: { sx: { fontSize: '1.6rem' } },
                      sx: {
                        '& .MuiInputBase-input': { fontSize: '1.6rem' },
                        '& .MuiInputLabel-root': { fontSize: '1.6rem' },
                        '& .MuiSvgIcon-root': { fontSize: '1.6rem' }, // icon
                        '& .MuiInputAdornment-root svg': { fontSize: '1.6rem' } // icon trong InputAdornment
                      }
                    }
                  }}
                />
              </div>
              <div className="form-group">
                <label className="label">Thời điểm kết thúc sự kiện</label>

                <DateTimePicker
                  value={formData.endTime}
                  onChange={(newValue) => handleChange('endTime', newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      InputLabelProps: { sx: { fontSize: '1.6rem' } },
                      sx: {
                        '& .MuiInputBase-input': { fontSize: '1.6rem' },
                        '& .MuiInputLabel-root': { fontSize: '1.6rem' },
                        '& .MuiSvgIcon-root': { fontSize: '1.6rem' }, // icon
                        '& .MuiInputAdornment-root svg': { fontSize: '1.6rem' } // icon trong InputAdornment
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="label">Số lượng bàn ăn</label>
                <TextField
                  defaultValue="0"
                  value={formData.tableCount}
                  InputLabelProps={{ sx: { fontSize: '1.6rem' } }}
                  inputProps={{ min: 0, step: 1 }}
                  onChange={(e) => handleChange('tableCount', e.target.value)}
                  sx={{
                    fontSize: '1.6rem',
                    '& .MuiInputBase-input': { fontSize: '1.6rem' }
                  }}
                  fullWidth
                />
              </div>
              <div className="form-group">
                <label className="label">Số lượng thiệp mời</label>
                <TextField
                  defaultValue="0"
                  value={formData.invitationCount}
                  InputLabelProps={{ sx: { fontSize: '1.6rem' } }}
                  inputProps={{ min: 0 }}
                  onChange={(e) =>
                    handleChange('invitationCount', e.target.value)
                  }
                  sx={{
                    fontSize: '1.6rem',
                    '& .MuiInputBase-input': { fontSize: '1.6rem' }
                  }}
                  fullWidth
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="label">Ghi chú</label>
                <TextField
                  value={formData.note}
                  onChange={(e) => handleChange('note', e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                  InputLabelProps={{
                    sx: { fontSize: '1.6rem', fontFamily: 'Source Sans 3' }
                  }}
                  sx={{
                    fontSize: '1.6rem',
                    '& .MuiInputBase-input': { fontSize: '1.6rem' },
                    paddingTop: '10px'
                  }}
                />
              </div>
            </div>
          </LocalizationProvider>
        </div>
      </StepInforWrapper>
    </>
  )
}

const StepInforWrapper = styled.div`
  h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
    font-weight: 500;
  }
  .step-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
  }

  .form-row {
    display: flex;
    gap: 2rem;
  }

  .form-group {
    flex: 1;
  }

  .label {
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
    display: block;
  }
`
export default StepInfor
