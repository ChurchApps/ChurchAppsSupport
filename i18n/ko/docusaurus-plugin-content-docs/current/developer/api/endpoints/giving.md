---
title: "Giving 엔드포인트"
---

# Giving 엔드포인트

<div class="article-intro">

Giving 모듈은 헌금, 기금, 결제 처리, 구독 및 관련 재무 작업을 관리합니다. 여러 결제 게이트웨이(Stripe, PayPal)를 지원하며, 일회성 및 정기 헌금을 처리하고, 헌금 배치를 추적하며, 비동기 결제 이벤트를 위한 webhook 처리를 제공합니다.

</div>

**기본 경로:** `/giving`

## 헌금

기본 경로: `/giving/donations`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.View 또는 본인 personId | 모든 헌금 나열. `?batchId=` 또는 `?personId=`로 필터링. `?personId=`를 사용하면 비과세 기금에 대한 헌금은 (헌금 명세서와 마찬가지로) 제외되며, 단 Donations.View 권한이 있는 호출자가 `&includeNonDeductible=1`을 추가하면 포함됨(B1Admin의 사람 기록이 이 방식을 사용) |
| GET | `/:id` | JWT | Donations.View | ID로 헌금 조회 |
| GET | `/my` | JWT | — | 현재 사용자의 헌금 조회 |
| GET | `/my/summary?year=` | JWT | — | 현재 사용자의 연간 헌금 합계(기본값은 올해): `{ year, total, count, currency, isConverted }`, 합계는 교회 통화로 환산됨. 회원 홈 화면의 헌금 미리보기를 지원 |
| GET | `/summary` | JWT | Donations.ViewSummary | 헌금 요약 조회. `?startDate=&endDate=&type=`로 필터링. 사람별 내역은 `type=person` 사용 |
| GET | `/testEmail` | 공개 | — | 테스트 이메일 발송(개발/디버깅용) |
| POST | `/` | JWT | Donations.Edit | 헌금 생성 또는 업데이트(배치) |
| DELETE | `/:id` | JWT | Donations.Edit | 헌금 삭제 |

### 예시: 배치별 헌금 나열

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

기본 경로: `/giving/donationbatches`

`getById`, `getAll`, `post`, `delete` CRUD 라우트를 가진 `GenericCrudController`를 확장합니다. 삭제 작업은 배치 안의 모든 헌금도 함께 삭제합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 헌금 배치 나열 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 헌금 배치 조회 |
| POST | `/` | JWT | Donations.Edit | 헌금 배치 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Donations.Edit | 배치와 그 안의 모든 헌금 삭제 |

## 헌금 (Donate)

기본 경로: `/giving/donate`

청구, 구독, webhook, 수수료 계산을 포함한 공개 헌금 흐름을 처리합니다. 기본 CRUD 라우트는 활성화되어 있지 않으며, 모든 엔드포인트가 사용자 정의입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/gateways/:churchId` | 공개 | — | 교회의 사용 가능한 결제 게이트웨이 조회(공개 키만) |
| POST | `/client-token` | JWT | — | 게이트웨이 초기화를 위한 클라이언트 토큰 생성 |
| POST | `/create-order` | JWT | — | 결제 주문 생성(PayPal 방식 결제) |
| POST | `/charge` | JWT | — | 일회성 헌금 청구 처리 |
| POST | `/subscribe` | JWT | — | 정기 헌금 구독 생성 |
| POST | `/log` | 공개 | — | 헌금 기록. 본문: `{ donation, fundData }` |
| POST | `/webhook/:provider` | 공개 | — | 결제 webhook 이벤트 수신(Stripe, PayPal). `?churchId=` 필요 |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | 날짜 범위의 Stripe 이벤트 재생. 본문: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | 공개 | — | 거래 수수료 계산. 본문: `{ type, provider, gatewayId, amount, currency }`. `?churchId=` 필요 |
| POST | `/captcha-verify` | 공개 | — | reCAPTCHA 토큰 검증. 본문: `{ token }` |

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

## 기금

기본 경로: `/giving/funds`

`getById`, `getAll`, `post`, `delete` CRUD 라우트를 가진 `GenericCrudController`를 확장합니다. `view` 권한은 `null`입니다(기금 조회에 권한이 필요하지 않음).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 모든 기금 나열 |
| GET | `/:id` | JWT | — | ID로 기금 조회 |
| GET | `/churchId/:churchId` | 공개 | — | 특정 교회의 모든 기금 조회(공개) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | 공개 | — | 기금의 헌금 합계 조회: `{ fundId, totalAmount, donationCount }`. 웹사이트 빌더의 `campaignProgress` 요소를 지원 |
| POST | `/` | JWT | Donations.Edit | 기금 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Donations.Edit | 기금 삭제 |

## 기금별 헌금

기본 경로: `/giving/funddonations`

개별 헌금이 기금별로 어떻게 배분되는지 추적합니다. 기본 CRUD 라우트는 활성화되어 있지 않으며, 모든 엔드포인트가 사용자 정의입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.View | 기금별 헌금 나열. `?donationId=`, `?personId=`, `?fundId=`, `?fundName=`으로 필터링. 날짜 필터링을 위해 `?startDate=&endDate=`를 선택적으로 추가 가능 |
| GET | `/:id` | JWT | Donations.View | ID로 기금별 헌금 조회 |
| GET | `/my` | JWT | — | 현재 사용자의 기금별 헌금 조회 |
| POST | `/` | JWT | Donations.Edit | 기금별 헌금 생성 또는 업데이트(배치) |
| DELETE | `/:id` | JWT | Donations.Edit | 기금별 헌금 삭제 |

## 게이트웨이

기본 경로: `/giving/gateways`

결제 게이트웨이 설정(Stripe, PayPal 등)을 관리합니다. 기본 CRUD 라우트는 활성화되어 있지 않으며, 모든 엔드포인트가 사용자 정의입니다. 게이트웨이의 비밀 값은 저장 시 암호화됩니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 교회의 모든 게이트웨이 나열 |
| GET | `/:id` | JWT | Settings.Edit | ID로 게이트웨이 조회 |
| GET | `/churchId/:churchId` | 공개 | — | 교회의 게이트웨이 조회(공개 키만) |
| GET | `/configured/:churchId` | 공개 | — | 교회에 결제 게이트웨이가 설정되어 있는지 확인 |
| POST | `/` | JWT | Settings.Edit | 게이트웨이 생성 또는 업데이트(키 암호화, webhook 및 제품 프로비저닝) |
| PATCH | `/:id` | JWT | Settings.Edit | 게이트웨이 부분 업데이트 |
| DELETE | `/:id` | JWT | Settings.Edit | 게이트웨이 삭제(그 webhook도 함께 삭제) |

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

기본 경로: `/giving/customers`

`getAll`, `delete` CRUD 라우트를 가진 `GenericCrudController`를 확장합니다. 사람을 결제 게이트웨이의 고객 기록과 연결합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 고객 나열 |
| GET | `/:id` | JWT | Donations.ViewSummary 또는 본인 기록 | ID로 고객 조회 |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary 또는 본인 기록 | 고객의 게이트웨이 구독 조회 |
| DELETE | `/:id` | JWT | Donations.Edit | 고객 삭제 |

## 구독

기본 경로: `/giving/subscriptions`

정기 헌금 구독을 관리합니다. 기본 CRUD 라우트는 활성화되어 있지 않으며, 모든 엔드포인트가 사용자 정의입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 구독 나열 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 구독 조회 |
| POST | `/` | JWT | Donations.Edit 또는 본인 구독 | 결제 게이트웨이를 통해 구독 업데이트 |
| DELETE | `/:id` | JWT | Donations.Edit 또는 본인 구독 | 구독 취소 및 데이터베이스에서 삭제. 본문: `{ provider, reason }` |

## 구독 기금

기본 경로: `/giving/subscriptionfunds`

정기 구독의 기금 배분을 추적합니다. 기본 CRUD 라우트는 활성화되어 있지 않으며, 모든 엔드포인트가 사용자 정의입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.View 또는 본인 구독 | 구독 기금 나열. `?subscriptionId=`로 필터링 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 구독 기금 조회 |
| DELETE | `/:id` | JWT | Donations.Edit | 구독 기금 삭제 |
| DELETE | `/subscription/:id` | JWT | Donations.Edit 또는 본인 구독 | 구독의 모든 기금 삭제 |

## 결제 수단

기본 경로: `/giving/paymentmethods`

결제 게이트웨이 API를 통해 저장된 결제 수단(카드, 은행 계좌)을 관리합니다. 기본 CRUD 라우트는 활성화되어 있지 않으며, 모든 엔드포인트가 사용자 정의입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/personid/:id` | JWT | Donations.View 또는 본인 personId | 사람의 저장된 모든 결제 수단(카드, 은행 계좌) 조회 |
| POST | `/addcard` | JWT | — | 카드 결제 수단 연결. 본문: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit 또는 본인 personId | 카드 정보 업데이트. 본문: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit 또는 본인 personId | 은행 계좌 연결을 위한 Stripe ACH SetupIntent 생성. 본문: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | 공개 | — | 손님 헌금을 위한 익명 ACH SetupIntent 생성. 본문: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit 또는 본인 personId | 토큰으로 은행 계좌 추가(지원 중단됨. `ach-setup-intent` 사용). 본문: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit 또는 본인 personId | 은행 계좌 정보 업데이트. 본문: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit 또는 본인 고객 | 소액 입금으로 은행 계좌 인증. 본문: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit 또는 본인 고객 | 결제 수단(카드 또는 은행 계좌) 삭제 |

## 이벤트 로그

기본 경로: `/giving/eventLog`

`getById`, `getAll`, `post`, `delete` CRUD 라우트를 가진 `GenericCrudController`를 확장합니다. 감사 및 중복 제거를 위해 결제 게이트웨이 webhook 이벤트를 추적합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 이벤트 로그 나열 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 이벤트 로그 조회 |
| GET | `/type/:type` | JWT | Donations.ViewSummary | 이벤트 유형별 이벤트 로그 조회 |
| POST | `/` | JWT | Donations.Edit | 이벤트 로그 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Donations.Edit | 이벤트 로그 삭제 |

## 관련 페이지

- [Membership 엔드포인트](./membership) — 사람, 교회, 그룹, 역할, 권한
- [인증 및 권한](./authentication) — 로그인 흐름, JWT, OAuth, 권한 모델
- [모듈 구조](../module-structure) — 코드 구성 패턴
