---
title: "Đăng ký có phí"
---

# Đăng ký có phí

<div class="article-intro">

Đăng ký sự kiện có thể vượt xa việc chỉ đếm số người tham dự. Bạn có thể xác định các loại người tham dự có giá (như Người lớn và Trẻ em), cung cấp các mục thêm tùy chọn với giá và số lượng riêng, tạo mã giảm giá, và thu thanh toán khi đăng ký thông qua nhà cung cấp dâng hiến hiện có của nhà thờ. Khi sự kiện đã đầy, danh sách chờ tùy chọn sẽ giữ những thành viên quan tâm trong hàng đợi và tự động đưa họ vào khi có chỗ trống.

</div>

## Video hướng dẫn

<YouTube id="eGSZv24Dlzk" title="Đăng ký sự kiện và sự kiện có phí trong B1" next="Launching Your Church Website in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bật đăng ký cho sự kiện trước — xem [Tạo lịch](creating-calendars#enabling-event-registration)
- Để thu thanh toán trực tuyến, nhà thờ của bạn cần [thiết lập dâng hiến trực tuyến](../donations/online-giving-setup.md) (Stripe, PayPal, hoặc Kingdom Funding). Sự kiện miễn phí không cần thiết lập dâng hiến. Không có dâng hiến trực tuyến, đăng ký có phí vẫn hoạt động, nhưng người tham dự sẽ trả tiền trực tiếp cho nhà thờ — xem [Nhà thờ không có dâng hiến trực tuyến](#churches-without-online-giving).

</div>

## Mở cài đặt đăng ký

1. Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), chọn **Lịch > Đăng ký**, rồi mở sự kiện của bạn (hoặc mở sự kiện từ lịch của nó).
2. Thẻ **Cài đặt đăng ký** hiển thị các thông tin cơ bản — **Bật đăng ký**, **Sức chứa**, **Đăng ký mở/đóng**, **Thẻ**, và **Câu hỏi đăng ký**.
3. Bên dưới phần cơ bản là ba mục thu gọn: **Loại người tham dự**, **Lựa chọn**, và **Mã giảm giá**.

## Loại người tham dự

Loại người tham dự cho phép bạn tính giá khác nhau cho các nhóm người tham dự khác nhau — và giới hạn số lượng cho từng nhóm riêng.

1. Mở rộng mục **Loại người tham dự** và nhấp **Thêm loại**.
2. Nhập **Tên** (ví dụ: "Người lớn", "Trẻ em", "Học sinh").
3. Đặt **Giá**. Dùng 0 cho loại miễn phí.
4. Tùy chọn đặt **Sức chứa** riêng cho loại này (ví dụ: chỉ 20 chỗ cho Trẻ em). Để trống nếu không giới hạn theo loại.
5. Nhấp **Lưu**.

Trong quá trình đăng ký, mỗi người tham dự chọn một loại; các loại đã hết chỗ sẽ hiển thị **Hết chỗ** và không thể chọn. Danh sách hiển thị loại của từng người tham dự và số lượng đang tích lũy theo từng loại.

## Lựa chọn

Lựa chọn là các mục thêm có giá tùy chọn — áo phông, gói bữa ăn, nâng cấp hoạt động.

1. Mở rộng mục **Lựa chọn** và nhấp **Thêm lựa chọn**.
2. Nhập **Tên**, **Mô tả** (tùy chọn), và **Giá** (0 sẽ hiển thị là "Miễn phí").
3. Tùy chọn đặt **Sức chứa** (tổng số có sẵn trên tất cả các đăng ký) và **Số lượng tối đa** (số lượng nhiều nhất mà một đăng ký có thể đặt).
4. Nhấp **Lưu**.

Người đăng ký chọn số lượng trong quá trình đăng ký, và tổng số được trừ vào sức chứa, vì vậy bạn không bao giờ bán quá số lượng.

## Mã giảm giá

1. Mở rộng mục **Mã giảm giá** và nhấp **Thêm mã giảm giá**.
2. Nhập **Mã** mà người đăng ký sẽ gõ.
3. Chọn **Loại** — **Phần trăm** hoặc **Số tiền** — và **Giá trị** của nó.
4. Tùy chọn giới hạn mã bằng **Ngày bắt đầu** / **Ngày kết thúc**, **Số thành viên tối thiểu** (số người tham dự tối thiểu trong đăng ký), và **Số lần sử dụng tối đa**.
5. Nhấp **Lưu**.

Mỗi mã hiển thị số **Lượt dùng** để bạn biết mã đã được sử dụng bao nhiêu lần. Người đăng ký nhận phản hồi tức thì khi áp dụng mã — bao gồm thông báo rõ ràng khi mã đã hết hạn, chưa bắt đầu, hoặc cần thêm người tham dự.

## Danh sách chờ

Bật **Bật danh sách chờ** trong thẻ Cài đặt đăng ký. Khi sự kiện đạt đến sức chứa:

- Người đăng ký mới được cung cấp một chỗ trong danh sách chờ thay vì bị từ chối. Họ hoàn thành cùng quy trình đăng ký (bỏ qua thanh toán khi đang ở danh sách chờ).
- Khi có người hủy, đăng ký trong danh sách chờ lâu nhất sẽ được **tự động đưa vào** và nhận email thông báo đã có chỗ trống. Nếu họ còn nợ số tiền, email sẽ liên kết họ đến [Đăng ký của tôi](../../b1-church/events/my-registrations) trên trang B1 của nhà thờ bạn, nơi họ có thể hoàn tất thanh toán.
- Bạn có thể đưa ai đó vào thủ công bất cứ lúc nào bằng hành động **Đưa vào** trên hàng trong danh sách chờ — hữu ích sau khi tăng sức chứa sự kiện.

:::info
Đăng ký được đưa vào vẫn ở trạng thái *chờ xử lý* cho đến khi số tiền còn nợ được thanh toán; việc thanh toán (hoặc không có gì phải trả) sẽ xác nhận họ.
:::

## Danh sách đăng ký

Mở một sự kiện từ trang Đăng ký để xem mọi đăng ký. Tiêu đề thẻ hiển thị có bao nhiêu đăng ký đang giữ chỗ so với sức chứa (ví dụ: *Đăng ký (18 / 20)*). Chỉ các đăng ký đang chờ xử lý và đã xác nhận được tính; khi có người trong danh sách chờ, tiêu đề sẽ thêm số lượng (ví dụ: *· 3 trong danh sách chờ*), và cùng số lượng đó xuất hiện bên dưới thanh sức chứa. Bảng hiển thị **Tên**, **Thành viên**, **Loại** (loại của từng người tham dự), **Đã trả / Tổng** (kèm cảnh báo số dư khi vẫn còn nợ tiền), **Trạng thái**, và **Ngày**, cùng với các nhãn đếm theo loại phía trên bảng.

- Nhấp biểu tượng chi tiết của một hàng để mở hộp thoại **Chi tiết đăng ký** — thành viên, lựa chọn, đã trả/số dư, và bảng **Thanh toán** liệt kê mọi khoản phí (số tiền, phương thức, ngày).
- **Xuất CSV** tải xuống toàn bộ danh sách với các cột cho thành viên, loại người tham dự, lựa chọn, đã trả/tổng/số dư, trạng thái, và một cột cho mỗi câu hỏi đăng ký.
- **Thêm người tham dự** ghi nhận đăng ký ngoại tuyến hoặc qua điện thoại cho bất kỳ ai trong nhà thờ của bạn. Chọn người đó và, với sự kiện có phí, loại người tham dự của họ. Thẻ của họ sẽ không bị tính phí: một đăng ký có phí được lưu ở trạng thái **chờ xử lý** với toàn bộ số tiền là số dư còn nợ. Nếu nhà thờ của bạn có dâng hiến trực tuyến, người đó có thể thanh toán từ [Đăng ký của tôi](../../b1-church/events/my-registrations); nếu không, hãy thu tiền trực tiếp. Bạn cần quyền Chỉnh sửa Đăng ký để thêm người tham dự.

:::info
Việc hoàn tiền không được xử lý trong B1. Nếu bạn cần hoàn tiền cho một đăng ký có phí đã hủy, hãy thực hiện hoàn tiền từ bảng điều khiển của nhà cung cấp dâng hiến (ví dụ: Stripe).
:::

## Cách thức thanh toán hoạt động

Thanh toán được thực hiện qua cùng cổng dâng hiến mà nhà thờ của bạn đang dùng cho các khoản quyên góp. Thông tin thẻ được gửi thẳng đến nhà cung cấp và không bao giờ đi qua máy chủ của B1. Giá luôn được tính trên máy chủ từ các loại, lựa chọn và mã giảm giá bạn đã cấu hình, vì vậy người đăng ký không thể can thiệp vào tổng số tiền. Thành viên đã đăng nhập có thể thanh toán bằng thẻ đã lưu. Khách phải nhập thẻ khi thanh toán và phải đánh dấu ô **Tôi không phải là robot** trước khi thanh toán.

### Nhà thờ không có dâng hiến trực tuyến

Nếu nhà thờ của bạn chưa thiết lập nhà cung cấp dâng hiến, các sự kiện có phí vẫn có thể nhận đăng ký. Bước thanh toán sẽ thông báo cho người đăng ký rằng thanh toán trực tuyến không khả dụng và họ có thể thanh toán trực tiếp cho nhà thờ, đồng thời nút **Đăng ký và thanh toán sau** sẽ lưu đăng ký. Đăng ký được lưu ở trạng thái **chờ xử lý** với toàn bộ số tiền là số dư còn nợ, và nó xuất hiện trong danh sách với cảnh báo số dư. Hãy thu tiền theo cách nhà thờ bạn thường làm.

:::info
B1 không có cách nào để đánh dấu một khoản thanh toán ngoại tuyến là đã nhận. Số dư còn nợ vẫn hiển thị trong danh sách và trên thẻ [Đăng ký của tôi](../../b1-church/events/my-registrations) của người đăng ký sau khi bạn thu tiền, vì vậy hãy giữ bản ghi riêng về những ai đã thanh toán.
:::

## Bài viết liên quan

- [Tạo lịch](creating-calendars#enabling-event-registration) — bật đăng ký và các cài đặt cơ bản
- [Thiết lập dâng hiến trực tuyến](../donations/online-giving-setup.md) — cấu hình cổng thanh toán được dùng khi thanh toán
- [Đăng ký sự kiện](../../b1-church/events/registering) — những gì thành viên thấy khi đăng ký
- [Đăng ký của tôi](../../b1-church/events/my-registrations) — cách thành viên thanh toán số dư và chỉnh sửa đăng ký
