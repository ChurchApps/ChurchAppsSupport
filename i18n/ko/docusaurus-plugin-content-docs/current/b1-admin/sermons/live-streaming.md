---
title: "라이브 스트리밍"
---

# 라이브 스트리밍

<div class="article-intro">

Live Stream Times 페이지를 사용하면 교회의 스트리밍 일정을 구성하고, 서비스 시간을 관리하며, 시청자 환경을 사용자 지정할 수 있습니다. 반복되는 주간 서비스 또는 일회성 행사를 설정하고, 채팅 및 동영상 설정을 구성하며, 스트림이 언제 시작되는지 제어하세요.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **contentApi.streamingServices.edit** 권한이 필요합니다. 접근권이 없으면 [Roles & Permissions](../settings/roles-permissions.md)을 참고하세요.
- 자동화된 라이브 스트리밍을 사용하려면 YouTube Channel ID를 준비하세요.
- 스트림 소스로 사용할 [설교](managing-sermons) 또는 영구 라이브 URL을 최소 하나 추가하세요.

</div>

페이지에는 두 개의 주요 탭이 있습니다: 라이브 스트림 일정을 관리하는 **Services**와 스트리밍 페이지를 구성하는 **Settings**.

## 서비스 관리

### 서비스 추가

1. B1 Admin에서 B1 Admin의 왼쪽 상단에 있는 검색 모음인 [Jump 메뉴](../introduction.md#getting-around-with-the-jump-menu)를 열고 **Sermons**을 확장한 다음 **Live Stream Times**를 클릭하세요.
2. **Add Service** 버튼을 클릭하여 새로운 예약된 서비스를 만드세요.
3. **Service Name**을 입력하세요(예: "Sunday Morning").
4. **Service Time**을 설정하세요 -- 서비스가 시작되는 요일과 시간을 선택하세요.
5. **Recurs Weekly**를 정기적인 주간 서비스의 경우 **Yes**로, 일회성 행사의 경우 **No**로 설정하세요.

### 채팅 및 동영상 설정 구성

6. **Chat Settings** 아래에서 서비스 전후로 채팅이 활성화되어야 하는 분 수를 설정하세요. 이렇게 하면 방문자가 서비스가 시작되기 전에 채팅을 시작하고 이후에 계속할 수 있습니다.
7. **Video Settings** 아래에서 카운트다운 또는 서비스 전 콘텐츠를 위해 동영상 스트림을 시작하는 시간을 설정하세요.
8. 드롭다운에서 재생할 설교를 선택하세요:
   - **Latest Sermon** -- 자동으로 가장 최근에 추가한 동영상을 재생합니다.
   - **Current Live Service** -- YouTube Channel ID를 사용하여 YouTube의 현재 라이브 스트림을 재생합니다.
   - 이미 저장한 특정 설교를 선택할 수도 있습니다.
9. **Save**를 클릭하여 서비스를 예약하세요.

:::info
설정이 반복되는 경우 서비스가 매주 자동으로 업데이트됩니다. 필요한 만큼 많은 서비스를 추가할 수 있습니다. 방문자는 스트리밍 페이지를 방문할 때 다음에 예약된 서비스 시간을 볼 수 있습니다.
:::

## 스트리밍 페이지 설정

**Settings** 탭을 클릭하여 라이브 스트림 옆에 나타나는 탭 및 링크를 사용자 지정하세요.

### 탭 추가

1. **Add** 버튼을 클릭하여 라이브 스트림 페이지에 새 탭을 추가하세요.
2. 미리 설계된 **Chat** 탭을 선택하거나 외부 URL을 사용하는 사용자 지정 탭을 추가하세요.
3. Chat 탭의 경우, **Tab Text** 상자에 이름만 지정하면 설정이 완료됩니다.
4. 링크된 탭의 경우, 탭 이름을 입력하고, 아이콘 버튼을 클릭하여 아이콘을 선택하고, URL을 입력하세요.
5. 구성된 탭이 라이브 스트리밍 페이지에 나타나 시청자가 추가 자원 및 대화형 기능에 접근할 수 있습니다.

### 스트림 미리보기

**View Your Stream** 버튼을 클릭하여 로고, 서비스 시간 및 구성된 탭을 포함하여 라이브 스트리밍 페이지가 방문자에게 어떻게 보일지 정확히 보세요.

## YouTube 라이브 스트림 설정

자동 라이브 스트리밍을 위해 YouTube 채널을 연결하려면:

1. **Sermons**으로 이동하고 **Add Sermon**을 클릭한 다음 **Add Permanent Live URL**을 선택하세요.
2. 동영상 제공자는 기본값이 **Current YouTube Live Stream**입니다. **YouTube Channel ID**를 입력하세요.
3. 제목과 설명을 추가한 다음 **Save**를 클릭하세요.
4. **Live Stream Times**에서 서비스를 만들고 설교 드롭다운에서 영구 라이브 URL을 선택하세요.

:::tip
YouTube Channel ID를 찾으려면, YouTube 채널의 고급 설정으로 이동하여 Channel ID 값을 복사하세요.
:::

## 색상 및 로고 사용자 지정

라이브 스트림 페이지는 웹사이트의 [Appearance](../website/appearance) 설정을 사용합니다:

- **밝은 강조 색상**은 어두운 텍스트와 함께 헤더에 사용됩니다.
- **어두운 강조 색상**은 밝은 텍스트와 함께 사이드바에 사용됩니다.
- **Light Background Logo**가 스트리밍 페이지에 나타납니다. 투명한 배경과 4:1 종횡비가 있는 이미지를 사용하세요.

이를 변경하려면, **Website** 다음 **Appearance**로 이동하고 [Color Palette](../website/appearance#color-palette) 및 [Logo](../website/appearance#logo-and-branding) 설정을 업데이트하세요.

## 스트리밍 호스트 추가

팀 멤버에게 공개 채팅 옆에 있는 호스트 전용 채팅에 접근할 수 있도록 하려면:

1. Jump 메뉴에서 **Settings > Roles**를 선택하세요.
2. 더하기 버튼을 클릭하고 **Add Custom Role**을 선택하세요.
3. 역할을 "Streaming Host"로 이름을 지으세요 그리고 **Save**를 클릭하세요.
4. 새 역할을 클릭한 다음, Members 섹션에서 **Add**를 클릭하여 사람을 추가하세요.
5. **Edit Permissions**까지 아래로 스크롤하고, **Content** 섹션을 확장한 다음, **Host Chat**을 선택하세요.

호스트가 라이브 스트림 페이지에 로그인하면, 공개 채팅 옆에 방송 중 직원 전용 대화를 위한 비공개 **Host Chat** 탭이 나타납니다.

:::info
역할 생성 및 권한 관리에 대한 자세한 내용은 [Roles & Permissions](../settings/roles-permissions.md)을 참고하세요.
:::

## 문제 해결

"Current YouTube Live Stream" 옵션을 Channel ID와 함께 사용할 때 자동화된 YouTube 라이브 스트림이 올바르게 표시되지 않으면 다음을 시도하세요:

**증상:**
- 라이브 스트림 임베드가 "Video unavailable" 표시
- 페이지가 로드되지만 동영상이 나타나지 않음
- 직접 YouTube 임베드는 작동하지만 자동화된 채널 라이브 스트림은 작동하지 않음

**해결책:**
오래된 또는 예정된 예약된 라이브 스트림에 대한 YouTube 채널을 확인하고 삭제하세요:

1. YouTube Studio로 이동하세요.
2. **Content** 다음 **Live**로 이동하세요.
3. 오래되었거나 예정된 예약된 라이브 스트림을 찾으세요.
4. 이 오래된 또는 예정된 라이브 스트림 항목을 삭제하세요.
5. 라이브 스트림 페이지를 다시 테스트하세요.

:::warning
YouTube의 자동화된 채널 라이브 스트림 임베드는 채널에 여러 개의 예약되었거나 과거 라이브 스트림 항목이 있을 때 차단될 수 있습니다. 이를 제거하면 YouTube가 현재 라이브 스트림을 올바르게 식별하고 제공할 수 있게 합니다.
:::

**추가 요구사항:**
- 라이브 스트림은 **Public**으로 설정해야 합니다(Unlisted 또는 Private이 아님).
- YouTube 스트림 설정에서 임베딩이 허용되어야 합니다.
- **Current YouTube Live Stream** 제공자(Channel ID 포함)를 사용하고 있는지 확인하세요. **YouTube** 제공자(Video ID)가 아닙니다.

## 다음 단계

- [Managing Sermons](managing-sermons) -- 라이브러리에 설교 추가
- [Playlists](playlists) -- 설교를 시리즈로 구성
