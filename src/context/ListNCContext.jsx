import { createContext, useState } from 'react'

export const ListNCContext = createContext()

export const ListNCProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({})
  const [currentPage, setCurrentPage] = useState(1)

  const updatePage = (page) => setCurrentPage(page)
  const updateSearchParams = (params) => {
    setSearchParams(params)
    setCurrentPage(1) // reset page khi có filter mới
  }

  const value = {
    searchParams,
    updateSearchParams,
    currentPage,
    updatePage
  }

  return (
    <ListNCContext.Provider value={value}>{children}</ListNCContext.Provider>
  )
}
