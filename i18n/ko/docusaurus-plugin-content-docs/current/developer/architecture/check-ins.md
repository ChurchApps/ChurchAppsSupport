---
title: "체크인"
---

# 체크인

<div class="article-intro">

체크인은 세 개의 진입점을 가진 하나의 시스템입니다. 스태프가 있는 스테이션과 셀프 서비스 스테이션을 위한 B1Checkin 키오스크 앱, B1App 교인 포털 내부의 셀프 체크인, 그리고 B1Admin의 관리자 측 출석입니다. 셋 모두 핵심 Api의 같은 출석 모듈에 기록하며, 교실 라우팅은 전적으로 그룹이 담당합니다. 별도의 "위치"나 "방" 엔티티는 없습니다. 그 위에는 어린이 안전 계층이 있습니다. 방문별 체크인 유형, 서버 측 정원 및 봉사자 비율 게이트, 키오스크 측 연령/학년 자격 확인, 체크아웃 시 신뢰 픽업 확인, 그리고 교회의 문자 제공업체를 통한 보호자 호출이 포함됩니다. 이 페이지에서는 데이터 모델, 체크인 흐름, 안전 계층, 라벨 출력 파이프라인을 설명합니다.

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

| 진입점 | 저장소 | 스택 | 역할 |
|---------|------|-------|------|
| 키오스크 | `B1Checkin` | Expo / React Native, expo-router 파일 기반 라우팅. Android, Amazon Fire, iOS용 EAS 빌드. `expo-updates`를 통한 OTA 업데이트 | 라벨 출력과 검증된 체크아웃이 있는 스태프 또는 셀프 서비스 스테이션 |
| 셀프 체크인 | `B1App` | Next.js (b1.church 교인 포털) | 로그인한 교인이 휴대폰으로 자기 가구를 체크인합니다. 출력은 없습니다 |
| 관리자 | `B1Admin` | React SPA | 예배 구조 설정, 그룹을 예배 시간에 배정, 라벨 디자인, 수동 출석 기록, 보고서 실행 |

세 진입점 모두 `ApiHelper`를 통해 같은 두 API 모듈을 호출합니다. 사람, 가구, 그룹에는 **MembershipApi**(`/membership`)를, 그 밖의 모든 것에는 **AttendanceApi**(`/attendance`)를 사용합니다.

## 데이터 모델 (`Api/src/modules/attendance`)

| 엔티티 / 테이블 | 주요 필드 | 의미 |
|----------------|-----------|---------|
| `campuses` | name, address | 여기서는 더 이상 사용되지 않습니다. 캠퍼스의 원본 데이터는 membership 모듈(`/membership/campuses`)에 있으며, attendance의 사본은 레거시 읽기를 위해 읽기 전용으로 고정되어 있습니다(`models/Campus.ts`). |
| `services` | campusId, name | 반복되는 모임. 예: "Sunday Morning"(`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | 예배 내의 시간대. 예: "9:00 AM"(`models/ServiceTime.ts`). 일정 열은 선택 사항이며(마이그레이션 `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`), [체크인 기간](#scheduled-check-in-windows)을 결정합니다. |
| `groupServiceTimes` | groupId, serviceTimeId | 조인 테이블: 어떤 그룹(교실)이 어떤 예배 시간에 모이는지(`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | 하루에 있는 한 그룹의 모임 한 번. 체크인 시점에 지연 생성됩니다(`models/Session.ts`). |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | 한 날짜에 한 사람이 참석한 기록(`models/Visit.ts`). `checkinType`은 `member` / `guest` / `volunteer`(NULL = 레거시 교인)이며, 키오스크가 설정하고 정원/비율 게이트가 사용합니다. |
| `visitSessions` | visitId, sessionId | 방문이 포함하는 세션. 두 예배 시간에 체크인한 자녀는 행 두 개를 갖습니다(`models/VisitSession.ts`). |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | 디자인 가능한 라벨 레이아웃(`models/LabelTemplate.ts`) |

### 완료된 체크인이 저장되는 방식

`VisitController.postCheckin`(`Api/src/modules/attendance/controllers/VisitController.ts`)은 `POST /attendance/visits/checkin?serviceId=&peopleIds=`를 처리합니다. 본문은 `Visit` 객체의 배열이며, 각 객체는 `visitSessions`를 가지고, 그 안에 포함된 `session`은 `(serviceTimeId, groupId)` 쌍만 지정합니다. 서버는 다음을 수행합니다.

1. **쓰기 전에 정원과 비율을 게이트합니다.** `evaluateGates()` → `CheckinGateHelper.evaluate()`가 대상 방마다 현재 인원 대비 정원, 게스트 정원, 닫힘 플래그, 봉사자 비율을 확인합니다. postCheckin은 **트랜잭션이 아니므로** 게이트는 첫 저장 전에 실행되어야 합니다. 심각한 위반이 있으면 문제가 된 방을 명시한 409가 반환되며, 아무것도 저장되지 않습니다. [정원 및 봉사자 비율 게이트](#capacity-and-volunteer-ratio-gates)를 참고하세요.
2. **세션을 지연 해결합니다.** `getSessionId()`가 `(groupId, serviceTimeId, today)`에 해당하는 `sessions` 행을 찾거나 만듭니다. 세션 ID는 날짜별로 프로세스 내에 캐시됩니다. 새 세션은 `session.created` 웹훅을 발생시킵니다. 이 루프는 기다리는(awaited) `for..of`입니다. 이전의 fire-and-forget `forEach(async …)`는 저장과 경쟁하여 첫 세션 생성 시 sessionId를 NULL로 기록했습니다(수정되었으며, 루프에 코드 주석으로 기록되어 있습니다).
3. **그날의 기록을 교체합니다.** 그 예배에서 오늘 그 사람들의 기존 방문은 visitSessions와 함께 삭제되고, 그다음 제출된 집합이 저장됩니다. 따라서 가족을 다시 체크인하는 것은 추가가 아니라 "현재 상태"를 나타내는 멱등 연산입니다. 대신 `?checkDuplicates=true`를 전달하면 쓰기 없이 `{ duplicates: [personId…] }`를 반환하며, 키오스크는 이것으로 덮어쓰기 전에 경고합니다.
4. **배치마다 보안 코드를 하나 생성합니다.** `SecurityCodeHelper.generate()`는 `23456789BCDFGHJKLMNPQRSTVWXYZ` 알파벳으로 4자리 코드를 만듭니다(모음과 혼동되기 쉬운 문자가 없으므로 코드가 단어를 이루거나 잘못 읽히지 않습니다). 서버는 같은 교회의 같은 날 열린 방문과 충돌하면 재시도하며, 배치의 모든 방문에 그 코드를 찍습니다.
5. **`{ streaks, securityCode }`를 반환합니다.** `streaks`는 personId를 연속 주간 출석 횟수에 매핑합니다. 키오스크는 마일스톤(5주마다)을 색종이 효과로 축하합니다.

저장된 방문마다 `attendance.recorded` 웹훅도 발생합니다. 읽기 측인 `GET /attendance/visits/checkin`은 사람들의 방문을 **마지막으로 기록된 날짜**부터 반환합니다. 그 날짜가 지난 주라면 ID를 제거하므로, 클라이언트는 지난주 방 선택의 미리 채워진 사본을 받으며, 이는 새 기록으로 저장됩니다.

### 체크아웃

두 엔드포인트가 흐름을 완성합니다(`VisitController`).

- `GET /attendance/visits/code/:code` — 해당 보안 코드를 가진, 오늘 아직 체크아웃되지 않은 방문을 세션과 함께 반환합니다.
- `POST /attendance/visits/checkout` — 본문 `{ visitIds, checkedOutBy?, checkedOutById? }`. `checkoutTime`과 픽업한 사람을 기록하고, 방문마다 `attendance.checkout` 웹훅을 발생시킵니다.

권한: 키오스크는 `attendance.checkin`으로 인증하며, 이는 체크인/체크아웃/라벨 템플릿 표면만 정확히 허용합니다. `attendance.view`/`attendance.edit`은 보고와 수동 입력을 담당하며, 구조(서비스, 예배 시간, 그룹 배정)에는 `services.edit`가 필요합니다. 교인 셀프 체크인(B1App)에는 권한이 전혀 필요하지 않습니다. 교회에 연결된 사람이 있는 인증된 사용자라면 누구나 `GET`/`POST /attendance/visits/checkin`을 호출할 수 있으며, 서버는 제출된 `personId`를 호출자 자신의 가구로 제한합니다(그렇지 않으면 403입니다. 이 울타리 덕분에 다른 가족의 `securityCode`는 읽을 수 없습니다). 교인이라는 자격이 권한 부여이며, 교인이 이 기능을 *볼 수 있는지*는 교회의 B1App 내비게이션 탭이 제어합니다. 그 외 체크인 엔드포인트(`code/:code`, `checkout`, `guardians`, `CheckinController`)는 여전히 키오스크/스태프 전용입니다.

## 그룹이 방 라우팅을 결정합니다

시스템 어디에도 방이나 교실 엔티티는 없습니다. "방"은 `trackAttendance`가 켜져 있는 멤버십 **그룹**이며, `groupServiceTimes`를 통해 하나 이상의 예배 시간에 연결됩니다. 키오스크 동작을 결정하는 그룹 필드(`Api/src/modules/membership/models/Group.ts`에 있음)는 다음과 같습니다.

| 필드 | 효과 |
|------|------|
| `trackAttendance` | 그룹이 출석에 참여하는지 여부입니다. B1Admin의 설정 트리는 `groupServiceTimes` 행이 없는 `trackAttendance` 그룹을 미배정으로 표시합니다. |
| `parentPickup` | 자녀 방으로 표시합니다. 이 방에 체크인하면 방문이 "자녀" 방문이 되며, 가족 픽업 라벨이 출력되고 이름표에 보안 코드가 들어갑니다. |
| `printNametag` | 이 그룹에 대한 체크인에서 이름표를 출력할지 여부 |
| `capacity` / `guestCapacity` / `checkinClosed` | 방 정원 제한과 강제 "닫힘" 스위치입니다. 체크인 게이트가 서버 측에서 시행합니다(B1Admin의 그룹 설정 "Check-In Capacity"에서 편집). |
| `volunteerRatio` / `minVolunteers` | 자녀 대 봉사자 비율과 최소 봉사자 인원입니다. 교회 전체의 `ratioEnforcement` 설정에 따라 시행됩니다. |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | 연령/학년 자격 범위입니다. 키오스크 측에서 평가하여 방을 강조하거나 흐리게 표시합니다. |

모든 클라이언트는 같은 방식으로 정규화합니다(예: `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`). `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, `GET /membership/groups`를 병렬로 불러온 다음, 각 예배 시간에 대해 `groupServiceTimes` 행이 그 예배 시간을 가리키는 그룹을 `serviceTime.groups`에 모읍니다. 이 배열이 방 선택기에 표시되며, 그룹의 `categoryName`으로 정리됩니다.

배정은 B1Admin의 그룹 페이지에서 편집합니다(`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`). 캠퍼스 → 서비스 → 예배 시간 → 그룹 전체 트리는 `B1Admin/src/attendance/components/AttendanceSetup.tsx`에서 `GET /attendance/attendancerecords/tree`를 통해 시각화됩니다.

:::info
그룹이 유일한 진실의 원천이므로, 같은 그룹 구성원 자격이 키오스크 라우팅, B1Admin 그룹 페이지의 명단형 출석, 출석 보고를 모두 담당합니다. 그룹을 예배 시간에 배정하는 것만으로 체크인 목적지가 됩니다.
:::

## 어린이 안전

### 체크인 유형

모든 방문은 `checkinType`을 가집니다. `member`, `guest`, `volunteer`입니다(NULL은 레거시/교인을 뜻합니다. 마이그레이션 `tools/migrations/attendance/2026-07-03_checkin_type.ts`). 유형은 **키오스크 측에서** 선택합니다. 확장된 교인 행의 Member / Guest / Volunteer 칩(`B1Checkin/src/components/MemberServiceTimes.tsx`)이며, 완료 시 각 대기 중인 방문에 찍힙니다(`app/checkinComplete.tsx`, 기본값은 `member`). 서버는 게이트에서 이것을 사용합니다. 봉사자는 정원 대비가 아니라 비율 적용 대상에 포함되며, 게스트는 `guestCapacity`에 포함됩니다.

### 정원 및 봉사자 비율 게이트

`CheckinGateHelper.evaluate()`(`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`)는 저장 전에 `postCheckin` 안에서 실행됩니다. 엔드포인트는 트랜잭션이 아니므로, 저장 전 게이트가 정확성을 보장하는 메커니즘입니다. 이 함수는 대상 그룹마다 현재 인원(`VisitRepo.countActiveByGroupToday`)과 멤버십 모듈 게이트웨이를 통한 그룹 설정을 불러온 다음 위반을 분류합니다.

- **심각(항상 차단):** `checkinClosed`, `current + incoming > capacity`, `guestCapacity` 초과 게스트 인원. 배치는 `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`로 거부되며, 키오스크는 문제가 된 방을 표시합니다.
- **비율(경고 또는 차단):** `volunteers < minVolunteers`인 방, 봉사자가 전혀 없는 방, `children > volunteers × volunteerRatio`인 방에 봉사자가 아닌 사람이 들어오는 경우. 심각도는 교회별 `ratioEnforcement` 설정을 따릅니다(기본값은 `"warn"`, 또는 `"block"`. B1Admin의 Manage Church → Check-In, `CheckinSettingsEdit.tsx`에서 편집). 경고 모드는 클라이언트가 `acknowledgeWarnings=true`로 다시 제출하지 않는 한 `409 { warning: true, error: "ratio", … }`를 반환합니다. 이 재제출이 키오스크의 스태프 확인 재정의입니다.

### 예약된 체크인 기간

예배 시간에는 선택 사항인 주간 일정이 있을 수 있습니다(`dayOfWeek` 0–6, 0 = 일요일, `startTime`/`endTime`은 `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`). 이는 B1Admin의 **Attendance → Setup** 예배 시간 양식(`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in Schedule")에서 편집합니다. `CheckinGateHelper.hasSchedule()`은 `dayOfWeek`와 `startTime`이 모두 설정된 경우에만 예배 시간을 예약된 것으로 봅니다. 일정이 없는 예배 시간은 시간으로 게이트되지 않습니다. `isServiceTimeOpen()`은 현지 벽시계 시간(`DateHelper.toChurchTime`)으로 기간을 계산합니다. 시간대는 `CheckinTimeZoneHelper.load()`(`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`)가 예배 시간마다 결정합니다. 먼저 서비스 캠퍼스의 `timezone`(`service.campusId`, `MembershipModuleGateway.loadCampusTimeZones` 경유), 그다음 교회의 `timeZone`(B1Admin의 Church Information에서 설정), 그다음 `timezone`이 있는 첫 번째 미삭제 캠퍼스(`loadCampusTimeZone`), 마지막으로 `America/New_York`입니다. 캠퍼스가 먼저인 이유는, 대부분의 교회가 교회 시간대로 `America/New_York`이 소급 적용되어 있었기 때문입니다. 아래의 목록 경로와 게시 경로 모두 같은 방식으로 시간대를 결정합니다. 기간은 시작 전 `checkinOpenMinutes`부터 종료 후 `checkinCloseMinutes`까지이며(종료 시간이 없으면 시작 후), 자정이나 주 경계를 넘는 기간도 처리합니다.

기간은 두 곳에서 시행됩니다.

- **목록:** `GET /attendance/servicetimes`는 각 행에 계산된 `checkinOpen` 불리언을 붙입니다. B1App의 셀프 체크인(`CheckinPage.tsx`)과 B1Checkin의 예배 선택기(`app/services.tsx`)는 모든 시간을 유지합니다. 어떤 서비스의 모든 시간이 닫혀 있으면, 가장 빨리 열리는 시간을 표시합니다(B1App에서는 "Check-in opens Sun 9:30 AM.", B1Checkin에서는 "Check-in for this service opens Sun 9:30 AM.", `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`에서 가져옴). 열리는 시각을 계산할 수 없으면 "Check-in isn't open for this service right now."로 대체합니다(키오스크에는 다른 서비스를 고를 수 있도록 뒤로 가기 버튼이 있습니다). 그 외에는 닫힌 시간이 선택할 수 없는 "Closed" / "Closed · opens 9:30 AM" 행으로 표시됩니다. B1Checkin의 가구 화면(`MemberServiceTimes.tsx`)은 `ServiceTimeHelper.isCheckinOpen()`으로 기기 시계에서 실시간으로 열림 여부를 다시 평가합니다(교회의 시간대가 아니라 기기 시간대). 그래서 켜 둔 키오스크도 제시간에 열리고 닫힙니다. 그리고 사람이 이미 체크인한 닫힌 시간에는 "Kids Room 1 · Checked in"(그룹 이름)을 표시합니다.
- **게시:** `evaluateGates()` 안에서 정원/비율 평가 전에 `findClosedServiceTimeGroups()`가 대상 세션 중 하나라도 예배 시간의 기간 밖에 있으면 `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }`로 배치를 거부합니다. 가구의 오늘 기존 방문은 체크인할 때마다 다시 게시되므로, 사람이 이미 보유한 세션(기존 방문의 `personId|sessionId`)은 이 게이트를 건너뜁니다. 따라서 앞선 기간이 닫혔다는 이유로 나중의 열린 예배 시간 추가가 거부되지 않습니다. B1Checkin은 이를 "check-in isn't open right now"라는 이유를 가진 하드 게이트 화면으로 보여 줍니다(정원 위반은 여전히 "room is full or closed"로 표시됩니다).

### 연령/학년 자격 (키오스크 측)

방 자격은 자문용 UI이며, 키오스크에서 평가되고 서버에서 강제되지 않습니다. `B1Checkin/src/helpers/EligibilityHelper.ts`는 사람의 생년월일/학년을 그룹의 `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade`와 비교하며(학년 순서: PreK, K, 1–12, Graduated), `eligible` / `ineligible` / `unknown`을 반환합니다. 데이터가 없으면 `unknown`이 되며, 방을 숨기지 않습니다. 연령과 학년은 교회의 **학년 진급일**(`gradePromotionDate` 설정, `"MM-DD"`, `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`에서 편집) 기준으로 계산됩니다. 키오스크는 이를 `GET /attendance/checkin/settings`에서 가져오며, `resolveAsOfDate`는 오늘 이전 또는 당일 가장 최근의 해당 날짜를 선택합니다. 방 선택기는 자격이 있는 방을 강조하고 자격이 없는 방은 흐리게 표시합니다. 흐린 방을 선택하려면 스태프 확인이 필요합니다.

### 신뢰 픽업과 미승인 픽업

픽업 대상자는 가구별 멤버십 엔티티입니다. `householdPickupPeople`(`Api/src/modules/membership/models/HouseholdPickupPerson.ts`: householdId, 선택적 personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes)입니다. CRUD는 `GET /membership/householdpickup/:householdId`(키오스크가 읽을 수 있도록 인증된 모든 교회 사용자)와 `people.edit`로 제한된 `POST` / `DELETE`입니다. 스태프는 사람 페이지의 **Pickup** 카드(`B1Admin/src/people/components/PickupPeople.tsx`)에서 목록을 관리합니다. 사진, 관계, Trusted/Not Authorized 상태 칩이 있습니다.

체크아웃(`B1Checkin/app/checkout.tsx`)에서 키오스크는 가구의 픽업 목록을 불러옵니다. `trusted` 항목은 가구 성인 사진 격자와 함께 탭할 수 있는 픽업 카드로 표시됩니다. 자유롭게 입력된 "Other" 이름은 `notAuthorized` 항목과 퍼지 매칭(Levenshtein, `src/helpers/PickupMatchHelper.ts`)됩니다. 일치하면 경고 시트와 스태프용 **Override** 버튼이 나타나며 체크아웃이 차단됩니다. 재정의는 방문 자체에 기록됩니다. 일반 `POST /attendance/visits/checkout`을 통해 `checkedOutBy`를 `"OVERRIDE: {name}"`으로 보내므로, 별도의 감사 테이블이 아니라 출석 기록과 `attendance.checkout` 웹훅에 남습니다.

### 보호자 호출과 긴급 방송

`CheckinController`(`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`)는 두 개의 SMS 엔드포인트를 제공합니다.

- `POST /page` — `{ visitId, message }`: 체크인된 자녀 한 명의 보호자에게 호출을 보냅니다(키오스크 체크아웃 화면, 스태프 모드).
- `POST /broadcast` — `{ serviceId, message }`: 어떤 예배에 체크인된 모든 가구의 성인에게 문자를 보냅니다(키오스크 관리자 설정. `B1Checkin/app/adminSettings.tsx`의 `EMERGENCY` 입력 확인 시트 뒤에 있습니다).

두 엔드포인트 모두 멤버십 게이트웨이를 통해 가구 성인을 찾은 다음, 전달을 **`MessagingModuleGateway.sendBulkText`**(`Api/src/shared/modules/MessagingModuleGateway.ts`)에 넘깁니다. 이것은 교회가 설정한 문자 제공업체(`@churchapps/texting`: TextInChurch, Clearstream, MutualMinistry 중 하나로, 내장 SMS 발송기는 없습니다)로 들어가는 모듈 간 통로입니다. 게이트웨이는 `sentText` 행과 수신자별 `deliveryLog` 항목을 기록하며, 배치당 500명으로 제한합니다. 제공업체가 설정되지 않았다면 `no_provider`를 반환하고, 키오스크는 이를 "No SMS provider configured"로 표시합니다. 컨트롤러의 `dispatch()`는 전화번호 중복을 제거하고, 휴대폰이 없거나 `optedOut`인 사람을 건너뛰며, `{ sent, failed, skippedOptedOut, skippedNoPhone }`를 반환하므로 키오스크는 건너뛴 항목을 보여 줄 수 있습니다.

## 키오스크 (B1Checkin)

화면은 `B1Checkin/app/` 아래의 expo-router 파일이며, 화면 간 상태는 React 상태가 아니라 정적 `CachedData` 클래스(`src/helpers/CachedData.ts`)에 있습니다.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **조회** (`app/lookup.tsx`) — 전화번호(`GET /membership/people/search/phone?number=`, 끝 4자리 또는 전체) 또는 이름(`GET /membership/people/search?term=`)으로 검색합니다. 일치하는 사람을 선택하면 가구(`GET /membership/people/household/{householdId}`)와 기존 방문(`GET /attendance/visits/checkin`)을 불러오고, 지난주 선택으로 `pendingVisits`를 채웁니다.
2. **가구 확인** (`app/household.tsx`, `src/components/MemberList.tsx`) — 각 구성원 행에는 이미 체크인되었다는 배지, 알레르기/`nametagNotes` 배지, 현재 방 칩이 표시됩니다. 구성원을 펼치면 모든 예배 시간이 방 버튼과 Member / Guest / Volunteer 체크인 유형 칩(`MemberServiceTimes.tsx`)과 함께 나열됩니다. 각 예배 시간 이름 아래에는 `ServiceTimeHelper.getGroupSummary()`가 그 시간에 제공되는 그룹을 표시합니다(`serviceTime.groups` 이름을 다듬고, 대소문자 구분 없이 중복을 제거하여 쉼표로 연결). 시간에 그룹이 없으면 아무것도 표시되지 않습니다.
3. **그룹 배정** (`app/selectGroup.tsx`) — `serviceTime.groups`로 만든 카테고리 트리이며, 연령/학년이 맞는 방은 강조되고 맞지 않는 방은 스태프 확인 뒤에 흐리게 표시됩니다([연령/학년 자격 (키오스크 측)](#agegrade-eligibility-kiosk-side) 참고). 방을 고르면 그 사람의 대기 중인 방문에 `{ session: { serviceTimeId, groupId } }` visitSession이 기록됩니다(`src/helpers/VisitSessionHelper.ts`). "None"은 이를 지웁니다.
4. **완료** (`app/checkinComplete.tsx`) — `pendingVisits`(각각 `checkinType`이 찍힌 상태)로 `POST /attendance/visits/checkin`을 호출한 뒤, 프린터가 설정되어 있으면 라벨을 출력하고 조회 화면으로 자동 복귀합니다. `409` 정원 또는 `notOpen` 응답은 문제가 된 방과 이유(가득 참/닫힘 또는 체크인 열리지 않음)를 표시합니다. 비율 경고는 `acknowledgeWarnings=true`로 다시 제출하는 스태프 확인을 제공합니다.

**체크아웃** 화면(`app/checkout.tsx`)은 자동 포커스된 입력란으로 4자리 보안 코드를 받습니다. 그래서 USB/Bluetooth 키보드 방식 바코드 스캐너를 카메라 없이 사용할 수 있습니다. 또는 같은 알파벳을 쓰는 화면 키패드를 사용하며, 4자리가 되면 자동 제출됩니다. **Scan** 버튼은 공유 `src/components/CodeScanner.tsx` 카메라(기본적으로 후면, QR, Code 128, Code 39 허용)가 있는 시트를 열어, 키보드 스캐너가 없는 스테이션도 픽업 라벨을 읽을 수 있게 합니다. 스캔된 코드는 입력된 것과 같은 `handleCode()` 경로로 들어갑니다. 화면은 코드를 조회하고, 픽업되는 자녀를 표시하며, 가구의 **신뢰 픽업 대상자**를 가구 성인 사진 격자와 함께 탭할 수 있는 카드로 보여 줍니다(미승인 이름과 퍼지 확인하는 "Other" 자유 입력 옵션도 있습니다. [신뢰 픽업과 미승인 픽업](#trusted-and-not-authorized-pickup) 참고). 그 뒤 선택한 사람의 이름/ID와 함께 `POST /attendance/visits/checkout`을 보냅니다. 스태프 모드에서 화면은 **Page a parent**(`POST /attendance/checkin/page`)와 **보안 라벨 재출력**도 제공합니다. `reprint()`는 `LabelHelper.getAllLabelsFor(...)`로 가족의 라벨을 다시 만들고, 체크인과 같은 `PrintUI` 파이프라인으로 보냅니다.

스테이션의 성격은 AsyncStorage 플래그 `@StationMode`(`"self"` | `"manned"`, `app/adminSettings.tsx`에서 전환)입니다. 스태프 모드는 조회 화면에 체크아웃 진입점을 추가하고, 가구 화면에서 구성원별 프로필 편집(`POST /membership/people`)을 추가합니다. 키오스크 강화 기능도 내장되어 있습니다. 선택 사항인 PIN(`app/setPin.tsx`, `src/components/PinEntryModal.tsx`)이 관리자 및 프린터 화면을 보호하며, 관리자 화면은 헤더 로고를 7번 빠르게 탭해야 열립니다. 유휴 대기 화면(`src/hooks/useInactivityTimer.ts`)은 가족 사이에 화면을 장악합니다.

## 셀프 체크인 (B1App)

교인은 b1.church 포털의 `/mobile/checkin` 화면에서 체크인합니다(`B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx`가 `screens/CheckinPage.tsx`로 라우팅합니다). 로그인한 사용자가 필요하며, 키오스크와 같은 네 단계(예배 → 가구 → 그룹 → 완료)를 같은 엔드포인트를 통해 거칩니다. 상태는 `B1App/src/helpers/CheckinHelper.ts`에 있습니다. 키오스크와의 차이점은 다음과 같습니다. 가구는 로그인한 사용자 자신의 `householdId`에서 가져오며(검색 단계 없음), 라벨 출력은 없습니다. 대신 완료 화면은 배치의 보안 코드를 QR(`qrcode.react`)로 보여 주며, "체크인 스테이션에서 이것을 보여 주세요"라는 안내가 붙습니다. 페이지가 로드될 때 가구가 이미 체크인되어 있다면, "Show check-in code" 버튼이 `GET /attendance/visits/checkin`의 첫 번째 기존 방문 중 `securityCode`가 있는 것에서 QR을 다시 표시합니다. 체크인은 제출 시 즉시 기록되며(대기 상태가 없습니다), QR은 키오스크에서 라벨 출력만 담당합니다.

**휴대폰에서 키오스크로 라벨 출력** (`B1Checkin/app/scan.tsx`, 조회 화면의 QR "Scan code" 버튼에서 진입): 키오스크는 `CodeScanner`(`expo-camera`의 `CameraView`, 기본적으로 전면이며 전환 가능)를 보여 주고 QR 코드를 스캔합니다. `ScanCodeHelper.parse()`는 보안 코드 알파벳의 4자리 코드만 담긴 페이로드를 허용하며, `ScanCodeHelper.isRepeat()`는 같은 코드를 4초 동안 무시합니다. 그래서 B1App QR과 인쇄된 라벨의 QR 블록 둘 다 작동합니다. 그 뒤 화면은 체크아웃 재출력 경로를 따릅니다. `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI`이며, 조회 화면으로 돌아갑니다. 스캔 시점에는 출석 쓰기가 일어나지 않으며, 라벨만 출력합니다. 활성 방문이 없는 코드, 프린터가 없는 스테이션, 라벨이 없는 그룹은 각각 토스트를 표시하고 조회 화면으로 돌아갑니다.

타입과 `ApiHelper`/`ArrayHelper`는 `@churchapps/helpers`와 `@churchapps/apphelper`에서 가져옵니다. B1Admin과 공유되는 React 컴포넌트는 없습니다.

## 관리자 측 출석 (B1Admin)

- **설정** — `/attendance`(`B1Admin/src/attendance/AttendancePage.tsx`)가 구조 트리를 렌더링하며, 서비스(`ServiceEdit.tsx`)와 예배 시간(`ServiceTimeEdit.tsx`)을 만듭니다. 캠퍼스 데이터는 `useCampuses()` 훅을 통해 멤버십에서 가져옵니다.
- **수동 출석**은 출석 섹션이 아니라 그룹 쪽에 있습니다. `B1Admin/src/groups/components/GroupSessionsTab.tsx`가 세션을 만들고(`POST /attendance/sessions`. 추가할 때 `SessionEdit.tsx`는 선택한 예배 시간을 공유하는 다른 그룹마다 세션을 하나씩 포함할 수 있으며, 그날 이미 세션이 있는 그룹은 건너뜁니다), `POST /attendance/visitsessions/log`로 사람을 출석으로 표시합니다. 이 엔드포인트는 그 사람과 세션에 대한 방문을 찾거나 만듭니다. 그룹 리더는 `attendance.edit` 권한이 없어도 자기 그룹의 출석을 기록할 수 있습니다. 컨트롤러가 `au.leaderGroupIds`를 확인하기 때문입니다.
- **보고** — 출석 추세와 그룹 출석은 서버에서 정의한 보고서입니다(`B1Admin/src/components/reporting/ReportWithFilter.tsx`가 ReportingApi를 사용하며, 정의는 `Api/reports/*.json`에 있습니다). 둘 다 `startDate`/`endDate`(종료일 포함)를 받습니다. 추세 보고서는 기본적으로 1년 전부터 오늘까지이며 주별 `sessionDates` 열을 추가합니다. 그룹 출석의 화면 트리에는 각 방문의 `checkinTime`과 사람의 `membershipStatus`가 포함됩니다. 그룹 출석의 CSV는 짝이 되는 `groupAttendanceDownload` 보고서에서 나오며, `GroupAttendanceDownloadHelper`가 구성원 한 명당 한 행으로 피벗하고 날짜가 있는 세션마다 출석/결석 열을 둡니다. 사람별 기록은 `GET /attendance/attendancerecords?personId=`입니다(`B1Admin/src/people/components/PersonAttendance.tsx`).

## 라벨 출력

### 템플릿과 디자이너

교회는 B1Admin의 `/mobile/checkin/labels`에서 자체 라벨을 디자인합니다(`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`. 체크인 설정 페이지에서 진입합니다). 템플릿은 `content`가 블록의 JSON 배열인 `labelTemplates` 행입니다. 블록은 `text`, `field`, `barcode`, `qrcode`, `box` 중 하나이며, 각 블록은 백분율 좌표에 위치하고 글꼴, 정렬, 기호 체계(`code39`/`code128`/`qr`), 선택적 표시 조건을 가집니다(예: `person.nametagNotes`가 비어 있지 않을 때만 알레르기 상자를 표시). `labelType`은 두 가지입니다. `nametag`(체크인된 사람마다 하나. `person.displayName`, `sessions`, `securityCode`, `person.isBirthdayWeek` 같은 필드를 사용합니다. `person.isBirthdayWeek`는 생일의 월/일이 오늘로부터 3일 이내이면 `"true"`이며, 연말을 넘어 계산됩니다. `LabelHelper.isBirthdayWithin()`에서 계산)와 `pickup`(가족마다 하나. `children`, `childrenAllergies` 같은 필드를 사용합니다)입니다. 서버는 교회마다 유형별 기본값을 하나만 허용합니다(`LabelTemplateController.save`). 디자이너는 키오스크의 번들 라벨을 본뜬 시작용 템플릿을 제공하며, 샘플 데이터로 미리 보기를 보여 줍니다.

### 키오스크에서의 렌더링과 출력

체크인이 완료되면 `B1Checkin/src/helpers/LabelHelper.ts`가 각 대기 방문의 그룹 플래그에 따라 출력할 항목을 결정합니다. `printNametag` 그룹에는 이름표를, 방문 하나라도 `parentPickup` 그룹에 해당하면 가족 픽업 라벨 한 장을 출력합니다. `checkinType`이 `volunteer`인 방문은 `LabelHelper.selectChildVisits()`에서 제외되므로, Parent Pickup 방에 있는 보육 봉사자가 픽업 라벨을 유발하지 않습니다. 체크인 응답의 보안 코드는 자녀 이름표와 픽업 라벨에 들어가며, 성인 이름표에는 코드가 없습니다. 교회에 템플릿이 있으면 `LabelRenderer`(`src/helpers/LabelRenderer.ts`)가 블록과 필드 컨텍스트를 독립형 HTML 문서로 바꿉니다. 없다면 `B1Checkin/assets/labels/`의 번들 HTML 라벨을 자리 표시자 치환으로 사용합니다.

바코드는 `B1Checkin/src/helpers/barcode.ts`의 순수 TypeScript 인코더가 인라인 SVG로 생성합니다. Code 39 패턴 표와 Code 128(mod-103 체크섬이 있는 코드 세트 B) 너비 표, 그리고 `qrcode` 패키지를 통한 QR입니다. **이 인코더는 B1Admin에 의도적으로 중복되어 있습니다**(`LabelEditor.tsx`가 같은 표를 인라인으로 포함하며, 코드 주석으로 기록되어 있습니다). 그래서 디자이너 미리 보기가 키오스크 출력과 픽셀 단위로 같습니다. 한쪽을 바꾸면 다른 쪽도 반드시 바꿔야 합니다.

출력 파이프라인(`src/components/PrintUI.tsx`)은 각 HTML 라벨을 `WebView`에서 렌더링하고, `react-native-view-shot`으로 JPG로 캡처하며, 이미지 URI를 네이티브 **printer-helper** Expo 모듈(`B1Checkin/modules/printer-helper/`)에 넘깁니다. 이 모듈은 `scan()`, `checkInit()`, `printUris()`와 상태 이벤트를 노출하며, 양쪽 플랫폼에 브랜드별 제공자가 있습니다.

| 브랜드 | Android | iOS | 참고 |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt`(Brother 인쇄 SDK) | `BrotherProvider.swift`(`BRLMPrinterKit.xcframework`) | QL 시리즈 네트워크 프린터(QL-800/810W/820NWB/1100/1110NWB…), 29×90 다이컷 라벨, 권장 기본값 |
| Zebra | `ZebraProvider.kt`(Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | 네트워크 검색 + TCP/ZPL 이미지 출력 |

프린터 선택은 `app/printers.tsx`에 있습니다(네트워크 스캔은 `brand~model~ip` 항목을 반환하며, 선택은 AsyncStorage에 저장됩니다). `src/helpers/PrinterLog.ts`는 키오스크 헤더의 실시간 상태 점을 통해 보이는 기기 내 진단 로그를 유지합니다.

## 게스트 등록

체크인 도중 사람을 만드는 경로는 두 가지입니다.

- **키오스크에서** — 가구 화면의 "Add guest"가 `B1Checkin/app/addGuest.tsx`를 엽니다. 이 화면은 먼저 `GET /membership/people/search?term=`으로 기존 비교인 일치 항목을 찾고, 없으면 `POST /membership/people`로 만들어 현재 가구에 붙입니다. 이후 게스트는 다른 구성원과 같이 그룹 배정을 거칩니다.
- **QR을 통한 셀프 서비스** — 교회 설정 `enableQRGuestRegistration`이 켜져 있으면(B1Admin의 체크인 설정에서 구성하며, `GET /membership/settings/public/{churchId}`에서 읽음) 키오스크 조회 화면이 `https://{subdomain}.b1.church/guest-register?serviceId=`로 연결되는 QR 코드를 보여 줍니다. 그 B1App 페이지(`src/app/[sdSlug]/(public)/guest-register/page.tsx`)는 방문하는 가족이 자기 휴대폰으로 익명 `POST /membership/people/guest-register` 엔드포인트를 통해 직접 등록하게 하여, 키오스크 줄이 계속 움직이도록 합니다. QR 시트에는 같은 페이지를 키오스크에서 시크릿 모드, 캐시 비활성화 `WebView`로 여는 **Register here** 버튼도 있습니다(`app/guestRegister.tsx`). `src/helpers/GuestRegisterHelper.ts`는 QR과 WebView 양쪽의 URL을 만들고, `https://{subdomain}.b1.church/guest-register` 밖으로의 이동을 차단합니다. 화면은 **Done**, 뒤로 가기, 또는 120초 동안의 비활동(양식 입력은 WebView에서 활동으로 전달됩니다) 시 조회 화면으로 돌아가며, WebView를 언마운트하여 한 가족의 입력이 다음 가족에게 전달되지 않게 합니다.

QR 가입은 B1Admin의 **QR Guest Registration** 카드(`src/mobile/CheckInPage.tsx`)에서 저장된 교회 설정으로 구동됩니다.

| 설정 | 공개 범위 | 목적 |
|---|---|---|
| `enableQRGuestRegistration` | public | 키오스크 QR과 익명 엔드포인트의 옵트인 스위치 |
| `guestRegistrationFields` | public | `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments`를 `"off"` / `"optional"` / `"required"`에 매핑한 JSON 맵. 기본값: 이메일과 전화는 선택, 나머지는 끔. 이름과 성은 항상 필수 |
| `guestRegistrationImage` | public | 헤더 사진 URL. B1App은 양식과 확인 화면에서 아이콘 대신 16:9로 렌더링합니다 |
| `guestRegistrationGroupId` | private | 모든 가입이 추가되는 그룹(게스트는 이를 보거나 고를 수 없습니다) |
| `guestRegistrationRecordAttendance` | private | 이 그룹의 출석도 기록하려면 `"true"` |

B1App의 `src/components/checkin/GuestRegister.tsx`는 익명 `GET /membership/people/guest-register/options?churchId=`에서 체크리스트를 가져오고, 포함된 필드만 렌더링합니다(주 연락처에 이메일, 전화, 혼인 상태, 주소, 구성원마다 생년월일, 성별, 학년, 댓글 상자 하나). 그리고 그 필드만 보냅니다. 서버는 `PersonHelper.registerGuestHousehold()`가 실행되기 전에 `GuestRegistrationHelper.sanitize()`에서 체크리스트를 다시 적용합니다. 꺼진 필드는 버리고, 필수 필드가 없거나 목록 밖의 값이면 400입니다. 먼저 이메일이나 전화번호가 있는 구성원마다 `PersonRepo.findGuestMatch()`를 호출합니다. 이름과 이메일 또는 전화번호 숫자가 같은 살아 있는 사람이 정확히 한 명이면 재사용하며, 0명이나 여러 명이면 새 사람을 만듭니다(추측하지 않습니다). 연락처가 없는 구성원은 일치한 가구 안에서 이름으로 일치합니다. 재사용된 사람은 절대 편집되지 않으므로 익명 양식이 저장된 세부 정보를 덮어쓸 수 없으며, 응답은 제출된 이름을 그대로 돌려줍니다. 일치하지 않는 구성원은 일치한 가구나 새 가구에 `membershipStatus: "Visitor"`로 합류하며, 새로 만든 사람마다 `person.created`를 발생시킵니다. 그 뒤의 실패는 반환하지 않고 기록합니다. 구성원은 설정된 그룹에 추가되며(`group.member.added`), 출석 기록이 켜져 있으면 `AttendanceModuleGateway.recordAttendance()`가 그 그룹의 예약된 예배 시간 중 체크인 기간(`CheckinGateHelper.isServiceTimeOpen`)이 지금 열려 있는 모든 시간에 대해 구성원을 출석으로 표시합니다. 필요하면 교회 현지 날짜 기준으로 오늘의 세션을 만듭니다. 일정이 없는 예배 시간이나 기간 밖의 가입은 아무것도 기록하지 않습니다. 댓글은 세대주에 대한 숨김 사람 메모 대화(메시지 작성자 "Guest sign-up")가 되며, `person.conversationId`로 연결됩니다.

## 관련 페이지

- [Attendance 엔드포인트](../api/endpoints/attendance) -- 캠퍼스, 서비스, 세션, 방문, 방문 세션의 전체 REST 표면
- [Membership 엔드포인트](../api/endpoints/membership) -- 사람, 가구, 그룹
- [웹훅](../api/webhooks) -- `session.created`, `attendance.recorded`, `attendance.checkout` 이벤트
- [모듈 구조](../api/module-structure) -- 서버 측에서 attendance 모듈이 구성되는 방식
