---
title: "Check-Ins"
---

# Check-Ins

<div class="article-intro">

Việc điểm danh là một hệ thống với ba cửa vào: ứng dụng kiosk B1Checkin dành cho các trạm có nhân viên và tự phục vụ, tính năng tự điểm danh trong cổng thành viên B1App, và điểm danh phía quản trị trong B1Admin. Cả ba đều ghi dữ liệu vào cùng một module điểm danh trong Api lõi, và việc định tuyến lớp học hoàn toàn dựa trên Groups — không có thực thể "locations" hay "rooms" riêng biệt. Một lớp bảo vệ an toàn trẻ em nằm trên đó: loại điểm danh theo từng lần, các cổng kiểm tra sức chứa và tỷ lệ tình nguyện viên phía máy chủ, kiểm tra độ tuổi/lớp học phía kiosk, xác minh người đón đáng tin cậy khi trả trẻ, và nhắn tin cho phụ huynh qua nhà cung cấp dịch vụ nhắn tin SMS của hội thánh. Trang này mô tả mô hình dữ liệu, các luồng điểm danh, lớp bảo vệ an toàn và quy trình in nhãn.

</div>

## Tổng quan

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  tra cứu → hộ gia đình → │  │         │ Api                                          │
│  nhóm → hoàn tất/in      │  │  HTTPS  │  ┌─ module thành viên ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ người · hộ gia đình · nhóm              │ │
│ B1App (tự điểm danh)     │──┤         │  └─────────────────────────────────────────┘ │
│  màn hình /mobile/checkin│  │         │  ┌─ module điểm danh ──────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (nhân viên)      │──┘         │  │ groupServiceTimes  (định tuyến phòng)   │ │
│  thiết lập · báo cáo ·   │            │  │ sessions ← visitSessions → visits       │ │
│  trình thiết kế nhãn     │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Đường in nhãn (chỉ kiosk):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (mẫu nhãn, hoặc HTML dự phòng đi kèm)
       └▶ LabelRenderer → tài liệu HTML + mã vạch SVG nội tuyến
            └▶ PrintUI: WebView render → ViewShot chụp JPG
                 └▶ mô-đun native printer-helper → Brother QL / Zebra
```

| Giao diện | Kho mã | Công nghệ | Vai trò |
|-----------|--------|-----------|---------|
| Kiosk | `B1Checkin` | Expo / React Native, định tuyến tệp expo-router; bản dựng EAS cho Android, Amazon Fire và iOS; cập nhật OTA qua `expo-updates` | Trạm có nhân viên hoặc tự phục vụ, có in nhãn và trả trẻ có xác minh |
| Tự điểm danh | `B1App` | Next.js (cổng thành viên b1.church) | Thành viên đã đăng nhập điểm danh hộ gia đình từ điện thoại; không in |
| Quản trị | `B1Admin` | React SPA | Cấu hình cơ cấu buổi nhóm, gán nhóm vào giờ nhóm, thiết kế nhãn, ghi điểm danh thủ công, chạy báo cáo |

Cả ba đều gọi hai module API giống nhau qua `ApiHelper`: **MembershipApi** (`/membership`) cho người, hộ gia đình và nhóm; **AttendanceApi** (`/attendance`) cho mọi thứ bên dưới.

## Mô hình dữ liệu (`Api/src/modules/attendance`)

| Thực thể / bảng | Trường chính | Ý nghĩa |
|-----------------|--------------|---------|
| `campuses` | name, address | Đã lỗi thời ở đây — campus được quản lý trong module thành viên (`/membership/campuses`); bản sao trong điểm danh được đóng băng chỉ đọc cho các bên đọc cũ (`models/Campus.ts`) |
| `services` | campusId, name | Một buổi nhóm định kỳ, ví dụ "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | Một khung giờ trong buổi nhóm, ví dụ "9:00 AM" (`models/ServiceTime.ts`). Các cột lịch là tùy chọn (migration `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`) và điều khiển [khung giờ điểm danh](#khung-giờ-điểm-danh-theo-lịch) |
| `groupServiceTimes` | groupId, serviceTimeId | Bảng nối: nhóm (lớp học) nào họp vào giờ nhóm nào (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | Một buổi họp của một nhóm vào một ngày — được tạo lười biếng khi điểm danh (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | Một người tham dự vào một ngày (`models/Visit.ts`). `checkinType` là `member` / `guest` / `volunteer` (NULL = thành viên kiểu cũ), do kiosk đặt và được các cổng sức chứa/tỷ lệ sử dụng |
| `visitSessions` | visitId, sessionId | Các buổi mà một lượt đến bao gồm — trẻ điểm danh vào hai giờ nhóm sẽ có hai dòng (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (khối JSON) | Bố cục nhãn có thể thiết kế (`models/LabelTemplate.ts`) |

### Cách lưu một lần điểm danh đã hoàn tất

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`) xử lý `POST /attendance/visits/checkin?serviceId=&peopleIds=`. Phần thân là một mảng đối tượng `Visit`, mỗi đối tượng mang `visitSessions` mà `session` nhúng chỉ nêu một cặp `(serviceTimeId, groupId)`. Sau đó máy chủ:

1. **Kiểm tra sức chứa và tỷ lệ trước mọi thao tác ghi.** `evaluateGates()` → `CheckinGateHelper.evaluate()` kiểm tra sức chứa, sức chứa khách, cờ đóng và tỷ lệ tình nguyện viên của từng phòng mục tiêu so với số người hiện có. postCheckin **không có giao dịch**, nên cổng phải chạy trước lần lưu đầu tiên — vi phạm nghiêm trọng sẽ trả về 409 nêu tên phòng vi phạm và không có gì được lưu. Xem [Cổng sức chứa và tỷ lệ tình nguyện viên](#cổng-sức-chứa-và-tỷ-lệ-tình-nguyện-viên).
2. **Giải quyết buổi họp lười biếng.** `getSessionId()` tìm hoặc tạo dòng `sessions` cho `(groupId, serviceTimeId, hôm nay)` — id buổi họp được lưu đệm trong tiến trình theo ngày. Buổi họp mới phát webhook `session.created`. Vòng lặp là `for..of` có `await` — một `forEach(async …)` chạy không chờ trước đây đã đua với lần lưu và ghi sessionId NULL khi tạo buổi họp đầu tiên (đã sửa; có ghi chú trong mã tại vòng lặp).
3. **Thay thế bản ghi trong ngày.** Mọi lượt đến hiện có của những người này tại buổi nhóm hôm nay đều bị xóa cùng với visitSessions của chúng, sau đó tập hợp đã gửi được lưu. Vì vậy điểm danh lại một gia đình là thao tác mang tính "đây là trạng thái hiện tại" có tính lũy đẳng, chứ không phải thêm mới. Truyền `?checkDuplicates=true` thay vào đó sẽ trả về `{ duplicates: [personId…] }` mà không ghi, đây là cách kiosk cảnh báo trước khi ghi đè.
4. **Tạo một mã bảo mật cho mỗi đợt.** `SecurityCodeHelper.generate()` tạo mã 4 ký tự từ bảng chữ cái `23456789BCDFGHJKLMNPQRSTVWXYZ` (không có nguyên âm hay ký tự dễ nhầm lẫn, nên mã không thể tạo thành từ hoặc bị đọc sai). Máy chủ thử lại khi trùng với các lượt đến đang mở trong ngày của cùng hội thánh và đóng dấu mã lên mọi lượt đến trong đợt.
5. **Trả về `{ streaks, securityCode }`.** `streaks` ánh xạ personId với số tuần tham dự liên tiếp; kiosk ăn mừng các cột mốc (mỗi tuần thứ 5) bằng pháo giấy.

Mỗi lượt đến được lưu cũng phát webhook `attendance.recorded`. Phía đọc, `GET /attendance/visits/checkin`, trả về các lượt đến của những người này từ **ngày ghi nhận gần nhất** — nếu đó là một tuần trước, các id bị loại bỏ, nên client nhận một bản sao điền sẵn các lựa chọn phòng của tuần trước sẽ được lưu thành bản ghi mới.

### Trả trẻ (check-out)

Hai endpoint hoàn tất vòng lặp (`VisitController`):

- `GET /attendance/visits/code/:code` — các lượt đến trong ngày chưa trả trẻ mang mã bảo mật đó, với sessions được nạp đầy đủ.
- `POST /attendance/visits/checkout` — phần thân `{ visitIds, checkedOutBy?, checkedOutById? }`; đóng dấu `checkoutTime` và người đón, và phát webhook `attendance.checkout` cho mỗi lượt đến.

Quyền hạn: kiosk xác thực bằng `attendance.checkin`, quyền này cấp đúng bề mặt điểm danh/trả trẻ/mẫu nhãn, cộng với các tra cứu hộ gia đình mà kiosk cần mà không có `people.view` (tìm theo số điện thoại/tên, thành viên hộ gia đình trong mô hình điểm danh, và danh sách người đón của hộ gia đình). `SessionHelper.filterChurches` của B1Checkin chỉ đưa ra các hội thánh mà tài khoản có `Attendance/Checkin` hoặc `Attendance/Edit`. `Checkin` không còn thuộc quyền của Everyone (vai trò null) (`RoleHelper` và migration `2026-11-01_remove_everyone_checkin`), nên phải được cấp qua một vai trò thực; `attendance.view`/`attendance.edit` bao gồm báo cáo và nhập thủ công; cơ cấu (dịch vụ, giờ nhóm, phân công nhóm) yêu cầu `services.edit`. Tự điểm danh của thành viên (B1App) không cần quyền nào: bất kỳ người dùng đã xác thực nào có người liên kết trong hội thánh đều có thể gọi `GET`/`POST /attendance/visits/checkin`, và máy chủ giới hạn các `personId` gửi lên chỉ trong hộ gia đình của người gọi (403 nếu khác) — hàng rào này giữ cho `securityCode` của các gia đình khác không thể đọc được. Tư cách thành viên là quyền cấp; việc thành viên có *thấy* tính năng hay không được kiểm soát bởi các tab điều hướng B1App của hội thánh. Các endpoint điểm danh khác (`code/:code`, `checkout`, `guardians`, `CheckinController`) vẫn chỉ dành cho kiosk/nhân viên.

## Nhóm điều khiển định tuyến phòng

Không có thực thể phòng hay lớp học nào trong toàn hệ thống. Một "phòng" là một **nhóm** thành viên có bật `trackAttendance`, được liên kết với một hoặc nhiều giờ nhóm thông qua `groupServiceTimes`. Các trường nhóm (trong `Api/src/modules/membership/models/Group.ts`) định hình hành vi kiosk:

| Trường | Tác dụng |
|------|--------|
| `trackAttendance` | Nhóm có tham gia điểm danh hay không; cây thiết lập của B1Admin đánh dấu các nhóm `trackAttendance` không có dòng `groupServiceTimes` là chưa được gán |
| `parentPickup` | Đánh dấu phòng trẻ em: điểm danh vào phòng này khiến lượt đến thành lượt "trẻ em", in nhãn đón gia đình và đặt mã bảo mật lên thẻ tên |
| `printNametag` | Việc điểm danh vào nhóm này có in thẻ tên hay không |
| `capacity` / `guestCapacity` / `checkinClosed` | Giới hạn sức chứa phòng và công tắc "đóng" cứng, được cổng điểm danh phía máy chủ thực thi (chỉnh trong cài đặt nhóm của B1Admin dưới "Check-In Capacity") |
| `volunteerRatio` / `minVolunteers` | Tỷ lệ trẻ trên tình nguyện viên và số tình nguyện viên tối thiểu, được thực thi theo cài đặt toàn hội thánh `ratioEnforcement` |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | Giới hạn đủ điều kiện theo tuổi/lớp, được đánh giá phía kiosk để làm nổi bật hoặc làm mờ các phòng |

Mọi client đều phi chuẩn hóa theo cùng cách (ví dụ `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): tải song song `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` và `GET /membership/groups`, sau đó với mỗi giờ nhóm, thu thập các nhóm có dòng `groupServiceTimes` trỏ đến nó vào `serviceTime.groups`. Mảng đó là thứ bộ chọn phòng hiển thị, được sắp xếp theo `categoryName` của nhóm.

Việc phân công được chỉnh từ trang nhóm trong B1Admin (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), và toàn bộ cây Campus → Service → Service Time → Group được trực quan hóa trong `B1Admin/src/attendance/components/AttendanceSetup.tsx` qua `GET /attendance/attendancerecords/tree`.

:::info
Vì nhóm là nguồn dữ liệu duy nhất, cùng một tư cách thành viên nhóm cung cấp định tuyến kiosk, điểm danh kiểu danh sách trên các trang nhóm trong B1Admin, và báo cáo điểm danh — gán một nhóm vào một giờ nhóm là bước duy nhất cần thiết để biến nó thành điểm đến điểm danh.
:::

## An toàn trẻ em

### Loại điểm danh

Mỗi lượt đến mang một `checkinType` — `member`, `guest` hoặc `volunteer` (NULL nghĩa là kiểu cũ/thành viên; migration `tools/migrations/attendance/2026-07-03_checkin_type.ts`). Loại được chọn **phía kiosk**: các chip Member / Guest / Volunteer trên hàng thành viên đã mở rộng (`B1Checkin/src/components/MemberServiceTimes.tsx`), được gắn vào mỗi lượt đến đang chờ khi hoàn tất (`app/checkinComplete.tsx`, mặc định là `member`). Máy chủ sử dụng nó trong cổng — tình nguyện viên được tính vào độ phủ tỷ lệ thay vì so với sức chứa, và khách được tính vào `guestCapacity`.

### Cổng sức chứa và tỷ lệ tình nguyện viên

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`) chạy bên trong `postCheckin` trước mọi lần lưu (endpoint không có giao dịch, nên cơ chế đảm bảo tính đúng đắn là kiểm tra trước khi lưu). Nó tải số người hiện có theo từng nhóm mục tiêu (`VisitRepo.countActiveByGroupToday`) và cấu hình nhóm qua cổng module thành viên, rồi phân loại vi phạm:

- **Cứng (luôn chặn):** `checkinClosed`, `current + incoming > capacity`, số khách vượt `guestCapacity`. Đợt bị từ chối với `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }` — kiosk hiển thị tên phòng.
- **Tỷ lệ (cảnh báo hoặc chặn):** người không phải tình nguyện viên đến trong phòng có `volunteers < minVolunteers`, không có tình nguyện viên nào, hoặc `children > volunteers × volunteerRatio`. Mức độ nghiêm trọng theo cài đặt `ratioEnforcement` của từng hội thánh (`"warn"` mặc định / `"block"`, chỉnh trong B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`). Chế độ cảnh báo trả về `409 { warning: true, error: "ratio", … }` trừ khi client gửi lại với `acknowledgeWarnings=true` — lần gửi lại đó là thao tác ghi đè xác nhận của nhân viên tại kiosk.

### Khung giờ điểm danh theo lịch

Một giờ nhóm có thể mang một lịch hàng tuần tùy chọn (`dayOfWeek` 0–6 với 0 = Chủ nhật, `startTime`/`endTime` ở dạng `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`), được chỉnh trong biểu mẫu giờ dịch vụ **Attendance → Setup** của B1Admin (`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in Schedule"). `CheckinGateHelper.hasSchedule()` chỉ coi một giờ nhóm là có lịch khi cả `dayOfWeek` và `startTime` đều được đặt; các giờ không có lịch không bao giờ bị giới hạn theo thời gian. `isServiceTimeOpen()` tính khung giờ theo giờ treo tường địa phương (`DateHelper.toChurchTime`). Múi giờ được `CheckinTimeZoneHelper.load()` (`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`) xác định cho từng giờ nhóm: `timezone` của campus của dịch vụ (`service.campusId`, qua `MembershipModuleGateway.loadCampusTimeZones`) được ưu tiên trước, sau đó là `timeZone` của hội thánh (đặt trong Church Information của B1Admin), rồi đến campus không bị xóa đầu tiên có `timezone` (`loadCampusTimeZone`), và cuối cùng mới là `America/New_York`. Campus được ưu tiên trước vì nhiều hội thánh đã có múi giờ hội thánh được điền ngược thành `America/New_York`. Cả đường liệt kê và đường gửi bên dưới đều xác định múi giờ theo cách giống nhau. Khung giờ chạy từ `checkinOpenMinutes` trước giờ bắt đầu đến `checkinCloseMinutes` sau giờ kết thúc (hoặc sau giờ bắt đầu khi không có giờ kết thúc), xử lý được các khung giờ vượt nửa đêm hoặc qua ranh giới tuần.

Khung giờ được thực thi ở hai nơi:

- **Liệt kê:** `GET /attendance/servicetimes` gắn cho mỗi dòng một boolean `checkinOpen` được tính toán. Tính năng tự điểm danh của B1App (`CheckinPage.tsx`) và bộ chọn dịch vụ của B1Checkin (`app/services.tsx`) giữ lại mọi giờ. Khi tất cả giờ của một dịch vụ đều đóng, chúng hiển thị lần mở sớm nhất ("Check-in opens Sun 9:30 AM." trong B1App, "Check-in for this service opens Sun 9:30 AM." trong B1Checkin, từ `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`), và quay về "Check-in isn't open for this service right now." khi không thể tính được lần mở nào (kiosk có nút Quay lại để chọn dịch vụ khác). Ngoài ra, các giờ đóng hiển thị thành một dòng "Closed" / "Closed · opens 9:30 AM" không thể chọn. Màn hình hộ gia đình của B1Checkin (`MemberServiceTimes.tsx`) đánh giá lại tình trạng mở theo thời gian thực trên đồng hồ thiết bị với `ServiceTimeHelper.isCheckinOpen()` (múi giờ thiết bị, không phải của hội thánh) để kiosk chạy liên tục mở và đóng đúng giờ, và hiển thị "Kids Room 1 · Checked in" (tên nhóm) trên một giờ đã đóng mà người đó đã giữ chỗ.
- **Gửi:** bên trong `evaluateGates()`, trước khi đánh giá sức chứa/tỷ lệ, `findClosedServiceTimeGroups()` từ chối đợt bằng `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }` nếu giờ nhóm của bất kỳ buổi mục tiêu nào nằm ngoài khung giờ. Vì các lượt đến hiện có của hộ gia đình trong ngày được gửi lại với mọi lần điểm danh, các buổi mà người đó đã giữ (`personId|sessionId` trong các lượt đến hiện có) bỏ qua cổng này, nên việc thêm một giờ nhóm mở sau sẽ không bị từ chối chỉ vì khung giờ trước đã đóng. B1Checkin hiển thị điều này qua màn hình cổng cứng với lý do "check-in isn't open right now" (vi phạm sức chứa vẫn hiển thị "room is full or closed").

### Đủ điều kiện theo tuổi/lớp (phía kiosk)

Đủ điều kiện phòng chỉ là giao diện tham khảo, được đánh giá trên kiosk, không do máy chủ thực thi. `B1Checkin/src/helpers/EligibilityHelper.ts` so sánh ngày sinh/lớp của một người với `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` của nhóm (thứ tự lớp: PreK, K, 1–12, Graduated) và trả về `eligible` / `ineligible` / `unknown` — thiếu dữ liệu sẽ cho `unknown` và không bao giờ ẩn phòng. Tuổi và lớp được tính theo **ngày lên lớp** của hội thánh (cài đặt `gradePromotionDate`, `"MM-DD"`, chỉnh trong `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`); kiosk lấy nó từ `GET /attendance/checkin/settings`, và `resolveAsOfDate` chọn lần xuất hiện gần nhất vào hoặc trước hôm nay. Bộ chọn phòng làm nổi bật các phòng đủ điều kiện và làm mờ các phòng không đủ điều kiện; chọn một phòng bị làm mờ cần nhân viên xác nhận.

### Người đón đáng tin cậy và người không được phép đón

Người đón là một thực thể thành viên, theo từng hộ gia đình: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, personId tùy chọn, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD là `GET /membership/householdpickup/:householdId` (bất kỳ người dùng hội thánh đã xác thực nào, để kiosk có thể đọc) cộng với `POST` / `DELETE` được giới hạn bởi `people.edit`. Nhân viên quản lý danh sách trên thẻ **Pickup** của trang người (`B1Admin/src/people/components/PickupPeople.tsx`) — ảnh, mối quan hệ, và một chip trạng thái Trusted/Not Authorized.

Khi trả trẻ (`B1Checkin/app/checkout.tsx`), kiosk tải danh sách người đón của hộ gia đình: các mục `trusted` hiển thị thành thẻ đón có thể chạm cùng lưới ảnh người lớn trong hộ, và một tên "Other" nhập tự do được so khớp mờ (Levenshtein, `src/helpers/PickupMatchHelper.ts`) với các mục `notAuthorized` — một kết quả khớp sẽ chặn việc trả trẻ bằng một bảng cảnh báo và nút **Override** của nhân viên. Việc ghi đè được ghi lại trên chính lượt đến: nó gửi `checkedOutBy` là `"OVERRIDE: {name}"` qua `POST /attendance/visits/checkout` thông thường, nên nó nằm trong bản ghi điểm danh và webhook `attendance.checkout` thay vì một bảng kiểm toán riêng.

### Nhắn tin cho phụ huynh và phát thanh khẩn cấp

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`) cung cấp hai endpoint SMS:

- `POST /page` — `{ visitId, message }`: nhắn tin cho người bảo hộ của một trẻ đã điểm danh (màn hình trả trẻ trên kiosk, chế độ có nhân viên).
- `POST /broadcast` — `{ serviceId, message }`: nhắn tin cho người lớn của mọi hộ gia đình đã điểm danh trong một dịch vụ (cài đặt quản trị kiosk, đằng sau một bảng xác nhận gõ `EMERGENCY` trong `B1Checkin/app/adminSettings.tsx`).

Cả hai đều xác định người lớn trong hộ qua cổng module thành viên, rồi chuyển việc gửi cho **`MessagingModuleGateway.sendBulkText`** (`Api/src/shared/modules/MessagingModuleGateway.ts`) — cánh cửa liên module vào nhà cung cấp nhắn tin đã cấu hình của hội thánh (`@churchapps/texting`: TextInChurch, Clearstream, hoặc MutualMinistry; không có bộ gửi SMS tích hợp sẵn). Cổng ghi một dòng `sentText` cùng các mục `deliveryLog` cho từng người nhận và giới hạn một đợt tối đa 500 người nhận; khi chưa cấu hình nhà cung cấp, nó trả về `no_provider`, và kiosk hiển thị "No SMS provider configured". `dispatch()` của controller loại bỏ trùng lặp số điện thoại và bỏ qua những người không có số di động hoặc được đặt `optedOut`, trả về `{ sent, failed, skippedOptedOut, skippedNoPhone }` để kiosk có thể hiển thị những gì đã bị bỏ qua.

## Kiosk (B1Checkin)

Các màn hình là tệp expo-router trong `B1Checkin/app/`; trạng thái giữa các màn hình nằm trong lớp tĩnh `CachedData` (`src/helpers/CachedData.ts`), không phải React state.

```
index (khởi động/đăng nhập tự động) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             tải serviceTimes, groups,    │             │  └─────────┘ └▶ addGuest  └▶ in nhãn,
             groupServiceTimes,           │             └▶ checkout (có nhân viên)     tự quay về
             labelTemplates               │                                            lookup
```

1. **Tra cứu** (`app/lookup.tsx`) — tìm theo số điện thoại (`GET /membership/people/search/phone?number=`, 4 số cuối hoặc đầy đủ) hoặc theo tên (`GET /membership/people/search?term=`). Chọn một kết quả sẽ tải hộ gia đình (`GET /membership/people/household/{householdId}`) và các lượt đến hiện có (`GET /attendance/visits/checkin`), gieo `pendingVisits` với các lựa chọn của tuần trước.
2. **Xem lại hộ gia đình** (`app/household.tsx`, `src/components/MemberList.tsx`) — mỗi dòng thành viên hiển thị huy hiệu đã điểm danh, huy hiệu dị ứng/`nametagNotes`, và các chip phòng hiện tại. Mở rộng một thành viên sẽ liệt kê mọi giờ dịch vụ kèm nút phòng cùng các chip loại điểm danh Member / Guest / Volunteer (`MemberServiceTimes.tsx`). Dưới tên mỗi giờ dịch vụ, `ServiceTimeHelper.getGroupSummary()` hiển thị các nhóm được tổ chức tại đó (tên trong `serviceTime.groups`, đã cắt khoảng trắng, loại bỏ trùng lặp không phân biệt hoa thường, nối bằng dấu phẩy); không hiển thị gì khi giờ đó không có nhóm.
3. **Phân công nhóm** (`app/selectGroup.tsx`) — cây danh mục xây từ `serviceTime.groups`, với các phòng đủ điều kiện theo tuổi/lớp được làm nổi bật và các phòng không đủ điều kiện bị làm mờ sau một xác nhận của nhân viên (xem [Đủ điều kiện theo tuổi/lớp](#đủ-điều-kiện-theo-tuổilớp-phía-kiosk)); chọn một phòng sẽ ghi một visitSession `{ session: { serviceTimeId, groupId } }` vào lượt đến đang chờ của người đó (`src/helpers/VisitSessionHelper.ts`). "None" xóa lựa chọn.
4. **Hoàn tất** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` với `pendingVisits` (mỗi lượt được đóng dấu `checkinType`), sau đó in nhãn nếu đã cấu hình máy in và tự quay về lookup. Phản hồi `409` do sức chứa hoặc `notOpen` hiển thị tên phòng cùng lý do (đầy/đóng, hoặc chưa mở điểm danh); cảnh báo tỷ lệ đưa ra xác nhận của nhân viên và gửi lại với `acknowledgeWarnings=true`.

Màn hình **trả trẻ** (`app/checkout.tsx`) nhận mã bảo mật 4 ký tự qua một ô nhập tự động lấy tiêu điểm — nhờ vậy máy quét mã vạch bàn phím USB/Bluetooth hoạt động không cần camera — hoặc một bàn phím số trên màn hình dùng cùng bảng chữ cái, tự gửi khi đủ 4 ký tự. Nút **Scan** mở một bảng với camera `src/components/CodeScanner.tsx` dùng chung (mặc định camera sau, nhận QR, Code 128 và Code 39) để các trạm không có máy quét bàn phím vẫn đọc được nhãn đón; mã được quét đi qua cùng đường `handleCode()` như nhập tay. Màn hình tra cứu mã, hiển thị các trẻ được đón, và trình bày **người đón đáng tin cậy** của hộ gia đình thành thẻ có thể chạm cùng lưới ảnh người lớn trong hộ (cộng với tùy chọn "Other" nhập tự do được kiểm tra mờ với tên không được phép — xem [Người đón đáng tin cậy và người không được phép đón](#người-đón-đáng-tin-cậy-và-người-không-được-phép-đón)), rồi gửi `POST /attendance/visits/checkout` với tên/id của người được chọn. Ở chế độ có nhân viên, màn hình cũng cung cấp **Page a parent** (`POST /attendance/checkin/page`) và **in lại nhãn bảo mật** — `reprint()` dựng lại nhãn của gia đình bằng `LabelHelper.getAllLabelsFor(...)` và đưa qua cùng đường `PrintUI` như khi điểm danh.

Tính cách của trạm là một cờ AsyncStorage `@StationMode` (`"self"` | `"manned"`, bật/tắt trong `app/adminSettings.tsx`). Chế độ có nhân viên thêm điểm vào trả trẻ trên màn hình tra cứu và chỉnh sửa hồ sơ từng thành viên (`POST /membership/people`) từ màn hình hộ gia đình. Độ cứng của kiosk được tích hợp sẵn: một PIN tùy chọn (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`) bảo vệ màn hình quản trị và máy in, màn hình quản trị chỉ mở khi chạm nhanh 7 lần vào logo tiêu đề, và một màn hình chờ khi không hoạt động (`src/hooks/useInactivityTimer.ts`) chiếm quyền giữa các gia đình.

## Tự điểm danh (B1App)

Thành viên điểm danh từ cổng b1.church tại màn hình `/mobile/checkin` (được định tuyến bởi `B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx` đến `screens/CheckinPage.tsx`). Nó yêu cầu người dùng đã đăng nhập và đi qua bốn bước giống kiosk — dịch vụ → hộ gia đình → nhóm → hoàn tất — với các endpoint giống hệt, trạng thái được giữ trong `B1App/src/helpers/CheckinHelper.ts`. Khác biệt so với kiosk: hộ gia đình lấy từ `householdId` của chính người dùng đã đăng nhập (không có bước tìm kiếm), và không có in nhãn — thay vào đó màn hình hoàn tất hiển thị mã bảo mật của đợt dưới dạng QR (`qrcode.react`) với gợi ý "show this at a check-in station". Nếu hộ gia đình đã được điểm danh khi trang tải, nút "Show check-in code" hiển thị lại QR từ lượt đến đầu tiên đã có (từ `GET /attendance/visits/checkin`) mang `securityCode`. Việc điểm danh được ghi ngay khi gửi (không có trạng thái chờ); QR chỉ phục vụ việc in nhãn tại kiosk.

**In nhãn từ điện thoại đến kiosk** (`B1Checkin/app/scan.tsx`, mở từ nút "Scan code" trên QR ở màn hình tra cứu): kiosk hiển thị `CodeScanner` (một `CameraView` của `expo-camera`, mặc định camera trước, có thể lật) để quét mã QR. `ScanCodeHelper.parse()` chỉ chấp nhận nội dung khi đó là một mã 4 ký tự trần trong bảng chữ cái mã bảo mật, và `ScanCodeHelper.isRepeat()` bỏ qua cùng mã trong 4 giây, nên cả QR của B1App lẫn khối QR trên nhãn in đều hoạt động. Màn hình sau đó đi theo đường in lại khi trả trẻ — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — rồi quay về lookup. Khi quét không có thao tác ghi điểm danh; chỉ in nhãn. Mã không có lượt đến đang hoạt động, trạm không có máy in, và nhóm không có nhãn mỗi loại sẽ hiển thị một thông báo nhanh và quay về lookup.

Các kiểu và `ApiHelper`/`ArrayHelper` đến từ `@churchapps/helpers` và `@churchapps/apphelper`; không có thành phần React nào được chia sẻ với B1Admin.

## Điểm danh phía quản trị (B1Admin)

- **Thiết lập** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`) hiển thị cây cơ cấu và tạo dịch vụ (`ServiceEdit.tsx`) và giờ dịch vụ (`ServiceTimeEdit.tsx`). Dữ liệu campus đến từ module thành viên qua hook `useCampuses()`.
- **Điểm danh thủ công** nằm ở phần Nhóm, không phải phần điểm danh: `B1Admin/src/groups/components/GroupSessionsTab.tsx` tạo buổi họp (`POST /attendance/sessions`; khi thêm, `SessionEdit.tsx` có thể bao gồm một buổi cho mỗi nhóm khác chia sẻ giờ dịch vụ đã chọn, bỏ qua các nhóm đã có buổi họp vào ngày đó) và đánh dấu người có mặt qua `POST /attendance/visitsessions/log`, endpoint này tìm hoặc tạo lượt đến cho người đó và buổi họp. Trưởng nhóm có thể ghi điểm danh cho nhóm của mình mà không cần quyền `attendance.edit` — các controller kiểm tra `au.leaderGroupIds`.
- **Báo cáo** — báo cáo xu hướng điểm danh và điểm danh nhóm là các báo cáo do máy chủ định nghĩa (`B1Admin/src/components/reporting/ReportWithFilter.tsx` với ReportingApi; định nghĩa trong `Api/reports/*.json`). Cả hai đều nhận `startDate`/`endDate` (ngày kết thúc bao gồm); báo cáo xu hướng mặc định từ một năm trước đến hôm nay và thêm cột `sessionDates` theo tuần, còn cây hiển thị trên màn hình của điểm danh nhóm bao gồm `checkinTime` của mỗi lượt đến và `membershipStatus` của người đó. CSV điểm danh nhóm đến từ báo cáo đi kèm `groupAttendanceDownload`, được xoay bởi `GroupAttendanceDownloadHelper` thành một dòng cho mỗi thành viên nhóm với một cột có mặt/vắng mặt theo từng buổi có ngày; lịch sử từng người là `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## In nhãn

### Mẫu và trình thiết kế

Hội thánh tự thiết kế nhãn trong B1Admin tại `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, mở từ trang cài đặt Check-In). Một mẫu là một dòng `labelTemplates` có `content` là một mảng JSON các khối — `text`, `field`, `barcode`, `qrcode`, hoặc `box` — mỗi khối được đặt theo tọa độ phần trăm với phông chữ, căn lề, bảng mã vạch (`code39`/`code128`/`qr`), và điều kiện hiển thị tùy chọn (ví dụ chỉ hiển thị hộp dị ứng khi `person.nametagNotes` không rỗng). Có hai `labelType`: `nametag` (một nhãn cho mỗi người đã điểm danh; các trường như `person.displayName`, `sessions`, `securityCode`, và `person.isBirthdayWeek` — `"true"` khi ngày/tháng sinh nhật nằm trong vòng 3 ngày kể từ hôm nay, bao quanh qua cuối năm, được tính bởi `LabelHelper.isBirthdayWithin()`) và `pickup` (một nhãn cho mỗi gia đình; các trường như `children`, `childrenAllergies`). Máy chủ thực thi duy nhất một mặc định cho mỗi loại trong mỗi hội thánh (`LabelTemplateController.save`). Trình thiết kế đi kèm các mẫu khởi đầu phản chiếu nhãn đi kèm của kiosk và xem trước với dữ liệu mẫu.

### Render và in trên kiosk

Khi hoàn tất điểm danh, `B1Checkin/src/helpers/LabelHelper.ts` quyết định in gì dựa trên các cờ nhóm trên mỗi lượt đến đang chờ: thẻ tên cho nhóm `printNametag`, cộng thêm một nhãn đón gia đình nếu có lượt đến nào vào nhóm `parentPickup`. Các lượt đến có `checkinType` là `volunteer` bị bỏ qua bởi `LabelHelper.selectChildVisits()`, nên một nhân viên trông trẻ trong phòng Parent Pickup sẽ không bao giờ kích hoạt nhãn đón. Mã bảo mật từ phản hồi điểm danh được đưa lên thẻ tên trẻ em và nhãn đón; thẻ tên người lớn in không có mã. Nếu hội thánh có mẫu, `LabelRenderer` (`src/helpers/LabelRenderer.ts`) biến các khối + ngữ cảnh trường thành một tài liệu HTML độc lập; nếu không, các nhãn HTML đi kèm trong `B1Checkin/assets/labels/` được dùng với thay thế placeholder.

Mã vạch được tạo dưới dạng SVG nội tuyến bởi các bộ mã hóa TypeScript thuần trong `B1Checkin/src/helpers/barcode.ts` — bảng mẫu Code 39 và bảng độ rộng Code 128 (tập mã B với checksum mod-103), cùng QR qua gói `qrcode`. **Các bộ mã hóa này được cố ý nhân bản trong B1Admin** (`LabelEditor.tsx` nhúng cùng các bảng, có ghi chú trong mã), để bản xem trước của trình thiết kế khớp từng điểm ảnh với đầu ra kiosk; thay đổi ở một nơi phải được phản ánh ở nơi kia.

Đường in (`src/components/PrintUI.tsx`) render mỗi nhãn HTML trong một `WebView`, chụp thành JPG qua `react-native-view-shot`, và chuyển các URI ảnh cho mô-đun Expo native **printer-helper** (`B1Checkin/modules/printer-helper/`). Mô-đun cung cấp `scan()`, `checkInit()`, `printUris()`, và các sự kiện trạng thái, với một nhà cung cấp cho mỗi hãng trên cả hai nền tảng:

| Hãng | Android | iOS | Ghi chú |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | Máy in mạng dòng QL (QL-800/810W/820NWB/1100/1110NWB…), nhãn cắt khuôn 29×90, mặc định được khuyến nghị |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | Khám phá mạng + in ảnh TCP/ZPL |

Việc chọn máy in nằm ở `app/printers.tsx` (quét mạng trả về các mục `brand~model~ip`; lựa chọn được lưu vào AsyncStorage), và `src/helpers/PrinterLog.ts` giữ một nhật ký chẩn đoán trên thiết bị, hiển thị qua một chấm trạng thái trực tiếp trên tiêu đề kiosk.

## Đăng ký khách

Có hai cách tạo người giữa lúc điểm danh:

- **Tại kiosk** — nút "Add guest" trên màn hình hộ gia đình mở `B1Checkin/app/addGuest.tsx`, màn hình này trước hết tìm `GET /membership/people/search?term=` một người không phải thành viên khớp sẵn, và nếu không có thì tạo mới bằng `POST /membership/people`, gắn vào hộ gia đình hiện tại. Khách sau đó đi qua phân công nhóm như mọi thành viên.
- **Tự phục vụ qua QR** — khi cài đặt hội thánh `enableQRGuestRegistration` được bật (cấu hình trong Check-In settings của B1Admin, đọc từ `GET /membership/settings/public/{churchId}`), màn hình tra cứu của kiosk hiển thị mã QR liên kết đến `https://{subdomain}.b1.church/guest-register?serviceId=`. Trang B1App đó (`src/app/[sdSlug]/(public)/guest-register/page.tsx`) cho phép một gia đình đến thăm tự đăng ký trên điện thoại của họ qua endpoint ẩn danh `POST /membership/people/guest-register`, giữ cho hàng chờ kiosk di chuyển. Bảng QR cũng có nút **Register here** mở cùng trang đó trên kiosk (`app/guestRegister.tsx`) trong một `WebView` ẩn danh, không dùng bộ nhớ đệm; `src/helpers/GuestRegisterHelper.ts` xây URL cho cả QR lẫn WebView và chặn điều hướng ra ngoài `https://{subdomain}.b1.church/guest-register`. Màn hình quay lại lookup khi bấm **Done**, nút quay lại, hoặc sau 120 giây không hoạt động (việc gõ biểu mẫu được chuyển từ WebView như là hoạt động), đồng thời gỡ WebView để các mục nhập của một gia đình không bao giờ đến được gia đình tiếp theo.

Đăng ký QR được điều khiển bởi các cài đặt hội thánh lưu từ thẻ **QR Guest Registration** trong B1Admin (`src/mobile/CheckInPage.tsx`):

| Cài đặt | Hiển thị | Mục đích |
|---|---|---|
| `enableQRGuestRegistration` | công khai | Công tắc đồng ý cho QR kiosk và các endpoint ẩn danh |
| `guestRegistrationFields` | công khai | Bản đồ JSON gồm `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments` → `"off"` / `"optional"` / `"required"`. Mặc định: email và điện thoại là tùy chọn, các trường còn lại tắt. Tên và họ luôn bắt buộc |
| `guestRegistrationImage` | công khai | URL ảnh tiêu đề; B1App hiển thị 16:9 thay cho biểu tượng trên biểu mẫu và màn hình xác nhận |
| `guestRegistrationGroupId` | riêng tư | Nhóm mà mọi đăng ký được thêm vào (khách không bao giờ thấy hoặc chọn nó) |
| `guestRegistrationRecordAttendance` | riêng tư | `"true"` để đồng thời ghi điểm danh cho nhóm đó |

`src/components/checkin/GuestRegister.tsx` của B1App lấy danh sách kiểm tra từ `GET /membership/people/guest-register/options?churchId=` ẩn danh và chỉ hiển thị các trường được bao gồm (email, điện thoại, tình trạng hôn nhân và địa chỉ trên người liên hệ chính; ngày sinh, giới tính và lớp cho mỗi thành viên; một ô ghi chú), và chỉ gửi những trường đó. Máy chủ áp dụng lại danh sách kiểm tra trong `GuestRegistrationHelper.sanitize()` — các trường tắt bị loại bỏ, giá trị bắt buộc còn thiếu hoặc nằm ngoài danh sách sẽ trả về 400 — trước khi `PersonHelper.registerGuestHousehold()` chạy. Trước hết nó gọi `PersonRepo.findGuestMatch()` cho mỗi thành viên có email hoặc điện thoại: đúng một người còn hoạt động có cùng tên và cùng email hoặc chữ số điện thoại được tái sử dụng (không có kết quả hoặc nhiều kết quả thì tạo người mới, nên nó không bao giờ đoán). Thành viên không có thông tin liên lạc được khớp theo tên trong hộ gia đình đã khớp. Người được tái sử dụng không bao giờ bị chỉnh sửa, nên một biểu mẫu ẩn danh không thể ghi đè thông tin đã lưu, và phản hồi lặp lại các tên đã gửi. Thành viên không khớp sẽ tham gia hộ gia đình đã khớp hoặc một hộ gia đình mới, với `membershipStatus: "Visitor"`, và phát `person.created` cho mỗi người mới. Sau đó, các lỗi được ghi nhật ký thay vì trả về: thành viên được thêm vào nhóm đã cấu hình (`group.member.added`); nếu bật ghi điểm danh, `AttendanceModuleGateway.recordAttendance()` đánh dấu mỗi thành viên có mặt cho mọi giờ dịch vụ của nhóm có lịch và có khung giờ điểm danh (`CheckinGateHelper.isServiceTimeOpen`) đang mở ngay lúc này, tạo buổi họp cho ngày theo múi giờ của hội thánh nếu cần — giờ dịch vụ không có lịch và đăng ký nằm ngoài khung giờ sẽ không ghi gì; và ghi chú thành một cuộc trò chuyện ghi chú ẩn trên người đứng đầu hộ gia đình (tác giả tin nhắn "Guest sign-up"), được liên kết qua `person.conversationId`.

## Trang liên quan

- [Attendance Endpoints](../api/endpoints/attendance) -- Toàn bộ REST cho campus, dịch vụ, buổi họp, lượt đến và lượt đến theo buổi
- [Membership Endpoints](../api/endpoints/membership) -- Người, hộ gia đình và nhóm
- [Webhooks](../api/webhooks) -- Các sự kiện `session.created`, `attendance.recorded` và `attendance.checkout`
- [Module Structure](../api/module-structure) -- Cách module điểm danh được tổ chức phía máy chủ
