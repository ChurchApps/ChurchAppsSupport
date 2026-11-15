---
title: "출석 설정"
description: "B1 Admin에서 캠퍼스, 예배, 예배 시간, 그룹 배정을 설정하면 교회 전체에서 출석 추적과 체크인 일정이 작동합니다."
---

# 출석 설정

<div class="article-intro">

출석을 추적하기 전에 교회의 실제 장소, 예배 시간, 각 예배에서 모이는 그룹을 B1 Admin에 알려 주어야 합니다. 이 일회성 설정이 교회 전체의 모든 출석 추적과 보고서를 뒷받침하는 구조를 만듭니다.

</div>

## 교육 영상 {#training-video}

<YouTube id="LQPc2gVlXvQ" title="B1에서 예배와 출석 설정하기" next="B1에서 어린이 체크인 설정하기" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Edit Services** 출석 권한이 있는 활성 B1 Admin 계정이 필요합니다. **Setup** 옵션은 이 권한이 있는 사람에게만 표시되며, 출석을 보는 권한만으로는 충분하지 않습니다. 접근 수준이 확실하지 않다면 [역할 및 권한](../people/roles-permissions.md)을 참조하세요.
- 그룹을 예배 시간에 배정할 계획이라면 먼저 [그룹을 만들어](../groups/creating-groups.md) 두세요.

</div>

## 핵심 개념 {#key-concepts}

- **Campus** -- 교회가 모이는 실제 장소입니다(예: "Main Campus", "North Campus"). 캠퍼스는 **Settings**에서 관리합니다.
- **Service** -- 캠퍼스에서 정기적으로 열리는 모임입니다(예: "Sunday Service", "Midweek").
- **Service Time** -- 예배가 열리는 특정 시각입니다(예: "9:00 AM", "11:00 AM").
- **Scheduled Group** -- 특정 예배 시간에 배정된 그룹입니다. 출석은 그 예배의 맥락에서 추적됩니다.
- **Unscheduled Group** -- 예배 시간과 연결되지 않고 자체적으로 출석을 추적하는 그룹입니다.

## 출석 구조 설정하기 {#setting-up-your-attendance-structure}

1. **B1 Admin**을 열고 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 연 뒤 **People**을 펼칩니다.
2. **Attendance**를 클릭한 다음 왼쪽 열에서 **Setup**을 클릭합니다. **Service structure** 표가 열리며, 상단에는 캠퍼스, 예배 시간, 일정이 있는 그룹과 없는 그룹, 전체 그룹의 수가 표시됩니다. 표에서 항목을 추가, 수정, 삭제하면 숫자가 바로 갱신됩니다. 각 캠퍼스 아래에는 예배, 예배 시간, 각 시간에 배정된 그룹이 분류별로 나타납니다(사역팀은 소속 사역의 이름 아래에 표시됩니다). 출석은 추적하지만 예배 시간이 없는 그룹은 맨 아래 **Unassigned** 아래에 나열됩니다.
3. **Service structure** 패널의 오른쪽 상단에 있는 **Manage Campuses**를 클릭합니다. **Settings → Campuses**로 이동합니다. **Add Campus**를 클릭하고 장소의 이름을 입력한 뒤(주소와 시간대는 선택 사항입니다) **Save**를 클릭합니다.
4. **People → Attendance**로 돌아가 **Setup**을 클릭합니다. 이제 설정 표에 캠퍼스가 나타납니다.
5. 캠퍼스 아래 **Service** 열의 **+ 버튼**을 클릭합니다. "Sunday Service" 같은 예배 이름을 입력하고 **Save**를 클릭합니다.
6. 예배 아래 **Time** 열의 **+ 버튼**을 클릭합니다. "9:00 AM" 같은 **Service Time** 이름을 입력하고, 선택 사항으로 [체크인 일정](#setting-a-check-in-schedule)을 입력한 뒤 **Save**를 클릭합니다. 예배 시간마다 반복합니다.
7. 그룹을 예배 시간에 연결하려면 **People > Groups**에서 그룹을 열고 **Edit**를 클릭한 뒤 **Add Service Time**을 사용합니다. 다음 절을 참조하세요.

### 그룹에서 Track Attendance 켜기 {#enabling-track-attendance-on-a-group}

그룹의 출석을 기록하려면 먼저 해당 그룹에서 Track Attendance를 켜야 합니다.

1. 점프 메뉴에서 **People > Groups**를 선택하고 그룹을 고릅니다.
2. 그룹 이름 아래의 **Edit** 버튼을 클릭합니다.
3. **Track Attendance**를 **Yes**로 설정합니다.
4. **Save**를 클릭합니다.

:::tip
앞 단계에서 그룹을 예배 시간에 배정했다면, 그룹의 수정 화면에 있는 **Add Service Time** 옵션을 사용해 올바른 예배에 연결하세요. 그래야 세션이 올바른 캠퍼스와 시간에 연결됩니다.
:::

:::tip
그룹이 정규 예배 밖에서 모인다면(예: 자체적으로 출석을 추적하는 평일 소그룹) 예정되지 않은 그룹으로 두면 됩니다. 이 그룹도 출석 보고서용 **Group Attendance** 보고서에는 계속 나타납니다.
:::

## 체크인 일정 설정하기 {#setting-a-check-in-schedule}

각 예배 시간에는 선택 사항인 체크인 일정을 지정할 수 있습니다. 그러면 [셀프 체크인](check-in.md)이 매주 자동으로 열리고 닫힙니다. 일정이 없으면 그 예배 시간의 체크인은 (방이 가득 차는 등 다른 이유로 닫히지 않는 한) 언제든지 가능합니다.

1. **Setup** 화면에서 **Time** 열의 예배 시간 이름을 클릭합니다(또는 새로 추가합니다).
2. **Check-in Schedule** 아래에서 예배 시간이 열리는 요일인 **Day**를 고릅니다.
3. **Start Time**과 선택 사항인 **End Time**을 설정합니다.
4. **Open check-in (minutes before start**)을 입력합니다. 예를 들어 `30`을 입력하면 예배 시작 30분 전에 체크인이 열립니다.
5. **Close check-in (minutes after end**)을 입력합니다. 예를 들어 `15`를 입력하면 종료 시각 후 15분 동안 체크인이 열려 있습니다. 종료 시간을 설정하지 않았다면 시작 시각을 기준으로 계산합니다. **End Time**과 **Close check-in**을 모두 비워 두면 체크인은 그날이 끝날 때까지 열려 있습니다.
6. **Save**를 클릭합니다.

일정은 매주 반복되며, 예배가 열리는 캠퍼스의 시간대를 기준으로 합니다. 그 캠퍼스에 시간대가 없으면 교회의 [시간대](../settings/church-settings.md#time-zone)를 사용하고, 그것도 없으면 시간대가 설정된 첫 번째 캠퍼스의 시간대를, 마지막으로 동부 시간(America/New_York)을 사용합니다. 체크인이 잘못된 시각에 열린다면 [캠퍼스](../settings/campuses.md)에서 해당 캠퍼스의 **Time Zone**을 확인하세요. 일정을 삭제하려면 **Day**를 **No schedule**로 되돌리고 **Save**를 클릭합니다. 일정은 **Day**와 **Start Time**이 모두 설정되어 있어야만 적용됩니다.

예배 시간의 체크인 시간대가 닫혀 있는 동안에는 다음과 같이 작동합니다.

- **B1.church의 셀프 체크인**은 그 예배 시간을 **Closed**(또는 예: **Closed · opens Sun 9:30 AM**)로 표시하며, 선택할 수 없습니다. 예배의 모든 시간이 닫혀 있다면 가족에게는 "Check-in opens Sun 9:30 AM."처럼 체크인이 언제 열리는지가 표시됩니다.
- **B1 Checkin 키오스크 앱**도 그 예배 시간을 열리는 시각과 함께 **Closed**로 표시합니다. 한 예배의 모든 시간이 닫혀 있으면 키오스크는 그 예배의 체크인이 언제 열리는지 알려 줍니다. 닫힌 예배 시간에 이미 체크인한 사람은 그룹이 **Checked in**으로 표시됩니다. 체크인 도중에 시간대가 닫히면 키오스크는 체크인을 완료하지 않고 **Can't check in yet** 화면을 보여 주며, 영향을 받는 방을 나열하여 가족이 다른 방을 고를 수 있게 합니다.

앞선 예배 시간에 이미 체크인한 세대는, 앞선 시간대가 닫힌 뒤에도 돌아와서 열려 있는 나중 예배 시간을 추가할 수 있습니다. 기존 체크인 기록은 그대로 유지됩니다.

:::tip
넉넉한 열림 시간(예: 시작 45분 전)을 설정하여 일찍 도착한 가족과 봉사자가 체크인할 수 있게 하고, 닫힘 시간은 짧게 설정하여 예배가 시작된 뒤에 늦게 온 사람도 체크인할 수 있게 하세요.
:::

## 설정 수정하기 {#editing-your-setup}

설정은 언제든지 바꿀 수 있습니다.

- **예배와 예배 시간** -- 표에서 예배나 예배 시간의 이름을 클릭하면 양식이 열립니다. 세부 정보를 바꾸고 **Save**를 클릭하거나, **Delete**를 클릭해 삭제합니다.
- **캠퍼스** -- **Manage Campuses**를 클릭하면 **Settings**에서 캠퍼스를 추가, 이름 변경, 삭제할 수 있습니다.
- **그룹** -- 그룹 이름을 클릭해 열고 **Edit**를 클릭하면 예배 시간을 바꾸거나 **Track Attendance**를 켜거나 끌 수 있습니다.

표 위쪽의 **Check-in kiosk, QR, and labels** 버튼을 클릭하면 [B1 CheckIn 설정](check-in.md)으로 이동합니다.

:::info
예배 시간을 삭제해도 과거의 출석 기록은 삭제되지 않습니다. 일정을 바꿔도 과거 데이터는 그대로 보존됩니다.
:::

## 다음 단계 {#whats-next}

캠퍼스, 예배 시간, 그룹이 준비되면 [출석을 수동으로 기록](recording-attendance.md)하거나 예배의 [셀프 체크인](check-in.md)을 설정할 준비가 된 것입니다.
