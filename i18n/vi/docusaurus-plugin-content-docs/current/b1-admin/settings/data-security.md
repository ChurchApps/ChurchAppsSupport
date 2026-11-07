---
title: "Bảo mật dữ liệu"
---

# Bảo mật dữ liệu

<div class="article-intro">

Không có hệ thống nào an toàn tuyệt đối, nhưng ChurchApps rất coi trọng bảo mật dữ liệu. Trang này giải thích các biện pháp được áp dụng để bảo vệ mọi dữ liệu được nhập vào B1.church Admin và các sản phẩm khác của ChurchApps.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Đọc trang này để hiểu cách dữ liệu của hội thánh bạn được bảo vệ
- Thiết lập [Vai trò & Quyền hạn](./roles-permissions.md) để kiểm soát ai được truy cập thông tin nhạy cảm
- Làm quen với [chính sách quyền riêng tư](https://churchapps.org/privacy)

</div>

## Hạn chế lưu trữ dữ liệu nhạy cảm

Cách tiếp cận đầu tiên của chúng tôi là không lưu trữ dữ liệu nhạy cảm nhiều hơn mức cần thiết. Điều này có nghĩa là không bao giờ lưu trữ thông tin thẻ tín dụng hoặc tài khoản ngân hàng dùng để quyên góp. Khi người dùng quyên góp qua B1.church Admin hoặc B1, dữ liệu thẻ tín dụng không bao giờ được truyền đến máy chủ nào của chúng tôi, mà chỉ đến cổng thanh toán của bạn (Stripe). Vì vậy, nếu xảy ra vi phạm dữ liệu, không có thông tin thẻ tín dụng hay ngân hàng nào bị lộ.

Chúng tôi cũng không bao giờ lưu trữ mật khẩu trong hệ thống. Mọi mật khẩu đều được xử lý bằng thuật toán băm một chiều, trong đó một phần dữ liệu bị hủy, khiến không ai có thể lấy lại mật khẩu từ cơ sở dữ liệu, kể cả chúng tôi. Để xác minh mật khẩu, giá trị được nhập phải được băm bằng cùng thuật toán một chiều và cho ra kết quả giống hệt.

Sau khi loại bỏ hai nguồn này, dữ liệu nhạy cảm duy nhất còn lại là danh sách tên và thông tin liên hệ.

:::tip
Vì ChurchApps không bao giờ lưu trữ thông tin thẻ tín dụng hay tài khoản ngân hàng, ngay cả trong trường hợp vi phạm dữ liệu xấu nhất, chi tiết tài khoản tài chính cũng không bị lộ. Chỉ có tên và thông tin liên hệ là có nguy cơ bị ảnh hưởng.
:::

## Áp dụng các thông lệ bảo mật tiêu chuẩn

Chúng tôi áp dụng các thông lệ bảo mật tiêu chuẩn của ngành, bao gồm mã hóa mọi dữ liệu truyền đến và đi từ máy chủ bằng HTTPS. Tất cả máy chủ được lưu trữ tại trung tâm dữ liệu vật lý an toàn của Amazon Web Services. Mọi máy chủ cơ sở dữ liệu đều nằm sau tường lửa và không thể truy cập từ Internet.

## Phân tách dữ liệu

Dữ liệu được tách thành các cơ sở dữ liệu khác nhau theo phạm vi. Mỗi API của chúng tôi (Membership, Giving, Attendance, Messaging, Doing và Lessons) là một kho dữ liệu độc lập với cơ sở dữ liệu riêng. Nếu một trong số chúng bị xâm phạm, giá trị của dữ liệu bị giới hạn nếu các hệ thống khác không bị xâm phạm cùng lúc. Ví dụ, nếu API/cơ sở dữ liệu Giving bị xâm phạm, kẻ xấu có thể truy cập danh sách các khoản quyên góp và ngày tháng (nhưng không bao giờ có dữ liệu thẻ hay tài khoản ngân hàng). Tuy nhiên, chúng sẽ không biết người dùng nào đã quyên góp hoặc quyên góp cho hội thánh nào, vì dữ liệu đó được lưu trong cơ sở dữ liệu Membership riêng biệt.

:::info
Phân tách dữ liệu có nghĩa là việc xâm phạm một hệ thống không cho phép truy cập toàn bộ dữ liệu của hội thánh. Mỗi API hoạt động độc lập với cơ sở dữ liệu riêng, giúp hạn chế tác động của bất kỳ vi phạm tiềm ẩn nào.
:::

## Quyền truy cập hạn chế

Quyền truy cập vào máy chủ sản xuất được giới hạn nghiêm ngặt cho những quản trị viên máy chủ thực sự cần thiết. Hiện tại, có hai người, đồng thời cũng là thành viên hội đồng quản trị. Nhà phát triển, tình nguyện viên và các thành viên hội đồng khác không được phép truy cập vào máy chủ sản xuất.

## Chính sách quyền riêng tư

Dữ liệu của bạn thuộc về bạn và sẽ không bao giờ được bán cho bên thứ ba. Bạn có thể đọc toàn văn chính sách quyền riêng tư của chúng tôi [tại đây](https://churchapps.org/privacy).

## Tuân thủ GDPR

ChurchApps hỗ trợ tuân thủ GDPR cho các hội thánh có thành viên tại Vương quốc Anh hoặc Liên minh Châu Âu. Dưới đây là cách chúng tôi đáp ứng các yêu cầu chính:

### Quyền của chủ thể dữ liệu

ChurchApps cung cấp các công cụ giúp hội thánh phản hồi các yêu cầu của chủ thể dữ liệu:

- **Quyền truy cập (Điều 15)** — Thành viên có thể yêu cầu bản sao dữ liệu cá nhân của mình bằng cách liên hệ với hội thánh. Quản trị viên có thể xuất dữ liệu của bất kỳ ai từ mục **Quản lý dữ liệu** trên trang chi tiết người trong B1.church Admin.
- **Quyền xóa dữ liệu (Điều 17)** — Thành viên có thể tự yêu cầu xóa tài khoản từ trang Hồ sơ của mình (xem [Xem xét yêu cầu xóa tài khoản](../profile/account-deletion.md)), hoặc liên hệ trực tiếp với hội thánh. Quản trị viên cũng có thể ẩn danh dữ liệu của một người trên tất cả các mô-đun từ mục **Quản lý dữ liệu** trên trang chi tiết người. Việc ẩn danh thay thế thông tin cá nhân bằng các giá trị chung chung, đồng thời giữ lại các bản ghi tổng hợp (tổng số tiền quyên góp, số lượt điểm danh) cần thiết cho báo cáo tài chính của hội thánh.
- **Quyền hạn chế xử lý (Điều 18)** — Thành viên có thể yêu cầu hạn chế việc xử lý dữ liệu bằng cách liên hệ với hội thánh, bao gồm cả việc từ chối nhận thông tin liên lạc.
- **Quyền di chuyển dữ liệu (Điều 20)** — Quản trị viên có thể xuất dữ liệu cá nhân ở định dạng JSON có cấu trúc, dễ đọc bằng máy, thay mặt các thành viên có yêu cầu.

### Sử dụng công cụ quản lý dữ liệu

Để truy cập các công cụ dữ liệu GDPR cho một cá nhân:

1. Vào mục **People** trong B1 Admin và mở hồ sơ của người đó.
2. Nhấp **Edit** để vào chế độ chỉnh sửa.
3. Cuộn xuống mục **Data Management** (mặc định được thu gọn) và nhấp để mở rộng.
4. Sử dụng **Export Data** để tải xuống tệp JSON chứa toàn bộ dữ liệu được lưu trữ về người đó.
5. Sử dụng **Anonymize** để thay thế thông tin cá nhân bằng các giá trị chung chung. Bạn sẽ được yêu cầu nhập `ANONYMIZE` để xác nhận — hành động này không thể hoàn tác.

:::warning
Việc ẩn danh là vĩnh viễn. Tổng số tiền quyên góp và số lượt điểm danh được giữ lại cho mục đích báo cáo tài chính, nhưng mọi định danh cá nhân (tên, email, địa chỉ, v.v.) sẽ bị xóa và không thể khôi phục.
:::

### Xử lý dữ liệu

ChurchApps đóng vai trò **bên xử lý dữ liệu** thay mặt cho hội thánh của bạn (**bên kiểm soát dữ liệu**). [Thỏa thuận xử lý dữ liệu](https://churchapps.org/terms) của chúng tôi quy định trách nhiệm của mỗi bên, bao gồm việc sử dụng bên xử lý phụ, quy trình thông báo khi có vi phạm và cách xử lý dữ liệu khi chấm dứt hợp đồng.

### Chuyển dữ liệu quốc tế

Dữ liệu ChurchApps được lưu trữ trên Amazon Web Services (AWS) tại Hoa Kỳ. Việc chuyển dữ liệu quốc tế từ Vương quốc Anh/EU được bảo vệ bởi Điều khoản Hợp đồng Tiêu chuẩn (SCC) của AWS theo [Phụ lục Xử lý Dữ liệu AWS](https://aws.amazon.com/compliance/data-processing-addendum/). Phụ lục AWS được tự động đưa vào Điđiều khoản Dịch vụ AWS cho tất cả khách hàng. Không bắt buộc phải lưu trữ tại EU khi các cơ chế chuyển dữ liệu phù hợp như SCC đã được áp dụng.

Để biết chi tiết về cách đánh giá rủi ro chuyển dữ liệu, xem [Đánh giá rủi ro chuyển dữ liệu](./transfer-risk-assessment.md).

### Bên xử lý phụ

- **Amazon Web Services (AWS)** — Lưu trữ hạ tầng, lưu trữ dữ liệu và phân phối nội dung
- **Stripe** — Xử lý thanh toán quyên góp (ChurchApps không lưu trữ dữ liệu thẻ nào)

:::info
Để biết đầy đủ chi tiết về cách chúng tôi xử lý dữ liệu cá nhân, xem [Chính sách quyền riêng tư](https://churchapps.org/privacy) và [Điều khoản dịch vụ](https://churchapps.org/terms) của chúng tôi. Nếu bạn có câu hỏi về tuân thủ GDPR, hãy liên hệ với chúng tôi tại support@churchapps.org.
:::
