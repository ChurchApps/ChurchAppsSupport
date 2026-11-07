---
title: "메모"
description: "B1 Admin의 한 목록에서 사람, 그룹, 행사, 업무 카드의 목양 메모, 후속 조치, 계획을 최신순으로 확인합니다."
---

# 메모

<div class="article-intro">

**Notes**(메모) 페이지는 B1 Admin 전체의 최근 메모를 한곳에 모아 보여 줍니다. 각 기록을 열지 않아도 목회적 돌봄, 후속 조치, 계획을 따라잡을 수 있습니다. 교인, 내가 이끄는 그룹, 캘린더 행사, 워크플로 카드에 작성된 메모를 최신순으로 나열하며, 각 메모를 작성된 곳으로 다시 연결합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Notes** 페이지는 **Edit People** 권한이 있거나 그룹을 하나 이상 이끌고 있다면 메뉴에 나타납니다. [역할 지정하기](./roles-permissions.md)를 참고하세요.
- 이 페이지에는 이미 읽을 권한이 있는 메모만 표시됩니다. 각 탭은 메모가 속한 기록과 같은 규칙을 따릅니다([각 탭이 보여 주는 내용](#what-each-tab-shows) 참고).

</div>

## 메모 페이지 열기

1. [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(B1 Admin 왼쪽 위의 검색창)를 열고 **People**을 펼치세요.
2. **Notes**를 클릭하세요.
3. 페이지가 **People** 탭으로 열립니다. 페이지 머리글의 탭을 사용해 **People**, **Groups**, **Events**, **Workflows** 사이를 전환하세요.

## 목록 읽기

목록의 각 메모에는 다음이 표시됩니다.

- **작성된 곳** -- 교인 이름, 그룹 이름, 행사 제목, 또는 워크플로 카드 제목입니다. 이름을 클릭하면 그 기록이 열려, 전체 대화를 읽거나 메모를 추가할 수 있습니다.
- **Confidential** -- 교인 메모 중 교인의 Confidential Notes(비밀 메모) 섹션에서 온 메모에 붙는 배지입니다.
- **작성자와 작성 시각** -- 작성자 이름 앞의 "By"와, 게시된 날짜 및 시각입니다.
- **메모 내용** -- 긴 메모는 목록에서 줄여서 보여 줍니다. 전체 메모를 읽으려면 기록을 여세요.

목록은 가장 최근 메모를 먼저 보여 줍니다. 더 오래된 메모를 보려면 맨 아래의 **Load more**를 클릭하세요.

이미 삭제되었거나 다른 기록에 병합된 교인에게 작성된 메모는 **People** 탭에 나타나지 않습니다.

메모 페이지는 읽기 전용입니다. 메모를 추가, 편집, 답글하려면 기록의 이름을 클릭해 여세요.

## 각 탭이 보여 주는 내용 {#what-each-tab-shows}

| 탭 | 표시되는 메모 | 볼 수 있는 사람 | 이름을 클릭하면 열리는 곳 |
|-----|-------------|------------------|-------------------------|
| **People** | 교인 기록의 메모 | **Edit People** 권한이 있는 사람. 비밀 메모는 **View Confidential Notes**도 필요 | 그 교인의 메모 |
| **Groups** | 그룹의 [리더 메모](../groups/group-members.md#leader-notes) | 관리자라도 각 그룹의 리더만 | 그 그룹의 메모 |
| **Events** | [행사 메모](../calendars/creating-calendars.md#event-notes) | 콘텐츠를 편집하거나 캘린더를 관리할 수 있는 직원, 그리고 행사의 **Who can view notes** 설정이 허용하는 사람 | 행사 그룹의 캘린더 |
| **Workflows** | [워크플로 카드](../serving/workflows.md#working-the-board)의 메모 | 카드를 열 수 있는 모든 사람(카드가 배정된 교인이나 그룹 포함) | 카드의 워크플로 보드 |

볼 수 있는 메모가 아직 없는 탭에는 그렇다고 표시됩니다. 예를 들어 "No notes yet for groups you lead."(내가 이끄는 그룹에 아직 메모 없음)처럼 나타납니다.

:::tip
메모 스레드에는 알림용 종 아이콘이 있습니다. 클릭하면 그 스레드의 새 메모에 대해 알림을 받으며(아이콘이 바로 바뀝니다), 다시 클릭하면 알림을 끕니다. 이 켜기/끄기 설정은 메모 페이지에 메모로 나타나지 않습니다.
:::

## 관련 문서

- [교인 추가하기](./adding-people.md) -- 교인 프로필의 Notes 섹션
- [역할 지정하기](./roles-permissions.md) -- **Edit People**과 **View Confidential Notes** 권한
- [그룹 구성원](../groups/group-members.md#leader-notes) -- 그룹의 비공개 리더 메모
- [캘린더 만들기](../calendars/creating-calendars.md#event-notes) -- 행사 메모와 볼 수 있는 사람
- [워크플로](../serving/workflows.md) -- 워크플로 카드의 메모
