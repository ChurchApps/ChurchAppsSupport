---
title: "체크인"
---

# 체크인

<div class="article-intro">

체크인은 하나의 시스템에 세 개의 진입점이 있는 구조입니다. 스태프가 운영하거나 셀프 방식으로 사용하는 스테이션용 B1Checkin 키오스크 앱, B1App 멤버 포털 내부의 셀프 체크인, 그리고 B1Admin의 관리자 측 출석 관리입니다. 세 곳 모두 코어 Api의 출석 모듈에 기록하며, 교실 라우팅은 전적으로 그룹(Groups)으로 결정됩니다. 별도의 "위치"나 "방" 엔터티는 없습니다. 그 위에 아동 안전 계층이 있습니다. 방문별 체크인 유형, 서버 측 정원 및 봉사자 비율 제한, 키오스크 측 연령/학년 적격성 확인, 체크아웃 시 신뢰 픽업 인증, 그리고 교회의 문자 메시지 제공업체를 통한 보호자 호출이 포함됩니다. 이 페이지는 데이터 모델, 체크인 흐름, 안전 계층, 라벨 인쇄 파이프라인을 정리합니다.

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
| 키오스크 | `B1Checkin` | Expo / React Native, expo-router 파일 기반 라우팅. Android, Amazon Fire, iOS용 EAS 빌드. `expo-updates`를 통한 OTA 업데이트 | 라벨 인쇄와 검증된 체크아웃을 갖춘 스태프 운영 또는 셀프 방식 스테이션 |
| 셀프 체크인 | `B1App` | Next.js (b1.church 멤버 포털) | 로그인한 멤버가 휴대폰으로 자신의 가구를 체크인합니다. 인쇄 기능 없음 |
| 관리자 | `B1Admin` | React SPA | 서비스 구조 설정, 그룹을 서비스 시간에 배정, 라벨 디자인, 수동 출석 기록, 보고서 실행 |

세 진입점 모두 `ApiHelper`를 통해 동일한 두 API 모듈을 호출합니다. 사람, 가구, 그룹에는 **MembershipApi**(`/membership`)를, 아래의 모든 기능에는 **AttendanceApi**(`/attendance`)를 사용합니다.

## 데이터 모델 (`Api/src/modules/attendance`)

| 엔터티 / 테이블 | 주요 필드 | 의미 |
|----------------|-----------|---------|
| `campuses` | name, address | 여기서는 더 이상 사용하지 않습니다. 캠퍼스 원본 데이터는 멤버십 모듈(`/membership/campuses`)에서 관리하며, 출석 측 사본은 레거시 읽기용으로 읽기 전용 고정됩니다(`models/Campus.ts`) |
| `services` | campusId, name | 반복되는 모임. 예: "Sunday Morning"(`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | 서비스 내의 시간대. 예: "9:00 AM"(`models/ServiceTime.ts`). 일정 컬럼은 선택 사항이며(마이그레이션 `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`), [체크인 시간대](#scheduled-check-in-windows)를 결정합니다 |
| `groupServiceTimes` | groupId, serviceTimeId | 조인 테이블. 어떤 그룹(교실)이 어떤 서비스 시간에 모이는지 나타냅니다(`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | 특정 날짜의 한 그룹 모임 한 회. 체크인 시점에 지연 생성됩니다(`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | 한 날짜에 한 사람이 참석한 기록(`models/Visit.ts`). `checkinType`은 `member` / `guest` / `volunteer`이며(NULL = 레거시 멤버), 키오스크가 설정하고 정원/비율 제한이 사용합니다 |
| `visitSessions` | visitId, sessionId | 방문이 포함하는 세션. 두 개의 서비스 시간에 체크인한 아이는 두 개의 행을 갖습니다(`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | 디자인 가능한 라벨 레이아웃(`models/LabelTemplate.ts`) |

### 완료된 체크인이 저장되는 방식

`VisitController.postCheckin`(`Api/src/modules/attendance/controllers/VisitController.ts`)이 `POST /attendance/visits/checkin?serviceId=&peopleIds=`를 처리합니다. 요청 본문은 `Visit` 객체의 배열이며, 각 객체는 `visitSessions`를 포함하고, 그 안의 내장 `session`은 `(serviceTimeId, groupId)` 쌍만 지정합니다. 그런 다음 서버는 다음을 수행합니다.

1. **어떤 쓰기보다 먼저 정원과 비율을 검사합니다.** `evaluateGates()` → `CheckinGateHelper.evaluate()`가 대상이 된 각 방의 정원, 게스트 정원, 마감 플래그, 봉사자 비율을 현재 인원과 비교합니다. postCheckin은 **트랜잭션이 아니므로**, 제한 검사가 첫 저장 전에 실행되어야 합니다. 명백한 위반이 있으면 위반된 방의 이름을 포함한 409 응답이 반환되며 아무것도 저장되지 않습니다. [정원 및 봉사자 비율 제한](#capacity-and-volunteer-ratio-gates)을 참고하세요.
2. **세션을 지연 방식으로 해석합니다.** `getSessionId()`가 `(groupId, serviceTimeId, today)`에 대한 `sessions` 행을 찾거나 생성합니다. 세션 ID는 날짜별로 프로세스 내에 캐시됩니다. 새 세션은 `session.created` 웹훅을 발생시킵니다. 루프는 대기되는 `for..of`이며, 이전의 fire-and-forget `forEach(async …)`는 저장과 경쟁하여 첫 세션 생성 시 sessionId를 NULL로 기록했습니다(수정 완료. 루프의 코드 주석에 기록되어 있습니다).
3. **그날의 기록을 교체합니다.** 해당 서비스에서 오늘 이 사람들에 대해 이미 있는 방문은 visitSessions와 함께 삭제되고, 제출된 항목이 저장됩니다. 따라서 가족을 다시 체크인하는 것은 추가가 아니라 "현재 상태가 이것이다"라는 멱등성 있는 작업입니다. `?checkDuplicates=true`를 전달하면 기록하지 않고 `{ duplicates: [personId…] }`를 반환하며, 키오스크는 이를 통해 덮어쓰기 전에 경고합니다.
4. **배치당 하나의 보안 코드를 생성합니다.** `SecurityCodeHelper.generate()`가 `23456789BCDFGHJKLMNPQRSTVWXYZ` 알파벳에서 4자리 코드를 만듭니다(모음과 혼동되기 쉬운 문자를 제외하여 코드가 단어를 이루거나 잘못 읽히지 않도록 합니다). 서버는 같은 교회의 당일 열린 방문과 충돌하면 재시도하고, 배치의 모든 방문에 이 코드를 기록합니다.
5. **`{ streaks, securityCode }`를 반환합니다.** `streaks`는 personId를 연속 주간 출석 횟수에 매핑하며, 키오스크는 이정표(매 5주마다)에 색종이 효과를 보여 줍니다.

저장된 각 방문은 `attendance.recorded` 웹훅도 발생시킵니다. 읽기 측인 `GET /attendance/visits/checkin`은 사람들의 방문을 **마지막으로 기록된 날짜** 기준으로 반환합니다. 그 날짜가 지난주였다면 ID가 제거되어, 클라이언트는 지난주 방 선택 내역의 사본을 받게 되며 이는 새 기록으로 저장됩니다.

### 체크아웃

두 개의 엔드포인트가 흐름을 완성합니다(`VisitController`).

- `GET /attendance/visits/code/:code` — 해당 보안 코드를 가진, 오늘 아직 체크아웃되지 않은 방문을 세션 정보와 함께 반환합니다.
- `POST /attendance/visits/checkout` — 본문 `{ visitIds, checkedOutBy?, checkedOutById? }`. `checkoutTime`과 픽업한 사람을 기록하고, 방문마다 `attendance.checkout` 웹훅을 발생시킵니다.

권한: 키오스크는 `attendance.checkin`으로 인증하며, 이 권한은 체크인/체크아웃/라벨 템플릿 기능만 정확히 부여합니다. `attendance.view`/`attendance.edit`은 보고 및 수동 입력을 담당합니다. 구조(서비스, 서비스 시간, 그룹 배정)는 `services.edit`이 필요합니다. 멤버 셀프 체크인(B1App)은 어떤 권한도 필요하지 않습니다. 교회에 연결된 사람이 있는 인증된 사용자라면 누구나 `GET`/`POST /attendance/visits/checkin`을 호출할 수 있으며, 서버는 제출된 `personId`를 호출자 자신의 가구로 제한합니다(그렇지 않으면 403). 이 제한이 다른 가족의 `securityCode`를 읽을 수 없게 하는 장치입니다. 멤버십이 곧 권한이며, 멤버가 이 기능을 *보는지*는 교회의 B1App 내비게이션 탭으로 제어됩니다. 다른 체크인 엔드포인트(`code/:code`, `checkout`, `guardians`, `CheckinController`)는 여전히 키오스크/스태프 전용입니다.

## 그룹이 방 라우팅을 결정합니다

시스템 어디에도 방이나 교실 엔터티가 없습니다. "방"은 `trackAttendance`가 활성화된 멤버십 **그룹**이며, `groupServiceTimes`를 통해 하나 이상의 서비스 시간에 연결됩니다. 키오스크 동작을 결정하는 그룹 필드(`Api/src/modules/membership/models/Group.ts`)는 다음과 같습니다.

| 필드 | 효과 |
|------|--------|
| `trackAttendance` | 그룹이 출석에 참여하는지 여부. B1Admin의 설정 트리는 `groupServiceTimes` 행이 없는 `trackAttendance` 그룹을 미배정으로 표시합니다 |
| `parentPickup` | 자녀 방을 표시합니다. 이 방에 체크인하면 방문이 "자녀" 방문이 되어 가족 픽업 라벨이 인쇄되고, 보안 코드가 명찰에 표시됩니다 |
| `printNametag` | 이 그룹에 대한 체크인 시 명찰을 인쇄할지 여부 |
| `capacity` / `guestCapacity` / `checkinClosed` | 방 정원 제한과 강제 "마감" 스위치. 체크인 제한 검사가 서버 측에서 시행합니다(B1Admin의 그룹 설정 "Check-In Capacity"에서 편집) |
| `volunteerRatio` / `minVolunteers` | 교회 전체 `ratioEnforcement` 설정에 따라 시행되는 아동 대 봉사자 비율과 최소 봉사자 수 |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | 키오스크에서 평가되어 방을 강조하거나 흐리게 표시하는 연령/학년 적격성 범위 |

모든 클라이언트는 같은 방식으로 데이터를 정규화합니다(예: `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`). `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, `GET /membership/groups`를 병렬로 불러온 뒤, 각 서비스 시간에 대해 `groupServiceTimes` 행이 그 서비스 시간을 가리키는 그룹을 `serviceTime.groups`에 모읍니다. 이 배열이 방 선택기에 표시되며, 그룹의 `categoryName`으로 정리됩니다.

배정은 B1Admin의 그룹 페이지에서 편집합니다(`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`). 캠퍼스 → 서비스 → 서비스 시간 → 그룹으로 이어지는 전체 트리는 `GET /attendance/attendancerecords/tree`를 통해 `B1Admin/src/attendance/components/AttendanceSetup.tsx`에서 시각화됩니다.

:::info
그룹이 유일한 원본 데이터이므로, 같은 그룹 멤버십이 키오스크 라우팅, B1Admin 그룹 페이지의 명단형 출석, 출석 보고를 모두 지원합니다. 그룹을 서비스 시간에 배정하는 것만으로 체크인 대상이 됩니다.
:::

## 아동 안전

### 체크인 유형

모든 방문에는 `checkinType`이 있습니다. `member`, `guest`, `volunteer` 중 하나이며, NULL은 레거시/멤버를 의미합니다(마이그레이션 `tools/migrations/attendance/2026-07-03_checkin_type.ts`). 유형은 **키오스크 측에서** 선택됩니다. 확장된 멤버 행의 Member / Guest / Volunteer 칩(`B1Checkin/src/components/MemberServiceTimes.tsx`)에서 고르며, 완료 시 각 대기 방문에 적용됩니다(`app/checkinComplete.tsx`, 기본값 `member`). 서버는 제한 검사에서 이를 사용합니다. 봉사자는 정원 대신 비율 충족에 포함되고, 게스트는 `guestCapacity`에 포함됩니다.

### 정원 및 봉사자 비율 제한

`CheckinGateHelper.evaluate()`(`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`)는 어떤 저장보다 앞서 `postCheckin` 내부에서 실행됩니다(엔드포인트는 트랜잭션이 아니므로, 저장 전 제한 검사가 정확성 메커니즘입니다). 대상 그룹마다 현재 인원(`VisitRepo.countActiveByGroupToday`)과 멤버십 모듈 게이트웨이를 통한 그룹 설정을 불러온 뒤 위반을 분류합니다.

- **강제(항상 차단):** `checkinClosed`, `current + incoming > capacity`, `guestCapacity` 초과 게스트 수. 배치는 `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`로 거부되며, 키오스크는 해당 방을 표시합니다.
- **비율(경고 또는 차단):** 봉사자가 `minVolunteers` 미만인 방에 들어가는 봉사자가 아닌 인원, 봉사자가 전혀 없는 경우, 또는 `children > volunteers × volunteerRatio`인 경우. 심각도는 교회별 `ratioEnforcement` 설정(`"warn"` 기본값 / `"block"`, B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`에서 편집)을 따릅니다. 경고 모드에서는 클라이언트가 `acknowledgeWarnings=true`로 다시 제출하지 않는 한 `409 { warning: true, error: "ratio", … }`를 반환합니다. 이 재제출이 키오스크의 스태프 확인 재정의입니다.

### 예약된 체크인 시간대

서비스 시간에는 선택적인 주간 일정이 있을 수 있습니다(`dayOfWeek` 0–6, 0 = 일요일, `startTime`/`endTime`은 `HH:mm` 형식, `checkinOpenMinutes`, `checkinCloseMinutes`). B1Admin의 **Attendance → Setup** 서비스 시간 양식(`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "Check-in Schedule")에서 편집합니다. `CheckinGateHelper.hasSchedule()`은 `dayOfWeek`와 `startTime`이 모두 설정된 경우에만 서비스 시간을 예약된 것으로 봅니다. 일정이 없는 시간은 시간 기준으로 제한되지 않습니다. `isServiceTimeOpen()`은 현지 벽시계 시간(`DateHelper.toChurchTime`)으로 시간대를 계산합니다. 시간대는 `CheckinTimeZoneHelper.load()`(`Api/src/modules/attendance/helpers/CheckinTimeZoneHelper.ts`)가 서비스 시간별로 결정합니다. 먼저 서비스의 캠퍼스(`service.campusId`, `MembershipModuleGateway.loadCampusTimeZones` 경유)의 `timezone`을 사용하고, 그다음 교회의 `timeZone`(B1Admin의 Church Information에서 설정), 그다음 `timezone`이 있는 제거되지 않은 첫 번째 캠퍼스(`loadCampusTimeZone`), 마지막으로 `America/New_York`을 사용합니다. 캠퍼스가 먼저인 이유는, 많은 교회에서 교회 시간대가 `America/New_York`으로 일괄 설정되어 있었기 때문입니다. 아래의 목록 조회와 게시 경로 모두 같은 방식으로 시간대를 해석합니다. 시간 창은 시작 전 `checkinOpenMinutes`부터 종료 후 `checkinCloseMinutes`까지이며(종료 시간이 없으면 시작 후), 자정이나 주 경계를 넘는 시간 창도 처리합니다.

시간 창은 두 곳에서 시행됩니다.

- **목록 조회:** `GET /attendance/servicetimes`는 각 행에 계산된 `checkinOpen` 불리언을 부여합니다. B1App의 셀프 체크인(`CheckinPage.tsx`)과 B1Checkin의 서비스 선택기(`app/services.tsx`)는 모든 시간을 유지합니다. 서비스의 모든 시간이 마감되어 있으면 가장 빨리 열리는 시간을 표시합니다(B1App에서는 "Check-in opens Sun 9:30 AM.", B1Checkin에서는 "Check-in for this service opens Sun 9:30 AM."이며, `CheckinHelper.opensLabel` / `ServiceTimeHelper.getOpensLabel`에서 생성됩니다). 열리는 시간을 계산할 수 없으면 "Check-in isn't open for this service right now."로 대체합니다(키오스크에는 다른 서비스를 고를 수 있도록 뒤로 가기 버튼이 있습니다). 그 외의 마감된 시간은 선택할 수 없는 "Closed" / "Closed · opens 9:30 AM" 행으로 표시됩니다. B1Checkin의 가구 화면(`MemberServiceTimes.tsx`)은 `ServiceTimeHelper.isCheckinOpen()`(교회 시간대가 아닌 기기 시간대)으로 기기 시계 기준 열림 여부를 실시간으로 다시 평가하므로, 계속 켜져 있는 키오스크도 제때 열리고 닫힙니다. 또한 해당 사람이 이미 체크인한 마감된 시간에는 "Kids Room 1 · Checked in"(그룹 이름)을 표시합니다.
- **게시:** `evaluateGates()` 내부, 용량/비율 평가보다 앞서, `findClosedServiceTimeGroups()`가 대상 세션의 서비스 시간이 시간 창 밖에 있으면 배치를 `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }`로 거부합니다. 가구의 오늘 기존 방문은 체크인할 때마다 다시 게시되므로, 그 사람이 이미 보유한 세션(기존 방문의 `personId|sessionId`)은 이 제한을 건너뜁니다. 그래서 나중에 열리는 서비스 시간을 추가해도 이전 시간 창이 닫혔다는 이유로 거부되지 않습니다. B1Checkin은 이를 하드 게이트 화면에 "check-in isn't open right now"라는 사유로 표시합니다(정원 위반은 여전히 "room is full or closed"로 표시됩니다).

### 나이/학년 적격성(키오스크 측)

방 적격성은 참고용 UI이며, 키오스크에서 평가되고 서버에서 시행되지 않습니다. `B1Checkin/src/helpers/EligibilityHelper.ts`는 사람의 생년월일/학년을 그룹의 `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade`와 비교하며(학년 순서: PreK, K, 1–12, Graduated), `eligible` / `ineligible` / `unknown`을 반환합니다. 데이터가 없으면 `unknown`이 되며 방을 절대 숨기지 않습니다. 나이와 학년은 교회의 **학년 진급일**(`gradePromotionDate` 설정, `"MM-DD"`, `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`에서 편집)을 기준으로 계산됩니다. 키오스크는 이를 `GET /attendance/checkin/settings`에서 가져오며, `resolveAsOfDate`가 오늘 이전이거나 오늘인 가장 최근 발생일을 고릅니다. 방 선택기는 적격한 방을 강조하고 부적격한 방은 흐리게 표시합니다. 흐리게 표시된 방을 고르려면 스태프 확인이 필요합니다.

### 신뢰된 픽업 및 미승인 픽업

픽업 대상자는 가구별 멤버십 엔터티입니다. `householdPickupPeople`(`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, 선택적 personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes)입니다. CRUD는 `GET /membership/householdpickup/:householdId`(모든 인증된 교회 사용자가 가능하므로 키오스크가 읽을 수 있음)와 `people.edit`으로 제한된 `POST` / `DELETE`입니다. 스태프는 사람 페이지의 **Pickup** 카드(`B1Admin/src/people/components/PickupPeople.tsx`)에서 목록을 관리합니다. 사진, 관계, Trusted/Not Authorized 상태 칩이 표시됩니다.

체크아웃 시(`B1Checkin/app/checkout.tsx`) 키오스크는 가구의 픽업 목록을 불러옵니다. `trusted` 항목은 가구 성인 사진 그리드와 함께 누를 수 있는 픽업 카드로 표시되며, 직접 입력한 "Other" 이름은 `notAuthorized` 항목과 퍼지 매칭됩니다(Levenshtein, `src/helpers/PickupMatchHelper.ts`). 매치되면 경고 시트와 스태프 **Override** 버튼으로 체크아웃이 차단됩니다. 재정의는 방문 자체에 기록됩니다. 일반 `POST /attendance/visits/checkout`을 통해 `checkedOutBy`를 `"OVERRIDE: {name}"`로 전송하므로, 별도의 감사 테이블이 아니라 출석 기록과 `attendance.checkout` 웹훅에 남습니다.

### 보호자 호출 및 긴급 방송

`CheckinController`(`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`)는 두 개의 SMS 엔드포인트를 제공합니다.

- `POST /page` — `{ visitId, message }`: 체크인된 자녀 한 명의 보호자를 호출합니다(키오스크 체크아웃 화면, 스태프 모드).
- `POST /broadcast` — `{ serviceId, message }`: 한 서비스에 체크인된 모든 가구의 성인에게 문자를 보냅니다(키오스크 관리자 설정, `B1Checkin/app/adminSettings.tsx`의 `EMERGENCY` 입력 확인 시트 뒤에 있음).

두 엔드포인트 모두 멤버십 게이트웨이를 통해 가구 성인을 찾은 뒤, 전달을 **`MessagingModuleGateway.sendBulkText`**(`Api/src/shared/modules/MessagingModuleGateway.ts`)에 넘깁니다. 이는 교회가 설정한 문자 제공업체(`@churchapps/texting`: TextInChurch, Clearstream, MutualMinistry)로 가는 모듈 간 통로입니다. 내장 SMS 발송기는 없습니다. 게이트웨이는 `sentText` 행과 수신자별 `deliveryLog` 항목을 기록하며, 한 배치당 최대 500명의 수신자로 제한합니다. 제공업체가 설정되지 않았으면 `no_provider`를 반환하고, 키오스크는 이를 "No SMS provider configured"로 표시합니다. 컨트롤러의 `dispatch()`는 전화번호 중복을 제거하고, 휴대전화 번호가 없거나 `optedOut`이 설정된 사람은 건너뛰며, 키오스크가 건너뛴 항목을 보여 줄 수 있도록 `{ sent, failed, skippedOptedOut, skippedNoPhone }`을 반환합니다.

## 키오스크 (B1Checkin)

화면은 `B1Checkin/app/` 아래의 expo-router 파일이며, 화면 간 상태는 React 상태가 아니라 정적 `CachedData` 클래스(`src/helpers/CachedData.ts`)에 있습니다.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **조회** (`app/lookup.tsx`) — 전화번호(`GET /membership/people/search/phone?number=`, 끝 4자리 또는 전체)나 이름(`GET /membership/people/search?term=`)으로 검색합니다. 일치하는 항목을 고르면 가구(`GET /membership/people/household/{householdId}`)와 기존 방문(`GET /attendance/visits/checkin`)을 불러오고, 지난주 선택 내역으로 `pendingVisits`를 채웁니다.
2. **가구 확인** (`app/household.tsx`, `src/components/MemberList.tsx`) — 각 멤버 행에는 이미 체크인됨 배지, 알레르기/`nametagNotes` 배지, 현재 방 칩이 표시됩니다. 멤버를 펼치면 방 버튼이 있는 모든 서비스 시간과 Member / Guest / Volunteer 체크인 유형 칩(`MemberServiceTimes.tsx`)이 나열됩니다. 각 서비스 시간 이름 아래에는 `ServiceTimeHelper.getGroupSummary()`가 해당 시간에 제공되는 그룹(`serviceTime.groups` 이름을 다듬고, 대소문자를 구분하지 않고 중복을 제거하여 쉼표로 연결)을 보여 줍니다. 시간에 그룹이 없으면 아무것도 표시되지 않습니다.
3. **그룹 배정** (`app/selectGroup.tsx`) — `serviceTime.groups`로 만든 카테고리 트리이며, 나이/학년이 적격한 방은 강조되고 부적격한 방은 스태프 확인 뒤에 흐리게 표시됩니다([나이/학년 적격성](#agegrade-eligibility-kiosk-side) 참고). 방을 고르면 해당 사람의 대기 방문에 `{ session: { serviceTimeId, groupId } }` visitSession이 기록됩니다(`src/helpers/VisitSessionHelper.ts`). "None"을 고르면 지워집니다.
4. **완료** (`app/checkinComplete.tsx`) — `pendingVisits`(각각 `checkinType`이 적용됨)와 함께 `POST /attendance/visits/checkin`을 호출한 뒤, 프린터가 설정되어 있으면 라벨을 인쇄하고 자동으로 조회 화면으로 돌아갑니다. `409` 정원 또는 `notOpen` 응답은 사유(가득 참/마감, 또는 체크인이 열리지 않음)와 함께 해당 방을 표시합니다. 비율 경고는 스태프 확인을 제안하며, 확인하면 `acknowledgeWarnings=true`로 재제출합니다.

**체크아웃** 화면(`app/checkout.tsx`)은 자동 포커스되는 입력창을 통해 4자리 보안 코드를 받습니다. USB/블루투스 키보드 방식 바코드 스캐너로도 카메라 없이 입력할 수 있으며, 같은 알파벳을 사용하는 화면 키패드도 제공하고 4자리가 되면 자동 제출합니다. **Scan** 버튼은 공용 `src/components/CodeScanner.tsx` 카메라(기본적으로 후면 카메라, QR, Code 128, Code 39 지원)가 있는 시트를 열어, 전용 스캐너가 없는 스테이션에서도 픽업 라벨을 읽을 수 있게 합니다. 스캔한 코드는 입력한 값과 같은 `handleCode()` 경로로 들어갑니다. 화면은 코드를 조회하고, 픽업될 자녀를 보여 주며, 가구의 **신뢰된 픽업 대상자**를 가구 성인 사진 그리드와 함께 누를 수 있는 카드로 제시합니다(미승인 이름과 퍼지 검사를 거치는 "Other" 자유 입력 옵션 포함. [신뢰된 픽업 및 미승인 픽업](#trusted-and-not-authorized-pickup) 참고). 그런 다음 선택된 이름/ID와 함께 `POST /attendance/visits/checkout`을 전송합니다. 스태프 모드에서 화면은 **Page a parent**(`POST /attendance/checkin/page`)와 **보안 라벨 재인쇄**도 제공합니다. `reprint()`는 `LabelHelper.getAllLabelsFor(...)`로 가족의 라벨을 다시 만들고, 체크인과 같은 `PrintUI` 파이프라인으로 전달합니다.

스테이션 성격은 AsyncStorage 플래그 `@StationMode`(`"self"` | `"manned"`, `app/adminSettings.tsx`에서 전환)로 저장됩니다. 스태프 모드에서는 조회 화면에 체크아웃 진입점이 추가되고, 가구 화면에서 사람별 프로필 편집(`POST /membership/people`)이 가능합니다. 키오스크 보안 기능도 내장되어 있습니다. 선택적 PIN(`app/setPin.tsx`, `src/components/PinEntryModal.tsx`)이 관리자 및 프린터 화면을 보호하고, 관리자 화면은 헤더 로고를 7번 빠르게 탭해야 열리며, 유휴 대기 화면(`src/hooks/useInactivityTimer.ts`)이 가족 사이에 화면을 넘겨받습니다.

## 셀프 체크인 (B1App)

멤버는 b1.church 포털의 `/mobile/checkin` 화면에서 체크인합니다(`B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx`가 `screens/CheckinPage.tsx`로 라우팅). 로그인한 사용자가 필요하며, 키오스크와 같은 네 단계(서비스 → 가구 → 그룹 → 완료)를 동일한 엔드포인트로 진행합니다. 상태는 `B1App/src/helpers/CheckinHelper.ts`에 있습니다. 키오스크와의 차이점은 다음과 같습니다. 가구는 로그인한 사용자 자신의 `householdId`에서 가져오며(검색 단계 없음), 라벨 인쇄는 없습니다. 대신 완료 화면은 배치의 보안 코드를 QR(`qrcode.react`)로 보여 주며, "체크인 스테이션에서 이것을 보여 주세요"라는 안내가 붙습니다. 페이지가 로드될 때 가구가 이미 체크인되어 있다면, "Show check-in code" 버튼이 `GET /attendance/visits/checkin`에서 받은 첫 번째 `securityCode`가 있는 기존 방문의 QR을 다시 표시합니다. 체크인은 제출 시점에 즉시 기록되며(대기 상태 없음), QR은 키오스크에서 라벨 인쇄만 담당합니다.

**휴대폰에서 키오스크로 라벨 인쇄** (`B1Checkin/app/scan.tsx`, 조회 화면의 "Scan code" QR 버튼에서 진입): 키오스크는 QR 코드를 스캔하는 `CodeScanner`(`expo-camera` `CameraView`, 기본적으로 전면 카메라이며 전환 가능)를 표시합니다. `ScanCodeHelper.parse()`는 보안 코드 알파벳의 4자리 코드만 있는 페이로드를 받아들이며, `ScanCodeHelper.isRepeat()`는 같은 코드를 4초 동안 무시합니다. 따라서 B1App QR과 인쇄된 라벨의 QR 블록이 모두 동작합니다. 이후 화면은 체크아웃 재인쇄 경로를 따릅니다. `GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI`, 그리고 조회 화면으로 돌아갑니다. 스캔 시점에는 출석 기록이 전혀 일어나지 않으며, 라벨만 인쇄합니다. 활성 방문이 없는 코드, 프린터가 없는 스테이션, 라벨이 없는 그룹은 각각 토스트 알림을 띄우고 조회 화면으로 돌아갑니다.

타입과 `ApiHelper`/`ArrayHelper`는 `@churchapps/helpers` 및 `@churchapps/apphelper`에서 가져옵니다. B1Admin과 공유하는 React 컴포넌트는 없습니다.

## 관리자 측 출석 (B1Admin)

- **설정** — `/attendance`(`B1Admin/src/attendance/AttendancePage.tsx`)는 구조 트리를 보여 주고 서비스(`ServiceEdit.tsx`)와 서비스 시간(`ServiceTimeEdit.tsx`)을 만듭니다. 캠퍼스 데이터는 `useCampuses()` 훅을 통해 멤버십에서 가져옵니다.
- **수동 출석**은 출석 섹션이 아니라 그룹 쪽에 있습니다. `B1Admin/src/groups/components/GroupSessionsTab.tsx`는 세션을 만들고(`POST /attendance/sessions`. 추가할 때 `SessionEdit.tsx`는 선택한 서비스 시간을 공유하는 다른 그룹마다 세션을 포함할 수 있으며, 해당 날짜에 이미 세션이 있는 그룹은 건너뜁니다), `POST /attendance/visitsessions/log`로 사람을 출석 처리합니다. 이 호출은 해당 사람과 세션에 대한 방문을 찾거나 생성합니다. 그룹 리더는 `attendance.edit` 권한 없이도 자신의 그룹 출석을 기록할 수 있습니다. 컨트롤러가 `au.leaderGroupIds`를 확인하기 때문입니다.
- **보고** — 출석 추이와 그룹 출석은 서버에서 정의한 보고서입니다(`B1Admin/src/components/reporting/ReportWithFilter.tsx`가 ReportingApi를 사용하며, 정의는 `Api/reports/*.json`에 있습니다). 둘 다 `startDate`/`endDate`(종료일 포함)를 받습니다. 추이 보고서는 기본적으로 1년 전부터 오늘까지이며 주별 `sessionDates` 열을 추가합니다. 그룹 출석의 화면 트리에는 각 방문의 `checkinTime`과 사람의 `membershipStatus`가 포함됩니다. 그룹 출석 CSV는 짝을 이루는 `groupAttendanceDownload` 보고서에서 나오며, `GroupAttendanceDownloadHelper`가 그룹 멤버 한 명당 한 행으로 피벗하고, 날짜가 있는 세션마다 출석/결석 열을 둡니다. 사람별 이력은 `GET /attendance/attendancerecords?personId=`로 가져옵니다(`B1Admin/src/people/components/PersonAttendance.tsx`).

## 라벨 인쇄

### 템플릿과 디자이너

교회는 B1Admin의 `/mobile/checkin/labels`(`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, 체크인 설정 페이지에서 진입)에서 자체 라벨을 디자인합니다. 템플릿은 `labelTemplates` 행이며, `content`는 블록의 JSON 배열입니다. 블록은 `text`, `field`, `barcode`, `qrcode`, `box` 중 하나이고, 백분율 좌표로 위치가 정해지며, 글꼴, 정렬, 기호 체계(`code39`/`code128`/`qr`), 선택적 표시 조건(예: `person.nametagNotes`가 비어 있지 않을 때만 알레르기 상자 표시)을 가질 수 있습니다. `labelType`은 두 가지입니다. `nametag`(체크인한 사람마다 하나. `person.displayName`, `sessions`, `securityCode`, `person.isBirthdayWeek` 같은 필드 포함. `isBirthdayWeek`는 생일의 월/일이 오늘부터 3일 이내이면 `"true"`이며, 연말을 넘는 경우도 포함하고 `LabelHelper.isBirthdayWithin()`이 계산합니다)과 `pickup`(가족당 하나. `children`, `childrenAllergies` 같은 필드 포함)입니다. 서버는 교회별로 유형당 기본 템플릿을 하나만 허용합니다(`LabelTemplateController.save`). 디자이너는 키오스크의 내장 라벨을 반영한 시작용 템플릿을 제공하며, 샘플 데이터로 미리보기를 보여 줍니다.

### 키오스크에서의 렌더링과 인쇄

체크인이 완료되면 `B1Checkin/src/helpers/LabelHelper.ts`가 각 대기 방문의 그룹 플래그를 보고 인쇄할 항목을 결정합니다. `printNametag` 그룹에는 명찰을, `parentPickup` 그룹에 방문이 하나라도 있으면 가족 픽업 라벨 한 장을 인쇄합니다. `checkinType`이 `volunteer`인 방문은 `LabelHelper.selectChildVisits()`에서 제외되므로, Parent Pickup 방에 있는 보육 봉사자가 픽업 라벨을 유발하지 않습니다. 체크인 응답의 보안 코드는 자녀 명찰과 픽업 라벨에 들어가며, 성인 명찰에는 코드가 인쇄되지 않습니다. 교회에 템플릿이 있으면 `LabelRenderer`(`src/helpers/LabelRenderer.ts`)가 블록과 필드 컨텍스트를 독립형 HTML 문서로 변환합니다. 템플릿이 없으면 `B1Checkin/assets/labels/`의 내장 HTML 라벨을 플레이스홀더 치환과 함께 사용합니다.

바코드는 `B1Checkin/src/helpers/barcode.ts`의 순수 TypeScript 인코더가 인라인 SVG로 생성합니다. Code 39 패턴 표, Code 128(mod-103 체크섬이 있는 코드 세트 B) 너비 표가 있으며, QR은 `qrcode` 패키지를 사용합니다. **이 인코더들은 B1Admin에 의도적으로 중복되어 있습니다**(`LabelEditor.tsx`가 같은 표를 인라인으로 포함하며, 코드 주석에 기록되어 있습니다). 디자이너 미리보기가 키오스크 출력과 픽셀 단위로 일치하도록 하기 위함이며, 한쪽을 변경하면 다른 쪽에도 반드시 반영해야 합니다.

인쇄 파이프라인(`src/components/PrintUI.tsx`)은 각 HTML 라벨을 `WebView`에서 렌더링하고, `react-native-view-shot`으로 JPG로 캡처하며, 이미지 URI를 네이티브 **printer-helper** Expo 모듈(`B1Checkin/modules/printer-helper/`)에 넘깁니다. 이 모듈은 `scan()`, `checkInit()`, `printUris()`와 상태 이벤트를 제공하며, 양 플랫폼 모두 브랜드별 제공자가 있습니다.

| 브랜드 | Android | iOS | 비고 |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt`(Brother 인쇄 SDK) | `BrotherProvider.swift`(`BRLMPrinterKit.xcframework`) | QL 시리즈 네트워크 프린터(QL-800/810W/820NWB/1100/1110NWB 등), 다이컷 29×90 라벨, 권장 기본값 |
| Zebra | `ZebraProvider.kt`(Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | 네트워크 검색 + TCP/ZPL 이미지 인쇄 |

프린터 선택은 `app/printers.tsx`에서 합니다(네트워크 스캔은 `brand~model~ip` 항목을 반환하며, 선택 내용은 AsyncStorage에 저장됩니다). `src/helpers/PrinterLog.ts`는 키오스크 헤더의 실시간 상태 점을 통해 보이는 기기 내 진단 로그를 유지합니다.

## 게스트 등록

체크인 중에 사람을 만드는 경로는 두 가지입니다.

- **키오스크에서** — 가구 화면의 "Add guest"가 `B1Checkin/app/addGuest.tsx`를 엽니다. 이 화면은 먼저 `GET /membership/people/search?term=`로 기존 비멤버 일치 항목을 검색하고, 없으면 `POST /membership/people`로 새로 만들어 현재 가구에 연결합니다. 이후 게스트는 다른 멤버와 마찬가지로 그룹 배정 과정을 거칩니다.
- **QR을 통한 셀프 등록** — 교회 설정 `enableQRGuestRegistration`이 켜져 있으면(B1Admin의 체크인 설정에서 구성되며, `GET /membership/settings/public/{churchId}`에서 읽음), 키오스크 조회 화면에 `https://{subdomain}.b1.church/guest-register?serviceId=`로 연결되는 QR 코드가 표시됩니다. 이 B1App 페이지(`src/app/[sdSlug]/(public)/guest-register/page.tsx`)는 방문 가족이 익명 `POST /membership/people/guest-register` 엔드포인트를 통해 자신의 휴대폰에서 직접 등록할 수 있게 하여, 키오스크 대기 줄이 줄어들도록 합니다. QR 시트에는 같은 페이지를 키오스크에서 여는 **Register here** 버튼도 있습니다(`app/guestRegister.tsx`). 이 버튼은 시크릿 모드이며 캐시를 사용하지 않는 `WebView`에서 열립니다. `src/helpers/GuestRegisterHelper.ts`가 QR과 WebView 모두의 URL을 만들고, `https://{subdomain}.b1.church/guest-register` 바깥으로의 이동을 차단합니다. 화면은 **Done**, 뒤로 가기, 또는 120초 동안 입력이 없을 때(양식 입력은 WebView에서 활동으로 전달됨) 조회 화면으로 돌아가며, WebView를 분리하여 한 가족의 입력이 다음 가족에게 넘어가지 않게 합니다.

QR 가입은 B1Admin의 **QR Guest Registration** 카드(`src/mobile/CheckInPage.tsx`)에서 저장한 교회 설정으로 동작합니다.

| 설정 | 공개 범위 | 목적 |
|---|---|---|
| `enableQRGuestRegistration` | public | 키오스크 QR과 익명 엔드포인트의 옵트인 스위치 |
| `guestRegistrationFields` | public | `email`, `phone`, `address`, `birthDate`, `gender`, `maritalStatus`, `grade`, `comments`를 `"off"` / `"optional"` / `"required"`에 매핑하는 JSON. 기본값: 이메일과 전화번호는 선택, 나머지는 꺼짐. 이름/성은 항상 필수 |
| `guestRegistrationImage` | public | 헤더 사진 URL. B1App은 양식과 확인 화면에서 아이콘 대신 16:9로 표시합니다 |
| `guestRegistrationGroupId` | private | 모든 가입이 추가되는 그룹(게스트에게는 보이거나 선택되지 않음) |
| `guestRegistrationRecordAttendance` | private | `"true"`이면 그 그룹에 대한 출석도 함께 기록합니다 |

B1App의 `src/components/checkin/GuestRegister.tsx`는 익명 `GET /membership/people/guest-register/options?churchId=`에서 체크리스트를 가져오고, 포함된 필드만 렌더링합니다(기본 연락처에는 이메일, 전화번호, 결혼 상태, 주소, 구성원별로는 생년월일, 성별, 학년, 댓글 상자 하나). 그리고 그 필드들만 전송합니다. 서버는 `GuestRegistrationHelper.sanitize()`에서 체크리스트를 다시 적용합니다. 꺼진 필드는 버려지고, 필수 값이 없거나 목록에 없는 값은 400이 됩니다. 그런 다음 `PersonHelper.registerGuestHousehold()`가 새 가구를 만듭니다(이메일 중복 제거 없음). 모든 구성원은 `membershipStatus: "Visitor"`로 등록되고, 각 구성원마다 `person.created`가 발생합니다. 그 이후 실패는 반환되지 않고 기록만 됩니다. 구성원은 설정된 그룹에 추가되며(`group.member.added`), 출석 기록이 켜져 있으면 `AttendanceModuleGateway.recordAttendance()`가 일정이 있고 체크인 시간 창(`CheckinGateHelper.isServiceTimeOpen`)이 지금 열려 있는 그룹의 모든 서비스 시간마다 각 구성원을 출석 처리합니다. 필요하면 교회 현지 날짜 기준으로 오늘의 세션을 만듭니다. 일정이 없는 서비스 시간이나 시간 창 밖의 가입은 아무것도 기록하지 않습니다. 댓글은 가구 대표자의 숨겨진 사람 메모 대화가 되며(메시지 작성자 "Guest sign-up"), `person.conversationId`로 연결됩니다.

## 관련 페이지

- [Attendance Endpoints](../api/endpoints/attendance) -- 캠퍼스, 서비스, 세션, 방문, 방문 세션에 대한 전체 REST 영역
- [Membership Endpoints](../api/endpoints/membership) -- 사람, 가구, 그룹
- [Webhooks](../api/webhooks) -- `session.created`, `attendance.recorded`, `attendance.checkout` 이벤트
- [Module Structure](../api/module-structure) -- 서버 측에서 출석 모듈이 구성되는 방식
