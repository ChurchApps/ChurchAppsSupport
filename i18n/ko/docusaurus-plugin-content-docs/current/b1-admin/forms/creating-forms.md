---
title: "양식 만들기"
---

# 양식 만들기

<div class="article-intro">

교회 구성원에게서 정보를 받으려면 맞춤 양식을 만드세요. 행사 등록, 설문조사, 방문자 카드, 교인 가입 신청서 등 여러 용도로 양식을 만들 수 있습니다. 양식은 데이터베이스의 사람 기록에 연결할 수도 있고, 자체 공개 URL을 가진 독립형 페이지로 사용할 수도 있습니다.

</div>

## 교육 동영상

<YouTube id="sr9wxEj9ghQ" title="B1에서 양식 만들기와 제출 관리하기" next="B1에서 교회 웹사이트 시작하기" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- **People** 양식(사람 기록에 연결되는 양식)을 만들려면 먼저 [데이터베이스에 사람](../people/adding-people.md)이 있어야 합니다.
- **결제**를 받는 양식은 먼저 [온라인 헌금용 Stripe 설정](../donations/online-giving-setup.md)이 되어 있어야 합니다.

</div>

## 새 양식 만들기

1. [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(B1 Admin 왼쪽 위의 검색창)를 열고 **People**을 펼친 다음 **Forms**를 클릭하세요.
2. **Add Form**을 클릭하세요.
3. 양식의 **name**을 입력하세요.
4. **Associate With** 드롭다운에서 양식 유형을 고르세요.
   - **People** — 제출 내용을 데이터베이스의 [사람 기록](../people/adding-people.md)에 연결합니다. People 양식은 사람의 기록에서 채워지므로 공유 가능한 링크가 생성되지 않습니다.
   - **Stand Alone** — 자체 공개 URL을 가진 독립 양식을 만듭니다. 외부 등록에 적합합니다. Stand Alone 양식에서만 [머리글 사진](#adding-a-header-photo), [QR 코드](#sharing-a-form-with-a-qr-code), [연결된 그룹](#linking-a-form-to-a-group), **Create a person record from submissions** 기능을 사용할 수 있습니다.
5. **Save**를 클릭해 양식을 만드세요.

새 양식이 목록에 나타납니다. 양식을 클릭하면 질문을 추가할 수 있습니다.

## 빈 양식 인쇄하기 {#printing-a-blank-form}

방문자 카드를 안내 데스크에 두거나, 인터넷이 없는 사람이 손으로 쓸 수 있도록 종이 사본이 필요하신가요? 양식 목록에서 양식 옆의 **Print**를 클릭해 미리 보기를 연 다음 **Print**를 클릭하세요. 빈칸에는 각 질문마다 밑줄이나 확인란이 인쇄되어 손으로 쓸 수 있으며, 필수 질문에는 별표가 붙습니다. 페이지 위쪽에는 교회 로고([웹사이트 > Appearance](../website/appearance.md)에서 올린 **Light Background Logo**, 올린 것이 있는 경우)와 교회 이름, 그 아래 양식 이름이 나타납니다. 다른 인쇄 옵션은 없습니다. 양식 전체를 인쇄하거나 아무것도 인쇄하지 않습니다.

## QR 코드로 양식 공유하기 {#sharing-a-form-with-a-qr-code}

Stand Alone 양식은 주 양식 목록에서 옆에 **QR Code** 링크가 있습니다(보관된 양식에는 없습니다). 이를 클릭하면 양식의 공개 URL에 대한 QR 코드가 열리며, 그 아래에 링크가 표시됩니다. **Download PNG**를 클릭하면 주보나 화면 슬라이드에 인쇄할 수 있는 이미지로 저장됩니다. 코드를 스캔한 사람은 휴대폰에서 양식을 열게 됩니다.

## 질문 추가하기 {#adding-questions}

1. 양식을 열고 **Questions** 탭으로 이동하세요.
2. **Add Question**을 클릭하세요.
3. Provider 드롭다운에서 **field type**(필드 유형)을 고르세요. 사용할 수 있는 유형은 다음과 같습니다.
   - **Textbox** — 짧은 텍스트 답변용
   - **Date** — 날짜 선택용
   - **Email** — 이메일 주소용
   - **Phone Number** — 전화번호 입력용
   - **Multiple Choice** — 미리 정한 선택지에서 고르기용
   - **Payment** — 결제를 받기 위한 용도
4. 질문의 **Title**과 선택 사항인 **Description**을 입력하세요. 설명은 사람들이 양식을 작성할 때 질문 아래에 표시되므로, "Include any allergies we should know about."(알아야 할 알레르기가 있으면 적어 주세요.) 같은 힌트를 넣기 좋습니다.
5. 필수 항목이라면 **Require an answer**를 선택하세요.
6. **Save**를 클릭하세요.
7. 질문을 더 추가하려면 반복하세요.

:::warning
**Payment** 필드 유형은 Stripe가 설정되어 있어야 합니다. 아직 온라인 헌금을 설정하지 않았다면, 결제 필드를 추가하기 전에 [온라인 헌금 설정](../donations/online-giving-setup.md)을 먼저 참고하세요. 로그인하지 않고 양식에서 결제하는 사람은 카드가 승인되기 전에 **I'm not a robot** 확인란을 선택해야 합니다.
:::

## 양식 구성원 관리하기 {#managing-form-members}

1. 양식을 열고 **Form Members** 탭으로 이동하세요.
2. 사람을 검색해 역할을 지정하여 추가하세요.
   - **Admin** — 양식을 편집하고 모든 제출 내용을 볼 수 있습니다.
   - **View Only** — 제출 내용을 볼 수는 있지만 양식을 편집할 수는 없습니다.

## 양식을 그룹에 연결하기 {#linking-a-form-to-a-group}

Stand Alone 양식은 모두 그룹에 연결할 수 있습니다. 예를 들어 소그룹을 위한 기도 제목 양식이나 청소년 수련회를 위한 의료 동의서에 사용할 수 있습니다.

1. 양식의 **Details**를 여세요.
2. **Linked group**에서 그룹을 고르거나, **None**으로 두세요.
3. **Save**를 클릭하세요.

양식을 연결하면 다음과 같이 동작합니다.

- **그룹 구성원**은 양식이 열려 있는 동안 B1.church의 그룹 페이지에 있는 **Forms** 섹션에서 양식을 보게 되며, **Fill out** 버튼으로 양식을 열 수 있습니다([그룹 상세 정보](../../b1-church/groups/group-details.md#linked-forms) 참고).
- **그룹 리더**는 마감된 양식도 볼 수 있고, 모든 제출 답변을 읽고 인쇄할 수 있습니다(제출 하나씩 또는 **Print all**). 리더는 답변을 보기만 할 수 있으며, [양식 구성원](#managing-form-members)이기도 하지 않는 한 양식을 편집할 수 없습니다.
- **B1 Admin**에서는 그룹 페이지에 **Linked forms** 섹션이 있으며, 연결된 양식마다 **Open** 또는 **Closed**가 표시됩니다. 이 섹션은 그룹 리더와 양식을 관리할 수 있는 사람에게 보입니다. [그룹 구성원](../groups/group-members.md#linked-forms)을 참고하세요.

양식은 사용 가능한 기간 밖에 있을 때 마감된 상태가 됩니다. 보관된 양식은 그룹 페이지에 표시되지 않습니다.

### 제출자를 그룹에 자동으로 추가하기 {#automatically-adding-submitters-to-a-group}

양식을 그룹에 연결한다고 해서 그 자체로 사람이 그룹에 추가되지는 않습니다. 제출자 모두를 연결된 그룹의 명단에 추가하려면, 양식의 상세 정보에서 **Create a person record from submissions**도 켜고 **Save**를 클릭하세요.

누군가 양식을 제출할 때마다, 일치하거나 새로 만들어진 사람이 그룹에 추가됩니다(이미 그룹 구성원인 사람은 건너뜁니다). 캠프 신청 양식처럼 캠프의 명단 그룹을 자동으로 만들어야 하는 경우에 유용합니다.

### 후속 이메일 보내기 {#sending-a-follow-up-email}

**Create a person record from submissions**를 켜 두면, 양식을 제출한 사람 모두에게 이메일을 보낼 수도 있습니다. 양식의 상세 정보에서 **Follow-up Email Subject**와 **Follow-up Email Body**를 입력하세요. 두 항목 모두에 `{firstName}`과 `{churchName}` 토큰을 쓸 수 있습니다. 두 항목을 모두 채운 경우에만 이메일이 발송됩니다.

:::info
후속 이메일은 교회가 그룹 이메일 발송을 승인받은 후에만 나가며, 교회의 일일 이메일 한도에 포함됩니다. [교회의 그룹 이메일 켜기](../groups/group-members.md#turning-on-group-email-for-your-church)를 참고하세요.
:::

## 양식 복제하기

기존 양식을 새 양식의 출발점으로 쓰려면, 양식 목록에서 양식 옆의 **Duplicate**를 클릭하고 확인하세요. B1은 모든 질문을 포함한 완전한 사본을 만들며, 이름을 바꾸고 따로 편집할 수 있습니다.

:::tip
정기 행사에서 등록 질문이 해마다 같을 때 복제 기능이 편리합니다. 작년 양식을 복제해 이름과 날짜만 고치면 바로 사용할 수 있습니다.
:::

## 양식 속성 설정하기

양식의 이름과 설정은 언제든지 바꿀 수 있습니다. Stand Alone 양식에서는 누구와도 공유할 수 있는 고유한 **public URL**(공개 URL)과, 공개 양식 페이지에서 질문 위에 표시되어 사람들이 작성을 시작하기 전에 양식의 목적을 알려 주는 **Description**(설명) 필드도 볼 수 있습니다.

### 머리글 사진 추가하기 {#adding-a-header-photo}

Stand Alone 양식은 양식 상단에 **Header Photo**(머리글 사진)를 표시할 수 있습니다. 양식의 상세 정보에서 사진 상자나 **Add Photo**를 클릭한 다음 이미지를 고르거나 업로드하세요(16:9 모양으로 잘립니다). **Save**를 클릭하세요. 사진은 양식 이름 아래, 설명 위에 나타나며, 양식의 공개 URL 페이지와 웹사이트 **Form** 요소로 삽입된 모든 곳에 표시됩니다. 사진을 바꾸려면 **Change Photo**를, 지우려면 **Remove**를 사용하세요.

양식을 제출한 뒤 사람들에게 보일 내용은 **Thank You Message** 필드에서 설정합니다. 양식의 공개 URL 페이지에도 표시됩니다. 비워 두면 "Thank you for submitting the form!"(양식을 제출해 주셔서 감사합니다!)이 표시됩니다.

:::tip
Stand Alone 양식은 행사 등록에 아주 좋습니다. 공개 URL을 이메일, 소셜 미디어로 공유하거나 교회 웹사이트에 양식을 직접 넣어 보세요.
:::

:::info
B1 웹사이트에 양식을 넣으려면 웹사이트 편집기로 가서 새 섹션을 추가하고 **Form** 요소를 선택하세요. 그다음 표시할 양식을 고르세요. 웹사이트 편집에 대한 자세한 내용은 [페이지 관리하기](../website/managing-pages.md)를 참고하세요.
:::
