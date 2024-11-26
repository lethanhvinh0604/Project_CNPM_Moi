const somCombodata = [
  {
    MaCombo: 'C001',
    TenCombo: 'Combo 1',
    LoaiCombo: 'Combo Thịt ',
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
      'https://media.istockphoto.com/id/1196814203/vi/anh/kh%C3%A1c-nhau-m%C3%B3n-h%E1%BA%A3i-s%E1%BA%A3n-tr%C3%AAn-b%C3%A0n-%C4%91%C3%A1.jpg?s=1024x1024&w=is&k=20&c=jafepGgVvVpXertZpAmpGFiuIrzX-5OtMREngWbGaMM=',
      'https://media.istockphoto.com/id/1482627291/vi/anh/b%C3%A0n-l%E1%BB%85-h%E1%BB%99i-v%E1%BB%9Bi-nhi%E1%BB%81u-lo%E1%BA%A1i-h%E1%BA%A3i-s%E1%BA%A3n-bao-g%E1%BB%93m-ngh%C3%AAu-t%C3%B4m-s%E1%BA%B5n-s%C3%A0ng-%C4%91%E1%BB%83-th%C6%B0%E1%BB%9Fng-th%E1%BB%A9c.jpg?s=1024x1024&w=is&k=20&c=qs8YZhVWQzJDrndUvp64iqiXnJvJciDMW3OiXn96PEo=',
      'https://media.istockphoto.com/id/1312283557/vi/anh/c%C3%A1c-m%C3%B3n-%C4%83n-c%E1%BB%95-%C4%91i%E1%BB%83n-c%E1%BB%A7a-th%C3%A1i-lan.jpg?s=1024x1024&w=is&k=20&c=WmptQmlct3wfJ6O6GIdBvmKMzAr045_gsbkIX6n9BoI=',
      'https://media.istockphoto.com/id/1371552788/vi/anh/m%C3%B3n-%C4%83n-c%E1%BB%95-%C4%91i%E1%BB%83n-%C4%91%C3%ADch-th%E1%BB%B1c-th%C3%A1i-lan.jpg?s=1024x1024&w=is&k=20&c=xa6iYQ-pSWYkuIXFBkZzuok9IhzqCSk2Gn2L0178BP8=',
      'https://media.istockphoto.com/id/646067750/vi/anh/%E1%BA%A9m-th%E1%BB%B1c-ch%C3%A2u-%C3%A1-%C4%91%C6%B0%E1%BB%A3c-ph%E1%BB%A5c-v%E1%BB%A5-tr%C3%AAn-%C4%91%C3%A1-%C4%91en-t%E1%BA%A7m-nh%C3%ACn-h%C3%A0ng-%C4%91%E1%BA%A7u.jpg?s=1024x1024&w=is&k=20&c=73SACYV6qhMkcwmBB5JBbJb_lUvJ-K9PcY-zd0fhaIU='
    ]
  },
  {
    MaCombo: 'C002',
    TenCombo: 'Combo 2',
    LoaiCombo: 'Combo Thịt Gà ',
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
      'https://media.istockphoto.com/id/1196814203/vi/anh/kh%C3%A1c-nhau-m%C3%B3n-h%E1%BA%A3i-s%E1%BA%A3n-tr%C3%AAn-b%C3%A0n-%C4%91%C3%A1.jpg?s=1024x1024&w=is&k=20&c=jafepGgVvVpXertZpAmpGFiuIrzX-5OtMREngWbGaMM=',
      'https://media.istockphoto.com/id/1482627291/vi/anh/b%C3%A0n-l%E1%BB%85-h%E1%BB%99i-v%E1%BB%9Bi-nhi%E1%BB%81u-lo%E1%BA%A1i-h%E1%BA%A3i-s%E1%BA%A3n-bao-g%E1%BB%93m-ngh%C3%AAu-t%C3%B4m-s%E1%BA%B5n-s%C3%A0ng-%C4%91%E1%BB%83-th%C6%B0%E1%BB%9Fng-th%E1%BB%A9c.jpg?s=1024x1024&w=is&k=20&c=qs8YZhVWQzJDrndUvp64iqiXnJvJciDMW3OiXn96PEo=',
      'https://media.istockphoto.com/id/1312283557/vi/anh/c%C3%A1c-m%C3%B3n-%C4%83n-c%E1%BB%95-%C4%91i%E1%BB%83n-c%E1%BB%A7a-th%C3%A1i-lan.jpg?s=1024x1024&w=is&k=20&c=WmptQmlct3wfJ6O6GIdBvmKMzAr045_gsbkIX6n9BoI=',
      'https://media.istockphoto.com/id/1371552788/vi/anh/m%C3%B3n-%C4%83n-c%E1%BB%95-%C4%91i%E1%BB%83n-%C4%91%C3%ADch-th%E1%BB%B1c-th%C3%A1i-lan.jpg?s=1024x1024&w=is&k=20&c=xa6iYQ-pSWYkuIXFBkZzuok9IhzqCSk2Gn2L0178BP8=',
      'https://media.istockphoto.com/id/646067750/vi/anh/%E1%BA%A9m-th%E1%BB%B1c-ch%C3%A2u-%C3%A1-%C4%91%C6%B0%E1%BB%A3c-ph%E1%BB%A5c-v%E1%BB%A5-tr%C3%AAn-%C4%91%C3%A1-%C4%91en-t%E1%BA%A7m-nh%C3%ACn-h%C3%A0ng-%C4%91%E1%BA%A7u.jpg?s=1024x1024&w=is&k=20&c=73SACYV6qhMkcwmBB5JBbJb_lUvJ-K9PcY-zd0fhaIU='
    ]
  },
  {
    MaCombo: 'C003',
    TenCombo: 'Combo 3',
    LoaiCombo: 'Combo Thịt lợn ',
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
      'https://media.istockphoto.com/id/1196814203/vi/anh/kh%C3%A1c-nhau-m%C3%B3n-h%E1%BA%A3i-s%E1%BA%A3n-tr%C3%AAn-b%C3%A0n-%C4%91%C3%A1.jpg?s=1024x1024&w=is&k=20&c=jafepGgVvVpXertZpAmpGFiuIrzX-5OtMREngWbGaMM=',
      'https://media.istockphoto.com/id/1482627291/vi/anh/b%C3%A0n-l%E1%BB%85-h%E1%BB%99i-v%E1%BB%9Bi-nhi%E1%BB%81u-lo%E1%BA%A1i-h%E1%BA%A3i-s%E1%BA%A3n-bao-g%E1%BB%93m-ngh%C3%AAu-t%C3%B4m-s%E1%BA%B5n-s%C3%A0ng-%C4%91%E1%BB%83-th%C6%B0%E1%BB%9Fng-th%E1%BB%A9c.jpg?s=1024x1024&w=is&k=20&c=qs8YZhVWQzJDrndUvp64iqiXnJvJciDMW3OiXn96PEo=',
      'https://media.istockphoto.com/id/1312283557/vi/anh/c%C3%A1c-m%C3%B3n-%C4%83n-c%E1%BB%95-%C4%91i%E1%BB%83n-c%E1%BB%A7a-th%C3%A1i-lan.jpg?s=1024x1024&w=is&k=20&c=WmptQmlct3wfJ6O6GIdBvmKMzAr045_gsbkIX6n9BoI=',
      'https://media.istockphoto.com/id/1371552788/vi/anh/m%C3%B3n-%C4%83n-c%E1%BB%95-%C4%91i%E1%BB%83n-%C4%91%C3%ADch-th%E1%BB%B1c-th%C3%A1i-lan.jpg?s=1024x1024&w=is&k=20&c=xa6iYQ-pSWYkuIXFBkZzuok9IhzqCSk2Gn2L0178BP8=',
      'https://media.istockphoto.com/id/646067750/vi/anh/%E1%BA%A9m-th%E1%BB%B1c-ch%C3%A2u-%C3%A1-%C4%91%C6%B0%E1%BB%A3c-ph%E1%BB%A5c-v%E1%BB%A5-tr%C3%AAn-%C4%91%C3%A1-%C4%91en-t%E1%BA%A7m-nh%C3%ACn-h%C3%A0ng-%C4%91%E1%BA%A7u.jpg?s=1024x1024&w=is&k=20&c=73SACYV6qhMkcwmBB5JBbJb_lUvJ-K9PcY-zd0fhaIU='
    ]
  },
  {
    MaCombo: 'C004',
    TenCombo: 'Combo 4',
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
      'https://media.istockphoto.com/id/1196814203/vi/anh/kh%C3%A1c-nhau-m%C3%B3n-h%E1%BA%A3i-s%E1%BA%A3n-tr%C3%AAn-b%C3%A0n-%C4%91%C3%A1.jpg?s=1024x1024&w=is&k=20&c=jafepGgVvVpXertZpAmpGFiuIrzX-5OtMREngWbGaMM=',
      'https://media.istockphoto.com/id/1482627291/vi/anh/b%C3%A0n-l%E1%BB%85-h%E1%BB%99i-v%E1%BB%9Bi-nhi%E1%BB%81u-lo%E1%BA%A1i-h%E1%BA%A3i-s%E1%BA%A3n-bao-g%E1%BB%93m-ngh%C3%AAu-t%C3%B4m-s%E1%BA%B5n-s%C3%A0ng-%C4%91%E1%BB%83-th%C6%B0%E1%BB%9Fng-th%E1%BB%A9c.jpg?s=1024x1024&w=is&k=20&c=qs8YZhVWQzJDrndUvp64iqiXnJvJciDMW3OiXn96PEo=',
      'https://media.istockphoto.com/id/1312283557/vi/anh/c%C3%A1c-m%C3%B3n-%C4%83n-c%E1%BB%95-%C4%91i%E1%BB%83n-c%E1%BB%A7a-th%C3%A1i-lan.jpg?s=1024x1024&w=is&k=20&c=WmptQmlct3wfJ6O6GIdBvmKMzAr045_gsbkIX6n9BoI=',
      'https://media.istockphoto.com/id/1371552788/vi/anh/m%C3%B3n-%C4%83n-c%E1%BB%95-%C4%91i%E1%BB%83n-%C4%91%C3%ADch-th%E1%BB%B1c-th%C3%A1i-lan.jpg?s=1024x1024&w=is&k=20&c=xa6iYQ-pSWYkuIXFBkZzuok9IhzqCSk2Gn2L0178BP8=',
      'https://media.istockphoto.com/id/646067750/vi/anh/%E1%BA%A9m-th%E1%BB%B1c-ch%C3%A2u-%C3%A1-%C4%91%C6%B0%E1%BB%A3c-ph%E1%BB%A5c-v%E1%BB%A5-tr%C3%AAn-%C4%91%C3%A1-%C4%91en-t%E1%BA%A7m-nh%C3%ACn-h%C3%A0ng-%C4%91%E1%BA%A7u.jpg?s=1024x1024&w=is&k=20&c=73SACYV6qhMkcwmBB5JBbJb_lUvJ-K9PcY-zd0fhaIU='
    ]
  },
  {
    TenCombo: 'Combo 5',
    LoaiCombo: 'Combo Hải Sản',
    MoTa: 'Hương vị biển cả',
    Gia: 6000000,
    DanhSachMonAn: ['Mực nướng', 'Tôm hấp', 'Cá chiên', 'Gỏi cuốn', 'Cháo hàu'],
    HinhAnh: [
      'https://media.istockphoto.com/id/1196814203/vi/anh/kh%C3%A1c-nhau-m%C3%B3n-h%E1%BA%A3i-s%E1%BA%A3n-tr%C3%AAn-b%C3%A0n-%C4%91%C3%A1.jpg?s=1024x1024&w=is&k=20&c=jafepGgVvVpXertZpAmpGFiuIrzX-5OtMREngWbGaMM=',
      'https://media.istockphoto.com/id/1482627291/vi/anh/b%C3%A0n-l%E1%BB%85-h%E1%BB%99i-v%E1%BB%9Bi-nhi%E1%BB%81u-lo%E1%BA%A1i-h%E1%BA%A3i-s%E1%BA%A3n-bao-g%E1%BB%93m-ngh%C3%AAu-t%C3%B4m-s%E1%BA%B5n-s%C3%A0ng-%C4%91%E1%BB%83-th%C6%B0%E1%BB%9Fng-th%E1%BB%A9c.jpg?s=1024x1024&w=is&k=20&c=qs8YZhVWQzJDrndUvp64iqiXnJvJciDMW3OiXn96PEo=',
      'https://media.istockphoto.com/id/1312283557/vi/anh/c%C3%A1c-m%C3%B3n-%C4%83n-c%E1%BB%95-%C4%91i%E1%BB%83n-c%E1%BB%A7a-th%C3%A1i-lan.jpg?s=1024x1024&w=is&k=20&c=WmptQmlct3wfJ6O6GIdBvmKMzAr045_gsbkIX6n9BoI=',
      'https://media.istockphoto.com/id/1371552788/vi/anh/m%C3%B3n-%C4%83n-c%E1%BB%95-%C4%91i%E1%BB%83n-%C4%91%C3%ADch-th%E1%BB%B1c-th%C3%A1i-lan.jpg?s=1024x1024&w=is&k=20&c=xa6iYQ-pSWYkuIXFBkZzuok9IhzqCSk2Gn2L0178BP8=',
      'https://media.istockphoto.com/id/646067750/vi/anh/%E1%BA%A9m-th%E1%BB%B1c-ch%C3%A2u-%C3%A1-%C4%91%C6%B0%E1%BB%A3c-ph%E1%BB%A5c-v%E1%BB%A5-tr%C3%AAn-%C4%91%C3%A1-%C4%91en-t%E1%BA%A7m-nh%C3%ACn-h%C3%A0ng-%C4%91%E1%BA%A7u.jpg?s=1024x1024&w=is&k=20&c=73SACYV6qhMkcwmBB5JBbJb_lUvJ-K9PcY-zd0fhaIU='
    ]
  }
]

export default somCombodata
