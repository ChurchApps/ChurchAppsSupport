---
title: "Zapier"
description: "B1 Admin을 Zapier에 연결하여 새 사람, 헌금, 그룹 구성원을 기준으로 자동화를 시작하고, 코딩 없이 기록을 B1에 다시 쓰세요."
---

# Zapier

<div class="article-intro">

Zapier의 공식 B1.church 앱을 사용하면 Zap이 교회의 이벤트(새 사람, 새 헌금, 새 그룹 구성원 등)에 반응하고, 기록을 B1에 다시 쓸 수 있습니다. 코딩도, 별도의 인프라도 필요 없습니다. Zapier의 드래그 앤 드롭 편집기에서 연결하고, API 키를 붙여넣고, Zap을 켜면 됩니다.

</div>

:::caution Zapier 승인 대기 중
B1.church 앱은 만들어져 정상 작동하지만, Zap 편집기의 앱 디렉터리에 공개되기 전에 아직 Zapier의 검토를 기다리고 있습니다. 승인되기 전까지는 초대받은 계정만 사용할 수 있습니다. 아래 내용은 승인 후의 작동 방식을 설명합니다.
:::

<div class="prereqs">
<h4>시작하기 전에</h4>

- [Zapier](https://zapier.com) 계정(소수의 Zap이라면 무료 요금제로 충분합니다)
- B1Admin에서 **Edit Settings** 권한이 있는 교회 관리자(API 키를 만들어야 합니다)
- 하고 싶은 작업에 대한 아이디어(예: "B1에 사람이 추가되면 Mailchimp 목록에도 추가")

</div>

## 트리거와 작업 {#triggers-and-actions}

| 유형 | 내용 | B1 이벤트 / 엔드포인트 |
|---|---|---|
| **Trigger** | New Person | `person.created` |
| **Trigger** | Updated Person | `person.updated` |
| **Trigger** | New Donation | `donation.created` |
| **Trigger** | New Group Member | `group.member.added` |
| **Trigger** | New Form Submission | `form.submission.created` |
| **Action** | Create Person | 새 사람을 추가 |
| **Action** | Add Donation | 헌금을 기록 |
| **Action** | Add Group Member | 사람을 그룹에 추가 |
| **Action** | Find Person | id, 이메일 또는 이름으로 사람을 찾음. 일치하는 사람이 없으면 작업이 실패함 |

이것들은 Zapier가 지원하는 7,000개 이상의 앱과 자유롭게 조합할 수 있습니다.

## 설정 {#setup}

### 1. B1 API 키 만들기 {#1-create-a-b1-api-key}

1. B1Admin에서 **Settings → Developer → API Keys**로 이동하세요.
2. **New API Key**를 클릭하고 "Zapier"와 같은 이름을 준 다음, Zap에 필요한 권한 범위를 선택하세요.
3. **중요:** **`settings:write`** 권한 범위를 항상 포함하세요. Zapier는 연결할 때 키를 B1의 웹훅 목록과 대조하고, Zap을 켜면 B1 트리거가 사용자를 대신해 웹훅을 등록합니다. 두 가지 모두 `settings:write`가 필요합니다. 이 권한이 없는 키는 Zap이 B1 작업만 사용하더라도 연결 테스트에 실패합니다.
4. 작업에 필요한 권한 범위도 부여하세요. 예를 들어 "Add Donation" 작업에는 `donations:write`, "Create Person"에는 `people:write`가 필요합니다.
5. 저장하세요. 전체 `cak_…` 키는 **한 번만** 표시되므로 복사해 두세요.

### 2. Zapier를 B1에 연결하기 {#2-connect-zapier-to-b1}

1. Zapier에서 새 Zap을 만드세요.
2. B1 트리거나 작업을 처음 선택하면 Zapier가 **Sign in to B1.church**를 요청합니다.
3. 1단계의 API 키를 **API Key**에 붙여넣고(**API URL**은 비워 두세요) **Yes, Continue**를 클릭하세요. Zapier가 교회 정보로 키를 검증합니다.

연결은 Zapier에 저장되며, 계정의 모든 Zap에서 재사용됩니다.

### 3. Zap 만들기 {#3-build-the-zap}

트리거를 고른 다음, 하나 이상의 작업 단계를 추가하세요. 아래에 예시가 있습니다.

## 자주 쓰는 활용 예시 {#common-recipes}

### 새 B1 사람을 Mailchimp에 추가하기 {#add-new-b1-people-to-mailchimp}

- **Trigger** — B1: New Person
- **Action** — Mailchimp: Add/Update Subscriber. B1의 `name__first`, `name__last`, `contactInfo__email`을 Mailchimp의 First Name / Last Name / Email 필드에 매핑하세요.

### 내장 커넥터보다 더 풍부한 카드로 헌금을 Slack 채널에 게시하기 {#post-donations-to-a-slack-channel-with-a-richer-card-than-the-built-in-connector}

- **Trigger** — B1: New Donation
- **Action** — Slack: Send Channel Message. 내장된 [Slack 커넥터](./slack-discord.md)로는 불가능한 버튼, 첨부 파일 등 원하는 레이아웃을 구성하세요.

### 새 그룹 구성원을 Google 그룹에 추가하기 {#add-new-group-members-to-a-google-group}

- **Trigger** — B1: New Group Member
- **Action** — Filter by Zapier: 트리거의 `groupId`가 관심 있는 B1 그룹일 때만 계속 진행
- **Action** — B1: Find Person(트리거의 `personId`로 이메일 조회)
- **Action** — Google Groups: Add Member

### 양식 제출을 프로젝트 추적 도구로 전달하기 {#forward-form-submissions-to-a-project-tracker}

- **Trigger** — B1: New Form Submission
- **Action** — Notion / Linear / Asana / Trello: 페이지 / 이슈 / 업무 만들기

## 트리거의 내부 작동 방식 {#how-triggers-work-under-the-hood}

트리거는 폴링이 아니라 **REST hook**입니다. Zapier가 15분마다 B1에 확인하지 않습니다. Zap을 켜면 Zapier가 B1에 비공개 Zapier URL을 가리키는 웹훅 등록을 요청합니다. 이벤트가 발생하면 B1이 봉투를 Zapier로 POST하고, Zap은 **몇 초 안에** 실행됩니다. Zap을 끄면 Zapier가 B1에 웹훅 삭제를 요청하므로, 남은 구독은 없습니다.

따라서 트리거는 Zap을 켠 **이후**에 발생한 이벤트에만 반응합니다. 소급 처리는 없습니다. Zap을 켠다고 어제의 헌금이 다시 실행되지는 않습니다.

## 제한 사항 및 참고 {#limits--notes}

- **같은 트리거를 쓰는 Zap이 여러 개이면** 각각 자체 B1 웹훅을 등록합니다. 충돌은 없지만, **Settings → Developer → Webhooks**를 살펴보면서 똑같은 `Zapier — donation.created` 행이 세 개 있는 이유가 궁금할 수 있습니다.
- **Zap 설정의 테스트 데이터** — Zap을 만들 때 Zapier는 필드를 매핑하기 위한 샘플 데이터를 요청합니다. B1에 일치하는 가장 최근 이벤트가 있으면 그것을 가져오고, 없으면 앱 정의의 가상 샘플을 사용합니다.
- **작업 실패는 Zap 오류로 나타납니다** — Zapier의 작업 기록에 표시됩니다. 흔한 원인은 권한 범위가 맞지 않는 API 키입니다(예: "Add Donation" 작업에는 `donations:write`가 필요). 올바른 권한 범위로 키를 다시 만들고 Zapier에서 다시 연결하세요.
- **외부 API 호출 할당량** — 작업에서 발생하는 모든 B1 API 호출은 B1 쪽이 아니라 Zapier의 작업 할당량에서 차감됩니다.

## 문제 해결 {#troubleshooting}

- **연결할 때 "Authentication failed"** — API 키가 잘못되었거나, 삭제되었거나, `settings:write`가 없습니다. B1Admin에서 `settings:write`와 Zap이 사용하는 리소스 권한 범위를 포함해 새 키를 만드세요(기존 키의 권한 범위는 바꿀 수 없습니다). 그다음 연결을 업데이트하세요.
- **트리거가 전혀 실행되지 않음** — 웹훅이 실제로 등록되었는지 확인하세요. B1Admin의 **Settings → Developer → Webhooks**에 "Zapier — &lt;event&gt;"라는 행이 나타나야 합니다. 없다면 Zap을 켰을 때 API 키에 `settings:write`가 없었을 가능성이 높습니다. 키를 고친 다음 Zap을 껐다가 다시 켜세요.
- **트리거가 두 번 실행됨** — Zapier가 확인 응답을 놓치면 가끔 다시 전달합니다. 엄격한 중복 제거가 필요하다면 고유 id(예: 사람의 `id`)로 "Filter by Zapier" 단계를 사용하세요.

## 함께 보기 {#see-also}

- [Make](./make.md) — 같은 방식, 다른 플랫폼
- [Slack & Discord](./slack-discord.md) — Zapier 없이 더 간단한 채팅 알림
- [웹훅(개발자 참고)](/docs/developer/api/webhooks)
