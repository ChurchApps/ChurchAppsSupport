---
title: "사람 추가"
---

# 사람 추가

<div class="article-intro">

People 섹션은 B1 Admin의 기초입니다. 교회의 멤버 데이터베이스입니다. 모든 다른 기능(그룹, 출석, 기부, 양식)은 사람 기록으로 다시 연결됩니다. 이 가이드는 데이터베이스에 누군가를 추가하고, 세부 정보를 편집하며, 가족 멤버를 가정에 연결하는 과정을 안내합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 사람을 관리할 수 있는 권한이 있는 활성 B1 Admin 계정이 필요합니다. 액세스 수준이 확실하지 않으면 [Roles & Permissions](roles-permissions.md)을 참조하세요.
- 한 줌 이상의 사람을 추가하는 경우 대신 [CSV Import](importing-data.md) 도구를 사용하는 것이 좋습니다.

</div>

## 사람 추가

1. B1.church Admin 대시보드로 이동합니다.
2. 왼쪽 사이드바의 **People**을 클릭합니다.
3. 오른쪽 위 모서리의 **Add Person** 버튼을 클릭합니다.
4. 사람의 이름, 성, 이메일 주소를 입력한 후 **Add**를 클릭합니다.

사람의 프로필 페이지가 열리고 더 많은 세부 정보를 추가할 준비가 됩니다.

:::tip
다른 교회 관리 시스템에서 마이그레이션하는 경우 [Import Data](importing-data.md) 기능을 사용하면 CSV 파일에서 전체 디렉토리를 가져올 수 있습니다. 한 번에 한 명씩 추가하는 것보다 훨씬 빠릅니다.
:::

## 세부 정보 편집

1. 사람의 프로필 페이지에서 이름 옆의 **edit pencil**을 클릭합니다.
2. 이름, 멤버십 상태, 날짜, 주소, 전화 번호 등과 같은 추가 정보를 입력합니다.
3. **Save**를 클릭하여 개인 정보를 저장합니다.

프로필에는 관련 정보에 대한 여러 탭도 포함됩니다:

- **Notes** -- 사람에 대한 노트 추가(목회 돌봄, 추후 조치 등)
- **Groups** -- [group memberships](../groups/group-members.md) 보기 및 관리
- **Attendance** -- [attendance records](../attendance/tracking-attendance.md) 보기
- **Donations** -- [donation history](../donations/recording-donations.md) 보기

## 양식으로 작업

사람의 프로필에서 직접 사용자 정의 양식을 작성할 수 있습니다. 이는 [Creating Forms](../forms/creating-forms.md) 가이드를 따라 작성할 수 있는 사용자 정의 양식입니다.

1. 사람의 프로필에서 **Forms** 드롭다운을 클릭하여 양식을 선택합니다.
2. **Add Form**을 클릭하여 엽니다.
3. 양식 세부 정보를 입력하고 **Save**를 클릭합니다.

:::info
사람의 프로필에 연결된 양식은 **People** 양식 유형을 사용합니다. 독립형 양식(예: 이벤트 등록)이 필요한 경우 양식 가이드의 [Stand Alone form option](../forms/creating-forms.md)을 참조하세요.
:::

:::tip
사람에 대해 하나 또는 두 개의 추가 정보만 추적해야 하는 경우(날짜, 숫자, 예/아니오 답변), 양식 대신 [Custom Fields](../settings/custom-fields.md)를 사용합니다. 더 빠르게 채울 수 있으며 Advanced Search에서 직접 검색 가능합니다.
:::

## 가정 관리

가정을 통해 가족 멤버를 함께 연결할 수 있습니다. 이는 특히 [check-in](../attendance/check-in.md)에 유용하며, 부모가 자녀 모두를 한 번에 체크인할 수 있습니다.

1. 사람의 프로필에서 가정 이름 옆의 **edit pencil**을 클릭합니다.
2. 가정 편집기가 열립니다. 현재 사람의 **household role**을 선택합니다(예: Head, Spouse, Child).
3. **Add**를 클릭하여 다른 가정 멤버를 추가합니다.
4. 검색 상자에 사람의 이름을 입력하고 **Search**를 클릭합니다.
5. 검색 결과에 사람이 나타나면 **Select**를 클릭합니다.
6. 그들의 가정 역할을 선택하고 **Save**를 클릭하여 가정 설정을 완료합니다.
