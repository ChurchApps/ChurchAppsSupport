---
title: "체크인"
---

# 체크인

<div class="article-intro">

체크인은 세 개의 정면 문이 있는 하나의 시스템입니다: 직원 및 자체 서비스 스테이션용 B1Checkin 키오스크 앱, B1App 회원 포털 내 자체 체크인, B1Admin의 관리자 측 참석입니다. 셋 다 핵심 Api의 동일한 참석 모듈에 쓰고, 교실 라우팅은 전적으로 그룹에 의해 주도됩니다 -- 별도의 "위치" 또는 "방" 엔터티가 없습니다. 자녀 안전 계층이 맨 위에 있습니다: 방문당 체크인 유형, 서버 측 용량 및 자원봉사자 비율 게이트, 키오스크 측 나이/학년 적격성, 체크아웃 시 신뢰할 수 있는 픽업 확인 및 교회의 문자 공급자를 통한 부모 호출. 이 페이지는 데이터 모델, 체크인 흐름, 안전 계층 및 레이블 인쇄 파이프라인을 매핑합니다.

</div>

## 개요

```
┌──────────────────────────┐
│ B1Checkin(Expo 키오스크) │──┐         ┌──────────────────────────────────────────────┐
│  lookup → household →    │  │         │ Api                                          │
│  groups → complete/print │  │  HTTPS  │  ┌─ membership module ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App(자체 체크인)       │  │         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin screen  │  │         │  ┌─ attendance module ─────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin(직원)            │──┘         │  │ groupServiceTimes(방 라우팅)            │ │
│  setup · reports ·       │            │  │ sessions ← visitSessions → visits       │ │
│  label designer          │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

레이블 인쇄 경로(키오스크만):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper(레이블 템플릿 또는 번들 HTML 대체)
       └▶ LabelRenderer → HTML 문서 + 인라인 SVG 바코드
            └▶ PrintUI: WebView 렌더링 → ViewShot JPG 캡처
                 └▶ printer-helper native 모듈 → Brother QL / Zebra
```

| 표면 | 저장소 | 스택 | 역할 |
|---------|------|-------|------|
| 키오스크 | `B1Checkin` | Expo / React Native, expo-router 파일 라우팅; EAS는 Android, Amazon Fire 및 iOS용 빌드; `expo-updates`를 통한 OTA 업데이트 | 레이블 인쇄 및 검증 체크아웃이 있는 직원 또는 자체 서비스 스테이션 |
| 자체 체크인 | `B1App` | Next.js(b1.church 회원 포털) | 로그인한 회원이 휴대폰에서 가구를 체크인합니다. 인쇄 없음 |
| 관리 | `B1Admin` | React SPA | 서비스 구조를 구성하고, 그룹을 서비스 시간에 할당하고, 레이블을 설계하고, 수동 참석을 기록하고, 보고서를 실행합니다 |

셋 다 `ApiHelper`를 통해 동일한 두 Api 모듈을 호출합니다: 사람, 가구 및 그룹용 **MembershipApi**(`/membership`); 아래 모든 항목용 **AttendanceApi**(`/attendance`).

## 데이터 모델(`Api/src/modules/attendance`)

| 엔터티 / 테이블 | 주요 필드 | 의미 |
|----------------|-----------|---------|
| `campuses` | name, address | 여기서 중단됨 -- 캠퍼스는 멤버십 모듈(`/membership/campuses`)에서 마스터됨; 참석 사본은 레거시 판독기(`models/Campus.ts`)용 읽기 전용으로 동결됨 |
| `services` | campusId, name | 반복되는 모임(예: "주일 오전")(`models/Service.ts`) |
| `serviceTimes` | serviceId, name | 서비스 내의 시간 슬롯(예: "오전 9:00")(`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | 조인 테이블: 어느 그룹(교실)이 어느 서비스 시간에 만나는가(`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | 한 그룹의 한 번의 모임, 한 날짜 -- 체크인 시간에 느리게 생성됨(`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | 한 날짜에 한 사람 참석(`models/Visit.ts`). `checkinType`은 `member` / `guest` / `volunteer`(NULL = 레거시 회원), 키오스크에서 설정되고 용량/비율 게이트에서 소비됨 |
| `visitSessions` | visitId, sessionId | 어느 세션이 방문을 다루는가 -- 두 서비스 시간에 체크인된 어린이는 두 행을 얻음(`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType(`nametag`/`pickup`), width, height, isDefault, content(JSON 블록) | 설계 가능한 레이블 레이아웃(`models/LabelTemplate.ts`) |

### 완료된 체크인이 어떻게 지속되는가

`VisitController.postCheckin`(`Api/src/modules/attendance/controllers/VisitController.ts`)은 `POST /attendance/visits/checkin?serviceId=&peopleIds=`를 처리합니다. 본문은 각각 `visitSessions`를 포함하는 `Visit` 객체의 배열이며, 이들의 임베드된 `session`은 `(serviceTimeId, groupId)` 쌍만 이름을 지정합니다. 서버는 다음을 수행합니다:

1. **어느 쓰기 전에도 용량 및 비율을 게이트합니다.** `evaluateGates()` → `CheckinGateHelper.evaluate()`은 각 대상 방의 용량, 게스트 용량, 닫힘 플래그 및 현재 점유에 대한 자원봉사자 비율을 확인합니다. postCheckin은 **트랜잭션이 아니므로** 게이트는 첫 저장 전에 실행되어야 합니다 -- 하드 위반은 409를 반환하여 위반 방을 이름짓고 아무것도 지속되지 않습니다. [용량 및 자원봉사자 비율 게이트](#capacity-and-volunteer-ratio-gates)를 참조하세요.
2. **세션을 느리게 해결합니다.** `getSessionId()`는 `(groupId, serviceTimeId, today)`에 대한 `sessions` 행을 찾거나 만듭니다 -- 세션 ID는 날짜당 프로세스 내에서 캐시됩니다. 새 세션은 `session.created` 웹훅을 내보냅니다. 루프는 기다려진 `for..of`입니다 -- 이전 시작 삭제 `forEach(async …)`는 저장과 경쟁하여 첫 세션 생성 시 NULL sessionIds를 작성했습니다(수정됨; 루프 코드 주석에 주목됨).
3. **그 날의 기록을 교체합니다.** 그 사람들의 기존 방문은 그 서비스에서 오늘 삭제되고 그들의 visitSessions도 마찬가지이고, 제출 세트는 저장됩니다. 가족을 다시 체크인하는 것은 따라서 멱등원 "이것이 현재 상태" 작업이지 추가가 아닙니다. `?checkDuplicates=true` 전달은 대신 쓰지 않고 `{ duplicates: [personId…] }`를 반환하며, 이것이 키오스크가 덮어쓰기 전에 경고하는 방식입니다.
4. **배치당 하나의 보안 코드를 생성합니다.** `SecurityCodeHelper.generate()`은 알파벳 `23456789BCDFGHJKLMNPQRSTVWXYZ`에서 4문자 코드를 생성합니다(모음 또는 모호한 문자 없음, 따라서 코드는 단어를 철자할 수 없거나 오독할 수 없음). 서버는 동일한 교회의 동일한 날 공개 방문에 대해 충돌을 재시도하고 배치의 모든 방문에 코드를 인장합니다.
5. **`{ streaks, securityCode }`를 반환합니다.** `streaks`는 personId를 연속 주 참석 수에 매핑합니다. 키오스크는 마일스톤(매 5주마다)을 축포로 축하합니다.

저장된 각 방문은 또한 `attendance.recorded` 웹훅을 내보냅니다. 읽기 측, `GET /attendance/visits/checkin`은 **마지막 로그인 날짜**에서 사람들의 방문을 반환합니다 -- 그것이 이전 주였다면 ID는 제거되므로 클라이언트는 새 기록으로 저장될 지난주 방 선택의 미리 채워진 사본을 받습니다.

### 체크아웃

두 개의 엔드포인트가 루프를 완료합니다(`VisitController`):

- `GET /attendance/visits/code/:code` -- 그 보안 코드를 가진 오늘의 아직 체크아웃하지 않은 방문, 세션이 채워짐.
- `POST /attendance/visits/checkout` -- 본문 `{ visitIds, checkedOutBy?, checkedOutById? }`. `checkoutTime` 스탬프와 누가 픽업했는지, 그리고 방문당 `attendance.checkout` 웹훅을 내보냅니다.

권한: 키오스크는 `attendance.checkin`으로 인증하며, 정확히 체크인/체크아웃/레이블 템플릿 표면을 허가합니다. `attendance.view`/`attendance.edit`은 보고 및 수동 입력을 다룹니다. 구조(서비스, 서비스 시간, 그룹 할당)는 `services.edit`이 필요합니다. 회원 자체 체크인(B1App)은 권한이 필요하지 않습니다: 교회에 연결된 사람이 있는 모든 인증된 사용자는 `GET`/`POST /attendance/visits/checkin`을 호출할 수 있으며, 서버는 제출된 `personId`을 호출자의 고유 가구로 제한합니다(그렇지 않으면 403 -- 이 울타리는 다른 가족의 `securityCode`가 읽을 수 없게 유지하는 것입니다). 멤버십은 보조금입니다. 회원이 기능을 *보는* 여부는 교회의 B1App 네비게이션 탭에서 제어됩니다. 다른 체크인 엔드포인트(`code/:code`, `checkout`, `guardians`, `CheckinController`)는 키오스크/직원 전용으로 유지됩니다.

## 그룹이 방 라우팅을 주도합니다

시스템 어디에도 방이나 교실 엔터티가 없습니다. "방"은 멤버십 **그룹**입니다(`trackAttendance` 활성화됨). `groupServiceTimes`를 통해 하나 이상의 서비스 시간에 연결됩니다. 그룹 필드(온 `Api/src/modules/membership/models/Group.ts`)가 키오스크 동작을 형성합니다:

| 필드 | 효과 |
|------|--------|
| `trackAttendance` | 그룹은 참석에 전혀 참여합니다; B1Admin의 설정 트리는 `groupServiceTimes` 행이 없는 `trackAttendance` 그룹을 할당되지 않은 것으로 표시합니다 |
| `parentPickup` | 어린이 방을 표시합니다: 이에 체크인하면 방문이 "어린이" 방문이 되어 가족 픽업 레이블을 인쇄하고 보안 코드를 이름표에 놓습니다 |
| `printNametag` | 이 그룹에 대한 체크인이 모두 이름표를 인쇄하는지 여부 |
| `capacity` / `guestCapacity` / `checkinClosed` | 방 용량 제한 및 하드 "닫힘" 스위치, 체크인 게이트에 의해 서버 측에서 실행됨(B1Admin의 그룹 설정에서 "체크인 용량" 아래 편집됨) |
| `volunteerRatio` / `minVolunteers` | 교회 전체 `ratioEnforcement` 설정에 따라 자원봉사자별 어린이 비율 및 최소 자원봉사자 수, 실행됨 |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | 나이/학년 적격성 범위는 키오스크 측에서 평가됨(방 강조 또는 희미하게 함) |

모든 클라이언트는 동일한 방식으로 분정규화합니다(예: `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes` 및 `GET /membership/groups`를 병렬로 로드합니다. 그러면 각 서비스 시간에 대해 `groupServiceTimes` 행이 이를 가리키는 그룹을 수집하여 `serviceTime.groups`에 넣습니다. 그 배열은 방 선택이 보여주는 것이며, 그룹 `categoryName`별로 구성됩니다.

할당은 B1Admin의 그룹 페이지에서 편집됩니다(`B1Admin/src/groups/components/ServiceTimesEdit.tsx` -- `POST`/`DELETE /attendance/groupservicetimes`), 그리고 전체 Campus → Service → Service Time → Group 트리는 `B1Admin/src/attendance/components/AttendanceSetup.tsx`에서 `GET /attendance/attendancerecords/tree`를 통해 시각화됩니다.

:::info
그룹이 유일한 진실의 원천이므로 동일한 그룹 멤버십이 키오스크 라우팅, B1Admin의 그룹 페이지의 명부식 참석 및 참석 보고를 제공합니다 -- 그룹을 서비스 시간에 할당하는 것이 체크인 목적지로 만드는 유일한 단계입니다.
:::

## 자녀 안전

### 체크인 유형

모든 방문은 `checkinType`을 포함합니다 -- `member`, `guest` 또는 `volunteer`(NULL은 레거시/회원을 의미합니다. 마이그레이션 `tools/migrations/attendance/2026-07-03_checkin_type.ts`). 유형은 **키오스크 측에서** 선택됩니다: 확장된 회원 행의 회원 / 게스트 / 자원봉사자 칩(`B1Checkin/src/components/MemberServiceTimes.tsx`), 완료 시 각 보류 중인 방문에 스탬프(`app/checkinComplete.tsx`, 기본값 `member`). 서버는 게이트에서 소비합니다 -- 자원봉사자는 용량에 대해 계산되는 대신 비율 커버에 계산되고, 게스트는 `guestCapacity`에 대해 계산됩니다.

### 용량 및 자원봉사자 비율 게이트

`CheckinGateHelper.evaluate()`(`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`)는 어든 저장 전에 `postCheckin` 내에서 실행됩니다(엔드포인트는 트랜잭션이 아니므로 게이트 전 저장이 정확성 메커니즘입니다). 대상 그룹당 현재 점유를 로드하고(`VisitRepo.countActiveByGroupToday`) 멤버십 모듈 게이트웨이를 통해 그룹 구성을 로드합니다. 그러면 위반을 분류합니다:

- **하드(항상 차단):** `checkinClosed`, `current + incoming > capacity`, 게스트 수가 `guestCapacity`를 초과. 배치는 `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`로 거부됩니다 -- 키오스크는 이름 지정 방을 보여줍니다.
- **비율(경고 또는 차단):** 자원봉사자 < `minVolunteers`, 자원봉사자 없음 또는 `children > volunteers × volunteerRatio`인 방으로의 비자원봉사자 수입. 심각도는 교회별 설정 `ratioEnforcement`(`"warn"` 기본 / `"block"`, B1Admin Manage Church → Check-In에서 편집됨, `CheckinSettingsEdit.tsx`)를 따릅니다. 경고 모드는 `409 { warning: true, error: "ratio", … }`를 반환합니다. 클라이언트가 `acknowledgeWarnings=true`로 다시 제출하지 않는 한 -- 그 재제출이 키오스크의 직원 확인 오버라이드입니다.

### 나이/학년 적격성(키오스크 측)

방 적격성은 자문용 UI이며 키오스크에서 평가되고 서버에서 실행되지 않습니다. `B1Checkin/src/helpers/EligibilityHelper.ts`은 사람의 생년월일/학년을 그룹의 `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade`(학년 순서: PreK, K, 1–12, Graduated)에 비교하고 `eligible` / `ineligible` / `unknown`을 반환합니다 -- 누락된 데이터는 `unknown`을 생성하고 절대 방을 숨기지 않습니다. 나이 및 학년은 교회의 **학년 승격 날짜**(`gradePromotionDate` 설정, `"MM-DD"`, `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`에서 편집됨)로 계산됩니다. 키오스크는 `GET /attendance/checkin/settings`에서 가져오고, `resolveAsOfDate`는 오늘 또는 그 이전의 가장 최근 발생을 선택합니다. 방 선택기는 적격 방을 강조하고 부적격 방을 희미하게 합니다. 희미한 방을 선택하려면 직원 확인이 필요합니다.

### 신뢰할 수 있는 및 승인되지 않은 픽업

픽업 사람은 멤버십 엔터티입니다(가구별): `householdPickupPeople`(`Api/src/modules/membership/models/HouseholdPickupPerson.ts` -- householdId, 선택적 personId, 이름, photoUrl, 관계, `status` `trusted` / `notAuthorized`, 메모). CRUD는 `GET /membership/householdpickup/:householdId`(모든 인증된 교회 사용자이므로 키오스크는 읽을 수 있음)입니다. 권한이 있는 `people.edit`로 `POST` / `DELETE`. 직원은 사람 페이지의 **픽업** 카드에서 목록을 관리합니다(`B1Admin/src/people/components/PickupPeople.tsx`) -- 사진, 관계 및 신뢰할 수 있는/승인되지 않은 상태 칩.

체크아웃 시(`B1Checkin/app/checkout.tsx`) 키오스크는 가구의 픽업 목록을 로드합니다: `trusted` 항목은 가구 성인 사진 그리드와 나란히 탭 가능한 픽업 카드로 렌더링되고, 자유 입력 "기타" 이름은 퍼지 매칭됩니다(Levenshtein, `src/helpers/PickupMatchHelper.ts`) `notAuthorized` 항목에 대해 -- 일치는 경고 시트를 사용하여 체크아웃을 차단하고 직원 **오버라이드** 버튼이 있습니다. 오버라이드는 방문 자체에 로깅됩니다: 정상적인 `POST /attendance/visits/checkout`를 통해 `checkedOutBy`를 `"OVERRIDE: {name}"`으로 게시하므로 참석 기록에 도착하고 별도 감사 테이블이 아닌 `attendance.checkout` 웹훅에 도착합니다.

### 부모 호출 및 긴급 브로드캐스트

`CheckinController`(`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`)은 두 개의 SMS 엔드포인트를 노출합니다:

- `POST /page` -- `{ visitId, message }`: 체크인된 어린이의 보호자에게 호출(키오스크 체크아웃 화면, 관리 모드).
- `POST /broadcast` -- `{ serviceId, message }`: 서비스에 대해 체크인된 모든 가구의 성인에게 문자(키오스크 관리자 설정, `B1Checkin/app/adminSettings.tsx`에서 유형 `EMERGENCY` 확인 시트 뒤).

둘 다 멤버십 게이트웨이를 통해 가구 성인을 해결한 다음 배송을 **`MessagingModuleGateway.sendBulkText`**(`Api/src/shared/modules/MessagingModuleGateway.ts`)에 전달합니다 -- 교회의 구성된 문자 공급자(`@churchapps/texting`: TextInChurch, Clearstream 또는 MutualMinistry; 기본 제공 SMS 발신자 없음)로의 교차 모듈 문입니다. 게이트웨이는 `sentText` 행 및 수신자별 `deliveryLog` 항목을 로깅하고 배치를 500 수신자로 제한합니다. 구성된 공급자가 없으면 `no_provider`를 반환하며, 키오스크는 "SMS 공급자가 구성되지 않음"으로 표시합니다. 컨트롤러의 `dispatch()`는 전화번호를 중복 제거하고 휴대폰이 없거나 `optedOut`이 설정된 사람을 건너뛰고 `{ sent, failed, skippedOptedOut, skippedNoPhone }`을 반환하므로 키오스크는 무엇이 건너뛰어졌는지 보여줄 수 있습니다.

## 키오스크(B1Checkin)

화면은 `B1Checkin/app/` 아래의 expo-router 파일입니다. 교차 화면 상태는 정적 `CachedData` 클래스(`src/helpers/CachedData.ts`)에 있으며 React 상태가 아닙니다.

```
index(부트/자동 로그인) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             serviceTimes, groups,        │             │  └─────────┘ └▶ addGuest  └▶ 인쇄 레이블,
             groupServiceTimes,           │             └▶ checkout(관리)         자동 반환
             labelTemplates 로드          │                                        lookup으로
```

1. **조회**(`app/lookup.tsx`) -- 전화(`GET /membership/people/search/phone?number=`, 지난 4자리 또는 전체) 또는 이름(`GET /membership/people/search?term=`)별 검색. 일치 선택이 가구(`GET /membership/people/household/{householdId}`) 및 기존 방문(`GET /attendance/visits/checkin`)을 로드하고, `pendingVisits`를 지난주 선택으로 씨앗합니다.
2. **가구 검토**(`app/household.tsx`, `src/components/MemberList.tsx`) -- 각 회원 행은 이미 체크인된 배지, 알레르기/`nametagNotes` 배지 및 현재 방 칩을 보여줍니다. 회원 확장이 모든 서비스 시간을 방 버튼과 회원 / 게스트 / 자원봉사자 체크인 유형 칩으로 나열합니다(`MemberServiceTimes.tsx`).
3. **그룹 할당**(`app/selectGroup.tsx`) -- `serviceTime.groups`에서 구축된 카테고리 트리, 나이/학년 적격 방이 강조되고 직원 확인 뒤의 부적격 방이 희미함. 방 선택이 `{ session: { serviceTimeId, groupId } }` visitSession을 그 사람의 보류 중인 방문에 작성합니다(`src/helpers/VisitSessionHelper.ts`). "없음"이 정삭합니다.
4. **완료**(`app/checkinComplete.tsx`) -- `pendingVisits`를 사용한 `POST /attendance/visits/checkin`(각각 `checkinType`으로 스탬프됨). 그러면 프린터가 구성되어 있으면 레이블을 인쇄하고 조회로 자동 반환합니다. `409` 용량 응답은 이름 지정 꽉 찬/닫힌 방을 보여줍니다. 비율 경고는 `acknowledgeWarnings=true`로 재제출하는 직원 확인을 제공합니다.

**체크아웃 화면**(`app/checkout.tsx`)은 자동 초점 입력을 통해 4문자 보안 코드를 수락합니다 -- USB/Bluetooth 키보드 웨지 바코드 스캐너가 카메라 없이 작동합니다 -- 또는 동일한 알파벳을 사용하는 화면상 키패드, 4자에서 자동 제출. 코드를 찾고, 픽업되는 어린이를 보여주고, 가구의 **신뢰할 수 있는 픽업 사람**을 가구 성인의 사진 그리드와 나란히 탭 가능한 카드로 표시합니다(더하기 "기타" 자유 텍스트 옵션이 승인되지 않은 이름에 대해 퍼지 확인됨). 그러면 `POST /attendance/visits/checkout`을 픽업 사람의 이름/ID로 게시합니다. 관리 모드에서 화면은 또한 **부모 호출**(`POST /attendance/checkin/page`) 및 **보안 레이블 다시 인쇄**입니다 -- `reprint()`는 `LabelHelper.getAllLabelsFor(...)`를 사용하여 가족의 레이블을 재구축하고 동일한 `PrintUI` 파이프라인을 통해 공급합니다.

스테이션 개성은 AsyncStorage 플래그 `@StationMode`입니다(`"self"` | `"manned"`, `app/adminSettings.tsx`에서 토글됨). 관리 모드는 조회 화면에 체크아웃 입력점을 추가하고 가구 화면에서 회원별 프로필 편집을 추가합니다(`POST /membership/people`). 키오스크 강화는 빌드됩니다: 선택적 PIN(`app/setPin.tsx`, `src/components/PinEntryModal.tsx`)이 관리자 및 프린터 화면을 게이트합니다. 관리 화면은 헤더 로고에서만 7회 빠른 탭을 통해 열립니다. 유휴 어트랙트 화면(`src/hooks/useInactivityTimer.ts`)은 가족 간에 점유합니다.

## 자체 체크인(B1App)

회원은 B1.church 포털의 `/mobile/checkin` 화면에서 체크인합니다(`B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx`에서 `screens/CheckinPage.tsx`로 라우팅됨). 로그인한 사용자가 필요하며 키오스크와 동일한 4가지 단계(서비스 → 가구 → 그룹 → 완료)를 동일한 엔드포인트에 대해 걷습니다. 상태는 `B1App/src/helpers/CheckinHelper.ts`에 있습니다. 키오스크의 차이점: 가구는 로그인한 사용자의 고유한 `householdId`에서 나오며(검색 단계 없음), 레이블 인쇄 없음 -- 대신 완료 화면은 배치의 보안 코드를 QR로 보여줍니다(`qrcode.react`) "체크인 스테이션에서 보여주기" 힌트. 페이지 로드 시 가구가 이미 체크인되어 있으면 "체크인 코드 표시" 버튼이 기존 방문의 `securityCode`에서 QR을 다시 표시합니다. 체크인은 제출 시간에 즉시 기록됩니다(보류 중인 상태 없음). QR은 키오스크에서 레이블 인쇄만 구동합니다.

**휴대폰 간 키오스크 레이블 인쇄**(`B1Checkin/app/scan.tsx`, 조회 화면의 "코드 스캔" 버튼에서 도달): 키오스크는 `expo-camera` `CameraView`(기본값 전면, 플립 가능)를 열고 QR 코드를 스캔합니다. 스캔된 페이로드가 보안 코드 알파벳의 벌거벗은 4문자 코드일 때 수락됩니다. B1App QR과 인쇄 레이블의 QR 블록 모두 작동합니다. 화면은 다음 체크아웃 다시 인쇄 경로를 따릅니다 -- `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` -- 및 조회로 반환합니다. 스캔 시간에 참석 쓰기는 일어나지 않습니다. 활성 방문 없는 코드, 프린터 없는 스테이션 및 레이블 없는 그룹은 각각 토스트를 표시하고 조회로 반환합니다.

유형 및 `ApiHelper`/`ArrayHelper`는 `@churchapps/helpers` 및 `@churchapps/apphelper`에서 옵니다. React 구성 요소는 B1Admin과 공유되지 않습니다.

## 관리자 측 참석(B1Admin)

- **설정** -- `/attendance`(`B1Admin/src/attendance/AttendancePage.tsx`)는 구조 트리를 렌더링하고 서비스(`ServiceEdit.tsx`) 및 서비스 시간(`ServiceTimeEdit.tsx`)을 만듭니다. 캠퍼스 데이터는 `useCampuses()` 훅을 통해 멤버십에서 옵니다.
- **수동 참석**은 참석 섹션이 아닌 그룹 측에 있습니다: `B1Admin/src/groups/components/GroupSessionsTab.tsx`는 세션(`POST /attendance/sessions`)을 만들고 `POST /attendance/visitsessions/log`를 통해 사람을 현재로 표시합니다. 이는 그 사람 및 세션에 대한 방문을 찾거나 만듭니다. 그룹 지도자는 `attendance.edit` 권한 없이 자신의 그룹에 대한 참석을 기록할 수 있습니다 -- 컨트롤러는 `au.leaderGroupIds`를 확인합니다.
- **보고** -- 참석 추세 및 그룹 참석은 서버 정의 보고입니다(`B1Admin/src/components/reporting/ReportWithFilter.tsx` ReportingApi에 대해). 사람별 이력은 `GET /attendance/attendancerecords?personId=`(`B1Admin/src/people/components/PersonAttendance.tsx`)입니다.

## 레이블 인쇄

### 템플릿 및 디자이너

교회는 `/mobile/checkin/labels`(`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, 체크인 설정 페이지에서 도달함)에서 B1Admin의 자신의 레이블을 설계합니다. 템플릿은 `labelTemplates` 행이며, `content`는 블록의 JSON 배열입니다 -- `text`, `field`, `barcode`, `qrcode` 또는 `box` -- 각각 퍼센트 좌표에 위치하며, 글꼴, 정렬, 기호학(`code39`/`code128`/`qr`) 및 선택적 가시성 조건(예: `person.nametagNotes`가 비어 있지 않을 때만 알레르기 상자를 렌더링). 두 `labelType`이 존재합니다: `nametag`(체크인된 각 사람마다 하나; `person.displayName`, `sessions`, `securityCode`와 같은 필드) 및 `pickup`(가족마다 하나; `children`, `childrenAllergies`와 같은 필드). 서버는 교회당 유형당 단일 기본값을 적용합니다(`LabelTemplateController.save`). 디자이너는 키오스크의 번들 레이블을 미러링하는 스타터 템플릿을 제공하고 샘플 데이터에 대해 미리 봅니다.

### 키오스크에서 렌더링 및 인쇄

체크인 완료 시, `B1Checkin/src/helpers/LabelHelper.ts`는 각 보류 중인 방문에서 그룹 플래그에서 무엇을 인쇄할지 결정합니다: `printNametag` 그룹용 이름표, 플러스 모든 방문이 `parentPickup` 그룹을 친 경우 하나의 가족 픽업 레이블. 체크인 응답의 보안 코드는 어린이 이름표 및 픽업 레이블로 이동합니다. 성인 이름표는 코드 없이 인쇄됩니다. 교회에 템플릿이 있으면 `LabelRenderer`(`src/helpers/LabelRenderer.ts`)는 블록 + 필드 콘텍스트를 독립형 HTML 문서로 바꿈니다. 그렇지 않으면 `B1Checkin/assets/labels/`의 번들 HTML 레이블이 자리 표시자 대체로 사용됩니다.

바코드는 순수 TypeScript 인코더(`B1Checkin/src/helpers/barcode.ts`)에 의해 인라인 SVG로 생성됩니다 -- Code 39 패턴 테이블 및 Code 128(mod-103 체크섬을 포함한 코드 세트 B) 너비 테이블, 더하기 QR은 `qrcode` 패키지를 통해. **이러한 인코더는 **B1Admin에서 의도적으로 중복됩니다** (`LabelEditor.tsx`는 동일한 테이블을 인라인합니다. 코드 주석에 언급됨) 디자이너 미리보기가 키오스크 출력으로 픽셀 정확하므로. 하나의 변경은 다른 것에서 미러링되어야 합니다.

인쇄 파이프라인(`src/components/PrintUI.tsx`)은 각 HTML 레이블을 `WebView`에서 렌더링하고 `react-native-view-shot`를 통해 JPG로 캡처하고 이미지 URI를 기본 **printer-helper** Expo 모듈(`B1Checkin/modules/printer-helper/`)에 전달합니다. 모듈은 `scan()`, `checkInit()`, `printUris()` 및 상태 이벤트를 노출하며, 브랜드당 공급자는 양쪽 플랫폼에 있습니다:

| 브랜드 | Android | iOS | 참고 |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt`(Brother 인쇄 SDK) | `BrotherProvider.swift`(`BRLMPrinterKit.xcframework`) | QL 시리즈 네트워크 프린터(QL-800/810W/820NWB/1100/1110NWB…), 다이컷 29×90 레이블, 권장 기본값 |
| Zebra | `ZebraProvider.kt`(Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | 네트워크 검색 + TCP/ZPL 이미지 인쇄 |

프린터 선택은 `app/printers.tsx`에 있습니다(네트워크 스캔은 `brand~model~ip` 항목을 반환; 선택은 AsyncStorage로 지속됨). `src/helpers/PrinterLog.ts`는 키오스크 헤더의 라이브 상태 도트를 통해 표시되는 온 기기 진단 로그를 유지합니다.

## 게스트 등록

두 경로가 체크인 중 사람을 만듭니다:

- **키오스크에서** -- 가구 화면의 "게스트 추가"는 `B1Checkin/app/addGuest.tsx`를 엽니다. 먼저 기존 비회원 일치에 대해 `GET /membership/people/search?term=`을 검색합니다. 그렇지 않으면 `POST /membership/people`로 현재 가구에 연결된 하나를 만듭니다. 게스트는 모든 회원처럼 그룹 할당을 통해 흐릅니다.
- **QR을 통해 자체 서빙** -- 교회 설정 `enableQRGuestRegistration`이 켜져 있을 때(B1Admin의 체크인 설정에서 구성됨, `GET /membership/settings/public/{churchId}`에서 읽음), 키오스크 조회 화면은 `https://{subdomain}.b1.church/guest-register?serviceId=`에 연결하는 QR 코드를 표시합니다. 그 B1App 페이지(`src/app/[sdSlug]/(public)/guest-register/page.tsx`)는 방문 가족이 익명 `POST /membership/people/guest-register` 엔드포인트를 통해 자신의 휴대폰에서 등록하도록 합니다. 키오스크 라인을 이동시킵니다.

## 관련 페이지

- [참석 엔드포인트](../api/endpoints/attendance) -- 캠퍼스, 서비스, 세션, 방문 및 방문 세션의 전체 REST 표면
- [멤버십 엔드포인트](../api/endpoints/membership) -- 사람, 가구 및 그룹
- [웹훅](../api/webhooks) -- `session.created`, `attendance.recorded` 및 `attendance.checkout` 이벤트
- [모듈 구조](../api/module-structure) -- 참석 모듈이 서버 측에서 어떻게 구성되는지
