---
title: "Triển khai ứng dụng di động"
---

# Triển khai ứng dụng di động

<div class="article-intro">

Ứng dụng di động của ChurchApps được xây dựng và triển khai bằng **Expo EAS Build**, sau đó phân phối qua các cửa hàng ứng dụng. Trang này hướng dẫn cách xây dựng, gửi và đẩy bản cập nhật qua không khí (OTA) cho cả Android và iOS.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Thiết lập ứng dụng di động trên máy cục bộ -- xem [B1 Mobile](../mobile/b1-mobile)
- Cài đặt và cấu hình [EAS CLI](https://docs.expo.dev/eas/)
- Có quyền truy cập Google Play Console (Android) và/hoặc Apple App Store Connect (iOS)

</div>

## Xây dựng

### Android

```bash
npm run build:android
```

### iOS

```bash
eas build --platform ios --profile production
```

## Gửi lên cửa hàng ứng dụng

### Android -- Google Play Store

Sau khi EAS build thành công, tệp nhị phân Android (AAB) sẽ được gửi lên Google Play Store thông qua Play Console.

### iOS -- Apple App Store

Gửi bản build iOS trực tiếp qua EAS:

```bash
eas submit --platform ios
```

## Cập nhật OTA

Đối với các thay đổi chỉ liên quan đến JavaScript và không cần cửa hàng ứng dụng duyệt lại, hãy sử dụng cập nhật qua không khí (OTA):

```bash
npm run update:production
```

Lệnh này dùng EAS Update để đẩy thay đổi trực tiếp đến người dùng mà không cần gửi lên cửa hàng.

:::tip
Cập nhật OTA nhanh hơn đáng kể so với bản build gửi lên cửa hàng -- thay đổi có thể đến tay người dùng trong vài phút thay vì vài ngày. Hãy dùng chúng cho các bản sửa lỗi, thay đổi nội dung và điều chỉnh giao diện nhỏ không liên quan đến mã native.
:::

## Số phiên bản

Trước khi tạo bản build để gửi lên cửa hàng, bạn phải cập nhật số phiên bản trong nhiều tệp:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/*/Info.plist`
- `ios/*/project.pbxproj`

:::warning
Quên cập nhật số phiên bản trong tất cả các tệp sẽ gây lỗi build hoặc bị cửa hàng ứng dụng từ chối. Hãy kiểm tra kỹ từng tệp được liệt kê ở trên trước khi bắt đầu build phiên bản chính thức.
:::

## Bài viết liên quan

- **[B1 Mobile](../mobile/b1-mobile)** -- Hướng dẫn thiết lập và phát triển cục bộ
- **[Triển khai API](./apis)** -- Triển khai các API phía máy chủ
- **[Triển khai ứng dụng web](./web-apps)** -- Triển khai các ứng dụng web phía giao diện
