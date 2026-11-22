---
title: "캘린더 승인"
description: "B1 Admin에서 대기 중인 공간 및 자원 예약 요청을 검토하고, 충돌을 확인하고, 승인하거나 거절하며, 기록에서 과거 결정을 확인하세요."
---

# 캘린더 승인

<div class="article-intro">

승인 페이지는 관리자가 대기 중인 공간 및 자원 예약 요청과, 게시 전에 승인이 필요한 캘린더 이벤트를 검토하고 처리하는 곳입니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- [공간 및 자원](./rooms-resources.md)에서 공간이나 자원에 **Approval Group**을 설정하세요.
- **Edit Content** 권한이나 **Resolve Calendar Conflicts & Approvals** 권한이 필요합니다(둘 다 [역할 및 권한](../settings/roles-permissions.md)의 **Content** 섹션에 있습니다). **Edit Content**가 없으면 **Calendars** 메뉴가 표시되지 않습니다. 이 경우 **Dashboard**의 대기 중인 승인 링크나 승인 이메일에서 Approvals를 여세요.

</div>

## 승인 페이지 열기 {#opening-approvals}

B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Calendars**를 펼친 뒤 **Approvals**를 클릭합니다. 검토를 기다리는 예약 요청과 이벤트가 여기에 나열됩니다. 상단의 **Pending**과 **History** 버튼으로 아직 결정이 필요한 요청과 이미 결정된 요청을 전환할 수 있습니다.

## 예약 요청 {#booking-requests}

**Approval Group**이 설정된 공간이나 자원을 누군가 예약하는데, 그 사람이 해당 그룹의 구성원이 아니라면 요청이 **Room & Resource Requests** 섹션에 나타납니다. (Approval Group 구성원의 예약은 자동으로 승인됩니다.) Approval Group 구성원에게는 새로 대기 중인 요청을 나열한 이메일이 발송되며, 이 페이지로 가는 링크가 포함됩니다. 각 행에는 다음이 표시됩니다.

- 이벤트 이름과 날짜/시간
- 요청된 공간이나 자원(여러 단위인 자원은 수량 포함)
- **Requested by**: 요청한 사람이며, 그 사람의 기록으로 연결됩니다.
- 요청에 충돌이 있는지 보여 주는 상태 배지

### 충돌 표시 {#conflict-indicators}

요청이 같은 공간이나 자원의 다른 예약 또는 사용 불가 시간과 겹치면 상태에 **Conflicts** 배지가 표시됩니다. 배지에 마우스를 올리면 세부 내용을 볼 수 있습니다. 겹치지 않는 요청에는 **No conflicts**가 표시됩니다. 충돌이 있는 요청은 어느 쪽이든 승인하기 전에 신중히 검토하세요.

### 승인 또는 거절 {#approving-or-rejecting}

예약 요청 위에 마우스를 올린 뒤 **Approve** 또는 **Reject**를 클릭합니다(거절은 먼저 확인을 요청합니다). 요청자에게 결정이 알림으로 전달됩니다. 승인된 예약은 해당 이벤트 동안 그 공간이나 자원에 고정되며, 거절된 예약은 그 시간대를 다른 사람이 쓸 수 있게 풀어 줍니다.

**Approve**를 클릭하면 **Approve booking** 대화상자가 열리며, 같은 단계에서 이벤트를 게시할 수도 있습니다.

1. **Publish to public calendar**를 체크하면 그룹 캘린더에서 이벤트가 공개됩니다. 체크하지 않으면 이벤트의 공개 상태를 바꾸지 않고 예약만 승인합니다.
2. **Publish to public calendar**를 체크하면 **Also add to calendar**에서 선택 사항으로 큐레이션 캘린더를 고를 수 있으며, 이벤트를 [큐레이션 캘린더](./curated-calendar.md)에도 추가할 수 있습니다. 추가하지 않으려면 **None**으로 두세요. (이 옵션은 **content.edit** 권한이 있을 때만 표시됩니다.)
3. **Approve**를 클릭합니다.

## 대기 중인 이벤트 {#pending-events}

구성원이 요청한 이벤트(예: B1 앱의 **My Requests**에서 요청한 것)는 날짜, **Description**, **Requested by**와 함께 **Event Requests** 섹션에 나타납니다. **Approve**를 클릭하면 이벤트가 캘린더에 게시되고, **Reject**를 클릭하면 요청자에게 수정이 필요하다고 알립니다. 결정하기 전에 요청 내용을 고치려면 **Edit**를, 삭제하려면 **Delete**를 클릭합니다.

:::tip
공간에 승인을 요구하려면 [공간 및 자원](./rooms-resources.md)에서 그 공간에 Approval Group을 설정하세요. 접근 권한이 있는 그룹은 이벤트를 만들 때 공간을 요청할 수 있고, 그 요청은 이 페이지로 들어옵니다.
:::

## 요청한 사람 바꾸기 {#changing-who-a-request-is-for}

구성원을 대신해 요청을 입력한 경우(예: 사무실로 전화가 왔을 때), 그 요청은 귀하의 이름으로 나열됩니다. **Requested by** 아래 이름 옆의 교체 아이콘을 클릭하고(**Pending** 또는 **History**의 어느 섹션에서든), 구성원을 검색한 뒤 **Move to this person**을 클릭합니다. 요청 전체가 옮겨갑니다. 이벤트 요청과 그 요청에 포함된 모든 공간 및 자원 예약이 함께 이동합니다. 그러면 구성원은 승인 또는 거절 알림을 받고, B1 앱의 **My Requests**에서 요청을 보며, 요청은 그 사람의 인물 기록 중 요청 섹션에도 나타납니다. 요청을 옮긴다고 승인 여부가 바뀌지는 않습니다.

## 기록 {#history}

승인되거나 거절된 요청은 페이지에 계속 남습니다. 승인 페이지 상단의 **History**를 클릭하면 볼 수 있으며, **Pending**을 클릭하면 열린 요청으로 돌아갑니다.

- **Room & Resource Requests**에는 결정된 예약마다 이벤트, 공간이나 자원, **Requested by**, **Approved** 또는 **Rejected** 배지, 그리고 **Decided**가 나열됩니다. **Decided**에는 누가 언제 결정했는지 표시됩니다. 가장 최근에 결정된 요청이 먼저 나옵니다.
- **Event Requests**에는 결정된 이벤트마다 설명, **Requested by**, **Approved** 또는 **Rejected** 배지, 그리고 **Decided**가 나열됩니다. B1이 이 정보를 기록하기 시작하기 전에 결정된 이벤트 요청은 대신 대시(-)로 표시됩니다.

History에서도 결정을 바꿀 수 있습니다. 승인된 요청에는 **Reject** 작업이, 거절된 요청에는 **Approve** 작업이 있습니다. 승인했던 이벤트 요청을 거절하면 공개 캘린더에서도 빠집니다. 이 페이지에서 이벤트 요청을 수정하거나 삭제할 수도 있습니다.

**Requested by** 아래의 이름을 클릭하면 그 사람의 기록이 열립니다.

## 관련 문서 {#related-articles}

- [공간, 자원 및 일정 관리](./rooms-resources.md) — 예약 가능한 공간과 자원 설정
- [캘린더 만들기](./creating-calendars.md) — 캘린더와 이벤트 관리
