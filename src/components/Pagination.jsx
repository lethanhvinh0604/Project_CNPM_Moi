import React from 'react'
import styled from 'styled-components'

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <PaginationWrapper>
      <button
        id="btn-primary"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        id="btn-primary"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </PaginationWrapper>
  )
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  span {
    margin: 0 10px;
    font-size: 1.6rem;
  }

  button {
    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`

export default Pagination
