const OrderData = {
  MaTK: 'U007',
  GioiTinh: 'Nam',
  HoTen: 'Nguyen van A',
  SDT: '0987654321',
  NgaySinh: '1999-01-01',
  NoiSong: 'Ha Noi',
  LuuHoiTruong: [
    {
      MaHoiTruong: 'H001',
      TenHoiTruong: 'Hội trường A',
      SucChua: 150,
      Wifi: true,
      MoTa: 'Hội trường sang trọng, thích hợp cho sự kiện lớn.',
      MayLanh: true,
      PhongKin: true,
      DienTich: 200.5,
      SoPhong: 'A100',
      ViTriLau: 'A1',
      Gia: 1000000,
      TinhTrang: true,
      HinhAnh: [
        'https://img.freepik.com/premium-photo/empty-auditorium-with-rows-chairs-wooden-ceiling_926058-19665.jpg?w=1060',
        'https://img.freepik.com/premium-photo/empty-auditorium-rows-with-overhead-lights_926058-12219.jpg?w=1060'
      ]
    },
    {
      MaHoiTruong: 'H002',
      TenHoiTruong: 'Hội trường B',
      SucChua: 80,
      Wifi: true,
      MoTa: 'Hội trường nhỏ, phù hợp cho các buổi họp.',
      MayLanh: true,
      PhongKin: true,
      DienTich: 120,
      SoPhong: 'G000',
      ViTriLau: 'G',
      Gia: 1000000,
      TinhTrang: true,
      HinhAnh: [
        'https://img.freepik.com/premium-photo/empty-conference-room-with-projection-screen-rows-chairs_926058-20245.jpg?w=1060',
        'https://img.freepik.com/premium-photo/empty-auditorium-with-red-chairs-projection-screen_926058-19682.jpg?w=1060'
      ]
    },
    {
      MaHoiTruong: 'H003',
      TenHoiTruong: 'Hội trường C',
      SucChua: 200,
      Wifi: false,
      MoTa: 'Hội trường rộng, thích hợp cho sự kiện ngoài trời.',
      MayLanh: true,
      PhongKin: true,
      DienTich: 120,
      SoPhong: 'G000',
      ViTriLau: 'G',
      Gia: 1000000,
      TinhTrang: true,
      HinhAnh: [
        'https://img.freepik.com/premium-photo/seminar-executive-room-hotel_105762-1679.jpg?w=1060',
        'https://img.freepik.com/premium-photo/seminar-executive-room-hotel_105762-1860.jpg?w=996'
      ]
    },
    {
      MaHoiTruong: 'H004',
      TenHoiTruong: 'Hội trường D',
      SucChua: 200,
      Wifi: false,
      MoTa: 'Hội trường rộng, thích hợp cho sự kiện ngoài trời.',
      MayLanh: true,
      PhongKin: true,
      DienTich: 120,
      SoPhong: 'G000',
      ViTriLau: 'G',
      Gia: 1000000,
      TinhTrang: true,
      HinhAnh: [
        'https://img.freepik.com/premium-photo/3d-rendering-business-meeting-room-high-rise-office-building_105762-1106.jpg?w=996',
        'https://img.freepik.com/free-photo/gym-with-indoor-cycling-equipment_23-2149270209.jpg?t=st=1727192710~exp=1727196310~hmac=e90be71227d90f16a7b8442ae15173be81636e0db501f472201015e7f569c3ba&w=996'
      ]
    }
  ],
  LuuMC: [
    {
      MaMC: 'M001',
      HoTen: 'Nguyễn Văn A',
      SDT: '0987654321',
      KinhNghiem: 5,
      TinhTrang: true,
      Gia: 1500000,
      HinhAnh:
        'https://wallpapers.com/images/hd/aesthetic-monika-doki-doki-literature-club-uyhl54uzqawf7cwl.jpg'
    },
    {
      MaMC: 'M002',
      HoTen: 'Trần Văn B',
      SDT: '0987654321',
      KinhNghiem: 3,
      TinhTrang: true,
      Gia: 1500000,
      HinhAnh: 'https://i.redd.it/xm4g630jq8771.jpg'
    }
  ],
  LuuNhacCong: [
    {
      MaNhacCong: 'N001',
      HoTen: 'Nguyễn Văn A',
      SDT: '0912345678',
      KinhNghiem: 5,
      LoaiNhacCu: 'Guitar',
      TinhTrang: true,
      Gia: 2000000,
      HinhAnh: 'https://images8.alphacoders.com/129/1291221.jpg'
    },
    {
      MaNhacCong: 'N002',
      HoTen: 'Trần Văn B',
      SDT: '0912345678',
      KinhNghiem: 3,
      LoaiNhacCu: 'Piano',
      TinhTrang: true,
      Gia: 2000000,
      HinhAnh: 'https://i.ytimg.com/vi/NrbR8gzyS5g/sddefault.jpg'
    }
  ],
  LuuCombo: [
    {
      MaCombo: 'C001',
      TenCombo: 'Combo 1',
      LoaiCombo: 'Combo Thịt Đỏ',
      MoTa: 'Sự kết hợp hài hòa',
      Gia: 5000000,
      DanhSachMonAn: [
        'Bún chả',
        'Bánh mì pate',
        'Canh chua cá',
        'Cơm gà',
        'Bún riêu'
      ],
      HinhAnh: [
        'https://media.istockphoto.com/id/1196814203/vi/anh/kh%C3%A1c-nhau-m%C3%B3n-h%E1%BA%A3i-s%E1%BA%A3n-tr%C3%AAn-b%C3%A0n-%C4%91%C3%A1.jpg?s=1024x1024&w=is&k=20&c=jafepGgVvVpXertZpAmpGFiuIrzX-5OtMREngWbGaMM='
      ]
    },
    {
      MaCombo: 'C002',
      TenCombo: 'Combo 2',
      LoaiCombo: 'Combo Thịt Trắng',
      MoTa: 'Sự kết hợp hài hòa',
      Gia: 5000000,
      DanhSachMonAn: [
        'Bún chả',
        'Bánh mì pate',
        'Canh chua cá',
        'Cơm gà',
        'Bún riêu'
      ],
      HinhAnh: [
        'https://media.istockphoto.com/id/1196814203/vi/anh/kh%C3%A1c-nhau-m%C3%B3n-h%E1%BA%A3i-s%E1%BA%A3n-tr%C3%AAn-b%C3%A0n-%C4%91%C3%A1.jpg?s=1024x1024&w=is&k=20&c=jafepGgVvVpXertZpAmpGFiuIrzX-5OtMREngWbGaMM='
      ]
    },
    {
      MaCombo: 'C003',
      TenCombo: 'Combo 3',
      LoaiCombo: 'Combo Hải Sản',
      MoTa: 'Sự kết hợp hài hòa',
      Gia: 5000000,
      DanhSachMonAn: [
        'Bún chả',
        'Bánh mì pate',
        'Canh chua cá',
        'Cơm gà',
        'Bún riêu'
      ],
      HinhAnh: [
        'https://media.istockphoto.com/id/1196814203/vi/anh/kh%C3%A1c-nhau-m%C3%B3n-h%E1%BA%A3i-s%E1%BA%A3n-tr%C3%AAn-b%C3%A0n-%C4%91%C3%A1.jpg?s=1024x1024&w=is&k=20&c=jafepGgVvVpXertZpAmpGFiuIrzX-5OtMREngWbGaMM='
      ]
    }
  ],
  LuuThiep: [
    {
      MaThiep: 'T001',
      LoaiThiep: 'Sinh Nhật',
      Gia: 3000,
      HinhAnh: [
        'https://assets.paperlust.co/uploads/design/1282/Floral_birthday_(Birthday_invitation)_pink_potrait_133x184.jpg',
        'https://i.pinimg.com/originals/ff/16/8f/ff168fe3e16bcbbfb24bea63b4600bbb.jpg'
      ]
    },
    {
      MaThiep: 'T002',
      LoaiThiep: 'Cưới',
      Gia: 3000,
      HinhAnh: [
        'https://static.vecteezy.com/system/resources/previews/000/620/974/original/birthday-invitation-card-vector.jpg',
        'https://th.bing.com/th/id/R.a33b0ac896e39f9a17773a787106c245?rik=2jw1LJR8GWULFA&pid=ImgRaw&r=0'
      ]
    },
    {
      MaThiep: 'T003',
      LoaiThiep: 'Tân Gia',
      Gia: 3000,
      HinhAnh: [
        'https://th.bing.com/th/id/R.a33b0ac896e39f9a17773a787106c245?rik=2jw1LJR8GWULFA&pid=ImgRaw&r=0',
        'https://assets.paperlust.co/uploads/design/1282/Floral_birthday_(Birthday_invitation)_pink_potrait_133x184.jpg'
      ]
    }
  ]
}

export default OrderData
