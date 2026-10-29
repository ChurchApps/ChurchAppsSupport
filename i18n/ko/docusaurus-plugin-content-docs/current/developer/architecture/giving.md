---
title: "헌금 아키텍처"
---

# 헌금 아키텍처

<div class="article-intro">

ChurchApps는 게이트웨이 레일 모델로 헌금을 처리합니다. 교회가 자체 Stripe(또는 PayPal, Kingdom Funding, Paystack) 계정을 보유하며, B1은 플랫폼 결제 처리자로서 결제 경로에 끼어들지 않습니다. 카드 정보는 브라우저에서 토큰화되며 ChurchApps 서버에 도달하지 않습니다. 이 페이지에서는 `@churchapps/apphelper`의 클라이언트 측 제공업체 레지스트리, GivingApi 게이트웨이 추상화, 헌금 데이터 모델, 그리고 게이트웨이 웹훅이 데이터베이스와 어떻게 대조되는지를 전체 스택에 걸쳐 설명합니다.

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

스택 전체에서 세 가지 원칙이 지켜집니다.

1. **카드는 게이트웨이가 보관합니다.** 모든 제공업체의 입력 위젯은 브라우저에서 토큰화합니다. API는 토큰, 논스, 주문 ID만 받습니다.
2. **하나의 추상화, 여러 제공업체.** 브라우저는 레지스트리에서 `PaymentProvider`를 해석하고, 서버는 팩토리에서 `IGatewayProvider`를 해석합니다. 둘 다 게이트웨이 기록에 저장된 같은 정규화된 제공업체 이름을 키로 사용합니다.
3. **웹훅이 정산의 원천입니다.** 청구 응답은 낙관적으로 기록되지만, 완료된 헌금을 확정하거나 만드는 것은 게이트웨이의 서명된 웹훅이며, 양쪽 모두 멱등성 가드가 있습니다.

## 클라이언트 측: 결제 제공업체 레지스트리 (`@churchapps/apphelper`)

레지스트리는 `Packages/apphelper/src/donations/providers/`에 있으며, 각 제공업체의 위젯과 헬퍼는 자체 하위 폴더(`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`)에 있습니다. `providers/` 밖에서는 어떤 것도 제공업체 이름으로 분기하지 않습니다. `PaymentProvider`(`providers/types.ts` 참고)는 호스트 앱이 한 게이트웨이에 필요한 모든 것을 묶습니다. `descriptor`(관리자 레이블, 지원 통화, 수수료 필드, 기본 수수료율, 대시보드/가입 URL), `capabilities` 플래그 집합(저장된 카드, ACH, 정기, 인라인 새 카드 입력, 토큰화 시 암묵적 저장), 회원 입력용 React 위젯(`MemberWrapper`/`MemberEntry`), 게스트 헌금(`GuestForm`), 저장된 결제 수단 편집(`MethodEditForm`), 양식 질문 결제(`FormPayment`), 그리고 `buildChargeRequest(ctx, token)`입니다. 마지막 것은 청구 페이로드의 모양이 제공업체마다 다른 유일한 자리입니다. 각 제공업체의 `MemberWrapper`는 게이트웨이 기록의 공개 키로 자체 SDK를 불러오므로, 호스트 앱은 게이트웨이 SDK를 import하지 않습니다(B1App과 B1Admin에는 `@stripe/*` 의존성이 없습니다). `pickDefaultGateway(gateways, capability?)`는 어떤 표면이 교회의 게이트웨이 중 무엇을 사용할지 한곳에서 결정합니다.

`providers/registry.ts`에는 기본 제공 제공업체가 들어 있습니다. 이들은 모듈 부수 효과로 등록되지 않고 **값으로 참조**되므로, 번들러의 트리 셰이킹이 등록을 제거할 수 없습니다.

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| 함수 | 목적 |
|----------|---------|
| `getPaymentProvider(name)` | 정규화된 이름으로 해석합니다. 잘못 설정된 제공업체가 헌금 양식을 충돌시키지 않도록 Stripe로 대체합니다 |
| `registerPaymentProvider(p)` | 실행 중에 추가 제공업체를 등록합니다(호스트 앱의 커스텀 게이트웨이용) |
| `listPaymentProviders()` | 기본 제공 + 커스텀 제공업체를 나열합니다. 관리자 게이트웨이 드롭다운을 만드는 데 사용합니다 |
| `hasPaymentProvider(name)` | 존재 여부 확인 |

**기본 제공 클라이언트 제공업체: Stripe, PayPal, Kingdom Funding, Paystack.** B1App과 B1Admin은 레지스트리를 *읽기만* 합니다(`getPaymentProvider`, `listPaymentProviders`). 둘 다 `registerPaymentProvider`를 호출하지 않으며, 등록은 apphelper 안에 머뭅니다.

각 제공업체는 다르게 토큰화하지만, 모두 카드 정보를 B1 밖에 둡니다.

| 제공업체 | 입력 위젯 | API에 반환되는 토큰 |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`. 게스트 양식은 `ExpressCheckoutElement`(Apple Pay / Google Pay, 일회성 헌금)도 마운트하며, 그 `onConfirm`은 같은 `pm_…` ID로 해석됩니다 | 결제 수단 ID(`pm_…`). 은행은 `/paymentmethods/ach-setup-intent`를 통해 연결합니다. USD 게이트웨이는 Financial Connections `us_bank_account`, CAD 게이트웨이는 캐나다 PAD `acss_debit`(호스팅 위임장 모달, 위임장 `default_for` 인보이스/구독, 일회성 청구는 위임장 ID 전달)을 사용합니다 |
| Kingdom Funding | 게이트웨이 공개 키로 키가 지정된 호스팅 토큰화 양식 | 일회용 논스 |
| PayPal | PayPal Hosted Fields(카드, 정기) 및 Venmo 자금 조달을 포함한 PayPal Smart Buttons(일회성). 둘은 하나의 SDK 로드를 공유하며, 서버 주문은 `/donate/client-token` + `/donate/create-order`로 만듭니다 | 캡처된 주문 ID |
| Paystack | Paystack Inline 팝업(`js.paystack.co/v2/inline.js`). 팝업 자체가 결제를 처리합니다(카드, 모바일 머니, 은행 이체, USSD) | 결제 완료된 거래 참조. 저장된 결제 수단은 Paystack `AUTH_…` 승인 코드입니다 |

Stripe의 `finalizeResult`는 헌금이 완료된 것으로 간주되기 전에 브라우저에서 3-D Secure / SCA를 실행합니다(`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`). 공유 양식은 `provider.finalizeResult(result)`만 호출하며, 그것이 무엇을 하는지 알 필요가 없습니다.

## 서버 측: 게이트웨이 추상화 (GivingApi)

`/giving` 모듈(`Api/src/modules/giving`)은 REST 표면을 노출하며, 게이트웨이 배관은 `Api/src/shared/helpers`에 있습니다. `DonateController`는 게이트웨이 SDK와 직접 통신하지 않습니다. `GatewayService`를 거치며, 이는 `GatewayFactory`에서 알맞은 `IGatewayProvider`를 해석하고 복호화된 `GatewayConfig`를 넘겨줍니다.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider`(`shared/helpers/gateways/IGatewayProvider.ts`)는 모든 게이트웨이가 구현하는 계약입니다. 웹훅 수명 주기(`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), 결제(`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), 수수료(`calculateFees`), 저장된 결제 수단 처리(`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), 그리고 선택적 확장 기능(고객, 주문, SetupIntent, 이벤트 재실행, 실패한 구독 인보이스용 `retryFailedPayment`, Apple Pay 도메인 확인용 `registerPaymentMethodDomain`)을 포함합니다. 선택적 훅을 생략한 제공업체는 해당 작업이 지원되지 않는 것으로 보고되며, UI는 그 컨트롤을 숨깁니다. 각 제공업체 클래스는 자체 `capabilities` 매트릭스(지원 통화, ACH, 환불, 구독 요구 사항, 거래 한도)를 선언하며, `GatewayService.getProviderCapabilities(provider)`는 그것을 읽기만 합니다. `logsDonationsImmediately` 같은 플래그가 컨트롤러 동작을 결정하므로, 컨트롤러에는 제공업체 이름에 따른 조건문이 없습니다.

**`GatewayFactory`에 등록된 서버 제공업체:**

| 제공업체 | 사용 가능 여부 |
|----------|-------------|
| Stripe | 항상 사용 |
| PayPal | 항상 사용 |
| Kingdom Funding | 항상 사용 |
| Paystack | 항상 사용(나이지리아, 가나, 남아프리카공화국, 케냐, 코트디부아르 가맹점. 통화 NGN/GHS/ZAR/KES/XOF/USD) |
| Square | `ENABLE_SQUARE` 환경 플래그로 옵트인 |
| ePayMints | `ENABLE_EPAYMINTS` 환경 플래그로 옵트인 |

Paystack은 GivingApi가 관여하기 전에 돈이 이동한다는 점에서 다릅니다. 팝업이 기부자에게 청구하고, `processCharge`는 `GET /transaction/verify/:reference`이며, 결제된 금액과 통화가 기록할 헌금과 일치해야 합니다(이미 기록된 참조는 두 번 기록되지 않습니다). 정기 일정의 첫 헌금은 `finalizeSubscription`(verify → `POST /plan` → `POST /subscription`, `start_date`는 한 주기 뒤)에서 기록됩니다. 웹훅은 비밀 키 자체로 서명되며(`x-paystack-signature`, 원시 본문에 대한 HMAC-SHA512), Paystack은 웹훅 관리 API가 없으므로 관리자 화면은 교회가 자신의 대시보드에 붙여 넣을 URL을 보여 줍니다. 갱신 `charge.success` 이벤트에는 펀드 분할이 없으며, 제공업체는 기부자의 로컬 `subscriptions`/`subscriptionFunds` 행에서 그것을 복구합니다. 카드 승인만 `reusable`입니다. 모바일 머니 헌금은 일회성만 가능하므로 `createSubscription`은 이를 거부합니다. 데모 데이터는 Paystack 테스트 모드 GHS 게이트웨이를 가진 두 번째 교회(Accra Community Church, `CHU00000002`)를 시드하므로, Paystack Playwright 스위트가 Grace의 Stripe 스위트와 나란히 실행됩니다.

`ENABLE_CUSTOM_GATEWAY_PROVIDERS`가 설정되면 커스텀 제공업체를 실행 중에 등록할 수 있습니다. `AbstractExperimentalGatewayProvider`는 그 기반 클래스입니다. 제공업체 이름은 대소문자를 구분하지 않고 매칭됩니다.

### 게이트웨이 설정과 비밀 값

관리자는 `GatewayController`의 `POST /giving/gateways`를 통해 게이트웨이 자격 증명을 저장합니다. 저장 시 컨트롤러는 영구 저장 전에 `EncryptionHelper`로 개인 키와 웹훅 키를 암호화하고, localhost가 아닌 호스트에서는 교회의 기존 웹훅을 삭제한 뒤 `/giving/donate/webhook/{provider}?churchId=…`를 가리키는 새 웹훅을 프로비저닝합니다. 교회는 제공업체마다 행 하나를 유지하며, 게이트웨이를 저장하면 같은 제공업체의 기존 행만 교체됩니다. 공개 읽기(`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`)는 공개 키만 반환합니다.

## 데이터 모델

헌금 스키마(`Api/src/modules/giving/db/DatabaseTypes.ts`, 모델은 `models/`에 있음)는 Kysely로 접근하는 MySQL 스키마입니다.

| 테이블 | 역할 |
|-------|------|
| `gateways` | 교회별 제공업체 설정: `provider`, `publicKey`, 암호화된 `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | 헌금 지정 항목(`name`, `taxDeductible`, `productId`) |
| `donationBatches` | 입력과 보고를 위한 묶음(`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | 헌금 한 건: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status`(`pending`/`complete`/`failed`/`refunded`. 명세서, 합계, 대시보드, 헌금 보고서는 `complete` 또는 null만 집계), `transactionId` |
| `fundDonations` | 헌금을 하나 이상의 펀드에 배분(`donationId`, `fundId`, `amount`) |
| `subscriptions` | 정기 헌금. `id`는 게이트웨이의 구독 ID이며, `personId`, `customerId`, `gatewayId`에 연결됩니다 |
| `subscriptionFunds` | 정기 헌금의 펀드 분할 |
| `customers` | 제공업체별로 `personId`를 게이트웨이 고객 ID에 연결합니다 |
| `gatewayPaymentMethods` | 저장된 카드/은행: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | 웹훅/이벤트 감사 기록과 중복 제거 키(`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | 펀드에 연결된 약정 캠페인과 각 사람의 약정 금액 |

헌금은 `fundDonations`를 통해 여러 펀드에 나뉩니다. 헌금 행은 총액을 담고, 각 `fundDonation`은 그 일부를 담습니다. `donations.currency`와 `gateways.currency`는 ISO 통화를 담으며, 각 제공업체는 `supportedCurrencies`를 광고하고, 금액은 `CurrencyHelper.formatCurrencyWithLocale`로 형식화됩니다.

## 전체 흐름

### 회원의 일회성 및 정기 헌금 (B1App)

인증된 헌금 화면(`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`)은 apphelper의 세 컴포넌트, `MultiGatewayDonationForm`, `PaymentMethods`, `RecurringDonations`를 조합합니다. B1App은 주변 데이터를 불러옵니다. `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions`이며, 게이트웨이 목록을 넘겨줍니다. 해석된 제공업체는 게이트웨이의 공개 키로 자체 SDK를 불러옵니다. 실제 청구는 apphelper 안에서 일어납니다. 해석된 제공업체가 (새 또는 저장된) 결제 수단을 토큰화한 뒤, 일회성 헌금은 `/giving/donate/charge`, 정기 헌금은 `/giving/donate/subscribe`로 보냅니다. 두 엔드포인트 모두 로그인한 기부자를 본인의 `personId`로 귀속시키며(`donations.edit` 보유자만 다른 사람으로 귀속 가능), 청구 금액을 넘는 펀드 분할은 거부합니다. 정기 헌금은 `subscriptions` 행과 `subscriptionFunds`를 만들고, 일정을 게이트웨이에 넘깁니다(Stripe Subscriptions, PayPal Billing Plans, 또는 KF 정기 일정).

### 게스트 / 익명 헌금

공개 헌금 페이지(`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`)와 "give now" 패널은 `@churchapps/apphelper/website`의 `NonAuthDonationWrapper`를 렌더링합니다. 이 래퍼는 제공업체의 `GuestForm` 주변에 reCAPTCHA와 게이트웨이 Elements 컨텍스트를 주입합니다. 게스트에게는 로그인, 저장된 결제 수단, 기록이 없습니다. 흐름은 `GET /giving/funds/churchId/:id`와 `GET /giving/donate/gateways/:churchId`(공개 키만)를 가져오고, `POST /giving/donate/captcha-verify`로 방문자를 확인하며, 브라우저에서 토큰화한 뒤 `/giving/donate/charge`(또는 `/subscribe`)로 보냅니다. 확인 호출은 10분짜리 HMAC 서명 `captchaPass`(`Api/src/modules/giving/helpers/CaptchaPass.ts`)를 반환하며, 양식은 게스트의 모든 금액 호출에 이를 포함합니다. `CAPTCHA_ENFORCE=true`이면 API는 해당 교회의 유효한 통과권 없이 온 게스트 `create-order`, `charge`, `subscribe`, `addcard`, `ach-setup-intent-anon` 호출을 거부합니다. 게스트 ACH는 익명 `POST /giving/paymentmethods/ach-setup-intent-anon`을 사용하며, 이는 즉시(Financial Connections) 확인만 허용합니다. 소액 입금 확인은 게스트 페이지가 사라진 뒤 며칠 후에 끝나므로, 헌금을 완료할 수 없기 때문입니다. 양식은 확인되지 않은 SetupIntent로는 청구하지 않으며, 기부자에게 카드나 로그인한 은행 설정을 사용하라고 안내합니다.

같은 청구 호출에 세 가지 게스트 양식 옵션이 붙습니다. 헌금 URL의 `?fundId=`와 `?amount=`는 펀드 분할을 미리 선택합니다(각 제공업체의 게스트 양식이 마운트될 때 읽으며, 일반 펀드 변경 핸들러를 거쳐 합계와 수수료가 갱신됩니다). `anonymous: true`는 `DonateController.charge`가 클라이언트가 보낸 사람을 모두 버리고 `personId = null`로 헌금을 기록하게 합니다. 게스트 양식은 `/people/loadOrCreate`와 고객/금고 단계를 건너뛰며, 즉시 기록하는 세 제공업체는 게이트웨이 고객에서 사람을 해석하지 않습니다. Apple Pay에는 페이지의 도메인이 Stripe에 등록되어 있어야 하므로, Stripe 게스트 양식은 세션당 한 번 공개되고 요청 빈도가 제한된 `POST /giving/donate/register-domain`에 게시합니다. 이 엔드포인트는 교회의 도메인(`<subDomain>.b1.church`, 콘텐츠 모듈 도메인 테이블의 행, 또는 로컬 호스트)만 허용한 뒤 Stripe의 payment-method-domains API를 호출합니다.

### 관리자 기록과 Stripe 가져오기 (B1Admin)

B1Admin의 헌금 섹션(`B1Admin/src/donations/`)은 재무 팀이 작업하는 곳입니다. 배치 입력(`components/BulkDonationEntry.tsx`)은 `/giving/donations`를 보낸 다음 `/giving/funddonations`를 보내서 현금/수표/현물 헌금을 기록합니다. 게이트웨이는 관여하지 않습니다. 사람 기록의 **Log a gift** 시트(`components/LogGiftDialog.tsx`)도 한 건에 대해 같은 일을 합니다. 먼저 `batchDate`가 헌금 날짜와 일치하는 배치를 찾거나, 그 날짜의 이름으로 하나를 만듭니다(`POST /giving/donationbatches`). 이후 단계가 실패하면 헌금이나 새 배치를 다시 삭제합니다. 펀드, 배치, 캠페인, 명세서는 각각 `/giving/*` CRUD 라우트에 매핑됩니다. 헌금 명세서 페이지(`BatchGivingStatementsPage`, `PrintAllStatementsPage`)는 교회의 전체 기록 대신 `GET /donations?startDate=&endDate=`와 `GET /fundDonations?startDate=&endDate=`로 한 달력 연도를 요청합니다. 전체 기록은 Lambda의 응답 크기 제한을 넘을 수 있기 때문입니다. 멤버 스타일의 헌금 패널(`B1Admin/src/donationComponents/`)은 B1App과 같은 apphelper 컴포넌트를 재사용합니다.

보고와 회계 전달은 게이트웨이 작업이 아니라 클라이언트 측이나 보고서 실행기 작업입니다. 배치 페이지의 QuickBooks 내보내기는 배치의 `donations` + `fundDonations`로 분개 CSV를 만듭니다(Undeposited Funds 차변, 펀드마다 대변 한 줄). 요약 페이지의 Lapsed Givers 보기는 `Api/reports/lapsedGivers.json`을 일반 보고서 실행기로 실행하며, 사람 이름은 `ReportOutput`이 해석합니다. 국가별 영수증 형식(캐나다 / 호주 / 뉴질랜드)은 교회 설정이며, 멤버십 키/값 저장소에 있고 `GivingStatementDocument`가 렌더링하며 B1App 인쇄 페이지에도 중복되어 있습니다. B1Admin의 명세서 인쇄 페이지(`PrintDonationPage`, `PrintAllStatementsPage`)는 교회의 `logoLight` 설정을 전달하므로(`B1Admin/src/components/PrintChurchHeader.tsx`의 `usePrintLogo`), 로고가 각 명세서 상단에 인쇄되며, 자동 인쇄 전에 이미지를 기다립니다.

### 배치 상태와 Enter Donations 권한

집계된 입금이 그대로 유지되도록 배치를 마감할 수 있습니다. `POST /giving/donationbatches/:id/close`와 `/:id/reopen`(Donations.Edit만 가능)은 `status`, `closedDate`, `closedBy`를 쓰는 유일한 주체입니다(`DonationBatchRepo.setStatus`). 일반 배치 저장은 이 값들을 건드리지 않으므로, 배치를 게시해도 다시 열리지 않습니다. 쓰기 권한은 `Api/src/modules/giving/helpers/BatchAccessHelper.ts`에 집중되어 있습니다. Donations.Edit은 무엇이든 변경할 수 있습니다. 더 좁은 Donations.Enter 권한(`GivingApi` / `Donations` / `Enter`, 역할 편집기의 "Enter Donations")은 배치를 만들고, 헌금과 펀드 분할을 저장하거나 삭제할 수 있지만, 헌금의 현재 배치와 대상 배치가 모두 열려 있을 때만 가능하며 게이트웨이 헌금(`transactionId`가 있는 것)에는 절대 허용되지 않습니다. 차단된 쓰기는 `403 { error: "This batch is closed." }`를 반환합니다. 배치 읽기는 Donations.ViewSummary 또는 Donations.Enter를 허용하므로, 계수자는 자신이 입력하는 배치를 고를 수 있습니다. 클라이언트에서는 `B1Admin/src/donations/batchAccess.ts`가 이 규칙(`canSeeBatches`, `canEnterDonations`, `canChangeBatch`)을 반영하며, `Header` / `SecondaryMenuHelper`는 View Summary가 없어도 배치를 볼 수 있는 모든 사람에게 **Donations > Batches**를 표시합니다.

### 통화가 섞인 합계 변환

통화가 섞일 수 있는 여러 헌금에 대해 하나의 합계를 반환하는 모든 엔드포인트, 즉 헌금 요약 KPI(`GivingKpiCards`), 헌금 배치 합계, 펀드 합계, B1App 헌금 화면의 연초 이후/기간 합계는 서로 다른 통화를 더하지 않고 서버에서 교회의 기본 통화로 변환합니다. `Api/src/shared/helpers/ExchangeRateHelper.ts`는 교회 통화를 키로 `api.frankfurter.dev`에서 환율을 가져오고, 프로세스 안에서 12시간 캐시하며, `convertTotals(rows, churchCurrency, rates)`를 노출합니다. 행은 SQL에서 통화별로 미리 묶이며(헌금마다 변환하는 것이 아니라 소수의 그룹), 각 그룹이 변환되어 합산되고, 결과에는 `isConverted` 플래그가 붙습니다. 클라이언트는 이 플래그를 사용해 "Converted at current exchange rates" 안내를 표시합니다. `GET /donations/exchange-rates`는 환율표가 필요한 클라이언트(B1App 헌금 화면)에 노출됩니다. 환율 자체는 요청에서 받지 않으며 항상 서버에서 가져오므로, 클라이언트가 보고된 합계에 영향을 줄 수 없습니다. 개별 헌금 기록과 과거/원래 통화 보고서는 변환되지 않습니다. 결합된 합계만 변환됩니다.

Stripe 가져오기(`B1Admin/src/donations/StripeImportPage.tsx`)는 B1 밖에서 이루어진 헌금을 채워 넣습니다. 미리 보기를 위해 `dryRun: true`로 `POST /giving/donate/replay-stripe-events`를 호출하고, 가져오기를 위해 `dryRun: false`로 호출합니다. 서버는 날짜 범위의 Stripe 이벤트를 나열하고, 이미 기록된 것은 건너뜁니다. 먼저 `eventLogs` 제공업체 ID로, 그다음 거래 ID로, 그다음 `DonationRepo.findMatchingDonation`(금액 + 날짜 + 사람)으로 대조하므로 재실행해도 두 번 가져오지 않습니다. 구독의 `charge.succeeded` / `payment_intent.succeeded` 이벤트는 `invoice.paid`가 그 헌금을 기록하므로 건너뜁니다. 최신 Stripe API 버전은 `PaymentIntent.invoice`를 제거하므로, 건너뛰기는 "Subscription …" 설명도 확인합니다.

## 웹훅과 대조

정산된 결제와 구독 상태 변경은 `POST /giving/donate/webhook/:provider?churchId=…`(`DonateController.webhook`)로 들어옵니다. 처리는 의도적으로 멱등적입니다.

1. **확인** — `GatewayService.verifyWebhook`이 제공업체의 서명 검사에 위임합니다. 서명이 실패하면 401을 반환합니다. 처리가 필요 없는 이벤트는 200으로 바로 끝납니다.
2. **이벤트 중복 제거** — `EventLogRepo.loadByProviderId`가 `eventLogs`에 이미 기록된 웹훅을 건너뜁니다.
3. **헌금 중복 제거** — 무엇인가를 만들기 전에 페이로드가 담을 수 있는 모든 후보 ID에 대해 `DonationRepo.loadByTransactionId`를 확인합니다. 이것은 중복 전달, 여러 단계로 이루어진 ACH 이벤트(대기 → 정산), 그리고 `/donate/charge`가 이미 헌금을 낙관적으로 기록한 경우를 흡수합니다.
4. **적용** — 제공업체의 `classifyWebhookEvent(eventType)`가 이벤트의 의미를 알려 줍니다(`donation` 대기/완료, `cancel-subscription`, 또는 `ignore`). 완료된 결제는 `complete` 헌금을 만들거나(이미 있는 `pending` 또는 `failed` 헌금을 승격), ACH형 이벤트는 정산될 때까지 `pending`으로 들어갑니다. 실패한 구독 인보이스(Stripe `invoice.payment_failed`)는 인보이스 ID를 키로 `failed` 헌금을 만들고, 취소 이벤트는 로컬 `subscriptions` 행을 삭제합니다. 컨트롤러는 제공업체별 이벤트 이름을 검사하지 않습니다.

### 실패한 정기 헌금과 독촉

`failed` 헌금은 복구의 작업 단위입니다. `GET /giving/donations/failed`는 이들을 `eventLogs`의 최신 게이트웨이 실패 메시지와 게이트웨이 기능의 `canRetry` 플래그와 함께 나열합니다. `POST /giving/donate/retry/:donationId`는 제공업체의 `retryFailedPayment`를 호출하며(Stripe는 열린 인보이스를 결제), 그 결과 웹훅이 일반 중복 제거 경로를 통해 행을 `complete`로 승격합니다. 독촉 이메일은 웹훅 핸들러에서 0일째에 기부자에게 가고, 그 뒤에는 자정 타이머(`lambda/timer-handler.ts`와 `RailwayCron.ts` 둘 다에 연결됨)의 `DunningHelper.run`이 3일과 7일째에 보냅니다. 각 발송은 `eventLogs`에 `provider: "dunning"`, `providerId: "<donationId>:<day>"`로 기록되므로, 재실행해도 두 번 이메일을 보내지 않습니다. Stripe가 포기하여 구독을 취소하면(`customer.subscription.deleted`와 `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled`가 기부자에게 한 번 이메일을 보냅니다(`providerId: "<subscriptionId>:canceled"`). 기부자나 관리자가 시작한 취소는 조용히 넘어갑니다. Stripe는 기존 엔드포인트에 이벤트를 추가하지 않습니다. `StripeHelper.webhookEvents`를 바꾼 뒤에는 게이트웨이를 다시 저장하거나, 운영 환경에서 `tools/manual/stripe-webhook-events.ts`를 실행해야 합니다(기본은 드라이런이며, `--apply`로 기록합니다).

`logsDonationsImmediately`가 있는 제공업체(PayPal, Kingdom Funding, Paystack)는 `/charge` 응답에서 청구를 기록합니다(정상 경로에는 웹훅 왕복이 필요 없습니다). Stripe는 `payment_intent.succeeded` / `invoice.paid`와 ACH `payment_intent.processing`에 의존합니다. 수수료 처리(`POST /giving/donate/fee`, 게이트웨이 `payFees` 플래그, 각 제공업체의 `calculateFees`)는 기부자 쪽에서 "수수료 부담" 총액 상향 조정을 계산합니다. B1은 플랫폼 수수료를 받지 않으므로, 애플리케이션 수수료는 추가되지 않습니다.

:::info
청구 경로와 웹훅 경로는 같은 `donations` / `fundDonations` 행을 씁니다. `transactionId`가 결합 키이며, 이것이 낙관적 청구 기록과 나중의 웹훅이 한 건의 헌금에 대해 헌금 두 개를 만들지 않도록 막습니다.
:::

## 관련 페이지

- [Giving 엔드포인트](../api/endpoints/giving) — 헌금, 펀드, 배치, 게이트웨이, 구독, 결제 수단, 웹훅의 전체 REST 표면
- [AppHelper](../shared-libraries/app-helper) — 결제 제공업체 레지스트리와 헌금 컴포넌트를 제공하는 npm 패키지
- [모듈 구조](../api/module-structure) — GivingApi 모듈이 서버 측에서 구성되는 방식
