export const columnsThiep = [
  {
    name: 'Mã Thiệp',
    selector: (row) => row.MaThiep
  },
  {
    name: 'Loại Thiệp',
    selector: (row) => row.LoaiThiep
  },
  {
    name: 'Giá (VND)',
    selector: (row) => row.Gia.toLocaleString()
  }
]
export const customStyles = {
  header: {
    style: {
      fontSize: '1.4rem',
      fontWeight: '700',
      backgroundColor: '#252525',
      color: '#fff'
    }
  },
  headCells: {
    style: {
      fontSize: '1.4rem',
      fontWeight: '600',
      backgroundColor: 'var(--primary-color)',
      color: '#fff',
      padding: '12px' // padding cho các ô header
    }
  },
  rows: {
    style: {
      fontSize: '1.2rem',
      color: '#333',
      backgroundColor: '#fff', // màu nền cho các dòng
      minHeight: '45px', // chiều cao tối thiểu của dòng
      '&:nth-of-type(odd)': {
        backgroundColor: '#f9f9f9' // dòng chẵn có màu nền khác
      },
      '&:hover': {
        backgroundColor: '#ddd' // thay đổi màu nền khi hover
      }
    }
  },
  cells: {
    style: {
      padding: '12px' // padding cho các ô
    }
  },
  pagination: {
    style: {
      fontSize: '1rem',
      color: '#333',
      backgroundColor: '#f8f8f8',
      borderTop: '1px solid #ddd'
    }
  }
}

export const conditionalRowStyles = [
  {
    when: (row) => row.Active === false,
    style: {
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      color: 'red',
      cursor: 'not-allowed'
    }
  }
]
