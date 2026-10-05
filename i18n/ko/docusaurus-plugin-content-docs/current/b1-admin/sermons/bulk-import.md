---
title: "대량 가져오기"
---

# 대량 가져오기

<div class="article-intro">

Bulk Import 페이지를 사용하면 YouTube 또는 Vimeo에서 동영상을 가져와서 설교 라이브러리를 빠르게 채울 수 있습니다. 이것은 각 동영상을 하나씩 추가하기보다는 기존 설교 콘텐츠를 가져오는 가장 빠른 방법입니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **contentApi.streamingServices.edit** 권한이 필요합니다. 접근권이 없으면 [Roles & Permissions](../settings/roles-permissions.md)을 참고하세요.
- 설교를 가져올 [재생목록](playlists) 최소 하나를 만드세요.
- YouTube Channel ID 또는 Vimeo 계정 정보를 준비하세요.

</div>

## 소스 선택

1. B1 Admin에서 B1 Admin의 왼쪽 상단에 있는 검색 모음인 [Jump 메뉴](../introduction.md#getting-around-with-the-jump-menu)를 열고 **Sermons**을 확장한 다음 **Sermons**을 클릭하세요. **Add Sermon**을 클릭하고 메뉴에서 **Bulk Import**를 선택하세요.
2. 두 개의 클릭 가능한 카드가 표시됩니다:
   - **YouTube**(빨강) -- YouTube 채널에서 동영상을 가져오기
   - **Vimeo**(파랑) -- Vimeo 계정에서 동영상을 가져오기
3. 설교가 호스팅되는 플랫폼의 카드를 클릭하세요.

:::tip
언제든지 돌아가서 소스를 바꿀 수 있습니다. 두 플랫폼에 동영상이 있으면 말입니다.
:::

## 가져오기 전에

동영상을 가져오기 전에, 정렬할 재생목록이 최소 하나 필요합니다. 아직 재생목록을 만들지 않았으면:

1. **Sermons** 페이지로 돌아가 **Playlists** 패널을 찾으세요.
2. **Create First Playlist**를 클릭하고 이름, 설명, 게시 날짜 및 썸네일을 입력하세요.
3. **Save**를 클릭한 다음, **Add Sermon**을 클릭하고 **Bulk Import**를 선택하여 Bulk Import로 돌아가세요.

[Playlists](playlists)을 참고하여 재생목록 생성 및 관리에 대한 자세한 지침을 보세요.

## 동영상 가져오기

1. YouTube 또는 Vimeo를 선택한 후, 제공된 필드에 **YouTube Channel ID** 또는 **Vimeo 계정 정보**를 입력하세요.
2. **Fetch** 버튼을 클릭하여 채널 또는 계정에서 사용 가능한 모든 동영상을 가져오세요.
3. 가져온 후, 확인란이 있는 모든 동영상의 목록이 표시됩니다.
4. 가져오려는 동영상 옆의 확인란을 선택하세요. 모두 선택하거나 특정 동영상을 선택할 수 있습니다.
5. 선택적으로, **Auto Import New Videos**를 활성화하여 향후 업로드를 자동으로 라이브러리에 추가하세요.
6. **Import Into Playlist** 드롭다운을 클릭하여 이 동영상을 추가할 재생목록을 선택하세요.
7. **Import** 버튼을 클릭하여 대량 가져오기를 완료하세요.

동영상은 제목, 설명, 날짜 및 썸네일을 포함한 모든 세부사항과 함께 가져옵니다.

:::info
대량 가져오기는 다른 플랫폼에서 마이그레이션할 때 시작하기에 이상적입니다. 앞으로 개별 설교를 추가하려면 [Managing Sermons](managing-sermons) 페이지를 사용하세요.
:::

## 다음 단계

- [Managing Sermons](managing-sermons) -- 가져온 설교 세부사항 편집
- [Playlists](playlists) -- 설교 시리즈 생성 및 관리
- [Live Streaming](live-streaming) -- 서비스 라이브 스트리밍 설정
