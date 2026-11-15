---
title: "일괄 가져오기"
description: "YouTube 채널 또는 Vimeo 계정의 설교 영상을 B1 Admin에 일괄 가져온 다음 재생 목록으로 정리하세요."
---

# 일괄 가져오기

<div class="article-intro">

일괄 가져오기 페이지를 사용하면 YouTube 또는 Vimeo의 영상을 가져와 설교 라이브러리를 빠르게 채울 수 있습니다. 영상을 하나씩 추가하는 대신 기존 설교 콘텐츠를 가져오는 가장 빠른 방법입니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 역할의 **Content**(콘텐츠) 섹션에서 **Edit Services**(예배 편집) 권한이 필요합니다. 접근 권한이 없다면 [역할 및 권한](../settings/roles-permissions.md)을 참고하세요.
- 설교를 가져올 [재생 목록](./playlists.md)을 최소 하나 만드세요
- YouTube 채널 ID 또는 Vimeo 계정 정보를 준비하세요

</div>

## 가져올 소스 선택하기 {#choosing-your-source}

1. B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Sermons**(설교)를 펼친 다음 **Sermons**를 클릭하세요. **Add Sermon**(설교 추가)을 클릭하고 메뉴에서 **Bulk Import**(일괄 가져오기)를 선택하세요.
2. **Choose Import Source**(가져올 소스 선택) 아래에 두 가지 옵션이 표시됩니다.
   - **YouTube** -- YouTube 채널에서 영상을 가져옵니다
   - **Vimeo** -- Vimeo 계정에서 영상을 가져옵니다
3. 설교가 호스팅된 플랫폼의 옵션을 클릭하세요(또는 설명 아래의 **Import from YouTube**(YouTube에서 가져오기) / **Import from Vimeo**(Vimeo에서 가져오기)를 클릭하세요). 소스 선택 화면으로 돌아가려면 페이지 상단의 **Back**(뒤로)을 클릭하세요.

:::tip
두 플랫폼 모두에 영상이 있다면 언제든지 뒤로 가서 소스를 바꿀 수 있습니다.
:::

## 가져오기 전에 {#before-you-import}

영상을 가져오기 전에, 영상을 정리할 재생 목록이 최소 하나 필요합니다. 아직 재생 목록을 만들지 않았다면:

1. **Sermons** 페이지로 돌아가 **Playlists**(재생 목록) 패널을 찾으세요.
2. **Create First Playlist**(첫 재생 목록 만들기)를 클릭하고 이름, 설명, 게시일, 썸네일을 입력하세요.
3. **Save**(저장)를 클릭한 다음, **Add Sermon**을 클릭하고 **Bulk Import**를 선택하여 일괄 가져오기로 돌아가세요.

재생 목록 만들기와 관리에 대한 자세한 내용은 [재생 목록](./playlists.md)을 참고하세요.

## 영상 가져오기 {#importing-videos}

1. YouTube 또는 Vimeo를 선택한 후, 제공된 입력란에 **YouTube Channel ID**(YouTube 채널 ID) 또는 **Vimeo Channel ID**(Vimeo 채널 ID)를 입력하세요.
2. **Fetch**(불러오기) 버튼을 클릭하여 채널의 영상을 가져오세요. 영상을 불러올 수 없거나 채널에 영상이 없으면 그 내용을 알려주는 메시지가 표시됩니다. ID를 확인한 후 다시 시도하세요.
3. 불러오기가 끝나면 영상 목록이 표시되며, 각 영상 옆에는 **Import**(가져오기) 아래에 체크박스가 있습니다.
4. 가져오려는 영상 옆의 체크박스를 선택하세요.
5. **Import Into Playlist**(재생 목록에 가져오기) 드롭다운을 클릭하여 이 영상들을 추가할 재생 목록을 선택하세요.
6. **Import**(가져오기) 버튼을 클릭하여 일괄 가져오기를 완료하세요. 완료되면 소스 선택 화면으로 돌아갑니다.

재생 목록을 선택하지 않았거나 영상을 하나도 선택하지 않은 상태에서 **Import**를 클릭하면, B1이 먼저 이를 완료하라고 안내합니다. 가져오지 않고 나가려면 **Cancel**(취소)을 클릭하세요.

영상은 제목, 설명, 날짜, 썸네일을 포함한 모든 세부 정보와 함께 가져옵니다. YouTube 제목과 설명에 있는 `&`, 아포스트로피, 따옴표 같은 특수 문자는 `&amp;` 같은 코드가 아니라 입력된 그대로 표시됩니다.

:::info
일괄 가져오기는 다른 플랫폼에서 옮겨 올 때 시작하기에 가장 적합합니다. 앞으로 설교를 개별적으로 추가하려면 대신 [설교 관리](./managing-sermons.md) 페이지를 사용하세요.
:::

## 다음 단계 {#next-steps}

- [설교 관리](./managing-sermons.md) -- 가져온 설교 세부 정보 편집
- [재생 목록](./playlists.md) -- 설교 시리즈 만들기 및 관리
- [실시간 스트리밍](./live-streaming.md) -- 예배 실시간 스트리밍 설정
