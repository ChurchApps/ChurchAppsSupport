---
title: "체크인"
description: "B1Checkin, B1App, B1 Admin에서 체크인이 작동하는 방식: 출석 데이터 모델, 방으로서의 그룹, 정원 제한, 픽업 안전 규칙을 설명합니다."
---

# 체크인

<div class="article-intro">

체크인은 하나의 시스템이며 세 개의 진입점을 가집니다. 직원이 응대하거나 셀프 서비스로 사용하는 스테이션을 위한 B1Checkin 키오스크 앱, B1App 교인 포털의 셀프 체크인, 그리고 B1Admin의 관리자 측 출석 기능입니다. 세 곳 모두 핵심 Api의 같은 출석 모듈에 기록하며, 교실 배정은 전적으로 그룹이 담당합니다. 별도의 "장소"나 "방" 엔티티는 없습니다. 그 위에 아동 안전 계층이 있습니다. 방문마다의 체크인 유형, 서버 측 정원 및 봉사자 비율 게이트, 키오스크 측 연령/학년 적격성, 체크아웃 시 신뢰 픽업인 확인, 그리고 교회의 문자 메시지 제공자를 통한 부모 호출이 포함됩니다. 이 페이지는 데이터 모델, 체크인 흐름, 안전 계층, 라벨 인쇄 파이프라인을 정리합니다.

</div>

## 개요

```
┌──────────────────────────┐
│ B1Checkin (Expo 키오스크) │──┐         ┌──────────────────────────────────────────────┐
│  조회 → 가구 →            │  │         │ Api                                          │
│  그룹 → 완료/인쇄          │  │  HTTPS  │  ┌─ membership 모듈 ───────────────────────┐ │
├──────────────────────────┤  ├───────▶ │  │ 교인 · 가구 · 그룹                       │ │
│ B1App (셀프 체크인)       │──┤         │  └─────────────────────────────────────────┘ │
│  /mobile/checkin 화면     │  │         │  ┌─ attendance 모듈 ───────────────────────┐ │
├──────────────────────────┤  │         │  │ campuses → services → serviceTimes      │ │
│ B1Admin (직원)            │──┘         │  │ groupServiceTimes  (방 배정)             │ │
│  설정 · 보고서 ·           │            │  │ sessions ← visitSessions → visits       │ │
│  라벨 디자이너            │            │  │ labelTemplates                          │ │
└──────────────────────────┘            │  └─────────────────────────────────────────┘ │
                                        └──────────────────────────────────────────────┘

라벨 인쇄 경로(키오스크 전용):
POST /attendance/visits/checkin ──▶ { securityCode, streaks }
  └▶ LabelHelper (라벨 템플릿, 또는 기본 제공 HTML 대체본)
       └▶ LabelRenderer → HTML 문서 + 인라인 SVG 바코드
            └▶ PrintUI: WebView 렌더링 → ViewShot JPG 캡처
                 └▶ printer-helper 네이티브 모듈 → Brother QL / Zebra
```

| 화면 | 저장소 | 스택 | 역할 |
|---------|-------|-------|------|
| 키오스크 | `B1Checkin` | Expo / React Native, expo-router 파일 라우팅. Android, Amazon Fire, iOS용 EAS 빌드. `expo-updates`로 OTA 업데이트 | 라벨 인쇄와 확인된 체크아웃이 가능한, 직원이 응대하거나 셀프 서비스로 쓰는 스테이션 |
| 셀프 체크인 | `B1App` | Next.js(b1.church 교인 포털) | 로그인한 교인이 휴대폰으로 가구를 체크인함. 인쇄 없음 |
| 관리자 | `B1Admin` | React SPA | 예배 구조 설정, 그룹을 예배 시간에 배정, 라벨 디자인, 수동 출석 기록, 보고서 실행 |

세 곳 모두 `ApiHelper`를 통해 같은 두 API 모듈을 호출합니다. 교인, 가구, 그룹을 담당하는 **MembershipApi**(`/membership`)와, 아래의 모든 기능을 담당하는 **AttendanceApi**(`/attendance`)입니다.

## 데이터 모델 (`Api/src/modules/attendance`)

| 엔티티 / 테이블 | 주요 필드 | 의미 |
|----------------|-----------|---------|
| `campuses` | name, address | 여기서는 더 이상 사용하지 않음. 캠퍼스는 membership 모듈(`/membership/campuses`)에서 관리되며, attendance 쪽 복사본은 레거시 읽기 전용으로 고정됨(`models/Campus.ts`) |
| `services` | campusId, name | 반복되는 모임. 예: "Sunday Morning"(`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | 예배 안의 시간대. 예: "9:00 AM"(`models/ServiceTime.ts`). 일정 열은 선택 사항이며(마이그레이션 `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`), [체크인 시간대](#scheduled-check-in-windows)를 결정함 |
| `groupServiceTimes` | groupId, serviceTimeId | 조인 테이블. 어떤 그룹(교실)이 어떤 예배 시간에 모이는지 정함(`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | 하루에 한 그룹이 가지는 모임 1회. 체크인 시점에 지연 생성됨(`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | 하루에 한 사람이 출석한 기록(`models/Visit.ts`). `checkinType`은 `member` / `guest` / `volunteer`(NULL = 레거시 교인). 키오스크가 설정하며 정원/비율 게이트가 사용함 |
| `visitSessions` | visitId, sessionId | 방문이 포함하는 세션. 두 예배 시간에 체크인한 아이는 두 행을 가짐(`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType(`nametag`/`pickup`), width, height, isDefault, content(JSON 블록) | 디자인 가능한 라벨 레이아웃(`models/LabelTemplate.ts`) |

### 완료된 체크인의 저장 방식

`VisitController.postCheckin`(`Api/src/modules/attendance/controllers/VisitController.ts`)이 `POST /attendance/visits/checkin?serviceId=&peopleIds=`를 처리합니다. 요청 본문은 `Visit` 객체의 배열이며, 각 객체는 `visitSessions`를 가지고, 그 안의 `session`은 `(serviceTimeId, groupId)` 쌍만 지정합니다. 그다음 서버는 다음을 수행합니다.

1. **쓰기 전에 정원과 비율을 확인합니다.** `evaluateGates()` → `CheckinGateHelper.evaluate()`가 대상 방마다 정원, 손님 정원, 닫힘 여부, 현재 인원 대비 봉사자 비율을 확인합니다. postCheckin은 **트랜잭션이 아니므로**, 게이트는 첫 저장 전에 실행되어야 합니다. 심각한 위반이 있으면 문제가 된 방을 명시한 409가 반환되며 아무것도 저장되지 않습니다. [정원 및 봉사자 비율 게이트](#capacity-and-volunteer-ratio-gates)를 참고하세요.
2. **세션을 지연 방식으로 확인합니다.** `getSessionId()`가 `(groupId, serviceTimeId, today)`에 대한 `sessions` 행을 찾거나 만듭니다. 세션 ID는 날짜별로 프로세스 안에서 캐시됩니다. 새 세션은 `session.created` 웹훅을 발송합니다. 반복문은 `await`를 쓰는 `for..of`입니다. 예전의 fire-and-forget `forEach(async …)`는 저장과 경합하여 첫 세션 생성 시 sessionId를 NULL로 기록하는 문제가 있었습니다(수정됨. 반복문 옆 코드 주석에 기록됨).
3. **그날의 기록을 교체합니다.** 해당 예배의 오늘 날짜에 그 사람들의 기존 방문과 visitSessions를 모두 삭제한 뒤, 제출된 집합을 저장합니다. 따라서 가족을 다시 체크인하는 것은 추가가 아니라 "이것이 현재 상태다"라는 멱등성 있는 작업입니다. 대신 `?checkDuplicates=true`를 전달하면 쓰지 않고 `{ duplicates: [personId…] }`를 반환합니다. 키오스크가 덮어쓰기 전에 경고할 때 이 방식을 씁니다.
4. **배치당 보안 코드 하나를 만듭니다.** `SecurityCodeHelper.generate()`는 `23456789BCDFGHJKLMNPQRSTVWXYZ` 알파벳에서 4자리 코드를 만듭니다(모음과 헷갈리기 쉬운 문자가 없으므로 코드가 단어를 이루거나 잘못 읽히지 않습니다). 서버는 같은 교회의 같은 날 열린 방문과 충돌하면 다시 시도하며, 배치의 모든 방문에 이 코드를 찍습니다.
5. **`{ streaks, securityCode }`를 반환합니다.** `streaks`는 personId를 연속 출석 주 수에 대응시키며, 키오스크는 이정표(5주마다)에 색종이 효과로 축하합니다.

저장된 방문마다 `attendance.recorded` 웹훅도 발송됩니다. 읽기 쪽인 `GET /attendance/visits/checkin`은 사람들의 방문을 **마지막으로 기록된 날짜**부터 반환합니다. 그날이 지난주라면 id를 제거하므로, 클라이언트는 지난주 방 선택을 미리 채운 복사본을 받으며, 이것은 새 기록으로 저장됩니다.

### 체크아웃

두 엔드포인트가 흐름을 완성합니다(`VisitController`).

- `GET /attendance/visits/code/:code` -- 해당 보안 코드를 가진, 아직 체크아웃되지 않은 오늘의 방문. 세션이 채워져 있음.
- `POST /attendance/visits/checkout` -- 본문 `{ visitIds, checkedOutBy?, checkedOutById? }`. `checkoutTime`과 픽업한 사람을 기록하며, 방문마다 `attendance.checkout` 웹훅을 발송함.

권한: 키오스크는 `attendance.checkin`으로 인증합니다. 이 권한은 체크인/체크아웃/라벨 템플릿 기능만 정확히 부여하며, `people.view`가 없어도 키오스크에 필요한 가구 조회(전화번호/이름 검색, 체크인 모델의 가구 구성원, 가구 픽업 목록)를 함께 허용합니다. B1Checkin의 `SessionHelper.filterChurches`는 계정이 `Attendance/Checkin` 또는 `Attendance/Edit`를 가진 교회만 보여 줍니다. `Checkin`은 더 이상 Everyone(역할 없음) 권한에 포함되지 않으므로(`RoleHelper`와 마이그레이션 `2026-11-01_remove_everyone_checkin`), 실제 역할을 통해 부여해야 합니다. `attendance.view`/`attendance.edit`는 보고와 수동 입력을 담당하며, 구조(예배, 예배 시간, 그룹 배정)는 `services.edit`가 필요합니다. 교인 셀프 체크인(B1App)에는 어떤 권한도 필요하지 않습니다. 교회에 연결된 교인이 있는 인증 사용자라면 누구나 `GET`/`POST /attendance/visits/checkin`을 호출할 수 있으며, 서버는 제출된 `personId`를 호출자 자신의 가구로 제한합니다(그 밖에는 403). 이 울타리 덕분에 다른 가족의 `securityCode`를 읽을 수 없습니다. 교인 자격이 곧 권한이며, 교인이 기능을 *볼 수 있는지*는 교회의 B1App 탐색 탭으로 제어합니다. 나머지 체크인 엔드포인트(`code/:code`, `checkout`, `guardians`, `CheckinController`)는 여전히 키오스크와 직원 전용입니다.

## 그룹이 방 배정을 담당합니다

시스템 어디에도 방이나 교실 엔티티가 없습니다. "방"은 `trackAttendance`가 켜져 있고 `groupServiceTimes`를 통해 하나 이상의 예배 시간에 연결된 교인 **그룹**입니다. 키오스크 동작을 결정하는 그룹 필드(`Api/src/modules/membership/models/Group.ts`)는 다음과 같습니다.

| 필드 | 효과 |
|------|--------|
| `trackAttendance` | 그룹이 출석에 참여함. B1Admin의 설정 트리는 `groupServiceTimes` 행이 없는 `trackAttendance` 그룹을 미배정으로 표시함 |
| `parentPickup` | 아이 방을 표시함. 이 방에 체크인하면 방문이 "자녀" 방문이 되어 가족 픽업 라벨이 인쇄되고, 이름표에 보안 코드가 찍힘 |
| `printNametag` | 이 그룹에 체크인할 때 이름표를 인쇄할지 여부 |
| `capacity` / `guestCapacity` / `checkinClosed` | 방 정원 제한과 강제 "닫힘" 스위치. 체크인 게이트가 서버 측에서 강제함(B1Admin의 그룹 설정 "Check-In Capacity"에서 편집) |
| `volunteerRatio` / `minVolunteers` | 아이 대 봉사자 비율과 최소 봉사자 인원. 교회 전체의 `ratioEnforcement` 설정에 따라 강제됨 |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | 키오스크 쪽에서 방을 강조하거나 흐리게 하는 데 쓰는 연령/학년 적격성 범위 |

모든 클라이언트가 같은 방식으로 데이터를 정규화합니다(예: `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`). `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, `GET /membership/groups`를 병렬로 불러온 뒤, 각 예배 시간에 대해 `groupServiceTimes` 행이 그 예배 시간을 가리키는 그룹들을 모아 `serviceTime.groups`에 넣습니다. 이 배열이 방 선택기에 표시되며, 그룹의 `categoryName`으로 정리됩니다.

배정은 B1Admin의 그룹 페이지에서 편집합니다(`B1Admin/src/groups/components/ServiceTimesEdit.tsx`, `POST`/`DELETE /attendance/groupservicetimes`). 캠퍼스 → 예배 → 예배 시간 → 그룹의 전체 트리는 `GET /attendance/attendancerecords/tree`를 통해 `B1Admin/src/attendance/components/AttendanceSetup.tsx`에서 시각화됩니다.

:::info
그룹이 유일한 진실 원천이므로, 같은 그룹 소속 정보가 키오스크 라우팅, B1Admin 그룹 페이지의 명단형 출석, 출석 보고를 모두 뒷받침합니다. 그룹을 예배 시간에 배정하는 것만으로 체크인 목적지가 되는 데 충분합니다.
:::

## 아동 안전

### 체크인 유형 {#check-in-types}

모든 방문에는 `checkinType`이 있습니다. `member`, `guest`, `volunteer` 중 하나이며, NULL이면 레거시/교인입니다(마이그레이션 `tools/migrations/attendance/2026-07-03_checkin_type.ts`). 유형은 **키오스크 쪽에서** 선택합니다. 펼쳐진 교인 행의 Member / Guest / Volunteer 칩(`B1Checkin/src/components/MemberServiceTimes.tsx`)으로 고르며, 완료 시 대기 중인 각 방문에 찍힙니다(`app/checkinComplete.tsx`, 기본값 `member`). 서버는 게이트에서 이 값을 사용합니다. 봉사자는 정원에 더하지 않고 비율 충족에 포함되며, 손님은 `guestCapacity`에 포함됩니다.

### 정원 및 봉사자 비율 게이트 {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()`(`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`)는 저장 전에 `postCheckin` 안에서 실행됩니다(이 엔드포인트는 트랜잭션이 아니므로, 저장 전 게이트가 정확성의 메커니즘입니다). 대상 그룹마다 현재 인원(`VisitRepo.countActiveByGroupToday`)을 불러오고, membership 모듈 게이트웨이를 통해 그룹 설정을 가져온 뒤 위반을 분류합니다.

- **심각(항상 차단):** `checkinClosed`, `현재 + 들어오는 인원 > capacity`, 손님 수가 `guestCapacity` 초과. 배치는 `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`로 거부되며, 키오스크는 문제가 된 방의 이름을 보여 줍니다.
- **비율(경고 또는 차단):** 봉사자가 `minVolunteers`보다 적은 방, 봉사자가 전혀 없는 방, 또는 `아이 수 > 봉사자 수 × volunteerRatio`인 방에 들어오는 봉사자가 아닌 인원. 심각도는 교회별 `ratioEnforcement` 설정을 따릅니다(`"warn"`이 기본값, `"block"`도 가능. B1Admin의 Manage Church → Check-In, `CheckinSettingsEdit.tsx`에서 편집). 경고 모드에서는 클라이언트가 `acknowledgeWarnings=true`를 붙여 다시 제출하지 않으면 `409 { warning: true, error: "ratio", … }`를 반환합니다. 이 재제출이 키오스크의 직원 확인 우회 절차입니다.

### 예약된 체크인 시간대 {#scheduled-check-in-windows}

예배 시간에는 선택적으로 주간 일정을 둘 수 있습니다. `dayOfWeek`는 0~6(0 = 일요일), `startTime`/`endTime`은 `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`입니다. 이는 B1Admin의 **Attendance → Setup** 예배 시간 양식(`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in Schedule")에서 편집합니다. `CheckinGateHelper.hasSchedule()`은 `dayOfWeek`와 `startTime`이 모두 설정된 경우에만 예배 시간을 예약된 것으로 봅니다. 일정이 없는 시간은 시간 기준으로 제한하지 않습니다. `isServiceTimeOpen()`은 현지 벽시계 시간(`DateHelper.toChurchTime`)으로 시간대를 계산합니다. 시간대는 `CheckinTimeZoneHelper.load()`(`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`)가 예배 시간마다 결정합니다. 우선순위는 예배 캠퍼스(`service.campusId`, `MembershipModuleGateway.loadCampusTimeZones` 경유)의 `timezone`이 먼저이고, 다음은 교회의 `timeZone`(B1Admin 교회 정보에서 설정), 그다음은 `timezone`이 있는 제거되지 않은 첫 캠퍼스(`loadCampusTimeZone`)이며, 마지막이 `America/New_York`입니다. 캠퍼스를 먼저 보는 이유는 대부분의 교회가 교회 시간대로 `America/New_York`이 소급 입력되어 있었기 때문입니다. 아래의 목록 조회 및 게시 경로는 모두 같은 방식으로 시간대를 결정합니다. 시간대 창은 시작 전 `checkinOpenMinutes`부터 종료 후 `checkinCloseMinutes`까지이며(종료 시간이 없으면 시작 후), 자정이나 주 경계를 넘는 창도 처리합니다.

이 창은 두 곳에서 강제됩니다.

- **목록 조회:** `GET /attendance/servicetimes`는 각 행에 계산된 `checkinOpen` 불리언을 붙입니다. B1App 셀프 체크인(`CheckinPage.tsx`)과 B1Checkin의 예배 선택 화면(`app/services.tsx`)은 모든 시간을 유지합니다. 어떤 예배의 모든 시간이 닫혀 있으면, 가장 빨리 열리는 시간을 보여 줍니다(B1App에서는 "Check-in opens Sun 9:30 AM.", B1Checkin에서는 "Check-in for this service opens Sun 9:30 AM.". `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`에서 가져옴). 열리는 시간을 계산할 수 없으면 "Check-in isn't open for this service right now."로 대체합니다(키오스크에는 다른 예배를 고를 수 있도록 뒤로 가기 버튼이 있습니다). 그 밖의 닫힌 시간은 선택할 수 없는 "Closed" / "Closed · opens 9:30 AM" 행으로 표시됩니다. B1Checkin의 가구 화면(`MemberServiceTimes.tsx`)은 기기 시계로(교회의 시간대가 아니라 기기의 시간대로) `ServiceTimeHelper.isCheckinOpen()`을 사용해 열림 여부를 실시간으로 다시 계산합니다. 그래서 계속 켜져 있는 키오스크도 정확한 시간에 열리고 닫힙니다. 또 그 사람이 이미 체크인한 닫힌 시간에는 "Kids Room 1 · Checked in"(그룹 이름)을 표시합니다.
- **게시:** `evaluateGates()` 안에서 정원/비율 평가 전에 `findClosedServiceTimeGroups()`가 실행됩니다. 대상 세션의 예배 시간이 창 밖이면 배치를 `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }`로 거부합니다. 가구의 기존 방문은 체크인할 때마다 다시 게시되므로, 그 사람이 이미 가진 세션(기존 방문의 `personId|sessionId`)은 이 게이트를 건너뜁니다. 그래서 이른 창이 닫혔다는 이유로 나중에 열리는 예배 시간이 거부되지 않습니다. B1Checkin은 이를 하드 게이트 화면에 "check-in isn't open right now"(정원 위반은 여전히 "room is full or closed")라는 사유로 표시합니다.

### 연령/학년 적격성(키오스크 쪽) {#agegrade-eligibility-kiosk-side}

방 적격성은 권고용 UI이며, 키오스크에서 평가하고 서버는 강제하지 않습니다. `B1Checkin/src/helpers/EligibilityHelper.ts`는 교인의 생년월일/학년을 그룹의 `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade`와 비교하며(학년 순서: PreK, K, 1–12, Graduated), `eligible` / `ineligible` / `unknown`을 반환합니다. 데이터가 없으면 `unknown`이 되며, 방을 절대 숨기지 않습니다. 나이와 학년은 교회의 **학년 진급일**(`gradePromotionDate` 설정, `"MM-DD"`, `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`에서 편집)을 기준으로 계산합니다. 키오스크는 `GET /attendance/checkin/settings`에서 이 값을 가져오며, `resolveAsOfDate`가 오늘 이전 또는 오늘인 가장 최근 발생일을 고릅니다. 방 선택기는 적격한 방을 강조하고 부적격한 방은 흐리게 표시합니다. 흐려진 방을 고르려면 직원 확인이 필요합니다.

### 신뢰 픽업과 미승인 픽업 {#trusted-and-not-authorized-pickup}

픽업 인원은 가구마다 두는 membership 엔티티입니다. `householdPickupPeople`(`Api/src/modules/membership/models/HouseholdPickupPerson.ts`. householdId, 선택적 personId, name, photoUrl, relationship, `status`인 `trusted` / `notAuthorized`, notes)입니다. CRUD는 `GET /membership/householdpickup/:householdId`(키오스크가 읽을 수 있도록 인증된 교회 사용자 누구나 가능)와 `people.edit`로 제한된 `POST` / `DELETE`입니다. 직원은 교인 페이지의 **Pickup** 카드(`B1Admin/src/people/components/PickupPeople.tsx`)에서 목록을 관리합니다. 사진, 관계, Trusted/Not Authorized 상태 칩을 다룹니다.

체크아웃(`B1Checkin/app/checkout.tsx`)에서 키오스크는 가구의 픽업 목록을 불러옵니다. `trusted` 항목은 가구 성인 사진 격자와 함께 누를 수 있는 픽업 카드로 표시됩니다. 직접 입력한 "Other" 이름은 `notAuthorized` 항목과 퍼지 매칭됩니다(레벤슈타인 거리, `src/helpers/PickupMatchHelper.ts`). 일치하면 경고 시트와 직원용 **Override** 버튼으로 체크아웃이 차단됩니다. 우회 기록은 방문 자체에 남습니다. 일반 `POST /attendance/visits/checkout`을 통해 `checkedOutBy`를 `"OVERRIDE: {name}"`으로 보내므로, 별도의 감사 테이블이 아니라 출석 기록과 `attendance.checkout` 웹훅에 남습니다.

### 부모 호출과 긴급 방송

`CheckinController`(`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`)는 두 개의 SMS 엔드포인트를 노출합니다.

- `POST /page` -- `{ visitId, message }`: 체크인한 아이 한 명의 보호자를 호출합니다(키오스크 체크아웃 화면, 직원 응대 모드).
- `POST /broadcast` -- `{ serviceId, message }`: 한 예배에 체크인한 모든 가구의 성인에게 문자를 보냅니다(키오스크 관리자 설정. `B1Checkin/app/adminSettings.tsx`의 타입 `EMERGENCY` 확인 시트 뒤에 있음).

두 기능 모두 membership 게이트웨이로 가구 성인을 찾은 뒤, 발송을 **`MessagingModuleGateway.sendBulkText`**(`Api/src/shared/modules/MessagingModuleGateway.ts`)에 넘깁니다. 이것은 교회가 설정한 문자 제공자(`@churchapps/texting`: TextInChurch, Clearstream, MutualMinistry. 내장 SMS 발송기는 없음)로 들어가는 모듈 간 통로입니다. 게이트웨이는 `sentText` 행과 수신자별 `deliveryLog` 항목을 기록하며, 한 배치당 수신자를 500명으로 제한합니다. 제공자가 설정되지 않으면 `no_provider`를 반환하고, 키오스크는 이를 "No SMS provider configured"로 표시합니다. 컨트롤러의 `dispatch()`는 전화번호 중복을 제거하고, 휴대폰이 없거나 `optedOut`이 설정된 사람은 건너뜁니다. 그리고 키오스크가 무엇을 건너뛰었는지 보여 줄 수 있도록 `{ sent, failed, skippedOptedOut, skippedNoPhone }`을 반환합니다.

## 키오스크(B1Checkin)

화면은 `B1Checkin/app/` 아래의 expo-router 파일이며, 화면 간 상태는 React state가 아니라 정적 `CachedData` 클래스(`src/helpers/CachedData.ts`)에 있습니다.

```
index (부팅/자동 로그인) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             serviceTimes, groups,        │             │  └─────────┘ └▶ addGuest  └▶ 라벨 인쇄,
             groupServiceTimes,           │             └▶ checkout (직원 응대)        자동으로
             labelTemplates 불러오기       │                                            lookup으로 복귀
```

1. **조회** (`app/lookup.tsx`) -- 전화번호(`GET /membership/people/search/phone?number=`, 끝 4자리 또는 전체) 또는 이름(`GET /membership/people/search?term=`)으로 검색합니다. 일치하는 사람을 고르면 가구(`GET /membership/people/household/{householdId}`)와 기존 방문(`GET /attendance/visits/checkin`)을 불러오고, 지난주 선택으로 `pendingVisits`를 채웁니다.
2. **가구 확인** (`app/household.tsx`, `src/components/MemberList.tsx`) -- 각 교인 행에는 이미 체크인했다는 배지, 알레르기/`nametagNotes` 배지, 현재 방 칩이 표시됩니다. 교인 행을 펼치면 모든 예배 시간이 방 버튼과 Member / Guest / Volunteer 체크인 유형 칩(`MemberServiceTimes.tsx`)과 함께 나열됩니다. 예배 시간 이름 아래의 `ServiceTimeHelper.getGroupSummary()`는 그 시간에 열리는 그룹을 보여 줍니다(`serviceTime.groups` 이름을 다듬고, 대소문자를 구분하지 않고 중복을 제거한 뒤 쉼표로 이어 붙임). 시간에 그룹이 없으면 아무것도 표시하지 않습니다.
3. **그룹 배정** (`app/selectGroup.tsx`) -- `serviceTime.groups`로 만든 카테고리 트리입니다. 연령/학년이 맞는 방은 강조되고, 맞지 않는 방은 직원 확인 뒤에서 흐리게 표시됩니다([연령/학년 적격성](#agegrade-eligibility-kiosk-side) 참고). 방을 고르면 그 사람의 대기 중인 방문에 `{ session: { serviceTimeId, groupId } }` visitSession이 기록됩니다(`src/helpers/VisitSessionHelper.ts`). "None"을 고르면 지워집니다.
4. **완료** (`app/checkinComplete.tsx`) -- `pendingVisits`(각각 `checkinType`이 찍힘)와 함께 `POST /attendance/visits/checkin`을 호출한 뒤, 프린터가 설정되어 있으면 라벨을 인쇄하고 자동으로 조회 화면으로 돌아갑니다. `409` 정원 또는 `notOpen` 응답이 오면 사유(가득 참/닫힘, 또는 체크인 시작 전)와 함께 문제가 된 방을 보여 줍니다. 비율 경고가 오면 직원 확인을 제안하며, 확인하면 `acknowledgeWarnings=true`로 다시 제출합니다.

**체크아웃** 화면(`app/checkout.tsx`)은 자동으로 포커스되는 입력란에서 4자리 보안 코드를 받습니다. 그래서 USB/블루투스 키보드 방식의 바코드 스캐너를 카메라 없이 사용할 수 있습니다. 화면 키패드도 같은 알파벳을 사용하며, 4자리가 되면 자동으로 제출합니다. **Scan** 버튼은 공유 `src/components/CodeScanner.tsx` 카메라(기본은 후면, QR, Code 128, Code 39 인식)를 여는 시트를 띄워, 스캐너가 없는 스테이션도 픽업 라벨을 읽을 수 있게 합니다. 스캔된 코드는 입력된 코드와 같은 `handleCode()` 경로로 들어갑니다. 이 화면은 코드를 조회하고, 픽업될 아이들을 보여 주고, 가구 성인 사진 격자와 함께 가구의 **신뢰 픽업 인원**을 누를 수 있는 카드로 제시합니다(미승인 이름과 퍼지 확인되는 "Other" 자유 입력 옵션도 포함. [신뢰 픽업과 미승인 픽업](#trusted-and-not-authorized-pickup) 참고). 그다음 선택한 사람의 이름/ID와 함께 `POST /attendance/visits/checkout`을 보냅니다. 직원 응대 모드에서는 화면에 **Page a parent**(`POST /attendance/checkin/page`)와 **보안 라벨 재인쇄**도 나타납니다. `reprint()`는 `LabelHelper.getAllLabelsFor(...)`로 가족의 라벨을 다시 만들고, 체크인과 같은 `PrintUI` 파이프라인으로 보냅니다.

스테이션 성격은 AsyncStorage 플래그 `@StationMode`(`"self"` | `"manned"`, `app/adminSettings.tsx`에서 전환)로 정합니다. 직원 응대 모드에서는 조회 화면에 체크아웃 진입점이 추가되고, 가구 화면에서 교인 프로필을 편집할 수 있습니다(`POST /membership/people`). 키오스크 보안은 기본으로 내장되어 있습니다. 선택 사항인 PIN(`app/setPin.tsx`, `src/components/PinEntryModal.tsx`)이 관리자 화면과 프린터 화면을 보호하고, 관리자 화면은 헤더 로고를 빠르게 7번 눌러야만 열립니다. 유휴 대기 화면(`src/hooks/useInactivityTimer.ts`)은 가족과 가족 사이에 화면을 넘겨받습니다.

## 셀프 체크인(B1App)

교인은 b1.church 포털의 `/mobile/checkin` 화면에서 체크인합니다(`B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx`가 `screens/CheckinPage.tsx`로 라우팅함). 로그인한 사용자가 필요하며, 키오스크와 같은 네 단계(예배 → 가구 → 그룹 → 완료)를 같은 엔드포인트에 대해 진행합니다. 상태는 `B1App/src/helpers/CheckinHelper.ts`에 있습니다. 키오스크와의 차이는 다음과 같습니다. 가구는 로그인한 사용자 본인의 `householdId`에서 가져오므로 검색 단계가 없습니다. 인쇄도 없습니다. 대신 완료 화면에 배치의 보안 코드가 QR(`qrcode.react`)로 표시되며, "체크인 스테이션에서 이 코드를 보여 주세요"라는 안내가 붙습니다. 페이지를 열었을 때 가구가 이미 체크인되어 있으면, "Show check-in code" 버튼이 첫 번째 기존 방문(`GET /attendance/visits/checkin`에서 `securityCode`가 있는 것)의 QR을 다시 보여 줍니다. 체크인은 제출 시점에 바로 기록되며, 대기 상태는 없습니다. QR은 키오스크에서 라벨을 인쇄하는 용도로만 쓰입니다.

**휴대폰에서 키오스크로 라벨 인쇄** (`B1Checkin/app/scan.tsx`. 조회 화면의 QR "Scan code" 버튼에서 진입): 키오스크는 `CodeScanner`(`expo-camera`의 `CameraView`, 기본은 전면이며 전환 가능)를 띄워 QR 코드를 스캔합니다. `ScanCodeHelper.parse()`는 보안 코드 알파벳의 4자리 코드만 받아들이며, `ScanCodeHelper.isRepeat()`는 같은 코드를 4초 동안 무시합니다. 그래서 B1App QR과 인쇄된 라벨의 QR 블록 모두 작동합니다. 그다음 화면은 체크아웃 재인쇄 경로를 따릅니다. `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI`이며, 조회 화면으로 돌아갑니다. 스캔 시점에는 출석 쓰기가 일어나지 않습니다. 라벨만 인쇄합니다. 활성 방문이 없는 코드, 프린터가 없는 스테이션, 라벨이 없는 그룹은 각각 토스트 알림을 띄우고 조회 화면으로 돌아갑니다.

타입과 `ApiHelper`/`ArrayHelper`는 `@churchapps/helpers`와 `@churchapps/apphelper`에서 가져옵니다. B1Admin과 공유하는 React 컴포넌트는 없습니다.

## 관리자 측 출석(B1Admin)

- **설정** -- `/attendance`(`B1Admin/src/attendance/AttendancePage.tsx`)가 구조 트리를 보여 주고 예배(`ServiceEdit.tsx`)와 예배 시간(`ServiceTimeEdit.tsx`)을 만듭니다. 캠퍼스 데이터는 `useCampuses()` 훅으로 membership에서 가져옵니다.
- **수동 출석**은 출석 섹션이 아니라 그룹 쪽에 있습니다. `B1Admin/src/groups/components/GroupSessionsTab.tsx`가 세션을 만들고(`POST /attendance/sessions`. 추가할 때 `SessionEdit.tsx`는 선택한 예배 시간을 공유하는 다른 그룹마다 세션 하나를 포함할 수 있으며, 그날 이미 세션이 있는 그룹은 건너뜀), `POST /attendance/visitsessions/log`로 사람을 출석 처리합니다. 이 호출은 그 사람과 세션의 방문을 찾거나 만듭니다. 그룹 리더는 `attendance.edit` 권한 없이도 자기 그룹의 출석을 기록할 수 있습니다. 컨트롤러가 `au.leaderGroupIds`를 확인하기 때문입니다.
- **보고** -- 출석 추세와 그룹 출석은 서버에서 정의한 보고서입니다(`B1Admin/src/components/reporting/ReportWithFilter.tsx`가 ReportingApi를 사용하며, 정의는 `Api/reports/*.json`). 둘 다 `startDate`/`endDate`(종료일 포함)를 받습니다. 추세 보고서는 기본값으로 1년 전부터 오늘까지이며, 주별 `sessionDates` 열을 추가합니다. 그룹 출석의 화면 트리에는 각 방문의 `checkinTime`과 교인의 `membershipStatus`가 포함됩니다. 그룹 출석의 CSV는 짝이 되는 `groupAttendanceDownload` 보고서에서 가져오며, `GroupAttendanceDownloadHelper`가 그룹 구성원마다 한 행으로 피벗하고, 날짜가 있는 세션마다 출석/결석 열을 붙입니다. 교인별 이력은 `GET /attendance/attendancerecords?personId=`입니다(`B1Admin/src/people/components/PersonAttendance.tsx`).

## 라벨 인쇄

### 템플릿과 디자이너

교회는 B1Admin의 `/mobile/checkin/labels`(`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, 체크인 설정 페이지에서 진입)에서 자체 라벨을 디자인합니다. 템플릿은 `labelTemplates` 행이며, `content`는 블록의 JSON 배열입니다. 블록은 `text`, `field`, `barcode`, `qrcode`, `box`이며, 각각 퍼센트 좌표로 배치되고 글꼴, 정렬, 기호 체계(`code39`/`code128`/`qr`), 선택적 표시 조건을 가집니다(예: `person.nametagNotes`가 비어 있지 않을 때만 알레르기 상자를 표시). `labelType`은 두 가지입니다. `nametag`(체크인한 사람마다 하나. `person.displayName`, `sessions`, `securityCode`, 그리고 `person.isBirthdayWeek` 같은 필드를 가지며, 생일의 월/일이 오늘로부터 3일 이내이면 `"true"`이고 연말을 넘어 계산됨. `LabelHelper.isBirthdayWithin()`이 계산)와 `pickup`(가족마다 하나. `children`, `childrenAllergies` 같은 필드를 가짐)입니다. 서버는 교회의 유형당 기본 템플릿을 하나로 강제합니다(`LabelTemplateController.save`). 디자이너에는 키오스크의 기본 제공 라벨을 본뜬 시작 템플릿이 들어 있으며, 샘플 데이터로 미리 보기를 할 수 있습니다.

### 키오스크에서 렌더링과 인쇄

체크인이 완료되면 `B1Checkin/src/helpers/LabelHelper.ts`가 각 대기 방문의 그룹 플래그를 보고 무엇을 인쇄할지 결정합니다. `printNametag` 그룹의 이름표와, 방문 중 하나라도 `parentPickup` 그룹에 해당하면 가족 픽업 라벨 하나입니다. `checkinType`이 `volunteer`인 방문은 `LabelHelper.selectChildVisits()`에서 건너뜁니다. 그래서 Parent Pickup 방에 있는 보육 봉사자는 픽업 라벨을 유발하지 않습니다. 체크인 응답의 보안 코드는 아이 이름표와 픽업 라벨에 들어가며, 성인 이름표에는 코드 없이 인쇄됩니다. 교회에 템플릿이 있으면 `LabelRenderer`(`src/helpers/LabelRenderer.ts`)가 블록과 필드 컨텍스트를 독립형 HTML 문서로 바꿉니다. 없으면 `B1Checkin/assets/labels/`의 기본 제공 HTML 라벨에 자리표시자를 채워 사용합니다.

바코드는 `B1Checkin/src/helpers/barcode.ts`의 순수 TypeScript 인코더가 인라인 SVG로 만듭니다. Code 39 패턴 표와 Code 128(모듈로 103 체크섬이 있는 코드 세트 B) 너비 표가 있으며, QR은 `qrcode` 패키지로 만듭니다. **이 인코더들은 B1Admin에도 의도적으로 복제되어 있습니다**(`LabelEditor.tsx`가 같은 표를 인라인으로 담고 있으며, 코드 주석에 기록됨). 그래서 디자이너 미리 보기가 키오스크 출력과 픽셀 단위로 같습니다. 한쪽을 바꾸면 다른 쪽에도 똑같이 반영해야 합니다.

인쇄 파이프라인(`src/components/PrintUI.tsx`)은 각 HTML 라벨을 `WebView`에서 렌더링하고, `react-native-view-shot`으로 JPG로 캡처한 뒤, 이미지 URI를 네이티브 **printer-helper** Expo 모듈(`B1Checkin/modules/printer-helper/`)에 넘깁니다. 이 모듈은 `scan()`, `checkInit()`, `printUris()`와 상태 이벤트를 노출하며, 두 플랫폼 모두에 브랜드별 제공자가 있습니다.

| 브랜드 | Android | iOS | 참고 |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt`(Brother 인쇄 SDK) | `BrotherProvider.swift`(`BRLMPrinterKit.xcframework`) | QL 시리즈 네트워크 프린터(QL-800/810W/820NWB/1100/1110NWB…), 다이컷 29×90 라벨, 권장 기본값 |
| Zebra | `ZebraProvider.kt`(Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | 네트워크 검색 + TCP/ZPL 이미지 인쇄 |

프린터 선택은 `app/printers.tsx`에서 합니다(네트워크 스캔은 `brand~model~ip` 항목을 반환하며, 선택은 AsyncStorage에 저장됨). `src/helpers/PrinterLog.ts`는 기기 내 진단 로그를 유지하며, 키오스크 헤더의 실시간 상태 점으로 확인할 수 있습니다.

## 손님 등록

체크인 도중 사람을 만드는 경로는 두 가지입니다.

- **키오스크에서** -- 가구 화면의 "Add guest"가 `B1Checkin/app/addGuest.tsx`를 엽니다. 이 화면은 먼저 `GET /membership/people/search?term=`으로 기존의 비교인 일치 항목을 찾고, 없으면 `POST /membership/people`로 만들어 현재 가구에 연결합니다. 손님은 다른 교인과 똑같이 그룹 배정 단계를 거칩니다.
- **QR로 셀프 등록** -- 교회 설정 `enableQRGuestRegistration`이 켜져 있으면(B1Admin 체크인 설정에서 구성하며, `GET /membership/settings/public/{churchId}`에서 읽음), 키오스크 조회 화면에 `https://{subdomain}.b1.church/guest-register?serviceId=`로 연결되는 QR 코드가 표시됩니다. 이 B1App 페이지(`src/app/[sdSlug]/(public)/guest-register/page.tsx`)는 방문 가족이 자기 휴대폰에서 익명 `POST /membership/people/guest-register` 엔드포인트로 직접 등록할 수 있게 하여, 키오스크 줄이 계속 움직이도록 합니다. QR 시트에는 같은 페이지를 키오스크에서 여는 **Register here** 버튼도 있습니다(`app/guestRegister.tsx`). 이 버튼은 시크릿 모드에서 캐시를 끈 `WebView`로 엽니다. `src/helpers/GuestRegisterHelper.ts`가 QR과 WebView 모두의 URL을 만들고, `https://{subdomain}.b1.church/guest-register` 밖으로 나가는 이동을 막습니다. 화면은 **Done**을 누르거나, 뒤로 가거나, 120초 동안 활동이 없으면 조회 화면으로 돌아갑니다(양식 입력은 WebView에서 활동으로 전달됨). 그리고 WebView를 언마운트하므로, 한 가족이 입력한 내용이 다음 가족에게 넘어가지 않습니다.

QR 가입은 B1Admin의 **QR Guest Registration** 카드(`src/mobile/CheckInPage.tsx`)에서 저장한 교회 설정으로 제어됩니다.

| 설정 | 공개 여부 | 목적 |
|---|---|---|
| `enableQRGuestRegistration` | 공개 | 키오스크 QR과 익명 엔드포인트를 켜는 옵트인 스위치 |
| `guestRegistrationFields` | 공개 | `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments`를 `"off"` / `"optional"` / `"required"`로 매핑한 JSON. 기본값: 이메일과 전화번호는 선택, 나머지는 끔. 이름과 성은 항상 필수 |
| `guestRegistrationImage` | 공개 | 머리글 사진 URL. B1App은 양식과 확인 화면에서 아이콘 대신 16:9로 표시함 |
| `guestRegistrationGroupId` | 비공개 | 모든 가입이 추가되는 그룹(손님은 이를 보거나 고를 수 없음) |
| `guestRegistrationRecordAttendance` | 비공개 | `"true"`이면 그 그룹의 출석도 함께 기록함 |

B1App의 `src/components/checkin/GuestRegister.tsx`는 익명 `GET /membership/people/guest-register/options?churchId=`에서 체크리스트를 가져와, 포함된 필드만 렌더링합니다(주 연락처의 이메일, 전화번호, 결혼 여부, 주소. 교인마다 생년월일, 성별, 학년. 댓글 상자 하나). 그리고 그 필드들만 보냅니다. 서버는 `PersonHelper.registerGuestHousehold()`가 실행되기 전에 `GuestRegistrationHelper.sanitize()`에서 체크리스트를 다시 적용합니다. 꺼진 필드는 버리고, 필수 값이 없거나 목록에 없는 값은 400으로 거부합니다. 먼저 이메일이나 전화번호가 있는 교인마다 `PersonRepo.findGuestMatch()`를 호출합니다. 같은 이름과 같은 이메일이나 전화번호 숫자를 가진 살아 있는 사람이 정확히 한 명이면 재사용합니다. 0명이거나 여러 명이면 새 사람을 만듭니다. 그래서 추측하지 않습니다. 연락처가 없는 교인은 일치한 가구 안에서 이름으로 매칭합니다. 재사용된 사람은 절대 수정하지 않으므로, 익명 양식이 저장된 정보를 덮어쓸 수 없습니다. 응답에는 제출된 이름이 그대로 되돌아옵니다. 매칭되지 않은 교인은 일치한 가구 또는 새 가구에 `membershipStatus: "Visitor"`로 들어가며, 새 사람마다 `person.created`를 발송합니다. 그 뒤의 실패는 응답에 담지 않고 기록만 합니다. 교인은 설정된 그룹에 추가되며(`group.member.added`), 출석 기록이 켜져 있으면 `AttendanceModuleGateway.recordAttendance()`가 그 그룹의 예배 시간 중 일정이 있고 체크인 창(`CheckinGateHelper.isServiceTimeOpen`)이 지금 열려 있는 모든 시간에 대해 교인을 출석 처리합니다. 필요하면 교회 현지 날짜의 세션을 만듭니다. 일정이 없는 예배 시간이나 창 밖의 가입은 아무것도 기록하지 않습니다. 댓글은 가구장에 대한 숨김 교인 메모 대화가 되며(메시지 작성자 "Guest sign-up"), `person.conversationId`로 연결됩니다.

## 관련 문서

- [출석 엔드포인트](../api/endpoints/attendance.md) -- 캠퍼스, 예배, 세션, 방문, 방문 세션의 전체 REST 인터페이스
- [Membership 엔드포인트](../api/endpoints/membership.md) -- 교인, 가구, 그룹
- [웹훅](../api/webhooks.md) -- `session.created`, `attendance.recorded`, `attendance.checkout` 이벤트
- [모듈 구조](../api/module-structure.md) -- 출석 모듈이 서버 측에서 구성되는 방식
