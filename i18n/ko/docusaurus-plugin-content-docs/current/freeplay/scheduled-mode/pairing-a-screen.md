---
title: "화면 페어링하기"
---

# 화면 페어링하기

<div class="article-intro">

TV를 일정표에 연결하려면 **FreePlay Admin**과 페어링해야 합니다. TV에는 네 글자 코드가 표시됩니다. [admin.freeplay.church](https://admin.freeplay.church)에서 이 코드를 입력하고, TV가 따라야 할 화면 그룹을 고르세요. TV당 한 번만 하면 됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- TV에 FreePlay를 설치하고 실행하세요. [시작하기](../getting-started/)를 참고하세요.
- FreePlay Admin에 로그인할 수 있도록 교회의 ChurchApps 로그인이 필요합니다.
- 선택 사항으로, TV가 바로 재생할 내용이 있도록 먼저 [재생 목록을 만들고](./building-playlists) [일정에 넣어](./scheduling-the-calendar) 두세요.

</div>

## TV에 코드 표시하기

1. TV에서 사이드바 아래쪽의 **Settings**를 엽니다.
2. **Pair to a calendar**를 선택합니다. TV가 아직 페어링되지 않았다면 해당 행에 **Not paired**가 표시됩니다.
3. **Pair this screen** 화면에 QR 코드와 네 글자 페어링 코드가 표시되며, 메시지는 **Scan with your phone, or go to freeplay.church/pair and enter this code**입니다.
4. 코드 아래에서 FreePlay가 페어링을 마치기를 기다리는 동안 **Waiting for confirmation**이 깜박입니다.

코드는 15분 동안 유효하며, 아래의 카운트다운이 남은 시간을 보여 줍니다. 시간이 다 되면 FreePlay가 자동으로 새 코드를 표시합니다. 새 코드를 원하면 **Generate New Code**를, 설정으로 돌아가려면 **Cancel**을 선택할 수 있습니다.

## FreePlay Admin에서 페어링하기

1. 휴대폰으로 QR 코드를 스캔하거나, 아무 컴퓨터나 휴대폰에서 **freeplay.church/pair**로 이동합니다. 로그인하라는 요청이 나오면 로그인하세요. FreePlay Admin이 페어링 코드가 이미 채워진 **Pair screen** 양식을 엽니다.
   - 직접 양식을 열 수도 있습니다. FreePlay Admin에서 **Screens**로 이동하여 **Pair screen**을 클릭하세요.
2. **Pairing code**를 확인합니다. TV에 표시된 네 글자입니다.
3. 이 TV를 다른 TV와 구별할 수 있도록 **Label**을 입력합니다(예: "Lobby left"). 선택 사항입니다.
4. **Group**에서 이 TV가 따를 화면 그룹의 일정을 고릅니다. 새로 시작하려면 **＋ New group…**을 고르고 **New group name**을 입력합니다.
5. **Mode**에서는 **Scheduled**를 그대로 둡니다. TV는 그룹의 일정에 따라 스스로 재생합니다.
6. **Pair**를 클릭합니다.

TV에 **Connected!**가 표시된 뒤 **Loading your schedule...**가 나타납니다. 예약된 내용을 내려받고 재생을 시작합니다. [TV에서 일정에 따라 재생하기](./scheduled-playback)를 참고하세요.

:::info
FreePlay Admin에 **That code didn't match a TV**가 표시되면 화면의 코드를 확인하세요. 만료되었다면 TV가 지금 표시하고 있는 새 코드를 사용하세요.
:::

### 일정 모드와 수동 모드

**Mode** 설정에는 두 가지 옵션이 있습니다.

- **Scheduled** - 그룹의 일정에 따라 스스로 재생합니다. 누군가 Start를 누를 필요가 없습니다.
- **Manual** - 누군가 리모컨으로 콘텐츠를 고릅니다. 수동 화면도 **Screens** 목록에 나타나지만, 일정을 따르지 않으므로 **Group** 필드가 꺼집니다.

나중에 [Screens 페이지](./managing-screens)에서 **Edit**을 눌러 화면의 모드를 바꿀 수 있습니다.

## 대신 예배 계획에 페어링하기

**Pair this screen** 화면의 코드는 B1 Admin에서도 작동합니다. 거기에 코드를 입력하고 **Show Plans For** 아래에서 계획 유형을 고르면, TV는 일정표 대신 [계획 모드](../plan-mode/)에서 그 계획 유형을 따릅니다. [장치 페어링](../plan-mode/device-pairing)을 참고하세요.

## TV에서 변경하거나 페어링 해제하기

TV가 페어링되면 **Settings**의 **Pair to a calendar** 행에 따르고 있는 화면 그룹의 이름이 표시됩니다. 이 행을 선택하면 세 가지 옵션이 있는 **Paired to** 대화 상자가 열립니다.

- **Back to schedule** - 대화 상자를 닫고 일정 재생 화면으로 돌아갑니다. 페어링은 바뀌지 않습니다.
- **Unpair** - 일정 따르기를 중단합니다. FreePlay가 **Content Providers** 화면을 엽니다.
- **Pair to a different calendar** - 페어링을 해제한 다음 새 페어링 코드를 표시하여 TV를 다시 페어링할 수 있게 합니다.

:::warning
페어링을 해제하면 그 일정을 위해 FreePlay가 내려받은 파일이 삭제됩니다.
:::

## FreePlay Admin에서 페어링 해제하기

1. **Screens**로 이동하여 화면의 레이블을 클릭합니다.
2. **More**를 클릭한 다음 **Unpair**를 클릭합니다.
3. 확인하려면 **Unpair**를 다시 클릭합니다.

TV는 다시 페어링 코드를 표시합니다. 원할 때 다시 페어링하세요.

## 관련 문서

- **[화면과 그룹 관리하기](./managing-screens)** - 화면 이름을 바꾸거나, 다른 그룹으로 옮기거나, 내려받기 상태를 확인합니다
- **[일정 잡기](./scheduling-the-calendar)** - 그룹의 화면이 무엇을 재생할지 정합니다
- **[페어링 모드 선택하기](../getting-started/pairing-modes)** - 일정 모드, 계획 모드, 직접 제공업체를 찾아보는 방식을 비교합니다
