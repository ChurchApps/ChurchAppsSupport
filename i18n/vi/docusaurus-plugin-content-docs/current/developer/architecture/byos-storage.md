---
title: "Lưu trữ tự mang"
---

# Lưu trữ tự mang (BYOS)

Các hội thánh được cấp khoảng 100MB lưu trữ tệp miễn phí trên hệ thống (các phần `/content/files`: Tệp của trang web, tài nguyên nhóm). BYOS cho phép hội thánh liên kết dịch vụ lưu trữ đám mây riêng của mình — **Google Drive, Dropbox, OneDrive, hoặc bất kỳ bucket tương thích S3 nào (AWS S3, Cloudflare R2, Backblaze B2)** — để các tệp tải lên mới được lưu vào tài khoản riêng của hội thánh, không bị giới hạn bởi nền tảng. ChurchApps vẫn miễn phí; giới hạn duy nhất là tài khoản riêng của hội thánh.

## Điểm nối nhà cung cấp

BYOS tái sử dụng lớp lưu trữ đã được xây dựng cho [MinistryStuff](./ministrystuff): `IStorageProvider` (`Packages/apihelper`) được `StorageResolver` xác định theo từng hội thánh dựa trên bảng `content.storageProviders`. Khác với các nhà cung cấp singleton `churchapps`/`ministrystuff`, nhà cung cấp BYOS giữ thông tin xác thực riêng cho từng hội thánh, nên `StorageResolver.forChurch` tạo một thể hiện mới cho mỗi yêu cầu từ dòng dữ liệu của hội thánh đó. Các triển khai nằm cạnh resolver trong `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, cùng `ByosAuth` (đổi mã OAuth lấy token và làm mới token theo cơ chế single-flight — Dropbox xoay vòng refresh token, nên các yêu cầu làm mới được loại trùng theo cách tương tự `ProviderProxyController`).

`storageProviders` lưu thông tin xác thực: `accessToken`/`refreshToken`/`tokenExpiresAt` (được mã hóa, bộ ba OAuth) hoặc `apiKey`/`apiSecret` + JSON `settings` (`{endpoint, region, bucket, publicBase}`, cho S3). Token không bao giờ được gửi về client — `GET /content/storage/providers` che các thông tin bí mật và trả về giá trị boolean `connected`.

## Luồng tải lên

Vẫn là hợp đồng ba bước như trước, với cấu trúc presign được mở rộng. `POST /content/files/postUrl` trả về `PresignedPostData`, giờ có thể tùy chọn kèm theo `method`, `rawBody`, `headers`, `chunkSize` và `externalIdField`:

| Nhà cung cấp | Presign | Client gửi dữ liệu |
|---|---|---|
| churchapps (mặc định) | POST có chữ ký trước kiểu S3 | biểu mẫu multipart (kiểu cũ) |
| Google Drive | phiên tải lên có thể tiếp tục (phạm vi `drive.file`) | một lần PUT tới URI của phiên |
| Dropbox | `files/get_temporary_upload_link` (4 giờ) | POST dữ liệu thô |
| OneDrive | `createUploadSession` (approot) | PUT theo từng khối (20MiB, bội số 320KiB của Graph) |
| S3 tương thích | PUT có chữ ký trước (B2 không hỗ trợ chính sách POST) | PUT dữ liệu thô |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) xử lý mọi dạng và trả về mã tệp của nhà cung cấp khi phản hồi có kèm mã đó (Drive). Client truyền mã này dưới dạng `externalId` trong bước đăng ký `POST /content/files`; `files.provider` + `files.externalId` ghi lại nơi lưu trữ dữ liệu (mã tệp Drive; đường dẫn với các nhà cung cấp khác). Kiểm tra hạn mức 100MB chỉ áp dụng khi nhà cung cấp được xác định là `churchapps`.

## Tải xuống công khai

Các dịch vụ đám mây tiêu dùng không thể liên kết trực tiếp (liên kết Drive vượt hạn mức, liên kết Dropbox/OneDrive hết hạn), nên với bộ ba OAuth, `contentPath` trỏ đến một route Api ổn định: `GET /content/files/download/:id` (ẩn danh) tải dòng tệp, tạo một liên kết trực tiếp có thời hạn ngắn thông qua `getDownloadUrl` của nhà cung cấp (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), lưu đệm trong bộ nhớ 30 phút, rồi chuyển hướng 302 kèm `Cache-Control: max-age=300`. Băng thông truyền trực tiếp giữa trình duyệt và nhà cung cấp, không đi qua Api. Với S3 tương thích, bước chuyển hướng bị bỏ qua hoàn toàn — `contentPath` là URL ổn định `publicBase + key` (bucket phải cho phép đọc công khai và CORS PUT).

Thao tác xóa và tải xuống được định tuyến theo `files.provider` (`StorageResolver.forFile`); các dòng cũ không có trường này sẽ dùng định tuyến theo tiền tố URL. Đổi tên chỉ cập nhật trong cơ sở dữ liệu đối với tệp BYOS (dữ liệu được định địa chỉ theo `externalId`, không theo tên). Khi ngắt kết nối một nhà cung cấp vẫn còn tệp, dòng dữ liệu sẽ bị vô hiệu hóa mềm (giữ lại token để việc tải xuống và xóa vẫn hoạt động) thay vì bị xóa.

## Kết nối (B1Admin → Settings → File Storage)

Bộ ba OAuth dùng cùng luồng relay như các nhà cung cấp nội dung: popup → người dùng đồng ý với nhà cung cấp → `{membershipApi}/oauth/relay/callback` → B1Admin thăm dò phiên relay → `POST /content/storage/exchange` thực hiện đổi mã lấy token ở phía máy chủ (bí mật của client không bao giờ rời khỏi máy chủ; Google dùng `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive dùng `ONEDRIVE_CLIENT_SECRET`, còn Dropbox là client công khai dùng PKCE). Client id nằm trong `B1Admin/src/settings/components/byosProviders.ts` và `Api .../ByosAuth.ts`. Phạm vi quyền được cố ý giữ ở mức tối thiểu: Google `drive.file` (chỉ các tệp do ứng dụng tạo — không cần xác minh phạm vi bị hạn chế), OneDrive `Files.ReadWrite.AppFolder`, Dropbox truy cập thư mục ứng dụng. S3 chỉ là một biểu mẫu nhập thông tin xác thực đơn giản.

Lưu ý về phạm vi: BYOS chỉ áp dụng cho các phần `/content/files`. Hình ảnh thư viện, ảnh thu nhỏ, logo và ảnh cá nhân vẫn dùng nhà cung cấp mặc định (nhỏ gọn, được phục vụ qua CDN và tối ưu hóa hình ảnh). Client cũng có thể truyền `platformStorage: true` trong phần thân `postUrl` để ghim một lần tải lên vào nhà cung cấp churchapps mặc định, bất kể cấu hình BYOS của hội thánh. FreeShow dùng tùy chọn này cho trạng thái đồng bộ `files/group/{teamId}/current.zip` của mình; tệp này được đọc trực tiếp từ máy chủ nội dung công khai và không bao giờ được đăng ký thành dòng tệp.
