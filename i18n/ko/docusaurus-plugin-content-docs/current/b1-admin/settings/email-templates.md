---
title: "이메일 템플릿"
---

# 이메일 템플릿

<div class="article-intro">

이메일 템플릿을 사용하면 환영 메시지, 행사 알림, 헌금 감사 인사처럼 재사용할 수 있는 이메일 내용을 저장해 둘 수 있습니다. 그러면 여러분(또는 [워크플로](../serving/workflows.md))이 매번 처음부터 쓰지 않고 한 번의 클릭으로 보낼 수 있습니다. 같은 목록에는 그룹과 개인 문자 창에서 쓰는 문자 메시지 템플릿도 들어 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- B1 Admin의 Settings 영역에 접근할 수 있어야 합니다.

</div>

## 이메일 템플릿에 접근하기

1. B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 위의 검색창)를 열고 **Settings**를 펼치세요.
2. **Email Templates**를 클릭하세요.
3. 기존 템플릿의 제목, 카테고리, 마지막 수정 날짜가 나열된 목록이 보입니다.

## 템플릿 만들기

1. **New Template**을 클릭하세요.
2. 목록에서 구별할 수 있도록 **Template Name**을 입력하고, 템플릿을 정리하기 위해 **Category**(General, Events, Groups, Giving, Welcome, Text 중에서)를 고르세요. 대신 문자 메시지 템플릿을 만들려면 **Text**를 고르세요([문자 템플릿](#text-templates) 참고).
3. **Subject**(제목)를 입력하세요.
4. 리치 텍스트 편집기로 **Body**(본문)를 작성하세요.
5. **Save**를 클릭하세요.

## 병합 필드 {#merge-fields}

제목이나 본문 위의 병합 필드 칩을 클릭하면 커서 위치에 넣을 수 있습니다. 먼저 필드를 넣을 위치의 텍스트를 클릭한 다음 칩을 클릭하세요. 커서는 그 자리에 그대로 있으므로, 넣은 필드 바로 뒤에 계속 입력할 수 있습니다. 본문을 먼저 클릭하지 않고 본문 칩을 클릭하면, 필드는 본문 끝에 추가됩니다. 이메일이 발송되면 각 병합 필드는 받는 사람의 실제 정보로 바뀝니다.

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- 받는 사람의 이름
- `{{email}}` -- 받는 사람의 이메일 주소
- `{{churchName}}` -- 교회 이름

## 문자 템플릿 {#text-templates}

**Text** 카테고리의 템플릿은 이메일이 아니라 문자 발송용 평문 메시지입니다.

- 제목이 없습니다. 리치 텍스트 편집기 대신 최대 1,600자를 담는 평문 **Text Message** 상자가 나타납니다.
- 상자 위의 병합 필드 칩을 클릭하면 `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}` 중 하나를 커서 위치에 넣을 수 있습니다.
- 문자 템플릿은 [그룹](../groups/group-members.md#texting-group-members) 또는 개인의 문자 창에 있는 **Load Template (optional)**(템플릿 불러오기(선택)) 선택기에 나타납니다. 하나를 고르면 메시지가 채워지며, 보내기 전에 여전히 편집할 수 있습니다.
- 워크플로의 **Send email** 동작을 포함해, 이메일 템플릿 선택기에는 나타나지 않습니다.

문자 발송에는 연결된 [문자 제공자](./church-settings.md#texting)가 필요합니다.

## 템플릿 미리 보기

저장하거나 보내기 전에 **Preview**를 클릭하면, 병합 필드에 샘플 데이터를 채운 제목과 본문이 어떻게 보일지 확인할 수 있습니다.

## 템플릿 사용하기

저장된 템플릿은 사람이나 그룹에게 이메일을 쓸 때 선택할 수 있으며, [워크플로](../serving/workflows.md)의 동작으로도 쓸 수 있습니다. 교회가 이것을 보내려면, 먼저 ChurchApps 팀이 그룹 이메일 발송을 한 번 승인해야 합니다. [교회의 그룹 이메일 켜기](../groups/group-members.md#turning-on-group-email-for-your-church)를 참고하세요.

## 편집과 삭제

템플릿 옆의 **Edit** 아이콘을 클릭하면 업데이트할 수 있고, **Delete** 아이콘을 클릭하면 영구적으로 제거할 수 있습니다.

## 다음 단계

- [워크플로](../serving/workflows.md) -- 규칙에 따라 템플릿 이메일을 자동으로 발송하기
