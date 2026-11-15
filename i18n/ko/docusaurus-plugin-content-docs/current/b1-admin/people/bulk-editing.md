---
title: "사람 일괄 편집하기"
description: "B1 Admin에서 여러 사람의 교인 상태, 혼인 상태, 성별, 디렉터리 제외 설정, 캠퍼스, 예/아니요 사용자 지정 필드 또는 그룹을 한 번에 업데이트하세요."
---

# 사람 일괄 편집하기

<div class="article-intro">
일괄 편집을 사용하면 여러 사람을 한 번에 업데이트할 수 있어, 많은 사람에게 같은 변경을 할 때 시간을 절약할 수 있습니다. 교인 상태, 혼인 상태, 성별, 디렉터리 제외 설정, 캠퍼스, 예/아니요 사용자 지정 필드, 그룹 구성원 자격, 워크플로를 한 번의 작업으로 업데이트하거나, 사람을 삭제할 수 있습니다.
</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 사람 데이터를 관리할 권한이 필요합니다. 자세한 내용은 [역할 및 권한](./roles-permissions.md)을 참고하세요.
- 편집할 사람을 이미 추가하거나 가져와 두어야 합니다. 필요하다면 [사람 추가하기](./adding-people.md)를 참고하세요.
</div>

## 일괄 편집할 사람 선택하기 {#selecting-people-for-bulk-editing}

1. B1 Admin에서 **People**로 이동하세요.
2. 검색 또는 필터 도구를 사용하여 업데이트할 사람을 찾으세요.
3. 상자를 체크하여 사람을 선택하세요.
   - **Households** 보기에서는 가구를 체크하면 그 안의 모든 사람이 선택됩니다.
   - **Table** 보기(**View as** 토글로 전환)에서는 사람을 개별로 선택할 수 있습니다.
   - 또는 목록 위의 상자를 사용하여 보이는 모든 사람을 선택할 수 있습니다.
4. 한 명 이상을 선택하면 목록 위의 막대에 선택된 인원 수와 함께 **Clear Selection**과 **Actions** 버튼이 표시됩니다.

:::tip
특정 기준에 따라 많은 사람을 업데이트해야 한다면, [AI 검색](./ai-search.md) 기능이나 필터로 먼저 목록을 좁힌 다음 일치하는 사람을 모두 선택하세요.
:::

## 사용 가능한 일괄 작업 {#available-bulk-actions}

**Actions** 메뉴에는 아래 옵션이 있습니다. 각 옵션은 몇 명의 사람이 변경될지 알려 주는 작은 대화상자를 엽니다. 값을 고르고 **Apply**를 클릭하세요. 새 값은 선택된 각 사람의 기존 값을 대체합니다. 작업이 끝나면 페이지 하단의 메시지가 업데이트된 인원 수를 확인해 줍니다.

### 교인 상태 설정 {#set-membership-status}

1. **Actions** → **Set Membership Status**를 클릭하세요.
2. 새 **Membership Status**를 고르세요.
   - **Visitor** -- 처음 방문하거나 가끔 오는 사람
   - **Guest** -- 체크인 키오스크에서 등록한 가족 등의 손님
   - **Regular Attendee** -- 자주 출석하지만 회원이 아닌 사람
   - **Member** -- 공식 교회 회원
   - **Staff** -- 교회 직원
   - **Inactive** -- 더 이상 출석하지 않는 사람
   - **Deceased** -- 별세한 사람
3. **Apply**를 클릭하세요.

### 혼인 상태 설정 {#set-marital-status}

1. **Actions** → **Set Marital Status**를 클릭하세요.
2. **Unknown**, **Single**, **Married**, **Divorced**, **Widowed** 중 하나를 고르세요.
3. **Apply**를 클릭하세요.

### 성별 설정 {#set-gender}

1. **Actions** → **Set Gender**를 클릭하세요.
2. **Unspecified**, **Male**, **Female** 중 하나를 고르세요.
3. **Apply**를 클릭하세요.

### 디렉터리 제외 설정 {#set-directory-opt-out}

디렉터리 제외는 사람이 성도 디렉터리(인쇄된 [디렉터리](./print-directory.md)와 B1 앱의 성도 디렉터리)에 나타날지를 조정합니다. 사람의 기록에 있는 **Hide me from the member directory**와 같은 설정입니다.

1. **Actions** → **Set Directory Opt-Out**을 클릭하세요.
2. 선택한 사람을 디렉터리에서 숨기려면 **Opted Out Yes**를, 다시 보이게 하려면 **Opted Out No**를 고르세요.
3. **Apply**를 클릭하세요.

:::warning
디렉터리에서 자신을 숨기기로 선택한 사람은, 다시 올려 달라고 요청하지 않는 한 계속 숨겨 두어야 합니다.
:::

### 캠퍼스 설정 {#set-campus}

이 옵션은 교회에 [캠퍼스](../settings/campuses.md)가 설정되어 있을 때 나타납니다.

1. **Actions** → **Set Campus**를 클릭하세요.
2. 캠퍼스를 고르세요.
3. **Apply**를 클릭하세요.

### 사용자 지정 필드 설정 {#set-custom-field}

선택한 모든 사람의 예/아니요 [사용자 지정 필드](../settings/custom-fields.md) 값을 한 번에 설정하세요.

1. **Actions** → **Set Custom Field**를 클릭하세요.
2. 설정할 예/아니요 **Custom Field**를 고르세요.
3. 적용할 **Value**(**Yes** 또는 **No**)를 고르세요.
4. **Apply**를 클릭하세요.

:::info
이 일괄 작업에는 예/아니요 사용자 지정 필드만 사용할 수 있습니다. 다른 유형의 필드는 사람마다 직접 편집하세요. 교회에 예/아니요 사용자 지정 필드가 없다면 대화상자에 그렇게 표시됩니다.
:::

### 그룹에 추가하기 {#add-to-group}

1. **Actions** → **Add to Group**을 클릭하세요.
2. 사람을 추가할 **Group**을 고르세요. 대신 완전히 새로운 그룹을 만들려면 **Create New Group**을 체크하고 **New Group Name**을 입력하세요.
3. **Apply**를 클릭하세요.

각 사람은 그룹의 일반 구성원으로 추가됩니다. 나중에 [그룹 구성원](../groups/group-members.md) 페이지에서 개인을 그룹 리더로 승격할 수 있습니다. 여러 그룹에 추가하려면 그룹마다 이 과정을 반복하세요.

### 그룹에서 제거하기 {#remove-from-group}

1. **Actions** → **Remove from Group**을 클릭하세요.
2. 사람을 제거할 **Group**을 고르세요.
3. **Apply**를 클릭하세요.

:::info
이 작업은 사람을 그룹에서만 제거합니다. 사람의 기록을 삭제하지는 않습니다.
:::

### 워크플로에 추가하기 {#add-to-workflow}

선택한 사람을 카드 형태로 [워크플로](../serving/workflows.md)에 추가하세요.

1. **Actions** → **Add to Workflow**를 클릭하세요.
2. 워크플로를 고르세요.
3. **Apply**를 클릭하세요.

### 사람 삭제하기 {#delete-people}

선택한 사람을 교회 데이터베이스에서 삭제하세요.

1. **Actions** → **Delete**를 클릭하세요.
2. **Delete Selected People** 대화상자가 삭제될 인원 수를 확인하도록 요청합니다.
3. **Delete**를 클릭하세요.

:::danger
삭제된 사람은 디렉터리, 그룹, 검색 결과에서 사라집니다. 이 사람들을 시스템에서 확실히 제거하고 싶을 때만 이 작업을 사용하세요.
:::

자기 자신은 선택할 수 없으므로, 본인의 기록을 일괄 삭제하거나 일괄 편집할 수 없습니다.


## 모범 사례 {#best-practices}

- **작게 시작하세요** -- 일괄 작업은 먼저 몇 개의 기록에서 테스트하여 올바른 변경을 하고 있는지 확인하세요.
- **필터를 사용하세요** -- 사람을 선택하기 전에 필터나 AI 검색으로 목록을 좁혀, 올바른 사람만 업데이트되도록 하세요.
- **선택 내용을 다시 확인하세요** -- 일괄 변경을 적용하기 전에 선택한 사람을 검토하세요.
- **주요 변경 사항을 기록하세요** -- 나중에 참고할 수 있도록 일괄 업데이트에 대한 메모를 남겨 두세요.
- **팀과 조율하세요** -- 대규모 일괄 변경을 할 때는 다른 관리자에게 알려 주세요.

## 일반적인 활용 사례 {#common-use-cases}

### 새 회원 업데이트하기 {#updating-new-members}

회원 교육을 마친 후, 참석자 전원의 교인 상태를 Member로 업데이트하세요.

1. 교육에 참석한 사람을 검색하세요.
2. 모두 선택하세요.
3. **Actions** → **Set Membership Status** → **Member**를 사용하세요.

### 소그룹 구성하기 {#organizing-small-groups}

여러 사람을 새 소그룹에 추가하세요.

1. 그룹에 넣고 싶은 사람을 검색하세요.
2. 선택하세요.
3. **Actions** → **Add to Group**을 사용하고 소그룹을 선택하세요.

### 데이터 정리하기 {#cleaning-up-data}

이전 출석자 그룹을 비활성으로 표시하세요.

1. **Advanced** 검색을 열고 업데이트할 사람을 필터링하세요(예: 최근에 출석하지 않은 모든 사람).
2. 선택하세요.
3. **Actions** → **Set Membership Status** → **Inactive**를 사용하세요.

## 관련 문서 {#related-articles}

- [사람 검색](./searching-people.md) -- 편집할 사람 찾기
- [AI 검색](./ai-search.md) -- 자연어로 특정 사람 그룹 찾기
- [그룹 구성원](../groups/group-members.md) -- 그룹 구성원 자격 관리
- [데이터 내보내기](./exporting-data.md) -- 일괄 변경 전에 사람 데이터 내보내기
