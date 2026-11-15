---
title: "저장된 목록"
description: "B1 Admin의 People 검색을 이름이 붙은 목록으로 저장하고 한 번의 클릭으로 다시 불러오세요. 목록은 실시간으로 유지되어 새로 조건에 맞는 성도가 자동으로 나타납니다."
---

# 저장된 목록

<div class="article-intro">

**저장된 목록**을 사용하면 검색 쿼리를 이름을 붙여 저장하고, 언제든지 한 번의 클릭으로 다시 실행할 수 있습니다. 한 번 만들어 두면 "Campus North의 활동 교인", "최근 90일 방문자", 또는 고급 필터 무엇이든 People 페이지 상단에 계속 남아 있어, 쿼리를 다시 만들 필요가 없습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 저장할 결과가 있도록 People 섹션에서 최소한 한 번 검색을 실행하세요. [사람 검색](./searching-people.md) 또는 [AI 검색](./ai-search.md)을 참고하세요.
- 목록을 저장, 변경, 삭제하려면 **Edit People** 권한이 필요합니다. [역할 지정](./roles-permissions.md)을 참고하세요.

</div>

## 검색을 목록으로 저장하기 {#saving-a-search-as-a-list}

1. **People** 페이지에서 검색을 실행하세요. 빠른 검색, AI 검색, 또는 고급 필터 검색 중 무엇이든 가능합니다.
2. 검색으로 최소 한 명이 찾아지면, People 페이지 머리글에 **Save as List** 버튼이 나타납니다.
3. **Save as List**를 클릭하세요.
4. **List Name**을 입력하세요(필수).
5. 필요하면 **Category**를 입력하여 관련 목록을 묶으세요(예: "Outreach" 또는 "Membership").
6. **Who can see this list**에서 **All staff** 또는 **Only me**를 고르세요.
7. **Match**에서 **All filters**(모든 필터와 일치해야 함) 또는 **Any filter**(하나 이상의 필터와 일치하면 됨)를 고르세요.
8. **Include household**에서 **Matches only**, **Children of matches**(일치하는 각 사람의 가구에 속한 자녀도 추가), **Entire household**(일치하는 각 사람의 가구 전원 추가) 중 하나를 고르세요.
9. 필요하면 **Refresh nightly**를 체크하세요(아래 [야간 새로 고침](#nightly-refresh) 참고). 체크하면 **Email me when membership changes**도 체크할 수 있습니다.
10. **Save**를 클릭하세요.

목록이 저장되면 People 페이지 상단의 저장된 목록 줄에 **Everyone** 옆의 버튼으로 나타납니다. **Only me**로 설정된 목록에는 작은 자물쇠 아이콘이 표시됩니다.

:::info
**All staff**로 설정된 목록은 교회 전체가 공유합니다. People 접근 권한이 있는 사람은 누구나 목록을 보고 불러올 수 있습니다. 목록을 변경하거나 삭제하려면 적절한 권한이 있는 직원이어야 합니다.
:::

## 저장된 목록 불러오기 {#loading-a-saved-list}

People 페이지 상단에서 목록 이름을 클릭하세요. 저장된 쿼리로 검색이 즉시 다시 실행되어 결과가 업데이트됩니다. 전체 디렉터리로 돌아가려면 **Everyone**을 클릭하세요.

목록은 범주별로 묶여 표시되며(범주를 지정한 경우), 범주가 없는 목록은 마지막에 나타납니다.

:::tip
목록은 스냅샷이 아니라 **실시간 쿼리**입니다. 목록을 불러올 때마다 검색이 현재 데이터를 기준으로 새로 실행되므로, 조건에 맞게 된 새로운 사람도 나타납니다.
:::

## 목록 이름 바꾸기 및 삭제하기 {#renaming-and-deleting-lists}

관리 권한이 있는 직원은 People 페이지에서 모든 목록의 이름을 바꾸거나 삭제할 수 있습니다. 먼저 목록을 클릭하여 불러오세요. 그러면 이름 옆에 아이콘 두 개가 나타납니다:

- **List Settings**(톱니바퀴) 아이콘을 클릭하면 이름을 바꾸거나 범주와 공유 설정을 바꿀 수 있습니다. 이 옵션으로 저장된 목록은 여기에서 **Include household**, **Refresh nightly**, **Email me when membership changes**도 바꿀 수 있습니다. **Match** 설정은 목록을 저장한 후에는 바꿀 수 없습니다.
- **Delete**(휴지통) 아이콘을 클릭하면 목록을 삭제합니다(확인을 요청합니다).

## 야간 새로 고침 {#nightly-refresh}

**Refresh nightly** 체크 여부와 관계없이, 목록을 불러올 때는 항상 검색이 새로 실행됩니다. **Refresh nightly**를 체크하면 B1은 매일 밤 목록을 다시 실행하고, 누가 목록에 들어오고 나갔는지 기록합니다. **Email me when membership changes**를 체크했다면, 야간 새로 고침으로 누군가 추가되거나 제거된 경우 B1이 목록을 저장한 본인에게 이메일을 보내며, 추가되고 제거된 인원 수를 알려 줍니다. 야간 새로 고침은 목록 구성원 변경 사항을 Mailchimp 태그와 같은 [통합](../integrations/index.md)에도 전달합니다.

## 활용 사례 {#use-cases}

| 상황 | 목록을 만드는 방법 |
|---|---|
| 모든 방문자 | 고급 검색: Membership Status = Visitor |
| 특정 캠퍼스의 회원 | 고급 검색: Campus = [해당 캠퍼스] |
| 신원 조회 기한이 지난 봉사자 | 고급 검색: [사용자 지정 필드](../settings/custom-fields.md) "Background check expires"가 오늘보다 이전 |
| AI 질문의 결과 | AI 검색에서 질문한 다음 저장 |

## 관련 문서 {#related-articles}

- [사람 검색](./searching-people.md) — 빠른 검색과 열 사용자 지정
- [AI 검색](./ai-search.md) — 목록으로 저장할 수 있는 자연어 쿼리
- [사용자 지정 필드](../settings/custom-fields.md) — 직접 정의한 사람 필드로 필터링하고 목록 저장
- [인구 통계](./demographics.md) — 인구 통계 차트를 People 필터로 세부 탐색한 다음 목록으로 저장
- [일괄 편집](./bulk-editing.md) — 목록을 불러온 뒤 모든 구성원을 한 번에 일괄 업데이트
