---
title: "사람 추가하기"
description: "B1 Admin의 교회 데이터베이스에 사람을 추가하고, 세부 정보를 입력하고, 가족 구성원을 체크인과 보고를 위해 가구로 연결하세요."
---

# 사람 추가하기

<div class="article-intro">

People 섹션은 B1 Admin의 기반으로, 교회의 성도 데이터베이스입니다. 다른 모든 기능(그룹, 출석, 헌금, 양식)은 사람 기록과 연결됩니다. 이 가이드는 데이터베이스에 사람을 추가하고, 세부 정보를 수정하고, 가족 구성원을 가구로 연결하는 방법을 안내합니다.

</div>

## 교육 영상 {#training-video}

<YouTube id="GtsczJ8JPio" title="B1에서 사람과 가구 추가하기" next="B1에서 사람 데이터베이스 가져오기" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- 사람을 관리할 권한이 있는 활성 B1 Admin 계정이 필요합니다. 접근 수준이 확실하지 않다면 [역할 및 권한](roles-permissions.md)을 참고하세요.
- 몇 명 이상을 추가해야 한다면 대신 [CSV 가져오기](importing-data.md) 도구를 사용하는 것을 고려하세요.

</div>

## 사람 추가하기 {#adding-a-person}

1. B1.church Admin 대시보드로 이동하세요.
2. [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 위의 검색창)를 열고 **People**을 펼친 다음 **People**을 클릭하세요.
3. 페이지 머리글의 **Add Person** 버튼을 클릭하세요. 페이지가 디렉터리 아래의 **Add a New Person** 양식으로 스크롤됩니다.
4. 사람의 **First Name**과 **Last Name**을 입력하세요(둘 다 필수입니다). 필요하면 **Title**, **Email**, **Mobile Phone**도 입력한 다음 **Add**를 클릭하세요(또는 **Enter**를 누르세요).

B1은 사람의 성을 따서 이름을 붙인 새 가구를 그 사람을 위해 만듭니다.

사람의 프로필 페이지가 열리며, 더 자세한 정보를 추가할 수 있습니다.

:::tip
다른 교회 관리 시스템에서 옮겨 오는 중이라면, [데이터 가져오기](importing-data.md) 기능으로 CSV 파일에서 전체 디렉터리를 가져올 수 있습니다. 한 명씩 추가하는 것보다 훨씬 빠릅니다.
:::

### 중복 경고 {#duplicate-warnings}

**Add a New Person** 양식에 이메일 주소를 입력하면, B1은 저장하기 전에 중복을 확인합니다. 이메일 주소가(또는 전체 Edit 양식에서 사람을 만들 때는 전화번호나 이름, 성, 생년월일이 일치하는 경우) 데이터베이스에 이미 있는 사람과 일치하면, 새 기록이 저장되기 전에 **Possible Duplicate** 대화상자가 나타납니다. 일치하는 사람마다 이메일, 전화번호, 생년월일이 나열되므로 비교할 수 있습니다.

- 일치하는 항목 옆의 **Use Existing**을 클릭하면 새로 만들지 않고 그 사람의 기록을 사용합니다.
- 가능한 일치 항목이 발견되었더라도 새 사람을 추가하려면 **Create Anyway**를 클릭하세요.

이 확인은 완전히 새로운 사람을 만들 때만 이루어지며, 기존 기록을 수정할 때는 나타나지 않습니다. 새 중복을 막을 뿐이며, 이미 존재하는 두 기록을 병합하지는 않습니다.

## 세부 정보 수정하기 {#editing-details}

1. 사람의 프로필 페이지에서 왼쪽의 **Household** 섹션 아래에 있는 **Edit** 버튼을 클릭하세요.
2. **Personal Details** 양식에 추가 정보를 입력하세요. 예를 들면 **Title**(목록에서 Mr, Mrs, Miss, Ms, Dr, Prof, Rev, Pastor 중 선택하거나 직접 입력, 최대 10자), 중간 이름, 별명, **Name Tag Notes**(체크인 이름표에 인쇄되고 프로필에 경고 태그로 표시), **Donor Number**, 교인 상태(**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive**, **Deceased** 중 하나), 성별, 혼인 상태, 생년월일과 결혼기념일, 캠퍼스, 주소, 내선 번호가 있는 전화번호, 그리고(어린이와 학생의 경우) 학년과 학교가 포함됩니다. 사람을 [인쇄된 디렉터리](./print-directory.md)와 앱의 성도 디렉터리에서 제외하려면 **Hide me from the member directory**를 체크하세요. [사용자 지정 필드](../settings/custom-fields.md)는 **Custom Fields** 아래에 나타납니다.
3. **Save**를 클릭하여 개인 정보를 저장하거나, **Cancel**을 클릭하여 저장하지 않고 양식을 닫으세요.

가구의 다른 구성원과 주소를 공유하는 사람의 주소를 바꾸면, B1은 새 주소를 가구 전체에 적용할지 묻습니다. 이 양식에는 사람을 삭제하는 **Delete** 버튼과, 사람의 데이터를 내보내거나 익명화하는 **Data Management** 섹션도 있습니다([데이터 보안](../settings/data-security.md#using-the-data-management-tools) 참고).

프로필 왼쪽에는 사람의 사진, 이름, 나이, 성별, 혼인 상태, 캠퍼스, 교인 상태, 연락처, 모든 [사용자 지정 필드](../settings/custom-fields.md) 값, 가구가 표시됩니다. 이름 아래의 태그는 사람이 **Has login**(B1 계정 보유), **Hidden from directory**(디렉터리에서 숨김), 또는 이름표 메모가 있는지 보여 줍니다. 가구 위의 **Added**는 기록이 생성된 날짜를 보여 줍니다(2026년 10월 말 이후에 추가된 사람에게만 표시됩니다). 사진을 클릭하면 변경할 수 있습니다. 가구 아래에는 **Edit**, **Email**, **Text** 버튼(아래 참고)과 몇 가지 추가 작업이 있습니다: **Workflow**(사람을 [워크플로](../serving/workflows.md)에 추가), **Merge**, **Export**, **Export Data**. 사람이 가구에 속해 있다면, **Pickup** 섹션에 [체크인](../attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people)에서 아이를 데려갈 수 있는 사람들이 나열됩니다.

프로필의 나머지 부분에는 관련 정보 종류마다 요약 섹션이 있습니다:

- **Attendance** — 사람이 최근 몇 주 중 어느 주에 출석했는지와 가장 최근 방문을 보여 줍니다. **All years**를 클릭하면 캠퍼스, 예배, 예배 시간, 그룹과, 키오스크 체크인 시각이 표시되는 **Checked In** 열(키오스크 체크인 없이 기록된 방문은 대시로 표시)을 포함한 전체 방문 기록을 볼 수 있습니다. 또는 **Print**를 클릭하여 인쇄할 수 있습니다(인쇄물에는 사람의 이름 위 가운데에 교회 로고와 이름이 표시됩니다). 한 사람의 기록이 아니라 교회 전체의 추세를 보려면 [출석 추적](../attendance/tracking-attendance.md)을 참고하세요.
- **Donations** — 올해의 헌금을 보여 주며, 비공제 기금에 대한 헌금도 포함됩니다. **All years**를 클릭하면 전체 [헌금 내역](../donations/recording-donations.md)을, **Log a gift**를 클릭하면 새 헌금을 기록할 수 있습니다. 교회에서 [헌금 개인정보 보호](../settings/church-settings.md#giving-privacy)를 켰다면, **Show giving**을 클릭하기 전까지 금액은 가려져 있습니다.
- **Groups** — 사람의 [그룹 구성원 자격](../groups/group-members.md)을 나열하며, 기록이 있는 경우 각 그룹에 **Joined**와 가입 날짜를 표시합니다.
- **Notes** — 사람에 대한 최근 메모(목회 돌봄, 후속 조치 등)를 보여 줍니다. **All notes**를 클릭하면 메모를 읽고 추가할 수 있습니다. 각 메모에는 작성자와 게시된 날짜 및 시간이 표시됩니다. 메모의 서식을 바꾸려면 메모 상자에서 텍스트를 드래그하여 선택한 다음, 작은 팝업에서 **Bold**, **Italic**, **Bulleted list**, **Numbered list**를 고르세요(또는 **Ctrl+B** / **Ctrl+I**를 누르세요. Mac에서는 **Cmd**). 게시된 메모에는 서식이 표시됩니다. 메모를 삭제하려면 되돌릴 수 없으므로 먼저 확인을 요청합니다. 모든 사람의 최근 메모를 한꺼번에 보려면 [메모](./notes.md) 페이지를 사용하세요.
- **Forms** — 사람의 양식과 각 양식의 제출 여부를 나열합니다(아래 [양식 사용하기](#working-with-forms) 참고).
- **Requests & registrations** — 사람의 방과 자원 [행사 요청](../calendars/approvals.md)(요청한 방이나 자원과 **Pending**, **Approved**, **Rejected** 상태 포함)과 [행사 등록](../calendars/paid-registrations.md)(등록한 인원 수와 **Registered**, **Pending**, **Waitlisted**, **Cancelled** 상태 포함)을 최신순으로 나열합니다. 최근 다섯 개가 표시되며, 전체 목록은 **All requests**를 클릭하세요. [승인](../calendars/approvals.md) 페이지를 사용할 수 있다면 행사 요청이, 등록을 볼 수 있다면 행사 등록이 보입니다. 둘 다 없으면 이 섹션은 숨겨집니다.

이 전체 보기 중 하나를 열었다면, 상단의 사람 이름과 함께 있는 **Back to** 링크를 클릭하여 프로필로 돌아가세요.

## 사람에게 이메일 보내기 {#emailing-a-person}

사람의 이메일 주소가 등록되어 있다면, 프로필 왼쪽의 가구 아래, **Edit** 옆에 **Email** 버튼이 나타납니다.

1. 사람의 프로필에서 **Email**을 클릭하세요.
2. 사람의 이름이 제목인 **Email** 대화상자가 열리며, **Sending to** 아래에 사람의 주소가 표시됩니다.
3. 필요하다면 **Load Template (optional**)에서 저장된 템플릿을 고르세요.
4. **Subject**를 입력하고 메시지를 작성하세요.
5. **Send Email**을 클릭하세요.

대신 본인의 메일 프로그램에서 메시지를 작성하려면 **Open in my email app**을 클릭하세요.

:::info
B1에서 보내는 이메일은 그룹 이메일과 같은 승인 및 일일 한도를 따릅니다. 교회가 아직 승인되지 않았다면, 대화상자는 검토를 요청하라고 안내합니다. 그동안에도 **Open in my email app**을 클릭할 수 있습니다. [교회의 그룹 이메일 켜기](../groups/group-members.md#turning-on-group-email-for-your-church)를 참고하세요. 그룹 구성원을 편집할 권한이 없는 사용자는 **Email**을 클릭하면 바로 이메일 앱으로 이동합니다.
:::

## 사람에게 문자 보내기 {#texting-a-person}

교회에 [문자 제공자](../settings/church-settings.md#texting)가 연결되어 있고, 문자를 보낼 권한이 있으며, 사람의 휴대폰 번호가 있다면, **Email** 옆에 **Text** 버튼이 나타납니다. 클릭하고 **Message**를 입력한 다음 **Send**를 클릭하세요. 대화상자에는 문자가 전송될 번호가 표시됩니다. 문자가 작동하는 방식은 [그룹 구성원에게 문자 보내기](../groups/group-members.md#texting-group-members)를 참고하세요.

### 문자 알림 {#text-reminders}

작업, 행사, 봉사 알림은 문자 메시지를 켜 둔 사람에게만 문자로 발송됩니다. 같은 문자 제공업체, 권한, 휴대폰 번호가 있다면, 사람의 기록에서 휴대폰 번호 아래 줄에 **Text reminders**가 **On** 또는 **Off**로 표시됩니다. 알림 문자를 보내기 시작하려면 **Turn on**을, 중지하려면 **Turn off**를 클릭하세요. 이것은 본인의 [알림 설정](../../b1-church/getting-started/notification-preferences.md)에 있는 **Text messages**와 같은 스위치이므로, 둘 중 누구나 바꿀 수 있습니다. 교회의 문자에 STOP으로 답장한 사람은 **Text reminders**를 켜 두었더라도 알림 문자를 받지 않습니다.

## 양식 사용하기 {#working-with-forms}

사람의 프로필에서 맞춤 양식을 직접 작성할 수 있습니다. 이것은 [양식 만들기](../forms/creating-forms.md) 가이드를 따라 만들 수 있는 사용자 정의 양식입니다.

1. 사람의 프로필에서 **Forms** 섹션을 찾으세요. 각 양식과 함께 **Submitted** 또는 **Not submitted** 여부가 나열됩니다.
2. 양식 이름을 클릭하여 여세요(또는 **All forms**를 클릭하여 전체 목록을 보세요).
3. 양식의 **edit icon**(연필)을 클릭하고, 세부 정보를 입력한 다음 **Save**를 클릭하세요.

양식이 제출되면, 옆의 **print icon**을 클릭하여 그 사람이 작성한 답변을 인쇄할 수 있습니다. 사람이 한 양식에 대해 제출 기록이 하나뿐이라면, 양식에는 답변 위에 **Submitted**와 날짜가 표시됩니다.

제출 내용이 잘못된 사람에게 연결되었다면, 옆의 **Change person** 아이콘(화살표 두 개)을 클릭하여 다른 사람에게 옮기거나 연결을 해제하세요. [제출 내용의 사람 변경하기](../forms/managing-submissions.md#changing-the-person-on-a-submission)를 참고하세요.

:::info
사람의 프로필에 연결된 양식은 **People** 양식 유형을 사용합니다. 행사 등록처럼 독립형 양식이 필요하다면, 양식 가이드의 [독립형 양식 옵션](../forms/creating-forms.md)을 참고하세요.
:::

:::tip
사람에 대해 한두 가지 추가 정보만 추적하면 된다면, 예를 들어 날짜, 숫자, 예/아니요 답변 같은 경우에는 양식 대신 [사용자 지정 필드](../settings/custom-fields.md)를 사용하세요. 더 빨리 입력할 수 있고, 고급 검색에서 직접 검색할 수도 있습니다.
:::

## 가구 관리하기 {#managing-households}

가구는 가족 구성원을 서로 연결할 수 있게 해 줍니다. 부모가 자녀를 한꺼번에 체크인할 수 있으므로 [체크인](../attendance/check-in.md)에 특히 유용합니다.

1. 사람의 프로필에서 왼쪽의 **Household** 제목 옆에 있는 **Edit**를 클릭하세요.
2. 가구 편집기가 열립니다. 현재 사람의 **household role**(예: Head, Spouse, Child, Other)을 선택하세요.
3. **Add** 아이콘을 클릭하여 다른 가구 구성원을 추가하세요.
4. **Add Household Member** 아래의 검색 상자에 사람의 이름을 입력하고 **Enter**를 누르거나 검색 아이콘을 클릭하세요. 입력하기 전에는 짧은 **Recent people** 목록이 표시됩니다. 이는 어떤 사람 검색에서든 가장 최근에 선택한 사람들이고, 그다음은 B1에서 가장 최근에 추가된 사람들입니다.
5. 결과에 사람이 나타나면 그 사람의 이름이나 옆의 추가 아이콘을 클릭하세요.
6. 가구 역할을 고르고 **Save**를 클릭하여 가구 설정을 마치세요.

사람이 아직 B1에 없다면, 검색 아래의 **Add New Person**을 클릭하세요. 이름, 호칭, 이메일, 휴대폰 번호와 함께 대화상자는 **Household Role**(Head, Spouse, Child, Other 중 하나)을 묻습니다. 새 사람이 생성되어 해당 역할로 이 가구에 들어갑니다. **Save**를 클릭하여 마치세요.
