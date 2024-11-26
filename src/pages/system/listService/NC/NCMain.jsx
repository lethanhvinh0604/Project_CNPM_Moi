import styled from 'styled-components'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import APIClient from '../../../../api/client'

import { ListNCContext } from '../../../../context/ListNCContext'
import Pagination from '../../../../components/Pagination'
import FilterNCSearch from './FilterNCSearch'
import ResultNCSearch from './ResultNCSearch'

function NCMain() {
  const { searchParams, currentPage, updatePage } = useContext(ListNCContext)
  const [ncData, setNcData] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [reload, setReload] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Cập nhật URL query string
    const queryParams = new URLSearchParams({
      ...searchParams,
      page: currentPage
    }).toString()
    navigate(`?${queryParams}`, { replace: true })

    const apiClient = new APIClient('nhaccong')
    const params = { ...searchParams, page: currentPage }
    apiClient
      .findParams(params)
      .then((response) => {
        setNcData(response.data.nhaccong || [])
        setTotalPages(response.data.totalPages || 1)
        setTotalResults(response.data.totalNhacCong || 0)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [searchParams, currentPage, navigate, reload])

  console.log(ncData)
  return (
    <NCMainWrapper>
      <FilterNCSearch />
      <ListNCMainWrapper className="container">
        <ResultNCSearch resultSearch={ncData} totalResults={totalResults} setReload={setReload}/>
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
