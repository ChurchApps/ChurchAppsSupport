---
title: "Điểm cuối Nhắn tin"
description: "Tài liệu tham khảo về các điểm cuối API nhắn tin của ChurchApps: cuộc trò chuyện, quy tắc truy cập ghi chú, nhắn tin SMS, mẫu email, thông báo và thiết bị."
---

# Điểm cuối Nhắn tin

<div class="article-intro">

Mô-đun Nhắn tin quản lý các cuộc trò chuyện thời gian thực, tin nhắn trò chuyện, thông báo đẩy, gửi SMS/email, kết nối WebSocket, tin nhắn riêng, đăng ký thiết bị và các nhà cung cấp nhắn tin. Mô-đun này cung cấp lớp giao tiếp được dùng xuyên suốt các ứng dụng ChurchApps, cho cả trò chuyện trong buổi phát trực tiếp lẫn thông báo không đồng bộ.

</div>

**Đường dẫn gốc:** `/messaging`

## Cuộc trò chuyện

Đường dẫn gốc: `/messaging/conversations`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Tải các cuộc trò chuyện theo danh sách ID cách nhau bằng dấu phẩy, kèm tin nhắn đầu và tin nhắn cuối |
| GET | `/messages/:contentType/:contentId` | JWT | — | Tải các cuộc trò chuyện của nội dung với tin nhắn được phân trang (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Lấy các cuộc trò chuyện dạng bài đăng thuộc nhóm của người dùng hiện tại |
| GET | `/posts/group/:groupId` | JWT | — | Lấy các cuộc trò chuyện dạng bài đăng của một nhóm cụ thể |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Các ghi chú mới nhất trên mọi bản ghi, dành cho trang Ghi chú của B1 Admin. `section` là `people`, `groups`, `events` hoặc `workflows` (nếu khác sẽ trả về 400); `limit` mặc định là 25 (tối đa 100); `before` là con trỏ từ trang trước. Mỗi ghi chú vẫn phải đáp ứng quy tắc của loại của nó (quyền Chỉnh sửa Người / ghi chú bảo mật, trưởng nhóm của nhóm, người xem sự kiện, người xem thẻ quy trình), nên người gọi chỉ thấy các ghi chú mà họ có thể mở. Nội dung ghi chú được cắt còn 300 ký tự |
| GET | `/current/:churchId/:contentType/:contentId` | Công khai | — | Lấy hoặc tạo cuộc trò chuyện hiện tại cho nội dung (tự động giải mã contentId) |
| GET | `/:churchId/:contentType/:contentId` | Công khai | — | Tải các cuộc trò chuyện theo loại nội dung và ID |
| GET | `/:churchId/:id` | Công khai | — | Tải một cuộc trò chuyện theo ID |
| POST | `/` | JWT | — | Tạo mới hoặc cập nhật cuộc trò chuyện (hàng loạt) |
| POST | `/start` | JWT | — | Bắt đầu một cuộc trò chuyện mới với một bình luận mở đầu |
| DELETE | `/:churchId/:id` | JWT | — | Xóa một cuộc trò chuyện |

### Kiểm soát truy cập ghi chú của người

Các cuộc trò chuyện có `contentType: "person"` (tab Ghi chú trên hồ sơ người) hoặc `contentType: "personConfidential"` (mục Ghi chú bảo mật) được kiểm soát trên mọi đường đọc và ghi, kể cả các đường dẫn công khai nêu trên, vốn sẽ trả về `401` đối với các loại nội dung này. `person` yêu cầu quyền **People / Edit** của MembershipApi; `personConfidential` yêu cầu quyền **People / View Confidential Notes**. Với các khóa API có phạm vi, `people:write` bao gồm cả hai hành động (người dùng của khóa vẫn phải có quyền vai trò tương ứng).

### Kiểm soát truy cập ghi chú nhóm và sự kiện {#group-and-event-notes-access-control}

Hai loại ghi chú khác cũng được kiểm soát theo cách tương tự, trên mọi đường đọc và ghi (kể cả các đường dẫn công khai nêu trên), và không bao giờ mở cho đăng bài ẩn danh:

- **`groupNote`** (`contentId` = ID nhóm) -- nguồn cấp **Ghi chú của trưởng nhóm** trên một nhóm. Chỉ các trưởng nhóm đó (`leaderGroupIds` trong JWT) mới được đọc hoặc đăng. Không có quyền nhân viên nào cấp quyền truy cập, kể cả `content.edit` và các quyền liên quan đến thành viên nhóm.
- **`eventNote`** (`contentId` = ID sự kiện) -- các ghi chú trên một sự kiện lịch. Nhân viên có `content.edit` hoặc **Calendars / Admin** luôn có thể đọc và đăng. Ngoài ra, quyền truy cập theo `notesViewRole` (đọc) và `notesPostRole` (đăng) của sự kiện: `staff` (mặc định, dùng khi trường này là `null`) không cho phép ai khác; `leaders` cho phép trưởng nhóm của nhóm sự kiện; và `members` cho phép thành viên và trưởng nhóm của nhóm sự kiện. Sự kiện không có `groupId` chỉ dành cho nhân viên.

### Kiểm soát truy cập ghi chú thẻ quy trình

Các cuộc trò chuyện có `contentType: "workflowCard"` (ghi chú trên một thẻ quy trình, trong đó `contentId` là ID nhiệm vụ của thẻ) chỉ có thể được đọc và ghi bởi người có quyền mở thẻ đó: người dùng có quyền **Tasks / View** của DoingApi, hoặc người hoặc nhóm được gán cho thẻ, người tạo thẻ, hoặc người mà thẻ liên quan đến. Những người khác sẽ nhận `401` trên mọi đường đọc, kể cả các đường dẫn công khai nêu trên. Cuộc trò chuyện của thẻ được gắn thông qua chính thẻ đó bằng `POST /doing/tasks/:id/conversation` (nội dung `{ "conversationId": "..." }`; cuộc trò chuyện được gắn đầu tiên sẽ được giữ), và người chỉnh sửa thẻ cùng người được giao thẻ có thể gọi endpoint này.

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
| GET | `/catchup/:churchId/:conversationId` | Công khai | — | Tải tất cả tin nhắn của một cuộc trò chuyện (catchup công khai cho trò chuyện trực tiếp) |
| GET | `/:churchId/:id` | Công khai | — | Tải một tin nhắn theo ID |
| POST | `/` | JWT | — | Lưu tin nhắn (hàng loạt). Gửi cập nhật thời gian thực và kích hoạt thông báo. Để sửa một tin nhắn hiện có, bạn phải là tác giả của nó hoặc có `content.edit`; tác giả đã lưu không bao giờ có thể được thay đổi |
| POST | `/send` | Công khai | — | Gửi tin nhắn (hàng loạt, công khai). Gửi cập nhật thời gian thực qua WebSocket và kích hoạt thông báo |
| POST | `/setCallout` | JWT | — | (cũ) Phát một tin nhắn nổi bật theo thời gian thực. Hiện không có client đang hoạt động; trò chuyện trong buổi phát trực tiếp không còn hiển thị tin nhắn nổi bật |
| DELETE | `/:churchId/:id` | JWT | — | Xóa một tin nhắn và phát thông báo xóa theo thời gian thực. Xem [Kiểm duyệt tin nhắn](#message-moderation) |

### Kiểm duyệt tin nhắn

Được phép xóa tin nhắn đối với:

- tác giả của tin nhắn;
- nhân viên có `content.edit` (trong toàn bộ nhà thờ);
- **trưởng nhóm**, đối với các cuộc trò chuyện có `contentType` là `group` hoặc `groupAnnouncement` mà `contentId` là một nhóm họ lãnh đạo (`leaderGroupIds` trong JWT).

Các cuộc trò chuyện ghi chú của người (`person` / `personConfidential`) không bao giờ do trưởng nhóm kiểm duyệt; thay vào đó chúng sử dụng quyền ghi chú (`people.edit`, `people.viewConfidentialNotes`).

Trưởng nhóm chỉ được xóa, không được sửa: việc chỉnh sửa tin nhắn của thành viên khác vẫn chỉ giới hạn cho tác giả và nhân viên có `content.edit`.

### Ví dụ: Gửi tin nhắn

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
| GET | `/` | JWT | — | Tải tất cả tin nhắn riêng của người dùng hiện tại (bao gồm tin nhắn cuối cùng của mỗi cuộc trò chuyện, đánh dấu tất cả là đã đọc) |
| GET | `/existing/:personId` | JWT | — | Tìm cuộc trò chuyện riêng hiện có với một người cụ thể |
| GET | `/:id` | JWT | — | Tải một tin nhắn riêng theo ID (xóa thông báo nếu tin nhắn gửi đến người dùng hiện tại) |
| POST | `/` | JWT | — | Gửi tin nhắn riêng (hàng loạt). Kích hoạt thông báo đẩy đến người nhận |

## Thông báo

Đường dẫn gốc: `/messaging/notifications`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Lấy số thông báo chưa đọc của người dùng hiện tại |
| GET | `/my` | JWT | — | Tải tất cả thông báo của người dùng hiện tại (đánh dấu tất cả là đã đọc) |
| GET | `/tmpEmail` | Công khai | — | Kích hoạt bản tóm tắt thông báo email hằng ngày (điểm cuối gỡ lỗi/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Tải thông báo của một người cụ thể |
| GET | `/:churchId/:id` | JWT | — | Tải một thông báo theo ID |
| POST | `/` | JWT | — | Tạo mới hoặc cập nhật thông báo (hàng loạt) |
| POST | `/create` | JWT | — | Tạo thông báo cho nhiều người. Nội dung: `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Đánh dấu tất cả thông báo của một người là đã đọc |
| POST | `/sendTest` | JWT | — | Gửi một thông báo đẩy thử nghiệm. Nội dung: `{ personId, title }` |
| POST | `/ping` | Công khai | — | Tạo thông báo từ một tác nhân kích hoạt bên ngoài. Nội dung: `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
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
| GET | `/categories` | JWT | — | Liệt kê các danh mục thông báo cùng các kênh mặc định và kênh được phép |
| GET | `/my` | JWT | — | Tải tùy chọn thông báo của người dùng hiện tại (tự động tạo mặc định nếu chưa có) |
| POST | `/` | JWT | — | Lưu tùy chọn của người dùng hiện tại. Nội dung: bất kỳ trường nào trong `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, cùng với `overrides: [{ categoryKey, channel, optedIn }]` tùy chọn (channel có thể là `push`, `email`, `in_app` hoặc `sms`; các danh mục bị khóa sẽ bị bỏ qua). `allowSms` là sự đồng ý nhận nhắc nhở qua tin nhắn của thành viên. Vẫn chấp nhận nội dung dạng mảng các dòng kiểu cũ |

## Kết nối

Đường dẫn gốc: `/messaging/connections`

Quản lý các kết nối WebSocket/thời gian thực cho trò chuyện, cuộc trò chuyện nhóm, tin nhắn riêng và phát trực tiếp. Xem [Kiến trúc thời gian thực](../../realtime.md) để biết giao thức đầu cuối.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Công khai | — | Tải tất cả kết nối của một cuộc trò chuyện |
| POST | `/` | Công khai | — | Đăng ký kết nối (hàng loạt). Kích hoạt phát thông tin điểm danh trên cuộc trò chuyện. Các mục trong nội dung: `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Công khai | — | Cập nhật tên hiển thị cho một kết nối theo socket ID. Nội dung: `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Công khai | — | Gỡ một kết nối khỏi cuộc trò chuyện. Kích hoạt phát thông tin điểm danh |
| POST | `/tmpSendAlert` | Công khai | — | Gửi cảnh báo thông báo đến các kết nối của một người. Nội dung: `{ churchId, personId }` |

## Thiết bị

Đường dẫn gốc: `/messaging/devices`

Quản lý đăng ký thiết bị cho thông báo đẩy và ghép nối nội dung (ví dụ: ứng dụng Lessons trên màn hình TV).

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Đăng ký hoặc cập nhật thiết bị (đăng ký thông báo đẩy trên di động). Khớp theo token FCM hoặc ID thiết bị |
| POST | `/enrollAnon` | Công khai | — | Đăng ký một thiết bị ẩn danh và tạo mã ghép nối gồm 4 ký tự |
| POST | `/` | Công khai | — | Lưu thiết bị (hàng loạt) |
| GET | `/pair/:pairingCode` | JWT | — | Ghép nối một thiết bị bằng mã ghép nối. Có thể thêm `?contentType=&contentId=` để gán nội dung |
| GET | `/status/:deviceId` | Công khai | — | Kiểm tra trạng thái ghép nối của một thiết bị |
| GET | `/:churchId` | JWT | — | Tải tất cả thiết bị của một nhà thờ |
| GET | `/:churchId/person/:personId` | JWT | — | Tải tất cả thiết bị của một người |
| GET | `/:churchId/:id` | JWT | — | Tải một thiết bị theo ID |
| DELETE | `/:churchId/:id` | JWT | — | Xóa một thiết bị |

### Ví dụ: Đăng ký một thiết bị

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
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
| GET | `/deviceId/:deviceId` | JWT | — | Tải các nội dung được gán cho một thiết bị |
| POST | `/` | JWT | — | Lưu các phân công nội dung thiết bị (hàng loạt) |
| DELETE | `/:id` | JWT | — | Xóa một phân công nội dung thiết bị |

## Nhắn tin SMS

Đường dẫn gốc: `/messaging/texting`

Quản lý các nhà cung cấp SMS, nhắn tin nhóm và theo dõi trạng thái gửi.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Tải các nhà cung cấp nhắn tin của nhà thờ (thông tin xác thực được che) |
| GET | `/status` | JWT | — | `{ enabled }` -- nhà thờ có nhà cung cấp nhắn tin đang bật hay không. Bất kỳ người dùng nhà thờ nào đã đăng nhập đều có thể gọi; dùng để chỉ hiển thị tùy chọn **Nhắn tin** khi có thể gửi tin |
| GET | `/inboundUrl` | JWT | `texting.send` hoặc `settings.edit` | `{ url }` -- URL webhook nhận tin (STOP) của nhà thờ để dán vào nhà cung cấp |
| POST | `/inbound/:churchId/:token` | Công khai | — | Webhook nhận tin nhắn từ nhà cung cấp. `token` là HMAC của ID nhà thờ. Nếu phản hồi chính xác là một từ dừng (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), hệ thống sẽ đánh dấu mọi người khớp là `optedOut` và tắt `allowSms` của họ. Trả về `{ optedOut: <count> }`; các phản hồi khác trả về `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Xem trước người nhận của tin nhắn nhóm (số người đủ điều kiện, số người đã từ chối, số người không có số điện thoại) |
| GET | `/sent` | JWT | — | Tải tất cả bản ghi tin nhắn SMS đã gửi của nhà thờ |
| GET | `/sent/:id/details` | JWT | — | Tải một tin nhắn SMS đã gửi kèm nhật ký gửi cho từng người nhận |
| POST | `/providers` | JWT | — | Lưu các nhà cung cấp nhắn tin (hàng loạt). Mã hóa thông tin xác thực API |
| POST | `/send` | JWT | — | Gửi SMS đến tất cả thành viên đủ điều kiện của một nhóm. Nội dung: `{ groupId, message }`. Các trường ghép (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) được thay thế cho từng người nhận |
| POST | `/sendPerson` | JWT | — | Gửi SMS đến một người. Nội dung: `{ personId, phoneNumber, message }`. Các trường ghép được thay thế, và nội dung sau khi thay thế là nội dung được ghi nhật ký |
| DELETE | `/providers/:id` | JWT | — | Xóa một nhà cung cấp nhắn tin |

### Ví dụ: Gửi tin nhắn SMS nhóm

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

Quản lý các mẫu email có thể tái sử dụng và gửi email theo mẫu cho nhóm.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Tải tất cả mẫu email của nhà thờ |
| GET | `/:id` | JWT | — | Tải một mẫu email theo ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` hoặc `tasks.admin` | Trạng thái email nhóm của nhà thờ: `{ approved, paused, remaining, requested }`. Hộp thoại Gửi email của B1Admin và hành động **Gửi email** trong quy trình sử dụng trạng thái này để cảnh báo khi email sẽ không được gửi |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Yêu cầu bộ phận hỗ trợ phê duyệt nhà thờ để gửi email nhóm (tối đa một lần mỗi nhà thờ mỗi tuần) |
| GET | `/preview/:groupId` | JWT | — | Xem trước việc gửi email cho một nhóm (số người nhận đủ điều kiện, thành viên không có email) |
| POST | `/` | JWT | — | Tạo mới hoặc cập nhật mẫu email (hàng loạt) |
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

**Các trường ghép được hỗ trợ:** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## IP bị chặn

Đường dẫn gốc: `/messaging/blockedips`

(cũ) Chặn IP cho trò chuyện trong buổi phát trực tiếp. Ứng dụng B1App không còn gọi `POST /` nữa -- tính năng chặn IP đã bị loại bỏ trong quá trình chuyển đổi sang phân phối thống nhất. Route `/clear` vẫn được `StreamingServiceController` gọi từ máy chủ đến máy chủ khi các dịch vụ phát trực tiếp được lưu.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (cũ) Lưu các IP bị chặn (hàng loạt). Hiện không có client đang hoạt động |
| POST | `/clear` | JWT | — | Xóa tất cả IP bị chặn của các dịch vụ cụ thể. Nội dung: `[{ serviceId, churchId }]` |

## Nhật ký gửi

Đường dẫn gốc: `/messaging/deliverylogs`

Theo dõi trạng thái gửi của các tin nhắn đã gửi (SMS, thông báo đẩy, email).

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Tải nhật ký gửi theo loại nội dung và ID |
| GET | `/person/:personId` | JWT | — | Tải nhật ký gửi của một người. Có thể thêm `?startDate=&endDate=` để lọc |
| GET | `/recent` | JWT | — | Tải nhật ký gửi gần đây của nhà thờ. Có thể thêm `?limit=` (mặc định 100) |
| GET | `/:id` | JWT | — | Tải một nhật ký gửi theo ID |

## Trang liên quan

- [Kiến trúc thời gian thực](../../realtime.md) -- giao thức WebSocket, đăng ký phòng và khung phân phối thống nhất
- [Thông báo đẩy trên web](../../web-push.md) -- đăng ký và gửi thông báo đẩy trên trình duyệt
- [Điểm cuối Thành viên](./membership.md) -- người, nhóm, vai trò và danh tính cốt lõi
- [Điểm cuối Điểm danh](./attendance.md) -- theo dõi buổi nhóm và lượt đến
- [Xác thực và Quyền](./authentication.md) -- luồng đăng nhập, JWT, OAuth, mô hình quyền
- [Cấu trúc mô-đun](../module-structure.md) -- các mẫu tổ chức mã nguồn
