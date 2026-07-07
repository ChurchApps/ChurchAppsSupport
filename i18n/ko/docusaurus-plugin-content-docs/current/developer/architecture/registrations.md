---
title: "이벤트 등록"
---

# 이벤트 등록

<div class="article-intro">

네이티브 이벤트 등록은 콘텐츠 모듈에 있고, 유료 등록 물결 이후 전체 상거래 모델을 전달합니다: 가격 책정 참석자 유형, 가격 책정 추가 옵션 선택, 할인 코드, 교회의 기존 기부 게이트웨이를 통한 결제, 상태 기반 대기자 목록. 자금 경로는 의도적으로 기부 스택을 재사용합니다. 등록 컨트롤러는 [기부](./giving)에서 문서화된 동일한 `GatewayService` / `IGatewayProvider` 추상화를 통해 청구하므로 카드 데이터나 게이트웨이 SDK 지식이 콘텐츠 모듈에 없습니다. 이 페이지는 데이터 모델, 가격 책정 및 수용 인원 규칙, 등록, 결제, 대기자 목록 흐름을 매핑합니다.

</div>

## 개요

```
┌──────────────────────────────┐            ┌─────────────────────────────────────────────┐
│ B1App (member portal)        │            │ Api — content module                        │
│  registration wizard ·       │   HTTPS    │  RegistrationController                     │
│  My Registrations            │ ─────────▶ │   /content/registrations                    │
├──────────────────────────────┤            │  RegistrationPricingHelper (server pricing) │
│ B1Admin (staff)              │            │  RegistrationHelper (emails)                │
│  event registration settings │            └───────────────┬─────────────────────────────┘
│  · roster · CSV export       │                            │ processCharge
└──────────────────────────────┘                            ▼
                                            ┌─────────────────────────────────────────────┐
                                            │ shared gateway abstraction (giving)         │
                                            │  GatewayService → IGatewayProvider          │
                                            │  Stripe · PayPal · Kingdom Funding          │
                                            └─────────────────────────────────────────────┘
```

스택 전체에서 세 가지 규칙이 유지됩니다.

1. **서버가 가격을 소유합니다.** 클라이언트는 유형 id, 선택 id, 수량을 제출합니다. `RegistrationPricingHelper.computeTotal()`은 합계를 서버 측으로 계산하고 쿠폰은 청구 시간에 다시 검증됩니다. 클라이언트 제공 금액은 절대 신뢰되지 않습니다.
2. **수용 인원은 삽입 시간에 원자적으로 시행됩니다.** 모든 수용 인원 제한 삽입은 `INSERT … SELECT … FROM dual WHERE (count of active rows) < capacity` 문을 사용하므로 두 동시 등록이 모두 마지막 자리를 차지할 수 없습니다. 수는 상태 (`pending`/`confirmed`)에서 파생되고 저장되지 않습니다.
3. **결제는 기부 레일을 탑승합니다.** `RegistrationController`는 공유 `GatewayService.processCharge`를 교회의 구성된 게이트웨이로 호출합니다. 동일한 제공자 추상화, 토큰화 모델, SCA 처리와 같이.

## 데이터 모델 (`Api/src/modules/content`)

모델은 `models/Registration.ts`에 있습니다. 테이블 매핑은 `db/DatabaseTypes.ts`에 있습니다. 테이블당 하나의 저장소는 `repositories/` 아래에 있습니다.

| 테이블 | 의미 | 주요 필드 |
|--------|------|----------|
| `registrations` | 한 등록 (한 가구/파티가 한 이벤트용) | eventId, personId, householdId, **status** (`pending` / `confirmed` / `waitlisted` / `cancelled`), totalAmount, amountPaid, couponId, waitlistNotifiedDate, registeredDate, cancelledDate |
| `registrationMembers` | 등록의 한 참석자 | registrationId, personId, firstName, lastName, **registrationTypeId** |
| `registrationTypes` | 이벤트당 참석자 유형 (예: 성인 / 어린이) | eventId, name, description, **price**, **capacity**, minAgeYears, maxAgeYears, formId, sort, active |
| `registrationSelections` | 가격이 있는 명명된 추가 옵션 (예: T셔츠) | eventId, name, description, **price**, **capacity**, **maxQuantity** (등록당 상한), sort, active |
| `registrationSelectionChoices` | 등록/회원이 선택한 선택 수량 | registrationId, registrationMemberId, selectionId, **quantity** |
| `registrationPayments` | 등록에 대한 한 번의 성공한 청구 | registrationId, gatewayId, provider, transactionId, method, amount, currency, kind (`charge`), status (`succeeded`), personId |
| `registrationCoupons` | 이벤트당 할인 코드 | eventId, code, **discountType** (`percent` / `amount`), **value**, startDate, endDate, **minMembers**, **maxUses**, active |

주석:

- **대기자 목록 테이블이 없습니다.** 대기자 목록 파티는 `status = 'waitlisted'`인 `registrations` 행입니다. 전체 대기자 목록 생명 주기는 그 하나의 테이블의 상태 전환입니다.
- **저장된 카운터가 없습니다.** "판매됨" / "사용됨" 수 (이벤트 수용 인원, 유형별 수용 인원, 선택별 수용 인원, 쿠폰 사용)은 상태가 `('pending','confirmed')`인 행에 대한 상관 서브쿼리로 계산됩니다 (`RegistrationTypeRepo.loadActiveWithUsage`, `RegistrationRepo.countActiveForEvent` / `countActiveForCoupon`). 등록을 취소하면 부기 없이 수용 인원이 해제됩니다.
- 가격은 MySQL DECIMAL 열입니다 (유선상 문자열). 가격 책정 도우미 내에서 `Number()`로 강제됩니다.

## REST 표면

모든 것은 `/content/registrations` (`controllers/RegistrationController.ts`)에 있고 `Permissions.registrations` (`view` / `edit`)로 게이트됩니다.

| 경로 | 액세스 | 목적 |
|------|--------|------|
| `POST /register` | 익명 | 전체 제출: 게스트 또는 회원, 서버 가격 책정, 수용 인원 확인, 선택사항 청구 |
| `GET /types/event/:eventId`, `GET /selections/event/:eventId` | 공개 | 마법사 용 도출된 `used` / `remainingCapacity`이 있는 유형/선택 |
| `POST /types`, `DELETE /types/:id` (같음 `/selections`, `/coupons`) | `registrations.edit` | 직원 설정 CRUD |
| `POST /coupons/validate` | 공개 | 마법사 중 인라인 할인 코드 검증 |
| `GET /coupons/event/:eventId` | 직원 | 사용 수가 있는 쿠폰 |
| `GET /event/:eventId` · `GET /event/:eventId/count` | 직원 · 공개 | 명부; 수용 인원 표시를 위한 활성 수 |
| `GET /person/:personId` · `GET /:id` · `GET /payments/:registrationId` | 인증됨 | 내 등록, 세부정보, 결제 이력 |
| `PUT /:id` | 소유자/직원 | 제출 후 편집. 회원 및 선택 선택을 원자적 수용 인원 확인과 함께 새로운 것으로 바꾸고 `totalAmount` 다시 계산. 절대 자동 청구하거나 환불하지 않음 |
| `POST /:id/pay` | 소유자 | "결제 완료": `totalAmount − amountPaid` 청구, `waitlisted`/`pending` → `confirmed` 뒤집음 |
| `POST /:id/promote` | 직원 | 수동 대기자 목록 승격 |
| `POST /:id/cancel` · `DELETE /:id` | 소유자 · 직원 | 취소 / 삭제; 둘 다 대기자 목록 자동 승격을 트리거 |

동일한 이벤트에서 동일한 `personId`에 대한 취소되지 않은 기존 등록은 409로 거부되고 각 생성된 등록은 `WebhookDispatcher`를 통해 `registration.created` webhook을 방출합니다.

## 가격 책정 및 할인 코드

`helpers/RegistrationPricingHelper.ts`는 단일 자금 수학 권위입니다.

- `computeTotal()`은 각 회원의 유형 가격 더하기 각 선택 선택의 `price × quantity`를 합산합니다.
- `validateCoupon()`은 활성 플래그, 날짜 윈도우 (`startDate`/`endDate`), 제출된 파티 크기에 대한 `minMembers`, 상태 도출 상환 수에 대한 `maxUses`를 시행합니다.
- `applyDiscount()` — `percent`는 `total × value/100`을 빼고; `amount`는 `value`를 빼고; 둘 다 0에서 바닥나갑니다.

마법사는 인라인 피드백에 대해 `POST /coupons/validate`을 호출하지만 `register`는 서버 측에서 쿠폰을 다시 검증하고 다시 적용합니다. 클라이언트의 표시된 합계는 자문만입니다.

## 원자적 수용 인원 관용구

모든 수용 인원 제한 삽입은 수용 인원 확인을 `INSERT` 자체의 일부로 만들어 트랜잭션이나 잠금 없이 안전하게 경합합니다. 이벤트 레벨 (`RegistrationRepo.atomicInsertWithCapacityCheck`):

```sql
INSERT INTO registrations (id, churchId, eventId, ...)
  SELECT ?, ?, ?, ...
  FROM dual
  WHERE (SELECT COUNT(*) FROM registrations
         WHERE eventId=? AND churchId=? AND status IN ('pending','confirmed')) < ?
```

0 영향 행은 "수용 인원 도달"을 의미합니다. 동일한 관용구가 유형별 삽입을 보호합니다 (`RegistrationMemberRepo.atomicInsertWithTypeCapacity`, 활성 등록에 연결된 회원 세기) 및 선택별 수량 (`RegistrationSelectionChoiceRepo.atomicInsertWithCapacityCheck`, `COALESCE(SUM(quantity),0) + ? <= capacity` 사용). 등록 중간에 모든 회원 또는 선택 삽입이 실패하면 컨트롤러는 `deleteCascade()`로 부분 등록을 롤백하고 어떤 유형 또는 선택이 매진되었는지 보고합니다.

## 결제 흐름

컨트롤러의 `processRegistrationCharge`는 등록이 금전에 닿는 유일한 장소이고 이는 기부 스택의 얇은 클라이언트입니다.

```
RegistrationController ─▶ RepoManager.getRepos("giving").gateway
                       ─▶ GatewayService.getGatewayForChurch(churchId, …)
                       ─▶ GatewayService.processCharge(gateway, chargeData)
                             └▶ IGatewayProvider.processCharge  (Stripe / PayPal / Kingdom Funding)
```

토큰화는 기부와 정확히 같은 방식으로 브라우저에서 발생합니다 ([기부](./giving) 참조). 마법사는 apphelper 결제 제공자 레지스트리를 재사용하므로 로그인한 회원은 저장된 카드로 결제할 수 있고 게스트는 새 카드를 토큰화합니다. 컨트롤러는 `DonateController`의 제공자 특수성을 미러링합니다 (Kingdom Funding `pm-{id}` 결제 방법 id, Stripe SCA `requires_action` 응답이 결제를 기록하지 않고 클라이언트로 반환됨). 성공적인 청구는 `registrationPayments` 행을 기록하고 `amountPaid`를 범프하고 등록을 확인합니다. **환불은 구현되지 않습니다**. 취소된 유료 등록은 결제 행을 유지하고 모든 환불은 게이트웨이 대시보드에서 외부 처리됩니다.

두 진입점 모두 동일한 코드 경로를 통해 라우트됩니다: `register` (가입 시 결제) 및 `pay` (잔액 결제 / 대기자 목록 완료).

## 대기자 목록 생명 주기

이벤트가 가득 찼고 이벤트의 `waitlistEnabled` 플래그가 켜져 있으면 `register`는 파티를 `waitlisted`로 저장합니다 (수용 인원 확인 건너뜀). 확인 이메일을 대기자 목록 자리로 표시하여 보냅니다. 승격은 세 가지 방법으로 발생합니다: `cancel`, `delete`, 직원 `promote` 엔드포인트. 모두 `RegistrationRepo.promoteFromWaitlist`로 흘러듭니다. 가장 오래된 대기자 목록 행을 선택하고 원자적으로 뒤집습니다.

```sql
UPDATE registrations SET status='pending', waitlistNotifiedDate=NOW()
  WHERE id=? AND status='waitlisted'
    AND (…active count for the event…) < ?
```

`status='waitlisted'` 가드는 동시 승격이 행을 이중 승격할 수 없고 수용 인원 서브쿼리는 승격이 초과 판매할 수 없음을 의미합니다. 승격된 행은 `confirmed`가 아니라 `pending`으로 착지합니다. 잔액이 아직 owed될 수 있기 때문입니다. `RegistrationHelper.sendWaitlistAvailabilityEmail`은 등록자에게 자리가 열렸음을 알리고 `totalAmount − amountPaid > 0`일 때 완료 결제 페이지로 연결합니다. 결제 (또는 잔액이 없음)는 그들을 확인합니다.

:::info
용량 상승은 그 자체로 자동 승격하지 않습니다. 직원은 용량을 올린 후 명부의 승격 작업을 사용합니다. 취소 및 삭제는 자동으로 승격합니다.
:::

## 클라이언트 표면

- **B1App 마법사** — 하나의 공유 훅 `B1App/src/components/registration/useEventRegistration.ts`는 웹사이트 컴포넌트 (`components/registration/EventRegister.tsx`) 및 모바일 포털 화면 (`app/[sdSlug]/mobile/components/screens/EventRegisterPage.tsx`)을 단계 `info → members → selections → questions → payment → confirm`을 통해 구동합니다 (이벤트에 선택, 첨부된 양식, 또는 0이 아닌 합계가 있을 때만 중간 단계가 렌더링됨). 정보/회원 단계는 라이브 나머지 용량 및 매진 상태를 가진 참석자 유형당 선택기를 보여줍니다. 결제 (`RegistrationPaymentForm.tsx`)는 주문 요약, 할인 코드 항목, 그리고 로그인한 회원의 경우 apphelper 제공자 레지스트리를 통한 저장된 결제 방법을 게스트가 새 카드를 토큰화할 수 있도록 보여줍니다. **등록** 모바일 화면 (`screens/RegistrationsPage.tsx`)은 내 등록입니다: 상태, 미납 잔액, 결제 완료 (`POST /:id/pay`), 편집 (`PUT /:id` — 연락처, 회원 유형, 선택 수량), 취소.
- **B1Admin 설정** — `B1Admin/src/registrations/components/RegistrationSettingsEdit.tsx`는 대기자 목록 스위치 활성화 더하기 참석자 유형, 선택, 할인 코드를 위한 아코디언을 추가합니다 (`RegistrationTypesEdit.tsx` / `RegistrationSelectionsEdit.tsx` / `RegistrationCouponsEdit.tsx`). 모두 `/types`, `/selections`, `/coupons` 경로에 대해 CRUD입니다.
- **B1Admin 명부** — `B1Admin/src/registrations/RegistrationDetailsPage.tsx`: 참석자 유형별 열, 잔액 칩이 있는 지불됨/합계 열, 유형별 수 칩, 결제 세부정보 대화 (`RegistrationDetailDialog.tsx`, `GET /payments/:registrationId`에서), 대기자 목록 승격 행 작업, CSV 내보내기 (참석자 유형, 선택, 지불됨/합계/잔액, 질문 답변 포함).

교차 모듈 조회 (게스트 사람 해결 또는 생성, 이메일을 위한 교회 로드)는 `getMembershipModuleGateway()`를 통해 갑니다. 콘텐츠 모듈은 절대 멤버십 테이블을 직접 읽지 않습니다.

## 관련 페이지

- [기부](./giving) — 이 기능이 재사용하는 게이트웨이 추상화, 제공자 레지스트리, 토큰화 모델
- [콘텐츠 엔드포인트](../api/endpoints/content) — 콘텐츠 모듈의 REST 표면
- [웹훅](../api/webhooks) — `registration.created` 이벤트
- [모듈 구조](../api/module-structure) — 콘텐츠 모듈이 서버 측에서 어떻게 구성되는지
