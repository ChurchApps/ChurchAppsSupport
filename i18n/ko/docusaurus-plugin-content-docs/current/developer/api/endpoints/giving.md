---
title: "헌금 엔드포인트"
description: "ChurchApps의 Giving API 엔드포인트 참조: 헌금, 배치, 게이트웨이, 정기 헌금, 결제 수단을 다루며, B1 Admin과 연동하는 개발자를 위한 인증 및 권한 규칙을 포함합니다."
---

# 헌금 엔드포인트

<div class="article-intro">

헌금 모듈은 헌금, 펀드, 결제 처리, 구독, 그리고 관련 재무 작업을 관리합니다. 여러 결제 게이트웨이(Stripe, PayPal)를 지원하고, 일회성 및 정기 헌금을 처리하며, 헌금 묶음을 추적하고, 비동기 결제 이벤트를 위한 웹훅 처리를 제공합니다.

</div>

**기본 경로:** `/giving`

## 헌금

기본 경로: `/giving/donations`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.View 또는 본인 personId | 모든 헌금 목록. `?batchId=` 또는 `?personId=`로 필터링. `?personId=`를 쓰면 비공제 펀드로 간 헌금은 (헌금 명세서와 마찬가지로) 제외됨. 다만 Donations.View 권한이 있는 호출자가 `&includeNonDeductible=1`을 추가하면 포함됨. B1Admin의 교인 기록이 이 방식을 씀 |
| GET | `/:id` | JWT | Donations.View | ID로 헌금 가져오기 |
| GET | `/my` | JWT | — | 현재 사용자의 헌금 가져오기 |
| GET | `/my/summary?year=` | JWT | — | 현재 사용자의 연간 헌금 총액(기본값은 올해): `{ year, total, count, currency, isConverted }`. 합계는 교회 통화로 변환됨. 교인 홈 페이지의 헌금 미리 보기를 뒷받침 |
| GET | `/?startDate=&endDate=` | JWT | Donations.View | 범위(양 끝 포함) 안의 날짜에 해당하는 헌금. 두 날짜 모두 `YYYY-MM-DD` 형식으로 필수이며, 없으면 `400`. B1Admin의 헌금 명세서 페이지는 교회의 전체 이력 대신 이 방식으로 한 해의 기간을 요청함 |
| GET | `/summary` | JWT | Donations.ViewSummary | 헌금 요약 가져오기. `?startDate=&endDate=&type=`로 필터링. 교인별 집계는 `type=person` 사용 |
| GET | `/testEmail` | 공개 | — | 테스트 이메일 보내기(개발/디버깅용) |
| POST | `/` | JWT | Donations.Edit 또는 Donations.Enter | 헌금(묶음) 생성 또는 업데이트. Donations.Enter만 있는 경우 대상 묶음과(업데이트라면) 헌금의 현재 묶음이 모두 열려 있어야 하며, 게이트웨이 헌금(`transactionId`가 있는 헌금)은 변경할 수 없음. 그렇지 않으면 `403 { "error": "This batch is closed." }` |
| DELETE | `/:id` | JWT | Donations.Edit 또는 Donations.Enter | 헌금 삭제. Donations.Enter만 있는 경우 헌금이 열린 묶음에 있어야 하며 게이트웨이 헌금이 아니어야 함. 그렇지 않으면 `403` |

### 예시: 묶음별 헌금 목록 가져오기

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

### 예시: 헌금 요약 가져오기

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

## 헌금 묶음 {#donation-batches}

기본 경로: `/giving/donationbatches`

`GenericCrudController`를 확장하며 CRUD 경로인 `getById`, `getAll`, `post`, `delete`를 가집니다. 삭제 작업은 묶음 안의 모든 헌금도 함께 삭제합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.ViewSummary 또는 Donations.Enter | 모든 헌금 묶음 목록 |
| GET | `/:id` | JWT | Donations.ViewSummary 또는 Donations.Enter | ID로 헌금 묶음 가져오기 |
| POST | `/` | JWT | Donations.Edit 또는 Donations.Enter | 헌금 묶음 생성 또는 업데이트. Donations.Enter만 있는 경우 기존 묶음을 업데이트하려면 묶음이 열려 있어야 하며, 그렇지 않으면 `403 { "error": "This batch is closed." }`. 여기서 `status`는 무시되므로, 묶음을 저장해도 다시 열리지 않음 |
| POST | `/:id/close` | JWT | Donations.Edit | 묶음 닫기: `status`를 `closed`로, `closedDate`를 현재 시각으로, `closedBy`를 호출자의 사용자 ID로 설정. 묶음을 반환 |
| POST | `/:id/reopen` | JWT | Donations.Edit | 묶음 다시 열기: `status`를 `open`으로 설정하고 `closedDate`와 `closedBy`를 지움. 묶음을 반환 |
| DELETE | `/:id` | JWT | Donations.Edit | 묶음과 그 안의 모든 헌금 삭제 |

각 묶음에는 `status`(`open` 또는 `closed`. 새 묶음과 기존 묶음은 모두 `open`), `closedDate`, `closedBy`가 포함됩니다. Donations.Edit는 어느 묶음의 헌금이든 바꿀 수 있습니다. Donations.Enter(역할 편집기에서는 **Enter Donations**로 표시됨)는 묶음이 열려 있을 때에만 헌금과 펀드 분할을 추가, 변경, 삭제할 수 있습니다.

## 헌금 처리(Donate)

기본 경로: `/giving/donate`

청구, 구독, 웹훅, 수수료 계산을 포함한 공개 헌금 흐름을 처리합니다. 기본 CRUD 경로는 활성화되어 있지 않으며, 모든 엔드포인트가 사용자 지정입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/gateways/:churchId` | 공개 | — | 교회에서 사용할 수 있는 결제 게이트웨이 가져오기(공개 키만) |
| POST | `/client-token` | JWT | — | 게이트웨이 초기화를 위한 클라이언트 토큰 생성 |
| POST | `/create-order` | JWT | — | 결제 주문 생성(PayPal 방식 결제) |
| POST | `/charge` | JWT | — | 일회성 헌금 청구 처리 |
| POST | `/subscribe` | JWT | — | 정기 헌금 구독 생성 |
| POST | `/log` | 공개 | — | 헌금 기록. 본문: `{ donation, fundData }` |
| POST | `/webhook/:provider` | 공개 | — | 결제 웹훅 이벤트 수신(Stripe, PayPal). `?churchId=` 필요 |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | 날짜 범위의 Stripe 이벤트 다시 실행. 본문: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | 공개 | — | 거래 수수료 계산. 본문: `{ type, provider, gatewayId, amount, currency }`. `?churchId=` 필요 |
| POST | `/captcha-verify` | 공개 | — | reCAPTCHA 토큰 확인. 본문: `{ token, churchId? }`. 사람으로 확인되면 `{ response: "human", pass }`를 반환하며, `pass`는 10분 동안 유효한 서명된 손님 헌금 통과 값임(`churchId`를 보내면 그 교회에만 유효) |

Api가 `CAPTCHA_ENFORCE=true`로 실행되면, 로그인하지 않은 손님의 `/giving/donate/create-order`, `/charge`, `/subscribe`, `/giving/paymentmethods/addcard`, `/giving/paymentmethods/ach-setup-intent-anon` 호출(그리고 금액이 있는 손님의 `POST /content/registrations/register` 호출)은 본문에 해당 `captchaPass`를 포함해야 합니다. 그렇지 않으면 403 `Captcha verification required`를 반환합니다. Stripe 손님 흐름은 두 번(카드 추가, 그다음 청구) 호출하므로, 통과 값은 만료되기 전까지 다시 사용할 수 있습니다. 로그인한 사용자의 호출은 영향을 받지 않습니다. `CAPTCHA_ENFORCE`의 기본값은 `false`이며, `@churchapps/apphelper`의 손님 헌금 양식은 통과 값을 자동으로 보냅니다.

### 예시: 헌금 청구 처리하기

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

### 예시: 정기 구독 만들기

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

기본 경로: `/giving/funds`

`GenericCrudController`를 확장하며 CRUD 경로인 `getById`, `getAll`, `post`, `delete`를 가집니다. `view` 권한은 `null`이므로(펀드를 보는 데 권한이 필요하지 않음) 입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 모든 펀드 목록 |
| GET | `/:id` | JWT | — | ID로 펀드 가져오기 |
| GET | `/churchId/:churchId` | 공개 | — | 특정 교회의 모든 펀드 가져오기(공개) |
| GET | `/public/:churchId/:fundId/total?startDate=&endDate=` | 공개 | — | 펀드의 헌금 합계 가져오기: `{ fundId, totalAmount, donationCount }`. 웹사이트 빌더의 `campaignProgress` 요소를 뒷받침 |
| POST | `/` | JWT | Donations.Edit | 펀드 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Donations.Edit | 펀드 삭제 |

## 펀드별 헌금

기본 경로: `/giving/funddonations`

개별 헌금이 펀드에 어떻게 배분되었는지 추적합니다. 기본 CRUD 경로는 활성화되어 있지 않으며, 모든 엔드포인트가 사용자 지정입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.View | 펀드별 헌금 목록. `?donationId=`, `?personId=`, `?fundId=`, `?fundName=`로 필터링. 선택적으로 `?startDate=&endDate=`를 추가해 날짜로 필터링 |
| GET | `/:id` | JWT | Donations.View | ID로 펀드별 헌금 가져오기 |
| GET | `/my` | JWT | — | 현재 사용자의 펀드별 헌금 가져오기 |
| POST | `/` | JWT | Donations.Edit 또는 Donations.Enter | 펀드별 헌금(묶음) 생성 또는 업데이트. Donations.Enter만 있는 경우 상위 헌금이 열린 묶음에 있어야 하며 게이트웨이 헌금이 아니어야 함. 그렇지 않으면 `403` |
| DELETE | `/:id` | JWT | Donations.Edit 또는 Donations.Enter | 펀드별 헌금 삭제. Donations.Enter에 대해서도 같은 열린 묶음 규칙이 적용됨 |

## 게이트웨이

기본 경로: `/giving/gateways`

결제 게이트웨이 설정(Stripe, PayPal 등)을 관리합니다. 기본 CRUD 경로는 활성화되어 있지 않으며, 모든 엔드포인트가 사용자 지정입니다. 게이트웨이 비밀 값은 저장될 때 암호화됩니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | — | 교회의 모든 게이트웨이 목록 |
| GET | `/:id` | JWT | Settings.Edit | ID로 게이트웨이 가져오기 |
| GET | `/churchId/:churchId` | 공개 | — | 교회의 게이트웨이 가져오기(공개 키만) |
| GET | `/configured/:churchId` | 공개 | — | 교회에 결제 게이트웨이가 설정되어 있는지 확인 |
| POST | `/` | JWT | Settings.Edit | 게이트웨이 생성 또는 업데이트(키를 암호화하고 웹훅과 제품을 준비) |
| PATCH | `/:id` | JWT | Settings.Edit | 게이트웨이 일부 업데이트 |
| DELETE | `/:id` | JWT | Settings.Edit | 게이트웨이 삭제(웹훅도 함께 삭제) |

### 예시: 게이트웨이 설정 확인하기

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

`GenericCrudController`를 확장하며 CRUD 경로인 `getAll`, `delete`를 가집니다. 교인을 결제 게이트웨이의 고객 기록에 연결합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 고객 목록 |
| GET | `/:id` | JWT | Donations.ViewSummary 또는 본인 기록 | ID로 고객 가져오기 |
| GET | `/:id/subscriptions` | JWT | Donations.ViewSummary 또는 본인 기록 | 고객의 게이트웨이 구독 가져오기 |
| DELETE | `/:id` | JWT | Donations.Edit | 고객 삭제 |

## 구독

기본 경로: `/giving/subscriptions`

정기 헌금 구독을 관리합니다. 기본 CRUD 경로는 활성화되어 있지 않으며, 모든 엔드포인트가 사용자 지정입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 구독 목록 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 구독 가져오기 |
| POST | `/` | JWT | Donations.Edit 또는 본인 구독 | 결제 게이트웨이의 구독 업데이트 |
| DELETE | `/:id` | JWT | Donations.Edit 또는 본인 구독 | 구독 취소 및 데이터베이스에서 삭제. 본문: `{ provider, reason }` |

## 구독 펀드

기본 경로: `/giving/subscriptionfunds`

정기 구독의 펀드 배분을 추적합니다. 기본 CRUD 경로는 활성화되어 있지 않으며, 모든 엔드포인트가 사용자 지정입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.View 또는 본인 구독 | 구독 펀드 목록. `?subscriptionId=`로 필터링 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 구독 펀드 가져오기 |
| DELETE | `/:id` | JWT | Donations.Edit | 구독 펀드 삭제 |
| DELETE | `/subscription/:id` | JWT | Donations.Edit 또는 본인 구독 | 구독의 모든 펀드 삭제 |

## 결제 수단

기본 경로: `/giving/paymentmethods`

결제 게이트웨이 API를 통해 저장된 결제 수단(카드, 은행 계좌)을 관리합니다. 기본 CRUD 경로는 활성화되어 있지 않으며, 모든 엔드포인트가 사용자 지정입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/personid/:id` | JWT | Donations.View 또는 본인 personId | 교인의 저장된 모든 결제 수단(카드, 은행 계좌) 가져오기 |
| POST | `/addcard` | JWT | — | 카드 결제 수단 연결. 본문: `{ id, personId, customerId, email, name, churchId, provider }` |
| POST | `/updatecard` | JWT | Donations.Edit 또는 본인 personId | 카드 정보 업데이트. 본문: `{ personId, paymentMethodId, cardData, provider }` |
| POST | `/ach-setup-intent` | JWT | Donations.Edit 또는 본인 personId | 은행 계좌 연결을 위한 Stripe ACH SetupIntent 생성. 본문: `{ personId, customerId, email, name, churchId }` |
| POST | `/ach-setup-intent-anon` | 공개 | — | 손님 헌금을 위한 익명 ACH SetupIntent 생성. 본문: `{ email, name, churchId, gatewayId }` |
| POST | `/addbankaccount` | JWT | Donations.Edit 또는 본인 personId | 토큰으로 은행 계좌 추가(지원 중단됨. `ach-setup-intent` 사용). 본문: `{ id, personId, customerId, email, name }` |
| POST | `/updatebank` | JWT | Donations.Edit 또는 본인 personId | 은행 계좌 정보 업데이트. 본문: `{ paymentMethodId, personId, bankData, customerId }` |
| POST | `/verifybank` | JWT | Donations.Edit 또는 본인 고객 | 소액 입금으로 은행 계좌 확인. 본문: `{ paymentMethodId, customerId, amountData }` |
| DELETE | `/:id/:customerid` | JWT | Donations.Edit 또는 본인 고객 | 결제 수단(카드 또는 은행 계좌) 삭제 |

## 이벤트 로그

기본 경로: `/giving/eventLog`

`GenericCrudController`를 확장하며 CRUD 경로인 `getById`, `getAll`, `post`, `delete`를 가집니다. 감사와 중복 제거를 위해 결제 게이트웨이 웹훅 이벤트를 추적합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------|------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 이벤트 로그 목록 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 이벤트 로그 가져오기 |
| GET | `/type/:type` | JWT | Donations.ViewSummary | 이벤트 유형별로 필터링한 이벤트 로그 가져오기 |
| POST | `/` | JWT | Donations.Edit | 이벤트 로그 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Donations.Edit | 이벤트 로그 삭제 |

## 관련 문서

- [Membership 엔드포인트](./membership.md) — 교인, 교회, 그룹, 역할, 권한
- [인증 및 권한](./authentication.md) — 로그인 흐름, JWT, OAuth, 권한 모델
- [모듈 구조](../module-structure.md) — 코드 구성 패턴
