---
title: "B1 Admin의 라이브 스트림 시간 및 설정"
sidebar_label: "생방송"
description: "주간 또는 일회성 라이브 스트림 예배를 예약하고, 채팅 및 영상 조기 시작 시간을 설정하며, YouTube 채널을 연결하고, B1 Admin에서 임베드 문제를 해결하세요."
---

# 생방송

<div class="article-intro">

Live Stream Times 페이지에서 교회의 송출 일정을 설정하고, 예배 시간을 관리하고, 시청자 화면을 꾸밀 수 있습니다. 매주 반복되는 예배나 일회성 행사를 설정하고, 채팅과 영상 설정을 구성하고, 생방송이 시작되는 시점을 조절하세요.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **contentApi.streamingServices.edit** 권한이 필요합니다. 접근 권한이 없다면 [역할 및 권한](../settings/roles-permissions.md)을 참고하세요.
- 자동 생방송을 쓰려면 YouTube 채널 ID를 준비하세요.
- 송출 원본으로 쓸 [설교](./managing-sermons.md) 또는 고정 생방송 URL을 최소한 하나 추가하세요.

</div>

생방송은 점프 메뉴의 **Sermons** 섹션에 있는 두 페이지에서 관리합니다. 생방송 일정을 관리하는 **Live Stream Times**와, 송출 페이지의 탭을 설정하는 **Settings**입니다.

## 예배 관리하기

### 예배 추가하기

1. B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 위의 검색창)를 열고 **Sermons**를 펼친 다음 **Live Stream Times**를 클릭하세요.
2. 페이지 위의 **Add Service** 버튼을 클릭해 새 예정 예배를 만드세요. 기존 예배는 이름, 시간, 제공자, 길이가 표시된 표로 나열됩니다. 행의 편집 아이콘을 클릭하면 바꿀 수 있습니다.
3. **Service Name**(예: "Sunday Morning")을 입력하세요.
4. **Service Time**을 설정하세요. 예배가 시작되는 요일과 시간을 고르세요.
5. 정기 예배라면 **Recurs Weekly**를 **Yes**로, 일회성 행사라면 **No**로 설정하세요.

### 채팅과 영상 설정하기

6. **Chat Settings**에서 예배 전후 몇 분 동안 채팅을 열어 둘지 설정하세요. 그러면 방문자가 예배 전에 대화를 시작하고 예배 후에도 계속 이야기할 수 있습니다.
7. **Video Settings**에서 카운트다운이나 예배 전 콘텐츠를 위해 영상을 몇 분 일찍 송출할지 설정하세요. 채팅은 이 일찍 시작하는 영상보다 *먼저* 그만큼 열리므로, 채팅의 '몇 분 전' 설정 옆에 표시되는 시간은 두 숫자를 모두 반영합니다. 예를 들어 10:00 예배에 채팅을 15분 전에 열고 영상을 5분 일찍 시작하면, 채팅은 9:40에 열립니다.
8. 드롭다운에서 재생할 설교를 고르세요.
   - **Latest Sermon** -- 가장 최근에 추가된 영상을 자동으로 재생합니다.
   - **Current Live Service** -- Channel ID를 사용해 YouTube에서 현재 생방송을 재생합니다.
   - 이미 저장해 둔 특정 설교를 고를 수도 있습니다.
9. **Save**를 클릭해 예배를 예약하세요.

:::info
반복으로 설정하면 예배가 매주 자동으로 갱신됩니다. 서머타임이 시작되거나 끝나도 현지 시각은 그대로 유지됩니다. 예배는 필요한 만큼 추가할 수 있습니다. 방문자가 송출 페이지를 열면 다음 예정 예배 시간이 보입니다.
:::

## 송출 페이지 설정

생방송 옆에 나타나는 탭과 링크를 꾸미려면, 점프 메뉴에서 **Sermons**를 펼치고 **Settings**를 클릭하세요. **Stream Settings** 페이지에 **Content Tabs** 목록이 나타납니다.

### 탭 추가하기

1. **Add** 버튼을 클릭해 생방송 페이지에 새 탭을 추가하세요.
2. **Link Type**을 고르세요. 사용자 지정 링크라면 **External URL**을, 미리 디자인된 **Chat**(채팅) 또는 **Prayer**(기도) 탭이라면 그중 하나를 고르세요.
3. Chat 탭은 **Tab Text** 상자에 이름만 입력하면 설정이 끝납니다.
4. 링크 탭이라면 탭 이름을 입력하고, 아이콘 버튼을 클릭해 아이콘을 고른 다음, URL을 입력하세요.
5. 설정한 탭은 생방송 페이지에 나타나, 시청자가 추가 자료와 상호작용 기능을 이용할 수 있습니다.

### 송출 미리 보기

**Live Stream Times** 페이지 위의 **View Your Stream**을 클릭하면, 로고, 예배 시간, 설정한 탭을 포함해 방문자에게 생방송 페이지가 정확히 어떻게 보일지 확인할 수 있습니다.

## YouTube 생방송 설정하기

YouTube 채널을 연결해 자동으로 생방송하려면 다음과 같이 하세요.

1. **Sermons**로 가서 **Add Sermon**을 클릭한 다음 **Add Permanent Live URL**을 고르세요.
2. 영상 제공자의 기본값은 **Current YouTube Live Stream**입니다. **YouTube Channel ID**를 입력하세요.
3. 제목과 설명을 입력한 다음 **Save**를 클릭하세요.
4. **Live Stream Times**에서 예배를 만들고, 설교 드롭다운에서 고정 생방송 URL을 고르세요.

:::tip
YouTube Channel ID를 찾으려면 YouTube 채널의 고급 설정으로 가서 Channel ID 값을 복사하세요.
:::

## 색상과 로고 꾸미기

생방송 페이지는 웹사이트의 [외관](../website/appearance.md) 설정을 사용합니다.

- 머리글에는 **밝은 강조 색**과 어두운 글자가 쓰입니다.
- 사이드바에는 **어두운 강조 색**과 밝은 글자가 쓰입니다.
- 생방송 페이지에 **Light Background Logo**가 나타납니다. 배경이 투명하고 가로세로 비율이 4:1인 이미지를 사용하세요.

이것들을 바꾸려면 **Website**, 그다음 **Appearance**로 가서 [색상 팔레트](../website/appearance.md#color-palette)와 [로고](../website/appearance.md#logo-and-branding) 설정을 업데이트하세요.

## 생방송 진행자 추가하기

팀원에게 공개 채팅과 함께 진행자 전용 채팅을 쓸 수 있게 하려면 다음과 같이 하세요.

1. 점프 메뉴에서 **Settings > Roles**를 선택하세요.
2. 더하기 버튼을 클릭하고 **Add Custom Role**을 고르세요.
3. 역할 이름을 "Streaming Host"로 정하고 **Save**를 클릭하세요.
4. 새 역할을 클릭한 다음, Members 섹션의 **Add**를 클릭해 사람을 추가하세요.
5. 아래로 스크롤해 **Edit Permissions**에서 **Content** 섹션을 펼치고 **Host Chat**을 체크하세요.

진행자가 생방송 페이지에 로그인하면, 방송 중 직원끼리만 대화할 수 있는 비공개 **Host Chat** 탭이 공개 채팅 옆에 나타납니다.

:::info
역할을 만들고 권한을 관리하는 자세한 방법은 [역할 및 권한](../settings/roles-permissions.md)을 참고하세요.
:::

## 문제 해결

채널 ID를 사용하는 "Current YouTube Live Stream" 옵션으로 자동 YouTube 생방송이 제대로 나타나지 않는다면 다음을 시도하세요.

**증상:**
- 생방송 임베드에 "Video unavailable"이 표시됨
- 페이지는 로드되지만 영상이 나타나지 않음
- YouTube 직접 임베드는 작동하지만, 자동 채널 생방송은 작동하지 않음

**해결 방법:**
YouTube 채널에서 오래되었거나 예정된 생방송이 있는지 확인하고 삭제하세요.

1. YouTube 스튜디오로 가세요.
2. **Content**, 그다음 **Live**로 이동하세요.
3. 오래되었거나 예약된 생방송이 있는지 찾으세요.
4. 이 오래된 항목이나 예약된 생방송 항목을 삭제하세요.
5. 생방송 페이지를 다시 테스트하세요.

:::warning
채널에 예약되었거나 지난 생방송 항목이 여러 개 있으면, YouTube의 자동 채널 생방송 임베드가 차단될 수 있습니다. 이것들을 지우면 YouTube가 현재 생방송을 올바르게 식별하고 제공할 수 있습니다.
:::

**추가 요건:**
- 생방송은 **Public**(공개)으로 설정되어야 합니다(Unlisted나 Private이 아님).
- YouTube 송출 설정에서 임베드가 허용되어 있어야 합니다.
- **Current YouTube Live Stream** 제공자(Channel ID 사용)를 쓰고 있는지 확인하세요. **YouTube** 제공자(Video ID 사용)가 아닙니다.

## 다음 단계

- [설교 관리하기](./managing-sermons.md) -- 설교 자료실에 설교 추가하기
- [재생 목록](./playlists.md) -- 설교를 시리즈로 정리하기
