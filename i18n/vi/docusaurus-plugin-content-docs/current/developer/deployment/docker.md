---
title: "Tự lưu trữ bằng Docker"
description: "Cài đặt riêng B1 Admin, cổng thành viên, API và stack MySQL trên máy của bạn bằng Docker, rồi nâng cấp và sao lưu bằng lệnh b1."
---

# Tự lưu trữ bằng Docker

<div class="article-intro">

Chạy phiên bản B1 Admin, cổng thành viên và trang web B1, API, và cơ sở dữ liệu MySQL riêng của bạn trên bất kỳ máy nào có Docker — máy chủ tại nhà, VPS nhỏ, hoặc máy đặt tại chỗ. Một lệnh để cài đặt, một lệnh để nâng cấp, và mỗi lần nâng cấp đều sao lưu trước. Nếu bạn không muốn tự quản lý máy chủ, hãy xem [Tự lưu trữ trên Railway](./railway-template.md) để có giải pháp được quản lý sẵn.

</div>

## Bắt đầu nhanh

<div class="prereqs">
<h4>Những gì bạn cần</h4>

- Một máy Linux (hoặc macOS / Windows với WSL hoặc Git Bash — công cụ `b1` là một script bash) có [Docker Engine](https://docs.docker.com/engine/install/) và Compose v2 (đã có sẵn trong Docker Desktop)
- Khoảng 2 GB RAM và 5 GB dung lượng đĩa
- Đối với trang web công khai: một tên miền trỏ về máy này, với cổng 80 và 443 có thể truy cập được

</div>

```bash
curl -fsSL https://raw.githubusercontent.com/ChurchApps/B1Admin/main/deploy/install.sh | bash -s -- --domain church.example.org
```

Bỏ qua `--domain` để chạy trên `http://localhost`. Trình cài đặt sẽ tạo thư mục `b1church`, ghi tệp `.env` với các khóa bí mật mới được tạo, tải về các image dựng sẵn từ GitHub Container Registry, và đợi đến khi API báo trạng thái khỏe mạnh. Không có gì được dựng trên máy của bạn, nên lần khởi động đầu tiên mất khoảng một đến hai phút.

Khi quá trình hoàn tất:

1. Mở **https://church.example.org/admin** (hoặc http://localhost/admin) và nhấn **Register**. Tài khoản đầu tiên sẽ tự động là quản trị viên máy chủ.
2. Làm theo các hướng dẫn trong ứng dụng để tạo nhà thờ đầu tiên. Trang web và cổng thành viên của nhà thờ sẽ hoạt động tại **https://church.example.org/** ngay khi nhà thờ được tạo.

Mọi thứ chạy sau một tên miền duy nhất:

| Đường dẫn | Dịch vụ |
|------|---------|
| `/` | B1App — trang web nhà thờ và cổng thành viên |
| `/admin` | B1Admin — bảng điều khiển dành cho nhân viên |
| `/api` | API, các tệp đã tải lên, và websocket cập nhật trực tiếp |

HTTPS được bật tự động: proxy [Caddy](https://caddyserver.com/) đi kèm sẽ lấy và gia hạn chứng chỉ Let's Encrypt cho tên miền trong `.env`. Chỉ cổng 80 và 443 được mở; cơ sở dữ liệu chỉ có thể truy cập từ bên trong mạng Docker.

## Lệnh `b1`

Trình cài đặt để lại một script `deploy/b1` bên cạnh `docker-compose.yml`. Đây là công cụ duy nhất bạn cần dùng hằng ngày:

| Lệnh | Chức năng |
|---------|--------------|
| `./deploy/b1 upgrade` | Tải bản phát hành hiện tại, sao lưu, khởi động lại, và xác nhận API hoạt động bình thường |
| `./deploy/b1 upgrade 2026.10.1` | Tương tự, nhưng ghim vào một bản phát hành cụ thể |
| `./deploy/b1 backup` | Chụp ảnh cơ sở dữ liệu, các tệp đã tải lên và `.env` vào `backups/<timestamp>/` |
| `./deploy/b1 restore backups/<timestamp>` | Khôi phục một bản chụp (API sẽ dừng trong khi chạy) |
| `./deploy/b1 rollback` | Khôi phục bản sao lưu mới nhất, bao gồm cả bản phát hành mà nó được tạo ra |
| `./deploy/b1 status` | Phiên bản đã cài đặt và tình trạng hoạt động của các container |
| `./deploy/b1 logs api` | Theo dõi nhật ký của một dịch vụ |

Các bản phát hành được xuất bản dưới dạng một gói có phiên bản duy nhất để ba image luôn khớp nhau. `B1_VERSION=stable` trong `.env` sẽ theo dõi bản phát hành mới nhất; đặt thành một phiên bản cụ thể để ghim. Ghi chú phát hành nằm tại [B1Admin releases](https://github.com/ChurchApps/B1Admin/releases).

## Cấu hình

Tất cả các thiết lập nằm trong `.env` bên cạnh `docker-compose.yml`. Trình cài đặt sẽ điền các thiết lập bắt buộc:

```bash
B1_VERSION=stable
DOMAIN=church.example.org
SITE_ADDRESS=church.example.org          # địa chỉ Caddy phục vụ; http://localhost cho cài đặt cục bộ
PUBLIC_URL=https://church.example.org    # cách trình duyệt và email truy cập trang web
MYSQL_ROOT_PASSWORD=…                    # được tạo tự động
JWT_SECRET=…                             # được tạo tự động
ENCRYPTION_KEY=…                         # được tạo tự động, đúng 32 ký tự — không bao giờ thay đổi sau khi đã lưu thông tin xác thực

# Email — rất nên có; nếu không có, thành viên không thể tự đặt lại mật khẩu
MAIL_SYSTEM=SMTP
SMTP_HOST=smtp.resend.com
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxx
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@church.example.org
```

Sau khi chỉnh sửa `.env`, hãy áp dụng bằng lệnh `docker compose up -d`. Các ứng dụng web tự xác định API cần kết nối dựa trên địa chỉ trong trình duyệt, nên khi thay đổi tên miền, bạn chỉ cần cập nhật `SITE_ADDRESS` và `PUBLIC_URL` rồi khởi động lại — không cần dựng lại.

:::warning
Hãy bảo vệ `.env` cẩn thận. `ENCRYPTION_KEY` bảo vệ thông tin xác thực của cổng thanh toán và lưu trữ đã được lưu; một bản sao lưu không có khóa này sẽ không thể giải mã chúng. `./deploy/b1 backup` có kèm một bản sao khóa vì lý do này.
:::

### Chuyển sang tên miền sau này

Nếu bạn đã cài đặt trên `localhost` và sau đó muốn đưa nó ra công khai: trỏ DNS về máy này, đặt `DOMAIN`, `SITE_ADDRESS` (tên miền không kèm giao thức) và `PUBLIC_URL` (`https://` + tên miền) trong `.env`, rồi chạy `docker compose up -d`. Caddy sẽ lấy chứng chỉ ở yêu cầu đầu tiên.

## Email, Giving, nhiều trang, và tích hợp

Các tính năng này hoạt động giống hệt như trên Railway — cùng các biến môi trường, được đặt trong `.env` thay vì bảng điều khiển Railway:

- **[Email / SMTP](./railway-template.md#1-email-highly-recommended)** — hướng dẫn từng bước cho Resend, Brevo và Gmail
- **[Nhiều trang](./railway-template.md#3-multi-site-multiple-churches-on-one-instance)** — không giới hạn số nhà thờ trên một phiên bản. `/` phục vụ nhà thờ có slug là `DEFAULT_CHURCH_SLUG` (nhà thờ đầu tiên là `church`); trỏ các tên miền bổ sung về máy này và ánh xạ chúng trong **Settings → Domains** của B1Admin
- **[Quyên góp trực tuyến](./railway-template.md#4-online-giving-stripe--paypal)** — được cấu hình cho từng nhà thờ trong giao diện quản trị
- **[Tích hợp tùy chọn](./railway-template.md#6-optional-feature-integrations)** — `OPENAI_API_KEY`, `YOUTUBE_API_KEY`, `PEXELS_KEY`, `VIMEO_TOKEN`, `API_BIBLE_KEY`, `GOOGLE_RECAPTCHA_SECRET_KEY`
- **[Thông báo đẩy](#push-notifications)** — `WEB_PUSH_*`; trình cài đặt để trống các mục này, nên thông báo đẩy sẽ tắt cho đến khi bạn thêm chúng

Lời mời và các email khác do nhà thờ gửi được bật tự động trên phiên bản tự lưu trữ (dịch vụ được lưu trữ sẵn giới hạn các tính năng này qua bước kiểm duyệt thủ công để bảo vệ uy tín người gửi).

## Thông báo đẩy

Thông báo đẩy trên trình duyệt và web di động sẽ tắt cho đến khi máy chủ có cặp khóa VAPID. Trình cài đặt không tạo khóa này. Cho đến khi bạn thêm khóa, trang Notifications của ứng dụng web di động sẽ thông báo rằng thông báo đẩy chưa được bật cho trang web.

1. Tạo cặp khóa. Chỉ cần Docker:

   ```bash
   docker run --rm node:lts-alpine npx --yes web-push generate-vapid-keys
   ```

2. Thêm hai giá trị vào `.env`. `WEB_PUSH_SUBJECT` là tùy chọn, và là địa chỉ liên hệ mà các dịch vụ đẩy thông báo nhìn thấy:

   ```bash
   WEB_PUSH_PUBLIC_KEY=…
   WEB_PUSH_PRIVATE_KEY=…
   WEB_PUSH_SUBJECT=mailto:admin@example.org
   ```

3. Áp dụng:

   ```bash
   docker compose up -d
   ```

4. Để xác nhận, mở **Server Admin → Server Health** trong B1Admin. Cả hai khóa Web Push phải hiển thị là đã được cấu hình. Sau đó, thành viên có thể bật thông báo từ ứng dụng web di động.

:::warning
Giữ nguyên các khóa này sau khi thành viên đã đăng ký. Việc thay đổi chúng sẽ làm mất hiệu lực mọi đăng ký hiện có, và mỗi thiết bị phải đăng ký lại.
:::

## Dữ liệu, sao lưu và lưu trữ tệp

Ba volume Docker được đặt tên giữ toàn bộ dữ liệu:

| Volume | Nội dung |
|--------|----------|
| `b1church_mysql-data` | Tất cả các schema cơ sở dữ liệu |
| `b1church_api-content` | Các tệp đã tải lên — ảnh, tài liệu, hình ảnh trang web |
| `b1church_caddy-data` | Chứng chỉ TLS |

`./deploy/b1 backup` ghi một bản chụp nhất quán của hai volume đầu tiên cùng với `.env` vào `backups/<timestamp>/`. Hãy lên lịch bằng cron và sao chép thư mục ra một nơi khác ngoài máy này:

```
0 3 * * * cd /opt/b1church && ./deploy/b1 backup >> backups/backup.log 2>&1
```

Với thư viện đa phương tiện lớn, bạn có thể chuyển lưu trữ tệp sang S3 — đặt `FILE_STORE=S3` cùng các biến `AWS_*` được mô tả trong [phần Lưu trữ tệp của hướng dẫn Railway](./railway-template.md#5-file-storage). Bản sao lưu cơ sở dữ liệu không bao gồm các đối tượng S3; hãy bật tính năng versioning cho bucket đó.

## Cập nhật

```bash
./deploy/b1 upgrade
```

Theo thứ tự: tải bản phát hành, sao lưu, tạo lại các container, chạy các migration cơ sở dữ liệu đang chờ khi API khởi động, và đợi kiểm tra tình trạng của API. Nếu có lỗi, quá trình sẽ dừng và hướng dẫn bạn chạy `./deploy/b1 rollback`, lệnh này sẽ khôi phục bản sao lưu đó cùng bản phát hành trước đó. Các migration chỉ chạy tiến; quay lui luôn có nghĩa là khôi phục bản chụp.

Nâng cấp từ tệp compose beta (tệp dựng image từ mã nguồn) cũng hoạt động tương tự sau khi bạn đã có `.env`: trước đây nó dùng `MYSQL_ROOT_PASSWORD=churchapps` theo mặc định, vì vậy hãy đưa giá trị đó vào `.env` cùng với `PUBLIC_URL` và `SITE_ADDRESS`, thay thế `docker-compose.yml` và thư mục `deploy/` bằng các tệp hiện tại, rồi chạy `./deploy/b1 upgrade`.

## Dựng từ mã nguồn

Nhà phát triển có thể dựng các image cục bộ thay vì tải về:

```bash
docker compose -f docker-compose.yml -f docker-compose.build.yml up -d --build
```

`API_CONTEXT` và `B1APP_CONTEXT` trong `.env` trỏ các bản dựng đến mã nguồn cục bộ (ví dụ `../Api`) hoặc một git ref.

## Khắc phục sự cố

| Triệu chứng | Nguyên nhân có thể | Cách sửa |
|---------|--------------|-----|
| Container `api` khởi động lại liên tục | Lỗi migration hoặc sai mật khẩu cơ sở dữ liệu | `./deploy/b1 logs api` — migration sẽ in ra module nào bị lỗi |
| `api` ghi nhật ký "ENCRYPTION_KEY must be exactly 32 characters" | Khóa trong `.env` bị sửa tay hoặc bị cắt | Khôi phục khóa 32 ký tự gốc (chỉ tạo khóa mới nếu chưa có thông tin xác thực nào được lưu) |
| Trình duyệt hiển thị cảnh báo chứng chỉ | DNS chưa trỏ về đây, hoặc cổng 80/443 bị chặn | Sửa DNS / tường lửa; Caddy sẽ tự thử lại |
| `/` hiển thị bảng điều khiển thay vì trang web | Chưa có nhà thờ, hoặc `DEFAULT_CHURCH_SLUG` không khớp | Tạo nhà thờ, hoặc đặt slug trong **Settings → Church** |
| "Check your email" nhưng không có email nào đến | `MAIL_SYSTEM=SMTP` với thông tin đăng nhập sai | Sửa thông tin đăng nhập, hoặc bỏ `MAIL_SYSTEM` để tắt email |
| Ứng dụng web di động báo thông báo đẩy chưa được bật | Máy chủ chưa có khóa VAPID | Thêm khóa như mô tả trong [Thông báo đẩy](#push-notifications) |
| Tính năng chat / trực tiếp không hoạt động | Websocket bị proxy khác phía trước chặn | Socket nằm ở `/api/` trên cùng cổng; cho phép header `Upgrade` |
| `install` từ chối: "database volume already exists" | Dữ liệu còn sót lại từ lần cài đặt trước | `docker compose down -v` để xóa, hoặc viết `.env` và dùng `upgrade` |

Vẫn gặp khó khăn? Hãy mở một issue tại [github.com/ChurchApps/ChurchAppsSupport/issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) kèm kết quả của `./deploy/b1 logs`.

## Bài viết liên quan

- **[Tự lưu trữ trên Railway](./railway-template.md)** — phương án lưu trữ được quản lý sẵn, cùng các hướng dẫn cấu hình sau khi triển khai dùng chung
- **[Thiết lập ban đầu](../../getting-started/initial-setup.md)** — các bước đầu tiên sau khi nhà thờ được tạo
- **[Thiết lập API cục bộ](../api/local-setup.md)** — chạy toàn bộ hệ thống trực tiếp để phát triển
