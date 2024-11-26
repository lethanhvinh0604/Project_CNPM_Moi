import { createContext, useState, useEffect } from 'react'
// import OrderData from '../data/orderData'
import APIClient from '../api/client.js'
export const OrderContext = createContext()

export const OrderProvider = ({ children }) => {
  // const markdata = OrderData
  const [markdata, setMarkData] = useState({
    LuuHoiTruong: [],
    LuuMC: [],
    LuuCombo: [],
    LuuThiep: [],
    LuuNhacCong: []
  })

  const [hoitruong, setHoitruong] = useState([])
  const [mc, setMC] = useState([])
  const [nhaccong, setNhacCong] = useState([])
  const [combo, setCombo] = useState([])
  const [thiep, setThiep] = useState([])
  const [selectedHall, setSelectedHall] = useState(null)
  const [selectedMC, setSelectedMC] = useState(null)
  const [selectedNC, setSelectedNC] = useState(null)
  const [selectedCombo, setSelectedCombo] = useState(null)
  const [selectedThiep, setSelectedThiep] = useState(null)
  const userID = sessionStorage.getItem('userID')
  const [order, setOrder] = useState({
    MaTK: userID,
    ThoiDiemDat: '',
    ThoiDiemBatDau: '',
    ThoiDiemKetThuc: '',
    DichVu: {
      SoLuongBan: 0,
      SoLuongThiep: 0,
      MaHoiTruong: '',
      MaMC: '',
      MaNhacCong: '',
      MaCombo: '',
      MaThiepMoi: ''
    },
    Note: ''
  })

  useEffect(() => {
    const apiClient = new APIClient('khachhang')
    apiClient
      .findByID(userID)
      .then((response) => {
        setHoitruong(response.data.khachhang.LuuHoiTruong || [])
        setMC(response.data.khachhang.LuuMC || [])
        setNhacCong(response.data.khachhang.LuuNhacCong || [])
        setThiep(response.data.khachhang.LuuThiepMoi || [])
        setCombo(response.data.khachhang.LuuCombo || [])
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error)
      })
  }, [userID])

  useEffect(() => {
    const apiClient = new APIClient('hoitruong')
    hoitruong.forEach((item) => {
      apiClient
        .findByID(item)
        .then((response) => {
          setMarkData(prevState => ({
            ...prevState,
            LuuHoiTruong: prevState.LuuHoiTruong.some(item => item.MaHoiTruong === response.data.hoitruong.MaHoiTruong)
              ? prevState.LuuHoiTruong.map(item =>
                item.MaHoiTruong === response.data.hoitruong.MaHoiTruong ? response.data.hoitruong : item
              )
              : [...prevState.LuuHoiTruong, response.data.hoitruong]
          }))
        })
    })
  }, [hoitruong])

  useEffect(() => {
    const apiClient = new APIClient('mc')
    mc.forEach((item) => {
      apiClient
        .findByID(item)
        .then((response) => {
          setMarkData(prevState => ({
            ...prevState,
            LuuMC: prevState.LuuMC.some(item => item.MaMC === response.data.mc.MaMC)
              ? prevState.LuuMC.map(item =>
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
      apiClient
        .findByID(item)
        .then((response) => {
          setMarkData(prevState => ({
            ...prevState,
            LuuNhacCong: prevState.LuuNhacCong.some(item => item.MaNhacCong === response.data.nhaccong.MaNhacCong)
              ? prevState.LuuNhacCong.map(item =>
                item.LuuNhacCong === response.data.nhaccong.MaNhacCong ? response.data.nhaccong : item
              )
              : [...prevState.LuuNhacCong, response.data.nhaccong]
          }))
        })
    })
  }, [nhaccong])

  useEffect(() => {
    const apiClient = new APIClient('combo')
    combo.forEach((item) => {
      apiClient
        .findByID(item)
        .then((response) => {
          setMarkData(prevState => ({
            ...prevState,
            LuuCombo: prevState.LuuCombo.some(item => item.MaCombo === response.data.combo.MaCombo)
              ? prevState.LuuCombo.map(item =>
                item.LuuCombo === response.data.combo.MaCombo ? response.data.combo : item
              )
              : [...prevState.LuuCombo, response.data.combo]
          }))
        })
    })
  }, [combo])

  useEffect(() => {
    const apiClient = new APIClient('thiep')
    thiep.forEach((item) => {
      apiClient
        .findByID(item)
        .then((response) => {
          setMarkData(prevState => ({
            ...prevState,
            LuuThiep: prevState.LuuThiep.some(item => item.MaThiep === response.data.thiep.MaThiep)
              ? prevState.LuuThiep.map(item =>
                item.LuuThiep === response.data.thiep.MaThiep ? response.data.thiep : item
              )
              : [...prevState.LuuThiep, response.data.thiep]
          }))
        })
    })
  }, [thiep])

  const getAllSelections = () => {
    return {
      hoiTruong: selectedHall.MaHoiTruong,
      mc: selectedMC.MaMC,
      nhacCong: selectedNC.MaNhacCong,
      combo: selectedCombo.MaCombo,
      thiep: selectedThiep.MaThiep
    }
  }

  // Hàm kiểm tra điều kiện trước khi hoàn tất
  const canCompleteOrder = () => {
    if (!selectedHall) {
      return { valid: false, message: 'Hội trường không được để trống.' }
    }
    return { valid: true }
  }

  const value = {
    markdata,
    order,
    selectedHall,
    setSelectedHall,
    selectedMC,
    setSelectedMC,
    selectedNC,
    setSelectedNC,
    selectedCombo,
    setSelectedCombo,
    selectedThiep,
    setOrder,
    setSelectedThiep,
    getAllSelections,
    canCompleteOrder
  }

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}
