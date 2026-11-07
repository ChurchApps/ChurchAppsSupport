---
title: "Thiết lập điểm danh"
---

# Thiết lập điểm danh

<div class="article-intro">

Trước khi có thể theo dõi điểm danh, bạn cần cho B1 Admin biết các địa điểm thực tế của hội thánh, thời gian diễn ra các buổi nhóm, và nhóm nào sinh hoạt vào buổi nào. Bước thiết lập một lần này sẽ tạo ra cấu trúc làm nền tảng cho mọi việc theo dõi và báo cáo điểm danh trong hội thánh của bạn.

</div>

## Video hướng dẫn

<YouTube id="LQPc2gVlXvQ" title="Thiết lập buổi nhóm và điểm danh trong B1" next="Thiết lập check-in cho thiếu nhi trong B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần có tài khoản B1 Admin đang hoạt động với quyền điểm danh **Edit Services**. Tùy chọn **Setup** chỉ hiển thị với những người có quyền này; chỉ xem điểm danh thì chưa đủ. Xem [Vai trò & Quyền hạn](../people/roles-permissions.md) nếu bạn chưa chắc về mức truy cập của mình.
- Nếu bạn dự định gán nhóm vào các giờ nhóm, hãy đảm bảo [các nhóm đã được tạo](../groups/creating-groups.md) trước.

</div>

## Các khái niệm chính

- **Campus** -- một địa điểm thực tế nơi hội thánh của bạn nhóm họp (ví dụ: "Main Campus," "North Campus"). Campus được quản lý trong **Settings**.
- **Service** -- một buổi nhóm định kỳ tại một campus (ví dụ: "Sunday Service," "Midweek").
- **Service Time** -- một thời điểm cụ thể mà buổi nhóm diễn ra (ví dụ: "9:00 AM," "11:00 AM").
- **Scheduled Group** -- một nhóm được gán vào một service time cụ thể. Điểm danh được theo dõi trong ngữ cảnh của buổi nhóm đó.
- **Unscheduled Group** -- một nhóm tự theo dõi điểm danh, không gắn với service time nào.

## Thiết lập cấu trúc điểm danh

1. Mở **B1 Admin**, mở [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), rồi mở rộng **People**.
2. Nhấp **Attendance**, sau đó nhấp **Setup** ở cột bên trái. Bảng **Service structure** sẽ mở ra, với số lượng campus, service time, và các nhóm scheduled và unscheduled hiển thị ở phía trên. Các con số này cập nhật ngay khi bạn thêm, chỉnh sửa hoặc xóa mục trong bảng.
3. Nhấp **Manage Campuses** (góc trên bên phải của bảng **Service structure**). Thao tác này sẽ đưa bạn đến **Settings → Campuses**. Nhấp **Add Campus**, nhập tên địa điểm (địa chỉ và múi giờ là tùy chọn), rồi nhấp **Save**.
4. Quay lại **People → Attendance** và nhấp **Setup**. Campus của bạn giờ đã xuất hiện trong bảng thiết lập.
5. Nhấp nút **+ ở cột Service** bên dưới campus của bạn. Nhập tên buổi nhóm như "Sunday Service" rồi nhấp **Save**.
6. Nhấp nút **+ ở cột Time** bên dưới buổi nhóm. Nhập tên **Service Time** như "9:00 AM", tùy chọn điền [lịch check-in](#thiet-lap-lich-check-in), rồi nhấp **Save**. Lặp lại cho từng service time.
7. Để kết nối một nhóm với service time, mở nhóm từ **People > Groups**, nhấp **Edit**, rồi dùng **Add Service Time** -- xem phần tiếp theo.

### Bật Track Attendance cho nhóm

Trước khi một nhóm có thể ghi nhận điểm danh, Track Attendance phải được bật cho nhóm đó.

1. Trong Jump menu, chọn **People > Groups** và chọn nhóm.
2. Nhấp nút **Edit** bên dưới tên nhóm.
3. Đặt **Track Attendance** thành **Yes**.
4. Nhấp **Save**.

:::tip
Nếu bạn đã gán nhóm vào một service time ở bước trước, hãy dùng thêm tùy chọn **Add Service Time** trên màn hình chỉnh sửa của nhóm để liên kết nhóm với buổi nhóm đúng. Điều này đảm bảo các buổi điểm danh được kết nối với đúng campus và thời gian.
:::

:::tip
Nếu một nhóm sinh hoạt ngoài buổi nhóm thông thường -- như nhóm nhỏ giữa tuần tự theo dõi điểm danh -- bạn có thể để nhóm đó ở dạng unscheduled group. Nhóm vẫn sẽ xuất hiện trong báo cáo **Group Attendance**.
:::

## Thiết lập lịch check-in

Mỗi service time có thể có một lịch check-in tùy chọn để [tự check-in](check-in.md) mở và đóng tự động mỗi tuần. Nếu không có lịch, check-in cho service time đó luôn khả dụng bất cứ lúc nào (miễn là phòng không bị đóng vì lý do khác, chẳng hạn như đã đầy).

1. Trong chế độ xem **Setup**, nhấp vào tên service time ở cột **Time** (hoặc thêm mới).
2. Ở mục **Check-in Schedule**, chọn **Day** trong tuần mà service time đó diễn ra.
3. Đặt **Start Time** và tùy chọn **End Time**.
4. Nhập **Open check-in (minutes before start)** -- ví dụ, `30` sẽ mở check-in trước giờ bắt đầu nửa tiếng.
5. Nhập **Close check-in (minutes after end)** -- ví dụ, `15` sẽ giữ check-in mở thêm 15 phút sau giờ kết thúc. Nếu bạn không đặt end time, giá trị này được tính từ giờ bắt đầu. Nếu bạn để trống cả **End Time** lẫn **Close check-in**, check-in sẽ mở đến hết ngày hôm đó.
6. Nhấp **Save**.

Lịch này lặp lại mỗi tuần và được tính theo múi giờ của campus chứa buổi nhóm. Nếu campus đó không có múi giờ, [Time Zone](../settings/church-settings.md#time-zone) của hội thánh bạn sẽ được dùng thay thế; nếu vẫn không có, múi giờ của campus đầu tiên có thiết lập múi giờ sẽ được dùng; cuối cùng là giờ miền Đông (America/New_York). Nếu check-in mở sai giờ, hãy kiểm tra **Time Zone** của campus trong [Campuses](../settings/campuses.md). Để xóa lịch, đặt **Day** về lại **No schedule** rồi nhấp **Save**. Lịch chỉ có hiệu lực khi cả **Day** và **Start Time** đều được đặt.

Khi cửa sổ check-in của một service time đang đóng:

- **Tự check-in trên B1.church** sẽ hiển thị service time đó là **Closed** (hoặc, chẳng hạn, **Closed · opens Sun 9:30 AM**) và không thể chọn. Nếu tất cả các giờ của một buổi nhóm đều đang đóng, các gia đình sẽ thấy thời điểm check-in mở, chẳng hạn như "Check-in opens Sun 9:30 AM."
- **Ứng dụng kiosk B1 Checkin** cũng hiển thị service time là **Closed** kèm thời điểm mở. Nếu mọi giờ của một buổi nhóm đều đang đóng, kiosk sẽ cho biết khi nào check-in cho buổi đó mở. Người đã check-in vào một service time đang đóng sẽ thấy nhóm của mình với trạng thái **Checked in** thay thế. Nếu cửa sổ đóng giữa chừng một lượt check-in, kiosk sẽ không hoàn tất và hiển thị màn hình **Can't check in yet**, liệt kê phòng bị ảnh hưởng để gia đình có thể chọn phòng khác.

Một hộ gia đình đã check-in cho một service time trước đó vẫn có thể quay lại và thêm một service time sau đó đang mở, ngay cả khi cửa sổ của service time trước đã đóng. Các lượt check-in hiện có của họ vẫn được giữ nguyên.

:::tip
Đặt cửa sổ mở đủ rộng (ví dụ: 45 phút trước giờ bắt đầu) để các gia đình đến sớm và tình nguyện viên có thể check-in, và đặt cửa sổ đóng ngắn để những người đến muộn vẫn có thể check-in sau khi buổi nhóm đã bắt đầu.
:::

## Chỉnh sửa thiết lập

Bạn có thể cập nhật thiết lập bất cứ lúc nào. Chọn một campus, service time hoặc nhóm rồi nhấp **Edit** để thay đổi chi tiết, hoặc **Delete** để xóa.

:::info
Xóa một service time không làm mất các bản ghi điểm danh trong quá khứ. Dữ liệu lịch sử của bạn vẫn được giữ nguyên ngay cả khi bạn thay đổi lịch.
:::

## Bước tiếp theo

Khi các campus, service time và nhóm đã sẵn sàng, bạn có thể bắt đầu [ghi nhận điểm danh](recording-attendance.md) thủ công hoặc thiết lập [tự check-in](check-in.md) cho các buổi nhóm của mình.
