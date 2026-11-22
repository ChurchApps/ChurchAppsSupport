---
title: "설교 관리"
description: "B1 Admin에서 설교 라이브러리를 관리하세요. YouTube, Vimeo 또는 Facebook에서 설교를 추가하고, 세부 정보를 편집하고, 교회를 위한 팟캐스트 피드를 받으세요."
---

# 설교 관리

<div class="article-intro">

설교 페이지에는 전체 설교 라이브러리가 표시됩니다. 여기에서 새 설교를 추가하고, 기존 항목을 편집하고, 재생 목록별로 콘텐츠를 정리할 수 있습니다. 각 설교는 YouTube, Vimeo, Facebook 또는 사용자 지정 URL에 호스팅된 영상이나 오디오에 연결할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 역할의 **Content**(콘텐츠) 섹션에서 **Edit Services**(예배 편집) 권한이 필요합니다. 접근 권한이 없다면 [역할 및 권한](../settings/roles-permissions.md)을 참고하세요.
- 설교를 정리할 [재생 목록](./playlists.md)을 최소 하나 만드세요
- YouTube, Vimeo 또는 Facebook의 영상 ID나 URL을 준비하세요

</div>

## 설교 라이브러리 보기 {#viewing-your-sermon-library}

1. B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Sermons**를 펼친 다음 **Sermons**를 클릭하세요.
2. 설교 페이지에는 설교 항목이 표로 표시됩니다. 각 설교의 **Playlist**(재생 목록), 제목(**Sermon**(설교)), **Publish Date**(게시일)가 최신순으로 나열되며, "11 of 11 sermons"(11개 중 11개 설교)와 같은 개수도 표시됩니다. **Search sermons by title or playlist...**(제목 또는 재생 목록으로 설교 검색...) 상자에 입력하여 목록을 필터링할 수 있습니다. 재생 목록은 표 옆의 **Playlists**(재생 목록) 패널에 나열되며, 그 아래에는 **Podcast Feed**(팟캐스트 피드) 패널이 있습니다.
3. 설교 행 위에 마우스를 올리고 **Edit**(편집)를 클릭하면 세부 정보를 보거나 편집할 수 있습니다.

## 설교 추가하기 {#adding-a-sermon}

1. 오른쪽 상단의 **Add Sermon**(설교 추가) 버튼을 클릭하고 드롭다운에서 **Add Sermon**을 선택하세요. 목록 위에 **Edit Sermon**(설교 편집) 양식이 열립니다.
2. 설교를 배정할 **Playlist**(재생 목록)를 선택하거나(**None**(없음)으로 두어도 됩니다).
3. **Video Provider**(영상 제공자)를 선택하세요. **YouTube**, **Vimeo**, **Facebook**, **Custom Embed Url**(사용자 지정 임베드 URL) 중 하나입니다. B1 시스템과 가장 잘 작동하므로 YouTube를 권장합니다.
4. 영상의 **YouTube ID**, **Vimeo ID**, **Sermon ID**(Facebook), 또는 **Sermon Embed Url**(설교 임베드 URL)을 입력하세요. 영상 링크 전체를 붙여 넣어도 되며, B1은 ID만 남깁니다. YouTube의 경우 영상 ID는 YouTube URL에서 `v=` 뒤에 오는 문자열입니다.
5. YouTube와 Vimeo는 **Fetch**(불러오기)를 클릭하면 게시일, 길이, 제목, 설명, 썸네일을 포함한 설교 세부 정보를 자동으로 가져옵니다. 세부 정보를 불러올 수 없으면 그 내용을 알려주는 메시지가 표시되며, 직접 입력할 수 있습니다.
6. 필요한 내용을 변경한 다음 **Save**(저장)를 클릭하세요.

:::tip
**Add Sermon** 드롭다운에서 **Add Permanent Live URL**(영구 실시간 URL 추가)을 선택하여 영구 실시간 스트림 URL을 추가할 수도 있습니다. 이렇게 하면 Channel ID를 사용해 YouTube 채널의 실시간 스트림에 지속적으로 연결됩니다. 자세한 내용은 [실시간 스트리밍](./live-streaming.md)을 참고하세요.
:::

## 설교 편집하기 {#editing-a-sermon}

1. 라이브러리에서 설교 행의 **Edit**을 클릭하면 세부 정보가 열립니다.
2. 필요에 따라 제목, 날짜, 설명, 썸네일, 길이 또는 미디어 링크를 업데이트하세요.
3. 변경 사항을 적용하려면 **Save**를, 양식을 닫으려면 **Cancel**(취소)을 클릭하세요.

설교를 삭제하려면 설교를 열고 **Delete**(삭제)를 클릭한 다음 확인하세요.

### 다른 재생 목록에 설교 추가하기 {#adding-a-sermon-to-another-playlist}

같은 설교를 두 번째 재생 목록에도 표시하려면(예: 시리즈와 "Best Of"(베스트) 모음에 모두 속한 설교), 설교를 열고 **Add to another playlist**(다른 재생 목록에 추가)를 클릭한 다음 재생 목록을 선택하고 **Add**(추가)를 클릭하세요. 그러면 해당 재생 목록에 설교 사본이 저장됩니다.

## 설교 세부 정보 {#sermon-details}

각 설교 항목에는 다음 내용을 포함할 수 있습니다.

- **Playlist**(재생 목록) -- 설교가 속한 시리즈
- **Video Provider**(영상 제공자)와 영상 ID -- 설교 영상이 호스팅된 곳입니다. YouTube, Vimeo, Facebook 또는 사용자 지정 임베드 URL입니다.
- **Publish Date**(게시일) -- 설교가 게시된 날짜입니다. 게시일이 없는 설교는 목록에 **Not scheduled**(예약되지 않음)로 표시됩니다.
- **Total Sermon Duration**(설교 전체 길이) -- 설교의 길이(분 및 초)입니다.
- **Thumbnail**(썸네일) -- 설교 라이브러리에 표시되는 미리 보기 이미지입니다. 이미지를 클릭하면 자르거나 교체할 수 있습니다(16:9).
- **Title**(제목) -- 방문자에게 표시되는 설교 이름입니다.
- **Description**(설명) -- 설교 내용의 요약입니다.
- **Audio File URL (for podcast)**(오디오 파일 URL(팟캐스트용)) -- 이 설교의 **하나의** MP3/M4A 파일에 대한 직접 링크입니다. 팟캐스트 피드 주소를 넣는 곳이 아니며, 여기에 붙여 넣은 피드는 재생되지 않습니다. 팟캐스트 전체를 가져오려면 [일괄 가져오기](./bulk-import.md#importing-podcast-episodes)를 사용하세요. URL을 붙여 넣거나, 설교를 저장한 후 **Upload Audio**(오디오 업로드)를 클릭하여 파일을 업로드하면 자동으로 채워집니다. 이 필드(또는 직접 영상 파일 링크)가 설정된 설교만 팟캐스트 피드에 포함됩니다.

## 팟캐스트 피드 {#your-podcast-feed}

설교 하나 이상에 오디오 또는 영상 파일이 첨부되면, B1 Admin이 교회의 팟캐스트 RSS 피드를 자동으로 생성합니다. 별도로 켤 필요는 없습니다. 설교 목록 옆(**Playlists** 패널 아래)의 **Podcast Feed** 패널에서 찾을 수 있습니다. 복사 아이콘을 클릭하여 피드 URL을 복사한 다음, 해당 URL을 Apple Podcasts, Spotify 또는 다른 팟캐스트 디렉터리에 제출하세요.

:::info
YouTube나 Vimeo 영상 ID처럼 임베디드 플레이어에 대한 링크만 있는 설교는 팟캐스트 피드에 나타나지 않습니다. 팟캐스트 앱에는 직접 다운로드할 수 있는 미디어 파일이 필요합니다. 설교를 포함하려면 **Audio File URL**을 추가하세요.
:::

## 실시간 스트림용 설교 예약하기 {#scheduling-a-sermon-for-live-stream}

설교를 추가한 후에는 실시간 스트리밍 페이지에서 방송되도록 예약할 수 있습니다.

1. 점프 메뉴에서 **Sermons > Live Stream Times**(설교 > 실시간 스트리밍 시간)를 선택하세요.
2. 예배를 편집하고 **Video Settings**(영상 설정) 아래의 **Sermon**(설교) 드롭다운에서 설교를 선택하세요.
3. 설교는 예약된 예배 시간에 재생됩니다.

:::info
설교를 하나씩 추가하는 대신 여러 설교를 한 번에 가져오려면 [일괄 가져오기](./bulk-import.md) 도구를 사용하여 YouTube 또는 Vimeo 계정의 영상을 직접 가져오세요.
:::

## 다음 단계 {#next-steps}

- [재생 목록](./playlists.md) -- 설교를 시리즈로 정리
- [실시간 스트리밍](./live-streaming.md) -- 스트리밍 일정 구성
- [일괄 가져오기](./bulk-import.md) -- 여러 설교를 한 번에 가져오기
