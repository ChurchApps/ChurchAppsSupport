---
title: "역할 지정"
---

# 역할 지정

<div class="article-intro">

B1 Admin은 역할 기반 권한 시스템을 사용하여 팀의 각 사용자가 볼 수 있는 내용과 할 수 있는 작업을 관리합니다. 역할을 지정하면 직원과 자원봉사자에게 필요한 영역에만 접근 권한을 줄 수 있으며, 그 이상은 주지 않습니다. 역할을 적절히 관리하면 교회 데이터를 안전하게 보호하고 팀이 효율적으로 일할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Domain Admin** 권한이 있거나, B1 Admin에서 **Settings**를 관리할 수 있는 역할이 있어야 합니다.
- 역할을 지정할 사람들이 디렉터리에 이미 있어야 합니다. 아직 추가하지 않았다면 먼저 [사람 추가](adding-people.md)를 참고하세요.

</div>

## 역할 이해하기

역할은 한 명 이상의 사용자에게 부여하는 권한 집합입니다. 예를 들어 [헌금 기록](../donations/recording-donations.md)에 접근할 수 있는 "Finance Team" 역할이나, [출석 기능](../attendance/check-in.md)에만 접근할 수 있는 "Check-In Volunteer" 역할을 만들 수 있습니다.

각 역할은 B1 Admin의 특정 영역에 대한 접근을 제어하며, 그 영역은 다음과 같습니다.

- **People** -- 교인 프로필 보기 및 편집. 사람 기록의 Notes 섹션은 **Edit People** 권한이 필요하며, 별도의 **View Confidential Notes** 권한은 Confidential Notes 섹션(목회적 돌봄, 개인 이력 등 민감한 메모)에 대한 접근을 제어합니다. **View People Names Only**를 사용하면 전체 디렉터리 없이 이름, 사진, 교인 상태만 보면서 사람을 이름으로 검색할 수 있습니다. **View Attendance** 또는 **Edit Attendance**와 함께 사용하면 자원봉사자가 **Groups**를 열고 이름으로 반 명단을 볼 수 있으며, **Edit Attendance**가 있으면 [출석을 기록](../attendance/recording-attendance.md)할 수도 있습니다. [이름만 보기 권한](../settings/roles-permissions.md#people-names-only)을 참고하세요.
- **Donations** -- 헌금 및 재정 보고서 관리. **Enter Donations**는 집계 팀을 위한 더 제한적인 옵션입니다. 헌금을 입력할 수는 있지만, 아직 열려 있는 [배치](../donations/batches.md#who-can-change-a-batch)에만 입력할 수 있습니다.
- **Attendance** -- 출석 데이터 기록 및 조회
- **Forms** -- [사용자 지정 양식](../forms/creating-forms.md) 만들기 및 관리
- **Groups** -- [그룹 구성원](../groups/group-members.md) 및 캘린더 관리
- **Settings** -- 교회 전체 설정 구성

:::warning
**Domain Admin**은 B1 Admin의 모든 영역에 대한 전체 접근 권한을 가집니다. 이 권한은 편집하거나 제한할 수 없습니다. 주요 관리자에게만 이 역할을 사용하세요.
:::

## 역할 보기 및 관리하기

1. [Jump 메뉴](../introduction.md#getting-around-with-the-jump-menu)(B1 Admin 왼쪽 상단의 검색창)를 열고 **Settings**를 펼칩니다.
2. **Roles**를 클릭합니다.
3. 교회에 설정된 모든 역할 목록이 나타나며, **Members** 열에는 각 역할에 속한 사용자 수가 표시됩니다.
4. 역할을 클릭하면 구성원과 권한을 볼 수 있습니다.

## 역할에 사용자 추가하기

1. Jump 메뉴에서 **Settings > Roles**를 선택합니다.
2. 사용자를 추가할 역할을 클릭합니다.
3. **Members** 섹션에서 이름으로 사람을 검색합니다.
4. **Add**를 클릭하여 해당 사람을 역할에 지정합니다.

사용자는 다음번 로그인부터 해당 역할과 관련된 모든 권한을 가지게 됩니다.

## 역할 권한 편집하기

1. Jump 메뉴에서 **Settings > Roles**를 선택합니다.
2. 수정할 역할을 클릭합니다.
3. **Permissions** 섹션에서 역할이 접근할 영역을 체크하거나 체크 해제합니다. 각 권한 그룹에는 체크된 권한의 개수가 표시됩니다(예: **2 of 5**).
4. 상자를 체크하거나 해제할 때마다 변경 사항이 즉시 저장됩니다.

:::tip
최소 권한 원칙을 따르세요. 각 역할에는 실제로 필요한 권한만 부여하세요. 그래야 데이터가 안전하게 유지되고 실수로 변경될 가능성도 줄어듭니다.
:::

## 일반적인 역할 예시

- **Office Staff** -- People, Donations, Attendance, Forms 접근
- **Group Leaders** -- [Groups](../groups/creating-groups.md)만 접근
- **Check-In Volunteers** -- [Attendance](../attendance/check-in.md)만 접근
- **Finance Team** -- [Donations](../donations/recording-donations.md) 및 보고서 접근
- **Counting Team** -- **Enter Donations**와 **View Donations**를 부여하여, 자원봉사자가 헌금 집계 결과를 보지 않고도 열린 배치에 헌금을 입력할 수 있도록 합니다

사람과 헌금 관련 권한을 더 자세히 보려면 [역할 및 권한](../settings/roles-permissions.md)을 참고하세요.
