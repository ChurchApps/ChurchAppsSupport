---
title: "B1 Admin의 실시간 스트리밍 시간 및 설정"
sidebar_label: "실시간 스트리밍"
description: "B1 Admin에서 매주 또는 일회성 실시간 스트림 예배를 예약하고, 채팅과 조기 영상 시간을 설정하고, YouTube 채널을 연결하고, 임베드 문제를 해결하세요."
---

# 실시간 스트리밍

<div class="article-intro">

실시간 스트리밍 시간 페이지에서는 교회의 스트리밍 일정을 구성하고, 예배 시간을 관리하며, 시청자 경험을 맞춤 설정할 수 있습니다. 매주 반복되는 예배나 일회성 행사를 설정하고, 채팅 및 영상 설정을 구성하며, 스트림이 언제 시작될지 조절할 수 있습니다.

</div>

## 교육 동영상 {#training-video}

<YouTube id="tpEY-sEYW6A" title="B1에서 실시간 스트리밍 설정하기" next="B1에서 교회 멤버 앱 맞춤 설정하기" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- 역할의 **Content**(콘텐츠) 섹션에서 **Edit Services**(예배 편집) 권한이 필요합니다. 접근 권한이 없다면 [역할 및 권한](../settings/roles-permissions.md)을 참고하세요.
- 자동 실시간 스트리밍을 사용할 계획이라면 YouTube 채널 ID를 준비하세요
- 스트림 소스로 사용할 [설교](./managing-sermons.md)나 영구 실시간 URL을 최소 하나 추가하세요

</div>

실시간 스트리밍은 점프 메뉴의 **Sermons**(설교) 섹션에 있는 두 페이지에서 관리합니다. 실시간 스트림 일정을 관리하는 **Live Stream Times**(실시간 스트리밍 시간)와 스트리밍 페이지의 탭을 설정하는 **Settings**(설정)입니다.

## 예배 관리 {#managing-services}

### 예배 추가하기 {#adding-a-service}

1. B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Sermons**를 펼친 다음 **Live Stream Times**를 클릭하세요.
2. 페이지 상단의 **Add Service**(예배 추가) 버튼을 클릭하여 새 예약 예배를 만드세요. 기존 예배는 표에 나열되며, 각 예배의 이름(매주 반복되는 예배에는 **Weekly**(매주) 배지가 표시됨), 시간, 제공자, 길이가 보입니다. 행 위에 마우스를 올리고 편집 아이콘을 클릭하면 수정할 수 있습니다.
3. **Service Name**(예배 이름)을 입력하세요(예: "Sunday Morning"(일요일 아침)). 새 예배는 "Sunday Morning"으로 시작합니다.
4. **Service Time**(예배 시간)을 설정하세요. 예배가 시작될 날짜와 시간을 선택합니다. 새 예배는 다음 일요일 오전 9시로 시작합니다.
5. 정기 주간 예배라면 **Recurs Weekly**(매주 반복)를 **Yes**(**Weekly**(매주))로, 일회성 행사라면 **No**(**One-time**(일회성))로 설정하세요.

### 채팅 및 영상 설정 구성하기 {#configuring-chat-and-video-settings}

6. **Chat Settings**(채팅 설정)에서 **Enable Chat - Minutes Before**(채팅 활성화 - 시작 전 분)와 **Enable Chat - Minutes After**(채팅 활성화 - 시작 후 분)를 설정하세요. 예배 전후로 몇 분 동안 채팅을 활성화할지 정합니다(새 예배는 각각 10분). 이렇게 하면 시청자가 예배 시작 전에 채팅을 시작하고 예배 후에도 계속할 수 있습니다. 각 칸 옆의 시간은 채팅이 열리고 닫히는 시점을 보여줍니다.
7. **Video Settings**(영상 설정)에서 **Start Video Early**(영상 조기 시작)를 설정하세요. 카운트다운이나 예배 전 콘텐츠를 위해 영상 스트림을 몇 분 일찍 시작할지 정합니다. 채팅은 조기 영상이 시작되기 *전에* 그 분 수만큼 먼저 열리므로, 채팅의 시작 전 분 설정 옆에 표시되는 시간은 두 숫자를 모두 계산합니다. 예를 들어 10:00 예배에 채팅을 15분 전에 열고 영상을 5분 일찍 시작하면, 채팅은 9:40에 열립니다.
8. **Sermon**(설교) 드롭다운에서 재생할 항목을 선택하세요.
   - **Latest Sermon**(최신 설교) (**Auto**(자동)) -- 가장 최근에 추가한 영상을 자동으로 재생합니다.
   - 바로 다음에 나열되는 [영구 실시간 URL](#setting-up-your-youtube-live-stream) -- 각 URL은 채널 ID를 사용해 YouTube에서 채널의 현재 실시간 스트림을 재생합니다. 이름을 바꾸지 않으면 **Current Live Service**(현재 라이브 예배)로 표시됩니다.
   - 그 아래에는 이미 저장해 둔 특정 설교가 표시됩니다.
9. 예배를 예약하려면 **Save**(저장)를, 양식을 닫으려면 **Cancel**(취소)을 클릭하세요.

예배를 삭제하려면 해당 예배를 편집하고 **Delete**(삭제)를 클릭한 다음 확인하세요.

:::info
반복 설정된 예배는 매주 자동으로 업데이트됩니다. 일광 절약 시간제가 시작되거나 끝나도 현지 시간은 그대로 유지됩니다. 필요한 만큼 예배를 얼마든지 추가할 수 있습니다. 시청자가 스트리밍 페이지를 방문하면 다음 예정 예배 시간을 볼 수 있습니다.
:::

## 스트리밍 페이지 설정 {#streaming-page-settings}

실시간 스트림 옆에 표시되는 탭과 링크를 맞춤 설정하려면 점프 메뉴를 열고 **Sermons**를 펼친 다음 **Settings**를 클릭하세요. **Stream Settings**(스트림 설정) 페이지에는 시청자에게 보이는 순서대로 **Content Tabs**(콘텐츠 탭) 목록이 표시됩니다. 외부 링크 탭은 클릭하면 새 브라우저 탭에서 링크를 엽니다.

### 탭 추가하기 {#adding-tabs}

1. **Add**(추가) 버튼을 클릭하여 실시간 스트림 페이지에 새 탭을 추가하세요. **Create New Tab**(새 탭 만들기) 대화 상자가 열립니다.
2. **Tab Text**(탭 텍스트) 상자에 탭 이름을 입력하고, 아이콘 버튼을 클릭하여 **Icon**(아이콘)을 선택하세요.
3. **Link Type**(링크 유형)을 선택하세요. 사용자 지정 링크라면 **External URL**(외부 URL)(기본값)을, 기본 제공되는 **Chat**(채팅) 또는 **Prayer**(기도) 탭 중 하나를 선택하세요.
4. 외부 URL 탭이라면 **External URL** 상자에 주소를 입력하세요. 채팅과 기도 탭은 추가로 입력할 필요가 없습니다.
5. **Save Tab**(탭 저장)을 클릭하세요. 새 탭은 목록의 맨 끝에 추가됩니다.

설정한 탭은 시청자가 추가 자료와 상호작용 기능을 이용할 수 있도록 실시간 스트리밍 페이지에 표시됩니다.

### 탭 편집, 순서 변경, 삭제하기 {#editing-reordering-and-deleting-tabs}

탭 위에 마우스를 올리고 버튼을 사용하세요.

- **Move up**(위로 이동)과 **Move down**(아래로 이동) 화살표 -- 탭의 순서를 바꿉니다.
- **Edit**(편집)(연필 아이콘) -- 탭의 텍스트, 아이콘, 유형 또는 URL을 변경한 다음 **Save Tab**을 클릭하세요. 탭을 삭제하려면 **Delete**를 클릭하고 **Delete Tab**(탭 삭제) 대화 상자에서 확인하세요.

### 스트림 미리 보기 {#previewing-your-stream}

**Live Stream Times** 페이지에서 페이지 상단의 **View Your Stream**(내 스트림 보기)을 클릭하면, 로고, 예배 시간, 설정한 탭을 포함하여 실시간 스트리밍 페이지가 시청자에게 어떻게 보이는지 정확히 확인할 수 있습니다.

## YouTube 실시간 스트림 설정하기 {#setting-up-your-youtube-live-stream}

자동 실시간 스트리밍을 위해 YouTube 채널을 연결하려면:

1. **Sermons**로 가서 **Add Sermon**(설교 추가)을 클릭한 다음 **Add Permanent Live URL**(영구 실시간 URL 추가)을 선택하세요. **Edit Permanent Live Url**(영구 실시간 URL 편집) 양식이 열립니다.
2. **Video Provider**(영상 제공자)의 기본값은 **Current YouTube Live Stream**(현재 YouTube 실시간 스트림)입니다. **YouTube Channel ID**(YouTube 채널 ID)를 입력하세요(채널 URL이 아닙니다. 도움이 필요하면 **Get Your Channel Id**(채널 ID 확인하기)를 클릭하세요).
3. 제목은 **Current Live Service**로 시작합니다. 원하면 변경하고 설명을 추가한 다음 **Save**를 클릭하세요. 영구 실시간 URL에는 재생 목록이나 게시일이 없습니다.
4. **Live Stream Times**에서 예배를 만들고 **Sermon** 드롭다운에서 영구 실시간 URL을 선택하세요.

:::tip
YouTube 채널 ID를 찾으려면 YouTube 채널의 고급 설정으로 가서 Channel ID 값을 복사하세요.
:::

## 색상 및 로고 맞춤 설정 {#customizing-colors-and-logo}

실시간 스트리밍 페이지는 웹사이트의 [모양](../website/appearance.md) 설정을 사용합니다.

- **밝은 강조 색**과 어두운 글자 색은 헤더에 사용됩니다.
- **어두운 강조 색**과 밝은 글자 색은 사이드바에 사용됩니다.
- **Light Background Logo**(밝은 배경 로고)가 스트리밍 페이지에 표시됩니다. 배경이 투명하고 가로세로 비율이 4:1인 이미지를 사용하세요.

이를 변경하려면 **Website**(웹사이트)에서 **Appearance**(모양)로 이동하여 [색상 팔레트](../website/appearance.md#color-palette)와 [로고](../website/appearance.md#logo-and-branding) 설정을 업데이트하세요.

## 스트리밍 호스트 추가하기 {#adding-streaming-hosts}

팀원이 공개 채팅과 함께 호스트 전용 채팅에 접근할 수 있도록 하려면:

1. 점프 메뉴에서 **Settings > Roles**(설정 > 역할)를 선택하세요.
2. **Add role**(역할 추가)을 클릭하고 **Add Custom Role**(사용자 지정 역할 추가)을 선택하세요.
3. 역할 이름을 "Streaming Host"(스트리밍 호스트)로 지정하고 **Save**를 클릭하세요.
4. 새 역할을 클릭한 다음, 역할의 구성원 목록에서 사람을 검색하여 추가하세요([역할에 사용자 추가하기](../settings/roles-permissions.md#adding-users-to-a-role) 참고).
5. 아래로 스크롤하여 **Edit Permissions**(권한 편집)로 이동하고, **Content**(콘텐츠) 섹션을 펼친 다음 **Host Chat**(호스트 채팅)을 체크하세요.

호스트가 실시간 스트림 페이지에 로그인하면, 방송 중에 직원만 나누는 대화를 위해 공개 채팅 옆에 비공개 **Host Chat**(호스트 채팅) 탭이 나타납니다.

:::info
역할 생성과 권한 관리에 대한 자세한 내용은 [역할 및 권한](../settings/roles-permissions.md)을 참고하세요.
:::

## 문제 해결 {#troubleshooting}

Channel ID와 함께 "Current YouTube Live Stream"(현재 YouTube 실시간 스트림) 옵션을 사용했을 때 자동 YouTube 실시간 스트림이 올바르게 표시되지 않으면 다음을 시도해 보세요.

**증상:**
- 실시간 스트림 임베드에 "Video unavailable"(영상을 사용할 수 없음)이 표시됨
- 페이지는 로드되지만 영상이 나타나지 않음
- YouTube 직접 임베드는 작동하지만, 채널의 자동 실시간 스트림은 작동하지 않음

**해결 방법:**
YouTube 채널에서 오래되었거나 예정된 실시간 스트림이 있는지 확인하고 삭제하세요.

1. YouTube 스튜디오로 이동하세요.
2. **Content**(콘텐츠)에서 **Live**(실시간)로 이동하세요.
3. 오래된 예약 라이브나 예정된 스트림이 있는지 확인하세요.
4. 이 오래되었거나 예약된 실시간 스트림 항목을 삭제하세요.
5. 실시간 스트리밍 페이지를 다시 테스트하세요.

:::warning
채널에 예약되었거나 지난 실시간 스트림 항목이 여러 개 있으면 YouTube의 자동 채널 실시간 스트림 임베드가 차단될 수 있습니다. 이 항목들을 삭제하면 YouTube가 현재 실시간 스트림을 올바르게 인식하고 제공할 수 있습니다.
:::

**추가 요구 사항:**
- 실시간 스트림은 **Public**(공개)으로 설정되어야 합니다(Unlisted(일부 공개)나 Private(비공개)이 아님).
- YouTube 스트림 설정에서 임베드가 허용되어 있어야 합니다.
- **Current YouTube Live Stream**(현재 YouTube 실시간 스트림) 제공자(Channel ID 사용)를 사용하고 있는지 확인하세요. **YouTube** 제공자(Video ID 사용)가 아닙니다.

## 다음 단계 {#next-steps}

- [설교 관리](./managing-sermons.md) -- 라이브러리에 설교 추가
- [재생 목록](./playlists.md) -- 설교를 시리즈로 정리
