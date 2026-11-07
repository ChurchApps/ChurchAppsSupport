---
title: "Thêm người"
---

# Thêm người

<div class="article-intro">

Mục Người là nền tảng của B1 Admin, tức là cơ sở dữ liệu thành viên của nhà thờ bạn. Mọi tính năng khác (nhóm, điểm danh, quyên góp, biểu mẫu) đều liên kết với hồ sơ người. Hướng dẫn này sẽ chỉ bạn cách thêm một người vào cơ sở dữ liệu, chỉnh sửa thông tin của họ và liên kết các thành viên trong gia đình vào cùng một hộ gia đình.

</div>

## Video hướng dẫn

<YouTube id="NTL1UDQpx8s" title="Thêm người và hộ gia đình trong B1" next="Nhập cơ sở dữ liệu người trong B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần có tài khoản B1 Admin đang hoạt động và có quyền quản lý người. Nếu bạn không chắc về mức quyền truy cập của mình, hãy xem [Vai trò và quyền](roles-permissions.md).
- Nếu bạn cần thêm nhiều hơn vài người, hãy cân nhắc dùng công cụ [Nhập CSV](importing-data.md) thay thế.

</div>

## Thêm một người

1. Truy cập bảng điều khiển quản trị B1.church.
2. Mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), mở rộng **People**, rồi nhấp **People**.
3. Nhấp nút **Add Person** ở đầu trang. Trang sẽ cuộn xuống form **Add New Person** nằm bên dưới danh bạ.
4. Điền **First Name**, **Last Name** và **Email** của người đó, sau đó nhấp **Add**.

Trang hồ sơ của người đó sẽ mở ra để bạn thêm các thông tin chi tiết khác.

:::tip
Nếu bạn đang chuyển từ một hệ thống quản lý nhà thờ khác, tính năng [Nhập dữ liệu](importing-data.md) cho phép bạn đưa toàn bộ danh bạ từ tệp CSV vào, nhanh hơn nhiều so với việc thêm từng người một.
:::

### Cảnh báo trùng lặp

Nếu địa chỉ email (hoặc, khi tạo người từ form Edit đầy đủ, số điện thoại hoặc họ, tên và ngày sinh trùng khớp) trùng với một người đã có trong cơ sở dữ liệu, hộp thoại **Possible Duplicate** sẽ xuất hiện trước khi bản ghi mới được lưu. Hộp thoại liệt kê từng người trùng khớp cùng với email, số điện thoại và ngày sinh của họ để bạn so sánh.

- Nhấp **Use Existing** bên cạnh một kết quả trùng khớp để dùng hồ sơ của người đó thay vì tạo bản ghi mới.
- Nhấp **Create Anyway** để thêm người mới dù đã tìm thấy một kết quả có thể trùng khớp.

Tính năng này chỉ kiểm tra trùng lặp khi bạn đang tạo một người hoàn toàn mới. Việc chỉnh sửa bản ghi đã có sẽ không bao giờ kích hoạt nó. Tính năng này chỉ ngăn tạo thêm bản ghi trùng lặp; nó không gộp hai bản ghi đã tồn tại.

## Chỉnh sửa thông tin

1. Trên trang hồ sơ của người đó, nhấp nút **Edit** bên dưới thông tin liên hệ ở bên trái.
2. Trong form **Personal Details**, điền thêm thông tin như **Title** (chọn Mr, Mrs, Miss, Ms, Dr, Prof, Rev hoặc Pastor từ danh sách, hoặc tự nhập, tối đa 10 ký tự), tên đệm, trạng thái thành viên (**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive** hoặc **Deceased**), ngày tháng, địa chỉ, số điện thoại và (đối với trẻ em và học sinh) lớp và trường học.
3. Nhấp **Save** để lưu thông tin cá nhân.

Phía bên trái của hồ sơ hiển thị ảnh, tên, trạng thái thành viên, thông tin liên hệ, giá trị của bất kỳ [trường tùy chỉnh](../settings/custom-fields.md) nào và hộ gia đình của người đó. Bên dưới hộ gia đình, **Added** hiển thị ngày bản ghi được tạo (chỉ áp dụng cho những người được thêm kể từ cuối tháng 10 năm 2026). Nhấp vào ảnh để thay đổi ảnh. Bên dưới nút **Edit** là một số thao tác khác: **Workflow** (thêm người vào một [quy trình](../serving/workflows.md)), **Merge**, **Export** và **Export Data**.

Phần còn lại của hồ sơ hiển thị một mục tóm tắt cho từng loại thông tin liên quan:

- **Attendance**: Hiển thị những tuần gần đây mà người đó đã tham dự và các lần đến gần nhất. Nhấp **All years** để xem toàn bộ lịch sử tham dự, bao gồm cơ sở, buổi nhóm, giờ buổi nhóm, nhóm và cột **Checked In** với thời gian điểm danh tại kiosk (hiển thị dấu gạch ngang đối với các lần đến không có điểm danh tại kiosk), hoặc **Print** để in (bản in có logo và tên nhà thờ của bạn căn giữa ở phía trên, phía trên tên của người đó). Để xem xu hướng tham dự toàn nhà thờ thay vì lịch sử của một cá nhân, hãy xem [Theo dõi điểm danh](../attendance/tracking-attendance.md).
- **Donations**: Hiển thị các khoản quyên góp trong năm nay, bao gồm cả khoản góp vào quỹ không được khấu trừ thuế. Nhấp **All years** để xem toàn bộ [lịch sử quyên góp](../donations/recording-donations.md), hoặc **Log a gift** để ghi nhận một khoản mới. Nếu nhà thờ của bạn đã bật [Quyền riêng tư khi quyên góp](../settings/church-settings.md#giving-privacy), số tiền sẽ được ẩn cho đến khi bạn nhấp **Show giving**.
- **Groups**: Liệt kê các [thành viên nhóm](../groups/group-members.md) của người đó, cùng với **Joined** và ngày tham gia của từng nhóm khi thông tin này có trong hồ sơ.
- **Notes**: Hiển thị các ghi chú gần đây về người đó (chăm sóc mục vụ, theo dõi, v.v.). Nhấp **All notes** để đọc và thêm ghi chú. Mỗi ghi chú hiển thị người viết và ngày giờ đăng. Để xem các ghi chú gần đây của tất cả mọi người cùng lúc, hãy dùng trang [Notes](./notes.md).
- **Forms**: Liệt kê các biểu mẫu của người đó và cho biết mỗi biểu mẫu đã được gửi hay chưa (xem [Làm việc với biểu mẫu](#working-with-forms) bên dưới).

Khi mở một trong các chế độ xem đầy đủ này, hãy nhấp liên kết **Back to** kèm tên người đó ở đầu trang để quay lại hồ sơ.

## Gửi email cho một người

Nếu người đó có địa chỉ email trong hồ sơ, nút **Email** sẽ xuất hiện bên dưới thông tin liên hệ ở bên trái của hồ sơ.

1. Trên hồ sơ của người đó, nhấp **Email**.
2. Hộp thoại **Email** có tiêu đề là tên người đó sẽ mở ra, hiển thị **Sending to** với địa chỉ của người đó.
3. Tùy chọn: chọn một mẫu đã lưu từ **Load Template (optional)**.
4. Nhập **Subject** và soạn nội dung thư.
5. Nhấp **Send Email**.

Để soạn thư trong ứng dụng email riêng của bạn, hãy nhấp **Open in my email app**.

:::info
Gửi email từ B1 áp dụng cùng giới hạn phê duyệt và giới hạn hằng ngày như email nhóm. Nếu nhà thờ của bạn chưa được phê duyệt, hộp thoại sẽ yêu cầu bạn gửi yêu cầu xem xét. Trong lúc chờ, bạn vẫn có thể nhấp **Open in my email app**. Xem [Bật email nhóm cho nhà thờ của bạn](../groups/group-members.md#turning-on-group-email-for-your-church). Những người dùng không có quyền chỉnh sửa thành viên nhóm sẽ được chuyển thẳng sang ứng dụng email khi nhấp **Email**.
:::

## Làm việc với biểu mẫu

Bạn có thể điền các biểu mẫu tùy chỉnh trực tiếp từ hồ sơ của một người. Đây là các biểu mẫu do người dùng tự định nghĩa, và bạn có thể tạo chúng theo hướng dẫn [Tạo biểu mẫu](../forms/creating-forms.md).

1. Trên hồ sơ của người đó, tìm mục **Forms**. Mục này liệt kê từng biểu mẫu cùng với trạng thái **Submitted** hoặc **Not submitted**.
2. Nhấp vào tên biểu mẫu để mở (hoặc nhấp **All forms** để xem toàn bộ danh sách).
3. Nhấp vào **biểu tượng chỉnh sửa** (bút chì) trên biểu mẫu, điền thông tin và nhấp **Save**.

Khi biểu mẫu đã được gửi, nhấp vào **biểu tượng in** bên cạnh để in các câu trả lời đã điền của người đó. Khi người đó chỉ có một lần gửi cho một biểu mẫu, biểu mẫu sẽ hiển thị **Submitted** cùng ngày phía trên các câu trả lời.

Nếu một lần gửi bị gán nhầm người, hãy nhấp vào biểu tượng **Change person** (hai mũi tên) bên cạnh để chuyển sang người khác hoặc hủy liên kết. Xem [Thay đổi người trong một lần gửi](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Biểu mẫu được liên kết với hồ sơ của một người sử dụng loại biểu mẫu **People**. Nếu bạn cần một biểu mẫu độc lập (như đăng ký sự kiện), hãy xem tùy chọn [Stand Alone form](../forms/creating-forms.md) trong hướng dẫn về biểu mẫu.
:::

:::tip
Nếu bạn chỉ cần theo dõi một hoặc hai thông tin bổ sung về người (một ngày, một con số, một câu trả lời có/không), hãy dùng [Trường tùy chỉnh](../settings/custom-fields.md) thay vì biểu mẫu. Chúng nhanh hơn để điền và có thể tìm kiếm trực tiếp trong Advanced Search.
:::

## Quản lý hộ gia đình {#managing-households}

Hộ gia đình cho phép bạn liên kết các thành viên trong gia đình với nhau. Điều này đặc biệt hữu ích cho [điểm danh](../attendance/check-in.md), khi một phụ huynh có thể điểm danh cho tất cả con cái cùng lúc.

1. Trên hồ sơ của một người, nhấp **Edit** bên cạnh tiêu đề **Household** ở bên trái.
2. Trình chỉnh sửa hộ gia đình sẽ mở ra. Chọn **household role** cho người hiện tại (ví dụ: Head, Spouse, Child, Other).
3. Nhấp biểu tượng **Add** để thêm một thành viên khác vào hộ gia đình.
4. Trong mục **Add Household Member**, nhập tên người đó vào ô tìm kiếm rồi nhấn **Enter** hoặc nhấp biểu tượng tìm kiếm. (Trước khi bạn nhập, một danh sách ngắn **Recent people** sẽ được hiển thị.)
5. Khi người đó xuất hiện trong kết quả, nhấp vào tên hoặc biểu tượng thêm bên cạnh.
6. Chọn vai trò trong hộ gia đình của họ và nhấp **Save** để hoàn tất thiết lập hộ gia đình.
