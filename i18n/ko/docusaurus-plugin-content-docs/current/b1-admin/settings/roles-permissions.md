---
title: "역할과 권한"
---

# 역할과 권한

<div class="article-intro">

역할을 사용하면 ChurchApps 계정 안에서 사용자마다 접근할 수 있는 범위를 제어할 수 있습니다. 직원, 봉사자, 기타 팀원을 위해 맞춤 역할을 만들고, 각 역할에 자신만의 접근 수준을 부여하여 데이터를 안전하게 지킬 수 있습니다.

</div>

## 교육 영상

<YouTube id="ZzCIkinVMnE" title="B1에서 역할, 권한, 팀 초대하기" next="B1에서 예배 및 출석 설정하기" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- Domain Admin 접근 권한이나 역할을 관리할 권한이 있는 역할이 필요합니다.
- 팀원 목록과 각자 접근이 필요한 영역을 준비하세요.
- 아래의 권한 범주를 검토하여 역할을 계획하세요.

</div>

## 역할 접근하기

1. B1 Admin에서 [Jump 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Settings**를 펼칩니다.
2. **Roles**를 클릭합니다.
3. Roles 페이지에는 교회에 현재 정의된 모든 역할이 표시됩니다. **Members** 열은 각 역할에 속한 사용자 수를 보여 주며, **(Everyone)** 행에는 **All users**가 표시됩니다.

## Roles 페이지 이해하기

Roles 페이지는 두 개의 패널로 나뉩니다.

- **왼쪽** -- 선택한 역할에 배정된 구성원 목록을 보여 줍니다.
- **오른쪽** -- 그 역할에 대해 설정할 수 있는 권한 설정을 보여 줍니다.

역할 이름을 클릭하면 구성원과 권한을 보고 관리할 수 있습니다.

## 역할에 사용자 추가하기

1. 구성원을 추가할 역할을 선택합니다.
2. 왼쪽의 **search field**(검색창)를 사용하여 추가할 사람을 찾습니다.
3. 검색 결과에서 그 사람을 선택합니다.
4. 그 사람은 즉시 역할에 추가됩니다.

## 역할에서 사용자 제거하기

1. 제거할 사용자가 속한 역할을 선택합니다.
2. 왼쪽의 구성원 목록에서 그 사람을 찾습니다.
3. 이름 옆의 **remove button**(제거 버튼)을 클릭합니다.

## 권한 구성하기

각 역할에는 B1 Admin의 특정 영역에 대한 접근 권한을 줄 수 있습니다. **Edit Permissions** 패널에서 권한은 펼칠 수 있는 섹션으로 묶여 있습니다. 예를 들어 **Attendance**, **Content**, **Donations**, **Forms and Plans**, **Lessons**, **Messaging**, **People and Groups**, **Tasks**가 있습니다. **Filter permissions** 상자에 입력하면 일치하는 권한만 표시됩니다.

권한의 체크박스를 체크하거나 해제하면 역할에 권한을 부여하거나 제거합니다. 각 섹션 머리글에는 역할이 가진 권한 수가 **2 of 5**처럼 표시되며, 체크박스를 누를 때마다 숫자가 갱신됩니다.

### 헌금 권한

**Donations** 섹션에는 다음 권한이 있습니다.

- **View Donation Summaries** -- Summary, Batches, Funds, Campaigns, Giving Statements 페이지를 포함한 Donations 섹션을 봅니다.
- **View Donations** -- 배치 안의 헌금처럼 개별 헌금을 봅니다.
- **Edit Donations** -- 전체 제어 권한입니다. 헌금과 배치를 추가, 편집, 삭제하고, [배치를 마감하고 다시 열 수](../donations/batches.md#closing-and-reopening-a-batch) 있습니다.
- **Enter Donations** -- 배치를 추가하고 헌금을 입력, 편집, 삭제할 수 있지만, 아직 열려 있는 배치에서만 가능합니다. 이 권한만 가진 사람은 배치를 삭제하거나, 마감하거나 다시 열 수 없으며, 온라인 헌금으로 들어온 기록을 변경할 수도 없습니다.
- **Edit Settings** -- 헌금 설정을 관리합니다.

**Enter Donations**는 있지만 **View Donation Summaries**는 없는 사람에게는 **Donations** 아래의 **Batches** 페이지만 보입니다. 헌금을 세는 팀 역할에는 **Enter Donations**와 **View Donations**를 모두 부여하여, 배치를 열고 자신이 입력한 헌금을 볼 수 있게 하세요. 자세한 내용은 [배치를 변경할 수 있는 사람](../donations/batches.md#who-can-change-a-batch)을 참고하세요.

### 사람 이름만 보기

**People and Groups** 섹션에는 **View People Names Only**가 있습니다. 전체 디렉터리에 접근하지 않고도 사람을 이름으로 찾아봐야 하는 봉사자에게 사용하세요. 예를 들어 검색 상자에서 사람을 고르는 경우입니다. 이 권한만 있으면 사람은 다음과 같이 할 수 있습니다.

- 이름으로 사람을 검색하고 최근에 추가된 사람의 목록을 볼 수 있지만, 각 사람의 이름, 사진, 교인 상태만 볼 수 있습니다.
- 이메일로 검색하거나, 연락처 세부 정보를 보거나, **People** 디렉터리를 열 수 없습니다.

수업 출석을 받는 봉사자에게는 **View People Names Only**를 **View Attendance** 또는 **Edit Attendance**와 함께 부여하세요. 그러면 메뉴의 **People**이 **Groups**를 열며, 여기에서 **All groups** 목록을 열어 각 수업의 구성원 이름과 세션을 볼 수 있습니다. **Edit Attendance**가 있으면 [출석을 기록](../attendance/recording-attendance.md)하고 이름으로 검색하여 방문자를 추가할 수도 있습니다. 이름은 사람 기록으로 연결되는 링크가 아니며, 봉사자가 구성원이 아닌 이상 비공개 그룹은 계속 숨겨집니다.

B1 Admin은 역할에 없는 권한이 필요한 링크와 버튼을 숨깁니다. 예를 들어 **All groups** 목록은 그룹을 편집하거나, 그룹 구성원을 보거나, 사람을 볼 수 있는 사람에게만 제공되며, **View People Names Only**와 **View Attendance** 또는 **Edit Attendance**를 함께 가진 사람에게도 제공됩니다(그 외에는 대시보드로 돌아갑니다). 출석 설정은 **View Attendance** 또는 **Edit Services**가 있을 때만 나타나며, 그룹의 **Email** 버튼은 **Edit Group Members**(그룹 이메일을 보내는 데 필요한 권한)가 있는 사람에게만 나타납니다. 그룹 명단을 인쇄하려면 **View Group Members**가 필요하거나 그 그룹의 리더여야 하며, 캘린더 행사를 삭제하려면 **Edit Content**가 필요합니다(또는 본인의 대기 중인 요청을 철회할 수 있습니다).

:::warning
**Domain Admin**은 ChurchApps 계정의 모든 영역에 대한 전체 접근 권한을 가집니다. 이들의 권한은 수정하거나 제한할 수 없습니다. 이 역할은 가장 신뢰하는 관리자에게만 부여하세요.
:::

:::tip
**Donations** 접근만 가진 "Treasurer"(재무 담당자), **Enter Donations**와 **View Donations**를 가진 "Counting Team"(헌금 집계 팀), 또는 **Attendance** 접근만 가진 "Check-In Volunteer"(체크인 봉사자) 같은 구체적인 역할을 만드세요. 이는 최소 권한 원칙을 따르며 데이터를 안전하게 지킵니다. ChurchApps가 정보를 보호하는 방식은 [데이터 보안](./data-security.md)을 참고하세요.
:::
