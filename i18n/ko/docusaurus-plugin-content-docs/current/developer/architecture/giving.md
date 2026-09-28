---
title: "기부 아키텍처"
---

# 기부 아키텍처

<div class="article-intro">

ChurchApps은 게이트웨이 레일 모델로 기부를 운영합니다. 교회는 자체 Stripe(또는 PayPal, Kingdom Funding, Paystack) 계정을 유지하고, B1은 플랫폼 프로세서로서 돈의 흐름에 절대 개입하지 않습니다. 카드 데이터는 브라우저에서 토큰화되며 ChurchApps 서버에 도달하지 않습니다. 이 페이지는 전체 스택을 매핑합니다 — `@churchapps/apphelper`의 클라이언트 측 공급자 레지스트리, GivingApi 게이트웨이 추상화, 기부 데이터 모델, 그리고 게이트웨이 웹훅이 데이터베이스로 어떻게 복화되는지입니다.

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

세 가지 원칙이 전체 스택에 적용됩니다:

1. **게이트웨이가 카드를 보유합니다.** 모든 공급자의 입력 위젯은 브라우저에서 토큰화됩니다. API는 토큰, nonce 또는 주문 ID만 받습니다.
2. **하나의 추상화, 많은 공급자들입니다.** 브라우저는 레지스트리에서 `PaymentProvider`를 해결합니다. 서버는 팩토리에서 `IGatewayProvider`를 해결합니다. 둘 다 게이트웨이 레코드에 저장된 동일한 정규화된 공급자 이름으로 키를 지정합니다.
3. **웹훅은 결제의 소스입니다.** 요금 응답은 낙관적으로 기록되지만, 게이트웨이의 서명된 웹훅이 완료된 기부를 확인하거나 생성하는 것입니다. 양쪽에 멱등성 보호가 있습니다.

## 클라이언트 측: 결제 공급자 레지스트리 (`@churchapps/apphelper`)

레지스트리는 `Packages/apphelper/src/donations/providers/`에 있으며, 각 공급자의 위젯과 도우미는 자체 서브폴더 아래에 있습니다 (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`, `providers/paystack/`) — `providers/` 외부의 아무것도 공급자 이름에 따라 분기하지 않습니다. `PaymentProvider`(참고 `providers/types.ts`)는 한 게이트웨이에 필요한 모든 것을 번들로 제공합니다: 관리자 레이블, 지원 통화, 수수료 필드, 기본 수수료 요율, 대시보드/가입 URL이 있는 `descriptor`, 저장된 카드, ACH, 반복, 인라인 새 카드 입력, 암시적 저장 시 토큰화가 있는 `capabilities` 플래그 세트, 회원 입력(`MemberWrapper`/`MemberEntry`), 게스트 기부(`GuestForm`), 저장된 방법 편집(`MethodEditForm`), 및 양식 질문 결제(`FormPayment`)를 위한 React 위젯, 그리고 `buildChargeRequest(ctx, token)` — 요금 페이로드 형태가 공급자별로 다른 유일한 위치입니다. 각 공급자의 `MemberWrapper`는 게이트웨이 레코드의 공개 키에서 자체 SDK를 로드하므로 호스트 앱은 게이트웨이 SDK를 절대 가져오지 않습니다 (B1App과 B1Admin은 `@stripe/*` 의존성이 없습니다). `pickDefaultGateway(gateways, capability?)`는 표면이 사용해야 하는 교회의 게이트웨이를 중앙집중식으로 지정합니다.

`providers/registry.ts`는 기본 제공 항목을 보유합니다. 이들은 **값으로 참조되며**, 모듈 부작용을 통해 등록되지 않으므로 번들러의 트리 셰이킹이 등록을 절대 떨어뜨릴 수 없습니다:

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider, PaystackProvider]) builtins.set(p.key, p);
```

| 함수 | 목적 |
|----------|---------|
| `getPaymentProvider(name)` | 정규화된 이름으로 해결합니다. 잘못된 구성 공급자가 기부자 양식을 심각하게 충돌시키지 않도록 Stripe로 기본 설정됩니다. |
| `registerPaymentProvider(p)` | 런타임 시 추가 공급자 등록 (호스트 앱의 사용자 지정 게이트웨이용) |
| `listPaymentProviders()` | 기본 제공 + 사용자 지정 열거 — 관리 게이트웨이 드롭다운을 작성하는 데 사용됩니다. |
| `hasPaymentProvider(name)` | 멤버십 확인 |

**기본 제공 클라이언트 공급자: Stripe, PayPal, Kingdom Funding, Paystack.** B1App과 B1Admin은 레지스트리만 *읽을* 뿐입니다 (`getPaymentProvider`, `listPaymentProviders`). 어느 것도 `registerPaymentProvider`를 호출하지 않습니다 — 등록은 apphelper 내부에 머물러 있습니다.

각 공급자는 다르게 토큰화하지만, 모두 카드를 B1에서 유지합니다:

| 공급자 | 입력 위젯 | API로 반환된 토큰 |
|----------|--------------|-----------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)`; 게스트 양식은 또한 `ExpressCheckoutElement`(Apple Pay / Google Pay, 일회성 선물)를 마운트하며, 그 `onConfirm`은 동일한 `pm_…` ID로 해결됩니다. | 결제 방법 ID (`pm_…`); `/paymentmethods/ach-setup-intent` — USD 게이트웨이에 대한 금융 연결 `us_bank_account`, CAD 게이트웨이에 대한 캐나다 PAD `acss_debit` (호스팅 위임 모달, 위임 `default_for` 인보이스/구독, 일회성 청구 위임 ID 통과)을 통한 은행 |
| Kingdom Funding | 게이트웨이 공개 키로 키된 호스팅 토큰화 양식 | 일회용 nonce |
| PayPal | PayPal Hosted Fields (카드, 반복) + `/donate/client-token` + `/donate/create-order`을 통한 서버 주문을 사용하는 PayPal 스마트 버튼(일회성) — Venmo 자금 조달 사용; 둘 다 하나의 SDK 로드를 공유합니다. | 캡처된 주문 ID |
| Paystack | Paystack Inline 팝업 (`js.paystack.co/v2/inline.js`) — 팝업 자체는 결제를 진행합니다 (카드, 모바일 머니, 은행 이체, USSD) | 지불된 거래 참조; 저장된 방법은 Paystack `AUTH_…` 인증 코드입니다. |

Stripe의 `finalizeResult`는 기부가 완료되기 전에 브라우저에서 3-D Secure / SCA를 실행합니다 (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`). 공유 양식은 단순히 `provider.finalizeResult(result)`를 호출하고 그것이 무엇을 하는지 알 필요가 없습니다.

## 서버 측: 게이트웨이 추상화 (GivingApi)

`/giving` 모듈 (`Api/src/modules/giving`)은 REST 표면을 노출합니다. 게이트웨이 배관은 `Api/src/shared/helpers`에 있습니다. `DonateController`은 게이트웨이 SDK와 직접 통신하지 않습니다 — `GatewayService`를 통해 이동하며, 이는 `GatewayFactory`에서 올바른 `IGatewayProvider`를 해결하고 복호화된 `GatewayConfig`를 전달합니다.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · PaystackGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`)는 모든 게이트웨이가 구현하는 계약입니다 — 웹훅 라이프사이클 (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), 결제 (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), 수수료 (`calculateFees`), 저장된 방법 처리 (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), 및 선택적 추가 항목(고객, 주문, SetupIntents, 이벤트 재생, 실패한 구독 인보이스에 대한 `retryFailedPayment`, Apple Pay 도메인 검증을 위한 `registerPaymentMethodDomain`). 선택적 후크를 생략하는 공급자는 해당 작업에 대해 지원되지 않는 것으로 보고되고 UI는 컨트롤을 숨깁니다. 각 공급자 클래스는 자체 `capabilities` 행렬(지원 통화, ACH, 환불, 구독 요구사항, 거래 제한)을 선언합니다 — `GatewayService.getProviderCapabilities(provider)`는 단순히 읽습니다 — 그리고 `logsDonationsImmediately` 같은 플래그는 컨트롤러에서 공급자 이름 조건부 없이 컨트롤러 동작을 드라이브합니다.

**GatewayFactory에 등록된 서버 공급자:**

| 공급자 | 가용성 |
|----------|-------------|
| Stripe | 항상 활성화 |
| PayPal | 항상 활성화 |
| Kingdom Funding | 항상 활성화 |
| Paystack | 항상 활성화 (나이지리아, 가나, 남아프리카, 케냐, 코트디부아르 판매자; 통화 NGN/GHS/ZAR/KES/XOF/USD) |
| Square | `ENABLE_SQUARE` 환경 플래그를 통해 선택 활성화 |
| ePayMints | `ENABLE_EPAYMINTS` 환경 플래그를 통해 선택 활성화 |

Paystack은 다른 공급자와 다릅니다. 돈은 GivingApi가 개입하기 전에 이동합니다: 팝업이 기부자를 청구하고, `processCharge`는 `GET /transaction/verify/:reference`이며, 지불된 금액과 통화는 기록 중인 기부와 일치해야 합니다 (파일에 이미 있는 참조는 절대 두 번 기록되지 않습니다). 반복 일정의 첫 번째 선물은 `finalizeSubscription`에서 기록됩니다 (확인 → `POST /plan` → 시작 날짜가 한 간격 떨어진 `POST /subscription`). 웹훅은 비밀 키 자체 (`x-paystack-signature`, 원시 본문에 대한 HMAC-SHA512)로 서명되고 Paystack은 웹훅 관리 API가 없으므로 관리 화면은 교회가 대시보드에 붙여넣을 수 있는 URL을 표시합니다. 갱신 `charge.success` 이벤트는 펀드 분할을 전달하지 않습니다. 공급자는 기부자의 로컬 `subscriptions`/`subscriptionFunds` 행에서 복구합니다. 카드 인증만 `reusable`입니다 — 모바일 머니 선물은 일회성이므로 `createSubscription`은 거부합니다. 데모 데이터는 두 번째 교회 (Accra Community Church, `CHU00000002`)를 Paystack 테스트 모드 GHS 게이트웨이에 시드하므로 Paystack Playwright 제품군이 Grace의 Stripe 제품군 옆에서 실행됩니다.

`ENABLE_CUSTOM_GATEWAY_PROVIDERS`가 설정되면 사용자 지정 공급자를 런타임 시 등록할 수 있습니다. `AbstractExperimentalGatewayProvider`는 이들의 기본 클래스입니다. 공급자 이름은 대소문자를 구분하지 않고 일치합니다.

### 게이트웨이 구성 및 비밀

관리자는 `POST /giving/gateways` (`GatewayController`)를 통해 게이트웨이 자격증명을 저장합니다. 저장할 때 컨트롤러는 비공개 및 웹훅 키를 `EncryptionHelper`로 암호화한 다음 — localhost가 아닌 모든 호스트에서 — 교회의 기존 웹훅을 삭제하고 `/giving/donate/webhook/{provider}?churchId=…`을 가리키는 새 것을 프로비저닝합니다. 교회는 공급자당 하나의 행을 유지합니다: 게이트웨이를 저장하면 동일한 공급자에 대한 기존 행만 바뀝니다. 공개 읽기 (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`)는 공개 키만 반환합니다.

## 데이터 모델

기부 스키마 (`Api/src/modules/giving/db/DatabaseTypes.ts`, 모델은 `models/`)는 Kysely를 통해 액세스된 MySQL 스키마입니다:

| 테이블 | 역할 |
|-------|------|
| `gateways` | 교회별 공급자 구성: `provider`, `publicKey`, 암호화된 `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | 기부 지정 (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | 입력/보고 그룹화 (`name`, `batchDate`) |
| `donations` | 하나의 선물: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`/`refunded`; 명세서, 합계, 대시보드 및 기부 보고서는 `complete` 또는 null만 계산함), `transactionId` |
| `fundDonations` | 하나 이상의 펀드에 걸친 기부 할당 (`donationId`, `fundId`, `amount`) |
| `subscriptions` | 반복되는 선물; `id`는 게이트웨이의 구독 ID, `personId`, `customerId`, `gatewayId`로 연결됨 |
| `subscriptionFunds` | 반복 선물의 펀드 분할 |
| `customers` | `personId`를 게이트웨이 고객 ID와 연결, 공급자별 |
| `gatewayPaymentMethods` | 저장된 카드/은행: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | 웹훅/이벤트 감사 추적 및 중복 제거 키 (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | 펀드에 연결된 공약 캠페인, 그리고 각 사람의 공약 금액 |

기부는 `fundDonations`를 통해 펀드에 걸쳐 분할됩니다 — 기부는 합계를 전달하고, 각 `fundDonation`은 슬라이스를 전달합니다. `donations.currency`와 `gateways.currency`는 ISO 통화를 전달합니다. 각 공급자는 자신의 `supportedCurrencies`를 알리고, 금액은 `CurrencyHelper.formatCurrencyWithLocale`으로 포맷됩니다.

## 엔드투엔드 흐름

### 회원 일회성 및 반복 (B1App)

인증된 기부 화면 (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`)은 세 개의 apphelper 컴포넌트를 구성합니다: `MultiGatewayDonationForm`, `PaymentMethods`, 및 `RecurringDonations`. B1App은 주변 데이터 로딩 — `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` — 을 수행하고 게이트웨이 목록을 통과시킵니다. 해결된 공급자는 게이트웨이의 공개 키에서 자체 SDK를 로드합니다. 요금 자체는 apphelper 내에서 발생합니다: 해결된 공급자는 (새 또는 저장된) 방법을 토큰화한 다음 일회성 선물의 경우 `/giving/donate/charge` 또는 반복 선물의 경우 `/giving/donate/subscribe`에 게시합니다. 두 끝점 모두 로그인한 기부자를 자신의 `personId`에 귀속시킵니다 (오직 `donations.edit` 보유자만 다른 사람에게 귀속시킬 수 있습니다). 반복 선물은 `subscriptions` 행 + `subscriptionFunds`를 생성하고 일정을 게이트웨이 (Stripe 구독, PayPal 청구 계획 또는 KF 반복 일정)에 전달합니다.

### 게스트 / 익명 기부

공개 기부 페이지 (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`)와 "지금 기부하기" 패널은 `@churchapps/apphelper/website`에서 `NonAuthDonationWrapper`를 렌더링하며, 이는 reCAPTCHA와 공급자의 `GuestForm` 주변에 게이트웨이의 Elements 컨텍스트를 주입합니다. 게스트는 로그인, 저장된 방법, 기록을 얻지 못합니다. 흐름은 `GET /giving/funds/churchId/:id`와 `GET /giving/donate/gateways/:churchId` (공개 키만)를 가져오고, `POST /giving/donate/captcha-verify`로 방문자를 확인하고, 브라우저에서 토큰화하고, `/giving/donate/charge` (또는 `/subscribe`)에 게시합니다. 게스트 ACH는 익명 `POST /giving/paymentmethods/ach-setup-intent-anon`을 사용합니다.

세 가지 게스트 양식 옵션은 동일한 청구 호출에 작동합니다. 기부 URL의 `?fundId=`와 `?amount=`는 펀드 분할을 미리 선택합니다 (각 공급자의 게스트 양식이 마운트할 때 읽음, 합계 및 수수료가 업데이트되도록 정상 펀드 변경 핸들러를 통해 라우팅됨). `anonymous: true`는 `DonateController.charge`가 클라이언트가 보낸 모든 사람을 삭제하고 `personId = null`로 선물을 기록하게 합니다. 게스트 양식은 `/people/loadOrCreate`와 고객/금고 단계를 건너뜁니다. 그리고 세 개의 즉시 로그 공급자는 게이트웨이 고객에서 사람을 해결하는 것을 중단합니다. Apple Pay는 Stripe에 등록된 페이지의 도메인이 필요하므로 Stripe 게스트 양식은 세션당 한 번 공개, 속도 제한된 `POST /giving/donate/register-domain`에 게시합니다. 이는 교회에 속하는 도메인 (`<subDomain>.b1.church`, 콘텐츠 모듈 도메인 테이블의 행 또는 로컬 호스트)만 수락한 다음 Stripe의 결제 방법 도메인 API를 호출합니다.

### 관리 기록 및 Stripe 가져오기 (B1Admin)

B1Admin 기부 섹션 (`B1Admin/src/donations/`)은 재무 팀이 일하는 곳입니다. 배치 입력 (`components/BulkDonationEntry.tsx`)은 `/giving/donations` 다음 `/giving/funddonations`에 게시하여 현금/수표/현물 선물을 기록합니다 — 게이트웨이는 개입하지 않습니다. 펀드, 배치, 캠페인, 명세서는 각각 자신의 `/giving/*` CRUD 경로에 매핑됩니다. 회원 스타일 기부 패널 (`B1Admin/src/donationComponents/`)은 B1App과 동일한 apphelper 컴포넌트를 재사용합니다.

보고 및 회계 인수 오프는 클라이언트 측 또는 보고서 실행기 작업이며, 게이트웨이 작업이 아닙니다: 배치 페이지의 QuickBooks 내보내기는 배치의 `donations` + `fundDonations`에서 분개 항목 CSV를 작성합니다 (미입금 자금 차변, 펀드당 하나의 신용 거래), Lapsed Givers 탭은 `Api/reports/lapsedGivers.json`을 `ReportOutput`로 해결된 사람 이름을 가진 일반 보고서 실행기를 통해 실행하고, 국가 영수증 형식 (캐나다 / 호주 / 뉴질랜드)은 교회 설정입니다. 멤버십 키/값 저장소에서 렌더링되는 `GivingStatementDocument` 및 B1App 인쇄 페이지에서 중복됩니다.

### 혼합 통화 합계 변환

가능한 혼합 통화 선물 간에 단일 결합 합계를 반환하는 모든 끝점 — 기부 요약 KPI (`GivingKpiCards`), 기부 배치 합계, 펀드 합계, B1App 기부 화면의 연간/기간 합계 — 합계하지 않고 서버 측에서 교회의 기본 통화로 변환합니다. 서로 다른 통화. `Api/src/shared/helpers/ExchangeRateHelper.ts`는 `api.frankfurter.dev`에서 교회 통화로 키된 요율을 가져오고, 프로세스 12시간 동안 캐시하고, `convertTotals(rows, churchCurrency, rates)` 노출: 행은 SQL에서 통화로 미리 그룹화됩니다 (몇 개의 그룹, 절대 선물별 변환). 각 그룹이 변환 및 합계되고, 결과는 클라이언트가 "현재 환율로 변환됨" 메모를 표시하는 데 사용하는 `isConverted` 플래그를 전달합니다. `GET /donations/exchange-rates`는 필요한 클라이언트 (B1App의 기부 화면)에 요율 테이블을 노출합니다. 요율 자체는 절대 요청에서 수락되지 않고, 항상 서버 측에서만 가져오므로 클라이언트는 보고된 합계에 영향을 미칠 수 없습니다. 개별 기부 레코드 및 기록/원본 통화 보고서는 절대 변환되지 않습니다 — 결합된 합계만 변환됩니다.

Stripe 가져오기 (`B1Admin/src/donations/StripeImportPage.tsx`)는 B1 외부에서 이루어진 선물을 백필합니다: `dryRun: true`를 사용하여 `POST /giving/donate/replay-stripe-events`를 호출하여 미리 보기를 표시한 다음 `dryRun: false`를 가져옵니다. 서버는 날짜 범위에 대한 Stripe 이벤트를 나열하고 이미 기록된 항목을 건너뜁니다 — 먼저 `eventLogs` 공급자 ID로 일치하고, 그 다음 `DonationRepo.findMatchingDonation` (금액 + 날짜 + 사람)으로 일치하므로 다시 실행이 절대 이중 가져오기를 수행하지 않습니다.

## 웹훅 및 복화

결제 및 구독 상태 변경은 `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`)에 도착합니다. 처리는 의도적으로 멱등성입니다:

1. **확인** — `GatewayService.verifyWebhook`는 공급자의 서명 확인에 위임합니다. 실패한 서명은 401을 반환합니다. 처리할 필요가 없는 이벤트는 200으로 단락됩니다.
2. **이벤트 중복 제거** — `EventLogRepo.loadByProviderId`는 `eventLogs`에 이미 기록된 웹훅을 건너뜁니다.
3. **기부 중복 제거** — 아무것도 생성하기 전에 `DonationRepo.loadByTransactionId`를 페이로드가 수행할 수 있는 모든 후보 ID와 비교합니다. 이는 중복 배달, 다단계 ACH 이벤트 (보류 중 → 정산됨) 및 `/donate/charge`가 이미 낙관적으로 선물을 기록한 경우를 흡수합니다.
4. **적용** — 공급자의 `classifyWebhookEvent(eventType)`은 이벤트가 의미하는 바를 표시합니다 (`donation` 보류 중/완료, `cancel-subscription`, 또는 `ignore`); 완료된 결제는 `complete` 기부 생성 (또는 기존 `pending` 또는 `failed` 하나 승격), ACH 스타일 이벤트는 정산까지 `pending`에 도착하고, 실패한 구독 인보이스 (Stripe `invoice.payment_failed`)는 인보이스 ID로 키된 `failed` 기부를 생성하고, 취소 이벤트는 로컬 `subscriptions` 행을 삭제합니다. 컨트롤러는 공급자 특정 이벤트 이름을 절대 검사하지 않습니다.

### 실패한 반복 선물 및 추심

`failed` 기부는 복구 작업의 단위입니다. `GET /giving/donations/failed`는 `eventLogs`의 가장 새로운 게이트웨이 실패 메시지와 게이트웨이 기능의 `canRetry` 플래그로 나열합니다. `POST /giving/donate/retry/:donationId`는 공급자의 `retryFailedPayment`를 호출합니다 (Stripe는 미결 인보이스를 지불합니다). 결과 웹훅은 정상 중복 제거 경로를 통해 행을 `complete`로 승격합니다. 추심 이메일은 웹훅 핸들러에서 0일, 그 다음 `DunningHelper.run`에서 자정 타이머 (양쪽 `lambda/timer-handler.ts` 및 `RailwayCron.ts`에서 배선됨)에서 3일 및 7일에 보냅니다. 각 전송은 `eventLogs`에 `provider: "dunning"`, `providerId: "<donationId>:<day>"`로 기록되므로 다시 실행이 두 번 이메일하지 않습니다. 이 기능 이전에 생성된 Stripe 웹훅 끝점은 `invoice.payment_failed`를 구독하지 않습니다. 게이트웨이를 다시 저장하면 새 끝점이 이벤트로 프로비저닝됩니다.

`logsDonationsImmediately` (PayPal, Kingdom Funding, Paystack)를 가진 공급자는 `/charge` 응답에서 요금을 기록합니다 (행복한 경로에는 웹훅 왕복 필요 없음). Stripe는 `payment_intent.succeeded` / `invoice.paid` 및 ACH `payment_intent.processing`을 포함합니다. 수수료 처리 (`POST /giving/donate/fee`, `payFees` 게이트웨이 플래그, 각 공급자의 `calculateFees`)는 기부자 측에서 "수수료 포함" 총액을 계산합니다 — B1은 플랫폼 컷을 취하지 않으므로 애플리케이션 수수료는 절대 추가되지 않습니다.

:::info
요금 및 웹훅 경로는 동일한 `donations` / `fundDonations` 행을 씁니다. `transactionId`는 낙관적 요금 로그와 나중의 웹훅이 하나의 선물에 대해 두 개의 기부를 생성하지 않도록 유지하는 조인 키입니다.
:::

## 관련 페이지

- [기부 끝점](../api/endpoints/giving) — 기부, 펀드, 배치, 게이트웨이, 구독, 결제 방법, 웹훅의 전체 REST 표면
- [AppHelper](../shared-libraries/app-helper) — 결제 공급자 레지스트리 및 기부 컴포넌트를 제공하는 npm 패키지
- [모듈 구조](../api/module-structure) — GivingApi 모듈이 서버 측에서 어떻게 구성되어 있는지
