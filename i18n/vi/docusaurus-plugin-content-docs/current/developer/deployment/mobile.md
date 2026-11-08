---
title: "Triển khai ứng dụng di động"
description: "Hướng dẫn cách build bản phát hành Android và iOS cho các ứng dụng Expo như B1 Checkin, gửi lên cửa hàng ứng dụng và đẩy bản cập nhật OTA bằng EAS."
---

# Triển khai ứng dụng di động

<div class="article-intro">

Các ứng dụng di động Expo của ChurchApps, chẳng hạn như B1 Checkin, được build bằng **Expo EAS Build** hoặc bản build Gradle cục bộ và phân phối qua các cửa hàng ứng dụng. Trang này hướng dẫn cách build, gửi và đẩy bản cập nhật qua mạng (OTA) cho cả Android và iOS, lấy B1 Checkin làm ví dụ.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Thiết lập ứng dụng trên máy cục bộ -- xem [Ứng dụng di động](../mobile/index.md#local-setup)
- Cài đặt và cấu hình [EAS CLI](https://docs.expo.dev/eas/)
- Có quyền truy cập Google Play Console (Android) và/hoặc Apple App Store Connect (iOS)

</div>

## Build

### Android

Bản build phát hành Android chạy cục bộ và được ký bằng keystore phát hành từ EAS. Tải xuống một lần bằng `npx eas-cli credentials -p android` (chọn **credentials.json: Download credentials from EAS**), sau đó chạy:

```bash
yarn build:android
```

Gói Google Play sẽ được tạo tại `android/app/build/outputs/bundle/release/app-release.aab`. Để build trên EAS thay thế, chạy `yarn build:android:eas`.

### iOS

Bản build iOS luôn chạy trên EAS:

```bash
yarn build:ios
```

## Gửi lên cửa hàng ứng dụng

### Android -- Google Play Store

Tải tệp AAB lên qua Play Console, hoặc gửi bằng EAS:

```bash
npx eas-cli submit -p android --path android/app/build/outputs/bundle/release/app-release.aab
```

### iOS -- Apple App Store

Gửi bản build iOS trực tiếp qua EAS:

```bash
eas submit --platform ios
```

## Cập nhật OTA

Với các thay đổi chỉ liên quan đến JavaScript và không cần cửa hàng ứng dụng duyệt, hãy dùng cập nhật qua mạng (OTA):

```bash
yarn update
```

Lệnh này dùng EAS Update để đẩy thay đổi trực tiếp đến người dùng mà không cần gửi toàn bộ ứng dụng lên cửa hàng.

:::tip
Cập nhật OTA nhanh hơn đáng kể so với bản build cửa hàng -- thay đổi có thể đến tay người dùng trong vài phút thay vì vài ngày. Hãy dùng cho việc sửa lỗi, thay đổi nội dung văn bản và điều chỉnh giao diện nhỏ không liên quan đến mã native.
:::

## Số phiên bản

Trước khi tạo bản build cho cửa hàng, cần cập nhật số phiên bản trong nhiều tệp:

- `package.json`
- `app.json`
- `android/app/build.gradle` (`versionName` và `versionCode`)

Số build của iOS được EAS tự động tăng.

:::warning
Nếu quên cập nhật số phiên bản trong tất cả các tệp, quá trình build sẽ thất bại hoặc cửa hàng ứng dụng sẽ từ chối. Hãy kiểm tra lại từng tệp được liệt kê ở trên trước khi bắt đầu build cho bản phát hành chính thức.
:::

## Bài viết liên quan

- **[Ứng dụng di động](../mobile/index.md)** -- Hướng dẫn thiết lập cục bộ và phát triển
- **[Triển khai API](./apis.md)** -- Triển khai các API phía backend
- **[Triển khai ứng dụng web](./web-apps.md)** -- Triển khai các ứng dụng web phía frontend
