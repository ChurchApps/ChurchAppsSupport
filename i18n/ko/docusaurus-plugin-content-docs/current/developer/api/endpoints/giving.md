---
title: "기부 엔드포인트"
---

# 기부 엔드포인트

<div class="article-intro">

기부 모듈은 기부금, 기금, 결제 처리, 구독 및 관련 금융 운영을 관리합니다. 여러 결제 게이트웨이(Stripe, PayPal)를 지원하고, 일회성 및 반복 기부금을 처리하고, 기부금 일괄 처리를 추적하고, 비동기 결제 이벤트에 대한 웹훅 처리를 제공합니다.

</div>

**기본 경로:** `/giving`

## 기부금

기본 경로: `/giving/donations`

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View 또는 자신의 personId | 모든 기부금을 나열합니다. `?batchId=` 또는 `?personId=`로 필터링 |
| GET | `/:id` | JWT | Donations.View | ID로 기부금을 가져옵니다 |
| GET | `/my` | JWT | — | 현재 사용자의 기부금을 가져옵니다 |
| GET | `/summary` | JWT | Donations.ViewSummary | 기부금 요약을 가져옵니다. `?startDate=&endDate=&type=`로 필터링합니다. 인당 분석은 `type=person`을 사용합니다 |
| GET | `/testEmail` | Public | — | 테스트 이메일을 보냅니다(개발/디버깅) |
| POST | `/` | JWT | Donations.Edit | 기부금을 만들거나 업데이트합니다(일괄) |
| DELETE | `/:id` | JWT | Donations.Edit | 기부금을 삭제합니다 |

### 예: 일괄 처리별 기부금 나열

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

### 예: 기부금 요약 얻기

```
GET /giving/donations/summary?startDate=2025-01-01&endDate=2025-12-31
Authorization: Bearer <token>
```

```json
[
  {
    "week": "2025-01-06",
    "fund": "일반 기금",
    "totalAmount": 2500.00,
    "count": 15
  }
]
```

## 기부금 일괄 처리

기본 경로: `/giving/donationbatches`

`GenericCrudController`를 CRUD 경로로 확장합니다: `getById`, `getAll`, `post`, `delete`. 삭제 작업은 또한 일괄 처리 내의 모든 기부금을 제거합니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 기부금 일괄 처리를 나열합니다 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 기부금 일괄 처리를 가져옵니다 |
| POST | `/` | JWT | Donations.Edit | 기부금 일괄 처리를 만들거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Donations.Edit | 일괄 처리 및 모든 기부금을 삭제합니다 |

## 기부

기본 경로: `/giving/donate`

공개 기부 흐름(청구, 구독, 웹훅 및 수수료 계산)을 처리합니다. 기본 CRUD 경로는 활성화되지 않습니다. 모든 끝점은 사용자 정의됩니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | 교회의 사용 가능한 결제 게이트웨이를 가져옵니다(공개 키만) |
| POST | `/client-token` | JWT | — | 게이트웨이 초기화를 위한 클라이언트 토큰을 생성합니다 |
| POST | `/create-order` | JWT | — | 결제 주문을 만듭니다(PayPal 스타일 결제) |
| POST | `/charge` | JWT | — | 일회성 기부금 청구를 처리합니다 |
| POST | `/subscribe` | JWT | — | 반복 기부금 구독을 만듭니다 |
| POST | `/log` | Public | — | 기부금을 로그합니다. 본문: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | 결제 웹훅 이벤트를 받습니다(Stripe, PayPal). `?churchId=` 필요 |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | 날짜 범위에 대한 Stripe 이벤트를 재생합니다. 본문: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | 거래 수수료를 계산합니다. 본문: `{ type, provider, gatewayId, amount, currency }`. `?churchId=` 필요 |
| POST | `/captcha-verify` | Public | — | reCAPTCHA 토큰을 확인합니다. 본문: `{ token }` |

### 예: 기부금 청구 처리

```
POST /giving/donate/charge
Authorization: Bearer <token>

{
  "provider": "stripe",
  "amount": 50.00,
  "currency": "usd",
  "person": { "id": "per-123", "email": "donor@example.com" },
  "funds": [{ "id": "fund-001", "name": "일반 기금", "amount": 50.00 }],
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

### 예: 반복 구독 만들기

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
  "funds": [{ "id": "fund-001", "name": "일반 기금", "amount": 100.00 }],
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

## 기금

기본 경로: `/giving/funds`

`GenericCrudController`를 CRUD 경로로 확장합니다: `getById`, `getAll`, `post`, `delete`. `view` 권한은 `null`입니다(기금 보기를 위한 권한 필요 없음).

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 기금을 나열합니다 |
| GET | `/:id` | JWT | — | ID로 기금을 가져옵니다 |
| GET | `/churchId/:churchId` | Public | — | 특정 교회의 모든 기금을 가져옵니다(공개) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | Public | — | 기금의 기부금 총액을 가져옵니다: `{ fundId, totalAmount, donationCount }`. 웹사이트 빌더의 `campaignProgress` 요소를 강화합니다 |
| POST | `/` | JWT | Donations.Edit | 기금을 만들거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Donations.Edit | 기금을 삭제합니다 |

## 기금 기부금

기본 경로: `/giving/funddonations`

개별 기부금이 기금에 할당되는 방식을 추적합니다. 기본 CRUD 경로는 활성화되지 않습니다. 모든 끝점은 사용자 정의됩니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | 기금 기부금을 나열합니다. `?donationId=`, `?personId=`, `?fundId=` 또는 `?fundName=`으로 필터링합니다. 선택적으로 `?startDate=&endDate=`를 추가하여 날짜 필터링 |
| GET | `/:id` | JWT | Donations.View | ID로 기금 기부금을 가져옵니다 |
| GET | `/my` | JWT | — | 현재 사용자의 기금 기부금을 가져옵니다 |
| POST | `/` | JWT | Donations.Edit | 기금 기부금을 만들거나 업데이트합니다(일괄) |
| DELETE | `/:id` | JWT | Donations.Edit | 기금 기부금을 삭제합니다 |

## 게이트웨이

기본 경로: `/giving/gateways`

결제 게이트웨이 구성(Stripe, PayPal 등)을 관리합니다. 기본 CRUD 경로는 활성화되지 않습니다. 모든 끝점은 사용자 정의됩니다. 게이트웨이 암호는 미사용 상태로 암호화됩니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 교회의 모든 게이트웨이를 나열합니다 |
| GET | `/:id` | JWT | Settings.Edit | ID로 게이트웨이를 가져옵니다 |
| GET | `/churchId/:churchId` | Public | — | 교회의 게이트웨이를 가져옵니다(공개 키만) |
| GET | `/configured/:churchId` | Public | — | 교회에 구성된 결제 게이트웨이가 있는지 확인합니다 |
| POST | `/` | JWT | Settings.Edit | 게이트웨이를 만들거나 업데이트합니다(키를 암호화하고 웹훅 및 제품을 제공합니다) |
| PATCH | `/:id` | JWT | Settings.Edit | 게이트웨이를 부분적으로 업데이트합니다 |
| DELETE | `/:id` | JWT | Settings.Edit | 게이트웨이를 삭제합니다(또한 웹훅을 제거합니다) |

### 예: 게이트웨이 구성 확인

```
GET /giving/gateways/configured/church-123
```

```json
{
  "configured": true
}
```

## 고객

기본 경로: `/giving/customers`

`GenericCrudController`를 CRUD 경로로 확장합니다: `getAll`, `delete`. 사람을 결제 게이트웨이 고객 기록에 연결합니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 고객을 나열합니다 |
| GET | `/:id` | JWT | Donations.ViewSummary 또는 자신의 기록 | ID로 고객을 가져옵니다 |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary 또는 자신의 기록 | 고객의 게이트웨이 구독을 가져옵니다 |
| DELETE | `/:id` | JWT | Donations.Edit | 고객을 삭제합니다 |

## 구독

기본 경로: `/giving/subscriptions`

반복 기부금 구독을 관리합니다. 기본 CRUD 경로는 활성화되지 않습니다. 모든 끝점은 사용자 정의됩니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 구독을 나열합니다 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 구독을 가져옵니다 |
| POST | `/` | JWT | Donations.Edit 또는 자신의 구독 | 결제 게이트웨이로 구독을 업데이트합니다 |
| DELETE | `/:id` | JWT | Donations.Edit 또는 자신의 구독 | 구독을 취소하고 데이터베이스에서 제거합니다. 본문: `{ provider, reason }` |

## 구독 기금

기본 경로: `/giving/subscriptionfunds`

반복 구독에 대한 기금 할당을 추적합니다. 기본 CRUD 경로는 활성화되지 않습니다. 모든 끝점은 사용자 정의됩니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View 또는 자신의 구독 | 구독 기금을 나열합니다. `?subscriptionId=`으로 필터링 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 구독 기금을 가져옵니다 |
| DELETE | `/:id` | JWT | Donations.Edit | 구독 기금을 삭제합니다 |
| DELETE | `/subscription/:id` | JWT | Donations.Edit 또는 자신의 구독 | 구독의 모든 기금을 삭제합니다 |

## 결제 방법

기본 경로: `/giving/paymentmethods`

결제 게이트웨이 API를 통해 저장된 결제 방법(카드, 은행 계좌)을 관리합니다. 기본 CRUD 경로는 활성화되지 않습니다. 모든 끝점은 사용자 정의됩니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View 또는 자신의 personId | 사람의 모든 저장된 결제 방법을 가져옵니다(카드, 은행 계좌) |
| POST | `/addcard` | JWT | — | 카드 결제 방법을 첨부합니다. 본문: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit 또는 자신의 personId | 카드 세부 정보를 업데이트합니다. 본문: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit 또는 자신의 personId | 은행 계좌 연결을 위한 Stripe ACH SetupIntent를 만듭니다. 본문: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | Public | — | 손님 기부를 위한 익명 ACH SetupIntent를 만듭니다. 본문: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit 또는 자신의 personId | 토큰을 통해 은행 계좌를 추가합니다(더 이상 사용 안 함; `ach-setup-intent` 사용). 본문: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit 또는 자신의 personId | 은행 계좌 세부 정보를 업데이트합니다. 본문: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit 또는 자신의 고객 | 마이크로 예금으로 은행 계좌를 확인합니다. 본문: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit 또는 자신의 고객 | 결제 방법(카드 또는 은행 계좌)을 삭제합니다 |

## 이벤트 로그

기본 경로: `/giving/eventLog`

`GenericCrudController`를 CRUD 경로로 확장합니다: `getById`, `getAll`, `post`, `delete`. 감사 및 중복 제거를 위해 결제 게이트웨이 웹훅 이벤트를 추적합니다.

| 방법 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 이벤트 로그를 나열합니다 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 이벤트 로그를 가져옵니다 |
| GET | `/type/:type` | JWT | Donations.ViewSummary | 이벤트 유형별로 필터링된 이벤트 로그를 가져옵니다 |
| POST | `/` | JWT | Donations.Edit | 이벤트 로그를 만들거나 업데이트합니다 |
| DELETE | `/:id` | JWT | Donations.Edit | 이벤트 로그를 삭제합니다 |

## 관련 페이지

- [멤버십 엔드포인트](./membership) — 사람, 교회, 그룹, 역할 및 권한
- [인증 & 권한](./authentication) -- 로그인 흐름, JWT, OAuth, 권한 모델
- [모듈 구조](../module-structure) -- 코드 구성 패턴
