---
title: "Điểm danh Check-In"
---

# Điểm danh Check-In

<div class="article-intro">

B1 Admin hỗ trợ thành viên tự điểm danh tại các buổi nhóm thông qua ứng dụng đi kèm **B1 Checkin**. Thành viên có thể tự điểm danh cho bản thân và gia đình tại các kiosk hoặc thiết bị chuyên dụng khi đến nơi, giúp quy trình diễn ra nhanh chóng và giảm bớt công việc cho các tình nguyện viên. Mỗi lần điểm danh đều được tự động ghi nhận như một bản ghi điểm danh.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Các cơ sở, giờ nhóm và nhóm của bạn phải được cấu hình trong [Thiết lập điểm danh](setup.md).
- Bạn cần có [người trong cơ sở dữ liệu](../people/adding-people.md) cùng với [hộ gia đình](../people/adding-people.md#managing-households) được thiết lập để các gia đình có thể điểm danh cùng nhau.
- Bạn sẽ cần một máy tính bảng và tùy chọn một máy in nhãn Brother (xem [khuyến nghị về phần cứng](#recommended-hardware) bên dưới).

</div>

## Cách hoạt động

Ứng dụng B1 Checkin kết nối với thiết lập điểm danh trong B1 Admin của bạn. Khi một thành viên điểm danh, buổi tham dự của họ sẽ được tự động ghi nhận đúng cơ sở, giờ nhóm và nhóm tương ứng. Bạn không cần nhập điểm danh thủ công cho bất kỳ ai đã sử dụng hệ thống điểm danh.

## Thiết lập Check-In

1. **Cấu hình cấu trúc điểm danh trước.** Trong B1 Admin, vào **People > Attendance** và nhấn **Setup** để đảm bảo các cơ sở, giờ nhóm và nhóm đã được thiết lập. Ứng dụng điểm danh phụ thuộc vào cấu hình này. Tùy chọn, bạn có thể đặt [lịch điểm danh](setup.md#setting-a-check-in-schedule) cho từng giờ nhóm để việc điểm danh tự động mở và đóng mỗi tuần. Lịch sử dụng múi giờ của cơ sở tổ chức buổi nhóm, hoặc múi giờ của hội thánh bạn nếu cơ sở chưa được thiết lập múi giờ; kiosk sẽ hiển thị các giờ nhóm đã hết thời gian điểm danh là **Closed** và thông báo cho gia đình biết khi nào việc điểm danh mở lại. Xem [Thiết lập điểm danh](setup.md) để biết thêm chi tiết.
2. **Cài đặt ứng dụng B1 Checkin** trên các thiết bị bạn dự định sử dụng. Ứng dụng có sẵn trên các nền tảng sau:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Máy tính bảng Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Máy tính bảng Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Đăng nhập vào ứng dụng B1 Checkin** bằng một tài khoản có quyền điểm danh **Checkin** (hoặc **Edit Attendance**). Xem [Tài khoản kiosk điểm danh](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Chọn cơ sở và giờ nhóm** cho buổi nhóm hiện tại.
5. Lúc này, thành viên có thể tìm tên của mình trên thiết bị và điểm danh.

:::tip
Đặt thiết bị điểm danh ở những vị trí dễ thấy, dễ tiếp cận như lối vào sảnh hoặc bàn tiếp đón. Một thông báo ngắn trong các buổi nhóm sẽ giúp thành viên biết có tùy chọn này.
:::

:::tip
Nếu hội thánh bạn có nhiều cơ sở, bạn cần lặp lại quy trình thiết lập cho từng cơ sở trong [Thiết lập điểm danh](setup.md). Mỗi thiết bị điểm danh có thể được cấu hình cho một cơ sở khác nhau.
:::

## Phần cứng khuyến nghị

**Máy tính bảng** — bất kỳ thiết bị nào sau đây đều hoạt động tốt với ứng dụng:

- **Nhỏ gọn:** Samsung Galaxy Tab A7 Lite 8.7"
- **Màn hình lớn:** Samsung Galaxy Tab A8 10.5"
- **Tiết kiệm:** Amazon Fire HD 10

**Máy in** — việc điểm danh hoạt động với máy in nhãn Brother để in thẻ tên:

- **Tốt nhất:** Brother QL-1110NWB (hỗ trợ nhiều máy tính bảng qua Bluetooth và WiFi)
- **Tốt:** Brother QL-810W (hỗ trợ nhiều máy tính bảng qua WiFi)
- **Tiết kiệm:** Brother QL-1100 (chỉ WiFi)

**Nhãn:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Chỉ các máy in nhãn Brother mới tương thích với ứng dụng B1 Checkin. Máy in của các hãng khác sẽ không thể in thẻ tên.
:::

:::info
Làm theo hướng dẫn cài đặt của máy in để kết nối máy in với cùng mạng WiFi như máy tính bảng. Bạn có thể tìm trình điều khiển và hướng dẫn cài đặt máy in Brother trên [trang hỗ trợ của Brother](https://support.brother.com).
:::

## Tùy chỉnh giao diện kiosk

Bạn có thể tùy chỉnh diện mạo của ứng dụng B1 Checkin để phù hợp với thương hiệu của hội thánh. Trong B1 Admin, vào **Mobile > B1 CheckIn** và sử dụng thẻ **Kiosk Theme** để cấu hình:

### Màu sắc

Tùy chỉnh tám cài đặt màu để phù hợp với thương hiệu hội thánh:

- **Primary** và **Primary Contrast** -- Màu thương hiệu chính và màu chữ của nó.
- **Secondary** và **Secondary Contrast** -- Màu nhấn và màu chữ của nó.
- **Header Background** và **Subheader Background** -- Màu nền cho các khu vực tiêu đề của kiosk.
- **Button Background** và **Button Text** -- Màu cho các nút tương tác.

### Hình nền

Tải lên một hình nền tùy chọn cho màn hình chào mừng và màn hình tra cứu của kiosk. Kích thước khuyến nghị là 1920x1080 pixel.

### Màn hình chờ / Trình bảo vệ màn hình

Cấu hình trình bảo vệ màn hình sẽ kích hoạt sau một khoảng thời gian không hoạt động:

1. Bật hoặc tắt màn hình chờ.
2. Đặt **timeout** (số giây không hoạt động trước khi trình bảo vệ màn hình bắt đầu, tối thiểu 10 giây).
3. Thêm một hoặc nhiều **slide** -- mỗi slide có một hình ảnh và thời lượng hiển thị (tối thiểu 3 giây).

:::tip
Sử dụng màn hình chờ để hiển thị thông báo, sự kiện sắp tới hoặc lời chào mừng khi kiosk không được sử dụng.
:::

## Đăng ký khách qua mã QR

Kiosk điểm danh có thể hiển thị một mã QR để khách tham dự quét và tự đăng ký cho bản thân cùng gia đình trên điện thoại của họ. Điều này giúp đẩy nhanh quy trình điểm danh cho khách lần đầu đến.

Khi khách quét mã QR, họ sẽ được đưa đến [trang đăng ký khách](../../b1-church/checkin/guest-registration), nơi họ nhập tên các thành viên trong gia đình và bất kỳ thông tin bổ sung nào mà bạn chọn yêu cầu. Sau đó, một tình nguyện viên có thể tra cứu và điểm danh cho họ trên kiosk.

### Bật đăng ký khách qua mã QR

Để bật hiển thị mã QR:

1. Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái) và mở rộng **Mobile**.
2. Nhấn **B1 CheckIn**.
3. Bật **QR Guest Registration** và nhấn **Save**.

:::note
Cài đặt này nằm trong **Mobile > B1 CheckIn** (cùng trang với thẻ **Kiosk Theme**), không nằm trong Attendance. Hành động **Kiosk** trên trang Attendance có một liên kết đến trang này.
:::

Khi tùy chọn đã được bật, các tùy chọn khác bên dưới sẽ xuất hiện trong cùng thẻ **QR Guest Registration**. Nhấn **Save** trên thẻ sau khi thay đổi bất kỳ tùy chọn nào trong số đó.

### Chọn các trường đăng ký

Danh sách **Sign-up fields** kiểm soát những thông tin mà biểu mẫu đăng ký yêu cầu. **First Name** và **Last Name** luôn có trên biểu mẫu và luôn bắt buộc đối với mọi thành viên trong gia đình. Với mỗi trường khác, bật **Include** để thêm trường đó vào biểu mẫu, sau đó bật **Required** nếu khách bắt buộc phải điền. **Required** chỉ có thể bật khi trường đã được **Include**, và tắt **Include** sẽ xóa cài đặt **Required**.

| Trường | Yêu cầu từ | Mặc định có trong biểu mẫu |
|-------|-----------|---------------------|
| **Email** | Chỉ người liên hệ chính | Có (tùy chọn) |
| **Phone** | Chỉ người liên hệ chính | Có (tùy chọn) |
| **Home address** | Một lần cho cả gia đình -- đường, địa chỉ dòng 2, thành phố, tiểu bang và mã bưu điện. Khi bắt buộc, mọi mục trừ địa chỉ dòng 2 đều phải được điền. Địa chỉ sẽ được lưu cho mọi thành viên trong gia đình. | Không |
| **Birth date** | Từng thành viên trong gia đình | Không |
| **Gender** | Từng thành viên trong gia đình | Không |
| **Marital status** | Chỉ người liên hệ chính | Không |
| **Grade** | Từng thành viên trong gia đình (từ PreK đến lớp 12, hoặc Graduated) | Không |
| **Comments** | Một lần, trong một ô bên dưới các thành viên gia đình (tối đa 1.000 ký tự) | Không |

Các trường bạn tắt sẽ không bao giờ được lưu, ngay cả khi ai đó gửi chúng đến biểu mẫu bằng cách khác. Phần bình luận được lưu dưới dạng ghi chú trong hồ sơ của người liên hệ chính (ghi là "Guest sign-up"), vì vậy bạn có thể đọc chúng trong mục **Notes** của hồ sơ họ.

### Thêm khách vào nhóm

Sử dụng **Add new guests to group** để tự động đưa tất cả những người đăng ký vào một trong các nhóm của bạn -- ví dụ như nhóm "Newcomers" hoặc nhóm cho sự kiện cuối tuần này. Chọn **None** (mặc định) để bỏ qua. Khách không bao giờ thấy hoặc chọn nhóm; nhóm chỉ được thiết lập tại đây. Hãy thay đổi trước mỗi sự kiện để bạn có thể theo dõi khách của sự kiện đó cùng nhau.

### Ghi nhận điểm danh

Khi một nhóm được chọn, công tắc **Also record attendance** sẽ xuất hiện. Bật lên để đánh dấu khách có mặt ngay khi họ đăng ký, để bạn không phải điểm danh riêng cho họ.

Điểm danh chỉ được ghi nhận khi việc đăng ký diễn ra trong một trong các giờ nhóm **đã lên lịch** của nhóm được chọn:

- Nhóm phải được liên kết với một hoặc nhiều giờ nhóm, và các giờ nhóm đó phải có [lịch điểm danh](setup.md#setting-a-check-in-schedule) (một **Day** và một **Start Time**).
- "Trong lúc" nghĩa là trong khoảng thời gian điểm danh của giờ nhóm đó -- từ số phút **Open check-in** trước giờ bắt đầu đến số phút **Close check-in** sau giờ kết thúc (hoặc sau giờ bắt đầu, nếu không có giờ kết thúc; nếu không có cả giờ kết thúc lẫn số phút đóng, thì đến hết ngày đó), theo cùng múi giờ mà lịch điểm danh sử dụng.
- Mỗi thành viên trong gia đình sẽ được đánh dấu có mặt trong nhóm cho mọi giờ nhóm đang mở điểm danh vào thời điểm đó, vào ngày hôm nay.
- Đăng ký vào bất kỳ thời điểm nào khác, hoặc cho một nhóm có giờ nhóm không có lịch, sẽ được thêm vào nhóm nhưng không được tính là đã tham dự.

### Ảnh tiêu đề

Trong mục **Header photo**, nhấn **Change photo** để chọn hoặc tải lên một hình ảnh (được cắt theo tỷ lệ 16:9) để hiển thị ở đầu trang đăng ký thay cho biểu tượng mặc định. Nhấn **Remove** để quay lại biểu tượng.

### Chia sẻ liên kết đăng ký

Khi QR Guest Registration đã được bật, một mục **Share registration QR code** sẽ xuất hiện ở cuối thẻ. Mục này cung cấp hai cách để đưa khách đến biểu mẫu đăng ký ngoài mã QR trên kiosk:

- **Copy link** — sao chép URL đăng ký để bạn dán lên trang web của hội thánh, trong email hoặc bất kỳ nơi nào trực tuyến.
- **Download PNG** — tải mã QR dưới dạng hình ảnh để in trên tờ rơi, bản tin hoặc biển báo.

:::tip
Thêm liên kết đăng ký vào trang "Plan Your Visit" hoặc "I'm New" trên trang web của hội thánh để khách có thể đăng ký ngay cả trước khi đến nơi.
:::

### Điều gì xảy ra sau khi khách đăng ký

Đầu tiên, B1 tìm kiếm những người đã có trong **People**. Một thành viên gia đình được ghép với một người hiện có khi chính xác một người có cùng tên và cùng email hoặc số điện thoại. Một trẻ em được nhập mà không có email hoặc số điện thoại sẽ được ghép theo tên trong hộ gia đình đã được ghép. Những người đã khớp sẽ được giữ nguyên như hiện tại -- việc đăng ký không bao giờ thay đổi thông tin hay trạng thái thành viên của họ -- và bất kỳ ai mới sẽ gia nhập hộ gia đình đã khớp.

Khi không có ai khớp, việc đăng ký sẽ tạo một hộ gia đình mới được đặt tên theo họ của người liên hệ chính, với một hồ sơ người cho mọi thành viên trong gia đình. Tất cả những người mới được thêm vào **People** với trạng thái thành viên **Visitor**, và người liên hệ chính là chủ hộ.

Những người đã khớp và những người mới đều được thêm vào nhóm bạn đã chọn (nếu họ chưa có trong nhóm) và được ghi nhận điểm danh khi tùy chọn đó được bật. Bình luận được lưu dưới dạng ghi chú cho người liên hệ chính.

Để theo dõi tự động, hãy thêm một [kích hoạt quy trình](../serving/workflows.md#triggers) như **Person · Created** với điều kiện *Membership Status is Visitor*, hoặc **Group · Member Joined** cho nhóm bạn đã chọn ở trên.

## Dữ liệu được ghi nhận

Mỗi lần điểm danh đều tạo một bản ghi điểm danh trong B1 Admin. Bạn có thể xem các bản ghi này trên trang [Attendance](tracking-attendance.md) và trong các buổi của [từng nhóm](../groups/group-members.md), giống như điểm danh nhập thủ công. Không có sự khác biệt nào trong cách dữ liệu hiển thị -- cả hai phương thức đều đưa dữ liệu vào cùng các báo cáo.
