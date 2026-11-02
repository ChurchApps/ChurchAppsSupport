---
title: "역할 지정하기"
---

# 역할 지정하기

<div class="article-intro">

B1 Admin은 역할 기반 권한 시스템을 사용해 팀의 각 사용자가 볼 수 있는 것과 할 수 있는 것을 관리합니다. 역할을 지정하면 직원과 봉사자에게 필요한 영역에만 접근을 허용하고, 그 밖에는 허용하지 않을 수 있습니다. 역할을 제대로 관리하면 교회의 데이터를 안전하게 지키면서 팀이 효율적으로 일할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Domain Admin** 접근 권한이 있거나, B1 Admin에서 **Settings**를 관리할 권한이 있는 역할이 필요합니다.
- 역할을 지정할 사람이 이미 명부에 있어야 합니다. 먼저 추가해야 한다면 [교인 추가하기](adding-people.md)를 참고하세요.

</div>

## 역할 이해하기

역할은 한 명 이상의 사용자에게 지정하는 권한의 묶음입니다. 예를 들어 [헌금 기록](../donations/recording-donations.md)에 접근할 수 있는 "Finance Team" 역할이나, [출석 기능](../attendance/check-in.md)에만 접근할 수 있는 "Check-In Volunteer" 역할을 만들 수 있습니다.

각 역할은 B1 Admin의 다음과 같은 특정 영역에 대한 접근을 제어합니다.

- **People** -- 교인 프로필 보기와 편집. 교인 기록의 Notes 섹션에는 **Edit People**이 필요하며, 별도의 **View Confidential Notes** 권한이 Confidential Notes 섹션(목회적 돌봄, 개인 이력 등 민감한 메모) 접근을 제어합니다. **View People Names Only**는 전체 명부에 접근하지 않고도 이름으로 사람을 찾을 수 있게 합니다(이름, 사진, 교인 상태만 보임). **View Attendance** 또는 **Edit Attendance**와 함께 쓰면 봉사자가 **Groups**를 열어 반 명단을 이름으로 볼 수 있으며, **Edit Attendance**가 있으면 [출석을 기록](../attendance/recording-attendance.md)할 수도 있습니다. [교인 이름만 보기](../settings/roles-permissions.md#people-names-only)를 참고하세요.
- **Donations** -- 헌금과 재무 보고서 관리. **Enter Donations**는 집계 팀을 위한 더 좁은 옵션입니다. 헌금을 입력할 수 있지만, 아직 열려 있는 [묶음](../donations/batches.md#who-can-change-a-batch)에서만 가능합니다.
- **Attendance** -- 출석 데이터 기록 및 보기
- **Forms** -- [맞춤 양식](../forms/creating-forms.md) 만들기 및 관리
- **Groups** -- [그룹 구성원](../groups/group-members.md)과 캘린더 관리
- **Settings** -- 교회 전체 설정 구성

:::warning
**Domain Admin**은 B1 Admin의 모든 영역에 대한 전체 접근 권한을 가집니다. 이들의 권한은 편집하거나 제한할 수 없습니다. 이 역할은 주요 관리자에게만 사용하세요.
:::

## 역할 보기와 관리하기

1. [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(B1 Admin 왼쪽 위의 검색창)를 열고 **Settings**를 펼치세요.
2. **Roles**를 클릭하세요.
3. 교회에 설정된 모든 역할의 목록이 나타나며, **Members** 열에는 각 역할에 속한 사용자 수가 표시됩니다.
4. 역할을 클릭하면 그 역할의 구성원과 권한을 볼 수 있습니다.

## 역할에 사용자 추가하기

1. 점프 메뉴에서 **Settings > Roles**를 선택하세요.
2. 사용자를 추가할 역할을 클릭하세요.
3. **Members** 섹션에서 이름으로 사람을 검색하세요.
4. **Add**를 클릭해 그 사람을 역할에 배정하세요.

이제 그 사용자는 다음 로그인부터 그 역할과 관련된 모든 권한을 갖게 됩니다.

## 역할 권한 편집하기

1. 점프 메뉴에서 **Settings > Roles**를 선택하세요.
2. 수정할 역할을 클릭하세요.
3. **Permissions** 섹션에서 역할이 접근할 영역을 체크하거나 해제하세요. 각 권한 그룹에는 그중 몇 개가 체크되어 있는지 표시됩니다(예: **2 of 5**).
4. 상자를 체크하거나 해제하는 즉시 각 변경 사항이 저장됩니다.

:::tip
최소 권한 원칙을 따르세요. 각 역할에는 정말 필요한 권한만 주세요. 그래야 데이터가 안전하고, 실수로 바꾸는 일도 줄어듭니다.
:::

## 흔한 역할 예시

- **사무 직원** -- 교인, 헌금, 출석, 양식 접근
- **그룹 리더** -- [그룹](../groups/creating-groups.md)에만 접근
- **체크인 봉사자** -- [체크인 키오스크](../attendance/check-in.md)에 로그인하는 계정에 필요한 **Checkin** 출석 권한
- **재무 팀** -- [헌금](../donations/recording-donations.md)과 보고서 접근
- **집계 팀** -- **Enter Donations**와 **View Donations**. 봉사자가 헌금 요약을 보지 않고도 열린 묶음에 헌금을 입력할 수 있습니다.

헌금과 교인 권한에 대해 더 자세히 알아보려면 [역할 및 권한](../settings/roles-permissions.md)을 참고하세요.
