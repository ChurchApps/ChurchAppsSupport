---
title: "캘린더 만들기"
description: "B1 Admin에서 캘린더를 만들고, 그룹을 연결하거나 .ics 파일을 가져오며, 한곳에서 이벤트, 등록, 메모를 관리하세요."
---

# 캘린더 만들기

<div class="article-intro">

B1 Admin에서 캘린더를 만들면 하나 이상의 그룹을 연결하여 이벤트를 모아 보는 화면을 구성할 수 있습니다. 이벤트는 각 그룹의 리더가 자기 그룹 안에서 관리하고, 캘린더는 그 이벤트를 한곳에 보여 줍니다. 편집 권한이 있는 관리자는 모든 그룹의 이벤트를 추가하거나 수정할 수 있습니다. 관리자가 아닌 그룹 리더는 자신이 이끄는 그룹의 이벤트만 관리할 수 있습니다.

</div>

## 교육 영상 {#training-video}

<YouTube id="Ko3kgsCSLFs" title="B1에서 캘린더, 이벤트, 공간 예약 만들기" next="B1에서 이벤트 등록 및 유료 이벤트" nextUrl="/docs/b1-admin/calendars/paid-registrations" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- 캘린더에 포함하고 싶은 이벤트의 [그룹](../groups/creating-groups.md)을 먼저 설정하세요.
- **Edit Content** 권한이 필요합니다.

</div>

## 새 캘린더 만들기 {#creating-a-new-calendar}

1. B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Calendars**를 펼친 뒤 **Calendars**를 클릭합니다.
2. 페이지 상단의 **Add Calendar**를 클릭합니다. 캘린더 목록 아래에 새 캘린더 양식이 열립니다.
3. **Calendar Name**을 입력합니다(예: "Youth Ministry Events" 또는 "Main Church Calendar").
4. **Create**를 클릭해 새 캘린더를 저장합니다.

나중에 캘린더 이름을 바꾸거나 삭제하려면 Calendars 페이지에서 해당 행에 마우스를 올리고 **Edit**를 클릭하세요(또는 캘린더의 상세 페이지에서 **Edit**를 클릭합니다).

## 캘린더 상세 페이지 {#the-calendar-detail-page}

캘린더를 만든 뒤 이름을 클릭하거나(또는 행에 마우스를 올리고 **Manage Events**를 클릭해) 상세 페이지를 엽니다. 이 페이지에는 두 가지 주요 영역이 있습니다.

- **왼쪽 열** -- 캘린더 이름과 작업(**New Event**, **Edit**, **Import .ics**, **Print**), 대기 중인 승인으로 가는 링크, 그리고 이 캘린더에 포함된 그룹을 보여 주는 **Groups in Calendar** 목록입니다. 그룹 옆의 **Remove**를 클릭하면 캘린더에서 빠집니다.
- **주 영역** -- 연결된 그룹에서 가져온 이벤트를 보여 주는 **Calendar Events** 화면이며, 그 위에 **Subscribe**와 **Add Group** 버튼이 있습니다. **Today**, **Back**, **Next**와 **Month**, **Week**, **Day**, **Agenda** 보기로 이동할 수 있습니다. 각 이벤트는 그룹의 색으로 표시됩니다. 색은 자동으로 정해지며, 그룹은 모든 캘린더에서 같은 색을 유지합니다.

**Print**를 클릭하면 한 달 치를 인쇄할 수 있습니다. 인쇄물의 맨 위에는 교회의 밝은 배경 로고([외관](../website/appearance.md)에서 설정한 경우), 교회 이름, 캘린더 이름이 나옵니다. 이벤트 이름은 잘리지 않고 여러 줄로 줄바꿈되며, 그룹 색도 유지됩니다.

## 그룹 연결하기 {#connecting-groups}

캘린더에 이벤트가 있는 그룹은 상세 페이지 왼쪽의 **Groups in Calendar** 목록에 자동으로 나타납니다.

1. 캘린더 위의 **Add Group**을 클릭하여 그룹을 캘린더에 연결합니다.
2. **Select a Group**에서 그룹을 고릅니다. 목록에는 자신이 속한 그룹만이 아니라 교회의 모든 그룹이 나타납니다.
3. **Add all the events of the group**을 고르거나, **Add specific events**를 고른 뒤 나타나는 작은 캘린더에서 원하는 이벤트를 하나씩 클릭합니다.
4. **Save**를 클릭합니다.

각 이벤트는 캘린더에 한 번만 나타납니다. 그룹 전체를 추가하면, 이미 하나씩 추가해 둔 이벤트는 그룹 항목에 합쳐집니다. 캘린더에 이미 있는 그룹에서 특정 이벤트를 고르면 새로 추가되는 것은 없습니다. 그룹 전체를 추가한 경우에만 **Groups in Calendar**에 나열됩니다.

### .ics 파일 가져오기 {#importing-an-ics-file}

**Import .ics**를 클릭하면 다른 캘린더의 이벤트를 가져올 수 있습니다. 이벤트가 속할 **Group**을 고른 뒤 **Choose .ics file**을 클릭하거나 파일 내용을 붙여 넣고 **Import**를 클릭합니다. 이벤트는 그 그룹에 만들어지고, 그룹은 가져온 캘린더에 추가되므로 이벤트가 바로 그곳에 나타납니다.

### 캘린더에서 이벤트 제거하기 {#removing-an-event-from-the-calendar}

캘린더에서 이벤트를 클릭한 뒤 **Remove from Calendar**를 클릭합니다. 이 작업은 이 캘린더에서만 이벤트를 빼며, 이벤트 자체는 그룹에 그대로 남습니다. 이벤트가 그룹 전체가 추가되어 들어온 것이라면, 제거하면 그 그룹의 이벤트가 모두 이 캘린더에서 빠집니다(이벤트는 그룹에 그대로 남습니다). 이벤트를 완전히 삭제하려면 [그룹 캘린더](../groups/group-calendar.md)에서 삭제하세요.

:::tip
그룹을 캘린더에 연결하면 이벤트를 자동으로 모을 수 있어 매우 유용합니다. 그룹 리더가 자기 [그룹](../groups/creating-groups.md)에 이벤트를 추가하면, 별도의 작업 없이 교회 전체 캘린더에 반영됩니다.
:::

:::info
교회의 여러 그룹에서 이벤트를 가져오는 하나의 캘린더를 만들고 싶다면, 간편한 방법은 [큐레이션 캘린더](./curated-calendar.md)를 참조하세요.
:::

## 이벤트 추가 및 수정하기 {#adding-and-editing-events}

이벤트를 추가하려면 캘린더 상세 페이지에서 **New Event**를 클릭하고, 수정하려면 캘린더에서 이벤트를 클릭한 뒤 **Edit**를 클릭합니다. **New Event** / **Edit Event** 양식에는 다음 항목이 있습니다.

- **Group** -- 이벤트가 속한 그룹입니다. 교회에 이벤트 템플릿이 있다면 **Template**을 골라 양식을 채울 수도 있습니다.
- **Title**
- **Event photo** -- **Add Photo**(또는 빈 사진 상자)를 클릭하여 이미지를 고르거나 업로드합니다. 이미지는 넓은 16:9 비율로 잘립니다. **Change Photo**를 클릭하면 바꿀 수 있습니다. 이 사진은 웹사이트의 이벤트 페이지 상단에 표시되며, 캘린더 요소가 **Upcoming events**를 보여 줄 때는 해당 타일로도 표시됩니다([웹사이트에 이벤트 표시하기](#showing-events-on-your-website) 참조).
- **Description** -- 웹사이트의 이벤트 페이지에 표시됩니다. 굵은 글씨, 목록, 링크를 지원합니다.
- **Start**와 **End**, **Repeats**, **Visibility**(**Public** 또는 **Private**).
- **Tags** -- `youth, students`처럼 쉼표로 구분한 라벨입니다. 웹사이트의 캘린더 요소를 특정 태그가 있는 이벤트만 보이도록 설정할 수 있습니다. 이벤트의 등록 설정에 있는 것과 같은 **Tags** 필드입니다.
- **Who can view notes**와 **Who can post notes** -- 이벤트 메모를 읽고 추가할 수 있는 사람입니다([이벤트 메모](#event-notes) 참조). **Staff only**(기본값), **Group leaders**(이벤트 그룹의 리더), **Group members**(리더를 포함하여 이벤트 그룹의 모든 구성원) 중에서 고를 수 있습니다.
- **Rooms**와 **Resources** -- 이벤트에 공간과 장비를 예약합니다. [공간, 자원 및 일정 관리](./rooms-resources.md)를 참조하세요. 하나를 고르면 준비 및 정리 시간이나 사용자 지정 예약 기간도 추가할 수 있습니다. [공간 또는 자원 예약하기](./availability.md#booking-a-room-or-resource)를 참조하세요.
- **Reminders** -- 이 섹션을 펼치면 이벤트 전에 알림을 보낼 수 있습니다. [이벤트 알림](./event-reminders.md)을 참조하세요.

**Group**, **Title**, **Start**, **End**는 필수 항목이며, End는 Start 이후여야 합니다. **Save**를 클릭합니다. 이벤트가 반복되는 경우 저장하면 시리즈의 모든 회차가 업데이트되므로 B1이 확인을 요청합니다. 이벤트를 삭제하려면 편집기에서 열고 **Delete**를 클릭합니다.

### 이벤트 메모 {#event-notes}

각 이벤트에는 계획과 후속 조치를 위한 메모 스레드가 있습니다. 캘린더 상세 페이지에서 이벤트를 클릭하면 대화상자에 이벤트 세부 정보, 알림, 그리고 아래의 **Notes**가 나타나며, **Edit**, **Manage Registrations**, **Remove from Calendar** 버튼도 있습니다. 메모를 입력하고 게시하면 스레드에 추가됩니다.

콘텐츠 편집 권한이나 캘린더 관리 권한이 있는 직원은 언제나 이벤트 메모를 읽고 게시할 수 있습니다. 이벤트의 **Who can view notes**와 **Who can post notes** 설정은 이벤트 그룹의 리더나 구성원도 메모를 읽고 게시할 수 있는지를 결정합니다.

### 웹사이트에 이벤트 표시하기 {#showing-events-on-your-website}

웹사이트에 캘린더를 넣으려면 페이지에 **Calendar** 요소를 추가하고 이 캘린더를 선택합니다. 이 요소는 월간 캘린더나 다가오는 이벤트 타일 격자를 보여 줄 수 있으며, 태그 하나가 있는 이벤트로만 제한할 수도 있습니다. 방문자가 이벤트를 클릭하면 그 이벤트의 페이지가 열립니다. [Calendar 요소 사용하기](../website/page-editor.md#using-the-calendar-element)를 참조하세요.

## 이벤트 등록 켜기 {#enabling-event-registration}

모든 캘린더 이벤트에 등록을 켤 수 있으며, 그러면 구성원이 B1 웹사이트나 모바일 앱에서 신청할 수 있습니다.

1. 캘린더에서 기존 이벤트를 클릭하고(필요하면 먼저 만듭니다) **Manage Registrations**를 클릭합니다. 이벤트의 등록 페이지가 열립니다. (**Registrations** 페이지의 **Turn on registration** 버튼을 누르면 캘린더 목록으로 이동해 이벤트를 고를 수 있습니다.)
2. **Edit settings**를 클릭한 뒤 **Registration Settings** 카드에서 **Enable Registration**을 켭니다.
3. 등록 설정을 구성합니다.
   - **Capacity**(선택) -- 최대 등록 인원을 설정합니다. 무제한이면 비워 둡니다.
   - **Registration Opens** -- 등록을 시작할 날짜와 시각입니다.
   - **Registration Closes** -- 등록을 마감할 날짜와 시각입니다.
   - **Tags** -- 등록 가능한 이벤트를 분류하는 데 쓰는 쉼표 구분 라벨입니다(예: "youth, retreat, vbs").
   - **Registration Questions** -- 선택 사항으로 [양식](../forms/creating-forms.md)을 연결하면, 신청자가 등록의 일부로 추가 질문(식이 제한, 티셔츠 사이즈, 비상 연락처 등)에 답할 수 있습니다. 질문을 넣지 않으려면 **None**을 고릅니다.
   - **Enable Waitlist** -- 이벤트가 가득 차면 신청자를 돌려보내는 대신 대기자 명단에 추가할 수 있게 합니다. [유료 등록](./paid-registrations.md#waitlist)을 참조하세요.
4. **Save Settings**를 클릭합니다.

유료 이벤트의 경우, 같은 설정 페이지에서 가격이 있는 **Attendee Types**, 선택 사항인 **Selections**(추가 옵션), **Discount Codes**를 정의할 수 있으며, 결제는 교회의 헌금 결제 제공자를 통해 받습니다. 전체 과정은 [유료 등록](./paid-registrations.md)을 참조하세요.

등록을 켜면 구성원이 [B1.church나 B1 앱](../../b1-church/events/registering.md)에서 이벤트를 볼 때 **Register for this Event** 버튼이 표시됩니다. 양식을 연결했다면 신청자는 등록 중 **Questions** 단계를 거치며, 그 답변이 등록과 함께 저장됩니다.

:::info
Registration Questions는 Restricted로 표시되지 **않은** 양식에서만 작동합니다. Restricted 양식은 표시되지 않고 등록 중에 자동으로 건너뛰므로, 이벤트에 질문을 연결할 때는 제한이 없는 양식을 사용하세요.
:::

### 등록 관리하기 {#managing-registrations}

이벤트의 등록을 보고 관리하려면 다음과 같이 하세요.

1. 점프 메뉴에서 **Calendars > Registrations**를 선택합니다.
2. 등록이 켜진 모든 이벤트의 표가 나타나며, 이벤트 제목, 날짜, 현재 등록 인원과 정원, 태그가 표시됩니다. **Search events**에 입력하면 목록을 거를 수 있습니다.
3. 이벤트 이름을 클릭하면 **Name**, **Members**, **Type**, **Paid / Total**, **Status**, **Date** 열이 있는 전체 등록 목록이 나타납니다.
4. 상세 페이지에서 다음을 할 수 있습니다.
   - **Add Attendee** -- 오프라인이나 전화로 신청한 사람을 직접 등록합니다.
   - 개별 등록에서 **Cancel Registration**(확인을 요청함)
   - 등록을 영구적으로 **Delete**(확인을 요청함)
   - 자리가 생기면 대기자 등록을 **Promote**(올리기)
   - **Export CSV** -- 참석자 유형, 선택 항목, 결제 금액, 질문 답변을 포함한 모든 등록을 내려받습니다.

   이 행 작업들은 각 행 끝의 아이콘이며, 아이콘에 마우스를 올리면 이름을 볼 수 있습니다.

이벤트에 등록 질문이 연결되어 있으면 상세 페이지에는 아직 답하지 않은 등록자를 빠르게 찾는 **Unanswered questions only** 필터도 표시되며, 답변한 각 등록에는 응답을 보는 **View Answers** 버튼이 있습니다. 참석자 유형이 있는 이벤트는 표 위에 유형별 인원도 표시되며, 각 행에는 결제 정보가 담긴 **Registration Details** 대화상자가 있습니다. [유료 등록의 등록 명단](./paid-registrations.md#the-registration-roster)을 참조하세요.

상세 페이지 왼쪽에는 등록된 인원(등록자와 그 등록에 포함된 모든 사람)이 정원 막대와 함께 표시되고, 대기자 수, 이벤트의 태그, **Reminders**도 함께 보입니다. **Registrations** 카드 제목은 대신 등록 건수를 세며, 정원 제한은 이 건수에 적용됩니다. 그래서 네 명으로 이루어진 가족은 등록 한 건이지만 사람은 네 명입니다.

:::tip
등록 페이지의 정원 진행 막대를 보면 이벤트가 얼마나 빨리 차고 있는지 확인할 수 있습니다. 이벤트가 정원에 도달하거나 넘으면 막대가 빨간색으로 바뀝니다.
:::

## 다음 단계 {#next-steps}

- [큐레이션 캘린더](./curated-calendar.md) -- 여러 그룹에서 이벤트를 가져오는 캘린더 만들기
- [유료 등록](./paid-registrations.md) -- 참석자 유형, 추가 옵션 선택, 할인 코드, 결제, 대기자 명단
- [이벤트 등록 안내](../guides/event-registration.md) -- 이벤트 등록 설정을 단계별로 안내
- [캘린더 개요](./index.md) -- 캘린더 개요로 돌아가기
