---
title: "역할 및 권한"
description: "B1 Admin에서 역할을 설정하여 직원과 자원봉사자가 헌금, 출석부터 교인과 그룹까지 무엇을 보고 변경할 수 있는지 제어하세요."
---

# 역할 및 권한

<div class="article-intro">

역할을 쓰면 ChurchApps 계정 안에서 사용자마다 접근할 수 있는 범위를 조절할 수 있습니다. 직원, 봉사자, 그 밖의 팀원을 위해 맞춤 역할을 만들고, 각 역할마다 접근 수준을 달리 설정해 데이터를 안전하게 지킬 수 있습니다.

</div>

## 교육 동영상

<YouTube id="ZzCIkinVMnE" title="B1에서 역할, 권한, 팀 초대하기" next="B1에서 예배 및 출석 설정하기" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- Domain Admin 접근 권한이 있거나, 역할을 관리할 권한이 있는 역할이 필요합니다.
- 팀원 명단과 각자에게 필요한 접근 영역을 준비하세요.
- 역할을 계획하려면 아래의 사용 가능한 권한 범주를 살펴보세요.

</div>

## 역할에 접근하기

1. B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 위의 검색창)를 열고 **Settings**를 펼치세요.
2. **Roles**를 클릭하세요.
3. Roles 페이지에는 교회에 현재 정의된 모든 역할이 나타납니다. **Members** 열에는 각 역할의 사용자 수가 표시되며, **(Everyone)** 행에는 **All users**(모든 사용자)가 표시됩니다.

## Roles 페이지 이해하기

Roles 페이지는 두 개의 패널로 나뉩니다.

- **왼쪽** -- 선택한 역할에 배정된 구성원 목록을 보여 줍니다.
- **오른쪽** -- 그 역할에 대해 설정할 수 있는 권한 설정을 보여 줍니다.

역할 이름을 클릭하면 그 역할의 구성원과 권한을 보고 관리할 수 있습니다.

## 역할에 사용자 추가하기

1. 구성원을 추가할 역할을 고르세요.
2. 왼쪽의 **검색 필드**를 사용해 추가할 사람을 찾으세요.
3. 검색 결과에서 그 사람을 고르세요.
4. 그 사람은 즉시 역할에 추가됩니다.

## 역할에서 사용자 제거하기

1. 제거할 사용자가 속한 역할을 고르세요.
2. 왼쪽 구성원 목록에서 그 사람을 찾으세요.
3. 이름 옆의 **remove button**(제거 버튼)을 클릭하세요.

## 권한 설정하기

각 역할에는 B1 Admin의 특정 영역에 대한 접근 권한을 줄 수 있습니다. **Edit Permissions** 패널에서 권한은 **Attendance**(출석), **Content**(콘텐츠), **Donations**(헌금), **Forms and Plans**(양식과 계획), **Lessons**(공과), **Messaging**(메시지), **People and Groups**(교인과 그룹), **Tasks**(할 일) 등 펼칠 수 있는 섹션으로 묶여 있습니다. **Filter permissions** 상자에 입력하면 일치하는 권한만 보입니다.

권한을 체크하거나 해제하면 역할에 그 권한을 주거나 뺄 수 있습니다. 각 섹션 제목에는 역할이 그 섹션의 권한을 몇 개 가지고 있는지(예: **2 of 5**)가 표시되며, 상자를 체크하거나 해제하면 개수가 바로 갱신됩니다.

### 헌금 권한

**Donations** 섹션에는 다음 권한이 있습니다.

- **View Donation Summaries**(헌금 요약 보기) -- Summary, Batches, Funds, Campaigns, Giving Statements 페이지를 포함한 Donations 섹션을 볼 수 있습니다.
- **View Donations**(헌금 보기) -- 묶음 안의 헌금처럼 개별 헌금을 볼 수 있습니다.
- **Edit Donations**(헌금 편집) -- 전체 제어 권한입니다. 헌금과 묶음을 추가, 편집, 삭제할 수 있으며, [묶음을 닫고 다시 열 수](../donations/batches.md#closing-and-reopening-a-batch) 있습니다.
- **Enter Donations**(헌금 입력) -- 묶음을 추가하고 헌금을 입력, 편집, 삭제할 수 있지만, 아직 열려 있는 묶음에서만 가능합니다. 이 권한만 있는 사람은 묶음을 삭제하거나, 닫거나 다시 열거나, 온라인 헌금으로 들어온 헌금을 바꿀 수 없습니다.
- **Edit Settings**(설정 편집) -- 헌금 설정을 관리합니다.

**Enter Donations**는 있지만 **View Donation Summaries**는 없는 사람에게는 **Donations** 아래에 **Batches** 페이지만 보입니다. 집계 팀 역할에는 **Enter Donations**와 **View Donations**를 함께 주면, 묶음을 열고 자신이 입력한 헌금을 볼 수 있습니다. 자세한 내용은 [묶음을 바꿀 수 있는 사람](../donations/batches.md#who-can-change-a-batch)을 참고하세요.

### 교인 이름만 보기 {#people-names-only}

**People and Groups** 섹션에는 **View People Names Only**(교인 이름만 보기)가 있습니다. 전체 명부에 접근하지 않고 이름으로만 사람을 찾아야 하는 봉사자에게 사용하세요. 예를 들어 검색 상자에서 누군가를 고르는 경우입니다. 이 권한만 있는 사람은 다음과 같습니다.

- 이름으로 사람을 검색하고 최근 추가된 사람 목록을 볼 수 있지만, 각 사람의 이름, 사진, 교인 상태만 볼 수 있습니다.
- 이메일로 검색하거나, 연락처 세부 정보를 보거나, **People** 명부를 열 수 없습니다.

반 출석을 받는 봉사자에게는 **View People Names Only**를 **View Attendance** 또는 **Edit Attendance**와 함께 주세요. 그러면 메뉴의 **People**이 **Groups**로 열리고, 거기에서 **All groups** 목록을 열어 각 반의 구성원 이름과 세션을 볼 수 있습니다. **Edit Attendance**가 있으면 [출석을 기록](../attendance/recording-attendance.md)하고 이름을 검색해 방문자를 추가할 수도 있습니다. 이름은 교인 기록으로 연결되는 링크가 아니며, 비밀 그룹은 봉사자가 구성원이 아니라면 계속 숨겨집니다.

B1 Admin은 역할에 없는 권한이 필요한 링크와 버튼을 숨깁니다. 예를 들어 **All groups** 목록은 그룹을 편집하거나, 그룹 구성원을 보거나, 교인을 볼 수 있는 사람, 또는 **View People Names Only**와 **View Attendance** 또는 **Edit Attendance**를 함께 가진 사람에게만 제공됩니다(그 밖의 사람은 대시보드로 돌아갑니다). 출석 설정은 **Edit Services**가 있을 때에만 나타납니다. 그룹의 **Email** 버튼은 **Edit Group Members**(그룹 이메일 발송에 필요한 권한)가 있는 사람에게만 나타납니다. 그룹 명단을 인쇄하려면 **View Group Members**가 필요하거나 그 그룹을 이끌고 있어야 합니다. 캘린더 행사를 삭제하려면 **Edit Content**가 필요합니다(또는 자신이 제출한 대기 중인 요청을 철회해야 합니다).

### 체크인 키오스크 계정 {#check-in-kiosk-accounts}

[B1 Checkin](../../b1-checkin/getting-started/logging-in.md) 키오스크에 로그인하는 계정에는 **Attendance** 섹션의 **Checkin** 권한(또는 **Edit Attendance**)이 필요합니다. **Checkin**만 있으면 키오스크는 이름이나 전화번호로 가족을 찾고, 체크인과 체크아웃을 하고, 자녀를 누가 픽업할 수 있는지 보여 줄 수 있습니다. 교인 명부에는 접근할 수 없습니다.

Checkin은 더 이상 **(Everyone)** 행을 통해 부여되지 않습니다. 다른 권한이 있는 역할에 속해 있다고 해서 키오스크를 운영할 수 있는 것은 아닙니다. "Check-In Volunteers" 같은 역할에 **Checkin**을 추가하고, 키오스크 계정을 그 역할에 넣으세요.

:::warning
**Domain Admin**은 ChurchApps 계정의 모든 영역에 대한 전체 접근 권한을 가집니다. 이들의 권한은 수정하거나 제한할 수 없습니다. 가장 신뢰하는 관리자에게만 이 역할을 주세요.
:::

:::tip
**Donations** 접근만 있는 "Treasurer"(재무 담당자), **Enter Donations**와 **View Donations**가 있는 "Counting Team"(집계 팀), **Attendance** 접근만 있는 "Check-In Volunteer"(체크인 봉사자)처럼 구체적인 역할을 만드세요. 이는 최소 권한 원칙을 따르며 데이터를 안전하게 유지합니다. ChurchApps가 정보를 어떻게 보호하는지는 [데이터 보안](./data-security.md)을 참고하세요.
:::
