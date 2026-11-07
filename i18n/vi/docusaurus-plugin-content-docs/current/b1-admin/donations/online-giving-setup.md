---
title: "Thiết lập dâng hiến trực tuyến"
---

# Thiết lập dâng hiến trực tuyến

<div class="article-intro">

B1 Admin tích hợp với **Stripe**, **PayPal**, **Kingdom Funding** và **Paystack** (dành cho các hội thánh ở châu Phi) để thành viên có thể dâng hiến trực tuyến qua trang B1.church của bạn. Sau khi cấu hình, các khoản quyên góp trực tuyến sẽ tự động xuất hiện trong hồ sơ quyên góp cùng với các khoản dâng hiến được nhập thủ công, giúp mọi thứ nằm trong cùng một hệ thống.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Thiết lập [quỹ quyên góp](funds.md) để người dâng hiến có thể chỉ định khoản dâng của mình
- Tạo tài khoản Stripe tại [stripe.com](https://stripe.com) và kích hoạt tài khoản (tắt chế độ thử nghiệm)
- Chuẩn bị sẵn thông tin đăng nhập B1 Admin

</div>

## Thiết lập Stripe

1. Tạo tài khoản tại [stripe.com](https://stripe.com) nếu bạn chưa có. Hãy chắc chắn **kích hoạt tài khoản** và tắt chế độ thử nghiệm.
2. Trong Stripe, vào **Developers > API Keys**.
3. Sao chép **Publishable Key**.
4. Đăng nhập vào [B1 Admin](https://admin.b1.church/).
5. Vào **Settings** và mở mục **Giving**.
6. Nhấp **Edit** ở mục **Giving**.
7. Đặt **Provider** thành **Stripe**.
8. Dán Publishable Key vào ô **Public Key**.
9. Quay lại Stripe và hiển thị **Secret Key** của bạn (bạn chỉ có thể xem khóa này một lần, vì vậy hãy lưu bản sao dự phòng).
10. Dán Secret Key vào ô **Secret Key** và nhấp **Save**.

:::warning
Khóa bí mật (Secret Key) của Stripe chỉ hiển thị một lần. Hãy sao chép vào nơi an toàn trước khi rời khỏi bảng điều khiển Stripe. Nếu bạn làm mất khóa, bạn sẽ cần tạo khóa mới.
:::

## Chọn đơn vị tiền tệ

Sau khi chọn Stripe làm nhà cung cấp, một danh sách thả xuống **Currency** sẽ xuất hiện bên cạnh các khóa API. Hãy chọn đơn vị tiền tệ trùng với đơn vị tiền tệ thanh toán của tài khoản Stripe để các khoản dâng hiến được thu đúng.

Các đơn vị tiền tệ được hỗ trợ gồm USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN và BRL. Bạn có thể xác nhận hoặc thay đổi đơn vị tiền tệ mặc định của tài khoản trong [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies).

:::info
Đơn vị tiền tệ bạn chọn ở đây được dùng cho quyên góp một lần, đăng ký định kỳ, tính phí và báo cáo quyên góp. Nếu sau này bạn đổi đơn vị tiền tệ, chỉ các khoản quyên góp và đăng ký mới sẽ dùng đơn vị tiền tệ mới. Các khoản dâng định kỳ hiện có vẫn tiếp tục bằng đơn vị tiền tệ đã được tạo ban đầu.
:::

:::warning
Hãy chắc chắn tài khoản Stripe của bạn được cấu hình để chấp nhận đơn vị tiền tệ bạn đã chọn. Nếu tài khoản Stripe không hỗ trợ đơn vị tiền tệ đã chọn, các khoản quyên góp sẽ thất bại khi thanh toán.
:::

## Apple Pay và Google Pay

Các hội thánh dùng Stripe sẽ tự động có nút Apple Pay và Google Pay trên trang dâng hiến công khai. Các nút này xuất hiện phía trên ô thẻ đối với khoản dâng một lần, sau khi người dâng đã chọn quỹ và số tiền, và chỉ khi trình duyệt hoặc thiết bị của người dâng đã thiết lập ví điện tử. Các khoản dâng định kỳ vẫn sử dụng ô thẻ hoặc ô tài khoản ngân hàng.

Google Pay không cần thiết lập thêm. Apple Pay yêu cầu tên miền trang dâng hiến của bạn phải được đăng ký với Stripe; B1 sẽ tự đăng ký lần đầu tiên trang dâng hiến được tải trên tên miền của bạn. Nếu nút Apple Pay không hiển thị trên iPhone, hãy kiểm tra **Settings > Payment method domains** trong Stripe Dashboard và xác nhận rằng tên miền `yoursubdomain.b1.church` (hoặc tên miền tùy chỉnh) của bạn có trong danh sách và đã được xác minh.

## Quyên góp ẩn danh

Người dâng trên trang dâng hiến công khai có thể chọn **Quyên góp ẩn danh**. Khoản quyên góp ẩn danh được ghi nhận mà không gắn với người dâng, vẫn chuyển vào quỹ mà người dâng đã chọn, và hiển thị là **Anonymous** trong các đợt dâng và báo cáo của bạn. Email của người dâng vẫn bắt buộc để có thể gửi biên nhận, nhưng không có hồ sơ cá nhân nào được tạo. Quyên góp ẩn danh chỉ áp dụng cho khoản dâng một lần và không xuất hiện trên bất kỳ bảng sao kê dâng hiến nào.

## Khoản dâng định kỳ thất bại

Khi một khoản dâng định kỳ trên Stripe thất bại (ví dụ: thẻ hết hạn hoặc bị từ chối), khoản thu thất bại sẽ xuất hiện trong **Donations > Failed Gifts** cùng với người dâng, số tiền, ngày và lý do mà cổng thanh toán đưa ra. Nhấp **Retry** để thử thu lại khi người dâng đã cập nhật phương thức thanh toán.

B1 cũng gửi email cho người dâng khi khoản thu thất bại, và gửi lại sau ba và bảy ngày nếu khoản thu vẫn chưa thành công, kèm liên kết để cập nhật phương thức thanh toán trong B1.church.

:::info
Nếu hội thánh của bạn đã thiết lập Stripe trước khi tính năng này ra mắt, hãy mở **Settings** > **Giving**, nhấp chỉnh sửa và nhấp **Save** một lần. Thao tác này sẽ làm mới webhook của Stripe để các khoản thu thất bại được báo về B1.
:::

## Thêm trang quyên góp vào trang B1.church của bạn

1. Vào [b1.church](https://b1.church/) và đăng nhập.
2. Nhấp biểu tượng **Settings**.
3. Nhấp **Add Tab**.
4. Chọn **Donation** làm loại.
5. Nhập tên cho thẻ (ví dụ: "Dâng hiến") và nhấp **Save**.
6. Tùy chọn, đổi biểu tượng của thẻ: nhập "Giv" vào ô tìm biểu tượng để tìm biểu tượng liên quan đến dâng hiến.

Trang quyên góp của bạn đã hoạt động. Thành viên có thể truy cập tại `yoursubdomain.b1.church/donate`.

## Chia sẻ liên kết dâng hiến của bạn

Để tìm URL dâng hiến, vào **B1 Admin** và nhấp biểu tượng **Settings** để xem tên miền phụ của bạn. Liên kết quyên góp có định dạng như sau:

`https://yoursubdomain.b1.church/donate`

Hãy chia sẻ liên kết này trên website, trong email hoặc trong bản tin để thành viên biết nơi dâng hiến trực tuyến.

### Liên kết có sẵn quỹ và số tiền

Để đưa người dâng thẳng đến một quỹ cụ thể, vào **Donations > Funds** và nhấp **Giving Link** tại quỹ đó. Tùy chọn nhập số tiền, sau đó sao chép liên kết. Hộp thoại cũng hiển thị mã QR cho cùng liên kết; nhấp **Download PNG** để lưu mã dùng cho bản tin, slide hoặc áp phích. Khi người dâng mở liên kết hoặc quét mã, quỹ và số tiền đã được chọn sẵn trên trang dâng hiến. Liên kết có dạng:

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Các tham số tương tự cũng hoạt động với phần tử **Donate Link** trong trình tạo website.

## Thông báo quyên góp

Stripe sẽ gửi email thông báo mỗi khi nhận được một khoản quyên góp. Để thay đổi địa chỉ email nhận thông báo, vào bảng điều khiển Stripe, nhấp hồ sơ của bạn ở góc trên bên phải, chọn **Profile** và cập nhật địa chỉ email.

## Tùy chọn phí xử lý

Bạn có thể cấu hình trang dâng hiến để người dâng tùy chọn chi trả phí xử lý, nhờ đó hội thánh nhận được đủ toàn bộ số tiền dâng. Cài đặt này được quản lý trong phần cài đặt hội thánh trong B1 Admin.

:::tip
Sau khi thiết lập, hãy thực hiện một khoản quyên góp thử nhỏ để xác nhận mọi thứ hoạt động bình thường trước khi thông báo dâng hiến trực tuyến cho hội chúng.
:::

## Thiết lập Kingdom Funding

Kingdom Funding là một đơn vị xử lý thanh toán Cơ Đốc, hỗ trợ thẻ tín dụng/ghi nợ và chuyển khoản ngân hàng ACH. Nếu hội thánh của bạn đã đăng ký với Kingdom Funding, bạn có thể kết nối với đơn vị này làm cổng dâng hiến.

:::info
Tích hợp Kingdom Funding hiện đang trong giai đoạn beta. Hãy liên hệ với đại diện tài khoản B1 của bạn để kích hoạt tính năng này cho hội thánh.
:::

1. Đăng ký hoặc đăng nhập tại [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Lấy **Security Key** (công khai) và **Private Key** từ cổng thương gia của Kingdom Funding.
3. Trong B1 Admin, vào **Settings**, mở mục **Giving** và nhấp chỉnh sửa.
4. Đặt **Provider** thành **Kingdom Funding**.
5. Dán Security Key vào ô **Security Key** và Private Key vào ô **Private Key**.
6. Đặt **Webhook Key** mà bạn nhận được từ Kingdom Funding, rồi sao chép URL webhook hiển thị vào cài đặt thương gia của Kingdom Funding để Kingdom Funding có thể thông báo cho B1 về các giao dịch đã hoàn tất.
7. Lưu.

Sau khi kết nối, thành viên sẽ thấy nút chuyển đổi thẻ/ngân hàng trên trang quyên góp và có thể dâng bằng thẻ tín dụng hoặc chuyển khoản ACH.

## Nút PayPal và Venmo

Các hội thánh dùng **PayPal** làm nhà cung cấp sẽ có nút **PayPal** và **Venmo** phía trên ô thẻ trên trang dâng hiến đối với khoản dâng một lần. Người dâng nhấp vào một trong hai nút sẽ hoàn tất thanh toán trong cửa sổ PayPal, và khoản dâng được ghi nhận như mọi khoản quyên góp trực tuyến khác. Venmo chỉ xuất hiện đối với người dâng tại Hoa Kỳ trên các thiết bị mà PayPal xét là đủ điều kiện. Các khoản dâng định kỳ vẫn sử dụng ô thẻ.

## Thiết lập Paystack (Châu Phi)

Stripe không mở tài khoản cho các hội thánh tại Ghana, Nigeria, Kenya, Nam Phi hoặc Côte d'Ivoire. [Paystack](https://paystack.com) thì có, và đơn vị này chấp nhận thẻ nội địa, **tiền di động** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), chuyển khoản ngân hàng và USSD. Người dâng thanh toán bằng đơn vị tiền tệ địa phương của bạn (GHS, NGN, KES, ZAR, XOF).

1. Đăng ký tại [paystack.com](https://paystack.com) với giấy chứng nhận đăng ký kinh doanh của hội thánh và tài khoản ngân hàng địa phương, rồi hoàn tất quy trình xét duyệt kích hoạt (go-live) của Paystack.
2. Trong Paystack Dashboard, mở **Settings → API Keys & Webhooks** và sao chép **Public Key** và **Secret Key** (sử dụng khóa thật, không dùng khóa thử nghiệm).
3. Trong B1 Admin, vào **Settings**, mở mục **Giving** và nhấp chỉnh sửa.
4. Đặt **Provider** thành **Paystack**, dán Public Key và Secret Key, rồi chọn **Currency** của bạn.
5. Sao chép **webhook URL** hiển thị bên dưới nhà cung cấp, quay lại Paystack Dashboard (**Settings → API Keys & Webhooks**) và dán vào ô **Webhook URL**. Đây là cách các khoản dâng định kỳ và thanh toán bằng tiền di động được ghi nhận.
6. Lưu.

Người dâng hoàn tất thanh toán trong cửa sổ Paystack an toàn và có thể chọn thẻ, tiền di động hoặc chuyển khoản ngân hàng tại đó. Lưu ý:

- **Khoản dâng định kỳ** cần có thẻ; tiền di động không thể tự động thu lại, nên Paystack chỉ cho phép khoản dâng một lần bằng tiền di động.
- Các khoản dâng định kỳ Paystack có thể được hủy từ B1 nhưng không thể tạm dừng hoặc chỉnh sửa. Để thay đổi số tiền, hãy hủy và tạo khoản mới.
- **Processing Fee** mặc định phản ánh mức phí thẻ nội địa của Paystack cho đơn vị tiền tệ của bạn; hãy chỉnh sửa nếu mức phí bạn đã thương lượng khác.

## Các bước tiếp theo

- Dùng [Stripe Import](stripe-import.md) để kéo các giao dịch trực tuyến vào B1 Admin nếu chúng không tự động đồng bộ
- Kiểm tra [Báo cáo quyên góp](donation-reports.md) để xác minh rằng các khoản quyên góp trực tuyến đang hiển thị chính xác
- Tạo [Bảng sao kê dâng hiến](giving-statements.md) bao gồm cả khoản dâng trực tuyến và khoản dâng ngoại tuyến
