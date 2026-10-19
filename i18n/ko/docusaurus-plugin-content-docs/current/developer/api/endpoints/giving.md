---
title: "헌금 엔드포인트"
---

# 헌금 엔드포인트

<div class="article-intro">

헌금 모듈은 헌금, 기금, 결제 처리, 구독 및 관련 재무 작업을 관리합니다. 여러 결제 게이트웨이(Stripe, PayPal)를 지원하고, 일회성 및 정기 헌금을 처리하며, 헌금 일괄 처리를 추적하고, 비동기 결제 이벤트에 대한 웹훅 처리를 제공합니다.

</div>

**기본 경로:** `/giving`

## 헌금

기본 경로: `/giving/donations`

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View 또는 본인 personId | 모든 헌금 목록 조회. `?batchId=` 또는 `?personId=`로 필터링. `?personId=`를 사용하면 비공제 기금에 대한 헌금은 (헌금 명세서와 같이) 제외되지만, Donations.View 호출자가 `&includeNonDeductible=1`을 추가하면 포함됨(B1Admin의 사람 레코드가 이를 사용) |
| GET | `/:id` | JWT | Donations.View | ID로 헌금 조회 |
| GET | `/my` | JWT | — | 현재 사용자의 헌금 조회 |
| GET | `/my/summary?year=` | JWT | — | 현재 사용자의 연간 헌금 총액(기본값은 올해): `{ year, total, count, currency, isConverted }`, 총액은 교회 통화로 환산됨. 구성원 홈 페이지의 헌금 미리보기에 사용 |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | 범위(포함) 내 날짜의 헌금 조회. 두 날짜 모두 `YYYY-MM-DD` 형식으로 필수이며, 없으면 `400`. B1Admin의 헌금 명세서 페이지는 교회 전체 기록 대신 이 방식으로 한 달력 연도를 요청함 |
| GET | `/summary` | JWT | Donations.ViewSummary | 헌금 요약 조회. `?startDate=&endDate=&type=`로 필터링. 사람별 내역은 `type=person` 사용 |
| GET | `/testEmail` | 공개 | — | 테스트 이메일 발송(개발/디버깅용) |
| POST | `/` | JWT | Donations.Edit 또는 Donations.Enter | 헌금 생성 또는 업데이트(일괄). Donations.Enter만 있는 경우 대상 일괄 처리와(업데이트의 경우) 헌금의 현재 일괄 처리가 모두 열려 있어야 하며, 게이트웨이 헌금(`transactionId`가 있는 헌금)은 변경할 수 없음. 그렇지 않으면 `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit 또는 Donations.Enter | 헌금 삭제. Donations.Enter만 있는 경우 헌금이 열린 일괄 처리에 있고 게이트웨이 헌금이 아니어야 하며, 그렇지 않으면 `403` |

### 예제: 일괄 처리별 헌금 조회

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

### 예제: 헌금 요약 조회

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

## 헌금 일괄 처리 {#donation-batches}

기본 경로: `/giving/donationbatches`

CRUD 라우트(`getById`, `getAll`, `post`, `delete`)를 가진 `GenericCrudController`를 확장합니다. 삭제 작업은 일괄 처리 내의 모든 헌금도 함께 제거합니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary 또는 Donations.Enter | 모든 헌금 일괄 처리 목록 조회 |
| GET | `/:id` | JWT | Donations.ViewSummary 또는 Donations.Enter | ID로 헌금 일괄 처리 조회 |
| POST | `/` | JWT | Donations.Edit 또는 Donations.Enter | 헌금 일괄 처리 생성 또는 업데이트. Donations.Enter만 있는 경우 기존 일괄 처리를 업데이트하려면 해당 일괄 처리가 열려 있어야 하며, 그렇지 않으면 `403 { "error": "This batch is closed." }`. 여기서 `status`는 무시되므로 일괄 처리를 저장해도 다시 열 수 없음 |
| POST | `/:id/close` | JWT | Donations.Edit | 일괄 처리 마감: `status`를 `closed`로, `closedDate`를 현재 시간으로, `closedBy`를 호출자의 사용자 ID로 설정. 일괄 처리를 반환 |
| POST | `/:id/reopen` | JWT | Donations.Edit | 일괄 처리 재개: `status`를 `open`으로 설정하고 `closedDate`와 `closedBy`를 지움. 일괄 처리를 반환 |
| DELETE | `/:id` | JWT | Donations.Edit | 일괄 처리와 그 안의 모든 헌금 삭제 |

각 일괄 처리에는 `status`(`open` 또는 `closed`; 새로 만든 일괄 처리와 기존 일괄 처리 모두 `open`), `closedDate`, `closedBy`가 포함됩니다. Donations.Edit는 모든 일괄 처리의 헌금을 변경할 수 있으며, Donations.Enter(역할 편집기에서 **헌금 입력**로 표시됨)는 일괄 처리가 열려 있는 동안에만 헌금 및 기금 분배를 추가, 변경 또는 삭제할 수 있습니다.

## 기부

기본 경로: `/giving/donate`

결제, 구독, 웹훅 및 수수료 계산을 포함한 공개 기부 흐름을 처리합니다. 기본 CRUD 라우트는 활성화되어 있지 않으며, 모든 엔드포인트는 사용자 지정입니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | 공개 | — | 교회에서 사용 가능한 결제 게이트웨이 조회(공개 키만) |
| POST | `/client-token` | JWT | — | 게이트웨이 초기화를 위한 클라이언트 토큰 생성 |
| POST | `/create-order` | JWT | — | 결제 주문 생성(PayPal 방식 결제) |
| POST | `/charge` | JWT | — | 일회성 헌금 결제 처리 |
| POST | `/subscribe` | JWT | — | 정기 헌금 구독 생성 |
| POST | `/log` | 공개 | — | 헌금 기록. 본문: `{ donation, fundData }` |
| POST | `/webhook/:provider` | 공개 | — | 결제 웹훅 이벤트 수신(Stripe, PayPal). `?churchId=` 필수 |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | 날짜 범위의 Stripe 이벤트 재생. 본문: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | 공개 | — | 거래 수수료 계산. 본문: `{ type, provider, gatewayId, amount, currency }`. `?churchId=` 필수 |
| POST | `/captcha-verify` | 공개 | — | reCAPTCHA 토큰 확인. 본문: `{ token }` |

### 예제: 헌금 결제 처리

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

### 예제: 정기 구독 생성

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

CRUD 라우트(`getById`, `getAll`, `post`, `delete`)를 가진 `GenericCrudController`를 확장합니다. `view` 권한은 `null`입니다(기금 조회에 권한이 필요하지 않음).

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 기금 목록 조회 |
| GET | `/:id` | JWT | — | ID로 기금 조회 |
| GET | `/churchId/:churchId` | 공개 | — | 특정 교회의 모든 기금 조회(공개) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | 공개 | — | 기금의 헌금 합계 조회: `{ fundId, totalAmount, donationCount }`. 웹사이트 빌더의 `campaignProgress` 요소에 사용됨 |
| POST | `/` | JWT | Donations.Edit | 기금 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Donations.Edit | 기금 삭제 |

## 기금 헌금

기본 경로: `/giving/funddonations`

개별 헌금이 기금별로 어떻게 배분되는지 추적합니다. 기본 CRUD 라우트는 활성화되어 있지 않으며, 모든 엔드포인트는 사용자 지정입니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View | 기금 헌금 목록 조회. `?donationId=`, `?personId=`, `?fundId=` 또는 `?fundName=`로 필터링. 선택적으로 `?startDate=&endDate=`를 추가하여 날짜 필터링 |
| GET | `/:id` | JWT | Donations.View | ID로 기금 헌금 조회 |
| GET | `/my` | JWT | — | 현재 사용자의 기금 헌금 조회 |
| POST | `/` | JWT | Donations.Edit 또는 Donations.Enter | 기금 헌금 생성 또는 업데이트(일괄). Donations.Enter만 있는 경우 상위 헌금이 열린 일괄 처리에 있어야 하며 게이트웨이 헌금이 아니어야 하고, 그렇지 않으면 `403` |
| DELETE | `/:id` | JWT | Donations.Edit 또는 Donations.Enter | 기금 헌금 삭제. Donations.Enter에도 동일한 열린 일괄 처리 규칙 적용 |

## 게이트웨이

기본 경로: `/giving/gateways`

결제 게이트웨이 구성(Stripe, PayPal 등)을 관리합니다. 기본 CRUD 라우트는 활성화되어 있지 않으며, 모든 엔드포인트는 사용자 지정입니다. 게이트웨이 비밀 값은 저장 시 암호화됩니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 교회의 모든 게이트웨이 목록 조회 |
| GET | `/:id` | JWT | Settings.Edit | ID로 게이트웨이 조회 |
| GET | `/churchId/:churchId` | 공개 | — | 교회의 게이트웨이 조회(공개 키만) |
| GET | `/configured/:churchId` | 공개 | — | 교회에 결제 게이트웨이가 구성되어 있는지 확인 |
| POST | `/` | JWT | Settings.Edit | 게이트웨이 생성 또는 업데이트(키 암호화, 웹훅 및 제품 프로비저닝) |
| PATCH | `/:id` | JWT | Settings.Edit | 게이트웨이 부분 업데이트 |
| DELETE | `/:id` | JWT | Settings.Edit | 게이트웨이 삭제(웹훅도 함께 제거) |

### 예제: 게이트웨이 구성 확인

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

CRUD 라우트(`getAll`, `delete`)를 가진 `GenericCrudController`를 확장합니다. 사람을 결제 게이트웨이 고객 레코드에 연결합니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 고객 목록 조회 |
| GET | `/:id` | JWT | Donations.ViewSummary 또는 본인 레코드 | ID로 고객 조회 |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary 또는 본인 레코드 | 고객의 게이트웨이 구독 조회 |
| DELETE | `/:id` | JWT | Donations.Edit | 고객 삭제 |

## 구독

기본 경로: `/giving/subscriptions`

정기 헌금 구독을 관리합니다. 기본 CRUD 라우트는 활성화되어 있지 않으며, 모든 엔드포인트는 사용자 지정입니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 구독 목록 조회 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 구독 조회 |
| POST | `/` | JWT | Donations.Edit 또는 본인 구독 | 결제 게이트웨이의 구독 업데이트 |
| DELETE | `/:id` | JWT | Donations.Edit 또는 본인 구독 | 구독 취소 및 데이터베이스에서 제거. 본문: `{ provider, reason }` |

## 구독 기금

기본 경로: `/giving/subscriptionfunds`

정기 구독의 기금 배분을 추적합니다. 기본 CRUD 라우트는 활성화되어 있지 않으며, 모든 엔드포인트는 사용자 지정입니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View 또는 본인 구독 | 구독 기금 목록 조회. `?subscriptionId=`로 필터링 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 구독 기금 조회 |
| DELETE | `/:id` | JWT | Donations.Edit | 구독 기금 삭제 |
| DELETE | `/subscription/:id` | JWT | Donations.Edit 또는 본인 구독 | 구독의 모든 기금 삭제 |

## 결제 수단

기본 경로: `/giving/paymentmethods`

결제 게이트웨이 API를 통해 저장된 결제 수단(카드, 은행 계좌)을 관리합니다. 기본 CRUD 라우트는 활성화되어 있지 않으며, 모든 엔드포인트는 사용자 지정입니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/personid/:id` | JWT | Donations.View 또는 본인 personId | 사람의 저장된 모든 결제 수단(카드, 은행 계좌) 조회 |
| POST | `/addcard` | JWT | — | 카드 결제 수단 연결. 본문: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit 또는 본인 personId | 카드 정보 업데이트. 본문: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit 또는 본인 personId | 은행 계좌 연결을 위한 Stripe ACH SetupIntent 생성. 본문: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | 공개 | — | 비회원 헌금을 위한 익명 ACH SetupIntent 생성. 본문: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit 또는 본인 personId | 토큰을 통해 은행 계좌 추가(사용 중단됨; `ach-setup-intent` 사용). 본문: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit 또는 본인 personId | 은행 계좌 정보 업데이트. 본문: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit 또는 본인 고객 | 소액 입금으로 은행 계좌 확인. 본문: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit 또는 본인 고객 | 결제 수단(카드 또는 은행 계좌) 삭제 |

## 이벤트 로그

기본 경로: `/giving/eventLog`

CRUD 라우트(`getById`, `getAll`, `post`, `delete`)를 가진 `GenericCrudController`를 확장합니다. 감사 및 중복 제거를 위해 결제 게이트웨이 웹훅 이벤트를 추적합니다.

| Method | Path | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 이벤트 로그 목록 조회 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 이벤트 로그 조회 |
| GET | `/type/:type` | JWT | Donations.ViewSummary | 이벤트 유형으로 필터링한 이벤트 로그 조회 |
| POST | `/` | JWT | Donations.Edit | 이벤트 로그 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Donations.Edit | 이벤트 로그 삭제 |

## 관련 페이지

- [멤버십 엔드포인트](./membership) — 사람, 교회, 그룹, 역할 및 권한
- [인증 및 권한](./authentication) — 로그인 흐름, JWT, OAuth, 권한 모델
- [모듈 구조](../module-structure) — 코드 구성 패턴
