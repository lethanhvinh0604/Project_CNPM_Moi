import styled from 'styled-components'
import { useState, useEffect } from 'react'
import APIClient from '../../../../api/client'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CancelIcon from '@mui/icons-material/Cancel'

function ComboDetail({ selectedData, setReload }) {
  const apiClient = new APIClient('combo')
  const [formData, setFormData] = useState({})
  const [newMonAn, setNewMonAn] = useState('')
  const [danhSachMonAn, setDanhSachMonAn] = useState([])
  const [newHinhAnh, setNewHinhAnh] = useState('')
  const [danhSachHinhAnh, setDanhSachHinhAnh] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false) // Trạng thái hiển thị Dialog
  const [dialogMessage, setDialogMessage] = useState('') // Nội dung thông báo từ server
  const [dialogTitle, setDialogTitle] = useState('') // Tiêu đề của Dialog

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

  useEffect(() => {
    setFormData(selectedData || {})
    setDanhSachMonAn(selectedData?.DanhSachMonAn || []) // Cập nhật danh sách món ăn nếu có sẵn
  }, [selectedData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'Gia') {
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

  const handleInputImage = (e) => {
    setNewHinhAnh(e.target.value)
  }

  const handleAddMonAn = () => {
    if (newMonAn.trim() !== '') {
      setDanhSachMonAn((prev) => [...prev, newMonAn])
      setNewMonAn('')
      setFormData((prev) => ({
        ...prev,
        DanhSachMonAn: [
          ...prev.DanhSachMonAn || [],
          newMonAn
        ]
      }))
    }
  }

  const handleRemoveMonAn = (index) => {
    const updatedList = danhSachMonAn.filter((_, i) => i !== index)
    setDanhSachMonAn(updatedList)
    setFormData((prev) => ({
      ...prev,
      DanhSachMonAn: updatedList
    }))
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

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const addCombo = () => {
    apiClient
      .create(formData)
      .then((response) => {
        if (response.status == 201) {
          showDialog(
            'Tạo mới thành công',
            ``)
          setReload(prevReload => !prevReload)
        }
      })
      .catch((error) => {
        if (error.status == 404) {
          const regex = /ValidationError: (.+?)<br>/
          const match = error.response.data.match(regex)
          if (match) {
            showDialog(
              'Lỗi khi tạo mới Combo',
              match[1] || 'Đã xảy ra lỗi.')
          }
        }
      })
  }

  const updateCombo = () => {
    apiClient
      .update(formData.MaCombo, formData)
      .then((response) => {
        if (response.status == 200) {
          showDialog(
            'Cập nhật thành công',
            `Thông tin của Combo ${formData.MaCombo} đã được cập nhật`)
          setReload(prevReload => !prevReload)
        }
      })
      .catch((error) => {
        const regex = /ValidationError: (.+?)<br>/
        const match = error.response.data.match(regex)
        if (match) {
          showDialog(
            'Lỗi khi cập nhật Combo',
            match[1] || 'Đã xảy ra lỗi.')
        }
      })
  }

  const deleteCombo = () => {
    apiClient
      .delete(formData.MaCombo)
      .then((response) => {
        if (response.status == 204) {
          showDialog(
            'Xóa thành công',
            `Trạng thái của Combo ${formData.MaCombo} đã được cập nhật`)
          setReload(prevReload => !prevReload)
        }
      })
      .catch((error) => {
        if (error.status == 404) {
          const regex = /ValidationError: (.+?)<br>/
          const match = error.response.data.match(regex)
          if (match) {
            showDialog(
              'Lỗi khi xóa',
              match[1] || 'Đã xảy ra lỗi.')
          }
        }
      })
  }

  // Hàm clear form
  const handleClear = () => {
    setFormData({
      // Đặt lại giá trị mặc định cho các trường trong form
      MaCombo: '',
      TenCombo: '',
      LoaiCombo: '',
      Gia: '',
      MoTa: '',
      DanhSachMonAn: [],
      HinhAnh: []
    })
  }

  return (
    <ComboDetailWrapper>
      <h3>Thông tin chi tiết combo</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="label" disabled>Mã combo:</label>
            <input
              disabled
              className="input disabled"
              name="MaCombo"
              value={formData.MaCombo || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Tên combo:</label>
            <input
              className="input"
              name="TenCombo"
              value={formData.TenCombo || ''}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="label">Loại Combo:</label>
            <input
              className="input"
              name="LoaiCombo"
              value={formData.LoaiCombo || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Giá:</label>
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
          <label className="label">Mô tả:</label>
          <textarea
            className="textarea"
            name="MoTa"
            value={formData.MoTa || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group list-combo">
          <label className="label">Danh sách món ăn:</label>
          <div className="mon-an-input">
            <input
              className="input"
              type="text"
              value={newMonAn}
              onChange={(e) => setNewMonAn(e.target.value)}
              placeholder="Thêm món ăn"
            />
            <button type="button" onClick={handleAddMonAn} id="btn-primary">
              Thêm
            </button>
          </div>
          <ul className="danh-sach-mon-an">
            {danhSachMonAn.map((monAn, index) => (
              <li key={index}>
                {monAn}
                <button
                  type="button"
                  onClick={() => handleRemoveMonAn(index)}
                  id="btn-cancel"
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
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
              // <img key={index} src={img} alt="Combo món ăn" />
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
          <button id="btn-primary" onClick={addCombo}>
            Thêm
          </button>
          <button id="btn-secoundary" onClick={updateCombo}>
            Cập nhật
          </button>
          <button id="btn-secoundary" type="button" onClick={handleClear}>
            Làm mới
          </button>
          <button id="btn-cancel" onClick={deleteCombo}>
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
    </ComboDetailWrapper>
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

const ComboDetailWrapper = styled.div`
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

  .list-combo {
    .mon-an-input {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }

    .danh-sach-mon-an {
      list-style-type: none;
      padding: 0;
      margin: 0;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
        border: 1px solid var(--primary-color);
        border-radius: 5px;
        margin-bottom: 5px;

        button {
          font-size: 1rem !important;
        }
      }
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
    flex-wrap: wrap;
    gap: 10px;
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

export default ComboDetail
