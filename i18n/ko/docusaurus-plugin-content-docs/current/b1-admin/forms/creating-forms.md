---
title: "양식 만들기"
description: "B1 Admin에서 이벤트 등록, 설문조사, 방문자 카드를 위한 사용자 지정 양식을 만들고, 링크, QR 코드, 인쇄로 공유하세요."
---

# 양식 만들기

<div class="article-intro">

성도에게서 정보를 수집하는 사용자 지정 양식을 만드세요. 이벤트 등록, 설문조사, 방문자 카드, 교인 신청서 등의 양식을 만들 수 있습니다. 양식은 데이터베이스의 사람과 연결하거나, 자체 공개 URL이 있는 독립 페이지로 사용할 수 있습니다.

</div>

## 교육 영상 {#training-video}

<YouTube id="UZ4dGCNIFw4" title="B1에서 양식 만들기와 제출 관리하기" next="B1에서 교회 웹사이트 출시하기" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- **사람(People)** 양식(사람 기록에 연결되는 양식)은 먼저 데이터베이스에 [사람이 있어야](../people/adding-people.md) 합니다.
- **결제**를 받는 양식은 [온라인 헌금용 Stripe가 설정](../donations/online-giving-setup.md)되어 있어야 합니다.

</div>

## 새 양식 만들기 {#creating-a-new-form}

1. [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(B1 Admin 왼쪽 상단의 검색창)를 열고 **People**을 펼친 뒤 **Forms**를 클릭합니다.
2. **Add Form**을 클릭합니다.
3. 양식의 **name**(이름)을 입력합니다.
4. **Associate With** 드롭다운에서 양식 유형을 고릅니다.
   - **People** — 제출 내용을 데이터베이스의 [사람 기록](../people/adding-people.md)과 연결합니다. 사람 양식은 사람의 기록에서 작성하므로 공유 링크가 생성되지 않습니다.
   - **Stand Alone** — 자체 공개 URL이 있는 독립 양식을 만듭니다. 외부 등록에 이상적입니다. Stand Alone 양식에서만 [헤더 사진](#adding-a-header-photo), [QR 코드](#sharing-a-form-with-a-qr-code), [연결된 그룹](#linking-a-form-to-a-group), **Create a person record from submissions**(제출 내용으로 사람 기록 만들기)를 사용할 수 있습니다.
5. Stand Alone 양식이라면 지금 또는 나중에 [양식 속성](#configuring-form-properties)의 나머지를 입력할 수 있습니다.
6. **Save**를 클릭하여 양식을 만듭니다.

새 양식이 목록에 나타납니다. 클릭하면 질문을 추가할 수 있습니다.

## 빈 양식 인쇄하기 {#printing-a-blank-form}

나눠 줄 종이 사본이 필요하신가요? 안내 데스크의 방문자 카드나, 인터넷이 없는 사람이 손으로 작성할 양식이 필요할 수 있습니다. 기본 Forms 목록에서 양식 옆의 **Print**를 클릭하여 미리 보기를 연 뒤 **Print**를 클릭하세요. 빈 항목은 각 질문마다 밑줄이나 체크박스가 인쇄되어 손으로 작성할 수 있으며, 필수 질문에는 별표가 표시됩니다. 페이지 상단에는 교회 로고([웹사이트 > 외관](../website/appearance.md)에서 올린 **Light Background Logo**가 있는 경우)와 그 아래의 교회 이름, 그다음 양식 이름이 나옵니다. 다른 인쇄 옵션은 없습니다. 양식 전체를 인쇄하거나 아무것도 인쇄하지 않습니다.

## QR 코드로 양식 공유하기 {#sharing-a-form-with-a-qr-code}

Stand Alone 양식은 기본 Forms 목록에서 옆에 **QR Code** 링크가 있습니다(보관된 양식에는 없습니다). 클릭하면 양식의 공개 URL에 대한 QR 코드가 열리며, 그 아래에 링크가 표시됩니다. **Download PNG**를 클릭하면 주보나 슬라이드에 넣을 수 있는 이미지로 저장할 수 있습니다. 코드를 스캔한 사람은 휴대폰에서 양식을 열게 됩니다.

## 질문 추가하기 {#adding-questions}

1. 양식을 열고 **Questions** 탭으로 이동합니다.
2. **Add Question**을 클릭합니다.
3. **Field Type**을 고릅니다.
   - **Textbox** — 짧은 텍스트 답변
   - **Whole Number**와 **Decimal** — 숫자
   - **Date** — 날짜 선택
   - **Yes/No** — 예/아니요 답변
   - **Email** — 이메일 주소
   - **Phone Number** — 전화번호 입력
   - **Text Area** — 긴 답변
   - **Multiple Choice** — 여러 선택지 중 하나 고르기
   - **Checkbox** — 여러 선택지를 원하는 만큼 체크하기
   - **Payment** — 결제 받기
4. 질문의 **Title**과 선택 사항인 **Description**(설명)을 입력합니다. 설명은 사람들이 양식을 작성할 때 질문 아래에 표시되므로 "알아 두어야 할 알레르기가 있으면 적어 주세요." 같은 힌트를 넣는 데 사용하세요.
5. 선택한 유형에 맞는 추가 항목을 입력합니다.
   - 텍스트, 숫자, 날짜, 이메일, 전화번호 질문에서는 선택 사항인 **Placeholder**(안내 문구)가 빈 상자 안에 예시 텍스트로 표시됩니다.
   - **Multiple Choice**와 **Checkbox**는 **Choices** 아래에 각 선택지를 추가합니다. **Value**(저장되는 값)와 **Text**(사람들이 보는 글)를 입력한 뒤 추가 버튼을 클릭합니다. 선택지를 빼려면 제거 아이콘을 클릭하세요.
   - **Payment**는 돈을 받을 **Fund**(기금)와 **Amount**(금액)를 고릅니다.
6. 필수 항목이라면 **Require an answer for this question**(이 질문에 답변 필수)을 체크합니다. (결제 질문에는 이 옵션이 없습니다.)
7. **Save**를 클릭합니다.
8. 질문을 더 추가하려면 반복합니다.

**Questions** 탭에는 각 질문의 유형과 필수 여부가 나열됩니다. 질문 제목을 클릭하면 편집할 수 있고, 질문의 양식에서 **Delete**를 클릭한 뒤 확인하면 삭제됩니다. 행의 **Move up**과 **Move down** 화살표로 질문이 나타나는 순서를 바꿀 수 있습니다.

:::warning
**Payment** 필드 유형은 Stripe 설정이 필요합니다. 아직 온라인 헌금을 설정하지 않았다면 결제 필드를 추가하기 전에 [온라인 헌금 설정](../donations/online-giving-setup.md)을 참조하세요. 로그인하지 않고 양식에서 결제하는 사람은 카드가 승인되기 전에 **I'm not a robot** 확인란을 체크해야 합니다.
:::

## 양식 구성원 관리하기 {#managing-form-members}

Stand Alone 양식에는 특정 양식에만 접근 권한을 줄 수 있는 **Form Members** 탭이 있습니다.

1. 양식을 열고 **Form Members** 탭으로 이동합니다.
2. **Add Person**에서 사람을 검색하고 이름 옆의 추가 아이콘을 클릭합니다. 새 구성원은 **View Only**(보기 전용)로 시작합니다.
3. **Permission** 열에서 원하는 역할을 클릭합니다.
   - **Admin** — 양식을 편집하고 모든 제출 내용을 볼 수 있습니다.
   - **View Only** — 제출 내용을 볼 수 있지만 양식은 편집할 수 없습니다.
4. 양식이 제출될 때마다 이메일을 받아야 하는 사람에게는 **Email Notification**을 켭니다.

누군가를 양식에서 빼려면 해당 행의 **Remove**를 클릭하고 확인합니다.

## 양식을 그룹에 연결하기 {#linking-a-form-to-a-group}

Stand Alone 양식은 어떤 그룹에든 연결할 수 있습니다. 예를 들어 소그룹의 기도 제목 양식이나 청소년 여행의 의료 동의서가 있습니다.

1. 양식을 열고 **Edit Form**을 클릭합니다(또는 Forms 목록에서 양식 옆의 **Edit**를 클릭합니다).
2. **Linked group** 아래에서 그룹을 고르거나 **None**으로 둡니다.
3. **Save**를 클릭합니다.

양식이 연결되면 다음과 같이 작동합니다.

- **그룹 구성원**은 양식이 열려 있는 동안 B1.church의 그룹 페이지에 있는 **Forms** 섹션에서 양식을 보며, **Fill out** 버튼으로 양식을 열 수 있습니다([그룹 세부 정보](../../b1-church/groups/group-details.md#linked-forms) 참조).
- **그룹 리더**는 마감된 양식도 볼 수 있으며, 모든 제출 답변을 읽고 인쇄할 수 있습니다(제출 하나 또는 **Print all**). 리더는 답변을 보기만 할 수 있으며, [양식 구성원](#managing-form-members)이 아니라면 양식을 편집할 수 없습니다.
- **B1 Admin**에서는 그룹 페이지에 **Linked forms** 섹션이 있으며, 연결된 각 양식을 **Open** 또는 **Closed**로 나열합니다. 이 섹션은 그룹의 리더와 양식을 관리할 수 있는 사람에게 보입니다. [그룹 구성원](../groups/group-members.md#linked-forms)을 참조하세요.

양식은 사용 가능 기간 밖에 있으면 마감된 상태입니다. 보관된 양식은 그룹 페이지에 표시되지 않습니다.

### 제출자를 그룹에 자동으로 추가하기 {#automatically-adding-submitters-to-a-group}

양식을 그룹에 연결한다고 해서 그것만으로 사람이 추가되지는 않습니다. 제출한 모든 사람을 연결된 그룹의 명단에 추가하려면, 양식 설정에서 **Create a person record from submissions**도 체크하고 **Save**를 클릭하세요.

누군가 양식을 제출할 때마다 일치하는 사람 또는 새로 만든 사람이 그룹에 추가됩니다(이미 그룹 구성원인 사람은 건너뜁니다). 예를 들어 캠프 신청 양식이 캠프 명단 그룹을 자동으로 채우도록 할 때 유용합니다.

### 후속 이메일 보내기 {#sending-a-follow-up-email}

**Create a person record from submissions**를 체크하면, 양식을 제출한 각 사람에게 이메일을 보낼 수도 있습니다. 양식 설정에서 **Follow-up Email Subject**와 **Follow-up Email Body**를 입력합니다. 두 항목 모두에서 `{firstName}`과 `{churchName}` 토큰을 사용할 수 있습니다. 이메일은 두 항목이 모두 입력되었을 때만 발송됩니다.

:::info
후속 이메일은 교회가 그룹 이메일 발송을 승인받은 뒤에만 나가며, 교회의 일일 이메일 한도에 포함됩니다. [교회의 그룹 이메일 켜기](../groups/group-members.md#turning-on-group-email-for-your-church)를 참조하세요.
:::

## 양식 복제하기 {#duplicating-a-form}

기존 양식을 새 양식의 출발점으로 쓰려면, 양식 목록에서 양식 옆의 **Duplicate**를 클릭하고 확인합니다. **Form duplicated** 메시지가 나타나며, B1은 모든 질문을 포함한 양식의 정확한 복사본을 만듭니다. 그 복사본은 이름을 바꾸고 독립적으로 편집할 수 있습니다.

:::tip
복제는 해마다 등록 질문이 같은 반복 행사에 편리합니다. 작년 양식을 복제하고 이름과 날짜만 고치면 바로 사용할 수 있습니다.
:::

## 양식 속성 설정하기 {#configuring-form-properties}

양식의 이름과 설정은 언제든지 바꿀 수 있습니다. 양식을 열고 페이지 왼쪽의 **Edit Form**을 클릭하거나, Forms 목록에서 양식 옆의 **Edit**를 클릭하세요. 양식 페이지 왼쪽에는 양식 유형(**People** 또는 **Stand Alone**)이 표시되며, Stand Alone 양식이라면 **Public**(공개)인지 **Restricted**(제한)인지와, 누구에게든 공유할 수 있는 고유한 **public URL**(공개 URL)이 표시됩니다.

**Edit Form** 설정은 다음과 같습니다.

- **Form Name** -- B1 Admin과 양식 상단에 표시되는 이름입니다.
- **Description** *(Stand Alone)* -- 공개 양식 페이지에서 질문 위에 표시되는 글입니다. 작성을 시작하기 전에 이 양식이 무엇을 위한 것인지 알려 주는 데 유용합니다.
- **Header Photo** *(Stand Alone)* -- [헤더 사진 추가하기](#adding-a-header-photo)를 참조하세요.
- **Form Access** *(Stand Alone)* -- **Public**은 링크가 있는 누구나 양식을 작성할 수 있게 하고, **Restricted**는 사람들이 교회 사이트에 로그인해야 양식을 열 수 있게 합니다.
- **Set Form Availability Timeframe** *(Stand Alone)* -- **Yes**를 고르고 **Availability Start Date**와 **Availability End Date**를 설정하면 그 날짜 사이에만 제출을 받습니다. 그 밖의 기간에는 양식이 마감됩니다.
- **Thank You Message** -- 제출 후 사람들이 보는 메시지입니다(아래 참조).
- **Display Mode** -- **Standard**는 모든 질문을 한 페이지에 보여 주고, **Conversational (one question at a time**)은 질문을 한 번에 하나씩 진행합니다.
- **Create a person record from submissions** *(Stand Alone)*, **Linked group**, 그리고 후속 이메일 항목 -- [양식을 그룹에 연결하기](#linking-a-form-to-a-group)와 [후속 이메일 보내기](#sending-a-follow-up-email)를 참조하세요.

변경 내용을 유지하려면 **Save**를 클릭합니다. 양식을 영구히 삭제하려면 양식 설정에서 **Delete**를 클릭하고 확인합니다. 목록에서 숨기되 남겨 두려면 대신 [보관](./index.md#what-you-can-do)하세요.

### 헤더 사진 추가하기 {#adding-a-header-photo}

Stand Alone 양식은 양식 상단에 **Header Photo**(헤더 사진)를 표시할 수 있습니다. 양식 세부 정보에서 사진 상자나 **Add Photo**를 클릭한 뒤 이미지를 고르거나 업로드합니다(16:9 비율로 잘립니다). **Save**를 클릭하세요. 사진은 양식 이름 아래, 설명 위에 나타나며, 양식의 공개 URL 페이지와 웹사이트 **Form** 요소로 양식을 넣은 곳에도 표시됩니다. **Change Photo**로 바꾸거나 **Remove**로 제거할 수 있습니다.

**Thank You Message** 항목을 사용하면 사람들이 양식을 제출한 뒤 보는 내용을 설정할 수 있습니다. 공개 URL 페이지에서도 같습니다. 비워 두면 "Thank you for submitting the form!"(양식을 제출해 주셔서 감사합니다!)이 표시됩니다.

:::tip
Stand Alone 양식은 이벤트 등록에 아주 좋습니다. 공개 URL을 이메일, 소셜 미디어로 공유하거나, 양식을 교회 웹사이트에 직접 넣으세요.
:::

:::info
B1 웹사이트에 양식을 넣으려면 웹사이트 편집기로 가서 새 섹션을 추가하고 **Form** 요소를 고르세요. 그다음 표시할 양식을 고릅니다. 웹사이트 편집에 대한 자세한 내용은 [페이지 관리](../website/managing-pages.md)를 참조하세요.
:::
