# MinistryStuff (Lưu trữ & Nhắn tin trả phí)

MinistryStuff.org là dịch vụ trả phí riêng biệt, tài trợ cho hai thứ mà ChurchApps không thể cung cấp miễn phí: lưu trữ tệp dung lượng lớn (1TB trở lên) và tín dụng SMS. Cả hai được bán dưới dạng gói đăng ký hàng tháng với mức phí cố định. Bản thân ChurchApps vẫn hoàn toàn miễn phí. Không có tính năng nào trong B1 yêu cầu đăng ký MinistryStuff, và mỗi điểm tích hợp đều là một provider seam mà bên thứ ba cũng có thể triển khai.

## Các thành phần

| Thành phần | Kho mã | Vai trò |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (cổng 8097 khi phát triển) | Thanh toán (Stripe), gửi SMS và sổ cái tín dụng (AWS End User Messaging), lưu trữ (S3 + theo dõi hạn mức). Một cơ sở dữ liệu MySQL duy nhất `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (cổng 3103 khi phát triển) | ministrystuff.org: trang giới thiệu tiếp thị, bảng giá và cổng tài khoản (gói dịch vụ, mức sử dụng, chuyển hướng đến Stripe Checkout/Customer Portal). |
| Nhà cung cấp nhắn tin | `Packages/texting` → `MinistryStuffProvider` | Đăng ký với tên `ministrystuff`, cùng với Clearstream/TextInChurch. |
| Provider seam lưu trữ | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (mặc định, miễn phí) bọc lại cơ chế chuyển đổi S3/đĩa ban đầu; `FileStorageHelper` ủy quyền cho provider mặc định mà không thay đổi gì. |
| Kết nối Api | Các module nội dung + nhắn tin của `Api/` | `MinistryStuffStorageProvider` + `StorageResolver` (nội dung), chèn service key vào `TextingConfigHelper` (nhắn tin), bảng `storageProviders`, các endpoint `/content/storage/*` + `/messaging/texting/credits`. |

## Danh tính & tin cậy

- Cùng tài khoản, cùng nhà thờ: MinistryStuffApi xác minh JWT của ChurchApps bằng `JWT_SECRET` dùng chung (mô hình ứng dụng anh em, giống B1Transfer). Cổng thông tin đăng nhập qua MembershipApi và chấp nhận chuyển giao `?jwt=`.
- Giao tiếp giữa máy chủ với máy chủ (Api lõi → MinistryStuffApi): header `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, cả hai phía) cùng với `churchId` tường minh. Quyền sử dụng luôn được kiểm tra dựa trên gói đăng ký của nhà thờ đó. Nhà thờ không bao giờ giữ thông tin xác thực MinistryStuff. Chỉ cần chọn provider trong B1Admin là đủ.

## Luồng nhắn tin

B1Admin Send Text → `TextingController` của Api → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → số phân đoạn tin nhắn được trừ vào `smsCreditGrants` của kỳ thanh toán hiện tại → AWS End User Messaging (hoặc `smsMode: mock` khi phát triển). Tín dụng là **giới hạn cứng**: khi hết tín dụng, toàn bộ yêu cầu bị từ chối (`insufficient_credits`, hiển thị thành lời nhắc nâng cấp thân thiện trong B1Admin). Không gửi một phần, cũng không tính phí vượt mức. Các khoản tín dụng được cấp một cách idempotent cho mỗi kỳ thanh toán từ các webhook `invoice.paid` của Stripe. Danh sách từ chối nhận tin (`smsOptOuts`) được lọc trước mỗi lần gửi.

Các đường dẫn khác cũng đi qua provider seam này mà không cần đi qua `TextingController`: cảnh báo check-in (`CheckinController` → `MessagingModuleGateway.sendBulkText`) và hành động bước **Send Text** trong quy trình công việc (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, ghi các bản ghi `sentTexts` và `deliveryLogs` với người gửi là null). Các trường gộp (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) được `MergeFieldHelper.resolve` thay thế cho từng người nhận, và kết quả được giới hạn ở 1.600 ký tự. Trong `TextingController`, một tin nhắn nhóm có chứa `{{` sẽ được gửi dưới dạng một `sendMessage` cho mỗi người nhận thay vì một `sendBulk` duy nhất. Tin nhắn không có trường gộp vẫn được gửi dưới dạng một lần gửi hàng loạt.

## Luồng lưu trữ

Bản ghi provider của nhà thờ (`content.storageProviders`, được quản lý trong B1Admin → Settings → File Storage) quyết định nơi lưu các tệp tải lên **mới**. `contentPath` là URL tuyệt đối cho từng tệp, nên các provider khác nhau có thể cùng tồn tại mà không cần di chuyển dữ liệu: các tệp cũ vẫn được phục vụ từ `content.churchapps.org`, còn các tệp mới từ `content.ministrystuff.org`. Luồng tải lên đi từ Api → `StorageResolver.forChurch` → `store`/`getUploadUrl` của provider (presigned POST với `content-length-range` ở chế độ S3; dự phòng base64 ở chế độ đĩa/phát triển). Thao tác xóa được định tuyến theo URL đã lưu (`StorageResolver.forUrl`). Hạn mức là số byte của gói, được đếm từ `storageObjects` (các mục `stored` + các phần giữ chỗ `pending`). Khi vượt hạn mức, các lần tải lên mới sẽ bị chặn (`storage_quota_exceeded`). Không có gì bị xóa hay bị tính phí thêm. Gói miễn phí của ChurchApps không thay đổi (giới hạn giống như trước đây; không có hạn mức toàn nhà thờ).

Lưu ý về phạm vi: việc chọn provider chỉ áp dụng cho luồng **tệp/tài nguyên** nội dung (nơi lưu trữ phương tiện dung lượng lớn). Việc tải lên thư viện ảnh, logo và ảnh vẫn dùng provider mặc định, vì các chức năng này liệt kê khóa từ kho lưu trữ và tự xây dựng URL ở phía client, nên việc gắn gốc theo từng nhà thờ chưa áp dụng được.

Cùng seam này cũng hỗ trợ [Bring-Your-Own Storage](./byos-storage.md): nhà thờ có thể liên kết Google Drive, Dropbox, OneDrive hoặc bucket tương thích S3 của riêng mình thay vì đăng ký gói MinistryStuff.

## Thanh toán

Stripe Checkout (được lưu trữ bởi Stripe) dùng để đăng ký, và Stripe Customer Portal dùng để cập nhật thẻ, hủy đăng ký và xem hóa đơn. MinistryStuffWeb không có biểu mẫu thẻ. Mỗi cặp (nhà thờ, sản phẩm) có một hàng `subscriptions`. Các gói và cấp độ được định nghĩa trong mã (`MinistryStuffApi/src/helpers/Plans.ts`), còn các ID giá Stripe lấy từ cấu hình. Webhook (`/billing/webhook`, xác minh chữ ký trên raw-body, khử trùng lặp qua `webhookEvents`) điều khiển vòng đời đăng ký: active → past_due (ân hạn) → canceled.

## Thiết lập môi trường phát triển

Chạy MinistryStuffApi (`yarn dev`, cổng 8097; cần tệp `.env` có `JWT_SECRET` dùng chung + `MINISTRYSTUFF_SERVICE_KEY`), và đặt cùng service key đó trong `Api/.env`. `Api/config/dev.json` đã trỏ `ministryStuffApi` đến `localhost:8097`. MinistryStuffWeb cần tệp `.env` với `VITE_STAGE=dev`. Môi trường phát triển dùng `smsMode: mock` và lưu trữ trên đĩa, nên không cần AWS.
