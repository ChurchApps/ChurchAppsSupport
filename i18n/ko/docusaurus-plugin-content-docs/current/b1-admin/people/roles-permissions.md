---
title: "역할 할당하기"
---

# 역할 할당하기

<div class="article-intro">

B1 Admin은 역할 기반 권한 시스템을 사용하여 팀의 각 사용자가 볼 수 있는 항목과 할 수 있는 작업을 제어합니다. 역할을 할당하면 직원과 봉사자에게 필요한 영역에만 접근 권한을 줄 수 있으며, 그 이상은 주지 않습니다. 역할을 잘 관리하면 교회 데이터를 안전하게 보호하고 팀이 효율적으로 일할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- B1 Admin에서 **Domain Admin** 권한이 있거나, **Settings**를 관리할 권한이 있는 역할이 있어야 합니다.
- 역할을 할당할 사람이 디렉터리에 이미 있어야 합니다. 아직 없다면 먼저 [사람 추가하기](adding-people.md)를 참조하세요.

</div>

## 역할 이해하기

역할은 한 명 이상의 사용자에게 할당하는 권한의 집합입니다. 예를 들어 [헌금 기록](../donations/recording-donations.md)에 접근할 수 있는 "Finance Team" 역할이나, [출석 기능](../attendance/check-in.md)에만 접근할 수 있는 "Check-In Volunteer" 역할을 만들 수 있습니다.

각 역할은 다음을 포함하여 B1 Admin의 특정 영역에 대한 접근을 제어합니다.

- **People** -- 구성원 프로필 보기 및 편집. 사람 기록의 메모 섹션은 **Edit People**(사람 편집) 권한이 필요하며, 별도의 **View Confidential Notes**(기밀 메모 보기) 권한이 기밀 메모 섹션(목회적 돌봄, 개인 이력 등 민감한 메모)에 대한 접근을 제어합니다. **View People Names Only**(이름만 보기)를 선택하면 전체 디렉터리에 접근하지 않고 이름, 사진, 회원 상태만 보면서 사람을 이름으로 찾아볼 수 있습니다.
- **Donations** -- 헌금 및 재정 보고서 관리. **Enter Donations**(헌금 입력)는 집계 팀을 위한 더 좁은 옵션입니다. 열려 있는 [묶음](../donations/batches.md#who-can-change-a-batch)에 한해서만 헌금을 입력할 수 있습니다.
- **Attendance** -- 출석 데이터 기록 및 보기
- **Forms** -- [사용자 지정 양식](../forms/creating-forms.md) 만들기 및 관리
- **Groups** -- [그룹 구성원](../groups/group-members.md) 및 캘린더 관리
- **Settings** -- 교회 전체 설정 구성

:::warning
**Domain Admins**(도메인 관리자)는 B1 Admin의 모든 영역에 대한 전체 접근 권한을 가집니다. 이 역할의 권한은 편집하거나 제한할 수 없습니다. 기본 관리자에게만 이 역할을 사용하세요.
:::

## 역할 보기 및 관리하기

1. Jump 메뉴(B1 Admin 왼쪽 상단의 검색창)를 열고 **Settings**를 펼칩니다.
2. **Roles**를 클릭합니다.
3. 교회에 설정된 모든 역할의 목록이 표시됩니다.
4. 역할을 클릭하면 구성원과 권한을 볼 수 있습니다.

## 역할에 사용자 추가하기

1. Jump 메뉴에서 **Settings > Roles**를 선택합니다.
2. 사용자를 추가할 역할을 클릭합니다.
3. **Members** 섹션에서 이름으로 사람을 검색합니다.
4. **Add**를 클릭하여 그 사람을 역할에 할당합니다.

사용자는 다음번 로그인 때부터 그 역할과 연결된 모든 권한을 갖게 됩니다.

## 역할 권한 편집하기

1. Jump 메뉴에서 **Settings > Roles**를 선택합니다.
2. 수정할 역할을 클릭합니다.
3. **Permissions** 섹션에서 역할이 접근할 영역을 체크하거나 체크 해제합니다.
4. **Save**를 클릭하여 변경 사항을 적용합니다.

:::tip
최소 권한 원칙을 따르세요. 각 역할에는 실제로 필요한 권한만 주세요. 그래야 데이터가 안전하게 유지되고 실수로 인한 변경이 줄어듭니다.
:::

## 일반적인 역할 예시

- **Office Staff**(사무 직원) -- People, Donations, Attendance, Forms에 대한 접근
- **Group Leaders**(그룹 리더) -- [그룹](../groups/creating-groups.md)에만 접근
- **Check-In Volunteers**(체크인 봉사자) -- [출석](../attendance/check-in.md)에만 접근
- **Finance Team**(재정팀) -- [헌금](../donations/recording-donations.md)과 보고서에 접근
- **Counting Team**(집계팀) -- **Enter Donations**와 **View Donations**. 봉사자가 헌금 요약을 보지 않고도 열려 있는 묶음에 헌금을 입력할 수 있습니다

사람 및 헌금 권한에 대한 자세한 내용은 [역할 및 권한](../settings/roles-permissions.md)을 참조하세요.
