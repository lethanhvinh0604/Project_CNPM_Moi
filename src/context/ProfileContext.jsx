import { createContext, useState, useEffect } from 'react'
import APIClient from '../api/client.js'
export const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
  const userID = sessionStorage.getItem('userID')

  const [gioiTinh, setGioiTinh] = useState('')
  const [hoTen, setHoTen] = useState('')
  const [sdt, setSDT] = useState('')
  const [email, setEmail] = useState('')
  const [ngaySinh, setNgaySinh] = useState('')
  const [noiSong, setNoiSong] = useState('')
  const [hoitruong, setHoitruong] = useState([])
  const [mc, setMC] = useState([])
  const [nhaccong, setNhacCong] = useState([])
  const [combo, setCombo] = useState([])
  const [thiep, setThiep] = useState([])

  const [profile, setProfile] = useState({
    MaTK: userID,
    GioiTinh: '',
    HoTen: '',
    SDT: '',
    Email: '',
    NgaySinh: '', // yyyy-mm-dd
    NoiSong: '',
    LuuHoiTruong: [],
    LuuMC: [],
    LuuNhacCong: [],
    LuuThiepMoi: [],
    LuuCombo: []
  })

  useEffect(() => {
    const apiClient = new APIClient('khachhang')
    apiClient
      .findByID(userID)
      .then((response) => {
        setHoTen(response.data.khachhang.HoTen)
        setGioiTinh(response.data.khachhang.GioiTinh)
        setSDT(response.data.khachhang.SDT)
        setEmail(response.data.khachhang.Email)
        setNgaySinh(response.data.khachhang.NgaySinh)
        setNoiSong(response.data.khachhang.NoiSong)
        setHoitruong(response.data.khachhang.LuuHoiTruong || [])
        setMC(response.data.khachhang.LuuMC || [])
        setNhacCong(response.data.khachhang.LuuNhacCong || [])
        setThiep(response.data.khachhang.LuuThiepMoi || [])
        setCombo(response.data.khachhang.LuuCombo || [])
      })
      .catch((error) => {
        console.error(error)
      })
  }, [userID])

  // Dùng useEffect để lấy thông tin chi tiết Hoten, GioiTinh, SDT, NgaySinh, NoiSong vào state `profile`
  useEffect(() => {
    setProfile((prevState) => ({
      ...prevState,
      HoTen: hoTen,
      GioiTinh: gioiTinh,
      SDT: sdt,
      Email: email,
      NgaySinh: ngaySinh,
      NoiSong: noiSong
    }))
  }, [userID, hoTen, gioiTinh, sdt, email, ngaySinh, noiSong])

  useEffect(() => {
    const apiClient = new APIClient('hoitruong')
    hoitruong.forEach((item) => {
      apiClient.findByID(item).then((response) => {
        setProfile((prevState) => ({
          ...prevState,
          LuuHoiTruong: prevState.LuuHoiTruong.some(
            (item) => item.MaHoiTruong === response.data.hoitruong.MaHoiTruong
          )
            ? prevState.LuuHoiTruong.map((item) =>
                item.MaHoiTruong === response.data.hoitruong.MaHoiTruong
                  ? response.data.hoitruong
                  : item
              )
            : [...prevState.LuuHoiTruong, response.data.hoitruong]
        }))
      })
    })
  }, [hoitruong])

  useEffect(() => {
    const apiClient = new APIClient('mc')
    mc.forEach((item) => {
      apiClient.findByID(item).then((response) => {
        setProfile((prevState) => ({
          ...prevState,
          LuuMC: prevState.LuuMC.some(
            (item) => item.MaMC === response.data.mc.MaMC
          )
            ? prevState.LuuMC.map((item) =>
                item.MaMC === response.data.mc.MaMC ? response.data.mc : item
              )
            : [...prevState.LuuMC, response.data.mc]
        }))
      })
    })
  }, [mc])

  useEffect(() => {
    const apiClient = new APIClient('nhaccong')
    nhaccong.forEach((item) => {
      apiClient.findByID(item).then((response) => {
        setProfile((prevState) => ({
          ...prevState,
          LuuNhacCong: prevState.LuuNhacCong.some(
            (item) => item.MaNhacCong === response.data.nhaccong.MaNhacCong
          )
            ? prevState.LuuNhacCong.map((item) =>
                item.LuuNhacCong === response.data.nhaccong.MaNhacCong
                  ? response.data.nhaccong
                  : item
              )
            : [...prevState.LuuNhacCong, response.data.nhaccong]
        }))
      })
    })
  }, [nhaccong])

  useEffect(() => {
    const apiClient = new APIClient('combo')
    combo.forEach((item) => {
      apiClient.findByID(item).then((response) => {
        setProfile((prevState) => ({
          ...prevState,
          LuuCombo: prevState.LuuCombo.some(
            (item) => item.MaCombo === response.data.combo.MaCombo
          )
            ? prevState.LuuCombo.map((item) =>
                item.LuuCombo === response.data.combo.MaCombo
                  ? response.data.combo
                  : item
              )
            : [...prevState.LuuCombo, response.data.combo]
        }))
      })
    })
  }, [combo])

  useEffect(() => {
    const apiClient = new APIClient('thiep')
    thiep.forEach((item) => {
      apiClient.findByID(item).then((response) => {
        setProfile((prevState) => ({
          ...prevState,
          LuuThiepMoi: prevState.LuuThiepMoi.some(
            (item) => item.MaThiep === response.data.thiep.MaThiep
          )
            ? prevState.LuuThiepMoi.map((item) =>
                item.LuuThiepMoi === response.data.thiep.MaThiep
                  ? response.data.thiep
                  : item
              )
            : [...prevState.LuuThiepMoi, response.data.thiep]
        }))
      })
    })
  }, [thiep])

  const removeItem = (listName, itemId, key) => {
    setProfile((prevProfile) => {
      const updatedList =
        prevProfile[listName]?.filter((item) => item[key] !== itemId) || []
      return {
        ...prevProfile,
        [listName]: updatedList
      }
    })
  }

  const updateProfile = async (updatedProfile) => {
    try {
      const apiClient = new APIClient('khachhang')
      // chuyển đổi ngày sinh từ dạng Date sang dạng chuỗi yyyy-mm-dd Ví dụ: 2021-01-01
      // const date = new Date(updatedProfile.NgaySinh)
      // const formattedDate = date.toISOString().split('T')[0]
      // updatedProfile.NgaySinh = formattedDate

      console.log('Cập nhật thông tin:', updatedProfile)
      // chuyển đổi các object thành mã của nó
      updatedProfile.LuuHoiTruong = updatedProfile.LuuHoiTruong.map(
        (item) => item.MaHoiTruong
      )
      updatedProfile.LuuMC = updatedProfile.LuuMC.map((item) => item.MaMC)
      updatedProfile.LuuNhacCong = updatedProfile.LuuNhacCong.map(
        (item) => item.MaNhacCong
      )
      updatedProfile.LuuThiepMoi = updatedProfile.LuuThiepMoi.map(
        (item) => item.MaThiep
      )
      updatedProfile.LuuCombo = updatedProfile.LuuCombo.map(
        (item) => item.MaCombo
      )

      // Gửi yêu cầu cập nhật lên server với thông tin mới
      const response = await apiClient.update(userID, updatedProfile)

      // Nếu thành công, cập nhật lại state `profile` với dữ liệu mới trả về từ server
      if (response.status === 200) {
        console.log(
          'Cập nhật thông tin thành công:',
          response.data.updateKhachHang
        )
        setProfile(response.data.updateKhachHang)
      }
    } catch (error) {
      console.error('Cập nhật thông tin thất bại:', error)
    }
  }

  const value = {
    profile,
    hoitruong,
    mc,
    nhaccong,
    combo,
    thiep,
    updateProfile,
    removeItem
  }

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  )
}
