---
title: "화면 연결하기"
description: "FreePlay Admin에서 TV의 네 글자 코드를 사용해 FreePlay TV를 화면 그룹 캘린더에 페어링하면, 예약된 콘텐츠를 자동으로 재생합니다."
---

# 화면 연결하기

<div class="article-intro">

TV를 캘린더에 맞추려면 **FreePlay Admin**과 연결해야 합니다. TV에는 네 글자 코드가 표시됩니다. [admin.freeplay.church](https://admin.freeplay.church)에서 이 코드를 입력하고, 이 TV가 따라야 할 화면 그룹을 선택하세요. 이 작업은 TV마다 한 번만 하면 됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- TV에 FreePlay를 설치하고 실행하세요. [시작하기](../getting-started/index.md)를 참고하세요.
- FreePlay Admin에 로그인할 수 있도록 교회의 ChurchApps 로그인 정보를 준비하세요.
- 원하면 TV가 바로 재생할 내용이 있도록 먼저 [재생 목록을 만들고](./building-playlists.md) [예약](./scheduling-the-calendar.md)하세요.

</div>

## TV에 코드 표시하기

1. TV에서 사이드바 맨 아래의 **Settings**를 여세요.
2. **Pair to a calendar**를 선택하세요. 아직 연결되지 않은 TV는 해당 항목에 **Not paired**가 표시됩니다.
3. **Pair this screen** 화면에 QR 코드와 네 글자 연결 코드가 표시되며, **Scan with your phone, or go to freeplay.church/pair and enter this code**(휴대폰으로 스캔하거나 freeplay.church/pair에 접속해 이 코드를 입력하세요)라는 안내가 나옵니다.
4. 코드 아래에는 연결을 마치기를 FreePlay가 기다리는 동안 **Waiting for confirmation**이 깜박입니다.

코드는 15분 동안 유효하며, 그 아래 카운트다운으로 남은 시간이 표시됩니다. 시간이 다 되면 FreePlay가 자동으로 새 코드를 표시합니다. 새 코드를 바로 받고 싶다면 **Generate New Code**를 선택하고, 설정으로 돌아가려면 **Cancel**을 선택하세요.

## FreePlay Admin에서 연결하기

1. 휴대폰으로 QR 코드를 스캔하거나, 컴퓨터나 휴대폰에서 **freeplay.church/pair**에 접속하세요. 요청하면 로그인하세요. FreePlay Admin이 코드가 이미 입력된 **Pair screen** 양식을 엽니다.
   - 직접 양식을 열 수도 있습니다. FreePlay Admin에서 **Screens**로 이동한 뒤 **Pair screen**을 클릭하세요.
2. **Pairing code**를 확인하세요. TV에 표시된 네 글자입니다.
3. 여러 TV 중 이 TV를 구분할 수 있도록 **Label**을 입력하세요(예: "Lobby left"). 선택 사항입니다.
4. **Group**에서 이 TV가 따라야 할 캘린더를 가진 화면 그룹을 고르세요. 새 그룹을 만들려면 **＋ New group…**을 선택하고 **New group name**을 입력하세요.
5. **Mode**는 **Scheduled**를 그대로 두세요. 그러면 TV가 그룹의 캘린더에 따라 스스로 재생합니다.
6. **Pair**를 클릭하세요.

TV에 **Connected!**가 표시된 뒤 **Loading your schedule...**이 나타납니다. TV는 예약된 콘텐츠를 다운로드하고 재생을 시작합니다. [TV의 예약 재생](./scheduled-playback.md)을 참고하세요.

:::info
FreePlay Admin에 **That code didn't match a TV**가 표시되면 TV 화면의 코드를 다시 확인하세요. 코드가 만료되었다면 TV가 지금 표시하고 있는 새 코드를 사용하세요.
:::

### 예약 모드와 수동 모드

**Mode** 설정에는 두 가지 옵션이 있습니다.

- **Scheduled** -- 그룹의 캘린더에 따라 스스로 재생합니다. 누군가 Start를 누를 필요가 없습니다.
- **Manual** -- 사람이 리모컨으로 콘텐츠를 고릅니다. 수동 화면도 **Screens** 목록에 나타나지만 캘린더를 따르지 않으므로 **Group** 항목은 비활성화됩니다.

나중에 [Screens 페이지](./managing-screens.md)의 **Edit**에서 화면의 모드를 바꿀 수 있습니다.

## 대신 예배 순서에 연결하기

**Pair this screen** 화면의 코드는 B1 Admin에서도 사용할 수 있습니다. B1 Admin에서 코드를 입력하고 **Show Plans For**에서 예배 순서 유형을 고르면, TV는 캘린더 대신 해당 예배 순서 유형을 [예배 순서 모드](../plan-mode/index.md)로 따라갑니다. [기기 연결하기](../plan-mode/device-pairing.md)를 참고하세요.

## TV에서 연결 변경 또는 해제하기 {#changing-or-unpairing-from-the-tv}

TV가 연결되면 **Settings**의 **Pair to a calendar** 항목에 이 TV가 따르는 화면 그룹 이름이 표시됩니다. 이 항목을 선택하면 **Paired to** 대화상자가 열리며, 다음 세 가지 옵션이 있습니다.

- **Back to schedule** -- 대화상자를 닫고 예약 재생 화면으로 돌아갑니다. 연결 상태는 바뀌지 않습니다.
- **Unpair** -- 캘린더 따르기를 중단합니다. FreePlay가 **Content Providers** 화면을 엽니다.
- **Pair to a different calendar** -- 연결을 해제한 뒤 새 연결 코드를 표시해 TV를 다시 연결할 수 있게 합니다.

:::warning
연결을 해제하면 FreePlay가 해당 캘린더를 위해 다운로드한 파일이 삭제됩니다.
:::

## FreePlay Admin에서 연결 해제하기

1. **Screens**로 이동한 뒤 화면의 이름을 클릭하세요.
2. **More**를 클릭한 다음 **Unpair**를 클릭하세요.
3. 확인하려면 **Unpair**를 한 번 더 클릭하세요.

TV는 다시 연결 코드를 표시합니다. 다시 사용하고 싶을 때 연결하면 됩니다.

## 관련 문서

- **[화면 및 그룹 관리하기](./managing-screens.md)** -- 화면 이름 바꾸기, 다른 그룹으로 옮기기, 다운로드 상태 확인하기
- **[캘린더 예약하기](./scheduling-the-calendar.md)** -- 그룹의 화면에서 재생할 내용 정하기
- **[연결 방식 선택하기](../getting-started/pairing-modes.md)** -- 예약 모드와 예배 순서 모드, 직접 콘텐츠 제공자 찾아보기 비교하기
