---
title: "Trường tùy chỉnh"
description: "Định nghĩa trường tùy chỉnh trong B1 Admin để theo dõi thông tin bổ sung của người, như ngày hết hạn kiểm tra lý lịch hoặc cỡ áo, rồi tìm kiếm và lọc theo chúng."
---

# Trường tùy chỉnh

<div class="article-intro">

**Trường tùy chỉnh** cho phép bạn theo dõi thông tin riêng trên hồ sơ của mỗi người, như những thông tin mà B1 chưa có trường dựng sẵn: ngày hết hạn kiểm tra lý lịch, cỡ áo phông, hoặc tình trạng lớp báp-têm. Bạn tạo một trường một lần trong phần Cài đặt, rồi điền giá trị vào hồ sơ của từng người và tìm kiếm hoặc tạo danh sách dựa trên trường đó. Cách này thay thế giải pháp cũ là tạo một biểu mẫu Người chỉ để lưu một dữ liệu tùy chỉnh duy nhất.

</div>

## Video hướng dẫn

<YouTube id="yUfDEbp2HQ4" title="Trường tùy chỉnh, chỉnh sửa hàng loạt và xuất dữ liệu trong B1" next="Tạo nhóm và thêm thành viên trong B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần quyền chỉnh sửa **Người** để tạo trường và điền giá trị, cũng như quyền truy cập khu vực **Cài đặt**. Bất kỳ ai có quyền xem Người đều có thể xem các giá trị này. Xem [Vai trò và quyền hạn](./roles-permissions.md).
- Trước khi bắt đầu, hãy quyết định bạn muốn theo dõi điều gì và chọn loại trường phù hợp nhất (văn bản, số, ngày, có/không, hoặc danh sách lựa chọn).

</div>

## Mở Trường tùy chỉnh

Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), chọn **Cài đặt > Cài đặt**, rồi nhấp **Trường tùy chỉnh** trong danh sách bên trái để cuộn đến phần **Trường tùy chỉnh**. Bạn cũng có thể truy cập trực tiếp tại **/settings/custom-fields**. Bạn sẽ thấy danh sách tất cả các trường đã tạo, kèm **Tên** và **Loại trường**. Nếu chưa tạo trường nào, bảng sẽ hiển thị dòng *"Chưa có trường tùy chỉnh nào được thêm."*

## Thêm trường

1. Nhấp **Thêm trường**.
2. Trong trình chỉnh sửa mở ra bên phải, nhập **Tên**. Đây là nhãn mà nhân viên sẽ thấy trên hồ sơ người dùng và khi tìm kiếm (ví dụ: *Ngày hết hạn kiểm tra lý lịch*).
3. Chọn **Loại trường**:
   - **Ô văn bản**: văn bản ngắn, nhập tự do.
   - **Số nguyên**: số không có phần thập phân (ví dụ: số lượng).
   - **Số thập phân**: số có thể có phần thập phân.
   - **Ngày**: một ngày trên lịch.
   - **Có/Không**: câu trả lời đơn giản có hoặc không.
   - **Nhiều lựa chọn**: danh sách chọn. Khi bạn chọn loại này, một **trình chỉnh sửa lựa chọn** sẽ xuất hiện để bạn thêm từng tùy chọn mà người dùng có thể chọn.
4. Nhấp **Lưu**.

Trường này giờ đã có trên hồ sơ của mọi người.

:::info
Các loại trường này giống với các loại dùng cho [câu hỏi trong biểu mẫu](../forms/creating-forms.md), nên giá trị hoạt động nhất quán trong toàn bộ B1.
:::

## Chỉnh sửa trường

Nhấp vào bất kỳ dòng trường nào trong danh sách để mở lại trình chỉnh sửa. Thay đổi tên, loại hoặc các lựa chọn, rồi nhấp **Lưu**.

:::warning
Nếu thay đổi **Loại trường** của một trường đã có giá trị (ví dụ: từ Ô văn bản sang Ngày), các giá trị đã nhập trước đó có thể không còn đúng định dạng của loại mới. Hãy thận trọng khi đổi loại sau khi nhân viên đã bắt đầu điền trường này.
:::

## Xóa trường

Mở trường để chỉnh sửa rồi nhấp **Xóa**. Hệ thống sẽ yêu cầu bạn xác nhận: *"Bạn có chắc chắn muốn xóa trường tùy chỉnh này không? Các giá trị đã lưu cũng sẽ bị xóa."* Khi xóa một trường, trường đó sẽ bị xóa vĩnh viễn **cùng với mọi giá trị đã lưu** cho tất cả mọi người. Thao tác này không thể hoàn tác.

## Điền giá trị cho một người

Khi đã có ít nhất một trường tùy chỉnh, các giá trị của trường đó sẽ nằm ngay bên cạnh thông tin có sẵn trong hồ sơ của mỗi người. Bạn xem chúng cùng thông tin liên hệ ở bên trái hồ sơ và chỉnh sửa trên cùng biểu mẫu mà bạn dùng cho phần thông tin còn lại của người đó. Sẽ không có gì thêm xuất hiện cho đến khi bạn tạo trường đầu tiên.

1. Mở hồ sơ của một người trong **Người**.
2. Nhấp nút **Chỉnh sửa** ở bên trái hồ sơ, bên dưới thông tin liên hệ của người đó.
3. Cuộn xuống khu vực **Trường tùy chỉnh** ở cuối biểu mẫu chỉnh sửa và điền giá trị cho từng trường. Mỗi trường hiển thị ô nhập phù hợp với loại của nó: bộ chọn ngày cho trường Ngày, danh sách thả xuống có/không cho trường Có/Không, danh sách chọn cho Nhiều lựa chọn, v.v.
4. Nhấp **Lưu**. Giá trị trường tùy chỉnh của bạn sẽ được lưu cùng với các thông tin khác của người đó.

Quay lại hồ sơ, bất kỳ trường nào có giá trị sẽ hiển thị bên dưới thông tin liên hệ dưới dạng *Tên trường: giá trị* (câu trả lời Có/Không hiển thị là *Có* hoặc *Không*, còn Nhiều lựa chọn hiển thị nhãn của tùy chọn đã chọn). Các trường để trống sẽ được ẩn. Để xóa một giá trị, hãy chỉnh sửa người đó, xóa nội dung trường và lưu. Một giá trị rỗng sẽ bị xóa khỏi hồ sơ thay vì được lưu thành khoảng trống.

:::tip
Trường hợp sử dụng phổ biến nhất là an toàn cho tình nguyện viên: tạo một trường **Ngày** tên là *Ngày hết hạn kiểm tra lý lịch*, ghi lại ngày của từng tình nguyện viên, rồi tạo một [Danh sách đã lưu](../people/lists.md) để đánh dấu những người có ngày đã qua.
:::

## Tìm kiếm và tạo danh sách dựa trên trường tùy chỉnh

Bạn có thể tìm kiếm đầy đủ theo trường tùy chỉnh:

1. Trên trang **Người**, mở [Tìm kiếm nâng cao](../people/searching-people.md).
2. Mở rộng danh mục **Trường tùy chỉnh**.
3. Chọn trường bạn muốn lọc, chọn một toán tử và nhập giá trị. Các toán tử hiển thị phù hợp với loại của trường:
   - **Ô văn bản**: chứa, bằng, bắt đầu bằng, kết thúc bằng.
   - **Số nguyên / Số thập phân**: bằng, lớn hơn, lớn hơn hoặc bằng, nhỏ hơn, nhỏ hơn hoặc bằng.
   - **Ngày**: bằng, sau (lớn hơn), trước (nhỏ hơn).
   - **Có/Không**: bằng Có hoặc Không.
   - **Nhiều lựa chọn**: bằng hoặc chứa một trong các lựa chọn.

Bạn có thể lưu bất kỳ tìm kiếm trường tùy chỉnh nào thành một [Danh sách](../people/lists.md). Danh sách là truy vấn động, nên danh sách được tạo từ *Ngày hết hạn kiểm tra lý lịch là trước hôm nay* sẽ kiểm tra lại mọi người mỗi lần bạn mở, không cần cập nhật thủ công.

## Hiển thị trường tùy chỉnh dưới dạng cột

Để xem giá trị của một trường cho tất cả mọi người cùng lúc, hãy thêm trường đó làm cột trên trang **Người**. Chuyển **Xem dưới dạng** sang **Bảng**, nhấp biểu tượng **Chọn cột** ở đầu trang, chuyển sang tab **Tùy chỉnh** và đánh dấu trường đó. Giá trị của mỗi người sẽ xuất hiện trong cột riêng bên cạnh các cột có sẵn. Xem [Hiển thị trường tùy chỉnh dưới dạng cột](../people/searching-people.md#showing-custom-fields-as-columns).

## Điều gì xảy ra khi gộp

Khi bạn [gộp hai hồ sơ người](../people/adding-people.md), giá trị trường tùy chỉnh sẽ được chuyển sang tự động. Hồ sơ bạn giữ lại sẽ giữ các giá trị của chính họ. Với mọi trường mà chỉ người bị xóa có giá trị, giá trị đó sẽ được sao chép sang để không bị mất.

## Bài viết liên quan

- [Tìm kiếm người](../people/searching-people.md): tìm kiếm nâng cao, bao gồm danh mục Trường tùy chỉnh, và hiển thị trường tùy chỉnh dưới dạng cột
- [Danh sách đã lưu](../people/lists.md): lưu một tìm kiếm trường tùy chỉnh và chạy lại theo thời gian thực
- [Vai trò và quyền hạn](./roles-permissions.md): ai có thể tạo trường và chỉnh sửa giá trị
- [Tạo biểu mẫu](../forms/creating-forms.md): dùng để thu thập dữ liệu nhiều câu hỏi, khi một biểu mẫu đầy đủ phù hợp hơn các trường đơn lẻ
