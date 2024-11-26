import styled from 'styled-components'
import Bg from '../../../../assets/bg-v1.png'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListNCContext } from '../../../../context/ListNCContext'

function FilterHallSearch() {
  const { updateSearchParams } = useContext(ListNCContext)
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [capacity, setCapacity] = useState('')
  const [wifi, setWifi] = useState('')
  const [airConditioning, setAirConditioning] = useState('')
  const [status, setStatus] = useState('')
  const [priceOrder, setPriceOrder] = useState('')

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleCapacityChange = (e) => {
    setCapacity(e.target.value)
  }

  const handleWifiChange = (e) => {
    setWifi(e.target.value)
  }

  const handleAirConditioningChange = (e) => {
    setAirConditioning(e.target.value)
  }

  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }

  const handlePriceOrderChange = (e) => {
    setPriceOrder(e.target.value)
  }

  const handleClearFilters = () => {
    setSearchTerm('')
    setCapacity('')
    setWifi('')
    setAirConditioning('')
    setStatus('')
    setPriceOrder('')
  }
  const handleSearch = () => {
    const params = {}
    if (searchTerm) params.searchTerm = searchTerm
    if (priceOrder) params.price = priceOrder
    if (capacity) params.capacity = capacity
    if (wifi) params.wifi = wifi
    if (airConditioning) params.airConditioning = airConditioning
    if (status) params.status = status
    updateSearchParams(params)

    const queryParams = new URLSearchParams(params).toString()
    navigate(`?${queryParams}`)
  }
  return (
    <FilterSearchWrapper>
      <h1>Danh sách hội trường</h1>
      <div className="filter-container">
        <div className="filter-find">
          <h3>Tìm kiếm:</h3>
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button id="btn-primary" onClick={handleSearch}>Tìm</button>
        </div>
        <div className="filter-option">
          <h3>Lọc theo:</h3>
          <select defaultValue="" value={capacity} onChange={handleCapacityChange}>
            <option value="" disabled hidden>
              Sức chứa
            </option>
            <option value={1}>Tăng dần</option>
            <option value={-1}>Giảm dần</option>
          </select>
          <select defaultValue="" value={wifi} onChange={handleWifiChange}>
            <option value="" disabled hidden>
              Wi-Fi
            </option>
            <option value="true">Có Wi-Fi</option>
            <option value="false">Không Wi-Fi</option>
          </select>
          <select
            defaultValue=""
            value={airConditioning}
            onChange={handleAirConditioningChange}
          >
            <option value="" disabled hidden>
              Máy lạnh
            </option>
            <option value="true">Có máy lạnh</option>
            <option value="false">Không máy lạnh</option>
          </select>
          <select defaultValue="" value={status} onChange={handleStatusChange}>
            <option value="" disabled hidden>
              Tình trạng
            </option>
            <option value="true">Sẵn có</option>
            <option value="false">Không sẵn có</option>
          </select>
          <select defaultValue="" value={priceOrder} onChange={handlePriceOrderChange}>
            <option value="" disabled hidden>
              Giá
            </option>
            <option value={1}>Tăng dần</option>
            <option value={-1}>Giảm dần</option>
          </select>
          <button id="btn-cancel" onClick={handleClearFilters}>
            Xóa bộ lọc
          </button>
        </div>
      </div>
    </FilterSearchWrapper>
  )
}

const FilterSearchWrapper = styled.section`
  overflow: hidden;
  background-image: url(${Bg});
  background-size: cover;
  object-fit: cover;
  padding: 2rem 0;
  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: var(--primary-color);
    text-align: center;
  }

  input {
    flex: 1;
    padding: 10px;
    font-size: 1.4rem;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: var(--primary-color);
      outline: none;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
  }

  select {
    flex: 1;
    padding: 10px;
    font-size: 1.4rem;
    border: 1px solid var(--primary-color);
    border-radius: 5px;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: var(--primary-color);
      outline: none;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }

    option {
      padding: 5px;
    }
  }

  h3 {
    font-size: 1.6rem;
    color: var(--primary-color);
    white-space: nowrap;
  }

  .filter-container {
    width: 60%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .filter-find {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .filter-option {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    h3 {
      width: 100%;
    }

    select {
      width: 50%;
    }
  }

  @media (max-width: 768px) {
    .filter-container {
      width: 80%;

      .filter-option {
        flex-direction: column;
        gap: 1rem;
      }
    }
  }

  @media (max-width: 425px) {
    .filter-container {
      width: 90%;
    }
  }
`

export default FilterHallSearch
