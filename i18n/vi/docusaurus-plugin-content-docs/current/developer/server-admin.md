---
title: "Quản trị máy chủ"
---

# Quản trị máy chủ

<div class="article-intro">

Các tính năng quản trị máy chủ trong ChurchApps chỉ dành cho người dùng có quyền **Server.Admin**. Các công cụ này dùng để vận hành nền tảng, hỗ trợ và xử lý sự cố cho tất cả các hội thánh trong hệ thống.

</div>

:::warning Truy cập bị hạn chế
Các tính năng trong trang này yêu cầu quyền **Server.Admin** và không dành cho quản trị viên hội thánh thông thường. Chúng chỉ dành cho người vận hành nền tảng và nhân viên hỗ trợ.
:::

## Truy cập Quản trị máy chủ

Người dùng có quyền Server.Admin có thể truy cập bảng quản trị máy chủ từ B1 Admin:

1. Đăng nhập tại [admin.b1.church](https://admin.b1.church)
2. Mở [menu Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), mở rộng **Settings** (Cài đặt), rồi nhấp **Server Admin** (Quản trị máy chủ). (Bạn cũng có thể truy cập trực tiếp `admin.b1.church/admin`.)
3. Bảng Quản trị máy chủ liệt kê các mục ở bên trái, chia thành ba nhóm: **Directory** (Danh bạ: Churches, Users, Impersonate User), **Operations** (Vận hành: Background Jobs, Commons, Usage Trends) và **System** (Hệ thống: Translation Lookups, Server Health, Database Migrations)

## Đặt lại xác minh hai bước

Nếu người dùng đã bật [xác minh hai bước](../b1-admin/profile/managing-profile.md#two-factor-sign-in) nhưng đã mất cả điện thoại lẫn mã dự phòng, quản trị viên máy chủ có thể tắt tính năng này:

1. Mở mục **Users** (Người dùng) trong bảng Quản trị máy chủ và tìm người dùng đó.
2. Những người dùng đã bật xác minh hai bước sẽ hiển thị huy hiệu **Two-factor on** (Đã bật xác minh hai bước). Nhấp **Reset 2FA** (Đặt lại 2FA) bên cạnh huy hiệu này.
3. Xác nhận trong hộp thoại. Chỉ thực hiện sau khi đã xác minh chắc chắn người bạn đang trao đổi là ai.

Sau đó, người dùng có thể đăng nhập chỉ bằng mật khẩu và thiết lập lại xác minh hai bước từ hồ sơ của họ. Các thao tác đặt lại được ghi vào nhật ký kiểm toán dưới dạng `mfa_reset`. Điểm cuối là `POST /membership/users/mfa/reset/:userId` và yêu cầu quyền Server.Admin.

## Mạo danh người dùng

Tính năng mạo danh cho phép quản trị viên máy chủ đăng nhập với tư cách một người dùng khác để hỗ trợ và xử lý sự cố. Tính năng này hữu ích khi điều tra các vấn đề do người dùng báo cáo hoặc khi giúp hội thánh cấu hình hệ thống.

### Cách mạo danh người dùng

1. Mở mục **Impersonate User** (Mạo danh người dùng) trong bảng Quản trị máy chủ.
2. Nhập tên hoặc địa chỉ email của người dùng vào ô tìm kiếm.
3. Nhấp **Search** (Tìm kiếm) hoặc nhấn Enter.
4. Trong kết quả tìm kiếm, nhấp vào người dùng bạn muốn mạo danh.
5. Xác nhận mạo danh trong hộp thoại xuất hiện.
6. Bạn sẽ đăng nhập với tư cách người dùng đó và được chuyển đến tài khoản của họ.

### Lưu ý quan trọng

- Mạo danh tạo một phiên mới với quyền và quyền truy cập hội thánh của người dùng mục tiêu.
- Phiên quản trị ban đầu của bạn sẽ kết thúc khi bạn mạo danh người dùng khác.
- Mọi thao tác thực hiện khi đang mạo danh đều được ghi lại trong nhật ký kiểm toán.
- Để quay lại tài khoản quản trị, hãy đăng xuất rồi đăng nhập lại bằng thông tin của bạn.
- Chỉ sử dụng tính năng mạo danh khi thực sự cần thiết cho việc hỗ trợ, và luôn thông báo cho người dùng khi bạn truy cập tài khoản của họ để hỗ trợ.

### Điểm cuối API

Tính năng mạo danh dựa trên điểm cuối `/users/:userId/impersonate` trong API Membership. Xem [Điểm cuối Membership](/docs/developer/api/endpoints/membership#users) để biết chi tiết kỹ thuật.

### Các cân nhắc về bảo mật

- Mạo danh yêu cầu quyền Server.Admin. Quyền này chỉ nên được cấp hạn chế và chỉ cho những người vận hành nền tảng đáng tin cậy.
- Mọi sự kiện mạo danh đều được ghi nhật ký cùng với ID của quản trị viên và ID của người dùng mục tiêu.
- Hội thánh không nhận được thông báo khi có mạo danh xảy ra, vì vậy hãy thiết lập chính sách rõ ràng về thời điểm và cách sử dụng tính năng này.
- Cân nhắc ghi lại các sự kiện mạo danh trong hệ thống phiếu hỗ trợ của bạn để đảm bảo trách nhiệm giải trình.

## Kiểm duyệt Commons

Commons là hàng đợi kiểm duyệt dùng chung cho nội dung do người dùng gửi lên giữa các sản phẩm. Bài hát WorshipCommons, bài học Lessons.church, mẫu FreeShow và mẫu trang web của trình tạo website B1 đều đi qua cùng một hàng đợi, thay vì mỗi sản phẩm có một công cụ duyệt riêng.

### Truy cập Commons

1. Mở tab **Commons** trong bảng Quản trị máy chủ.
2. Bạn sẽ thấy ba tab con: **Queue** (Hàng đợi), **Reports** (Báo cáo) và **Assets** (Tài nguyên).

Vai trò **trình chỉnh sửa nhạc** hạn chế cũng có thể xem tab Queue, nhưng không được phép phê duyệt các gửi duyệt làm thay đổi quyền hoặc giấy phép của một bài hát.

### Hàng đợi

Queue liệt kê mọi gửi duyệt đang chờ xử lý trên tất cả các sản phẩm, có thể lọc theo sản phẩm và loại tài nguyên. Mỗi dòng cho biết gửi duyệt đó là tài nguyên mới, bản chỉnh sửa của chính tác giả gốc hay bản chỉnh sửa của bên thứ ba. Dòng cũng hiển thị lịch sử phê duyệt của người gửi và thời gian đã chờ (được đánh dấu khi vượt quá 72 giờ).

Nhấp **Review** (Xem xét) để mở một ngăn trượt với so sánh thay đổi theo từng trường, bản xem trước tệp và bản xem trước chỉ đọc của mục đó. Dùng phím tắt **a**/**r** để phê duyệt hoặc từ chối, và **j**/**k** để chuyển đến gửi duyệt tiếp theo hoặc trước đó mà không cần rời khỏi ngăn trượt. Khi từ chối, bạn phải chọn một lý do (ví dụ: chất lượng, trùng lặp, giấy phép, ccli, ai hoặc không liên quan) và ghi chú.

### Báo cáo

Tab Reports xử lý các báo cáo về bản quyền và chính sách/chất lượng được gửi cho những tài nguyên đã xuất bản. Báo cáo được chia thành các hàng đợi riêng là Copyright (Bản quyền) và Policy & Other (Chính sách & Khác), cùng với lịch sử Resolved (Đã giải quyết). Nhận một báo cáo để bắt đầu xử lý, sau đó giải quyết bằng một kết quả (upheld - giữ nguyên, dismissed - bác bỏ, hoặc duplicate - trùng lặp) và một hành động (none - không làm gì, unpublish - gỡ xuất bản, hoặc remove - xóa).

### Tài nguyên

Tab Assets là trình duyệt có thể tìm kiếm nội dung đã xuất bản, với các thao tác **Feature** (Đưa lên nổi bật, hiển thị tài nguyên trên trang chủ của sản phẩm), **Unpublish** (Gỡ xuất bản) / **Republish** (Xuất bản lại), hoặc **Remove** (Xóa, kèm lý do bản quyền hoặc chính sách).

Riêng với bài hát, đây cũng là nơi một bài hát trở thành **sẵn sàng cho Chủ nhật** và đủ điều kiện xuất hiện trong tìm kiếm bài hát của B1 Admin của hội thánh. Người duyệt mở tài nguyên và đánh dấu từng tông đã xuất bản là **Đã nghe** sau khi nghe hết bài và xác nhận đầy đủ bản nhạc, hợp âm và slide. Một bài hát chỉ trở thành sẵn sàng cho Chủ nhật khi tất cả các tông đều đã được đánh dấu.

:::info
Việc kiểm duyệt Commons chỉ dành cho nhân viên nội bộ. Các hội thánh riêng lẻ không bao giờ thấy hàng đợi này. Nơi duy nhất mà B1 Admin của một hội thánh tiếp xúc với dữ liệu Commons là phần "WorshipCommons — miễn phí" trong [tìm kiếm bài hát](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), và phần này chỉ hiển thị những bài hát đã qua quy trình duyệt này.
:::

Xem trang [Kiến trúc Content Commons](/docs/developer/architecture/commons) để biết mô hình dữ liệu nền tảng và vòng đời gửi duyệt.

## Phê duyệt email nhóm

Các hội thánh không thể gửi email do hội thánh soạn (email nhóm, thư theo dõi biểu mẫu, email quy trình và lời mời tài khoản) cho đến khi quản trị viên máy chủ phê duyệt. Điều này giúp ngăn các hội thánh đăng ký qua bot sử dụng địa chỉ gửi chung của ChurchApps để gửi thư rác.

1. Mở tab **Churches** (Hội thánh) trong bảng Quản trị máy chủ.
2. Mỗi hội thánh có một nhãn **Group Email** (Email nhóm): **Approved** (Đã phê duyệt, màu xanh lá) hoặc **Not approved** (Chưa phê duyệt, viền ngoài).
3. Nhấp vào nhãn và xác nhận để phê duyệt hội thánh hoặc thu hồi phê duyệt.

Nhân viên hội thánh yêu cầu phê duyệt bằng nút **Request review** (Yêu cầu xem xét) trong hộp thoại Send Email của B1 Admin. Yêu cầu sẽ được gửi qua email đến địa chỉ hỗ trợ, bao gồm tên hội thánh, ID, ngày đăng ký, vị trí và người yêu cầu. Mỗi hội thánh chỉ được gửi một yêu cầu mỗi tuần. Xem [Giới hạn email do hội thánh soạn](/docs/developer/architecture/notifications#church-authored-email-limits) để biết hạn mức email hằng ngày và cơ chế tạm dừng tự động khi có email bị trả lại hoặc khiếu nại.

## Di chuyển cơ sở dữ liệu

Quy trình **Deploy Prod** tự áp dụng các bản di chuyển đang chờ xử lý. Các cơ sở dữ liệu được lưu trữ chỉ chấp nhận kết nối từ bên trong mạng của Api, nên runner GitHub không thể truy cập được. Thay vào đó, ngay sau `serverless deploy`, quy trình sẽ gọi hàm Lambda `migrate` của Api (`api-Prod-migrate`). Hàm này chạy các bản di chuyển đang chờ của mọi module bằng cùng trình thực thi với tab này, và làm thất bại việc triển khai nếu có module nào gặp lỗi hoặc bị từ chối. **Rollback Prod** chỉ hoàn tác mã Lambda; các bản di chuyển đã áp dụng vẫn được giữ nguyên. Tab **Database Migrations** dùng để kiểm tra trạng thái, chạy những bản di chuyển mà quy trình triển khai không chạy (ví dụ trên môi trường demo, nơi quy trình triển khai không thực hiện di chuyển), và ghi nhận các module chưa có lịch sử. (Các cài đặt Docker tự lưu trữ vẫn tự động chạy di chuyển khi container Api khởi động.)

Tab hiển thị môi trường hiện tại và một dòng cho mỗi module (membership, attendance, giving, v.v.) cùng trạng thái, số lượng bản di chuyển đã áp dụng và đang chờ, cũng như bản di chuyển được áp dụng gần nhất.

- **Run Pending Migrations** (Chạy các bản di chuyển đang chờ) áp dụng mọi bản di chuyển đang chờ, từng module một, theo đúng thứ tự. Quy trình dừng ở lỗi đầu tiên và hiển thị những gì đã được áp dụng cho từng module.
- Module được đánh dấu **No history** (Chưa có lịch sử) có cơ sở dữ liệu cũ hơn thời điểm bắt đầu theo dõi di chuyển. Module này không bao giờ được chạy tự động, vì làm vậy sẽ phát lại các bản di chuyển dữ liệu cũ trên các bảng đang hoạt động. Thay vào đó, hãy nhấp **Check Schema** (Kiểm tra lược đồ) trên module đó. Api sẽ so sánh các bảng, cột và chỉ mục mà mỗi bản di chuyển tạo ra với cơ sở dữ liệu hiện tại, rồi đánh dấu từng bản di chuyển là **Already applied** (Đã áp dụng), **Missing** (Thiếu), **Partly applied** (Áp dụng một phần) hoặc **Data only** (Chỉ dữ liệu). Thao tác kiểm tra không thay đổi gì cả.
- Trong kết quả kiểm tra, **Record as Already Applied** (Ghi nhận là đã áp dụng) sẽ ghi các bản di chuyển được phát hiện vào lịch sử di chuyển mà không chạy chúng (sau khi xác nhận). Mọi bản di chuyển cho đến bản di chuyển **Already applied** cuối cùng đều được ghi nhận, bao gồm cả các bản **Data only** nằm trong phạm vi đó. Các bản **Missing** vẫn ở trạng thái chờ và sau đó có thể được chạy bình thường bằng **Run Pending Migrations**.
- Bản di chuyển **Partly applied** sẽ chặn việc ghi nhận. Nếu bản di chuyển đó an toàn để chạy lại (hãy đọc nội dung trước), hãy chọn **Re-run** (Chạy lại) để nó vẫn ở trạng thái chờ và được chạy lại từ đầu.

Bảng Quản trị máy chủ và CLI (`yarn migrate:up`) dùng cùng một trình di chuyển Kysely và bảng `kysely_migration`, nên luôn thống nhất về những bản di chuyển đã được áp dụng. Các điểm cuối hỗ trợ gồm `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` và `POST .../:module/baseline`, tất cả chỉ dành cho Server.Admin.

## Trang liên quan

- [Xác thực & Quyền](/docs/developer/api/endpoints/authentication) — Mô hình quyền và xác thực JWT
- [Điểm cuối Membership](/docs/developer/api/endpoints/membership) — API quản lý người dùng và hội thánh
- [Nhật ký kiểm toán](/docs/b1-admin/reports/audit-log) — Xem nhật ký hoạt động của một hội thánh
- [Kiến trúc Content Commons](/docs/developer/architecture/commons) — Mô hình tài nguyên dùng chung và vòng đời kiểm duyệt
