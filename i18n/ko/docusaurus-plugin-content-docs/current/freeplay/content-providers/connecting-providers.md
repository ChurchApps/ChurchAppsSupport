---
title: "제공자에 연결"
---

# 제공자에 연결

<div class="article-intro">

제공자의 콘텐츠를 찾을 수 있으려면 그것에 연결해야 합니다. 일부 제공자는 QR 코드 또는 이메일 로그인을 통해 인증이 필요한 반면 다른 제공자는 단일 클릭으로 연결할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- FreePlay 설치 및 실행 -- [시작하기](../getting-started/) 참조
- TV 리모컨을 네비게이션 준비합니다
- 로그인이 필요한 제공자의 경우 계정 자격 증명이 있는 것을 확인합니다

</div>

:::tip B1 Admin + FreePlay를 함께 설정합니까?
우리의 **<a href="/guides/freeplay-b1admin" target="_blank">step-by-step guide</a>**는 B1 Admin 연결, 레슨 예약, 그리고 FreePlay 연결을 한 곳에서 연결합니다. 새 탭에서 열어서 따라갑니다.
:::

## 사용 가능한 제공자 찾기

1. 사이드바 하단의 **Settings**를 열고 **Providers**를 선택하여 **Content Providers** 화면을 엽니다
2. 각 제공자의 로고와 이름을 표시하는 제공자 카드 그리드를 봅니다
3. 연결된 제공자는 그들의 이름 아래에 녹색 **Connected** 배지를 표시합니다
4. 아직 사용 가능하지 않은 제공자는 **Coming Soon** 레이블을 표시합니다

## 인증 없이 연결

일부 제공자는 로그인이 필요하지 않습니다. 이 중 하나를 선택하면 FreePlay가 즉시 연결되고 콘텐츠 브라우저를 엽니다. 자격 증명이 필요하지 않습니다.

## 기기 흐름 인증(QR 코드)

특정 제공자는 TV 스트리밍 앱에 로그인하는 방식과 유사한 기기 흐름을 사용합니다:

1. **Content Providers** 화면의 제공자 카드를 선택합니다
2. FreePlay는 QR 코드와 확인 URL을 표시합니다
3. 휴대폰으로 QR 코드를 스캔하거나 any device에서 표시된 URL을 방문합니다
4. TV 화면에 표시된 사용자 코드를 입력합니다
5. 휴대폰 또는 컴퓨터에서 로그인 프로세스를 완료합니다
6. FreePlay는 성공적인 로그인을 감지하고 **Connected!**를 표시합니다
7. 콘텐츠 브라우저가 자동으로 열립니다

:::info
맥동하는 **Waiting for authorization** 표시기는 FreePlay가 로그인을 확인 중임을 보여줍니다. 코드는 여러 분 후에 만료되므로 빠르게 프로세스를 완료합니다.
:::

**Go Curriculum**은 동일한 QR 코드 로그인 패턴을 사용합니다 -- 코드를 스캔하고 gocurriculum.com 계정으로 로그인하여 연결합니다.

## 양식 로그인

다른 제공자는 전통적인 이메일 및 비밀번호 로그인을 사용합니다:

1. 제공자 카드를 선택합니다
2. 온스크린 키보드를 사용하여 **Email** 및 **Password**를 입력합니다
3. **Sign In** 버튼을 선택합니다
4. 자격 증명이 맞으면 FreePlay는 **Connected!**를 표시하고 콘텐츠 브라우저를 엽니다

:::tip
리모컨의 방향 패드를 사용하여 이메일 필드, 비밀번호 필드, 그리고 로그인 버튼 사이를 이동합니다. 텍스트 필드의 **Select**를 눌러서 온스크린 키보드를 엽니다.
:::

## 네트워크에서 제공자 찾기

**FreeShow**는 로그인을 통해 대신 로컬 네트워크에서 찾습니다: FreePlay는 네트워크를 검색하고 찾은 FreeShow를 실행하는 각 컴퓨터를 나열하며, 선택한 것에 연결합니다(**Scan Again**이 나타나지 않으면 선택합니다).

## 제공자 설정

**Connected** 배지를 표시하는 제공자 카드를 선택하면 **Provider Settings** 화면을 엽니다:

- **Browse Library** -- 이 제공자의 콘텐츠 라이브러리를 사이드바에서 표시하거나 숨깁니다
- **Auto-Download Today's Lesson** -- 이 제공자를 오늘 레슨의 소스로 사용하고 그 파일을 미리 다운로드합니다(현재 레슨을 제공하는 제공자에만 표시됨)
- **Use for Announcements** -- 이 제공자에서 폴더를 선택하여 사이드바의 **Announcements** 항목에서 루프합니다. [Announcements](./announcements) 참조
- **Check for Announcement Updates** -- 공지 폴더가 선택되면 표시되고; 새 슬라이드를 다운로드하고 삭제된 것을 제거합니다
- **Disconnect** -- 연결을 제거합니다

## 제공자 연결 해제

이미 연결한 제공자의 연결을 해제하려면:

1. **Content Providers** 화면으로 이동합니다(**Settings** > **Providers**)
2. **Connected** 배지를 표시하는 제공자 카드를 선택합니다
3. **Provider Settings** 화면에서 **Disconnect**를 선택합니다

연결 해제 후 제공자의 콘텐츠는 더 이상 사이드바에 나타나지 않습니다. 공지를 위해 그 폴더 중 하나를 사용했다면 이 슬라이드는 또한 제거됩니다.

:::warning
연결 해제는 기기에서 저장된 인증을 제거합니다. 나중에 다시 연결하고 싶으면 다시 로그인해야 합니다.
:::

## 관련 글

- **[콘텐츠 찾기 및 다운로드](./browsing-content)** - 연결 후 폴더를 네비게이트하고 콘텐츠 재생
- **[Announcements](./announcements)** - 연결된 제공자에서 슬라이드 폴더를 루프합니다
- **[Content Providers Overview](./index.md)** - 모든 사용 가능한 제공자 참조
