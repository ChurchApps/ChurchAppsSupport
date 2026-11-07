---
title: "Endpoint của Doing"
---

# Endpoint của Doing

<div class="article-intro">

Module Doing quản lý lập kế hoạch phục vụ, phân công tình nguyện viên, quản lý công việc và tự động hóa. Module cung cấp các công cụ để tạo kế hoạch phục vụ với thời gian và vị trí, phân công tình nguyện viên, quản lý ngày bận, xây dựng các mục trong thứ tự chương trình, kết nối với nhà cung cấp nội dung bên ngoài, và cấu hình quy trình tự động với điều kiện và hành động.

</div>

**Đường dẫn gốc:** `/doing`

## Kế hoạch

Đường dẫn gốc: `/doing/plans`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liệt kê tất cả kế hoạch của nhà thờ |
| GET | `/:id` | JWT | — | Lấy kế hoạch theo ID |
| GET | `/ids?ids=` | JWT | — | Lấy nhiều kế hoạch theo danh sách ID phân cách bằng dấu phẩy |
| GET | `/types/:planTypeId` | JWT | — | Lấy kế hoạch theo loại kế hoạch |
| GET | `/textRange?startDate=&endDate=&ministryId=&planTypeId=` | JWT | `texting.send` + quyền chỉnh sửa ministry | Xem trước tổng quan phục vụ mà **Tình nguyện viên nhận tin nhắn** sẽ gửi: `{ totalMembers, eligibleCount, optedOutCount, noPhoneCount, capped }` cho các tình nguyện viên được phân công trong khoảng thời gian (mỗi người một lần; bỏ qua những người đã từ chối nhận tin và những người không có số điện thoại; loại bỏ trùng lặp số dùng chung; tối đa 200 người) |
| GET | `/presenter` | JWT | — | Lấy kế hoạch trong 7 ngày tới (chế độ trình chiếu) |
| GET | `/confirmationWorkflows?ministryId=` | JWT | Quyền chỉnh sửa ministry | Các quy trình xác nhận phân công phục vụ đang hoạt động (`workflowType = "assignmentConfirmation"`) mà một kế hoạch có thể chọn: `[{ id, name }]` |
| GET | `/public/current/:planTypeId` | Công khai | — | Lấy kế hoạch hiện tại của một loại kế hoạch |
| GET | `/public/signup/:churchId` | Công khai | — | Các kế hoạch đang mở để tự đăng ký, sắp diễn ra nhất trước, mỗi kế hoạch kèm các vị trí tự đăng ký (sắp xếp theo `categoryName`, rồi đến `name`, cùng với `filledCount` là số phân công đã chấp nhận hoặc chưa xác nhận) và thời gian. Không có tên tình nguyện viên. Khi cài đặt nhà thờ `volunteerSignupNextOnly` là `"true"`, chỉ trả về kế hoạch đầu tiên của mỗi loại kế hoạch. Mỗi `plan` có thêm `signupDeadline` được tính toán (thời điểm ISO, hoặc `null`): `signupDeadlineHours` trước thời gian `service` sớm nhất của kế hoạch (nếu không có thời gian loại service thì lấy mục có thời gian bất kỳ; nếu kế hoạch không có thời gian nào thì lấy 9:00 theo múi giờ của nhà thờ vào ngày `serviceDate`) |
| GET | `/signup/:planId/volunteers` | JWT | — | `[{ positionId, names }]` cho các vị trí tự đăng ký của kế hoạch (tên hiển thị của những người được phân công đã chấp nhận hoặc chưa xác nhận). Trả về `[]` trừ khi `showVolunteerNames` của kế hoạch được bật |
| POST | `/` | JWT | — | Tạo hoặc cập nhật kế hoạch (nhận một đối tượng hoặc một mảng). Đặt `confirmationWorkflowId` để đưa kế hoạch vào quy trình xác nhận phục vụ, hoặc `null` để hủy cho các yêu cầu sau. Gửi `signupDeadlineHours: null` để xóa hạn đăng ký; nếu bỏ qua trường này thì giá trị đã lưu sẽ được giữ nguyên |
| POST | `/copy/:id` | JWT | Quyền chỉnh sửa ministry | Sao chép kế hoạch bao gồm vị trí, thời gian, phân công và các mục trong thứ tự chương trình. Nội dung yêu cầu gồm `ministryId`, `serviceDate`, `copyMode` (`"none"`, `"positions"`, `"all"`) và `copyServiceOrder` (boolean). Nếu không có `targetPlanId`, một kế hoạch mới sẽ được tạo, và `notes`, `signupDeadlineHours`, `showVolunteerNames`, `autoReplaceOnDecline` được giữ nguyên từ kế hoạch gốc, trừ khi nội dung yêu cầu cung cấp giá trị khác. Với `targetPlanId`, bản sao sẽ điền vào kế hoạch hiện có đó (người gọi phải có quyền chỉnh sửa kế hoạch này). Tùy chọn **Lặp lại hằng tuần** của B1Admin gọi endpoint này mỗi tuần một lần, mỗi lần sao chép từ kế hoạch được tạo ở tuần trước |
| POST | `/textRange` | JWT | `texting.send` + quyền chỉnh sửa ministry | Gửi tin nhắn cho mọi tình nguyện viên được phân công trong khoảng ngày thông qua nhà cung cấp dịch vụ nhắn tin của nhà thờ. Nội dung yêu cầu: `{ startDate, endDate, ministryId, planTypeId?, message }` (tin nhắn tối đa 1600 ký tự; các trường gộp được thay thế theo từng người nhận). Trả về số liệu xem trước cùng với `recipientCount`, `successCount`, `failCount`, và `error` (`no_provider` hoặc `insufficient_credits`) khi việc gửi bị dừng sớm |
| POST | `/:id/issueRequests` | JWT | Quyền chỉnh sửa kế hoạch | Gửi các phân công mới ở trạng thái Chưa xác nhận, chưa được thông báo của kế hoạch qua quy trình xác nhận của kế hoạch: đánh dấu từng phân công là đã thông báo và tạo một thẻ quy trình cho mỗi phân công. Nội dung rỗng; trả về `{ issued }`. Thao tác thất bại nếu kế hoạch chưa được xuất bản (vẫn ở trạng thái `prepared`), không có `confirmationWorkflowId` đang hoạt động với ít nhất một bước, hoặc hạn phản hồi đã qua |
| POST | `/autofill/:id` | JWT | — | Tự động điền phân công tình nguyện viên cho một kế hoạch. Nội dung yêu cầu: `{ teams: [{ positionId, personIds }] }` |
| DELETE | `/:id` | JWT | — | Xóa kế hoạch cùng mọi thời gian, phân công, vị trí và mục kế hoạch liên quan |

### Ví dụ: Sao chép kế hoạch

```
POST /doing/plans/copy/abc-123
Authorization: Bearer <token>

{
  "serviceDate": "2026-03-01T10:00:00.000Z",
  "copyMode": "all",
  "copyServiceOrder": true
}
```

```json
{
  "id": "def-456",
  "churchId": "church-1",
  "serviceDate": "2026-03-01T10:00:00.000Z"
}
```

## Loại kế hoạch

Đường dẫn gốc: `/doing/planTypes`

Kế thừa lớp CRUD cơ sở (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — không kiểm tra quyền).

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liệt kê tất cả loại kế hoạch |
| GET | `/:id` | JWT | — | Lấy loại kế hoạch theo ID |
| GET | `/ids?ids=` | JWT | — | Lấy nhiều loại kế hoạch theo danh sách ID phân cách bằng dấu phẩy |
| GET | `/ministryId/:ministryId` | JWT | — | Lấy các loại kế hoạch của một ministry |
| POST | `/` | JWT | — | Tạo hoặc cập nhật loại kế hoạch |
| DELETE | `/:id` | JWT | — | Xóa loại kế hoạch |

## Mục kế hoạch

Đường dẫn gốc: `/doing/planItems`

Quản lý các mục trong thứ tự chương trình (tiêu đề, phần, bài hát, v.v.) được tổ chức theo cấu trúc cây cha-con.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Lấy mục kế hoạch theo ID |
| GET | `/ids?ids=` | JWT | — | Lấy nhiều mục kế hoạch theo danh sách ID phân cách bằng dấu phẩy |
| GET | `/plan/:planId` | JWT | — | Lấy tất cả mục của một kế hoạch (trả về cấu trúc cây) |
| GET | `/presenter/:churchId/:planId` | Công khai | — | Lấy mục kế hoạch cho chế độ trình chiếu (trả về cấu trúc cây) |
| POST | `/` | JWT | — | Tạo hoặc cập nhật mục kế hoạch |
| POST | `/sort` | JWT | — | Cập nhật thứ tự sắp xếp của một mục kế hoạch (sắp xếp lại các mục cùng cấp) |
| DELETE | `/:id` | JWT | — | Xóa mục kế hoạch |

## Nguồn cấp dữ liệu kế hoạch

Đường dẫn gốc: `/doing/planFeed`

Cung cấp nguồn dữ liệu mục kế hoạch cho chế độ trình chiếu. Nếu chưa có mục kế hoạch nào, hệ thống tự động điền từ nguồn dữ liệu venue của Lessons.church bằng `contentId` của kế hoạch.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/presenter/:churchId/:planId` | Công khai | — | Lấy nguồn dữ liệu kế hoạch cho chế độ trình chiếu (tự động điền từ nguồn venue nếu trống) |

## Vị trí

Đường dẫn gốc: `/doing/positions`

Kế thừa lớp CRUD cơ sở (GET `/:id`, POST `/`, DELETE `/:id` — không kiểm tra quyền).

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Lấy vị trí theo ID |
| GET | `/ids?ids=` | JWT | — | Lấy nhiều vị trí theo danh sách ID phân cách bằng dấu phẩy |
| GET | `/plan/ids?planIds=` | JWT | — | Lấy vị trí của nhiều kế hoạch theo danh sách ID kế hoạch phân cách bằng dấu phẩy |
| GET | `/plan/:planId` | JWT | — | Lấy tất cả vị trí của một kế hoạch |
| POST | `/` | JWT | — | Tạo hoặc cập nhật vị trí |
| DELETE | `/:id` | JWT | — | Xóa vị trí |

## Thời gian

Đường dẫn gốc: `/doing/times`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/all` | JWT | — | Liệt kê tất cả thời gian của nhà thờ |
| GET | `/:id` | JWT | — | Lấy thời gian theo ID |
| GET | `/plans?planIds=` | JWT | — | Lấy thời gian của nhiều kế hoạch theo danh sách ID kế hoạch phân cách bằng dấu phẩy |
| GET | `/plan/:planId` | JWT | — | Lấy tất cả thời gian của một kế hoạch |
| POST | `/` | JWT | — | Tạo hoặc cập nhật thời gian |
| DELETE | `/:id` | JWT | — | Xóa thời gian |

## Phân công

Đường dẫn gốc: `/doing/assignments`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/my` | JWT | — | Lấy các phân công của người dùng hiện tại |
| GET | `/my/upcoming` | JWT | — | Tối đa 20 phân công của người dùng hiện tại trong các kế hoạch từ hôm qua trở đi (bỏ qua kế hoạch đang giữ chỗ tạm thời hoặc ở trạng thái `prepared`), sắp diễn ra nhất trước: `{ assignmentId, status, positionName, planId, planName, serviceDate }`. Dùng cho phần xem trước phục vụ trên trang chủ thành viên |
| GET | `/:id` | JWT | — | Lấy phân công theo ID |
| GET | `/plan/ids?planIds=` | JWT | — | Lấy phân công của nhiều kế hoạch theo danh sách ID kế hoạch phân cách bằng dấu phẩy |
| GET | `/plan/:planId` | JWT | — | Lấy tất cả phân công của một kế hoạch |
| POST | `/` | JWT | — | Tạo hoặc cập nhật phân công (mặc định trạng thái là "Unconfirmed") |
| POST | `/accept/:id` | JWT | — | Chấp nhận phân công (phải là người được phân công) |
| POST | `/decline/:id` | JWT | — | Từ chối phân công (phải là người được phân công) |
| POST | `/signup` | JWT | — | Tự đăng ký cho một vị trí. Nội dung yêu cầu: `{ positionId }`. Vị trí phải cho phép tự đăng ký và còn chỗ; tạo một phân công ở trạng thái Accepted. Bị từ chối với thông báo "Signup deadline has passed" khi hạn đăng ký của kế hoạch (tính ngược từ thời gian phục vụ đầu tiên, như đã nêu ở trên) đã qua |
| DELETE | `/signup/:id` | JWT | — | Hủy đăng ký tự đăng ký của chính bạn. Bị từ chối với thông báo "Removal deadline has passed" sau hạn đăng ký của kế hoạch |
| DELETE | `/:id` | JWT | — | Xóa phân công |

### Ví dụ: Chấp nhận phân công

```
POST /doing/assignments/accept/assign-123
Authorization: Bearer <token>
```

```json
{
  "id": "assign-123",
  "personId": "person-456",
  "positionId": "pos-789",
  "planId": "plan-abc",
  "status": "Accepted"
}
```

## Ngày bận

Đường dẫn gốc: `/doing/blockoutDates`

Kế thừa lớp CRUD cơ sở (GET `/:id`, DELETE `/:id` — không kiểm tra quyền).

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Lấy ngày bận theo ID |
| GET | `/ids?ids=` | JWT | — | Lấy nhiều ngày bận theo danh sách ID phân cách bằng dấu phẩy |
| GET | `/my` | JWT | — | Lấy các ngày bận của người dùng hiện tại |
| GET | `/upcoming` | JWT | — | Lấy tất cả ngày bận sắp tới của nhà thờ |
| POST | `/` | JWT | — | Tạo hoặc cập nhật ngày bận (mặc định personId là người dùng hiện tại nếu không được cung cấp) |
| DELETE | `/:id` | JWT | — | Xóa ngày bận |

## Công việc

Đường dẫn gốc: `/doing/tasks`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Lấy các công việc đang mở của người dùng hiện tại |
| GET | `/:id` | JWT | — | Lấy công việc theo ID |
| GET | `/:id/contact` | JWT | Được xem thẻ | Thông tin liên hệ của người mà thẻ quy trình liên quan đến: `{ personId, displayName, mobilePhone, email }`. Cho phép người gọi được phân công nhưng không có quyền truy cập People vẫn liên lạc được với người đó |
| GET | `/closed` | JWT | — | Lấy các công việc đã đóng của người dùng hiện tại |
| GET | `/timeline?taskIds=` | JWT | — | Lấy dữ liệu dòng thời gian của công việc theo danh sách ID công việc phân cách bằng dấu phẩy |
| GET | `/directoryUpdate/:personId` | JWT | — | Lấy công việc cập nhật danh bạ của một người |
| POST | `/` | JWT | — | Tạo hoặc cập nhật công việc. Thêm `?type=directoryUpdate` để xử lý công việc cập nhật danh bạ (tự động tải lên ảnh) |
| POST | `/:id/conversation` | JWT | `tasks.edit` hoặc người được giao thẻ | Gắn cuộc trò chuyện ghi chú vào thẻ. Nội dung yêu cầu: `{ conversationId }`. Cuộc trò chuyện được gắn đầu tiên sẽ được giữ; các lần gọi sau trả về thẻ không thay đổi |
| POST | `/loadForGroups` | JWT | — | Tải công việc cho các nhóm cụ thể. Nội dung yêu cầu: `{ groupIds: [], status: "Open" }` |

## Tự động hóa

Đường dẫn gốc: `/doing/automations`

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liệt kê tất cả tự động hóa của nhà thờ |
| GET | `/:id` | JWT | — | Lấy tự động hóa theo ID |
| GET | `/check` | Công khai | — | Kích hoạt kiểm tra tất cả tự động hóa |
| POST | `/` | JWT | — | Tạo hoặc cập nhật tự động hóa |
| DELETE | `/:id` | JWT | — | Xóa tự động hóa |

## Hành động

Đường dẫn gốc: `/doing/actions`

Hành động xác định điều gì sẽ xảy ra khi một tự động hóa được kích hoạt.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Lấy hành động theo ID |
| GET | `/automation/:id` | JWT | — | Lấy tất cả hành động của một tự động hóa |
| POST | `/` | JWT | — | Tạo hoặc cập nhật hành động |
| DELETE | `/:id` | JWT | — | Xóa hành động |

## Điều kiện

Đường dẫn gốc: `/doing/conditions`

Điều kiện xác định các tiêu chí kích hoạt một tự động hóa.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Lấy điều kiện theo ID |
| GET | `/automation/:id` | JWT | — | Lấy tất cả điều kiện của một tự động hóa |
| POST | `/` | JWT | — | Tạo hoặc cập nhật điều kiện |
| DELETE | `/:id` | JWT | — | Xóa điều kiện |

## Liên kết điều kiện

Đường dẫn gốc: `/doing/conjunctions`

Liên kết điều kiện nối nhiều điều kiện với nhau trong một tự động hóa (logic VÀ/HOẶC).

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/:id` | JWT | — | Lấy liên kết điều kiện theo ID |
| GET | `/automation/:id` | JWT | — | Lấy tất cả liên kết điều kiện của một tự động hóa |
| POST | `/` | JWT | — | Tạo hoặc cập nhật liên kết điều kiện |
| DELETE | `/:id` | JWT | — | Xóa liên kết điều kiện |

## Xác thực nhà cung cấp nội dung

Đường dẫn gốc: `/doing/contentProviderAuths`

Kế thừa lớp CRUD cơ sở (GET `/`, GET `/:id`, POST `/`, DELETE `/:id` — không kiểm tra quyền).

Quản lý các bản ghi xác thực OAuth cho nhà cung cấp nội dung bên ngoài (ví dụ: tích hợp phần mềm trình chiếu).

`accessToken` và `refreshToken` được mã hóa khi lưu trữ bằng `EncryptionHelper` và được giải mã khi đọc, nên API vẫn trả về token dạng văn bản thuần. Các bản ghi được lưu trước khi có mã hóa chứa văn bản thuần (không bao giờ có ký tự `|`); chúng được trả về nguyên trạng và sẽ được mã hóa vào lần lưu tiếp theo.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Liệt kê tất cả xác thực nhà cung cấp nội dung |
| GET | `/:id` | JWT | — | Lấy xác thực nhà cung cấp nội dung theo ID |
| GET | `/ids?ids=` | JWT | — | Lấy nhiều xác thực nhà cung cấp nội dung theo danh sách ID phân cách bằng dấu phẩy |
| GET | `/ministry/:ministryId` | JWT | — | Lấy tất cả xác thực nhà cung cấp nội dung của một ministry |
| GET | `/ministry/:ministryId/:providerId` | JWT | — | Lấy bản ghi xác thực của một ministry và nhà cung cấp cụ thể |
| POST | `/` | JWT | — | Tạo hoặc cập nhật xác thực nhà cung cấp nội dung |
| DELETE | `/:id` | JWT | — | Xóa xác thực nhà cung cấp nội dung |

## Proxy nhà cung cấp

Đường dẫn gốc: `/doing/providerProxy`

Chuyển tiếp yêu cầu đến các nhà cung cấp nội dung bên ngoài (ví dụ: ProPresenter, EasyWorship). Tự động làm mới token khi token hết hạn.

| Phương thức | Đường dẫn | Xác thực | Quyền | Mô tả |
|--------|------|------|------------|-------------|
| POST | `/browse` | JWT | — | Duyệt tệp của nhà cung cấp nội dung. Nội dung yêu cầu: `{ ministryId, providerId, path }` |
| POST | `/getPresentations` | JWT | — | Lấy các bài trình chiếu từ nhà cung cấp nội dung. Nội dung yêu cầu: `{ ministryId, providerId, path }` |
| POST | `/getPlaylist` | JWT | — | Lấy danh sách phát từ nhà cung cấp nội dung. Nội dung yêu cầu: `{ ministryId, providerId, path, resolution }` |
| POST | `/getInstructions` | JWT | — | Lấy hướng dẫn cho một mục nội dung. Nội dung yêu cầu: `{ ministryId, providerId, path }` |
| POST | `/getExpandedInstructions` | JWT | — | Lấy hướng dẫn mở rộng cho một mục nội dung. Nội dung yêu cầu: `{ ministryId, providerId, path }` |

## Trang liên quan

- [Endpoint Membership](./membership) — Người, nhóm, vai trò và quyền
- [Endpoint Attendance](./attendance) — Theo dõi buổi nhóm và lượt thăm
- [Cấu trúc module](../module-structure) — Các mẫu tổ chức mã nguồn
