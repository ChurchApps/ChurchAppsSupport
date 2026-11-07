---
title: "Điểm cuối Membership"
---

# Điểm cuối Membership

<div class="article-intro">

Module Membership quản lý người, nhà thờ, nhóm, hộ gia đình, vai trò, quyền, biểu mẫu và cài đặt. Đây là module lớn nhất và cung cấp lớp định danh và phân quyền cốt lõi cho tất cả các module khác.

</div>

**Đường dẫn gốc:** `/membership`

## Người

Đường dẫn gốc: `/membership/people`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | People.View hoặc Member | Liệt kê tất cả người của nhà thờ |
| GET | `/:id` | JWT | People.View hoặc hồ sơ của chính mình | Lấy một người theo ID (bao gồm bài gửi biểu mẫu) |
| GET | `/ids?ids=` | JWT | People.View, Member, hoặc People.ViewNames | Lấy nhiều người theo danh sách ID cách nhau bằng dấu phẩy. Người gọi có People.ViewNames nhưng không có People.View chỉ nhận mô hình cơ bản, và những người đã chọn không tham gia danh bạ sẽ bị loại trừ (trừ chính người gọi) |
| GET | `/basic?ids=` | JWT | — | Lấy thông tin cơ bản (chỉ tên) của nhiều người |
| GET | `/names?ids=` | JWT | Bất kỳ quyền nào của nhà thờ | `[{ id, name: { display, first, last }, photo }]`, sắp xếp theo họ rồi đến tên, cho các id cách nhau bằng dấu phẩy mà người gọi đã có quyền truy cập. Giúp các vai trò không có People.View (quyên góp, điểm danh) hiển thị tên người. Không có tìm kiếm, không có lọc danh bạ |
| POST | `/names` | JWT | Bất kỳ quyền nào của nhà thờ | Giống `GET /names`. Body: `{ peopleIds }` (hoặc `{ ids }`) |
| GET | `/recent` | JWT | People.View, Member, hoặc People.ViewNames | Người được thêm gần đây. Người gọi có People.ViewNames nhưng không có People.View (kể cả thành viên có quyền truy cập danh bạ) chỉ nhận mô hình cơ bản (`id`, `name.display`, `photo`, `membershipStatus`), và những người đã chọn không tham gia danh bạ sẽ bị loại trừ |
| GET | `/guest-register/options?churchId=` | Công khai | — | Danh sách kiểm tra đăng ký khách qua mã QR: trả về `{ email, phone, address, birthDate, gender, maritalStatus, grade, comments }`, mỗi trường là `"off"`, `"optional"`, hoặc `"required"` (được phân tích từ cài đặt công khai `guestRegistrationFields`; nếu thiếu hoặc sai định dạng thì mặc định email và điện thoại là tùy chọn, các trường còn lại là tắt). Yêu cầu `enableQRGuestRegistration` trừ khi yêu cầu có mã thông báo site/nhà thờ khớp; giới hạn tốc độ (429) |
| GET | `/search?term=&email=` | JWT | People.View, Member, hoặc People.ViewNames | Tìm người theo tên hoặc email (tối đa 100, sắp xếp theo họ rồi đến tên). Người gọi có People.ViewNames nhưng không có People.View (kể cả thành viên có quyền truy cập danh bạ) nhận kết quả tìm theo tên với mô hình cơ bản; tìm theo `email` trả về `[]` |
| GET | `/search/phone?number=` | JWT | People.View hoặc Member | Tìm theo số điện thoại |
| GET | `/search/group?groupId=` | JWT | People.View hoặc Member | Lấy người trong một nhóm cụ thể |
| GET | `/household/:householdId` | JWT | — | Lấy tất cả người trong một hộ gia đình |
| GET | `/attendance` | JWT | People.Edit | Tải người tham dự theo bộ lọc (campusId, serviceId, serviceTimeId, groupId, categoryName, startDate, endDate) |
| GET | `/timeline?personIds=&groupIds=` | JWT | — | Tải dữ liệu dòng thời gian cho người và nhóm |
| GET | `/directory/:id` | JWT | — | Lấy người để hiển thị trong danh bạ (tôn trọng tùy chọn hiển thị) |
| GET | `/claim/:churchId` | JWT | — | Gán hồ sơ người cho người dùng hiện tại tại một nhà thờ |
| POST | `/` | JWT | People.Edit hoặc EditSelf | Tạo hoặc cập nhật người (theo lô) |
| POST | `/search` | JWT | People.View, Member, hoặc People.ViewNames | Tìm người (biến thể POST). Body: `{ term }` hoặc `{ email }`; áp dụng các quy tắc chỉ tên giống `GET /search` |
| POST | `/advancedSearch` | JWT | People.View hoặc Member | Tìm kiếm nhiều điều kiện (tuổi, birthMonth, membershipStatus, v.v.). Body là một mảng điều kiện; body rỗng nghĩa là không có điều kiện, và mọi body khác không phải mảng sẽ trả về 400 |
| POST | `/loadOrCreate` | Công khai | — | Tìm hoặc tạo người theo email. Body: `{ churchId, email, firstName, lastName }` |
| POST | `/guest-register` | Công khai | — | Đăng ký khách qua mã QR. Body: `{ churchId, members: [{ firstName, lastName, email?, phone?, birthDate?, gender?, grade? }], address?, maritalStatus?, comments? }` (1–10 thành viên; email, điện thoại và maritalStatus chỉ áp dụng cho thành viên đầu tiên). Các trường mà nhà thờ đã tắt sẽ bị bỏ qua; thiếu giá trị bắt buộc hoặc giá trị không hợp lệ sẽ trả về 400. Trước tiên, hệ thống tái sử dụng người đã có: một thành viên khớp khi chính xác một người chưa bị xóa có cùng tên (không phân biệt hoa thường) và cùng email hoặc cùng các chữ số điện thoại (nhà, cơ quan hoặc di động); thành viên không có email hoặc điện thoại sẽ khớp theo tên trong hộ gia đình đã khớp. Người đã khớp không bao giờ bị chỉnh sửa. Thành viên chưa khớp sẽ tham gia hộ gia đình đã khớp, hoặc nếu không có thì tạo hộ gia đình mới (đặt tên theo họ của thành viên đầu tiên), với `membershipStatus: "Visitor"` và địa chỉ `address` chung. Lưu `comments` như một ghi chú của thành viên đầu tiên, thêm tất cả vào nhóm riêng `guestRegistrationGroupId` nếu có, và khi `guestRegistrationRecordAttendance` là `"true"` thì ghi điểm danh cho các giờ phục vụ đã lên lịch của nhóm đó mà thời gian check-in hiện đang mở. Trả về `{ householdId, people: [{ id, name }] }`, lặp lại tên đã gửi thay vì tên đã lưu. Quy tắc chọn tham gia/mã thông báo và giới hạn tốc độ giống như lệnh gọi options |
| POST | `/household/:householdId` | JWT | People.Edit | Cập nhật phân công thành viên hộ gia đình |
| POST | `/public/email` | Công khai | — | Gửi email cho một người. Body: `{ churchId, personId, subject, body, appName }` |
| POST | `/apiEmails` | Nội bộ | — | Tải email của người theo ID (giao tiếp giữa các máy chủ, yêu cầu jwtSecret) |
| DELETE | `/:id` | JWT | People.Edit | Xóa một người |

### Ví dụ: Tìm kiếm người

```
GET /membership/people/search?term=John
Authorization: Bearer <token>
```

```json
[
  {
    "id": "abc-123",
    "name": { "first": "John", "last": "Smith" },
    "contactInfo": { "email": "john@example.com" },
    "membershipStatus": "Member"
  }
]
```

### Ví dụ: Tạo một người

```
POST /membership/people
Authorization: Bearer <token>

[{ "firstName": "Jane", "lastName": "Doe", "contactInfo": { "email": "jane@example.com" } }]
```

## Người dùng

Đường dẫn gốc: `/membership/users`

Xem [Xác thực & Quyền](./authentication) để biết các điểm cuối đăng nhập, đăng ký và quản lý mật khẩu.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/login` | Công khai | — | Đăng nhập (email/mật khẩu, làm mới JWT, hoặc authGuid) |
| POST | `/register` | Công khai | — | Đăng ký người dùng mới |
| POST | `/forgot` | Công khai | — | Gửi email đặt lại mật khẩu |
| POST | `/setPasswordGuid` | Công khai | — | Đặt mật khẩu bằng GUID xác thực từ liên kết trong email |
| POST | `/verifyCredentials` | Công khai | — | Xác minh email/mật khẩu và trả về các nhà thờ liên quan |
| POST | `/loadOrCreate` | JWT | — | Tìm hoặc tạo người dùng theo email/userId |
| POST | `/setDisplayName` | JWT | — | Cập nhật họ và tên của người dùng |
| POST | `/updateEmail` | JWT | — | Đổi địa chỉ email của người dùng |
| POST | `/updatePassword` | JWT | — | Đổi mật khẩu của người dùng (tối thiểu 6 ký tự) |
| POST | `/updateOptedOut` | JWT | — | Đặt trạng thái không tham gia danh bạ của một người |
| POST | `/sendInviteEmail` | JWT | People.Edit | Gửi email mời đến một người trong nhà thờ này (`email`, `personName`, `contextName`). Nút hiển thị **Đăng ký** đối với người chưa có tài khoản và **Đăng nhập** đối với người dùng hiện có. Người dùng chưa từng đăng nhập sẽ nhận liên kết **Đặt mật khẩu của bạn** hết hạn sau 7 ngày. Đây là mẫu cố định nên không tính vào giới hạn email hằng ngày của nhà thờ |
| GET | `/search?term=` | JWT | Server.Admin | Tìm tất cả người dùng theo tên/email |
| DELETE | `/` | JWT | — | Xóa tài khoản người dùng hiện tại |

## Nhà thờ

Đường dẫn gốc: `/membership/churches`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Tải tất cả nhà thờ của người dùng hiện tại |
| GET | `/:id` | JWT | — | Lấy nhà thờ theo ID |
| GET | `/:id/getDomainAdmin` | JWT | — | Lấy người dùng quản trị tên miền của một nhà thờ |
| GET | `/:id/impersonate` | JWT | Server.Admin | Mạo danh một nhà thờ (chỉ quản trị máy chủ) |
| GET | `/all?term=` | JWT | Server.Admin | Tìm tất cả nhà thờ (quản trị) |
| GET | `/search/?name=` | Công khai | — | Tìm nhà thờ theo tên |
| GET | `/lookup/?subDomain=&id=` | Công khai | — | Tra cứu nhà thờ theo subdomain hoặc ID |
| POST | `/` | JWT | Settings.Edit | Cập nhật thông tin nhà thờ |
| POST | `/add` | JWT | — | Đăng ký nhà thờ mới. Các trường bắt buộc: name, address1, city, state, zip, country |
| POST | `/search` | Công khai | — | Tìm nhà thờ theo tên (biến thể POST) |
| POST | `/select` | JWT | — | Chọn/chuyển sang một nhà thờ. Body: `{ churchId }` hoặc `{ subDomain }` |
| POST | `/:id/archive` | JWT | Server.Admin | Lưu trữ hoặc bỏ lưu trữ một nhà thờ |
| POST | `/byIds` | Công khai | — | Tải nhiều nhà thờ theo ID |
| DELETE | `/deleteAbandoned` | JWT | Server.Admin | Xóa các nhà thờ đã bị bỏ không sử dụng từ 7 ngày trở lên |

## Nhóm

Đường dẫn gốc: `/membership/groups`

Kế thừa CRUD chuẩn (GET `/`, GET `/:id` từ lớp cơ sở).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liệt kê tất cả nhóm |
| GET | `/:id` | JWT | — | Lấy nhóm theo ID |
| GET | `/search?campusId=&serviceId=&serviceTimeId=` | JWT | — | Tìm nhóm theo bộ lọc dịch vụ |
| GET | `/my` | JWT | — | Lấy các nhóm của người dùng hiện tại |
| GET | `/my/:tag` | JWT | — | Lấy các nhóm của người dùng hiện tại được lọc theo thẻ |
| GET | `/tag/:tag` | JWT | — | Lấy tất cả nhóm có một thẻ cụ thể |
| GET | `/public/:churchId/:id` | Công khai | — | Lấy một nhóm công khai theo nhà thờ và ID |
| GET | `/public/:churchId/tag/:tag` | Công khai | — | Lấy các nhóm công khai theo thẻ |
| GET | `/public/:churchId/label?label=` | Công khai | — | Lấy các nhóm công khai theo nhãn |
| GET | `/public/:churchId/slug/:slug` | Công khai | — | Lấy một nhóm công khai theo slug |
| POST | `/` | JWT | Groups.Edit | Tạo hoặc cập nhật nhóm (tự động tạo slug) |
| DELETE | `/:id` | JWT | Groups.Edit | Xóa một nhóm (cũng xóa các nhóm con cho nhóm mục vụ) |

## Thành viên nhóm

Đường dẫn gốc: `/membership/groupmembers`

Kế thừa CRUD chuẩn (GET `/:id`, DELETE `/:id` từ lớp cơ sở).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | GroupMembers.View | Lấy thành viên nhóm theo ID |
| GET | `/` | JWT | GroupMembers.View* | Liệt kê thành viên nhóm. Lọc theo `?groupId=`, `?groupIds=`, hoặc `?personId=`. *Cũng được phép nếu người dùng là thành viên của nhóm hoặc truy vấn personId của chính mình, và với `?groupId=` của bất kỳ nhóm không bí mật nào khi người dùng có Attendance.View hoặc Attendance.Edit (bao gồm thành viên dưới 13 tuổi) |
| GET | `/my` | JWT | — | Lấy các tư cách thành viên nhóm của người dùng hiện tại |
| GET | `/basic/:groupId` | JWT | — | Lấy danh sách thành viên cơ bản của một nhóm |
| GET | `/public/leaders/:churchId/:groupId` | Công khai | — | Lấy các trưởng nhóm (công khai) |
| GET | `/public/:churchId/:groupId` | Công khai | — | Lấy danh sách công khai của nhóm (các trường tối thiểu: `personId`, `displayName`, `leader`, ảnh). Chỉ khi nhóm chọn tham gia qua `publicRoster`; phục vụ phần tử `staffGrid` của trình tạo trang web |
| POST | `/` | JWT | GroupMembers.Edit | Thêm hoặc cập nhật thành viên nhóm |
| DELETE | `/:id` | JWT | GroupMembers.View | Xóa thành viên khỏi nhóm |

## Hộ gia đình

Đường dẫn gốc: `/membership/households`

Controller CRUD chuẩn.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liệt kê tất cả hộ gia đình |
| GET | `/:id` | JWT | — | Lấy hộ gia đình theo ID |
| POST | `/` | JWT | People.Edit | Tạo hoặc cập nhật hộ gia đình |
| DELETE | `/:id` | JWT | People.Edit | Xóa một hộ gia đình |

## Vai trò

Đường dẫn gốc: `/membership/roles`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Roles.View | Lấy vai trò theo ID |
| GET | `/church/:churchId` | JWT | Roles.View | Lấy tất cả vai trò của một nhà thờ. Mỗi vai trò có `memberCount`, là số người dùng khác nhau trong vai trò đó |
| POST | `/` | JWT | Roles.Edit | Tạo hoặc cập nhật vai trò |
| DELETE | `/:id` | JWT | Roles.Edit | Xóa một vai trò (cũng xóa các quyền và thành viên của vai trò đó) |

## Thành viên vai trò

Đường dẫn gốc: `/membership/rolemembers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Lấy thành viên của một vai trò. Thêm `?include=users` để bao gồm chi tiết người dùng |
| POST | `/` | JWT | Roles.Edit | Thêm thành viên vào vai trò (tạo người dùng nếu email chưa tồn tại) |
| DELETE | `/:id` | JWT | Roles.View | Xóa một thành viên vai trò |
| DELETE | `/self/:churchId/:userId` | JWT | — | Tự rời khỏi một nhà thờ |

## Quyền của vai trò

Đường dẫn gốc: `/membership/rolepermissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/roles/:id` | JWT | Roles.View | Lấy quyền của một vai trò (dùng `null` làm ID cho vai trò "Everyone") |
| POST | `/` | JWT | Roles.Edit | Tạo hoặc cập nhật quyền của vai trò |
| DELETE | `/:id` | JWT | Roles.Edit | Xóa một quyền của vai trò |

## Quyền

Đường dẫn gốc: `/membership/permissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lấy danh sách đầy đủ các quyền khả dụng |

Mỗi mục có `apiName`, `section` (loại nội dung), `action`, và các nhãn `displaySection` / `displayAction` mà trình chỉnh sửa vai trò của B1Admin hiển thị. Các bổ sung gần đây: `MembershipApi` / `People` / `View Names` (**Chỉ xem tên người**, thuộc People và Groups) và `GivingApi` / `Donations` / `Enter` (**Nhập quyên góp**, thuộc Donations; xem [Lô quyên góp](./giving.md#donation-batches)).

## Biểu mẫu

Đường dẫn gốc: `/membership/forms`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin hoặc Forms.Edit | Liệt kê tất cả biểu mẫu (quản trị viên thấy tất cả; người chỉnh sửa thấy các biểu mẫu được giao và biểu mẫu không dành cho thành viên) |
| GET | `/:id` | JWT | Quyền truy cập biểu mẫu | Lấy biểu mẫu theo ID |
| GET | `/archived` | JWT | Forms.Admin hoặc Forms.Edit | Liệt kê các biểu mẫu đã lưu trữ |
| GET | `/group/:groupId` | JWT | Thành viên nhóm, trưởng nhóm, hoặc Forms.Admin | Biểu mẫu độc lập được liên kết với nhóm (`forms.groupId`), không bao gồm biểu mẫu đã lưu trữ, sắp xếp theo tên. Trả về `id`, `name`, `description`, và `open` (trong khoảng thời gian có hiệu lực). Thành viên chỉ nhận biểu mẫu đang mở; trưởng nhóm và quản trị biểu mẫu cũng nhận biểu mẫu đã đóng. Phục vụ danh sách biểu mẫu liên kết trên trang nhóm |
| GET | `/standalone/:id?churchId=` | JWT | — | Lấy một biểu mẫu độc lập (biểu mẫu hạn chế yêu cầu xác thực) |
| POST | `/` | JWT | Forms.Admin hoặc Forms.Edit | Tạo hoặc cập nhật biểu mẫu. Biểu mẫu độc lập chấp nhận `photoUrl` tùy chọn (ảnh tiêu đề hiển thị phía trên biểu mẫu) và `groupId` (nhóm liên kết) |
| DELETE | `/:id` | JWT | Quyền truy cập biểu mẫu | Xóa một biểu mẫu |

## Bài gửi biểu mẫu

Đường dẫn gốc: `/membership/formsubmissions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin hoặc Forms.Edit | Liệt kê các bài gửi. Lọc theo `?personId=` hoặc `?formId=` |
| GET | `/my?include=questions,answers` | JWT | — | Chỉ dành cho bản thân: tối đa 50 bài gửi biểu mẫu độc lập (không phải biểu mẫu của người) mà thành viên đã đăng nhập gửi, hoặc được liên kết với người của họ (`contentType` là `person`, `contentId` là ID người của họ — ví dụ, sau khi quản trị viên thay đổi thông tin người), sắp xếp từ mới nhất đến cũ nhất, mỗi bài có `form.name`. `include` đính kèm câu hỏi của mỗi biểu mẫu và câu trả lời của bài gửi. Trả về `401` nếu người dùng chưa được liên kết với một người. Phục vụ mục **Biểu mẫu của tôi** trên trang B1 Me |
| GET | `/group/:groupId` | JWT | Trưởng nhóm | Câu trả lời dành cho trưởng nhóm: một mục cho mỗi biểu mẫu liên kết và mỗi sự kiện nhóm có biểu mẫu đăng ký, mỗi mục có `form`, `event` (`id`, `title`, `start`; chỉ với mục sự kiện), `questions`, và `submissions` (kèm `answers` và `personName`, là `null` nếu ẩn danh) |
| GET | `/:id` | JWT | Forms.Admin, Forms.Edit, hoặc quyền xem | Lấy bài gửi theo ID. Thêm `?include=form,questions,answers`. Trưởng nhóm của nhóm liên kết với biểu mẫu, và trưởng nhóm của nhóm mà một đăng ký sự kiện thuộc về, cũng có thể đọc bài gửi này |
| GET | `/formId/:formId` | JWT | Quyền truy cập biểu mẫu (xem) | Lấy tất cả bài gửi của một biểu mẫu (bao gồm biểu mẫu, câu hỏi, câu trả lời). Trưởng nhóm của nhóm liên kết với biểu mẫu có quyền xem |
| POST | `/` | JWT | — | Gửi câu trả lời biểu mẫu (xử lý biểu mẫu hạn chế/không hạn chế, gửi thông báo qua email). Khi biểu mẫu có `autoCreatePerson`, hệ thống tìm hoặc tạo người Khách theo email và liên kết bài gửi; khi biểu mẫu cũng có `groupId`, người đó được thêm vào nhóm; khi `followUpSubject`/`followUpBody` được đặt, hệ thống gửi email theo dõi theo mẫu đến người gửi. Trừ khi người gọi có thể quản lý biểu mẫu, `submittedBy` luôn được đặt là người của thành viên đã đăng nhập (hoặc để trống đối với bài gửi ẩn danh) |
| DELETE | `/:id` | JWT | Forms.Admin hoặc Forms.Edit | Xóa một bài gửi và các câu trả lời của bài đó |

## Câu hỏi

Đường dẫn gốc: `/membership/questions`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Quyền truy cập biểu mẫu | Liệt kê câu hỏi của một biểu mẫu. Bắt buộc có `?formId=` |
| GET | `/:id` | JWT | Quyền truy cập biểu mẫu | Lấy câu hỏi theo ID |
| GET | `/unrestricted?formId=` | JWT | — | Lấy câu hỏi của một biểu mẫu không hạn chế |
| GET | `/sort/:id/up` | JWT | — | Di chuyển câu hỏi lên trong thứ tự sắp xếp |
| GET | `/sort/:id/down` | JWT | — | Di chuyển câu hỏi xuống trong thứ tự sắp xếp |
| POST | `/` | JWT | Quyền truy cập biểu mẫu | Tạo hoặc cập nhật câu hỏi (tự động gán thứ tự sắp xếp) |
| DELETE | `/:id?formId=` | JWT | Quyền truy cập biểu mẫu | Xóa một câu hỏi |

## Câu trả lời

Đường dẫn gốc: `/membership/answers`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Forms.Admin hoặc Forms.Edit | Liệt kê câu trả lời. Lọc theo `?formSubmissionId=` |
| POST | `/` | JWT | Forms.Admin hoặc Forms.Edit | Tạo hoặc cập nhật câu trả lời |

## Quyền của thành viên

Đường dẫn gốc: `/membership/memberpermissions`

Kiểm soát quyền truy cập của từng thành viên đối với các biểu mẫu cụ thể.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | Quyền truy cập biểu mẫu | Lấy quyền thành viên theo ID |
| GET | `/member/:id` | JWT | Quyền truy cập biểu mẫu | Lấy tất cả quyền biểu mẫu của một thành viên |
| GET | `/form/:id` | JWT | Quyền truy cập biểu mẫu | Lấy tất cả quyền thành viên của một biểu mẫu |
| GET | `/form/:id/my` | JWT | Quyền truy cập biểu mẫu | Lấy quyền của người dùng hiện tại đối với một biểu mẫu |
| POST | `/` | JWT | Quyền truy cập biểu mẫu | Tạo hoặc cập nhật quyền thành viên |
| DELETE | `/:id?formId=` | JWT | Quyền truy cập biểu mẫu | Xóa một quyền thành viên |
| DELETE | `/member/:id?formId=` | JWT | Quyền truy cập biểu mẫu | Xóa tất cả quyền của một thành viên đối với một biểu mẫu |

## Cài đặt

Đường dẫn gốc: `/membership/settings`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Settings.Edit | Lấy tất cả cài đặt của nhà thờ |
| GET | `/public/:churchId` | Công khai | — | Lấy cài đặt công khai của một nhà thờ |
| POST | `/` | JWT | Settings.Edit | Lưu cài đặt (hỗ trợ tải lên ảnh base64) |

## Tên miền

Đường dẫn gốc: `/membership/domains`

Kế thừa CRUD chuẩn (GET `/:id`, GET `/`, DELETE `/:id` từ lớp cơ sở).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liệt kê tất cả tên miền |
| GET | `/:id` | JWT | — | Lấy tên miền theo ID |
| GET | `/lookup/:domainName` | JWT | — | Tra cứu tên miền theo tên |
| GET | `/public/lookup/:domainName` | Công khai | — | Tra cứu tên miền công khai theo tên |
| GET | `/health/check` | Công khai | — | Chạy kiểm tra tình trạng cho các tên miền chưa được kiểm tra |
| POST | `/` | JWT | Settings.Edit | Tạo hoặc cập nhật tên miền (kích hoạt cập nhật Caddy) |
| DELETE | `/:id` | JWT | Settings.Edit | Xóa một tên miền |

## Người dùng và nhà thờ

Đường dẫn gốc: `/membership/userchurch`

Quản lý mối liên kết giữa người dùng và nhà thờ.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/userid/:userId` | JWT | — | Lấy bản ghi người dùng–nhà thờ theo ID người dùng |
| GET | `/personid/:personId` | JWT | — | Lấy email của người dùng được liên kết với một người |
| GET | `/user/:userId` | JWT | Server.Admin | Tải tất cả nhà thờ của một người dùng |
| POST | `/` | JWT | — | Tạo liên kết người dùng–nhà thờ |
| PATCH | `/:userId` | JWT | — | Cập nhật thời gian truy cập gần nhất và ghi nhật ký truy cập |
| DELETE | `/record/:userId/:churchId/:personId` | JWT | — | Xóa một bản ghi người dùng–nhà thờ |

## Tùy chọn hiển thị

Đường dẫn gốc: `/membership/visibilityPreferences`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Lấy tùy chọn hiển thị của người dùng hiện tại |
| POST | `/` | JWT | — | Lưu tùy chọn hiển thị (hiển thị địa chỉ, điện thoại, email) |

## Truy vấn

Đường dẫn gốc: `/membership/query`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/members` | JWT | — | Tìm kiếm thành viên bằng ngôn ngữ tự nhiên sử dụng AI. Body: `{ text, subDomain, siteUrl }` |

## Lỗi phía máy khách

Đường dẫn gốc: `/membership/clientErrors`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | Ghi nhận lỗi phía máy khách |

## Trang liên quan

- [Xác thực & Quyền](./authentication) — Luồng đăng nhập, JWT, OAuth, mô hình quyền
- [Điểm cuối Attendance](./attendance) — Theo dõi buổi phục vụ và lượt viếng thăm
- [Cấu trúc module](../module-structure) — Các mẫu tổ chức mã nguồn
