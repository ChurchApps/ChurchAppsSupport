---
title: "Tham chiếu endpoint"
---

# Tham chiếu endpoint

<div class="article-intro">

Mục này mô tả tất cả các endpoint REST do API ChurchApps cung cấp. Mỗi trang module liệt kê từng route kèm phương thức HTTP, đường dẫn, yêu cầu xác thực và các quyền cần thiết.

</div>

## URL cơ sở

| Môi trường | URL |
|-------------|-----|
| Phát triển cục bộ | `http://localhost:8084` |
| Production | `https://api.churchapps.org` |

## Quy ước yêu cầu

- **Content-Type:** Mọi nội dung yêu cầu và phản hồi đều dùng `application/json`
- **Multi-tenant:** Mọi yêu cầu đã xác thực đều được giới hạn theo `churchId` lấy từ JWT token — bạn không cần truyền `churchId` trong URL
- **Lưu hàng loạt:** Phần lớn endpoint `POST` nhận một **mảng các đối tượng**. API sẽ thêm mới các bản ghi (không có trường `id`) và cập nhật các bản ghi đã có (có trường `id`) chỉ trong một lần gọi
- **ID:** Mọi ID thực thể đều là UUID

### Ví dụ: Lưu hàng loạt

```json
POST /membership/people
Authorization: Bearer <token>

[
  { "firstName": "Jane", "lastName": "Doe" },
  { "id": "abc-123", "firstName": "John", "lastName": "Smith" }
]
```

Đối tượng đầu tiên sẽ được tạo mới; đối tượng thứ hai sẽ được cập nhật (vì có trường `id`).

## Định dạng phản hồi

Phản hồi thành công trả về JSON — một đối tượng hoặc một mảng. Phản hồi lỗi sử dụng các mã trạng thái HTTP chuẩn:

| Mã | Ý nghĩa |
|------|---------|
| `200` | Thành công |
| `400` | Yêu cầu không hợp lệ (lỗi xác thực dữ liệu) |
| `401` | Không được phép (thiếu hoặc token không hợp lệ, hoặc không đủ quyền) |
| `404` | Không tìm thấy |
| `500` | Lỗi máy chủ |

Lỗi xác thực dữ liệu trả về:

```json
{
  "errors": [
    { "msg": "enter a valid email address", "param": "email", "location": "body" }
  ]
}
```

## Cách đọc bảng endpoint

Mỗi trang module sắp xếp endpoint theo controller. Các bảng sử dụng những cột sau:

| Cột | Mô tả |
|--------|-------------|
| **Method** | Phương thức HTTP (`GET`, `POST`, `DELETE`) |
| **Path** | Đường dẫn route, tính tương đối so với đường dẫn gốc của controller |
| **Auth** | **JWT** = yêu cầu Bearer token, **Public** = không cần xác thực |
| **Permission** | Quyền cần thiết (ví dụ `People.Edit`). `—` nghĩa là mọi người dùng đã xác thực |
| **Description** | Endpoint đó thực hiện việc gì |

Các controller kế thừa lớp CRUD cơ sở chuẩn sẽ tự động cung cấp bốn endpoint: `GET /` (liệt kê tất cả), `GET /:id` (lấy theo ID), `POST /` (tạo mới/cập nhật) và `DELETE /:id` (xóa).

## Module Báo cáo

Module Báo cáo hoạt động khác với các module còn lại. Thay vì CRUD dựa trên cơ sở dữ liệu, module này tải định nghĩa báo cáo từ các tệp JSON trên đĩa và thực thi các truy vấn SQL có tham số.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/reporting/reports/:keyName` | JWT | Tải định nghĩa báo cáo theo tên khóa |
| GET | `/reporting/reports/:keyName/run` | JWT | Chạy báo cáo và trả về kết quả |

Tham số báo cáo được truyền dưới dạng giá trị chuỗi truy vấn (ví dụ `?startDate=2024-01-01&endDate=2024-12-31`). Tham số `churchId` được tự động lấy từ JWT token. Mỗi định nghĩa báo cáo có thể chỉ định các yêu cầu quyền riêng.

## Danh mục module

| Module | Đường dẫn gốc | Mô tả |
|--------|-----------|-------------|
| [Authentication](./authentication) | `/membership/users`, `/membership/oauth` | Đăng nhập, đăng ký, JWT token, OAuth, quyền |
| [Membership](./membership) | `/membership/*` | Thành viên, nhà thờ, nhóm, hộ gia đình, vai trò, biểu mẫu, cài đặt |
| [Attendance](./attendance) | `/attendance/*` | Cơ sở, buổi nhóm, phiên, lượt viếng thăm, bản ghi check-in |
| [Content](./content) | `/content/*` | Trang, bài giảng, sự kiện, tệp, thư viện ảnh, Kinh Thánh, phát trực tuyến |
| [Giving](./giving) | `/giving/*` | Quyên góp, quỹ, cổng thanh toán, đăng ký định kỳ |
| [Messaging](./messaging) | `/messaging/*` | Cuộc trò chuyện, thông báo, thiết bị, SMS |
| [Doing](./doing) | `/doing/*` | Kế hoạch, nhiệm vụ, phân công, tự động hóa, lên lịch |
