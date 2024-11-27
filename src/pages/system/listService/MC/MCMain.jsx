import styled from 'styled-components'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import APIClient from '../../../../api/client'

import { ListNCContext } from '../../../../context/ListNCContext'
import Pagination from '../../../../components/Pagination'
import FilterMCSearch from './FilterMCSearch'
import ResultMCSearch from './ResultMCSearch'
import Loading from '../../Loading'

function MCMain() {
  const { searchParams, currentPage, updatePage } = useContext(ListNCContext)
  const [mcData, setMcData] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [reload, setReload] = useState(true)
  const [loading, setLoading] = useState(true) // Add loading state

  const navigate = useNavigate()

  useEffect(() => {
    // Cập nhật URL query string
    const queryParams = new URLSearchParams({
      ...searchParams,
      page: currentPage
    }).toString()
    navigate(`?${queryParams}`, { replace: true })

    const apiClient = new APIClient('mc')
    const params = { ...searchParams, page: currentPage }
    setLoading(true) // Set loading to true when starting to fetch data
    apiClient
      .findParams(params)
      .then((response) => {
        setMcData(response.data.mc || [])
        setTotalPages(response.data.totalPages || 1)
        setTotalResults(response.data.totalMC || 0)
        setLoading(false) // Set loading to false when data is loaded
      })
      .catch((error) => {
        console.error(error)
        setLoading(false) // Set loading to false when data is loaded
      })
  }, [searchParams, currentPage, navigate, reload])

  if (loading) {
    return <Loading /> // Show Loading component when loading is true
  }

  return (
    <NCMainWrapper>
      <FilterMCSearch />
      <ListNCMainWrapper className="container">
        <ResultMCSearch
          resultSearch={mcData}
          totalResults={totalResults}
          setReload={setReload}
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

export default MCMain
