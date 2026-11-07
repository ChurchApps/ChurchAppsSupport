---
title: "Quản lý bài học"
description: "Xây cấu trúc bài học trong Lessons.church: thêm địa điểm, phần, hành động theo vai trò (Nói, Làm, Ghi chú, Chơi), nội dung và tài nguyên cho phụ huynh."
---

# Quản lý bài học

<div class="article-intro">

Bài học là các buổi giảng dạy riêng lẻ trong một khóa học. Mỗi bài học ứng với những gì diễn ra trong một buổi học. Đây là nơi bạn xây dựng nội dung chi tiết -- địa điểm, phần, vai trò và hành động -- mà các tình nguyện viên sẽ sử dụng khi giảng dạy.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- [Tạo chương trình](./managing-programs.md) và [thêm khóa học](./managing-studies.md) vào chương trình đó
- Có quyền quản trị trên Lessons.church (xem [Tổng quan quản trị](./index.md))

</div>

## Tạo bài học

1. Điều hướng đến khu vực **Admin**, mở rộng chương trình và khóa học, rồi tìm khóa học bạn muốn thêm bài học vào.
2. Nhấp **Add Lesson**.
3. Nhập **Name** và các thông tin khác cho bài học.
4. Lưu bài học.

## Phần dành cho phụ huynh mang về nhà

Mỗi bài học có một phần **Parent take-home** tùy chọn trong mục Description. Đây là các trường mà phụ huynh sẽ thấy trên nhóm B1 của họ sau buổi học (và trên trang dành cho phụ huynh của lớp học). Chúng không phải là mô tả bài học thứ hai.

| Trường | Mục đích |
|---|---|
| **Bottom line** | Một câu. "Chúa giữ lời hứa của Ngài." |
| **Verse** | Tham chiếu câu Kinh Thánh cần ghi nhớ và đoạn văn ngắn. |
| **Question** | Một câu hỏi trên đường về nhà mà phụ huynh có thể hỏi con mà không cần tài liệu PDF. |
| **Optional note** | Nội dung bổ sung (gợi ý cầu nguyện, hoạt động gia đình). Hỗ trợ Markdown. Ẩn khi để trống. |

Dòng tóm tắt và một câu hỏi quan trọng hơn phần tổng quan. Nếu tuần đó bạn không có nội dung nào dành cho phụ huynh, hãy để trống cả bốn trường -- sẽ không có gì được hiển thị.

Không đưa nội dung dành cho phụ huynh vào **Description**. Description là nội dung danh mục dành cho giáo viên khi duyệt bài học trên Lessons.church.

## Hiểu cấu trúc bài học

Mỗi bài học được tổ chức thành nhiều lớp:

- **Venues** -- Các phiên bản khác nhau của bài học dành cho các độ tuổi hoặc bối cảnh khác nhau. Ví dụ, bạn có thể có một venue "Mầm non" và một venue "Tiểu học" cho cùng một bài học.
- **Sections** -- Các phần trong một venue, chẳng hạn như "Welcome", "Video", "Bible Story" và "Activity". Sections kiểm soát tiến trình thời gian của lớp học.
- **Roles and Actions** -- Trong mỗi section, bạn gán các vai trò (ví dụ, "Lead Teacher" hoặc "Small Group Leader") và giao cho mỗi vai trò những hành động cụ thể.

## Các loại hành động

Có bốn loại hành động bạn có thể gán cho một vai trò trong một section:

- **Say** -- Nội dung mà tình nguyện viên nên nói hoặc diễn giải lại cho cả lớp.
- **Do** -- Một hoạt động thể chất hoặc hướng dẫn cần thực hiện.
- **Note** -- Thông tin nền hoặc lời nhắc cho tình nguyện viên (không đọc to).
- **Play** -- Một đoạn video hoặc âm thanh được phát trong section.

## Thêm venue

1. Mở bài học trong chế độ quản trị.
2. Nhấp **Add Venue**.
3. Nhập tên cho venue (ví dụ: "Mầm non" hoặc "Tiểu học").
4. Lưu. Bây giờ bạn có thể thêm các section vào venue này.

## Thêm section và hành động

1. Mở rộng một venue để xem các section của nó.
2. Nhấp **Add Section** và đặt tên cho nó (ví dụ: "Welcome").
3. Trong section, nhấp **Add Action**.
4. Chọn **role**, **action type** (Say, Do, Note hoặc Play), rồi nhập nội dung.
5. Lưu.

Lặp lại quy trình này để xây dựng toàn bộ trình tự bài học.

## Tải tài nguyên cấp bài học

Bạn có thể đính kèm trực tiếp các tài liệu tải xuống vào bài học -- ví dụ, một phiếu hoạt động hoặc trang tô màu dành riêng cho tuần đó.

1. Mở bài học trong chế độ quản trị.
2. Điều hướng đến mục **Resources**.
3. Tải lên các tệp của bạn.

:::tip
Xây dựng bài học từ góc nhìn của tình nguyện viên. Đi qua các section và hành động theo đúng thứ tự, rồi tự hỏi liệu một tình nguyện viên lần đầu có thể theo kịp mà không cần chuẩn bị gì thêm hay không.
:::

## Bài viết liên quan

- [Quản lý chương trình](./managing-programs.md) -- Thiết lập vùng chứa chương trình học cấp cao nhất
- [Quản lý khóa học](./managing-studies.md) -- Tổ chức bài học thành các nhóm học
- [Thống kê](./statistics.md) -- Theo dõi cách sử dụng bài học của bạn
