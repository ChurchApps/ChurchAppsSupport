---
title: "Tự lưu trữ trên Railway"
---

# Tự lưu trữ trên Railway

<div class="article-intro">

ChurchApps cung cấp một mẫu [Railway](https://railway.com) triển khai chỉ bằng một cú nhấp, giúp nhà thờ của bạn có một phiên bản riêng của B1 Admin, cổng thành viên B1, API và cơ sở dữ liệu MySQL, tất cả chạy trên hạ tầng mà bạn sở hữu và trả phí trực tiếp. Hướng dẫn này giúp bạn đưa hệ thống vào hoạt động trong khoảng 15 phút, sau đó hướng dẫn các cấu hình sau khi triển khai mà hầu hết nhà thờ cuối cùng đều muốn có.

</div>

## Bắt đầu nhanh

[![Triển khai trên Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Nhấp vào nút **Deploy on Railway** ở trên.
2. Đăng nhập vào Railway (hoặc tạo tài khoản miễn phí) và thêm phương thức thanh toán.
3. Nhấp **Deploy** mà không thay đổi gì — mọi biến đều có giá trị mặc định hợp lý.
4. Đợi 5–10 phút để bốn dịch vụ chuyển sang màu xanh.
5. Mở URL của dịch vụ **B1Admin**, nhấp **Register** và tạo tài khoản. Tài khoản đầu tiên sẽ tự động là quản trị viên máy chủ.
6. Làm theo các hướng dẫn trong ứng dụng để tạo nhà thờ đầu tiên của bạn.

Vậy là xong. Bạn đã có một phiên bản ChurchApps hoạt động đầy đủ. Mọi nội dung bên dưới đều là tùy chọn để hoàn thiện thêm.

:::tip
Việc triển khai hiện đang ở giai đoạn **beta**. Nếu gặp vấn đề mà tài liệu chưa đề cập, vui lòng mở một issue tại [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) và đính kèm nhật ký triển khai.
:::

<div class="prereqs">
<h4>Những gì bạn cần</h4>

- Một tài khoản [Railway](https://railway.com) miễn phí
- Thẻ tín dụng đã đăng ký với Railway (khoảng $15–25/tháng cho một hội thánh nhỏ; xem [Chi phí](#costs))
- Khoảng 15 phút cho lần triển khai đầu tiên
- *Tùy chọn nhưng rất nên có sau này:* thông tin xác thực SMTP và tên miền tùy chỉnh

</div>

## Những gì được triển khai

Mẫu này tạo bốn dịch vụ trong một dự án Railway duy nhất:

| Dịch vụ | Mục đích | URL sau khi triển khai |
|---------|----------|------------------------|
| **MySQL** | Lưu trữ toàn bộ dữ liệu (một phiên bản, nhiều schema) | chỉ nội bộ |
| **Api** | Backend cho thành viên, nội dung, quyên góp, điểm danh, v.v. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Ứng dụng web dành cho nhân viên và quản trị | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Ứng dụng web dành cho thành viên và website nhà thờ | `https://b1app-<id>.up.railway.app` |

Các schema cơ sở dữ liệu được tạo tự động khi khởi chạy lần đầu bởi quá trình migration khi khởi động của API.

## Cấu hình lần đầu

Bây giờ hệ thống đã hoạt động, sau đây là những việc mà hầu hết nhà thờ thiết lập tiếp theo, theo thứ tự ưu tiên tương đối.

### 1. Email (Rất nên có)

Nếu không có email, thành viên vẫn có thể đăng ký và sử dụng hệ thống, nhưng **họ không thể đặt lại mật khẩu đã quên** — quản trị viên phải làm việc đó thay họ. Thiết lập SMTP mất khoảng 5 phút.

Trong bảng điều khiển Railway, mở dịch vụ **Api** → **Variables**, và thêm:

```
MAIL_SYSTEM=SMTP
SMTP_HOST=<máy chủ nhà cung cấp của bạn>
SMTP_USER=<tên đăng nhập của bạn>
SMTP_PASS=<mật khẩu hoặc API key của bạn>
SMTP_SECURE=false
SUPPORT_EMAIL=noreply@yourchurch.org
```

Có ba nhà cung cấp đáng để tìm hiểu:

#### Resend — lựa chọn miễn phí đơn giản nhất (100 email/ngày)

1. Đăng ký tại [resend.com](https://resend.com).
2. Xác minh một tên miền gửi (hoặc dùng người gửi thử nghiệm `onboarding@resend.dev` để bắt đầu).
3. Tạo một API key.
4. Đặt `SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=re_xxxxxxxxx`.

#### Gmail — miễn phí cho mục đích cá nhân (~500/ngày)

1. Bật xác thực hai yếu tố cho tài khoản Google.
2. Tạo [App Password](https://myaccount.google.com/apppasswords).
3. Đặt `SMTP_HOST=smtp.gmail.com`, `SMTP_USER=your-address@gmail.com`, `SMTP_PASS=<app password gồm 16 ký tự>`.

#### AWS SES — rẻ nhất khi quy mô lớn

1. Xác minh một tên miền gửi trong AWS.
2. Thoát khỏi chế độ sandbox của SES nếu bạn sẽ gửi đến các địa chỉ chưa được xác minh.
3. Tạo thông tin xác thực SMTP tại **SES → SMTP Settings → Create credentials**.
4. Đặt `SMTP_HOST=email-smtp.us-east-2.amazonaws.com`, `SMTP_USER=AKIA...`, `SMTP_PASS=<mật khẩu SMTP của SES>`.

Sau khi lưu các biến, dịch vụ Api sẽ tự động triển khai lại. Hãy kiểm tra bằng cách yêu cầu đặt lại mật khẩu trên một tài khoản thử nghiệm.

:::warning
Nếu bạn đặt `MAIL_SYSTEM=SMTP` với thông tin xác thực sai, việc đăng ký sẽ có vẻ thành công nhưng email xác minh sẽ không bao giờ đến. Hãy sửa thông tin xác thực hoặc xóa `MAIL_SYSTEM` để chuyển về chế độ không dùng email.
:::

### 2. Tên miền tùy chỉnh

Các URL mặc định `*.up.railway.app` vẫn hoạt động, nhưng hầu hết nhà thờ đều muốn có tên miền riêng.

Với mỗi dịch vụ web (B1Admin và B1App):

1. Mở dịch vụ trong Railway → **Settings** → **Networking**.
2. Nhấp **+ Custom Domain** và nhập tên máy chủ:
   - `admin.yourchurch.org` cho B1Admin
   - `app.yourchurch.org` (hoặc `www`) cho B1App
3. Thêm bản ghi CNAME mà Railway hiển thị vào nhà cung cấp DNS của bạn.
4. Đợi vài phút để DNS lan truyền. Railway sẽ tự động cấp chứng chỉ TLS.

Sau đó, cập nhật các biến của dịch vụ **Api** để các liên kết trong email sử dụng tên miền mới:

```
B1ADMIN_ROOT=https://admin.yourchurch.org
```

Và trên dịch vụ **B1Admin**:

```
REACT_APP_API_BASE=https://api.yourchurch.org   (nếu bạn cũng đặt tên miền API tùy chỉnh)
REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org
```

Mã thông báo `{subdomain}` là nguyên văn — nó sẽ được thay thế khi chạy bằng subdomain của từng nhà thờ (xem Multi-Site bên dưới).

### 3. Nhiều trang (nhiều nhà thờ trên một phiên bản)

ChurchApps được thiết kế theo kiến trúc đa tenant — một lần triển khai có thể chứa bất kỳ số lượng nhà thờ nào, mỗi nhà thờ có thành viên, nhóm và website riêng. Nhà thờ mới được thêm hoàn toàn qua giao diện quản trị; không cần thay đổi hạ tầng.

#### Thêm nhà thờ bổ sung

1. Trong **B1 Admin**, vào **Settings → Manage Church → Switch Church → Create New**.
2. Mỗi nhà thờ có một **slug subdomain** duy nhất (ví dụ: `firstchurch`, `gracecommunity`).
3. Nhà thờ mới sẽ có dữ liệu, thành viên, website và thiết lập quyên góp riêng, được tách biệt hoàn toàn với các nhà thờ khác trên cùng phiên bản.

#### Định tuyến mỗi nhà thờ đến URL riêng

Có hai cách để công khai các nhà thờ:

| Kiểu | Ví dụ | Thiết lập |
|------|-------|-----------|
| **Dựa trên đường dẫn** (hoạt động ngay) | `app.yourchurch.org/firstchurch` | Không cần thiết lập thêm |
| **Dựa trên subdomain** (URL gọn hơn) | `firstchurch.yourchurch.org` | DNS wildcard + tên miền tùy chỉnh wildcard |

Để định tuyến **dựa trên subdomain** trên Railway:

1. Trong nhà cung cấp DNS, tạo một CNAME wildcard: `*.yourchurch.org → <đích railway của b1app>`.
2. Trong Railway, trên dịch vụ B1App → **Settings → Networking**, thêm `*.yourchurch.org` làm tên miền tùy chỉnh.
3. Trên dịch vụ **B1Admin**, đặt `REACT_APP_B1_WEBSITE_URL=https://{subdomain}.yourchurch.org`.

Sau khi triển khai lại, website của mỗi nhà thờ sẽ tự động được phục vụ tại `<subdomain-của-họ>.yourchurch.org`.

:::info
Tên miền tùy chỉnh wildcard yêu cầu gói Railway trả phí. Định tuyến dựa trên đường dẫn hoạt động trên mọi gói và có chức năng tương đương — chỉ kém đẹp hơn trên thanh địa chỉ.
:::

### 4. Quyên góp trực tuyến (Stripe / PayPal)

Quyên góp được cấu hình **theo từng nhà thờ trong giao diện quản trị**, không qua biến môi trường — nhờ vậy mỗi nhà thờ có thể dùng tài khoản thương gia riêng.

1. Lấy thông tin xác thực nhà phát triển từ [Stripe](https://dashboard.stripe.com/) (Developers → API keys) hoặc [PayPal](https://developer.paypal.com/) (My Apps & Credentials).
2. Trong B1 Admin, vào **Settings → Giving Settings**.
3. Chọn nhà cung cấp, dán khóa Public và Secret, rồi cấu hình cách xử lý phí.
4. Tùy chọn: thêm `GOOGLE_RECAPTCHA_SECRET_KEY` vào dịch vụ **Api** trong Railway để bảo vệ các biểu mẫu quyên góp công khai khỏi bot.

### 5. Lưu trữ tệp

Mẫu này tạo một **volume lưu trữ bền vững 1 GB** được gắn vào dịch vụ Api, dùng cho ảnh thành viên, tệp bài giảng và tài liệu đã tải lên.

Để tăng dung lượng, mở dịch vụ Api → **Volumes** → điều chỉnh thanh trượt kích thước.

Với các triển khai lớn hơn (100+ GB hoặc nhiều tệp tải lên đồng thời), hãy chuyển sang S3 bằng cách đặt các biến sau trên dịch vụ **Api**:

```
FILE_STORE=S3
AWS_S3_BUCKET=<tên-bucket-của-bạn>
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_REGION=us-east-2
```

Các tệp hiện có trong volume sẽ không tự động chuyển sang. Hãy sao chép chúng vào bucket trước khi đổi biến.

### 6. Tích hợp tính năng tùy chọn

Các biến này mở khóa những tính năng cụ thể và đều có thể thêm sau qua bảng điều khiển Railway. Hãy đặt chúng trên dịch vụ **Api**.

| Biến | Tính năng được kích hoạt |
|------|--------------------------|
| `OPENAI_API_KEY` *hoặc* `OPENROUTER_API_KEY` | Tìm kiếm và gợi ý nội dung có hỗ trợ AI |
| `YOUTUBE_API_KEY` | Tìm kiếm và nhúng video bài giảng YouTube |
| `PEXELS_KEY` | Bộ chọn ảnh minh họa cho trình tạo website |
| `VIMEO_TOKEN` | Hỗ trợ bài giảng Vimeo |
| `API_BIBLE_KEY` | Tra cứu câu Kinh Thánh trong bài học và nội dung |
| `YOUVERSION_API_KEY` | Tích hợp Kinh Thánh YouVersion |
| `WEB_PUSH_PUBLIC_KEY` + `WEB_PUSH_PRIVATE_KEY` | Thông báo đẩy trên trình duyệt ([tạo cặp khóa VAPID](./docker#push-notifications)) |
| `HUBSPOT_KEY` | Đồng bộ CRM tùy chọn cho các đăng ký mới |

## Cập nhật

Mỗi dịch vụ được liên kết với kho GitHub tương ứng. Các lần push lên `main` của `ChurchApps/Api`, `ChurchApps/B1Admin` hoặc `ChurchApps/B1App` sẽ kích hoạt triển khai lại tự động.

Để cố định một phiên bản cụ thể, hãy đổi cài đặt **Branch** của mỗi dịch vụ sang một tag hoặc nhánh phát hành. Đây là thiết lập được khuyến nghị cho môi trường production — tự động triển khai từ `main` sẽ kéo theo cả những thay đổi đang dở dang.

## Chi phí

Mức chi phí thực tế cho một nhà thờ nhỏ (dưới 200 thành viên, lưu lượng truy cập thấp):

| Thành phần | Chi phí hàng tháng ước tính |
|------------|-----------------------------|
| Railway cơ bản | $5 |
| Plugin MySQL | $5 + ~$1 dung lượng lưu trữ |
| Tính toán cho 3 dịch vụ web | $3–10 tổng cộng |
| Volume 1 GB | $0.25 |
| **Tổng cộng** | **~$15–25/tháng** |

Chi phí tăng tuyến tính theo lưu lượng truy cập, số lượng ảnh tải lên và kích thước cơ sở dữ liệu. Railway hiển thị mức sử dụng trực tiếp trong tab **Usage** của dự án — hãy đặt giới hạn chi tiêu tại đó để kiểm soát rủi ro.

## Khắc phục sự cố

| Triệu chứng | Nguyên nhân có thể | Cách khắc phục |
|-------------|--------------------|----------------|
| Build thất bại với `EBUSY: rmdir '/app/node_modules/.cache'` | Xung đột mount cache của Nixpacks | Đặt `NIXPACKS_NO_CACHE=true` trên dịch vụ bị ảnh hưởng |
| Build thất bại trên B1Admin với `Missing: @types/...` | `package-lock.json` không đồng bộ | Kéo bản `main` mới nhất |
| Triển khai Api bị treo ở "Deploying" | Healthcheck thất bại — `/health` không trả về 200 | Xem nhật ký triển khai; thường là do thiếu một biến môi trường bắt buộc |
| B1Admin hiển thị "check your email" nhưng không có email nào đến | Đã đặt `MAIL_SYSTEM=SMTP` nhưng thông tin xác thực bị thiếu hoặc sai | Sửa thông tin xác thực, hoặc xóa `MAIL_SYSTEM` để tắt email |
| Đăng nhập chuyển hướng đến `api.churchapps.org` | `REACT_APP_STAGE` là `prod` | Đặt `REACT_APP_STAGE=custom` trên dịch vụ B1Admin |
| Tất cả các nhà thờ theo subdomain hiển thị cùng một nội dung | `REACT_APP_B1_WEBSITE_URL` không chứa mã thông báo `{subdomain}` | Đặt thành ví dụ `https://{subdomain}.yourchurch.org` |
| Tên miền tùy chỉnh hiển thị "Application not found" | DNS chưa lan truyền, hoặc chứng chỉ Railway đang chờ xử lý | Đợi 5 phút; kiểm tra DNS bằng `dig admin.yourchurch.org` |

Nếu bạn gặp vấn đề không có trong danh sách này, hãy mở một issue tại [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) và đính kèm nhật ký triển khai.

## Bài viết liên quan

- **[Tự lưu trữ với Docker](./docker)** — Cùng hệ thống trên phần cứng hoặc VPS của riêng bạn
- **[Thiết lập ban đầu](../../getting-started/initial-setup)** — Các bước đầu tiên sau khi nhà thờ của bạn được tạo
- **[Thiết lập website ban đầu](../../b1-admin/website/initial-setup)** — Cấu hình trang công khai của nhà thờ bạn
- **[Cài đặt quyên góp](../../b1-admin/donations/online-giving-setup)** — Kết nối Stripe hoặc PayPal
- **[Thiết lập API cục bộ](../api/local-setup)** — Chạy hệ thống trên máy cục bộ để phát triển
- **[Triển khai API (AWS)](./apis)** — Cách dịch vụ SaaS chính thức của ChurchApps được triển khai
