---
title: "Thư viện trợ giúp"
description: "Gói @churchapps/helpers cho nhà phát triển: nội dung, ứng dụng dùng gói, build cục bộ trong workspace Packages và quy trình phát hành bằng changesets."
---

# Thư viện trợ giúp

<div class="article-intro">

Gói `@churchapps/helpers` cung cấp các tiện ích nền tảng được tất cả các dự án ChurchApps sử dụng, cả ở frontend lẫn backend. Gói này không phụ thuộc vào framework cụ thể và bao gồm các hàm trợ giúp thông dụng như `DateHelper`, `ApiHelper`, `CurrencyHelper`, cùng các interface TypeScript dùng chung, tạo nên hợp đồng dữ liệu giữa các ứng dụng và API.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Cài đặt **Node.js** và **Git** -- xem [Điều kiện tiên quyết](../setup/prerequisites.md)
- Làm quen với thiết lập [không gian làm việc Packages](./index.md) và quy trình phát hành

</div>

## Ai sử dụng gói này

Mọi API của ChurchApps (Api lõi, AskApi và LessonsApi) và mọi giao diện web (B1Admin, B1App, B1Transfer, LessonsApp) đều phụ thuộc trực tiếp vào gói này. Các frontend cũng nhận được nhiều phần xuất của gói (`ApiHelper`, `DateHelper`, `UserHelper` và các interface khác) thông qua [`@churchapps/apphelper`](./app-helper.md). Các gói dùng chung khác khai báo gói này là peer dependency để mỗi ứng dụng chỉ sử dụng đúng một bản sao.

## Thiết lập để phát triển cục bộ

Gói này nằm trong không gian làm việc [Packages](https://github.com/ChurchApps/Packages), cùng với các thư viện dùng chung khác:

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
   yarn workspace @churchapps/helpers build
   ```

   Hoặc chạy `yarn build` ở thư mục gốc để build mọi gói theo thứ tự phụ thuộc.

Để kiểm thử các thay đổi bên trong một dự án sử dụng gói, hãy dùng Yarn portal tạm thời -- xem [Phát triển cục bộ với ứng dụng sử dụng gói](./index.md#local-development-against-a-consuming-app).

## Xuất bản

Việc phát hành được thực hiện thông qua changesets thay vì tăng phiên bản thủ công:

1. Chạy `yarn changeset` tại thư mục gốc của không gian làm việc, chọn `@churchapps/helpers` với loại tăng phiên bản phù hợp; commit tệp changeset được tạo ra cùng với thay đổi của bạn.
2. Khi sẵn sàng phát hành, chạy `yarn publish-all` tại thư mục gốc -- lệnh này sẽ tăng phiên bản, ghi CHANGELOG, build theo thứ tự phụ thuộc và publish lên npm.

Các interface dùng chung mới được đặt trong `helpers/src/interfaces/` và được xuất lại qua barrel của gói. Danh mục loại phần tử của trình xây dựng website (`ElementTypes.ts` -- 35 loại cùng với schema câu trả lời của chúng) cũng nằm ở đây; đây là hợp đồng dùng chung giữa các bộ render của apphelper, các biểu mẫu chỉnh sửa trong B1Admin và các prompt tạo nội dung bằng AI (xem [Kiến trúc trình xây dựng website](../architecture/website-builder.md)).

:::warning
Vì gói này được mọi dự án ChurchApps sử dụng, các thay đổi tại đây có ảnh hưởng rộng. Khi `helpers` được phát hành, `apihelper` và `apphelper` sẽ tự động được tăng phiên bản để phạm vi phụ thuộc của chúng luôn được cập nhật. Hãy kiểm thử bằng Yarn portal với ít nhất một API và một ứng dụng web đang sử dụng gói trước khi publish.
:::

## Bài viết liên quan

- **[ApiHelper](./api-helper.md)** -- Các tiện ích phía máy chủ phụ thuộc vào gói này
- **[AppHelper](./app-helper.md)** -- Các component React phụ thuộc vào gói này
- **[Tổng quan thư viện dùng chung](./index.md)** -- Thiết lập không gian làm việc, quy trình phát hành và quy trình liên kết cục bộ
