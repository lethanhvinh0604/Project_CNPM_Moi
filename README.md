<h2>Website Đặt Và Quản Lý Sự Kiện dùng MERN Stack</h2>

## I. Giới thiệu chung

### 1. Mục tiêu

> Mục tiêu của đề tài xây dựng ứng dụng quản lý trung tâm tổ chức sự kiện nhằm tối ưu hóa quy trình quản lý sự kiện, giúp tự động hóa và tinh gọn các công việc như đặt lịch, quản lý tài nguyên và phân công nhân sự. Ngoài ra, ứng dụng còn giúp quản lý hiệu quả các tài nguyên như phòng hội nghị, thiết bị và nhân sự, từ đó tối ưu hóa việc sử dụng nguồn lực. Mục tiêu cuối cùng là nâng cao năng lực cạnh tranh của trung tâm tổ chức sự kiện, tạo ra một môi trường quản lý chuyên nghiệp, hiện đại và phù hợp với xu thế số hóa hiện nay.

### 2. Nghiệp vụ của đề tài

#### 2.1. Người dùng

- Người dùng nếu chưa có tài khoản thì sẽ có phần để đăng kí tài khoản để đăng nhập vào hệ thống. Nếu có nhưng quên thì cũng có phần lấy lại mật khẩu bằng gmail đã đăng ký. Ngoài ra, họ cũng có thể thay đổi các thông tin cá nhân của mình như tên, số điện thoại, địa chỉ, gmail,…
- Sau khi đăng nhập thì sẽ vào trang chủ xem các hội trường, nhạc công, MC, Món ăn, thiệp mời nổi bật của ứng dụng
- Người dùng có thể tìm kiếm và lọc theo tên, giá,.. các hội trường, nhạc công, MC, Món ăn, thiệp mời và xem chi tiết từng dịch vụ để tìm kiếm dịch vụ phù hợp.
- Sau khi người dùng tìm kiếm và lưu các dịch vụ, người dùng có thể đặt dịch vụ, người dùng thực hiện chọn hội trường, nhạc công, MC, Món ăn, thiệp mời đã lưu ở lúc tìm kiếm và điền thông tin liên lạc để được quản lý liên lạc
- Ngoài ra người dùng có thể chat với AI để có thể tham khảo các ý kiến để có thể đặt được dịch vụ phù hợp nhất
- Người dùng có thể cập nhật thông tin cá nhân trong cài đặt

#### 2.2. Admin

- Sau khi đăng nhập thì sẽ vào trang chủ quản lý tổng quan, ở đây người quản lý có thể xem được tổng số Hội trường, MC, Nhạc công, Thiệp mời, Món ăn, đơn đặt dịch vụ thành công và thất bại. Xem những hội trường và dịch vụ đứng đầu
- Người quản lý xem chi tiết các Hội trường, MC, Nhạc công, Thiệp mời, Món ăn, có thể thêm, xóa, sửa khi cần thiết.
- Người quản lý xem chi tiết các đơn đặt dịch vụ do khách hàng đã đặt, chấp nhận hoặc từ chối.

### II. Công nghệ sử dụng

- Database: `MongoDB`
- Backend: `NodeJS`, `ExpressJS`
- Frontend: `ReactJS`
- Ngôn ngữ lập trình: `JavaScript`
- Ngoài ra còn sử dụng: `JWT`, `Nodemailer`, `Material UI`, `Axios`

### III. Các sơ đồ thiết kế

#### 1. Database Diagram

![Alt text](./src/assets/readme/data.png?raw=true 'Title')

#### 2. Use Case Diagram

![Alt text](./src/assets/readme/use.png?raw=true 'Title')

### IV. Một số giao diện chính

#### Sơ đồ màn hình

![Alt text](./src/assets/readme/screen.png?raw=true 'Title')

#### 1. Trang chủ

![Alt text](./src/assets/readme/trangchu.png?raw=true 'Title')

#### 2. Đăng nhập

![Alt text](./src/assets/readme/loginpage.png?raw=true 'Title')

#### 3. Chat AI

![Alt text](./src/assets/readme/chatai.png?raw=true 'Title')

#### 4. Danh sách Hội trường

![Alt text](./src/assets/readme/hoitruong.png?raw=true 'Title')

#### 5. Danh sách nhạc công

![Alt text](./src/assets/readme/nhaccong.png?raw=true 'Title')

#### 6. Đặt dịch vụ

![Alt text](./src/assets/readme/datdichvu.png?raw=true 'Title')

#### 7. Trang cá nhân

![Alt text](./src/assets/readme/profile.png?raw=true 'Title')

#### 8. Dashboard Admin

![Alt text](./src/assets/readme/dashboard.png?raw=true 'Title')

#### 9. Quản lý hội trường

![Alt text](./src/assets/readme/qlHoiTruong.png?raw=true 'Title')

### V. Video demo

> [[Xem video]](https://www.youtube.com/watch?v=BTUjVFqaztg)

### VI. Deploy

> [[Link]](https://project-cnpm-moi-client.vercel.app/)

### VII. Hướng dẫn sử dụng

- Đăng nhập với tài khoản `admin1` và mật khẩu `Admin123!` để truy cập vào trang quản trị.
- Đăng nhập với tài khoản `test222` và mật khẩu `User123!` để truy cập vào trang người dùng.
- Có thể xem thêm tài liệu hướng dẫn sử dụng tại [[đây]](./src/data/Hướng%20dẫn%20sử%20dụng.pdf)

### VIII. Các kết quả đạt được
Sau một thời gian nghiên cứu, học tập và bắt tay vào thực hiện, với mong muốn xây dựng được ứng dụng quản lý trung tâm tổ chức sự kiện. Chúng em đã có được những kết quả đạt được:
-	Tìm hiểu được hoạt động của một ứng dụng web theo chuẩn RESTful API
-	Thiết kế giao diện và trải nghiệm người dùng
-	Chức năng tìm kiếm, đặt các dịch vụ
-	Quản lý thông tin về hội trường, thiệp mời, MC, nhạc công, đơn đặt dịch vụ, món ăn
-	Thống kê tổng quan
