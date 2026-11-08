---
title: "Cài đặt ứng dụng di động"
description: "Cấu hình các tab điều hướng, ô biểu tượng trên màn hình chính, lời nhắc đăng nhập và cài đặt quyền riêng tư của danh bạ thành viên cho ứng dụng thành viên B1.church trong B1 Admin."
---

# Cài đặt ứng dụng di động

<div class="article-intro">

Trang Cài đặt ứng dụng di động cho phép bạn cấu hình các tab điều hướng xuất hiện trong **trải nghiệm di động B1.church (PWA)** dành cho thành viên trong hội thánh. Bạn kiểm soát tab nào được hiển thị, chúng liên kết đến đâu và cách chúng được hiển thị.

</div>

## Video hướng dẫn

<YouTube id="ydY7WGK16fE" title="Tùy chỉnh ứng dụng thành viên của hội thánh bạn trong B1" />

:::info
Các tab được cấu hình tại đây sẽ xuất hiện trong ứng dụng B1, mà thành viên có thể [cài đặt như một Ứng dụng web tiến bộ (PWA)](../../b1-church/getting-started/installing-pwa.md). Hãy chia sẻ trang cài đặt của hội thánh bạn — `https://yourchurchname.b1.church/mobile/install` — với thành viên; trang này sẽ hướng dẫn họ cài đặt ứng dụng trên thiết bị của mình mà không cần tải từ App Store hay Google Play.
:::

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần có quyền "Chỉnh sửa cài đặt hội thánh". Xem [Vai trò và quyền hạn](./roles-permissions.md) nếu bạn chưa có quyền truy cập.
- Cấu hình [Cài đặt hội thánh](./church-settings.md) trước, bao gồm tên hội thánh và thương hiệu

</div>

## Truy cập cài đặt điều hướng

1. Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái) và mở rộng **Mobile**.
2. Nhấp **Navigation** (`/mobile/navigation`).
3. Trang Navigation hiển thị các tab ứng dụng hiện tại của bạn.

## Thêm tab mới

1. Nhấp nút **Add Tab** ở đầu trang.
2. Điền thông tin chi tiết của tab:
   - **Name** -- Nhãn xuất hiện trên tab (ví dụ: "Sermons" hoặc "Give").
   - **Icon** -- Nhấp bộ chọn biểu tượng để chọn biểu tượng cho tab của bạn.
   - **Image** -- Nhấp **Select Image** (hoặc **Change Image**) để gắn một hình ảnh cho tab. Các tab có hình ảnh sẽ xuất hiện dưới dạng ô hình ảnh trên màn hình chính của ứng dụng -- xem [Ô trên màn hình chính](#home-screen-tiles).
   - **Tab Type** -- Chọn từ các tùy chọn như Bible, Live Stream, Donation, Website và nhiều loại khác.
   - **URL** -- Nhập địa chỉ web mà tab sẽ liên kết đến.
   - **Visibility** -- Kiểm soát ai có thể xem tab này (mọi người, chỉ thành viên, v.v.). Đối với tab **Member Directory**, mục này chỉ kiểm soát ai nhìn thấy chính tab đó; ai có thể mở danh bạ được đặt bởi **Show in Directory** trên trang Member portal (xem [Cài đặt danh bạ thành viên và nhắn tin](#member-directory--messaging-settings)).
3. Nhấp **Save Tab** để thêm tab vào ứng dụng.

## Chỉnh sửa tab hiện có

1. Nhấp vào bất kỳ tab nào trong danh sách **App Tabs**.
2. Cập nhật tên, biểu tượng, URL, loại hoặc cài đặt hiển thị của tab.
3. Nhấp **Save Tab** để áp dụng thay đổi.

## Sắp xếp lại tab

Bạn có thể thay đổi thứ tự xuất hiện của các tab trong ứng dụng di động. Kéo và thả các tab trong danh sách để sắp xếp lại. Thứ tự hiển thị trên trang này khớp với thứ tự thành viên sẽ thấy trong ứng dụng.

:::info
Một số tab có thể tự động xuất hiện khi đáp ứng các điều kiện nhất định -- ví dụ, tab Live Stream có thể hiện ra khi một buổi phát trực tiếp đang diễn ra. Các tab được thêm thủ công giúp bạn toàn quyền kiểm soát những gì thành viên thấy vào mọi lúc.
:::

:::tip
Hãy giữ số lượng tab ở mức hợp lý. Ba đến năm tab phù hợp với hầu hết các hội thánh. Quá nhiều tab có thể khiến việc điều hướng trở nên khó hiểu đối với thành viên.
:::

## Cài đặt danh bạ thành viên và nhắn tin

Mục **Member portal** trong cùng phần Mobile chứa các cài đặt điều chỉnh danh bạ thành viên và nhắn tin riêng trong trải nghiệm B1.church:

- **Directory Approval Group** -- Nhóm xem xét các cập nhật danh bạ thành viên và [yêu cầu xóa tài khoản](../profile/account-deletion.md) trước khi chúng có hiệu lực.
- **Show in Directory** -- Ai có thể mở danh bạ thành viên và ai được liệt kê trong đó: **Admins Only**, **Members and Above** (mặc định), **Regular Attendees and Above** hoặc **Visitors and Above**. Những người có trạng thái thành viên thấp hơn mức bạn chọn sẽ không thấy danh bạ và không được liệt kê trong đó. **Admins Only** đóng danh bạ đối với tất cả mọi người ngoại trừ nhân sự có quyền People &gt; View (riêng trạng thái thành viên Staff thì không đủ); những người này luôn có thể mở danh bạ và xem tất cả mọi người, bất kể cài đặt này là gì. Khách không bao giờ được đưa vào, vì bất kỳ ai tự đăng ký trực tuyến đều bắt đầu với tư cách khách.
- **Visibility Preference** -- Đặt mặc định toàn hội thánh cho các thành viên chưa chọn cài đặt riêng. **Address**, **Phone Number** và **Email** mỗi mục có một danh sách thả xuống riêng, với năm mức như nhau được áp dụng ở mọi nơi có cấu hình hiển thị:
  - **Everyone** -- hiển thị với bất kỳ ai, kể cả khách vãng lai chưa đăng nhập
  - **Members** -- chỉ hiển thị với những người có hồ sơ Member hoặc Staff
  - **Groups Only** -- chỉ hiển thị với những người cùng nhóm với người này, cùng nhân sự
  - **My Group Leaders and Staff** -- chỉ hiển thị với những người lãnh đạo một nhóm mà người này thuộc về, cùng nhân sự
  - **Staff Only** -- chỉ hiển thị với nhân sự (bất kỳ ai có trạng thái thành viên là Staff, hoặc có quyền People &gt; View), và với chính người đó

  "Nhân sự" trong các mức này nghĩa là bất kỳ ai có trạng thái thành viên là Staff hoặc có quyền People &gt; View. Thay đổi về nhóm có hiệu lực ngay lập tức: một người vừa tham gia nhóm, hoặc vừa được bổ nhiệm làm trưởng nhóm, có thể xem thông tin **Groups Only** hoặc **My Group Leaders and Staff** tương ứng của các thành viên trong nhóm đó mà không cần đăng xuất rồi đăng nhập lại.

  Thành viên có thể ghi đè các mặc định này cho hồ sơ của chính họ từ tab **Privacy** trong hồ sơ cá nhân trên PWA B1.church -- xem [Chỉnh sửa hồ sơ của bạn](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Một biện pháp bảo vệ trẻ em. B1 sẽ không mở cuộc trò chuyện riêng **mới** khi một trong hai người dưới độ tuổi này, dựa trên ngày sinh (vai trò trong hộ gia đình được dùng thay thế khi không có ngày sinh trong hồ sơ). Những người dưới độ tuổi này vẫn hoàn toàn hiển thị trong danh bạ -- chỉ việc nhắn tin trực tiếp bị chặn, theo **cả hai chiều**, đối với mọi người kể cả nhân sự. Trò chuyện nhóm và nhắn tin đến cha mẹ của trẻ vẫn hoạt động bình thường. Các tùy chọn là Off, 13, 16 hoặc 18; mặc định là **18**. Các cuộc trò chuyện hiện có không bị ảnh hưởng.

:::tip
Vì việc kiểm tra độ tuổi tối thiểu dựa vào ngày sinh, hãy đảm bảo ngày sinh của trẻ em trong hội thánh đã được điền đầy đủ. Cài đặt này thuộc cùng nhóm kiểm soát an toàn trẻ em với [các biện pháp an toàn khi điểm danh](../attendance/checkin-safety.md).
:::

### Lời nhắc đăng nhập trên màn hình chính

Khách mở [màn hình chính](/docs/b1-church/getting-started/navigating#home) của ứng dụng mà chưa đăng nhập sẽ thấy một lời nhắc ngắn -- theo mặc định là *"Sign in to see your groups, giving, and more."* -- bên cạnh nút **Sign In**. Các cài đặt **Home screen sign-in prompt** trên cùng trang Member portal (`/mobile/b1-mobile`) cho phép bạn thay đổi nội dung này:

- **Show sign-in prompt on the app home screen** -- Tắt tùy chọn này để ẩn cả lời nhắc lẫn nút **Sign In** khỏi màn hình chính. Khách vẫn có thể đăng nhập từ menu của ứng dụng.
- **Sign-in prompt text** -- Thay thế nội dung mặc định bằng thông điệp của riêng bạn (tối đa 150 ký tự). Để trống nếu muốn dùng nội dung mặc định. Ô này bị vô hiệu hóa khi lời nhắc đang tắt.

Nhấp **Save** để áp dụng. Thông báo **Saved** sẽ xác nhận thay đổi. Việc lưu sẽ làm mới các cài đặt đã được lưu trong bộ nhớ đệm của ứng dụng, nên thay đổi sẽ hiển thị vào lần tiếp theo màn hình chính được tải.

### Ô trên màn hình chính

Các tab có hình ảnh (xem **Image** trong [Thêm tab mới](#adding-a-new-tab)) xuất hiện trên [màn hình chính](/docs/b1-church/getting-started/navigating#home) của ứng dụng dưới dạng ô hình ảnh, trong một phần có tiêu đề là tên hội thánh của bạn. Điều này bao gồm cả tab Verse of the Day, nếu bạn gắn hình ảnh cho nó. Các tab có hình ảnh vẫn xuất hiện trên thanh tab.

Cài đặt **Home screen tiles** trên cùng trang Member portal (`/mobile/b1-mobile`) kiểm soát cách bố trí các ô này. Chọn một **Layout**:

- **Grid** -- Hai ô mỗi hàng (mặc định). Khi số ô là số lẻ, ô đầu tiên sẽ kéo dài toàn bộ chiều rộng.
- **Scrolling row** -- Một hàng ô mà thành viên vuốt sang ngang.
- **Scrolling (automatic)** -- Hàng ô vuốt ngang tương tự, nhưng tự động di chuyển, chuyển sang ô tiếp theo khoảng bốn giây một lần và quay lại ô đầu tiên sau ô cuối cùng. Hàng ô tạm dừng khi thành viên chạm, di chuột qua hoặc chuyển tab vào hàng, và tiếp tục sau vài giây. Trên thiết bị đã bật chế độ giảm chuyển động, hàng ô sẽ đứng yên và hoạt động như **Scrolling row**.
- **List** -- Danh sách với một hình thu nhỏ nhỏ bên cạnh tên của mỗi tab.

Trong cả hai bố cục cuộn, khi có nhiều ô hơn số lượng vừa với chiều rộng màn hình, một hàng chấm tròn sẽ xuất hiện bên dưới các ô, mỗi ô một chấm, với chấm của ô hiện tại được tô đặc. Thành viên có thể nhấn vào một chấm để chuyển đến ô đó.

Nhấp **Save** để áp dụng.

### Các mục trên màn hình chính

Thành viên đã đăng nhập luôn thấy lịch sử điểm danh và các biểu mẫu đã gửi của mình trên [trang Me](/docs/b1-church/getting-started/me-page). Các công tắc **Home screen sections** trên cùng trang Member portal (`/mobile/b1-mobile`) cũng có thể hiển thị các mục này trên màn hình chính:

- **Show My Attendance on Home** -- Thêm một mục **My Attendance** hiển thị số lần thành viên đã tham dự trong 90 ngày qua, hai lần ghé thăm gần nhất, và liên kết **History** dẫn đến toàn bộ danh sách điểm danh của họ.
- **Show My Forms on Home** -- Thêm một mục **My Forms** hiển thị hai biểu mẫu đã gửi gần nhất của thành viên và liên kết **All forms**.

Cả hai đều tắt theo mặc định. Một mục chỉ xuất hiện đối với thành viên đã đăng nhập và có ít nhất một bản ghi để hiển thị. Nhấp **Save** để áp dụng.

## Các tab này xuất hiện ở đâu

Các tab bạn cấu hình tại đây sẽ hiển thị trong **PWA B1.church** mà thành viên cài đặt từ bất kỳ trang nào trên `https://yourchurchname.b1.church`. Các thay đổi bạn thực hiện trên trang này sẽ được phản ánh vào lần tiếp theo thành viên mở ứng dụng.

Trên điện thoại, thanh tab dưới cùng hiển thị **Home**, tối đa ba tab của bạn và **More**; trên máy tính, phần tiêu đề hiển thị tối đa năm tab. Các màn hình có sẵn (như Sermons, Giving hoặc Groups) được ưu tiên các vị trí trước, và các tab **Internal Page** sẽ lấp đầy những vị trí còn trống. Các tab **External URL** và **Verse of the Day** không bao giờ chiếm một vị trí. Mọi tab, kể cả những tab không vừa, đều được liệt kê trên trang **More** của ứng dụng.

Ngoại lệ là các tab nằm bên trong một tab **Folder**: chúng chỉ xuất hiện trên màn hình riêng của thư mục, mà thành viên mở bằng cách nhấn vào thư mục. Màn hình đó hiển thị các tab dưới dạng ô hình ảnh khi tất cả chúng đều có hình ảnh, hoặc dưới dạng danh sách nếu không. Thư mục không chứa tab nào mà thành viên có thể xem sẽ bị ẩn đối với thành viên đó. Xem [Tab thư mục](../../b1-church/getting-started/navigating.md#folder-tabs). Xem [Điều hướng B1App](../../b1-church/getting-started/navigating.md) để biết thành viên sẽ thấy gì.

## Bước tiếp theo

- [Cài đặt hội thánh](./church-settings.md) -- Cấu hình thông tin và thương hiệu hội thánh của bạn
- [Vai trò và quyền hạn](./roles-permissions.md) -- Quản lý quyền truy cập cho nhóm của bạn
