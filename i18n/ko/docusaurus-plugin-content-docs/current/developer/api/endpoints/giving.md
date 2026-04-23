---
title: "헌금 엔드포인트"
---

# 헌금 엔드포인트

<div class="article-intro">

헌금 모듈은 기부금, 펀드, 결제 처리, 구독, 관련 재정 작업을 관리합니다. 여러 결제 게이트웨이(Stripe, PayPal)를 지원하고, 일회 및 반복 기부금을 처리하며, 기부금 배치를 추적하고, 비동기 결제 이벤트를 위한 웹훅 처리를 제공합니다.

</div>

**기본 경로:** `/giving`

## 기부금

기본 경로: `/giving/donations`

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.View or own personId | 모든 기부금 나열. `?batchId=` 또는 `?personId=`로 필터링 |
| GET | `/:id` | JWT | Donations.View | ID로 기부금 가져오기 |
| GET | `/my` | JWT | — | 현재 사용자의 기부금 가져오기 |
| GET | `/summary` | JWT | Donations.ViewSummary | 기부금 요약 가져오기. `?startDate=&endDate=&type=`로 필터링. `type=person`을 사용하여 사람별 분석 |
| GET | `/testEmail` | Public | — | 테스트 이메일 전송 (개발/디버깅) |
| POST | `/` | JWT | Donations.Edit | 기부금 생성 또는 업데이트 (배치) |
| DELETE | `/:id` | JWT | Donations.Edit | 기부금 삭제 |

### 예: 배치별 기부금 나열

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

### 예: 기부금 요약 가져오기

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

## 기부금 배치

기본 경로: `/giving/donationbatches`

`GenericCrudController`를 확장하며 CRUD 경로: `getById`, `getAll`, `post`, `delete` 제공. 삭제 작업은 배치 내의 모든 기부금도 제거합니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | Donations.ViewSummary | 모든 기부금 배치 나열 |
| GET | `/:id` | JWT | Donations.ViewSummary | ID로 기부금 배치 가져오기 |
| POST | `/` | JWT | Donations.Edit | 기부금 배치 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Donations.Edit | 배치 및 모든 기부금 삭제 |

## 기부하기

기본 경로: `/giving/donate`

public 기부 흐름을 포함한 요금, 구독, 웹훅을 처리합니다. 기본 CRUD 경로는 활성화되지 않음; 모든 엔드포인트는 커스텀입니다.

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/gateways/:churchId` | Public | — | 교회의 사용 가능한 결제 게이트웨이 가져오기 (public 키만) |
| POST | `/client-token` | JWT | — | 게이트웨이 초기화를 위한 클라이언트 토큰 생성 |
| POST | `/create-order` | JWT | — | 결제 주문 생성 (PayPal 스타일 체크아웃) |
| POST | `/charge` | JWT | — | 일회 기부 결제 처리 |
| POST | `/subscribe` | JWT | — | 반복 기부 구독 생성 |
| POST | `/log` | Public | — | 기부금 로그. 본문: `{ donation, fundData }` |
| POST | `/webhook/:provider` | Public | — | 결제 웹훅 이벤트 수신 (Stripe, PayPal). `?churchId=` 필요 |
| POST | `/replay-stripe-events` | JWT | Donations.Edit | 날짜 범위의 Stripe 이벤트 재실행. 본문: `{ startDate, endDate, dryRun }` |
| POST | `/fee` | Public | — | 거래 수수료 계산. 본문: `{ type, provider, gatewayId, amount, currency }`. `?churchId=` 필요 |
| POST | `/captcha-verify` | Public | — | reCAPTCHA 토큰 검증. 본문: `{ token }` |

### 예: 기부 요금 처리

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

## 펀드

기본 경로: `/giving/funds`

`GenericCrudController`를 확장하며 CRUD 경로 제공: `getById`, `getAll`, `post`, `delete`. `view` 권한은 `null` (펀드 보기에 권한 필요 없음).

| 메서드 | 경로 | 인증 | 권한 | 설명 |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | 모든 펀드 나열 |
| GET | `/:id` | JWT | — | ID로 펀드 가져오기 |
| GET | `/churchId/:churchId` | Public | — | 특정 교회의 모든 펀드 가져오기 (public) |
| POST | `/` | JWT | Donations.Edit | 펀드 생성 또는 업데이트 |
| DELETE | `/:id` | JWT | Donations.Edit | 펀드 삭제 |

## 관련 페이지

- [회원 엔드포인트](./membership) — 사람, 교회, 그룹, 역할, 권한
- [인증 및 권한](./authentication) — 로그인 흐름, JWT, OAuth, 권한 모델
- [모듈 구조](../module-structure) — 코드 구성 패턴
