---
title: "Kho nội dung chung"
---

# Kho nội dung chung — Thư viện tài nguyên dùng chung & kiểm duyệt

Nội dung do người dùng gửi lên để chia sẻ giữa các sản phẩm (bài hát WorshipCommons, bài học Lessons.church, mẫu FreeShow, mẫu website B1) đều đi qua cùng một hàng đợi kiểm duyệt thay vì quy trình duyệt riêng cho từng sản phẩm. Trang này mô tả vòng đời gửi và phê duyệt, mô hình dữ liệu tài nguyên dùng chung, và nơi diễn ra việc kiểm duyệt.

## Cấu trúc cốt lõi của tài nguyên

Hai bảng chứa mọi mục trong kho chung, bất kể sản phẩm nào:

- **`assets`** — dòng định danh công khai của tài nguyên. `status`: `pending` | `published` | `unpublished` | `removed`. Dữ liệu riêng theo loại (chi tiết bài hát, tác giả) nằm trong các bảng phụ được nối qua `assetId`.
- **`assetFiles`** — mọi tệp đính kèm vào tài nguyên (âm thanh, hình ảnh, tài liệu), thay thế các cột `path` và `files` (phân tách bằng dấu phẩy) cũ trên từng bảng nội dung riêng lẻ.
- **`submissions`** — đơn vị kiểm duyệt. Vòng đời: `draft → pending → approved | rejected | withdrawn`. Một đơn gửi có thể là tài nguyên mới hoàn toàn hoặc là bản chỉnh sửa một tài nguyên đã xuất bản (bởi tác giả gốc hoặc bên thứ ba).

Khi một đơn gửi được phê duyệt, một **publish hook** riêng cho từng sản phẩm (`Api/src/modules/commons/helpers/publishHooks/`, ví dụ `song.ts`) sẽ chạy để biến đơn gửi thành các bản ghi của chính sản phẩm đó.

## Quy trình gửi

`CommonsSubmissionController` (`Api/src/modules/commons/`) là API dành cho người dùng cuối: tạo bản nháp, tạo URL ký trước và đính kèm tệp, gửi để xem xét, hoặc rút lại. Các client thực tế của API này là các trang sản xuất bên ngoài (trang WorshipCommons, Lessons.church, FreeShow, thư viện mẫu website B1), chứ không phải B1Admin.

## Cách nhà thờ sử dụng

Ngoài việc kiểm duyệt, B1Admin cũng đọc trực tiếp từ cấu trúc cốt lõi của kho chung: chức năng "Thêm bài hát" trong Serving → Songs tìm kiếm qua `GET /songs?sundayReady=true` song song với cơ sở dữ liệu bài hát bên ngoài hiện có, hiển thị các bài hát WorshipCommons đã xuất bản mà nhân viên đánh dấu là sẵn sàng cho Chúa nhật (xem cổng nghe bên dưới), kèm huy hiệu giấy phép. Khi chọn một bài, `SongDetail` mới sẽ được liên kết ngược về nguồn gốc qua `songDetailLinks`. Đây là đường dẫn duy nhất mà B1Admin của một nhà thờ cụ thể tiếp xúc trực tiếp với dữ liệu kho chung, thay vì thông qua các công cụ Server Admin chỉ dành cho nhân viên. Xem phần [Bài hát miễn phí từ WorshipCommons](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons) trong tài liệu hỗ trợ để biết mô tả dành cho nhà thờ.

## Hàng đợi kiểm duyệt

Hàng đợi nằm trong **B1Admin → Server Admin → Commons** (`B1Admin/src/serverAdmin/components/CommonsTab.tsx`), được bảo vệ bởi quyền `Permissions.server.admin` — cùng quyền đang bảo vệ Churches/Impersonate/Jobs trên trang đó. Đây là công cụ nội bộ chỉ dành cho nhân viên ChurchApps, không phải thứ mà các nhà thờ riêng lẻ nhìn thấy.

Có ba tab con:

- **Queue** — mọi đơn gửi đang chờ trên tất cả sản phẩm, có thể lọc theo sản phẩm/loại tài nguyên. Mỗi dòng hiển thị huy hiệu cho biết là tài nguyên mới, chỉnh sửa bởi tác giả, hay chỉnh sửa bởi bên thứ ba; lịch sử phê duyệt của người gửi; bản tóm tắt chênh lệch trường và tệp; và thời gian chờ (được đánh dấu khi quá 72 giờ). **Review** mở một ngăn trượt với chênh lệch từng trường, bản xem trước tệp, và bản xem trước sản phẩm chỉ đọc được nhúng sẵn; nút Approve/Reject hỗ trợ phím tắt (j/k để di chuyển, a/r để thực hiện).
- **Reports** — báo cáo về bản quyền và chính sách/chất lượng đối với tài nguyên đã xuất bản, chia thành hai hàng đợi cùng lịch sử các báo cáo đã xử lý. Nhân viên nhận một báo cáo, sau đó xử lý bằng một kết quả (giữ nguyên/bác bỏ/trùng lặp) và một hành động (không làm gì/gỡ xuất bản/xóa).
- **Assets** — trình duyệt có thể tìm kiếm nội dung đã xuất bản, với các thao tác cho từng tài nguyên: đặt nổi bật, gỡ xuất bản/xuất bản lại, hoặc xóa (lý do: bản quyền/chính sách). Đối với bài hát, **cổng nghe** tại đây là cách một bài hát trở thành "sẵn sàng cho Chúa nhật": nhân viên đánh dấu sau khi đã nghe hết mọi tông đã xuất bản và xác nhận bản nhạc, hợp âm và slide đều đầy đủ.

Mỗi endpoint dưới `/commons/admin/*` (`CommonsAdminController.ts`) đều tự kiểm tra lại quyền server-admin một cách độc lập.

:::info
Thiết kế này cố ý chỉ có một hàng đợi duy nhất: giao diện kiểm duyệt `/admin` riêng của WorshipCommons đã được gỡ bỏ, để mọi đơn gửi từ tất cả sản phẩm đều đi qua công cụ Server Admin của B1Admin.
:::

## Phạm vi

Api (module commons), B1Admin (Server Admin), và các trang sản xuất bên ngoài: WorshipCommons, Lessons.church, FreeShow, và các mẫu trình tạo website B1.
