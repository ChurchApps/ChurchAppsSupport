---
title: "Đăng ký sự kiện"
description: "Cách đăng ký sự kiện trong B1 Admin và B1App: loại người tham dự, tiện ích trả phí, mã giảm giá, thanh toán qua cổng quyên góp và chuyển từ danh sách chờ."
---

# Đăng ký sự kiện

<div class="article-intro">

Chức năng đăng ký sự kiện gốc nằm trong module nội dung. Kể từ đợt đăng ký có phí, chức năng này còn có một mô hình thương mại đầy đủ: loại người tham dự có giá, lựa chọn bổ sung có giá, mã giảm giá, thanh toán qua cổng quyên góp hiện có của hội thánh, và danh sách chờ theo trạng thái. Luồng thanh toán cố ý tái sử dụng hệ thống quyên góp. Controller đăng ký tính phí thông qua cùng lớp trừu tượng `GatewayService` / `IGatewayProvider` được mô tả trong [Quyên góp](./giving.md), nên không có dữ liệu thẻ hay SDK cổng thanh toán nào nằm trong module nội dung. Trang này trình bày mô hình dữ liệu, quy tắc giá và sức chứa, cùng các luồng đăng ký, thanh toán và danh sách chờ.

</div>

## Tổng quan

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (member portal)        │            │ Api — content module                        │
│  registration wizard ·       │   HTTPS    │  RegistrationController                     │
│  My Registrations            │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (server pricing) │
│ B1Admin (staff)              │            │  RegistrationHelper (emails)                │
│  event registration settings │            └───────────────┬─────────────────────────────┘
│  · roster · CSV export       │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ shared gateway abstraction (giving)         │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

Ba quy tắc sau được áp dụng xuyên suốt toàn bộ hệ thống:

1. **Máy chủ quyết định giá.** Client gửi id loại, id lựa chọn và số lượng. `RegistrationPricingHelper.computeTotal()` tính tổng ở phía máy chủ, và mã giảm giá được xác thực lại tại thời điểm thanh toán. Không bao giờ tin tưởng số tiền do client gửi lên.
2. **Sức chứa được kiểm soát nguyên tử tại thời điểm chèn dữ liệu.** Mọi thao tác chèn có giới hạn sức chứa đều dùng câu lệnh `INSERT … SELECT … FROM dual WHERE (count of active rows) < capacity`, nên hai lượt đăng ký đồng thời không thể cùng giành suất cuối cùng. Số lượng được suy ra từ trạng thái (`pending`/`confirmed`), không lưu trữ trực tiếp.
3. **Thanh toán đi qua cùng hệ thống với quyên góp.** `RegistrationController` gọi `GatewayService.processCharge` dùng chung với cổng thanh toán đã cấu hình của hội thánh. Đây là cùng lớp trừu tượng provider, cùng mô hình tokenization và cùng cách xử lý SCA như khi quyên góp.

## Mô hình dữ liệu (`Api/src/modules/content`)

Các model nằm trong `models/Registration.ts`. Ánh xạ bảng nằm trong `db/DatabaseTypes.ts`. Mỗi bảng có một repo riêng trong thư mục `repositories/`.

| Bảng | Ý nghĩa | Các trường chính |
|-------|---------|-----------|
| `registrations` | Một lượt đăng ký (một hộ gia đình hoặc nhóm cho một sự kiện) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | Một người tham dự trong một lượt đăng ký | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | Các loại người tham dự theo sự kiện (ví dụ: Người lớn / Trẻ em) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | Các lựa chọn bổ sung có tên và giá (ví dụ: áo thun) | eventId, name, description, **price**, **capacity**, **maxQuantity** (giới hạn cho mỗi lượt đăng ký), sort, active |
| `registrationSelectionChoices` | Số lượng một lựa chọn mà một lượt đăng ký/thành viên đã chọn | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | Một giao dịch thu tiền thành công trên một lượt đăng ký | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | Mã giảm giá theo từng sự kiện | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

Lưu ý:

- **Không có bảng danh sách chờ riêng.** Các nhóm trong danh sách chờ là những dòng trong `registrations` có `status = 'waitlisted'`. Toàn bộ vòng đời danh sách chờ là các chuyển đổi trạng thái trên chính bảng này.
- **Không lưu bộ đếm.** Các số liệu "đã bán" / "đã dùng" (sức chứa sự kiện, sức chứa theo loại, sức chứa theo lựa chọn, số lần sử dụng mã giảm giá) được tính bằng các truy vấn con tương quan trên những dòng có trạng thái thuộc `('pending','confirmed')` (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). Vì vậy, khi hủy một lượt đăng ký, sức chứa sẽ được giải phóng mà không cần thêm bước ghi sổ nào.
- Giá là cột DECIMAL của MySQL (truyền qua mạng dưới dạng chuỗi), được ép kiểu bằng `Number()` bên trong helper tính giá.

## Bề mặt REST

Mọi endpoint nằm dưới `/content/registrations` (`controllers/RegistrationController.ts`), được kiểm soát bởi `Permissions.registrations` (`view` / `edit`):

| Route | Truy cập | Mục đích |
|-------|--------|---------|
| `POST /register` | ẩn danh | Gửi đăng ký đầy đủ: khách, thành viên, hoặc nhân viên thêm người tham dự; tính giá ở máy chủ, kiểm tra sức chứa, thu tiền nếu có |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | công khai | Các loại và lựa chọn kèm `used` / `remainingCapacity` được tính sẵn cho wizard |
| `POST /types`, `DELETE /types/:id` (tương tự cho `/selections`, `/coupons`) | `registrations.edit` | CRUD cho phần cài đặt dành cho nhân viên |
| `POST /coupons/validate` | công khai | Xác thực mã giảm giá trực tiếp trong wizard |
| `GET /coupons/event/:eventId` | nhân viên | Danh sách mã giảm giá kèm số lần đã sử dụng |
| `GET /event/:eventId` · `GET /event/:eventId/count` | nhân viên · công khai | Danh sách đăng ký; số lượng đang hoạt động để hiển thị sức chứa |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | đã đăng nhập | Đăng ký của tôi, chi tiết, lịch sử thanh toán |
| `PUT /:id` | chủ sở hữu/nhân viên | Chỉnh sửa sau khi gửi: thay thế thành viên và lựa chọn bằng kiểm tra sức chứa nguyên tử mới, tính lại `totalAmount`; không bao giờ tự động thu tiền hoặc hoàn tiền |
| `POST /:id/pay` | chủ sở hữu | "Hoàn tất thanh toán": thu `totalAmount − amountPaid`, chuyển `waitlisted`/`pending` → `confirmed` |
| `POST /:id/promote` | nhân viên | Đưa thủ công từ danh sách chờ lên |
| `POST /:id/cancel` · `DELETE /:id` | chủ sở hữu · nhân viên | Hủy / xóa; cả hai đều kích hoạt tự động đưa người từ danh sách chờ lên |

Nếu cùng một `personId` đã có một lượt đăng ký chưa bị hủy cho cùng sự kiện, yêu cầu sẽ bị từ chối với mã 409. Mỗi lượt đăng ký được tạo sẽ phát một webhook `registration.created` qua `WebhookDispatcher`.

## Giá và mã giảm giá

`helpers/RegistrationPricingHelper.ts` là nguồn duy nhất cho mọi phép tính tiền:

- `computeTotal()` cộng giá loại của từng thành viên với `price × quantity` của từng lựa chọn đã chọn.
- `validateCoupon()` kiểm tra cờ hoạt động, khoảng thời gian (`startDate`/`endDate`), `minMembers` so với số người trong nhóm đã gửi, và `maxUses` so với số lần đã sử dụng được tính từ trạng thái.
- `applyDiscount()`: `percent` trừ `total × value/100`; `amount` trừ `value`; cả hai đều không xuống dưới 0.

Wizard gọi `POST /coupons/validate` để hiển thị phản hồi trực tiếp, nhưng `register` xác thực lại và áp dụng lại mã giảm giá ở máy chủ. Tổng tiền hiển thị ở client chỉ mang tính tham khảo.

## Kỹ thuật chèn nguyên tử để kiểm soát sức chứa

Mọi thao tác chèn có giới hạn sức chứa đều xử lý tranh chấp an toàn mà không cần transaction hay khóa, bằng cách đưa việc kiểm tra sức chứa vào chính câu lệnh `INSERT`. Ở cấp sự kiện (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

Nếu số dòng bị ảnh hưởng bằng 0 nghĩa là "đã đạt sức chứa". Kỹ thuật tương tự được dùng để bảo vệ việc chèn theo từng loại (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, đếm các thành viên được nối với các lượt đăng ký đang hoạt động) và số lượng theo từng lựa chọn (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, dùng `COALESCE(SUM(quantity),0) + ? <= capacity`). Khi việc chèn một thành viên hoặc lựa chọn bị lỗi giữa chừng, controller sẽ hoàn tác phần đăng ký đã tạo bằng `deleteCascade()` và thông báo loại hoặc lựa chọn nào đã hết chỗ.

## Luồng thanh toán

`processRegistrationCharge` trong controller là nơi duy nhất mà đăng ký chạm đến tiền. Hàm này chỉ là một client mỏng của hệ thống quyên góp:

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

Việc tokenization diễn ra trên trình duyệt, giống hệt như với quyên góp (xem [Quyên góp](./giving.md)). Wizard tái sử dụng registry provider thanh toán của apphelper, nên thành viên đã đăng nhập có thể thanh toán bằng thẻ đã lưu, còn khách thì tokenize một thẻ mới. Controller phản chiếu các điểm đặc thù của provider trong `DonateController`: id phương thức thanh toán `pm-{id}` của Kingdom Funding, và phản hồi `requires_action` của Stripe SCA được trả về client mà không ghi nhận giao dịch nào. Khi thu tiền thành công, hệ thống ghi một dòng `registrationPayments`, cộng dồn `amountPaid` và xác nhận lượt đăng ký. **Chưa triển khai hoàn tiền.** Một lượt đăng ký đã trả tiền rồi bị hủy sẽ giữ lại các dòng thanh toán, và việc hoàn tiền (nếu có) được xử lý ngoài hệ thống, trên bảng điều khiển của cổng thanh toán.

Cả hai điểm vào đều đi qua cùng một đường xử lý: `register` (trả tiền khi đăng ký) và `pay` (thanh toán số dư còn lại / hoàn tất khi được đưa từ danh sách chờ lên).

`register` bỏ qua bước thu tiền trong hai trường hợp và lưu lượt đăng ký ở trạng thái `pending` với `amountPaid = 0`, để toàn bộ số tiền còn lại là số dư phải thanh toán:

- **Nhân viên thêm người tham dự.** Nội dung yêu cầu có `personId` không phải của người gọi, không có `guestInfo`, và người gọi có `registrations.edit` trong hội thánh đó. Người được chỉ định phải tồn tại (nếu không trả về 404), bộ lọc thành viên hộ gia đình bị bỏ qua, và không thu tiền thẻ.
- **Không có cổng thanh toán.** Hội thánh chưa có cổng thanh toán quyên góp (`hasGateway` kiểm tra `gateway.loadAll`). Bước thanh toán của B1App sẽ hiển thị **Đăng ký và thanh toán sau** thay vì form thẻ.

Đăng ký có tính phí của khách (không có `au.id`) phải kèm `captchaPass` lấy từ `POST /giving/donate/captcha-verify`. `CaptchaPass.verify` (hiện nằm trong `shared/helpers`) chạy ngay trước khi thu tiền, nên đăng ký vào danh sách chờ hoặc miễn phí không bị ảnh hưởng. Khi `CAPTCHA_ENFORCE=true` và `captchaPass` bị thiếu hoặc không hợp lệ, lượt đăng ký mới sẽ bị hoàn tác bằng `deleteCascade()` và lời gọi trả về 403. `RegistrationPaymentForm` của B1App hiển thị ô đánh dấu reCAPTCHA cho khách và gửi pass kèm theo cả việc lưu thẻ lẫn lượt đăng ký.

## Vòng đời danh sách chờ

Khi sự kiện đã đầy và cờ `waitlistEnabled` của sự kiện được bật, `register` lưu nhóm ở trạng thái `waitlisted` (bỏ qua kiểm tra sức chứa) và gửi email xác nhận thông thường, đánh dấu là suất trong danh sách chờ. Việc đưa người lên có ba cách: `cancel`, `delete`, và endpoint `promote` dành cho nhân viên. Cả ba đều dẫn đến `RegistrationRepo.promoteFromWaitlist`, hàm này chọn dòng trong danh sách chờ lâu nhất và chuyển trạng thái của nó một cách nguyên tử:

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

Điều kiện `status='waitlisted'` đảm bảo các lần đưa lên đồng thời không thể đưa cùng một dòng hai lần. Truy vấn con kiểm tra sức chứa đảm bảo việc đưa lên không làm vượt quá số suất. Các dòng được đưa lên sẽ ở trạng thái `pending` chứ không phải `confirmed`, vì có thể vẫn còn số dư cần thanh toán. `RegistrationHelper.sendWaitlistAvailabilityEmail` thông báo cho người đăng ký rằng suất của họ đã có. Nếu `totalAmount − amountPaid > 0`, email sẽ chứa liên kết đến trang `/mobile/registrations` của B1 hội thánh (Đăng ký của tôi), được tạo từ `B1AppRoot` và subdomain của hội thánh. Khi họ thanh toán (hoặc không còn số dư), đăng ký được xác nhận.

:::info
Việc tăng sức chứa không tự động đưa người từ danh sách chờ lên. Nhân viên cần dùng thao tác Đưa lên trong danh sách đăng ký sau khi đã tăng sức chứa. Hủy và xóa thì đưa lên tự động.
:::

## Các bề mặt phía client

- **Wizard trên B1App**: một hook dùng chung, `B1App/src/components/registration/useEventRegistration.ts`, điều khiển cả thành phần trên website (`components/registration/EventRegister.tsx`) lẫn màn hình cổng thành viên trên di động (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`), qua các bước `info → members → selections → questions → payment → confirm`. Các bước ở giữa chỉ hiển thị khi sự kiện có lựa chọn, có biểu mẫu đính kèm, hoặc có tổng tiền khác 0. Bước thông tin và thành viên hiển thị bộ chọn theo từng loại người tham dự, kèm trạng thái sức chứa còn lại và trạng thái đã hết chỗ theo thời gian thực. Bước thanh toán (`RegistrationPaymentForm.tsx`) hiển thị tóm tắt đơn hàng, ô nhập mã giảm giá, và đối với thành viên đã đăng nhập là các phương thức thanh toán đã lưu thông qua registry provider của apphelper. Khách sẽ tokenize một thẻ mới. Màn hình di động **Đăng ký** (`screens/RegistrationsPage.tsx`) là Đăng ký của tôi: hiển thị trạng thái, số dư còn lại, nút Hoàn tất thanh toán (`POST /:id/pay`), Chỉnh sửa (`PUT /:id`: thông tin liên hệ, loại thành viên, số lượng lựa chọn) và Hủy.
- **Cài đặt trên B1Admin**: `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx` thêm công tắc Bật danh sách chờ cùng các mục thu gọn cho Loại người tham dự, Lựa chọn và Mã giảm giá (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`). Tất cả đều thao tác CRUD với các route `/types`, `/selections`, `/coupons`.
- **Danh sách trên B1Admin**: `B1Admin/src/registrations/RegistrationDetailsPage.tsx` gồm cột Loại theo từng người tham dự, cột Đã trả/Tổng kèm nhãn số dư, các nhãn đếm theo loại, hộp thoại chi tiết thanh toán (`RegistrationDetailDialog.tsx`, lấy từ `GET /payments/:registrationId`), thao tác Đưa lên cho danh sách chờ, và xuất CSV bao gồm loại người tham dự, lựa chọn, đã trả/tổng/số dư và câu trả lời cho các câu hỏi.

Các tra cứu giữa các module (tìm hoặc tạo người khách, tải thông tin hội thánh để gửi email) đều đi qua `getMembershipModuleGateway()`. Module nội dung không bao giờ đọc trực tiếp các bảng của module thành viên.

## Trang liên quan

- [Quyên góp](./giving.md): lớp trừu tượng cổng thanh toán, registry provider và mô hình tokenization mà tính năng này tái sử dụng
- [Endpoint nội dung](../api/endpoints/content.md): bề mặt REST của module nội dung
- [Webhook](../api/webhooks.md): sự kiện `registration.created`
- [Cấu trúc module](../api/module-structure.md): cách tổ chức module nội dung phía máy chủ
