---
title: "대시보드"
description: "B1 Admin 대시보드에서 이번 주 예배 순서, 봉사자와 체크인한 사람, 확인이 필요한 항목, 나의 작업과 그룹을 확인하세요."
---

# 대시보드

<div class="article-intro">

대시보드는 B1 Admin의 홈 페이지입니다. 로그인하면 열리며, 교회의 주간 예배를 중심으로 구성되어 있습니다. 다가오는 계획의 예배 순서, 봉사하는 사람, 일요일에 현장에 있는 사람, 나에게 기다리고 있는 항목, 그리고 내 작업과 그룹을 보여 줍니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- [B1 Admin](https://admin.b1.church)에 로그인하세요. 로그인한 모든 사용자에게 대시보드가 있지만, 무엇이 표시되는지는 [역할과 권한](./settings/roles-permissions.md)에 따라 다릅니다.
- 예배 관련 섹션은 [계획](./serving/plans.md)과 [출석](./attendance/index.md) 또는 [체크인](./attendance/check-in.md)을 사용하기 시작하면 채워집니다.

</div>

## 대시보드 열기 {#opening-the-dashboard}

- 로그인하면 B1 Admin이 대시보드에서 시작합니다.
- 어느 페이지에서든 왼쪽 상단의 작은 교회 로고를 클릭하세요.
- [점프 메뉴](./introduction.md#getting-around-with-the-jump-menu)를 열고(검색창을 클릭하거나 **Ctrl+K** / **Cmd+K**를 누릅니다) **Dashboard**를 선택하세요.

## 이번 주 예배 {#this-weeks-service}

맨 위의 큰 카드에는 예배 계획 하나가 표시됩니다. 지난 일요일과 이번 돌아오는 일요일 사이의 다음 계획이며, 예정된 계획이 없으면 지난 일요일의 계획입니다. 같은 날에 계획이 여러 개 있으면, 예배 순서가 있는 계획이 먼저 나오고, 그다음에 예배 시간이 가장 이른 계획이 나옵니다.

- **날짜 줄** -- 계획의 요일, 날짜, 첫 예배 시간입니다(예: *Sunday · November 15 · 9:00 AM*).
- **제목** -- 계획의 이름입니다. 계획을 열 수 있다면(계획을 편집할 수 있거나, 계획의 사역 소속이거나, 그 계획에서 봉사하는 경우) 제목이 [계획](./serving/plans.md)으로 연결됩니다.
- **예배 순서** -- 계획의 [예배 순서](./serving/service-order.md)에 있는 각 항목과, 첫 예배 시간과 각 항목의 길이로 계산한 시작 시각입니다. 예배가 진행 중이면 현재 항목이 강조 표시됩니다.

이번 주에 계획이 없으면 카드에 **No service planned this week**.이 표시되고, 계획에 예배 순서가 없으면 **No order of service on this plan**.이 표시됩니다. 계획을 편집할 수 있는 사람에게는 두 메시지 옆에 **Plans** 링크가 보입니다.

### 봉사하는 사람과 현장에 있는 사람 {#who-is-serving-and-who-is-in-the-room}

예배 순서 옆에는 데이터가 있을 때 예배 주변에서 일어나는 일을 대시보드가 보여 줍니다.

| 섹션 | 표시 내용 |
|---|---|
| **in the room** | 체크인했거나 출석으로 표시된 사람 수입니다. 일요일에는 오늘의 집계가 **Live** 표시와 함께 나오고, 주중에는 **Last Sunday**의 집계가 나옵니다. 이름으로 기록된 사람이 없으면 그날의 [인원수](./attendance/headcount-entry.md)를 사용합니다. |
| **Serving Sunday** / **Serving this hour** | 계획에 배정된 모든 사람과 그 사람의 직책이며, 사람 기록에 연결되어 있습니다. 거절한 배정은 제외됩니다. |
| **First time** / **First time last Sunday** | 처음 방문한 게스트(*Visitor* 또는 *Guest* 회원 상태이거나, 게스트로 체크인한 사람)이며, 세대별로 묶여 있습니다. |
| **Rooms** | 그 주의 반이나 방별 체크인 수입니다. 그룹에 **Capacity**가 설정되어 있으면 정원 막대가 함께 표시됩니다. |

아직 이런 데이터가 없으면 카드에는 **People**, **Attendance**, **Plans**로 가는 링크가 있는 짧은 안내가 표시됩니다(열 수 있는 것만 표시됩니다).

:::info
집계와 이름은 출석과 봉사 데이터에서 가져오므로, 이를 볼 권한이 있는 사람에게만 표시됩니다. 예를 들어 게스트 이름과 봉사 목록은 사람을 볼 권한이 필요하고, 방별 집계는 출석을 볼 권한이 필요합니다.
:::

## 확인 필요 {#needs-attention}

무언가 나를 기다리고 있으면 **Needs attention** 카드가 링크와 함께 항목을 나열합니다.

- **pending calendar approvals**(대기 중인 캘린더 승인) -- 승인이 필요한 이벤트와 공간 또는 자원 예약입니다. [승인](./calendars/approvals.md) 페이지를 엽니다. 콘텐츠를 편집할 수 있는 사람에게 표시됩니다.
- **pending group join requests**(대기 중인 그룹 가입 요청) -- 그룹 가입을 요청한 사람들입니다. [대기 중인 요청](./groups/group-join-requests.md) 목록을 엽니다. 구성원을 편집할 수 있는 사람에게 표시됩니다.

할 일이 없으면 카드는 숨겨집니다.

## 나의 작업과 나의 그룹 {#my-tasks-and-my-groups}

페이지 하단에는 다음이 있습니다.

- **My tasks**는 나에게 배정된 열린 [작업](./serving/tasks.md)을 최대 네 개까지 나열하며, 하나를 클릭하면 열립니다. **Add Task**를 클릭하면 여기에서 바로 작업을 만들 수 있습니다(누구에 관한 작업인지, 누구에게 배정하는지 고른 뒤 제목, 마감일, 메모를 입력합니다). **All tasks**를 클릭하면 **Serving > My Work**가 열립니다.
- **My Groups**는 내가 속한 그룹을 나열하며, 하나를 클릭하면 열립니다. 그룹을 관리하거나 사람을 볼 수 있다면 **All groups**를 클릭하여 전체 [그룹](./groups/index.md) 목록을 열 수 있습니다.

## 빠른 작업 {#quick-actions}

예전에 대시보드에 있던 설정 바로 가기(예: **Add Your Church Logo**, **Set Up Online Giving**, **Create Your First Group**)는 이제 점프 메뉴의 **Quick Actions** 아래에 있습니다. [빠른 작업](./introduction.md#quick-actions)을 참조하세요.

## 관련 문서 {#related-articles}

- [소개](./introduction.md) -- 로그인하고 점프 메뉴로 길 찾기
- [알림 및 메시지](./notifications.md) -- 사용자 메뉴의 알림과 개인 메시지
- [계획](./serving/plans.md)과 [예배 순서](./serving/service-order.md) -- 예배 카드에 표시되는 정보의 출처
- [체크인](./attendance/check-in.md) -- 현장에 있는 사람이 집계되는 방법
