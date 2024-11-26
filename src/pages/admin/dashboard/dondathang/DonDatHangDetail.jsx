import styled from 'styled-components'
import { useState, useEffect } from 'react'
import APIClient from '../../../../api/client'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
function DonDatHangDetail({ selectedData, setReload }) {
  const [formData, setFormData] = useState({});
  const apiClient = new APIClient('dondathang')
  const [dialogOpen, setDialogOpen] = useState(false) // Trạng thái hiển thị Dialog
  const [dialogMessage, setDialogMessage] = useState('') // Nội dung thông báo từ server
  const [dialogTitle, setDialogTitle] = useState('') // Tiêu đề của Dialog
  const lines = dialogMessage.split(',')
  // Sử dụng useEffect để cập nhật formData khi selectedData thay đổi
  useEffect(() => {
    setFormData(selectedData || {}); // Cập nhật formData với selectedData mới
  }, [selectedData]); // Chạy lại khi selectedData thay đổi

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
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
  }
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const acceptDonDatHang = () => {
    apiClient
      .delete(formData.MaDDV, { ...formData, action: 'accept' })
      .then((response) => {
        if (response.status === 200) {
          showDialog(
            'Đơn hàng đã được chấp nhận',
            'Hãy liên hệ với khách hàng để xác nhận thông tin'
          );
          setReload((prevReload) => !prevReload);
        }
      })
      .catch((error) => {
        showDialog(
          'Lỗi khi chấp nhận',
          error.response?.data?.message || 'Đã xảy ra lỗi.'
        )
      });
  };

  const rejectDonDatHang = () => {
    apiClient
      .delete(formData.MaDDV, { ...formData, action: 'reject' })
      .then((response) => {
        if (response.status === 200) {
          showDialog(
            'Đơn đặt hàng đã được từ chối',
            'Hãy liên hệ với khách hàng để xác nhận thông tin'
          );
          setReload((prevReload) => !prevReload);
        }
      })
      .catch((error) => {
        showDialog(
          'Lỗi khi từ chối',
          error.response?.data?.message || 'Đã xảy ra lỗi.'
        )
      });
  };

  const updateDonDatHang = () => {
    apiClient
      .update(formData.MaDDV, formData)
      .then((response) => {
        if (response.status == 204) {
          showDialog(
            'Hoàn thành thành công',
            `Trạng thái của đơn đặt hàng đã được cập nhật`)
          setReload(prevReload => !prevReload)
        }
      })
      .catch((error) => {
        if (error.status == 404)
          showDialog(
            'Lỗi khi từ chối',
            error.response?.data?.message || 'Đã xảy ra lỗi.')
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }

  const checkOrder = () => {
    apiClient
      .checkOrder(formData.MaDDV)
      .then((response) => {
        if (response.status == 200) {
          showDialog(
            'Sự kiện bị trùng lịch',
            `${response.data}`)
          setReload(prevReload => !prevReload)
        }
        else if (response.status == 204) {
          showDialog(
            'Thời gian tổ chức hợp lệ',
            ``)
          setReload(prevReload => !prevReload)
        }
      })
      .catch((error) => {
        if (error.status == 404)
          showDialog(
            'Lỗi khi từ chối',
            error.response?.data?.message || 'Đã xảy ra lỗi.')
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }

  return (
    <DonDatHangDetailWrapper>
      <h3>Chi tiết Đơn Đặt Hàng</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="label">Mã tài khoản:</label>
            <input
              className="input"
              name="MaTK"
              value={formData.MaTK || ''}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group">
            <label className="label">Ngày đặt:</label>
            <input
              className="input"
              name="ThoiDiemDat"
              value={formData.ThoiDiemDat || ''}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="label">Thời gian bắt đầu:</label>
            <input
              className="input"
              name="ThoiDiemBatDau"
              value={formData.ThoiDiemBatDau || ''}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group">
            <label className="label">Thời gian kết thúc:</label>
            <input
              className="input"
              name="ThoiDiemKetThuc"
              value={formData.ThoiDiemKetThuc || ''}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="label">Số giờ:</label>
            <input
              className="input"
              name="SoGio"
              value={formData.SoGio || ''}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group">
            <label className="label">Tình trạng:</label>
            <select
              className="select"
              name="TrangThai"
              value={formData.TrangThai ? 'true' : 'false'}
              onChange={handleInputChange}
              disabled
            >
              <option value="true">Hoàn tất</option>
              <option value="false">Chưa hoàn tất</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="label">Số lượng bàn:</label>
            <input
              className="input"
              name="SoLuongBan"
              disabled
              value={formData.DichVu?.SoLuongBan || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Số lượng thiệp:</label>
            <input
              className="input"
              name="SoLuongThiep"
              value={formData.DichVu?.SoLuongThiep || ''}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="label">Mã combo:</label>
            <input
              className="input"
              name="MaCombo"
              value={formData.DichVu?.MaCombo || ''}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group">
            <label className="label">Mã thiệp:</label>
            <input
              className="input"
              name="MaThiep"
              value={formData.DichVu?.MaThiepMoi || ''}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="label">Mã MC:</label>
            <input
              className="input"
              name="MaMC"
              value={formData.DichVu?.MaMC || ''}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group">
            <label className="label">Mã nhạc công:</label>
            <input
              className="input"
              name="MaNhacCong"
              value={formData.DichVu?.MaNhacCong || ''}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="label">Mã hội trường:</label>
            <input
              className="input"
              name="MaHoiTruong"
              value={formData.DichVu?.MaHoiTruong || ''}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group">
            <label className="label">Mã đơn đặt dịch vụ:</label>
            <input
              className="input"
              name="MaDDV"
              value={formData.MaDDV || ''}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
        </div>

        <div className="form-group">
          <label className="label">Ghi chú:</label>
          <textarea
            className="textarea"
            name="Note"
            value={formData.Note || ''}
            onChange={handleInputChange}
            disabled
          />
        </div>
        <div className="button-row">
          <button id="btn-secoundary" type="button"onClick={checkOrder}>
            Kiểm tra lịch
          </button>
          <button id="btn-secoundary" type="button"onClick={acceptDonDatHang}>
            Chấp nhận
          </button>
          <button id="btn-cancel" type="button" onClick={rejectDonDatHang} >
            Từ chối
          </button>
          <button id="btn-primary" type="button" onClick={updateDonDatHang}>
            Hoàn thành
          </button>
        </div>
      </form>
      {/* Dialog hiển thị thông báo */}
      <StyledDialog open={dialogOpen} onClose={closeDialog}>
        <StyledDialogTitle>{dialogTitle}</StyledDialogTitle>
        <StyledDialogContent>
          {lines.map((line, index) => (
            <p key={index}>{line.trim()}</p>
          ))}
        </StyledDialogContent>
        <StyledDialogActions>
          <button id="btn-primary" onClick={closeDialog}>
            Đóng
          </button>
        </StyledDialogActions>
      </StyledDialog>
    </DonDatHangDetailWrapper>
  );
}
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
const DonDatHangDetailWrapper = styled.div`
    color: var(--primary-color);
  font-size: 1.2rem;
  transition: all 0.4s;
  h3 {
    color: var(--primary-color);
    font-size: 1.6rem;
    margin-bottom: 15px;
  }
  .form-group {
    margin-bottom: 15px;
    button {
      float: right;
      margin-top: 10px;
    }
  }

  .form-row {
    display: flex;
    gap: 10px;
  }

  .label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }

  .input,
  .select,
  .textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
  }

  .textarea {
    min-height: 100px;
  }

  .button-row {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 20px;
  }

  .image-preview-wrapper {
    display: flex;
    gap: 10px;
    margin-top: 15px;

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 5px;
    }
  }
`

export default DonDatHangDetail