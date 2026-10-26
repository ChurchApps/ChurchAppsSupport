---
title: "사용자 지정 필드"
---

# 사용자 지정 필드

<div class="article-intro">

**사용자 지정 필드**를 사용하면 모든 사람 기록에 직접 정의한 정보를 추적할 수 있습니다. 예를 들어 신원 조회(배경 확인) 만료일, 티셔츠 사이즈, 세례 수업 상태처럼 B1에 기본 제공되지 않는 정보를 저장할 수 있습니다. 설정에서 필드를 한 번 정의하면, 각 사람의 프로필에 값을 입력하고 그 값을 기준으로 검색하거나 목록을 만들 수 있습니다. 이는 단일 데이터를 저장하기 위해 사람 양식(People form)을 따로 만들던 이전 방식을 대신합니다.

</div>

## 교육 동영상

<YouTube id="yUfDEbp2HQ4" title="Custom Fields, Bulk Editing, and Exporting in B1" next="Creating Groups and Adding Members in B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- 필드를 정의하고 값을 입력하려면 **People** 편집 권한과 **Settings** 영역에 대한 접근 권한이 필요합니다. People 보기 권한이 있는 사용자는 값을 확인할 수 있습니다. [역할 및 권한](./roles-permissions.md)을 참고하세요.
- 시작하기 전에 추적하려는 정보와 가장 적합한 유형(텍스트, 숫자, 날짜, 예/아니요, 선택 목록)을 정하세요.

</div>

## 사용자 지정 필드 열기

B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Settings > Settings**를 선택한 다음, 왼쪽 목록에서 **Custom Fields**를 클릭하여 **Custom Fields** 섹션으로 이동합니다. **/settings/custom-fields** 주소로 바로 이동할 수도 있습니다. 정의한 모든 필드가 **Name**과 **Field Type**과 함께 목록으로 표시됩니다. 아직 만든 필드가 없다면 패널에 *"No custom fields have been added yet."* 메시지가 표시됩니다.

## 필드 추가하기

1. **Add Field**를 클릭합니다.
2. 오른쪽에 열리는 편집기에서 **Name**을 입력합니다. 이 이름은 직원이 사람 프로필과 검색에서 보게 되는 레이블입니다(예: *Background check expires*).
3. **Field Type**을 선택합니다.
   - **Textbox** -- 자유 형식의 짧은 텍스트입니다.
   - **Whole Number** -- 소수점이 없는 숫자입니다(예: 개수).
   - **Decimal** -- 소수점을 포함할 수 있는 숫자입니다.
   - **Date** -- 달력 날짜입니다.
   - **Yes/No** -- 간단한 예/아니요 답변입니다.
   - **Multiple Choice** -- 선택 목록입니다. 이 유형을 선택하면 **choices editor**가 나타나며, 사람들이 선택할 수 있는 각 항목을 추가할 수 있습니다.
4. **Save**를 클릭합니다.

이제 해당 필드가 모든 사람의 프로필에서 사용할 수 있습니다.

:::info
필드 유형은 [양식 질문](../forms/creating-forms.md)에 사용되는 것과 같은 유형이므로, B1 전반에서 값이 일관되게 동작합니다.
:::

## 필드 수정하기

목록에서 필드 행을 클릭하면 편집기에서 다시 열립니다. 이름, 유형 또는 선택 항목을 변경한 다음 **Save**를 클릭하세요.

:::warning
이미 값이 입력된 필드의 **Field Type**을 변경하면(예: Textbox에서 Date로) 기존에 입력된 값이 새 유형과 맞지 않는 형식으로 남을 수 있습니다. 직원들이 이미 필드를 채우기 시작한 뒤에는 유형을 변경할 때 주의하세요.
:::

## 필드 삭제하기

필드를 열어 편집 상태로 만든 다음 **Delete**를 클릭합니다. *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* 라는 확인 메시지가 표시됩니다. 필드를 삭제하면 필드와 **모든 사람에 대해 저장된 모든 값**이 영구적으로 제거되며, 이 작업은 되돌릴 수 없습니다.

## 사람의 값 입력하기

사용자 지정 필드가 하나 이상 존재하면, 그 값은 각 사람의 기록에 있는 기본 세부 정보와 나란히 표시됩니다. 프로필 왼쪽에 있는 연락처 정보와 함께 값을 볼 수 있으며, 사람의 다른 정보를 편집할 때 사용하는 같은 양식에서 값을 수정할 수 있습니다. 첫 번째 필드를 정의하기 전에는 아무것도 추가로 나타나지 않습니다.

1. **People**에서 사람의 기록을 엽니다.
2. 프로필 왼쪽, 연락처 정보 아래에 있는 **Edit** 버튼을 클릭합니다.
3. 편집 양식 하단의 **Custom Fields** 영역으로 스크롤하여 각 필드의 값을 입력합니다. 각 필드는 유형에 맞는 입력 방식으로 표시됩니다. 예를 들어 Date 필드에는 날짜 선택기가, Yes/No 필드에는 예/아니요 드롭다운이, Multiple Choice 필드에는 선택 목록이 나타납니다.
4. **Save**를 클릭합니다. 사용자 지정 필드 값은 사람의 나머지 세부 정보와 함께 저장됩니다.

프로필로 돌아가면 값이 입력된 필드는 연락처 정보 아래에 *필드 이름: 값* 형식으로 표시됩니다(예/아니요 답변은 *Yes* 또는 *No*로, Multiple Choice는 선택한 항목의 레이블로 표시됩니다). 비어 있는 필드는 표시되지 않습니다. 값을 삭제하려면 사람을 편집하고 필드를 비운 다음 저장하세요. 빈 값은 공백으로 저장되지 않고 기록에서 삭제됩니다.

:::tip
가장 대표적인 활용 사례는 자원봉사자 안전 관리입니다. **Date** 필드인 *Background check expires*를 만들고 각 자원봉사자의 날짜를 기록한 다음, 날짜가 지난 사람을 표시하는 [저장된 목록](../people/lists.md)을 만드세요.
:::

## 사용자 지정 필드로 검색하고 목록 만들기

사용자 지정 필드는 모든 검색 기능을 지원합니다.

1. **People** 페이지에서 [고급 검색](../people/searching-people.md)을 엽니다.
2. **Custom Fields** 범주를 펼칩니다.
3. 필터링할 필드를 선택하고, 연산자를 고른 다음 값을 입력합니다. 제공되는 연산자는 필드 유형에 따라 달라집니다.
   - **Textbox** -- contains, equals, starts with, ends with
   - **Whole Number / Decimal** -- equals, greater than, greater than or equal, less than, less than or equal
   - **Date** -- equals, after(greater than), before(less than)
   - **Yes/No** -- equals Yes 또는 No
   - **Multiple Choice** -- 선택 항목 중 하나와 equals 또는 contains

사용자 지정 필드 검색은 모두 [목록](../people/lists.md)으로 저장할 수 있습니다. 목록은 실시간 쿼리이므로, *Background check expires is before today*를 기준으로 만든 목록은 열 때마다 모든 사람을 다시 확인합니다. 별도로 관리할 필요가 없습니다.

## 사용자 지정 필드를 열(column)로 표시하기

모든 사람의 필드 값을 한눈에 보려면 **People** 페이지에 열로 추가하세요. **View as**를 **Table**로 전환하고, 페이지 상단의 **Select columns** 아이콘을 클릭한 다음 **Custom** 탭으로 이동하여 해당 필드를 체크합니다. 각 사람의 값이 기본 열 옆의 개별 열에 표시됩니다. 자세한 내용은 [사용자 지정 필드를 열로 표시하기](../people/searching-people.md#showing-custom-fields-as-columns)를 참고하세요.

## 병합 시 동작

[두 사람 기록을 병합](../people/adding-people.md)하면 사용자 지정 필드 값이 자동으로 이전됩니다. 남기는 사람은 자신의 값을 그대로 유지합니다. 제거되는 사람에게만 값이 있던 필드는 그 값이 복사되므로 아무 정보도 잃지 않습니다.

## 관련 문서

- [사람 검색](../people/searching-people.md) -- 사용자 지정 필드 범주를 포함한 고급 검색, 사용자 지정 필드를 열로 표시하기
- [저장된 목록](../people/lists.md) -- 사용자 지정 필드 검색을 저장하고 실시간으로 다시 실행하기
- [역할 및 권한](./roles-permissions.md) -- 필드를 정의하고 값을 편집할 수 있는 사용자
- [양식 만들기](../forms/creating-forms.md) -- 단일 필드보다 전체 양식이 적합한 여러 질문 데이터 수집
