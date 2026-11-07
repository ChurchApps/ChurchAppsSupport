---
title: "Cơ sở dữ liệu"
---

# Cơ sở dữ liệu

<div class="article-intro">

API của ChurchApps sử dụng kiến trúc **mỗi module một cơ sở dữ liệu**. Mỗi module dữ liệu trong số sáu module có cơ sở dữ liệu MySQL riêng với một connection pool độc lập, giúp ranh giới dữ liệu rõ ràng và vẫn giữ mọi thứ trong một lần triển khai duy nhất.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Cài đặt **MySQL 8.0+** -- xem [Yêu cầu tiên quyết](../setup/prerequisites)
- Cấu hình chuỗi kết nối cơ sở dữ liệu trong tệp `.env` -- xem [Biến môi trường](../setup/environment-variables)

</div>

## Tổng quan kiến trúc

```
Api
├── membership_db   ← Người, nhóm, quyền
├── attendance_db   ← Buổi lễ, phiên, bản ghi
├── content_db      ← Trang, phần, thành phần
├── giving_db       ← Quyên góp, quỹ, thanh toán
├── messaging_db    ← Cuộc trò chuyện, thông báo
└── doing_db        ← Nhiệm vụ, kế hoạch, phân công
```

### Các quyết định thiết kế chính

- **Một cơ sở dữ liệu cho mỗi module** -- Mỗi module duy trì cơ sở dữ liệu MySQL riêng với một connection pool chuyên dụng (do `KyselyPool` quản lý). Điều này giúp các module độc lập với nhau và cho phép phát triển lược đồ một cách riêng biệt.
- **Quyền sở hữu độc quyền** -- Các bảng của một module chỉ được đọc và ghi bởi mã nguồn của chính module đó. Khi module khác cần dữ liệu này, nó sẽ gọi gateway của module sở hữu thay vì truy vấn trực tiếp các bảng -- xem [Giao tiếp giữa các module](./module-structure#cross-module-communication).
- **Mẫu repository không dùng ORM** -- Mọi truy cập dữ liệu đều đi qua các lớp repository, xây dựng câu SQL có kiểu dữ liệu bằng trình xây dựng truy vấn Kysely trên lược đồ của module. Cách này giúp kiểm soát đầy đủ hiệu năng và hành vi truy vấn.
- **Đa thuê bao ngay từ thiết kế** -- Mọi truy vấn đều được giới hạn theo `churchId`. Tất cả các bảng đều có cột `churchId`, và lớp repository tự động thực thi cách ly giữa các thuê bao.

## Chuỗi kết nối

Kết nối cơ sở dữ liệu của mỗi module được cấu hình trong `.env` theo định dạng chuỗi kết nối MySQL chuẩn:

```
mysql://user:password@host:port/database
```

Ví dụ, một thiết lập phát triển cục bộ có thể trông như sau:

Mỗi module đọc kết nối của mình từ một biến môi trường có tên `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
Trên môi trường production, chuỗi kết nối được lưu trong AWS SSM Parameter Store và được lớp `Environment` đọc khi khởi động.
:::

## Tập lệnh lược đồ

Lược đồ bảng được định nghĩa dưới dạng migration Kysely trong thư mục `tools/migrations/`, được tổ chức theo module:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Migration định nghĩa việc tạo bảng, chỉ mục và các thay đổi lược đồ. Thư mục `tools/dbScripts/` chứa dữ liệu demo và dữ liệu khởi tạo có thể nạp lên trên lược đồ.

## Khởi tạo cơ sở dữ liệu

### Khởi tạo tất cả cơ sở dữ liệu

```bash
npm run initdb
```

Lệnh này tạo cả sáu cơ sở dữ liệu và chạy migration cho từng cơ sở dữ liệu.

### Khởi tạo một module

```bash
npm run initdb -- --module=membership
```

:::tip
Khi làm việc trên một module cụ thể, bạn có thể khởi tạo lại chỉ cơ sở dữ liệu của module đó mà không ảnh hưởng đến các module khác.
:::

## Mẫu truy cập dữ liệu

Repository xây dựng truy vấn bằng trình xây dựng truy vấn Kysely trên lược đồ cơ sở dữ liệu có kiểu dữ liệu của module, lấy thông qua hàm `getDb()` của module. Một phương thức repository điển hình trông như sau:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Repository được lấy thông qua `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Luôn đưa `churchId` vào truy vấn để duy trì cách ly đa thuê bao. Không bao giờ truy vấn xuyên thuê bao trừ khi bạn có một lý do cụ thể và được ủy quyền.
:::

## Tham chiếu chéo giữa các module

Vì dữ liệu của mỗi module nằm trong một cơ sở dữ liệu riêng, không có khóa ngoại hay phép JOIN SQL nào vượt qua ranh giới module. Một bản ghi liên quan đến dữ liệu của module khác sẽ lưu id của bản ghi đó -- ví dụ, một khoản quyên góp trong cơ sở dữ liệu giving mang `personId` của một người trong cơ sở dữ liệu membership -- và mọi việc kết hợp dữ liệu giữa các module đều diễn ra trong mã ứng dụng.

Ràng buộc này làm cho ranh giới module trở nên thực sự: mỗi lược đồ có thể phát triển độc lập, cơ sở dữ liệu của một module có thể được chuyển sang máy chủ riêng, và một module thậm chí có thể được tách thành dịch vụ độc lập mà không cần gỡ các bảng dùng chung hay truy vấn xuyên cơ sở dữ liệu.

## Bài viết liên quan

- **[Cấu trúc module](./module-structure)** -- Cách các controller và repository được tổ chức bên trong mỗi module
- **[Thiết lập API cục bộ](./local-setup)** -- Hướng dẫn thiết lập đầy đủ từng bước
