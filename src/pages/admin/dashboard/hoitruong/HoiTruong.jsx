import styled from 'styled-components'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'

import { columnsHT, customStyles , conditionalRowStyles } from './columnsHT'
import HoiTruongDetail from './HoiTruongDetail'
import APIClient from '../../../../api/client'

function HoiTruong() {
  const [selectedRow, setSelectedRow] = useState(null)
  const [filterText, setFilterText] = useState('')
  const [someHallData, setHallData] = useState([])
  const [reload, setReload] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [totalHoiTruong, setTotalHoiTruong] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const fetchData = (page = 1, perPage = 10) => {
    const apiClient = new APIClient('hoitruong')
    apiClient
      .findParams({ page, limit: perPage })
      .then((response) => {
        setHallData(response.data.hoitruong || [])
        setTotalHoiTruong(response.data.totalHoiTruong || 0)
        setTotalPages(response.data.totalPages || 0)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    fetchData(currentPage, perPage)
  }, [reload, currentPage, perPage])

  // Hàm xử lý khi nhấn vào dòng
  const handleRowClicked = (row) => {
    setSelectedRow(row) // Lưu dòng được chọn
  }

  // Lọc dữ liệu dựa trên giá trị filterText
  const filteredData = someHallData.filter((item) =>
    // Tìm kiếm theo tất cả các trường
    Object.values(item).some((field) => {
      if (typeof field === 'string') {
        return field.toLowerCase().includes(filterText.toLowerCase())
      } else if (typeof field === 'boolean') {
        return (field ? 'Có' : 'Không')
          .toLowerCase()
          .includes(filterText.toLowerCase())
      } else if (typeof field === 'number') {
        return field.toString().includes(filterText)
      }
      return false
    })
  )

  // Hàm xử lý khi thay đổi trang
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // Hàm xử lý khi thay đổi số lượng dòng trên mỗi trang
  const handlePerRowsChange = (newPerPage, page) => {
    setPerPage(newPerPage)
    setCurrentPage(page)
  }

  return (
    <HoiTruongWrapper>
      <h2>Quản lý hội trường</h2>
      <div className="hall-content">
        <div className="hall-content-table">
          <h3>Danh sách hội trường</h3>
          <div className="actions">
            <p>Tìm kiếm:</p>
            <input
              type="text"
              placeholder="Nhập từ khóa..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <DataTable
            columns={columnsHT}
            data={filteredData} // Dữ liệu sau khi lọc
            onRowClicked={handleRowClicked}
            pagination // Tính năng phân trang
            conditionalRowStyles={conditionalRowStyles} // Tùy chỉnh giao diện dòng
            paginationServer // Sử dụng phân trang từ server
            paginationTotalRows={totalHoiTruong} // Tổng số dòng
            paginationDefaultPage={currentPage} // Trang hiện tại
            paginationPerPage={perPage} // Số dòng trên mỗi trang
            onChangePage={handlePageChange} // Hàm xử lý khi thay đổi trang
            onChangeRowsPerPage={handlePerRowsChange} // Hàm xử lý khi thay đổi số lượng dòng trên mỗi trang
            customStyles={customStyles} // Tùy chỉnh giao diện
          />
        </div>
        <div className="hall-content-detail">
          <HoiTruongDetail selectedData={selectedRow} setReload={setReload}/>
        </div>
      </div>
    </HoiTruongWrapper>
  )
}

const HoiTruongWrapper = styled.section`
  font-family: 'Source Sans 3', sans-serif;
  background-color: #f1f3f5;
  h2 {
    color: var(--primary-color);
    width: 100%;
    font-size: 2.4rem;
    padding: 20px;
    text-align: center;
    text-transform: uppercase;
  }
  .hall-content {
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr; /* Chia cột thành 2 phần bằng nhau */
    gap: 20px; /* Khoảng cách giữa 2 cột */

    .hall-content-table {
      max-width: 700px;
      padding: 20px;
      height: auto;
      border: 1px solid #ccc;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: #0000000f 0px 4px 20px 0px;

      h3 {
        color: var(--primary-color);
        font-size: 1.6rem;
      }

      .actions {
        padding: 10px;
        display: flex;
        justify-content: flex-end;

        p {
          font-size: 1.4rem;
          margin-right: 10px;
          text-align: center;
          align-self: center;
        }

        input {
          width: 30%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid var(--primary-color);
        }
      }
    }

    .hall-content-detail {
      padding: 20px;
      border: 1px solid #ccc;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: #0000000f 0px 4px 20px 0px;
    }
  }
`

export default HoiTruong
