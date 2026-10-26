---
title: "일괄 가져오기"
---

# 일괄 가져오기

<div class="article-intro">

일괄 가져오기(Bulk Import) 페이지에서는 YouTube나 Vimeo의 동영상을 가져와 설교 라이브러리를 빠르게 채울 수 있습니다. 동영상을 하나씩 추가하는 대신, 기존 설교 콘텐츠를 가장 빠르게 가져오는 방법입니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **contentApi.streamingServices.edit** 권한이 필요합니다. 접근 권한이 없다면 [역할 및 권한](../settings/roles-permissions.md)을 참고하세요.
- 설교를 가져올 [재생목록](playlists)을 하나 이상 만들어 두세요.
- YouTube 채널 ID 또는 Vimeo 계정 정보를 준비해 두세요.

</div>

## 가져올 출처 선택하기

1. B1 Admin에서 [Jump 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Sermons**를 펼친 후 **Sermons**를 클릭합니다. **Add Sermon**을 클릭하고 메뉴에서 **Bulk Import**를 선택합니다.
2. **Choose Import Source**에서 두 가지 옵션을 볼 수 있습니다.
   - **YouTube** -- YouTube 채널에서 동영상 가져오기
   - **Vimeo** -- Vimeo 계정에서 동영상 가져오기
3. 설교가 호스팅된 플랫폼의 옵션을 클릭합니다(또는 설명 아래의 **Import from YouTube** / **Import from Vimeo**를 클릭합니다). 출처 선택 화면으로 돌아가려면 페이지 상단의 **Back**을 클릭하세요.

:::tip
두 플랫폼에 동영상이 모두 있다면, 언제든지 돌아가서 출처를 바꿀 수 있습니다.
:::

## 가져오기 전에

동영상을 가져오기 전에, 동영상을 정리할 재생목록이 하나 이상 있어야 합니다. 아직 재생목록을 만들지 않았다면:

1. **Sermons** 페이지로 돌아가 **Playlists** 패널을 찾습니다.
2. **Create First Playlist**를 클릭하고 이름, 설명, 게시 날짜, 썸네일을 입력합니다.
3. **Save**를 클릭한 후, **Add Sermon**을 클릭하고 **Bulk Import**를 선택하여 일괄 가져오기로 돌아갑니다.

재생목록 만들기와 관리에 대한 자세한 내용은 [재생목록](playlists)을 참고하세요.

## 동영상 가져오기

1. YouTube 또는 Vimeo를 선택한 후, 제공된 입력란에 **YouTube Channel ID** 또는 **Vimeo account information**을 입력합니다.
2. **Fetch** 버튼을 클릭하여 채널이나 계정의 모든 동영상을 불러옵니다.
3. 가져오기가 끝나면 체크박스가 있는 모든 동영상 목록이 나타납니다.
4. 가져오려는 동영상 옆의 체크박스를 체크합니다. 모두 선택하거나 원하는 동영상만 선택할 수 있습니다.
5. 필요하다면 **Auto Import New Videos**를 켜서 앞으로 업로드되는 동영상을 라이브러리에 자동으로 추가합니다.
6. **Import Into Playlist** 드롭다운을 클릭하여 이 동영상들을 추가할 재생목록을 선택합니다.
7. **Import** 버튼을 클릭하여 일괄 가져오기를 완료합니다.

동영상은 제목, 설명, 날짜, 썸네일을 포함한 모든 세부 정보와 함께 가져옵니다. YouTube 제목과 설명의 `&`, 아포스트로피, 따옴표 같은 특수 문자는 `&amp;` 같은 코드가 아니라 입력한 그대로 표시됩니다.

:::info
일괄 가져오기는 다른 플랫폼에서 옮겨 오는 중일 때 시작하기에 가장 좋습니다. 앞으로 설교를 하나씩 추가하려면 [설교 관리](managing-sermons) 페이지를 사용하세요.
:::

## 다음 단계

- [설교 관리](managing-sermons) -- 가져온 설교 세부 정보 편집
- [재생목록](playlists) -- 설교 시리즈 만들기 및 관리
- [라이브 스트리밍](live-streaming) -- 예배의 라이브 스트리밍 설정
