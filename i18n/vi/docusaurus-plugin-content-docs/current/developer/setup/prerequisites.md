---
title: "Điều kiện tiên quyết"
description: "Thiết lập Node.js, npm, Git và các bộ công cụ theo nền tảng trước khi làm việc với các dự án ChurchApps như B1 Admin, Lessons.church, FreePlay hoặc API trên máy cục bộ."
---

# Điều kiện tiên quyết

<div class="article-intro">

Các công cụ bạn cần phụ thuộc vào những dự án bạn định làm việc. Trang này liệt kê tất cả phần mềm cần thiết, được phân loại theo khu vực phát triển, từ yêu cầu chung cho đến bộ công cụ dành riêng cho từng nền tảng.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Xem [Tổng quan dự án](./project-overview.md) để xác định dự án nào bạn muốn làm việc
- Có quyền quản trị viên trên máy phát triển để cài đặt phần mềm

</div>

## Tất cả dự án

Các công cụ sau là bắt buộc đối với mọi dự án:

| Công cụ | Phiên bản | Ghi chú |
|------|---------|-------|
| **Node.js** | 20+ | Cần phiên bản 22+ cho B1App và LessonsApp (Next.js 16); cần 24+ cho Api |
| **npm** | Đi kèm Node.js | Được dùng làm trình quản lý gói cho tất cả dự án |
| **Git** | Mới nhất | Mỗi dự án là một kho lưu trữ (repository) riêng biệt |

:::tip
Hãy dùng trình quản lý phiên bản Node như [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) hoặc [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) để dễ dàng chuyển đổi giữa các phiên bản Node.
:::

## Phát triển Backend API

Nếu bạn định chạy API trên máy cục bộ (thay vì trỏ đến các API demo):

| Công cụ | Phiên bản | Ghi chú |
|------|---------|-------|
| **MySQL** | 8.0+ | Mỗi mô-đun API dùng một cơ sở dữ liệu riêng |

Bạn sẽ cần sáu cơ sở dữ liệu cho API cốt lõi: `membership`, `attendance`, `content`, `giving`, `messaging` và `doing`. API có kèm các script để khởi tạo lược đồ (schema) -- xem hướng dẫn [thiết lập API cục bộ](../api/local-setup.md).

## Phát triển ứng dụng di động

Dành cho B1Checkin, LessonsScreen hoặc các ứng dụng React Native / Expo khác:

| Công cụ | Phiên bản | Ghi chú |
|------|---------|-------|
| **Expo CLI** | Mới nhất | Cài đặt toàn cục: `npm install -g expo-cli` |
| **Android Studio** | Mới nhất | Bắt buộc để phát triển Android (bao gồm Android SDK) |
| **Xcode** | Mới nhất | Bắt buộc để phát triển iOS (chỉ dành cho macOS) |

:::info
Bạn có thể dùng ứng dụng Expo Go trên thiết bị thật để thử nghiệm nhanh mà không cần Android Studio hoặc Xcode. Tuy nhiên, để build bản phát hành chính thức thì cần có bộ công cụ gốc (native).
:::

## Phát triển FreeShow (ứng dụng máy tính)

FreeShow cần thêm một số phụ thuộc build gốc vì nó biên dịch các mô-đun Node gốc (như `canvas`):

### Tất cả nền tảng

| Công cụ | Phiên bản | Ghi chú |
|------|---------|-------|
| **Python** | 3.12 | Được `node-gyp` yêu cầu để biên dịch mô-đun gốc |
| **setuptools** | Mới nhất | Cài đặt bằng `pip install setuptools` |

### Windows

| Công cụ | Ghi chú |
|------|-------|
| **Visual Studio** | Bản Community là đủ |
| **Khối lượng công việc "Desktop development with C++"** | Chọn trong quá trình cài đặt Visual Studio |
| **Windows 10 SDK** | Được bao gồm trong khối lượng công việc C++; hãy đảm bảo đã chọn |

Bạn có thể cài đặt công cụ build của Visual Studio qua dòng lệnh:

```bash
npm install --global windows-build-tools
```

Hoặc cài đặt Visual Studio Community và chọn khối lượng công việc "Desktop development with C++" trong quá trình cài đặt.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Thông thường, Xcode Command Line Tools là đủ:

```bash
xcode-select --install
```

## Kiểm tra cài đặt

Chạy các lệnh sau để xác nhận mọi thứ đã được cài đặt:

```bash
node --version    # Nên hiển thị v20.x.x trở lên
npm --version     # Nên hiển thị 10.x.x trở lên
git --version     # Nên hiển thị git version 2.x.x
mysql --version   # Chỉ cần khi phát triển API cục bộ
```

## Bước tiếp theo

- **[Tổng quan dự án](./project-overview.md)** -- Xem tất cả các dự án và chức năng của chúng
- **[Biến môi trường](./environment-variables.md)** -- Cấu hình các tệp `.env` của bạn
