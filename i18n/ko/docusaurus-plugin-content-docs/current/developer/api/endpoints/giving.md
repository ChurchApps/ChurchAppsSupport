---
title: "Giving 엔드포인트"
---

# Giving 엔드포인트

<div class="article-intro">

Giving 모듈은 헌금, 펀드, 결제 처리, 정기 결제, 관련 재정 작업을 관리합니다. 여러 결제 게이트웨이(Stripe, PayPal)를 지원하고, 일회성 헌금과 정기 헌금을 처리하며, 헌금 배치를 추적하고, 비동기 결제 이벤트를 위한 웹훅 처리를 제공합니다.

</div>

**Base path:** `/giving`

## 헌금

Base path: `/giving/donations`

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View 또는 본인의 personId | 모든 헌금 나열. `?batchId=` 또는 `?personId=`로 필터링합니다. `?personId=`를 사용하면 비공제 펀드에 대한 헌금은 제외됩니다(헌금 명세서와 같이). 단, Donations.View 호출자가 `&includeNonDeductible=1`을 추가하면 포함됩니다. B1Admin의 사람 기록이 이 방식을 사용합니다 |
| GET | `/:id` | JWT | Donations.View | ID로 헌금 조회 |
| GET | `/my` | JWT | — | 현재 사용자의 헌금 조회 |
| GET | `/my/summary?year=` | JWT | — | 현재 사용자의 연도별 헌금 합계(기본값은 올해): `{ year, total, count, currency, isConverted }`. 합계는 교회 통화로 환산됩니다. 교인 홈 페이지의 헌금 미리 보기를 지원합니다 |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | 범위(양 끝 포함) 안에 날짜가 있는 헌금. 두 날짜 모두 `YYYY-MM-DD` 형식으로 필수이며, 그렇지 않으면 `400`을 반환합니다. B1Admin의 헌금 명세서 페이지는 교회의 전체 기록 대신 이 방식으로 한 달력 연도를 요청합니다 |
| GET | `/summary` | JWT | Donations.ViewSummary | 헌금 요약 조회. `?startDate=&endDate=&type=`로 필터링합니다. 사람별 구분을 보려면 `type=person`을 사용합니다 |
| GET | `/testEmail` | Public | — | 테스트 이메일 발송(개발/디버깅용) |
| POST | `/` | JWT | Donations.Edit 또는 Donations.Enter | 헌금(배치) 생성 또는 업데이트. Donations.Enter만 있는 경우, 대상 배치와(업데이트의 경우) 헌금의 현재 배치가 모두 열려 있어야 하며, 게이트웨이 헌금(`transactionId`가 있는 것)은 변경할 수 없습니다. 그렇지 않으면 `403 { "error": "This batch is closed." }`를 반환합니다 |
| DELETE | `/:id` | JWT | Donations.Edit 또는 Donations.Enter | 헌금 삭제. Donations.Enter만 있는 경우 헌금이 열린 배치에 있어야 하며 게이트웨이 헌금이 아니어야 합니다. 그렇지 않으면 `403`을 반환합니다 |

### 예시: 배치별 헌금 목록

```
GET /giving/donations?batchId=abc-123
Authorization: Bearer <token>
```

```json
[
  {
    "id": "don-456",
    "batchId": "abc-123",
    "personId": "per-789",
    "donationDate": "2025-03-15T00:00:00.000Z",
    "amount": 100.00,
    "method": "card"
  }
]
```

### 예시: 헌금 요약 조회

```
GET /giving/donations/summary?startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer <token>
```

```json
[
  {
    "week": "2025-01-06",
    "fund": "General Fund",
    "totalAmount": 2500.00,
    "count": 15
  }
]
```

## 헌금 배치

Base path: `/giving/donationbatches`

CRUD 라우트(`getById`, `getAll`, `post`, `delete`)가 있는 `GenericCrudController`를 확장합니다. 삭제 작업은 배치 안의 모든 헌금도 함께 삭제합니다.

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary 또는 Donations.Enter | 모든 헌금 배치 나열 |
| GET | `/:id` | JWT | Donations.ViewSummary 또는 Donations.Enter | ID로 헌금 배치 조회 |
| POST | `/` | JWT | Donations.Edit 또는 Donations.Enter | 헌금 배치 생성 또는 업데이트. Donations.Enter만 있는 경우 기존 배치를 업데이트하려면 배치가 열려 있어야 하며, 그렇지 않으면 `403 { "error": "This batch is closed." }`를 반환합니다. 여기서 `status`는 무시되므로, 배치를 저장해도 다시 열리지 않습니다 |
| POST | `/:id/close` | JWT | Donations.Edit | 배치 마감: `status`를 `closed`로, `closedDate`를 현재 시각으로, `closedBy`를 호출자의 사용자 ID로 설정합니다. 배치를 반환합니다 |
| POST | `/:id/reopen` | JWT | Donations.Edit | 배치 다시 열기: `status`를 `open`으로 설정하고 `closedDate`와 `closedBy`를 지웁니다. 배치를 반환합니다 |
| DELETE | `/:id` | JWT | Donations.Edit | 배치와 그 안의 모든 헌금 삭제 |

각 배치에는 `status`(`open` 또는 `closed`. 새 배치와 기존 배치는 모두 `open`), `closedDate`, `closedBy`가 포함됩니다. Donations.Edit은 모든 배치의 헌금을 변경할 수 있습니다. Donations.Enter(역할 편집기에서는 **Enter Donations**로 표시)는 배치가 열려 있는 동안에만 헌금과 펀드 분할을 추가, 변경, 삭제할 수 있습니다.

## 헌금 (Donate)

Base path: `/giving/donate`

청구, 정기 결제, 웹훅, 수수료 계산을 포함한 공개 헌금 흐름을 처리합니다. 기본 CRUD 라우트는 활성화되어 있지 않으며, 모든 엔드포인트가 커스텀입니다.

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | 교회의 사용 가능한 결제 게이트웨이 조회(공개 키만) |
| POST | `/client-token` | JWT | — | 게이트웨이 초기화를 위한 클라이언트 토큰 생성 |
| POST | `/create-order` | JWT | — | 결제 주문 생성(PayPal 방식 결제) |
| POST | `/charge` | JWT | — | 일회성 헌금 청구 처리 |
| POST | `/subscribe` | JWT | — | 정기 헌금 구독 생성 |
| POST | `/log` | Public | — | 헌금 기록. 본문: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | 결제 웹훅 이벤트 수신(Stripe, PayPal). `?churchId=`가 필요합니다 |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | 날짜 범위의 Stripe 이벤트 재실행. 본문: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | 거래 수수료 계산. 본문: `{ type, provider, gatewayId, amount, currency }`. `?churchId=`가 필요합니다 |
| POST | `/captcha-verify` | Public | — | reCAPTCHA 토큰 확인. 본문: `{ token, churchId? }`. 사람이 응답하면 `{ response: "human", pass }`를 반환하며, `pass`는 10분 동안 유효한 서명된 게스트 헌금 통과권입니다(`churchId`를 보낸 경우 그 교회에서만 유효) |

API가 `CAPTCHA_ENFORCE=true`로 실행되면, 게스트(로그인하지 않은) 호출은 `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard`, `/giving/paymentmethods/ach-setup-intent-anon`의 본문에 `captchaPass`를 포함해야 합니다. 그렇지 않으면 403 `Captcha verification required`를 반환합니다. Stripe 게스트 흐름은 두 번(카드 추가, 그다음 청구) 호출하므로, 통과권은 만료되기 전까지 재사용할 수 있습니다. 로그인한 호출에는 영향이 없습니다. `CAPTCHA_ENFORCE`의 기본값은 `false`이며, `@churchapps/apphelper`의 게스트 헌금 양식이 통과권을 자동으로 보냅니다.

### 예시: 헌금 청구 처리

```
POST /giving/donate/charge
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 50.00,
  "currency": "usd",
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 50.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "ch_abc123",
  "status": "succeeded",
  "provider": "stripe"
}
```

### 예시: 정기 구독 생성

```
POST /giving/donate/subscribe
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 100.00,
  "customerId": "cus_abc123",
  "interval": { "interval_count": 1, "interval": "month" },
  "billing_cycle_anchor": 1710460800,
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "General Fund", "amount": 100.00 }],
  "church": { "name": "First Church", "subDomain": "firstchurch" }
}
```

```json
{
  "id": "sub_xyz789",
  "status": "active",
  "provider": "stripe"
}
```

## 펀드

Base path: `/giving/funds`

CRUD 라우트(`getById`, `getAll`, `post`, `delete`)가 있는 `GenericCrudController`를 확장합니다. `view` 권한은 `null`입니다(펀드를 보는 데 권한이 필요하지 않습니다).

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 펀드 나열 |
| GET | `/:id` | JWT | — | ID로 펀드 조회 |
| GET | `/churchId/:churchId` | Public | — | 특정 교회의 모든 펀드 조회(공개) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | 펀드의 헌금 합계 조회: `{ fundId, totalAmount, donationCount }`. 웹사이트 빌더의 `campaignProgress` 요소를 지원합니다 |
| POST | `/` | JWT | Donations.Edit | 펀드 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Donations.Edit | 펀드 삭제 |

## 펀드 헌금

Base path: `/giving/funddonations`

개별 헌금이 펀드별로 어떻게 배분되는지 추적합니다. 기본 CRUD 라우트는 활성화되어 있지 않으며, 모든 엔드포인트가 커스텀입니다.

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | 펀드 헌금 나열. `?donationId=`, `?personId=`, `?fundId=`, 또는 `?fundName=`으로 필터링합니다. 날짜 필터링을 위해 `?startDate=&endDate=`를 선택적으로 추가할 수 있습니다 |
| GET | `/:id` | JWT | Donations.View | ID로 펀드 헌금 조회 |
| GET | `/my` | JWT | — | 현재 사용자의 펀드 헌금 조회 |
| POST | `/` | JWT | Donations.Edit 또는 Donations.Enter | 펀드 헌금(배치) 생성 또는 업데이트. Donations.Enter만 있는 경우 상위 헌금이 열린 배치에 있어야 하며 게이트웨이 헌금이 아니어야 합니다. 그렇지 않으면 `403`을 반환합니다 |
| DELETE | `/:id` | JWT | Donations.Edit 또는 Donations.Enter | 펀드 헌금 삭제. Donations.Enter에 대해 같은 열린 배치 규칙이 적용됩니다 |

## 게이트웨이

Base path: `/giving/gateways`

결제 게이트웨이 설정(Stripe, PayPal 등)을 관리합니다. 기본 CRUD 라우트는 활성화되어 있지 않으며, 모든 엔드포인트가 커스텀입니다. 게이트웨이 비밀 값은 저장 시 암호화됩니다.

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 교회의 모든 게이트웨이 나열 |
| GET | `/:id` | JWT | Settings.Edit | ID로 게이트웨이 조회 |
| GET | `/churchId/:churchId` | Public | — | 교회의 게이트웨이 조회(공개 키만) |
| GET | `/configured/:churchId` | Public | — | 교회에 결제 게이트웨이가 설정되어 있는지 확인 |
| POST | `/` | JWT | Settings.Edit | 게이트웨이 생성 또는 업데이트(키 암호화, 웹훅과 제품 프로비저닝) |
| PATCH | `/:id` | JWT | Settings.Edit | 게이트웨이 부분 업데이트 |
| DELETE | `/:id` | JWT | Settings.Edit | 게이트웨이 삭제(웹훅도 함께 삭제) |

### 예시: 게이트웨이 설정 확인

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## 고객

Base path: `/giving/customers`

CRUD 라우트(`getAll`, `delete`)가 있는 `GenericCrudController`를 확장합니다. 사람을 결제 게이트웨이의 고객 기록에 연결합니다.

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 고객 나열 |
| GET | `/:id` | JWT | Donations.ViewSummary 또는 본인 기록 | ID로 고객 조회 |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary 또는 본인 기록 | 고객의 게이트웨이 구독 조회 |
| DELETE | `/:id` | JWT | Donations.Edit | 고객 삭제 |

## 구독

Base path: `/giving/subscriptions`

정기 헌금 구독을 관리합니다. 기본 CRUD 라우트는 활성화되어 있지 않으며, 모든 엔드포인트가 커스텀입니다.

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 구독 나열 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 구독 조회 |
| POST | `/` | JWT | Donations.Edit 또는 본인 구독 | 결제 게이트웨이에서 구독 업데이트 |
| DELETE | `/:id` | JWT | Donations.Edit 또는 본인 구독 | 구독 취소 후 데이터베이스에서 제거. 본문: `{ provider, reason }` |

## 구독 펀드

Base path: `/giving/subscriptionfunds`

정기 구독의 펀드 배분을 추적합니다. 기본 CRUD 라우트는 활성화되어 있지 않으며, 모든 엔드포인트가 커스텀입니다.

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View 또는 본인 구독 | 구독 펀드 나열. `?subscriptionId=`로 필터링합니다 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 구독 펀드 조회 |
| DELETE | `/:id` | JWT | Donations.Edit | 구독 펀드 삭제 |
| DELETE | `/subscription/:id` | JWT | Donations.Edit 또는 본인 구독 | 구독의 모든 펀드 삭제 |

## 결제 수단

Base path: `/giving/paymentmethods`

결제 게이트웨이 API를 통해 저장된 결제 수단(카드, 은행 계좌)을 관리합니다. 기본 CRUD 라우트는 활성화되어 있지 않으며, 모든 엔드포인트가 커스텀입니다.

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View 또는 본인 personId | 사람의 저장된 모든 결제 수단(카드, 은행 계좌) 조회 |
| POST | `/addcard` | JWT | — | 카드 결제 수단 첨부. 본문: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit 또는 본인 personId | 카드 정보 업데이트. 본문: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit 또는 본인 personId | 은행 계좌 연결을 위한 Stripe ACH SetupIntent 생성. 본문: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | 게스트 헌금을 위한 익명 ACH SetupIntent 생성. 본문: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit 또는 본인 personId | 토큰으로 은행 계좌 추가(더 이상 사용되지 않음. `ach-setup-intent` 사용). 본문: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit 또는 본인 personId | 은행 계좌 정보 업데이트. 본문: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit 또는 본인 고객 | 소액 입금으로 은행 계좌 인증. 본문: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit 또는 본인 고객 | 결제 수단(카드 또는 은행 계좌) 삭제 |

## 이벤트 로그

Base path: `/giving/eventLog`

CRUD 라우트(`getById`, `getAll`, `post`, `delete`)가 있는 `GenericCrudController`를 확장합니다. 감사와 중복 제거를 위해 결제 게이트웨이 웹훅 이벤트를 추적합니다.

| Method | Path | Auth | Permission | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 이벤트 로그 나열 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 이벤트 로그 조회 |
| GET | `/type/:type` | JWT | Donations.ViewSummary | 이벤트 유형으로 필터링한 이벤트 로그 조회 |
| POST | `/` | JWT | Donations.Edit | 이벤트 로그 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Donations.Edit | 이벤트 로그 삭제 |

## 관련 페이지

- [Membership 엔드포인트](./membership) — 사람, 교회, 그룹, 역할, 권한
- [인증 및 권한](./authentication) — 로그인 흐름, JWT, OAuth, 권한 모델
- [모듈 구조](../module-structure) — 코드 구성 패턴
