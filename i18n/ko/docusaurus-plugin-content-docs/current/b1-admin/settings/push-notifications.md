---
title: "푸시 알림"
---

# 푸시 알림

<div class="article-intro">

**Push Notifications** 페이지에서 교회의 B1.church 앱을 사용하는 모든 사람, 또는 한 그룹에게 푸시 알림을 바로 보내거나 원하는 시간에 예약해 보낼 수 있습니다. 또한 발송을 기다리는 알림 목록을 보여 주어 수정, 발송, 취소를 할 수 있고, 최근 알림이 어떻게 전달되었는지도 확인할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Everyone with the app**(앱 사용자 모두)에게 보내려면 **Edit Content** 권한이 필요합니다. 그룹에게 보내려면 **Edit Group Members** 권한이 필요합니다. 둘 중 하나만 있어도 **Mobile** 아래에 **Push Notifications** 페이지가 나타납니다. [역할 및 권한](./roles-permissions.md)을 참고하세요.
- 알림은 [B1.church 앱](/docs/b1-church/getting-started/installing-pwa)을 설치하고 알림을 허용한 회원에게만 전달됩니다.

</div>

## 페이지 열기

1. B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 위의 검색창)를 열고 **Mobile**을 펼치세요.
2. **Push Notifications**(`/mobile/notifications`)를 클릭하세요.

페이지의 모든 시간은 교회의 시간대(교회에 시간대가 없으면 브라우저의 시간대)로 표시됩니다. 페이지에는 어떤 시간대를 사용하는지 표시되며, 예를 들면 *"시간은 America/Chicago 기준입니다."*처럼 나타납니다.

## 알림 보내기 또는 예약하기

1. 페이지 위의 **Send Notification**을 클릭하세요.
2. **Audience**(대상)에서 **Everyone with the app**(앱 사용자 모두) 또는 그룹 중 하나를 고르세요.
3. 알림 내용을 입력하세요.
   - **Title**(제목) *(필수)* -- 짧은 요약으로 최대 80자입니다.
   - **Message**(메시지) *(필수)* -- 알림 본문으로 최대 240자입니다.
   - **Open link or flyer URL**(열 링크 또는 전단 URL) *(선택)* -- 알림을 누르면 열리는 앱 내 상대 경로(예: `/mobile/groups`) 또는 전체 `https://` URL입니다. 링크가 없으면 교회 전체 알림은 교인의 알림 목록을 열고, 그룹 알림은 그 그룹을 엽니다.
   - **Image URL**(이미지 URL) *(선택)* -- 지원되는 기기에서 알림과 함께 보이는 `https://` 이미지입니다.
4. **When**(언제)에서 **Send now**(지금 보내기)를 고르거나, **Schedule for later**(나중에 예약)를 고른 다음 **Send at**(발송 시각)의 날짜와 시간을 고르세요. 시간은 미래여야 합니다.
5. **Send Notification**(또는 예약하는 경우 **Schedule Notification**)을 클릭하세요.

대화상자의 미리 보기에는 알림이 어떻게 보일지와, 몇 명이 받을 수 있는지가 표시됩니다. 지금 보내는 알림은 최소 한 명이 받을 수 있어야 합니다. 예약한 알림은 아무도 아직 받을 수 없는 상태여도 저장할 수 있습니다. 발송될 때 수신자를 다시 확인하기 때문입니다.

예약한 뒤에는 대화상자가 발송 시각을 확인해 주고, **Mobile > Push Notifications**에서 알림을 보거나 수정하거나 취소할 수 있다고 알려 줍니다.

:::tip
그룹 페이지의 **Notify** 버튼으로 그 그룹에게만 알림을 보내거나 예약할 수도 있습니다. [그룹 구성원에게 푸시 알림 보내기](../groups/group-members.md#sending-push-notifications-to-group-members)를 참고하세요.
:::

## 예약된 알림 관리하기

**Scheduled**(예약됨) 카드에는 발송을 기다리는 알림이 **Send at**(발송 시각), **Audience**(대상), **Notification**(알림 내용)과 함께 나열됩니다. 각 알림에는 세 가지 작업이 있습니다.

- **Edit**(수정) -- 제목, 메시지, 링크, 이미지, 발송 시각을 바꿉니다. 대상은 바꿀 수 없으므로, 대상을 바꾸려면 알림을 취소하고 새로 만드세요.
- **Send now**(지금 보내기) -- 기다리지 않고 바로 보냅니다. **Send now**를 눌러 확인하세요.
- **Cancel**(취소) -- 발송을 멈춥니다. **Cancel notification**을 눌러 확인하세요.

기다리는 알림이 없으면 카드에 *"예약된 알림이 없습니다."*(Nothing is scheduled.)라고 표시됩니다.

## 최근 알림 확인하기

**Recent**(최근) 카드에는 발송되었거나 중단된 알림이 **Sent at**(발송 시각), **Audience**(대상), **Notification**(알림 내용), **Status**(상태)와 함께 나열됩니다.

- **Sent: X of Y**(발송됨: Y명 중 X명) -- 대상 중 몇 명에게 도달했는지를 보여 줍니다.
- **Failed**(실패) -- 발송에 실패했으며, 오류 내용이 함께 표시됩니다. B1은 실패한 발송을 최대 세 번까지 다시 시도한 뒤 실패로 표시합니다.
- **Cancelled**(취소됨) -- 발송 전에 누군가 취소했습니다.
- **Missed (the send time passed)**(놓침, 발송 시각이 지남) -- 발송 시각으로부터 30분 안에 발송되지 못했습니다. 늦게 보내지 않고 건너뛰었습니다.

## 누가 알림을 받나요

- **Everyone with the app**(앱 사용자 모두)은 교회에서 B1.church 앱을 설치하고 알림을 허용한 모든 사람에게 도달합니다. 보낸 사람 본인은 제외됩니다.
- 그룹 알림은 그 그룹의 구성원 중 앱을 설치하고 알림을 허용한 사람에게 도달합니다.
- **Church Announcements**(교회 공지)에 대한 푸시를 [알림 설정](/docs/b1-church/getting-started/notification-preferences)에서 끈 회원은 교회 전체 알림을 받지 않습니다.

## 관련 문서

- [그룹 구성원에게 푸시 알림 보내기](../groups/group-members.md#sending-push-notifications-to-group-members)
- [모바일 앱 설정](./mobile-app.md)
- [행사 알림](../calendars/event-reminders.md)
- [알림 설정](/docs/b1-church/getting-started/notification-preferences)
