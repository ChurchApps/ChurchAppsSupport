---
title: "Kiến trúc thông báo & nhắc nhở"
description: "Cách API B1 Admin định tuyến thông báo, nhắc nhở theo lịch, giới hạn email nhà thờ và từ chối nhận tin nhắn qua một luồng gửi và cổng ưu tiên duy nhất."
---

# Kiến trúc thông báo & nhắc nhở

<div class="article-intro">

Mọi tin nhắn mà thành viên hội thánh nhìn thấy bên ngoài trang họ đang xem (số huy hiệu, thông báo đẩy, email tóm tắt) đều đi qua một trong hai cửa của MessagingApi. Trang này mô tả phễu xử lý đó, bộ máy nhắc nhở đưa dữ liệu vào phễu theo lịch, và mô hình tùy chọn quyết định thông báo nào thực sự đến tay một người.

</div>

## Tổng quan — hai cửa

```
scheduled anything ──▶ ReminderEngine (definitions → occurrences → scan) ─┐
chat / requests / workflow / bulk sends ──────────────────────────────────┼─▶ createNotifications()
                                                                          │    in_app gate → socket → push → email
     (reminder channels include sms) ──▶ ReminderEngine.sendSms() ──▶ sms gate → sendPersonText() via church provider
provider STOP reply ──▶ POST /messaging/texting/inbound/:churchId/:token ──▶ SmsOptOutHelper.optOut()
account/legal mail ──▶ TransactionalEmailHelper.sendTransactional()  [allowlisted, lint-enforced]
```

1. **Mọi thứ thông báo cho một người** đều đi qua `NotificationHelper.createNotifications()` trong module messaging. Hàm này lưu một dòng vào bảng `notifications` và leo thang từ socket → push → email, đồng thời đánh giá `PreferenceGateHelper` cho từng kênh, kể cả `in_app` ở mức 0.
2. **Mọi thứ được lên lịch** là một `reminderDefinition` (cấp thực thể hoặc cấp phạm vi), được mở rộng thành `reminderOccurrences` và được gửi bởi `ReminderEngine.scan()` theo bộ đếm thời gian định kỳ. Có một bộ mở rộng, một bộ phân phối và một sổ ghi gửi duy nhất (`reminderSentLog`).
3. **Email trực tiếp** chỉ tồn tại phía sau `TransactionalEmailHelper.sendTransactional()`. Một quy tắc ESLint thực thi điều này ngay lúc biên dịch, xem bên dưới.

:::tip Cửa email được kiểm soát bởi lint, không chỉ là quy ước
`Api/tools/eslint-rules/email-door.cjs` định nghĩa `no-direct-email-helper`: mọi lệnh gọi `EmailHelper.sendTemplatedEmail()` hoặc `EmailHelper.sendEmail()` bên ngoài `NotificationHelper.ts` hoặc `TransactionalEmailHelper.ts` sẽ làm lint thất bại. Nếu bạn cần gửi email, hãy đi qua phễu (`createNotifications` với `emailImmediate`) hoặc qua `TransactionalEmailHelper.sendTransactional()` — không có cách thứ ba nào vượt qua CI.
:::

## Phễu thông báo

`NotificationHelper.createNotifications()` là điểm vào duy nhất cho mọi thứ không được lên lịch và không mang tính giao dịch:

```typescript
createNotifications(
  peopleIds: string[],
  churchId: string,
  contentType: string,
  contentId: string,
  message: string,
  link?: string,
  triggeredByPersonId?: string,
  options?: {
    deliveryStartLevel?: number;      // 0 socket (default), 1 push, 2 email-only
    category?: string;                // preference axis; derived from contentType if omitted
    emailByPerson?: Record<string, { subject: string; html: string }>;
    emailImmediate?: boolean;         // send email now instead of waiting for the digest
  }
)
```

Với mỗi người nhận, hàm lưu một dòng trong `notifications` và gọi `attemptDeliveryWithEscalation`, hàm này đi qua chuỗi kênh bên dưới. Một dòng chưa đọc có cùng `(contentType, contentId)` sẽ ngăn việc tạo lại thông báo. Cơ chế chống trùng này bị bỏ qua đối với các lần gửi `emailImmediate` (mốc nhắc nhở, "email tất cả" từ nhân viên, các bước workflow tự quản lý việc chống trùng) và đối với tin nhắn trực tiếp, vốn luôn gửi ping qua socket.

`shared/helpers/NotificationService.ts` có cùng chữ ký (`NotificationServiceOptions`) cho các bên gọi bên ngoài module messaging, và được đăng ký với module messaging khi khởi động.

## Chuỗi leo thang kênh

Việc gửi bắt đầu từ một mức (mặc định là 0, hoặc cao hơn đối với nhắc nhở hoặc các lần gửi tường minh) và chỉ chuyển sang kênh tiếp theo nếu kênh trước đó không thành công. Mỗi mức đều được `PreferenceGateHelper` kiểm soát trước khi thử gửi.

| Mức | Kênh | Hành vi |
|-------|---------|----------|
| 0 | **in_app / socket** | Cổng `in_app` được kiểm tra trước. Nếu bị chặn (đã tắt tiếng), dòng được lưu với `isNew=false` và việc gửi dừng hẳn — không ping socket, không hiện huy hiệu, không leo thang thêm. Nếu không, server tìm các kết nối socket đang mở trong phòng `alerts` của người đó và đẩy một khung `notification` (hoặc `privateMessage`). Với thông báo thông thường, gửi qua socket thành công sẽ dừng chuỗi tại đây — bộ đếm 30 phút sẽ kiểm tra lại các mục chưa đọc và leo thang sau. Tin nhắn trực tiếp không bao giờ dừng ở socket: một PWA đã cài đặt có thể giữ socket cảnh báo mở ở nền, nếu không sẽ chặn thông báo đẩy ở mức hệ điều hành. |
| 1 | **push** | Được kiểm soát bởi `allowPush` / việc từ chối theo danh mục / giờ yên tĩnh. Gửi tới cả token push của Expo lẫn đăng ký Web Push có trong các dòng `devices` của người đó, loại trùng theo endpoint và xóa các token cũ trong quá trình. |
| 2 | **email** | Được kiểm soát bởi `emailFrequency` và việc từ chối theo danh mục. Các lần gửi ngay (`emailImmediate`) được render ngay lập tức và ghi một dòng `deliveryLogs`; nếu không, thông báo được giữ ở trạng thái chờ cho bản tóm tắt hàng loạt được mô tả bên dưới. |
| — | **sms** | Không phải một mức trong chuỗi leo thang. Nguồn SMS được kiểm soát duy nhất là bộ máy nhắc nhở: khi `channels` của một định nghĩa bao gồm `sms`, `ReminderEngine.sendSms()` gửi tin nhắn cho từng người nhận **ngoài** thông báo push/email (xem [Nhắc nhở qua tin nhắn văn bản](#text-reminders)). Nhắn tin hàng loạt (`TextingController` / `@churchapps/texting`), hành động **Text Volunteers** trong tổng quan phục vụ (`MatrixTextHelper` → `MessagingModuleGateway.sendPersonText`), và hành động bước workflow **Send Text** (`StepActionHelper.sendText` → `sendPersonText`) đều gửi tin nhắn trực tiếp qua nhà cung cấp của hội thánh, nên tùy chọn thông báo và giờ yên tĩnh không áp dụng cho chúng — chỉ cờ `optedOut` của người đó được tôn trọng. |

Các thông báo chưa đọc còn ở mức socket hoặc push sẽ được leo thang bởi bộ đếm 30 phút (`NotificationHelper.escalateDelivery`). Email hàng loạt được gửi bởi `NotificationHelper.sendEmailNotifications(frequency)`, được điều khiển bởi tùy chọn `emailFrequency` của mỗi người: `individual` chạy theo bộ đếm 30 phút, `daily` chạy theo bộ đếm hàng đêm. (`weekly` là một giá trị tùy chọn hợp lệ nhưng hiện chưa có lượt chạy hàng loạt riêng.)

## Bộ máy nhắc nhở

Các nhắc nhở được lên lịch — nhắc sự kiện, hạn công việc, phân công phục vụ/kế hoạch — đều đi qua một bộ máy tổng quát duy nhất thay vì logic cron riêng cho từng tính năng.

```
reminderDefinitions ──expand──▶ reminderOccurrences ──scan (30 min)──▶ createNotifications()
     │                                  │                                    │
     ▼                                  ▼                                    ▼
 entity- or scope-level          one row per (definition,              deliveryStartLevel: 1
 offsets/channels/message        entity, occurrence, offset)           + reminderSentLog ledger
```

**Định nghĩa** (`reminderDefinitions`) hoặc thuộc cấp thực thể (`entityId` được đặt — một sự kiện, công việc hoặc kế hoạch cụ thể) hoặc thuộc cấp phạm vi (`entityId` là null, `scopeId` được đặt — ví dụ mọi kế hoạch trong một loại kế hoạch phục vụ). Một định nghĩa mang theo một chuỗi CSV các độ lệch tính bằng phút (`offsets`, ví dụ `"1440,60"` cho một ngày và một giờ trước), một thời điểm gửi theo giờ địa phương (`sendLocalTime`), một chuỗi CSV các kênh (`channels` — trong đó `email` kích hoạt một email phong phú gửi ngay tại thời điểm gửi), một `recipientMode`, và một `message` tùy chỉnh không bắt buộc.

**Mở rộng** tạo các dòng kích hoạt cho khoảng thời gian phía trước (một cửa sổ nhiều ngày cuốn chiếu). Việc này chạy theo bộ đếm hàng đêm, và đồng bộ mỗi khi một định nghĩa được lưu, để một nhắc nhở cho sự kiện vào phút chót vẫn được kích hoạt. Định nghĩa cấp phạm vi được phân tán qua `loadScopeEntities` của bộ điều hợp, tạo ra một tập hợp lần xuất hiện cho mỗi thực thể cụ thể; các lần xuất hiện cấp thực thể dùng khóa `definitionId:occurrenceISO:offset`, còn các lần xuất hiện theo phạm vi được đặt không gian tên theo id thực thể để không bao giờ trùng nhau. Khi upsert một lần xuất hiện, hệ thống **khôi phục** một dòng đã bị hủy trước đó — hủy rồi mở rộng lại là cách chuẩn để đồng bộ lại một nhắc nhở sau khi thực thể bên dưới thay đổi; các dòng đã `sent`, `failed` hoặc `processing` sẽ không bị đụng đến.

**Phân phối** (`ReminderEngine.scan()`) chạy theo bộ đếm 30 phút. Hàm nhận các lần xuất hiện đến hạn (một lease ngăn việc xử lý trùng), tải người nhận qua bộ điều hợp của thực thể, lọc bỏ những ai đã được ghi trong `reminderSentLog` cho lần xuất hiện đó, và gọi `createNotifications` với `deliveryStartLevel: 1` (bỏ qua thẳng đến push) cùng `emailImmediate`/`emailByPerson` khi các kênh của định nghĩa bao gồm email.

### Nhắc nhở qua tin nhắn văn bản

Khi `channels` của một định nghĩa bao gồm `sms`, `scan()` gọi `ReminderEngine.sendSms()` sau khi các thông báo push/email được tạo, cho cùng những người nhận mới. Việc nhắn tin là tùy chọn theo từng thành viên:

- Mỗi người nhận đi qua `PreferenceGateHelper.evaluate(..., "sms", ...)`, nên `allowSms` phải được bật (mặc định là tắt và được đặt từ công tắc **Text messages** trong B1App) và kênh `sms` của danh mục không được bị tắt ghi đè. `event_reminders`, `serving_schedule` và `tasks` đều liệt kê `sms` trong cả `defaultChannels` lẫn `allowedChannels`.
- Những người không có `mobilePhone` hoặc có đánh dấu `optedOut` sẽ bị chặn. Nếu hội thánh không có nhà cung cấp nhắn tin, phần còn lại của đợt gửi bị chặn với lý do `no_provider`.
- Nội dung tin nhắn được tạo bởi `ReminderEngine.smsBody()`: `"<Church name>: <message> Reply STOP to opt out."`, được cắt gọn trong một đoạn 160 ký tự.
- Mỗi người nhận có một dòng `reminderSentLog` riêng với `channel: "sms"` và trạng thái `sent` / `suppressed` / `failed`, được khóa tách biệt với dòng push/email, nên một tin nhắn thất bại sẽ không bao giờ gửi lại push hoặc email.

Trình chỉnh sửa chỉ hiển thị **Text** khi `GET /messaging/texting/status` trả về `{ enabled: true }` (nhà cung cấp nhắn tin đầu tiên của hội thánh đã được bật).

**Hủy đăng ký bằng STOP.** `POST /messaging/texting/inbound/:churchId/:token` là một webhook ẩn danh mà hội thánh dán vào nhà cung cấp của mình (B1Admin hiển thị URL từ `GET /messaging/texting/inboundUrl` trong phần cài đặt nhắn tin). Token là một HMAC của id hội thánh (`SmsOptOutHelper.token`). `SmsOptOutHelper.parse` chấp nhận các trường dạng form kiểu Twilio và JSON kiểu Clearstream/TextInChurch; nếu phản hồi chính xác là một từ dừng của nhà mạng (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`), thì mọi người chưa bị xóa trong hội thánh có số điện thoại di động khớp sẽ được đặt `people.optedOut = true` và `allowSms = false`. Các phản hồi khác được ghi nhận và bỏ qua.

Một event bus nội bộ phản ứng với các thay đổi thực thể mà không cần chờ mở rộng hàng đêm: các sự kiện nội dung (qua bộ phân phối webhook) và các sự kiện cập nhật kế hoạch/công việc kích hoạt mở rộng lại hoặc hủy ngay lập tức cho thực thể bị ảnh hưởng, và một cập nhật kế hoạch cũng mở rộng lại mọi định nghĩa cấp phạm vi gắn với loại kế hoạch đó.

### Bộ điều hợp

Bộ máy không phụ thuộc vào loại thực thể; mỗi loại thực thể được hỗ trợ kết nối qua một bộ điều hợp (`helpers/adapters/`):

| Loại thực thể | Bộ điều hợp | Ghi chú |
|-------------|---------|-------|
| `event` | `EventReminderAdapter` | Người nhận được giới hạn trong những người đăng ký hoặc thành viên nhóm, tùy thuộc vào sự kiện và `recipientMode`. |
| `plan` | `PlanReminderAdapter` | Người nhận là các phân công Accepted và Unconfirmed trên các kế hoạch đã xuất bản (không phải bản nháp). Các phân công Unconfirmed được phát hành qua một quy trình xác nhận phục vụ bị loại trừ cho đến khi được chấp nhận (xem bên dưới). `buildEmails` gọi `DoingModuleGateway.buildPlanReminderEmails`, hàm này render các vị trí, ghi chú và một tin nhắn tùy chỉnh qua `doing/helpers/PlanReminderEmailHelper`, bao gồm các nút Accept/Decline được ký bởi `ReminderTokenHelper` và gửi đến một endpoint phản hồi phân công công khai. |
| `task` | `TaskReminderAdapter` | Người nhận là (những) người được giao công việc. |

### Điểm cuối (endpoints)

| Phương thức | Đường dẫn | Mục đích |
|--------|------|---------|
| `GET` / `POST` | `/messaging/reminders/:entityType/:entityId` | Tải hoặc lưu định nghĩa nhắc nhở cho một thực thể. |
| `GET` / `POST` | `/messaging/reminders/scope/:entityType/:scopeId` | Tải hoặc lưu định nghĩa nhắc nhở cấp phạm vi (kế thừa). |
| `DELETE` | `/messaging/reminders/:defId` | Xóa một định nghĩa và hủy các lần xuất hiện đang chờ. |
| `GET` | `/messaging/reminders/event/:eventId/preview` | Xem trước số người nhận và thời điểm kích hoạt tiếp theo của một nhắc nhở sự kiện trước khi lưu. |
| `GET` | `/messaging/reminders/log` | Lịch sử các lần xuất hiện nhắc nhở gần đây của một hội thánh. |
| `POST` | `/messaging/reminders/mute` | Tắt tiếng nhắc nhở cho một thực thể cụ thể. |

Việc lưu một định nghĩa kích hoạt một lần mở rộng lại đồng bộ cho thực thể hoặc phạm vi đó, nên người biên tập luôn thấy mục "next fires" được cập nhật mà không cần chờ tác vụ hàng đêm.

## Tin nhắn trực tiếp

Tin nhắn trực tiếp đi theo cùng phễu với mọi thứ khác thay vì một đường leo thang riêng. Mỗi cuộc trò chuyện chưa đọc có một **dòng bóng** (shadow row) trong `notifications` (`contentType='privateMessage'`, `contentId` = id của tin nhắn riêng tư, `category='direct_messages'`), dòng này sở hữu toàn bộ trạng thái gửi — leo thang socket/push/email, theo dõi đã đọc, mọi thứ. Bảng `privateMessages` vẫn giữ nội dung tin nhắn và cột `notifyPersonId`, là nguồn của huy hiệu chưa đọc và sẽ được xóa khi người nhận đọc cuộc trò chuyện.

Các dòng bóng không hiển thị trên chuông thông báo: chúng bị loại khỏi truy vấn đếm chưa đọc, truy vấn danh sách thông báo, và các truy vấn đánh dấu đã đọc/xóa, tất cả đều lọc `contentType <> 'privateMessage'`. Mọi ping tin nhắn trực tiếp đều đi qua socket bất kể trạng thái chưa đọc (ngữ nghĩa chat trực tiếp — không chống trùng), và tin nhắn trực tiếp không bao giờ dừng ở việc gửi qua socket như các thông báo thông thường, vì một PWA chạy nền có thể giữ socket mở nhưng vẫn cần thông báo đẩy ở mức hệ điều hành. Nếu một người tắt thông báo tin nhắn trực tiếp, dòng bóng sẽ bị đưa sang trạng thái tạm dừng (`isNew=false`, `notifyPersonId` bị xóa) — vẫn hiển thị trong chính cuộc trò chuyện, nhưng không có huy hiệu hay cảnh báo.

## Tùy chọn & cơ chế chặn

Mọi lần gửi đều đi qua `PreferenceGateHelper.evaluate()`, một hàm thuần túy (mọi trạng thái được truyền vào, không có truy vấn CSDL trên đường nóng) trả về `allow`, `suppress` hoặc `defer`. Các lớp được chạy theo thứ tự, và lớp đầu tiên đưa ra quyết định sẽ thắng:

1. **Danh mục bị khóa** — một số danh mục là bắt buộc (cấp 0) và bỏ qua mọi lớp khác.
2. **Tắt tiếng toàn cục / ngắt kênh** — `masterMute`, `allowPush`, `allowSms` (mặc định tắt — thành viên phải chủ động bật) hoặc `emailFrequency='never'` sẽ chặn hoàn toàn.
3. **Giờ yên tĩnh** — chỉ áp dụng cho push và SMS (email được xem là không gây phiền). Nếu giờ hiện tại theo múi giờ của người đó nằm trong khoảng yên tĩnh, một danh mục mang tính giao dịch vẫn được gửi; một danh mục không mang tính giao dịch sẽ bị hoãn đến cuối khoảng yên tĩnh, được tính là một thời điểm UTC đúng với giờ mùa hè qua `TimezoneHelper.wallClockToUtc`.
4. **Ghi đè tùy chọn theo danh mục** — việc từ chối tường minh cho một cặp danh mục × kênh; không có mục nào nghĩa là dùng mặc định của danh mục.
5. **Tắt tiếng theo thực thể** — một mục tắt tiếng được ghi cho một thực thể cụ thể (ví dụ một sự kiện, một kế hoạch) sẽ hạn chế nhiều hơn cài đặt cấp danh mục, nhưng chỉ áp dụng khi bên gọi cung cấp kèm theo một id/loại thực thể cùng với thông báo.

Các bảng liên quan: `notificationPreferences` (toàn cục — `masterMute`, `emailFrequency` có giá trị `individual|daily|weekly|never`, `allowPush`, khoảng giờ yên tĩnh cùng múi giờ, `allowSms`), `notificationPreferenceOverrides` (theo danh mục × kênh), và `notificationEntityMutes` (theo thực thể).

Cơ chế chặn này được áp dụng cho in-app (mức 0), push (mức 1) và email (mức 2) bên trong phễu — bao gồm cả email nhắc nhở và email tóm tắt được gửi ngay — và cho tin nhắn nhắc nhở trong `ReminderEngine.sendSms()`. Email giao dịch (mã xác thực, đặt lại mật khẩu, lời mời, biên lai quyên góp) bỏ qua cơ chế này theo thiết kế; đó chính là lý do tồn tại của cửa thứ hai.

### Quy trình xác nhận phục vụ

Một kế hoạch có thể chọn một quy trình `workflowType = "assignmentConfirmation"` (`plans.confirmationWorkflowId`). Khi Publish/Notify được thực hiện, hệ thống gọi `POST /doing/plans/:id/issueRequests` thay vì thông báo theo từng phân công: mỗi phân công Unconfirmed mới nhận `notified` + `confirmationWorkflowId` và một thẻ workflow (`tasks.assignmentId`, `followupKey` duy nhất). Thẻ này gửi một cảnh báo chỉ trong ứng dụng (`appOnly: true` — không leo thang sang push/email), sau đó chạy các hành động `sendAssignmentRequest` của workflow, các hành động này đi qua `MessagingModuleGateway.sendServingWorkflowMessage`: email qua `NotificationHelper.sendWorkflowEmail` (cơ chế chặn tùy chọn + `ChurchEmailLimiter`, được đo lường như `workflowEmail`), SMS qua `sendPersonText` chỉ khi có `allowSms` và qua cổng danh mục `serving_schedule`. Accept/Decline (`assignment.updated` trên event bus) đóng thẻ; bộ đếm 30 phút (`AssignmentWorkflowHelper.processPending`) sửa các lần bắt đầu và sự kiện bị bỏ sót, đồng thời biến một yêu cầu chưa được trả lời đến hạn theo dõi thành một công việc xem xét cho người lãnh đạo. Vòng đời đầy đủ: `Api/docs/assignment-confirmation-workflows.md`.

## Giới hạn email do hội thánh soạn

Email có nội dung do hội thánh viết được gửi từ danh tính SES chung của ChurchApps, nên được đo lường theo từng hội thánh bởi `Api/src/shared/helpers/ChurchEmailLimiter.ts`. Bốn đường đi gọi đến hàm này: gửi theo nhóm/mẫu (`EmailTemplateController`, loại nội dung `email`), email theo dõi biểu mẫu (`FormSubmissionController`, `formFollowUp`), hành động workflow **Send email** (`NotificationHelper` với `churchAuthored`, `workflowEmail`), và email yêu cầu xác nhận phục vụ (`NotificationHelper.sendWorkflowEmail`, `workflowEmail`). Email hệ thống (mã xác thực, biên lai, nhắc nhở) và lời mời vai trò và nhóm (`UserController.sendInviteEmail`, một mẫu cố định) không bị đo lường.

- **Cổng phê duyệt.** Một hội thánh không gửi được gì cho đến khi quản trị viên máy chủ đặt `churches.emailApprovedDate` (`POST /membership/churches/:id/emailApproval`, Server Admin → Churches → chip **Group Email**). Các hội thánh đã lưu trữ luôn bị chặn. Hộp thoại Send Email của B1Admin đọc `GET /messaging/emailTemplates/sendStatus` (`approved`, `paused`, `remaining`, `requested`) và, khi chưa được phê duyệt, hiển thị thẻ **Request review** thay cho trình soạn thảo. Trình chỉnh sửa bước workflow đọc cùng endpoint đó (mở cho `tasks.admin` cũng như `groupMembers.edit`) để cảnh báo về các hành động **Send email** khi hội thánh chưa được phê duyệt hoặc đang bị tạm dừng. Tại thời điểm gửi, `MessagingModuleGateway.sendTemplatedEmail` trả về `false` mà không tạo thông báo khi `ChurchEmailLimiter.remaining()` nhỏ hơn 1, nhờ vậy lịch sử của thẻ không bao giờ ghi **Email sent** cho thư đã bị bỏ. `POST /messaging/emailTemplates/requestApproval` gửi email cho bộ phận hỗ trợ, tối đa một lần mỗi hội thánh mỗi tuần.
- **Hạn mức được cấp.** Một hội thánh đã được phê duyệt nhận được `max(150, 2 × ngày tốt nhất của hội thánh đó trong 30 ngày trước)`, tối đa 2.000 mỗi 24 giờ cuốn chiếu. 24 giờ hiện tại bị loại khỏi "ngày tốt nhất" để một đợt gửi dồn dập không thể tự nâng giới hạn của chính nó.
- **Dành trước, rồi quyết toán.** `reserve()` ghi một dòng `deliveryLogs` cho mỗi người nhận trước khi gửi, kiểm tra lại hạn mức với các dòng đó được tính vào, và rút lui nếu hai yêu cầu cùng vượt qua giới hạn (lần gửi trả về 429). `settle()` đánh dấu từng dòng là đã gửi hoặc thất bại.
- **Tạm dừng do khiếu nại.** Hàm Lambda `sesFeedback` (`Api/src/lambda/ses-feedback-handler.ts`, nhận dữ liệu từ SES → SNS) gắn mỗi lần bounce vĩnh viễn hoặc khiếu nại với hội thánh có email do hội thánh soạn đã gửi đến địa chỉ đó trong khoảng thời gian tương ứng, được lưu với `deliveryMethod` là `sesBounce` / `sesComplaint`. Một hội thánh bị tạm dừng khi có từ 2 khiếu nại trở lên (≥ 0,3% số lần gửi) hoặc 10 bounce cứng trở lên (≥ 5%) trong 7 ngày.

## Lịch trình

Cả bộ máy nhắc nhở lẫn bản tóm tắt thông báo đều chạy trên các bộ đếm thời gian định kỳ sẵn có thay vì giới thiệu hạ tầng mới:

| Bộ đếm | Lịch | Chạy |
|-------|----------|------|
| Bộ đếm 30 phút | mỗi 30 phút | Leo thang thông báo chưa đọc; gửi email tóm tắt tần suất `individual`; phân phối các lần xuất hiện nhắc nhở đến hạn (`ReminderEngine.scan`); tóm tắt phê duyệt; các lần thực thi tự động đến hạn |
| Bộ đếm hàng đêm | 05:00 UTC | Nhắc nhở điểm danh nhóm; tiến các buổi phát trực tiếp định kỳ; làm mới các danh sách tự động làm mới; mở rộng các lần xuất hiện nhắc nhở cho khoảng thời gian tiếp theo (`ReminderEngine.expandAll`); gửi email tóm tắt tần suất `daily` |

Ở môi trường cục bộ, cùng logic có thể được kích hoạt theo yêu cầu bằng `npm run timer:30min` và `npm run timer:midnight` từ dự án `Api`.

## Danh mục tệp

| Khu vực | Tệp |
|------|-------|
| Phễu | `Api/src/modules/messaging/helpers/NotificationHelper.ts`, `PreferenceGateHelper.ts`, `NotificationCategoryHelper.ts`, `WebPushHelper.ts`, `ExpoPushHelper.ts`, `SocketHelper.ts`, `DeliveryHelper.ts` |
| Điểm vào dùng chung | `Api/src/shared/helpers/NotificationService.ts` |
| Cửa giao dịch | `Api/src/shared/helpers/TransactionalEmailHelper.ts`, quy tắc lint `Api/tools/eslint-rules/email-door.cjs` |
| Giới hạn email của hội thánh | `Api/src/shared/helpers/ChurchEmailLimiter.ts`, `Api/src/lambda/ses-feedback-handler.ts`, `Api/src/modules/messaging/repositories/DeliveryLogRepo.ts` |
| Bộ máy nhắc nhở | `Api/src/modules/messaging/helpers/ReminderEngine.ts`, `ReminderBootstrap.ts`, `helpers/adapters/*`, `controllers/ReminderController.ts` |
| Nhắn tin / hủy đăng ký STOP | `Api/src/modules/messaging/helpers/SmsOptOutHelper.ts`, `controllers/TextingController.ts` (`/status`, `/inboundUrl`, `/inbound/:churchId/:token`), `Api/src/modules/doing/helpers/MatrixTextHelper.ts` (hành động **Text Volunteers** trong tổng quan phục vụ) |
| Kho lưu nhắc nhở | `Api/src/modules/messaging/repositories/ReminderDefinitionRepo.ts`, `ReminderOccurrenceRepo.ts`, `ReminderSentLogRepo.ts` |
| Email phục vụ/kế hoạch | `Api/src/modules/doing/helpers/PlanReminderEmailHelper.ts`, `ReminderTokenHelper.ts`, `Api/src/shared/modules/DoingModuleGateway.ts` |
| Trình chỉnh sửa nhắc nhở (B1Admin) | `serving/components/PlanTypeReminderEdit.tsx`, `calendars/components/EventReminderEdit.tsx`, `serving/tasks/components/TaskReminderEdit.tsx`, `hooks/useTextingEnabled.ts` |
| Trình chỉnh sửa nhắc nhở / tùy chọn (B1App) | `EventReminderEdit.tsx`, `NotificationPrefsPage.tsx`, `useRealtimeNotifications.ts` |

## Trang liên quan

- [Kiến trúc thời gian thực](../realtime.md) — giao thức WebSocket và các thành phần client (`SocketHelper`, `SubscriptionManager`, `ConversationStore`) mà mức gửi trong ứng dụng dựa vào
- [Thông báo đẩy trên web](../web-push.md) — thiết lập VAPID và đường dẫn Push API của trình duyệt được dùng cho mức leo thang push
- [Điểm cuối tin nhắn](../api/endpoints/messaging.md) — toàn bộ REST API cho tin nhắn, cuộc trò chuyện, kết nối và các tuyến thông báo/nhắc nhở
