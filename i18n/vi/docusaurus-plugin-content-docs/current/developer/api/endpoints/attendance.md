---
title: "Các endpoint Điểm danh"
description: "Tài liệu API điểm danh cho B1 Admin và B1 Checkin: cơ sở, buổi lễ, giờ lễ, phiên, lượt tham dự, quy tắc điểm danh và các endpoint xuất dữ liệu."
---

# Các endpoint Điểm danh

<div class="article-intro">

Mô-đun Điểm danh quản lý cơ sở, buổi nhóm, giờ buổi nhóm, phiên điểm danh, lượt thăm và phiên lượt thăm. Mô-đun này cung cấp nền tảng để theo dõi ai đã tham dự buổi nhóm hoặc buổi họp nhóm nào, hỗ trợ quy trình check-in, và cung cấp báo cáo xu hướng cũng như tổng hợp điểm danh.

</div>

**Đường dẫn gốc:** `/attendance`

## Cơ sở

Đường dẫn gốc: `/attendance/campuses`

Controller CRUD tiêu chuẩn (kế thừa GenericCrudController). Cung cấp các route `getById`, `getAll`, `post` và `delete` thông qua lớp CRUD cơ sở.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liệt kê tất cả cơ sở của hội thánh |
| GET | `/:id` | JWT | — | Lấy một cơ sở theo ID |
| POST | `/` | JWT | Services.Edit | Tạo mới hoặc cập nhật cơ sở |
| DELETE | `/:id` | JWT | Services.Edit | Xóa một cơ sở |

## Buổi nhóm

Đường dẫn gốc: `/attendance/services`

Kế thừa GenericCrudController với các route CRUD `getById`, `getAll`, `post` và `delete`. Các endpoint `getAll` (`GET /`) và `search` được ghi đè bằng triển khai tùy chỉnh.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liệt kê tất cả buổi nhóm (bao gồm thông tin cơ sở) |
| GET | `/:id` | JWT | — | Lấy một buổi nhóm theo ID |
| GET | `/search?campusId=` | JWT | — | Tìm buổi nhóm theo ID cơ sở |
| POST | `/` | JWT | Services.Edit | Tạo mới hoặc cập nhật buổi nhóm |
| DELETE | `/:id` | JWT | Services.Edit | Xóa một buổi nhóm |

### Ví dụ: Tìm buổi nhóm theo cơ sở

```
GET /attendance/services/search?campusId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "svc-001",
    "churchId": "church-123",
    "campusId": "abc-123",
    "name": "Sunday Morning"
  }
]
```

## Giờ buổi nhóm

Đường dẫn gốc: `/attendance/servicetimes`

Kế thừa GenericCrudController với các route CRUD `getById`, `post` và `delete`. Các endpoint `getAll` và `search` là triển khai tùy chỉnh.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liệt kê tất cả giờ buổi nhóm. Lọc bằng `?serviceId=`. Thêm `?include=groups` để kèm dữ liệu nhóm. Mỗi dòng có một giá trị boolean `checkinOpen` được tính toán (chỉ là false khi giờ buổi nhóm có lịch check-in và khoảng thời gian đó đang đóng vào lúc này). Khoảng thời gian được tính theo múi giờ của cơ sở chứa buổi nhóm, sau đó đến múi giờ của hội thánh, rồi đến cơ sở đầu tiên có múi giờ, và cuối cùng là `America/New_York` |
| GET | `/:id` | JWT | — | Lấy một giờ buổi nhóm theo ID |
| GET | `/search?campusId=&serviceId=` | JWT | — | Tìm giờ buổi nhóm theo cơ sở và buổi nhóm |
| GET | `/public/:churchId` | Công khai | — | Lấy cây cơ sở → buổi nhóm → giờ của một hội thánh. Phục vụ phần tử `serviceTimes` của trình xây dựng website |
| POST | `/` | JWT | Services.Edit | Tạo mới hoặc cập nhật giờ buổi nhóm. Các trường lịch tùy chọn: `dayOfWeek` (0 = Chủ nhật … 6), `startTime` / `endTime` (`HH:mm`), `checkinOpenMinutes` (trước giờ bắt đầu), `checkinCloseMinutes` (sau giờ kết thúc). Check-in chỉ bị giới hạn theo thời gian khi cả `dayOfWeek` và `startTime` đều được đặt |
| DELETE | `/:id` | JWT | Services.Edit | Xóa một giờ buổi nhóm |

## Giờ buổi nhóm của nhóm

Đường dẫn gốc: `/attendance/groupservicetimes`

Liên kết các nhóm với giờ buổi nhóm cụ thể.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liệt kê tất cả liên kết nhóm–giờ buổi nhóm. Lọc bằng `?groupId=` để lấy các liên kết kèm tên buổi nhóm |
| GET | `/:id` | JWT | — | Lấy một liên kết nhóm–giờ buổi nhóm theo ID |
| POST | `/` | JWT | Services.Edit | Tạo mới hoặc cập nhật liên kết nhóm–giờ buổi nhóm |
| DELETE | `/:id` | JWT | Services.Edit | Xóa một liên kết nhóm–giờ buổi nhóm |

## Bản ghi điểm danh

Đường dẫn gốc: `/attendance/attendancerecords`

Cung cấp các chế độ xem tổng hợp chỉ đọc về dữ liệu điểm danh để báo cáo và hiển thị.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Tải bản ghi điểm danh của một người. Yêu cầu `?personId=` |
| GET | `/my` | JWT | — | Chỉ dành cho người dùng hiện tại: bản ghi điểm danh của chính thành viên đã đăng nhập trong 12 tháng gần nhất, mới nhất trước. Trả về `401` nếu người dùng chưa liên kết với một người. Phục vụ mục **Điểm danh của tôi** trên trang Me của B1 |
| GET | `/tree` | JWT | — | Tải toàn bộ cây điểm danh (cơ sở, buổi nhóm, giờ buổi nhóm, nhóm) |
| GET | `/trend?campusId=&serviceId=&serviceTimeId=&groupId=` | JWT | Attendance.View Summary | Tải dữ liệu xu hướng điểm danh với các bộ lọc tùy chọn |
| GET | `/groups?serviceId=&week=` | JWT | Attendance.View | Tải điểm danh nhóm cho một buổi nhóm trong một tuần cụ thể |
| GET | `/sessionStatus?serviceTimeId=&date=` | JWT | Attendance.View | Với mỗi nhóm được gán vào giờ buổi nhóm, trả về `{ groupId, sessionId, attendanceCount }` cho ngày đó (`date` có dạng `YYYY-MM-DD`; `sessionId` là null khi nhóm chưa có phiên). Phục vụ hộp thoại **Ai vẫn cần điểm danh** trong B1Admin |
| GET | `/search?campusId=&serviceId=&serviceTimeId=&groupId=&startDate=&endDate=` | JWT | Attendance.View | Tìm bản ghi điểm danh theo bộ lọc (cơ sở, buổi nhóm, giờ buổi nhóm, nhóm, khoảng ngày) |

### Ví dụ: Xu hướng điểm danh

```
GET /attendance/attendancerecords/trend?serviceId=svc-001
Authorization: Bearer <token>
```

```json
[
  { "week": "2025-01-05", "count": 142 },
  { "week": "2025-01-12", "count": 156 },
  { "week": "2025-01-19", "count": 138 }
]
```

## Phiên

Đường dẫn gốc: `/attendance/sessions`

Kế thừa GenericCrudController với các route CRUD `getById` và `delete`. Các endpoint `getAll` và `save` là triển khai tùy chỉnh, và cho phép trưởng nhóm quản lý phiên của nhóm mình.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View hoặc Trưởng nhóm | Liệt kê tất cả phiên. Lọc bằng `?groupId=` (kèm tên). Trưởng nhóm có thể xem phiên của các nhóm mình phụ trách |
| GET | `/:id` | JWT | Attendance.View | Lấy một phiên theo ID |
| POST | `/` | JWT | Attendance.Edit hoặc Trưởng nhóm | Tạo mới hoặc cập nhật phiên. Trưởng nhóm có thể lưu phiên cho các nhóm mình phụ trách |
| DELETE | `/:id` | JWT | Attendance.Edit | Xóa một phiên |

## Lượt thăm

Đường dẫn gốc: `/attendance/visits`

Quản lý các bản ghi lượt thăm cá nhân (một người tham dự vào một ngày cụ thể) và cung cấp quy trình check-in.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View | Liệt kê tất cả lượt thăm. Lọc bằng `?personId=` |
| GET | `/:id` | JWT | Attendance.View | Lấy một lượt thăm theo ID |
| GET | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.View hoặc Attendance.Checkin | Tải dữ liệu check-in của những người tại một buổi nhóm. Trả về các lượt thăm kèm phiên lượt thăm từ ngày được ghi nhận gần nhất |
| POST | `/` | JWT | Attendance.Edit | Tạo mới hoặc cập nhật lượt thăm |
| POST | `/checkin?serviceId=&peopleIds=` | JWT | Attendance.Edit hoặc Attendance.Checkin | Gửi dữ liệu check-in. Tạo/cập nhật lượt thăm và phiên lượt thăm, đồng thời xóa các bản ghi cũ không còn dùng |
| DELETE | `/:id` | JWT | Attendance.Edit | Xóa một lượt thăm |

### Ví dụ: Quy trình check-in

**Bước 1 -- Tải dữ liệu check-in hiện có:**

```
GET /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>
```

```json
[
  {
    "id": "visit-001",
    "personId": "person-1",
    "visitDate": "2025-01-19T00:00:00.000Z",
    "visitSessions": [
      {
        "id": "vs-001",
        "sessionId": "sess-001",
        "visitId": "visit-001",
        "session": {
          "id": "sess-001",
          "groupId": "group-001",
          "serviceTimeId": "st-001",
          "sessionDate": "2025-01-19T00:00:00.000Z"
        }
      }
    ]
  }
]
```

**Bước 2 -- Gửi check-in:**

```
POST /attendance/visits/checkin?serviceId=svc-001&peopleIds=person-1,person-2
Authorization: Bearer <token>

[
  {
    "personId": "person-1",
    "visitSessions": [
      {
        "session": { "serviceTimeId": "st-001", "groupId": "group-001" }
      }
    ]
  }
]
```

Nếu giờ buổi nhóm được chọn có lịch check-in và khoảng thời gian đó đang đóng (được tính theo cùng thứ tự ưu tiên múi giờ theo cơ sở như `checkinOpen`), thì không có dữ liệu nào được lưu và phản hồi là `409 { "error": "notOpen", "groups": [{ "groupId", "groupName", "reason": "notOpen" }] }`. Vi phạm sức chứa và tỷ lệ tình nguyện viên cũng trả về 409 (`error: "capacity"` hoặc `"ratio"`). Các phiên mà một người đã có trong ngày hôm nay (được gửi lại mỗi lần check-in) sẽ bỏ qua kiểm tra khoảng thời gian, nhờ đó một hộ gia đình có thể thêm một giờ buổi nhóm đang mở sau khi khoảng thời gian của giờ trước đã đóng.

## Phiên lượt thăm

Đường dẫn gốc: `/attendance/visitsessions`

Quản lý mối liên kết giữa lượt thăm và phiên (người đó đã tham dự phiên cụ thể nào trong lượt thăm). Cũng cung cấp endpoint ghi nhận nhanh và endpoint tải xuống/xuất dữ liệu.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Attendance.View hoặc Trưởng nhóm | Liệt kê phiên lượt thăm. Lọc bằng `?sessionId=`. Trưởng nhóm có thể xem phiên lượt thăm của các nhóm mình phụ trách |
| GET | `/:id` | JWT | Attendance.View | Lấy một phiên lượt thăm theo ID |
| GET | `/download/:sessionId` | JWT | Attendance.View | Tải điểm danh của một phiên (trả về tên người kèm trạng thái có mặt/vắng mặt) |
| POST | `/` | JWT | Attendance.Edit | Tạo mới hoặc cập nhật phiên lượt thăm |
| POST | `/log` | JWT | Attendance.Edit hoặc Trưởng nhóm | Ghi nhận nhanh điểm danh của một người vào một phiên. Tự động tạo lượt thăm nếu cần. Trưởng nhóm có thể ghi nhận điểm danh cho các nhóm mình phụ trách |
| DELETE | `/:id` | JWT | Attendance.Edit | Xóa một phiên lượt thăm theo ID |
| DELETE | `/?personId=&sessionId=` | JWT | Attendance.Edit hoặc Trưởng nhóm | Gỡ một người khỏi phiên. Xóa phiên lượt thăm và lượt thăm cha nếu không còn phiên nào. Trưởng nhóm có thể gỡ điểm danh cho các nhóm mình phụ trách |

### Ví dụ: Ghi nhận nhanh điểm danh

```
POST /attendance/visitsessions/log
Authorization: Bearer <token>

{
  "personId": "person-001",
  "visitSessions": [
    { "sessionId": "sess-001" }
  ]
}
```

```json
{}
```

### Ví dụ: Tải điểm danh của phiên

```
GET /attendance/visitsessions/download/sess-001
Authorization: Bearer <token>
```

```json
[
  {
    "id": "vs-001",
    "personId": "person-001",
    "visitId": "visit-001",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "John Smith",
    "status": "present"
  },
  {
    "id": "",
    "personId": "person-002",
    "visitId": "",
    "sessionDate": "2025-01-19T00:00:00.000Z",
    "personName": "Jane Doe",
    "status": "absent"
  }
]
```

## Chuỗi điểm danh

Đường dẫn gốc: `/attendance/streaks`

Theo dõi chuỗi điểm danh của từng cá nhân -- số tuần liên tiếp một người đã tham dự. Hữu ích cho các chỉ số gắn kết và yếu tố trò chơi hóa.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/person/:personId` | JWT | — | Tải chuỗi điểm danh của một người |

## Trang liên quan

- [Các endpoint Thành viên](./membership.md) — Người, nhóm, vai trò và quản lý hội thánh
- [Xác thực & Quyền](./authentication.md) — Luồng đăng nhập, JWT, mô hình quyền
- [Cấu trúc mô-đun](../module-structure.md) — Các mẫu tổ chức mã nguồn
