---
title: "Giving 아키텍처"
---

# Giving 아키텍처

<div class="article-intro">

ChurchApps는 게이트웨이 레일(gateway-rail) 모델로 헌금을 처리합니다. 교회가 자체 Stripe(또는 PayPal, Kingdom Funding, Paystack) 계정을 보유하며, B1은 플랫폼 결제 처리자로서 결제 경로에 관여하지 않습니다. 카드 정보는 브라우저에서 토큰화되며 ChurchApps 서버에는 전달되지 않습니다. 이 페이지는 전체 스택을 설명합니다 — `@churchapps/apphelper`의 클라이언트 측 결제 제공자 레지스트리, GivingApi 게이트웨이 추상화, 헌금 데이터 모델, 그리고 게이트웨이 웹훅이 데이터베이스에 다시 반영되는 방식입니다.

</div>

## 개요

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

스택 전반에 걸쳐 세 가지 원칙이 적용됩니다:

1. **카드 정보는 게이트웨이가 보관합니다.** 모든 제공자의 입력 위젯은 브라우저에서 토큰화하며, API는 토큰, nonce 또는 주문 ID만 받습니다.
2. **하나의 추상화, 여러 제공자.** 브라우저는 레지스트리에서 `PaymentProvider`를 찾고, 서버는 팩토리에서 `IGatewayProvider`를 찾습니다. 두 곳 모두 게이트웨이 레코드에 저장된 동일한 정규화된 제공자 이름을 기준으로 합니다.
3. **결제 완료의 기준은 웹훅입니다.** 청구 응답은 낙관적으로 기록되지만, 완료된 헌금을 확정(또는 생성)하는 것은 게이트웨이의 서명된 웹훅이며, 양쪽 모두 멱등성 가드가 있습니다.

## 클라이언트 측: 결제 제공자 레지스트리 (`@churchapps/apphelper`)

레지스트리는 `Packages/apphelper/src/donations/providers/`에 있으며, 각 제공자의 위젯과 헬퍼는 자체 하위 폴더(`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`)에 있습니다. `providers/` 바깥의 어떤 코드도 제공자 이름으로 분기하지 않습니다. `PaymentProvider`(`providers/types.ts` 참고)는 하나의 게이트웨이에 필요한 호스트 앱의 모든 요소를 묶습니다. 즉, `descriptor`(관리자 레이블, 지원 통화, 수수료 필드, 기본 수수료율, 대시보드/가입 URL), `capabilities` 플래그 집합(저장된 카드, ACH, 정기 결제, 인라인 신규 카드 입력, 토큰화 시 자동 저장), 교인 입력용 React 위젯(`MemberWrapper`/`MemberEntry`), 게스트 헌금(`GuestForm`), 저장된 결제 수단 편집(`MethodEditForm`), 양식 질문 결제(`FormPayment`), 그리고 `buildChargeRequest(ctx, token)`입니다. `buildChargeRequest`는 제공자마다 청구 요청 형태가 다르게 처리되는 유일한 지점입니다. 각 제공자의 `MemberWrapper`는 게이트웨이 레코드의 공개 키로 자체 SDK를 로드하므로, 호스트 앱이 게이트웨이 SDK를 직접 import할 필요가 없습니다(B1App과 B1Admin에는 `@stripe/*` 의존성이 없습니다). `pickDefaultGateway(gateways, capability?)`는 각 화면이 교회의 게이트웨이 중 어느 것을 사용할지 한곳에서 결정합니다.

`providers/registry.ts`에는 기본 제공 제공자가 들어 있습니다. 이들은 모듈 부수 효과로 등록되지 않고 **값으로 직접 참조**되므로, 번들러의 트리 쉐이킹이 등록을 누락시킬 수 없습니다:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| 함수 | 용도 |
|----------|---------|
| `getPaymentProvider(name)` | 정규화된 이름으로 조회하며, 실패 시 Stripe로 대체하여 잘못 설정된 제공자가 헌금 양식을 중단시키지 않도록 합니다 |
| `registerPaymentProvider(p)` | 실행 중에 추가 제공자를 등록합니다(호스트 앱의 커스텀 게이트웨이용) |
| `listPaymentProviders()` | 기본 제공 + 커스텀 제공자를 열거합니다 — 관리자 게이트웨이 드롭다운을 만드는 데 사용됩니다 |
| `hasPaymentProvider(name)` | 등록 여부를 확인합니다 |

**기본 제공 클라이언트 제공자: Stripe, PayPal, Kingdom Funding, Paystack.** B1App과 B1Admin은 레지스트리를 *읽기만* 합니다(`getPaymentProvider`, `listPaymentProviders`). 둘 다 `registerPaymentProvider`를 호출하지 않으며, 등록은 apphelper 내부에 머무릅니다.

각 제공자는 토큰화 방식이 다르지만, 모두 카드 정보를 B1 바깥에 둡니다:

| 제공자 | 입력 위젯 | API로 반환되는 토큰 |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; 게스트 양식에는 `ExpressCheckoutElement`(Apple Pay / Google Pay, 일회성 헌금)도 마운트되며, 그 `onConfirm`은 동일한 `pm_…` ID로 해석됩니다 | 결제 수단 ID(`pm_…`); 은행 계좌는 `/paymentmethods/ach-setup-intent`를 통해 설정 — USD 게이트웨이는 Financial Connections `us_bank_account`, CAD 게이트웨이는 캐나다 PAD `acss_debit`(호스팅된 위임장 모달, 위임장 `default_for` 인보이스/구독, 일회성 청구는 위임장 ID 전달) |
| Kingdom Funding | 게이트웨이 공개 키로 구성된 호스팅 토큰화 양식 | 일회용 nonce |
| PayPal | PayPal Hosted Fields(카드, 정기 결제)와 Venmo 결제를 포함한 PayPal Smart Buttons(일회성); 둘 다 하나의 SDK 로드를 공유하며, 서버 주문은 `/donate/client-token` + `/donate/create-order`를 통해 생성됩니다 | 캡처된 주문 ID |
| Paystack | Paystack Inline 팝업(`js.paystack.co/v2/inline.js`) — 결제는 팝업 자체가 처리합니다(카드, 모바일 머니, 계좌 이체, USSD) | 결제된 거래 참조 값; 저장된 결제 수단은 Paystack `AUTH_…` 권한 코드입니다 |

Stripe의 `finalizeResult`는 헌금이 완료된 것으로 간주되기 전에 브라우저에서 3-D Secure / SCA를 실행합니다(`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`). 공유 양식은 `provider.finalizeResult(result)`를 호출할 뿐이며, 그 내부 동작은 알지 못합니다.

## 서버 측: 게이트웨이 추상화 (GivingApi)

`/giving` 모듈(`Api/src/modules/giving`)은 REST 인터페이스를 노출하며, 게이트웨이 관련 로직은 `Api/src/shared/helpers`에 있습니다. `DonateController`는 게이트웨이 SDK를 직접 호출하지 않고 `GatewayService`를 거칩니다. `GatewayService`는 `GatewayFactory`에서 적합한 `IGatewayProvider`를 찾고, 복호화된 `GatewayConfig`를 전달합니다.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider`(`shared/helpers/gateways/IGatewayProvider.ts`)는 모든 게이트웨이가 구현하는 계약입니다. 웹훅 수명 주기(`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), 결제(`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), 수수료(`calculateFees`), 저장된 결제 수단 처리(`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), 그리고 선택 기능(고객, 주문, SetupIntent, 이벤트 재생, 실패한 구독 인보이스를 위한 `retryFailedPayment`, Apple Pay 도메인 검증을 위한 `registerPaymentMethodDomain`)을 포함합니다. 선택적 훅을 생략한 제공자는 해당 작업이 지원되지 않는 것으로 보고되며, UI는 해당 컨트롤을 숨깁니다. 각 제공자 클래스는 자체 `capabilities` 매트릭스(지원 통화, ACH, 환불, 구독 요건, 거래 한도)를 선언하며, `GatewayService.getProviderCapabilities(provider)`는 이를 읽기만 합니다. `logsDonationsImmediately` 같은 플래그는 컨트롤러 동작을 결정하며, 컨트롤러 내부에 제공자 이름에 따른 조건문은 없습니다.

**`GatewayFactory`에 등록된 서버 제공자:**

| 제공자 | 사용 가능 여부 |
|----------|-------------|
| Stripe | 항상 사용 |
| PayPal | 항상 사용 |
| Kingdom Funding | 항상 사용 |
| Paystack | 항상 사용(나이지리아, 가나, 남아프리카 공화국, 케냐, 코트디부아르 가맹점; 통화 NGN/GHS/ZAR/KES/XOF/USD) |
| Square | `ENABLE_SQUARE` 환경 플래그로 선택 사용 |
| ePayMints | `ENABLE_EPAYMINTS` 환경 플래그로 선택 사용 |

Paystack은 GivingApi가 개입하기 전에 자금이 이동한다는 점에서 다른 제공자와 다릅니다. 팝업이 기부자에게 청구하며, `processCharge`는 `GET /transaction/verify/:reference`입니다. 이때 결제된 금액과 통화가 기록될 헌금과 일치해야 하며, 이미 기록된 참조는 두 번 기록되지 않습니다. 정기 헌금 일정의 첫 번째 헌금은 `finalizeSubscription`에서 기록됩니다(verify → `POST /plan` → `POST /subscription`, `start_date`는 한 주기 후). 웹훅은 비밀 키 자체로 서명되며(`x-paystack-signature`, 원본 본문에 대한 HMAC-SHA512), Paystack은 웹훅 관리 API를 제공하지 않으므로 관리자 화면에는 교회가 Paystack 대시보드에 붙여넣을 URL이 표시됩니다. 갱신 `charge.success` 이벤트에는 펀드 분배 정보가 없으며, 제공자는 기부자의 로컬 `subscriptions`/`subscriptionFunds` 행에서 이를 복구합니다. 카드 승인만 `reusable`이며, 모바일 머니 헌금은 일회성 전용이므로 `createSubscription`은 이를 거부합니다. 데모 데이터는 Paystack 테스트 모드 GHS 게이트웨이를 사용하는 두 번째 교회(Accra Community Church, `CHU00000002`)를 시드하여, Grace의 Stripe 테스트와 함께 Paystack Playwright 테스트 모음이 실행될 수 있도록 합니다.

`ENABLE_CUSTOM_GATEWAY_PROVIDERS`가 설정되면 커스텀 제공자를 실행 중에 등록할 수 있으며, `AbstractExperimentalGatewayProvider`가 그 기반 클래스입니다. 제공자 이름은 대소문자를 구분하지 않고 매칭됩니다.

### 게이트웨이 구성 및 비밀 정보

관리자는 `POST /giving/gateways`(`GatewayController`)를 통해 게이트웨이 자격 증명을 저장합니다. 저장 시 컨트롤러는 개인 키와 웹훅 키를 저장 전에 `EncryptionHelper`로 암호화하고, localhost가 아닌 호스트에서는 교회의 기존 웹훅을 삭제한 뒤 `/giving/donate/webhook/{provider}?churchId=…`를 가리키는 새 웹훅을 생성합니다. 교회는 제공자마다 한 행만 가지며, 게이트웨이를 저장하면 같은 제공자의 기존 행만 교체됩니다. 공개 조회(`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`)는 공개 키만 반환합니다.

## 데이터 모델

giving 스키마(`Api/src/modules/giving/db/DatabaseTypes.ts`, `models/`의 모델)는 Kysely를 통해 접근하는 MySQL 스키마입니다:

| 테이블 | 역할 |
|-------|------|
| `gateways` | 교회별 제공자 설정: `provider`, `publicKey`, 암호화된 `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | 헌금 지정 항목(`name`, `taxDeductible`, `productId`) |
| `donationBatches` | 입력 및 보고를 위한 묶음(`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | 헌금 1건: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; 명세서, 합계, 대시보드, 헌금 보고서는 `complete` 또는 null만 집계), `transactionId` |
| `fundDonations` | 헌금을 하나 이상의 펀드에 배분(`donationId`, `fundId`, `amount`) |
| `subscriptions` | 정기 헌금; `id`는 게이트웨이의 구독 ID이며 `personId`, `customerId`, `gatewayId`와 연결됩니다 |
| `subscriptionFunds` | 정기 헌금의 펀드 분배 |
| `customers` | `provider`별로 `personId`를 게이트웨이 고객 ID에 연결합니다 |
| `gatewayPaymentMethods` | 저장된 카드/은행 계좌: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | 웹훅/이벤트 감사 기록 및 중복 제거 키(`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | 펀드에 연결된 약정 캠페인, 그리고 각 교인의 약정 금액 |

헌금은 `fundDonations`를 통해 여러 펀드에 나뉩니다. 헌금 레코드는 총액을, 각 `fundDonation`은 그 일부를 담습니다. `donations.currency`와 `gateways.currency`는 ISO 통화 코드를 담으며, 각 제공자는 `supportedCurrencies`를 광고하고, 금액은 `CurrencyHelper.formatCurrencyWithLocale`로 형식화됩니다.

## 주요 흐름

### 교인의 일회성 및 정기 헌금 (B1App)

로그인한 사용자의 헌금 화면(`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`)은 apphelper 컴포넌트 세 개(`MultiGatewayDonationForm`, `PaymentMethods`, `RecurringDonations`)를 조합합니다. B1App은 주변 데이터를 로드합니다 — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — 그리고 게이트웨이 목록을 전달합니다. 해결된 제공자는 게이트웨이의 공개 키로 자체 SDK를 로드합니다. 실제 청구는 apphelper 내부에서 이루어집니다. 해결된 제공자가 (새로운 또는 저장된) 결제 수단을 토큰화한 뒤, 일회성 헌금은 `/giving/donate/charge`, 정기 헌금은 `/giving/donate/subscribe`로 전송합니다. 두 엔드포인트 모두 로그인한 기부자를 본인의 `personId`로 귀속시키며(`donations.edit` 권한이 있는 사용자만 다른 사람으로 귀속 가능), 총 금액을 초과하는 펀드 분배는 거부합니다. 정기 헌금은 `subscriptions` 행과 `subscriptionFunds`를 생성하고, 일정을 게이트웨이에 넘깁니다(Stripe Subscriptions, PayPal Billing Plans, 또는 KF 정기 일정).

### 게스트 / 익명 헌금

공개 헌금 페이지(`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`)와 "지금 헌금하기" 패널은 `@churchapps/apphelper/website`의 `NonAuthDonationWrapper`를 렌더링합니다. 이 래퍼는 제공자의 `GuestForm` 주변에 reCAPTCHA와 게이트웨이의 Elements 컨텍스트를 주입합니다. 게스트는 로그인, 저장된 결제 수단, 이력이 없습니다. 흐름은 `GET /giving/funds/churchId/:id`와 `GET /giving/donate/gateways/:churchId`(공개 키만)를 가져오고, `POST /giving/donate/captcha-verify`로 방문자를 확인하고, 브라우저에서 토큰화한 뒤, `/giving/donate/charge`(또는 `/subscribe`)로 전송합니다. 게스트 ACH는 익명 `POST /giving/paymentmethods/ach-setup-intent-anon`을 사용하며, 이는 즉시(Financial Connections) 확인만 허용합니다. 소액 입금 확인은 며칠 뒤에 끝나는데, 그때는 게스트 페이지가 이미 사라졌기 때문에 헌금을 완료할 수 없습니다. 양식은 확인되지 않은 SetupIntent로 청구하기를 거부하고, 기부자를 카드 또는 로그인한 상태의 은행 계좌 설정으로 안내합니다.

게스트 양식의 세 가지 옵션은 모두 같은 청구 호출을 사용합니다. 헌금 URL의 `?fundId=`와 `?amount=`는 펀드 분배를 미리 선택합니다(각 제공자의 게스트 양식이 마운트 시 읽으며, 일반 펀드 변경 핸들러를 거쳐 합계와 수수료가 갱신됩니다). `anonymous: true`는 `DonateController.charge`가 클라이언트가 보낸 교인 정보를 모두 버리고 `personId = null`로 헌금을 기록하게 합니다. 게스트 양식은 `/people/loadOrCreate`와 고객/보관 단계를 건너뛰며, 즉시 기록하는 세 제공자는 게이트웨이 고객에서 교인을 찾는 일을 중단합니다. Apple Pay는 페이지의 도메인이 Stripe에 등록되어 있어야 하므로, Stripe 게스트 양식은 세션당 한 번 공개되고 속도 제한이 걸린 `POST /giving/donate/register-domain`에 요청합니다. 이 엔드포인트는 교회에 속한 도메인만 허용하며(`<subDomain>.b1.church`, 콘텐츠 모듈의 도메인 테이블에 있는 행, 또는 로컬 호스트), 그 후 Stripe의 payment-method-domains API를 호출합니다.

### 관리자의 헌금 기록 및 Stripe 가져오기 (B1Admin)

B1Admin의 헌금 섹션(`B1Admin/src/donations/`)은 재무팀이 작업하는 곳입니다. 일괄 입력(`components/BulkDonationEntry.tsx`)은 현금/수표/현물 헌금을 `/giving/donations`와 `/giving/funddonations`로 전송하여 기록합니다 — 게이트웨이는 관여하지 않습니다. 교인 레코드의 **헌금 기록** 시트(`components/LogGiftDialog.tsx`)는 한 건의 헌금에 대해 같은 작업을 수행하며, 먼저 `batchDate`가 헌금 날짜와 일치하는 묶음을 찾거나, 해당 날짜의 이름으로 새 묶음을 생성합니다(`POST /giving/donationbatches`). 이후 단계가 실패하면 헌금과 새로 만든 묶음을 다시 삭제합니다. 펀드, 묶음, 캠페인, 명세서는 각각의 `/giving/*` CRUD 라우트에 대응합니다. 헌금 명세서 페이지(`BatchGivingStatementsPage`, `PrintAllStatementsPage`)는 교회의 전체 이력이 아니라 달력 연도 하나를 `GET /donations?startDate=&endDate=`와 `GET /fundDonations?startDate=&endDate=`로 요청합니다. 전체 이력은 Lambda의 응답 크기 제한을 넘을 수 있기 때문입니다. 교인 스타일의 헌금 패널(`B1Admin/src/donationComponents/`)은 B1App과 같은 apphelper 컴포넌트를 재사용합니다.

보고 및 회계 전달은 게이트웨이 작업이 아니라 클라이언트 측 또는 보고서 실행기 작업입니다. 묶음 페이지의 QuickBooks 내보내기는 묶음의 `donations` + `fundDonations`로부터 분개 CSV를 만듭니다(Undeposited Funds 차변, 펀드별 대변 한 건). 요약 페이지의 Lapsed Givers 보기는 `Api/reports/lapsedGivers.json`을 일반 보고서 실행기로 실행하며, 교인 이름은 `ReportOutput`이 해석합니다. 국가별 영수증 형식(캐나다 / 호주 / 뉴질랜드)은 교회 설정이며, 멤버십 키/값 저장소에 저장되어 `GivingStatementDocument`가 렌더링하고, B1App 인쇄 페이지에도 중복되어 있습니다. B1Admin의 명세서 인쇄 페이지(`PrintDonationPage`, `PrintAllStatementsPage`)는 교회의 `logoLight` 설정을 전달하여(`B1Admin/src/components/PrintChurchHeader.tsx`의 `usePrintLogo` 사용), 각 명세서 상단에 로고가 인쇄되도록 하며, 자동 인쇄 전에 이미지가 로드될 때까지 기다립니다.

### 묶음 상태와 헌금 입력 권한

묶음을 마감하면 집계된 입금 내역이 그대로 유지됩니다. `POST /giving/donationbatches/:id/close`와 `/:id/reopen`(Donations.Edit 전용)만이 `status`, `closedDate`, `closedBy`를 기록할 수 있는 경로입니다(`DonationBatchRepo.setStatus`). 일반 묶음 저장은 이 값들을 건드리지 않으므로, 묶음을 게시한다고 해서 마감이 해제되지는 않습니다. 쓰기 권한은 `Api/src/modules/giving/helpers/BatchAccessHelper.ts`에 집중되어 있습니다. Donations.Edit은 무엇이든 변경할 수 있습니다. 더 좁은 권한인 Donations.Enter(`GivingApi` / `Donations` / `Enter`, 역할 편집기에서 "헌금 입력")는 묶음을 생성하고, 헌금과 펀드 분배를 저장하거나 삭제할 수 있지만, 헌금의 현재 묶음과 대상 묶음이 모두 열려 있을 때만, 그리고 게이트웨이 헌금(`transactionId`가 있는 헌금)에 대해서는 절대 허용되지 않습니다. 차단된 쓰기는 `403 { error: "This batch is closed." }`를 반환합니다. 묶음 읽기는 Donations.ViewSummary 또는 Donations.Enter를 허용하므로, 계수 담당자가 입력할 묶음을 선택할 수 있습니다. 클라이언트에서는 `B1Admin/src/donations/batchAccess.ts`가 이 규칙(`canSeeBatches`, `canEnterDonations`, `canChangeBatch`)을 그대로 반영하며, `Header` / `SecondaryMenuHelper`는 요약 보기 권한이 없더라도 묶음을 볼 수 있는 모든 사용자에게 **헌금 > 묶음**을 표시합니다.

### 여러 통화가 섞인 합계 변환

여러 통화가 섞일 수 있는 헌금을 하나의 합계로 반환하는 모든 엔드포인트 — 헌금 요약 KPI(`GivingKpiCards`), 헌금 묶음 합계, 펀드 합계, 그리고 B1App 헌금 화면의 연간/기간 합계 — 는 서로 다른 통화를 더하는 대신 서버에서 교회의 기본 통화로 변환합니다. `Api/src/shared/helpers/ExchangeRateHelper.ts`는 교회 통화를 기준으로 `api.frankfurter.dev`에서 환율을 가져오고, 프로세스 내에서 12시간 동안 캐시하며, `convertTotals(rows, churchCurrency, rates)`를 제공합니다. 행은 SQL에서 통화별로 미리 그룹화되므로(헌금 건별 변환이 아니라 소수의 그룹), 각 그룹이 변환된 후 합산되며, 결과에는 `isConverted` 플래그가 포함됩니다. 클라이언트는 이 플래그를 사용하여 "현재 환율로 변환됨" 안내를 표시합니다. `GET /donations/exchange-rates`는 환율표가 필요한 클라이언트(B1App 헌금 화면)에 이를 노출합니다. 환율은 요청에서 절대 받지 않고 서버에서만 가져오므로, 클라이언트가 보고되는 합계에 영향을 줄 수 없습니다. 개별 헌금 기록과 과거/원래 통화 보고서는 변환되지 않으며, 합산된 합계만 변환됩니다.

Stripe 가져오기(`B1Admin/src/donations/StripeImportPage.tsx`)는 B1 바깥에서 이루어진 헌금을 보충합니다. `dryRun: true`로 `POST /giving/donate/replay-stripe-events`를 호출하여 미리 보기를 한 뒤, `dryRun: false`로 가져옵니다. 서버는 날짜 범위의 Stripe 이벤트를 나열하고, 이미 기록된 항목은 건너뜁니다. 먼저 `eventLogs` 제공자 ID로, 다음으로 거래 ID로, 그다음 `DonationRepo.findMatchingDonation`(금액 + 날짜 + 교인)으로 매칭하므로 재실행해도 중복 가져오기가 발생하지 않습니다. 구독 `charge.succeeded` / `payment_intent.succeeded` 이벤트는 `invoice.paid`가 해당 헌금을 기록하므로 건너뜁니다. 최신 Stripe API 버전은 `PaymentIntent.invoice`를 제거하므로, 건너뛰기 로직은 "Subscription …" 설명 문구도 함께 확인합니다.

## 웹훅과 재조정

결제 정산과 구독 상태 변경은 `POST /giving/donate/webhook/:provider?churchId=…`(`DonateController.webhook`)로 도착합니다. 처리는 의도적으로 멱등성을 갖습니다:

1. **검증** — `GatewayService.verifyWebhook`은 제공자의 서명 검사에 위임합니다. 서명이 실패하면 401을 반환합니다. 처리할 필요가 없는 이벤트는 200으로 즉시 종료됩니다.
2. **이벤트 중복 제거** — `EventLogRepo.loadByProviderId`는 `eventLogs`에 이미 기록된 웹훅을 건너뜁니다.
3. **헌금 중복 제거** — 아무것도 생성하기 전에, 페이로드가 담을 수 있는 모든 후보 ID에 대해 `DonationRepo.loadByTransactionId`를 확인합니다. 이는 중복 전송, 다단계 ACH 이벤트(대기 → 정산), 그리고 `/donate/charge`가 이미 헌금을 낙관적으로 기록한 경우를 모두 흡수합니다.
4. **적용** — 제공자의 `classifyWebhookEvent(eventType)`가 이벤트의 의미를 알려줍니다(`donation` 대기/완료, `cancel-subscription`, 또는 `ignore`). 완료된 결제는 `complete` 헌금을 생성하거나(기존 `pending` 또는 `failed` 헌금을 승격), ACH 계열 이벤트는 정산 전까지 `pending`으로 기록되며, 구독 인보이스 결제 실패(Stripe `invoice.payment_failed`)는 인보이스 ID를 키로 하는 `failed` 헌금을 생성하고, 취소 이벤트는 로컬 `subscriptions` 행을 삭제합니다. 컨트롤러는 제공자별 이벤트 이름을 직접 검사하지 않습니다.

### 실패한 정기 헌금과 미납 독촉

`failed` 헌금은 복구 작업의 단위입니다. `GET /giving/donations/failed`는 `eventLogs`의 가장 최근 게이트웨이 실패 메시지와 게이트웨이 기능의 `canRetry` 플래그와 함께 이들을 나열합니다. `POST /giving/donate/retry/:donationId`는 제공자의 `retryFailedPayment`를 호출하며(Stripe는 미결제 인보이스를 결제), 그 결과로 오는 웹훅이 일반 중복 제거 경로를 통해 행을 `complete`로 승격합니다. 미납 독촉 이메일은 웹훅 핸들러에서 0일차에 기부자에게 발송되며, 이후 `DunningHelper.run`이 자정 타이머(`lambda/timer-handler.ts`와 `RailwayCron.ts` 모두에 연결됨)에서 3일과 7일에 발송합니다. 각 발송은 `provider: "dunning"`, `providerId: "<donationId>:<day>"`로 `eventLogs`에 기록되므로 재실행해도 두 번 발송되지 않습니다. Stripe가 결제를 포기하고 구독을 취소하면(`customer.subscription.deleted`에 `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled`가 기부자에게 한 번 이메일을 보냅니다(`providerId: "<subscriptionId>:canceled"`). 기부자나 관리자가 시작한 취소는 조용히 처리됩니다. Stripe는 기존 엔드포인트에 이벤트를 추가하지 않습니다. `StripeHelper.webhookEvents`를 변경한 후에는 게이트웨이를 다시 저장하거나, 운영 환경에 대해 `tools/manual/stripe-webhook-events.ts`를 실행해야 합니다(기본값은 드라이 런이며, 기록하려면 `--apply`를 붙입니다).

`logsDonationsImmediately`를 가진 제공자(PayPal, Kingdom Funding, Paystack)는 `/charge` 응답에서 청구가 기록되며(정상 경로에서는 웹훅 왕복이 필요 없습니다), Stripe는 `payment_intent.succeeded` / `invoice.paid`와 ACH `payment_intent.processing`에 의존합니다. 수수료 처리(`POST /giving/donate/fee`, `payFees` 게이트웨이 플래그, 그리고 각 제공자의 `calculateFees`)는 기부자 측에서 "수수료 부담" 총액 계산을 수행합니다. B1은 플랫폼 수수료를 받지 않으므로 애플리케이션 수수료가 추가되는 일은 없습니다.

:::info
청구 경로와 웹훅 경로는 동일한 `donations` / `fundDonations` 행을 기록합니다. `transactionId`는 결합 키이며, 이를 통해 낙관적 청구 기록과 나중의 웹훅이 하나의 헌금에 대해 두 개의 헌금을 만들지 않도록 합니다.
:::

## 관련 페이지

- [Giving 엔드포인트](../api/endpoints/giving) — 헌금, 펀드, 묶음, 게이트웨이, 구독, 결제 수단, 웹훅에 대한 전체 REST 인터페이스
- [AppHelper](../shared-libraries/app-helper) — 결제 제공자 레지스트리와 헌금 컴포넌트를 제공하는 npm 패키지
- [모듈 구조](../api/module-structure) — GivingApi 모듈이 서버 측에서 구성되는 방식
