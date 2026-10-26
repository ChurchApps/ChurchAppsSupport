---
title: "양식 만들기"
---

# 양식 만들기

<div class="article-intro">

교회 교인들에게서 정보를 수집하기 위한 맞춤형 양식을 만들어 보세요. 행사 등록, 설문조사, 방문자 카드, 교인 등록 신청서 등 다양한 양식을 만들 수 있습니다. 양식은 데이터베이스의 교인 기록에 연결하거나, 고유한 공개 URL을 가진 독립형 페이지로 사용할 수 있습니다.

</div>

## 교육 영상

<YouTube id="sr9wxEj9ghQ" title="Creating Forms and Managing Submissions in B1" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- **People**(교인) 양식(교인 기록에 연결되는 양식)은 먼저 [데이터베이스에 등록된 교인](../people/adding-people.md)이 있어야 합니다.
- **결제**를 받는 양식은 먼저 [온라인 헌금용 Stripe를 설정](../donations/online-giving-setup.md)해야 합니다.

</div>

## 새 양식 만들기

1. [Jump menu(점프 메뉴)](../introduction.md#getting-around-with-the-jump-menu)(B1 Admin 왼쪽 상단의 검색창)를 열고 **People**을 펼친 다음 **Forms**를 클릭합니다.
2. **Add Form**을 클릭합니다.
3. 양식의 **name**(이름)을 입력합니다.
4. **Associate With** 드롭다운에서 양식 유형을 선택합니다.
   - **People** -- 제출 내용을 데이터베이스의 [교인 기록](../people/adding-people.md)과 연결합니다. People 양식은 교인의 기록에서 작성되므로 공유 가능한 링크가 생성되지 않습니다.
   - **Stand Alone** -- 고유한 공개 URL을 가진 독립 양식을 만듭니다. 외부 등록에 적합합니다. Stand Alone 양식에서만 [header photo(머리글 사진)](#adding-a-header-photo), [QR code(QR 코드)](#sharing-a-form-with-a-qr-code), [linked group(연결된 그룹)](#linking-a-form-to-a-group), **Create a person record from submissions**(제출 내용으로 교인 기록 만들기)를 사용할 수 있습니다.
5. **Save**를 클릭하여 양식을 만듭니다.

새 양식이 목록에 나타납니다. 양식을 클릭하여 질문을 추가하세요.

## 빈 양식 인쇄하기 {#printing-a-blank-form}

나누어 줄 종이 양식이 필요하신가요? 환영 데스크에 비치할 방문자 카드나 인터넷에 접근할 수 없는 분이 손으로 작성할 양식이 필요할 수 있습니다. 양식 목록에서 양식 옆의 **Print**를 클릭하여 미리보기를 연 다음 **Print**를 클릭합니다. 빈 필드는 각 질문마다 밑줄이나 체크박스와 함께 인쇄되어 손으로 작성할 수 있으며, 필수 질문에는 별표가 표시됩니다. 페이지 상단에는 교회 로고([Website > Appearance](../website/appearance.md)의 **Light Background Logo**, 업로드한 경우)가 표시되고, 그 아래에 교회 이름, 그다음 양식 이름이 나옵니다. 다른 인쇄 옵션은 없으며, 양식 전체를 인쇄하거나 아무것도 인쇄하지 않습니다.

## QR 코드로 양식 공유하기 {#sharing-a-form-with-a-qr-code}

Stand Alone 양식은 양식 목록에서 옆에 **QR Code** 링크가 있습니다(보관된 양식에는 없습니다). 이를 클릭하면 양식의 공개 URL에 대한 QR 코드가 열리며, 그 아래에 링크가 표시됩니다. **Download PNG**를 클릭하면 주보나 슬라이드에 인쇄할 수 있는 이미지로 코드를 저장할 수 있습니다. QR 코드를 스캔한 사람은 휴대폰에서 양식을 열 수 있습니다.

## 질문 추가하기 {#adding-questions}

1. 양식을 열고 **Questions** 탭으로 이동합니다.
2. **Add Question**을 클릭합니다.
3. Provider 드롭다운에서 **field type**(필드 유형)을 선택합니다. 사용 가능한 유형은 다음과 같습니다.
   - **Textbox** -- 짧은 텍스트 답변용
   - **Date** -- 날짜 선택용
   - **Email** -- 이메일 주소용
   - **Phone Number** -- 전화번호 입력용
   - **Multiple Choice** -- 미리 정해진 선택지에서 고르기용
   - **Payment** -- 결제를 받기 위한 용도
4. 질문의 **Title**(제목)과 선택 사항인 **Description**(설명)을 입력합니다. 설명은 사람들이 양식을 작성할 때 질문 아래에 표시되므로, "Include any allergies we should know about."(알아야 할 알레르기가 있으면 적어 주세요.)와 같은 안내 문구로 활용하세요.
5. 필수 항목이면 **Require an answer**(답변 필수)를 체크합니다.
6. **Save**를 클릭합니다.
7. 질문을 더 추가하려면 같은 과정을 반복합니다.

:::warning
**Payment** 필드 유형을 사용하려면 Stripe가 설정되어 있어야 합니다. 아직 온라인 헌금을 설정하지 않았다면, 결제 필드를 추가하기 전에 [Online Giving Setup(온라인 헌금 설정)](../donations/online-giving-setup.md)을 먼저 확인하세요.
:::

## 양식 구성원 관리하기 {#managing-form-members}

1. 양식을 열고 **Form Members** 탭으로 이동합니다.
2. 사람을 검색하여 역할과 함께 추가합니다.
   - **Admin** -- 양식을 편집하고 모든 제출 내용을 볼 수 있습니다.
   - **View Only** -- 제출 내용을 볼 수 있지만 양식을 편집할 수는 없습니다.

## 양식을 그룹에 연결하기 {#linking-a-form-to-a-group}

Stand Alone 양식은 어떤 그룹에든 연결할 수 있습니다. 예를 들어 소그룹을 위한 기도 제목 양식이나 청소년 수련회를 위한 의료 동의서 등에 활용할 수 있습니다.

1. 양식의 **Details**를 엽니다.
2. **Linked group**(연결된 그룹)에서 그룹을 선택하거나 **None**으로 둡니다.
3. **Save**를 클릭합니다.

양식을 그룹에 연결하면 다음과 같이 표시됩니다.

- **그룹 구성원**은 양식이 열려 있는 동안 B1.church의 그룹 페이지에 있는 **Forms** 섹션에서 양식을 보게 되며, **Fill out** 버튼을 눌러 양식을 작성할 수 있습니다([Group Details(그룹 상세)](../../b1-church/groups/group-details.md#linked-forms) 참고).
- **그룹 리더**는 마감된 양식도 볼 수 있고, 모든 제출 내용의 답변을 읽고 인쇄할 수 있습니다(제출 건별 또는 **Print all**). 리더는 답변을 보기만 할 수 있으며, [양식 구성원](#managing-form-members)이기도 한 경우가 아니라면 양식을 편집할 수 없습니다.
- **B1 Admin**에서 그룹 페이지에는 연결된 각 양식을 **Open**(열림) 또는 **Closed**(마감됨)로 나열한 **Linked forms** 섹션이 표시됩니다. 이 섹션은 그룹의 리더와 양식을 관리할 수 있는 사람에게 보입니다. [Group Members(그룹 구성원)](../groups/group-members.md#linked-forms)를 참고하세요.

양식은 사용 가능 기간 밖에 있으면 마감된 것으로 간주됩니다. 보관된 양식은 그룹 페이지에 표시되지 않습니다.

### 제출자를 그룹에 자동으로 추가하기 {#automatically-adding-submitters-to-a-group}

양식을 그룹에 연결한다고 해서 그 자체로 아무도 그룹에 추가되지는 않습니다. 제출자 모두를 연결된 그룹의 명단에 추가하려면, 양식의 세부 정보에서 **Create a person record from submissions**(제출 내용으로 교인 기록 만들기)를 켜고 **Save**를 클릭하세요.

누군가 양식을 제출할 때마다, 일치하는 교인이나 새로 만든 교인이 그룹에 추가됩니다(이미 그룹 구성원인 사람은 건너뜁니다). 예를 들어 캠프 신청 양식을 통해 캠프 명단 그룹이 자동으로 만들어지도록 하는 경우에 유용합니다.

### 후속 이메일 보내기

**Create a person record from submissions**를 켜 두면, 양식을 제출한 각 사람에게 이메일을 보낼 수도 있습니다. 양식의 세부 정보에서 **Follow-up Email Subject**(후속 이메일 제목)와 **Follow-up Email Body**(후속 이메일 본문)를 입력합니다. 두 항목 모두에 `{firstName}` 및 `{churchName}` 토큰을 사용할 수 있습니다. 두 필드가 모두 입력된 경우에만 이메일이 발송됩니다.

:::info
후속 이메일은 교회가 그룹 이메일 발송 승인을 받은 후에만 발송되며, 교회의 일일 이메일 한도에 포함됩니다. [Turning On Group Email for Your Church(교회의 그룹 이메일 사용 설정하기)](../groups/group-members.md#turning-on-group-email-for-your-church)를 참고하세요.
:::

## 양식 복제하기

기존 양식을 새 양식의 출발점으로 재사용하려면, 양식 목록에서 양식 옆의 **Duplicate**를 클릭하고 확인합니다. B1은 모든 질문을 포함한 양식의 정확한 사본을 만들며, 이후 이름을 바꾸고 독립적으로 편집할 수 있습니다.

:::tip
매년 등록 질문이 같은 정기 행사에 복제 기능이 유용합니다. 작년 양식을 복제하고 이름과 날짜만 업데이트하면 바로 사용할 수 있습니다.
:::

## 양식 속성 설정하기

양식의 이름과 설정은 언제든지 업데이트할 수 있습니다. Stand Alone 양식에는 누구와도 공유할 수 있는 고유한 **public URL**(공개 URL)이 표시되며, 질문 위에 표시되는 텍스트인 **Description**(설명) 필드도 있습니다. 설명은 사람들이 양식을 작성하기 전에 양식의 목적을 알려 주는 데 유용합니다.

### 머리글 사진 추가하기 {#adding-a-header-photo}

Stand Alone 양식은 양식 상단에 **Header Photo**(머리글 사진)를 표시할 수 있습니다. 양식의 세부 정보에서 사진 상자 또는 **Add Photo**를 클릭한 다음 이미지를 선택하거나 업로드합니다(16:9 비율로 잘립니다). **Save**를 클릭합니다. 사진은 양식 이름 아래, 설명 위에 나타나며, 양식의 공개 URL 페이지와 웹사이트 **Form** 요소로 양식을 삽입한 모든 곳에 표시됩니다. 사진을 바꾸려면 **Change Photo**를, 제거하려면 **Remove**를 사용하세요.

양식을 제출한 후 사람들이 보게 될 내용을 설정하려면 **Thank You Message**(감사 메시지) 필드를 사용합니다. 공개 URL 페이지를 포함하여 모든 곳에 표시됩니다. 비워 두면 "Thank you for submitting the form!"(양식을 제출해 주셔서 감사합니다!)이 표시됩니다.

:::tip
Stand Alone 양식은 행사 등록에 적합합니다. 공개 URL을 이메일, 소셜 미디어로 공유하거나 교회 웹사이트에 양식을 직접 삽입하세요.
:::

:::info
B1 웹사이트에 양식을 삽입하려면 웹사이트 편집기로 이동하여 새 섹션을 추가하고 **Form** 요소를 선택합니다. 그다음 표시할 양식을 선택합니다. 웹사이트 편집에 대한 자세한 내용은 [Managing Pages(페이지 관리)](../website/managing-pages.md)를 참고하세요.
:::
