import React, { createContext, useState, useEffect } from 'react'
import APIClient from '../api/client'
import Loading from '../pages/system/Loading'

export const AdminTQContext = createContext()

export const AdminTQProvider = ({ children }) => {
  const [countData, setCountData] = useState({})
  const [mostUsedData, setMostUsedData] = useState({})
  const [loading, setLoading] = useState(true)

  const loadCountData = async () => {
    const apiClient = new APIClient('admin/count-active')
    try {
      const response = await apiClient.find()
      setCountData(response.data.count)
    } catch (error) {
      console.error(error)
    }
  }

  const loadMostUsedData = async () => {
    const apiClient = new APIClient('admin/most-booked')
    try {
      const response = await apiClient.find()
      setMostUsedData(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const load = async () => {
    setLoading(true)
    await Promise.all([loadCountData(), loadMostUsedData()])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const value = { countData, mostUsedData, loading }

  return (
    <AdminTQContext.Provider value={value}>
      {loading ? <Loading /> : children}
    </AdminTQContext.Provider>
  )
}
