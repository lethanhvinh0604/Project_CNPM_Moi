import styled from 'styled-components'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import APIClient from '../../../../api/client'

import { ListNCContext } from '../../../../context/ListNCContext'
import Pagination from '../../../../components/Pagination'
import FilterComboSearch from './FilterComboSearch'
import ResultComboSearch from './ResultComboSearch'
import Loading from '../../Loading'

function NCMain() {
  const { searchParams, currentPage, updatePage } = useContext(ListNCContext)
  const [comboData, setComboData] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(true) // Add loading state
  const navigate = useNavigate()

  useEffect(() => {
    // Cập nhật URL query string
    const queryParams = new URLSearchParams({
      ...searchParams,
      page: currentPage
    }).toString()
    navigate(`?${queryParams}`, { replace: true })

    const apiClient = new APIClient('combo')
    const params = { ...searchParams, page: currentPage }
    setLoading(true) // Set loading to true when starting to fetch data
    apiClient
      .findParams(params)
      .then((response) => {
        setComboData(response.data.combo || [])
        setTotalPages(response.data.totalPages || 1)
        setTotalResults(response.data.totalCombo || 0)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [searchParams, currentPage, navigate])

  if (loading) {
    return <Loading /> // Show Loading component when loading is true
  }

  return (
    <NCMainWrapper>
      <FilterComboSearch />
      <ListNCMainWrapper className="container">
        <ResultComboSearch
          resultSearch={comboData}
          totalResults={totalResults}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={updatePage}
        />
      </ListNCMainWrapper>
    </NCMainWrapper>
  )
}

const NCMainWrapper = styled.section``
const ListNCMainWrapper = styled.section``

export default NCMain
