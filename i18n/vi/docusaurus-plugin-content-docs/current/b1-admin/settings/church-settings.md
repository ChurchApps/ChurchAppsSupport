---
title: "Cài đặt nhà thờ"
description: "Thiết lập tên, địa chỉ, tên miền phụ, múi giờ, định dạng khu vực, nhà cung cấp nhắn tin và lưu trữ tệp cho nhà thờ của bạn trên trang Cài đặt Nhà thờ trong B1 Admin."
---

# Cài đặt nhà thờ

<div class="article-intro">

Trang Cài đặt Nhà thờ là nơi bạn cấu hình thông tin cơ bản, chi tiết liên hệ và thương hiệu của nhà thờ. Những thông tin này được sử dụng trong tất cả các công cụ của ChurchApps, bao gồm trang web B1.church và B1 App của bạn.

</div>

## Video hướng dẫn

<YouTube id="634zSbzDkYA" title="Thiết lập thông tin và thương hiệu nhà thờ trong B1" next="Vai trò, quyền hạn và mời nhóm của bạn trong B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần có quyền "Edit Church Settings" (Chỉnh sửa cài đặt nhà thờ). Xem [Vai trò & Quyền hạn](./roles-permissions.md) nếu bạn chưa có quyền truy cập.
- Chuẩn bị sẵn địa chỉ, thông tin liên hệ và logo của nhà thờ

</div>

## Chỉnh sửa thông tin nhà thờ

1. Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), mở rộng **Settings** (Cài đặt), rồi nhấp **Settings**.
2. Trong mục **Church Information** (Thông tin nhà thờ) ở đầu trang, nhấp **Edit** (Chỉnh sửa).
3. Cập nhật bất kỳ trường nào sau đây:
   - **Church Name** (Tên nhà thờ) -- Tên được hiển thị trong tất cả sản phẩm của ChurchApps.
   - **Address** (Địa chỉ) -- Địa chỉ thực tế của nhà thờ.
   - **Contact Information** (Thông tin liên hệ) -- Số điện thoại, email và các thông tin liên hệ khác.
   - **Time Zone** (Múi giờ) -- Múi giờ của nhà thờ. Xem [Múi giờ](#time-zone) bên dưới.
4. Nhấp **Save** (Lưu) để áp dụng thay đổi.

## Thiết lập tên miền phụ

Nhà thờ của bạn được cấp một tên miền phụ miễn phí tại **yourchurch.1.church**. Đây là địa chỉ web để thành viên và khách truy cập tìm đến trang trực tuyến của nhà thờ.

1. Trên trang Settings, nhấp **Edit** trong mục **Church Information** và tìm trường **Subdomain** (Tên miền phụ).
2. Nhập tên miền phụ bạn muốn (ví dụ: "gracechurch" để có gracechurch.1.church).
3. Lưu thay đổi.

:::info
Tên miền phụ của bạn phải là duy nhất trên tất cả nhà thờ thuộc ChurchApps. Nếu tên bạn chọn đã có người dùng, hãy thử thêm tên thành phố hoặc tiểu bang (ví dụ: "gracechurch-dallas").
:::

Nếu bạn muốn khách truy cập vào trang của nhà thờ qua tên miền riêng (ví dụ: **`www.gracechurch.org`**), xem [Tên miền tùy chỉnh](./custom-domain.md).

## Cấu hình thương hiệu

Tùy chỉnh cách nhà thờ của bạn xuất hiện trong tất cả các công cụ của ChurchApps:

1. Tải lên **logo nhà thờ** bằng cách nhấp vào khu vực logo và chọn một tệp hình ảnh.
2. Thêm các **hình ảnh nhà thờ** bổ sung được dùng trên trang web và [ứng dụng di động](./mobile-app.md) của bạn.

:::tip
Để có kết quả tốt nhất, hãy dùng logo định dạng PNG với nền trong suốt. Điều này giúp logo hiển thị đẹp trên cả nền sáng lẫn nền tối.
:::

## Ngày đầu tuần

Chọn ngày bắt đầu của lịch. Danh sách thả xuống **First Day of Week** (Ngày đầu tuần) trong mục Church Info mặc định là **Sunday** (Chủ nhật), nhưng bạn có thể đặt thành bất kỳ ngày nào. Sau khi thay đổi, cài đặt này sẽ được áp dụng cho các lưới lịch trong B1 Admin và cổng thành viên của B1.church. Lịch nhóm, lịch đã được tuyển chọn và trình chỉnh sửa sự kiện đều sẽ bắt đầu mỗi tuần vào ngày bạn đã chọn.

## Múi giờ

Danh sách thả xuống **Time Zone** (Múi giờ) trong mục **Church Information** đặt múi giờ của nhà thờ (ví dụ: *America/Chicago*). Chọn **None** (Không) để để trống. Sau khi lưu, múi giờ sẽ hiển thị trong phần tóm tắt Church Information.

B1 sử dụng múi giờ này cho các thời gian chung của nhà thờ, chẳng hạn như nhắc nhở sự kiện và lịch trên các TV [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md) của bạn. [Lịch check-in](../attendance/setup.md#setting-a-check-in-schedule) được tính theo múi giờ của [cơ sở](./campuses.md) tổ chức buổi lễ trước tiên, và chỉ dùng múi giờ của nhà thờ khi cơ sở đó không có múi giờ riêng. Nếu tất cả các cơ sở của bạn nằm trong cùng một múi giờ, hãy đặt múi giờ cho cả nhà thờ lẫn từng cơ sở.

## Khu vực (định dạng ngày và số điện thoại)

Cài đặt **Region** (Khu vực) kiểm soát cách ngày và giờ được viết trong toàn bộ B1. Mặc định, ngày sử dụng định dạng của Hoa Kỳ (ví dụ: "Sep 28, 2026" và "9/28/2026"). Các nhà thờ ngoài Hoa Kỳ có thể chuyển sang định dạng của nước mình. Ví dụ, chọn English (United Kingdom) sẽ hiển thị "28 Sept 2026" và "28/09/2026" thay thế.

1. Trên trang Settings, nhấp **Region** trong danh sách bên trái, rồi nhấp **Edit** trong mục **Region**.
2. Chọn khu vực của bạn từ danh sách thả xuống **Region**. Mỗi tùy chọn đều có một ngày mẫu để bạn xem chính xác ngày sẽ hiển thị như thế nào.
3. Nhấp **Save**.

Sau đó, mục Region sẽ hiển thị khu vực bạn đã chọn, một mẫu **Date format** (Định dạng ngày) và định dạng **Phone numbers** (Số điện thoại).

### Định dạng số điện thoại

Trong cùng mục Region có cài đặt **Phone numbers** (Số điện thoại), dùng để kiểm soát cách số điện thoại được nhập trong hồ sơ của một người:

- **International (with country code)** (Quốc tế, có mã quốc gia) -- mặc định. Các trường số điện thoại hiển thị bộ chọn cờ quốc gia và lưu số kèm mã quốc gia (ví dụ: +1 918 555 1234).
- **Local (as typed)** (Nội địa, như đã nhập) -- các trường số điện thoại trở thành ô văn bản thông thường và lưu số đúng như bạn gõ, không thêm mã quốc gia (ví dụ: 0701 234 5678). Chọn tùy chọn này nếu nhà thờ của bạn ghi số theo định dạng nội địa và không muốn B1 thêm mã quốc gia.

Khi chọn **Local**, mục Region cũng sẽ hiển thị "Local phone numbers" (Số điện thoại nội địa) bên cạnh khu vực của bạn.

:::tip
Nhắn tin hoạt động tốt nhất khi số điện thoại có mã quốc gia. Nếu bạn gửi tin nhắn từ B1, hãy giữ định dạng **International**, hoặc đảm bảo các số bạn nhập ở chế độ Local đã có mã quốc gia.
:::

Khu vực của bạn áp dụng cho ngày và giờ trong B1 Admin cũng như trên trang web B1.church và cổng thành viên, bao gồm bài giảng, bài blog, lịch nhóm và kế hoạch phục vụ, để thành viên thấy ngày được hiển thị theo cùng định dạng mà nhân viên của bạn thấy.

## Nhắn tin {#texting}

Kết nối một nhà cung cấp nhắn tin để gửi tin nhắn SMS đến một người hoặc toàn bộ nhóm từ B1 Admin. Tin nhắn được gửi qua tài khoản riêng của bạn với nhà cung cấp, vì vậy giá cước và giới hạn của họ sẽ được áp dụng.

1. Trên trang Settings, nhấp **Texting** trong danh sách bên trái, rồi nhấp **Edit** trong mục **Texting**.
2. Chọn một **Provider** (Nhà cung cấp):
   - **Clearstream** -- nhập một **API Key** (Khóa API). Tạo khóa trong phần API Keys của Clearstream Account Settings.
   - **Text In Church** -- nhập một **API Key**. Trước tiên, hãy yêu cầu Text In Church Support cấp quyền truy cập API cho nhà phát triển, sau đó tạo khóa trong mục Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) -- nhập khóa xác thực từ tài khoản Nalo Solutions của bạn làm **API Key**, và một **Sender ID** (tối đa 11 ký tự) mà Nalo đã phê duyệt cho bạn.
   - **Twilio** -- sử dụng tài khoản Twilio riêng của nhà thờ; Twilio sẽ tính phí trực tiếp với bạn. Sao chép **Account SID** và **Auth Token** từ [Twilio Console](https://console.twilio.com), rồi nhập **From Number** -- một số điện thoại Twilio đã đăng ký A2P 10DLC, theo định dạng như `+15551234567`. Sau khi lưu, dán URL webhook tin nhắn đến (xem bên dưới) vào webhook **A message comes in** của số đó trong Twilio, để các phản hồi STOP cũng được ghi nhận trong B1.
3. Nhấp **Save**.

Để ngừng nhắn tin, đặt **Provider** thành **None** (Không có) rồi lưu. Thao tác này sẽ xóa nhà cung cấp đã lưu.

### Hủy đăng ký cho những người trả lời STOP

Sau khi đã lưu nhà cung cấp, mở lại mục Texting bằng **Edit**. Bên dưới phần cài đặt nhà cung cấp, trường **Inbound (STOP) webhook URL** (URL webhook STOP đến) chỉ đọc sẽ hiển thị một địa chỉ web riêng cho nhà thờ của bạn. Nhấp vào trường để chọn địa chỉ, sao chép và dán vào cài đặt webhook tin nhắn đến (phản hồi) của nhà cung cấp. Cách này hoạt động với bất kỳ nhà cung cấp nào ở trên có thể chuyển tiếp các phản hồi đến tới một webhook.

Sau đó, khi ai đó trả lời **STOP** (hoặc STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT hoặc REVOKE) cho một trong các tin nhắn của bạn, B1 sẽ tìm tất cả những người có số di động khớp, đánh dấu họ là đã hủy đăng ký và tắt nhắc nhở qua tin nhắn của họ. Sau đó, họ sẽ bị bỏ qua khi gửi tin nhắn nhóm. Các phản hồi khác sẽ bị bỏ qua.

:::info
Điều này sử dụng cùng cài đặt hủy đăng ký với **Hide me from the member directory** (Ẩn tôi khỏi danh bạ thành viên), vì vậy những người trả lời STOP cũng sẽ hiển thị là **Hidden from directory** (Ẩn khỏi danh bạ) trên hồ sơ của họ. Trường này chỉ xuất hiện khi nhà cung cấp đã lưu đang được chọn -- nếu bạn chuyển danh sách sang nhà cung cấp khác, hãy lưu trước để xem lại URL.
:::

Khi đã kết nối nhà cung cấp, những nhân viên có quyền gửi tin nhắn sẽ thấy nút **Text** (Nhắn tin) trên trang của một nhóm (**Text this group** -- Nhắn tin cho nhóm này) và trang của một người có số di động (**Send text message** -- Gửi tin nhắn). Nhập nội dung và nhấp **Send** (Gửi). Hộp thoại sẽ đếm số ký tự và số đoạn SMS. Đối với một nhóm, hộp thoại sẽ hiển thị số thành viên sẽ nhận tin nhắn trước khi bạn gửi:

- Các thành viên chưa có số di động trong hồ sơ sẽ bị bỏ qua.
- Các thành viên đã chọn **Hide me from the member directory** sẽ được tính là đã hủy đăng ký và bị bỏ qua.
- Các thành viên trong cùng gia đình dùng chung một số di động chỉ nhận tin nhắn một lần.

### Cá nhân hóa tin nhắn bằng trường gộp {#personalizing-texts-with-merge-fields}

Bên dưới ô nhập nội dung, hộp thoại Text hiển thị các nút trường thay thế: **First Name** (Tên), **Last Name** (Họ), **Display Name** (Tên hiển thị) và **Church Name** (Tên nhà thờ). Nhấp vào một nút để chèn trường thay thế tương ứng (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` hoặc `{{churchName}}`) tại vị trí con trỏ. Khi tin nhắn được gửi, mỗi trường thay thế sẽ được thay bằng thông tin của người nhận, vì vậy một tin nhắn nhóm như `Hi {{firstName}}, see you Sunday!` sẽ đến từng thành viên với tên riêng của họ. Trường thay thế hoạt động cho cả tin nhắn nhóm lẫn tin nhắn gửi đến một người. Tin nhắn gửi đến nhóm còn có nút **Group Name** (Tên nhóm) (`{{groupName}}`), sẽ được thay bằng tên của nhóm.

Để dùng lại một tin nhắn, hãy lưu nó thành [mẫu tin nhắn](./email-templates.md#text-templates) (một mẫu email thuộc danh mục **Text**) và chọn từ **Load Template (optional)** (Tải mẫu, tùy chọn) ở đầu cửa sổ Text.

:::info
Giới hạn 1.600 ký tự áp dụng cho nội dung tại thời điểm bạn đang gõ. Sau khi các trường thay thế được điền, mọi phần văn bản dài hơn 1.600 ký tự sẽ bị cắt ngắn tại độ dài đó.
:::

Tin nhắn cũng có thể được gửi tự động từ một bước [quy trình làm việc](../serving/workflows.md#sending-a-text) với hành động **Send Text** (Gửi tin nhắn), sử dụng cùng nhà cung cấp và các trường thay thế.

## Lưu trữ tệp

Mặc định, các tệp bạn tải lên trang web (thông qua [Files](../website/files.md)) và các khu vực nội dung khác sử dụng dịch vụ lưu trữ miễn phí của B1, tối đa 100MB. Nếu bạn cần thêm dung lượng, bạn có thể kết nối dịch vụ lưu trữ đám mây riêng -- các tệp tải lên mới sẽ được lưu trực tiếp vào tài khoản của bạn mà không có giới hạn của nền tảng.

1. Trên trang Settings, nhấp **File Storage** trong danh sách bên trái, rồi nhấp **Edit** trong mục **File Storage**.
2. Chọn nhà cung cấp: **Google Drive**, **Dropbox**, **OneDrive** hoặc **S3-compatible bucket** (AWS S3, Cloudflare R2, Backblaze B2, v.v.).
3. Với Google Drive, Dropbox hoặc OneDrive, nhấp **Connect** (Kết nối) và đăng nhập để cấp quyền truy cập. Với S3-compatible bucket, nhập khóa truy cập, khóa bí mật, tên bucket và địa chỉ gốc URL công khai.
4. Nhấp **Save**.

:::info
Điều này chỉ ảnh hưởng đến các tệp tải lên mới trong Files của trang web và các khu vực nội dung tương tự. Hình ảnh thư viện, ảnh thu nhỏ, logo và ảnh của người luôn được lưu trên bộ nhớ mặc định của B1.
:::

## Nâng lớp tự động

Nếu bạn theo dõi **Grade** (Lớp) của trẻ em và học sinh, B1 có thể tự động nâng mọi người lên một lớp vào ngày bạn chọn (ví dụ: ngày 1 tháng 8), thay vì yêu cầu bạn chỉnh sửa từng hồ sơ bằng tay.

1. Trên trang Settings, nhấp **Grade Promotion** trong danh sách bên trái, rồi nhấp **Edit** trong mục **Grade Promotion**.
2. Bật công tắc (sẽ hiển thị **Enabled**) và chọn **Month** (Tháng) và **Day** (Ngày) để nâng lớp mỗi năm. Vào ngày đó, mọi người có lớp sẽ được nâng lên một lớp, và học sinh lớp 12 sẽ chuyển thành **Graduated** (Đã tốt nghiệp).
3. Lưu thay đổi.

Để ngừng nâng lớp tự động, hãy tắt công tắc để hiển thị **Disabled** (Đã tắt) rồi lưu. Ngày nâng lớp sẽ bị xóa và lớp sẽ không còn tự thay đổi nữa.

## Đăng ký tình nguyện {#volunteer-signup}

Mặc định, các thành viên xem [đăng ký tình nguyện](../../b1-church/serving/volunteer-signup.md) sẽ thấy mọi tuần sắp tới còn vị trí trống. Nếu danh sách này quá dài, bạn có thể chỉ hiển thị tuần kế tiếp của mỗi loại kế hoạch.

1. Trên trang Settings, nhấp **Volunteer Signup** trong danh sách bên trái, rồi nhấp **Edit** trong mục **Volunteer Signup**.
2. Bật **Show only the next week of each plan type** (Chỉ hiển thị tuần kế tiếp của mỗi loại kế hoạch).
3. Lưu thay đổi.

Khi bật tùy chọn này, mỗi loại kế hoạch chỉ hiển thị kế hoạch sắp tới gần nhất. Tuần tiếp theo sẽ xuất hiện sau khi ngày đó đã qua. Dòng **Weeks shown** (Số tuần hiển thị) trong mục này sẽ hiển thị **Only the next week of each plan type** (Chỉ tuần kế tiếp của mỗi loại kế hoạch) hoặc **All upcoming weeks** (Tất cả các tuần sắp tới).

## Quyền riêng tư về quyên góp {#giving-privacy}

Những người có quyền truy cập thông tin quyên góp thường thấy tổng số tiền quyên góp của một người trên [hồ sơ người đó](../people/adding-people.md#editing-details). Nếu bạn không muốn số tiền hiển thị trên màn hình mỗi khi mở hồ sơ, bạn có thể ẩn chúng cho đến khi có người yêu cầu.

1. Trên trang Settings, nhấp **Giving privacy** trong danh sách bên trái, rồi nhấp **Edit** trong mục **Giving privacy**.
2. Bật **Hide giving on person records until clicked** (Ẩn thông tin quyên góp trên hồ sơ cho đến khi được nhấp).
3. Lưu thay đổi.

Khi bật tùy chọn này, thẻ quyên góp trên hồ sơ người sẽ hiển thị "Giving is hidden on person records" (Thông tin quyên góp được ẩn trên hồ sơ). Nhấp **Show giving** (Hiển thị quyên góp) để tải và hiển thị thông tin quyên góp của người đó. Thông tin sẽ ẩn lại khi bạn mở hồ sơ của người khác. Quyền xem thông tin quyên góp không thay đổi: chỉ những người có quyền truy cập thông tin quyên góp mới thấy thẻ này.

## Nhập và xuất dữ liệu

Liên kết **Import/Export** (Nhập/Xuất) bên dưới tên nhà thờ trên trang Settings sẽ mở một công cụ chuyên dụng trong cửa sổ trình duyệt mới. Bạn có thể dùng công cụ này để:

- Nhập dữ liệu thành viên từ một hệ thống quản lý nhà thờ khác.
- Xuất dữ liệu ChurchApps của bạn để sao lưu hoặc chuyển đổi.

Công cụ này đặc biệt hữu ích khi bạn mới thiết lập nhà thờ và cần chuyển các hồ sơ hiện có vào ChurchApps.

:::warning
Khi nhập dữ liệu, luôn sao lưu các hồ sơ hiện có trước. Thao tác nhập sẽ thêm dữ liệu vào hệ thống và có thể tạo ra các mục trùng lặp nếu chạy nhiều lần.
:::
