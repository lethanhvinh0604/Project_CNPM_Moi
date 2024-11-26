import styled from 'styled-components'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import APIClient from '../../../../api/client'

import { ListNCContext } from '../../../../context/ListNCContext'
import Pagination from '../../../../components/Pagination'
import FilterHallSearch from './FilterHallSearch'
import ResultHallSearch from './ResultHallSearch'

function NCMain() {
  const { searchParams, currentPage, updatePage } = useContext(ListNCContext)
  const [hallData, setHallData] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    // Cập nhật URL query string
    const queryParams = new URLSearchParams({
      ...searchParams,
      page: currentPage
    }).toString()
    navigate(`?${queryParams}`, { replace: true })

    const apiClient = new APIClient('hoitruong')
    const params = { ...searchParams, page: currentPage }
    apiClient
      .findParams(params)
      .then((response) => {
        setHallData(response.data.hoitruong || [])
        setTotalPages(response.data.totalPages || 1)
        setTotalResults(response.data.totalHoiTruong || 0)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [searchParams, currentPage, navigate])

  console.log(hallData)
  return (
    <NCMainWrapper>
      <FilterHallSearch />
      <ListNCMainWrapper className="container">
        <ResultHallSearch resultSearch={hallData} totalResults={totalResults} />
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
