---
title: "체크인"
---

# 체크인

<div class="article-intro">

체크인은 세 가지 정문이 있는 하나의 시스템입니다. B1Checkin 키오스크 앱 (관리자가 있는 및 셀프서빙 스테이션용), B1App 회원 포털 내 셀프 체크인, 그리고 B1Admin의 관리자 측 참석. 세 가지 모두 코어 Api의 같은 참석 모듈에 기록되고, 교실 라우팅은 전적으로 그룹에 의해 구동됩니다. 별도의 "위치" 또는 "실" 엔터티가 없습니다. 어린이 안전 계층이 맨 위에 있습니다: 방문별 체크인 유형, 서버 측 수용 인원 및 자원봉사자 비율 게이트, 키오스크 측 나이/학년 적격성, 체크아웃 시 신뢰할 수 있는 픽업 확인, 교회의 문자 전송 서비스를 통한 보호자 호출. 이 페이지는 데이터 모델, 체크인 흐름, 안전 계층, 라벨 인쇄 파이프라인을 매핑합니다.

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
|------|--------|------|------|
| 키오스크 | `B1Checkin` | Expo / React Native, expo-router 파일 라우팅; EAS builds for Android, Amazon Fire, and iOS; `expo-updates`를 통한 OTA 업데이트 | 라벨 인쇄 및 확인된 체크아웃이 있는 관리자가 있는 또는 셀프서빙 스테이션 |
| 셀프 체크인 | `B1App` | Next.js (b1.church 회원 포털) | 로그인한 회원이 전화에서 가구를 체크인합니다. 인쇄 없음 |
| 관리자 | `B1Admin` | React SPA | 서비스 구조를 구성하고, 그룹을 서비스 시간에 할당하고, 라벨을 설계하고, 수동 참석을 기록하고, 보고서를 실행합니다. |

세 가지 모두 `ApiHelper`를 통해 두 개의 동일한 API 모듈을 호출합니다: **MembershipApi** (`/membership`) 사람, 가구, 그룹용; **AttendanceApi** (`/attendance`) 아래 모든 것.

## 데이터 모델 (`Api/src/modules/attendance`)

| 엔터티 / 테이블 | 주요 필드 | 의미 |
|----------------|----------|------|
| `campuses` | name, address | 여기서는 더 이상 사용되지 않음. 캠퍼스는 멤버십 모듈에서 마스터링됩니다 (`/membership/campuses`); 참석 사본은 레거시 판독기에 대해 읽기 전용으로 고정됩니다 (`models/Campus.ts`) |
| `services` | campusId, name | 반복되는 모임, 예: "일요일 아침" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name | 서비스 내 시간 슬롯, 예: "오전 9:00" (`models/ServiceTime.ts`) |
| `groupServiceTimes` | groupId, serviceTimeId | 조인 테이블: 어떤 그룹(교실)이 어떤 서비스 시간을 충족하는지 (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | 한 명의 그룹이 한 날짜에 만나는 것. 체크인 시간에 게으르게 생성됨 (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | 한 명의 사람이 한 날짜에 참석합니다 (`models/Visit.ts`). `checkinType`은 `member` / `guest` / `volunteer` (NULL = 레거시 회원)이며, 키오스크에서 설정하고 수용 인원/비율 게이트에서 사용됩니다 |
| `visitSessions` | visitId, sessionId | 방문이 포함하는 세션 — 한 어린이가 두 서비스 시간으로 체크인하면 두 행이 있습니다 (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | 설계 가능한 라벨 레이아웃 (`models/LabelTemplate.ts`) |

### 완료된 체크인이 유지되는 방법

`VisitController.postCheckin` (`Api/src/modules/attendance/controllers/VisitController.ts`)은 `POST /attendance/visits/checkin?serviceId=&peopleIds=`를 처리합니다. 본문은 `visitSessions`를 전달하는 `Visit` 객체의 배열이고 임베드된 `session`은 `(serviceTimeId, groupId)` 쌍의 이름만 지정합니다. 서버는 다음을 수행합니다.

1. **모든 쓰기 전에 수용 인원 및 비율을 게이트합니다.** `evaluateGates()` → `CheckinGateHelper.evaluate()`는 각 대상 실의 수용 인원, 게스트 수용 인원, 닫힌 플래그, 현재 점유에 대한 자원봉사자 비율을 확인합니다. postCheckin은 **트랜잭션이 아니므로** 게이트는 첫 번째 저장 전에 실행해야 합니다. 심각한 위반은 409를 반환하고 위반 실의 이름을 지정하며 아무것도 지속되지 않습니다. [수용 인원 및 자원봉사자 비율 게이트](#capacity-and-volunteer-ratio-gates)를 참조하세요.
2. **세션을 게으르게 해결합니다.** `getSessionId()`는 `(groupId, serviceTimeId, today)`에 대한 `sessions` 행을 찾거나 생성합니다. 세션 id는 날짜별로 프로세스에서 캐시됩니다. 새 세션은 `session.created` webhook을 방출합니다. 루프는 대기된 `for..of`입니다. 이전 "발사 및 잊기" `forEach(async …)`가 저장과 경합하고 첫 번째 세션 생성에 NULL sessionId를 기록했습니다 (수정됨; 루프의 코드 댓글에 주석 달음).
3. **당일 기록을 바꿉니다.** 그 사람들이 그 서비스에서 오늘 방문한 기존 기록은 visitSessions와 함께 삭제된 후 제출된 세트가 저장됩니다. 가족을 다시 체크인하는 것은 따라서 멱등원 "이것이 현재 상태입니다" 작업이며 추가가 아닙니다. `?checkDuplicates=true`를 전달하면 대신 쓰기 없이 `{ duplicates: [personId…] }`를 반환하고 이것이 키오스크가 덮어쓰기 전에 경고하는 방법입니다.
4. **배치당 하나의 보안 코드를 생성합니다.** `SecurityCodeHelper.generate()`는 알파벳 `23456789BCDFGHJKLMNPQRSTVWXYZ`에서 4자리 코드를 생성합니다 (모음이나 모호한 문자가 없으므로 코드는 단어를 철자 할 수 없고 잘못 읽을 수 없습니다). 서버는 동일한 교회의 동일 날짜 공개 방문에 대해 충돌을 다시 시도하고 배치의 모든 방문에 코드를 찍습니다.
5. **`{ streaks, securityCode }`를 반환합니다.** `streaks`는 personId를 연속 주간 참석 수에 매핑합니다. 키오스크는 마일스톤 (5주마다)을 축제로 축하합니다.

저장된 각 방문도 `attendance.recorded` webhook을 방출합니다. 읽기 쪽 `GET /attendance/visits/checkin`은 **마지막 기록 날짜**로부터 사람의 방문을 반환합니다. 지난주였으면 id가 제거되므로 클라이언트는 새 기록으로 저장할 지난주의 실 선택의 미리 채워진 사본을 수신합니다.

### 체크아웃

두 엔드포인트가 루프를 완료합니다 (`VisitController`):

- `GET /attendance/visits/code/:code` — 세션이 채워진 그 보안 코드를 전달하는 오늘 아직 체크아웃되지 않은 방문.
- `POST /attendance/visits/checkout` — 본문 `{ visitIds, checkedOutBy?, checkedOutById? }`; `checkoutTime` 및 누가 픽업했는지를 찍고 방문당 `attendance.checkout` webhook을 방출합니다.

권한: 키오스크는 `attendance.checkin`으로 인증하고 정확히 체크인/체크아웃/라벨-템플릿 표면을 부여합니다. `attendance.view`/`attendance.edit`은 보고 및 수동 항목을 포함합니다. 구조 (서비스, 서비스 시간, 그룹 할당)는 `services.edit`을 요구합니다.

## 그룹은 실 라우팅을 구동합니다

시스템 어디에도 실이나 교실 엔터티가 없습니다. "실"은 `trackAttendance`가 활성화된 멤버십 **그룹**이고, `groupServiceTimes`를 통해 하나 이상의 서비스 시간에 연결됩니다. 키오스크 동작을 형성하는 그룹 필드 (`Api/src/modules/membership/models/Group.ts`):

| 필드 | 효과 |
|------|------|
| `trackAttendance` | 그룹은 어디서나 참석에 참여합니다. B1Admin의 설정 트리는 `groupServiceTimes` 행이 없는 `trackAttendance` 그룹을 할당 해제로 표시합니다 |
| `parentPickup` | 어린이 실을 표시합니다: 어린이에게 체크인하면 방문이 "어린이" 방문이 되고 가족 픽업 라벨을 인쇄하고 보안 코드를 이름표에 씁니다 |
| `printNametag` | 이 그룹으로 체크인이 이름표를 인쇄하는지 여부 |
| `capacity` / `guestCapacity` / `checkinClosed` | 실 수용 인원 제한 및 하드 "닫힘" 스위치, 체크인 게이트에서 서버 측으로 시행됨 (B1Admin의 그룹 설정 "체크인 수용 인원" 아래에서 편집됨) |
| `volunteerRatio` / `minVolunteers` | 교회 전체 `ratioEnforcement` 설정에 따라 자원봉사자 비율 및 최소 자원봉사자 인원 |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | 키오스크 측에서 평가된 나이/학년 적격성 범위로 실을 강조하거나 희미하게 합니다 |

모든 클라이언트는 같은 방식으로 정규화됩니다 (예: `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`): `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, `GET /membership/groups`를 병렬로 로드한 후 각 서비스 시간에 대해 `groupServiceTimes` 행이 그것을 가리키는 그룹을 수집하여 `serviceTime.groups`로 넣습니다. 그 배열이 실 선택기가 표시하는 것으로 그룹 `categoryName`별로 구성됩니다.

할당은 B1Admin의 그룹 페이지에서 편집됩니다 (`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`), 전체 Campus → Service → Service Time → Group 트리는 `GET /attendance/attendancerecords/tree`를 통해 `B1Admin/src/attendance/components/AttendanceSetup.tsx`에서 시각화됩니다.

:::info
그룹이 유일한 진실의 원천이므로 같은 그룹 회원 자격이 키오스크 라우팅, B1Admin의 그룹 페이지의 명부 스타일 참석, 참석 보고를 구동합니다. 그룹을 서비스 시간에 할당하는 것은 체크인 목적지로 만드는 유일한 단계입니다.
:::

## 어린이 안전

### 체크인 유형

모든 방문은 `checkinType` — `member`, `guest`, 또는 `volunteer` (NULL은 레거시/회원을 의미합니다; 마이그레이션 `tools/migrations/attendance/2026-07-03_checkin_type.ts`)를 전달합니다. 유형은 **키오스크 측**에서 선택됩니다: 확장된 회원 행에서 회원 / 게스트 / 자원봉사자 칩 (`B1Checkin/src/components/MemberServiceTimes.tsx`), 완료 시 각 보류 방문에 찍힘 (`app/checkinComplete.tsx`, 회원으로 기본값). 서버는 게이트에서 이를 사용합니다. 자원봉사자는 수용 인원에 대해 비율 보장을 세어지고 게스트는 `guestCapacity`에 대해 세어집니다.

### 수용 인원 및 자원봉사자 비율 게이트

`CheckinGateHelper.evaluate()` (`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`)은 저장 전에 `postCheckin` 내부에서 실행됩니다 (엔드포인트는 트랜잭션이 아니므로 게이팅-전-저장이 정확성 메커니즘입니다). 이는 대상 그룹당 현재 점유를 로드하고 (`VisitRepo.countActiveByGroupToday`) 멤버십 모듈 게이트웨이를 통해 그룹 구성을 로드한 후 위반을 분류합니다.

- **하드 (항상 차단):** `checkinClosed`, `current + incoming > capacity`, 게스트 수 `guestCapacity`를 초과합니다. 배치는 `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`로 거부됩니다. 키오스크가 이름을 붙인 실을 표시합니다.
- **비율 (경고 또는 차단):** 비자원봉사자를 `volunteers < minVolunteers`인 실로 오면, 자원봉사자가 전혀 없거나, `children > volunteers × volunteerRatio`입니다. 심각도는 교회 설정 `ratioEnforcement` (`"warn"` 기본값 / `"block"`, B1Admin Manage Church → Check-In에서 편집됨, `CheckinSettingsEdit.tsx`)를 따릅니다. 경고 모드는 `409 { warning: true, error: "ratio", … }`를 반환합니다. 클라이언트가 `acknowledgeWarnings=true`로 다시 제출하지 않는 한. 그 재제출은 키오스크의 직원 확인 무시입니다.

### 나이/학년 적격성 (키오스크 측)

실 적격성은 자문 UI이며 키오스크에서 평가되고 서버에서 시행되지 않습니다. `B1Checkin/src/helpers/EligibilityHelper.ts`는 사람의 생년월일/학년을 그룹의 `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade` (학년 순서: PreK, K, 1–12, Graduated)와 비교하고 `eligible` / `ineligible` / `unknown`을 반환합니다. 데이터 누락은 `unknown`을 산출하고 절대 실을 숨기지 않습니다. 나이 및 학년은 교회의 **학년 승격 날짜** (`gradePromotionDate` 설정, `"MM-DD"`, `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`에서 편집됨)에 따라 계산됩니다. 키오스크는 `GET /attendance/checkin/settings`에서 이를 가져오고 `resolveAsOfDate`는 오늘 또는 그 이전에 가장 최근 발생을 선택합니다. 실 선택기는 적격 실을 강조하고 부적격 실을 희미하게 합니다. 희미한 실을 선택하려면 직원 확인이 필요합니다.

### 신뢰할 수 있는 픽업 및 권한 없음

픽업 사람들은 멤버십 엔터티이고, 가구별입니다: `householdPickupPeople` (`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, 선택사항 personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD는 `GET /membership/householdpickup/:householdId` (모든 인증 교회 사용자이므로 키오스크는 읽을 수 있음) 더하기 `people.edit`로 게이트된 `POST` / `DELETE`입니다. 직원은 사람 페이지의 **픽업** 카드에서 목록을 관리합니다 (`B1Admin/src/people/components/PickupPeople.tsx`) — 사진, 관계, 신뢰할 수 있음/권한 없음 상태 칩.

체크아웃 시 (`B1Checkin/app/checkout.tsx`) 키오스크는 가구의 픽업 목록을 로드합니다: `trusted` 항목은 가구 성인 사진 그리드 옆에 선택 가능한 픽업 카드로 렌더링되고 자유 입력 "기타" 이름은 퍼지 매칭됩니다 (Levenshtein, `src/helpers/PickupMatchHelper.ts`) `notAuthorized` 항목 — 일치는 경고 시트와 직원 **무시하고 진행** 버튼으로 체크아웃을 차단합니다. 무시는 방문 자체에 기록됩니다. 이는 `checkedOutBy`를 정상 `POST /attendance/visits/checkout`를 통해 `"OVERRIDE: {name}"`으로 게시하므로 참석 기록 및 `attendance.checkout` webhook에 착지합니다 (별도의 감사 테이블이 아님).

### 보호자 호출 및 긴급 방송

`CheckinController` (`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`)은 두 가지 SMS 엔드포인트를 노출합니다:

- `POST /page` — `{ visitId, message }`: 체크인된 한 어린이의 보호자에게 호출합니다 (키오스크 체크아웃 화면, 관리자 모드).
- `POST /broadcast` — `{ serviceId, message }`: 서비스에 대한 모든 체크인된 가구의 성인에게 문자를 보냅니다 (키오스크 관리자 설정, `B1Checkin/app/adminSettings.tsx`의 유형 `EMERGENCY` 확인 시트 뒤).

둘 다 멤버십 게이트웨이를 통해 가구 성인을 해결한 후 **`MessagingModuleGateway.sendBulkText`**에 배달을 전달합니다 (`Api/src/shared/modules/MessagingModuleGateway.ts`) — 교회에서 구성한 문자 전송 서비스로의 교차 모듈 문 (`@churchapps/texting`: TextInChurch, Clearstream, 또는 MutualMinistry; 내장 SMS 발신자가 없음). 게이트웨이는 `sentText` 행 더하기 수신자당 `deliveryLog` 항목을 기록하고 배치를 500명 수신자로 제한합니다. 구성된 제공자가 없으면 `no_provider`를 반환하고 키오스크는 "SMS 제공자가 구성되지 않음"으로 표면합니다. 컨트롤러의 `dispatch()`는 전화 번호를 중복 제거하고 모바일이 없거나 `optedOut`가 설정된 사람을 건너뜀. `{ sent, failed, skippedOptedOut, skippedNoPhone }`을 반환하므로 키오스크가 건너뛴 것을 표시할 수 있습니다.

## 키오스크 (B1Checkin)

화면은 `B1Checkin/app/` 아래의 expo-router 파일입니다. 교차 화면 상태는 React 상태가 아니라 정적 `CachedData` 클래스 (`src/helpers/CachedData.ts`)에 있습니다.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **조회** (`app/lookup.tsx`) — 전화로 검색 (`GET /membership/people/search/phone?number=`, 마지막 4자리 또는 전체) 또는 이름으로 (`GET /membership/people/search?term=`). 일치 항목을 선택하면 가구를 로드합니다 (`GET /membership/people/household/{householdId}`) 그리고 기존 방문 (`GET /attendance/visits/checkin`), `pendingVisits`를 지난주의 선택으로 시드합니다.
2. **가구 검토** (`app/household.tsx`, `src/components/MemberList.tsx`) — 각 회원 행은 이미 체크인된 배지, 알레르기/`nametagNotes` 배지, 현재 실 칩을 표시합니다. 회원을 확장하면 모든 서비스 시간이 실 버튼과 회원 / 게스트 / 자원봉사자 체크인 유형 칩 (`MemberServiceTimes.tsx`)을 표시합니다.
3. **그룹 할당** (`app/selectGroup.tsx`) — `serviceTime.groups`에서 빌드된 카테고리 트리 (나이/학년 적격 실이 강조되고 부적격 실이 직원 확인 뒤에 희미함; [나이/학년 적격성](#agegrade-eligibility-kiosk-side) 참조); 실을 선택하면 `{ session: { serviceTimeId, groupId } }` visitSession을 그 사람의 보류 방문에 기록합니다 (`src/helpers/VisitSessionHelper.ts`). "없음"은 이를 지웁니다.
4. **완료** (`app/checkinComplete.tsx`) — `POST /attendance/visits/checkin` with `pendingVisits` (각각 `checkinType`으로 찍힘), 그 후 프린터가 구성되어 있으면 라벨을 인쇄하고 조회로 자동 반환합니다. `409` 수용 인원 응답은 이름을 붙인 가득 찬/닫힌 실을 표시합니다. 비율 경고는 직원 확인을 제공하고 `acknowledgeWarnings=true`로 재제출합니다.

**체크아웃** 화면 (`app/checkout.tsx`)은 자동 포커스 입력을 통해 4자리 보안 코드를 받습니다. 따라서 USB/Bluetooth 키보드 웨지 바코드 스캐너는 카메라 없이 작동합니다. 또는 같은 알파벳을 사용하는 화면의 키패드 (4자에서 자동 제출). 코드를 조회하고 픽업 중인 어린이를 표시하고 가구의 **신뢰할 수 있는 픽업 사람**을 가구 성인의 사진 그리드 옆에 (더하기 "기타" 자유 입력 옵션이 권한 없는 이름에 대해 퍼지 확인됨. [신뢰할 수 있는 픽업 및 권한 없음](#trusted-and-not-authorized-pickup) 참조) 선택 가능한 카드로 제시합니다. 그 후 피커의 이름/id와 함께 `POST /attendance/visits/checkout`을 게시합니다. 관리자 모드 화면은 또한 **보호자 호출** (`POST /attendance/checkin/page`) 및 **보안 라벨 재인쇄**를 제공합니다. `reprint()`는 `LabelHelper.getAllLabelsFor(...)`로 가족의 라벨을 다시 빌드하고 체크인과 같은 `PrintUI` 파이프라인을 통해 공급합니다.

스테이션 성격은 AsyncStorage 플래그 `@StationMode` (`"self"` | `"manned"`, `app/adminSettings.tsx`에서 토글됨)입니다. 관리자 모드는 조회 화면의 체크아웃 진입점 및 가구 화면에서 회원 프로필별 편집 (`POST /membership/people`)을 추가합니다. 키오스크 강화는 내장됩니다: 선택사항 PIN (`app/setPin.tsx`, `src/components/PinEntryModal.tsx`)은 관리자 및 프린터 화면을 게이트합니다. 관리자 화면은 헤더 로고에서 7 빠른 탭을 통해서만 열리고, 유휴 어트랙트 화면 (`src/hooks/useInactivityTimer.ts`)은 가족 사이에 인수합니다.

## 셀프 체크인 (B1App)

회원은 b1.church 포털의 `/mobile/checkin` 화면에서 체크인합니다 (`B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx`로 라우트됨 그리고 `screens/CheckinPage.tsx`로). 로그인한 사용자가 필요하고 키오스크와 동일한 네 단계를 걷습니다. 서비스 → 가구 → 그룹 → 완료. 상태는 `B1App/src/helpers/CheckinHelper.ts`에 보유됩니다. 키오스크의 차이: 가구는 로그인한 사용자의 자신의 `householdId`에서 나옵니다 (검색 단계 없음), 흐름은 확인 화면에서 끝납니다. 보안 코드 표시 없고 라벨 인쇄 없음. 유형 및 `ApiHelper`/`ArrayHelper`는 `@churchapps/helpers` 및 `@churchapps/apphelper`에서 나옵니다. React 컴포넌트는 B1Admin과 공유되지 않습니다.

## 관리자 측 참석 (B1Admin)

- **설정** — `/attendance` (`B1Admin/src/attendance/AttendancePage.tsx`)는 구조 트리를 렌더링하고 서비스를 생성합니다 (`ServiceEdit.tsx`) 및 서비스 시간 (`ServiceTimeEdit.tsx`). 캠퍼스 데이터는 `useCampuses()` 훅을 통해 멤버십에서 나옵니다.
- **수동 참석**은 참석 섹션이 아니라 그룹 쪽에 있습니다: `B1Admin/src/groups/components/GroupSessionsTab.tsx`는 세션을 생성합니다 (`POST /attendance/sessions`) 그리고 `POST /attendance/visitsessions/log`를 통해 사람을 현재로 표시합니다. 이는 그 사람과 세션에 대한 방문을 찾거나 생성합니다. 그룹 리더는 `attendance.edit` 권한 없이 자신의 그룹에 대한 참석을 기록할 수 있습니다. 컨트롤러는 `au.leaderGroupIds`를 확인합니다.
- **보고** — 참석 추세 및 그룹 참석은 서버 정의 보고서입니다 (`B1Admin/src/components/reporting/ReportWithFilter.tsx` vs ReportingApi); 인당 이력은 `GET /attendance/attendancerecords?personId=` (`B1Admin/src/people/components/PersonAttendance.tsx`)입니다.

## 라벨 인쇄

### 템플릿 및 디자이너

교회는 `/mobile/checkin/labels` (`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, 체크인 설정 페이지에서 도달)에서 B1Admin의 자신의 라벨을 설계합니다. 템플릿은 `content`가 블록의 JSON 배열인 `labelTemplates` 행입니다. `text`, `field`, `barcode`, `qrcode`, 또는 `box`. 각각 백분율 좌표, 글꼴, 정렬, 기호학 (`code39`/`code128`/`qr`), 그리고 선택사항 가시성 조건 (예: 알레르기 상자를 `person.nametagNotes`가 비어 있지 않을 때만 렌더링)으로 위치합니다. 두 가지 `labelType`이 있습니다: `nametag` (체크인된 인당 하나; `person.displayName`, `sessions`, `securityCode` 같은 필드) 및 `pickup` (가족당 하나; `children`, `childrenAllergies` 같은 필드). 서버는 교회당 유형당 단일 기본값을 시행합니다 (`LabelTemplateController.save`). 디자이너는 키오스크의 번들 라벨을 미러링하는 스타터 템플릿과 샘플 데이터에 대해 미리 봅니다.

### 키오스크의 렌더링 및 인쇄

체크인 완료 시 `B1Checkin/src/helpers/LabelHelper.ts`는 각 보류 방문의 그룹 플래그에서 인쇄할 대상을 결정합니다: `printNametag` 그룹에 대한 이름표 더하기 모든 방문이 `parentPickup` 그룹을 타격한 경우 한 가족 픽업 라벨. 체크인 응답의 보안 코드는 어린이 이름표 및 픽업 라벨에 옵니다. 성인 이름표는 코드 없이 인쇄합니다. 교회에 템플릿이 있으면 `LabelRenderer` (`src/helpers/LabelRenderer.ts`)는 블록 + 필드 콘텍스트를 독립형 HTML 문서로 바꿉니다. 그렇지 않으면 `B1Checkin/assets/labels/`의 번들 HTML 라벨이 자리 표시자 치환으로 사용됩니다.

바코드는 `B1Checkin/src/helpers/barcode.ts`의 순수 TypeScript 인코더로 인라인 SVG에 의해 생성됩니다. Code 39 패턴 테이블 및 Code 128 (mod-103 체크섬을 사용한 코드 세트 B), QR을 `qrcode` 패키지를 통해 생성합니다. **이러한 인코더는 의도적으로 B1Admin에서 중복됩니다** (`LabelEditor.tsx`는 같은 테이블을 인라인합니다. 코드 댓글에 주석 달음). 따라서 디자이너 미리보기는 키오스크 출력에 픽셀 정확합니다. 하나를 변경하면 다른 하나에 미러링해야 합니다.

인쇄 파이프라인 (`src/components/PrintUI.tsx`)은 각 HTML 라벨을 `WebView`에서 렌더링하고 `react-native-view-shot`을 통해 JPG로 캡처하고 이미지 URI를 네이티브 **printer-helper** Expo 모듈에 전달합니다 (`B1Checkin/modules/printer-helper/`). 모듈은 `scan()`, `checkInit()`, `printUris()`, 상태 이벤트를 노출하고 두 플랫폼 모두에서 브랜드당 제공자를 제공합니다.

| 브랜드 | Android | iOS | 주석 |
|--------|---------|-----|------|
| Brother | `BrotherProvider.kt` (Brother 인쇄 SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL 시리즈 네트워크 프린터 (QL-800/810W/820NWB/1100/1110NWB…), 다이 커트 29×90 라벨, 권장 기본값 |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | 네트워크 검색 + TCP/ZPL 이미지 인쇄 |

프린터 선택은 `app/printers.tsx` (네트워크 스캔은 `brand~model~ip` 항목 반환; 선택은 AsyncStorage에 지속됨)에 있고, `src/helpers/PrinterLog.ts`는 키오스크 헤더의 실시간 상태 점을 통해 표면되는 온디바이스 진단 로그를 유지합니다.

## 게스트 등록

두 경로는 체크인 중 사람을 생성합니다.

- **키오스크에서** — 가구 화면의 "게스트 추가"는 `B1Checkin/app/addGuest.tsx`를 열고 먼저 `GET /membership/people/search?term=`에 대한 기존 비회원 일치를 검색합니다. 그렇지 않으면 현재 가구에 `POST /membership/people`로 생성합니다. 그 후 게스트는 모든 회원처럼 그룹 할당을 통해 흐릅니다.
- **QR을 통한 셀프서빙** — 교회 설정 `enableQRGuestRegistration`이 켜져 있을 때 (B1Admin의 체크인 설정에서 구성됨, `GET /membership/settings/public/{churchId}`에서 읽음), 키오스크 조회 화면은 `https://{subdomain}.b1.church/guest-register?serviceId=`로 연결되는 QR 코드를 표시합니다. 그 B1App 페이지 (`src/app/[sdSlug]/(public)/guest-register/page.tsx`)는 방문하는 가족이 자신의 휴대폰을 통해 익명의 `POST /membership/people/guest-register` 엔드포인트를 통해 자신을 등록할 수 있게 합니다. 키오스크 줄이 움직일 수 있게 합니다.

## 관련 페이지

- [참석 엔드포인트](../api/endpoints/attendance) -- 캠퍼스, 서비스, 세션, 방문, 방문 세션에 대한 전체 REST 표면
- [멤버십 엔드포인트](../api/endpoints/membership) -- 사람, 가구, 그룹
- [웹훅](../api/webhooks) -- `session.created`, `attendance.recorded`, `attendance.checkout` 이벤트
- [모듈 구조](../api/module-structure) -- 참석 모듈이 서버 측에서 어떻게 구성되는지
