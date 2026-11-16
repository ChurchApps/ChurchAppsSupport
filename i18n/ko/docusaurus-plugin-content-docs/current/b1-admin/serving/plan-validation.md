---
title: "계획 검증 및 알림"
description: "B1 Admin에서 예배 계획의 빈자리, 일정 충돌, 일정이 막힌 자원봉사자를 확인한 다음, 클릭 한 번으로 팀 전체에 푸시 알림을 보내세요."
---

# 계획 검증 및 자원봉사자 알림 {#plan-validation--volunteer-notifications}

<div class="article-intro">

B1 Admin은 주일 전에 계획에 문제가 없는지 자동으로 확인합니다. 빈자리, 일정 충돌, 해당 날짜를 막아 둔 자원봉사자를 찾아냅니다. 모든 것이 괜찮아 보이면, 클릭 한 번으로 팀 전체에 알릴 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- [예배 계획](./plans.md)을 만들고 자리에 자원봉사자를 배정하세요
- 겹치는 시간을 충돌 감지가 확인할 수 있도록 계획에 [예배 시간](./plans.md)을 추가하세요
- 자원봉사자가 푸시 알림을 받을 수 있도록 [B1 App 설치](../../b1-church/getting-started/installing-pwa.md)를 해 두었는지 확인하세요

</div>

## 검증 패널 {#the-validation-panel}

모든 계획에는 계획을 구성하는 동안 자동으로 실행되는 **Validation**(검증) 패널이 있습니다. 계획을 열고 **Manage serving team**(봉사 팀 관리)을 클릭하면 자리 옆에서 볼 수 있습니다. 계획 페이지 자체에도 **Serving team**(봉사 팀) 아래에 한 줄 요약(예: "충돌 2건 · 알림 안 됨 3명")이 **Review**(검토) 링크와 함께 표시되며, 이를 클릭하면 전체 패널이 열립니다. 사람이 더 필요한 자리는 계획 페이지에도 나열되므로, 요약 줄에는 충돌과 아직 알림을 받지 않은 자원봉사자만 집계됩니다.

패널은 다음 항목을 확인합니다.

### 채워지지 않은 자리 {#unfilled-positions}
자리에 현재 배정된 인원보다 더 많은 사람이 필요하면, 검증 패널에 필요한 내용이 정확히 나열됩니다. 예: *"Sound Tech: 1 more person needed."*(음향 기술: 1명 더 필요합니다.) 주가 시작되기 전에 계획의 인원이 충족되었는지 한눈에 확인할 수 있습니다.

### 일정 충돌 {#scheduling-conflicts}
한 자원봉사자가 같은 계획 안에서 시간이 겹치는 두 자리에 배정되어 있으면, 검증 패널이 충돌을 표시합니다. 예: *"Jane Smith: time conflict between Worship Leader and Children's Check-in during Sunday Service."*(Jane Smith: 주일 예배 중 Worship Leader와 Children's Check-in 사이에 시간 충돌.) 이렇게 중복 배정을 주일 아침 문제가 되기 전에 잡아냅니다.

### 일정 차단 날짜 {#blockout-dates}
자원봉사자는 B1 App에서 참석할 수 없는 날짜를 설정할 수 있습니다. 차단된 날짜에 해당하는 계획에 누군가 배정되어 있으면, 검증 패널이 충돌을 자동으로 표시하므로 대체자를 찾을 수 있습니다.

자원봉사자는 일정을 짤 때도 표시됩니다. 봉사 팀 페이지와 **Assign Position** 대화상자에서 해당 이름에 빨간색 **Unavailable** 배지가 붙으며, 배지에 마우스를 올리면 날짜를 볼 수 있습니다(예: *Blocked out: Nov 22, 2026 – Nov 29, 2026*). **Assign Position** 대화상자에서는 이런 사람들이 팀의 다른 사람들 뒤에 나열되며, 여전히 배정할 수 있습니다. [계획 개요](./plans-overview.md) 격자에서는 이름 옆의 작은 빨간색 달력 아이콘이 같은 의미를 나타냅니다.

앱을 사용하지 않는 봉사자는 직원이 대신 차단 날짜를 입력할 수 있습니다. 사역의 **Serving Teams** 목록에서 팀을 열고, 구성원 목록 아래의 **Block-out dates** 카드로 스크롤하세요. 이 카드에는 각 팀원의 예정된 차단 날짜가 **Team member**, **From**, **To**와 함께 표시됩니다.

1. **Add block-out**을 클릭하세요.
2. **Team member**를 고른 다음 **From**과 **To** 날짜를 설정하세요.
3. **Save**를 클릭하세요.

차단 날짜를 삭제하려면 해당 행의 삭제 아이콘을 클릭하고 확인하세요. 차단 날짜를 추가하거나 삭제하려면 계획을 편집할 권한이 있어야 하며, 그 외의 사람이 팀을 열면 목록만 볼 수 있습니다.

### 계획 간 충돌 {#cross-plan-conflicts}
검증은 모든 계획을 한꺼번에 확인합니다. 같은 자원봉사자가 시간이 겹치는 두 개의 다른 계획에 배정되어 있으면(예: 오전 9시 예배와 오전 10시 예배가 모두 10시 30분까지 진행되는 경우), B1 Admin은 그 사람을 계획 간 중복 배정으로 표시합니다.

### 일정 선호 {#scheduling-preferences}
자원봉사자에게 [일정 선호](./plans.md#scheduling-preferences)가 설정되어 있으면, 배정이 선호에 어긋날 때 패널이 경고합니다. 이번 달 배정 횟수가 **Max times per month**(월 최대 횟수)를 넘을 때, 계획의 시간 중 **Preferred service times**(선호 예배 시간)와 맞는 것이 없을 때, 또는 가족과 같은 날에는 섬기지 않겠다고 요청했는데 가족 구성원도 배정되어 있을 때 경고합니다.

모든 항목을 통과하면 패널에 **Plan is valid.**(계획이 유효합니다.)라고 표시됩니다.

:::tip
검증을 실행하기 위해 특별히 할 일은 없습니다. 배정을 추가하거나 변경할 때마다 자동으로 업데이트됩니다. 계획을 구성하면서 패널을 주시하기만 하면 됩니다.
:::

## 자원봉사자에게 알림 보내기 {#notifying-volunteers}

계획이 정해지면, 검증 패널에서 배정된 모든 자원봉사자에게 한 번에 알릴 수 있습니다.

1. 계획을 열고 **Manage serving team**(봉사 팀 관리)(또는 계획 요약 줄의 **Review**)을 클릭하여 **Validation** 패널을 보세요.
2. 아직 알림을 받지 않은 자원봉사자가 있으면, 알림을 보내야 할 인원 수가 표시된 링크가 나타납니다(예: *"Notify 8 volunteer(s)"*(자원봉사자 8명에게 알림)). 모든 사람에게 알림을 보냈다면, 패널에 **All volunteers notified.**(모든 자원봉사자에게 알림을 보냈습니다.)라고 표시됩니다.
3. 링크를 클릭하면 아직 알림을 받지 않은 모든 사람에게 푸시 알림이 전송됩니다.
4. 자원봉사자는 휴대폰에서 알림을 받아, 일정이 잡혔음을 알고 배정을 확인하라는 안내를 받습니다.

:::info
아직 알림을 받지 않은 자원봉사자만 포함됩니다. 나중에 계획에 누군가를 추가하면 링크가 다시 나타나므로, 나머지 팀에게 다시 알리지 않고도 새로 추가된 사람에게만 알릴 수 있습니다.
:::

### 임시 배정 계획 게시하기 {#publishing-a-penciled-in-plan}

계획이 [임시 배정](./plans.md#plan-settings) 상태이면, 자원봉사자는 아직 배정을 볼 수 없으며, 패널에는 *"Penciled in — volunteers can't see these assignments yet."*(임시 배정 — 자원봉사자는 아직 이 배정을 볼 수 없습니다.)이라는 문구와 함께 알림 링크 대신 버튼이 표시됩니다.

- **Publish Plan**(계획 게시)은 배정을 볼 수 있도록 합니다.
- **Publish & Notify**(게시 및 알림)(일부 자원봉사자가 아직 알림을 받지 않았을 때 표시되며, 예: *"Publish & Notify 8 volunteer(s)"*)는 배정을 볼 수 있도록 하고 해당 자원봉사자에게 바로 알림을 보냅니다.

대화 상자에서 확인하면 게시됩니다.

### 확인 워크플로가 있는 계획 {#plans-with-a-confirmation-workflow}

계획 설정에서 [확인 워크플로](./workflows.md#serving-assignment-confirmations)를 지정했다면, 패널에는 *"New requests use the confirmation workflow. App alerts stay enabled. Follow-ups stop when each request is accepted or declined."*(새 요청은 확인 워크플로를 사용합니다. 앱 알림은 계속 켜져 있습니다. 각 요청이 수락 또는 거절되면 후속 조치가 중단됩니다.)라고 표시됩니다. 이 경우:

- 알림 링크는 아직 알림을 받지 않았고 아직 응답하지 않은 자원봉사자만 집계합니다.
- 링크를 클릭하면 평소의 앱 내 알림이 전송되고, 요청마다 워크플로 보드에 카드가 하나씩 생성됩니다. 이후 워크플로가 이메일과 문자 후속 조치를 보내고, 필요하면 누군가에게 전화하도록 요청을 넘깁니다.
- 계획은 게시된 상태(임시 배정 아님)여야 하며, 워크플로는 활성 상태여야 합니다. 그렇지 않으면 패널에 *"Requests could not be issued. Check that the selected workflow is active and the plan is published, then try again."*(요청을 발송할 수 없습니다. 선택한 워크플로가 활성 상태이고 계획이 게시되었는지 확인한 후 다시 시도하세요.)라고 표시됩니다.

:::warning
자원봉사자가 푸시 알림을 받으려면 B1 App이 홈 화면에 설치되어 있고 알림이 켜져 있어야 합니다. 설정 방법은 [앱(PWA)으로 설치하기](../../b1-church/getting-started/installing-pwa.md)를 참고하세요.
:::

## 관련 문서 {#related-articles}

- [예배 계획](./plans.md)
- [워크플로](./workflows.md)
- [B1.church PWA 설치하기](/docs/b1-church/getting-started/installing-pwa)
