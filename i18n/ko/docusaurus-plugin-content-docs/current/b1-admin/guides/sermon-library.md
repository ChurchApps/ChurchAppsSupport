---
title: "가이드: 설교 라이브러리와 라이브 스트리밍 구축하기"
---

# 설교 라이브러리와 라이브 스트리밍 구축하기

<div class="article-intro">

설교 보관본을 온라인에 올리고 라이브 스트리밍을 설정하세요. 기존 YouTube나 Vimeo 라이브러리를 가져오는 것부터, 대화형 채팅과 함께 정기 예배를 라이브로 예약하는 것까지 다룹니다. 끝나면 교인들은 웹사이트와 모바일 앱에서 지난 설교를 보고 라이브 예배에 참여할 수 있습니다.

</div>

## 교육 영상

<YouTube id="b3B3A25g2Sk" title="B1에서 설교 라이브러리 만들기" next="B1에서 라이브 스트리밍 설정하기" nextUrl="/docs/b1-admin/sermons/live-streaming" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- 콘텐츠 관리 권한이 있는 B1 Admin 계정
- 설교 영상이 있는 YouTube 또는 Vimeo 채널(기존 보관본을 가져오기 위해)
- YouTube 채널 ID(라이브 스트리밍용. YouTube Studio 설정에서 찾을 수 있습니다)

</div>

## 1단계: 설교 재생 목록 만들기

재생 목록(Playlist)은 설교를 시리즈와 모음으로 정리해 쉽게 둘러볼 수 있게 합니다.

[재생 목록](../sermons/playlists.md) 가이드를 따라 다음을 진행하세요.

1. "2024 Sunday Messages", "Marriage Series", "Christmas Services" 같은 시리즈나 모음을 만드세요.
2. 각 재생 목록에 이름, 설명, 공개 날짜, 썸네일을 추가하세요.

:::tip
설교를 추가하기 전에 재생 목록을 먼저 만드세요. 설교를 추가하면서 알맞은 시리즈에 바로 넣기 쉬워집니다.
:::

## 2단계: 기존 설교 가져오기

YouTube나 Vimeo에 이미 설교 영상이 있다면 한꺼번에 모두 가져올 수 있습니다.

[대량 가져오기](../sermons/bulk-import.md) 가이드를 따라 다음을 진행하세요.

1. YouTube 또는 Vimeo 채널 URL을 입력하세요.
2. 가져올 영상을 미리 보기로 확인하세요.
3. **Import**를 클릭해 모든 영상을 한 번에 추가하세요.

## 3단계: 개별 설교 추가하기

한두 개만 추가하거나, 대량 가져오기에 포함되지 않은 설교를 추가할 때는 하나씩 추가하세요.

[설교 관리하기](../sermons/managing-sermons.md) 가이드를 따라 다음을 진행하세요.

1. 영상 URL(YouTube, Vimeo, Facebook)을 붙여 넣으세요.
2. 제목, 설명, 썸네일, 길이는 영상 메타데이터에서 자동으로 채워집니다.
3. 설교를 재생 목록에 배정하세요.

## 4단계: 라이브 스트리밍 설정하기

YouTube 채널을 연결하면 B1 사이트가 라이브 스트림을 자동으로 가져옵니다.

[라이브 스트리밍](../sermons/live-streaming.md) 가이드를 따라 다음을 진행하세요.

1. 스트리밍 설정에 YouTube 채널 ID를 입력하세요.
2. 정기 예배 일정을 설정하세요(예: 주일 오전 10시).
3. **Sermons > Settings** 페이지에서 스트리밍 페이지의 탭(Chat, Prayer requests, 사용자 지정 링크)을 설정하세요.

:::info
YouTube에서 라이브를 시작하면 B1 스트리밍 페이지가 자동으로 스트림을 가져옵니다. 주일 아침에 따로 해야 할 일이 없습니다.
:::

## 5단계: 웹사이트에 표시하기

방문자가 설교 라이브러리와 라이브 스트림을 쉽게 찾을 수 있도록 하세요.

[페이지 관리하기](../website/managing-pages.md) 가이드를 따라 다음을 진행하세요.

1. 방문자가 라이브러리를 둘러볼 수 있도록 B1 웹사이트에 Sermons 섹션을 추가하세요.
2. 라이브 시청 경험을 위해 Live Stream 섹션을 추가하세요.

## 6단계: 모바일 접근

교인은 어떤 기기에서든 설교와 라이브 예배에 접근할 수 있습니다.

1. 교인은 [B1 Mobile 앱](../../b1-mobile/content/sermons.md)과 [B1.church](../../b1-church/content/sermons.md)에서 설교를 볼 수 있습니다.
2. 채팅이 포함된 라이브 스트리밍은 두 플랫폼 모두에서 작동합니다.

:::info
라이브 채팅 기능을 통해 온라인 교인도 실시간으로 참여할 수 있습니다. 교회에 직접 앉아 있는 것과 같습니다.
:::

## 완료!

설교 라이브러리가 온라인에 올라갔고 라이브 스트림도 설정되었습니다. 교인은 언제든 지난 설교를 따라잡을 수 있고, 어디에서든 라이브 예배에 참여할 수 있습니다. 새 설교 업로드는 자동으로 동기화될 수 있습니다.

## 관련 문서

- [재생 목록](../sermons/playlists.md) — 설교를 시리즈로 정리
- [대량 가져오기](../sermons/bulk-import.md) — YouTube 또는 Vimeo에서 가져오기
- [설교 관리하기](../sermons/managing-sermons.md) — 개별 설교 추가 및 편집
- [라이브 스트리밍](../sermons/live-streaming.md) — 라이브 예배 설정
- [설교(웹)](../../b1-church/content/sermons.md) — 교인이 설교를 보는 화면
- [라이브 스트리밍(웹)](../../b1-church/content/live-streaming.md) — 교인이 라이브 스트림을 보는 화면
- [설교(모바일)](../../b1-mobile/content/sermons.md) — 모바일 앱의 설교
