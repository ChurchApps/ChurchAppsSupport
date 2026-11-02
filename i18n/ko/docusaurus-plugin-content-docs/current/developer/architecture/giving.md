---
title: "헌금 아키텍처"
---

# 헌금 아키텍처

<div class="article-intro">

ChurchApps는 게이트웨이 연동 모델로 헌금을 처리합니다. 교회가 자체 Stripe(또는 PayPal, Kingdom Funding, Paystack) 계정을 보유하며, B1은 플랫폼 결제 처리자로서 자금의 흐름에 개입하지 않습니다. 카드 정보는 브라우저에서 토큰화되며 ChurchApps 서버에 전달되지 않습니다. 이 페이지는 전체 스택을 설명합니다. `@churchapps/apphelper`의 클라이언트 측 결제 제공자 레지스트리, GivingApi 게이트웨이 추상화, 헌금 데이터 모델, 그리고 게이트웨이 웹훅이 데이터베이스에 어떻게 다시 반영되어 대조되는지를 다룹니다.

</div>

## 개요

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (브라우저)  │                   │  결제 게이트웨이                       │
│                             │                   │  (Stripe / PayPal / KF / Paystack)  │
│  @churchapps/apphelper      │                   │                                       │
│  ┌───────────────────────┐  │ 카드 입력          │  Stripe Elements · KF 토큰화기 ·       │
│  │ 결제 제공자            │──┼──────────────────▶│  PayPal Hosted Fields                 │
│  │ 레지스트리             │  │◀── 토큰 / nonce ──│  (카드는 B1 서버에 도달하지 않음)        │
│  │ getPaymentProvider()  │  │                   └──────────▲────────────────┬───────────┘
│  │ Stripe · PayPal · KF  │  │                              │                │
│  └──────────┬────────────┘  │                              │                │
└─────────────┼───────────────┘                              │                │
              │  POST /giving/donate/charge | /subscribe     │                │
              │  { token, amount, funds, person }            │                │
              ▼                            charge / subscribe│                │ 서명된 웹훅
┌─────────────────────────────────────────────┐ (비밀 키)      │                │ 이벤트
│  GivingApi — /giving 모듈                   │──────────────┘                │
│  DonateController → GatewayService          │                               │
│  → GatewayFactory → IGatewayProvider        │◀──────────────────────────────┘
│  donations · funds · subscriptions · …      │  POST /giving/donate/webhook/:provider
└─────────────────────┬───────────────────────┘
                      │  donations + fundDonations 저장 -- eventLogs / transactionId로 중복 제거
                      ▼
                MySQL (giving 스키마)
```

스택 전체에 세 가지 원칙이 적용됩니다.

1. **카드는 게이트웨이가 보관합니다.** 모든 제공자의 입력 위젯은 브라우저에서 토큰화하며, API는 토큰, nonce, 주문 ID만 받습니다.
2. **하나의 추상화, 여러 제공자.** 브라우저는 레지스트리에서 `PaymentProvider`를 찾고, 서버는 팩토리에서 `IGatewayProvider`를 찾습니다. 두 곳 모두 게이트웨이 레코드에 저장된 같은 정규화된 제공자 이름을 기준으로 합니다.
3. **정산의 기준은 웹훅입니다.** 결제 응답은 낙관적으로 기록되지만, 완료된 헌금을 확정(또는 생성)하는 것은 게이트웨이의 서명된 웹훅이며, 양쪽 모두 멱등성 보호가 있습니다.

## 클라이언트 측: 결제 제공자 레지스트리 (`@churchapps/apphelper`)

레지스트리는 `Packages/apphelper/src/donations/providers/`에 있으며, 각 제공자의 위젯과 도우미는 자체 하위 폴더(`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`)에 있습니다. `providers/` 바깥의 어떤 코드도 제공자 이름으로 분기하지 않습니다. `PaymentProvider`(`providers/types.ts` 참고)는 호스트 앱이 게이트웨이 하나에 필요한 모든 것을 묶은 것입니다. 관리자 레이블, 지원 통화, 수수료 필드, 기본 수수료율, 대시보드/가입 URL을 담은 `descriptor`, 기능 플래그 집합(저장된 카드, ACH, 정기 결제, 인라인 새 카드 입력, 토큰화 시 암묵적 저장), 교인 입력용 React 위젯(`MemberWrapper`/`MemberEntry`), 손님 헌금(`GuestForm`), 저장된 결제 수단 편집(`MethodEditForm`), 양식 질문 결제(`FormPayment`), 그리고 `buildChargeRequest(ctx, token)`입니다. `buildChargeRequest`는 제공자마다 결제 요청 본문의 모양이 다르게 되는 유일한 지점입니다. 각 제공자의 `MemberWrapper`는 게이트웨이 레코드의 공개 키로 자체 SDK를 불러오므로, 호스트 앱은 게이트웨이 SDK를 직접 가져오지 않습니다(B1App과 B1Admin에는 `@stripe/*` 의존성이 없습니다). `pickDefaultGateway(gateways, capability?)`는 어떤 화면이 교회의 게이트웨이 중 무엇을 사용할지 한곳에서 정합니다.

`providers/registry.ts`에는 기본 제공 제공자가 들어 있습니다. 이 제공자들은 모듈의 부수 효과로 등록되지 않고 **값으로 직접 참조**되므로, 번들러의 트리 셰이킹으로 등록이 빠질 수 없습니다.

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| 함수 | 목적 |
|----------|---------|
| `getPaymentProvider(name)` | 정규화된 이름으로 찾기. 잘못 설정된 제공자 때문에 헌금 양식이 완전히 중단되지 않도록 Stripe로 대체 |
| `registerPaymentProvider(p)` | 실행 중에 추가 제공자 등록(호스트 앱의 사용자 지정 게이트웨이용) |
| `listPaymentProviders()` | 기본 제공 + 사용자 지정 제공자 열거. 관리자 게이트웨이 드롭다운을 만드는 데 사용 |
| `hasPaymentProvider(name)` | 포함 여부 확인 |

**기본 제공 클라이언트 제공자: Stripe, PayPal, Kingdom Funding, Paystack.** B1App과 B1Admin은 레지스트리를 *읽기만* 합니다(`getPaymentProvider`, `listPaymentProviders`). 어느 쪽도 `registerPaymentProvider`를 호출하지 않으며, 등록은 apphelper 안에 머무릅니다.

각 제공자는 토큰화 방식이 다르지만, 모두 카드를 B1 밖에 둡니다.

| 제공자 | 입력 위젯 | API에 반환되는 토큰 |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`. 손님 양식에는 `ExpressCheckoutElement`(Apple Pay / Google Pay, 일회성 헌금)도 마운트되며, 그 `onConfirm`은 같은 `pm_…` ID로 해석됨 | 결제 수단 ID(`pm_…`). 은행 계좌는 `/paymentmethods/ach-setup-intent`를 통해 설정 -- USD 게이트웨이는 Financial Connections `us_bank_account`, CAD 게이트웨이는 캐나다 PAD `acss_debit`(호스팅된 위임 모달, 위임장 `default_for`는 인보이스/구독, 일회성 결제는 위임장 ID를 전달) |
| Kingdom Funding | 게이트웨이 공개 키로 식별되는 호스팅 토큰화 양식 | 일회용 nonce |
| PayPal | PayPal Hosted Fields(카드, 정기 결제)와 Venmo 결제를 포함한 PayPal Smart Buttons(일회성). 둘은 하나의 SDK 로드를 공유하며, 서버 주문은 `/donate/client-token` + `/donate/create-order`로 만들어짐 | 캡처된 주문 ID |
| Paystack | Paystack Inline 팝업(`js.paystack.co/v2/inline.js`). 팝업 자체가 결제를 처리함(카드, 모바일 머니, 계좌 이체, USSD) | 결제 완료된 거래 참조. 저장된 수단은 Paystack `AUTH_…` 승인 코드 |

Stripe의 `finalizeResult`는 헌금이 완료된 것으로 간주되기 전에 브라우저에서 3-D Secure / SCA를 실행합니다(`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`). 공유 양식은 그 내용을 알지 못한 채 `provider.finalizeResult(result)`만 호출합니다.

## 서버 측: 게이트웨이 추상화 (GivingApi)

`/giving` 모듈(`Api/src/modules/giving`)이 REST 인터페이스를 제공하며, 게이트웨이 연결 코드는 `Api/src/shared/helpers`에 있습니다. `DonateController`는 게이트웨이 SDK와 직접 통신하지 않습니다. `GatewayService`를 거치며, `GatewayService`는 `GatewayFactory`에서 알맞은 `IGatewayProvider`를 찾고 복호화된 `GatewayConfig`를 넘겨줍니다.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig()가 privateKey / webhookKey를 복호화
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider`(`shared/helpers/gateways/IGatewayProvider.ts`)는 모든 게이트웨이가 구현하는 계약입니다. 웹훅 수명 주기(`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), 결제(`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), 수수료(`calculateFees`), 저장된 결제 수단 처리(`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), 그리고 선택 기능(고객, 주문, SetupIntent, 이벤트 재생, 실패한 구독 인보이스를 위한 `retryFailedPayment`, Apple Pay 도메인 인증을 위한 `registerPaymentMethodDomain`)을 정의합니다. 선택적 훅을 구현하지 않은 제공자는 해당 작업이 지원되지 않는 것으로 보고되며, UI는 해당 컨트롤을 숨깁니다. 각 제공자 클래스는 자체 `capabilities` 매트릭스(지원 통화, ACH, 환불, 구독 요건, 거래 한도)를 선언하고, `GatewayService.getProviderCapabilities(provider)`는 이를 읽기만 합니다. 또 `logsDonationsImmediately` 같은 플래그가 컨트롤러 동작을 결정하므로, 컨트롤러 안에 제공자 이름 조건문이 필요 없습니다.

**`GatewayFactory`에 등록된 서버 제공자:**

| 제공자 | 사용 가능 여부 |
|----------|-------------|
| Stripe | 항상 사용 |
| PayPal | 항상 사용 |
| Kingdom Funding | 항상 사용 |
| Paystack | 항상 사용(나이지리아, 가나, 남아프리카, 케냐, 코트디부아르 가맹점. 통화 NGN/GHS/ZAR/KES/XOF/USD) |
| Square | `ENABLE_SQUARE` 환경 플래그로 선택 활성화 |
| ePayMints | `ENABLE_EPAYMINTS` 환경 플래그로 선택 활성화 |

Paystack은 GivingApi가 관여하기 전에 돈이 먼저 움직인다는 점에서 다른 제공자와 다릅니다. 팝업이 헌금자에게 결제하고, `processCharge`는 `GET /transaction/verify/:reference`이며, 결제된 금액과 통화가 기록할 헌금과 일치해야 합니다(이미 등록된 참조는 절대 두 번 기록되지 않습니다). 정기 헌금 일정의 첫 헌금은 `finalizeSubscription`에서 기록됩니다(verify → `POST /plan` → `start_date`를 한 주기 뒤로 설정한 `POST /subscription`). 웹훅은 비밀 키 자체로 서명되며(`x-paystack-signature`, 원본 본문에 대한 HMAC-SHA512), Paystack에는 웹훅 관리 API가 없으므로, 관리자 화면은 교회가 자체 대시보드에 붙여 넣을 URL을 보여 줍니다. 갱신 `charge.success` 이벤트에는 펀드 분할 정보가 없으므로, 제공자가 헌금자의 로컬 `subscriptions`/`subscriptionFunds` 행에서 이를 복원합니다. 카드 승인만 `reusable`이며, 모바일 머니 헌금은 일회성이므로 `createSubscription`이 이를 거부합니다. 데모 데이터는 Paystack 테스트 모드 GHS 게이트웨이를 가진 두 번째 교회(Accra Community Church, `CHU00000002`)를 시드하므로, Paystack Playwright 테스트 모음이 Grace의 Stripe 테스트 옆에서 실행됩니다.

`ENABLE_CUSTOM_GATEWAY_PROVIDERS`가 설정되면 사용자 지정 제공자를 실행 중에 등록할 수 있으며, `AbstractExperimentalGatewayProvider`가 그 기본 클래스입니다. 제공자 이름은 대소문자를 구분하지 않고 일치합니다.

### 게이트웨이 설정과 비밀 값

관리자는 `POST /giving/gateways`(`GatewayController`)로 게이트웨이 자격 증명을 저장합니다. 저장할 때 컨트롤러는 개인 키와 웹훅 키를 `EncryptionHelper`로 암호화한 뒤 저장합니다. 그리고 localhost가 아닌 호스트에서는 교회의 기존 웹훅을 삭제하고, `/giving/donate/webhook/{provider}?churchId=…`를 가리키는 새 웹훅을 만듭니다. 교회는 제공자마다 한 행만 가지며, 게이트웨이를 저장하면 같은 제공자의 기존 행만 교체됩니다. 공개 읽기(`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`)는 공개 키만 반환합니다.

## 데이터 모델

giving 스키마(`Api/src/modules/giving/db/DatabaseTypes.ts`, 모델은 `models/`에 있음)는 Kysely로 접근하는 MySQL 스키마입니다.

| 테이블 | 역할 |
|-------|------|
| `gateways` | 교회별 제공자 설정: `provider`, `publicKey`, 암호화된 `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | 헌금 지정 항목(`name`, `taxDeductible`, `productId`) |
| `donationBatches` | 입력 및 보고를 위한 묶음(`name`, `batchDate`, `status` `open`/`closed`, `closedDate`, `closedBy`) |
| `donations` | 헌금 1건: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status`(`pending`/`complete`/`failed`/`refunded`. 명세서, 합계, 대시보드, 헌금 보고서는 `complete` 또는 null만 집계), `transactionId` |
| `fundDonations` | 헌금을 하나 이상의 펀드에 배분(`donationId`, `fundId`, `amount`) |
| `subscriptions` | 정기 헌금. `id`는 게이트웨이의 구독 ID이며 `personId`, `customerId`, `gatewayId`와 연결됨 |
| `subscriptionFunds` | 정기 헌금의 펀드 분할 |
| `customers` | `provider`별로 `personId`를 게이트웨이 고객 ID와 연결 |
| `gatewayPaymentMethods` | 저장된 카드/은행 계좌: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | 웹훅/이벤트 감사 기록과 중복 제거 키(`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | 펀드에 연결된 약정 캠페인과 각 사람의 약정 금액 |

헌금은 `fundDonations`를 통해 여러 펀드에 나뉩니다. 헌금 행에는 총액이 있고, 각 `fundDonation`에는 그중 일부가 담깁니다. `donations.currency`와 `gateways.currency`는 ISO 통화 코드를 담습니다. 각 제공자는 `supportedCurrencies`를 광고하며, 금액은 `CurrencyHelper.formatCurrencyWithLocale`로 형식화됩니다.

## 전체 흐름

### 교인의 일회성 및 정기 헌금 (B1App)

로그인한 교인의 헌금 화면(`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`)은 apphelper 컴포넌트 세 개를 조합합니다. `MultiGatewayDonationForm`, `PaymentMethods`, `RecurringDonations`입니다. B1App은 주변 데이터를 불러옵니다. `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions`가 그것이며, 게이트웨이 목록을 그대로 넘겨 줍니다. 결정된 제공자는 게이트웨이의 공개 키로 자체 SDK를 불러옵니다. 실제 결제는 apphelper 안에서 일어납니다. 결정된 제공자가 (새 또는 저장된) 결제 수단을 토큰화한 뒤, 일회성 헌금이면 `/giving/donate/charge`로, 정기 헌금이면 `/giving/donate/subscribe`로 보냅니다. 두 엔드포인트 모두 로그인한 헌금자를 자신의 `personId`로 귀속시키며(다른 사람으로 귀속하려면 `donations.edit` 권한이 있어야 함), 합계가 결제 금액을 넘는 펀드 분할은 거부합니다. 정기 헌금은 `subscriptions` 행과 `subscriptionFunds`를 만들고, 일정을 게이트웨이(Stripe Subscriptions, PayPal Billing Plans, 또는 KF 정기 일정)에 넘깁니다.

### 손님 / 익명 헌금

공개 헌금 페이지(`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`)와 "지금 헌금하기" 패널은 `@churchapps/apphelper/website`의 `NonAuthDonationWrapper`를 렌더링합니다. 이 래퍼는 reCAPTCHA와 게이트웨이 Elements 컨텍스트를 제공자의 `GuestForm` 주변에 주입합니다. 손님은 로그인, 저장된 결제 수단, 이력이 없습니다. 흐름은 `GET /giving/funds/churchId/:id`와 `GET /giving/donate/gateways/:churchId`(공개 키만)를 가져오고, `POST /giving/donate/captcha-verify`로 방문자를 확인하고, 브라우저에서 토큰화한 뒤 `/giving/donate/charge`(또는 `/subscribe`)로 보냅니다. 확인 호출은 10분짜리 HMAC 서명 `captchaPass`(`Api/src/modules/giving/helpers/CaptchaPass.ts`)를 반환하며, 양식은 손님의 모든 금전 호출에 이것을 함께 보냅니다. `CAPTCHA_ENFORCE=true`이면 Api는 해당 교회에 대해 유효한 통과 값이 없는 손님의 `create-order`, `charge`, `subscribe`, `addcard`, `ach-setup-intent-anon` 호출을 거부합니다. 손님의 유료 행사 등록(`POST /content/registrations/register`)도 결제 직전에 같은 통과 값을 확인합니다([행사 등록](./registrations#payment-flow) 참고). 손님의 ACH는 익명 `POST /giving/paymentmethods/ach-setup-intent-anon`을 사용하며, 이는 즉시 확인(Financial Connections)만 허용합니다. 소액 입금 확인은 며칠 뒤에 끝나는데, 그때는 손님이 이미 페이지를 떠났으므로 헌금을 완료할 수 없기 때문입니다. 양식은 확인되지 않은 SetupIntent로 결제하기를 거부하고, 헌금자에게 카드 또는 로그인한 상태의 은행 설정을 사용하도록 안내합니다.

같은 결제 호출에 세 가지 손님 양식 옵션이 함께 쓰입니다. 헌금 URL의 `?fundId=`와 `?amount=`는 펀드 분할을 미리 선택합니다(각 제공자의 손님 양식이 마운트될 때 읽으며, 일반 펀드 변경 처리기를 거쳐 합계와 수수료가 갱신됨). `anonymous: true`이면 `DonateController.charge`가 클라이언트가 보낸 사람을 모두 버리고 `personId = null`로 헌금을 기록합니다. 손님 양식은 `/people/loadOrCreate`와 고객/보관소 단계를 건너뛰며, 즉시 기록하는 세 제공자는 게이트웨이 고객에서 사람을 찾지 않습니다. Apple Pay는 페이지의 도메인이 Stripe에 등록되어 있어야 하므로, Stripe 손님 양식은 세션당 한 번 공개되고 속도 제한이 있는 `POST /giving/donate/register-domain`에 요청합니다. 이 엔드포인트는 교회 소유의 도메인(`<subDomain>.b1.church`, 콘텐츠 모듈의 domains 테이블에 있는 행, 또는 로컬 호스트)만 받아들인 뒤 Stripe의 payment-method-domains API를 호출합니다.

### 관리자의 기록 입력과 Stripe 가져오기 (B1Admin)

B1Admin의 헌금 영역(`B1Admin/src/donations/`)은 재무 팀이 작업하는 곳입니다. 묶음 입력(`components/BulkDonationEntry.tsx`)은 `/giving/donations`와 `/giving/funddonations`에 전송하여 현금/수표/현물 헌금을 기록합니다. 이때 게이트웨이는 관여하지 않습니다. 교인 기록의 **Log a gift** 시트(`components/LogGiftDialog.tsx`)는 한 건의 헌금에 대해 같은 작업을 합니다. 먼저 `batchDate`가 헌금 날짜와 같은 묶음을 찾고, 없으면 그 날짜의 이름을 붙인 묶음을 만듭니다(`POST /giving/donationbatches`). 이후 단계가 실패하면 헌금이나 새로 만든 묶음을 다시 삭제합니다. 펀드, 묶음, 캠페인, 명세서는 각각 `/giving/*` CRUD 경로에 대응합니다. 헌금 명세서 페이지(`BatchGivingStatementsPage`, `PrintAllStatementsPage`)는 교회의 전체 이력이 Lambda 응답 크기 제한을 넘을 수 있으므로, `GET /donations?startDate=&endDate=`와 `GET /fundDonations?startDate=&endDate=`로 한 해의 기간만 요청합니다. 교인용 헌금 패널(`B1Admin/src/donationComponents/`)은 B1App과 같은 apphelper 컴포넌트를 재사용합니다.

보고 및 회계 전달은 게이트웨이 작업이 아니라 클라이언트 측 또는 보고서 실행기의 작업입니다. 묶음 페이지의 QuickBooks 내보내기는 묶음의 `donations` + `fundDonations`로 분개 CSV를 만듭니다(Undeposited Funds 차변, 펀드마다 대변 한 줄). 요약 페이지의 Lapsed Givers 보기는 `Api/reports/lapsedGivers.json`을 일반 보고서 실행기로 실행하며, `ReportOutput`이 사람 이름을 채웁니다. 국가별 영수증 형식(캐나다 / 호주 / 뉴질랜드)은 membership의 키/값 저장소에 있는 교회 설정이며, `GivingStatementDocument`가 렌더링하고 B1App 인쇄 페이지에도 복제되어 있습니다. B1Admin의 명세서 인쇄 페이지(`PrintDonationPage`, `PrintAllStatementsPage`)는 교회의 `logoLight` 설정을 전달합니다(`B1Admin/src/components/PrintChurchHeader.tsx`의 `usePrintLogo` 사용). 그래서 각 명세서 상단에 로고가 인쇄되며, 자동 인쇄 전에 이미지를 기다립니다.

### 묶음 상태와 헌금 입력 권한

집계된 입금이 그대로 유지되도록 묶음을 닫을 수 있습니다. `POST /giving/donationbatches/:id/close`와 `/:id/reopen`(Donations.Edit 전용)만 `status`, `closedDate`, `closedBy`를 바꿀 수 있습니다(`DonationBatchRepo.setStatus`). 일반 묶음 저장은 이 값을 건드리지 않으므로, 묶음을 게시한다고 다시 열리지 않습니다. 쓰기 권한은 `Api/src/modules/giving/helpers/BatchAccessHelper.ts`에 모여 있습니다. Donations.Edit는 모든 것을 바꿀 수 있습니다. 범위가 더 좁은 Donations.Enter 권한(`GivingApi` / `Donations` / `Enter`, 역할 편집기에서는 "Enter Donations")은 묶음을 만들고, 헌금과 펀드 분할을 저장하거나 삭제할 수 있습니다. 단, 헌금의 현재 묶음과 대상 묶음이 모두 열려 있을 때만 가능하며, 게이트웨이 헌금(`transactionId`가 있는 헌금)에 대해서는 절대 불가능합니다. 차단된 쓰기는 `403 { error: "This batch is closed." }`를 반환합니다. 묶음 읽기는 Donations.ViewSummary 또는 Donations.Enter를 허용하므로, 집계하는 사람이 입력할 묶음을 고를 수 있습니다. 클라이언트에서는 `B1Admin/src/donations/batchAccess.ts`가 이 규칙(`canSeeBatches`, `canEnterDonations`, `canChangeBatch`)을 그대로 반영하며, `Header` / `SecondaryMenuHelper`는 View Summary가 없어도 묶음을 볼 수 있는 사람에게 **Donations > Batches**를 보여 줍니다.

### 여러 통화가 섞인 합계 변환

여러 통화가 섞였을 수 있는 헌금을 하나의 합계로 돌려주는 모든 엔드포인트, 즉 헌금 요약 KPI(`GivingKpiCards`), 헌금 묶음 합계, 펀드 합계, B1App 헌금 화면의 연간/기간 합계는, 서로 다른 통화를 더하는 대신 서버에서 교회의 기본 통화로 변환합니다. `Api/src/shared/helpers/ExchangeRateHelper.ts`는 교회 통화를 기준으로 `api.frankfurter.dev`에서 환율을 가져오고, 프로세스 안에서 12시간 동안 캐시하며, `convertTotals(rows, churchCurrency, rates)`를 제공합니다. 행은 SQL에서 통화별로 미리 묶이므로(헌금마다 변환하는 것이 아니라 소수의 그룹만 생김), 각 그룹이 변환되어 합산됩니다. 결과에는 `isConverted` 플래그가 포함되며, 클라이언트는 이 플래그로 "현재 환율로 변환됨" 안내를 표시합니다. `GET /donations/exchange-rates`는 환율 표가 필요한 클라이언트(B1App 헌금 화면)에 이것을 노출합니다. 환율 자체는 요청에서 받지 않고 서버에서만 가져오므로, 클라이언트가 보고되는 합계에 영향을 줄 수 없습니다. 개별 헌금 기록과 과거/원래 통화 보고서는 절대 변환하지 않으며, 합계에만 변환을 적용합니다.

Stripe 가져오기(`B1Admin/src/donations/StripeImportPage.tsx`)는 B1 밖에서 이루어진 헌금을 뒤늦게 채워 넣습니다. `dryRun: true`로 `POST /giving/donate/replay-stripe-events`를 호출해 미리 보기를 하고, `dryRun: false`로 가져옵니다. 서버는 날짜 범위의 Stripe 이벤트를 나열하고 이미 기록된 것은 건너뜁니다. 먼저 `eventLogs`의 제공자 ID로 일치시키고, 그다음 거래 ID로, 마지막으로 `DonationRepo.findMatchingDonation`(금액 + 날짜 + 사람)으로 일치시킵니다. 따라서 다시 실행해도 이중으로 가져오지 않습니다. 구독의 `charge.succeeded` / `payment_intent.succeeded` 이벤트는 `invoice.paid`가 해당 헌금을 기록하므로 건너뜁니다. 최신 Stripe API 버전은 `PaymentIntent.invoice`를 제거하므로, 건너뛰기는 "Subscription …" 설명도 기준으로 삼습니다.

## 웹훅과 대조

정산된 결제와 구독 상태 변경은 `POST /giving/donate/webhook/:provider?churchId=…`(`DonateController.webhook`)로 도착합니다. 처리는 의도적으로 멱등성을 갖습니다.

1. **검증** -- `GatewayService.verifyWebhook`이 제공자의 서명 검사에 위임합니다. 서명이 실패하면 401을 반환합니다. 처리할 필요가 없는 이벤트는 200으로 바로 끝납니다.
2. **이벤트 중복 제거** -- `EventLogRepo.loadByProviderId`는 `eventLogs`에 이미 기록된 웹훅을 건너뜁니다.
3. **헌금 중복 제거** -- 무엇이든 만들기 전에, 페이로드가 담을 수 있는 모든 후보 ID에 대해 `DonationRepo.loadByTransactionId`를 확인합니다. 이것은 중복 전송, 여러 단계의 ACH 이벤트(대기 → 정산), 그리고 `/donate/charge`가 이미 낙관적으로 헌금을 기록한 경우를 모두 흡수합니다.
4. **적용** -- 제공자의 `classifyWebhookEvent(eventType)`이 이벤트의 의미를 알려 줍니다(`donation` 대기/완료, `cancel-subscription`, 또는 `ignore`). 완료된 결제는 `complete` 헌금을 만들며(또는 기존 `pending` 또는 `failed` 헌금을 승격함), ACH 계열 이벤트는 정산 전까지 `pending`이 됩니다. 실패한 구독 인보이스(Stripe `invoice.payment_failed`)는 인보이스 ID를 키로 하는 `failed` 헌금을 만들며, 취소 이벤트는 로컬 `subscriptions` 행을 삭제합니다. 컨트롤러는 제공자별 이벤트 이름을 직접 살펴보지 않습니다.

### 실패한 정기 헌금과 재청구 독촉

`failed` 헌금은 복구 작업의 단위입니다. `GET /giving/donations/failed`는 이들을 `eventLogs`의 가장 최근 게이트웨이 실패 메시지와, 게이트웨이 기능에서 얻은 `canRetry` 플래그와 함께 나열합니다. `POST /giving/donate/retry/:donationId`는 제공자의 `retryFailedPayment`를 호출하고(Stripe는 미결 인보이스를 결제), 그 결과 웹훅이 일반 중복 제거 경로를 통해 행을 `complete`로 승격합니다. 재청구 독촉 이메일은 웹훅 핸들러가 0일째에 헌금자에게 보내고, 이후 3일과 7일째에는 자정 타이머(`lambda/timer-handler.ts`와 `RailwayCron.ts` 모두에 연결됨)의 `DunningHelper.run`이 보냅니다. 각 발송은 `eventLogs`에 `provider: "dunning"`, `providerId: "<donationId>:<day>"`로 기록되므로, 다시 실행해도 두 번 보내지 않습니다. Stripe가 포기하고 구독을 취소하면(`customer.subscription.deleted`와 `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled`가 헌금자에게 한 번 이메일을 보냅니다(`providerId: "<subscriptionId>:canceled"`). 헌금자나 관리자가 시작한 취소는 조용히 넘어갑니다. Stripe는 기존 엔드포인트에 이벤트를 추가하지 않습니다. `StripeHelper.webhookEvents`를 바꾼 뒤에는 게이트웨이를 다시 저장하거나, 운영 환경에 대해 `tools/manual/stripe-webhook-events.ts`를 실행하세요(기본은 드라이 런이며, `--apply`를 붙이면 기록합니다).

`logsDonationsImmediately`를 가진 제공자(PayPal, Kingdom Funding, Paystack)는 `/charge` 응답에서 결제를 기록합니다(정상 경로에서는 웹훅 왕복이 필요 없음). 반면 Stripe는 `payment_intent.succeeded` / `invoice.paid`와 ACH `payment_intent.processing`에 의존합니다. 수수료 처리(`POST /giving/donate/fee`, `payFees` 게이트웨이 플래그, 각 제공자의 `calculateFees`)는 "수수료 부담" 총액 인상을 헌금자 쪽에서 계산합니다. B1은 플랫폼 수수료를 떼지 않으므로 애플리케이션 수수료는 절대 추가되지 않습니다.

:::info
결제 경로와 웹훅 경로는 같은 `donations` / `fundDonations` 행을 씁니다. `transactionId`가 결합 키로서, 낙관적 결제 기록과 나중에 도착하는 웹훅이 하나의 헌금에 대해 두 개의 헌금을 만들지 않도록 막습니다.
:::

## 관련 문서

- [헌금 엔드포인트](../api/endpoints/giving) -- 헌금, 펀드, 묶음, 게이트웨이, 구독, 결제 수단, 웹훅의 전체 REST 인터페이스
- [AppHelper](../shared-libraries/app-helper) -- 결제 제공자 레지스트리와 헌금 컴포넌트를 제공하는 npm 패키지
- [모듈 구조](../api/module-structure) -- GivingApi 모듈이 서버 측에서 구성되는 방식
