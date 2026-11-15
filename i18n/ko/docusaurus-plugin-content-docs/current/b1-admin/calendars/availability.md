---
title: "사용 가능 일정 캘린더"
description: "B1 Admin에서 예약 가능한 공간과 장비를 설정한 뒤, 캘린더에서 예약하고, 준비 및 정리 여유 시간을 추가하며, 반복 예약이나 승인이 필요한 예약을 처리하세요."
---

# 사용 가능 일정 캘린더

<div class="article-intro">

사용 가능 일정 캘린더는 교회 전체의 공간 및 자원 예약을 한눈에 보여 줍니다. 여기에서 무엇이 예정되어 있는지 확인하고, 문제가 생기기 전에 충돌을 찾아내며, 어떤 이벤트든 공간이나 자원을 바로 예약할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 공간 및 자원 섹션에서 [공간이나 자원](./rooms-resources.md)을 최소 하나 설정하세요.
- **Edit Content** 권한이 필요합니다.

</div>

## 사용 가능 일정 캘린더 열기 {#opening-the-availability-calendar}

B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Calendars**를 펼친 뒤 **Availability**를 클릭합니다.

## 캘린더 읽기 {#reading-the-calendar}

캘린더는 기본적으로 이번 달을 표시합니다. 상단의 **Today**, **Back**, **Next**로 이동하고, **Month**, **Week**, **Day**, **Agenda**로 보기 방식을 바꿀 수 있습니다.

각 예약은 상태에 따라 색으로 구분됩니다.

| 색 | 의미 |
|-------|---------|
| 초록 | 승인됨 |
| 주황 | 승인 대기 중 |
| 회색 | 사용 불가(예약 불가), *Blocked: reason*으로 표시 |

각 예약은 이벤트 제목과 함께 사용하는 공간과 자원이 이어서 표시됩니다. 예약 위에 마우스를 올리면 전체 텍스트를 볼 수 있습니다. 예약을 클릭하면 이벤트가 열리고 수정할 수 있습니다.

## 공간 또는 자원으로 필터링하기 {#filtering-by-room-or-resource}

왼쪽 상단의 **Room / Resource** 드롭다운으로 캘린더를 특정 공간이나 자원 하나로 좁힐 수 있습니다. 전체 보기로 돌아가려면 **All rooms & resources**를 선택합니다.

## 공간 또는 자원 예약하기 {#booking-a-room-or-resource}

1. 페이지 상단의 **Book** 버튼을 클릭합니다.
2. **New Event** 대화상자가 열립니다. 캘린더에서 사용하는 것과 같은 편집기입니다(자세한 내용은 [이벤트 추가 및 수정](./creating-calendars.md#adding-and-editing-events) 참조). 이벤트 세부 정보를 입력합니다.
   - **Group** *(필수)* — 이벤트가 속한 그룹입니다. [템플릿](./rooms-resources.md#event-templates)이 있다면 **Template**을 골라 나머지 내용을 채울 수도 있습니다.
   - **Title** *(필수)*
   - **Start**와 **End** 날짜/시간 *(필수. End는 Start 이후여야 합니다)*
   - **Visibility** — Public 또는 Private
   - **Rooms** — 예약할 공간을 하나 이상 선택합니다.
   - **Resources** — 예약할 자원을 하나 이상 선택합니다.
3. 공간이나 자원을 선택하면 **Setup (min before)**(준비 시간, 분 단위 전)와 **Teardown (min after)**(정리 시간, 분 단위 후)를 설정할 수 있습니다. 이벤트의 시작/종료 시각은 그대로이지만, 준비와 정리를 위해 양쪽 끝에 예약 시간이 추가되어 공간이 확보됩니다.
4. 예약을 반복하려면 먼저 **Start**를 설정한 뒤 **Repeats**를 체크하고 반복 규칙을 설정합니다.
   - **Interval** -- 반복 주기입니다(예: Week와 함께 2를 입력하면 2주마다).
   - **Frequency** -- Day, Week, Month 중 하나입니다. Week는 요일을 고를 수 있고, Month는 매월 고정된 날짜 또는 "두 번째 화요일" 같은 상대적 패턴을 고를 수 있습니다.
   - **Ends** -- **Never**, 특정 **End Date**를 지정하는 **On**, 또는 횟수를 지정하는 **After**입니다.
5. 이벤트 시작/종료와 다른 예약 기간을 지정하려면 **Custom reservation window**를 켜고 **Reserve from**과 **Reserve until**을 입력합니다. 이 설정은 준비 및 정리 시간을 대신합니다. 이벤트에 표시된 시간 밖에도 공간을 써야 할 때 사용하세요.
6. **Save**를 클릭해 예약을 제출합니다.

:::info
공간이나 자원에 **Approval Group**이 설정되어 있으면, 승인 페이지에서 승인되기 전까지 예약은 **Pending**으로 표시됩니다. 다만 그 그룹의 구성원이라면 바로 승인됩니다. 승인 절차는 [캘린더 승인](./approvals.md)을 참조하세요.
:::

:::tip
편집기는 해당 시간에 공간이나 자원이 이미 예약되었거나 사용 불가 상태이면 저장하기 전에 경고를 표시합니다. 충돌 경고가 보이면 시간을 조정하거나 다른 공간을 고르세요.
:::

## 관련 문서 {#related-articles}

- [공간, 자원 및 일정 관리](./rooms-resources.md) — 예약 가능한 공간과 장비 설정
- [캘린더 승인](./approvals.md) — 예약 요청 승인 또는 거절
- [캘린더 만들기](./creating-calendars.md) — 이벤트 캘린더 관리
