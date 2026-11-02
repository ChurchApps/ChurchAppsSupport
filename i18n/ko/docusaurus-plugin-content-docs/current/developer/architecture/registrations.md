---
title: "행사 등록"
---

# 행사 등록

<div class="article-intro">

기본 행사 등록은 content 모듈에 있으며, 유료 등록 작업 이후로는 완전한 상거래 모델을 갖추고 있습니다. 가격이 매겨진 참가자 유형, 가격이 매겨진 추가 선택 항목, 할인 코드, 교회의 기존 헌금 게이트웨이를 통한 결제, 상태 기반 대기자 명단이 포함됩니다. 결제 경로는 의도적으로 헌금 스택을 재사용합니다. 등록 컨트롤러는 [헌금](./giving)에 문서화된 것과 같은 `GatewayService` / `IGatewayProvider` 추상화를 통해 결제하므로, content 모듈에는 카드 데이터나 게이트웨이 SDK 지식이 없습니다. 이 페이지는 데이터 모델, 가격 및 정원 규칙, 등록, 결제, 대기자 명단 흐름을 정리합니다.

</div>

## 개요

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (교인 포털)             │            │ Api — content 모듈                           │
│  등록 마법사 ·                │   HTTPS    │  RegistrationController                     │
│  내 등록 내역                │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (서버 가격 계산)  │
│ B1Admin (직원)               │            │  RegistrationHelper (이메일)                 │
│  행사 등록 설정 ·            │            └───────────────┬─────────────────────────────┘
│  명단 · CSV 내보내기          │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ 공유 게이트웨이 추상화 (헌금)                 │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

스택 전체에 걸쳐 세 가지 규칙이 적용됩니다.

1. **가격은 서버가 결정합니다.** 클라이언트는 유형 ID, 선택 항목 ID, 수량을 제출합니다. `RegistrationPricingHelper.computeTotal()`이 서버에서 총액을 계산하고, 쿠폰은 결제 시점에 다시 검증됩니다. 클라이언트가 보낸 금액은 절대 신뢰하지 않습니다.
2. **정원은 삽입 시점에 원자적으로 강제됩니다.** 정원이 있는 모든 삽입은 `INSERT … SELECT … FROM dual WHERE (활성 행 수) < 정원` 문을 사용하므로, 동시에 들어온 두 등록이 마지막 자리를 함께 차지할 수 없습니다. 인원 수는 저장하지 않고 상태(`pending`/`confirmed`)에서 계산합니다.
3. **결제는 헌금 경로를 그대로 탑니다.** `RegistrationController`는 교회에 설정된 게이트웨이로 공유 `GatewayService.processCharge`를 호출합니다. 헌금과 같은 제공자 추상화, 토큰화 모델, SCA 처리를 사용합니다.

## 데이터 모델 (`Api/src/modules/content`)

모델은 `models/Registration.ts`에, 테이블 매핑은 `db/DatabaseTypes.ts`에 있으며, 테이블마다 하나의 리포지토리가 `repositories/` 아래에 있습니다.

| 테이블 | 의미 | 주요 필드 |
|-------|---------|-----------|
| `registrations` | 등록 1건(한 행사에 대한 한 가구 또는 한 일행) | eventId, personId, householdId, **status**(`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | 등록 1건에 포함된 참가자 1명 | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | 행사별 참가자 유형(예: 성인 / 어린이) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | 가격이 있는 추가 선택 옵션(예: 티셔츠) | eventId, name, description, **price**, **capacity**, **maxQuantity**(등록당 상한), sort, active |
| `registrationSelectionChoices` | 등록 또는 참가자가 고른 선택 항목의 수량 | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | 등록 1건에 대한 성공한 결제 1건 | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind(`charge`), status(`succeeded`), personId |
| `registrationCoupons` | 행사별 할인 코드 | eventId, code, **discountType**(`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

참고 사항:

- **대기자 명단 테이블은 없습니다.** 대기 중인 일행은 `status = 'waitlisted'`인 `registrations` 행입니다. 대기자 명단의 전체 수명 주기는 이 한 테이블의 상태 전환입니다.
- **저장된 카운터는 없습니다.** "판매된" 수, "사용된" 수(행사 정원, 유형별 정원, 선택 항목별 정원, 쿠폰 사용 횟수)는 상태가 `('pending','confirmed')`인 행에 대한 상관 서브쿼리로 계산합니다(`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). 따라서 등록을 취소하면 별도의 장부 작업 없이 정원이 복구됩니다.
- 가격은 MySQL DECIMAL 열(전송 시 문자열)이며, 가격 계산 헬퍼 안에서 `Number()`로 변환합니다.

## REST 인터페이스

모든 기능은 `/content/registrations`(`controllers/RegistrationController.ts`) 아래에 있으며, `Permissions.registrations`(`view` / `edit`)로 접근을 제한합니다.

| 경로 | 접근 | 목적 |
|-------|--------|---------|
| `POST /register` | 익명 | 전체 제출: 손님, 교인, 또는 직원의 참가자 추가. 서버 가격 계산, 정원 확인, 선택적 결제 |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | 공개 | 마법사에서 사용하는 유형/선택 항목과 계산된 `used` / `remainingCapacity` |
| `POST /types`, `DELETE /types/:id` (`/selections`, `/coupons`도 동일) | `registrations.edit` | 직원용 설정 CRUD |
| `POST /coupons/validate` | 공개 | 마법사 중 할인 코드 즉시 검증 |
| `GET /coupons/event/:eventId` | 직원 | 사용 횟수가 포함된 쿠폰 |
| `GET /event/:eventId` · `GET /event/:eventId/count` | 직원 · 공개 | 명단. 정원 표시를 위한 활성 인원 수 |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | 인증 사용자 | 내 등록 내역, 상세 정보, 결제 내역 |
| `PUT /:id` | 소유자/직원 | 제출 후 수정. 새로운 원자적 정원 확인과 함께 참가자와 선택 항목을 교체하고 `totalAmount`를 다시 계산함. 자동으로 결제하거나 환불하지 않음 |
| `POST /:id/pay` | 소유자 | "결제 완료": `totalAmount − amountPaid`를 결제하고, `waitlisted`/`pending` → `confirmed`로 변경 |
| `POST /:id/promote` | 직원 | 대기자 명단에서 수동 승격 |
| `POST /:id/cancel` · `DELETE /:id` | 소유자 · 직원 | 취소 / 삭제. 둘 다 대기자 명단 자동 승격을 실행 |

같은 행사에 같은 `personId`로 이미 취소되지 않은 등록이 있으면 409로 거부되며, 등록이 생성될 때마다 `WebhookDispatcher`를 통해 `registration.created` 웹훅이 발송됩니다.

## 가격 및 할인 코드

`helpers/RegistrationPricingHelper.ts`가 금액 계산의 유일한 기준입니다.

- `computeTotal()`은 각 참가자의 유형 가격과 각 선택 항목의 `가격 × 수량`을 더합니다.
- `validateCoupon()`은 활성 여부, 날짜 범위(`startDate`/`endDate`), 제출된 일행 인원에 대한 `minMembers`, 상태에서 계산된 사용 횟수에 대한 `maxUses`를 확인합니다.
- `applyDiscount()` -- `percent`는 `total × value/100`을 빼고, `amount`는 `value`를 뺍니다. 두 경우 모두 결과는 0 미만으로 내려가지 않습니다.

마법사는 즉시 피드백을 주기 위해 `POST /coupons/validate`를 호출하지만, `register`는 서버에서 쿠폰을 다시 검증하고 다시 적용합니다. 클라이언트에 표시된 총액은 참고용일 뿐입니다.

## 원자적 정원 처리 방식

정원이 있는 모든 삽입은 트랜잭션이나 잠금 없이 안전하게 경쟁을 처리합니다. 정원 확인을 `INSERT` 자체의 일부로 만들기 때문입니다. 행사 수준(`RegistrationRepo.atomicInsertWithCapacityCheck`)은 다음과 같습니다.

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

영향받은 행이 0개이면 "정원 초과"를 뜻합니다. 같은 방식으로 유형별 삽입(`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, 활성 등록과 조인된 참가자 수를 셈)과 선택 항목별 수량(`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, `COALESCE(SUM(quantity),0) + ? <= capacity` 사용)도 보호합니다. 등록 도중 참가자나 선택 항목 삽입 중 하나라도 실패하면, 컨트롤러는 `deleteCascade()`로 부분 등록을 되돌리고 어떤 유형이나 선택 항목이 매진되었는지 알려 줍니다.

## 결제 흐름 {#payment-flow}

컨트롤러의 `processRegistrationCharge`는 등록이 금전을 다루는 유일한 지점이며, 헌금 스택의 얇은 클라이언트입니다.

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

토큰화는 헌금과 정확히 같이 브라우저에서 일어납니다([헌금](./giving) 참고). 마법사는 apphelper 결제 제공자 레지스트리를 재사용하므로, 로그인한 교인은 저장된 카드로 결제할 수 있고 손님은 새 카드를 토큰화합니다. 컨트롤러는 `DonateController`의 제공자별 특이 사항(Kingdom Funding의 `pm-{id}` 결제 수단 ID, Stripe SCA의 `requires_action` 응답을 결제 기록 없이 클라이언트에 반환하는 처리)을 그대로 따릅니다. 결제가 성공하면 `registrationPayments` 행이 기록되고, `amountPaid`가 증가하며, 등록이 확정됩니다. **환불은 구현되어 있지 않습니다.** 취소된 유료 등록은 결제 행을 그대로 유지하며, 환불은 게이트웨이 대시보드에서 별도로 처리합니다.

두 진입점 모두 같은 코드 경로를 사용합니다. `register`(가입 시 결제)와 `pay`(잔액 결제 또는 대기자 명단 완료)입니다.

`register`는 두 경우에 결제를 건너뛰고, 등록을 `pending` 상태에 `amountPaid = 0`으로 저장해 전체 금액을 미납 잔액으로 남깁니다.

- **직원의 참가자 추가.** 요청 본문에 호출자의 것이 아닌 `personId`가 있고, `guestInfo`가 없으며, 호출자가 해당 교회에서 `registrations.edit` 권한을 가진 경우입니다. 해당 교인이 존재해야 합니다(없으면 404). 가구 구성원 필터는 우회되며, 아무 것도 결제되지 않습니다.
- **게이트웨이 없음.** 교회에 헌금 게이트웨이가 없는 경우입니다(`hasGateway`가 `gateway.loadAll`을 확인). B1App 결제 단계는 카드 양식 대신 **Register and Pay Later**를 표시합니다.

손님(`au.id` 없음)의 유료 등록은 `POST /giving/donate/captcha-verify`에서 받은 `captchaPass`를 포함해야 합니다. `CaptchaPass.verify`(현재 `shared/helpers`에 있음)는 결제 직전에 실행되므로, 대기자 명단 등록과 무료 등록에는 영향이 없습니다. `CAPTCHA_ENFORCE=true`이고 통과 값이 없거나 유효하지 않으면, 새 등록은 `deleteCascade()`로 되돌려지고 호출은 403을 반환합니다. B1App의 `RegistrationPaymentForm`은 손님에게 reCAPTCHA 체크박스를 보여 주고, 카드 저장과 등록 요청 모두에 통과 값을 함께 보냅니다.

## 대기자 명단 수명 주기

행사가 가득 찼고 행사의 `waitlistEnabled` 플래그가 켜져 있으면, `register`는 일행을 `waitlisted`로 저장합니다(정원 확인은 건너뜀). 그리고 대기자 명단 자리임을 표시한 일반 확인 이메일을 보냅니다. 승격은 세 가지 경로로 일어납니다. `cancel`, `delete`, 직원용 `promote` 엔드포인트입니다. 모두 `RegistrationRepo.promoteFromWaitlist`로 모이며, 이 함수는 가장 오래된 대기 행을 골라 원자적으로 상태를 바꿉니다.

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…행사의 활성 인원 수…) < ?
```

`status='waitlisted'` 조건 때문에 동시에 일어나는 승격이 같은 행을 두 번 승격할 수 없고, 정원 서브쿼리 때문에 승격으로 정원이 초과되지 않습니다. 승격된 행은 `confirmed`가 아니라 `pending` 상태가 됩니다. 아직 잔액이 남아 있을 수 있기 때문입니다. `RegistrationHelper.sendWaitlistAvailabilityEmail`은 등록자에게 자리가 났다고 알리며, `totalAmount − amountPaid > 0`이면 교회의 B1 `/mobile/registrations` 페이지(내 등록 내역)로 연결되는 링크를 포함합니다. 이 링크는 `B1AppRoot`와 교회 서브도메인으로 만들어집니다. 결제하거나 잔액이 없으면 등록이 확정됩니다.

:::info
정원을 늘린다고 자동으로 승격되지는 않습니다. 직원이 정원을 늘린 뒤 명단의 Promote 작업을 사용해야 합니다. 취소와 삭제는 자동으로 승격합니다.
:::

## 클라이언트 화면

- **B1App 마법사** -- 하나의 공유 훅 `B1App/src/components/registration/useEventRegistration.ts`가 웹사이트 컴포넌트(`components/registration/EventRegister.tsx`)와 모바일 포털 화면(`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`)을 모두 구동하며, `info → members → selections → questions → payment → confirm` 단계를 거칩니다. 가운데 단계는 행사에 선택 항목, 연결된 양식, 0이 아닌 총액 중 하나라도 있을 때만 나타납니다. 정보 및 참가자 단계는 참가자 유형별 선택기를 보여 주며, 남은 정원과 매진 상태를 실시간으로 표시합니다. 결제 단계(`RegistrationPaymentForm.tsx`)는 주문 요약, 할인 코드 입력을 보여 주며, 로그인한 교인에게는 apphelper 제공자 레지스트리를 통해 저장된 결제 수단을 보여 주고, 손님은 새 카드를 토큰화합니다. **Registrations** 모바일 화면(`screens/RegistrationsPage.tsx`)은 내 등록 내역입니다. 상태, 미납 잔액, 결제 완료(`POST /:id/pay`), 수정(`PUT /:id`, 연락처, 참가자 유형, 선택 항목 수량), 취소를 제공합니다.
- **B1Admin 설정** -- `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx`에는 Enable Waitlist 스위치와, 참가자 유형, 선택 항목, 할인 코드(`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`)의 아코디언이 있습니다. 모두 `/types`, `/selections`, `/coupons` 경로에 대한 CRUD입니다.
- **B1Admin 명단** -- `B1Admin/src/registrations/RegistrationDetailsPage.tsx`에는 참가자별 유형 열, 결제 완료/전체 금액 열과 잔액 칩, 유형별 인원 칩, 결제 상세 대화상자(`RegistrationDetailDialog.tsx`, `GET /payments/:registrationId` 사용), 대기자 명단 Promote 행 작업, 참가자 유형, 선택 항목, 결제 완료/전체/잔액, 질문 답변을 포함한 CSV 내보내기가 있습니다.

모듈 간 조회(손님 교인 찾기 또는 생성, 이메일용 교회 정보 불러오기)는 모두 `getMembershipModuleGateway()`를 거칩니다. content 모듈은 membership 테이블을 직접 읽지 않습니다.

## 관련 문서

- [헌금](./giving) -- 이 기능이 재사용하는 게이트웨이 추상화, 제공자 레지스트리, 토큰화 모델
- [Content 엔드포인트](../api/endpoints/content) -- content 모듈의 REST 인터페이스
- [웹훅](../api/webhooks) -- `registration.created` 이벤트
- [모듈 구조](../api/module-structure) -- content 모듈이 서버 측에서 구성되는 방식
