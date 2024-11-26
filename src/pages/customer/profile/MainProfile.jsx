import { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
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
import validator from 'validator'

import { ProfileContext } from '../../../context/ProfileContext'
import AvatarUser from '../../../components/AvatarUser'
import ChangePassword from './ChangePassword'

function MainProfile() {
  const { profile, updateProfile } = useContext(ProfileContext)
  const [localProfile, setLocalProfile] = useState(profile)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)

  useEffect(() => {
    setLocalProfile(profile)
  }, [profile])

  const handleRemoveItem = (listName, itemId, key) => {
    setLocalProfile((prevProfile) => ({
      ...prevProfile,
      [listName]: prevProfile[listName].filter((item) => item[key] !== itemId)
    }))
  }

  const handleSave = () => {
    // Kiểm tra các trường bắt buộc
    if (
      !localProfile.HoTen ||
      !localProfile.GioiTinh ||
      !localProfile.SDT ||
      !localProfile.Email ||
      !localProfile.NgaySinh ||
      !localProfile.NoiSong
    ) {
      alert('Vui lòng điền đầy đủ thông tin!')
      return
    }

    // Kiểm tra độ dài của họ tên (ít nhất 2 ký tự)
    if (localProfile.HoTen.length < 2) {
      alert('Họ tên phải có ít nhất 2 ký tự!')
      return
    }

    // Kiểm tra số điện thoại (phải có 10 hoặc 11 ký tự và bắt đầu bằng 0)
    const phonePattern = /^0\d{9,10}$/
    if (!phonePattern.test(localProfile.SDT)) {
      alert(
        'Số điện thoại không hợp lệ! (Phải bắt đầu bằng 0 và có 10 hoặc 11 chữ số)'
      )
      return
    }

    // Kiểm tra email hợp lệ
    if (!validator.isEmail(localProfile.Email)) {
      alert('Email không hợp lệ!')
      return
    }

    // Kiểm tra ngày sinh hợp lệ (định dạng YYYY-MM-DD)
    if (
      !validator.isDate(localProfile.NgaySinh, {
        format: 'YYYY-MM-DD',
        strictMode: true
      })
    ) {
      alert('Ngày sinh không hợp lệ! (Yêu cầu định dạng YYYY-MM-DD)')
      return
    }

    // Đảm bảo các trường lưu là mảng trước khi gọi updateProfile
    const sanitizedProfile = {
      ...localProfile,
      LuuHoiTruong: localProfile.LuuHoiTruong || [],
      LuuMC: localProfile.LuuMC || [],
      LuuNhacCong: localProfile.LuuNhacCong || [],
      LuuThiepMoi: localProfile.LuuThiepMoi || [],
      LuuCombo: localProfile.LuuCombo || []
    }

    console.log('Cập nhật thông tin:', sanitizedProfile)

    updateProfile(sanitizedProfile)
    window.location.reload()
  }

  // Update
  const handleCancelUpdate = () => {
    setLocalProfile(profile)
    // Load lại trang để reset form
    window.location.reload()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setLocalProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }))
  }

  // Mở dialog đổi mật khẩu
  const handleOpenChangePassword = () => {
    setIsChangePasswordOpen(true)
  }

  const handleCloseChangePassword = () => {
    setIsChangePasswordOpen(false)
  }

  // chuyển date trong profile thành dạng yyyy-mm-dd
  const date = new Date(profile.NgaySinh)
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

  return (
    <MainProfileWrapper className="container">
      <div className="profile-content">
        <div className="profile-heading">
          <h2>Thông tin cá nhân</h2>
          <hr />
        </div>
        <div className="profile-info">
          <div className="profile-info-img">
            <AvatarUser name={profile.HoTen} size={150} />
          </div>
          <div className="profile-info-content">
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label>Họ Tên:</label>
                  <input
                    type="text"
                    name="HoTen"
                    value={localProfile.HoTen}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Giới Tính:</label>
                  <select
                    name="GioiTinh"
                    value={localProfile.GioiTinh}
                    onChange={handleChange}
                    required
                  >
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Số điện thoại:</label>
                  <input
                    type="tel"
                    name="SDT"
                    maxLength={10}
                    value={localProfile.SDT}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="Email"
                    required
                    value={localProfile.Email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ngày sinh:</label>
                  <input
                    type="date"
                    name="NgaySinh"
                    value={localProfile.NgaySinh}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Nơi sống:</label>
                  <input
                    type="text"
                    name="NoiSong"
                    value={localProfile.NoiSong}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </form>

            <div className="button-row">
              <button id="btn-secoundary" onClick={handleOpenChangePassword}>
                Đổi mật khẩu
              </button>
              <ChangePassword
                open={isChangePasswordOpen}
                onClose={handleCloseChangePassword}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-heading">
          <h2>Các mục đã lưu</h2>
          <hr />
        </div>
        <div className="profile-luu">
          <div className="profile-luu-content">
            <div className="profile-luu-item">
              <h4>Hội trường</h4>
              {localProfile.LuuHoiTruong.length === 0 ? (
                <p>Không có hội trường nào được lưu</p>
              ) : (
                <ul>
                  {localProfile.LuuHoiTruong.map((item) => (
                    <li key={item._id}>
                      {item.TenHoiTruong}
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveItem(
                            'LuuHoiTruong',
                            item.MaHoiTruong,
                            'MaHoiTruong'
                          )
                        }
                      >
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="profile-luu-item">
              <h4>MC</h4>
              {localProfile.LuuMC.length === 0 ? (
                <p>Không có MC nào được lưu</p>
              ) : (
                <ul>
                  {localProfile.LuuMC.map((item) => (
                    <li key={item._id}>
                      {item.HoTen}
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveItem('LuuMC', item.MaMC, 'MaMC')
                        }
                      >
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="profile-luu-item">
              <h4>Nhạc công</h4>
              {localProfile.LuuNhacCong.length === 0 ? (
                <p>Không có nhạc công nào được lưu</p>
              ) : (
                <ul>
                  {localProfile.LuuNhacCong.map((item) => (
                    <li key={item._id}>
                      {item.HoTen}
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveItem(
                            'LuuNhacCong',
                            item.MaNhacCong,
                            'MaNhacCong'
                          )
                        }
                      >
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="profile-luu-item">
              <h4>Thiệp mời</h4>
              {localProfile.LuuThiepMoi.length === 0 ? (
                <p>Không có thiệp mời nào được lưu</p>
              ) : (
                <ul>
                  {localProfile.LuuThiepMoi.map((item) => (
                    <li key={item._id}>
                      {item.LoaiThiep}
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveItem(
                            'LuuThiepMoi',
                            item.MaThiep,
                            'MaThiep'
                          )
                        }
                      >
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="profile-luu-item">
              <h4>Combo</h4>
              {localProfile.LuuCombo.length === 0 ? (
                <p>Không có combo nào được lưu</p>
              ) : (
                <ul>
                  {localProfile.LuuCombo.map((item) => (
                    <li key={item._id}>
                      {item.TenCombo}
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveItem('LuuCombo', item.MaCombo, 'MaCombo')
                        }
                      >
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="button-row">
        <button type="button" id="btn-primary" onClick={handleSave}>
          Lưu
        </button>
        <button type="button" id="btn-cancel" onClick={handleCancelUpdate}>
          Hủy
        </button>
      </div>
    </MainProfileWrapper>
  )
}

const MainProfileWrapper = styled.section`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .profile-heading {
    text-align: center;
    h2 {
      font-size: 2.5rem;
    }
    hr {
      width: 100%;
      margin: 1rem auto;
    }
  }

  .profile-content {
    color: var(--primary-color);
    font-size: 1.6rem;
    transition: all 0.4s;
    border: 1px solid #ccc;
    width: 100%;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: #0000000f 0px 4px 20px 0px;

    .profile-info {
      display: flex;
      margin-top: 2rem;
      margin-bottom: 2rem;
      justify-content: center;
      align-items: center;
      .profile-info-img {
        display: flex;
        justify-content: center;
        width: 40%;
        margin-right: 20px;
      }

      .profile-info-content {
        width: 60%;
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

        label {
          font-weight: bold;
          margin-bottom: 5px;
          display: block;
        }

        input,
        select,
        textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid var(--primary-color);
          border-radius: 5px;
        }

        input.disabled {
          background-color: #f9f9f9;
          border: 1px solid #ccc;
          cursor: not-allowed;
        }

        textarea {
          min-height: 100px;
        }

        .button-row {
          display: flex;
          justify-content: flex-start;
          gap: 30px;
        }
      }
    }

    .profile-luu {
      margin-top: 2rem;
      text-align: center;

      h3 {
        font-size: 2rem;
      }
      hr {
        width: 100%;
        margin: 1rem auto;
      }
      .profile-luu-content {
        display: flex;
        justify-content: center;
        gap: 50px;
        .profile-luu-item {
          h4 {
            font-size: 1.8rem;
            margin-bottom: 10px;
          }
          ul {
            list-style: none;
            padding: 0;
            li {
              margin-bottom: 10px;
            }
          }

          button {
            background-color: #fff;
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            margin-left: 10px;
            cursor: pointer;
            transition: all 0.4s;

            &:hover {
              background-color: #333;
            }
          }
        }
      }
    }
  }

  .button-row {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 20px;
  }
`

export default MainProfile
