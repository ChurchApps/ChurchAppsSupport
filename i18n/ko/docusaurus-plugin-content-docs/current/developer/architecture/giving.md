---
title: "기부 아키텍처"
---

# 기부 아키텍처

<div class="article-intro">

ChurchApps는 게이트웨이 레일 모델로 기부를 처리합니다. 교회는 자체 Stripe(또는 PayPal, Kingdom Funding, Paystack) 계정을 보유하고, B1은 플랫폼 프로세서로서 금전 거래에 참여하지 않습니다. 카드 데이터는 브라우저에서 토큰화되며 ChurchApps 서버에 도달하지 않습니다. 이 페이지는 전체 스택을 매핑합니다. `@churchapps/apphelper`의 클라이언트 측 제공자 레지스트리, GivingApi 게이트웨이 추상화, 기부 데이터 모델, 그리고 게이트웨이 웹훅이 데이터베이스로 어떻게 조정되는지입니다.

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

전체 스택에서 세 가지 원칙이 유지됩니다:

1. **게이트웨이가 카드를 보유합니다.** 모든 제공자의 입력 위젯은 브라우저에서 토큰화됩니다. API는 토큰, nonce 또는 주문 ID만 수신합니다.
2. **하나의 추상화, 많은 제공자.** 브라우저는 레지스트리에서 `PaymentProvider`를 해결하고, 서버는 팩토리에서 `IGatewayProvider`를 해결합니다. 둘 다 게이트웨이 레코드에 저장된 동일한 정규화된 제공자 이름으로 키를 설정합니다.
3. **웹훅이 정산의 진실 공급원입니다.** 청구 응답은 낙관적으로 기록되지만, 게이트웨이의 서명된 웹훅이 완료된 기부를 확인(또는 생성)하며, 양쪽 모두에 멱등성 가드가 있습니다.

## 클라이언트 측: 결제 제공자 레지스트리(`@churchapps/apphelper`)

레지스트리는 `Packages/apphelper/src/donations/providers/`에 있으며, 각 제공자의 위젯과 헬퍼는 자신의 서브폴더(`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) 아래에 있습니다. `providers/` 외의 아무것도 제공자 이름에 따라 분기하지 않습니다. `PaymentProvider`(`providers/types.ts` 참조)는 호스트 앱이 하나의 게이트웨이에 필요한 모든 것을 번들로 제공합니다: `descriptor`(관리 레이블, 지원 통화, 수수료 필드, 기본 수수료 요율, 대시보드/가입 URL), `capabilities` 플래그 세트(저장된 카드, ACH, 반복, 인라인 새 카드 입력, 토큰화 시 암시적 저장), 회원 입력(`MemberWrapper`/`MemberEntry`), 게스트 기부(`GuestForm`), 저장된 방법 편집(`MethodEditForm`), 양식 질문 결제(`FormPayment`)를 위한 React 위젯, 그리고 `buildChargeRequest(ctx, token)` — 청구 페이로드 형태가 제공자마다 다른 유일한 위치입니다. 각 제공자의 `MemberWrapper`는 게이트웨이 레코드의 공개 키에서 자신의 SDK를 로드하므로, 호스트 앱은 게이트웨이 SDK를 임포트하지 않습니다(B1App과 B1Admin은 `@stripe/*` 종속성이 없습니다). `pickDefaultGateway(gateways, capability?)`는 교회의 어느 게이트웨이를 표면이 사용해야 하는지 중앙화합니다.

`providers/registry.ts`는 기본 제공자를 보유합니다. 이들은 **값으로 참조되며**, 모듈 부작용을 통해 등록되지 않으므로, 번들러의 트리 셰이킹은 등록을 절대 삭제할 수 없습니다:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| 함수 | 목적 |
|----------|---------|
| `getPaymentProvider(name)` | 정규화된 이름으로 해결합니다. Stripe로 폴백되어 잘못 구성된 제공자가 기부자 양식을 하드 크래시하지 않습니다 |
| `registerPaymentProvider(p)` | 런타임 시 추가 제공자를 등록합니다(호스트 앱의 커스텀 게이트웨이의 경우) |
| `listPaymentProviders()` | 기본 제공자 + 커스텀 열거 — 관리 게이트웨이 드롭다운을 구축하는 데 사용됩니다 |
| `hasPaymentProvider(name)` | 멤버십 확인 |

**기본 제공자: Stripe, PayPal, Kingdom Funding, Paystack.** B1App과 B1Admin은 레지스트리를 **읽기만** 합니다(`getPaymentProvider`, `listPaymentProviders`). 둘 다 `registerPaymentProvider`를 호출하지 않습니다 — 등록은 apphelper 내에서 유지됩니다.

각 제공자는 다르게 토큰화되지만, 모두 카드를 B1에서 벗어나게 유지합니다:

| 제공자 | 입력 위젯 | API에 반환된 토큰 |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; 게스트 양식은 또한 `ExpressCheckoutElement`(Apple Pay / Google Pay, 일회성 기부)를 마운트하며, 그 `onConfirm`은 동일한 `pm_…` id로 해결됩니다 | 결제 방법 ID(`pm_…`); `/paymentmethods/ach-setup-intent`를 통한 은행 — USD 게이트웨이의 금융 연결 `us_bank_account`, CAD 게이트웨이의 Canadian PAD `acss_debit`(호스트된 위임장 모달, 위임장 `default_for` 인보이스/구독, 일회성 청구는 위임장 ID를 전달) |
| Kingdom Funding | 게이트웨이 공개 키로 키 지정된 호스트된 토큰화 양식 | 일회성 nonce |
| PayPal | PayPal Hosted Fields(카드, 반복) 및 Venmo 펀딩이 있는 PayPal 스마트 버튼(일회성); 둘 다 하나의 SDK 로드를 공유하고 `/donate/client-token` + `/donate/create-order`를 통해 구축된 서버 주문 공유 | 캡처된 주문 ID |
| Paystack | Paystack 인라인 팝업(`js.paystack.co/v2/inline.js`) — 팝업 자체가 결제를 처리합니다(카드, 모바일 머니, 은행 이체, USSD) | 지불된 거래 참조; 저장된 방법은 Paystack `AUTH_…` 인증 코드입니다 |

Stripe의 `finalizeResult`는 기부가 완료되는 것으로 간주되기 전에 브라우저에서 3-D Secure / SCA를 실행합니다(`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`). 공유 양식은 제공자가 무엇을 하는지 알지 못하고 `provider.finalizeResult(result)`를 호출합니다.

## 서버 측: 게이트웨이 추상화(GivingApi)

`/giving` 모듈(`Api/src/modules/giving`)은 REST 표면을 노출합니다. 게이트웨이 배관은 `Api/src/shared/helpers`에 있습니다. `DonateController`는 게이트웨이 SDK와 직접 통신하지 않습니다. `GatewayService`를 통해 이동하며, 이는 `GatewayFactory`에서 올바른 `IGatewayProvider`를 해결하고 복호화된 `GatewayConfig`를 전달합니다.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider`(`shared/helpers/gateways/IGatewayProvider.ts`)는 모든 게이트웨이가 구현하는 계약입니다 — 웹훅 라이프사이클(`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), 결제(`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), 수수료(`calculateFees`), 저장된 방법 처리(`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), 그리고 선택적 추가 사항(고객, 주문, SetupIntents, 이벤트 재생, 실패한 구독 인보이스에 대한 `retryFailedPayment`, Apple Pay 도메인 확인을 위한 `registerPaymentMethodDomain`). 선택적 후크를 생략한 제공자는 그 작업에 대해 지원되지 않는 것으로 보고되며 UI가 컨트롤을 숨깁니다. 각 제공자 클래스는 자체 `capabilities` 매트릭스를 선언합니다(지원 통화, ACH, 환불, 구독 요구 사항, 거래 한도) — `GatewayService.getProviderCapabilities(provider)`는 단순히 읽습니다 — 그리고 `logsDonationsImmediately`와 같은 플래그는 컨트롤러 동작을 운영하며 컨트롤러에 제공자 이름 조건이 없습니다.

**GatewayFactory에서 등록된 서버 제공자:**

| 제공자 | 가용성 |
|----------|-------------|
| Stripe | 항상 활성화 |
| PayPal | 항상 활성화 |
| Kingdom Funding | 항상 활성화 |
| Paystack | 항상 활성화(나이지리아, 가나, 남아프리카, 케냐, 코트디부아르 판매자; NGN/GHS/ZAR/KES/XOF/USD 통화) |
| Square | `ENABLE_SQUARE` 환경 플래그를 통해 선택적 활성화 |
| ePayMints | `ENABLE_EPAYMINTS` 환경 플래그를 통해 선택적 활성화 |

Paystack는 GivingApi가 관여하기 전에 자금이 이동한다는 점에서 다른 제공자와 다릅니다. 팝업이 기부자에게 청구하고, `processCharge`는 `GET /transaction/verify/:reference`이며, 지불된 금액과 통화가 기록되는 기부와 일치해야 합니다(파일에 이미 있는 참조는 절대 두 번 기록되지 않습니다). 반복 일정의 첫 번째 선물은 `finalizeSubscription`에서 기록됩니다(확인 → `POST /plan` → `POST /subscription` with `start_date` 하나의 간격 떨어져). 웹훅은 시크릿 키 자체(`x-paystack-signature`, 원시 본체를 통한 HMAC-SHA512)로 서명되며 Paystack는 웹훅 관리 API가 없으므로, 관리 화면은 교회가 자신의 대시보드에 붙여넣을 수 있는 URL을 표시합니다. 갱신 `charge.success` 이벤트는 펀드 분할을 전달하지 않습니다. 제공자는 기부자의 로컬 `subscriptions`/`subscriptionFunds` 행에서 회복합니다. 카드 인증만 `reusable`입니다 — 모바일 머니 선물은 일회성이므로, `createSubscription`은 이를 거부합니다. 데모 데이터는 두 번째 교회(Accra Community Church, `CHU00000002`)를 Paystack 테스트 모드 GHS 게이트웨이에 시드하므로 Paystack Playwright 제품군이 Grace의 Stripe 옆에서 실행됩니다.

`ENABLE_CUSTOM_GATEWAY_PROVIDERS`가 설정되면 커스텀 제공자를 런타임 시 등록할 수 있습니다. `AbstractExperimentalGatewayProvider`가 이들의 기본 클래스입니다. 제공자 이름은 대소문자를 구분하지 않게 일치합니다.

### 게이트웨이 구성 및 시크릿

관리자는 `POST /giving/gateways`(`GatewayController`)를 통해 게이트웨이 자격 증명을 저장합니다. 저장 시 컨트롤러는 `EncryptionHelper`를 사용하여 비공개 및 웹훅 키를 암호화한 후 저장하고, localhost가 아닌 호스트에서 — 교회의 기존 웹훅을 삭제하고 `/giving/donate/webhook/{provider}?churchId=…`를 가리키는 새 웹훅을 프로비저닝합니다. 교회는 제공자당 하나의 행을 유지합니다. 게이트웨이를 저장하면 동일한 제공자의 기존 행만 교체됩니다. 공개 읽기(`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`)는 공개 키만 반환합니다.

## 데이터 모델

기부 스키마(`Api/src/modules/giving/db/DatabaseTypes.ts`, 모델 `models/`)는 Kysely를 통해 액세스되는 MySQL 스키마입니다:

| 테이블 | 역할 |
|-------|------|
| `gateways` | 교회별 제공자 구성: `provider`, `publicKey`, 암호화된 `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | 기부 지정(`name`, `taxDeductible`, `productId`) |
| `donationBatches` | 입력/보고를 위한 그룹화(`name`, `batchDate`) |
| `donations` | 하나의 선물: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status`(`pending`/`complete`/`failed`/`refunded`; 진술, 총계, 대시보드 및 기부 보고서는 `complete` 또는 null만 계산), `transactionId` |
| `fundDonations` | 하나 이상의 펀드를 통해 기부의 할당(`donationId`, `fundId`, `amount`) |
| `subscriptions` | 반복 선물; `id`는 게이트웨이의 구독 ID이며, `personId`, `customerId`, `gatewayId`에 연결됨 |
| `subscriptionFunds` | 반복 선물의 펀드 분할 |
| `customers` | `personId`를 제공자별 게이트웨이 고객 ID에 연결합니다 |
| `gatewayPaymentMethods` | 저장된 카드/은행: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | 웹훅/이벤트 감사 추적 및 중복 제거 키(`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | 펀드에 연결된 서약 캠페인 및 각 사람의 서약한 금액 |

기부는 `fundDonations`를 통해 펀드로 분할됩니다 — 기부는 총액을 전달하고, 각 `fundDonation`은 슬라이스를 전달합니다. `donations.currency`와 `gateways.currency`는 ISO 통화를 전달합니다. 각 제공자는 자신의 `supportedCurrencies`를 광고하며, 금액은 `CurrencyHelper.formatCurrencyWithLocale`로 포매팅됩니다.

## 엔드투엔드 플로우

### 회원 일회성 및 반복(B1App)

인증된 기부 화면(`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`)은 세 가지 apphelper 컴포넌트를 구성합니다: `MultiGatewayDonationForm`, `PaymentMethods`, 그리고 `RecurringDonations`. B1App은 주변 데이터 로딩 — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — 을 수행하고 게이트웨이 목록을 전달합니다. 해결된 제공자는 게이트웨이의 공개 키에서 자신의 SDK를 로드합니다. 청구는 apphelper 내에서 발생합니다: 해결된 제공자가 (새 또는 저장된) 방법을 토큰화한 다음, 일회성 선물의 경우 `/giving/donate/charge`에 포스트하거나 반복 선물의 경우 `/giving/donate/subscribe`에 포스트합니다. 두 엔드포인트 모두 서명된 기부자를 자신의 `personId`에 귀속시킵니다(오직 `donations.edit` 보유자만 다른 사람에게 귀속시킬 수 있음). 펀드 분할을 거부합니다. 반복 선물은 `subscriptions` 행 및 `subscriptionFunds`를 생성하고 일정을 게이트웨이에 전달합니다(Stripe 구독, PayPal 청구 계획, 또는 KF 반복 일정).

### 게스트 / 익명 기부

공개 기부 페이지(`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`)와 "지금 기부" 패널은 `@churchapps/apphelper/website`의 `NonAuthDonationWrapper`를 렌더링하며, 이는 reCAPTCHA와 게이트웨이의 Elements 컨텍스트를 제공자의 `GuestForm` 주위에 주입합니다. 게스트는 로그인, 저장된 방법, 또는 기록이 없습니다. 플로우는 `GET /giving/funds/churchId/:id`와 `GET /giving/donate/gateways/:churchId`(공개 키만)를 가져오고, 방문자를 `POST /giving/donate/captcha-verify`로 확인하고, 브라우저에서 토큰화하고, `/giving/donate/charge`(또는 `/subscribe`)에 포스트합니다. 게스트 ACH는 익명 `POST /giving/paymentmethods/ach-setup-intent-anon`을 사용합니다.

세 가지 게스트 양식 옵션은 동일한 청구 호출을 위해 탑승합니다. 기부 URL의 `?fundId=`와 `?amount=`는 펀드 분할을 사전 선택합니다(마운트 시 각 제공자의 게스트 양식에서 읽고, 정상적인 펀드 변경 핸들러를 통해 라우팅되어 총계 및 수수료가 업데이트됨). `anonymous: true`는 `DonateController.charge`가 클라이언트가 보낸 모든 사람을 버리고 기부를 `personId = null`로 기록하게 합니다. 게스트 양식은 `/people/loadOrCreate`를 건너뛰고 고객/금고 단계를 건너뜁니다. 세 가지 즉시 로그 제공자는 게이트웨이 고객에서 사람 해결을 중지합니다. Apple Pay는 페이지의 도메인을 Stripe에 등록하는 것이 필요하므로, Stripe 게스트 양식은 세션당 한 번 공개적이고 속도 제한된 `POST /giving/donate/register-domain`에 포스트하며, 교회에 속하는 도메인만 허용합니다(`<subDomain>.b1.church`, 콘텐츠 모듈의 도메인 테이블의 행, 또는 로컬 호스트). Stripe의 결제 방법 도메인 API를 호출하기 전입니다.

### 관리 기록 및 Stripe 임포트(B1Admin)

B1Admin 기부 섹션(`B1Admin/src/donations/`)은 금융 팀이 작업하는 곳입니다. 배치 입력(`components/BulkDonationEntry.tsx`)은 `/giving/donations`에 포스트한 다음 `/giving/funddonations`로 현금/수표/현물 선물을 기록합니다 — 게이트웨이가 관여하지 않습니다. 펀드, 배치, 캠페인, 진술은 각각 자신의 `/giving/*` CRUD 라우트에 매핑됩니다. 회원 스타일 기부 패널(`B1Admin/src/donationComponents/`)은 B1App과 동일한 apphelper 컴포넌트를 재사용합니다.

보고 및 회계 인수는 클라이언트 측 또는 보고서 실행자 작업이지, 게이트웨이 작업이 아닙니다. 배치 페이지의 QuickBooks 내보내기는 배치의 `donations` + `fundDonations`에서 일지 항목 CSV를 구축합니다(미예금 펀드 차변, 펀드당 하나의 신용). Lapsed Givers 탭은 사람 이름이 `ReportOutput`로 해결된 일반 보고서 실행자를 통해 `Api/reports/lapsedGivers.json`을 실행합니다. 국가 영수증 형식(캐나다 / 호주 / 뉴질랜드)은 `GivingStatementDocument`에서 렌더링되고 B1App 인쇄 페이지에서 복제되는 멤버십 키/값 스토어의 교회 설정입니다.

### 혼합 통화 총계 변환

아마도 혼합 통화 선물을 가로지르는 단일 결합 총계를 반환하는 모든 엔드포인트 — 기부 요약 KPI(`GivingKpiCards`), 기부 배치 총계, 펀드 총계, 그리고 B1App 기부 화면의 연간 누적/기간 총계 — 합계하는 대신 교회의 기본 통화로 서버 측으로 변환됩니다. 불일치 통화. `Api/src/shared/helpers/ExchangeRateHelper.ts`는 `api.frankfurter.dev`에서 교회 통화로 키 지정된 환율을 가져오고, 프로세스 내 12시간 동안 캐시하고, `convertTotals(rows, churchCurrency, rates)` 노출: 행은 SQL에서 통화로 사전 그룹화되며(몇 가지 그룹, 절대 선물별 변환), 각 그룹은 변환되고 합산되며, 결과는 클라이언트가 "현재 환율로 변환됨" 메모를 표시하는 데 사용하는 `isConverted` 플래그를 전달합니다. `GET /donations/exchange-rates`는 요금 테이블을 필요로 하는 클라이언트에 노출합니다(B1App의 기부 화면). 환율 자체는 절대 요청에서 허용되지 않으며, 서버 측에서만 가져와지므로, 클라이언트는 보고된 총계에 영향을 미칠 수 없습니다. 개별 기부 레코드 및 역사적/원래 통화 보고서는 변환되지 않습니다 — 결합된 총계만 변환됩니다.

Stripe 임포트(`B1Admin/src/donations/StripeImportPage.tsx`)는 B1 외부에서 이루어진 선물을 백필합니다: `dryRun: true`로 `POST /giving/donate/replay-stripe-events`를 호출하여 미리 보기를 한 다음 `dryRun: false`로 임포트합니다. 서버는 날짜 범위에 대한 Stripe 이벤트를 나열하고 이미 기록된 것을 건너뜁니다 — 먼저 `eventLogs` 제공자 ID로 일치한 다음 `DonationRepo.findMatchingDonation`(금액 + 날짜 + 사람)으로 재실행이 절대 이중 임포트되지 않도록 합니다.

## 웹훅 및 조정

정산된 결제 및 구독 상태 변경은 `POST /giving/donate/webhook/:provider?churchId=…`(`DonateController.webhook`)에 도착합니다. 처리는 의도적으로 멱등성입니다:

1. **확인** — `GatewayService.verifyWebhook`은 제공자의 서명 확인에 위임합니다. 실패한 서명은 401을 반환합니다. 처리가 필요하지 않은 이벤트는 200으로 단락됩니다.
2. **이벤트 중복 제거** — `EventLogRepo.loadByProviderId`는 `eventLogs`에 이미 기록된 웹훅을 건너뜁니다.
3. **기부 중복 제거** — 무엇이든 생성하기 전에 `DonationRepo.loadByTransactionId`는 페이로드가 전달할 수 있는 모든 후보 ID에 대해 확인됩니다. 이것은 중복 전달, 다단계 ACH 이벤트(보류 → 정산), 그리고 `/donate/charge`가 이미 낙관적으로 기부를 기록한 경우를 흡수합니다.
4. **적용** — 제공자의 `classifyWebhookEvent(eventType)`는 이벤트의 의미(`donation` 보류/완료, `cancel-subscription`, 또는 `ignore`)를 말합니다. 완료된 결제는 `complete` 기부를 생성합니다(또는 기존 `pending` 또는 `failed` 기부를 승격). ACH 스타일 이벤트는 정산까지 `pending`으로 됩니다. 실패한 구독 인보이스(Stripe `invoice.payment_failed`)는 인보이스 ID로 키 지정된 `failed` 기부를 생성하고, 취소 이벤트는 로컬 `subscriptions` 행을 삭제합니다. 컨트롤러는 제공자별 이벤트 이름을 검사하지 않습니다.

### 실패한 반복 선물 및 dunning

`failed` 기부는 복구를 위한 작업 단위입니다. `GET /giving/donations/failed`는 `eventLogs`의 최신 게이트웨이 실패 메시지와 게이트웨이의 기능에서 `canRetry` 플래그로 이들을 나열합니다. `POST /giving/donate/retry/:donationId`는 제공자의 `retryFailedPayment`(Stripe는 공개 인보이스를 지불함)를 호출하고, 결과 웹훅은 정상적인 중복 제거 경로를 통해 행을 `complete`로 승격합니다. Dunning 이메일은 웹훅 핸들러에서 0일에, 그 다음 자정 타이머의 `DunningHelper.run`에서 3일 및 7일에 기부자에게 갑니다(양쪽 모두 `lambda/timer-handler.ts`와 `RailwayCron.ts`에서 연결됨). 각 전송은 `provider: "dunning"`, `providerId: "<donationId>:<day>"`로 `eventLogs`에 기록되므로, 재실행이 절대 두 번 이메일을 보내지 않습니다. Stripe이 포기하고 구독을 취소할 때(`customer.subscription.deleted` with `cancellation_details.reason: "payment_failed"`), `DunningHelper.notifyCanceled`는 기부자에게 한 번 이메일을 보냅니다(`providerId: "<subscriptionId>:canceled"`). 기부자 또는 관리자가 시작한 취소는 침묵을 유지합니다. Stripe은 절대 기존 엔드포인트에 이벤트를 추가하지 않습니다. `StripeHelper.webhookEvents` 변경 후, 게이트웨이를 다시 저장하거나 `tools/manual/stripe-webhook-events.ts`를 실행합니다(기본적으로 드라이 런, `--apply`로 쓰기).

`logsDonationsImmediately`가 있는 제공자(PayPal, Kingdom Funding, Paystack)는 `/charge` 응답에서 기부를 기록합니다(행복한 경로에는 웹훅 왕복이 필요하지 않음). 반면 Stripe은 `payment_intent.succeeded` / `invoice.paid` 및 ACH `payment_intent.processing`에 의존합니다. 수수료 처리(`POST /giving/donate/fee`, `payFees` 게이트웨이 플래그, 그리고 각 제공자의 `calculateFees`)는 기부자 측에서 "수수료를 포함하세요" 총액을 계산합니다 — B1은 플랫폼 수수를 가져가지 않으므로, 애플리케이션 수수료는 절대 추가되지 않습니다.

:::info
청구 및 웹훅 경로는 동일한 `donations` / `fundDonations` 행을 기록합니다. `transactionId`는 낙관적인 청구 기록 및 나중의 웹훅이 하나의 선물에 대해 두 개의 기부를 생성하는 것을 방지하는 조인 키입니다.
:::

## 관련 페이지

- [기부 엔드포인트](../api/endpoints/giving) — 기부, 펀드, 배치, 게이트웨이, 구독, 결제 방법, 웹훅을 위한 전체 REST 표면
- [AppHelper](../shared-libraries/app-helper) — 결제 제공자 레지스트리 및 기부 컴포넌트를 제공하는 npm 패키지
- [모듈 구조](../api/module-structure) — GivingApi 모듈이 서버 측에서 어떻게 조직되어 있는지
