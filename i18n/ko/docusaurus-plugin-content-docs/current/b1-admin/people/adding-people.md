---
title: "사람 추가"
---

# 사람 추가

<div class="article-intro">

People 섹션은 B1 Admin의 기반이며, 교회의 교인 데이터베이스입니다. 다른 모든 기능(그룹, 출석, 기부, 양식)은 사람 기록과 연결됩니다. 이 가이드에서는 데이터베이스에 사람을 추가하고, 세부 정보를 수정하고, 가족 구성원을 가구(household)로 연결하는 방법을 안내합니다.

</div>

## 교육 영상

<YouTube id="NTL1UDQpx8s" title="Adding People and Households in B1" next="Importing Your People Database in B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>시작하기 전에</h4>

- 사람을 관리할 권한이 있는 활성 B1 Admin 계정이 필요합니다. 접근 권한 수준이 확실하지 않다면 [역할 및 권한](roles-permissions.md)을 참고하세요.
- 몇 명 이상을 추가해야 한다면 [CSV 가져오기](importing-data.md) 도구를 사용하는 것을 고려하세요.

</div>

## 사람 추가하기

1. B1.church Admin 대시보드로 이동합니다.
2. [Jump 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **People**을 펼친 후 **People**을 클릭합니다.
3. 페이지 헤더의 **Add Person** 버튼을 클릭합니다. 페이지가 디렉터리 아래의 **Add New Person** 양식으로 스크롤됩니다.
4. 사람의 **First Name**, **Last Name**, **Email**을 입력한 후 **Add**를 클릭합니다.

그러면 사람의 프로필 페이지가 열리며, 추가 세부 정보를 입력할 수 있습니다.

:::tip
다른 교회 관리 시스템에서 옮겨 오는 중이라면, [데이터 가져오기](importing-data.md) 기능으로 CSV 파일에서 전체 디렉터리를 가져올 수 있습니다. 한 명씩 추가하는 것보다 훨씬 빠릅니다.
:::

### 중복 경고

이메일 주소가(또는 전체 편집 양식에서 사람을 만들 때 전화번호나 이름+성+생년월일이) 데이터베이스에 이미 있는 사람과 일치하면, 새 기록을 저장하기 전에 **Possible Duplicate** 대화 상자가 나타납니다. 일치하는 각 사람의 이메일, 전화번호, 생년월일이 나열되어 비교할 수 있습니다.

- 일치하는 항목 옆의 **Use Existing**을 클릭하면 새로 만드는 대신 해당 사람의 기록을 사용합니다.
- **Create Anyway**를 클릭하면 일치하는 항목이 있더라도 새 사람을 추가합니다.

이 검사는 새로운 사람을 만들 때만 실행됩니다. 기존 기록을 수정할 때는 나타나지 않습니다. 이 기능은 새 중복을 방지할 뿐이며, 이미 존재하는 두 기록을 병합하지는 않습니다.

## 세부 정보 수정

1. 사람의 프로필 페이지에서 왼쪽의 연락처 정보 아래에 있는 **Edit** 버튼을 클릭합니다.
2. **Personal Details** 양식에서 중간 이름, 교인 상태(**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive**, **Deceased** 중 하나), 날짜, 주소, 전화번호, 그리고(어린이와 학생의 경우) 학년과 학교 등 추가 정보를 입력합니다.
3. **Save**를 클릭하여 개인 정보를 저장합니다.

프로필의 왼쪽에는 사람의 사진, 이름, 교인 상태, 연락처 정보, [사용자 지정 필드](../settings/custom-fields.md) 값, 그리고 가구 정보가 표시됩니다. 사진을 클릭하면 변경할 수 있습니다. **Edit** 버튼 아래에는 몇 가지 작업이 더 있습니다. **Workflow**(사람을 [워크플로](../serving/workflows.md)에 추가), **Merge**, **Export**, **Export Data**입니다.

프로필의 나머지 부분에는 관련 정보 종류별 요약 섹션이 표시됩니다.

- **Attendance** — 최근 몇 주 중 사람이 출석한 주와 가장 최근 방문을 보여 줍니다. **All years**를 클릭하면 캠퍼스, 예배, 예배 시간, 그룹, 키오스크 체크인 시간을 보여 주는 **Checked In** 열이 포함된 전체 방문 기록을 볼 수 있습니다(키오스크 체크인 없이 기록된 방문은 대시(-)로 표시됩니다). 또는 **Print**를 클릭하여 인쇄할 수 있습니다(인쇄물 상단 가운데에 교회 로고와 이름이 사람 이름 위에 표시됩니다). 한 사람의 기록이 아니라 교회 전체의 추세를 보려면 [출석 추적](../attendance/tracking-attendance.md)을 참고하세요.
- **Donations** — 올해의 헌금을 보여 주며, 비공제 펀드에 대한 헌금도 포함됩니다. **All years**를 클릭하면 전체 [기부 내역](../donations/recording-donations.md)을 볼 수 있고, **Log a gift**를 클릭하면 새 헌금을 기록할 수 있습니다. 교회가 [Giving Privacy](../settings/church-settings.md#giving-privacy)를 켰다면, **Show giving**을 클릭하기 전까지 금액은 가려져 있습니다.
- **Groups** — 사람의 [그룹 구성원 정보](../groups/group-members.md)를 나열합니다.
- **Notes** — 사람에 대한 최근 메모(목회적 돌봄, 후속 조치 등)를 보여 줍니다. **All notes**를 클릭하면 메모를 읽고 추가할 수 있습니다. 각 메모에는 작성자와 게시된 날짜 및 시간이 표시됩니다. 모든 사람의 최근 메모를 한 번에 보려면 [Notes](./notes.md) 페이지를 사용하세요.
- **Forms** — 사람의 양식 목록과 각 양식의 제출 여부를 보여 줍니다(아래 [양식 사용하기](#working-with-forms) 참고).

이런 전체 보기를 열었다면, 상단의 사람 이름이 적힌 **Back to** 링크를 클릭하여 프로필로 돌아갈 수 있습니다.

## 사람에게 이메일 보내기

사람의 이메일 주소가 등록되어 있으면, 프로필 왼쪽의 연락처 정보 아래에 **Email** 버튼이 나타납니다.

1. 사람의 프로필에서 **Email**을 클릭합니다.
2. 사람의 이름이 제목으로 표시된 **Email** 대화 상자가 열리고, **Sending to**에 사람의 주소가 나타납니다.
3. 필요하다면 **Load Template (optional)**에서 저장된 템플릿을 선택합니다.
4. **Subject**를 입력하고 메시지를 작성합니다.
5. **Send Email**을 클릭합니다.

메시지를 자신의 메일 프로그램에서 작성하려면 **Open in my email app**을 클릭하세요.

:::info
B1에서 보내는 이메일에는 그룹 이메일과 같은 승인 절차와 일일 발송 한도가 적용됩니다. 교회가 아직 승인을 받지 않았다면, 대화 상자에서 검토를 요청하라고 안내합니다. 그동안에도 **Open in my email app**을 클릭할 수 있습니다. 자세한 내용은 [교회의 그룹 이메일 활성화](../groups/group-members.md#turning-on-group-email-for-your-church)를 참고하세요. 그룹 구성원을 편집할 권한이 없는 사용자는 **Email**을 클릭하면 바로 이메일 앱으로 이동합니다.
:::

## 양식 사용하기

사람의 프로필에서 바로 사용자 지정 양식을 작성할 수 있습니다. 이는 [양식 만들기](../forms/creating-forms.md) 가이드를 따라 직접 만든 사용자 정의 양식입니다.

1. 사람의 프로필에서 **Forms** 섹션을 찾습니다. 각 양식의 이름과 **Submitted**(제출됨) 또는 **Not submitted**(제출되지 않음) 여부가 나열되어 있습니다.
2. 양식 이름을 클릭하여 엽니다(또는 **All forms**를 클릭하여 전체 목록을 봅니다).
3. 양식의 **edit icon**(연필)을 클릭하고 세부 내용을 입력한 후 **Save**를 클릭합니다.

양식이 제출되면, 옆의 **print icon**(프린터)을 클릭하여 그 사람이 작성한 답변을 인쇄할 수 있습니다.

제출 내용이 잘못된 사람에게 연결되었다면, 해당 항목 옆의 **Change person** 아이콘(화살표 두 개)을 클릭하여 다른 사람에게 옮기거나 연결을 해제하세요. 자세한 내용은 [제출 내용의 사람 변경하기](../forms/managing-submissions.md#changing-the-person-on-a-submission)를 참고하세요.

:::info
사람의 프로필에 연결된 양식은 **People** 양식 유형을 사용합니다. 행사 등록처럼 독립적인 양식이 필요하다면, 양식 가이드의 [독립형 양식 옵션](../forms/creating-forms.md)을 참고하세요.
:::

:::tip
사람에 대해 한두 가지 추가 정보만 기록하면 된다면(날짜, 숫자, 예/아니요 답변 등), 양식 대신 [사용자 지정 필드](../settings/custom-fields.md)를 사용하세요. 입력이 더 빠르고 고급 검색에서 바로 검색할 수 있습니다.
:::

## 가구 관리하기 {#managing-households}

가구(household) 기능으로 가족 구성원을 서로 연결할 수 있습니다. 부모가 자녀 전체를 한 번에 체크인할 수 있으므로 [체크인](../attendance/check-in.md)에 특히 유용합니다.

1. 사람의 프로필에서 왼쪽의 **Household** 제목 옆에 있는 **Edit**를 클릭합니다.
2. 가구 편집기가 열립니다. 현재 사람의 **household role**(가구 역할)을 선택합니다(예: Head, Spouse, Child, Other).
3. **Add** 아이콘을 클릭하여 다른 가구 구성원을 추가합니다.
4. **Add Household Member**에서 검색창에 사람의 이름을 입력한 후 **Enter**를 누르거나 검색 아이콘을 클릭합니다. (입력하기 전에는 **Recent people**(최근 사람) 목록이 짧게 표시됩니다.)
5. 결과에 사람이 나타나면, 이름이나 그 옆의 추가 아이콘을 클릭합니다.
6. 가구 역할을 선택하고 **Save**를 클릭하여 가구 설정을 완료합니다.
