---
title: "Thư viện dùng chung"
---

# Thư viện dùng chung

<div class="article-intro">

Mã nguồn dùng chung của ChurchApps được xuất bản lên npm dưới phạm vi `@churchapps/*`. Tất cả các gói dùng chung nằm trong một kho mã duy nhất -- [Packages](https://github.com/ChurchApps/Packages) -- được quản lý như một không gian làm việc Yarn (Berry) và có phiên bản được quản lý bằng [changesets](https://github.com/changesets/changesets).

</div>

## Các gói

| Gói | Mô tả | Được dùng bởi |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Lớp nền tảng: các hàm trợ giúp không phụ thuộc framework và các interface TypeScript dùng chung, tạo thành hợp đồng dữ liệu xuyên suốt giữa các ứng dụng | Tất cả dự án |
| [`@churchapps/apihelper`](./api-helper) | Tiện ích phía máy chủ cho Express: xác thực, controller cơ sở, truy cập cơ sở dữ liệu, tích hợp AWS và email | Tất cả API |
| [`@churchapps/apphelper`](./app-helper) | Các thành phần React và mô-đun tính năng dùng chung (đăng nhập, quyên góp, biểu mẫu, markdown, trang web) | Tất cả ứng dụng web |
| `@churchapps/content-providers` | Lớp trừu tượng cho các nhà cung cấp nội dung bên thứ ba (Lessons.church, Planning Center, Dropbox và các dịch vụ khác) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Bộ công cụ để xây dựng tích hợp cho B1.church: xác minh webhook, máy khách REST có kiểu dữ liệu, trợ giúp OAuth | Nhà phát triển tích hợp bên ngoài |
| `@churchapps/texting` | Lớp trừu tượng cho nhà cung cấp SMS (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

Chiều phụ thuộc chỉ đi một chiều xuống dưới: các ứng dụng phụ thuộc vào `apihelper` và `apphelper`, và hai gói này khai báo `@churchapps/helpers` là **peer dependency** để mỗi ứng dụng chỉ dùng đúng một bản sao của gói đó.

## Thiết lập không gian làm việc

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Kho mã dùng Yarn Berry (trường `packageManager` ở thư mục gốc là nguồn chuẩn) với một tệp lockfile duy nhất. `yarn build` xây dựng mọi gói theo thứ tự phụ thuộc; `yarn test` chạy kiểm thử của tất cả các gói.

## Phát hành với Changesets

Mọi thay đổi trong một gói đều đi kèm một changeset:

1. Chạy `yarn changeset` ở thư mục gốc của không gian làm việc. Chọn gói (hoặc các gói) bạn đã chỉnh sửa, loại tăng phiên bản (patch = sửa lỗi, minor = export hoặc tính năng mới, major = thay đổi gây lỗi tương thích) và viết một dòng tóm tắt -- dòng này sẽ trở thành mục trong CHANGELOG.
2. Commit tệp `.changeset/*.md` được tạo ra cùng với thay đổi mã của bạn. Một hook pre-commit sẽ chặn các commit thay đổi mã nguồn của gói mà không có changeset đã được stage.
3. Khi sẵn sàng xuất bản, chạy `yarn publish-all` ở thư mục gốc. Lệnh này sử dụng các changeset đang chờ (tăng phiên bản, ghi CHANGELOG, đồng bộ phạm vi phụ thuộc nội bộ), xây dựng mọi thứ theo thứ tự phụ thuộc, rồi xuất bản các gói đã tăng phiên bản lên npm. Sau đó commit và push các thay đổi phiên bản.

:::warning
Không bao giờ chạy `npm publish` trực tiếp bên trong một gói riêng lẻ -- lệnh đó bỏ qua thứ tự xây dựng và phần quản lý phiên bản mà script phát hành xử lý. Việc xuất bản yêu cầu một tài khoản npm có quyền xuất bản trong phạm vi `@churchapps`.
:::

## Phát triển cục bộ với một ứng dụng sử dụng gói

Trong không gian làm việc, các gói được xây dựng trực tiếp dựa trên các gói anh em của chúng -- không cần liên kết thủ công. Để thử nghiệm một bản dựng gói chưa xuất bản bên trong một ứng dụng sử dụng (B1Admin, B1App, v.v.), thêm một Yarn portal tạm thời vào ứng dụng đó:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Xây dựng gói trước (`yarn build` ở thư mục gốc của không gian làm việc) -- ứng dụng sử dụng đọc đầu ra đã biên dịch trong `dist/`, không đọc mã nguồn.

:::warning
`yarn link` ghi một portal resolution vào `package.json` của ứng dụng sử dụng. Không bao giờ commit nội dung này -- luôn chạy `yarn unlink` và cài đặt lại khi đã xong.
:::
