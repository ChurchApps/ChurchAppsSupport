---
title: "Cài đặt nhà thờ"
---

# Cài đặt nhà thờ

<div class="article-intro">

Trang Cài đặt nhà thờ là nơi bạn cấu hình thông tin cơ bản, chi tiết liên hệ và thương hiệu của nhà thờ. Các thông tin này được dùng trong tất cả công cụ của ChurchApps, bao gồm trang web B1.church và ứng dụng B1 Mobile.

</div>

## Video hướng dẫn

<YouTube id="634zSbzDkYA" title="Thiết lập thông tin và thương hiệu nhà thờ trong B1" next="Vai trò, quyền hạn và mời nhóm của bạn trong B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Bạn cần có quyền "Edit Church Settings" (Chỉnh sửa cài đặt nhà thờ). Xem [Vai trò và quyền hạn](./roles-permissions.md) nếu bạn chưa có quyền này.
- Chuẩn bị sẵn địa chỉ, thông tin liên hệ và logo của nhà thờ

</div>

## Chỉnh sửa thông tin nhà thờ

1. Trong B1 Admin, mở [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (thanh tìm kiếm ở góc trên bên trái), mở rộng **Settings** (Cài đặt), rồi nhấp **Settings**.
2. Trong mục **Church Information** (Thông tin nhà thờ) ở đầu trang, nhấp **Edit** (Chỉnh sửa).
3. Cập nhật bất kỳ trường nào sau đây:
   - **Church Name** (Tên nhà thờ) -- Tên hiển thị trên tất cả sản phẩm của ChurchApps.
   - **Address** (Địa chỉ) -- Địa chỉ thực tế của nhà thờ.
   - **Contact Information** (Thông tin liên hệ) -- Số điện thoại, email và các thông tin liên hệ khác.
   - **Time Zone** (Múi giờ) -- Múi giờ của nhà thờ. Xem [Múi giờ](#time-zone) bên dưới.
4. Nhấp **Save** (Lưu) để áp dụng thay đổi.

## Thiết lập tên miền phụ

Nhà thờ của bạn được cấp một tên miền phụ miễn phí dạng **yourchurch.1.church**. Đây là địa chỉ web để thành viên và khách truy cập tìm thấy nhà thờ trên Internet.

1. Trên trang Settings, nhấp **Edit** trong mục **Church Information** và tìm trường **Subdomain** (Tên miền phụ).
2. Nhập tên miền phụ bạn muốn (ví dụ "gracechurch" cho gracechurch.1.church).
3. Lưu thay đổi.

:::info
Tên miền phụ phải là duy nhất trên tất cả nhà thờ của ChurchApps. Nếu tên bạn chọn đã có người dùng, hãy thử thêm tên thành phố hoặc tiểu bang (ví dụ "gracechurch-dallas").
:::

Nếu bạn muốn khách truy cập vào trang web của nhà thờ qua tên miền riêng (ví dụ **`www.gracechurch.org`**), xem [Tên miền riêng](./custom-domain.md).

## Cấu hình thương hiệu

Tùy chỉnh cách nhà thờ xuất hiện trên tất cả công cụ của ChurchApps:

1. Tải lên **logo nhà thờ** bằng cách nhấp vào khu vực logo và chọn một tệp hình ảnh.
2. Thêm các **hình ảnh nhà thờ** bổ sung dùng trên trang web và [ứng dụng di động](./mobile-app.md) của bạn.

:::tip
Để có kết quả tốt nhất, hãy dùng logo định dạng PNG với nền trong suốt. Cách này giúp logo hiển thị đẹp trên cả nền sáng và nền tối.
:::

## Ngày đầu tuần

Chọn ngày bắt đầu của lịch. Danh sách **First Day of Week** (Ngày đầu tuần) trong mục Church Info mặc định là **Sunday** (Chủ nhật), nhưng bạn có thể đặt thành bất kỳ ngày nào. Sau khi thay đổi, cài đặt này được áp dụng trong lưới lịch của B1 Admin và cổng thông tin thành viên B1.church. Lịch nhóm, lịch đã tuyển chọn và trình chỉnh sửa sự kiện đều bắt đầu mỗi tuần từ ngày bạn chọn.

## Múi giờ

Danh sách **Time Zone** trong mục **Church Information** đặt múi giờ của nhà thờ (ví dụ *America/Chicago*). Chọn **None** (Không) để để trống. Sau khi lưu, múi giờ sẽ hiển thị trong phần tóm tắt Church Information.

B1 dùng múi giờ này cho các thời gian chung của nhà thờ, chẳng hạn như nhắc nhở sự kiện và lịch trên các TV [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md) của bạn. [Lịch điểm danh](../attendance/setup.md#setting-a-check-in-schedule) được tính theo múi giờ của [cơ sở](./campuses.md) tổ chức buổi lễ trước tiên, và chỉ dùng múi giờ của nhà thờ khi cơ sở đó không có múi giờ riêng. Nếu tất cả cơ sở của bạn nằm trong cùng một múi giờ, hãy đặt múi giờ đó cho cả nhà thờ lẫn từng cơ sở.

## Khu vực (định dạng ngày và số điện thoại)

Cài đặt **Region** (Khu vực) kiểm soát cách ghi ngày và giờ trong toàn bộ B1. Mặc định, ngày được hiển thị theo định dạng Hoa Kỳ (ví dụ "Sep 28, 2026" và "9/28/2026"). Các nhà thờ ngoài Hoa Kỳ có thể chuyển sang định dạng riêng của họ. Ví dụ, nếu chọn English (United Kingdom), ngày sẽ hiển thị là "28 Sept 2026" và "28/09/2026".

1. Trên trang Settings, nhấp **Region** trong danh sách bên trái, rồi nhấp **Edit** trong mục **Region**.
2. Chọn khu vực của bạn trong danh sách **Region**. Mỗi tùy chọn đều hiển thị một ngày mẫu để bạn xem trước cách ngày sẽ hiển thị.
3. Nhấp **Save**.

Mục Region sau đó sẽ hiển thị khu vực bạn đã chọn, một mẫu **Date format** (Định dạng ngày) và định dạng **Phone numbers** (Số điện thoại).

### Định dạng số điện thoại

Mục Region cũng có cài đặt **Phone numbers** để kiểm soát cách nhập số điện thoại trong hồ sơ của mỗi người:

- **International (with country code)** (Quốc tế, có mã quốc gia) -- Mặc định. Các trường điện thoại hiển thị bộ chọn cờ quốc gia và lưu số kèm mã quốc gia (ví dụ +1 918 555 1234).
- **Local (as typed)** (Nội địa, nhập nguyên văn) -- Các trường điện thoại trở thành ô văn bản thường và lưu số đúng như bạn nhập, không thêm mã quốc gia (ví dụ 0701 234 5678). Chọn tùy chọn này nếu nhà thờ của bạn ghi số theo định dạng nội địa và không muốn B1 thêm mã quốc gia.

Khi chọn **Local**, mục Region cũng hiển thị "Local phone numbers" bên cạnh khu vực của bạn.

:::tip
Nhắn tin hoạt động tốt nhất khi số điện thoại có mã quốc gia. Nếu bạn gửi tin nhắn từ B1, hãy giữ định dạng **International**, hoặc đảm bảo số bạn nhập ở chế độ Local đã có mã quốc gia.
:::

Cài đặt khu vực áp dụng cho ngày và giờ trong B1 Admin, trên trang web B1.church và cổng thông tin thành viên, bao gồm bài giảng, bài blog, lịch nhóm và kế hoạch phục vụ. Nhờ vậy, thành viên thấy ngày theo cùng định dạng mà nhân viên của bạn thấy.

## Nhắn tin {#texting}

Kết nối một nhà cung cấp dịch vụ nhắn tin để gửi tin SMS đến một người hoặc cả một nhóm từ B1 Admin. Tin nhắn được gửi qua tài khoản riêng của bạn với nhà cung cấp, vì vậy giá cước và giới hạn của họ sẽ được áp dụng.

1. Trên trang Settings, nhấp **Texting** trong danh sách bên trái, rồi nhấp **Edit** trong mục **Texting**.
2. Chọn một **Provider** (Nhà cung cấp):
   - **Clearstream** -- nhập **API Key** (Khóa API). Tạo khóa trong Account Settings của Clearstream, tại mục API Keys.
   - **Text In Church** -- nhập **API Key**. Trước tiên, hãy yêu cầu bộ phận hỗ trợ của Text In Church cấp quyền truy cập API cho nhà phát triển, sau đó tạo khóa trong mục Account Settings > Developer API.
   - **Nalo Solutions** (Ghana) -- nhập khóa xác thực từ tài khoản Nalo Solutions của bạn làm **API Key**, và nhập **Sender ID** (tối đa 11 ký tự) mà Nalo đã phê duyệt cho bạn.
   - **Twilio** -- dùng tài khoản Twilio riêng của nhà thờ; Twilio sẽ tính phí trực tiếp với bạn. Sao chép **Account SID** và **Auth Token** từ [Twilio Console](https://console.twilio.com), rồi nhập **From Number** (Số gửi) -- một số điện thoại Twilio đã đăng ký A2P 10DLC, theo định dạng như `+15551234567`. Sau khi lưu, hãy dán URL webhook nhận tin (xem bên dưới) vào webhook **A message comes in** (Có tin nhắn đến) của số đó trong Twilio, để các phản hồi STOP cũng được ghi nhận trong B1.
3. Nhấp **Save**.

Để ngừng nhắn tin, đặt **Provider** thành **None** (Không có) rồi lưu. Thao tác này sẽ xóa nhà cung cấp đã lưu.

### Hủy đăng ký cho người trả lời STOP

Sau khi lưu nhà cung cấp, hãy mở lại mục Texting bằng **Edit**. Bên dưới phần cài đặt nhà cung cấp, trường **Inbound (STOP) webhook URL** chỉ đọc sẽ hiển thị một địa chỉ web riêng cho nhà thờ của bạn. Nhấp vào trường để chọn địa chỉ, sao chép và dán vào cài đặt webhook tin nhắn đến (trả lời) của nhà cung cấp dịch vụ nhắn tin. Cách này hoạt động với bất kỳ nhà cung cấp nào ở trên có thể chuyển tiếp tin trả lời đến một webhook.

Sau đó, khi ai đó trả lời **STOP** (hoặc STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT hoặc REVOKE) cho một tin nhắn của bạn, B1 sẽ tìm tất cả người có số di động khớp, đánh dấu họ là đã hủy đăng ký và tắt nhắc nhở qua tin nhắn của họ. Sau đó, họ sẽ bị bỏ qua khi gửi tin nhắn nhóm. Các trả lời khác sẽ bị bỏ qua.

:::info
Thao tác này dùng cùng cài đặt hủy đăng ký với **Hide me from the member directory** (Ẩn tôi khỏi danh bạ thành viên), vì vậy những người trả lời STOP cũng sẽ hiển thị **Hidden from directory** (Đã ẩn khỏi danh bạ) trên hồ sơ của họ. Trường URL chỉ xuất hiện khi nhà cung cấp đã lưu được chọn -- nếu bạn chuyển danh sách sang nhà cung cấp khác, hãy lưu trước để xem lại URL.
:::

Khi đã kết nối nhà cung cấp, nhân viên có quyền gửi tin nhắn sẽ thấy nút **Text** (Nhắn tin) trên trang của nhóm (**Text this group** -- Nhắn tin cho nhóm này) và trên trang của người có số di động (**Send text message** -- Gửi tin nhắn). Nhập nội dung và nhấp **Send** (Gửi). Hộp thoại sẽ đếm số ký tự và số phân đoạn SMS. Với một nhóm, hộp thoại hiển thị số thành viên sẽ nhận tin trước khi bạn gửi:

- Thành viên không có số di động trong hồ sơ sẽ bị bỏ qua.
- Thành viên đã chọn **Hide me from the member directory** được tính là đã hủy đăng ký và sẽ bị bỏ qua.
- Các thành viên trong cùng gia đình chung một số di động chỉ nhận tin một lần.

### Cá nhân hóa tin nhắn bằng trường ghép {#personalizing-texts-with-merge-fields}

Bên dưới ô nhập tin nhắn, hộp thoại Text hiển thị các nút trường: **First Name** (Tên), **Last Name** (Họ), **Display Name** (Tên hiển thị) và **Church Name** (Tên nhà thờ). Nhấp vào một nút để chèn trường tương ứng (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` hoặc `{{churchName}}`) tại vị trí con trỏ. Khi tin nhắn được gửi, mỗi trường sẽ được thay bằng thông tin của người nhận, nên một tin nhắn nhóm như `Hi {{firstName}}, see you Sunday!` sẽ đến từng thành viên với tên riêng của họ. Trường ghép hoạt động cho cả tin nhắn nhóm lẫn tin nhắn gửi đến một người. Tin nhắn gửi đến nhóm còn có nút **Group Name** (Tên nhóm) (`{{groupName}}`), được thay bằng tên của nhóm.

Để tái sử dụng một tin nhắn, hãy lưu nó thành [mẫu tin nhắn](./email-templates.md#text-templates) (một mẫu email thuộc danh mục **Text**), rồi chọn mẫu đó từ **Load Template (optional)** (Tải mẫu, tùy chọn) ở đầu cửa sổ Text.

:::info
Giới hạn 1.600 ký tự áp dụng cho nội dung khi bạn đang gõ. Sau khi các trường ghép được điền, mọi nội dung dài hơn 1.600 ký tự sẽ bị cắt tại giới hạn đó.
:::

Tin nhắn cũng có thể được gửi tự động từ một bước [quy trình làm việc](../serving/workflows.md#sending-a-text) với hành động **Send Text**, dùng cùng nhà cung cấp và các trường ghép.

## Lưu trữ tệp

Mặc định, các tệp bạn tải lên trang web (qua [Files](../website/files.md)) và các khu vực nội dung khác sử dụng dịch vụ lưu trữ miễn phí của B1, tối đa 100MB. Nếu cần thêm dung lượng, bạn có thể kết nối dịch vụ lưu trữ đám mây riêng. Khi đó, các tệp tải lên mới sẽ được lưu thẳng vào tài khoản của bạn và không còn giới hạn từ nền tảng.

1. Trên trang Settings, nhấp **File Storage** trong danh sách bên trái, rồi nhấp **Edit** trong mục **File Storage**.
2. Chọn nhà cung cấp: **Google Drive**, **Dropbox**, **OneDrive** hoặc **S3-compatible bucket** (AWS S3, Cloudflare R2, Backblaze B2, v.v.).
3. Với Google Drive, Dropbox hoặc OneDrive, nhấp **Connect** (Kết nối) và đăng nhập để cấp quyền truy cập. Với S3-compatible bucket, nhập access key, secret, tên bucket và URL công khai gốc.
4. Nhấp **Save**.

:::info
Thay đổi này chỉ ảnh hưởng đến các tệp mới tải lên mục Files của trang web và các khu vực nội dung tương tự. Hình ảnh thư viện, ảnh thu nhỏ, logo và ảnh cá nhân luôn được lưu trên dịch vụ mặc định của B1.
:::

## Lên lớp tự động

Nếu bạn theo dõi **Grade** (Lớp) của trẻ em và học sinh, B1 có thể tự động nâng tất cả lên một lớp vào ngày bạn chọn (ví dụ ngày 1 tháng 8), thay vì bạn phải chỉnh sửa từng hồ sơ bằng tay.

1. Trên trang Settings, nhấp **Grade Promotion** trong danh sách bên trái, rồi nhấp **Edit** trong mục **Grade Promotion**.
2. Bật công tắc (hiển thị **Enabled**) và chọn **Month** (Tháng) và **Day** (Ngày) để lên lớp mỗi năm. Vào ngày đó, mọi người có lớp sẽ được nâng lên một lớp, và học sinh lớp 12 sẽ được chuyển thành **Graduated** (Đã tốt nghiệp).
3. Lưu thay đổi.

Để ngừng lên lớp tự động, hãy tắt công tắc để hiển thị **Disabled** (Đã tắt) rồi lưu. Ngày lên lớp sẽ bị xóa và lớp sẽ không còn tự thay đổi nữa.

## Đăng ký tình nguyện {#volunteer-signup}

Mặc định, thành viên xem [đăng ký tình nguyện](../../b1-church/serving/volunteer-signup.md) sẽ thấy mọi tuần sắp tới còn vị trí trống. Nếu danh sách này quá dài, bạn có thể chỉ hiển thị tuần tiếp theo của mỗi loại kế hoạch.

1. Trên trang Settings, nhấp **Volunteer Signup** trong danh sách bên trái, rồi nhấp **Edit** trong mục **Volunteer Signup**.
2. Bật **Show only the next week of each plan type** (Chỉ hiển thị tuần tiếp theo của mỗi loại kế hoạch).
3. Lưu thay đổi.

Khi bật tùy chọn này, mỗi loại kế hoạch chỉ hiển thị kế hoạch sắp tới nhất. Tuần kế tiếp sẽ xuất hiện sau khi ngày đó đã qua. Dòng **Weeks shown** (Số tuần hiển thị) trong mục sẽ ghi **Only the next week of each plan type** (Chỉ tuần tiếp theo của mỗi loại kế hoạch) hoặc **All upcoming weeks** (Tất cả các tuần sắp tới).

## Quyền riêng tư khi quyên góp {#giving-privacy}

Những người có quyền xem khoản quyên góp thường thấy tổng số tiền quyên góp của một người trên [hồ sơ cá nhân](../people/adding-people.md#editing-details) của họ. Nếu bạn không muốn số tiền hiển thị mỗi lần mở hồ sơ, bạn có thể ẩn chúng cho đến khi có người yêu cầu xem.

1. Trên trang Settings, nhấp **Giving privacy** trong danh sách bên trái, rồi nhấp **Edit** trong mục **Giving privacy**.
2. Bật **Hide giving on person records until clicked** (Ẩn quyên góp trên hồ sơ cho đến khi nhấp).
3. Lưu thay đổi.

Khi bật tùy chọn này, thẻ quyên góp trên hồ sơ cá nhân sẽ hiển thị "Giving is hidden on person records" (Thông tin quyên góp đã được ẩn trên hồ sơ). Nhấp **Show giving** (Hiện quyên góp) để tải và hiển thị khoản quyên góp của người đó. Thông tin sẽ ẩn lại khi bạn mở hồ sơ người khác. Quyền xem khoản quyên góp không thay đổi: chỉ những người có quyền truy cập thông tin quyên góp mới thấy thẻ này.

## Nhập và xuất dữ liệu

Liên kết **Import/Export** (Nhập/Xuất) dưới tên nhà thờ trên trang Settings sẽ mở một công cụ riêng trong cửa sổ trình duyệt mới. Bạn có thể dùng công cụ này để:

- Nhập dữ liệu thành viên từ một hệ thống quản lý nhà thờ khác.
- Xuất dữ liệu ChurchApps để sao lưu hoặc chuyển đổi.

Công cụ này đặc biệt hữu ích khi bạn mới thiết lập nhà thờ và cần chuyển các hồ sơ hiện có vào ChurchApps.

:::warning
Khi nhập dữ liệu, hãy luôn sao lưu hồ sơ hiện có trước. Thao tác nhập sẽ thêm dữ liệu vào hệ thống và có thể tạo các mục trùng lặp nếu chạy nhiều lần.
:::
