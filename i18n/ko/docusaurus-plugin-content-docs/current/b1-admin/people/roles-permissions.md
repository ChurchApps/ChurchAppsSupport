---
title: "역할 할당"
---

# 역할 할당

<div class="article-intro">

B1 Admin은 역할 기반 권한 체계를 사용하여 팀의 각 사용자가 볼 수 있고 수행할 수 있는 작업을 제어합니다. 역할을 할당함으로써 직원과 자원봉사자에게 필요한 영역에만 정확하게 접근권을 부여할 수 있습니다. 올바른 역할 관리는 교회 데이터를 보호하면서 팀이 효율적으로 일할 수 있도록 합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- B1 Admin에서 **Domain Admin** 접근권이 있거나 **Settings**을 관리할 수 있는 역할이 필요합니다.
- 역할을 할당하려는 사람들은 이미 디렉토리에 존재해야 합니다. 먼저 추가해야 하면 [Adding People](adding-people.md)을 참고하세요.

</div>

## 역할 이해하기

역할은 하나 이상의 사용자에게 할당하는 권한 모음입니다. 예를 들어, [기부금 기록](../donations/recording-donations.md)에 접근을 허용하는 "재무팀" 역할을 만들거나, [출석 기능](../attendance/check-in.md)에만 접근을 허용하는 "체크인 자원봉사자" 역할을 만들 수 있습니다.

각 역할은 B1 Admin의 특정 영역에 대한 접근을 제어하며, 다음을 포함합니다:

- **People** -- 회원 프로필 보기 및 편집. 사람 기록의 Notes 탭은 **Edit People**이 필요하며, 별도의 **View Confidential Notes** 권한은 기밀 노트 섹션(목회 관리, 개인 기록 등의 민감한 노트)에 대한 접근을 제어합니다.
- **Donations** -- 기부금 및 재무 보고서 관리
- **Attendance** -- 출석 데이터 기록 및 보기
- **Forms** -- [사용자 지정 양식](../forms/creating-forms.md) 생성 및 관리
- **Groups** -- [그룹 멤버십](../groups/group-members.md) 및 캘린더 관리
- **Settings** -- 교회 전체 설정 구성

:::warning
**Domain Admins**은 B1 Admin의 모든 영역에 완전히 접근할 수 있습니다. 이들의 권한은 편집하거나 제한할 수 없습니다. 이 역할은 주요 관리자에게만 사용하세요.
:::

## 역할 보기 및 관리

1. B1 Admin의 왼쪽 상단에 있는 검색 모음인 [Jump 메뉴](../introduction.md#getting-around-with-the-jump-menu)를 열고 **Settings**을 확장하세요.
2. **Roles**을 클릭하세요.
3. 교회에 구성된 모든 역할의 목록이 표시됩니다.
4. 임의의 역할을 클릭하여 해당 역할의 멤버와 권한을 보세요.

## 역할에 사용자 추가

1. Jump 메뉴에서 **Settings > Roles**를 선택하세요.
2. 사용자를 추가하려는 역할을 클릭하세요.
3. **Members** 섹션에서 이름으로 사람을 검색하세요.
4. **Add**를 클릭하여 역할에 할당하세요.

사용자는 다음 로그인 시 해당 역할과 관련된 모든 권한을 갖게 됩니다.

## 역할 권한 편집

1. Jump 메뉴에서 **Settings > Roles**를 선택하세요.
2. 수정하려는 역할을 클릭하세요.
3. **Permissions** 섹션에서 역할이 접근할 수 있도록 하려는 영역을 선택하거나 해제하세요.
4. **Save**를 클릭하여 변경사항을 적용하세요.

:::tip
최소 권한 원칙을 따르세요 -- 각 역할에 실제로 필요한 권한만 부여하세요. 이것은 데이터를 안전하게 유지하고 실수로 변경될 가능성을 줄입니다.
:::

## 일반적인 역할 예시

- **Office Staff** -- People, Donations, Attendance, Forms에 접근
- **Group Leaders** -- [Groups](../groups/creating-groups.md)에만 접근
- **Check-In Volunteers** -- [Attendance](../attendance/check-in.md)에만 접근
- **Finance Team** -- [Donations](../donations/recording-donations.md) 및 보고에 접근
