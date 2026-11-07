---
title: "Kiến trúc quyên góp"
---

# Kiến trúc quyên góp

<div class="article-intro">

ChurchApps vận hành quyên góp theo mô hình gateway-rail: nhà thờ giữ tài khoản Stripe (hoặc PayPal, Kingdom Funding, Paystack) của riêng mình, và B1 không bao giờ đứng trong luồng tiền như một bên xử lý thanh toán của nền tảng. Dữ liệu thẻ được mã hóa thành token ngay trên trình duyệt và không bao giờ đến máy chủ ChurchApps. Trang này mô tả toàn bộ hệ thống: registry nhà cung cấp phía client trong `@churchapps/apphelper`, lớp trừu tượng gateway GivingApi, mô hình dữ liệu quyên góp, và cách webhook của gateway đối chiếu ngược lại vào cơ sở dữ liệu.

</div>

## Tổng quan

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ card entry in the │  Stripe Elements · KF tokenizer ·     │
│  │ Payment provider      │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ registry              │  │◀── token / nonce ─│  (card never reaches a B1 server)     │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ signed webhook
┌─────────────────────────────────────────────┐ (secret key) │                │ event
│  GivingApi — /giving module                 │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  save donations + fundDonations — dedup via eventLogs / transactionId
                      ▼
                MySQL (giving schema)
```

Ba nguyên tắc xuyên suốt toàn bộ hệ thống:

1. **Gateway giữ thẻ.** Mọi widget nhập thông tin của nhà cung cấp đều mã hóa thẻ ngay trên trình duyệt; API chỉ nhận token, nonce hoặc mã đơn hàng.
2. **Một lớp trừu tượng, nhiều nhà cung cấp.** Trình duyệt lấy một `PaymentProvider` từ registry; máy chủ lấy một `IGatewayProvider` từ factory. Cả hai đều dựa trên cùng một tên nhà cung cấp đã được chuẩn hóa và lưu trên bản ghi gateway.
3. **Webhook là nguồn chính xác cho việc quyết toán.** Phản hồi của lệnh charge được ghi nhận một cách lạc quan, nhưng webhook có chữ ký của gateway mới là thứ xác nhận (hoặc tạo mới) khoản quyên góp đã hoàn tất, với cơ chế chống trùng lặp ở cả hai phía.

## Phía client: registry nhà cung cấp thanh toán (`@churchapps/apphelper`)

Registry nằm trong `Packages/apphelper/src/donations/providers/`, với widget và hàm hỗ trợ của mỗi nhà cung cấp nằm trong thư mục con riêng (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`). Không có phần nào bên ngoài `providers/` rẽ nhánh theo tên nhà cung cấp. Một `PaymentProvider` (xem `providers/types.ts`) gói gọn mọi thứ mà ứng dụng host cần cho một gateway: một `descriptor` (nhãn quản trị, các loại tiền tệ được hỗ trợ, các trường phí, tỷ lệ phí mặc định, URL bảng điều khiển/đăng ký), một tập cờ `capabilities` (thẻ đã lưu, ACH, định kỳ, nhập thẻ mới ngay trong form, tự động lưu khi mã hóa), các widget React để thành viên nhập thông tin (`MemberWrapper`/`MemberEntry`), quyên góp của khách (`GuestForm`), chỉnh sửa phương thức đã lưu (`MethodEditForm`), và thanh toán qua biểu mẫu câu hỏi (`FormPayment`), cùng `buildChargeRequest(ctx, token)` là nơi duy nhất mà cấu trúc payload của lệnh charge khác nhau giữa các nhà cung cấp. `MemberWrapper` của mỗi nhà cung cấp tự tải SDK của nó từ public key trên bản ghi gateway, nên ứng dụng host không bao giờ import SDK của gateway (B1App và B1Admin không có phụ thuộc `@stripe/*`). `pickDefaultGateway(gateways, capability?)` tập trung việc chọn gateway nào trong số các gateway của nhà thờ mà một bề mặt nên sử dụng.

`providers/registry.ts` giữ các nhà cung cấp tích hợp sẵn. Chúng được **tham chiếu theo giá trị**, không đăng ký qua side-effect của module, nên cơ chế tree-shaking của bundler không bao giờ có thể làm mất đăng ký:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| Hàm | Mục đích |
|-----|----------|
| `getPaymentProvider(name)` | Tra cứu theo tên đã chuẩn hóa; nếu không tìm thấy thì quay về Stripe, để một nhà cung cấp bị cấu hình sai không bao giờ làm sập biểu mẫu quyên góp |
| `registerPaymentProvider(p)` | Đăng ký thêm một nhà cung cấp lúc chạy (cho gateway tùy chỉnh của ứng dụng host) |
| `listPaymentProviders()` | Liệt kê các nhà cung cấp tích hợp sẵn và tùy chỉnh, dùng để tạo danh sách thả xuống gateway trong admin |
| `hasPaymentProvider(name)` | Kiểm tra sự tồn tại |

**Nhà cung cấp phía client tích hợp sẵn: Stripe, PayPal, Kingdom Funding, Paystack.** B1App và B1Admin chỉ *đọc* registry (`getPaymentProvider`, `listPaymentProviders`); cả hai đều không gọi `registerPaymentProvider`. Việc đăng ký vẫn nằm hoàn toàn trong apphelper.

Mỗi nhà cung cấp mã hóa thẻ theo cách khác nhau, nhưng tất cả đều giữ thẻ ngoài B1:

| Nhà cung cấp | Widget nhập thông tin | Token trả về API |
|--------------|-----------------------|------------------|
| Stripe | `Elements` `CardElement` của Stripe → `stripe.createPaymentMethod(...)`; biểu mẫu khách vãng lai còn gắn thêm `ExpressCheckoutElement` (Apple Pay / Google Pay, chỉ cho quà một lần) mà `onConfirm` của nó trả về cùng một id `pm_…` | id phương thức thanh toán (`pm_…`); tài khoản ngân hàng qua `/paymentmethods/ach-setup-intent`: Financial Connections `us_bank_account` cho gateway USD, `acss_debit` PAD của Canada (modal ủy quyền hosted, mandate `default_for` cho hóa đơn/đăng ký, các khoản charge một lần truyền id mandate) cho gateway CAD |
| Kingdom Funding | Form tokenizer được host sẵn, khóa theo public key của gateway | nonce dùng một lần |
| PayPal | PayPal Hosted Fields (thẻ, định kỳ) cùng PayPal Smart Buttons với nguồn tài trợ Venmo (một lần); cả hai dùng chung một lần tải SDK, và đơn hàng phía máy chủ được tạo qua `/donate/client-token` + `/donate/create-order` | id đơn hàng đã được thu tiền |
| Paystack | Popup Paystack Inline (`js.paystack.co/v2/inline.js`); chính popup thực hiện thanh toán (thẻ, tiền di động, chuyển khoản ngân hàng, USSD) | mã tham chiếu giao dịch đã thanh toán; phương thức đã lưu là mã ủy quyền `AUTH_…` của Paystack |

`finalizeResult` của Stripe chạy 3-D Secure / SCA trên trình duyệt (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`) trước khi khoản quyên góp được coi là hoàn tất. Biểu mẫu dùng chung chỉ gọi `provider.finalizeResult(result)` mà không cần biết nó làm gì.

## Phía server: lớp trừu tượng gateway (GivingApi)

Module `/giving` (`Api/src/modules/giving`) cung cấp bề mặt REST; phần hạ tầng gateway nằm trong `Api/src/shared/helpers`. `DonateController` không bao giờ gọi trực tiếp SDK của gateway. Nó đi qua `GatewayService`, service này lấy đúng `IGatewayProvider` từ `GatewayFactory` và chuyển cho nó một `GatewayConfig` đã được giải mã.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`) là hợp đồng mà mọi gateway đều phải triển khai. Nó bao gồm vòng đời webhook (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), thanh toán (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), phí (`calculateFees`), xử lý phương thức đã lưu (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), và các tính năng mở rộng tùy chọn (khách hàng, đơn hàng, SetupIntent, phát lại sự kiện, `retryFailedPayment` cho hóa đơn đăng ký thất bại, `registerPaymentMethodDomain` để xác minh miền Apple Pay). Nhà cung cấp nào bỏ qua một hook tùy chọn sẽ được báo là không hỗ trợ hành động đó, và giao diện sẽ ẩn điều khiển tương ứng. Mỗi lớp nhà cung cấp tự khai báo ma trận `capabilities` của nó (các loại tiền tệ được hỗ trợ, ACH, hoàn tiền, yêu cầu đăng ký, giới hạn giao dịch). `GatewayService.getProviderCapabilities(provider)` chỉ đọc ma trận này, và các cờ như `logsDonationsImmediately` điều khiển hành vi của controller mà không cần bất kỳ điều kiện nào theo tên nhà cung cấp trong controller.

**Các nhà cung cấp phía server được đăng ký trong `GatewayFactory`:**

| Nhà cung cấp | Khả dụng |
|--------------|----------|
| Stripe | Luôn bật |
| PayPal | Luôn bật |
| Kingdom Funding | Luôn bật |
| Paystack | Luôn bật (thương gia ở Nigeria, Ghana, Nam Phi, Kenya, Bờ Biển Ngà; tiền tệ NGN/GHS/ZAR/KES/XOF/USD) |
| Square | Chọn bật qua biến môi trường `ENABLE_SQUARE` |
| ePayMints | Chọn bật qua biến môi trường `ENABLE_EPAYMINTS` |

Paystack khác các nhà cung cấp khác ở chỗ tiền được chuyển trước khi GivingApi tham gia: popup thu tiền từ người quyên góp, `processCharge` là một `GET /transaction/verify/:reference` mà số tiền và loại tiền đã thanh toán phải khớp với khoản quyên góp đang được ghi nhận (một mã tham chiếu đã có trong hệ thống sẽ không bao giờ được ghi hai lần), và khoản quà đầu tiên của một lịch định kỳ được ghi nhận từ `finalizeSubscription` (verify → `POST /plan` → `POST /subscription` với `start_date` cách một chu kỳ). Webhook được ký bằng chính secret key (`x-paystack-signature`, HMAC-SHA512 trên raw body). Paystack không có API quản lý webhook, nên màn hình admin hiển thị URL để nhà thờ dán vào bảng điều khiển của họ. Các sự kiện `charge.success` gia hạn không mang theo cách chia quỹ; nhà cung cấp khôi phục nó từ các dòng `subscriptions`/`subscriptionFunds` cục bộ của người quyên góp. Chỉ ủy quyền thẻ mới là `reusable`. Quà qua tiền di động chỉ dùng một lần, nên `createSubscription` từ chối chúng. Dữ liệu demo tạo thêm một nhà thờ thứ hai (Accra Community Church, `CHU00000002`) trên gateway Paystack chế độ thử nghiệm GHS, để bộ kiểm thử Playwright của Paystack chạy song song với bộ kiểm thử Stripe của Grace.

Có thể đăng ký các nhà cung cấp tùy chỉnh lúc chạy khi `ENABLE_CUSTOM_GATEWAY_PROVIDERS` được đặt; `AbstractExperimentalGatewayProvider` là lớp cơ sở cho chúng. Tên nhà cung cấp được so khớp không phân biệt chữ hoa chữ thường.

### Cấu hình gateway & bí mật

Admin lưu thông tin xác thực của gateway qua `POST /giving/gateways` (`GatewayController`). Khi lưu, controller mã hóa private key và webhook key bằng `EncryptionHelper` trước khi ghi xuống, rồi, trên bất kỳ host nào không phải localhost, xóa webhook hiện có của nhà thờ và tạo một webhook mới trỏ tới `/giving/donate/webhook/{provider}?churchId=…`. Mỗi nhà thờ giữ một bản ghi cho mỗi nhà cung cấp: lưu một gateway chỉ thay thế bản ghi hiện có của đúng nhà cung cấp đó. Các lượt đọc công khai (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`) chỉ trả về public key.

## Mô hình dữ liệu

Schema giving (`Api/src/modules/giving/db/DatabaseTypes.ts`, các model trong `models/`) là một schema MySQL được truy cập qua Kysely:

| Bảng | Vai trò |
|------|---------|
| `gateways` | Cấu hình nhà cung cấp theo từng nhà thờ: `provider`, `publicKey`, `privateKey`/`webhookKey` đã mã hóa, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | Quỹ chỉ định quyên góp (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | Nhóm phục vụ nhập liệu và báo cáo (`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | Một khoản quà: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; sao kê, tổng cộng, bảng điều khiển và báo cáo quyên góp chỉ đếm `complete` hoặc null), `transactionId` |
| `fundDonations` | Phân bổ một khoản quyên góp cho một hoặc nhiều quỹ (`donationId`, `fundId`, `amount`) |
| `subscriptions` | Quà định kỳ; `id` là id đăng ký của gateway, liên kết với `personId`, `customerId`, `gatewayId` |
| `subscriptionFunds` | Cách chia quỹ cho một quà định kỳ |
| `customers` | Liên kết `personId` với id khách hàng trên gateway, theo từng `provider` |
| `gatewayPaymentMethods` | Thẻ/tài khoản ngân hàng đã lưu: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | Nhật ký kiểm toán sự kiện webhook và khóa chống trùng (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | Chiến dịch cam kết gắn với một quỹ, và số tiền mỗi người đã cam kết |

Một khoản quyên góp được chia cho các quỹ thông qua `fundDonations`. Khoản quyên góp mang tổng số tiền, mỗi `fundDonation` mang một phần. `donations.currency` và `gateways.currency` mang mã tiền tệ ISO; mỗi nhà cung cấp quảng bá `supportedCurrencies` của mình, và số tiền được định dạng bằng `CurrencyHelper.formatCurrencyWithLocale`.

## Các luồng đầu cuối

### Thành viên: quyên góp một lần và định kỳ (B1App)

Màn hình quyên góp đã xác thực (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`) ghép ba thành phần apphelper: `MultiGatewayDonationForm`, `PaymentMethods` và `RecurringDonations`. B1App đảm nhiệm phần tải dữ liệu xung quanh: `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions`, và truyền danh sách gateway xuống. Nhà cung cấp được chọn tự tải SDK của nó từ public key của gateway. Việc thu tiền thực sự diễn ra bên trong apphelper: nhà cung cấp được chọn mã hóa phương thức (mới hoặc đã lưu), rồi gửi đến `/giving/donate/charge` cho quà một lần, hoặc `/giving/donate/subscribe` cho quà định kỳ. Cả hai endpoint đều ghi nhận người quyên góp đã đăng nhập vào `personId` của chính họ (chỉ người có `donations.edit` mới được ghi nhận cho người khác), và từ chối các cách chia quỹ có tổng vượt quá số tiền đã thu. Quà định kỳ tạo một dòng `subscriptions` cùng `subscriptionFunds`, rồi giao lịch cho gateway (Stripe Subscriptions, PayPal Billing Plans, hoặc lịch định kỳ KF).

### Quyên góp của khách / ẩn danh

Trang quyên góp công khai (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) và bảng "give now" hiển thị `NonAuthDonationWrapper` từ `@churchapps/apphelper/website`, thành phần này bọc quanh `GuestForm` của nhà cung cấp và đưa vào reCAPTCHA cùng ngữ cảnh Elements của gateway. Khách không cần đăng nhập, không có phương thức đã lưu, không có lịch sử. Luồng này gọi `GET /giving/funds/churchId/:id` và `GET /giving/donate/gateways/:churchId` (chỉ public key), xác minh người truy cập qua `POST /giving/donate/captcha-verify`, mã hóa trên trình duyệt, rồi gửi đến `/giving/donate/charge` (hoặc `/subscribe`). Lệnh verify trả về một `captchaPass` có chữ ký HMAC, hiệu lực 10 phút (`Api/src/modules/giving/helpers/CaptchaPass.ts`), và biểu mẫu gửi kèm trong mọi lệnh gọi tiền của khách. Khi `CAPTCHA_ENFORCE=true`, Api từ chối các lệnh `create-order`, `charge`, `subscribe`, `addcard` và `ach-setup-intent-anon` của khách nếu không có captchaPass hợp lệ cho nhà thờ đó. Đăng ký sự kiện trả phí của khách (`POST /content/registrations/register`) kiểm tra cùng captchaPass ngay trước khi thu tiền; xem [Đăng ký sự kiện](./registrations#payment-flow). ACH của khách dùng endpoint ẩn danh `POST /giving/paymentmethods/ach-setup-intent-anon`, và chỉ cho phép xác minh tức thời (Financial Connections). Xác minh bằng microdeposit mất vài ngày, khi đó trang của khách đã đóng, nên nó không bao giờ hoàn tất được khoản quà. Biểu mẫu từ chối thu tiền bằng một SetupIntent chưa được xác minh và hướng người quyên góp đến thẻ hoặc thiết lập ngân hàng khi đã đăng nhập.

Ba tùy chọn của biểu mẫu khách dùng chung lệnh charge. `?fundId=` và `?amount=` trên URL quyên góp chọn sẵn cách chia quỹ (mỗi biểu mẫu khách của nhà cung cấp đọc khi được gắn, và đi qua trình xử lý thay đổi quỹ thông thường để tổng và phí được cập nhật). `anonymous: true` khiến `DonateController.charge` bỏ qua mọi person mà client gửi lên và ghi khoản quà với `personId = null`. Biểu mẫu khách bỏ qua `/people/loadOrCreate` và bước customer/vault, còn ba nhà cung cấp ghi nhận ngay sẽ không tìm person từ khách hàng gateway nữa. Apple Pay yêu cầu miền của trang được đăng ký với Stripe, nên biểu mẫu khách Stripe gửi một lần mỗi phiên đến `POST /giving/donate/register-domain`. Endpoint này công khai và có giới hạn tốc độ, và chỉ chấp nhận miền thuộc về nhà thờ (`<subDomain>.b1.church`, một dòng trong bảng domains của module content, hoặc một host cục bộ) trước khi gọi API payment-method-domains của Stripe.

### Admin ghi nhận và nhập từ Stripe (B1Admin)

Phần quyên góp của B1Admin (`B1Admin/src/donations/`) là nơi nhóm tài chính làm việc. Nhập theo lô (`components/BulkDonationEntry.tsx`) ghi nhận quà tiền mặt/séc/hiện vật bằng cách gửi đến `/giving/donations` rồi `/giving/funddonations`, không có gateway nào tham gia. Hồ sơ người của **Log a gift** (`components/LogGiftDialog.tsx`) làm điều tương tự cho một khoản quà đơn lẻ, trước tiên tìm lô có `batchDate` khớp với ngày quà, hoặc tạo một lô được đặt tên theo ngày đó (`POST /giving/donationbatches`), và xóa khoản quyên góp/lô mới nếu một bước sau đó thất bại. Quỹ, lô, chiến dịch và sao kê đều ánh xạ đến các route CRUD `/giving/*` tương ứng. Các trang sao kê quyên góp (`BatchGivingStatementsPage`, `PrintAllStatementsPage`) yêu cầu đúng một năm dương lịch bằng `GET /donations?startDate=&endDate=` và `GET /fundDonations?startDate=&endDate=`, thay vì toàn bộ lịch sử của nhà thờ, vì lịch sử đó có thể vượt quá giới hạn kích thước phản hồi của Lambda. Bảng quyên góp kiểu thành viên (`B1Admin/src/donationComponents/`) dùng lại cùng các thành phần apphelper như B1App.

Các bước chuyển giao cho kế toán và báo cáo là công việc phía client hoặc của trình chạy báo cáo, không phải công việc của gateway. Chức năng xuất QuickBooks trên trang lô tạo tệp CSV bút toán từ `donations` + `fundDonations` của lô (ghi nợ Undeposited Funds, ghi có một dòng cho mỗi quỹ). Chế độ xem Lapsed Givers trên trang Summary chạy `Api/reports/lapsedGivers.json` qua trình chạy báo cáo chung, với tên người được `ReportOutput` phân giải. Các định dạng biên lai theo quốc gia (Canada / Australia / New Zealand) là cài đặt của nhà thờ trong kho key/value của membership, được hiển thị bởi `GivingStatementDocument` và được nhân bản trên trang in của B1App. Các trang in sao kê của B1Admin (`PrintDonationPage`, `PrintAllStatementsPage`) truyền cài đặt `logoLight` của nhà thờ (qua `usePrintLogo` trong `B1Admin/src/components/PrintChurchHeader.tsx`) để logo được in ở đầu mỗi sao kê, và chờ hình ảnh tải xong trước khi tự động in.

### Trạng thái lô và quyền Nhập quyên góp

Có thể đóng lô để một khoản tiền gửi đã đếm được giữ nguyên như cũ. `POST /giving/donationbatches/:id/close` và `/:id/reopen` (chỉ Donations.Edit) là những thao tác duy nhất ghi `status`, `closedDate` và `closedBy` (`DonationBatchRepo.setStatus`). Một lần lưu lô thông thường không bao giờ chạm vào các trường này, nên việc đăng lô không thể mở lại lô. Quyền ghi được tập trung trong `Api/src/modules/giving/helpers/BatchAccessHelper.ts`: Donations.Edit được thay đổi mọi thứ, còn quyền hẹp hơn Donations.Enter (`GivingApi` / `Donations` / `Enter`, "Enter Donations" trong trình chỉnh sửa vai trò) được tạo lô và lưu hoặc xóa khoản quyên góp và cách chia quỹ chỉ khi cả lô hiện tại của khoản quyên góp lẫn lô đích đều đang mở. Quyền này không bao giờ áp dụng cho quà qua gateway (quà có `transactionId`). Thao tác ghi bị chặn trả về `403 { error: "This batch is closed." }`. Việc đọc lô chấp nhận Donations.ViewSummary hoặc Donations.Enter, để người đếm tiền có thể chọn lô mà họ đang nhập vào. Ở phía client, `B1Admin/src/donations/batchAccess.ts` phản chiếu các quy tắc này (`canSeeBatches`, `canEnterDonations`, `canChangeBatch`), và `Header` / `SecondaryMenuHelper` hiển thị **Donations > Batches** cho bất kỳ ai có thể xem lô, kể cả khi không có View Summary.

### Quy đổi tổng hợp nhiều loại tiền tệ

Mọi endpoint trả về một tổng hợp duy nhất trên các khoản quà có thể dùng nhiều loại tiền tệ (các KPI tóm tắt quyên góp `GivingKpiCards`, tổng của một lô quyên góp, tổng của một quỹ, và các tổng theo năm đến nay/theo kỳ trên màn hình quyên góp của B1App) đều quy đổi về tiền tệ mặc định của nhà thờ ở phía máy chủ, thay vì cộng các loại tiền khác nhau. `Api/src/shared/helpers/ExchangeRateHelper.ts` lấy tỷ giá từ `api.frankfurter.dev` theo tiền tệ của nhà thờ, lưu đệm trong bộ nhớ tiến trình trong 12 giờ, và cung cấp `convertTotals(rows, churchCurrency, rates)`. Các dòng được nhóm theo tiền tệ ngay trong SQL (một số ít nhóm, không bao giờ quy đổi theo từng khoản quà), mỗi nhóm được quy đổi rồi cộng lại, và kết quả mang cờ `isConverted` mà client dùng để hiển thị ghi chú "Quy đổi theo tỷ giá hiện tại". `GET /donations/exchange-rates` cung cấp bảng tỷ giá cho các client cần nó (màn hình quyên góp của B1App). Chính tỷ giá không bao giờ được chấp nhận từ request, chỉ được lấy ở phía máy chủ, nên client không thể ảnh hưởng đến tổng được báo cáo. Các bản ghi quyên góp riêng lẻ và các báo cáo theo loại tiền tệ gốc/lịch sử không bao giờ được quy đổi. Chỉ các tổng hợp mới được quy đổi.

Trang nhập từ Stripe (`B1Admin/src/donations/StripeImportPage.tsx`) bổ sung các khoản quà được thực hiện ngoài B1: nó gọi `POST /giving/donate/replay-stripe-events` với `dryRun: true` để xem trước, rồi `dryRun: false` để nhập. Máy chủ liệt kê các sự kiện Stripe trong khoảng ngày và bỏ qua mọi thứ đã được ghi nhận. Việc so khớp được thực hiện trước tiên theo id nhà cung cấp trong `eventLogs`, sau đó theo transaction id, rồi theo `DonationRepo.findMatchingDonation` (số tiền + ngày + người), nên việc chạy lại không bao giờ nhập trùng. Các sự kiện `charge.succeeded` / `payment_intent.succeeded` của đăng ký bị bỏ qua vì `invoice.paid` đã ghi nhận những khoản quà đó. Các phiên bản API Stripe mới hơn không còn `PaymentIntent.invoice`, nên việc bỏ qua cũng dựa vào mô tả "Subscription …".

## Webhook và đối chiếu

Các khoản thanh toán đã quyết toán và thay đổi trạng thái đăng ký đến `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`). Việc xử lý được thiết kế có chủ đích để bất biến khi lặp lại (idempotent):

1. **Xác minh**: `GatewayService.verifyWebhook` ủy quyền cho bước kiểm tra chữ ký của nhà cung cấp; chữ ký sai trả về 401. Các sự kiện không cần xử lý được trả về 200 ngay.
2. **Khử trùng lặp sự kiện**: `EventLogRepo.loadByProviderId` bỏ qua webhook đã được ghi trong `eventLogs`.
3. **Khử trùng lặp khoản quyên góp**: trước khi tạo bất cứ thứ gì, `DonationRepo.loadByTransactionId` được kiểm tra với mọi id ứng viên mà payload có thể chứa. Bước này xử lý các lần gửi lặp, các sự kiện ACH nhiều giai đoạn (pending → settled), và trường hợp `/donate/charge` đã ghi nhận khoản quà một cách lạc quan.
4. **Áp dụng**: `classifyWebhookEvent(eventType)` của nhà cung cấp cho biết sự kiện có ý nghĩa gì (`donation` pending/complete, `cancel-subscription`, hoặc `ignore`). Các khoản thanh toán hoàn tất tạo một khoản quyên góp `complete` (hoặc nâng cấp một khoản `pending` hoặc `failed` đã có). Các sự kiện kiểu ACH được ghi là `pending` cho đến khi quyết toán. Một hóa đơn đăng ký thất bại (`invoice.payment_failed` của Stripe) tạo một khoản quyên góp `failed` được khóa theo id hóa đơn. Các sự kiện hủy xóa dòng `subscriptions` cục bộ. Controller không bao giờ kiểm tra tên sự kiện đặc thù của nhà cung cấp.

### Quà định kỳ thất bại và nhắc thanh toán (dunning)

Một khoản quyên góp `failed` là đơn vị công việc cho việc thu hồi. `GET /giving/donations/failed` liệt kê chúng cùng thông báo lỗi mới nhất của gateway lấy từ `eventLogs`, và cờ `canRetry` lấy từ khả năng của gateway. `POST /giving/donate/retry/:donationId` gọi `retryFailedPayment` của nhà cung cấp (Stripe thanh toán hóa đơn đang mở), và webhook sinh ra sẽ nâng dòng lên `complete` qua đường khử trùng lặp thông thường. Email nhắc thanh toán được gửi cho người quyên góp từ trình xử lý webhook vào ngày 0, rồi từ `DunningHelper.run` trong bộ hẹn giờ nửa đêm (được kết nối trong cả `lambda/timer-handler.ts` và `RailwayCron.ts`) vào ngày 3 và ngày 7. Mỗi lần gửi được ghi vào `eventLogs` với `provider: "dunning"`, `providerId: "<donationId>:<day>"`, nên việc chạy lại không bao giờ gửi email hai lần. Khi Stripe từ bỏ và hủy đăng ký (`customer.subscription.deleted` với `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled` gửi email một lần cho người quyên góp (`providerId: "<subscriptionId>:canceled"`). Việc hủy do người quyên góp hoặc admin khởi tạo thì không gửi gì. Stripe không bao giờ thêm sự kiện vào một endpoint đã có: sau khi thay đổi `StripeHelper.webhookEvents`, hoặc lưu lại gateway, hoặc chạy `tools/manual/stripe-webhook-events.ts` (mặc định là chạy thử, `--apply` để ghi) trên production.

Các nhà cung cấp có `logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack) có các khoản charge được ghi từ phản hồi `/charge` (không cần vòng webhook cho luồng thành công), còn Stripe dựa vào `payment_intent.succeeded` / `invoice.paid` và ACH `payment_intent.processing`. Việc xử lý phí (`POST /giving/donate/fee`, cờ gateway `payFees`, và `calculateFees` của mỗi nhà cung cấp) tính toán phần tăng tổng "chi trả phí" ở phía người quyên góp. B1 không thu phần trăm trên nền tảng, nên không bao giờ có phí ứng dụng nào được thêm vào.

:::info
Đường charge và đường webhook ghi cùng các dòng `donations` / `fundDonations`. `transactionId` là khóa nối giúp một lần ghi charge lạc quan và webhook đến sau đó không tạo ra hai khoản quyên góp cho cùng một khoản quà.
:::

## Trang liên quan

- [Các endpoint Giving](../api/endpoints/giving): toàn bộ bề mặt REST cho quyên góp, quỹ, lô, gateway, đăng ký, phương thức thanh toán và webhook
- [AppHelper](../shared-libraries/app-helper): gói npm chứa registry nhà cung cấp thanh toán và các thành phần quyên góp
- [Cấu trúc module](../api/module-structure): cách module GivingApi được tổ chức phía server
