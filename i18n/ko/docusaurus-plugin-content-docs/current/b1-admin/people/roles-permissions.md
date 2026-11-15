---
title: "역할 지정하기"
description: "B1 Admin에서 역할을 지정하여 직원과 봉사자가 필요한 사람, 헌금, 출석, 그룹 영역에만 접근하도록 하세요."
---

# 역할 지정하기

<div class="article-intro">

B1 Admin은 역할 기반 권한 시스템을 사용하여 팀의 각 사용자가 볼 수 있는 것과 할 수 있는 것을 제어합니다. 역할을 지정하면 직원과 봉사자에게 필요한 영역에만 정확히 접근하게 하고, 그 이상은 허용하지 않을 수 있습니다. 역할을 적절히 관리하면 교회 데이터를 안전하게 보호하면서 팀이 효율적으로 일할 수 있도록 지원합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- B1 Admin에서 **Domain Admin** 접근 권한이 있거나, **Settings**를 관리할 권한이 있는 역할이 필요합니다.
- 역할을 지정할 사람은 디렉터리에 이미 있어야 합니다. 먼저 추가해야 한다면 [사람 추가하기](adding-people.md)를 참고하세요.

</div>

## 역할 이해하기 {#understanding-roles}

역할은 한 명 이상의 사용자에게 지정하는 권한의 집합입니다. 예를 들어 [헌금 기록](../donations/recording-donations.md)에 접근할 수 있는 "Finance Team" 역할을 만들거나, [출석 기능](../attendance/check-in.md)에만 접근할 수 있는 "Check-In Volunteer" 역할을 만들 수 있습니다.

각 역할은 다음을 포함하여 B1 Admin의 특정 영역에 대한 접근을 제어합니다:

- **사람** -- 성도 프로필 보기 및 편집. 사람 기록의 메모 섹션에는 **Edit People**이 필요하며, 별도의 **View Confidential Notes** 권한이 기밀 메모 섹션(목회 돌봄, 개인 이력 등 민감한 메모용)에 대한 접근을 제어합니다. **View People Names Only**를 사용하면 전체 디렉터리에 접근하지 않고도 누군가 이름으로 사람을 찾을 수 있습니다(이름, 사진, 교인 상태만 보임). **View Attendance** 또는 **Edit Attendance**와 함께 사용하면 봉사자가 **Groups**를 열고 이름으로 반 명단을 볼 수 있습니다. **Edit Attendance**가 있으면 [출석을 기록](../attendance/recording-attendance.md)할 수도 있습니다. [이름만 보기](../settings/roles-permissions.md#people-names-only)를 참고하세요.
- **헌금** -- 헌금과 재무 보고서 관리. **Enter Donations**는 집계 팀을 위한 더 좁은 옵션입니다. 이 권한이 있으면 헌금을 입력할 수 있지만, 아직 열려 있는 [배치](../donations/batches.md#who-can-change-a-batch)에만 입력할 수 있습니다.
- **출석** -- 출석 데이터 기록 및 보기
- **양식** -- [맞춤 양식](../forms/creating-forms.md) 만들기 및 관리
- **그룹** -- [그룹 구성원 자격](../groups/group-members.md)과 캘린더 관리
- **설정** -- 교회 전체 설정 구성

:::warning
**Domain Admin**은 B1 Admin의 모든 영역에 대한 전체 접근 권한을 갖습니다. 이들의 권한은 편집하거나 제한할 수 없습니다. 이 역할은 주요 관리자에게만 사용하세요.
:::

## 역할 보기 및 관리하기 {#viewing-and-managing-roles}

1. [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(B1 Admin 왼쪽 위의 검색창)를 열고 **Settings**를 펼치세요.
2. **Roles**를 클릭하세요.
3. 교회에 설정된 모든 역할의 목록이 표시되며, **Members** 열에는 각 역할에 속한 사용자 수가 나타납니다. **(Everyone)** 역할은 모든 사용자에게 적용됩니다.
4. 역할을 클릭하면 그 역할의 구성원과 권한을 볼 수 있습니다.

## 역할에 사용자 추가하기 {#adding-users-to-a-role}

1. 점프 메뉴에서 **Settings > Roles**를 선택하세요.
2. 사용자를 추가할 역할을 클릭하세요.
3. **Members** 섹션에서 **Add**를 클릭하세요.
4. 이름으로 사람을 검색하거나(또는 **Recent people**에서 고르세요), 그 사람의 이름이나 옆의 추가 아이콘을 클릭하세요. 즉시 역할에 추가됩니다.

사용자는 다음번 로그인 때부터 그 역할과 연결된 모든 권한을 갖게 됩니다.

## 역할 권한 편집하기 {#editing-role-permissions}

1. 점프 메뉴에서 **Settings > Roles**를 선택하세요.
2. 수정할 역할을 클릭하세요.
3. **Edit Permissions** 섹션에서 권한 그룹(예: **People and Groups**, **Donations**, **Attendance**)을 펼치고, 역할에 부여하려는 권한을 체크하거나 해제하세요. 각 그룹에는 체크된 권한 수가 표시됩니다(예: **2 of 5**). **Filter permissions**에 입력하면 이름으로 권한을 찾을 수 있습니다.
4. 상자를 체크하거나 해제할 때마다 변경 사항이 바로 저장됩니다.

:::tip
최소 권한 원칙을 따르세요. 각 역할에는 정말 필요한 권한만 주세요. 그래야 데이터가 안전하게 보호되고 실수로 변경할 가능성도 줄어듭니다.
:::

## 흔한 역할 예시 {#common-role-examples}

- **사무직원** -- People, Donations, Attendance, Forms 접근
- **그룹 리더** -- [그룹](../groups/creating-groups.md)에만 접근
- **체크인 봉사자** -- [체크인 키오스크](../attendance/check-in.md)에 로그인하는 계정에 필요한 **Checkin** 출석 권한
- **재무팀** -- [헌금](../donations/recording-donations.md)과 보고서 접근
- **집계팀** -- **Enter Donations**와 **View Donations**. 봉사자가 헌금 요약을 보지 않고도 열린 배치에 헌금을 입력할 수 있습니다.

헌금 및 사람 권한에 대해 자세히 보려면 [역할 및 권한](../settings/roles-permissions.md)을 참고하세요.
