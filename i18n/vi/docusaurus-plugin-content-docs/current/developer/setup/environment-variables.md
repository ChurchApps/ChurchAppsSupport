---
title: "Biến môi trường"
---

# Biến môi trường

<div class="article-intro">

Mọi dự án ChurchApps đều sử dụng tệp `.env` để cấu hình cục bộ. Mỗi dự án đi kèm một tệp mẫu để bạn sao chép và tùy chỉnh. Trang này trình bày các biến môi trường dành cho API, ứng dụng web và ứng dụng di động, bao gồm cách chọn giữa API demo và API cục bộ.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Cài đặt các [yêu cầu tiên quyết](./prerequisites) cho dự án của bạn
- Sao chép kho mã nguồn của dự án bạn muốn làm việc
- Xem [Tổng quan dự án](./project-overview) để hiểu dự án của bạn cần những mô-đun API nào

</div>

## Mẫu chung

1. Tìm `dotenv.sample.txt` hoặc `.env.sample` trong thư mục gốc của dự án.
2. Sao chép tệp đó thành `.env`.
3. Chỉnh sửa các giá trị theo nhu cầu.

```bash
# Ví dụ cho dự án có .env.sample
cp .env.sample .env

# Ví dụ cho dự án có dotenv.sample.txt
cp dotenv.sample.txt .env
```

:::warning
**Không bao giờ commit tệp `.env` lên hệ thống quản lý phiên bản.** Chúng chứa thông tin bí mật như thông tin đăng nhập cơ sở dữ liệu, khóa API và khóa bí mật JWT. Tất cả dự án ChurchApps đều có `.env` trong `.gitignore`, nhưng hãy luôn kiểm tra lại trước khi commit.
:::

## Chọn đích API

Quyết định quan trọng nhất là frontend sẽ gọi API ở đâu. Có hai lựa chọn:

### Tùy chọn 1: API demo (khuyến nghị cho phát triển frontend)

Sử dụng môi trường demo dùng chung. Không cần thiết lập API cục bộ hay cơ sở dữ liệu. Môi trường này chạy mã nguồn mới nhất từ `main`, và dữ liệu mẫu của nó được làm mới mỗi đêm.

```bash
# Mẫu URL cơ sở
https://api.demo.churchapps.org/{module}

# Ví dụ URL của các mô-đun
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/content
https://api.demo.churchapps.org/giving
https://api.demo.churchapps.org/messaging
https://api.demo.churchapps.org/doing
```

:::warning
Môi trường staging (`api.staging.churchapps.org`, `api.staging.lessons.church` và các máy chủ liên quan) đã được ngừng hoạt động. Một số tệp `.env` mẫu vẫn có thể chứa URL staging; hãy thay thế chúng bằng các giá trị demo hoặc cục bộ được trình bày trên trang này. Hiện không còn API Lessons dùng chung cho môi trường không phải production -- hãy chạy [LessonsApi](https://github.com/ChurchApps/LessonsApi) cục bộ (nó lắng nghe ở cổng `8090`) khi bạn cần.
:::

### Tùy chọn 2: API cục bộ

Chạy dự án Api trên máy của bạn. Yêu cầu MySQL 8.0+ với các cơ sở dữ liệu được tạo cho từng mô-đun. Xem hướng dẫn [thiết lập API cục bộ](../api/local-setup).

```bash
# Mẫu URL cơ sở
http://localhost:8084/{module}

# Ví dụ URL của các mô-đun
http://localhost:8084/membership
http://localhost:8084/attendance
http://localhost:8084/content
http://localhost:8084/giving
http://localhost:8084/messaging
http://localhost:8084/doing
```

---

## Biến môi trường của API

Dự án lõi **Api** (`.env.sample`) có nhiều cấu hình nhất. Dưới đây là các biến quan trọng:

### Cài đặt chung

| Biến | Mô tả | Ví dụ |
|----------|-------------|---------|
| `ENVIRONMENT` | Môi trường chạy | `dev` |
| `SERVER_PORT` | Cổng HTTP cho máy chủ phát triển cục bộ | `8084` |
| `ENCRYPTION_KEY` | Khóa mã hóa 192-bit cho dữ liệu nhạy cảm | `aSecretKeyOfExactly192BitsLength` |
| `JWT_SECRET` | Khóa bí mật dùng để ký JSON Web Token | `jwt-secret-dev` |
| `FILE_STORE` | Nơi lưu trữ các tệp tải lên (`disk` hoặc `s3`) | `disk` |
| `CORS_ORIGIN` | Các nguồn CORS được phép (`*` cho phát triển cục bộ) | `*` |

### Kết nối cơ sở dữ liệu

Một URL cơ sở duy nhất trỏ API tới MySQL. API tự suy ra một cơ sở dữ liệu cho mỗi mô-đun (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting`) từ URL cơ sở này.

| Biến | Ví dụ |
|----------|---------|
| `API_DATABASE_URL` | `mysql://root:password@localhost:3306` |

:::tip
Cập nhật `root:password` bằng thông tin đăng nhập MySQL thực tế của bạn. Mỗi cơ sở dữ liệu theo mô-đun phải tồn tại trước khi chạy API. Dùng `npm run initdb` để tạo schema cho tất cả mô-đun, hoặc `npm run initdb:membership` cho một mô-đun riêng lẻ.
:::

### Cài đặt WebSocket

| Biến | Mô tả | Ví dụ |
|----------|-------------|---------|
| `SOCKET_PORT` | Cổng cho máy chủ WebSocket | `8087` |
| `SOCKET_URL` | URL WebSocket để client kết nối | `ws://localhost:8087` |

---

## Biến môi trường của ứng dụng web

### B1Admin (React + Vite)

Tệp mẫu: `.env.sample`

| Biến | Mô tả | Ví dụ (Demo) |
|----------|-------------|----------------|
| `REACT_APP_STAGE` | Tên môi trường | `demo` |
| `PORT` | Cổng máy chủ phát triển | `3101` |
| `REACT_APP_API_BASE` | URL cơ sở duy nhất cho tất cả API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` được tự động thêm vào) | `https://api.demo.churchapps.org` |
| `REACT_APP_CONTENT_ROOT` | URL phân phối nội dung | `https://democontent.churchapps.org` |
| `REACT_APP_GOOGLE_ANALYTICS` | ID Google Analytics (tùy chọn) | `UA-123456789-1` |

Để phát triển với API cục bộ, hãy trỏ URL cơ sở đến hệ thống cục bộ của bạn:

```bash
REACT_APP_API_BASE=http://localhost:8084
```

### B1App (Next.js)

Tệp mẫu: `.env.sample`

| Biến | Mô tả | Ví dụ (Demo) |
|----------|-------------|----------------|
| `NEXT_PUBLIC_API_BASE` | URL cơ sở duy nhất cho tất cả API ChurchApps (`/membership`, `/attendance`, `/content`, `/giving`, `/messaging`, `/doing`, `/reporting` được tự động thêm vào) | `https://api.demo.churchapps.org` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL phân phối nội dung | `https://democontent.churchapps.org` |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS` | ID Google Analytics (tùy chọn) | `UA-123456789-1` |

:::info
Next.js yêu cầu tiền tố `NEXT_PUBLIC_` cho mọi biến môi trường cần có sẵn trong trình duyệt. Các biến chỉ dùng phía máy chủ không cần tiền tố này.
:::

### LessonsApp (Next.js)

Tệp mẫu: `dotenv.sample.txt`

| Biến | Mô tả | Ví dụ (API Lessons cục bộ) |
|----------|-------------|----------------------------|
| `STAGE` | Giai đoạn môi trường (để trống hoặc `dev` khi phát triển cục bộ) | `dev` |
| `NEXT_PUBLIC_LESSONS_API` | URL API Lessons | `http://localhost:8090` |
| `NEXT_PUBLIC_CONTENT_ROOT` | URL phân phối nội dung | `http://localhost:8090/content` |
| `NEXT_PUBLIC_API_BASE` | URL cơ sở API ChurchApps dùng để đăng nhập (chỉ được áp dụng khi `STAGE` để trống hoặc là `dev`) | `https://api.demo.churchapps.org` |

---

## Biến môi trường của ứng dụng di động

### B1Mobile (React Native / Expo)

Tệp mẫu: `dotenv.sample.txt`

| Biến | Mô tả | Ví dụ (Demo) |
|----------|-------------|----------------|
| `STAGE` | Tên môi trường | `dev` |
| `MEMBERSHIP_API`, `ATTENDANCE_API`, `GIVING_API`, `DOING_API`, `MESSAGING_API`, `CONTENT_API` | Một URL cho mỗi mô-đun API ChurchApps (mỗi URL mặc định trỏ đến production nếu không được đặt) | `https://api.demo.churchapps.org/membership` |
| `LESSONS_API` | API Lessons (máy chủ riêng; không có API dùng chung cho môi trường không phải production) | `https://api.lessons.church` |
| `CONTENT_ROOT` | URL phân phối nội dung | `https://democontent.churchapps.org` |
| `LESSONS_ROOT` | URL trang Lessons | `https://lessons.church` |

:::info
Ứng dụng di động không sử dụng tiền tố `REACT_APP_` hoặc `NEXT_PUBLIC_`. Việc truy cập biến môi trường được xử lý bởi cấu hình Expo.
:::

---

## Tham khảo nhanh: Vị trí các tệp mẫu

| Dự án | Tệp mẫu |
|---------|-------------|
| Api | `.env.sample` |
| B1Admin | `.env.sample` |
| B1App | `.env.sample` |
| B1Mobile | `dotenv.sample.txt` |
| B1Checkin | `dotenv.sample.txt` |
| LessonsApp | `dotenv.sample.txt` |
| AskApi | `dotenv.sample.txt` |
