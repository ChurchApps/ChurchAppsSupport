---
title: "Đánh giá rủi ro chuyển dữ liệu"
description: "Hồ sơ tuân thủ của ChurchApps cho việc chuyển dữ liệu hội thánh từ Anh/EEA sang Mỹ trong B1 Admin, bao gồm biện pháp bảo vệ, bên xử lý phụ và kiểm soát truy cập."
---

# Đánh giá rủi ro chuyển dữ liệu

<div class="article-intro">

Tài liệu này ghi lại đánh giá của ChurchApps về các rủi ro liên quan đến việc chuyển dữ liệu cá nhân quốc tế từ Vương quốc Anh/EEA sang Hoa Kỳ, theo yêu cầu của UK GDPR và EU GDPR. Đây là hồ sơ tuân thủ nội bộ do ChurchApps duy trì với vai trò bên xử lý dữ liệu.

</div>

**Lần xem xét gần nhất:** Tháng 4 năm 2026

## 1. Chi tiết chuyển dữ liệu

| Hạng mục | Chi tiết |
|---|---|
| **Bên xuất dữ liệu** | Các nhà thờ sử dụng ChurchApps (Bên kiểm soát dữ liệu) có trụ sở tại Vương quốc Anh/EEA |
| **Bên nhập dữ liệu** | ChurchApps (Bên xử lý dữ liệu), hoạt động từ Hoa Kỳ |
| **Nhóm chủ thể dữ liệu** | Thành viên nhà thờ, người tham dự, khách viếng thăm, người quyên góp, tình nguyện viên, trẻ em (do cha mẹ/quản trị viên quản lý) |
| **Loại dữ liệu cá nhân** | Họ tên, địa chỉ email, số điện thoại, địa chỉ bưu điện, ngày sinh, giới tính, tình trạng hôn nhân, ảnh hồ sơ, lịch sử quyên góp, hồ sơ điểm danh, tư cách thành viên nhóm, phân công tình nguyện, lịch sử nhắn tin |
| **Dữ liệu nhạy cảm** | Không cố ý thu thập. Không lưu trữ dữ liệu sức khỏe, dữ liệu sinh trắc học hay hồ sơ tội phạm. Thông tin tài khoản tài chính (thẻ tín dụng, tài khoản ngân hàng) không bao giờ được ChurchApps lưu trữ; các thông tin này do Stripe xử lý trực tiếp. |
| **Mục đích chuyển dữ liệu** | Cung cấp dịch vụ phần mềm quản lý nhà thờ (quản lý thành viên, quyên góp, theo dõi điểm danh, truyền thông, lập lịch tình nguyện, đăng ký sự kiện) |
| **Quốc gia đích** | Hoa Kỳ |
| **Cơ chế chuyển dữ liệu** | Điều khoản hợp đồng tiêu chuẩn của EU (SCCs) và Phụ lục chuyển dữ liệu quốc tế của Vương quốc Anh (IDTA), được đưa vào thông qua Phụ lục xử lý dữ liệu của AWS |

## 2. Bên xử lý phụ

| Bên xử lý phụ | Vai trò | Vị trí | Cơ chế chuyển dữ liệu |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Lưu trữ hạ tầng, lưu trữ dữ liệu, phân phối nội dung (khu vực us-east-2) | Hoa Kỳ | DPA của AWS với SCCs (được tự động đưa vào Điều khoản dịch vụ AWS) |
| **Stripe** | Xử lý thanh toán cho các khoản quyên góp | Hoa Kỳ | DPA của Stripe với SCCs |

Dữ liệu thẻ tín dụng và tài khoản ngân hàng được truyền trực tiếp từ trình duyệt của người dùng đến Stripe, và không bao giờ được lưu trữ trên hoặc truyền qua máy chủ của ChurchApps.

## 3. Đánh giá rủi ro

### 3.1 Mã hóa

- **Khi truyền tải:** Toàn bộ dữ liệu được mã hóa bằng TLS/HTTPS cho mọi giao tiếp giữa người dùng và máy chủ ChurchApps.
- **Khi lưu trữ:** Dữ liệu lưu trên AWS được mã hóa khi lưu trữ bằng cơ chế mã hóa do AWS quản lý.

### 3.2 Kiểm soát truy cập

- Quyền truy cập máy chủ sản xuất chỉ giới hạn ở hai cá nhân là thành viên hội đồng quản trị của ChurchApps.
- Nhà phát triển, tình nguyện viên và các thành viên hội đồng khác không có quyền truy cập máy chủ hoặc cơ sở dữ liệu sản xuất.
- Máy chủ cơ sở dữ liệu nằm sau tường lửa và không thể truy cập trực tiếp từ internet.
- Dữ liệu của các nhà thờ được phân tách về mặt logic: mỗi nhà thờ chỉ có thể truy cập dữ liệu của chính mình thông qua các kiểm soát truy cập ở tầng ứng dụng.

### 3.3 Phân tách dữ liệu

Dữ liệu được phân tán trên sáu cơ sở dữ liệu độc lập (Thành viên, Quyên góp, Điểm danh, Nhắn tin, Doing, Nội dung). Việc một cơ sở dữ liệu bị xâm phạm sẽ không làm lộ dữ liệu của các cơ sở dữ liệu khác. Ví dụ, cơ sở dữ liệu Quyên góp chứa số tiền và ngày quyên góp nhưng không chứa họ tên hay thông tin liên hệ của người quyên góp (được lưu trong cơ sở dữ liệu Thành viên).

### 3.4 Tối thiểu hóa dữ liệu

- Không lưu trữ thông tin thẻ tín dụng hay tài khoản ngân hàng (do Stripe xử lý).
- Mật khẩu được lưu bằng băm một chiều và không thể truy xuất lại.
- Nhà thờ tự quyết định dữ liệu nào sẽ thu thập từ thành viên của mình.

### 3.5 Quyền của chủ thể dữ liệu

ChurchApps cung cấp các công cụ kỹ thuật giúp nhà thờ thực hiện các yêu cầu của chủ thể dữ liệu:

- **Truy cập và chuyển đổi dữ liệu:** Xuất toàn bộ dữ liệu ở định dạng JSON có thể đọc bằng máy.
- **Xóa:** Ẩn danh hóa dữ liệu trên cả sáu cơ sở dữ liệu, thay thế dữ liệu cá nhân bằng giá trị chung chung nhưng vẫn giữ các bản ghi tổng hợp cần thiết cho báo cáo tài chính.
- **Hạn chế xử lý:** Trạng thái thành viên không hoạt động sẽ loại người đó khỏi tìm kiếm, danh bạ, báo cáo và nhắn tin, nhưng hồ sơ vẫn được giữ lại.
- **Chỉnh sửa:** Thành viên và quản trị viên có thể sửa thông tin cá nhân qua ứng dụng.

### 3.6 Thông báo vi phạm dữ liệu

ChurchApps cam kết thông báo cho các nhà thờ bị ảnh hưởng trong vòng 72 giờ kể từ khi biết về vi phạm dữ liệu cá nhân, như được ghi trong [Điều khoản dịch vụ](https://churchapps.org/terms) (Mục 11.6).

### 3.7 Rủi ro truy cập của chính phủ Hoa Kỳ

Rủi ro chính đối với dữ liệu được lưu trữ tại Hoa Kỳ là khả năng cơ quan chính phủ Hoa Kỳ truy cập theo Mục 702 của Đạo luật FISA hoặc Sắc lệnh Hành pháp 12333. Rủi ro này được đánh giá là **thấp** vì các lý do sau:

- ChurchApps xử lý dữ liệu về tư cách thành viên và điểm danh nhà thờ, chứ không phải dữ liệu có giá trị tình báo.
- Chủ thể dữ liệu là thành viên và người tham dự nhà thờ, không phải nhóm thường bị nhắm đến bởi các chương trình giám sát.
- Không lưu trữ dữ liệu cá nhân nhạy cảm nào (sức khỏe, tài khoản tài chính, quan điểm chính trị).
- DPA của AWS bao gồm các cam kết liên quan đến yêu cầu truy cập của chính phủ và báo cáo minh bạch.
- Khuôn khổ Bảo vệ Dữ liệu Riêng tư EU-Hoa Kỳ (thiết lập năm 2023) cung cấp thêm các biện pháp bảo vệ cho việc chuyển dữ liệu đến các tổ chức Hoa Kỳ đã được chứng nhận.

## 4. Kết luận rủi ro tổng thể

Rủi ro đối với chủ thể dữ liệu từ việc chuyển dữ liệu quốc tế này được đánh giá là **thấp**. Sự kết hợp của:

- Điều khoản hợp đồng tiêu chuẩn làm cơ chế chuyển dữ liệu hợp pháp
- Mã hóa khi truyền tải và khi lưu trữ
- Kiểm soát truy cập nghiêm ngặt, chỉ có hai cá nhân được ủy quyền
- Phân tách dữ liệu trên các cơ sở dữ liệu độc lập
- Không lưu trữ thông tin tài khoản tài chính
- Dữ liệu được xử lý có mức độ nhạy cảm và giá trị tình báo thấp
- Các công cụ kỹ thuật để thực hiện đầy đủ quyền của chủ thể dữ liệu

cung cấp các biện pháp bổ sung phù hợp để bảo đảm dữ liệu được chuyển đi có mức độ bảo vệ về cơ bản tương đương với mức được bảo đảm trong Vương quốc Anh/EEA.

## 5. Lịch xem xét

Đánh giá này sẽ được xem xét hằng năm hoặc khi có thay đổi đáng kể về việc xử lý dữ liệu, các bên xử lý phụ, hoặc khung pháp lý điều chỉnh việc chuyển dữ liệu quốc tế.
