---
title: "이메일 템플릿"
---

# 이메일 템플릿

<div class="article-intro">

이메일 템플릿을 사용하면 환영 메시지, 행사 알림, 헌금 감사 인사처럼 재사용 가능한 이메일 내용을 저장할 수 있습니다. 그러면 매번 처음부터 작성하지 않고도 한 번의 클릭으로 보낼 수 있습니다(여러분이 보내거나 [워크플로](../serving/workflows.md)가 보냅니다). 같은 목록에는 그룹 및 개인 문자 창에서 쓰는 문자 템플릿도 들어 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- B1 Admin의 Settings 영역에 접근할 수 있어야 합니다.

</div>

## 이메일 템플릿 접근하기

1. B1 Admin에서 [Jump 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Settings**를 펼칩니다.
2. **Email Templates**를 클릭합니다.
3. 기존 템플릿의 제목, 카테고리, 마지막 수정 날짜가 나열된 목록이 표시됩니다.

## 템플릿 만들기

1. **New Template**을 클릭합니다.
2. 목록에서 구분할 수 있도록 **Template Name**을 입력하고, 템플릿을 정리하는 데 도움이 되도록 **Category**를 고릅니다(General, Events, Groups, Giving, Welcome, Text 중 하나). 대신 문자 메시지 템플릿을 만들려면 **Text**를 선택하세요([아래의 문자 템플릿](#text-templates) 참고).
3. **Subject**(제목) 줄을 입력합니다.
4. 리치 텍스트 편집기로 **Body**(본문)를 작성합니다.
5. **Save**를 클릭합니다.

## 병합 필드

제목이나 본문 위의 병합 필드 칩을 클릭하면 커서 위치에 삽입됩니다. 먼저 필드를 넣고 싶은 곳의 텍스트를 클릭한 다음 칩을 클릭하세요. 커서가 그 자리에 머무르므로, 삽입된 필드 바로 뒤에 계속 입력할 수 있습니다. 본문을 먼저 클릭하지 않고 본문 칩을 클릭하면, 필드는 본문 끝에 추가됩니다. 이메일이 발송되면 각 병합 필드는 수신자의 실제 정보로 바뀝니다.

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- 수신자의 이름
- `{{email}}` -- 수신자의 이메일 주소
- `{{churchName}}` -- 교회의 이름

## 문자 템플릿

**Text** 카테고리의 템플릿은 이메일이 아니라 문자 발송을 위한 일반 텍스트 메시지입니다.

- 제목이 없습니다. 리치 텍스트 편집기가 최대 1,600자를 담는 일반 **Text Message** 상자로 바뀝니다.
- 상자 위의 병합 필드 칩을 클릭하면 커서 위치에 `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, 또는 `{{churchName}}`이 삽입됩니다.
- 문자 템플릿은 [그룹](../groups/group-members.md#texting-group-members) 또는 개인의 Text 창에서 **Load Template (optional)** 선택기에 나타납니다. 하나를 고르면 메시지가 채워지며, 보내기 전에 여전히 편집할 수 있습니다.
- 워크플로의 **Send email** 작업을 포함한 이메일 템플릿 선택기에서는 빠집니다.

문자 발송에는 연결된 [문자 제공업체](./church-settings.md#texting)가 필요합니다.

## 템플릿 미리 보기

**Preview**를 클릭하면, 저장하거나 보내기 전에 병합 필드에 샘플 데이터를 채운 상태로 제목과 본문이 어떻게 보일지 확인할 수 있습니다.

## 템플릿 사용하기

저장된 템플릿은 사람이나 그룹에게 이메일을 작성할 때 선택할 수 있으며, [워크플로](../serving/workflows.md)의 작업으로도 사용할 수 있습니다. 교회가 이를 보내려면 ChurchApps 팀이 그룹 이메일에 대해 한 번 승인해야 합니다. [교회의 그룹 이메일 켜기](../groups/group-members.md#turning-on-group-email-for-your-church)를 참고하세요.

## 편집 및 삭제

템플릿을 업데이트하려면 템플릿 옆의 **Edit** 아이콘을 클릭하고, 영구적으로 제거하려면 **Delete** 아이콘을 클릭하세요.

## 다음 단계

- [워크플로](../serving/workflows.md) -- 규칙에 따라 템플릿 이메일을 자동으로 보내도록 설정합니다.
