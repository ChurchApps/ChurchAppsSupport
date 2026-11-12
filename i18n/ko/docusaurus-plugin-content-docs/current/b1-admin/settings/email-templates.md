---
title: "이메일 템플릿"
description: "B1 Admin에서 병합 필드, 문자 메시지 옵션, 대량 커뮤니케이션용 미리 보기를 갖춘 이메일 및 문자 메시지 템플릿을 설정하세요."
---

# 이메일 템플릿

<div class="article-intro">

이메일 템플릿을 사용하면 환영 메시지, 행사 알림, 헌금 감사 인사처럼 재사용할 수 있는 이메일 내용을 저장할 수 있습니다. 그러면 여러분(또는 [워크플로](../serving/workflows.md))은 매번 처음부터 쓰는 대신 클릭 한 번으로 보낼 수 있습니다. 같은 목록에는 그룹 및 개인 문자 창과 워크플로 **Send Text**(문자 보내기) 작업에서 사용하는 문자 메시지 템플릿도 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Edit Church Settings**(교회 설정 편집) 권한이 필요합니다(이 권한이 있어야 **Email Templates**(이메일 템플릿) 메뉴 항목이 표시됩니다). **Edit Group Members**(그룹 구성원 편집) 권한이 있는 사람은 **/settings/email-templates** 주소로 이 페이지를 바로 열 수도 있습니다.

</div>

## 이메일 템플릿 접근하기 {#accessing-email-templates}

1. B1 Admin에서 [점프 메뉴](../introduction.md#getting-around-with-the-jump-menu)(왼쪽 상단의 검색창)를 열고 **Settings**(설정)를 펼치세요.
2. **Email Templates**(이메일 템플릿)를 클릭하세요.
3. 기존 템플릿의 **Name**(이름), **Subject**(제목), **Category**(분류), **Modified**(수정일)가 나열된 목록이 표시됩니다.

## 템플릿 만들기 {#creating-a-template}

1. **New Template**(새 템플릿)을 클릭하세요.
2. 목록에서 구분할 **Template Name**(템플릿 이름)을 입력하고, 템플릿을 정리할 **Category**(분류)(General(일반), Events(행사), Groups(그룹), Giving(헌금), Welcome(환영), Text(문자))를 선택하세요. 대신 문자 메시지 템플릿을 만들려면 **Text**를 선택하세요([아래의 문자 템플릿](#text-templates) 참고).
3. **Subject**(제목) 줄을 입력하세요.
4. 리치 텍스트 편집기를 사용하여 **Body**(본문)를 작성하세요.
5. **Save**를 클릭하세요.

## 병합 필드 {#merge-fields}

제목이나 본문 위의 병합 필드 칩을 클릭하면 커서 위치에 필드가 삽입됩니다. 먼저 필드를 넣고 싶은 곳의 텍스트를 클릭한 다음 칩을 클릭하세요. 커서는 그 자리에 그대로 남으므로, 삽입된 필드 바로 뒤에 계속 입력할 수 있습니다. 본문을 먼저 클릭하지 않고 본문 칩을 클릭하면, 필드가 본문 끝에 추가됩니다. 이메일이 발송되면 각 병합 필드는 수신자의 실제 정보로 바뀝니다.

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- 수신자의 이름
- `{{email}}` -- 수신자의 이메일 주소
- `{{churchName}}` -- 교회 이름

### 헌금 병합 필드 {#gift-merge-fields}

이 필드는 **Donation · Created**(헌금 · 생성됨) 트리거가 시작한 [워크플로](../serving/workflows.md#sending-email)가 이메일을 보낼 때만 채워집니다. 다른 이메일에서는 빈칸으로 남습니다.

- `{{amount}}` -- 헌금액(예: $50.00)
- `{{giftDate}}` -- 헌금 날짜
- `{{fund}}` -- 헌금이 들어간 헌금 항목
- `{{receipt}}` -- 헌금 요약입니다. 날짜와 방법, 각 헌금 항목과 금액을 나타내는 행, 합계가 포함됩니다. 감사 인사와 같은 이메일에 헌금자의 영수증을 함께 보낼 때 사용하세요. 본문에서만 사용할 수 있으며, 제목에서는 사용할 수 없습니다.

## 문자 템플릿 {#text-templates}

**Text**(문자) 분류의 템플릿은 이메일이 아니라 문자 발송용 일반 텍스트 메시지입니다.

- 제목이 없습니다. 리치 텍스트 편집기는 최대 1,600자를 담을 수 있는 일반 **Text Message**(문자 메시지) 상자로 바뀝니다.
- 상자 위의 병합 필드 칩은 커서 위치에 `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}` 또는 [헌금 병합 필드](#gift-merge-fields)를 삽입합니다. 문자에서 `{{receipt}}`는 *Nov 8, 2026에 General Fund에 $50.00*과 같은 한 줄이 됩니다.
- 문자 템플릿은 [그룹](../groups/group-members.md#texting-group-members) 또는 개인의 문자 창에 있는 **Load Template (optional)**(템플릿 불러오기(선택 사항)) 선택기에 나타납니다. 하나를 고르면 메시지가 채워지며, 보내기 전에 여전히 수정할 수 있습니다.
- 워크플로 [Send Text](../serving/workflows.md#sending-a-text) 작업의 **Start from a template**(템플릿에서 시작) 목록에도 나타납니다.
- 워크플로 **Send email**(이메일 보내기) 작업을 포함하여 이메일 템플릿 선택기에서는 빠집니다.

문자를 보내려면 연결된 [문자 서비스 제공자](./church-settings.md#texting)가 필요합니다.

## 템플릿 미리 보기 {#previewing-a-template}

**Preview**(미리 보기)를 클릭하면, 저장하거나 보내기 전에 병합 필드에 샘플 데이터를 채운 제목과 본문이 어떻게 보일지 확인할 수 있습니다.

## 템플릿 사용하기 {#using-a-template}

저장된 템플릿은 사람이나 그룹에게 이메일을 작성할 때 선택할 수 있으며, [워크플로](../serving/workflows.md)의 작업으로도 사용할 수 있습니다. 교회가 이 템플릿을 보내기 전에, ChurchApps 팀이 한 번 그룹 이메일 발송을 승인해야 합니다. [교회의 그룹 이메일 켜기](../groups/group-members.md#turning-on-group-email-for-your-church)를 참고하세요.

## 편집 및 삭제하기 {#editing-and-deleting}

템플릿의 행에서 **Edit**(편집)를 클릭하면 업데이트할 수 있으며, **Delete**(삭제)를 클릭하면 영구적으로 제거됩니다. B1은 삭제하기 전에 확인을 요청합니다.

## 다음 단계 {#next-steps}

- [워크플로](../serving/workflows.md) -- 규칙에 따라 템플릿 이메일을 자동으로 트리거하기
