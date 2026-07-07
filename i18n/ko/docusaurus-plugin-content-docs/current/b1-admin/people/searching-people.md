---
title: "사람 검색"
---

# 사람 검색

<div class="article-intro">

**People** 페이지는 교회 디렉토리를 검색 가능하고 정렬 가능한 표에 표시합니다. 회중의 누구든 빠르게 찾고, 표시된 정보를 사용자 정의하며, 결과를 내보낼 수 있습니다. 효율적인 검색은 방문자 추적, 연락처 목록 준비, 멤버 기록 관리와 같은 일상적인 교회 관리 작업에 필수적입니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 사람을 볼 수 있는 권한이 있는 활성 B1 Admin 계정이 필요합니다. 액세스 수준이 확실하지 않으면 [Roles & Permissions](roles-permissions.md)을 참조하세요.
- 교회 디렉토리에 사람이 있어야 합니다. 아직 누구도 추가하지 않았다면 [Adding People](adding-people.md) 또는 [Importing Data](importing-data.md)을 참조하세요.

</div>

## Quick Search

People 페이지의 위쪽에 있는 검색 표시줄을 사용하면 실시간으로 멤버를 찾을 수 있습니다:

1. People 페이지의 위쪽에 있는 **search box**를 클릭합니다.
2. 이름, 이메일 또는 기타 키워드를 입력하기 시작합니다.
3. 입력하면서 결과가 자동으로 필터링됩니다(검색이 모든 키 입력에서 작동하지 않도록 약 0.5초의 지연이 있습니다).
4. 아래의 표가 일치하는 결과만 표시하도록 업데이트됩니다.

:::tip
Enter 키를 누를 필요가 없습니다. 입력을 멈춘 후 검색이 자동으로 실행됩니다.
:::

## Sorting Results

표의 열 헤더를 클릭하여 디렉토리를 정렬할 수 있습니다:

1. **column header**(예: **Name** 또는 **Email**)를 클릭하여 해당 열로 정렬합니다.
2. 같은 헤더를 다시 클릭하면 정렬 순서가 역순으로 변합니다.

이를 통해 알파벳순, 연령별 또는 기타 표시 열로 사람을 쉽게 찾을 수 있습니다.

## Customizing Columns

모든 정보를 한 번에 표시할 필요는 없습니다. 표에 표시할 열을 선택할 수 있습니다:

1. 표 위쪽 근처의 **column selector dropdown**을 찾습니다.
2. 열을 선택하거나 선택 해제하여 표시하거나 숨깁니다. 사용 가능한 열:
   - **Photo**
   - **Name**
   - **Email**
   - **Phone**
   - **Address**
   - **Birth Date**
   - **Age**
   - **Gender**
   - **Membership Status**
   - **Campus**
3. 표가 즉시 업데이트되어 선택 사항이 반영됩니다.

:::info
CSV로 내보낼 때 포함할 열을 선택합니다. 내보내기 전에 열을 사용자 정의하여 정확히 필요한 데이터를 얻습니다.
:::

## Pagination

디렉토리에 많은 기록이 있으면 결과가 여러 페이지로 나뉩니다. 표의 아래쪽에 있는 **pagination controls**를 사용하여 페이지 사이를 이동합니다. 현재 페이지와 총 기록 수가 표시되므로 항상 목록의 위치를 알 수 있습니다.

:::tip
한 번에 더 많은 결과를 보려면 검색을 정제하여 목록을 좁혀서 큰 디렉토리를 페이징하는 대신 합니다.
:::

## Exporting Search Results

언제든지 현재 검색 결과를 CSV 파일로 다운로드할 수 있습니다:

1. 원하는 검색 또는 필터를 적용합니다.
2. 필요한 데이터를 포함하도록 열을 사용자 정의합니다.
3. **Export** 버튼을 클릭합니다.
4. CSV 파일이 컴퓨터로 다운로드되어 Excel, Google Sheets 또는 스프레드시트 응용 프로그램에서 열 수 있습니다.

내보내기에 대한 자세한 내용은 [Exporting Data](./exporting-data.md)를 참조하세요.

:::tip
지난 3개월 동안 참석하지 않은 모든 사람을 찾는 것과 같은 고급 쿼리의 경우 일반 언어 질문을 사용하여 검색할 수 있는 [AI Search](./ai-search.md) 기능을 시도하세요.
:::

## Advanced Search

Advanced Search를 사용하면 조건을 결합하여 정확한 필터를 빌드할 수 있습니다. People 페이지에서 열고 카테고리를 확장한 다음 필터링할 필드를 선택하여 각 필드의 연산자와 값을 선택합니다. 카테고리에는 **Names**, **Demographics**, **Contact**, **Membership**, **Activity** (기부 및 출석) 및 **Custom Fields**가 포함됩니다.

**Custom Fields** 카테고리는 교회의 [Custom Fields](../settings/custom-fields.md)를 나열합니다. Settings에서 정의한 필드는 자신의 정보(신원조회 만료 날짜 등)를 추적합니다. 제공되는 연산자는 각 필드의 유형과 일치합니다: 텍스트 필드는 *contains / equals / starts with / ends with*을 지원하고, 숫자 필드는 비교 연산자를 지원하며, 날짜 필드는 *equals / after / before*을 지원하고, Yes/No 및 Multiple Choice 필드는 값을 선택할 수 있습니다. 여기서 필터링할 수 있는 모든 필드는 live [List](./lists.md)로 저장할 수 있습니다.

## Saving Searches as Lists

검색을 실행한 후 **Save as List** 버튼(책갈피 아이콘)이 People 페이지 헤더에 나타납니다. 현재 쿼리를 이름과 선택사항인 카테고리 아래에 저장하여 향후 세션에서 즉시 다시 로드할 수 있습니다. 자세한 내용은 [Saved Lists](./lists.md)를 참조하세요.
