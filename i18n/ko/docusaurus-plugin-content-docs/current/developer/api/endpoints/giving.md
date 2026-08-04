---
title: "헌금 엔드포인트"
---

# 헌금 엔드포인트

<div class="article-intro">

Giving 모듈은 헌금, 기금, 결제 처리, 구독, 관련 재무 운영을 관리합니다. 여러 결제 게이트웨이(Stripe, PayPal)를 지원하며, 일회성 및 정기 헌금을 처리하고, 헌금 배치(batch)를 추적하며, 비동기 결제 이벤트에 대한 웹훅 처리를 제공합니다.

</div>

**기본 경로:** `/giving`

## Donations

기본 경로: `/giving/donations`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View 또는 본인 personId | 모든 헌금 목록을 가져옵니다. `?batchId=` 또는 `?personId=`로 필터링합니다 |
| GET | `/:id` | JWT | Donations.View | ID로 헌금을 가져옵니다 |
| GET | `/my` | JWT | — | 현재 사용자의 헌금 내역을 가져옵니다 |
| GET | `/summary` | JWT | Donations.ViewSummary | 헌금 요약을 가져옵니다. `?startDate=&endDate=&type=`로 필터링합니다. 인물별 분류는 `type=person`을 사용합니다 |
| GET | `/testEmail` | Public | — | 테스트 이메일을 발송합니다(개발/디버깅용) |
| POST | `/` | JWT | Donations.Edit | 헌금을 생성하거나 업데이트합니다(일괄 처리) |
| DELETE | `/:id` | JWT | Donations.Edit | 헌금을 삭제합니다 |

### 예시: 배치별 헌금 목록 조회

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

## Donation Batches

기본 경로: `/giving/donationbatches`

`GenericCrudController`를 확장하여 `getById`, `getAll`, `post`, `delete` CRUD 경로를 제공합니다. 삭제 작업 시 배치 내 모든 헌금도 함께 제거됩니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 헌금 배치 목록을 가져옵니다 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 헌금 배치를 가져옵니다 |
| POST | `/` | JWT | Donations.Edit | 헌금 배치를 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Donations.Edit | 배치와 그 안의 모든 헌금을 삭제합니다 |

## Donate

기본 경로: `/giving/donate`

청구, 구독, 웹훅, 수수료 계산을 포함한 공개 헌금 흐름을 처리합니다. 기본 CRUD 경로는 제공되지 않으며 모든 엔드포인트는 사용자 정의입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | 교회에서 사용 가능한 결제 게이트웨이를 가져옵니다(공개 키만) |
| POST | `/client-token` | JWT | — | 게이트웨이 초기화를 위한 클라이언트 토큰을 생성합니다 |
| POST | `/create-order` | JWT | — | 결제 주문을 생성합니다(PayPal 방식 결제) |
| POST | `/charge` | JWT | — | 일회성 헌금 청구를 처리합니다 |
| POST | `/subscribe` | JWT | — | 정기 헌금 구독을 생성합니다 |
| POST | `/log` | Public | — | 헌금을 기록합니다. 본문: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | 결제 웹훅 이벤트를 수신합니다(Stripe, PayPal). `?churchId=`가 필요합니다 |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | 특정 날짜 범위의 Stripe 이벤트를 재실행합니다. 본문: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | 거래 수수료를 계산합니다. 본문: `{ type, provider, gatewayId, amount, currency }`. `?churchId=`가 필요합니다 |
| POST | `/captcha-verify` | Public | — | reCAPTCHA 토큰을 검증합니다. 본문: `{ token }` |

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

## Funds

기본 경로: `/giving/funds`

`GenericCrudController`를 확장하여 `getById`, `getAll`, `post`, `delete` CRUD 경로를 제공합니다. `view` 권한은 `null`입니다(기금 조회에는 권한이 필요 없습니다).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 기금 목록을 가져옵니다 |
| GET | `/:id` | JWT | — | ID로 기금을 가져옵니다 |
| GET | `/churchId/:churchId` | Public | — | 특정 교회의 모든 기금을 가져옵니다(공개) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | 기금의 헌금 총액을 가져옵니다: `{ fundId, totalAmount, donationCount }`. 웹사이트 빌더의 `campaignProgress` 요소를 지원합니다 |
| POST | `/` | JWT | Donations.Edit | 기금을 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Donations.Edit | 기금을 삭제합니다 |

## Fund Donations

기본 경로: `/giving/funddonations`

개별 헌금이 여러 기금에 어떻게 배분되는지 추적합니다. 기본 CRUD 경로는 제공되지 않으며 모든 엔드포인트는 사용자 정의입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | 기금별 헌금 목록을 가져옵니다. `?donationId=`, `?personId=`, `?fundId=`, 또는 `?fundName=`으로 필터링합니다. 선택적으로 `?startDate=&endDate=`를 추가해 날짜로 필터링할 수 있습니다 |
| GET | `/:id` | JWT | Donations.View | ID로 기금별 헌금을 가져옵니다 |
| GET | `/my` | JWT | — | 현재 사용자의 기금별 헌금 내역을 가져옵니다 |
| POST | `/` | JWT | Donations.Edit | 기금별 헌금을 생성하거나 업데이트합니다(일괄 처리) |
| DELETE | `/:id` | JWT | Donations.Edit | 기금별 헌금을 삭제합니다 |

## Gateways

기본 경로: `/giving/gateways`

결제 게이트웨이 설정(Stripe, PayPal 등)을 관리합니다. 기본 CRUD 경로는 제공되지 않으며 모든 엔드포인트는 사용자 정의입니다. 게이트웨이 비밀 정보는 저장 시 암호화됩니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 교회의 모든 게이트웨이 목록을 가져옵니다 |
| GET | `/:id` | JWT | Settings.Edit | ID로 게이트웨이를 가져옵니다 |
| GET | `/churchId/:churchId` | Public | — | 교회의 게이트웨이를 가져옵니다(공개 키만) |
| GET | `/configured/:churchId` | Public | — | 교회에 설정된 결제 게이트웨이가 있는지 확인합니다 |
| POST | `/` | JWT | Settings.Edit | 게이트웨이를 생성하거나 업데이트합니다(키 암호화, 웹훅 및 상품 프로비저닝) |
| PATCH | `/:id` | JWT | Settings.Edit | 게이트웨이를 부분적으로 업데이트합니다 |
| DELETE | `/:id` | JWT | Settings.Edit | 게이트웨이를 삭제합니다(관련 웹훅도 함께 제거) |

### 예시: 게이트웨이 설정 확인

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## Customers

기본 경로: `/giving/customers`

`GenericCrudController`를 확장하여 `getAll`, `delete` CRUD 경로를 제공합니다. 인물을 결제 게이트웨이의 고객 레코드와 연결합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 고객 목록을 가져옵니다 |
| GET | `/:id` | JWT | Donations.ViewSummary 또는 본인 레코드 | ID로 고객을 가져옵니다 |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary 또는 본인 레코드 | 고객의 게이트웨이 구독 정보를 가져옵니다 |
| DELETE | `/:id` | JWT | Donations.Edit | 고객을 삭제합니다 |

## Subscriptions

기본 경로: `/giving/subscriptions`

정기 헌금 구독을 관리합니다. 기본 CRUD 경로는 제공되지 않으며 모든 엔드포인트는 사용자 정의입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 구독 목록을 가져옵니다 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 구독을 가져옵니다 |
| POST | `/` | JWT | Donations.Edit 또는 본인 구독 | 결제 게이트웨이의 구독 정보를 업데이트합니다 |
| DELETE | `/:id` | JWT | Donations.Edit 또는 본인 구독 | 구독을 취소하고 데이터베이스에서 제거합니다. 본문: `{ provider, reason }` |

## Subscription Funds

기본 경로: `/giving/subscriptionfunds`

정기 구독의 기금 배분을 추적합니다. 기본 CRUD 경로는 제공되지 않으며 모든 엔드포인트는 사용자 정의입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View 또는 본인 구독 | 구독 기금 목록을 가져옵니다. `?subscriptionId=`로 필터링합니다 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 구독 기금을 가져옵니다 |
| DELETE | `/:id` | JWT | Donations.Edit | 구독 기금을 삭제합니다 |
| DELETE | `/subscription/:id` | JWT | Donations.Edit 또는 본인 구독 | 구독의 모든 기금을 삭제합니다 |

## Payment Methods

기본 경로: `/giving/paymentmethods`

결제 게이트웨이 API를 통해 저장된 결제 수단(카드, 계좌)을 관리합니다. 기본 CRUD 경로는 제공되지 않으며 모든 엔드포인트는 사용자 정의입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View 또는 본인 personId | 특정 인물의 저장된 모든 결제 수단(카드, 계좌)을 가져옵니다 |
| POST | `/addcard` | JWT | — | 카드 결제 수단을 연결합니다. 본문: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit 또는 본인 personId | 카드 정보를 업데이트합니다. 본문: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit 또는 본인 personId | 계좌 연결을 위한 Stripe ACH SetupIntent를 생성합니다. 본문: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | 게스트 헌금을 위한 익명 ACH SetupIntent를 생성합니다. 본문: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit 또는 본인 personId | 토큰을 통해 계좌를 추가합니다(더 이상 사용되지 않음; `ach-setup-intent` 사용 권장). 본문: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit 또는 본인 personId | 계좌 정보를 업데이트합니다. 본문: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit 또는 본인 고객 | 소액 입금으로 계좌를 검증합니다. 본문: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit 또는 본인 고객 | 결제 수단(카드 또는 계좌)을 삭제합니다 |

## Event Log

기본 경로: `/giving/eventLog`

`GenericCrudController`를 확장하여 `getById`, `getAll`, `post`, `delete` CRUD 경로를 제공합니다. 감사 및 중복 제거를 위해 결제 게이트웨이 웹훅 이벤트를 추적합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 이벤트 로그 목록을 가져옵니다 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 이벤트 로그를 가져옵니다 |
| GET | `/type/:type` | JWT | Donations.ViewSummary | 이벤트 유형별로 필터링된 이벤트 로그를 가져옵니다 |
| POST | `/` | JWT | Donations.Edit | 이벤트 로그를 생성하거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Donations.Edit | 이벤트 로그를 삭제합니다 |

## 관련 페이지

- [Membership 엔드포인트](./membership) — 인물, 교회, 그룹, 역할, 권한
- [인증 및 권한](./authentication) — 로그인 흐름, JWT, OAuth, 권한 모델
- [모듈 구조](../module-structure) — 코드 구성 패턴
