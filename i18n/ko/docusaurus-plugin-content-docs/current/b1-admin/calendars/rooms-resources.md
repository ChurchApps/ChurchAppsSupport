---
title: "공간, 자원 및 일정 관리"
description: "B1 Admin에서 공간, 장비, 사용 불가 시간, 이벤트 템플릿을 설정하면 그룹이 예약을 요청할 수 있고, 관리자는 이중 예약을 막기 위해 승인할 수 있습니다."
---

# 공간, 자원 및 일정 관리

<div class="article-intro">

공간과 자원 기능으로 교회의 예약 가능한 공간과 장비를 추적할 수 있습니다. 그룹이나 팀이 이벤트에 공간을 쓰거나 자원을 빌리려면 B1을 통해 요청할 수 있으며, 관리자는 이 요청을 승인하거나 거절하여 이중 예약을 막을 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Edit Content** 권한이 필요합니다.
- 예약 요청을 제출할 구성원이 속한 [그룹](../groups/creating-groups.md)을 설정하세요.

</div>

## 공간 및 자원 열기 {#opening-rooms--resources}

B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Calendars**를 펼친 뒤 **Rooms & Resources**를 클릭합니다. 이 페이지에는 네 개의 탭이 있습니다. **Rooms**, **Resources**, **Blockouts**, **Templates**입니다. 페이지 상단의 추가 버튼은 선택한 탭에 맞게 바뀌며, **Find** 상자로 현재 목록을 거를 수 있습니다.

## 공간 {#rooms}

공간은 캘린더 이벤트와 함께 예약할 수 있는 실제 장소입니다. 예배당, 교제실, 교실 등이 해당합니다.

### 공간 추가하기 {#adding-a-room}

1. **Rooms** 탭에서 페이지 상단의 **Add Room**을 클릭합니다.
2. **Room Name**을 입력합니다.
3. 선택 사항으로 **Capacity**(최대 인원)와 **Description**을 설정합니다. 두 항목은 사람들이 이벤트의 공간을 고를 때 공간 옆에 표시됩니다.
4. 예약에 승인이 필요하면 **Approval Group**을 설정합니다. 그 그룹 구성원의 예약은 자동으로 승인됩니다. 그 외 사람의 예약은 [승인](./approvals.md) 페이지에서 승인될 때까지 **Pending** 상태로 기다리며, 그룹 구성원에게 새 요청에 관한 이메일이 발송됩니다. 모든 예약을 자동으로 승인하려면 **No approval needed**로 둡니다.
5. **Save**를 클릭합니다.

공간 목록에는 각 공간의 **Room Name**, **Capacity**, **Approval Group**이 표시됩니다.

### 공간 수정 또는 삭제하기 {#editing-or-deleting-a-room}

공간에 마우스를 올리고 **Edit**를 클릭하여 변경한 뒤 **Save**를 클릭합니다. 공간을 영구히 제거하려면 **Delete**를 사용합니다.

## 자원 {#resources}

자원은 이벤트와 함께 예약할 수 있는 물품입니다. AV 장비, 프로젝터, 의자, 승합차 등이 해당합니다.

### 자원 추가하기 {#adding-a-resource}

1. **Resources** 탭을 클릭한 뒤 **Add Resource**를 클릭합니다.
2. **Resource Name**을 입력하고, 선택 사항으로 **Description**을 입력합니다.
3. 보유한 **Quantity**를 설정합니다(예: 프로젝터 3대). 이벤트 하나가 한 대를 예약하며, 같은 시간에 보유 수보다 많은 이벤트가 예약하면 B1이 경고합니다.
4. 자원 대여에 누군가의 승인이 필요하면 **Approval Group**을 설정합니다. 공간과 같은 방식으로 작동합니다.
5. **Save**를 클릭합니다.

자원의 수정이나 삭제는 공간과 같은 방식으로 합니다.

## 사용 불가 시간 {#blockouts}

사용 불가 시간(Blockout)은 보수, 예약된 기간, 유지보수처럼 특정 시간에 공간이나 자원을 예약하지 못하게 합니다.

### 사용 불가 시간 추가하기 {#adding-a-blockout}

1. **Blockouts** 탭을 클릭한 뒤 **Add Blockout**을 클릭합니다.
2. **Applies To**에서 공간, 자원, 또는 **All rooms & resources**를 고릅니다.
3. 사용 불가 시간의 **Start**와 **End** 날짜/시간을 설정합니다.
4. 선택 사항으로 **Reason**을 입력합니다. 이 내용은 [사용 가능 일정 캘린더](./availability.md)에 *Blocked: reason*으로 표시됩니다.
5. **Save**를 클릭합니다.

사용 불가 상태인 공간이나 자원을 예약하는 이벤트는 이벤트 편집기에 충돌 경고가 표시됩니다.

## 이벤트 템플릿 {#event-templates}

템플릿으로 제목, 설명, 길이, 공간, 자원을 포함한 재사용 가능한 이벤트 설정을 저장할 수 있습니다. 자주 만드는 이벤트를 매번 같은 방식으로 설정할 수 있습니다.

### 템플릿 추가하기 {#adding-a-template}

1. **Templates** 탭을 클릭한 뒤 **Add Template**를 클릭합니다.
2. **Template Name**을 입력합니다(템플릿을 고를 때 표시됩니다).
3. 새 이벤트에 사용할 **Event Title**, **Event Description**, **Duration (minutes**)를 입력합니다.
4. 선택 사항으로 예약할 **Rooms**와 **Resources**를 고릅니다.
5. **Save**를 클릭합니다.

새 이벤트를 만들 때 이벤트 편집기의 **Template** 상자에서 템플릿을 고르면 제목, 설명, 공간, 자원이 채워지고, 템플릿의 길이에 따라 종료 시간이 설정됩니다(먼저 **Start**를 설정하세요). 이벤트의 **Group**은 직접 고릅니다. **Template** 상자는 템플릿이 하나 이상 있을 때만 나타납니다.

## 관련 문서 {#related-articles}

- [사용 가능 일정 캘린더](./availability.md) — 모든 예약을 한눈에 보고 공간이나 자원을 바로 예약
- [캘린더 승인](./approvals.md) — 공간 및 자원 예약 요청 승인 또는 거절
- [캘린더 만들기](./creating-calendars.md) — 이벤트 캘린더 설정
- [그룹 만들기](../groups/creating-groups.md) — 공간과 자원을 예약할 수 있는 그룹 설정
