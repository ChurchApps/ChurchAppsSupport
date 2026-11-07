---
title: "Giấy xác nhận quyên góp"
description: "Tạo sao kê dâng hiến cuối năm cho mọi người dâng trong B1 Admin, rồi tải về dạng CSV hoặc in để gửi thư kèm tổng số được khấu trừ thuế."
---

# Giấy xác nhận quyên góp

<div class="article-intro">

Vào cuối mỗi năm, các nhà hảo tâm cần một bản tóm tắt các khoản quyên góp được khấu trừ thuế để lưu hồ sơ. B1 Admin giúp bạn tạo các giấy xác nhận này cho tất cả nhà hảo tâm cùng một lúc, tiết kiệm hàng giờ làm việc thủ công.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Xác minh rằng các [quỹ](funds.md) của bạn được đánh dấu đúng là **Được khấu trừ thuế** -- chỉ các khoản quyên góp vào quỹ được khấu trừ thuế mới xuất hiện trên giấy xác nhận
- Đảm bảo tất cả các khoản quyên góp đã được [ghi nhận](recording-donations.md) và mọi giao dịch trực tuyến đã được [nhập từ Stripe](stripe-import.md)

</div>

## Truy cập Giấy xác nhận quyên góp

1. Trong **B1 Admin**, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái) và mở rộng **Donations**.
2. Nhấp **Giving Statements**. Trang **Batch Giving Statements** sẽ mở ra.

## Tạo giấy xác nhận

1. Trong bảng **Select Year**, chọn **Year** từ danh sách thả xuống. Bạn có thể chọn năm hiện tại hoặc bất kỳ năm nào trong năm năm trước đó.
2. Trang chỉ tải các khoản quyên góp có ngày trong năm đó (từ ngày 1 tháng 1 đến ngày 31 tháng 12), vì vậy trang mở nhanh ngay cả khi nhà thờ của bạn có nhiều năm lịch sử quyên góp. Khi bạn chọn một năm khác, phần tóm tắt sẽ được làm mới với các khoản quyên góp của năm đó. Bảng **Summary** bên dưới năm hiển thị các số liệu thống kê của năm đó, bao gồm:
   - **Total Donors** -- số người đã quyên góp
   - **Total Donations** -- số bản ghi quyên góp riêng lẻ
   - **Total Amount** -- tổng số tiền quyên góp

## Tải xuống giấy xác nhận

Bảng **Download Options** cung cấp hai tùy chọn để gửi giấy xác nhận đến nhà hảo tâm:

### Tải xuống dưới dạng tệp CSV

Trong mục **Individual CSV Files**, nhấp **Download ZIP** để tải xuống một tệp ZIP chứa một tệp CSV riêng cho từng nhà hảo tâm. Điều này hữu ích nếu bạn muốn gửi giấy xác nhận qua email từng người hoặc nhập chúng vào hệ thống khác.

### In tất cả giấy xác nhận

Trong mục **Printable Statements**, nhấp **Print All** (nút này hiển thị số lượng giấy xác nhận) để mở trong trình duyệt một chế độ xem có thể in của giấy xác nhận của mọi nhà hảo tâm trong năm đã chọn. Từ đó, sử dụng chức năng in của trình duyệt để gửi đến máy in. Mỗi giấy xác nhận bắt đầu trên một trang mới để sẵn sàng gấp và gửi qua đường bưu điện, và các giấy xác nhận được sắp xếp theo họ, sau đó theo tên của nhà hảo tâm.

Nếu bạn đã tải lên **Light Background Logo** tại [Website > Appearance](../website/appearance.md), logo sẽ được in căn giữa ở đầu mỗi giấy xác nhận, phía trên tiêu đề. Điều này áp dụng cho cả **Print All** và việc in giấy xác nhận của một nhà hảo tâm từ hồ sơ của họ.

:::tip
Hãy chạy giấy xác nhận sớm vào đầu tháng 1 khi hồ sơ còn mới. Kiểm tra lại kỹ rằng các quỹ của bạn được đánh dấu đúng là được khấu trừ thuế trước khi tạo giấy xác nhận -- chỉ các khoản quyên góp vào quỹ được khấu trừ thuế mới được đưa vào.
:::

:::info
Giấy xác nhận quyên góp chỉ bao gồm các khoản quyên góp được gán vào quỹ đã bật cài đặt **Tax Deductible**. Nếu một quỹ không được đánh dấu là được khấu trừ thuế, các khoản quyên góp của quỹ đó sẽ không xuất hiện trên giấy xác nhận. Bạn có thể quản lý cài đặt này trên trang [Funds](funds.md).
:::

## Định dạng biên lai cho Canada, Australia và New Zealand

Các nhà thờ ngoài Hoa Kỳ có thể chuyển giấy xác nhận sang bố cục biên lai chính thức của quốc gia mình. Nhấp **Statement format** ở đầu trang Giving Statements (hoặc vào **Settings** và mở mục **Giving**), đặt **Statement Format** thành **Canada**, **Australia** hoặc **New Zealand**, rồi điền các trường xuất hiện: số đăng ký của bạn (số đăng ký CRA, ABN hoặc số đăng ký từ thiện của NZ), địa chỉ tổ chức, tên người được ủy quyền ký biên lai, và đối với Canada là thành phố nơi biên lai được cấp.

Khi đó, giấy xác nhận sẽ mang đúng nội dung mà cơ quan thuế yêu cầu (đối với Canada là "Official Receipt for Income Tax Purposes" kèm số tham chiếu CRA), một số biên lai theo định dạng `YEAR-DONORID`, số tiền đủ điều kiện chỉ tính từ các quỹ được khấu trừ thuế, và một dòng riêng cho các khoản quyên góp vào quỹ không được khấu trừ thuế. Nhà hảo tâm sẽ thấy cùng khối biên lai này khi họ in giấy xác nhận của chính mình từ B1.church.

## Những gì thành viên thấy trong B1.church

Mục cài đặt **Giving** cũng kiểm soát những gì thành viên thấy trên trang quyên góp của chính họ trong B1.church:

- **Member Giving History** quyết định những năm nào thành viên có thể xem. Mặc định là **All years**. **Through 2025** (hoặc năm khác) sẽ dừng ở năm đó, vì vậy thành viên không thể xem hoặc in năm sau cho đến khi bạn cho phép. Dùng tùy chọn này để giữ lại năm hiện tại trong khi bạn hoàn tất việc chỉnh sửa và hoàn tiền. **Hidden** sẽ gỡ bỏ hoàn toàn lịch sử quyên góp, tổng số theo năm và chức năng in giấy xác nhận. Thành viên vẫn có thể quyên góp.
- **Giving Note** là một thông điệp ngắn hiển thị trên trang quyên góp và lịch sử quyên góp của thành viên, đồng thời được in ở cuối mọi giấy xác nhận quyên góp, kể cả những giấy xác nhận bạn in tại đây. Hãy dùng mục này cho những nội dung như chính sách hoàn tiền.

Các cài đặt này chỉ thay đổi những gì thành viên thấy. Bạn vẫn có thể in giấy xác nhận của bất kỳ năm nào từ trang này.

## Bước tiếp theo

Nếu bạn cần xem lại chi tiết quyên góp trước khi tạo giấy xác nhận, hãy truy cập trang [Donation Reports](donation-reports.md) hoặc kiểm tra từng [lô](batches.md).
