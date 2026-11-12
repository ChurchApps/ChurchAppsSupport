---
title: "사용자 지정 필드"
description: "B1 Admin에서 사용자 지정 필드를 정의하여 배경 조사 만료일이나 셔츠 사이즈 같은 추가 사람 정보를 추적한 다음, 그 필드로 검색하고 필터링하세요."
---

# 사용자 지정 필드

<div class="article-intro">

**사용자 지정 필드**를 사용하면 모든 사람의 기록에 직접 정한 정보를 추적할 수 있습니다. 배경 조사 만료일, 티셔츠 사이즈, 세례 교육 상태처럼 B1에 기본 필드가 없는 정보가 해당됩니다. 설정에서 필드를 한 번 정의하면, 각 사람의 프로필에 값을 입력하고 그 필드로 검색하거나 목록을 만들 수 있습니다. 이는 단일 사용자 지정 데이터를 저장하기 위해 사람 양식을 따로 만들던 이전의 임시방편을 대체합니다.

</div>

## 교육 동영상 {#training-video}

<YouTube id="yUfDEbp2HQ4" title="B1의 사용자 지정 필드, 일괄 편집, 내보내기" next="B1에서 그룹 만들기 및 구성원 추가하기" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- 설정 페이지를 열고(직함 목록을 저장하려면) **Edit Church Settings**(교회 설정 편집) 권한이 필요하며, 필드를 정의하고 값을 입력하려면 **People**(사람) 편집 권한이 필요합니다. People 보기 권한이 있는 사람은 값을 볼 수 있습니다. [역할 및 권한](./roles-permissions.md)을 참고하세요.
- 시작하기 전에 무엇을 추적할지, 그리고 어떤 유형(텍스트, 숫자, 날짜, 예/아니요, 선택 목록)이 가장 적합한지 정하세요.

</div>

## 사용자 지정 필드 열기 {#opening-custom-fields}

B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Settings > Settings**(설정 > 설정)를 선택한 다음, 왼쪽 목록에서 **Custom Fields**(사용자 지정 필드)를 클릭하여 **Custom Fields** 섹션으로 스크롤하세요. **/settings/custom-fields** 주소로 바로 이동할 수도 있습니다. 정의한 모든 필드가 **Name**(이름)과 **Field Type**(필드 유형)과 함께 목록으로 표시됩니다. 아직 만든 필드가 없다면 패널에 *"No custom fields have been added yet."*(아직 추가된 사용자 지정 필드가 없습니다.)이 표시됩니다.

## 직함 {#titles}

사용자 지정 필드 섹션 상단의 **Titles**(직함) 카드에는, B1 Admin과 B1 앱(프로필 편집기와 손님 등록 양식)에서 사람을 추가하거나 편집할 때 **Title**(직함) 상자에 제공되는 직함 목록이 있습니다. 목록은 Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor로 시작합니다.

1. **New title**(새 직함)에 직함을 입력하세요(최대 10자). 예: *Deacon*(집사) 또는 *Elder*(장로). 그다음 **Add Title**(직함 추가)을 클릭하세요.
2. 목록에서 직함을 빼려면, 그 칩의 **×**를 클릭하세요.
3. **Save**를 클릭하세요. *Titles saved.*(직함이 저장되었습니다.) 메시지가 변경을 확인해 줍니다. 이미 목록에 있는 직함을 추가하면 *That title is already in the list.*(이 직함은 이미 목록에 있습니다.)가 표시됩니다.

:::tip
직함 상자는 여전히 직접 입력을 받으므로, 직원과 구성원은 목록에 없는 직함도 입력할 수 있습니다. 목록에서 직함을 삭제해도 이미 그 직함을 가진 사람은 바뀌지 않습니다.
:::

## 필드 추가하기 {#adding-a-field}

1. **Add Field**(필드 추가)를 클릭하세요.
2. 오른쪽에 열리는 편집기에서 **Name**(이름)을 입력하세요. 이것은 직원이 사람 프로필과 검색에서 보게 될 레이블입니다(예: *Background check expires*(배경 조사 만료)).
3. **Field Type**(필드 유형)을 선택하세요.
   - **Textbox**(텍스트 상자) — 자유 형식의 짧은 텍스트입니다.
   - **Whole Number**(정수) — 소수점이 없는 숫자입니다(예: 개수).
   - **Decimal**(소수) — 소수점을 포함할 수 있는 숫자입니다.
   - **Date**(날짜) — 달력 날짜입니다.
   - **Yes/No**(예/아니요) — 간단한 예 또는 아니요 답변입니다.
   - **Multiple Choice**(객관식) — 선택 목록입니다. 이 유형을 고르면 **choices editor**(선택지 편집기)가 나타나 사람들이 고를 수 있는 각 항목을 추가할 수 있습니다.
4. **Save**를 클릭하세요.

이제 모든 사람의 프로필에서 이 필드를 사용할 수 있습니다.

:::info
필드 유형은 [양식 질문](../forms/creating-forms.md)에서 쓰는 것과 같으므로, 값이 B1 전체에서 일관되게 작동합니다.
:::

## 필드 편집하기 {#editing-a-field}

목록에서 필드 행을 클릭하면 편집기에서 다시 열립니다. 이름, 유형, 선택지를 바꾸고 **Save**를 클릭하세요.

:::warning
이미 값이 있는 필드의 **Field Type**을 바꾸면(예: Textbox에서 Date로), 이전에 입력한 값이 새 유형과 맞지 않는 형식으로 남을 수 있습니다. 직원이 필드를 채우기 시작한 후에는 유형을 바꿀 때 신중하세요.
:::

## 필드 삭제하기 {#deleting-a-field}

필드를 편집용으로 열고 **Delete**(삭제)를 클릭하세요. 확인을 요청합니다. *"Are you sure you wish to delete this custom field? Its stored values will also be removed."*(이 사용자 지정 필드를 삭제하시겠습니까? 저장된 값도 함께 삭제됩니다.) 필드를 삭제하면 필드와 **모든 사람에 대해 그 필드에 저장된 모든 값**이 영구적으로 제거되며, 이는 되돌릴 수 없습니다.

## 사람의 값 입력하기 {#filling-in-values-on-a-person}

사용자 지정 필드가 하나라도 생기면, 그 값은 각 사람의 기록에서 기본 정보와 나란히 위치합니다. 프로필 왼쪽의 연락처 정보와 함께 값을 보고, 사람의 나머지 정보에 쓰는 것과 같은 양식에서 값을 편집합니다. 첫 번째 필드를 정의하기 전까지는 추가로 나타나는 것이 없습니다.

1. **People**(사람)에서 사람의 기록을 여세요.
2. 프로필 왼쪽, 사람의 연락처 정보 아래에 있는 **Edit**(편집) 버튼을 클릭하세요.
3. 편집 양식 하단의 **Custom Fields**(사용자 지정 필드) 영역으로 스크롤하여 각 필드에 값을 입력하세요. 각 필드에는 유형에 맞는 입력 도구가 표시됩니다. 날짜 필드에는 날짜 선택기, 예/아니요 필드에는 예/아니요 드롭다운, 객관식 필드에는 선택 목록 등이 나타납니다.
4. **Save**를 클릭하세요. 사용자 지정 필드 값은 사람의 나머지 정보와 함께 저장됩니다.

프로필로 돌아가면, 값이 있는 필드가 사람의 연락처 정보 아래에 *필드 이름: 값* 형식으로 표시됩니다(예/아니요 답변은 *Yes*(예) 또는 *No*(아니요)로 표시되고, 객관식은 선택 항목의 레이블이 표시됩니다). 비워 둔 필드는 그냥 숨겨집니다. 값을 삭제하려면 사람을 편집하고 필드를 지운 다음 저장하세요. 빈 값은 빈칸으로 저장되지 않고 기록에서 삭제됩니다.

:::tip
대표적인 활용 사례는 자원봉사자 안전입니다. *Background check expires*(배경 조사 만료)라는 **Date** 필드를 만들고, 각 자원봉사자의 날짜를 기록한 다음, 날짜가 지난 사람을 표시하는 [저장된 목록](../people/lists.md)을 만드세요.
:::

## 사용자 지정 필드로 검색하고 목록 만들기 {#searching-and-building-lists-on-custom-fields}

사용자 지정 필드는 모두 검색할 수 있습니다.

1. **People** 페이지에서 [고급 검색](../people/searching-people.md)을 여세요.
2. **Custom Fields**(사용자 지정 필드) 분류를 펼치세요.
3. 필터링하려는 필드를 체크하고, 연산자를 고른 다음 값을 입력하세요. 제공되는 연산자는 필드 유형에 따라 다릅니다.
   - **Textbox** — contains(포함), equals(같음), starts with(시작), ends with(끝).
   - **Whole Number / Decimal** — equals(같음), greater than(보다 큼), greater than or equal(크거나 같음), less than(보다 작음), less than or equal(작거나 같음).
   - **Date** — equals(같음), after(이후, 보다 큼), before(이전, 보다 작음).
   - **Yes/No** — Yes 또는 No와 같음.
   - **Multiple Choice** — 선택지 중 하나와 같거나 포함.

사용자 지정 필드 검색은 어떤 것이든 [목록](../people/lists.md)으로 저장할 수 있습니다. 목록은 실시간 쿼리이므로, *Background check expires is before today*(배경 조사 만료가 오늘 이전)에 기반한 목록은 열 때마다 모든 사람을 다시 확인합니다. 수동으로 관리할 필요가 없습니다.

## 사용자 지정 필드를 열로 표시하기 {#showing-a-custom-field-as-a-column}

모든 사람의 값을 한꺼번에 보려면, **People** 페이지에 열로 추가하세요. **View as**(보기 방식)를 **Table**(표)로 바꾸고, 페이지 상단의 **Select columns**(열 선택) 아이콘을 클릭한 다음 **Custom**(사용자 지정) 탭으로 전환하고 필드를 체크하세요. 각 사람의 값이 기본 열 옆에 자체 열로 나타납니다. [사용자 지정 필드를 열로 표시하기](../people/searching-people.md#showing-custom-fields-as-columns)를 참고하세요.

## 병합할 때 일어나는 일 {#what-happens-on-merge}

[두 사람의 기록을 병합](../people/adding-people.md)하면, 사용자 지정 필드 값은 자동으로 옮겨집니다. 남기는 사람은 자신의 값을 그대로 유지하며, 제거되는 사람에게만 값이 있던 필드는 그 값이 복사되어 아무것도 잃지 않습니다.

## 관련 문서 {#related-articles}

- [사람 검색](../people/searching-people.md) — 사용자 지정 필드 분류를 포함한 고급 검색과, 사용자 지정 필드를 열로 표시하기
- [저장된 목록](../people/lists.md) — 사용자 지정 필드 검색을 저장하고 실시간으로 다시 실행하기
- [역할 및 권한](./roles-permissions.md) — 필드를 정의하고 값을 편집할 수 있는 사람
- [양식 만들기](../forms/creating-forms.md) — 단일 필드보다 전체 양식이 더 적합한 여러 질문 기반 데이터 수집
