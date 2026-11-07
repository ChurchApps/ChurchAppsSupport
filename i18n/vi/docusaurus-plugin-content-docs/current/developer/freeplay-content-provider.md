---
title: "Nhà cung cấp nội dung FreePlay"
---

# Nhà cung cấp nội dung FreePlay

<div class="article-intro">

FreePlay là trình phát media của ChurchApps, dùng để phát trực tuyến các bài học và nội dung video khác trên điện thoại, máy tính bảng và TV. Nếu bạn có thư viện nội dung bài học và muốn đưa nội dung đó vào FreePlay, hướng dẫn này sẽ cung cấp mọi thông tin bạn cần.

</div>

## Thương hiệu

Trước khi bắt đầu tích hợp, chúng tôi cần:

- **Logo** -- Hình logo theo tỷ lệ **16:9** (dùng cho thẻ nhà cung cấp trong giao diện FreePlay)
- **Tên thương hiệu** -- Tên ưu tiên để hiển thị cho tổ chức của bạn trong FreePlay

## Điểm cuối API

FreePlay giao tiếp với dịch vụ của bạn thông qua một bộ điểm cuối REST nhỏ. Chúng tôi viết một bộ chuyển đổi (adapter) riêng cho từng nhà cung cấp, nên cấu trúc URL cụ thể có thể linh hoạt, nhưng thông tin bên dưới là những gì chúng tôi cần.

### Xác thực

Hãy chọn mô hình phù hợp với nội dung của bạn:

| Mô hình | Khi nào sử dụng | Chúng tôi cần gì |
|-------|-------------|--------------|
| **Không có** | Nội dung công khai, không cần đăng nhập | Không cần gì -- chúng tôi gọi trực tiếp các điểm cuối danh mục của bạn |
| **OAuth (PKCE)** | Đăng nhập trên web/di động | URL cấp quyền, điểm cuối đổi token, client ID, scopes |
| **Device Flow** | Được ưu tiên cho ứng dụng TV (người dùng nhập mã ngắn trên điện thoại) | Điểm cuối cấp quyền thiết bị, điểm cuối truy vấn token, client ID |

:::tip
Nếu nội dung của bạn yêu cầu xác thực, điểm cuối xác thực sẽ trả về một **user token** mà FreePlay chuyển cho các điểm cuối duyệt và bài học để cấp quyền truy cập.
:::

### Duyệt / Danh mục

Một điểm cuối (hoặc một nhóm điểm cuối) trả về **cây thư mục** gồm tất cả các bài học có sẵn.

- Điều này có thể là **một lần gọi** trả về toàn bộ cây, hoặc **nhiều lần gọi** mà mỗi lần trả về một cấp khi người dùng đi sâu hơn.
- Mỗi mục trong cây nên bao gồm:

| Trường | Bắt buộc | Mô tả |
|-------|-------------|-------------|
| `id` | Có | Mã định danh duy nhất cho thư mục |
| `name` | Có | Tên hiển thị của thư mục |
| `thumbnail` | Khuyến nghị | URL ảnh thu nhỏ theo tỷ lệ **16:9** |

### Danh sách phát bài học

Một điểm cuối trả về **danh sách phát các tệp media** cho một bài học.

Mỗi mục trong danh sách phát nên bao gồm:

| Trường | Bắt buộc | Mô tả |
|-------|-------------|-------------|
| `title` | Có | Tiêu đề hiển thị của mục media |
| `mediaType` | Có | `video` hoặc `image` |
| `url` | Có | Liên kết tải trực tiếp đến tệp (xem [Định dạng media](#media-formats) bên dưới) |
| `thumbnail` | Khuyến nghị | Ảnh thu nhỏ cho mục |
| `duration` | Khuyến nghị | Thời lượng tính bằng giây (đối với video) |

## Định dạng media

FreePlay tải tệp trực tiếp, vì vậy mỗi mục media phải có **liên kết trực tiếp** (không có trình phát nhúng hoặc chuyển hướng trang).

| Loại | Định dạng được chấp nhận |
|------|-----------------|
| Video | **MP4** (bắt buộc để phát trên đa nền tảng trên thiết bị Apple và Android) |
| Hình ảnh | JPG, PNG hoặc GIF |

## Ghi chú

- Một **REST API trả về JSON** là mô hình tích hợp điển hình, nhưng vì chúng tôi viết bộ chuyển đổi riêng cho từng nhà cung cấp, chúng tôi có thể làm việc với hầu hết mọi định dạng API.
- Nếu bạn quan tâm đến việc trở thành nhà cung cấp nội dung FreePlay, hãy liên hệ qua [Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) hoặc mở một issue trên [GitHub](https://github.com/ChurchApps/ChurchAppsSupport/issues).
