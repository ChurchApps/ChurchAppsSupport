---
title: "Tìm kiếm người"
description: "Tìm trong danh bạ Người của B1 Admin theo tên, sắp xếp và chọn cột trong chế độ bảng, tạo bộ lọc bằng Tìm kiếm nâng cao và xuất kết quả ra CSV."
---

# Tìm kiếm người

<div class="article-intro">

Trang **Người** hiển thị danh bạ nhà thờ của bạn dưới dạng danh sách hộ gia đình có thể tìm kiếm, hoặc dạng bảng cá nhân có thể sắp xếp. Bạn có thể nhanh chóng tìm thấy bất kỳ ai trong hội thánh, tùy chỉnh thông tin hiển thị và xuất kết quả. Tìm kiếm hiệu quả là yếu tố thiết yếu cho các công việc quản trị nhà thờ hằng ngày như theo dõi khách viếng thăm, chuẩn bị danh sách liên lạc và quản lý hồ sơ thành viên.

</div>

## Video hướng dẫn

<YouTube id="7Y-tN9RmnDQ" title="Tìm kiếm người và tạo danh sách trong B1" next="Trường tùy chỉnh, chỉnh sửa hàng loạt và xuất dữ liệu trong B1" nextUrl="/docs/b1-admin/settings/custom-fields" />

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần có tài khoản B1 Admin đang hoạt động với quyền xem danh sách người. Xem [Vai trò và quyền hạn](roles-permissions.md) nếu bạn chưa chắc về mức truy cập của mình.
- Danh bạ nhà thờ của bạn nên có người trong đó. Nếu bạn chưa thêm ai, xem [Thêm người](adding-people.md) hoặc [Nhập dữ liệu](importing-data.md).

</div>

## Hộ gia đình và chế độ xem bảng

Trang Người liệt kê danh bạ theo **hộ gia đình**, được nhóm theo thứ tự bảng chữ cái. Mỗi hàng hiển thị ảnh của hộ, tên hộ (ví dụ "Gia đình Smith") và tên của tất cả thành viên trong hộ. Nhấp vào một hộ để mở hồ sơ của chủ hộ, hoặc nhấp vào tên bất kỳ thành viên nào để mở hồ sơ người đó. Một số đếm phía trên danh sách cho biết có bao nhiêu hộ và bao nhiêu người đang hiển thị.

Dùng nút chuyển **Xem dưới dạng** phía trên danh sách để chuyển giữa **Hộ gia đình** và **Bảng**. Chế độ **Bảng** liệt kê mỗi người một hàng và là nơi bạn có thể sắp xếp và chọn cột (xem bên dưới). B1 ghi nhớ lựa chọn của bạn trên thiết bị đó.

Trong chế độ **Bảng**, trạng thái thành viên của mỗi người hiển thị dưới tên, và mỗi trong bảy trạng thái có một màu riêng, giống với màu được dùng trên hồ sơ của người đó. Bất kỳ ai có vai trò trong hộ được đặt là **Trẻ em** cũng sẽ có thẻ **Trẻ em** bên cạnh trạng thái. Để đánh dấu ai đó là trẻ em, hãy đặt vai trò của họ trong [bảng hộ gia đình](./adding-people.md#managing-households) trên hồ sơ của họ.

Mặc định, trang tải phần đầu của danh bạ. Nếu bạn có nhiều người hơn, nhấp **Hiển thị tất cả thành viên** bên dưới danh sách để tải tất cả.

## Tìm nhanh

Hộp **Tìm hộ gia đình hoặc người** ở đầu trang Người cho phép bạn tìm thành viên theo thời gian thực:

1. Nhấp vào **hộp tìm kiếm** ở đầu trang Người.
2. Bắt đầu gõ tên.
3. Kết quả sẽ tự động lọc khi bạn gõ (có độ trễ ngắn khoảng nửa giây để tìm kiếm không chạy sau mỗi lần nhấn phím).
4. Danh sách bên dưới cập nhật để chỉ hiển thị kết quả phù hợp.

Nhấp **Xóa** (bên dưới hộp tìm kiếm) để đặt lại tìm kiếm và hiển thị lại toàn bộ danh bạ.

:::tip
Bạn không cần nhấn Enter. Tìm kiếm tự động chạy sau khi bạn ngừng gõ.
:::

## Sắp xếp kết quả

Trong chế độ **Bảng**, người được liệt kê theo họ, sau đó theo tên. Bạn có thể sắp xếp danh bạ theo cách khác bằng cách nhấp vào tiêu đề cột bất kỳ:

1. Nhấp vào **tiêu đề cột** (ví dụ **Tên** hoặc **Email**) để sắp xếp theo cột đó.
2. Nhấp lại vào cùng tiêu đề để đảo ngược thứ tự sắp xếp.

Điều này giúp bạn dễ dàng tìm người theo thứ tự bảng chữ cái, theo tuổi, hoặc theo bất kỳ cột hiển thị nào khác.

## Tùy chỉnh cột

Không phải thông tin nào cũng cần hiển thị cùng lúc. Bạn có thể chọn cột nào xuất hiện trong bảng:

1. Nhấp vào biểu tượng **Chọn cột** ở đầu trang Người. (Cột áp dụng cho chế độ **Bảng**.)
2. Chọn hoặc bỏ chọn các cột để hiện hoặc ẩn. Các cột có sẵn bao gồm:
   - **Ảnh**
   - **Tên**
   - **Email**
   - **Số điện thoại**
   - **Địa chỉ**
   - **Ngày sinh**
   - **Tuổi**
   - **Giới tính**
   - **Trạng thái thành viên**
   - **Cơ sở**
   - **Ngày thêm** -- thời điểm hồ sơ của người đó được tạo
3. Bảng cập nhật ngay lập tức theo lựa chọn của bạn. Nhấp **Xong** để đóng hộp thoại **Chọn cột**.

### Hiển thị trường tùy chỉnh dưới dạng cột

Hộp chọn cột có hai tab: **Tiêu chuẩn** chứa các cột có sẵn được liệt kê ở trên, còn **Tùy chỉnh** chứa [Trường tùy chỉnh](../settings/custom-fields.md) của nhà thờ bạn cùng với các câu hỏi từ bất kỳ biểu mẫu Người nào. Chọn một trường tùy chỉnh ở tab **Tùy chỉnh** để thêm nó làm cột, và giá trị của mỗi người cho trường đó sẽ xuất hiện trong bảng. Giá trị được hiển thị giống như trên hồ sơ của người đó -- trường Có/Không hiển thị *Có* hoặc *Không*, trường Trắc nghiệm hiển thị nhãn của lựa chọn, và ngày tháng hiển thị dạng ngắn. Người không có giá trị cho trường sẽ hiển thị ô trống.


## Xuất kết quả tìm kiếm

Bạn có thể tải kết quả tìm kiếm hiện tại dưới dạng tệp CSV bất cứ lúc nào:

1. Áp dụng bất kỳ tìm kiếm hoặc bộ lọc nào bạn muốn.
2. Nhấp nút **Xuất** ở đầu trang Người.
3. Tệp CSV sẽ được tải xuống máy tính của bạn, sẵn sàng mở bằng Excel, Google Trang tính hoặc bất kỳ ứng dụng bảng tính nào.

Để biết thêm chi tiết về xuất dữ liệu, xem [Xuất dữ liệu](./exporting-data.md).

:::tip
Với các truy vấn nâng cao hơn -- như tìm tất cả những người không đến nhà thờ trong ba tháng qua -- hãy thử tính năng [Tìm kiếm AI](./ai-search.md), cho phép bạn tìm kiếm bằng câu hỏi ngôn ngữ tự nhiên.
:::

## Tìm kiếm nâng cao

Tìm kiếm nâng cao cho phép bạn tạo bộ lọc chính xác bằng cách kết hợp các điều kiện. Mở nó bằng cách nhấp **Nâng cao** bên dưới hộp tìm kiếm trên trang Người, sau đó mở rộng một danh mục và chọn các trường bạn muốn lọc (bạn có thể nhấp vào tên trường hoặc hộp kiểm của nó), chọn toán tử và giá trị cho mỗi trường. Các danh mục bao gồm **Tên**, **Nhân khẩu học**, **Liên hệ**, **Thành viên**, **Hoạt động** (quyên góp và điểm danh) và **Trường tùy chỉnh**.

Để tìm người mới, mở **Thành viên** và chọn **Ngày thêm**. Mặc định nó bắt đầu ở **trong N ngày qua** với giá trị 30, nên bạn có thể tìm tất cả người được thêm trong tháng qua chỉ với một cú nhấp; thay đổi số ngày, hoặc chuyển sang *bằng / sau / trước* để chọn một ngày cụ thể. **Ngày sinh** và **Ngày kỷ niệm** cũng có tùy chọn **trong N ngày qua**. Ngày thêm chỉ được ghi nhận cho những người được tạo từ cuối tháng 10 năm 2026; những người được thêm trước đó không có ngày, nên bộ lọc này sẽ không tìm thấy họ.

Danh mục **Trường tùy chỉnh** liệt kê [Trường tùy chỉnh](../settings/custom-fields.md) của nhà thờ bạn -- các trường bạn định nghĩa trong Cài đặt để theo dõi thông tin riêng (chẳng hạn ngày hết hạn kiểm tra lý lịch). Các toán tử được cung cấp tương ứng với loại của từng trường: trường văn bản hỗ trợ *chứa / bằng / bắt đầu bằng / kết thúc bằng*, trường số hỗ trợ các toán tử so sánh, trường ngày hỗ trợ *bằng / sau / trước*, còn trường Có/Không và Trắc nghiệm cho phép bạn chọn một giá trị. Bất kỳ trường nào bạn có thể lọc ở đây đều có thể được lưu thành [Danh sách](./lists.md) động.

## Lưu tìm kiếm thành danh sách

Sau khi chạy một tìm kiếm, nút **Lưu thành danh sách** xuất hiện ở đầu trang Người. Nhấp vào nó để lưu truy vấn hiện tại dưới một tên và danh mục tùy chọn, để bạn có thể tải lại ngay lập tức trong các phiên làm việc sau. Xem [Danh sách đã lưu](./lists.md) để biết chi tiết đầy đủ.
