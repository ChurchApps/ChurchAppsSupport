---
title: "기기 페어링하기"
---

# 기기 페어링하기

<div class="article-intro">

계획 모드를 사용하려면 B1 Admin에서 TV를 계획 유형과 페어링해야 합니다. FreePlay는 TV에 짧은 페어링 코드를 표시합니다. 이 코드를 B1 Admin에 입력하고 따를 계획 유형을 선택하면, TV는 매주 그 계획의 콘텐츠를 자동으로 가져옵니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- FreePlay를 설치하고 실행하세요. [시작하기](../getting-started/)를 참조하세요
- 페어링을 완료하려면 컴퓨터나 휴대폰에서 **B1 Admin**에 접근할 수 있어야 합니다

</div>

## 페어링 코드 생성하기

1. TV에서 사이드바 아래쪽의 **Settings**를 엽니다.
2. **Pair to a calendar**(캘린더에 페어링)를 선택합니다.
3. FreePlay에 큰 글씨로 네 글자 페어링 코드가 QR 코드 옆에 표시됩니다.
4. 코드 아래에 깜박이는 **Waiting for confirmation**(확인 대기 중) 표시가 나타나며, FreePlay가 페어링을 마치기를 기다리고 있다는 뜻입니다.

같은 코드는 FreePlay Admin의 [예약 모드](../scheduled-mode/)와 B1 Admin의 계획 모드 모두에 사용할 수 있습니다. 화면의 QR 코드와 **freeplay.church/pair** 주소는 FreePlay Admin을 엽니다. 계획 모드에서는 이를 무시하고 아래 설명대로 B1 Admin에 코드를 입력하세요.

## B1 Admin에 코드 입력하기

1. B1 Admin에서 **Profile** > **Devices**로 이동하고 **Add Screen**을 클릭합니다.
2. TV에 표시된 네 글자를 **Pairing Code**(페어링 코드)에 입력합니다.
3. **Show Plans For**(다음 계획 보기)에서 이 화면이 따를 계획 유형을 선택합니다(예: "Sunday Service").
4. 저장합니다.

FreePlay는 몇 초마다 페어링이 완료되었는지 확인합니다. B1 Admin이 페어링을 확인하면, TV에 **Connected!**(연결됨!)가 표시되고 계획 다운로드 화면으로 넘어갑니다.

## 계획 콘텐츠 내려받기

페어링한 뒤 FreePlay는 해당 계획 유형의 현재 계획을 불러옵니다. 화면에는 다음이 표시됩니다.

- 계획 이름과 예배 날짜
- 계획에 레슨 콘텐츠가 포함되어 있다면 레슨 이름
- **Downloading item X of Y**(항목 X/Y 다운로드 중)라는 진행 표시기

모든 미디어 파일 다운로드가 끝나면 **Start Plan** 버튼이 나타납니다. 리모컨의 **Select**를 눌러 재생을 시작하세요.

:::tip
계획은 매시간 자동으로 새로 고쳐집니다. 낮에 누군가 계획을 수정하면, FreePlay가 변경 사항을 자동으로 반영합니다.
:::

## 페어링이 실패하면

FreePlay가 페어링 코드를 만들지 못하면(예: 네트워크 문제 때문에), **Try Again**(다시 시도) 버튼이 있는 오류 메시지가 나타납니다. TV가 인터넷에 연결되어 있는지 확인한 뒤 다시 시도하세요.

:::warning
페어링 코드는 15분 후에 만료됩니다. FreePlay는 이전 코드가 만료되면 자동으로 새 코드를 표시하며, 언제든지 **Generate New Code**(새 코드 생성)를 선택할 수 있습니다. 입력한 코드가 작동하지 않으면, TV에 지금 표시된 코드를 사용하세요.
:::

## 관련 문서

- **[계획 모드 개요](./index.md)** - 계획 모드가 예약 모드와 어떻게 다른지
- **[화면 페어링](../scheduled-mode/pairing-a-screen)** - 같은 TV를 FreePlay Admin의 캘린더와 대신 페어링하기
- **[콘텐츠 재생](../content-providers/playing-content)** - 계획 재생을 위한 플레이어 컨트롤
