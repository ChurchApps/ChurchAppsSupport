---
title: "ApiHelper"
description: "Tham chiếu gói @churchapps/apihelper cho các API Express của ChurchApps: build cục bộ, thử nghiệm qua Yarn portal và phát hành bằng changeset."
---

# ApiHelper

<div class="article-intro">

Gói `@churchapps/apihelper` cung cấp các tiện ích phía máy chủ cho tất cả các API Express.js của ChurchApps. Gói này bao gồm lớp controller cơ sở, xác thực JWT, tiện ích cơ sở dữ liệu và các tích hợp AWS mà mọi dự án API đều phụ thuộc vào.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Cài đặt **Node.js** và **Git** -- xem [Điều kiện tiên quyết](../setup/prerequisites.md)
- Làm quen với thiết lập và quy trình phát hành của [không gian làm việc Packages](./index.md)
- Gói này phụ thuộc vào [`@churchapps/helpers`](./helpers.md) (như một peer dependency) và xuất lại toàn bộ nội dung của gói đó

</div>

## Những gì được bao gồm

- **CustomBaseController** -- lớp cơ sở cho các controller API, được xây dựng trên `inversify-express-utils`
- **Auth** -- xác thực JWT thông qua `CustomAuthProvider`, `AuthenticatedUser` và `Principal`
- **Tiện ích cơ sở dữ liệu** -- `DB.query` / `DB.queryOne` và lớp `Pool` để quản lý kết nối MySQL, cùng với `MySqlHelper` và `DBCreator` để thiết lập schema
- **Tích hợp AWS** -- `AwsHelper` để lưu trữ tệp trên S3 và đọc từ SSM Parameter Store
- **Email** -- `EmailHelper` hỗ trợ các phương thức truyền tải SES và SMTP
- **Tải cấu hình** -- `EnvironmentBase` đọc chuỗi kết nối và bí mật từ biến môi trường hoặc Parameter Store
- **Tiện ích khác** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Thiết lập để phát triển cục bộ

Gói này nằm trong không gian làm việc [Packages](https://github.com/ChurchApps/Packages) cùng với các thư viện dùng chung khác:

1. Clone không gian làm việc:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Cài đặt các phụ thuộc tại thư mục gốc của không gian làm việc:

   ```bash
   cd Packages && yarn install
   ```

3. Build (biên dịch TypeScript sang `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Hoặc chạy `yarn build` ở thư mục gốc để build tất cả các gói theo thứ tự phụ thuộc.

Để kiểm thử các thay đổi bên trong một API đang sử dụng gói này, hãy dùng một Yarn portal tạm thời -- xem [Phát triển cục bộ với ứng dụng sử dụng gói](./index.md#local-development-against-a-consuming-app).

## Xuất bản

Các bản phát hành đi qua changesets: chạy `yarn changeset` ở thư mục gốc của không gian làm việc cho mỗi thay đổi, sau đó chạy `yarn publish-all` khi sẵn sàng phát hành. Xem [Tổng quan về thư viện dùng chung](./index.md#releasing-with-changesets) để biết toàn bộ quy trình.

:::info
Gói này là một phụ thuộc của mọi API ChurchApps -- bao gồm Api chính, AskApi và LessonsApi. Khi thực hiện thay đổi, hãy kiểm thử với một API chạy cục bộ trước khi xuất bản.
:::

## Bài viết liên quan

- **[Helpers](./helpers.md)** -- Gói tiện ích cơ sở mà gói này phụ thuộc vào
- **[Module Structure](../api/module-structure.md)** -- Cách controller và middleware xác thực được sử dụng trong các module API
- **[Local API Setup](../api/local-setup.md)** -- Thiết lập API để phát triển cục bộ
