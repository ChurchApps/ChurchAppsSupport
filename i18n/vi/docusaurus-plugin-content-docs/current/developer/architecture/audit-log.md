---
title: "Nhật ký kiểm toán & Lô có thể hoàn tác"
description: "Mô tả nhật ký kiểm tra API ghi lại mọi thay đổi của người dùng qua các module, và cách hoàn tác từng dòng trong các đợt nhập liệu trong B1 Admin."
---

# Nhật ký kiểm toán & Lô có thể hoàn tác

<div class="article-intro">

Mọi thao tác thay đổi dữ liệu do người dùng thực hiện trong Api đều được ghi lại, gồm ai, làm gì, khi nào và từ đâu, trên tất cả các module, mà không cần thiết lập riêng cho từng controller. Phía trên lớp ghi nhận này là một lớp lô: một thao tác nhập hoặc hành động hàng loạt có thể được gắn thẻ là một lô và sau đó được **hoàn tác** từng dòng một, theo kiểu Planning Center. Cả hai đều nằm trong một bảng `auditLogs` duy nhất trong cơ sở dữ liệu membership và được điều khiển hoàn toàn từ một điểm chặn chung, `BaseController.actionWrapper`. Trang này mô tả những gì được ghi nhật ký, dữ liệu được lưu ở đâu, các đánh đổi về hiệu năng đã định hình thiết kế, và cách hoàn tác đảo ngược một lô một cách an toàn mà không cần giao dịch xuyên cơ sở dữ liệu.

</div>

## Tổng quan

```
every mutating request (POST/PUT/PATCH/DELETE)
        │
        ▼
BaseController.actionWrapper ──▶ derive {module, entityType, category, action}
        │                         from req.baseUrl + method  (AUDIT_REGISTRY = overrides/opt-outs only)
        │
        ├─ normal mode ─────────▶ run action ─▶ await AuditLogHelper.log(after-values)  ──┐
        │                                        (deletes also capture a before-image)     │
        │                                                                                  ▼
        └─ X-Batch-Id present ──▶ snapshot before-images (strict) ─▶ run action ─▶ audit rows tagged batchId
                                                                                           │
                                                                                           ▼
                                                             auditLogs  (membership DB, one table, all modules)
                                                                                           │
   POST /membership/batches/:id/undo ──▶ BatchUndoHelper ──▶ walk rows reverse, per entity ┘
                                          conflict guard → restore / delete / re-insert
```

Hai đặc điểm cấu trúc chi phối mọi nội dung bên dưới:

1. **Chỉ lớp controller mới biết người thực hiện.** Repository không bao giờ nhìn thấy `AuthenticatedUser`; chỉ controller giữ `au`. Mọi controller của mọi module đều đi qua `BaseController.actionWrapper`, nên việc ghi nhật ký được gắn vào đó. Không có chữ ký repository nào thay đổi.
2. **Một bảng phục vụ tất cả module.** Các dòng nhật ký cho quyên góp, điểm danh, nội dung, v.v. đều được ghi vào bảng `auditLogs` của cơ sở dữ liệu membership thông qua `RepoManager.getRepos("membership")`, ngay cả khi từ một controller không thuộc membership. Nhờ vậy, câu hỏi "Jane đã thay đổi những gì hôm nay" chỉ cần một truy vấn duy nhất.

## Những gì được ghi nhật ký

Việc ghi nhật ký **bật mặc định cho mọi động từ thay đổi dữ liệu trên mọi route**. `actionWrapper` suy ra các trường nhật ký từ yêu cầu mà không cần cấu hình riêng cho từng route:

| Trường | Suy ra từ |
|-------|--------------|
| `module` | `this.moduleName` (module sở hữu) |
| `entityType` | dạng số ít của đoạn cuối `req.baseUrl` (ví dụ `/membership/people` → `person`) |
| `category` | mặc định bằng `entityType` |
| `action` | `${entityType}_saved` với `POST /`, `${entityType}_deleted` với `DELETE /:id`, còn lại là `${entityType}_${method}:${routePath}`, nên các route con không theo CRUD (ví dụ `task_post:/:id/move`) được ghi lại tự động |

`BaseController.AUDIT_REGISTRY` **chỉ dùng cho ghi đè và loại trừ** — nó không phải danh sách cho phép. Một route xuất hiện ở đó để đổi tên category/entityType, để khai báo `{ dbModule, table }` (qua đó route có thể được gom lô và hoàn tác), để đánh dấu `sensitive` (ghi nhật ký các thay đổi ẩn danh), hoặc để tắt bằng `optOut: true`.

**Danh sách loại trừ** (các đường ghi có khối lượng lớn, dễ làm ngập nhật ký): `visits` / `visitsessions` / `sessions` / `checkin` của điểm danh (đợt bùng nổ check-in Chủ nhật) và `messages` / `connections` / `devices` của nhắn tin (trò chuyện và trạng thái trực tuyến). Mọi thứ khác đều được ghi nhật ký.

**Các endpoint hàng loạt** (`people/bulk-delete`, `people/bulk-update`, `groupmembers/bulk-add`, `groupmembers/bulk-remove`) được đăng ký trong `BULK_ROUTES` và ghi **một dòng nhật ký cho mỗi id bị tác động**, nên một lần nhập 10.000 người sẽ tạo ra 10.000 dòng. Chính độ chi tiết theo từng thực thể này làm cho lô có thể hoàn tác.

**Thay đổi ẩn danh** (`actionWrapperAnon` — quyên góp của khách, đăng ký khách, gửi biểu mẫu) chỉ được ghi nhật ký với các route được đánh dấu `sensitive` trong registry, với `userId="anonymous"` cùng địa chỉ IP của client. Quyên góp đứng đầu danh sách; đường này có lịch sử hồi quy thực sự.

### Che giấu dữ liệu nhạy cảm và giới hạn kích thước

Trước khi bất kỳ payload `details` nào được lưu, `AuditLogHelper.capDetails()` chạy `sanitizeValue()` trên nó:

- **Các khóa bí mật được che.** Bất kỳ trường nào có tên viết thường nằm trong `SENSITIVE_KEYS` (`password`, `token`, `cvv`, `cardnumber`, `routing_number`, `accesstoken`, `clientsecret`, …) đều được thay bằng `"[redacted]"`.
- **Các giá trị lớn bị loại bỏ.** Bất kỳ URI `data:` nào hoặc chuỗi dài hơn 4 KB (ảnh base64, blob) đều trở thành `"[stripped]"`.
- **Dòng quá lớn bị giới hạn.** Nếu JSON đã tuần tự hóa vượt khoảng 64 KB, toàn bộ payload được thay bằng `{ truncated: true }`. Các dòng bị cắt vẫn có thể xem được — nhưng **không thể hoàn tác** (không có ảnh trước/sau để khôi phục).

## Dữ liệu được lưu ở đâu

Một bảng `auditLogs` duy nhất trong cơ sở dữ liệu **membership** phục vụ mọi module. Các cột: `id, churchId, userId, category, action, entityType, entityId, details (chuỗi JSON MEDIUMTEXT), ipAddress, module, batchId, created`. Migration `tools/migrations/membership/2026-07-04_audit_universal.ts` thêm `module` và `batchId`, nâng `details` từ `TEXT` lên `MEDIUMTEXT`, thêm các chỉ mục `ix_auditLogs_batch (batchId)` và `ix_auditLogs_entity (churchId, module, entityType, entityId, created)`, và tạo bảng `batches`. Cột `module` tồn tại chính để các `entityType` trùng nhau giữa các module (`note`, `setting` có ở nhiều nơi) vẫn có thể lọc được; còn chỉ mục theo thực thể là thứ phục vụ cả lịch sử từng thực thể lẫn bộ kiểm tra xung đột khi hoàn tác.

Các lần ghi xuyên module đi qua `RepoManager.getRepos("membership")` từ bên trong wrapper. Thứ tự là có chủ đích: **thao tác ghi chính được commit trong cơ sở dữ liệu của module trước, rồi mới đến thao tác chèn nhật ký.** Ở chế độ thường, lỗi khi chèn nhật ký được nuốt đi (`console.error`, Sentry sẽ ghi nhận); nhật ký chỉ mang tính tham khảo và không bao giờ được làm hỏng yêu cầu của người dùng. Ở **chế độ lô** thì nó nghiêm ngặt (xem bên dưới).

:::info Vì sao không dùng trigger, CDC hay bảng riêng cho từng module?
- **Trigger của MySQL** không biết người dùng đang thao tác (kết nối không có `au`), và sẽ đòi hỏi duy trì bộ trigger trên mọi schema.
- **binlog / CDC** là một dự án hạ tầng lớn với cùng vấn đề về danh tính người thực hiện.
- **Truyền `userId` qua mọi repository** sẽ đụng đến hàng trăm tệp chỉ để chuyển thông tin mà lớp controller vốn đã có.
- **Bảng nhật ký riêng cho từng module** sẽ tốn gấp 7 lần công sức và các truy vấn phân tán cho mọi câu hỏi xuyên module. Một bảng duy nhất tại điểm chặn controller là thiết kế ít mã nhất vẫn ghi được người thực hiện.
:::

## Lập trường về hiệu năng

Đường đi nóng được thiết kế để rẻ; chi phí chỉ được trả ở những nơi nó mang lại giá trị.

- **Không đọc trước khi ghi ở các lần cập nhật thường.** Lần lưu thông thường **không** tải bản ghi cũ. Các **giá trị sau khi gửi** được lưu trong `details.after`; giao diện tái dựng giá trị cũ→mới vào lúc *xem* bằng cách so sánh với dòng nhật ký trước đó của thực thể. Một truy vấn lúc xem, không tốn chi phí lúc ghi. Các trường chưa từng bị thay đổi kể từ khi ra mắt đơn giản sẽ không hiện giá trị "cũ" — điều này được chấp nhận.
- **Thao tác xóa có ảnh trước.** `DELETE /:id` trên một route trong registry có `{ dbModule, table }` sẽ tải dòng đó theo cách tổng quát trước và lưu vào `details.before`. Thao tác xóa hiếm gặp và ảnh trước chính là toàn bộ giá trị pháp y.
- **Chế độ lô là nơi duy nhất có đọc trước khi ghi có tính hệ thống**, và nó là tùy chọn — thao tác hàng loạt/nhập vốn đã tốn kém, nên N lần đọc ảnh chụp là cái giá để có thể hoàn tác.
- **Thao tác chèn nhật ký được chờ (await).** `actionWrapper` gom các promise ghi nhật ký và `await Promise.allSettled(...)` trước khi trả về. Đây là bất biến quan trọng nhất: trên Lambda, container bị đóng băng ngay khi phản hồi được trả về, nên một lần chèn không được chờ sẽ bị mất âm thầm. "Gửi rồi quên" ở đây có nghĩa là *lỗi không bao giờ làm hỏng yêu cầu*, chứ không phải *không chờ* — một lần chèn trên pool membership đã nóng chỉ mất khoảng 1–3 ms.

## Lô và hoàn tác

Một **lô** nhóm một tập các thay đổi để có thể xem xét và đảo ngược cùng nhau. Có hai cách mở lô:

- **Tường minh:** `POST /membership/batches { label, source }` trả về `batchId`. Client (B1Transfer, giao diện nhập của B1Admin) sau đó gửi `X-Batch-Id: <id>` trên mọi lần lưu/xóa tiếp theo. `POST /membership/batches/:id/complete` đóng lô và ghi `itemCount`.
- **Ngầm định:** bốn endpoint hàng loạt tự mở, điền và hoàn thành lô của chúng trong cùng một yêu cầu, trả về `batchId` trong phản hồi.

Bảng `batches` (cơ sở dữ liệu membership): `id, churchId, userId, label, source, status (open|completed|undone|partial|failed), itemCount, created, completedAt, undoneAt`.

### Chế độ lô rất nghiêm ngặt

Khi có `X-Batch-Id`, `actionWrapper` siết chặt mọi kiểm tra (`writeBatchAuditRows`):

1. Lô phải tồn tại, ở trạng thái `open`, và thuộc về `au.churchId` — nếu không sẽ trả về **403**.
2. Route phải hỗ trợ lô (`{ dbModule, table }` trong registry) — nếu không sẽ trả về **400**.
3. Trước khi thao tác chạy, ảnh trước của mọi id bị ảnh hưởng được tải bằng **một** truy vấn `WHERE id IN (...) AND churchId = ?`. Nếu việc đọc ảnh chụp này thất bại, yêu cầu **thất bại với 500 và thao tác không được thực thi** — chế độ lô không bao giờ được tạo ra một sổ nhật ký không thể hoàn tác mà không báo lỗi. (Ngược lại, chế độ thường chỉ ở mức nỗ lực tốt nhất và nuốt lỗi chụp ảnh.)
4. Sau khi thao tác thành công, một dòng nhật ký cho mỗi thực thể được ghi với `batchId`, `details.before` và `details.after`, cùng một **dấu hiệu tạo** tường minh cho các dòng do lô tạo ra.

### Hoàn tác

`POST /membership/batches/:id/undo` (quyền: người tạo lô hoặc `Permissions.server.admin`). Nó từ chối nếu lô không ở trạng thái `completed` hoặc đã cũ hơn **cửa sổ hoàn tác 30 ngày**. Sau đó `BatchUndoHelper.undo()`:

1. Tải các dòng nhật ký của lô và **nhóm chúng theo `(module, entityType, entityId)`.** Một thực thể bị chạm nhiều lần trong cùng một lô sẽ được đảo ngược **một lần**, về đúng trạng thái trước lô — ảnh trước sớm nhất, hoặc một thao tác xóa nếu lô đã tạo ra nó. Đây là lý do việc hoàn tác không chỉ đơn giản phát lại từng dòng: khôi phục một ảnh chụp trung gian giữa chừng lô sẽ là sai.
2. Với mỗi thực thể, chạy **bộ kiểm tra xung đột trước tiên**: `auditLog.hasLaterModification()` kiểm tra xem có bất kỳ mục nhật ký *muộn hơn* nào cho cùng `(module, entityType, entityId)` nằm ngoài lô này không. Nếu có, thực thể đã được sửa sau khi nhập — nó sẽ **bị bỏ qua và báo cáo**, không bao giờ bị ghi đè. Cơ chế này dùng chính nhật ký kiểm toán làm bộ phát hiện thay đổi; không cần cột `modifiedAt` trên bất kỳ bảng nào.
3. Đảo ngược theo thao tác đã ghi, phân giải `{ dbModule, table }` từ registry và dùng các thao tác ghi Kysely tổng quát:
   - **đã tạo** → xóa cứng dòng.
   - **đã cập nhật** → ghi lại `details.before`.
   - **đã xóa** → chèn lại `details.before` (cập nhật hoặc chèn nếu một dòng có id đó đã xuất hiện lại).
4. Mỗi thao tác đảo ngược cũng được ghi nhật ký (`action: "<entityType>_undone"`, không có `batchId` — hoàn tác của hoàn tác nằm ngoài phạm vi).

Thao tác được chọn dựa trên **dấu hiệu tạo** tường minh, không suy ra từ việc thiếu ảnh trước — một ảnh trước rỗng hợp lệ hoặc một dòng bị cắt không được nhầm thành thao tác tạo.

Payload kết quả là `{ restored, skippedConflicts: [...], failed: [...], status }`; lô chuyển sang `undone` (nếu sạch) hoặc `partial`. **Không có giao dịch xuyên cơ sở dữ liệu** — việc hoàn tác là nỗ lực tốt nhất cho từng dòng, cùng giới hạn mà Planning Center ghi nhận đối với hồ sơ đã gộp.

:::warning Các thực thể có hiệu ứng phụ cần hook `onUndo`
Đảo ngược thao tác tạo `groupMember` cũng phải ghi `groupMemberHistory` ("left"), nếu không phân tích tỷ lệ rời bỏ sẽ bị hỏng âm thầm — đây là một bất biến cố định của workspace. Các thực thể như vậy đăng ký một callback `onUndo` trong `AUDIT_REGISTRY`, trả về `true` khi nó đã xử lý trọn vẹn việc đảo ngược, qua đó bỏ qua đường đi tổng quát. `groupMembers` là trường hợp chuẩn mẫu (được khóa theo id dòng trên đường tường minh nhưng theo `personId` trên các endpoint hàng loạt, và được theo dõi lịch sử ở mọi lần thêm/xóa).
:::

## Các bề mặt tiêu thụ

Cả hai giao diện quản trị đều **đang được phát triển**; mục tiêu như sau:

| Bề mặt | Repo | Mục đích |
|---------|------|---------|
| **Trang Nhật ký kiểm toán** | B1Admin (ManageChurch → Audit Log) | Lọc theo module/category/người dùng/thực thể và hiển thị khác biệt cũ→mới — với chỉnh sửa thì so với mục trước của thực thể, với xóa thì lấy từ `details.before`. Dữ liệu từ `GET /membership/auditlogs`, yêu cầu `Permissions.server.admin`. |
| **Trang Lô** | B1Admin (cùng trung tâm Cài đặt) | Liệt kê lô với trạng thái và số lượng, **Xem kết quả** (các dòng nhật ký của lô qua `GET /membership/batches/:id/results`), và nút **Hoàn tác** hiển thị báo cáo các xung đột bị bỏ qua / thất bại. |
| **Lô nhập** | B1Transfer | Mở một lô, gửi `X-Batch-Id` trên các lần lưu thông thường, hoàn thành khi kết thúc — việc nhập trở nên có thể hoàn tác mà không cần endpoint nhập mới nào. `importKey` cũ được giữ lại như một dấu vết nguồn gốc chỉ dành cho việc tạo, và đã được thay thế cho mục đích hoàn tác. |

## Những cạm bẫy mà một thay đổi trong tương lai không được làm hỏng

- **Các thao tác chèn nhật ký phải luôn được chờ.** `AuditLogHelper.log(...)` không được chờ sẽ bị mất do Lambda đóng băng. Gom các promise và `await Promise.allSettled` trước khi trả về.
- **Kysely bỏ `undefined` khỏi `.set()`/`.values()`.** Khi khôi phục, một cột bị xóa trắng sẽ không bị ghi đè. `BatchUndoHelper` chuyển mọi trường vắng mặt thành `null` tường minh (`nullify`) — đừng bao giờ bỏ qua bước này để có một lần ghi trực tiếp "nhanh hơn".
- **Thời gian lưu giữ phải luôn cao hơn nhiều so với cửa sổ hoàn tác.** `AuditLogRepo.deleteOld()` chạy theo bộ hẹn giờ hằng đêm (mặc định lưu giữ 365 ngày); cửa sổ hoàn tác là 30 ngày. Nếu thời gian lưu giữ bị hạ xuống gần cửa sổ đó, các nhật ký hoàn tác có thể bị xóa ngay khi lô vẫn đang mở.
- **Các dòng bị cắt không thể hoàn tác.** Payload `{ truncated: true }` không có ảnh trước/sau; việc hoàn tác báo cáo nó là `failed`, không bao giờ đoán mò.
- **Thứ tự là ghi module trước, nhật ký sau.** Không bao giờ đưa thao tác chèn nhật ký lên trước thao tác ghi thực, và giữ chế độ nghiêm ngặt trong lô / chỉ mang tính tham khảo ở chế độ thường.

## Danh mục tệp

| Khu vực | Tệp |
|------|-------|
| Wrapper / registry | `Api/src/shared/infrastructure/BaseController.ts` (`AUDIT_REGISTRY`, `BULK_ROUTES`, `actionWrapper`, `actionWrapperAnon`, chụp ảnh + ghi các dòng) |
| Bộ máy hoàn tác | `Api/src/shared/infrastructure/BatchUndoHelper.ts` |
| Bộ trợ giúp nhật ký | `Api/src/modules/membership/helpers/AuditLogHelper.ts` (`log`, `capDetails`/`sanitizeValue`, `diffFields`, `getClientIp`) |
| Controller | `Api/src/modules/membership/controllers/AuditLogController.ts`, `BatchController.ts` |
| Model / repo | `Api/src/modules/membership/models/AuditLog.ts`, `Batch.ts`; `repositories/AuditLogRepo.ts` (`loadFiltered`, `loadForBatch`, `hasLaterModification`, `deleteOld`), `BatchRepo.ts` |
| Migration | `Api/tools/migrations/membership/2026-07-04_audit_universal.ts` |
| Giao diện quản trị (đang phát triển) | Các trang Audit Log + Batches của B1Admin; phần đầu lô nhập của B1Transfer |

## Trang liên quan

- [Cấu trúc module](../api/module-structure.md) — cách một controller không thuộc membership truy cập các repository membership qua `RepoManager`
- [Quyên góp](./giving.md) — các đường ghi quyên góp được ghi nhật ký là `sensitive` ngay cả khi ẩn danh
- [Endpoint Membership](../api/endpoints/membership.md) — bề mặt REST mang `X-Batch-Id` và cung cấp `/auditlogs` và `/batches`
