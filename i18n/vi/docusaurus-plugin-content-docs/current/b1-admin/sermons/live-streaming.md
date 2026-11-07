---
title: "Thời gian và cài đặt phát trực tiếp trong B1 Admin"
sidebar_label: "Phát trực tiếp"
description: "Lên lịch phát trực tiếp hằng tuần hoặc một lần, cài đặt thời gian trò chuyện và video sớm, kết nối kênh YouTube và khắc phục lỗi nhúng trong B1 Admin."
---

# Phát trực tiếp

<div class="article-intro">

Trang Live Stream Times cho phép bạn cấu hình lịch phát trực tiếp của nhà thờ, quản lý giờ thờ phượng và tùy chỉnh trải nghiệm người xem. Thiết lập các buổi lễ định kỳ hằng tuần hoặc sự kiện một lần, cấu hình cài đặt trò chuyện và video, rồi kiểm soát thời điểm luồng phát trực tiếp bắt đầu.

</div>

## Video hướng dẫn

<YouTube id="tpEY-sEYW6A" title="Thiết lập phát trực tiếp trong B1" next="Tùy chỉnh ứng dụng thành viên của nhà thờ trong B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần quyền **contentApi.streamingServices.edit**. Xem [Vai trò & Quyền hạn](../settings/roles-permissions.md) nếu bạn chưa có quyền truy cập.
- Chuẩn bị sẵn YouTube Channel ID nếu bạn dự định dùng tính năng phát trực tiếp tự động
- Thêm ít nhất một [bài giảng](./managing-sermons.md) hoặc URL trực tiếp cố định để làm nguồn phát

</div>

Phát trực tiếp được quản lý từ hai trang trong mục **Sermons** của menu Jump: **Live Stream Times** để quản lý lịch phát trực tiếp và **Settings** để cấu hình các tab trên trang phát trực tiếp của bạn.

## Quản lý các buổi lễ

### Thêm buổi lễ

1. Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), mở rộng **Sermons**, rồi nhấp **Live Stream Times**.
2. Nhấp nút **Add Service** ở đầu trang để tạo buổi lễ theo lịch mới. Các buổi lễ hiện có được liệt kê trong bảng hiển thị tên, thời gian, nhà cung cấp và thời lượng của từng buổi. Nhấp biểu tượng chỉnh sửa trên một dòng để thay đổi.
3. Nhập **Service Name** (ví dụ: "Sunday Morning").
4. Đặt **Service Time** -- chọn ngày và giờ buổi lễ bắt đầu.
5. Đặt **Recurs Weekly** thành **Yes** cho các buổi lễ định kỳ hằng tuần, hoặc **No** cho sự kiện một lần.

### Cấu hình cài đặt trò chuyện và video

6. Trong **Chat Settings**, đặt số phút trước và sau buổi lễ mà trò chuyện sẽ được bật. Điều này cho phép khách truy cập bắt đầu trò chuyện trước khi buổi lễ bắt đầu và tiếp tục sau đó.
7. Trong **Video Settings**, đặt thời điểm bắt đầu luồng video sớm bao nhiêu cho nội dung đếm ngược hoặc nội dung trước buổi lễ. Trò chuyện mở *trước* thời điểm video sớm bấy nhiêu phút, nên thời gian hiển thị bên cạnh cài đặt số phút trước của trò chuyện bao gồm cả hai con số. Ví dụ, buổi lễ lúc 10:00 với 15 phút trò chuyện trước và bắt đầu video sớm 5 phút sẽ mở trò chuyện lúc 9:40.
8. Chọn bài giảng để phát từ danh sách thả xuống:
   - **Latest Sermon** -- Tự động phát video được thêm gần nhất.
   - **Current Live Service** -- Phát luồng trực tiếp hiện tại từ YouTube bằng Channel ID của bạn.
   - Bạn cũng có thể chọn bất kỳ bài giảng cụ thể nào đã lưu.
9. Nhấp **Save** để lên lịch buổi lễ.

:::info
Buổi lễ của bạn sẽ tự động cập nhật mỗi tuần nếu được đặt là định kỳ. Buổi lễ giữ nguyên giờ địa phương khi giờ tiết kiệm ánh sáng ban ngày bắt đầu hoặc kết thúc. Bạn có thể thêm bao nhiêu buổi lễ tùy ý. Khách truy cập sẽ thấy thời gian buổi lễ tiếp theo khi họ truy cập trang phát trực tiếp của bạn.
:::

## Cài đặt trang phát trực tiếp

Để tùy chỉnh các tab và liên kết xuất hiện cùng luồng phát trực tiếp, mở menu Jump, mở rộng **Sermons**, rồi nhấp **Settings**. Trang **Stream Settings** hiển thị danh sách **Content Tabs** của bạn.

### Thêm tab

1. Nhấp nút **Add** để thêm tab mới vào trang phát trực tiếp.
2. Chọn **Link Type**: **External URL** cho liên kết tùy chỉnh, hoặc một trong các tab **Chat** hoặc **Prayer** được thiết kế sẵn.
3. Với tab Chat, chỉ cần đặt tên trong ô **Tab Text** là hoàn tất thiết lập.
4. Với tab có liên kết, nhập tên tab, chọn biểu tượng bằng cách nhấp nút biểu tượng, rồi nhập URL.
5. Các tab bạn đã cấu hình sẽ xuất hiện trên trang phát trực tiếp để người xem truy cập thêm tài nguyên và các tính năng tương tác.

### Xem trước luồng phát trực tiếp

Trên trang **Live Stream Times**, nhấp **View Your Stream** ở đầu trang để xem chính xác trang phát trực tiếp sẽ hiển thị với khách truy cập như thế nào, bao gồm logo, giờ buổi lễ và các tab đã cấu hình.

## Thiết lập luồng YouTube Live

Để kết nối kênh YouTube phục vụ phát trực tiếp tự động:

1. Vào **Sermons** và nhấp **Add Sermon**, rồi chọn **Add Permanent Live URL**.
2. Nhà cung cấp video mặc định là **Current YouTube Live Stream**. Nhập **YouTube Channel ID** của bạn.
3. Thêm tiêu đề và mô tả, rồi nhấp **Save**.
4. Trong **Live Stream Times**, tạo một buổi lễ và chọn URL trực tiếp cố định của bạn từ danh sách bài giảng thả xuống.

:::tip
Để tìm YouTube Channel ID, vào cài đặt nâng cao của kênh YouTube và sao chép giá trị Channel ID.
:::

## Tùy chỉnh màu sắc và logo

Trang phát trực tiếp của bạn sử dụng cài đặt [Appearance](../website/appearance.md) của trang web:

- **Màu nhấn sáng** với chữ tối được dùng cho tiêu đề.
- **Màu nhấn tối** với chữ sáng được dùng cho thanh bên.
- **Logo nền sáng** của bạn xuất hiện trên trang phát trực tiếp. Hãy dùng hình ảnh có nền trong suốt và tỷ lệ khung hình 4:1.

Để thay đổi các mục này, vào **Website** rồi **Appearance**, sau đó cập nhật cài đặt [Color Palette](../website/appearance.md#color-palette) và [Logo](../website/appearance.md#logo-and-branding).

## Thêm người dẫn chương trình phát trực tiếp

Để cấp cho thành viên nhóm quyền truy cập trò chuyện chỉ dành cho người dẫn chương trình, bên cạnh trò chuyện công khai:

1. Trong menu Jump, chọn **Settings > Roles**.
2. Nhấp nút dấu cộng rồi chọn **Add Custom Role**.
3. Đặt tên vai trò là "Streaming Host" và nhấp **Save**.
4. Nhấp vào vai trò mới, rồi nhấp **Add** trong mục Members để thêm người.
5. Cuộn xuống **Edit Permissions**, mở rộng mục **Content** và chọn **Host Chat**.

Khi người dẫn chương trình đăng nhập vào trang phát trực tiếp, một tab **Host Chat** riêng tư sẽ xuất hiện cùng trò chuyện công khai, để nhân viên trao đổi riêng trong suốt buổi phát sóng.

:::info
Để biết thêm chi tiết về việc tạo vai trò và quản lý quyền, xem [Vai trò & Quyền hạn](../settings/roles-permissions.md).
:::

## Khắc phục sự cố

Nếu luồng YouTube trực tiếp tự động không hiển thị đúng khi dùng tùy chọn "Current YouTube Live Stream" với Channel ID, hãy thử các bước sau:

**Triệu chứng:**
- Khung nhúng phát trực tiếp hiển thị "Video unavailable"
- Trang tải nhưng không có video nào xuất hiện
- Nhúng YouTube trực tiếp hoạt động, nhưng luồng trực tiếp tự động của kênh thì không

**Giải pháp:**
Kiểm tra kênh YouTube của bạn xem có luồng trực tiếp cũ hoặc luồng đã lên lịch sắp tới nào không, rồi xóa chúng:

1. Vào YouTube Studio.
2. Điều hướng đến **Content** rồi **Live**.
3. Tìm các buổi trực tiếp cũ đã lên lịch hoặc luồng đã lên lịch sắp tới.
4. Xóa các mục trực tiếp cũ hoặc đã lên lịch này.
5. Kiểm tra lại trang phát trực tiếp của bạn.

:::warning
Khung nhúng luồng trực tiếp tự động của kênh YouTube có thể bị chặn khi kênh có nhiều mục trực tiếp đã lên lịch hoặc đã diễn ra. Xóa chúng giúp YouTube nhận diện đúng và phát luồng trực tiếp hiện tại của bạn.
:::

**Yêu cầu bổ sung:**
- Luồng trực tiếp của bạn phải được đặt là **Public** (Công khai), không phải Unlisted hoặc Private.
- Phải cho phép nhúng trong cài đặt luồng YouTube của bạn.
- Đảm bảo bạn đang dùng nhà cung cấp **Current YouTube Live Stream** (với Channel ID), không phải nhà cung cấp **YouTube** (với Video ID).

## Bước tiếp theo

- [Quản lý bài giảng](./managing-sermons.md) -- Thêm bài giảng vào thư viện của bạn
- [Playlist](./playlists.md) -- Sắp xếp bài giảng thành loạt bài
