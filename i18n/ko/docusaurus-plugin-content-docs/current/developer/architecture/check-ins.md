---
title: "체크인"
---

# 체크인 {#check-ins}

<div class="article-intro">

체크인은 세 개의 입구를 가진 하나의 시스템입니다. 직원이 있는 곳이나 셀프 서비스 스테이션에서 쓰는 B1Checkin 키오스크 앱, B1App 회원 포털 안의 셀프 체크인, 그리고 B1Admin의 관리자 측 출석 기능입니다. 세 곳 모두 핵심 Api의 같은 출석 모듈에 기록하며, 교실 배정은 전적으로 그룹이 결정합니다. 별도의 "위치"나 "방" 엔터티는 없습니다. 그 위에 아동 안전 계층이 있습니다. 방문별 체크인 유형, 서버 측 정원과 봉사자 비율 게이트, 키오스크 측 나이/학년 자격 확인, 체크아웃 시 신뢰된 픽업 확인, 교회의 문자 메시지 제공업체를 통한 부모 호출이 포함됩니다. 이 페이지는 데이터 모델, 체크인 흐름, 안전 계층, 라벨 인쇄 파이프라인을 정리합니다.

</div>

## 개요 {#overview}

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

| 입구 | 저장소 | 스택 | 역할 |
|---------|------|-------|------|
| 키오스크 | `B1Checkin` | Expo / React Native, expo-router 파일 라우팅. Android, Amazon Fire, iOS용 EAS 빌드. `expo-updates`로 OTA 업데이트 | 라벨 인쇄와 검증된 체크아웃을 제공하는, 직원이 있거나 셀프 서비스인 스테이션 |
| 셀프 체크인 | `B1App` | Next.js (b1.church 회원 포털) | 로그인한 회원이 휴대폰에서 가구를 체크인. 인쇄 없음 |
| 관리자 | `B1Admin` | React SPA | 예배 구조 설정, 예배 시간에 그룹 배정, 라벨 디자인, 수동 출석 기록, 보고서 실행 |

세 곳 모두 `ApiHelper`를 통해 같은 두 API 모듈을 호출합니다. 사람, 가구, 그룹은 **MembershipApi**(`/membership`), 그 밖의 모든 것은 **AttendanceApi**(`/attendance`)입니다.

## 데이터 모델 (`Api/src/modules/attendance`) {#data-model-apisrcmodulesattendance}

| 엔터티 / 테이블 | 주요 필드 | 의미 |
|----------------|-----------|---------|
| `campuses` | name, address | 여기서는 더 이상 사용하지 않음. 캠퍼스는 membership 모듈(`/membership/campuses`)에서 관리되며, attendance의 사본은 레거시 읽기 전용으로 동결됨(`models/Campus.ts`) |
| `services` | campusId, name | 반복되는 모임. 예: "주일 오전"(`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | 예배 안의 시간대. 예: "오전 9:00"(`models/ServiceTime.ts`). 일정 열은 선택 사항이며(마이그레이션 `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`), [체크인 기간](#scheduled-check-in-windows)을 결정함 |
| `groupServiceTimes` | groupId, serviceTimeId | 조인 테이블: 어떤 그룹(교실)이 어떤 예배 시간에 모이는지(`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | 특정 날짜에 한 그룹이 가진 모임 한 번. 체크인 시점에 지연 생성됨(`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | 한 날짜에 참석한 한 사람(`models/Visit.ts`). `checkinType`은 `member` / `guest` / `volunteer`(NULL = 레거시 회원)이며, 키오스크가 설정하고 정원/비율 게이트가 사용함 |
| `visitSessions` | visitId, sessionId | 방문이 포함하는 세션. 두 예배 시간에 체크인한 아이는 두 개의 행을 가짐(`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON 블록) | 디자인 가능한 라벨 레이아웃(`models/LabelTemplate.ts`) |

### 완료된 체크인이 저장되는 방식 {#how-a-completed-check-in-is-persisted}

`VisitController.postCheckin`(`Api/src/modules/attendance/controllers/VisitController.ts`)이 `POST /attendance/visits/checkin?serviceId=&peopleIds=`를 처리합니다. 본문은 `Visit` 객체의 배열이며, 각 객체는 `visitSessions`를 가지고, 그 안의 내장 `session`은 `(serviceTimeId, groupId)` 쌍만 지정합니다. 서버는 다음을 수행합니다.

1. **어떤 쓰기보다 먼저 정원과 비율을 게이트합니다.** `evaluateGates()` → `CheckinGateHelper.evaluate()`가 대상 방마다 정원, 손님 정원, 닫힘 플래그, 현재 인원 대비 봉사자 비율을 확인합니다. postCheckin은 **트랜잭션이 아니므로**, 첫 저장 전에 게이트가 실행되어야 합니다. 심각한 위반이 있으면 문제가 되는 방의 이름과 함께 409를 반환하며 아무것도 저장되지 않습니다. [정원 및 봉사자 비율 게이트](#capacity-and-volunteer-ratio-gates)를 참조하세요.
2. **세션을 지연 해석합니다.** `getSessionId()`가 `(groupId, serviceTimeId, today)`에 해당하는 `sessions` 행을 찾거나 만듭니다. 세션 ID는 날짜별로 프로세스 안에 캐시됩니다. 새 세션은 `session.created` 웹훅을 발행합니다. 이 루프는 기다리는(await) `for..of`입니다. 이전의 fire-and-forget `forEach(async …)`가 저장과 경쟁하여 첫 세션을 만들 때 NULL sessionId를 기록한 적이 있어, 루프에 코드 주석과 함께 수정해 두었습니다.
3. **그날의 기록을 교체합니다.** 해당 예배에서 그 사람들의 오늘 기존 방문은 visitSessions와 함께 모두 삭제되고, 제출된 집합이 저장됩니다. 따라서 가구를 다시 체크인하는 것은 추가가 아니라 "이것이 현재 상태"라는 멱등 연산입니다. 대신 `?checkDuplicates=true`를 전달하면 쓰지 않고 `{ duplicates: [personId…] }`를 반환하며, 키오스크는 덮어쓰기 전에 이 값으로 경고합니다.
4. **배치마다 보안 코드 하나를 생성합니다.** `SecurityCodeHelper.generate()`는 `23456789BCDFGHJKLMNPQRSTVWXYZ` 알파벳으로 4자리 코드를 만듭니다(모음과 헷갈리기 쉬운 문자를 제외하므로 코드가 단어를 이루거나 잘못 읽히지 않습니다). 서버는 같은 교회의 같은 날 열린 방문과 충돌하면 재시도하고, 배치의 모든 방문에 코드를 찍습니다.
5. **`{ streaks, securityCode }`를 반환합니다.** `streaks`는 personId를 연속 주 출석 수에 매핑합니다. 키오스크는 마일스톤(5주마다)을 색종이 효과로 축하합니다.

저장된 방문마다 `attendance.recorded` 웹훅도 발행됩니다. 읽기 쪽인 `GET /attendance/visits/checkin`은 사람들의 방문을 **마지막으로 기록된 날짜**에서 반환합니다. 그 날짜가 지난주라면 ID를 제거하므로, 클라이언트는 지난주 방 선택을 미리 채운 사본을 받게 되며, 이 사본은 새 기록으로 저장됩니다.

### 체크아웃 {#check-out}

두 개의 엔드포인트가 흐름을 마무리합니다(`VisitController`).

- `GET /attendance/visits/code/:code` — 해당 보안 코드를 가진, 오늘 아직 체크아웃되지 않은 방문을 세션과 함께 반환합니다.
- `POST /attendance/visits/checkout` — 본문 `{ visitIds, checkedOutBy?, checkedOutById? }`. `checkoutTime`과 픽업한 사람을 기록하고, 방문마다 `attendance.checkout` 웹훅을 발행합니다.

권한: 키오스크는 `attendance.checkin`으로 인증하며, 이 권한은 체크인/체크아웃/라벨 템플릿 영역에만 정확히 부여됩니다. `attendance.view`/`attendance.edit`은 보고와 수동 입력을 담당합니다. 구조(예배, 예배 시간, 그룹 배정)에는 `services.edit`이 필요합니다. 회원 셀프 체크인(B1App)은 어떤 권한도 필요하지 않습니다. 교회에 연결된 사람이 있는 인증된 사용자라면 누구나 `GET`/`POST /attendance/visits/checkin`을 호출할 수 있으며, 서버는 제출된 `personId`를 호출자 본인의 가구로 제한합니다(그렇지 않으면 403. 이 울타리 덕분에 다른 가족의 `securityCode`를 읽을 수 없습니다). 회원 자격이 곧 권한이며, 회원이 기능을 *볼 수* 있는지는 교회의 B1App 탐색 탭으로 제어합니다. 그 밖의 체크인 엔드포인트(`code/:code`, `checkout`, `guardians`, `CheckinController`)는 여전히 키오스크/직원 전용입니다.

## 그룹이 방 배정을 결정합니다 {#groups-drive-room-routing}

시스템 어디에도 방이나 교실 엔터티는 없습니다. "방"은 `trackAttendance`가 켜져 있고 `groupServiceTimes`를 통해 하나 이상의 예배 시간에 연결된 membership **그룹**입니다. 키오스크 동작을 결정하는 그룹 필드(`Api/src/modules/membership/models/Group.ts`)는 다음과 같습니다.

| 필드 | 효과 |
|------|--------|
| `trackAttendance` | 그룹이 출석에 참여함. B1Admin의 설정 트리는 `groupServiceTimes` 행이 없는 `trackAttendance` 그룹을 미배정으로 표시함 |
| `parentPickup` | 아이 방을 표시함. 이 방에 체크인하면 방문이 "아동" 방문이 되어, 가족 픽업 라벨이 인쇄되고 이름표에 보안 코드가 찍힘 |
| `printNametag` | 이 그룹에 대한 체크인에서 이름표를 인쇄할지 여부 |
| `capacity` / `guestCapacity` / `checkinClosed` | 방 정원 한도와 강제 "닫힘" 스위치. 체크인 게이트가 서버 측에서 강제함(B1Admin 그룹 설정의 "체크인 정원"에서 편집) |
| `volunteerRatio` / `minVolunteers` | 아동 대 봉사자 비율과 최소 봉사자 수. 교회 전체의 `ratioEnforcement` 설정에 따라 강제됨 |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | 키오스크 측에서 평가되어 방을 강조하거나 흐리게 하는 나이/학년 자격 범위 |

모든 클라이언트는 같은 방식으로 데이터를 비정규화합니다(예: `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`). `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, `GET /membership/groups`를 병렬로 불러온 다음, 각 예배 시간에 대해 `groupServiceTimes` 행이 그 시간을 가리키는 그룹들을 모아 `serviceTime.groups`에 넣습니다. 이 배열이 방 선택기에 표시되며, 그룹의 `categoryName`으로 정리됩니다.

배정은 B1Admin의 그룹 페이지(`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`)에서 편집하며, 캠퍼스 → 예배 → 예배 시간 → 그룹 트리 전체는 `GET /attendance/attendancerecords/tree`를 통해 `B1Admin/src/attendance/components/AttendanceSetup.tsx`에서 시각화됩니다.

:::info
그룹이 유일한 진실의 원천이므로, 같은 그룹 구성원 자격이 키오스크 라우팅, B1Admin 그룹 페이지의 명단 형식 출석, 출석 보고를 모두 뒷받침합니다. 그룹을 예배 시간에 배정하는 것만으로 체크인 목적지가 되며, 그 외의 단계는 필요하지 않습니다.
:::

## 아동 안전 {#child-safety}

### 체크인 유형 {#check-in-types}

모든 방문은 `checkinType`을 가집니다. `member`, `guest`, `volunteer` 중 하나이며, NULL은 레거시/회원을 뜻합니다(마이그레이션 `tools/migrations/attendance/2026-07-03_checkin_type.ts`). 이 유형은 **키오스크 측에서** 선택합니다. 펼쳐진 회원 행의 회원 / 손님 / 봉사자 칩(`B1Checkin/src/components/MemberServiceTimes.tsx`)에서 고르며, 완료 시 각 대기 방문에 찍힙니다(`app/checkinComplete.tsx`, 기본값 `member`). 서버는 게이트에서 이 값을 사용합니다. 봉사자는 정원에 대해서가 아니라 비율 적용 범위에 포함되며, 손님은 `guestCapacity`에 포함됩니다.

### 정원 및 봉사자 비율 게이트 {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()`(`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`)은 저장 전에 `postCheckin` 안에서 실행됩니다(엔드포인트가 트랜잭션이 아니므로, 저장 전 게이트링이 정확성을 보장하는 장치입니다). 대상 그룹마다 현재 인원(`VisitRepo.countActiveByGroupToday`)과 membership 모듈 게이트웨이를 통한 그룹 설정을 불러온 다음 위반을 분류합니다.

- **심각(항상 차단):** `checkinClosed`, `current + incoming > capacity`, `guestCapacity` 초과 손님 수. 배치는 `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`로 거부되며, 키오스크는 해당 방을 표시합니다.
- **비율(경고 또는 차단):** 봉사자가 `minVolunteers`에 못 미치거나, 봉사자가 전혀 없거나, `children > volunteers × volunteerRatio`인 방에 봉사자가 아닌 사람이 들어갈 때. 심각도는 교회별 `ratioEnforcement` 설정을 따릅니다(기본값 `"warn"` / `"block"`. B1Admin의 Manage Church → Check-In, `CheckinSettingsEdit.tsx`에서 편집). 경고 모드에서는 클라이언트가 `acknowledgeWarnings=true`로 다시 제출하지 않는 한 `409 { warning: true, error: "ratio", … }`를 반환합니다. 이 재제출이 키오스크의 직원 확인 재정의입니다.

### 예약된 체크인 기간 {#scheduled-check-in-windows}

예배 시간은 선택적으로 주간 일정(`dayOfWeek` 0–6, 0 = 일요일, `startTime`/`endTime`은 `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`)을 가질 수 있습니다. 이는 B1Admin의 **출석 → 설정** 예배 시간 양식(`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "체크인 일정")에서 편집합니다. `CheckinGateHelper.hasSchedule()`은 `dayOfWeek`와 `startTime`이 모두 설정된 경우에만 예배 시간을 일정이 있는 것으로 봅니다. 일정이 없는 시간은 시간으로 제한되지 않습니다. `isServiceTimeOpen()`은 기간을 현지 벽시계 시간(`DateHelper.toChurchTime`)으로 계산합니다. 시간대는 `CheckinTimeZoneHelper.load()`(`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`)가 예배 시간마다 확인합니다. 우선순위는 예배의 캠퍼스 `timezone`(`service.campusId`, `MembershipModuleGateway.loadCampusTimeZones` 경유), 그다음 교회의 `timeZone`(B1Admin의 교회 정보에서 설정), 그다음 `timezone`이 있는 삭제되지 않은 첫 번째 캠퍼스(`loadCampusTimeZone`), 마지막으로 `America/New_York`입니다. 캠퍼스를 먼저 보는 이유는 대부분의 교회에서 교회 시간대가 `America/New_York`으로 소급 채워졌기 때문입니다. 아래의 목록 경로와 게시 경로는 모두 같은 방식으로 시간대를 확인합니다. 기간은 시작 전 `checkinOpenMinutes`부터 종료 후 `checkinCloseMinutes`까지이며(종료 시간이 없으면 시작 후), 자정이나 주 경계를 넘는 기간도 처리합니다.

기간은 두 곳에서 강제됩니다.

- **목록 조회:** `GET /attendance/servicetimes`는 각 행에 계산된 `checkinOpen` 불리언을 붙입니다. B1App의 셀프 체크인(`CheckinPage.tsx`)과 B1Checkin의 예배 선택기(`app/services.tsx`)는 모든 시간을 유지합니다. 예배의 모든 시간이 닫혀 있으면, 가장 빨리 열리는 시각을 표시합니다(B1App: "Check-in opens Sun 9:30 AM.", B1Checkin: "Check-in for this service opens Sun 9:30 AM.". `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`에서 가져옴). 열리는 시각을 계산할 수 없으면 "Check-in isn't open for this service right now."로 대체합니다(키오스크에는 다른 예배를 고를 수 있도록 뒤로 버튼이 있습니다). 그 밖의 경우 닫힌 시간은 선택할 수 없는 "Closed" / "Closed · opens 9:30 AM" 행으로 표시됩니다. B1Checkin의 가구 화면(`MemberServiceTimes.tsx`)은 기기 시계로 `ServiceTimeHelper.isCheckinOpen()`을 사용해 열림 여부를 실시간으로 다시 계산합니다(교회의 시간대가 아니라 기기의 시간대). 그래서 켜 둔 키오스크도 제때 열고 닫히며, 그 사람이 이미 가진 닫힌 시간에는 "Kids Room 1 · Checked in"(그룹 이름)을 표시합니다.
- **게시:** `evaluateGates()` 안에서, 정원/비율 평가 전에 `findClosedServiceTimeGroups()`가 대상 세션의 예배 시간 중 하나라도 기간 밖이면 `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }`로 배치를 거부합니다. 가구의 오늘 기존 방문은 체크인할 때마다 다시 전송되므로, 그 사람이 이미 가진 세션(기존 방문의 `personId|sessionId`)은 이 게이트를 건너뜁니다. 그래서 이전 기간이 닫혔다는 이유로 이후 열린 예배 시간을 추가하는 것이 거부되지 않습니다. B1Checkin은 이를 하드 게이트 화면으로 표시하며, 사유는 "check-in isn't open right now"입니다(정원 위반은 여전히 "room is full or closed"로 표시됩니다).

### 나이/학년 자격 (키오스크 측) {#agegrade-eligibility-kiosk-side}

방의 자격은 권고용 UI이며, 키오스크에서 평가하고 서버가 강제하지는 않습니다. `B1Checkin/src/helpers/EligibilityHelper.ts`는 사람의 생년월일/학년을 그룹의 `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade`와 비교하고(학년 순서: PreK, K, 1–12, Graduated), `eligible` / `ineligible` / `unknown`을 반환합니다. 데이터가 없으면 `unknown`이 되며 방을 숨기지 않습니다. 나이와 학년은 교회의 **학년 진급일**(`gradePromotionDate` 설정, `"MM-DD"`, `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`에서 편집) 기준으로 계산합니다. 키오스크는 이를 `GET /attendance/checkin/settings`에서 가져오며, `resolveAsOfDate`가 오늘이거나 그 이전의 가장 최근 날짜를 고릅니다. 방 선택기는 자격이 있는 방을 강조하고 없는 방은 흐리게 표시하며, 흐린 방을 고르려면 직원 확인이 필요합니다.

### 신뢰된 픽업과 비인가 픽업 {#trusted-and-not-authorized-pickup}

픽업 가능한 사람은 membership 엔터티이며 가구 단위로 관리됩니다. `householdPickupPeople`(`Api/src/modules/membership/models/HouseholdPickupPerson.ts`: householdId, 선택적 personId, name, photoUrl, relationship, `status`는 `trusted` / `notAuthorized`, notes)입니다. CRUD는 `GET /membership/householdpickup/:householdId`(키오스크가 읽을 수 있도록 인증된 교회 사용자 누구나)와 `people.edit`으로 제한된 `POST` / `DELETE`입니다. 직원은 사람 페이지의 **픽업** 카드(`B1Admin/src/people/components/PickupPeople.tsx`)에서 목록을 관리하며, 사진, 관계, 신뢰됨/비인가 상태 칩이 있습니다.

체크아웃(`B1Checkin/app/checkout.tsx`)에서 키오스크는 가구의 픽업 목록을 불러옵니다. `trusted` 항목은 가구 성인의 사진 격자와 함께 누를 수 있는 픽업 카드로 나타나며, 자유 입력한 "기타" 이름은 `notAuthorized` 항목과 퍼지 매칭됩니다(Levenshtein, `src/helpers/PickupMatchHelper.ts`). 매칭되면 경고 시트와 함께 체크아웃이 차단되며, 직원의 **재정의** 버튼이 나타납니다. 재정의는 방문 자체에 기록됩니다. 일반 `POST /attendance/visits/checkout`을 통해 `checkedOutBy`를 `"OVERRIDE: {name}"`으로 보내므로, 별도의 감사 테이블이 아니라 출석 기록과 `attendance.checkout` 웹훅에 남습니다.

### 부모 호출 및 긴급 방송 {#page-a-parent-and-emergency-broadcast}

`CheckinController`(`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`)는 두 개의 SMS 엔드포인트를 제공합니다.

- `POST /page` — `{ visitId, message }`: 체크인한 아이 한 명의 보호자에게 호출을 보냅니다(키오스크 체크아웃 화면, 직원 배치 모드).
- `POST /broadcast` — `{ serviceId, message }`: 한 예배에서 체크인한 모든 가구의 성인에게 문자를 보냅니다(키오스크 관리자 설정, `B1Checkin/app/adminSettings.tsx`의 `EMERGENCY` 유형 입력 확인 시트 뒤에 있음).

두 엔드포인트 모두 membership 게이트웨이로 가구 성인을 확인한 다음, 전달은 **`MessagingModuleGateway.sendBulkText`**(`Api/src/shared/modules/MessagingModuleGateway.ts`)에 맡깁니다. 이는 교회가 설정한 문자 메시지 제공업체(`@churchapps/texting`: TextInChurch, Clearstream, MutualMinistry 중 하나로, 내장 SMS 발송기는 없음)로 들어가는 모듈 간 통로입니다. 게이트웨이는 `sentText` 행과 수신자별 `deliveryLog` 항목을 기록하며, 한 배치를 수신자 500명으로 제한합니다. 제공업체가 설정되지 않았으면 `no_provider`를 반환하고, 키오스크는 이를 "No SMS provider configured"로 표시합니다. 컨트롤러의 `dispatch()`는 전화번호를 중복 제거하고, 휴대폰이 없거나 `optedOut`이 설정된 사람은 건너뛰며, `{ sent, failed, skippedOptedOut, skippedNoPhone }`를 반환하여 키오스크가 건너뛴 내용을 보여 줄 수 있게 합니다.

## 키오스크(B1Checkin) {#the-kiosk-b1checkin}

화면은 `B1Checkin/app/` 아래의 expo-router 파일이며, 화면 사이에 공유되는 상태는 React 상태가 아니라 정적 `CachedData` 클래스(`src/helpers/CachedData.ts`)에 있습니다.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **조회**(`app/lookup.tsx`) — 전화번호(`GET /membership/people/search/phone?number=`, 끝 4자리 또는 전체)나 이름(`GET /membership/people/search?term=`)으로 검색합니다. 일치하는 사람을 고르면 가구(`GET /membership/people/household/{householdId}`)와 기존 방문(`GET /attendance/visits/checkin`)을 불러와, 지난주 선택으로 `pendingVisits`를 채웁니다.
2. **가구 검토**(`app/household.tsx`, `src/components/MemberList.tsx`) — 각 구성원 행에는 이미 체크인됨 배지, 알레르기/`nametagNotes` 배지, 현재 방 칩이 표시됩니다. 구성원을 펼치면 방 버튼과 회원 / 손님 / 봉사자 체크인 유형 칩(`MemberServiceTimes.tsx`)과 함께 모든 예배 시간이 나열됩니다. 각 예배 시간 이름 아래에는 `ServiceTimeHelper.getGroupSummary()`가 그 시간에 운영되는 그룹(`serviceTime.groups` 이름을 다듬고, 대소문자 구분 없이 중복 제거하여 쉼표로 연결)을 표시합니다. 그룹이 없는 시간에는 아무것도 표시하지 않습니다.
3. **그룹 배정**(`app/selectGroup.tsx`) — `serviceTime.groups`로 만든 카테고리 트리이며, 나이/학년 자격이 있는 방은 강조되고 자격이 없는 방은 직원 확인 뒤에 흐리게 표시됩니다([나이/학년 자격](#agegrade-eligibility-kiosk-side) 참조). 방을 고르면 그 사람의 대기 방문에 `{ session: { serviceTimeId, groupId } }` visitSession이 기록됩니다(`src/helpers/VisitSessionHelper.ts`). "없음"을 고르면 지웁니다.
4. **완료**(`app/checkinComplete.tsx`) — `pendingVisits`(각각 `checkinType`이 찍힘)와 함께 `POST /attendance/visits/checkin`을 호출한 다음, 프린터가 설정되어 있으면 라벨을 인쇄하고 자동으로 조회 화면으로 돌아갑니다. `409` 정원 또는 `notOpen` 응답은 해당 방과 사유(가득 참/닫힘, 또는 체크인이 열리지 않음)를 표시합니다. 비율 경고는 직원 확인을 제안하며, 확인하면 `acknowledgeWarnings=true`로 다시 제출합니다.

**체크아웃** 화면(`app/checkout.tsx`)은 4자리 보안 코드를 자동 포커스 입력란으로 받습니다. 이 때문에 USB/블루투스 키보드 방식의 바코드 스캐너는 카메라 없이 작동합니다. 같은 알파벳을 쓰는 화면 키패드도 있으며, 4자리가 되면 자동 제출됩니다. **스캔** 버튼은 공유 카메라 컴포넌트 `src/components/CodeScanner.tsx`가 있는 시트를 엽니다(기본은 후면 카메라이며 QR, Code 128, Code 39를 인식). 그래서 웨지 스캐너가 없는 스테이션도 픽업 라벨을 읽을 수 있습니다. 스캔된 코드는 입력된 것과 같은 `handleCode()` 경로로 들어갑니다. 화면은 코드를 조회하고, 픽업될 아이들을 보여 주며, 가구의 **신뢰된 픽업 사람**을 가구 성인 사진 격자와 함께 누를 수 있는 카드로 제시합니다(비인가 이름과 퍼지 확인하는 "기타" 자유 입력 옵션도 있음. [신뢰된 픽업과 비인가 픽업](#trusted-and-not-authorized-pickup) 참조). 그런 다음 선택자의 이름/ID와 함께 `POST /attendance/visits/checkout`을 보냅니다. 직원 모드에서는 **부모 호출**(`POST /attendance/checkin/page`)과 **보안 라벨 재인쇄**도 제공합니다. `reprint()`는 `LabelHelper.getAllLabelsFor(...)`로 가족의 라벨을 다시 만들고, 체크인과 같은 `PrintUI` 파이프라인으로 보냅니다.

스테이션의 성격은 AsyncStorage 플래그 `@StationMode`(`"self"` | `"manned"`, `app/adminSettings.tsx`에서 전환)로 정합니다. 직원 모드에서는 조회 화면에 체크아웃 진입점이 추가되고, 가구 화면에서 구성원별 프로필 편집(`POST /membership/people`)이 가능합니다. 키오스크 보안은 기본 제공됩니다. 선택적 PIN(`app/setPin.tsx`, `src/components/PinEntryModal.tsx`)이 관리자 화면과 프린터 화면을 보호하고, 관리자 화면은 헤더 로고를 빠르게 7번 탭해야만 열리며, 유휴 대기 화면(`src/hooks/useInactivityTimer.ts`)이 가족과 가족 사이에 화면을 넘겨받습니다.

## 셀프 체크인(B1App) {#self-check-in-b1app}

회원은 b1.church 포털의 `/mobile/checkin` 화면에서 체크인합니다(`B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx`가 `screens/CheckinPage.tsx`로 라우팅). 로그인한 사용자가 필요하며, 키오스크와 같은 네 단계(예배 → 가구 → 그룹 → 완료)를 같은 엔드포인트로 진행합니다. 상태는 `B1App/src/helpers/CheckinHelper.ts`에 보관됩니다. 키오스크와 다른 점은 다음과 같습니다. 가구는 로그인한 사용자의 `householdId`에서 가져오며(검색 단계 없음), 라벨 인쇄가 없습니다. 대신 완료 화면에 이 배치의 보안 코드가 QR(`qrcode.react`)로 표시되며 "체크인 스테이션에서 이 코드를 보여 주세요"라는 안내가 붙습니다. 페이지를 불러올 때 가구가 이미 체크인되어 있다면, "Show check-in code" 버튼이 `securityCode`를 가진 첫 번째 기존 방문(`GET /attendance/visits/checkin`)의 QR을 다시 보여 줍니다. 체크인은 제출 시점에 즉시 기록됩니다(대기 상태 없음). QR은 키오스크에서 라벨 인쇄를 위해서만 쓰입니다.

**휴대폰에서 키오스크로 라벨 인쇄**(`B1Checkin/app/scan.tsx`, 조회 화면의 QR "스캔" 버튼에서 진입): 키오스크는 QR을 스캔하는 `CodeScanner`(`expo-camera`의 `CameraView`, 기본 전면 카메라이며 전환 가능)를 보여 줍니다. `ScanCodeHelper.parse()`는 보안 코드 알파벳의 4자리 코드만 담긴 페이로드를 받아들이며, `ScanCodeHelper.isRepeat()`는 같은 코드를 4초 동안 무시합니다. 그래서 B1App QR과 인쇄된 라벨의 QR 블록 모두 작동합니다. 그다음 화면은 체크아웃 재인쇄 경로(`GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI`)를 따르고, 조회 화면으로 돌아갑니다. 스캔 시점에는 출석 쓰기가 일어나지 않으며, 라벨만 인쇄합니다. 활성 방문이 없는 코드, 프린터가 없는 스테이션, 라벨이 없는 그룹은 각각 토스트를 표시하고 조회 화면으로 돌아갑니다.

타입과 `ApiHelper`/`ArrayHelper`는 `@churchapps/helpers`와 `@churchapps/apphelper`에서 가져옵니다. B1Admin과 공유하는 React 컴포넌트는 없습니다.

## 관리자 측 출석(B1Admin) {#admin-side-attendance-b1admin}

- **설정** — `/attendance`(`B1Admin/src/attendance/AttendancePage.tsx`)가 구조 트리를 보여 주고, 서비스(`ServiceEdit.tsx`)와 예배 시간(`ServiceTimeEdit.tsx`)을 만듭니다. 캠퍼스 데이터는 `useCampuses()` 훅을 통해 membership에서 가져옵니다.
- **수동 출석**은 출석 섹션이 아니라 그룹 쪽에 있습니다. `B1Admin/src/groups/components/GroupSessionsTab.tsx`가 세션을 만들고(`POST /attendance/sessions`. 추가할 때 `SessionEdit.tsx`는 선택한 예배 시간을 공유하는 다른 그룹마다 세션 하나를 포함할 수 있으며, 그날 이미 세션이 있는 그룹은 건너뜀), `POST /attendance/visitsessions/log`로 사람을 출석으로 표시합니다. 이 호출은 그 사람과 세션의 방문을 찾거나 만듭니다. 그룹 리더는 `attendance.edit` 권한 없이도 자신의 그룹에 출석을 기록할 수 있습니다. 컨트롤러가 `au.leaderGroupIds`를 확인하기 때문입니다.
- **보고** — 출석 추세와 그룹 출석은 서버가 정의한 보고서입니다(`B1Admin/src/components/reporting/ReportWithFilter.tsx`가 ReportingApi를 사용하며, 정의는 `Api/reports/*.json`). 둘 다 `startDate`/`endDate`(종료일 포함)를 받습니다. 추세 보고서의 기본값은 1년 전부터 오늘까지이며, 주별 `sessionDates` 열을 추가합니다. 그룹 출석의 화면 트리에는 각 방문의 `checkinTime`과 그 사람의 `membershipStatus`가 포함됩니다. 그룹 출석의 CSV는 짝이 되는 `groupAttendanceDownload` 보고서에서 가져오며, `GroupAttendanceDownloadHelper`가 날짜가 있는 세션마다 출석/결석 열을 두고 구성원 한 명당 한 행으로 피벗합니다. 개인별 기록은 `GET /attendance/attendancerecords?personId=`입니다(`B1Admin/src/people/components/PersonAttendance.tsx`).

## 라벨 인쇄 {#label-printing}

### 템플릿과 디자이너 {#templates-and-the-designer}

교회는 B1Admin의 `/mobile/checkin/labels`(`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, 체크인 설정 페이지에서 진입)에서 자체 라벨을 디자인합니다. 템플릿은 `content`가 블록의 JSON 배열인 `labelTemplates` 행입니다. 블록은 `text`, `field`, `barcode`, `qrcode`, `box` 중 하나이며, 백분율 좌표에 위치하고, 글꼴, 정렬, 기호 체계(`code39`/`code128`/`qr`), 선택적 표시 조건(예: `person.nametagNotes`가 비어 있지 않을 때만 알레르기 상자 표시)을 가집니다. `labelType`은 두 가지입니다. `nametag`(체크인한 사람마다 하나. `person.displayName`, `sessions`, `securityCode`, `person.isBirthdayWeek` 같은 필드를 사용하며, `person.isBirthdayWeek`는 생일의 월/일이 오늘부터 3일 이내이면 `"true"`이고, 연말을 넘어서도 계산합니다. `LabelHelper.isBirthdayWithin()`이 계산)와 `pickup`(가족마다 하나. `children`, `childrenAllergies` 같은 필드를 사용합니다)입니다. 서버는 교회마다 유형별 기본 템플릿을 하나로 강제합니다(`LabelTemplateController.save`). 디자이너는 키오스크의 기본 라벨을 본뜬 시작 템플릿을 제공하고, 샘플 데이터로 미리 보기를 보여 줍니다.

### 키오스크에서의 렌더링과 인쇄 {#rendering-and-printing-on-the-kiosk}

체크인 완료 시, `B1Checkin/src/helpers/LabelHelper.ts`가 각 대기 방문의 그룹 플래그에 따라 무엇을 인쇄할지 결정합니다. `printNametag` 그룹에는 이름표를, 방문 하나라도 `parentPickup` 그룹에 해당하면 가족 픽업 라벨 하나를 인쇄합니다. `checkinType`이 `volunteer`인 방문은 `LabelHelper.selectChildVisits()`에서 건너뛰므로, Parent Pickup 방의 보육 봉사자는 픽업 라벨을 유발하지 않습니다. 체크인 응답의 보안 코드는 아이의 이름표와 픽업 라벨에 들어가며, 성인 이름표에는 코드가 들어가지 않습니다. 교회에 템플릿이 있다면, `LabelRenderer`(`src/helpers/LabelRenderer.ts`)가 블록과 필드 컨텍스트를 독립형 HTML 문서로 바꿉니다. 없다면 `B1Checkin/assets/labels/`에 번들된 HTML 라벨에 자리 표시자를 치환하여 사용합니다.

바코드는 `B1Checkin/src/helpers/barcode.ts`의 순수 TypeScript 인코더가 인라인 SVG로 생성합니다. Code 39 패턴 표와 Code 128(mod-103 체크섬이 있는 코드 세트 B) 너비 표이며, QR은 `qrcode` 패키지를 사용합니다. **이 인코더는 B1Admin에도 의도적으로 중복되어 있습니다**(`LabelEditor.tsx`가 같은 표를 인라인으로 포함하며, 코드 주석으로 표시되어 있음). 그래서 디자이너 미리 보기가 키오스크 출력과 픽셀 단위로 일치합니다. 한쪽을 바꾸면 다른 쪽도 반드시 맞춰야 합니다.

인쇄 파이프라인(`src/components/PrintUI.tsx`)은 각 HTML 라벨을 `WebView`에서 렌더링하고, `react-native-view-shot`으로 JPG로 캡처한 다음, 이미지 URI를 네이티브 **printer-helper** Expo 모듈(`B1Checkin/modules/printer-helper/`)에 넘깁니다. 이 모듈은 `scan()`, `checkInit()`, `printUris()`와 상태 이벤트를 노출하며, 양 플랫폼에 브랜드별 제공자가 있습니다.

| 브랜드 | Android | iOS | 비고 |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt`(Brother 인쇄 SDK) | `BrotherProvider.swift`(`BRLMPrinterKit.xcframework`) | QL 시리즈 네트워크 프린터(QL-800/810W/820NWB/1100/1110NWB 등), 다이컷 29×90 라벨, 권장 기본값 |
| Zebra | `ZebraProvider.kt`(Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | 네트워크 검색 + TCP/ZPL 이미지 인쇄 |

프린터 선택은 `app/printers.tsx`에 있습니다(네트워크 스캔은 `brand~model~ip` 항목을 반환하며, 선택은 AsyncStorage에 저장됨). `src/helpers/PrinterLog.ts`는 기기 내 진단 로그를 유지하며, 키오스크 헤더의 실시간 상태 점으로 표시됩니다.

## 손님 등록 {#guest-registration}

체크인 도중 사람을 만드는 경로는 두 가지입니다.

- **키오스크에서** — 가구 화면의 "손님 추가"가 `B1Checkin/app/addGuest.tsx`를 엽니다. 이 화면은 먼저 `GET /membership/people/search?term=`으로 기존 비구성원 일치 항목을 찾고, 없으면 `POST /membership/people`로 만들어 현재 가구에 연결합니다. 손님은 그 뒤 모든 구성원과 똑같이 그룹 배정 단계를 거칩니다.
- **QR을 통한 셀프 서비스** — 교회 설정 `enableQRGuestRegistration`이 켜져 있으면(B1Admin 체크인 설정에서 구성하며, `GET /membership/settings/public/{churchId}`에서 읽음), 키오스크 조회 화면이 `https://{subdomain}.b1.church/guest-register?serviceId=`로 연결되는 QR 코드를 보여 줍니다. 이 B1App 페이지(`src/app/[sdSlug]/(public)/guest-register/page.tsx`)는 방문 가족이 익명 `POST /membership/people/guest-register` 엔드포인트를 통해 자신의 휴대폰으로 직접 등록할 수 있게 하여, 키오스크 줄이 계속 움직이도록 합니다. QR 시트에는 같은 페이지를 키오스크에서 여는 **여기서 등록** 버튼도 있습니다(`app/guestRegister.tsx`). 이 버튼은 시크릿 모드에 캐시를 끈 `WebView`로 엽니다. `src/helpers/GuestRegisterHelper.ts`가 QR과 WebView 모두의 URL을 만들고, `https://{subdomain}.b1.church/guest-register`를 벗어나는 탐색을 차단합니다. 화면은 **완료**, 뒤로 가기, 또는 120초 동안 활동이 없으면 조회 화면으로 돌아가며(양식 입력은 활동으로 WebView에서 전달됨), WebView를 마운트 해제하여 한 가족의 입력이 다음 가족에게 넘어가지 않게 합니다.

## 관련 문서 {#related-pages}

- [출석 엔드포인트](../api/endpoints/attendance) -- 캠퍼스, 예배, 세션, 방문, 방문 세션에 대한 전체 REST 인터페이스
- [Membership 엔드포인트](../api/endpoints/membership) -- 사람, 가구, 그룹
- [웹훅](../api/webhooks) -- `session.created`, `attendance.recorded`, `attendance.checkout` 이벤트
- [모듈 구조](../api/module-structure) -- 서버 측에서 출석 모듈이 구성되는 방식
