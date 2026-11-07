---
title: "Tên miền tùy chỉnh"
---

# Tên miền tùy chỉnh

<div class="article-intro">

Bạn có thể trỏ tên miền riêng (ví dụ **`www.yourchurch.org`**) đến trang B1 của mình, để khách truy cập vào địa chỉ web thực của hội thánh thay vì địa chỉ mặc định yourchurch.b1.church.

</div>

## Video hướng dẫn

<YouTube id="L5yaDusHts8" title="Kết nối tên miền tùy chỉnh trong B1" next="Thiết lập phát trực tiếp trong B1" nextUrl="/docs/b1-admin/sermons/live-streaming" />

## Bước 1 — Thêm bản ghi DNS trước

Trước khi thêm tên miền vào B1, bạn cần trỏ tên miền đến máy chủ của B1 tại nhà cung cấp tên miền (GoDaddy, Namecheap, Cloudflare, v.v.).

Thêm một trong các bản ghi sau — nên dùng CNAME:

| Loại | Host | Giá trị |
|------|------|---------|
| CNAME | `www` | `proxy.b1.church` |
| A | `yourchurch.org` | `3.23.251.61` |

Dùng **CNAME** cho địa chỉ `www`. Dùng **bản ghi A** nếu nhà cung cấp của bạn không hỗ trợ CNAME trên tên miền gốc (không có www), hoặc nếu bạn muốn tên miền gốc cũng hoạt động.

Các thay đổi DNS có thể mất từ vài phút đến vài giờ để có hiệu lực.

## Bước 2 — Thêm tên miền trong B1

Khi DNS đã trỏ đến B1:

1. Vào **Settings** (Cài đặt) trong B1 Admin.
2. Nhấp **Domains** (Tên miền) trong danh sách bên trái, sau đó nhấp **Edit** (Chỉnh sửa) trong mục **Domains**.
3. Nhập tên miền của bạn vào ô và nhấp **Save** (Lưu).

Bạn không cần nhấp nút **+** trước — tên miền đã nhập trong ô sẽ được thêm khi bạn lưu. Dùng **+** (hoặc nhấn **Enter**) khi bạn muốn thêm nhiều tên miền vào danh sách trước khi lưu.

B1 tự động xử lý SSL — không cần mua chứng chỉ.

:::warning
Nếu bạn thêm tên miền vào B1 trước khi các bản ghi DNS được thiết lập, tên miền sẽ không được lưu. Luôn thiết lập DNS trước.
:::

## Kiểm tra hoạt động

Sau khi lưu, hãy truy cập tên miền của bạn trên trình duyệt. Nếu trang B1 của bạn hiển thị, bạn đã hoàn tất. Nếu thấy lỗi, DNS có thể vẫn đang lan truyền — hãy đợi vài phút rồi thử lại.

Bạn cũng có thể kiểm tra việc lan truyền DNS tại [dnschecker.org](https://dnschecker.org) — tìm tên miền của bạn và xem bản ghi CNAME hoặc A của bạn đã xuất hiện chưa.
