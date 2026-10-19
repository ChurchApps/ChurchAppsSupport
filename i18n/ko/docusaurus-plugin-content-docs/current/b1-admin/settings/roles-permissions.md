---
title: "역할 및 권한"
---

# 역할 및 권한

<div class="article-intro">

역할을 사용하면 ChurchApps 계정 안에서 사용자마다 접근할 수 있는 항목을 제어할 수 있습니다. 직원, 자원봉사자 및 기타 팀원을 위해 맞춤 역할을 만들고, 각자에게 적합한 수준의 접근 권한을 부여하여 데이터를 안전하게 보호할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- Domain Admin 권한이 있거나 역할을 관리할 권한이 있는 역할이 필요합니다
- 팀원 목록과 각자 접근이 필요한 영역을 준비하세요
- 아래의 사용 가능한 권한 범주를 검토하여 역할을 계획하세요

</div>

## 역할 접근하기

1. B1 Admin에서 [Jump 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Settings**를 펼칩니다.
2. **Roles**를 클릭합니다.
3. Roles 페이지에 교회에 정의된 모든 역할이 표시됩니다.

## Roles 페이지 이해하기

Roles 페이지는 두 개의 패널로 나뉩니다.

- **왼쪽** -- 선택한 역할에 배정된 구성원 목록을 보여 줍니다.
- **오른쪽** -- 해당 역할에 설정할 수 있는 권한 설정을 보여 줍니다.

역할 이름을 클릭하면 구성원과 권한을 보고 관리할 수 있습니다.

## 역할에 사용자 추가하기

1. 구성원을 추가할 역할을 선택합니다.
2. 왼쪽의 **검색 필드**를 사용하여 추가할 사람을 찾습니다.
3. 검색 결과에서 해당 사람을 선택합니다.
4. 즉시 역할에 추가됩니다.

## 역할에서 사용자 제거하기

1. 제거할 사용자가 속한 역할을 선택합니다.
2. 왼쪽의 구성원 목록에서 해당 사람을 찾습니다.
3. 이름 옆의 **제거 버튼**을 클릭합니다.

## 권한 설정하기

각 역할에는 B1 Admin의 특정 영역에 대한 접근 권한을 부여할 수 있습니다. **Edit Permissions** 패널에서 권한은 **Attendance**, **Content**, **Donations**, **Forms and Plans**, **Lessons**, **Messaging**, **People and Groups**, **Tasks** 같은 섹션으로 묶여 있으며, 각 섹션을 펼칠 수 있습니다. **Filter permissions** 상자에 입력하면 일치하는 권한만 표시됩니다.

권한을 체크하거나 체크를 해제하면 해당 역할에 권한을 부여하거나 제거합니다.

### 기부 권한

**Donations** 섹션에는 다음 권한이 있습니다.

- **View Donation Summaries** -- Summary, Batches, Funds, Campaigns, Giving Statements 페이지를 포함한 Donations 섹션을 볼 수 있습니다.
- **View Donations** -- 배치 안의 헌금 등 개별 기부 내역을 볼 수 있습니다.
- **Edit Donations** -- 전체 권한: 기부와 배치를 추가, 수정, 삭제하고 [배치를 마감하거나 다시 열 수](../donations/batches.md#closing-and-reopening-a-batch) 있습니다.
- **Enter Donations** -- 배치를 추가하고 기부를 입력, 수정, 삭제할 수 있지만, 아직 열려 있는 배치에서만 가능합니다. 이 권한만 가진 사람은 배치를 삭제하거나, 마감하거나 다시 열 수 없으며, 온라인 헌금으로 들어온 기부를 변경할 수도 없습니다.
- **Edit Settings** -- 기부 설정을 관리합니다.

**Enter Donations**는 있지만 **View Donation Summaries**가 없는 사람에게는 **Donations** 아래의 **Batches** 페이지만 보입니다. 헌금 집계팀 역할에는 **Enter Donations**와 **View Donations**를 모두 부여하여, 배치를 열고 자신이 입력한 헌금을 볼 수 있도록 하세요. 자세한 내용은 [배치를 변경할 수 있는 사람](../donations/batches.md#who-can-change-a-batch)을 참조하세요.

### 이름만 보기 권한

**People and Groups** 섹션에는 **View People Names Only**가 포함되어 있습니다. 전체 명부에 접근하지 않고도 사람을 이름으로 찾아야 하는 자원봉사자(예: 검색 상자에서 사람을 고를 때)에게 이 권한을 사용하세요. 이 권한만 있는 사람은 다음과 같습니다.

- 이름으로 사람을 검색하고 최근에 추가된 사람의 목록을 볼 수 있지만, 각 사람의 이름, 사진, 구성원 상태만 볼 수 있습니다.
- 이메일로 검색하거나, 연락처 정보를 보거나, **People** 명부를 열 수 없습니다.

B1 Admin은 역할에 없는 권한이 필요한 링크와 버튼을 숨깁니다. 예를 들어 **All groups** 목록은 그룹을 편집하거나, 그룹 구성원을 보거나, 사람을 볼 수 있는 사람에게만 제공됩니다(그 외에는 대시보드로 돌아갑니다). 출석 설정은 **View Attendance** 또는 **Edit Services**가 있을 때만 나타나며, 그룹의 **Email** 버튼은 **Edit Group Members** 권한(그룹 이메일을 보내는 데 필요한 권한)이 있는 사람에게만 나타납니다. 그룹 명단을 인쇄하려면 **View Group Members** 권한이 있거나 해당 그룹을 이끌고 있어야 하며, 캘린더 일정을 삭제하려면 **Edit Content** 권한(또는 본인이 요청한 대기 중인 일정을 철회하는 경우)이 필요합니다.

:::warning
**Domain Admin**은 ChurchApps 계정의 모든 영역에 대한 전체 권한을 가집니다. 이 권한은 수정하거나 제한할 수 없습니다. 가장 신뢰하는 관리자에게만 이 역할을 부여하세요.
:::

:::tip
**Donations** 접근 권한만 있는 "Treasurer"(출납 담당), **Enter Donations**와 **View Donations**가 있는 "Counting Team"(헌금 집계팀), 또는 **Attendance** 접근 권한만 있는 "Check-In Volunteer"(체크인 자원봉사자)와 같은 구체적인 역할을 만드세요. 이는 최소 권한 원칙을 따르며 데이터를 안전하게 유지합니다. ChurchApps가 정보를 어떻게 보호하는지 자세히 알아보려면 [데이터 보안](./data-security.md)을 참조하세요.
:::
