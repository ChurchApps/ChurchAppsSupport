---
title: "B1 Mobile"
---

# B1 Mobile

<div class="article-intro">

B1 Mobile là ứng dụng di động chính dành cho thành viên của ChurchApps, được xây dựng bằng React Native và Expo. Ứng dụng cho phép thành viên nhà thờ xem danh bạ, truy cập chức năng dâng hiến, điểm danh, nhận thông báo và tương tác với cộng đồng nhà thờ của mình.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Cài đặt **Node.js** và **Expo CLI** -- xem [Điều kiện tiên quyết](../setup/prerequisites)
- Cài đặt **Android Studio** (cho trình giả lập Android) hoặc **Xcode** (cho trình mô phỏng iOS)
- Cấu hình mục tiêu API của bạn (demo hoặc local) -- xem [Biến môi trường](../setup/environment-variables)

</div>

## Thiết lập

1. Sao chép kho mã nguồn:

   ```bash
   git clone https://github.com/ChurchApps/B1Mobile.git
   ```

2. Cài đặt các phụ thuộc:

   ```bash
   cd B1Mobile && npm install
   ```

3. Cấu hình biến môi trường -- sao chép tệp mẫu và cập nhật các điểm cuối API:

   ```bash
   cp dotenv.sample.txt .env
   ```

4. Khởi động máy chủ phát triển Expo:

   ```bash
   npm start
   ```

:::tip
Bạn có thể dùng ứng dụng **Expo Go** trên thiết bị thật để thử nghiệm nhanh mà không cần thiết lập Android Studio hoặc Xcode.
:::

## Biến môi trường

| Biến | Mô tả |
|----------|-------------|
| `STAGE` | Giai đoạn môi trường (ví dụ: `dev`, `staging`, `prod`) |
| `CONTENT_ROOT` | URL gốc để phân phối nội dung |
| `MEMBERSHIP_API` | Điểm cuối API thành viên |
| `MESSAGING_API` | Điểm cuối API nhắn tin |
| `ATTENDANCE_API` | Điểm cuối API điểm danh |
| `GIVING_API` | Điểm cuối API dâng hiến |
| `DOING_API` | Điểm cuối API công việc |
| `CONTENT_API` | Điểm cuối API nội dung |
| `LESSONS_ROOT` | URL gốc cho nội dung bài học |

## Lệnh thường dùng

| Lệnh | Mô tả |
|---------|-------------|
| `npm start` | Khởi chạy máy chủ phát triển Expo |
| `npm run android` | Chạy trên trình giả lập Android |
| `npm run ios` | Chạy trên trình mô phỏng iOS |
| `npm run test` | Chạy kiểm thử (Jest) |

## Bản dựng production

Trước khi tạo bản dựng production, hãy cập nhật số phiên bản trong tất cả các tệp sau:

- `package.json`
- `app.config.js`
- `android/app/build.gradle`
- `ios/B1Mobile/Info.plist`

### Android

```bash
npm run build:android
```

Lệnh này dùng EAS Build để tạo tệp nhị phân Android.

### iOS

```bash
eas build --platform ios --profile production
```

### Cập nhật OTA

Để đẩy bản cập nhật qua mạng (không cần qua quá trình xét duyệt của cửa hàng ứng dụng):

```bash
npm run update:production
```

:::info
Cập nhật OTA phù hợp nhất với các thay đổi chỉ có JavaScript. Nếu bạn chỉnh sửa mã gốc hoặc các phụ thuộc, bạn phải gửi một bản dựng đầy đủ lên cửa hàng.
:::

## Bài viết liên quan

- **[Triển khai ứng dụng di động](../deployment/mobile)** -- Hướng dẫn đầy đủ về cách dựng, gửi và triển khai ứng dụng di động
- **[Biến môi trường](../setup/environment-variables)** -- Tài liệu tham chiếu đầy đủ về cấu hình môi trường di động
