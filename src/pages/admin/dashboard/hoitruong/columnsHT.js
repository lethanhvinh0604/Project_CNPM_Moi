export const columnsHT = [
  {
    name: 'Mã Hội Trường',
    selector: (row) => row.MaHoiTruong
  },
  {
    name: 'Tên Hội Trường',
    selector: (row) => row.TenHoiTruong
  },
  {
    name: 'Sức Chứa',
    selector: (row) => row.SucChua
  },
  {
    name: 'Wifi',
    selector: (row) => (row.Wifi ? 'Có' : 'Không')
  },
  {
    name: 'Máy Lạnh',
    selector: (row) => (row.MayLanh ? 'Có' : 'Không')
  },
  {
    name: 'Phòng Kín',
    selector: (row) => (row.PhongKin ? 'Có' : 'Không')
  },
  {
    name: 'Diện Tích (m2)',
    selector: (row) => row.DienTich
  },
  {
    name: 'Số Phòng',
    selector: (row) => row.SoPhong
  },
  {
    name: 'Vị Trí Lầu',
    selector: (row) => row.ViTriLau
  },
  {
    name: 'Giá (VND)',
    selector: (row) => row.Gia.toLocaleString() // Format số
  },
  {
    name: 'Tình Trạng',
    selector: (row) => (row.TinhTrang ? 'Đang sử dụng' : 'Không sử dụng')
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
