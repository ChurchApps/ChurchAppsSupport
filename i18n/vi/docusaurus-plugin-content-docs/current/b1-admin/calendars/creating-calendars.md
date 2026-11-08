---
title: "Tạo lịch"
description: "Tạo lịch trong B1 Admin, kết nối nhóm hoặc nhập tệp .ics, và quản lý sự kiện, đăng ký và ghi chú tại một nơi."
---

# Tạo lịch

<div class="article-intro">

Tạo lịch trong B1 Admin cho phép bạn xây dựng một chế độ xem sự kiện có chọn lọc bằng cách kết nối một hoặc nhiều nhóm. Sự kiện do trưởng nhóm quản lý trong nhóm của họ, và lịch của bạn hiển thị các sự kiện đó tại một nơi. Quản trị viên có quyền chỉnh sửa có thể thêm hoặc sửa sự kiện của bất kỳ nhóm nào. Trưởng nhóm không phải quản trị viên chỉ có thể quản lý sự kiện của các nhóm mà họ phụ trách.

</div>

## Video hướng dẫn

<YouTube id="Ko3kgsCSLFs" title="Tạo lịch, sự kiện và đặt phòng trong B1" next="Đăng ký sự kiện và sự kiện có phí trong B1" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Thiết lập các [nhóm](../groups/creating-groups.md) mà bạn muốn đưa sự kiện vào lịch
- Bạn cần có quyền truy cập quản trị vào mục Lịch trong B1 Admin

</div>

## Tạo lịch mới

1. Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), mở rộng **Lịch**, rồi nhấn **Lịch**.
2. Nhấn **Thêm lịch** ở đầu trang. Biểu mẫu lịch mới sẽ mở ra bên dưới danh sách lịch.
3. Nhập **tên** cho lịch của bạn (ví dụ: "Sự kiện Thanh thiếu niên" hoặc "Lịch chính của nhà thờ").
4. Thêm **mô tả** (không bắt buộc) để nhóm của bạn hiểu lịch này dùng để làm gì.
5. Nhấn **Tạo** để lưu lịch mới.

## Trang chi tiết lịch

Sau khi tạo lịch, nhấn **Quản lý sự kiện** ở dòng của lịch đó để mở trang chi tiết. Trang này có hai khu vực chính:

- **Cột bên trái** -- Tên lịch cùng các thao tác (**Sự kiện mới**, **Chỉnh sửa**, **Nhập .ics** và **In**), tiếp theo là danh sách **Nhóm trong lịch** cho biết những nhóm nào được đưa vào lịch này. Nhấn **Xóa** bên cạnh một nhóm để gỡ nhóm đó khỏi lịch.
- **Khu vực chính** -- Chế độ xem **Sự kiện trong lịch** hiển thị các sự kiện lấy từ các nhóm được kết nối, với các nút **Theo dõi** và **Thêm nhóm** ở phía trên.

## Kết nối nhóm

Các nhóm có sự kiện trong lịch sẽ tự động xuất hiện trong danh sách **Nhóm trong lịch** ở bên trái trang chi tiết.

1. Nhấn **Thêm nhóm** phía trên lịch để liên kết một nhóm với lịch của bạn.
2. Chọn nhóm từ danh sách thả xuống. Danh sách bao gồm tất cả nhóm trong nhà thờ, không chỉ các nhóm bạn tham gia.
3. Chọn đưa **tất cả sự kiện** của nhóm đó vào lịch hay chỉ **sự kiện cụ thể**.
4. Nhấn **Lưu**.

Mỗi sự kiện chỉ xuất hiện một lần trên lịch. Nếu bạn thêm toàn bộ một nhóm, mọi sự kiện của nhóm đó mà bạn đã thêm từng cái một trước đó sẽ được gộp vào mục của nhóm. Chọn các sự kiện cụ thể từ một nhóm đã có trong lịch sẽ không thêm gì mới. Chỉ những nhóm được thêm theo toàn bộ mới được liệt kê dưới **Nhóm trong lịch**.

### Nhập tệp .ics

Nhấn **Nhập .ics** để đưa sự kiện từ một lịch khác vào. Chọn **Nhóm** mà các sự kiện sẽ thuộc về, sau đó nhấn **Chọn tệp .ics** hoặc dán nội dung tệp, rồi nhấn **Nhập**. Các sự kiện sẽ được tạo trong nhóm đó, và nhóm sẽ được thêm vào lịch mà bạn nhập từ đó, nên các sự kiện sẽ hiển thị ở đó ngay lập tức.

### Gỡ sự kiện khỏi lịch

Nhấn vào một sự kiện trên lịch, rồi nhấn **Gỡ khỏi lịch**. Thao tác này chỉ đưa sự kiện ra khỏi lịch này -- bản thân sự kiện vẫn nằm trong nhóm của nó. Nếu sự kiện có trên lịch vì toàn bộ nhóm của nó đã được thêm, việc gỡ sẽ đưa tất cả sự kiện của nhóm đó ra khỏi lịch này (các sự kiện vẫn còn trong nhóm). Để xóa hẳn một sự kiện, hãy xóa nó từ [lịch của nhóm](../groups/group-calendar.md).

:::tip
Kết nối nhóm với lịch là cách hiệu quả để tự động tổng hợp sự kiện. Khi trưởng nhóm thêm sự kiện vào [nhóm](../groups/creating-groups.md) của họ, sự kiện đó có thể tự động xuất hiện trên lịch toàn nhà thờ của bạn mà không cần bạn thao tác thêm.
:::

:::info
Nếu bạn muốn tạo một lịch duy nhất lấy sự kiện từ nhiều nhóm trong nhà thờ, hãy xem [Lịch tổng hợp](./curated-calendar.md) để biết cách làm gọn hơn.
:::

## Thêm và chỉnh sửa sự kiện {#adding-and-editing-events}

Nhấn **Sự kiện mới** trên trang chi tiết lịch để thêm sự kiện, hoặc nhấn vào một sự kiện trên lịch rồi nhấn **Chỉnh sửa** để thay đổi. Biểu mẫu **Sự kiện mới** / **Chỉnh sửa sự kiện** có các trường sau:

- **Nhóm** -- Nhóm mà sự kiện thuộc về. Nếu nhà thờ của bạn có mẫu sự kiện, bạn cũng có thể chọn **Mẫu** để điền sẵn biểu mẫu.
- **Tiêu đề**
- **Ảnh sự kiện** -- Nhấn **Thêm ảnh** (hoặc ô ảnh trống) để chọn hoặc tải lên một hình ảnh, được cắt theo tỷ lệ ngang 16:9. Nhấn **Đổi ảnh** để thay thế. Ảnh sẽ hiển thị ở đầu trang sự kiện trên website của bạn và là ô hình đại diện khi một phần tử Lịch hiển thị **Sự kiện sắp tới** (xem [Hiển thị sự kiện trên website của bạn](#showing-events-on-your-website)).
- **Mô tả** -- Hiển thị trên trang sự kiện trên website của bạn. Hỗ trợ chữ đậm, danh sách và liên kết.
- **Bắt đầu** và **Kết thúc**, **Lặp lại**, và **Hiển thị** (**Công khai** hoặc **Riêng tư**).
- **Thẻ** -- Nhãn cách nhau bằng dấu phẩy, chẳng hạn `youth, students`. Một phần tử Lịch trên website có thể được thiết lập chỉ hiển thị các sự kiện có thẻ nhất định. Đây là cùng trường **Thẻ** xuất hiện trong cài đặt đăng ký của sự kiện.
- **Ai có thể xem ghi chú** và **Ai có thể đăng ghi chú** -- Ai được đọc và thêm vào ghi chú của sự kiện (xem [Ghi chú sự kiện](#event-notes)). Chọn **Chỉ nhân viên** (mặc định), **Trưởng nhóm** (trưởng nhóm của nhóm sự kiện) hoặc **Thành viên nhóm** (mọi người trong nhóm sự kiện, bao gồm cả trưởng nhóm).
- **Phòng** và **Tài nguyên** -- Đặt chỗ không gian và thiết bị cho sự kiện. Xem [Phòng, tài nguyên & lịch đặt](./rooms-resources.md).

Nhấn **Lưu**. Nếu sự kiện lặp lại, B1 sẽ yêu cầu bạn xác nhận, vì việc lưu sẽ cập nhật mọi lần diễn ra trong chuỗi.

### Ghi chú sự kiện {#event-notes}

Mỗi sự kiện có một chuỗi ghi chú riêng để lên kế hoạch và theo dõi. Nhấn vào một sự kiện trên trang chi tiết lịch; hộp thoại sẽ hiển thị thông tin chi tiết của sự kiện, các lời nhắc, và **Ghi chú** bên dưới. Nhập ghi chú và đăng để thêm vào chuỗi.

Nhân viên có quyền chỉnh sửa nội dung hoặc quản trị lịch luôn có thể đọc và đăng ghi chú sự kiện. Các cài đặt **Ai có thể xem ghi chú** và **Ai có thể đăng ghi chú** trên sự kiện quyết định trưởng nhóm hoặc thành viên của nhóm sự kiện có được phép làm điều đó hay không.

### Hiển thị sự kiện trên website của bạn {#showing-events-on-your-website}

Để đưa lịch lên website, hãy thêm phần tử **Lịch** vào một trang và chọn lịch này. Phần tử có thể hiển thị lịch theo tháng hoặc lưới các ô sự kiện sắp tới, và có thể giới hạn chỉ các sự kiện có một thẻ nhất định. Khách truy cập nhấn vào một sự kiện sẽ mở trang sự kiện riêng của nó. Xem [Sử dụng phần tử Lịch](../website/page-editor.md#using-the-calendar-element).

## Bật đăng ký sự kiện {#enabling-event-registration}

Bạn có thể bật đăng ký cho bất kỳ sự kiện nào trên lịch để thành viên có thể đăng ký qua website B1 hoặc ứng dụng di động.

1. Nhấn vào một sự kiện có sẵn hoặc tạo sự kiện mới.
2. Trong trình chỉnh sửa sự kiện, bật **Đăng ký**.
3. Cấu hình cài đặt đăng ký:
   - **Sức chứa** (không bắt buộc) -- Đặt số lượng đăng ký tối đa. Để trống nếu không giới hạn.
   - **Mở đăng ký** -- Ngày và giờ bắt đầu nhận đăng ký.
   - **Đóng đăng ký** -- Ngày và giờ kết thúc nhận đăng ký.
   - **Thẻ** -- Nhãn cách nhau bằng dấu phẩy (ví dụ: "youth, retreat, vbs") để phân loại các sự kiện có thể đăng ký.
   - **Câu hỏi đăng ký** -- Tùy chọn đính kèm một [biểu mẫu](../forms/creating-forms.md) để người đăng ký trả lời thêm câu hỏi (hạn chế ăn uống, cỡ áo phông, liên hệ khẩn cấp, v.v.) như một phần của việc đăng ký. Chọn **Không có** để bỏ qua câu hỏi.
   - **Bật danh sách chờ** -- Khi sự kiện đầy, cho phép người đăng ký bổ sung tham gia danh sách chờ thay vì bị từ chối. Xem [Đăng ký có phí](./paid-registrations.md#waitlist).
4. Lưu sự kiện.

Đối với sự kiện có phí, cùng trang cài đặt này cho phép bạn xác định **Loại người tham dự** có giá, **Lựa chọn** bổ sung (tùy chọn thêm, không bắt buộc), và **Mã giảm giá**, với thanh toán được thu qua nhà cung cấp dịch vụ quyên góp của nhà thờ bạn. Xem [Đăng ký có phí](./paid-registrations.md) để biết hướng dẫn đầy đủ.

Khi đã bật đăng ký, thành viên sẽ thấy nút **Đăng ký tham gia sự kiện này** khi xem sự kiện trên [B1.church hoặc trong ứng dụng B1](../../b1-church/events/registering.md). Nếu bạn đã đính kèm biểu mẫu, người đăng ký sẽ thấy bước **Câu hỏi** trong quá trình đăng ký và câu trả lời của họ được lưu cùng với đăng ký.

:::info
Câu hỏi đăng ký chỉ hoạt động với các biểu mẫu **không** được đánh dấu Hạn chế. Biểu mẫu hạn chế sẽ được bỏ qua tự động trong quá trình đăng ký thay vì hiển thị, vì vậy hãy dùng biểu mẫu không hạn chế khi đính kèm câu hỏi vào sự kiện.
:::

### Quản lý đăng ký

Để xem và quản lý đăng ký cho sự kiện của bạn:

1. Trong menu Jump, chọn **Lịch > Đăng ký**.
2. Bạn sẽ thấy bảng tất cả sự kiện đã bật đăng ký, hiển thị tên sự kiện, ngày, số lượng đăng ký hiện tại so với sức chứa, và các thẻ.
3. Nhấn vào một sự kiện để xem đầy đủ danh sách đăng ký, bao gồm tên, số thành viên, loại người tham dự, trạng thái thanh toán, và ngày đăng ký.
4. Từ trang chi tiết, bạn có thể:
   - **Thêm người tham dự** -- Đăng ký thủ công cho người đã đăng ký trực tiếp hoặc qua điện thoại.
   - **Hủy** từng đăng ký
   - **Xóa** đăng ký vĩnh viễn
   - **Chuyển** đăng ký từ danh sách chờ khi có chỗ trống
   - **Xuất CSV** -- Tải xuống tất cả đăng ký, bao gồm loại người tham dự, lựa chọn, số tiền thanh toán, và câu trả lời cho câu hỏi.

Nếu sự kiện có câu hỏi đăng ký đính kèm, trang chi tiết cũng hiển thị bộ lọc **Chỉ câu hỏi chưa trả lời** để nhanh chóng tìm những người đăng ký chưa gửi câu trả lời, và nút **Xem câu trả lời** ở mỗi đăng ký đã trả lời để xem phản hồi của họ. Sự kiện có phí sẽ thêm cột **Loại**, cột **Đã thanh toán / Tổng**, số lượng theo từng loại, và hộp thoại chi tiết thanh toán -- xem [Đăng ký có phí](./paid-registrations.md#the-registration-roster).

:::tip
Sử dụng thanh tiến trình sức chứa để theo dõi tốc độ lấp đầy của sự kiện. Thanh sẽ chuyển sang màu đỏ khi sự kiện đạt hoặc vượt sức chứa.
:::

## Bước tiếp theo

- [Lịch tổng hợp](./curated-calendar.md) -- Tạo lịch lấy sự kiện từ nhiều nhóm
- [Đăng ký có phí](./paid-registrations.md) -- Loại người tham dự, lựa chọn bổ sung, mã giảm giá, thanh toán và danh sách chờ
- [Hướng dẫn đăng ký sự kiện](../guides/event-registration.md) -- Hướng dẫn từng bước thiết lập đăng ký sự kiện
- [Tổng quan về lịch](./index.md) -- Quay lại trang tổng quan về lịch
