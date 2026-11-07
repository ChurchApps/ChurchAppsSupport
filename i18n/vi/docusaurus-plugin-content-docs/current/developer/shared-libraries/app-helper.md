---
title: "AppHelper"
description: "Tham chiếu gói @churchapps/apphelper trong workspace Packages: các điểm vào subpath, ứng dụng nào dùng từng export, cùng bước phát triển và phát hành cục bộ."
---

# AppHelper

<div class="article-intro">

Gói `@churchapps/apphelper` cung cấp các thành phần React và tiện ích dùng chung cho mọi ứng dụng web của ChurchApps. Đây là một gói được xuất bản duy nhất, cung cấp các mô-đun tính năng qua những điểm truy cập con (subpath entry point): đăng nhập, quyên góp, biểu mẫu, markdown và chức năng website/CMS. Bên cạnh đó là một tập hợp thành phần và trợ giúp cốt lõi dùng chung.

</div>

<div class="prereqs">
<h4>Trước khi bắt đầu</h4>

- Cài đặt **Node.js** và **Git** — xem [Yêu cầu hệ thống](../setup/prerequisites.md)
- Làm quen với thiết lập [không gian làm việc Packages](./index.md) và quy trình phát hành

</div>

## Điểm truy cập

Gói khai báo các subpath exports trong `package.json`, nên mỗi mô-đun tính năng có thể được nhập riêng:

| Điểm truy cập | Nội dung |
|-------------|----------|
| `@churchapps/apphelper` | Thành phần, trợ giúp và hook cốt lõi |
| `@churchapps/apphelper/login` | Giao diện đăng nhập và đăng ký |
| `@churchapps/apphelper/donations` | Thành phần quyên góp và tiền hiến tặng |
| `@churchapps/apphelper/forms` | Thành phần gửi biểu mẫu |
| `@churchapps/apphelper/markdown` | Trình soạn thảo và trình hiển thị Markdown và HTML |
| `@churchapps/apphelper/website` | Thành phần trình tạo website và CMS |

## Ai dùng gì

Trước khi thay đổi một export dùng chung, hãy kiểm tra xem những ứng dụng nào đang nhập nó:

| Khu vực export | Cung cấp gì | Được sử dụng bởi |
|---|---|---|
| Gốc -- thành phần cốt lõi & hook | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, cùng các tiện ích `@churchapps/helpers` được tái xuất như `ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, v.v. | B1Admin, B1App, B1Transfer, LessonsApp |
| Gốc -- khung trang web | `SiteHeader` (điều hướng, menu người dùng, thông báo) | B1Admin, B1Transfer, LessonsApp |
| Gốc -- trình soạn nội dung quản trị | `ImageEditor`, `HelpIcon` | B1Admin |
| Gốc -- hạ tầng thời gian thực | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Gốc -- kho trò chuyện/hiện diện | `ConversationStore`, `PresenceStore` | B1App |
| Gốc -- ghi chú và giao diện nhắn tin | `Notes` (ghi chú nhân viên về người hoặc công việc); `AddNote`, `SubscriptionToggle` (nhắn tin thành viên) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Gốc -- riêng cho Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (dùng chung); `MarkdownPreview`, `HtmlEditor` (chỉnh sửa nội dung quản trị) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (dùng chung); `FundDonations` (chỉ quản trị) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (hiển thị `ConversationalForm` khi `displayMode` của biểu mẫu là `conversational`) | B1Admin, B1App |
| `./website` | Lõi hiển thị trang dùng chung giữa trình chỉnh sửa và trình hiển thị (`Element` cùng các trình hiển thị theo loại được xác định qua `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); các widget toàn trang web (`AnnouncementBanner`, `Launcher` cùng các trợ giúp `parse*Config` của chúng); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` chỉ dùng trong trình hiển thị công khai | B1Admin (trình chỉnh sửa), B1App (thành phần chỉnh sửa + trình hiển thị) |

B1Transfer và LessonsApp chỉ dùng điểm truy cập gốc và `login` -- các subpath `donations`, `forms` và `website` hiện chỉ được B1Admin và B1App sử dụng.

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

3. Khởi chạy sân chơi Vite từ thư mục của gói:

   ```bash
   cd apphelper && yarn dev
   ```

   Máy chủ phát triển của sân chơi khởi động tại `http://localhost:3001`. Trước tiên, hãy sao chép `playground/dotenv.sample` thành `playground/.env` và điền các giá trị bắt buộc.

Để build gói phục vụ việc sử dụng (biên dịch vào `dist/` và sao chép tài nguyên locale/CSS), chạy `yarn workspace @churchapps/apphelper build` -- hoặc `yarn build` ở thư mục gốc để build mọi gói theo thứ tự phụ thuộc. Để kiểm thử một bản build chưa xuất bản bên trong một ứng dụng sử dụng, hãy dùng Yarn portal tạm thời -- xem [Phát triển cục bộ với ứng dụng sử dụng](./index.md#local-development-against-a-consuming-app).

:::tip
Sân chơi là cách nhanh nhất để phát triển và kiểm thử các thành phần AppHelper. Nó tự động tải lại máy chủ phát triển Vite, nên bạn có thể thấy thay đổi ngay lập tức.
:::

## Xuất bản

Việc phát hành đi qua changesets: chạy `yarn changeset` ở thư mục gốc của không gian làm việc cho mỗi thay đổi, sau đó chạy `yarn publish-all` khi sẵn sàng phát hành. Xem [Tổng quan thư viện dùng chung](./index.md#releasing-with-changesets) để biết toàn bộ quy trình.

:::warning
Không bao giờ xóa hoặc đổi tên một export cho đến khi phiên bản thay thế đã được xuất bản và mọi nơi sử dụng đã được chuyển sang. Hãy tìm kiếm trong tất cả các kho mã sử dụng trước khi hợp nhất một thao tác xóa.
:::

## Bài viết liên quan

- **[Helpers](./helpers.md)** -- Gói tiện ích nền tảng được dùng cùng AppHelper
- **[Ứng dụng web](../web-apps/index.md)** -- Các ứng dụng web sử dụng gói này
- **[Tổng quan thư viện dùng chung](./index.md)** -- Thiết lập không gian làm việc, quy trình phát hành và quy trình liên kết cục bộ
