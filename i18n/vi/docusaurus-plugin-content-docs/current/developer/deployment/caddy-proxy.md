---
title: "Proxy tên miền tùy chỉnh Caddy"
description: "Xây dựng và chạy reverse proxy Caddy phục vụ tên miền nhà thờ tùy chỉnh cho trang B1.church, gồm chứng chỉ TLS, ánh xạ host và các lỗi thường gặp."
---

# Proxy tên miền tùy chỉnh Caddy

<div class="article-intro">

Tên miền tùy chỉnh của nhà thờ (`mychurch.org` → trang web B1 của nhà thờ) đi qua một máy EC2 Windows duy nhất chạy Caddy. Máy này quản lý các chứng chỉ TLS, phân giải mỗi tên miền thành trang `{sub}.b1.church` tương ứng, và chuyển tiếp ngược (reverse-proxy) với header Host đã được viết lại. Toàn bộ cấu hình gồm hai tệp: một `Caddyfile` tĩnh và một `hosts.map` được làm mới từ Membership API. Nhờ vậy máy không giữ trạng thái runtime nào và vẫn hoạt động đúng sau khi khởi động lại. Trang này hướng dẫn cách dựng máy từ đầu, cách vận hành, và các lưu ý đã được kiểm chứng thực tế mà bất kỳ ai dựng lại máy này cũng sẽ gặp.

</div>

Về cách một yêu cầu được ánh xạ tới nhà thờ/trang web khi đã đến B1App, xem [Định tuyến trang web & Đa trang](../architecture/websites.md).

## Các thành phần

| Thành phần | Mô tả |
|---|---|
| EC2 instance | Windows Server; Elastic IP **`3.23.251.61`** (được cấu hình trong DNS của các nhà thờ trên toàn thế giới — IP này cố định, còn instance thì có thể thay thế) |
| `C:\caddy\caddy.exe` | Bản build Caddy **tùy chỉnh** với module lưu trữ `techknowlogick/certmagic-s3` — Caddy chuẩn không thể đọc kho chứng chỉ |
| `C:\caddy\Caddyfile` | Toàn bộ cấu hình proxy: TLS theo yêu cầu, `map` từ host đến upstream, chuyển hướng www→apex, `:80`→https |
| `C:\caddy\hosts.map` | Mỗi tên miền có thể định tuyến một dòng `{domain} {sub}.b1.church`, được import vào khối `map` của Caddyfile |
| `sync-hostmap.ps1` + tác vụ `CaddyHostmapSync` | Tác vụ theo lịch (mỗi 5 phút và khi khởi động, chạy với quyền SYSTEM) làm mới `hosts.map` từ API và tải lại Caddy một cách êm ái chỉ khi có thay đổi |
| Dịch vụ Windows `caddy` (wrapper WinSW) | Chạy `caddy.exe run --config C:\caddy\Caddyfile --adapter caddyfile`; tự khởi động lại khi lỗi. Caddy không tích hợp với SCM, nên cần có wrapper |
| Bucket S3 `churchapps-caddy-certs` | Kho chứng chỉ dùng chung (`region us-east-2`, prefix `certs`) — chứng chỉ vẫn còn khi dựng lại instance |
| Vai trò IAM `CaddyRole` | Cấp quyền truy cập S3 cho instance; Caddy dùng chuỗi credential mặc định của AWS (không có khóa trong cấu hình) |

## Hai endpoint API mà máy phụ thuộc vào

Cả hai đều nằm trên Membership API. `authorize` không yêu cầu xác thực; `hostmap` yêu cầu header `x-internal-key: <INTERNAL_API_KEY>` kể từ Api PR #67 (2026-08-16) — `sync-hostmap.ps1` đọc khóa này từ `C:\caddy\internal-key.txt`:

| Endpoint | Vai trò |
|---|---|
| `GET /membership/domains/authorize?domain={host}` | **Cổng `ask` cho TLS theo yêu cầu** của Caddy: trả về `200 {"authorized":true}` khi host (hoặc, với host bắt đầu bằng `www.`, apex của nó) có trong bảng `domains`; trả về `404` trong các trường hợp còn lại. Đây là cơ chế kiểm soát lạm dụng — Caddy sẽ không cấp chứng chỉ cho host mà endpoint này từ chối |
| `GET /membership/domains/hostmap` | Yêu cầu `x-internal-key` (hoặc JWT quản trị máy chủ). Trả về `text/plain`, các dòng `{domain} {sub}.b1.church` đã sắp xếp và loại trùng lặp (có nhận biết site: tên miền được gán cho site phụ sẽ trỏ đến subdomain của site đó). Đây là nguồn của `map` |

## Luồng xử lý yêu cầu

1. Trình duyệt phân giải `mychurch.org` → `3.23.251.61` (bản ghi `A` của apex, hoặc `CNAME proxy.b1.church`).
2. Caddy kết thúc TLS. Nếu chứng chỉ có sẵn trong S3 → phục vụ; nếu SNI không xác định → hỏi `authorize`; 200 → cấp theo yêu cầu qua Let's Encrypt; 404 → **bắt tay TLS bị từ chối** (không có chứng chỉ, không có phản hồi — host không xác định sẽ bị từ chối ở tầng TLS, không phải lỗi HTTP).
3. `map` phân giải Host thành `{sub}.b1.church`; `www.{apex}` nhận chuyển hướng 302 về apex; một host đã được ủy quyền nhưng chưa có trong map (tên miền mới trong khoảng thời gian đồng bộ tối đa 5 phút) nhận lỗi 404 rõ ràng.
4. `reverse_proxy` kết nối đến `{sub}.b1.church:443` với SNI và Host được viết lại thành upstream, để edge của Vercel phục vụ trang B1App.
   Caddy cũng gửi tên miền gốc của khách truy cập dưới dạng `X-Church-Host` (Vercel ghi đè `X-Forwarded-Host` bằng Host đã viết lại). Middleware của B1App chỉ chấp nhận header này khi `/domains/public/lookup/{host}` ánh xạ nó tới cùng `{sub}` với host của yêu cầu, sau đó đưa nó ra dưới dạng `x-public-host` để dùng cho header `Link` chuẩn, `robots.txt` và `sitemap.xml`; header `x-public-host` do client gửi luôn bị loại bỏ. `ChurchJsonLd` của Schema.org vẫn dùng URL `b1.church` (đọc header ở đây sẽ khiến trang trở thành động).
5. Cổng 80 xử lý thử thách ACME HTTP-01 và chuyển hướng 308 mọi yêu cầu khác sang https.

Lan truyền tên miền mới: tên miền được lưu trong B1Admin sẽ có thể định tuyến trong khoảng 5 phút (tác vụ đồng bộ); chứng chỉ của nó được cấp ở lần truy cập HTTPS đầu tiên.

## Dựng máy từ đầu

Tóm tắt từ quy trình đã được kiểm chứng thực tế. Hướng dẫn đầy đủ từng bước với các lệnh sao chép-dán nằm trong không gian làm việc vận hành, không nằm trong repo này. Các điều kiện tiên quyết phải được hoàn tất trước — nếu thiếu chúng, việc dựng máy sẽ không thành công:

1. **IAM**: gắn `CaddyRole` (quyền S3 đến bucket chứng chỉ) vào instance. Xác minh qua IMDSv2 từ máy — lưu ý rằng một yêu cầu GET IMDS đơn thuần trả về 401 chỉ có nghĩa là IMDSv2 đang được bắt buộc, không phải là "không có vai trò".
2. **Tình trạng API**: `authorize` phải trả về 404 với một tên miền giả, và `hostmap` (kèm header `x-internal-key`) phải trả về 200, trước khi làm bất cứ việc gì khác.

Sau đó:

3. **Binary**: tải bản build tùy chỉnh từ dịch vụ build của Caddy: `https://caddyserver.com/api/download?os=windows&arch=amd64&p=github.com/techknowlogick/certmagic-s3` (khoảng 57 MB so với khoảng 45 MB của bản chuẩn; v2.11.4 tại thời điểm viết). Việc chọn module rất quan trọng: `techknowlogick/certmagic-s3` dùng các khóa `bucket`/`region`/`prefix` khớp với cấu trúc chứng chỉ hiện có; còn nhánh `ss098` dùng `host`/`endpoint` và **sẽ không tìm thấy** các chứng chỉ hiện có.
4. **Tệp**: đặt `Caddyfile` + `sync-hostmap.ps1` + `internal-key.txt` (`INTERNAL_API_KEY` của môi trường production, một dòng) vào `C:\caddy\`; khởi tạo map một lần bằng `sync-hostmap.ps1 -NoReload`.
5. **Các cổng kiểm tra trước lần khởi động đầu tiên**: `caddy list-modules` phải hiển thị module lưu trữ s3; `caddy adapt` phải xuất `"module":"s3","bucket":"churchapps-caddy-certs","region":"us-east-2","prefix":"certs"` trong khối storage; `caddy validate` phải đạt.
6. **Dịch vụ**: cài đặt qua WinSW (service id `caddy`, tự khởi động lại khi lỗi, log xoay vòng). Chạy dưới LocalSystem, tài khoản này truy cập được IMDS để lấy credential của vai trò.
7. **Tác vụ đồng bộ**: đăng ký `CaddyHostmapSync` (SYSTEM, mỗi 5 phút và khi khởi động, giới hạn thời gian thực thi 4 phút).
8. **Kiểm tra trước khi chuyển đổi**: buộc phân giải các tên miền về `127.0.0.1` bằng `curl --resolve` (máy chưa nhận lưu lượng thật cho đến khi EIP được chuyển sang): một tên miền hiện có phải được phục vụ với chứng chỉ hợp lệ được chuyển sang; `www.` phải nhận 302; một host không xác định phải bị từ chối ở tầng TLS; và `Restart-Service caddy` phải khởi động lại và tiếp tục phục vụ **mà không cần khởi tạo lại thủ công** — bài kiểm tra khởi động lại này chính là lý do tồn tại của thiết kế tĩnh.
9. **Đưa vào hoạt động**: gắn lại Elastic IP `3.23.251.61` cho instance mới. DNS của nhà thờ không bao giờ thay đổi.

## Các lưu ý đã được kiểm chứng thực tế (đã học từ kinh nghiệm — không được làm lại sai)

| Lưu ý | Triệu chứng | Cách khắc phục |
|---|---|---|
| `tls_server_name {vars.upstream}` trong transport của reverse_proxy | Mọi tên miền được proxy đều bị 502: các placeholder của map được phân giải thành rỗng **tại thời điểm kết nối TLS** ("either ServerName or InsecureSkipVerify must be specified") | Dùng placeholder gốc của transport: `tls_server_name {http.reverse_proxy.upstream.host}` |
| Khóa trùng lặp hoặc dòng rác trong `hosts.map` | Bộ xử lý `map` của Caddy **báo lỗi nghiêm trọng khi trùng khóa đầu vào** — một dòng lỗi có thể làm sập toàn bộ cấu hình | Script đồng bộ chuẩn hóa khoảng trắng, loại bỏ các dòng sai định dạng (chỉ từ chối toàn bộ nếu hơn 20% dòng bị lỗi), loại trùng lặp theo nguyên tắc giữ dòng đầu tiên, và ghi tệp UTF-8 **không có BOM** (BOM sẽ làm hỏng khóa map đầu tiên). API cũng lọc các dòng tên miền rỗng hoặc có khoảng trắng ngay từ nguồn |
| `Register-ScheduledTask -RepetitionDuration ([TimeSpan]::MaxValue)` | Việc đăng ký tác vụ **thất bại âm thầm** (XML ngoài phạm vi, lỗi không dừng) | Tạo phần lặp lại dưới dạng instance CIM `MSFT_TaskRepetitionPattern` với `Interval = "PT5M"` và không có duration; thêm `ExecutionTimeLimit` 4 phút (lần chạy SYSTEM đầu tiên có thể bị treo khi tra cứu TLS/CRL lạnh) |

:::warning
Admin API chỉ lắng nghe trên `localhost:2019`. Chế độ runtime cũ đã mở API này từ xa để Membership API có thể đẩy cấu hình route; thiết kế tĩnh không cần đẩy từ xa, và việc thu hẹp bề mặt tấn công là có chủ đích. `caddy reload` (được script đồng bộ chạy cục bộ) là người dùng duy nhất của admin API.
:::

:::info Đẩy cấu hình runtime kiểu cũ
`CaddyHelper` trong API (cùng các endpoint `/membership/domains/caddy` + `/caddy/init`) vẫn tồn tại như đường quay lui về chế độ cấu hình runtime cũ. Chúng được lên kế hoạch xóa sau khi máy tĩnh hoạt động ổn định trong vài tuần — sau đó, `authorize` + `hostmap` sẽ là các điểm tích hợp duy nhất.
:::

## Vận hành

- **Log**: log xoay vòng của WinSW trong `C:\caddy\` (stdout/stderr của dịch vụ — lỗi reverse-proxy nằm trong `caddy-service.err.log`); lịch sử đồng bộ trong `C:\caddy\sync-hostmap.log`.
- **Buộc làm mới map**: `Start-ScheduledTask -TaskName CaddyHostmapSync`.
- **Thay đổi cấu hình**: sửa `C:\caddy\Caddyfile`, sau đó chạy `caddy validate` + `caddy reload` (hoặc `Restart-Service caddy` — khởi động lại là an toàn theo thiết kế).
- **Xóa hàng loạt tên miền** sẽ kích hoạt cơ chế bảo vệ thu nhỏ của script đồng bộ theo thiết kế; hãy chuyển `hosts.map` cũ sang một nơi khác và chạy lại tác vụ để chấp nhận việc thu nhỏ lớn có chủ đích.
- **Hướng dẫn DNS cho nhà thờ không thay đổi mãi mãi**: bản ghi `A` apex `3.23.251.61` hoặc `CNAME proxy.b1.church`.

## Trang liên quan

- [Định tuyến trang web & Đa trang](../architecture/websites.md) — cách yêu cầu được proxy được phân giải thành nhà thờ/trang web trong B1App
- [Triển khai API](./apis.md) — triển khai Membership API phục vụ `authorize`/`hostmap`
