---
title: "Điểm cuối Nhắn tin"
description: "Tài liệu endpoint messaging API ChurchApps: cuộc trò chuyện, quy tắc truy cập ghi chú, nhắn tin SMS, mẫu email, thông báo và thiết bị."
---

# Điểm cuối Nhắn tin

<div class="article-intro">

Mô-đun Nhắn tin quản lý các cuộc trò chuyện theo thời gian thực, tin nhắn trò chuyện, thông báo đẩy, gửi SMS/email, kết nối WebSocket, tin nhắn riêng, đăng ký thiết bị và các nhà cung cấp dịch vụ nhắn tin văn bản. Mô-đun này cung cấp lớp giao tiếp được dùng xuyên suốt các ứng dụng của ChurchApps, cho cả trò chuyện trực tiếp khi phát trực tuyến lẫn thông báo không đồng bộ.

</div>

**Đường dẫn gốc:** `/messaging`

## Cuộc trò chuyện

Đường dẫn gốc: `/messaging/conversations`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Tải các cuộc trò chuyện theo danh sách ID cách nhau bằng dấu phẩy, kèm tin nhắn đầu và tin nhắn cuối |
| GET | `/messages/:contentType/:contentId` | JWT | — | Tải các cuộc trò chuyện của nội dung, với tin nhắn được phân trang (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Lấy các cuộc trò chuyện dạng bài đăng thuộc các nhóm của người dùng hiện tại |
| GET | `/posts/group/:groupId` | JWT | — | Lấy các cuộc trò chuyện dạng bài đăng của một nhóm cụ thể |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Các ghi chú mới nhất trên mọi bản ghi, dùng cho trang Ghi chú của B1 Admin. `section` là `people`, `groups`, `events` hoặc `workflows` (nếu khác sẽ trả về 400); `limit` mặc định là 25 (tối đa 100); `before` là con trỏ từ trang trước. Mỗi ghi chú vẫn phải đáp ứng quy tắc của loại ghi chú đó (quyền Sửa People / quyền xem ghi chú bảo mật, trưởng nhóm của nhóm, người xem sự kiện, người xem thẻ quy trình), nên người gọi chỉ thấy các ghi chú họ có thể mở. Nội dung ghi chú được cắt còn 300 ký tự |
| GET | `/current/:churchId/:contentType/:contentId` | Công khai | — | Lấy hoặc tạo cuộc trò chuyện hiện tại cho nội dung (tự động giải mã contentId) |
| GET | `/:churchId/:contentType/:contentId` | Công khai | — | Tải các cuộc trò chuyện theo loại nội dung và ID |
| GET | `/:churchId/:id` | Công khai | — | Tải một cuộc trò chuyện theo ID |
| POST | `/` | JWT | — | Tạo hoặc cập nhật cuộc trò chuyện (theo lô) |
| POST | `/start` | JWT | — | Bắt đầu một cuộc trò chuyện mới với một bình luận đầu tiên |
| DELETE | `/:churchId/:id` | JWT | — | Xóa một cuộc trò chuyện |

### Kiểm soát truy cập ghi chú về người

Các cuộc trò chuyện có `contentType: "person"` (tab Ghi chú trên hồ sơ người) hoặc `contentType: "personConfidential"` (mục Ghi chú bảo mật) được kiểm soát trên mọi đường đọc và ghi, kể cả các đường công khai ở trên, vốn sẽ trả về `401` đối với các loại nội dung này. `person` yêu cầu quyền **People / Edit** của MembershipApi; `personConfidential` yêu cầu quyền **People / View Confidential Notes**. Với khóa API có phạm vi, `people:write` bao gồm cả hai hành động (người dùng sở hữu khóa vẫn phải có quyền vai trò tương ứng).

### Kiểm soát truy cập ghi chú của nhóm và sự kiện {#group-and-event-notes-access-control}

Hai loại ghi chú khác cũng được kiểm soát theo cách tương tự, trên mọi đường đọc và ghi (kể cả các đường công khai ở trên), và không bao giờ mở cho việc đăng ẩn danh:

- **`groupNote`** (`contentId` = ID nhóm) -- nguồn cấp **Ghi chú của trưởng nhóm** trên một nhóm. Chỉ các trưởng nhóm đó (`leaderGroupIds` trên JWT) mới có thể đọc hoặc đăng. Không có quyền nhân sự nào cấp quyền truy cập, kể cả `content.edit` và các quyền liên quan đến thành viên nhóm.
- **`eventNote`** (`contentId` = ID sự kiện) -- các ghi chú trên một sự kiện lịch. Nhân sự có `content.edit` hoặc **Calendars / Admin** luôn có thể đọc và đăng. Ngoài ra, quyền truy cập theo `notesViewRole` (đọc) và `notesPostRole` (đăng) của sự kiện: `staff` (mặc định, khi trường là `null`) không cho phép ai khác, `leaders` cho phép trưởng nhóm của nhóm sự kiện, và `members` cho phép thành viên cùng trưởng nhóm của nhóm sự kiện. Sự kiện không có `groupId` chỉ dành cho nhân sự.

### Kiểm soát truy cập ghi chú thẻ quy trình

Các cuộc trò chuyện có `contentType: "workflowCard"` (ghi chú trên một thẻ quy trình, với `contentId` là ID công việc của thẻ) chỉ có thể đọc và ghi bởi người có quyền mở thẻ đó: người dùng có quyền **Tasks / View** của DoingApi, hoặc người hay nhóm được giao, người tạo, hoặc người liên quan đến thẻ. Những người khác sẽ nhận `401` trên mọi đường đọc, kể cả các đường công khai ở trên. Cuộc trò chuyện của thẻ được gắn thông qua chính thẻ đó bằng `POST /doing/tasks/:id/conversation` (nội dung `{ "conversationId": "..." }`; cuộc trò chuyện được gắn đầu tiên sẽ được giữ lại), và những người chỉnh sửa thẻ cùng người được giao có thể gọi API này.

### Ví dụ: Bắt đầu một cuộc trò chuyện

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "comment": "Welcome to this week's discussion thread!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## Tin nhắn

Đường dẫn gốc: `/messaging/messages`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Tải tất cả tin nhắn của một cuộc trò chuyện |
| GET | `/catchup/:churchId/:conversationId` | Công khai | — | Tải tất cả tin nhắn của một cuộc trò chuyện (đường bắt kịp công khai cho trò chuyện trực tiếp) |
| GET | `/:churchId/:id` | Công khai | — | Tải một tin nhắn theo ID |
| POST | `/` | JWT | — | Lưu tin nhắn (theo lô). Gửi cập nhật theo thời gian thực và kích hoạt thông báo. Cập nhật một tin nhắn hiện có yêu cầu người đó là tác giả hoặc có `content.edit`; tác giả đã lưu không bao giờ có thể được gán lại |
| POST | `/send` | Công khai | — | Gửi tin nhắn (theo lô, công khai). Gửi cập nhật theo thời gian thực qua WebSocket và kích hoạt thông báo |
| POST | `/setCallout` | JWT | — | (cũ) Phát một tin nhắn nổi bật theo thời gian thực. Hiện không có client đang hoạt động; trò chuyện phát trực tiếp không còn hiển thị tin nổi bật |
| DELETE | `/:churchId/:id` | JWT | — | Xóa một tin nhắn và phát thông báo xóa theo thời gian thực. Xem [Kiểm duyệt tin nhắn](#message-moderation) |

### Kiểm duyệt tin nhắn

Được phép xóa một tin nhắn đối với:

- tác giả của tin nhắn;
- nhân sự có `content.edit` (trong toàn bộ nhà thờ);
- **trưởng nhóm**, đối với các cuộc trò chuyện có `contentType` là `group` hoặc `groupAnnouncement` mà `contentId` là một nhóm họ lãnh đạo (`leaderGroupIds` trên JWT).

Các cuộc trò chuyện ghi chú về người (`person` / `personConfidential`) không bao giờ do trưởng nhóm kiểm duyệt; chúng dùng quyền ghi chú (`people.edit`, `people.viewConfidentialNotes`) thay thế.

Trưởng nhóm chỉ được xóa, không được sửa: việc chỉnh sửa tin nhắn của thành viên khác vẫn chỉ giới hạn ở tác giả và nhân sự có `content.edit`.

### Ví dụ: Gửi một tin nhắn

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

```json
[
  {
    "id": "msg-001",
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "timeSent": "2026-02-17T10:05:00.000Z",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

## Tin nhắn riêng

Đường dẫn gốc: `/messaging/privatemessages`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Tải tất cả tin nhắn riêng của người dùng hiện tại (bao gồm tin nhắn cuối của mỗi cuộc trò chuyện, và đánh dấu tất cả là đã đọc) |
| GET | `/existing/:personId` | JWT | — | Tìm cuộc trò chuyện riêng đã có với một người cụ thể |
| GET | `/:id` | JWT | — | Tải một tin nhắn riêng theo ID (xóa thông báo nếu tin nhắn gửi đến người dùng hiện tại) |
| POST | `/` | JWT | — | Gửi tin nhắn riêng (theo lô). Kích hoạt thông báo đẩy đến người nhận |

## Thông báo

Đường dẫn gốc: `/messaging/notifications`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Lấy số lượng thông báo chưa đọc của người dùng hiện tại |
| GET | `/my` | JWT | — | Tải tất cả thông báo của người dùng hiện tại (đánh dấu tất cả là đã đọc) |
| GET | `/tmpEmail` | Công khai | — | Kích hoạt bản tóm tắt thông báo email hằng ngày (điểm cuối gỡ lỗi/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Tải thông báo của một người cụ thể |
| GET | `/:churchId/:id` | JWT | — | Tải một thông báo theo ID |
| POST | `/` | JWT | — | Tạo hoặc cập nhật thông báo (theo lô) |
| POST | `/create` | JWT | — | Tạo thông báo cho nhiều người. Nội dung: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Đánh dấu tất cả thông báo của một người là đã đọc |
| POST | `/sendTest` | JWT | — | Gửi một thông báo đẩy thử nghiệm. Nội dung: `{ personId, title }` |
| POST | `/ping` | Công khai | — | Tạo thông báo từ một tác nhân bên ngoài. Nội dung: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Xóa một thông báo |

### Ví dụ: Tạo thông báo

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "New event posted in your group",
  "link": "/groups/group-789"
}
```

## Tùy chọn thông báo

Đường dẫn gốc: `/messaging/notificationpreferences`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Liệt kê các danh mục thông báo cùng các kênh mặc định và các kênh được phép |
| GET | `/my` | JWT | — | Tải tùy chọn thông báo của người dùng hiện tại (tự động tạo mặc định nếu chưa có) |
| POST | `/` | JWT | — | Lưu tùy chọn của người dùng hiện tại. Nội dung: bất kỳ trường nào trong `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, cùng với `overrides: [{ categoryKey, channel, optedIn }]` tùy chọn (channel có thể là `push`, `email`, `in_app` hoặc `sms`; các danh mục bị khóa sẽ bị bỏ qua). `allowSms` là sự đồng ý nhận nhắc nhở qua tin nhắn văn bản của thành viên. Vẫn chấp nhận nội dung dạng mảng các dòng cũ |

## Kết nối

Đường dẫn gốc: `/messaging/connections`

Quản lý các kết nối WebSocket/thời gian thực cho trò chuyện, trò chuyện nhóm, tin nhắn riêng và phát trực tuyến. Xem [Kiến trúc thời gian thực](../../realtime.md) để biết giao thức đầu cuối.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Công khai | — | Tải tất cả kết nối của một cuộc trò chuyện |
| POST | `/` | Công khai | — | Đăng ký kết nối (theo lô). Kích hoạt phát dữ liệu điểm danh trên cuộc trò chuyện. Các mục nội dung: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Công khai | — | Cập nhật tên hiển thị cho một kết nối theo socket ID. Nội dung: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Công khai | — | Gỡ một kết nối khỏi cuộc trò chuyện. Kích hoạt phát dữ liệu điểm danh |
| POST | `/tmpSendAlert` | Công khai | — | Gửi cảnh báo thông báo đến các kết nối của một người. Nội dung: `{ churchId, personId }` |

## Thiết bị

Đường dẫn gốc: `/messaging/devices`

Quản lý đăng ký thiết bị để nhận thông báo đẩy và ghép nội dung (ví dụ: ứng dụng Lessons trên màn hình TV).

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Đăng ký hoặc cập nhật một thiết bị (đăng ký nhận thông báo đẩy trên di động). Khớp theo token FCM hoặc ID thiết bị |
| POST | `/enrollAnon` | Công khai | — | Đăng ký một thiết bị ẩn danh và tạo mã ghép nối gồm 4 ký tự |
| POST | `/` | Công khai | — | Lưu thiết bị (theo lô) |
| GET | `/pair/:pairingCode` | JWT | — | Ghép nối một thiết bị bằng mã ghép nối của nó. Có thể thêm `?contentType=&contentId=` để gán nội dung |
| GET | `/status/:deviceId` | Công khai | — | Kiểm tra trạng thái ghép nối của một thiết bị |
| GET | `/:churchId` | JWT | — | Tải tất cả thiết bị của nhà thờ |
| GET | `/:churchId/person/:personId` | JWT | — | Tải tất cả thiết bị của một người |
| GET | `/:churchId/:id` | JWT | — | Tải một thiết bị theo ID |
| DELETE | `/:churchId/:id` | JWT | — | Xóa một thiết bị |

### Ví dụ: Đăng ký một thiết bị

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Nội dung thiết bị

Đường dẫn gốc: `/messaging/devicecontents`

Quản lý việc gán nội dung cho các thiết bị đã ghép nối (ví dụ: bài học nào đang hiển thị trên TV).

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Tải các gán nội dung của một thiết bị |
| POST | `/` | JWT | — | Lưu các gán nội dung cho thiết bị (theo lô) |
| DELETE | `/:id` | JWT | — | Xóa một gán nội dung cho thiết bị |

## Nhắn tin văn bản

Đường dẫn gốc: `/messaging/texting`

Quản lý các nhà cung cấp dịch vụ SMS, nhắn tin văn bản theo nhóm và theo dõi việc gửi.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Tải các nhà cung cấp nhắn tin văn bản của nhà thờ (thông tin xác thực được che) |
| GET | `/status` | JWT | — | `{ enabled }` -- nhà thờ có nhà cung cấp nhắn tin văn bản đang bật hay không. Bất kỳ người dùng nhà thờ nào đã đăng nhập đều có thể gọi; dùng để chỉ hiển thị các tùy chọn **Text** khi có thể gửi tin nhắn |
| GET | `/inboundUrl` | JWT | `texting.send` hoặc `settings.edit` | `{ url }` -- URL webhook nhận tin nhắn đến (STOP) của nhà thờ để dán vào nhà cung cấp |
| POST | `/inbound/:churchId/:token` | Công khai | — | Webhook nhận tin nhắn đến của nhà cung cấp. `token` là HMAC của ID nhà thờ. Một phản hồi chính xác là một từ dừng (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) sẽ đánh dấu mọi người phù hợp là `optedOut` và tắt `allowSms` của họ. Trả về `{ optedOut: <count> }`; các phản hồi khác trả về `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Xem trước người nhận của tin nhắn nhóm (số người đủ điều kiện, số người đã từ chối, số người không có số điện thoại) |
| GET | `/sent` | JWT | — | Tải tất cả bản ghi tin nhắn văn bản đã gửi của nhà thờ |
| GET | `/sent/:id/details` | JWT | — | Tải một tin nhắn văn bản đã gửi cùng nhật ký gửi của từng người nhận |
| POST | `/providers` | JWT | — | Lưu các nhà cung cấp nhắn tin văn bản (theo lô). Mã hóa thông tin xác thực API |
| POST | `/send` | JWT | — | Gửi SMS đến tất cả thành viên đủ điều kiện của một nhóm. Nội dung: `{ groupId, message }`. Các trường gộp (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) được thay thế theo từng người nhận |
| POST | `/sendPerson` | JWT | — | Gửi SMS đến một người. Nội dung: `{ personId, phoneNumber, message }`. Các trường gộp được thay thế, và nội dung đã thay thế là nội dung được ghi nhật ký |
| DELETE | `/providers/:id` | JWT | — | Xóa một nhà cung cấp nhắn tin văn bản |

### Ví dụ: Gửi tin nhắn văn bản cho nhóm

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Reminder: Service starts at 10 AM this Sunday!"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 42,
  "successCount": 40,
  "failCount": 2,
  "optedOutCount": 5,
  "noPhoneCount": 3
}
```

## Mẫu email

Đường dẫn gốc: `/messaging/emailTemplates`

Quản lý các mẫu email có thể tái sử dụng và gửi email theo mẫu đến các nhóm.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Tải tất cả mẫu email của nhà thờ |
| GET | `/:id` | JWT | — | Tải một mẫu email theo ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` hoặc `tasks.admin` | Trạng thái gửi email nhóm của nhà thờ: `{ approved, paused, remaining, requested }`. Hộp thoại Send Email của B1Admin và hành động **Send email** của quy trình dùng trạng thái này để cảnh báo khi email sẽ không được gửi đi |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Yêu cầu bộ phận hỗ trợ phê duyệt nhà thờ để gửi email nhóm (tối đa một lần mỗi nhà thờ mỗi tuần) |
| GET | `/preview/:groupId` | JWT | — | Xem trước việc gửi email cho một nhóm (số người nhận đủ điều kiện, thành viên không có email) |
| POST | `/` | JWT | — | Tạo hoặc cập nhật mẫu email (theo lô) |
| POST | `/send` | JWT | — | Gửi email theo mẫu đến tất cả thành viên của một nhóm. Nội dung: `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Xóa một mẫu email |

### Ví dụ: Gửi email đến nhóm

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "This Week's Update - {{churchName}}",
  "htmlContent": "<p>Hello {{firstName}},</p><p>Here's what's happening this week...</p>"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 45,
  "successCount": 44,
  "failCount": 1,
  "noEmailCount": 5
}
```

**Các trường gộp được hỗ trợ:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## IP bị chặn

Đường dẫn gốc: `/messaging/blockedips`

(cũ) Chặn IP cho trò chuyện phát trực tiếp. Ứng dụng khách B1App không còn gọi `POST /` nữa -- tính năng chặn IP đã bị gỡ bỏ trong đợt chuyển đổi sang phân phối thống nhất. Đường `/clear` vẫn được `StreamingServiceController` gọi giữa các máy chủ khi các dịch vụ phát trực tuyến được lưu.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (cũ) Lưu các IP bị chặn (theo lô). Hiện không có client đang hoạt động |
| POST | `/clear` | JWT | — | Xóa tất cả IP bị chặn của các dịch vụ cụ thể. Nội dung: `[{ serviceId, churchId }]` |

## Nhật ký gửi

Đường dẫn gốc: `/messaging/deliverylogs`

Theo dõi trạng thái gửi của các tin nhắn đã gửi (SMS, thông báo đẩy, email).

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Tải nhật ký gửi theo loại nội dung và ID |
| GET | `/person/:personId` | JWT | — | Tải nhật ký gửi của một người. Có thể thêm `?startDate=&endDate=` để lọc |
| GET | `/recent` | JWT | — | Tải các nhật ký gửi gần đây của nhà thờ. Có thể thêm `?limit=` (mặc định 100) |
| GET | `/:id` | JWT | — | Tải một nhật ký gửi theo ID |

## Trang liên quan

- [Kiến trúc thời gian thực](../../realtime.md) -- Giao thức WebSocket, đăng ký phòng, và khung phân phối thống nhất
- [Thông báo đẩy trên web](../../web-push.md) -- Đăng ký và gửi thông báo đẩy trên trình duyệt
- [Điểm cuối Thành viên](./membership.md) -- Người, nhóm, vai trò và danh tính cốt lõi
- [Điểm cuối Điểm danh](./attendance.md) -- Theo dõi buổi nhóm và lượt thăm
- [Xác thực & Quyền](./authentication.md) -- Luồng đăng nhập, JWT, OAuth, mô hình quyền
- [Cấu trúc mô-đun](../module-structure.md) -- Các mẫu tổ chức mã nguồn
