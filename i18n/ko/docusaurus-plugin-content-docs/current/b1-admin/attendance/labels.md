---
title: "체크인 라벨 디자이너"
description: "B1 Admin에서 체크인 때 출력되는 이름표와 픽업 슬립 템플릿을 사용자 지정하세요. 필드, 위치, 생일 및 메모 조건을 설정할 수 있습니다."
---

# 체크인 라벨 디자이너

<div class="article-intro">

라벨 디자이너를 사용하면 가족이 자녀를 체크인할 때 출력되는 이름표와 픽업 슬립 템플릿을 만들고 사용자 지정할 수 있습니다. 각 라벨에 어떤 정보가 표시될지, 어디에 배치될지, 어떤 모양일지를 정확하게 조절할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- [출석](./setup.md)을 설정하고, 체크인이 켜진 예배 시간을 최소 하나 구성하세요.
- 라벨이 출력되도록 [체크인](./check-in.md)을 설정하세요.
- **Edit Attendance** 권한이 필요합니다.

</div>

## 라벨 디자이너 열기 {#opening-the-label-designer}

B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Mobile**을 펼친 뒤 **Labels**를 클릭합니다. 또는 **B1 CheckIn**을 클릭한 다음 **Check-in Labels** 카드의 **Design Labels**를 클릭할 수도 있습니다.

**Check-in Labels** 페이지에는 저장된 템플릿이 **Name**, **Type**(**Nametag** 또는 **Pickup Slip**), **Size**와 함께 나열됩니다. 아직 만든 템플릿이 없다면 **No label templates**라고 표시되며, 이때 B1 Checkin은 기본 제공 이름표와 픽업 슬립을 출력합니다.

## 라벨 유형 {#label-types}

- **Nametag** — 출력한 뒤 자녀에게 붙입니다. 보통 자녀의 이름, 반이나 세션, 보안 코드가 들어갑니다.
- **Pickup Slip** — 부모나 보호자에게 줍니다. 보통 보안 코드와 체크인한 자녀의 목록이 들어갑니다.

두 시작 템플릿은 모두 표준 3.5 × 1.1인치 열전사 라벨(Brother DK-1201)에 맞춰져 있습니다.

## 라벨 템플릿 만들기 {#creating-a-label-template}

1. **Add label**을 클릭한 뒤 시작점을 선택합니다. **Nametag 3.5" x 1.1"**, **Pickup Slip 3.5" x 1.1"**, 또는 **Blank**가 있습니다.
2. 템플릿이 라벨 편집기에서 열리며, 샘플 데이터가 채워진 라벨 미리보기가 함께 표시됩니다.

### 라벨 편집기 {#label-editor}

편집기 상단에서 다음을 설정할 수 있습니다.

- **Name** — 템플릿 이름(참고용이며 필수입니다)
- **Type** — Nametag 또는 Pickup Slip
- **Width (in)** / **Height (in)** — 인치 단위의 라벨 크기

### 블록 추가하기 {#adding-blocks}

라벨은 블록으로 구성되며, 블록은 라벨에 배치되는 개별 내용 조각입니다. **Add Block** 패널에서 버튼을 클릭하면 블록이 추가됩니다.

- **Fields** — 출력할 때 값을 가져옵니다. 이름표에서는 **Display Name**, **First Name**, **Last Name**, **Nickname**, **Nametag Notes**(사람 기록에 있는 메모), **Birthday This Week**(사람의 생일이 체크인 날짜 기준 전후 3일 이내일 때 참), **Sessions**(체크인한 예배 시간과 방), **Security Code**, **Date**, **Church Name**을 사용할 수 있습니다. 픽업 슬립에서는 **Children**, **Children & Allergies**, **Security Code**, **Date**, **Church Name**을 사용할 수 있습니다.
- **Text** — 직접 입력하는 고정 텍스트(제목, 라벨, 안내 문구 등)
- **Barcode** — 보안 코드 같은 필드를 담은 Code 128 또는 Code 39 바코드
- **QR Code** — 필드를 담은 QR 코드
- **Box** — 선택적으로 채우기 색과 테두리를 설정할 수 있는 사각형

### 블록 위치와 스타일 지정하기 {#positioning-and-styling-blocks}

라벨에서 블록을 끌어 옮기거나, 블록을 클릭한 뒤 **Properties** 패널을 사용하세요. **X**, **Y**, **W**, **H**는 라벨에 대한 백분율(0–100)입니다. 블록에 따라 다음도 설정할 수 있습니다.

- **Font Size** — 라벨 높이에 대한 상대적인 글자 크기
- **Bold**와 **Italic**
- **Align** — Left, Center, 또는 Right
- **Symbology**와 **Value** — 바코드와 QR 코드용
- **Fill**과 **Border** — 상자용
- **Condition** — **Always**는 블록을 항상 표시합니다. 필드를 고르면 그 필드가 **Is not blank**, **Is blank**, **Equals**, **Does not equal**인 경우에만 블록을 표시할 수 있습니다. 예를 들어 메모가 입력되어 있을 때만 이름표 메모를 표시하거나, **Birthday This Week**가 `true`와 같을 때만 생일 그래픽을 표시할 수 있습니다.

선택한 블록을 삭제하려면 **Remove Block**을 클릭합니다.

### 저장하기 {#saving}

템플릿을 저장하려면 **Save**를, 변경 사항을 버리려면 **Cancel**을 클릭합니다. B1 Checkin은 다음에 설정을 불러올 때 수정된 템플릿을 사용합니다.

## 기본 템플릿 선택하기 {#choosing-the-default-template}

한 유형에 템플릿이 여러 개 있다면 B1 Checkin이 출력해야 할 템플릿에서 **Set Default**를 클릭합니다. 해당 템플릿에 **Default** 배지가 표시되며, 같은 유형의 다른 템플릿은 기본값이 해제됩니다. 어떤 유형에도 기본값으로 지정된 템플릿이 없으면 키오스크는 첫 번째 템플릿을 사용합니다.

## 템플릿 삭제하기 {#deleting-a-template}

템플릿의 행에서 **Delete**를 클릭하고 확인합니다. 한 유형의 템플릿을 모두 삭제하면 B1 Checkin은 해당 유형의 기본 제공 라벨로 되돌아갑니다.

:::tip
템플릿을 수정한 뒤에는 다음 예배 전에 시험 출력을 해서 레이아웃이 올바른지 확인하세요.
:::

## 관련 문서 {#related-articles}

- [출석 설정](./setup.md) — 체크인을 위한 예배와 그룹 구성
- [체크인](./check-in.md) — B1 Checkin 키오스크 설정
- [B1 Checkin 시작하기](../../b1-checkin/getting-started/index.md) — 체크인 키오스크 앱
