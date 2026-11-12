---
title: "역할 및 권한"
description: "B1 Admin에서 역할을 설정하여 직원과 자원봉사자가 헌금, 출석, 사람, 그룹 등에서 무엇을 보고 바꿀 수 있는지 제어하세요."
---

# 역할 및 권한

<div class="article-intro">

역할을 사용하면 ChurchApps 계정 안에서 사용자마다 접근할 수 있는 범위를 제어할 수 있습니다. 직원, 자원봉사자, 기타 팀원을 위한 사용자 지정 역할을 만들 수 있으며, 각 역할은 데이터를 안전하게 지키기 위한 고유한 접근 수준을 가집니다.

</div>

## 교육 동영상 {#training-video}

<YouTube id="ZzCIkinVMnE" title="B1에서 역할, 권한, 팀 초대하기" next="B1에서 services와 출석 설정하기" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- 도메인 관리자(Domain Admin) 접근 권한이나 역할을 관리할 권한이 필요합니다
- 팀원 목록과 각 팀원이 접근해야 하는 영역을 준비하세요
- 역할을 계획하기 위해 아래의 권한 분류를 검토하세요

</div>

## 역할 접근하기 {#accessing-roles}

1. B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Settings**(설정)를 펼치세요.
2. **Roles**(역할)를 클릭하세요.
3. 역할 페이지에는 교회에 정의된 모든 역할이 표시됩니다. **Members**(구성원) 열에는 각 역할에 속한 사용자 수가, **(Everyone)**(모든 사용자) 행에는 **All users**(모든 사용자)가 표시됩니다.

## 역할 만들기 {#creating-a-role}

역할 페이지 상단의 **Add role**(역할 추가)을 클릭하세요. 메뉴에는 다음 항목이 있습니다.

- **Add Custom Role**(사용자 지정 역할 추가) -- 목록 위에 **Edit Role**(역할 편집) 양식이 열립니다. **Role Name**(역할 이름)을 입력하고 **Save**를 클릭하세요. 새 역할은 권한이 하나도 없는 상태로 시작합니다.
- **Add "Accounting" Role**("회계" 역할 추가), **Add "Church Staff" Role**("교회 직원" 역할 추가), **Add "Content Admin" Role**("콘텐츠 관리자" 역할 추가), **Add "Lessons Admin" Role**("수업 관리자" 역할 추가) -- 적절한 권한이 이미 체크되어 있는 기성 역할입니다. B1이 확인을 요청한 후 역할을 만듭니다. 이후에는 다른 역할과 마찬가지로 권한을 바꿀 수 있습니다.

## 역할 이름 바꾸기 또는 삭제하기 {#renaming-or-deleting-a-role}

역할의 행 위에 마우스를 올리고 **Edit**(편집)를 클릭하세요. **Edit Role** 양식에서 **Role Name**을 바꾸고 **Save**를 클릭하거나, **Delete**(삭제)를 클릭한 다음 확인하여 역할을 제거하세요. **Domain Admins**(도메인 관리자) 역할은 삭제할 수 없습니다.

## 역할 페이지 이해하기 {#understanding-a-roles-page}

역할의 이름을 클릭하면 역할 페이지가 열립니다. 페이지에는 두 개의 패널이 있습니다.

- **Members**(구성원)(왼쪽) -- 역할에 속한 사람들이며, 이름과 이메일이 표시됩니다.
- **Edit Permissions**(권한 편집)(오른쪽) -- 역할에 부여할 수 있는 권한입니다.

**(Everyone)** 행은 교회의 모든 사용자에게 적용되는 권한의 페이지를 엽니다. 구성원 목록은 없습니다.

## 역할에 사용자 추가하기 {#adding-users-to-a-role}

1. 역할을 열고 **Members** 패널에서 **Add**(추가)를 클릭하세요. 그 역할의 **Add To**(추가 대상) 양식이 열립니다.
2. 검색 상자에 이름이나 이메일을 입력하고 검색 버튼을 클릭하세요.
3. 사람 옆의 추가 버튼을 클릭하세요. 그 사람은 즉시 역할에 추가되며, B1은 로그인할 수 있도록 초대 이메일을 보낼지 물어봅니다.
4. 그 사람이 아직 교회에 없다면, 검색 결과 아래의 **Create New User**(새 사용자 만들기)를 클릭하고 **First Name**(이름), **Last Name**(성), **Email**(이메일)을 입력한 다음 **Save**를 클릭하세요.

구성원의 이름이나 이메일을 바꾸려면, 그 구성원의 행에 있는 편집 아이콘을 클릭하세요.

## 역할에서 사용자 제거하기 {#removing-users-from-a-role}

1. 제거하려는 사용자가 속한 역할을 여세요.
2. **Members** 목록에서 그 사람을 찾으세요.
3. 그 사람의 행에 있는 삭제 아이콘을 클릭하고 확인하세요.

교회에는 항상 도메인 관리자가 최소 한 명 있어야 하므로, **Domain Admins**의 마지막 구성원은 제거할 수 없습니다.

## 권한 설정하기 {#configuring-permissions}

각 역할은 B1 Admin의 특정 영역에 대한 접근 권한을 받을 수 있습니다. **Edit Permissions** 패널에서 권한은 펼칠 수 있는 섹션으로 묶여 있습니다. 섹션은 **Attendance**(출석), **Content**(콘텐츠), **Donations**(헌금), **Forms and Plans**(양식과 계획), **Lessons**(수업), **Messaging**(메시지), **People and Groups**(사람과 그룹), **Tasks**(작업) 등입니다. **Filter permissions**(권한 필터) 상자에 입력하면 일치하는 권한만 표시됩니다.

권한을 체크하거나 해제하여 역할에 부여하거나 제거하세요. 변경 사항은 즉시 저장되며, 저장 버튼은 없습니다. **Edit Church Settings**(교회 설정 편집) 권한은 설정 페이지를 열며, **Content**(콘텐츠) 섹션에 있습니다. 각 섹션 제목에는 역할이 가진 권한 수가 **2 of 5**(5개 중 2개)처럼 표시되며, 상자를 체크하고 해제할 때마다 개수가 업데이트됩니다.

### 헌금 권한 {#donations-permissions}

**Donations**(헌금) 섹션에는 다음 권한이 있습니다.

- **View Donation Summaries**(헌금 요약 보기) -- Summary(요약), Batches(일괄 작업), Funds(헌금 항목), Campaigns(캠페인), Giving Statements(헌금 명세서) 페이지를 포함한 헌금 섹션을 봅니다.
- **View Donations**(헌금 보기) -- 일괄 작업 안의 헌금처럼 개별 헌금을 봅니다.
- **Edit Donations**(헌금 편집) -- 전체 권한입니다. 헌금과 일괄 작업을 추가, 편집, 삭제하고, [일괄 작업을 마감하고 다시 열 수](../donations/batches.md#closing-and-reopening-a-batch) 있습니다.
- **Enter Donations**(헌금 입력) -- 일괄 작업을 추가하고 헌금을 입력, 편집, 삭제할 수 있지만, 아직 열려 있는 일괄 작업에서만 가능합니다. 이 권한만 있는 사람은 일괄 작업을 삭제하거나, 마감하거나 다시 열 수 없으며, 온라인 헌금으로 들어온 헌금도 바꿀 수 없습니다.
- **Edit Settings**(설정 편집) -- 헌금 설정을 관리합니다.

**View Donation Summaries**가 없이 **Enter Donations**만 있는 사람은 **Donations** 아래의 **Batches** 페이지만 봅니다. 집계 팀 역할에는 **Enter Donations**와 **View Donations**를 함께 주세요. 그래야 일괄 작업을 열고 자신이 입력한 헌금을 볼 수 있습니다. 자세한 내용은 [일괄 작업을 바꿀 수 있는 사람](../donations/batches.md#who-can-change-a-batch)을 참고하세요.

### 이름만 보기 권한 {#people-names-only}

**People and Groups**(사람과 그룹) 섹션에는 **View People Names Only**(사람 이름만 보기)가 있습니다. 전체 디렉터리에 접근하지 않고도 검색 상자에서 누군가를 고르는 등 이름으로 사람을 찾아야 하는 자원봉사자에게 사용하세요. 이 권한만 있는 사람은 다음과 같습니다.

- 이름으로 사람을 검색하고 최근에 추가된 사람 목록을 볼 수 있지만, 각 사람의 이름, 사진, 교인 상태만 볼 수 있습니다
- 이메일로 검색하거나, 연락처 정보를 보거나, **People**(사람) 디렉터리를 열 수 없습니다

출석을 확인하는 자원봉사자에게는 **View People Names Only**와 **View Attendance**(출석 보기) 또는 **Edit Attendance**(출석 편집)를 함께 주세요. 그러면 메뉴의 **People**에서 **Groups**(그룹)가 열리고, 여기서 **All groups**(모든 그룹) 목록을 열어 각 반의 구성원 이름과 모임을 볼 수 있습니다. **Edit Attendance**가 있으면 [출석을 기록](../attendance/recording-attendance.md)하고, 이름을 검색하여 방문자를 추가할 수도 있습니다. 이름은 사람 기록으로 가는 링크가 아니며, 비공개 그룹은 자원봉사자가 구성원이 아니라면 계속 숨겨집니다.

B1 Admin은 역할에 없는 권한이 필요한 링크와 버튼을 숨깁니다. 예를 들어 **All groups** 목록은 그룹을 편집하거나, 그룹 구성원을 보거나, 사람을 볼 수 있는 사람에게만 제공됩니다. 또는 **View People Names Only**와 **View Attendance** 또는 **Edit Attendance**를 함께 가진 사람에게만 제공됩니다(그 밖의 사람은 대시보드로 돌아갑니다). 출석 설정은 **Edit Services**(예배 편집)가 있을 때만 나타나며, 그룹의 **Email**(이메일) 버튼은 **Edit Group Members**(그룹 구성원 편집) 권한(그룹 이메일을 보내는 데 필요한 권한)이 있는 사람에게만 나타납니다. 그룹 명단을 인쇄하려면 **View Group Members**(그룹 구성원 보기) 권한이 있거나 그 그룹을 이끌어야 하며, 달력 행사를 삭제하려면 **Edit Content**(콘텐츠 편집)(또는 자신이 낸 대기 중인 요청을 철회)가 필요합니다.

### 체크인 키오스크 계정 {#check-in-kiosk-accounts}

[B1 Checkin](../../b1-checkin/getting-started/logging-in.md) 키오스크에 로그인하는 계정에는 **Attendance**(출석) 섹션의 **Checkin**(체크인) 권한(또는 **Edit Attendance**)이 필요합니다. **Checkin**만 있는 키오스크는 사람 디렉터리에 접근하지 않고도 이름이나 전화번호로 가족을 찾고, 체크인과 체크아웃을 하며, 아이를 데려갈 수 있는 사람을 보여줄 수 있습니다.

Checkin 권한은 더 이상 **(Everyone)** 행을 통해 부여되지 않습니다. 다른 권한이 있는 역할에 속해 있다고 해서 키오스크를 운영할 수 있는 것은 아닙니다. "Check-In Volunteers"(체크인 자원봉사자) 같은 역할에 **Checkin**을 추가하고, 키오스크 계정을 그 역할에 넣으세요.

:::warning
**Domain Admins**(도메인 관리자)는 ChurchApps 계정의 모든 영역에 대한 전체 접근 권한을 가집니다. 이들의 권한은 수정하거나 제한할 수 없습니다. 가장 신뢰하는 관리자에게만 이 역할을 주세요.
:::

:::tip
"Treasurer"(출납 담당)처럼 **Donations**에만 접근하는 역할, **Enter Donations**와 **View Donations**를 가진 "Counting Team"(집계 팀), 또는 **Attendance**에만 접근하는 "Check-In Volunteer"(체크인 자원봉사자) 같은 특정 역할을 만드세요. 이는 최소 권한 원칙을 따르며 데이터를 안전하게 지킵니다. ChurchApps가 정보를 보호하는 방법은 [데이터 보안](./data-security.md)을 참고하세요.
:::
