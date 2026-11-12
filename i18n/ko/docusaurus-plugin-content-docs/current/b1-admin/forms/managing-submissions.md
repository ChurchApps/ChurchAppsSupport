---
title: "제출 관리하기"
description: "B1 Admin에서 양식 제출 내용을 검토하고, 인쇄하고, 올바른 사람에게 다시 배정하세요. 방문자 카드와 기도 제목을 바탕으로 후속 조치를 취합니다."
---

# 제출 관리하기

<div class="article-intro">

양식을 공개하면 제출 내용이 들어오기 시작합니다. **Form Submissions** 탭에서 모든 응답을 검토하고, 누가 제출했는지 추적하며, 그 데이터로 성도에게 적시에 후속 조치를 취할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 질문이 하나 이상 있는 [양식을 만드세요](./creating-forms.md).
- 공개 URL로 양식을 공유하거나 [웹사이트](../website/managing-pages.md)에 넣으세요.

</div>

## 제출 내용 보기 {#viewing-submissions}

1. [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(B1 Admin 왼쪽 상단의 검색창)를 열고 **People**을 펼친 뒤 **Forms**를 클릭합니다.
2. 검토할 양식을 클릭합니다.
3. **Form Submissions** 탭으로 이동합니다.

이 탭에는 두 개의 카드가 있습니다.

- **Form Submission Summary** -- 객관식, 체크박스, 예/아니요 질문마다 각 답을 고른 사람 수를 집계합니다.
- **Form Submission Results** -- 모든 응답의 표이며, 제출 건수가 표시됩니다. 각 행에는 제출 대상(사람 양식에서는 **Submitted For**, Stand Alone 양식에서는 **Submitted By**, 또는 **Anonymous**)과 **Submission Date**(제출 날짜)가 나오고, 그다음에 양식의 질문마다 한 열씩 양식 순서대로 나옵니다. 질문이 많으면 표를 옆으로 스크롤하여 나머지 열을 볼 수 있습니다. 사람의 이름을 클릭하면 그 사람의 기록이 열립니다.

어느 카드에서든 **Export**를 클릭하면 응답을 제출 건당 한 행인 CSV 파일로 내려받을 수 있습니다. **Print**(프린터) 아이콘을 클릭하면 교회 이름이 맨 위에 있는 요약과 결과 표를 인쇄합니다.

## 개별 제출 내용 검토하기 {#reviewing-individual-submissions}

한 사람의 답변을 읽거나 인쇄하려면 [사람 목록](../people/adding-people.md#working-with-forms)에서 그 사람의 기록을 열고 **Forms** 섹션에서 양식을 클릭합니다. 그 사람이 한 모든 답변이 질문마다 한 줄씩 나타납니다.

제출 옆의 **print icon**(인쇄 아이콘)을 클릭하면 그 사람이 작성한 답변을 인쇄합니다. 종이 파일이나 보관해야 하는 서명된 동의서에 유용합니다. 인쇄물 맨 위 가운데에는 교회 로고([웹사이트 > 외관](../website/appearance.md)에서 올린 **Light Background Logo**가 있는 경우)와 그 아래 교회 이름이 나옵니다. B1 Admin을 다크 모드로 쓰더라도 인쇄물은 항상 흰 바탕에 어두운 글씨를 사용합니다. 이것은 [빈 양식 인쇄하기](./creating-forms.md#printing-a-blank-form)와 다릅니다. 이 기능은 빈 사본이 아니라 한 사람이 이미 제출한 답변을 인쇄합니다.

## 제출의 사람 바꾸기 {#changing-the-person-on-a-submission}

제출 내용이 잘못된 사람과 연결되어 있다면(예: 가족 두 명이 같은 이메일 주소를 쓰는 경우), 올바른 사람에게 옮기거나 연결을 해제할 수 있습니다.

1. **Form Submissions** 탭에서 사람 이름 옆의 **Change person** 아이콘(화살표 두 개)을 클릭합니다. 같은 아이콘이 [사람의 프로필](../people/adding-people.md#working-with-forms)에 있는 제출 옆에도 나타납니다.
2. **Change person** 대화상자에서 올바른 사람을 검색하고 **Move to this person**을 클릭합니다.
3. 또는 **Unlink (Anonymous**)를 클릭하여 제출을 아무 사람에게서도 분리합니다. 그러면 제출은 **Anonymous**로 표시됩니다.

바뀌는 것은 연결뿐입니다. 답변은 그대로이며, 후속 이메일도 다시 발송되지 않습니다.

:::info
사람 기록을 만들도록 설정된 양식에서, 누군가 교회 사이트에 로그인한 상태로 제출하면 그 제출은 같은 이메일 주소를 가진 다른 사람이 데이터베이스에 있더라도 그 사람 자신의 기록에 연결됩니다. [사람 기록 두 개를 병합](../people/adding-people.md)하면, 제거된 사람의 양식 제출은 남는 사람에게 옮겨집니다.
:::

## 제출이 수집되는 경로 {#how-submissions-are-collected}

제출은 여러 경로로 들어올 수 있습니다.

- **공개 URL** -- 양식에 공개 URL이 있다면(Stand Alone 양식) 링크가 있는 누구나 응답을 제출할 수 있습니다. URL을 이메일, 소셜 미디어, 문자 메시지로 공유하세요.
- **웹사이트에 넣기** -- B1 웹사이트에 넣은 양식은 방문자가 작성하면 제출을 자동으로 수집합니다.
- **내부 사용** -- 직원은 B1 Admin의 사람 기록에서 그 사람을 위해 사람 양식을 작성할 수 있습니다. [양식 다루기](../people/adding-people.md#working-with-forms)를 참조하세요.

:::tip
방문자 카드나 기도 제목 같은 양식은 **Form Submissions** 탭을 정기적으로 확인하여 신속하게 후속 조치를 하세요.
:::

## 제출 데이터 활용하기 {#using-submission-data}

양식으로 수집한 데이터는 다음에 도움이 됩니다.

- 이벤트 등록을 추적하고 그에 맞춰 계획하기
- 방문자나 새 구성원에게 후속 연락하기
- 사역 계획을 위해 설문조사 피드백 모으기
- 행사나 프로그램의 결제 처리하기

:::info
**Admin** 또는 **View Only** 역할의 양식 구성원은 **Form Submissions** 탭에 접근할 수 있습니다. 팀의 적절한 사람이 필요한 양식에 접근할 수 있도록 **Form Members** 탭에서 역할을 관리하세요.
:::

:::info
Stand Alone 양식이 [그룹에 연결되어](./creating-forms.md#linking-a-form-to-a-group) 있다면, 그 그룹의 리더는 양식 구성원이 아니더라도 B1.church의 그룹 페이지에서 제출 내용을 읽고 인쇄할 수 있습니다. 리더는 그곳에서 그룹 행사의 등록 질문에 대한 답변도 읽을 수 있습니다. [그룹 세부 정보](../../b1-church/groups/group-details.md#linked-forms)를 참조하세요.
:::

:::tip
Stand Alone 양식이 사람 기록을 만들도록 설정되어 있다면, 기존 사람과 맞춰진 제출은 사람 목록에서 그 사람의 페이지 **Forms** 섹션에도 나타납니다. 사람 유형 양식만이 아닙니다.
:::

## 다음 단계 {#next-steps}

- [양식 만들기](./creating-forms.md)에서 양식을 만들고 사용자 지정하는 방법을 익히세요.
- 지속적인 후속 조치를 위해 양식 제출자를 [사람 목록](../people/adding-people.md)에 추가하세요.
- 그룹 리더가 답변을 읽을 수 있도록 [양식을 그룹에 연결](./creating-forms.md#linking-a-form-to-a-group)하거나, 독립 신청 양식이 자체 명단을 만들도록 [제출자를 그룹에 자동으로 추가](./creating-forms.md#automatically-adding-submitters-to-a-group)하세요.
