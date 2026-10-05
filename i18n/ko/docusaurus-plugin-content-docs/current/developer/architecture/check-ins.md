---
title: "체크인"
---

# 체크인

<div class="article-intro">

체크인은 하나의 시스템이지만 세 개의 진입점을 가집니다: 직원 배치 및 셀프 서비스 스테이션용 B1Checkin 키오스크 앱, B1App 멤버 포털 내 셀프 체크인, 그리고 B1Admin의 관리자 측 출석 기록. 세 개 모두 핵심 API의 동일한 출석 모듈에 기록되며, 교실 라우팅은 전적으로 그룹에 의해 주도됩니다. 별도의 "위치" 또는 "방" 항목이 없습니다. 아동 안전 계층이 그 위에 있습니다: 방문별 체크인 유형, 서버 측 용량 및 자원봉사자 비율 제한, 키오스크 측 나이/학년 적격성, 체크아웃 시 신뢰할 수 있는 픽업 확인, 그리고 교회의 문자 메시지 공급자를 통한 부모 호출. 이 페이지에서는 데이터 모델, 체크인 흐름, 안전 계층, 그리고 라벨 인쇄 파이프라인을 설명합니다.

</div>

## 개요

```
┌──────────────────────────┐
│ B1Checkin (Expo kiosk)   │──┐         ┌──────────────────────────────────────────────┐
│  lookup → household →    │  │         │ Api                                          │
│  groups → complete/print │  │  HTTPS  │  ┌─ membership module ─────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ people · households · groups            │ │
│ B1App (self check-in)    │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin screen  │  │         │  ┌─ attendance module ─────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (staff)          │──┘         │  │ groupServiceTimes  (room routing)       │ │
│  setup · reports ·       │            │  │ sessions ← visitSessions → visits       │ │
│  label designer          │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

Label print path (kiosk only):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (label templates, or bundled HTML fallback)
       └▶ LabelRenderer → HTML doc + inline SVG barcodes
            └▶ PrintUI: WebView render → ViewShot JPG capture
                 └▶ printer-helper native module → Brother QL / Zebra
```

| 표면 | 저장소 | 스택 | 역할 |
|---------|------|-------|------|
| 키오스크 | `B1Checkin` | Expo / React Native, expo-router 파일 라우팅; EAS 빌드는 Android, Amazon Fire 및 iOS용; `expo-updates`를 통한 OTA 업데이트 | 라벨 인쇄 및 검증된 체크아웃이 있는 직원 배치 또는 셀프 서비스 스테이션 |
| 셀프 체크인 | `B1App` | Next.js (b1.church 멤버 포털) | 로그인한 멤버가 휴대폰에서 가족 체크인; 인쇄 없음 |
| 관리자 | `B1Admin` | React SPA | 서비스 구조 구성, 그룹을 서비스 시간에 할당, 라벨 설계, 수동 출석 기록, 보고서 실행 |

세 개 모두 `ApiHelper`를 통해 동일한 두 API 모듈을 호출합니다: **MembershipApi** (`/membership`)는 사람, 가족 및 그룹용; **AttendanceApi** (`/attendance`)는 아래의 모든 항목용.

## 데이터 모델 (`Api/src/modules/attendance`)

| 항목 / 표 | 주요 필드 | 의미 |
|----------------|-----------|---------|
| `campuses` | name, address | 여기서는 더 이상 사용되지 않음 — 캠퍼스는 멤버십 모듈 (`/membership/campuses`)에서 관리됨; 출석 복사본은 레거시 판독기용으로 고정 읽기 전용 (`models/Campus.ts`) |
| `services` | campusId, name | 반복되는 모임, 예: "Sunday Morning" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | 서비스 내 시간 슬롯, 예: "9:00 AM" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | 결합 표: 어느 그룹(교실)이 어느 서비스 시간에 만나는지 (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | 한 날짜에 한 그룹의 한 번의 모임 — 체크인 시간에 게으르게 생성됨 (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | 한 사람이 한 날짜에 참석한 것 (`models/Visit.ts`). `checkinType`은 `member` / `guest` / `volunteer` (NULL = 레거시 멤버)이며, 키오스크에서 설정되고 용량/비율 제한에서 소비됨 |
| `visitSessions` | visitId, sessionId | 어느 세션(들)을 방문했는지 — 아이가 두 서비스 시간에 체크인하면 두 행 (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | 설계 가능한 라벨 레이아웃 (`models/LabelTemplate.ts`) |

### 완료된 체크인이 저장되는 방법

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`)은 `POST /attendance/visits/checkin?serviceId=&peopleIds=`를 처리합니다. 본문은 `Visit` 객체의 배열이며, 각각은 `(serviceTimeId, groupId)` 쌍만 이름 지은 내장 `session`을 가진 `visitSessions`를 수행합니다. 서버는 다음을 수행합니다:

1. **모든 쓰기 전에 용량 및 비율 제한.** `evaluateGates()` → `CheckinGateHelper.evaluate()`는 각 대상 방의 용량, 손님 용량, 닫힘 플래그, 그리고 자원봉사자 비율을 현재 점유율과 비교합니다. postCheckin은 **트랜잭션이 아니므로**, 제한은 첫 번째 저장 전에 실행되어야 합니다 — 심각한 위반은 409를 반환하며 문제의 방을 이름 지으며 아무것도 저장되지 않습니다. [용량 및 자원봉사자 비율 제한](#capacity-and-volunteer-ratio-gates) 참조.
2. **세션을 게으르게 해결.** `getSessionId()`는 `(groupId, serviceTimeId, today)`에 대한 `sessions` 행을 찾거나 생성합니다 — 세션 ID는 날짜별로 인 프로세스에서 캐시됩니다. 새 세션은 `session.created` webhook을 내보냅니다. 루프는 대기된 `for..of`입니다 — 이전 fire-and-forget `forEach(async …)`은 저장과 경합하여 첫 세션 생성 시 NULL sessionId를 기록했습니다 (수정됨; 루프의 코드 주석에 기재됨).
3. **그 날의 기록을 바꿉니다.** 그 사람들을 위한 모든 기존 방문이 그 서비스에서 그 날에 그들의 visitSessions과 함께 삭제된 후, 제출된 세트가 저장됩니다. 가족을 다시 체크인하는 것은 따라서 멱등원적인 "이것이 현재 상태" 작업이며, 추가가 아닙니다. `?checkDuplicates=true`를 대신 전달하면 쓰지 않고 `{ duplicates: [personId…] }`를 반환하므로, 키오스크는 덮어쓰기 전에 경고합니다.
4. **배치당 하나의 보안 코드를 생성합니다.** `SecurityCodeHelper.generate()`는 알파벳 `23456789BCDFGHJKLMNPQRSTVWXYZ`(모음이나 모호한 문자 없음)에서 4자 코드를 생성하므로 코드는 단어를 철자할 수 없거나 오독할 수 없습니다. 서버는 동일한 교회의 동일한 날 미확인 방문에 대해 충돌을 재시도하고 배치의 모든 방문에 코드를 스탐프합니다.
5. **`{ streaks, securityCode }`를 반환합니다.** `streaks`는 personId를 연속 주 출석 수에 매핑합니다; 키오스크는 마일스톤 (5주마다)을 축제로 축하합니다.

저장된 각 방문은 또한 `attendance.recorded` webhook을 내보냅니다. 읽기 측, `GET /attendance/visits/checkin`은 사람들의 **마지막 로그된 날짜**에서의 방문을 반환합니다 — 이전 주였다면 ID가 제거되므로 클라이언트는 지난주 방 선택의 미리 채워진 복사본을 받고 새 기록으로 저장됩니다.

### 체크아웃

두 endpoint이 루프를 완성합니다 (`VisitController`):

- `GET /attendance/visits/code/:code` — 그 보안 코드를 수행하는 오늘의 아직 체크아웃하지 않은 방문 세션 채움.
- `POST /attendance/visits/checkout` — 본문 `{ visitIds, checkedOutBy?, checkedOutById? }`; `checkoutTime`과 누가 픽업했는지를 스탐프하고 각 방문에 대해 `attendance.checkout` webhook을 내보냅니다.

권한: 키오스크는 `attendance.checkin`으로 인증하며, 정확히 체크인/체크아웃/라벨 템플릿 표면을 제공합니다; `attendance.view`/`attendance.edit`은 보고 및 수동 항목을 다룹니다; 구조 (서비스, 서비스 시간, 그룹 할당)에는 `services.edit`이 필요합니다. 멤버 셀프 체크인 (B1App)은 권한이 필요하지 않습니다: 교회의 연결된 사람을 가진 모든 인증된 사용자는 `GET`/`POST /attendance/visits/checkin`을 호출할 수 있으며, 서버는 제출된 `personId`를 발신자의 자신의 가족으로 제한합니다 (그렇지 않으면 403 — 이 울타리는 다른 가족의 `securityCode`를 읽을 수 없게 하는 것입니다). 멤버십이 허가입니다; 멤버가 **기능을 보는지 여부는** 교회의 B1App 네비게이션 탭에 의해 제어됩니다. 다른 체크인 endpoint (`code/:code`, `checkout`, `guardians`, `CheckinController`)는 키오스크/직원 전용으로 남습니다.

## 그룹이 방 라우팅을 주도합니다

시스템의 어디에도 방이나 교실 항목이 없습니다. "방"은 멤버십 **그룹**이며 `trackAttendance`가 활성화되어 있고, `groupServiceTimes`를 통해 하나 이상의 서비스 시간에 연결됩니다. 그룹 필드 (`Api/src/modules/membership/models/Group.ts`)는 키오스크 동작을 형성합니다:

| 필드 | 효과 |
|------|--------|
| `trackAttendance` | 그룹이 모든 출석에 참여합니다; B1Admin의 설정 트리는 `groupServiceTimes` 행이 없는 `trackAttendance` 그룹을 할당되지 않은 것으로 표시합니다 |
| `parentPickup` | 아동 방을 표시합니다: 체크인하면 가족 픽업 라벨을 인쇄하고 보안 코드를 이름표에 넣습니다 |
| `printNametag` | 이 그룹에 체크인이 이름표를 인쇄하는지 여부 |
| `capacity` / `guestCapacity` / `checkinClosed` | 방 용량 제한 및 하드 "닫힘" 스위치, 체크인 제한에 의해 서버 측에서 실행됨 (B1Admin의 그룹 설정에서 "체크인 용량" 아래에서 편집) |
| `volunteerRatio` / `minVolunteers` | 아동당 자원봉사자 비율 및 최소 자원봉사자 수, 교회 전체 `ratioEnforcement` 설정에 따라 실행됨 |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | 키오스크 측에서 평가되는 나이/학년 적격성 범위로 방을 강조 또는 희미하게 처리 |

모든 클라이언트는 동일한 방식으로 역정규화합니다 (예: `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): 병렬로 `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, 그리고 `GET /membership/groups`를 로드한 후, 각 서비스 시간에 대해 `groupServiceTimes` 행이 이를 가리키는 그룹을 수집하여 `serviceTime.groups`에 넣습니다. 그 배열은 방 선택기가 표시하는 것이며, 그룹 `categoryName`으로 구성됩니다.

할당은 B1Admin의 그룹 페이지에서 편집됩니다 (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), 그리고 전체 Campus → Service → Service Time → Group 트리는 `B1Admin/src/attendance/components/AttendanceSetup.tsx`에서 `GET /attendance/attendancerecords/tree`를 통해 시각화됩니다.

:::info
그룹이 단일 소스이기 때문에, 동일한 그룹 멤버십은 키오스크 라우팅, B1Admin의 그룹 페이지에서 명부 스타일 출석, 그리고 출석 보고에 전력을 공급합니다 — 그룹을 서비스 시간에 할당하는 것은 그것을 체크인 대상으로 만드는 유일한 단계입니다.
:::

## 아동 안전

### 체크인 유형

모든 방문은 `checkinType` — `member`, `guest`, 또는 `volunteer` (NULL은 레거시/멤버를 의미; 마이그레이션 `tools/migrations/attendance/2026-07-03_checkin_type.ts`)를 수행합니다. 유형은 **키오스크 측에서** 선택됩니다: 확장된 멤버 행의 멤버 / 손님 / 자원봉사자 칩 (`B1Checkin/src/components/MemberServiceTimes.tsx`), 완료에서 각 대기 방문에 스탐프 (`app/checkinComplete.tsx`, 기본값 `member`). 서버는 제한에서 소비합니다 — 자원봉사자는 용량을 위반하지 않고 비율 적용을 향해 계산되며, 손님은 `guestCapacity`를 위반합니다.

### 용량 및 자원봉사자 비율 제한

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`)는 postCheckin 내에서 어떤 저장 전에 실행됩니다 (endpoint는 비트랜잭션이므로, 저장 전 제한이 정확성 메커니즘입니다). 현재 점유율을 대상 그룹별로 로드하고 (`VisitRepo.countActiveByGroupToday`) 멤버십 모듈 게이트웨이를 통해 그룹 구성을 로드한 후, 위반을 분류합니다:

- **하드 (항상 차단):** `checkinClosed`, `current + incoming > capacity`, 손님 수 초과 `guestCapacity`. 배치는 `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`로 거부됩니다 — 키오스크는 명명된 방을 보여줍니다.
- **비율 (경고 또는 차단):** 자원봉사자가 아닌 들어오는 사람이 `volunteers < minVolunteers`, 자원봉사자가 전혀 없거나, `children > volunteers × volunteerRatio`인 방으로. 심각도는 교회별 설정 `ratioEnforcement` (`"warn"` 기본값 / `"block"`, B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`에서 편집)를 따릅니다. 경고 모드는 클라이언트가 `acknowledgeWarnings=true`로 다시 제출하지 않으면 `409 { warning: true, error: "ratio", … }`를 반환합니다 — 그 재제출은 키오스크의 직원 확인 재정의입니다.

### 나이/학년 적격성 (키오스크 측)

방 적격성은 조언 UI이며, 키오스크에서 평가되고 서버에서 실행되지 않습니다. `B1Checkin/src/helpers/EligibilityHelper.ts`는 사람의 생년월일/학년을 그룹의 `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade`와 비교합니다 (학년 순서: PreK, K, 1–12, Graduated) 그리고 `eligible` / `ineligible` / `unknown`을 반환합니다 — 누락된 데이터는 `unknown`을 산출하고 절대로 방을 숨기지 않습니다. 나이 및 학년은 교회의 **학년 진급 날짜** 기준으로 계산됩니다 (`gradePromotionDate` 설정, `"MM-DD"`, `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`에서 편집); 키오스크는 `GET /attendance/checkin/settings`에서 페치하고, `resolveAsOfDate`는 오늘 또는 오늘 이전의 가장 최근 발생을 선택합니다. 방 선택기는 적격 방을 강조하고 부적격한 방을 희미하게 처리합니다; 희미한 방을 선택하려면 직원 확인이 필요합니다.

### 신뢰할 수 있는 및 승인되지 않은 픽업

픽업 사람은 멤버십 항목이며, 가족별: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, optional personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD는 `GET /membership/householdpickup/:householdId` (모든 인증된 교회 사용자이므로 키오스크가 읽을 수 있음) 더하기 `POST` / `DELETE` `people.edit`로 제한됩니다. 직원은 사람 페이지의 **픽업** 카드에서 목록을 관리합니다 (`B1Admin/src/people/components/PickupPeople.tsx`) — 사진, 관계, 그리고 신뢰할 수 있음/승인되지 않음 상태 칩.

체크아웃 시 (`B1Checkin/app/checkout.tsx`) 키오스크는 가족의 픽업 목록을 로드합니다: `trusted` 항목은 가족 성인 사진 그리드 옆에 탭 가능한 픽업 카드로 렌더링되고, 자유 입력 "기타" 이름은 퍼지 매칭됩니다 (Levenshtein, `src/helpers/PickupMatchHelper.ts`) `notAuthorized` 항목에 대해 — 매치는 경고 시트로 체크아웃을 차단하고 직원 **재정의** 버튼이 있습니다. 재정의는 방문 자체에 로그됩니다: 정상적인 `POST /attendance/visits/checkout`를 통해 `checkedOutBy`를 `"OVERRIDE: {name}"`으로 게시하므로, 출석 기록 및 `attendance.checkout` webhook에 도착하기보다는 별도의 감사 표에 도착합니다.

### 부모에게 호출 및 긴급 방송

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`)은 두 SMS endpoint를 노출합니다:

- `POST /page` — `{ visitId, message }`: 체크인한 한 아이의 보호자를 호출합니다 (키오스크 체크아웃 화면, 직원 배치 모드).
- `POST /broadcast` — `{ serviceId, message }`: 서비스에 대한 모든 체크인한 가족의 성인에게 텍스트 메시지를 보냅니다 (키오스크 관리자 설정, type-`EMERGENCY`-to-confirm 시트 뒤의 `B1Checkin/app/adminSettings.tsx`).

둘 다 멤버십 게이트웨이를 통해 가족 성인을 해결한 후, **`MessagingModuleGateway.sendBulkText`**로 배송을 전달합니다 (`Api/src/shared/modules/MessagingModuleGateway.ts`) — 교회의 구성된 문자 메시지 공급자로의 교차 모듈 도어 (`@churchapps/texting`: TextInChurch, Clearstream, 또는 MutualMinistry; 기본 제공 SMS 발신자가 없습니다). 게이트웨이는 `sentText` 행 더하기 수신자별 `deliveryLog` 항목을 로그하고 배치를 500 수신자로 제한합니다; 구성된 공급자가 없으면 `no_provider`를 반환하며, 키오스크는 "SMS 공급자 구성되지 않음"으로 표시합니다. controller의 `dispatch()`는 전화 번호를 중복 제거하고 모바일이 없거나 `optedOut`가 설정된 사람을 건너뛰며, `{ sent, failed, skippedOptedOut, skippedNoPhone }`을 반환하므로 키오스크는 건너뛴 것을 표시할 수 있습니다.

## 키오스크 (B1Checkin)

화면은 `B1Checkin/app/` 아래의 expo-router 파일입니다; 교차 화면 상태는 정적 `CachedData` 클래스 (`src/helpers/CachedData.ts`)에 있으며, React 상태가 아닙니다.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **조회** (`app/lookup.tsx`) — 전화 (`GET /membership/people/search/phone?number=`, 마지막 4자리 또는 전체) 또는 이름 (`GET /membership/people/search?term=`)으로 검색합니다. 일치를 선택하면 가족을 로드합니다 (`GET /membership/people/household/{householdId}`) 그리고 기존 방문 (`GET /attendance/visits/checkin`), `pendingVisits`를 지난주 선택으로 시딩합니다.
2. **가족 검토** (`app/household.tsx`, `src/components/MemberList.tsx`) — 각 멤버 행은 이미 체크인한 배지, 알레르기/`nametagNotes` 배지, 그리고 그들의 현재 방 칩을 보여줍니다. 멤버를 확장하면 모든 서비스 시간을 나열하고 방 버튼 더하기 멤버 / 손님 / 자원봉사자 체크인 유형 칩을 나열합니다 (`MemberServiceTimes.tsx`). 각 서비스 시간 이름 아래, `ServiceTimeHelper.getGroupSummary()`는 그곳에서 제공되는 그룹을 보여줍니다 (`serviceTime.groups` 이름, 정리됨, 중복 제거됨 대소문자 무시, 쉼표 결합); 시간에 그룹이 없으면 아무 것도 렌더링되지 않습니다.
3. **그룹 할당** (`app/selectGroup.tsx`) — `serviceTime.groups`에서 구축된 카테고리 트리, 나이/학년 적격 방은 강조되고 부적격한 방은 직원 확인 뒤로 희미합니다 ([나이/학년 적격성](#agegrade-eligibility-kiosk-side) 참조); 방을 선택하면 `{ session: { serviceTimeId, groupId } }` visitSession을 그 사람의 대기 방문에 씁니다 (`src/helpers/VisitSessionHelper.ts`). "없음"은 이를 지웁니다.
4. **완료** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` with `pendingVisits` (각각 its `checkinType`으로 스탐프됨), 그 후 프린터가 구성되어 있으면 라벨을 인쇄하고 조회로 자동 반환합니다. `409` 용량 응답은 이름 지은 가득 참/닫힘 방을 보여줍니다; 비율 경고는 `acknowledgeWarnings=true`로 다시 제출하는 직원 확인을 제공합니다.

**체크아웃** 화면 (`app/checkout.tsx`)은 자동 포커된 입력을 통해 4자 보안 코드를 수락합니다 — USB/Bluetooth 키보드 웨지 바코드 스캐너가 카메라 없이 작동합니다 — 또는 동일한 알파벳을 사용하는 온화면 키패드로, 4자에서 자동 제출합니다. **스캔** 버튼은 공유 `src/components/CodeScanner.tsx` 카메라가 있는 시트를 열고 (기본적으로 뒤쪽 대향, QR, Code 128, Code 39 허용) 웨지 스캐너가 없는 스테이션이 픽업 라벨을 읽을 수 있습니다; 스캔된 코드는 동일한 `handleCode()` 경로에 공급됩니다 입력과 같이. 코드를 조회하고, 픽업되는 아이들을 보여주고, 가족의 **신뢰할 수 있는 픽업 사람**을 가족 성인 사진 그리드 옆의 탭 가능한 카드로 제시합니다 (더하기 "기타" 자유 입력 옵션이 승인되지 않은 이름에 대해 퍼지 확인됨 — [신뢰할 수 있는 및 승인되지 않은 픽업](#trusted-and-not-authorized-pickup) 참조), 그 후 `POST /attendance/visits/checkout`를 픽커의 이름/ID로 게시합니다. 직원 배치 모드에서 화면은 또한 **부모에게 호출** (`POST /attendance/checkin/page`) 그리고 **보안 라벨 재인쇄** — `reprint()`는 `LabelHelper.getAllLabelsFor(...)`로 가족의 라벨을 다시 구축하고 체크인과 동일한 `PrintUI` 파이프라인을 통해 공급합니다.

스테이션 성격은 AsyncStorage 플래그 `@StationMode` (`"self"` | `"manned"`, `app/adminSettings.tsx`에서 토글됨)입니다. 직원 배치 모드는 조회 화면에 체크아웃 진입점을 추가하고 가족 화면에서 멤버별 프로필 편집을 추가합니다 (`POST /membership/people`). 키오스크 경화는 기본 제공됩니다: 선택적 PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`)은 관리자 및 프린터 화면을 제한하고, 관리자 화면은 헤더 로고의 빠른 7 탭을 통해서만 열리며, 유휴 어트랙트 화면 (`src/hooks/useInactivityTimer.ts`)은 가족 사이에 인수합니다.

## 셀프 체크인 (B1App)

멤버는 b1.church 포털의 `/mobile/checkin` 화면에서 체크인합니다 (`B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx`에서 `screens/CheckinPage.tsx`로 라우팅됨). 로그인한 사용자가 필요하며 키오스크와 동일한 네 단계를 수행합니다 — 서비스 → 가족 → 그룹 → 완료 — 동일한 endpoint에 대해, 상태는 `B1App/src/helpers/CheckinHelper.ts`에서 유지됩니다. 키오스크와의 차이점: 가족은 로그인한 사용자의 자신의 `householdId`에서 나옵니다 (검색 단계 없음), 그리고 라벨 인쇄가 없습니다 — 대신 완료 화면은 배치의 보안 코드를 QR로 표시합니다 (`qrcode.react`) "체크인 스테이션에서 이것을 보여주세요" 힌트가 있습니다. 가족이 페이지가 로드될 때 이미 체크인되어 있으면, "체크인 코드 보기" 버튼은 `securityCode`를 수행하는 첫 번째 기존 방문 (from `GET /attendance/visits/checkin`)에서 QR을 다시 표시합니다. 체크인은 제출 시간에 즉시 기록됩니다 (대기 상태가 없습니다); QR은 키오스크에서만 라벨 인쇄를 주도합니다.

**휴대폰에서 키오스크로 라벨 인쇄** (`B1Checkin/app/scan.tsx`, 조회 화면의 QR "코드 스캔" 버튼에서 도달): 키오스크는 QR 코드를 스캔하는 `CodeScanner` (an `expo-camera` `CameraView`, 기본적으로 앞쪽 향, 뒤집을 수 있음)을 보여줍니다. `ScanCodeHelper.parse()`는 보안 코드 알파벳에 있는 맨 4자 코드인 경우에만 페이로드를 수락하고, `ScanCodeHelper.isRepeat()`은 같은 코드를 4초 동안 무시하므로 B1App QR 및 인쇄된 라벨의 QR 모두 작동합니다. 화면은 그 후 체크아웃 재인쇄 경로를 따릅니다 — `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI` — 그리고 조회로 반환됩니다. 스캔 시에는 출석 쓰기가 발생하지 않습니다; 라벨만. 활성 방문이 없는 코드, 프린터가 없는 스테이션, 그리고 라벨이 없는 그룹은 각각 토스트를 표시하고 조회로 반환합니다.

타입 및 `ApiHelper`/`ArrayHelper`는 `@churchapps/helpers` 및 `@churchapps/apphelper`에서 나옵니다; React 컴포넌트는 B1Admin과 공유되지 않습니다.

## 관리자측 출석 (B1Admin)

- **설정** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`)은 구조 트리를 렌더링하고 서비스를 생성합니다 (`ServiceEdit.tsx`) 그리고 서비스 시간 (`ServiceTimeEdit.tsx`). 캠퍼스 데이터는 `useCampuses()` 훅을 통해 멤버십에서 나옵니다.
- **수동 출석**은 출석 섹션이 아닌 그룹 측에 있습니다: `B1Admin/src/groups/components/GroupSessionsTab.tsx`는 세션을 생성합니다 (`POST /attendance/sessions`; 추가할 때 `SessionEdit.tsx`는 선택한 서비스 시간을 공유하는 다른 그룹당 하나 세션을 포함할 수 있으며, 그 날에 이미 세션이 있는 그룹을 건너뜁니다) 그리고 `POST /attendance/visitsessions/log`를 통해 사람을 표시합니다, 이는 그 사람과 세션의 방문을 찾거나 생성합니다. 그룹 리더는 `attendance.edit` 권한이 없이 자신의 그룹에 대한 출석을 기록할 수 있습니다 — 컨트롤러는 `au.leaderGroupIds`를 확인합니다.
- **보고** — 출석 추세 및 그룹 출석은 서버 정의 보고입니다 (`B1Admin/src/components/reporting/ReportWithFilter.tsx` ReportingApi에 대해; 정의는 `Api/reports/*.json`). 둘 다 `startDate`/`endDate`를 가집니다 (종료 날짜 포함); 추세 보고는 1년 전부터 오늘까지 기본값으로 지정되고 주당 `sessionDates` 열을 추가하며, 그룹 출석의 화면상 트리는 각 방문의 `checkinTime` 및 사람의 `membershipStatus`를 포함합니다. 그룹 출석의 CSV는 동반 `groupAttendanceDownload` 보고에서 나옵니다, `GroupAttendanceDownloadHelper`에 의해 피벗되고 그룹 멤버당 한 행 및 날짜 세션당 현재/부재 열; 개인별 이력은 `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`).

## 라벨 인쇄

### 템플릿 및 디자이너

교회는 B1Admin의 `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, 체크인 설정 페이지에서 도달)에서 자신의 라벨을 설계합니다. 템플릿은 `labelTemplates` 행이며 `content`는 블록의 JSON 배열입니다 — `text`, `field`, `barcode`, `qrcode`, 또는 `box` — 각각 백분율 좌표로 위치되며 글꼴, 정렬, 기호학 (`code39`/`code128`/`qr`), 그리고 선택적 가시성 조건이 있습니다 (예: `person.nametagNotes`가 비어있지 않을 때만 알레르기 상자를 렌더링합니다). 두 `labelType`이 존재합니다: `nametag` (체크인한 각 사람당 하나; `person.displayName`, `sessions`, `securityCode`, 그리고 `person.isBirthdayWeek` 같은 필드 -- `"true"` when the birthday's month/day is within 3 days of today, wrapping across year end, computed by `LabelHelper.isBirthdayWithin()`) 그리고 `pickup` (가족당 하나; `children`, `childrenAllergies` 같은 필드). 서버는 교회별 타입당 하나의 기본값을 실행합니다 (`LabelTemplateController.save`). 디자이너는 키오스크의 번들 라벨을 미러링하는 스타터 템플릿을 배송하고 샘플 데이터에 대해 미리봅니다.

### 키오스크에서 렌더링 및 인쇄

체크인 완료 시, `B1Checkin/src/helpers/LabelHelper.ts`는 각 대기 방문의 그룹 플래그에서 인쇄할 내용을 결정합니다: `printNametag` 그룹용 이름표, 더하기 모든 방문이 `parentPickup` 그룹을 맞추면 하나의 가족 픽업 라벨. `checkinType` `volunteer`를 가진 방문은 `LabelHelper.selectChildVisits()`에 의해 건너뛰므로, 부모 픽업 방의 아동 보육 노동자는 절대로 픽업 라벨을 트리거하지 않습니다. 체크인 응답의 보안 코드는 아동 이름표 및 픽업 라벨에 나타납니다; 성인 이름표는 코드 없이 인쇄됩니다. 교회에 템플릿이 있으면, `LabelRenderer` (`src/helpers/LabelRenderer.ts`)는 블록 + 필드 컨텍스트를 독립형 HTML 문서로 변환합니다; 그렇지 않으면 `B1Checkin/assets/labels/`의 번들 HTML 라벨이 자리표시자 대체로 사용됩니다.

바코드는 `B1Checkin/src/helpers/barcode.ts`의 순수 TypeScript 인코더에 의해 인라인 SVG로 생성됩니다 — Code 39 패턴 표 및 Code 128 (code set B with mod-103 checksum) 너비 표, 더하기 `qrcode` 패키지를 통한 QR. **이 인코더는 의도적으로 B1Admin에서 중복됩니다** (`LabelEditor.tsx` inlines the same tables, noted in a code comment) so designer previews are pixel-faithful to kiosk output; a change to one must be mirrored in the other.

인쇄 파이프라인 (`src/components/PrintUI.tsx`)은 각 HTML 라벨을 `WebView`에서 렌더링하고, `react-native-view-shot`를 통해 JPG로 캡처하고, 이미지 URI를 기본 **printer-helper** Expo 모듈 (`B1Checkin/modules/printer-helper/`)로 전달합니다. 모듈은 `scan()`, `checkInit()`, `printUris()`, 및 상태 이벤트를 노출하며, 두 플랫폼 모두에서 브랜드별 공급자:

| 브랜드 | Android | iOS | 주석 |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother print SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL 시리즈 네트워크 프린터 (QL-800/810W/820NWB/1100/1110NWB…), 다이컷 29×90 라벨, 권장 기본값 |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | 네트워크 검색 + TCP/ZPL 이미지 인쇄 |

프린터 선택은 `app/printers.tsx`에 있으며 (네트워크 스캔은 `brand~model~ip` 항목을 반환합니다; 선택은 AsyncStorage에 유지됩니다), 그리고 `src/helpers/PrinterLog.ts`는 키오스크 헤더의 라이브 상태 점을 통해 표시되는 온디바이스 진단 로그를 유지합니다.

## 손님 등록

두 경로는 체크인 중반에 사람을 생성합니다:

- **키오스크에서** — 가족 화면의 "손님 추가"는 `B1Checkin/app/addGuest.tsx`를 열고, 이는 먼저 `GET /membership/people/search?term=`에서 기존 비멤버 일치를 검색하고 그렇지 않으면 `POST /membership/people`로 하나를 생성하며, 현재 가족에 첨부합니다. 손님은 그 후 모든 멤버처럼 그룹 할당을 따릅니다.
- **QR을 통한 셀프 서비스** — 교회 설정 `enableQRGuestRegistration`이 켜져 있으면 (B1Admin의 체크인 설정에서 구성됨, `GET /membership/settings/public/{churchId}`에서 읽음), 키오스크 조회 화면은 `https://{subdomain}.b1.church/guest-register?serviceId=`에 링크하는 QR 코드를 보여줍니다. B1App 페이지 (`src/app/[sdSlug]/(public)/guest-register/page.tsx`)는 방문 가족이 익명 `POST /membership/people/guest-register` endpoint를 통해 자신의 휴대폰에서 자신을 등록할 수 있게 하며, 키오스크 라인을 움직입니다. QR 시트는 또한 동일한 페이지를 키오스크에서 열기 위한 **여기 등록** 버튼을 가지고 있습니다 (`app/guestRegister.tsx`) 시크릿, 캐시 비활성화 `WebView`에서; `src/helpers/GuestRegisterHelper.ts`는 QR 및 WebView 모두를 위한 URL을 구축하고 `https://{subdomain}.b1.church/guest-register`에서 네비게이션을 차단합니다. 화면은 **완료**, 뒤로, 또는 120초의 비활성 시간 (양식 입력은 WebView에서 활동으로 중계됨)에서 조회로 팝합니다, WebView를 언마운트하므로 한 가족의 항목은 절대로 다음 항목에 도달하지 않습니다.

## 관련 페이지

- [Attendance Endpoints](../api/endpoints/attendance) -- 캠퍼스, 서비스, 세션, 방문 및 방문 세션에 대한 전체 REST 표면
- [Membership Endpoints](../api/endpoints/membership) -- 사람, 가족 및 그룹
- [Webhooks](../api/webhooks) -- `session.created`, `attendance.recorded`, 및 `attendance.checkout` 이벤트
- [Module Structure](../api/module-structure) -- 출석 모듈이 서버 측에서 어떻게 조직되는지
