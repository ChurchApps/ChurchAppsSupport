---
title: "기부 아키텍처"
---

# 기부 아키텍처

<div class="article-intro">

ChurchApps는 게이트웨이 레일 모델로 기부를 실행합니다. 교회는 자신의 Stripe (또는 PayPal, 또는 Kingdom Funding) 계정을 유지하고 B1은 플랫폼 프로세서로 자금 경로에 앉지 않습니다. 카드 데이터는 브라우저에서 토큰화되고 ChurchApps 서버에 도달하지 않습니다. 이 페이지는 전체 스택을 매핑합니다. `@churchapps/apphelper`의 클라이언트 측 제공자 레지스트리, GivingApi 게이트웨이 추상화, 기부 데이터 모델, 게이트웨이 웹훅이 데이터베이스로 다시 조화되는 방법.

</div>

## 개요

```
┌─────────────────────────────┐                   ┌───────────────────────────────────────┐
│  B1App / B1Admin (browser)  │                   │  Payment gateway                      │
│                             │                   │  (Stripe / PayPal / Kingdom Funding)  │
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

스택 전체에서 세 가지 원칙이 유지됩니다.

1. **게이트웨이가 카드를 보유합니다.** 모든 제공자의 항목 위젯은 브라우저에서 토큰화합니다. API는 토큰, nonce 또는 주문 id만 수신합니다.
2. **하나의 추상화, 많은 제공자.** 브라우저는 레지스트리에서 `PaymentProvider`를 해결합니다. 서버는 팩토리에서 `IGatewayProvider`를 해결합니다. 둘 다 게이트웨이 레코드에 저장된 동일한 정규화된 제공자 이름으로 키됩니다.
3. **웹훅은 결제의 진실의 원천입니다.** 충전 응답은 낙관적으로 기록되지만 게이트웨이의 서명 웹훅은 완료된 기부를 확인합니다 (또는 생성하며), 양쪽에 멱등성 가드가 있습니다.

## 클라이언트 측: 결제 제공자 레지스트리 (`@churchapps/apphelper`)

레지스트리는 `Packages/apphelper/src/donations/providers/`에 있고, 각 제공자의 위젯과 도우미는 자신의 하위 폴더 (`providers/stripe/`, `providers/paypal/`, `providers/kingdomfunding/`) 아래에 있습니다. `providers/` 외부의 아무것도 제공자 이름에 분기하지 않습니다. `PaymentProvider` (참조 `providers/types.ts`)는 한 게이트웨이에 대해 호스트 앱이 필요한 모든 것을 번들합니다: `descriptor` (관리자 라벨, 지원 통화, 요금 필드, 기본 요금율, 대시보드/가입 URL), `capabilities` 플래그 세트 (저장된 카드, ACH, 반복, 인라인 새 카드 항목, 토큰화 시 암시적 저장), 회원 항목 (`MemberWrapper`/`MemberEntry`), 게스트 기부 (`GuestForm`), 저장된 방법 편집 (`MethodEditForm`), 양식 질문 결제 (`FormPayment`)를 위한 React 위젯, 더하기 `buildChargeRequest(ctx, token)`. 충전 페이로드 형태가 제공자별로 다른 한 곳입니다. 각 제공자의 `MemberWrapper`는 게이트웨이 레코드의 공개 키에서 자신의 SDK를 로드하므로 호스트 앱은 게이트웨이 SDK를 가져오지 않습니다 (B1App과 B1Admin은 `@stripe/*` 종속성이 없음). `pickDefaultGateway(gateways, capability?)`는 표면이 사용해야 하는 교회의 게이트웨이를 중앙화합니다.

`providers/registry.ts`는 내장을 보유합니다. 모듈 부작용을 통해 등록되지 않고 **값으로 참조**되므로 번들러의 트리 쉐이킹은 등록을 떨어뜨릴 수 없습니다.

```typescript
for (const p of [StripeProvider, KingdomFundingProvider, PayPalProvider]) builtins.set(p.key, p);
```

| 함수 | 목적 |
|------|------|
| `getPaymentProvider(name)` | 정규화된 이름으로 해결합니다. 구성이 잘못된 제공자가 기부자 양식을 하드 크래시하지 않도록 Stripe로 대체됩니다. |
| `registerPaymentProvider(p)` | 런타임에 추가 제공자를 등록합니다 (호스트 앱의 사용자 정의 게이트웨이 용) |
| `listPaymentProviders()` | 내장 + 사용자 정의를 열거합니다. 관리자 게이트웨이 드롭다운을 구축하는 데 사용됩니다. |
| `hasPaymentProvider(name)` | 회원 검사 |

**내장 클라이언트 제공자: Stripe, PayPal, Kingdom Funding.** B1App과 B1Admin은 레지스트리만 *읽습니다* (`getPaymentProvider`, `listPaymentProviders`); 어느 것도 `registerPaymentProvider`를 호출하지 않습니다. 등록은 apphelper 내에 유지됩니다.

각 제공자는 다르게 토큰화하지만 모두 카드를 B1 밖에 유지합니다.

| 제공자 | 항목 위젯 | API로 반환된 토큰 |
|--------|----------|------------------|
| Stripe | Stripe `Elements` `CardElement` → `stripe.createPaymentMethod(...)` | 결제 방법 id (`pm_…`); Financial Connections / ACH SetupIntent를 통한 은행 |
| Kingdom Funding | 게이트웨이 공개 키로 키된 호스팅 토큰화 양식 | 일회용 nonce |
| PayPal | PayPal Hosted Fields; `/donate/client-token` + `/donate/create-order`를 통한 서버 주문 빌드 | 캡처된 주문 id |

Stripe의 `finalizeResult`는 기부가 완료된 것으로 간주되기 전에 브라우저에서 3-D Secure / SCA를 실행합니다 (`providers/stripe/stripe3DS.ts` → `stripe.confirmCardPayment`); 공유 양식은 어떤 것을 하는지 모르고 `provider.finalizeResult(result)`를 호출합니다.

## 서버 측: 게이트웨이 추상화 (GivingApi)

`/giving` 모듈 (`Api/src/modules/giving`)은 REST 표면을 노출합니다. 게이트웨이 배선은 `Api/src/shared/helpers`에 있습니다. `DonateController`은 게이트웨이 SDK와 직접 대화하지 않습니다. `GatewayService`를 통해 이동하고 이는 `GatewayFactory`에서 올바른 `IGatewayProvider`를 해결하고 해독된 `GatewayConfig`를 전달합니다.

```
DonateController ─▶ GatewayService ─▶ GatewayFactory.getProvider(name) ─▶ IGatewayProvider
                        │ getGatewayConfig() decrypts privateKey / webhookKey
                        ▼
             StripeGatewayProvider · PayPalGatewayProvider · KingdomFundingGatewayProvider · …
```

`IGatewayProvider` (`shared/helpers/gateways/IGatewayProvider.ts`)는 모든 게이트웨이가 구현하는 계약입니다. 웹훅 생명 주기 (`createWebhookEndpoint`, `verifyWebhookSignature`, `classifyWebhookEvent`), 결제 (`prepareCharge`, `processCharge`, `prepareSubscription`, `createSubscription`, `finalizeSubscription`, `cancelSubscription`), 요금 (`calculateFees`), 저장된 방법 처리 (`listNormalizedPaymentMethods`, `buildAttachOptions`, `buildLocalMethodRecord`, `deletePaymentMethod`, `verifyMethodOwnership`, `ownsPaymentMethodId`), 선택사항 추가 (고객, 주문, SetupIntents, 이벤트 재생). 각 제공자 클래스는 자신의 `capabilities` 매트릭스를 선언합니다 (지원 통화, ACH, 환불, 구독 요구사항, 거래 한도). `GatewayService.getProviderCapabilities(provider)`는 단순히 이를 읽고 `logsDonationsImmediately` 같은 플래그는 컨트롤러에서 제공자 이름 조건 없이 컨트롤러 동작을 구동합니다.

**`GatewayFactory`에 등록된 서버 제공자:**

| 제공자 | 가용성 |
|--------|--------|
| Stripe | 항상 켜짐 |
| PayPal | 항상 켜짐 |
| Kingdom Funding | 항상 켜짐 |
| Square | `ENABLE_SQUARE` 환경 플래그를 통한 옵트인 |
| ePayMints | `ENABLE_EPAYMINTS` 환경 플래그를 통한 옵트인 |

`ENABLE_CUSTOM_GATEWAY_PROVIDERS`가 설정되면 사용자 정의 제공자를 런타임에 등록할 수 있습니다. `AbstractExperimentalGatewayProvider`는 그러한 제공자의 기본 클래스입니다. 제공자 이름은 대소문자를 구분하지 않게 일치합니다.

### 게이트웨이 구성 및 비밀

관리자는 `POST /giving/gateways` (`GatewayController`)를 통해 게이트웨이 자격증을 저장합니다. 저장 시 컨트롤러는 `EncryptionHelper`로 비공개 및 웹훅 키를 암호화한 후 지속하고, 그 후 (비로컬호스트 호스트에서) 교회의 기존 웹훅을 삭제하고 `/giving/donate/webhook/{provider}?churchId=…`을 가리키는 새 웹훅을 프로비저닝합니다. 공개 읽기 (`GET /giving/gateways/churchId/:churchId`, `/configured/:churchId`)는 공개 키만 반환합니다.

## 데이터 모델

기부 스키마 (`Api/src/modules/giving/db/DatabaseTypes.ts`, `models/`의 모델)는 Kysely를 통해 접근되는 MySQL 스키마입니다.

| 테이블 | 역할 |
|--------|------|
| `gateways` | 교회별 제공자 구성: `provider`, `publicKey`, 암호화된 `privateKey`/`webhookKey`, `productId`, `payFees`, `currency`, `settings`, `environment` |
| `funds` | 기부 지정 (`name`, `taxDeductible`, `productId`) |
| `donationBatches` | 항목/보고 그룹 (`name`, `batchDate`) |
| `donations` | 한 선물: `batchId`, `personId`, `donationDate`, `amount`, `currency`, `method`, `status` (`pending`/`complete`/`failed`), `transactionId` |
| `fundDonations` | 한 선물이 하나 이상의 기금에 걸쳐 할당 (`donationId`, `fundId`, `amount`) |
| `subscriptions` | 반복 선물; `id`는 게이트웨이의 구독 id이고 `personId`, `customerId`, `gatewayId`에 연결됨 |
| `subscriptionFunds` | 반복 선물의 기금 분할 |
| `customers` | `personId`를 게이트웨이 고객 id에 연결, 제공자별 |
| `gatewayPaymentMethods` | 저장된 카드/은행: `customerId`, `externalId`, `methodType`, `displayName`, `metadata` |
| `eventLogs` | 웹훅/이벤트 감사 추적 및 중복 제거 키 (`provider`, `providerId`, `eventType`, `status`, `resolved`) |
| `campaigns` / `pledges` | 기금에 연결된 약속 캠페인 및 각 사람의 약속된 금액 |

기부는 `fundDonations`를 통해 기금에 걸쳐 분할됩니다. 기부는 합계를 전달하고 각 `fundDonation`은 슬라이스를 전달합니다. `donations.currency` 및 `gateways.currency`는 ISO 통화를 전달합니다. 각 제공자는 자신의 `supportedCurrencies`를 광고하고 금액은 `CurrencyHelper.formatCurrencyWithLocale`로 포맷됩니다.

## 엔드 투 엔드 흐름

### 회원 일회성 및 반복 (B1App)

인증된 기부 화면 (`B1App/src/app/[sdSlug]/mobile/components/screens/DonatePage.tsx`)은 세 가지 apphelper 컴포넌트를 구성합니다: `MultiGatewayDonationForm`, `PaymentMethods`, `RecurringDonations`. B1App은 주변 데이터 로딩을 수행합니다. `GET /donations/my`, `/gateways`, `/paymentmethods/personid/:id`, `/customers/:id/subscriptions` 및 게이트웨이 목록을 전달합니다. 해결된 제공자는 게이트웨이의 공개 키에서 자신의 SDK를 로드합니다. 충전 자체는 apphelper 내에서 발생합니다. 해결된 제공자는 (새로운 또는 저장된) 방법을 토큰화한 후 일회성 선물의 경우 `/giving/donate/charge`로 게시하거나 반복 선물의 경우 `/giving/donate/subscribe`로 게시합니다. 반복 선물은 `subscriptions` 행 더하기 `subscriptionFunds`를 생성하고 게이트웨이에 일정을 전달합니다 (Stripe 구독, PayPal 청구 계획, 또는 KF 반복 일정).

### 게스트 / 익명 기부

공개 기부 페이지 (`B1App/src/app/[sdSlug]/(public)/[pageSlug]/components/DonatePage.tsx`) 및 "지금 기부" 패널은 `@churchapps/apphelper/website`에서 `NonAuthDonationWrapper`를 렌더링하고 이는 제공자의 `GuestForm` 주위에 reCAPTCHA 및 게이트웨이의 Elements 콘텍스트를 주입합니다. 게스트는 로그인, 저장된 방법, 이력을 받지 않습니다. 흐름은 `GET /giving/funds/churchId/:id` 및 `GET /giving/donate/gateways/:churchId` (공개 키만)를 가져오고, 방문자를 `POST /giving/donate/captcha-verify`로 확인하고, 브라우저에서 토큰화하고, `/giving/donate/charge` (또는 `/subscribe`)로 게시합니다. 게스트 ACH는 익명 `POST /giving/paymentmethods/ach-setup-intent-anon`을 사용합니다.

### 관리자 기록 및 Stripe 가져오기 (B1Admin)

B1Admin 기부 섹션 (`B1Admin/src/donations/`)은 재무 팀이 작동하는 곳입니다. 배치 항목 (`components/BulkDonationEntry.tsx`)은 `/giving/donations` 및 `/giving/funddonations`를 게시하여 현금/수표/기부금 선물을 기록합니다. 게이트웨이가 포함되지 않습니다. 기금, 배치, 캠페인, 명세서는 각각 `/giving/*` CRUD 경로에 매핑됩니다. 회원 스타일 기부 패널 (`B1Admin/src/donationComponents/`)은 B1App과 동일한 apphelper 컴포넌트를 재사용합니다.

Stripe 가져오기 (`B1Admin/src/donations/StripeImportPage.tsx`)는 B1 외부에서 만든 선물을 역채웁니다. `POST /giving/donate/replay-stripe-events`를 `dryRun: true`로 호출하여 미리 보기를 한 후 `dryRun: false`로 가져옵니다. 서버는 날짜 범위에 대한 Stripe 이벤트를 나열하고 이미 기록된 것을 건너뜁니다. 먼저 `eventLogs` 제공자 id로 일치시킨 후 `DonationRepo.findMatchingDonation` (금액 + 날짜 + 사람)으로 일치시키므로 재실행은 절대 중복 가져오기를 하지 않습니다.

## 웹훅 및 조화

결제된 결제 및 구독 상태 변경은 `POST /giving/donate/webhook/:provider?churchId=…` (`DonateController.webhook`)에 도달합니다. 처리는 의도적으로 멱등성입니다.

1. **확인** — `GatewayService.verifyWebhook`은 제공자의 서명 검사에 위임합니다. 실패한 서명은 401을 반환합니다. 처리가 필요 없는 이벤트는 200으로 단락됩니다.
2. **이벤트를 중복 제거합니다** — `EventLogRepo.loadByProviderId`는 `eventLogs`에 이미 기록된 웹훅을 건너뜁니다.
3. **기부를 중복 제거합니다** — 아무것도 생성하기 전에 `DonationRepo.loadByTransactionId`가 페이로드가 전달할 수 있는 모든 후보 id에 대해 확인됩니다. 이는 중복 배달, 다단계 ACH 이벤트 (대기 중 → 결제됨), `/donate/charge`이 이미 선물을 낙관적으로 기록한 경우를 흡수합니다.
4. **적용** — 제공자의 `classifyWebhookEvent(eventType)`은 이벤트가 의미하는 것 (기부 대기 중/완료, `cancel-subscription`, 또는 `ignore`)을 말합니다. 완료된 결제는 `complete` 기부를 생성합니다 (또는 기존 `pending` 기부를 승격함), ACH 스타일 이벤트는 결제될 때까지 `pending`으로 착지하고 취소 이벤트는 로컬 `subscriptions` 행을 삭제합니다. 컨트롤러는 제공자 특정 이벤트 이름을 검사하지 않습니다.

`logsDonationsImmediately` (PayPal, Kingdom Funding)가 있는 제공자는 `/charge` 응답에서 충전이 기록되고 (행복 경로에 웹훅 왕복이 필요 없음) Stripe는 `payment_intent.succeeded` / `invoice.paid` 및 ACH `payment_intent.processing`을 의존합니다. 요금 처리 (`POST /giving/donate/fee`, `payFees` 게이트웨이 플래그, 각 제공자의 `calculateFees`)는 기부자 측의 "요금 커버" 총액을 계산합니다. B1은 플랫폼 절단을 하지 않으므로 응용 프로그램 요금이 추가되지 않습니다.

:::info
충전 및 웹훅 경로는 동일한 `donations` / `fundDonations` 행을 기록합니다. `transactionId`는 낙관적 충전 로그 및 나중 웹훅이 한 선물에 대해 두 개의 기부를 생성하지 않도록 유지하는 조인 키입니다.
:::

## 관련 페이지

- [기부 엔드포인트](../api/endpoints/giving) — 기부, 기금, 배치, 게이트웨이, 구독, 결제 방법, 웹훅의 전체 REST 표면
- [AppHelper](../shared-libraries/app-helper) — 결제 제공자 레지스트리 및 기부 컴포넌트를 제공하는 npm 패키지
- [모듈 구조](../api/module-structure) — GivingApi 모듈이 서버 측에서 어떻게 구성되는지
