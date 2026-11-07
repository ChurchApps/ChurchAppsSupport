---
title: "Cài đặt ứng dụng di động"
description: "Cấu hình các tab điều hướng, ô trên màn hình Trang chủ, lời nhắc đăng nhập và cài đặt quyền riêng tư danh bạ thành viên cho ứng dụng B1.church trong B1 Admin."
---

# Cài đặt ứng dụng di động

<div class="article-intro">

Trang Cài đặt ứng dụng di động cho phép bạn cấu hình các tab điều hướng xuất hiện trong **trải nghiệm di động B1.church (PWA)** dành cho thành viên nhà thờ. Bạn có thể kiểm soát tab nào được hiển thị, tab đó liên kết đến đâu và cách tab được hiển thị.

</div>

## Video hướng dẫn

<YouTube id="ydY7WGK16fE" title="Tùy chỉnh ứng dụng thành viên của nhà thờ bạn trong B1" />

:::info Ứng dụng B1 Mobile gốc đã ngừng hỗ trợ
Các tab được cấu hình tại đây được cung cấp qua [Ứng dụng web tiến bộ (PWA) B1.church](/docs/b1-church/getting-started/installing-pwa), ứng dụng này đã thay thế ứng dụng B1 Mobile gốc. Hãy chia sẻ trang cài đặt của nhà thờ bạn — `https://yourchurchname.b1.church/mobile/install` — với các thành viên. Trang này sẽ hướng dẫn họ cài đặt ứng dụng trên thiết bị của mình, không cần tải từ App Store hay Google Play.
:::

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần có quyền "Edit Church Settings" (Chỉnh sửa cài đặt nhà thờ). Xem [Vai trò & Quyền](./roles-permissions.md) nếu bạn chưa có quyền truy cập.
- Hãy cấu hình [Cài đặt nhà thờ](./church-settings.md) trước, bao gồm tên nhà thờ và thương hiệu

</div>

## Truy cập cài đặt điều hướng

1. Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái) và mở rộng mục **Mobile**.
2. Nhấp vào **Navigation** (`/mobile/navigation`).
3. Trang Navigation hiển thị các tab hiện tại của ứng dụng.

## Thêm tab mới

1. Nhấp vào nút **Add Tab** ở đầu trang.
2. Điền thông tin chi tiết của tab:
   - **Name** -- Nhãn xuất hiện trên tab (ví dụ: "Sermons" hoặc "Give").
   - **Icon** -- Nhấp vào bộ chọn biểu tượng để chọn biểu tượng cho tab.
   - **Image** -- Nhấp vào **Select Image** (hoặc **Change Image**) để gắn ảnh cho tab. Tab có ảnh sẽ xuất hiện dưới dạng ô ảnh trên màn hình Home của ứng dụng -- xem [Ô trên màn hình Home](#home-screen-tiles).
   - **Tab Type** -- Chọn từ các tùy chọn như Bible, Live Stream, Donation, Website và nhiều loại khác.
   - **URL** -- Nhập địa chỉ web mà tab sẽ liên kết đến.
   - **Visibility** -- Kiểm soát ai có thể xem tab này (mọi người, chỉ thành viên, v.v.). Với tab **Member Directory**, mục này chỉ kiểm soát ai nhìn thấy chính tab đó; ai có thể mở danh bạ được thiết lập bằng **Show in Directory** trên trang Member portal (xem [Cài đặt danh bạ thành viên & nhắn tin](#member-directory--messaging-settings)).
3. Nhấp vào **Save Tab** để thêm tab vào ứng dụng.

## Chỉnh sửa tab hiện có

1. Nhấp vào bất kỳ tab nào trong danh sách **App Tabs**.
2. Cập nhật tên, biểu tượng, URL, loại hoặc cài đặt hiển thị của tab.
3. Nhấp vào **Save Tab** để áp dụng thay đổi.

## Sắp xếp lại tab

Bạn có thể thay đổi thứ tự các tab xuất hiện trong ứng dụng di động. Kéo và thả tab trong danh sách để sắp xếp lại. Thứ tự hiển thị trên trang này sẽ khớp với thứ tự thành viên nhìn thấy trong ứng dụng.

:::info
Một số tab có thể tự động xuất hiện khi đáp ứng điều kiện nhất định -- ví dụ, tab Live Stream có thể hiển thị khi một buổi phát trực tiếp đang diễn ra. Các tab bạn thêm thủ công giúp bạn kiểm soát hoàn toàn những gì thành viên nhìn thấy mọi lúc.
:::

:::tip
Hãy giữ số lượng tab ở mức hợp lý. Ba đến năm tab phù hợp với hầu hết các nhà thờ. Quá nhiều tab có thể khiến thành viên khó điều hướng.
:::

## Cài đặt danh bạ thành viên & nhắn tin

Mục **Member portal** trong cùng phần Mobile chứa các cài đặt điều chỉnh danh bạ thành viên và nhắn tin riêng trong trải nghiệm B1.church:

- **Directory Approval Group** -- Nhóm xem xét các cập nhật danh bạ thành viên và [yêu cầu xóa tài khoản](../profile/account-deletion.md) trước khi chúng có hiệu lực.
- **Show in Directory** -- Ai có thể mở danh bạ thành viên và ai được liệt kê trong đó: **Admins Only** (chỉ quản trị viên), **Members and Above** (thành viên trở lên, mặc định), **Regular Attendees and Above** (người tham dự thường xuyên trở lên) hoặc **Visitors and Above** (khách viếng thăm trở lên). Những người có trạng thái thành viên thấp hơn mức bạn chọn sẽ không thấy danh bạ và không được liệt kê trong đó. **Admins Only** đóng danh bạ đối với tất cả trừ nhân viên có quyền People &gt; View (riêng trạng thái thành viên Staff thì không đủ). Những người này luôn có thể mở danh bạ và xem tất cả mọi người, bất kể cài đặt này. Khách vãng lai không bao giờ được đưa vào, vì bất kỳ ai tự đăng ký trực tuyến đều bắt đầu với vai trò khách.
- **Visibility Preference** -- Đặt mặc định toàn nhà thờ cho các thành viên chưa chọn cài đặt riêng. **Address** (Địa chỉ), **Phone Number** (Số điện thoại) và **Email** mỗi mục có một danh sách thả xuống riêng, với năm mức giống nhau được áp dụng ở mọi nơi có cấu hình hiển thị:
  - **Everyone** -- Hiển thị cho tất cả mọi người, kể cả khách truy cập ẩn danh
  - **Members** -- Chỉ hiển thị cho những người có hồ sơ Member hoặc Staff
  - **Groups Only** -- Chỉ hiển thị cho những người cùng nhóm với người này, cùng nhân viên
  - **My Group Leaders and Staff** -- Chỉ hiển thị cho trưởng nhóm của một nhóm mà người này thuộc về, cùng nhân viên
  - **Staff Only** -- Chỉ hiển thị cho nhân viên (bất kỳ ai có trạng thái thành viên là Staff, hoặc có quyền People &gt; View), và cho chính người đó

  "Nhân viên" trong các mức này là bất kỳ ai có trạng thái thành viên là Staff hoặc có quyền People &gt; View. Thay đổi về nhóm có hiệu lực ngay lập tức: ai đó vừa tham gia một nhóm, hoặc vừa được chỉ định làm trưởng nhóm, có thể xem thông tin **Groups Only** hoặc **My Group Leaders and Staff** tương ứng của các thành viên trong nhóm đó mà không cần đăng xuất rồi đăng nhập lại.

  Thành viên có thể ghi đè các mặc định này cho hồ sơ riêng của mình từ tab **Privacy** trong hồ sơ của họ trên PWA B1.church -- xem [Chỉnh sửa hồ sơ của bạn](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Tính năng bảo vệ trẻ em. B1 sẽ không mở cuộc trò chuyện riêng **mới** nếu một trong hai người dưới độ tuổi này, dựa trên ngày sinh (vai trò trong hộ gia đình được dùng làm phương án dự phòng khi không có ngày sinh trong hồ sơ). Những người dưới độ tuổi này vẫn hiển thị đầy đủ trong danh bạ -- chỉ việc nhắn tin trực tiếp bị chặn, theo **cả hai chiều**, đối với tất cả mọi người kể cả nhân viên. Trò chuyện nhóm và nhắn tin với phụ huynh của trẻ vẫn hoạt động bình thường. Các tùy chọn là Off (Tắt), 13, 16 hoặc 18; mặc định là **18**. Các cuộc trò chuyện hiện có không bị ảnh hưởng.

:::tip
Vì việc kiểm tra độ tuổi tối thiểu dựa trên ngày sinh, hãy đảm bảo đã điền ngày sinh cho trẻ em trong cộng đoàn của bạn. Cài đặt này thuộc cùng nhóm bảo vệ trẻ em với [các biện pháp an toàn check-in](../attendance/checkin-safety.md).
:::

### Lời nhắc đăng nhập trên màn hình Home

Khách truy cập mở [màn hình Home](/docs/b1-church/getting-started/navigating#home) của ứng dụng mà chưa đăng nhập sẽ thấy một lời nhắc ngắn -- mặc định là *"Sign in to see your groups, giving, and more."* (Đăng nhập để xem nhóm, tiền quyên góp và nhiều hơn nữa.) -- kèm theo nút **Sign In**. Các cài đặt **Home screen sign-in prompt** trên cùng trang Member portal (`/mobile/b1-mobile`) cho phép bạn thay đổi nội dung này:

- **Show sign-in prompt on the app home screen** -- Tắt tùy chọn này để ẩn cả lời nhắc lẫn nút **Sign In** khỏi màn hình Home. Khách truy cập vẫn có thể đăng nhập từ menu ứng dụng.
- **Sign-in prompt text** -- Thay thế nội dung mặc định bằng thông điệp của riêng bạn (tối đa 150 ký tự). Để trống nếu muốn dùng nội dung mặc định. Ô này bị vô hiệu hóa khi lời nhắc đã được tắt.

Nhấp vào **Save** để áp dụng. Thông báo **Saved** sẽ xác nhận thay đổi. Việc lưu sẽ làm mới các cài đặt được lưu trong bộ nhớ đệm của ứng dụng, nên thay đổi sẽ hiển thị lần tới khi màn hình Home được tải.

### Ô trên màn hình Home

Các tab có ảnh (xem **Image** trong [Thêm tab mới](#adding-a-new-tab)) sẽ xuất hiện trên [màn hình Home](/docs/b1-church/getting-started/navigating#home) của ứng dụng dưới dạng ô ảnh, trong một mục có tiêu đề là tên nhà thờ của bạn. Điều này bao gồm cả tab Verse of the Day nếu bạn gắn ảnh cho tab đó. Các tab có ảnh vẫn xuất hiện trên thanh tab.

Cài đặt **Home screen tiles** trên cùng trang Member portal (`/mobile/b1-mobile`) kiểm soát cách bố trí các ô này. Chọn **Layout**:

- **Grid** -- Hai ô mỗi hàng (mặc định). Khi số lượng ô là số lẻ, ô đầu tiên sẽ chiếm toàn bộ chiều rộng.
- **Scrolling row** -- Một hàng ô mà thành viên vuốt sang ngang.
- **Scrolling (automatic)** -- Hàng ô cuộn ngang tương tự, nhưng tự động di chuyển, chuyển qua một ô khoảng bốn giây và quay lại đầu khi đến cuối. Hàng sẽ tạm dừng khi thành viên chạm, di chuột qua hoặc chuyển tiêu điểm vào hàng, và tiếp tục sau vài giây. Trên thiết bị bật chế độ giảm chuyển động, hàng sẽ đứng yên và hoạt động giống như **Scrolling row**.
- **List** -- Danh sách với ảnh thu nhỏ nhỏ bên cạnh tên mỗi tab.

Nhấp vào **Save** để áp dụng.

### Các mục trên màn hình Home

Thành viên đã đăng nhập luôn xem được lịch sử tham dự và biểu mẫu đã gửi của chính mình trên [trang Me](/docs/b1-church/getting-started/me-page). Các công tắc **Home screen sections** trên cùng trang Member portal (`/mobile/b1-mobile`) có thể hiển thị các mục này trên màn hình Home:

- **Show My Attendance on Home** -- Thêm mục **My Attendance** hiển thị số lần thành viên đã tham dự trong 90 ngày qua, hai lần ghé thăm gần nhất, và liên kết **History** đến toàn bộ danh sách tham dự của họ.
- **Show My Forms on Home** -- Thêm mục **My Forms** hiển thị hai biểu mẫu đã gửi gần nhất của thành viên và liên kết **All forms**.

Cả hai đều tắt theo mặc định. Mục chỉ xuất hiện đối với thành viên đã đăng nhập và có ít nhất một bản ghi để hiển thị. Nhấp vào **Save** để áp dụng.

## Nơi các tab này xuất hiện

Các tab bạn cấu hình tại đây được hiển thị trong **PWA B1.church** mà thành viên của bạn cài đặt từ bất kỳ trang nào trên `https://yourchurchname.b1.church`. Thay đổi bạn thực hiện trên trang này sẽ được phản ánh lần tới khi thành viên mở ứng dụng.

Trên điện thoại, thanh tab phía dưới hiển thị **Home**, tối đa ba tab của bạn và **More**; trên máy tính, thanh tiêu đề hiển thị tối đa năm tab. Các màn hình tích hợp sẵn (như Sermons, Giving hoặc Groups) được ưu tiên giữ các vị trí này trước, và các tab **Internal Page** sẽ lấp đầy những vị trí còn trống. Các tab **External URL** và **Verse of the Day** không bao giờ được chiếm vị trí. Mọi tab, kể cả những tab không vừa, đều được liệt kê trên trang **More** của ứng dụng. Xem [Điều hướng B1App](/docs/b1-church/getting-started/navigating) để biết thành viên nhìn thấy gì. (Các tab cũng được hiển thị trong [ứng dụng B1 Mobile gốc](/docs/b1-mobile/) cũ dành cho những thành viên vẫn đang sử dụng, nhưng ứng dụng đó đã ngừng hỗ trợ và không còn được cập nhật.)

## Bước tiếp theo

- [Cài đặt nhà thờ](./church-settings.md) -- Cấu hình thông tin và thương hiệu nhà thờ
- [Vai trò & Quyền](./roles-permissions.md) -- Quản lý quyền truy cập cho nhóm của bạn
