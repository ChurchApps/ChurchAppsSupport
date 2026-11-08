---
title: "Ứng dụng di động"
description: "Tổng quan về các ứng dụng di động Expo và React Native của ChurchApps, gồm B1 Checkin và LessonsScreen, cùng các bước thiết lập môi trường cục bộ cho bộ công cụ Expo dùng chung."
---

# Ứng dụng di động

<div class="article-intro">

Các ứng dụng di động của ChurchApps được xây dựng bằng **React Native** và **Expo**, mang lại trải nghiệm gốc trên Android, iOS và Android TV. Tất cả ứng dụng di động đều dùng chung bộ công cụ dựa trên Expo, vì vậy nếu bạn biết xây dựng một ứng dụng, bạn có thể xây dựng tất cả.

</div>

## Các ứng dụng

| Ứng dụng | Mục đích | Nền tảng |
|-----|---------|----------|
| B1 Checkin | Ứng dụng kiosk cho các quầy check-in | Android, iOS |
| LessonsScreen | Ứng dụng Android TV để hiển thị bài học trong lớp học | Android TV |

:::info
Ứng dụng dành cho thành viên là B1 App -- phần `/mobile` của B1App, mà thành viên cài đặt dưới dạng Progressive Web App. Đây là ứng dụng web, không phải dự án Expo; xem [Ứng dụng web](../web-apps/index.md) để chạy cục bộ.
:::

### B1 Checkin

Ứng dụng kiosk được thiết kế riêng cho các quầy check-in tại nhà thờ. Ứng dụng cung cấp giao diện đơn giản, thân thiện với cảm ứng để thành viên check-in trẻ em và ghi nhận điểm danh tại các buổi thờ phượng và sự kiện.

### LessonsScreen

Ứng dụng Android TV hiển thị nội dung bài học trong lớp học. Giáo viên có thể đưa slide bài học, video và hoạt động lên màn hình TV, giúp dễ dàng trình bày tài liệu giảng dạy trong giờ học.

## Thiết lập cục bộ

Tất cả ứng dụng di động đều dùng chung bộ công cụ dựa trên Expo và tuân theo các bước thiết lập tương tự. Lấy B1 Checkin làm ví dụ:

1. Cài đặt **Node.js**, Android Studio (cho trình giả lập Android) và Xcode (cho trình mô phỏng iOS, chỉ dành cho macOS) -- xem [Điều kiện tiên quyết](../setup/prerequisites.md).
2. Sao chép kho mã và cài đặt các phụ thuộc (B1 Checkin dùng Yarn):

   ```bash
   git clone https://github.com/ChurchApps/B1Checkin.git
   cd B1Checkin && yarn install
   ```

3. Sao chép `dotenv.sample.txt` thành `.env` và đặt môi trường mà ứng dụng sẽ kết nối tới (`dev` cho API cục bộ) -- xem [Biến môi trường](../setup/environment-variables.md#b1checkin-react-native--expo).
4. Khởi động máy chủ phát triển Expo bằng `yarn start`, sau đó chạy `yarn android` hoặc `yarn ios` để mở ứng dụng trên trình giả lập hoặc thiết bị.

Xem [Triển khai ứng dụng di động](../deployment/mobile.md) để biết về bản phát hành và cập nhật qua mạng (over-the-air).
