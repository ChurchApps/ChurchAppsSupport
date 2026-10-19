---
title: "체크인"
---

# 체크인

<div class="article-intro">

체크인은 세 개의 진입점을 가진 하나의 시스템입니다. 직원이 배치되거나 셀프 서비스로 운영되는 스테이션을 위한 B1Checkin 키오스크 앱, B1App 교인 포털 내부의 셀프 체크인, 그리고 B1Admin의 관리자 측 출석 기능입니다. 세 가지 모두 핵심 Api의 동일한 출석 모듈에 기록하며, 교실 배정은 전적으로 그룹에 의해 결정됩니다. 별도의 "위치" 또는 "방" 엔티티는 없습니다. 그 위에 아동 안전 계층이 자리합니다. 방문별 체크인 유형, 서버 측 정원 및 봉사자 비율 게이트, 키오스크 측 연령/학년 적격성 확인, 체크아웃 시 신뢰 픽업 확인, 교회의 문자 메시지 제공자를 통한 부모 호출이 여기에 포함됩니다. 이 페이지에서는 데이터 모델, 체크인 흐름, 안전 계층, 라벨 인쇄 파이프라인을 다룹니다.

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
| 키오스크 | `B1Checkin` | Expo / React Native, expo-router 파일 기반 라우팅; Android, Amazon Fire, iOS용 EAS 빌드; `expo-updates`를 통한 OTA 업데이트 | 라벨 인쇄 및 검증된 체크아웃을 제공하는 직원 배치 또는 셀프 서비스 스테이션 |
| 셀프 체크인 | `B1App` | Next.js (b1.church 교인 포털) | 로그인한 구성원이 휴대폰으로 자신의 가정을 체크인; 인쇄 없음 |
| 관리자 | `B1Admin` | React SPA | 서비스 구조 구성, 그룹을 서비스 시간에 배정, 라벨 디자인, 수동 출석 기록, 보고서 실행 |

세 진입점 모두 `ApiHelper`를 통해 동일한 두 API 모듈을 호출합니다. 교인, 가정, 그룹에는 **MembershipApi**(`/membership`)를, 그 외 아래의 모든 기능에는 **AttendanceApi**(`/attendance`)를 사용합니다.

## 데이터 모델 (`Api/src/modules/attendance`)

| 엔티티 / 테이블 | 주요 필드 | 의미 |
|----------------|-----------|---------|
| `campuses` | name, address | 여기서는 사용 중단됨 — 캠퍼스는 membership 모듈(`/membership/campuses`)에서 관리되며, 출석 쪽 복사본은 기존 읽기 전용 용도로 고정되어 있습니다(`models/Campus.ts`) |
| `services` | campusId, name | 반복되는 모임, 예: "주일 오전" (`models/Service.ts`) |
| `serviceTimes` | serviceId, name, dayOfWeek, startTime, endTime, checkinOpenMinutes, checkinCloseMinutes | 서비스 내의 시간대, 예: "오전 9:00" (`models/ServiceTime.ts`). 일정 열은 선택 사항이며(마이그레이션 `tools/migrations/attendance/2026-10-10_service_time_schedule.ts`), [체크인 시간대](#scheduled-check-in-windows)를 결정합니다 |
| `groupServiceTimes` | groupId, serviceTimeId | 조인 테이블: 어떤 그룹(교실)이 어떤 서비스 시간에 모이는지 (`models/GroupServiceTime.ts`) |
| `sessions` | groupId, serviceTimeId, sessionDate | 특정 날짜의 한 그룹의 한 번의 모임 — 체크인 시점에 지연 생성됨 (`models/Session.ts`) |
| `visits` | personId, serviceId, visitDate, checkinTime, securityCode, checkinType, checkedInById, checkoutTime, checkedOutBy, checkedOutById | 특정 날짜에 한 사람이 참석한 기록 (`models/Visit.ts`). `checkinType`은 `member` / `guest` / `volunteer`(NULL = 기존 교인)이며, 키오스크가 설정하고 정원/비율 게이트가 사용합니다 |
| `visitSessions` | visitId, sessionId | 방문이 포함하는 세션 — 두 서비스 시간에 체크인한 아동은 두 개의 행을 가집니다 (`models/VisitSession.ts`) |
| `labelTemplates` | name, labelType (`nametag`/`pickup`), width, height, isDefault, content (JSON blocks) | 디자인 가능한 라벨 레이아웃 (`models/LabelTemplate.ts`) |

### 완료된 체크인이 저장되는 방식

`VisitController.postCheckin`(`Api/src/modules/attendance/controllers/VisitController.ts`)이 `POST /attendance/visits/checkin?serviceId=&peopleIds=`를 처리합니다. 요청 본문은 `Visit` 객체의 배열이며, 각 객체는 `visitSessions`를 담고 있고, 그 안의 내장된 `session`은 `(serviceTimeId, groupId)` 쌍만 지정합니다. 그런 다음 서버는 다음을 수행합니다:

1. **쓰기 전에 정원과 비율을 확인합니다.** `evaluateGates()` → `CheckinGateHelper.evaluate()`가 대상 교실마다 정원, 손님 정원, 닫힘 여부, 현재 인원 대비 봉사자 비율을 확인합니다. postCheckin은 **트랜잭션이 아니므로** 게이트가 첫 저장 전에 실행되어야 합니다. 심각한 위반이 있으면 위반한 교실의 이름을 포함한 409가 반환되며 아무것도 저장되지 않습니다. [정원 및 봉사자 비율 게이트](#capacity-and-volunteer-ratio-gates)를 참조하십시오.
2. **세션을 지연 방식으로 확인합니다.** `getSessionId()`가 `(groupId, serviceTimeId, today)`에 해당하는 `sessions` 행을 찾거나 만듭니다. 세션 ID는 날짜별로 프로세스 내에 캐시됩니다. 새 세션은 `session.created` 웹훅을 발생시킵니다. 이 루프는 await되는 `for..of`입니다. 이전의 fire-and-forget `forEach(async …)`가 저장과 경합하여 첫 세션 생성 시 sessionId가 NULL로 기록되는 문제가 있었습니다(수정 완료; 루프 위의 코드 주석에 기록됨).
3. **그날의 기록을 교체합니다.** 해당 서비스에서 오늘 이 사람들의 기존 방문과 visitSessions를 모두 삭제한 뒤, 제출된 집합을 저장합니다. 따라서 가족을 다시 체크인하는 것은 추가가 아니라 "현재 상태"를 보장하는 멱등 작업입니다. 대신 `?checkDuplicates=true`를 전달하면 기록하지 않고 `{ duplicates: [personId…] }`를 반환하며, 키오스크는 이 값으로 덮어쓰기 전에 경고합니다.
4. **배치당 하나의 보안 코드를 생성합니다.** `SecurityCodeHelper.generate()`가 알파벳 `23456789BCDFGHJKLMNPQRSTVWXYZ`에서 4자리 코드를 만듭니다. 모음과 혼동되기 쉬운 문자를 제외하므로 코드가 단어를 이루거나 잘못 읽히지 않습니다. 서버는 같은 교회의 당일 열린 방문과 충돌하면 재시도하고, 배치의 모든 방문에 코드를 기록합니다.
5. **`{ streaks, securityCode }`를 반환합니다.** `streaks`는 personId를 연속 주간 출석 횟수에 매핑하며, 키오스크는 이정표(매 5주차)를 색종이 효과로 축하합니다.

저장된 각 방문은 `attendance.recorded` 웹훅도 발생시킵니다. 읽기 측인 `GET /attendance/visits/checkin`은 사람들의 **마지막 기록 날짜**의 방문을 반환합니다. 그 날짜가 지난주라면 id를 제거하므로, 클라이언트는 지난주 교실 선택 내용이 미리 채워진 복사본을 받으며, 이는 새 기록으로 저장됩니다.

### 체크아웃

두 개의 엔드포인트가 흐름을 완성합니다(`VisitController`):

- `GET /attendance/visits/code/:code` — 해당 보안 코드를 가지고 있으며 아직 체크아웃되지 않은 오늘의 방문을 세션과 함께 반환합니다.
- `POST /attendance/visits/checkout` — 본문 `{ visitIds, checkedOutBy?, checkedOutById? }`; `checkoutTime`과 픽업한 사람을 기록하고, 방문마다 `attendance.checkout` 웹훅을 발생시킵니다.

권한: 키오스크는 `attendance.checkin`으로 인증하며, 이 권한은 체크인/체크아웃/라벨 템플릿 기능만 정확히 부여합니다. `attendance.view`/`attendance.edit`은 보고서와 수동 입력을 담당합니다. 구조(서비스, 서비스 시간, 그룹 배정)에는 `services.edit`가 필요합니다. 교인 셀프 체크인(B1App)은 어떤 권한도 필요하지 않습니다. 교회에 연결된 사람이 있는 인증된 사용자라면 누구나 `GET`/`POST /attendance/visits/checkin`을 호출할 수 있으며, 서버는 제출된 `personId`를 호출자 본인의 가정으로 제한합니다(그렇지 않으면 403). 이 제한 덕분에 다른 가정의 `securityCode`는 읽을 수 없습니다. 교인 자격이 곧 권한이며, 교인이 이 기능을 *볼 수 있는지*는 교회의 B1App 내비게이션 탭으로 제어합니다. 다른 체크인 엔드포인트(`code/:code`, `checkout`, `guardians`, `CheckinController`)는 여전히 키오스크/직원 전용입니다.

## 그룹이 교실 배정을 결정합니다

시스템 어디에도 방이나 교실 엔티티는 없습니다. "방"은 `trackAttendance`가 켜져 있고 `groupServiceTimes`를 통해 하나 이상의 서비스 시간에 연결된 교인 **그룹**입니다. 키오스크 동작을 결정하는 그룹 필드(`Api/src/modules/membership/models/Group.ts`)는 다음과 같습니다:

| 필드 | 효과 |
|------|--------|
| `trackAttendance` | 그룹이 출석 기능에 참여함. B1Admin의 설정 트리는 `groupServiceTimes` 행이 없는 `trackAttendance` 그룹을 미배정으로 표시함 |
| `parentPickup` | 아동 교실을 표시함. 이 교실에 체크인하면 방문이 "아동" 방문이 되어 가족 픽업 라벨이 인쇄되고, 보안 코드가 이름표에 표시됨 |
| `printNametag` | 이 그룹에 대한 체크인 시 이름표를 인쇄할지 여부 |
| `capacity` / `guestCapacity` / `checkinClosed` | 교실 정원 제한과 강제 "닫힘" 스위치. 체크인 게이트가 서버 측에서 시행함(B1Admin의 그룹 설정 "체크인 정원"에서 편집) |
| `volunteerRatio` / `minVolunteers` | 아동 대 봉사자 비율과 최소 봉사자 인원. 교회 전체의 `ratioEnforcement` 설정에 따라 시행됨 |
| `minAgeMonths` / `maxAgeMonths` / `minGrade` / `maxGrade` | 교실을 강조하거나 흐리게 표시하기 위해 키오스크 측에서 평가하는 연령/학년 적격성 범위 |

모든 클라이언트는 같은 방식으로 데이터를 비정규화합니다(예: `B1Checkin/app/services.tsx`, `B1App/src/app/[sdSlug]/mobile/components/screens/CheckinPage.tsx`). `GET /attendance/servicetimes?serviceId=`, `GET /attendance/groupservicetimes`, `GET /membership/groups`를 병렬로 불러온 뒤, 각 서비스 시간에 대해 `groupServiceTimes` 행이 그 서비스 시간을 가리키는 그룹들을 `serviceTime.groups`에 모읍니다. 이 배열이 교실 선택기에 표시되며, 그룹의 `categoryName`별로 정리됩니다.

배정은 B1Admin의 그룹 페이지(`B1Admin/src/groups/components/ServiceTimesEdit.tsx` — `POST`/`DELETE /attendance/groupservicetimes`)에서 편집합니다. 캠퍼스 → 서비스 → 서비스 시간 → 그룹의 전체 트리는 `GET /attendance/attendancerecords/tree`를 통해 `B1Admin/src/attendance/components/AttendanceSetup.tsx`에 시각화됩니다.

:::info
그룹이 유일한 진실의 원천이므로, 같은 그룹 구성원 정보가 키오스크 라우팅, B1Admin 그룹 페이지의 명단 형식 출석, 출석 보고서를 모두 뒷받침합니다. 그룹을 서비스 시간에 배정하는 것만으로 체크인 대상이 될 수 있습니다.
:::

## 아동 안전

### 체크인 유형

모든 방문에는 `checkinType`이 있습니다. `member`, `guest`, `volunteer` 중 하나이며, NULL은 기존/교인을 의미합니다(마이그레이션 `tools/migrations/attendance/2026-07-03_checkin_type.ts`). 이 유형은 **키오스크 측에서** 선택합니다. 확장된 교인 행의 교인 / 손님 / 봉사자 칩(`B1Checkin/src/components/MemberServiceTimes.tsx`)으로 선택하고, 완료 시 각 대기 중인 방문에 기록됩니다(`app/checkinComplete.tsx`, 기본값 `member`). 서버는 게이트에서 이 값을 사용합니다. 봉사자는 정원에 포함되지 않고 비율 충족에 포함되며, 손님은 `guestCapacity`에 포함됩니다.

### 정원 및 봉사자 비율 게이트 {#capacity-and-volunteer-ratio-gates}

`CheckinGateHelper.evaluate()`(`Api/src/modules/attendance/helpers/CheckinGateHelper.ts`)는 저장 전에 `postCheckin` 내부에서 실행됩니다. 이 엔드포인트는 트랜잭션이 아니므로 저장 전 게이트가 정확성을 보장하는 장치입니다. 대상 그룹마다 현재 인원(`VisitRepo.countActiveByGroupToday`)을 불러오고, membership 모듈 게이트웨이를 통해 그룹 설정을 가져온 뒤 위반 사항을 분류합니다:

- **심각(항상 차단):** `checkinClosed`, `current + incoming > capacity`, 손님 수가 `guestCapacity`를 초과함. 배치는 `409 { error: "capacity", groups: [{ groupId, groupName, reason }] }`로 거부되며, 키오스크는 해당 교실을 표시합니다.
- **비율(경고 또는 차단):** 봉사자가 `minVolunteers`보다 적은 교실로 들어가는 봉사자가 아닌 인원, 봉사자가 전혀 없는 경우, 또는 `children > volunteers × volunteerRatio`인 경우. 심각도는 교회별 `ratioEnforcement` 설정을 따릅니다(기본값 `"warn"` / `"block"`, B1Admin Manage Church → Check-In, `CheckinSettingsEdit.tsx`에서 편집). 경고 모드에서는 클라이언트가 `acknowledgeWarnings=true`를 붙여 다시 제출하지 않는 한 `409 { warning: true, error: "ratio", … }`를 반환합니다. 이 재제출이 키오스크의 직원 확인 재정의입니다.

### 예약된 체크인 시간대 {#scheduled-check-in-windows}

서비스 시간에는 선택적인 주간 일정(`dayOfWeek` 0–6, 0 = 일요일, `startTime`/`endTime`은 `HH:mm`, `checkinOpenMinutes`, `checkinCloseMinutes`)을 설정할 수 있습니다. 이는 B1Admin의 **출석 → 설정** 서비스 시간 양식(`B1Admin/src/attendance/components/ServiceTimeEdit.tsx`, "체크인 일정")에서 편집합니다. `CheckinGateHelper.hasSchedule()`은 `dayOfWeek`와 `startTime`이 모두 설정된 경우에만 서비스 시간을 예약된 것으로 간주하며, 일정이 없는 시간은 시간 기준으로 제한되지 않습니다. `isServiceTimeOpen()`은 교회 현지 시간(`DateHelper.toChurchTime`)으로 시간대를 계산합니다. 시간대는 교회의 `timeZone`이며, 설정되지 않은 교회는 `timezone`이 있는 첫 번째 삭제되지 않은 캠퍼스를 사용하고(`MembershipModuleGateway.loadCampusTimeZone`), 그것도 없을 때에만 `America/New_York`으로 대체합니다. 아래의 목록 및 게시 경로는 모두 같은 방식으로 시간대를 확인하며, 시간대는 `checkinOpenMinutes`만큼 시작 전부터 `checkinCloseMinutes`만큼 종료 후까지(종료 시간이 없으면 시작 후까지) 열려 있습니다. 자정이나 주 경계를 넘나드는 시간대도 처리합니다.

이 시간대는 두 곳에서 시행됩니다:

- **목록:** `GET /attendance/servicetimes`는 각 행에 계산된 `checkinOpen` 불리언 값을 붙입니다. B1App의 셀프 체크인(`CheckinPage.tsx`)과 B1Checkin의 서비스 선택기(`app/services.tsx`)는 모두 `checkinOpen === false`인 시간을 제외하며, 서비스에 시간은 있지만 열린 시간이 없으면 "이 서비스는 지금 체크인이 열려 있지 않습니다."를 표시합니다(키오스크는 다른 서비스를 고를 수 있도록 뒤로 가기 버튼을 제공합니다).
- **게시:** `evaluateGates()` 내부에서, 정원/비율 평가 전에 `findClosedServiceTimeGroups()`가 대상 세션 중 하나라도 서비스 시간의 시간대 밖에 있으면 `409 { error: "notOpen", groups: [{ groupId, groupName, reason: "notOpen" }] }`로 배치를 거부합니다. B1Checkin은 이를 "지금은 체크인이 열려 있지 않습니다"라는 이유와 함께 심각 게이트 화면으로 표시합니다(정원 위반은 여전히 "교실이 가득 찼거나 닫혔습니다"로 표시됨).

### 연령/학년 적격성(키오스크 측) {#agegrade-eligibility-kiosk-side}

교실 적격성은 참고용 UI이며, 키오스크에서 평가하고 서버에서는 시행하지 않습니다. `B1Checkin/src/helpers/EligibilityHelper.ts`는 사람의 생년월일/학년을 그룹의 `minAgeMonths`/`maxAgeMonths`/`minGrade`/`maxGrade`와 비교하고(학년 순서: PreK, K, 1–12, Graduated), `eligible` / `ineligible` / `unknown`을 반환합니다. 데이터가 없으면 `unknown`이 되며, 교실을 숨기지 않습니다. 나이와 학년은 교회의 **학년 진급일**(`gradePromotionDate` 설정, `"MM-DD"`, `B1Admin/src/settings/components/GradePromotionSettingsEdit.tsx`에서 편집) 기준으로 계산됩니다. 키오스크는 `GET /attendance/checkin/settings`에서 이 값을 가져오며, `resolveAsOfDate`가 오늘 이전이나 오늘에 해당하는 가장 최근 날짜를 고릅니다. 교실 선택기는 적격 교실을 강조하고 부적격 교실은 흐리게 표시하며, 흐린 교실을 선택하려면 직원 확인이 필요합니다.

### 신뢰 및 미승인 픽업 {#trusted-and-not-authorized-pickup}

픽업 대상자는 가정별로 관리되는 membership 엔티티입니다: `householdPickupPeople`(`Api/src/modules/membership/models/HouseholdPickupPerson.ts` — householdId, 선택적 personId, name, photoUrl, relationship, `status` `trusted` / `notAuthorized`, notes). CRUD는 `GET /membership/householdpickup/:householdId`(키오스크가 읽을 수 있도록 인증된 교회 사용자 누구나 가능)와 `people.edit`로 제한된 `POST` / `DELETE`입니다. 직원은 사람 페이지의 **픽업** 카드(`B1Admin/src/people/components/PickupPeople.tsx`)에서 목록을 관리합니다. 사진, 관계, 신뢰/미승인 상태 칩이 표시됩니다.

체크아웃 시(`B1Checkin/app/checkout.tsx`) 키오스크는 가정의 픽업 목록을 불러옵니다. `trusted` 항목은 가정 성인 사진 그리드와 함께 누를 수 있는 픽업 카드로 표시됩니다. 자유롭게 입력한 "기타" 이름은 `notAuthorized` 항목과 퍼지 매칭됩니다(Levenshtein, `src/helpers/PickupMatchHelper.ts`). 일치하면 체크아웃이 차단되고 경고 시트가 표시되며, 직원이 **재정의** 버튼을 누를 수 있습니다. 재정의는 방문 자체에 기록됩니다. 일반 `POST /attendance/visits/checkout`을 통해 `checkedOutBy`를 `"OVERRIDE: {name}"`으로 전송하므로, 별도의 감사 테이블이 아니라 출석 기록과 `attendance.checkout` 웹훅에 남습니다.

### 부모 호출 및 긴급 방송

`CheckinController`(`Api/src/modules/attendance/controllers/CheckinController.ts`, `/attendance/checkin`)는 두 개의 SMS 엔드포인트를 제공합니다:

- `POST /page` — `{ visitId, message }`: 체크인된 아동 한 명의 보호자에게 호출을 보냅니다(키오스크 체크아웃 화면, 직원 배치 모드).
- `POST /broadcast` — `{ serviceId, message }`: 서비스에 체크인된 모든 가정의 성인에게 문자를 보냅니다(키오스크 관리자 설정, `B1Checkin/app/adminSettings.tsx`의 `EMERGENCY` 입력 확인 시트 뒤에 있음).

두 기능 모두 membership 게이트웨이를 통해 가정 성인을 확인한 다음, 전달을 **`MessagingModuleGateway.sendBulkText`**(`Api/src/shared/modules/MessagingModuleGateway.ts`)에 맡깁니다. 이는 교회가 설정한 문자 메시지 제공자로 가는 모듈 간 통로입니다(`@churchapps/texting`: TextInChurch, Clearstream, MutualMinistry; 내장 SMS 발송기는 없습니다). 게이트웨이는 `sentText` 행과 수신자별 `deliveryLog` 항목을 기록하며, 한 배치당 최대 500명의 수신자로 제한합니다. 제공자가 설정되지 않았으면 `no_provider`를 반환하고, 키오스크는 이를 "설정된 SMS 제공자가 없습니다"로 표시합니다. 컨트롤러의 `dispatch()`는 전화번호 중복을 제거하고, 휴대폰 번호가 없거나 `optedOut`으로 설정된 사람은 건너뛰며, `{ sent, failed, skippedOptedOut, skippedNoPhone }`을 반환하여 키오스크가 건너뛴 내역을 보여 줄 수 있게 합니다.

## 키오스크 (B1Checkin)

화면은 `B1Checkin/app/` 아래의 expo-router 파일이며, 화면 간 상태는 React 상태가 아닌 정적 `CachedData` 클래스(`src/helpers/CachedData.ts`)에 저장됩니다.

```
index (boot/auto-login) → selectChurch → services ──▶ lookup ──▶ household ──▶ checkinComplete
                                          │             │  ▲         │ │            │
             loads serviceTimes, groups,  │             │  └─────────┘ └▶ addGuest  └▶ print labels,
             groupServiceTimes,           │             └▶ checkout (manned)           auto-return
             labelTemplates               │                                            to lookup
```

1. **조회** (`app/lookup.tsx`) — 전화번호(`GET /membership/people/search/phone?number=`, 끝 4자리 또는 전체)나 이름(`GET /membership/people/search?term=`)으로 검색합니다. 일치하는 항목을 선택하면 가정(`GET /membership/people/household/{householdId}`)과 기존 방문(`GET /attendance/visits/checkin`)을 불러와, 지난주 선택 내용으로 `pendingVisits`를 채웁니다.
2. **가정 확인** (`app/household.tsx`, `src/components/MemberList.tsx`) — 각 구성원 행에는 이미 체크인됨 배지, 알레르기/`nametagNotes` 배지, 현재 교실 칩이 표시됩니다. 구성원을 펼치면 모든 서비스 시간이 교실 버튼과 교인 / 손님 / 봉사자 체크인 유형 칩(`MemberServiceTimes.tsx`)과 함께 나열됩니다. 각 서비스 시간 이름 아래에는 `ServiceTimeHelper.getGroupSummary()`가 해당 시간에 열리는 그룹들(`serviceTime.groups` 이름을 다듬고, 대소문자를 구분하지 않고 중복 제거하여 쉼표로 연결)을 보여 줍니다. 시간에 그룹이 없으면 아무것도 표시되지 않습니다.
3. **그룹 배정** (`app/selectGroup.tsx`) — `serviceTime.groups`로 만든 카테고리 트리이며, 연령/학년 적격 교실은 강조되고 부적격 교실은 직원 확인 뒤에 흐리게 표시됩니다([연령/학년 적격성](#agegrade-eligibility-kiosk-side) 참조). 교실을 고르면 해당 인원의 대기 방문에 `{ session: { serviceTimeId, groupId } }` visitSession이 기록됩니다(`src/helpers/VisitSessionHelper.ts`). "없음"을 선택하면 지워집니다.
4. **완료** (`app/checkinComplete.tsx`) — `pendingVisits`(각각 `checkinType`이 기록됨)와 함께 `POST /attendance/visits/checkin`을 호출한 뒤, 프린터가 설정되어 있으면 라벨을 인쇄하고 조회 화면으로 자동 복귀합니다. `409` 정원 또는 `notOpen` 응답은 이유(가득 참/닫힘, 또는 체크인 미개시)와 함께 해당 교실을 표시합니다. 비율 경고는 직원 확인을 제안하며, 확인하면 `acknowledgeWarnings=true`를 붙여 다시 제출합니다.

**체크아웃** 화면(`app/checkout.tsx`)은 자동 포커스된 입력창에서 4자리 보안 코드를 받습니다. 따라서 USB/블루투스 키보드 방식 바코드 스캐너를 카메라 없이 사용할 수 있습니다. 또는 같은 알파벳을 사용하는 화면 키패드로 입력할 수 있으며, 4자리가 입력되면 자동으로 제출됩니다. **스캔** 버튼은 공유 `src/components/CodeScanner.tsx` 카메라가 있는 시트를 엽니다(기본적으로 후면 카메라, QR, Code 128, Code 39 지원). 따라서 키보드 방식 스캐너가 없는 스테이션도 픽업 라벨을 읽을 수 있습니다. 스캔된 코드는 입력된 내용과 같은 `handleCode()` 경로로 전달됩니다. 이 화면은 코드를 조회하고, 픽업될 아동을 표시하며, 가정의 **신뢰 픽업 대상자**를 가정 성인 사진 그리드와 함께 누를 수 있는 카드로 보여 줍니다(미승인 이름과 퍼지 확인되는 "기타" 자유 입력 옵션도 포함 — [신뢰 및 미승인 픽업](#trusted-and-not-authorized-pickup) 참조). 그런 다음 선택기의 이름/ID와 함께 `POST /attendance/visits/checkout`을 호출합니다. 직원 모드에서는 화면에 **보호자 호출**(`POST /attendance/checkin/page`)과 **보안 라벨 재인쇄**도 표시됩니다. `reprint()`는 `LabelHelper.getAllLabelsFor(...)`로 가족의 라벨을 다시 만들고, 체크인과 같은 `PrintUI` 파이프라인으로 전달합니다.

스테이션 모드는 AsyncStorage 플래그 `@StationMode`(`"self"` | `"manned"`, `app/adminSettings.tsx`에서 전환)로 설정됩니다. 직원 모드에서는 조회 화면에 체크아웃 진입점이 추가되고, 가정 화면에서 구성원별 프로필 편집(`POST /membership/people`)이 가능합니다. 키오스크 보안 기능도 내장되어 있습니다. 선택적 PIN(`app/setPin.tsx`, `src/components/PinEntryModal.tsx`)이 관리자 및 프린터 화면을 보호하고, 관리자 화면은 헤더 로고를 7번 빠르게 탭해야만 열리며, 유휴 대기 화면(`src/hooks/useInactivityTimer.ts`)이 가정과 가정 사이에 나타납니다.

## 셀프 체크인 (B1App)

구성원은 b1.church 포털의 `/mobile/checkin` 화면에서 체크인합니다(`B1App/src/app/[sdSlug]/mobile/components/ScreenRouter.tsx`가 `screens/CheckinPage.tsx`로 라우팅합니다). 로그인한 사용자가 필요하며, 키오스크와 같은 네 단계(서비스 → 가정 → 그룹 → 완료)를 동일한 엔드포인트를 통해 진행합니다. 상태는 `B1App/src/helpers/CheckinHelper.ts`에 저장됩니다. 키오스크와 다른 점은 다음과 같습니다. 가정은 로그인한 사용자 본인의 `householdId`에서 가져오므로 검색 단계가 없고, 라벨 인쇄가 없습니다. 대신 완료 화면에 배치의 보안 코드가 QR(`qrcode.react`)로 표시되고, "체크인 스테이션에서 이 코드를 보여 주세요"라는 안내가 나타납니다. 페이지가 열릴 때 가정이 이미 체크인되어 있으면, "체크인 코드 보기" 버튼이 `GET /attendance/visits/checkin`에서 가져온 `securityCode`를 가진 첫 번째 기존 방문의 QR을 다시 보여 줍니다. 체크인은 제출 시점에 즉시 기록되며, 대기 상태는 없습니다. QR은 키오스크에서 라벨 인쇄를 실행하는 용도로만 사용됩니다.

**휴대폰에서 키오스크로 라벨 인쇄** (`B1Checkin/app/scan.tsx`, 조회 화면의 QR "코드 스캔" 버튼에서 진입): 키오스크는 QR 코드를 스캔하는 `CodeScanner`(`expo-camera` `CameraView`, 기본적으로 전면 카메라이며 전환 가능)를 표시합니다. `ScanCodeHelper.parse()`는 보안 코드 알파벳의 4자리 코드만 있는 페이로드를 받아들이고, `ScanCodeHelper.isRepeat()`는 같은 코드를 4초 동안 무시합니다. 따라서 B1App의 QR과 인쇄된 라벨의 QR 영역 모두 작동합니다. 이후 화면은 체크아웃 재인쇄 경로(`GET /attendance/visits/code/{code}` → `GET /membership/people/ids` → `LabelHelper.getAllLabelsFor(visits, people, code)` → `PrintUI`)를 따르고 조회 화면으로 돌아갑니다. 스캔 시점에 출석 기록 쓰기는 일어나지 않으며, 라벨만 인쇄합니다. 활성 방문이 없는 코드, 프린터가 없는 스테이션, 라벨이 없는 그룹은 각각 토스트 메시지를 표시하고 조회 화면으로 돌아갑니다.

타입과 `ApiHelper`/`ArrayHelper`는 `@churchapps/helpers`와 `@churchapps/apphelper`에서 가져옵니다. B1Admin과 공유하는 React 컴포넌트는 없습니다.

## 관리자 측 출석 (B1Admin)

- **설정** — `/attendance`(`B1Admin/src/attendance/AttendancePage.tsx`)는 구조 트리를 표시하고, 서비스(`ServiceEdit.tsx`)와 서비스 시간(`ServiceTimeEdit.tsx`)을 만듭니다. 캠퍼스 데이터는 `useCampuses()` 훅을 통해 membership에서 가져옵니다.
- **수동 출석**은 출석 섹션이 아니라 그룹 쪽에 있습니다. `B1Admin/src/groups/components/GroupSessionsTab.tsx`는 세션을 만들고(`POST /attendance/sessions`. 추가할 때 `SessionEdit.tsx`는 선택한 서비스 시간을 공유하는 다른 그룹마다 세션을 하나씩 포함할 수 있으며, 해당 날짜에 이미 세션이 있는 그룹은 건너뜁니다), `POST /attendance/visitsessions/log`를 통해 사람을 출석 처리합니다. 이 호출은 해당 사람과 세션의 방문을 찾거나 만듭니다. 그룹 리더는 `attendance.edit` 권한이 없어도 자신의 그룹 출석을 기록할 수 있습니다. 컨트롤러가 `au.leaderGroupIds`를 확인하기 때문입니다.
- **보고서** — 출석 추세와 그룹 출석은 서버에서 정의된 보고서입니다(ReportingApi를 사용하는 `B1Admin/src/components/reporting/ReportWithFilter.tsx`; 정의는 `Api/reports/*.json`). 둘 다 `startDate`/`endDate`(종료일 포함)를 받습니다. 추세 보고서는 기본적으로 1년 전부터 오늘까지이며, 주별 `sessionDates` 열을 추가합니다. 그룹 출석의 화면 트리에는 각 방문의 `checkinTime`과 사람의 `membershipStatus`가 포함됩니다. 그룹 출석의 CSV는 짝을 이루는 `groupAttendanceDownload` 보고서에서 가져오며, `GroupAttendanceDownloadHelper`가 구성원마다 한 행으로 피벗하고 날짜별 세션마다 출석/결석 열을 만듭니다. 개인별 기록은 `GET /attendance/attendancerecords?personId=`에서 가져옵니다(`B1Admin/src/people/components/PersonAttendance.tsx`).

## 라벨 인쇄

### 템플릿과 디자이너

교회는 B1Admin의 `/mobile/checkin/labels`(`B1Admin/src/attendance/LabelsPage.tsx` + `components/LabelEditor.tsx`, 체크인 설정 페이지에서 진입)에서 자체 라벨을 디자인합니다. 템플릿은 `content`가 블록의 JSON 배열인 `labelTemplates` 행입니다. 블록은 `text`, `field`, `barcode`, `qrcode`, `box` 중 하나이며, 백분율 좌표로 위치가 정해지고, 글꼴, 정렬, 기호 체계(`code39`/`code128`/`qr`), 선택적 표시 조건(예: `person.nametagNotes`가 비어 있지 않을 때만 알레르기 상자 표시)을 가질 수 있습니다. `labelType`은 두 가지입니다. `nametag`(체크인된 사람마다 하나. `person.displayName`, `sessions`, `securityCode`, `person.isBirthdayWeek` 같은 필드 사용. `person.isBirthdayWeek`는 생일의 월/일이 오늘로부터 3일 이내이면 `"true"`이며, 연말을 넘어가는 경우도 포함하고 `LabelHelper.isBirthdayWithin()`이 계산합니다)와 `pickup`(가정마다 하나. `children`, `childrenAllergies` 같은 필드 사용)입니다. 서버는 교회별 유형당 기본 템플릿을 하나만 허용합니다(`LabelTemplateController.save`). 디자이너에는 키오스크의 내장 라벨을 본뜬 시작용 템플릿이 포함되어 있으며, 샘플 데이터로 미리 볼 수 있습니다.

### 키오스크에서의 렌더링과 인쇄

체크인이 완료되면 `B1Checkin/src/helpers/LabelHelper.ts`가 각 대기 방문의 그룹 플래그를 보고 인쇄할 항목을 결정합니다. `printNametag` 그룹에는 이름표를, 방문 중 하나라도 `parentPickup` 그룹에 해당하면 가족 픽업 라벨 하나를 인쇄합니다. `checkinType`이 `volunteer`인 방문은 `LabelHelper.selectChildVisits()`에서 건너뛰므로, 부모 픽업 교실의 보육 봉사자는 픽업 라벨을 유발하지 않습니다. 체크인 응답의 보안 코드는 아동 이름표와 픽업 라벨에 들어가며, 성인 이름표에는 코드가 인쇄되지 않습니다. 교회에 템플릿이 있으면 `LabelRenderer`(`src/helpers/LabelRenderer.ts`)가 블록과 필드 컨텍스트를 독립형 HTML 문서로 변환합니다. 없으면 `B1Checkin/assets/labels/`의 내장 HTML 라벨에 자리 표시자를 채워 사용합니다.

바코드는 `B1Checkin/src/helpers/barcode.ts`의 순수 TypeScript 인코더가 인라인 SVG로 생성합니다. Code 39 패턴 표와 Code 128(모듈러 103 체크섬이 있는 코드 세트 B) 너비 표이며, QR은 `qrcode` 패키지를 사용합니다. **이 인코더는 B1Admin에도 의도적으로 중복되어 있습니다**(`LabelEditor.tsx`가 같은 표를 인라인으로 포함하며, 코드 주석에 기록되어 있습니다). 따라서 디자이너 미리 보기가 키오스크 출력과 픽셀 단위로 일치합니다. 한쪽을 변경하면 다른 쪽에도 반영해야 합니다.

인쇄 파이프라인(`src/components/PrintUI.tsx`)은 각 HTML 라벨을 `WebView`에서 렌더링하고, `react-native-view-shot`으로 JPG로 캡처한 뒤, 이미지 URI를 네이티브 **printer-helper** Expo 모듈(`B1Checkin/modules/printer-helper/`)에 전달합니다. 이 모듈은 `scan()`, `checkInit()`, `printUris()`와 상태 이벤트를 제공하며, 두 플랫폼 모두 브랜드별 제공자가 있습니다:

| 브랜드 | Android | iOS | 참고 |
|-------|---------|-----|-------|
| Brother | `BrotherProvider.kt` (Brother 인쇄 SDK) | `BrotherProvider.swift` (`BRLMPrinterKit.xcframework`) | QL 시리즈 네트워크 프린터(QL-800/810W/820NWB/1100/1110NWB…), 다이컷 29×90 라벨, 권장 기본값 |
| Zebra | `ZebraProvider.kt` (Link-OS SDK) | `ZebraProvider.swift` + `ZebraBridge` | 네트워크 검색 + TCP/ZPL 이미지 인쇄 |

프린터 선택은 `app/printers.tsx`에서 이루어집니다(네트워크 스캔은 `brand~model~ip` 항목을 반환하며, 선택 내용은 AsyncStorage에 저장됩니다). `src/helpers/PrinterLog.ts`는 키오스크 헤더의 실시간 상태 점을 통해 보여 주는 기기 내 진단 로그를 유지합니다.

## 게스트 등록

체크인 도중 사람을 만드는 경로는 두 가지입니다:

- **키오스크에서** — 가정 화면의 "게스트 추가"가 `B1Checkin/app/addGuest.tsx`를 엽니다. 이 화면은 먼저 `GET /membership/people/search?term=`으로 기존 비교인(구성원이 아닌 사람) 일치 항목을 검색하고, 없으면 `POST /membership/people`로 만들어 현재 가정에 연결합니다. 이후 게스트는 다른 구성원과 마찬가지로 그룹 배정을 거칩니다.
- **QR을 통한 셀프 서비스** — 교회 설정 `enableQRGuestRegistration`이 켜져 있으면(B1Admin 체크인 설정에서 구성하며, `GET /membership/settings/public/{churchId}`에서 읽음), 키오스크 조회 화면에 `https://{subdomain}.b1.church/guest-register?serviceId=`로 연결되는 QR 코드가 표시됩니다. 이 B1App 페이지(`src/app/[sdSlug]/(public)/guest-register/page.tsx`)를 통해 방문 가족은 익명 `POST /membership/people/guest-register` 엔드포인트로 자신의 휴대폰에서 직접 등록할 수 있어, 키오스크 줄이 계속 움직입니다. QR 시트에는 **여기서 등록** 버튼도 있으며, 이 버튼은 같은 페이지를 키오스크(`app/guestRegister.tsx`)에서 시크릿 모드, 캐시 비활성화 `WebView`로 엽니다. `src/helpers/GuestRegisterHelper.ts`는 QR과 WebView 모두의 URL을 만들고, `https://{subdomain}.b1.church/guest-register` 외부로의 이동을 차단합니다. 화면은 **완료**, 뒤로 가기, 또는 120초 동안 비활동 상태일 때 조회 화면으로 돌아갑니다(양식 입력은 WebView에서 활동으로 전달됨). WebView를 언마운트하므로 한 가족이 입력한 내용이 다음 가족에게 전달되지 않습니다.

## 관련 페이지

- [출석 엔드포인트](../api/endpoints/attendance) -- 캠퍼스, 서비스, 세션, 방문, 방문 세션을 위한 전체 REST 인터페이스
- [교인 엔드포인트](../api/endpoints/membership) -- 사람, 가정, 그룹
- [웹훅](../api/webhooks) -- `session.created`, `attendance.recorded`, `attendance.checkout` 이벤트
- [모듈 구조](../api/module-structure) -- 서버 측에서 출석 모듈이 구성되는 방식
