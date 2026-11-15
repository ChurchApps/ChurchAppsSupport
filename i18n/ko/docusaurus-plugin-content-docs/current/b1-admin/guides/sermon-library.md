---
title: "가이드: 설교 라이브러리 구축 및 라이브 스트림"
description: "YouTube 또는 Vimeo 설교 영상을 가져오고, 재생목록으로 정리하고, B1 Admin에서 채팅이 포함된 정기 라이브 스트림을 교회 웹사이트에 설정하세요."
---

# 설교 라이브러리 구축 및 라이브 스트림

<div class="article-intro">

설교 아카이브를 온라인에 공개하고 라이브 스트리밍을 설정하세요. 기존 YouTube 또는 Vimeo 라이브러리를 가져오는 것부터 대화형 채팅이 포함된 정기 라이브 예배 일정 설정까지 다룹니다. 완료하면 성도들이 웹사이트와 모바일 앱에서 지난 설교를 시청하고 라이브 예배에 참여할 수 있습니다.

</div>

## 교육 영상 {#training-video}

<YouTube id="b3B3A25g2Sk" title="B1에서 설교 라이브러리 구축하기" next="B1에서 라이브 스트리밍 설정하기" nextUrl="/docs/b1-admin/sermons/live-streaming" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- 콘텐츠 관리 권한이 있는 B1 Admin 계정
- 설교 영상이 있는 YouTube 또는 Vimeo 채널 및 채널 ID (기존 아카이브 가져오기용)
- YouTube 채널 ID (라이브 스트리밍용 — YouTube 스튜디오 설정에서 찾을 수 있습니다)

</div>

## 1단계: 설교 재생목록 만들기 {#step-1-create-sermon-playlists}

재생목록은 설교를 시리즈와 모음별로 정리하여 쉽게 찾아볼 수 있도록 합니다.

[재생목록](../sermons/playlists.md) 가이드를 따라 진행하세요:

1. [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)에서 **Sermons > Sermons**를 선택하고 **Playlists** 패널을 찾으세요
2. **Add playlist**(또는 **Create First Playlist**)를 클릭하여 "2024 Sunday Messages", "Marriage Series", "Christmas Services"와 같은 시리즈/모음을 만드세요
3. **Playlist Title**, **Description**, **Publish Date**를 입력하고, **Add Thumbnail**을 클릭하여 이미지를 추가한 다음 **Save**를 클릭하세요

:::tip
설교를 추가하기 전에 재생목록을 먼저 만드세요. 그러면 설교를 추가하면서 알맞은 시리즈로 쉽게 정리할 수 있습니다.
:::

## 2단계: 기존 설교 가져오기 {#step-2-import-your-existing-sermons}

이미 YouTube나 Vimeo에 설교 영상이 있다면 한꺼번에 가져올 수 있습니다.

[일괄 가져오기](../sermons/bulk-import.md) 가이드를 따라 진행하세요:

1. **Add Sermon**을 클릭하고 **Bulk Import**를 선택한 다음 YouTube 또는 Vimeo를 선택하세요
2. **YouTube Channel ID** 또는 **Vimeo Channel ID**를 입력하고 **Fetch**를 클릭하여 채널의 영상 목록을 불러오세요
3. 가져올 영상을 선택하고 **Import Into Playlist**에서 재생목록을 고른 다음 **Import**를 클릭하세요

## 3단계: 개별 설교 추가하기 {#step-3-add-individual-sermons}

일회성으로 추가하거나 일괄 가져오기에 포함되지 않은 설교는 하나씩 추가하세요.

[설교 관리](../sermons/managing-sermons.md) 가이드를 따라 진행하세요:

1. **Add Sermon**을 클릭하고 **Add Sermon**을 선택하세요
2. **Playlist**를 고르고 **Video Provider**(YouTube, Vimeo, Facebook 또는 Custom Embed Url)를 선택한 다음 영상 링크나 ID를 붙여넣으세요
3. YouTube와 Vimeo의 경우 **Fetch**를 클릭하면 영상에서 제목, 설명, 썸네일, 길이, 게시일이 자동으로 채워집니다. 그다음 **Save**를 클릭하세요

## 4단계: 라이브 스트리밍 설정하기 {#step-4-set-up-live-streaming}

YouTube 채널을 연결하면 B1 웹사이트가 라이브 스트림을 자동으로 가져옵니다.

[라이브 스트리밍](../sermons/live-streaming.md) 가이드를 따라 진행하세요:

1. **Sermons** 페이지에서 **Add Sermon**을 클릭하고 **Add Permanent Live URL**을 선택한 다음 **YouTube Channel ID**를 입력하고 **Save**를 클릭하세요
2. 점프 메뉴에서 **Sermons > Live Stream Times**를 선택하고 **Add Service**를 클릭하세요. **Service Time**을 설정하세요(예: 일요일 오전 10:00). **Recurs Weekly**를 켜고 **Sermon** 드롭다운에서 영구 라이브 URL을 선택하세요
3. **Sermons > Settings** 페이지에서 스트리밍 페이지의 탭(Chat, Prayer 및 외부 링크)을 맞춤 설정하세요

:::info
YouTube에서 라이브를 시작하면 B1 스트리밍 페이지가 스트림을 자동으로 가져옵니다. 주일 아침에 별도로 할 일은 없습니다.
:::

## 5단계: 웹사이트에 게시하기 {#step-5-display-on-your-website}

설교 라이브러리와 라이브 스트림을 방문자가 쉽게 찾을 수 있도록 하세요.

[페이지 편집기](../website/page-editor.md) 가이드를 따라 진행하세요:

1. B1 웹사이트의 페이지에 **Sermons** 요소를 추가하여 방문자가 라이브러리를 둘러볼 수 있도록 하세요
2. 라이브 시청 경험을 위해 **Stream** 요소를 추가하세요

## 6단계: 모바일 접근 {#step-6-mobile-access}

성도들은 어떤 기기에서든 설교와 라이브 예배에 접근할 수 있습니다.

1. 성도들은 [B1.church 및 B1 App](../../b1-church/content/sermons.md)에서 설교를 시청할 수 있습니다
2. 채팅이 포함된 라이브 스트리밍은 휴대폰과 컴퓨터 모두에서 작동합니다

:::info
라이브 채팅 기능을 통해 온라인 성도들도 실제 예배 공간에 있는 것처럼 실시간으로 참여할 수 있습니다.
:::

## 완료! {#youre-done}

설교 라이브러리가 온라인에 공개되었고 라이브 스트림도 설정되었습니다. 성도들은 언제든지 지난 설교를 다시 볼 수 있고, 어디서나 라이브 예배에 참여할 수 있습니다. YouTube나 Vimeo에 새 설교를 올린 뒤에는 **Add Sermon**(또는 다른 **Bulk Import**)으로 각 설교를 추가하세요.

## 관련 문서 {#related-articles}

- [재생목록](../sermons/playlists.md) — 설교를 시리즈별로 정리
- [일괄 가져오기](../sermons/bulk-import.md) — YouTube 또는 Vimeo에서 가져오기
- [설교 관리](../sermons/managing-sermons.md) — 개별 설교 추가 및 편집
- [라이브 스트리밍](../sermons/live-streaming.md) — 라이브 예배 설정
- [설교 (성도용)](../../b1-church/content/sermons.md) — 성도의 설교 시청 경험
- [라이브 스트리밍 (성도용)](../../b1-church/content/live-streaming.md) — 성도의 라이브 스트림 경험
