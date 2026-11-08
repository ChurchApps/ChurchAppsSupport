---
title: "Thiết lập Tự Check-In với B1 Checkin và B1 Admin"
sidebar_label: "Check-In"
description: "Thiết lập tự check-in cho các buổi nhóm với ứng dụng B1 Checkin trong B1 Admin, bao gồm thiết bị, tài khoản kiosk, lịch trình, thương hiệu và đăng ký khách bằng mã QR."
---

# Check-In

<div class="article-intro">

B1 Admin hỗ trợ tự check-in tại các buổi nhóm thông qua ứng dụng đi kèm **B1 Checkin**. Khi đến nơi, thành viên có thể tự check-in cho bản thân và gia đình tại kiosk hoặc thiết bị chuyên dụng. Quy trình này nhanh hơn và giảm bớt công việc cho các tình nguyện viên. Mỗi lần check-in đều được tự động ghi nhận là điểm danh.

</div>

<div class="prereqs">
<h4>Trước Khi Bắt Đầu</h4>

- Các cơ sở, giờ nhóm và nhóm của bạn phải được thiết lập trong [Thiết lập Điểm danh](setup.md).
- Bạn cần có [người trong cơ sở dữ liệu](../people/adding-people.md) với [hộ gia đình](../people/adding-people.md#managing-households) đã được thiết lập để các gia đình có thể check-in cùng nhau.
- Bạn sẽ cần một máy tính bảng và tùy chọn có máy in nhãn Brother (xem [khuyến nghị phần cứng](#recommended-hardware) bên dưới).

</div>

## Cách Hoạt Động

Ứng dụng B1 Checkin kết nối với phần thiết lập điểm danh trong B1 Admin của bạn. Khi một thành viên check-in, điểm danh của họ được tự động ghi nhận đúng cơ sở, giờ nhóm và nhóm tương ứng. Bạn không cần nhập điểm danh thủ công cho những ai sử dụng hệ thống check-in.

## Thiết Lập Check-In

1. **Cấu hình cấu trúc điểm danh trước tiên.** Trong B1 Admin, vào **People > Attendance** và nhấn **Setup** để đảm bảo các cơ sở, giờ nhóm và nhóm của bạn đã có sẵn. Ứng dụng check-in phụ thuộc vào cấu hình này. Bạn cũng có thể tùy chọn đặt [lịch check-in](setup.md#setting-a-check-in-schedule) cho từng giờ nhóm để check-in tự động mở và đóng mỗi tuần. Lịch sử dụng múi giờ của cơ sở tổ chức buổi nhóm, hoặc múi giờ của hội thánh bạn nếu cơ sở chưa thiết lập múi giờ. Kiosk sẽ liệt kê các giờ nhóm đã hết thời gian check-in là **Closed** và thông báo cho gia đình biết khi nào check-in sẽ mở. Xem [Thiết lập Điểm danh](setup.md) để biết thêm chi tiết.
2. **Cài đặt ứng dụng B1 Checkin** trên các thiết bị bạn dự định sử dụng. Ứng dụng có sẵn trên các nền tảng sau:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/máy tính bảng Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Máy tính bảng Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Đăng nhập vào ứng dụng B1 Checkin** bằng một tài khoản có quyền điểm danh **Checkin** (hoặc **Edit Attendance**). Xem [Tài khoản Kiosk Check-In](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Chọn cơ sở và giờ nhóm** cho buổi nhóm hiện tại.
5. Lúc này, thành viên có thể tìm tên của mình trên thiết bị và check-in.

:::tip
Đặt thiết bị check-in ở những vị trí dễ thấy, dễ tiếp cận như lối vào sảnh hoặc bàn tiếp đón. Một thông báo ngắn trong buổi nhóm sẽ giúp thành viên biết có tùy chọn này.
:::

:::tip
Nếu hội thánh của bạn có nhiều cơ sở, bạn cần lặp lại việc thiết lập cho từng cơ sở trong [Thiết lập Điểm danh](setup.md). Mỗi thiết bị check-in có thể được cấu hình cho một cơ sở khác nhau.
:::

## Phần Cứng Được Khuyến Nghị

**Máy tính bảng** — bất kỳ loại nào sau đây đều hoạt động tốt với ứng dụng:

- **Nhỏ gọn:** Samsung Galaxy Tab A7 Lite 8.7"
- **Màn hình lớn:** Samsung Galaxy Tab A8 10.5"
- **Tiết kiệm:** Amazon Fire HD 10

**Máy in** — check-in hoạt động với máy in nhãn Brother để in thẻ tên:

- **Tốt nhất:** Brother QL-1110NWB (hỗ trợ nhiều máy tính bảng qua Bluetooth và WiFi)
- **Tốt:** Brother QL-810W (hỗ trợ nhiều máy tính bảng qua WiFi)
- **Tiết kiệm:** Brother QL-1100 (chỉ WiFi)

**Nhãn:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Chỉ máy in nhãn Brother mới tương thích với ứng dụng B1 Checkin. Các hãng máy in khác sẽ không in được thẻ tên.
:::

:::info
Hãy làm theo hướng dẫn cài đặt của máy in để kết nối với cùng mạng WiFi với máy tính bảng. Bạn có thể tìm trình điều khiển và hướng dẫn cài đặt máy in Brother trên [trang hỗ trợ của Brother](https://support.brother.com).
:::

## Tùy Chỉnh Giao Diện Kiosk

Bạn có thể tùy chỉnh diện mạo của ứng dụng B1 Checkin để phù hợp với thương hiệu của hội thánh. Trong B1 Admin, vào **Mobile > B1 CheckIn** và sử dụng thẻ **Kiosk Theme** để cấu hình:

### Màu Sắc

Tùy chỉnh tám cài đặt màu để phù hợp với thương hiệu hội thánh:

- **Primary** và **Primary Contrast** -- Màu thương hiệu chính và màu chữ của nó.
- **Secondary** và **Secondary Contrast** -- Màu nhấn và màu chữ của nó.
- **Header Background** và **Subheader Background** -- Màu nền cho khu vực tiêu đề của kiosk.
- **Button Background** và **Button Text** -- Màu cho các nút tương tác.

### Ảnh Nền

Tải lên một ảnh nền tùy chọn cho màn hình chào mừng và màn hình tra cứu của kiosk. Kích thước khuyến nghị là 1920x1080 pixel.

### Màn Hình Chờ / Trình Bảo Vệ Màn Hình

Cấu hình trình bảo vệ màn hình sẽ kích hoạt sau một khoảng thời gian không hoạt động:

1. Bật hoặc tắt màn hình chờ.
2. Đặt **timeout** (số giây không hoạt động trước khi trình bảo vệ màn hình bắt đầu, tối thiểu 10 giây).
3. Thêm một hoặc nhiều **slide** -- mỗi slide có một hình ảnh và thời gian hiển thị (tối thiểu 3 giây).

:::tip
Sử dụng màn hình chờ để hiển thị thông báo, sự kiện sắp tới hoặc lời chào mừng khi kiosk không được sử dụng.
:::

## Đăng Ký Khách Bằng Mã QR

Kiosk check-in có thể hiển thị một mã QR để khách truy cập quét và tự đăng ký cho bản thân và gia đình trên điện thoại của họ. Điều này giúp quá trình check-in nhanh hơn cho khách lần đầu đến.

Khi khách quét mã QR, họ sẽ được đưa đến [trang đăng ký khách](../../b1-church/checkin/guest-registration.md), nơi họ nhập tên các thành viên trong gia đình cùng với những thông tin khác mà bạn chọn yêu cầu. Sau đó, một tình nguyện viên có thể tra cứu và check-in cho họ trên kiosk.

### Bật Đăng Ký Khách Bằng Mã QR

Để bật hiển thị mã QR:

1. Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái) và mở rộng **Mobile**.
2. Nhấn **B1 CheckIn**.
3. Bật **QR Guest Registration** và nhấn **Save**.

:::note
Cài đặt này nằm trong **Mobile > B1 CheckIn** (cùng trang với thẻ **Kiosk Theme**), không nằm trong Attendance. Hành động **Kiosk** trên trang Attendance có một liên kết đến trang này.
:::

Khi công tắc đã bật, các tùy chọn còn lại bên dưới sẽ xuất hiện trong cùng thẻ **QR Guest Registration**. Nhấn **Save** trên thẻ sau khi thay đổi bất kỳ tùy chọn nào trong số đó.

### Chọn Các Trường Đăng Ký

Danh sách **Sign-up fields** kiểm soát những gì biểu mẫu đăng ký yêu cầu. **First Name** và **Last Name** luôn có trong biểu mẫu và luôn bắt buộc đối với mọi thành viên trong gia đình. Với mỗi trường khác, bật **Include** để thêm trường đó vào biểu mẫu, sau đó bật **Required** nếu khách bắt buộc phải điền. **Required** chỉ có thể bật khi trường đã được **Include**, và tắt **Include** sẽ xóa cài đặt **Required**.

| Trường | Yêu cầu từ | Mặc định có trong biểu mẫu |
|-------|-----------|---------------------|
| **Title** | Mỗi thành viên, dưới dạng danh sách thả xuống trước tên (Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor) | Không |
| **Email** | Chỉ người liên hệ chính | Có (tùy chọn) |
| **Phone** | Mỗi thành viên. Khi bắt buộc, chỉ người liên hệ chính phải điền. | Có (tùy chọn) |
| **Household role** | Mỗi thành viên sau người liên hệ chính -- Spouse, Child hoặc Other. Người liên hệ chính là chủ hộ của hộ gia đình mới. Ai không có vai trò sẽ được lưu là Other. | Có (tùy chọn) |
| **Home address** | Một lần cho cả gia đình -- đường phố, dòng địa chỉ 2, thành phố, tiểu bang và mã bưu chính. Khi bắt buộc, mọi mục trừ dòng địa chỉ 2 đều phải được điền. Địa chỉ được lưu cho mọi thành viên trong gia đình. | Không |
| **Birth date** | Mỗi thành viên | Không |
| **Gender** | Mỗi thành viên | Không |
| **Marital status** | Chỉ người liên hệ chính | Không |
| **Grade** | Mỗi thành viên (từ PreK đến lớp 12, hoặc Graduated) | Không |
| **Comments** | Một lần, trong một ô bên dưới các thành viên gia đình (tối đa 1.000 ký tự) | Không |

Các trường bạn tắt sẽ không bao giờ được lưu, ngay cả khi ai đó gửi chúng đến biểu mẫu đăng ký bằng cách khác. Phần bình luận được lưu như một ghi chú trên hồ sơ của người liên hệ chính (được đăng với nội dung "Guest sign-up"), vì vậy bạn có thể đọc chúng trong mục **Notes** trên hồ sơ của họ.

### Thêm Khách Vào Nhóm

Sử dụng **Add new guests to group** để tự động đưa tất cả những người đăng ký vào một trong các nhóm của bạn -- ví dụ như nhóm "Newcomers" hoặc nhóm cho sự kiện cuối tuần này. Chọn **None** (mặc định) để bỏ qua. Khách không bao giờ nhìn thấy hoặc tự chọn nhóm; nhóm chỉ được thiết lập tại đây. Hãy thay đổi trước mỗi sự kiện để bạn có thể theo dõi khách của sự kiện đó cùng nhau.

### Ghi Nhận Điểm Danh

Khi một nhóm được chọn, công tắc **Also record attendance** sẽ xuất hiện. Bật lên để đánh dấu khách có mặt ngay khi họ đăng ký, để bạn không phải check-in riêng cho từng người.

Điểm danh chỉ được ghi nhận khi đăng ký diễn ra trong một trong các giờ nhóm **đã lên lịch** của nhóm đã chọn:

- Nhóm phải được liên kết với một hoặc nhiều giờ nhóm, và các giờ nhóm đó phải có [lịch check-in](setup.md#setting-a-check-in-schedule) (một **Day** và một **Start Time**).
- "Trong" nghĩa là nằm trong khoảng check-in của giờ nhóm đó -- từ số phút **Open check-in** trước giờ bắt đầu cho đến số phút **Close check-in** sau giờ kết thúc (hoặc sau giờ bắt đầu, nếu không có giờ kết thúc; nếu không có cả giờ kết thúc lẫn số phút đóng, thì đến cuối ngày hôm đó), theo cùng múi giờ mà lịch check-in sử dụng.
- Mỗi thành viên trong gia đình được đánh dấu có mặt trong nhóm cho mỗi giờ nhóm đang mở tại thời điểm đó, vào ngày hôm nay.
- Các đăng ký vào thời điểm khác, hoặc cho một nhóm có giờ nhóm không có lịch, vẫn được thêm vào nhóm nhưng không được tính là có tham dự.

### Ảnh Tiêu Đề

Trong mục **Header photo**, nhấn **Change photo** để chọn hoặc tải lên một hình ảnh (được cắt theo tỷ lệ 16:9) để hiển thị ở đầu trang đăng ký thay cho biểu tượng mặc định. Nhấn **Remove** để quay lại biểu tượng.

### Chia Sẻ Liên Kết Đăng Ký

Khi QR Guest Registration đã được bật, một phần **Share registration QR code** sẽ xuất hiện ở cuối thẻ. Phần này cung cấp hai cách để đưa khách đến biểu mẫu đăng ký, ngoài mã QR trên kiosk:

- **Copy link** -- sao chép URL đăng ký để bạn dán lên trang web hội thánh, trong email hoặc bất kỳ nơi nào trực tuyến.
- **Download PNG** -- tải mã QR dưới dạng hình ảnh để in trên tờ rơi, bản tin hoặc biển hiệu.

:::tip
Hãy thêm liên kết đăng ký vào trang "Plan Your Visit" hoặc "I'm New" trên website hội thánh để khách có thể đăng ký ngay cả trước khi đến nơi.
:::

### Điều Gì Xảy Ra Sau Khi Khách Đăng Ký

Trước tiên, B1 tìm những người đã có trong **People**. Một thành viên gia đình được ghép với người hiện có khi chỉ có đúng một người trùng cả tên và email hoặc số điện thoại. Một trẻ em được nhập mà không có email hoặc số điện thoại sẽ được ghép theo tên trong hộ gia đình đã được ghép. Những người được ghép sẽ được sử dụng lại như hiện tại -- việc đăng ký không bao giờ thay đổi thông tin hoặc trạng thái thành viên của họ -- và bất kỳ ai mới sẽ gia nhập hộ gia đình đã được ghép.

Khi không ai được ghép, đăng ký sẽ tạo một hộ gia đình mới được đặt theo họ của người liên hệ chính, cùng với một hồ sơ người cho mọi thành viên trong gia đình. Tất cả người mới sẽ được thêm vào **People** với trạng thái thành viên **Visitor**, và người liên hệ chính là chủ hộ.

Cả người được ghép lẫn người mới đều được thêm vào nhóm bạn đã chọn (nếu họ chưa có trong nhóm) và được ghi nhận điểm danh khi tùy chọn này được bật. Bình luận được lưu như một ghi chú trên hồ sơ người liên hệ chính.

Để theo dõi tự động, hãy thêm một [trigger quy trình](../serving/workflows.md#triggers) như **Person · Created** với điều kiện *Membership Status is Visitor*, hoặc **Group · Member Joined** cho nhóm bạn đã chọn ở trên.

## Dữ Liệu Được Ghi Nhận

Mỗi lần check-in đều tạo một bản ghi điểm danh trong B1 Admin. Bạn có thể xem các bản ghi này trên trang [Attendance](tracking-attendance.md) và trong phần các buổi của [từng nhóm](../groups/group-members.md), giống như điểm danh nhập thủ công. Dữ liệu hiển thị không có gì khác biệt -- cả hai phương thức đều đưa dữ liệu vào cùng các báo cáo.
