import styled from 'styled-components'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import APIClient from '../../../../api/client'

import { columnCombo, customStyles, conditionalRowStyles } from './columnCombo'
import ComboDetail from './ComboDetail'

function Combo() {
  const [selectedRow, setSelectedRow] = useState(null)
  const [filterText, setFilterText] = useState('')
  const [somCombodata, setComboData] = useState([])
  const [reload, setReload] = useState(true)
  const [totalCombo, setTotalCombo] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  // Hàm tải lại dữ liệu từ API
  const fetchData = (page = 1, perPage = 10) => {
    const apiClient = new APIClient('combo')
    apiClient
      .findParams({ page, limit: perPage })
      .then((response) => {
        setComboData(response.data.combo || [])
        setTotalCombo(response.data.totalCombo || 0)
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
  const filteredData = somCombodata.filter((item) =>
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
    <ComboWrapper>
      <h2>Quản lý Combo món ăn</h2>
      <div className="combo-content">
        <div className="combo-content-table">
          <h3>Danh sách combo món ăn</h3>
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
            columns={columnCombo}
            data={filteredData} // Dữ liệu sau khi lọc
            onRowClicked={handleRowClicked}
            pagination // Tính năng phân trang
            conditionalRowStyles={conditionalRowStyles} // Tùy chỉnh giao diện dòng
            paginationServer // Sử dụng phân trang từ server
            paginationTotalRows={totalCombo} // Tổng số dòng
            paginationDefaultPage={currentPage} // Trang hiện tại
            paginationPerPage={perPage} // Số dòng trên mỗi trang
            onChangePage={handlePageChange} // Hàm xử lý khi thay đổi trang
            onChangeRowsPerPage={handlePerRowsChange} // Hàm xử lý khi thay đổi số lượng dòng trên mỗi trang
            customStyles={customStyles} // Tùy chỉnh giao diện
          />
        </div>
        <div className="combo-content-detail">
          <ComboDetail selectedData={selectedRow} setReload={setReload} />
        </div>
      </div>
    </ComboWrapper>
  )
}

const ComboWrapper = styled.section`
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
  .combo-content {
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr; /* Chia cột thành 2 phần bằng nhau */
    gap: 20px; /* Khoảng cách giữa 2 cột */

    .combo-content-table {
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

    .combo-content-detail {
      padding: 20px;
      border: 1px solid #ccc;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: #0000000f 0px 4px 20px 0px;
    }
  }
`

export default Combo
