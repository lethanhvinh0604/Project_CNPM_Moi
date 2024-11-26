import styled from 'styled-components'
import { useState, useEffect } from 'react'
import APIClient from '../../../../api/client'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CancelIcon from '@mui/icons-material/Cancel'

function MCDetail({ selectedData, setReload }) {
  const apiClient =new APIClient('mc')
  const [formData, setFormData] = useState({})

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false) // Trạng thái hiển thị Dialog
  const [dialogMessage, setDialogMessage] = useState('') // Nội dung thông báo từ server
  const [dialogTitle, setDialogTitle] = useState('') // Tiêu đề của Dialog
  const [newHinhAnh, setNewHinhAnh] = useState('')
  const [danhSachHinhAnh, setDanhSachHinhAnh] = useState([])
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
  const handleInputImage = (e) => {
    setNewHinhAnh(e.target.value)
  }

  const handleAddHinhAnh = () => {
    if (newHinhAnh.trim() !== '') {
      setDanhSachHinhAnh((prev) => [...prev, newHinhAnh])
      setNewHinhAnh('')
      setFormData((prev) => ({
        ...prev,
        HinhAnh: [
          ...prev.HinhAnh || [],
          newHinhAnh
        ]
      }))
    }
  }

  const handleRemoveHinhAnh = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      HinhAnh: prevFormData.HinhAnh.filter((_, i) => i !== index)
    }))
  }
  // Sử dụng useEffect để cập nhật formData khi selectedData thay đổi
  useEffect(() => {
    setFormData(selectedData || {}) // Cập nhật formData với selectedData mới
  }, [selectedData]) // Chạy lại khi selectedData thay đổi

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'SDT') {
      // Regex to allow only positive integers (no decimal, no negative)
      const regex = /^[1-9]\d*$/; // Matches numbers like 1, 2, 123, etc., but NOT 0, 1.5, or -1

      if (value === '' || regex.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }))
      }
    }
    else if (name === 'KinhNghiem') {
      // Regex to allow only positive integers (no decimal, no negative)
      const regex = /^[1-9]\d*$/; // Matches numbers like 1, 2, 123, etc., but NOT 0, 1.5, or -1

      if (value === '' || regex.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }))
      }
    }
    else if (name === 'Gia') {
      // Regex to allow only positive integers (no decimal, no negative)
      const regex = /^[1-9]\d*$/; // Matches numbers like 1, 2, 123, etc., but NOT 0, 1.5, or -1

      if (value === '' || regex.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }))
      }
    }
    else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  // Hàm xử lý sự kiện thêm mới
  const handleCreate = async (e) => {
    e.preventDefault()
    try {
      const response = await apiClient.create(formData) // Gửi dữ liệu mới qua API
      showDialog('Thêm thành công', 'MC đã được thêm vào thành công.')
      setFormData({}) // Xóa dữ liệu form sau khi thêm thành công
      setReload(prevReload => !prevReload)
    } catch (error) {
      const regex = /ValidationError: (.+?)<br>/
      const match = error.response.data.match(regex)
      if (match) {
        showDialog(
          'Lỗi khi thêm',
          match[1] || 'Đã xảy ra lỗi.')
      }
    }
  }

  // Hàm xử lý sự kiện cập nhật
  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!formData.MaMC)
      return showDialog('Lỗi', 'Vui lòng chọn một MC để cập nhật.')
    try {
      const response = await apiClient.update(formData.MaMC, formData)
      showDialog('Cập nhật thành công', 'Thông tin MC đã được cập nhật.')
      setReload(prevReload => !prevReload)
    } catch (error) {
      const regex = /ValidationError: (.+?)<br>/
      const match = error.response.data.match(regex)
      if (match) {
        showDialog(
          'Lỗi khi cập nhật',
          match[1] || 'Đã xảy ra lỗi.')
      }
    }
  }

  // Hàm xử lý sự kiện xóa
  const handleDelete = async (e) => {
    e.preventDefault()
    if (!formData.MaMC)
      return showDialog('Lỗi', 'Vui lòng chọn một MC để xóa.')
    try {
      await apiClient.delete(formData.MaMC)
      showDialog('Xóa thành công', 'MC đã được xóa.')
      setFormData({})
      setReload(prevReload => !prevReload)
    } catch (error) {
      const regex = /ValidationError: (.+?)<br>/
      const match = error.response.data.match(regex)
      if (match) {
        showDialog(
          'Lỗi khi xóa',
          match[1] || 'Đã xảy ra lỗi.')
      }
    }
  }

  // hàm clear form
  const handleClear = () => {
    setFormData({
      MaMC: '',
      HoTen: '',
      SDT: '',
      KinhNghiem: '',
      TinhTrang: true,
      Gia: '',
      HinhAnh: []
    })
  }

  return (
    <MCDetailWrapper>
      <h3>Chi tiết MC</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="label" disabled>
              Mã MC:
            </label>
            <input
              className="input disabled"
              name="MaMC"
              value={formData.MaMC || ''}
              onChange={handleInputChange}
              required
              disabled
            />
          </div>
          <div className="form-group">
            <label className="label">Họ Tên:</label>
            <input
              className="input"
              name="HoTen"
              value={formData.HoTen || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="label">Số Điện Thoại:</label>
            <input
              className="input"
              name="SDT"
              value={formData.SDT || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Kinh Nghiệm (năm):</label>
            <input
              className="input"
              name="KinhNghiem"
              value={formData.KinhNghiem || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="label">Tình Trạng:</label>
            <select
              className="select"
              name="TinhTrang"
              value={formData.TinhTrang}
              onChange={handleInputChange}
            >
              <option value={true}>Đang hoạt động</option>
              <option value={false}>Không hoạt động</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label">Giá (VND):</label>
            <input
              className="input"
              name="Gia"
              value={formData.Gia || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="label">Hình ảnh:</label>
          <input
            className="input"
            type="text"
            name="HinhAnh"
            placeholder="Link ảnh"
            value={newHinhAnh || ''}
            onChange={handleInputImage}
          />
          <button id="btn-secoundary" type="button" onClick={handleAddHinhAnh}>
            Chèn
          </button>
        </div>

        <div className="image-preview-wrapper">
          {formData.HinhAnh &&
            Array.isArray(formData.HinhAnh) &&
            formData.HinhAnh.map((img, index) => (
              //<img key={index} src={img} alt="Hội trường" />
              <div className="image-container" key={index}>
                <img src={img} alt="Combo món ăn" />
                <span
                  className="delete-icon"
                  onClick={() => handleRemoveHinhAnh(index)} // Thêm hàm xóa tại đây
                >
                  <CancelIcon sx={{ fontSize: 30 }} />
                </span>
              </div>
            ))}
        </div>

        <div className="button-row">
          <button id="btn-primary" type="submit" onClick={handleCreate}>
            Thêm
          </button>
          <button id="btn-secoundary" type="submit" onClick={handleUpdate}>
            Cập nhật
          </button>
          <button id="btn-secoundary" type="button" onClick={handleClear}>
            Làm mới
          </button>
          <button id="btn-cancel" type="button" onClick={handleDelete}>
            Xóa
          </button>
        </div>
      </form>

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
    </MCDetailWrapper>
  )
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
const MCDetailWrapper = styled.div`
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

  .input.disabled {
    background-color: #f9f9f9;
    border: 1px solid #ccc;
    cursor: not-allowed;
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
    flex-wrap: wrap;
    margin-top: 60px;
    max-width: 700px;

    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 5px;
    }
  }
      .image-container {
    position: relative;
    display: inline-block; /* Giúp hình ảnh hiển thị liền kề nhau */
  }

  .delete-icon {
    display: none; /* Ẩn biểu tượng xóa theo mặc định */
    position: absolute;
    top: 5px; /* Điều chỉnh vị trí */
    right: 5px; /* Điều chỉnh vị trí */
    cursor: pointer;
    color: red; /* Màu sắc biểu tượng xóa */
  }

  .image-container:hover .delete-icon {
    display: block; /* Hiện biểu tượng khi rê chuột vào */
  }

  .image-container img {
    transition: filter 0.3s ease; /* Hiệu ứng chuyển đổi cho hình ảnh */
  }

  .image-container:hover img {
    filter: blur(2px); /* Làm mờ hình ảnh khi rê chuột vào */
  }
`
export default MCDetail
