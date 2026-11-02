---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Zapier의 공식 B1.church 앱을 사용하면, Zap이 교회에서 일어나는 이벤트(새 교인, 새 헌금, 새 그룹 구성원 등)에 반응하고 B1에 기록을 다시 쓸 수 있습니다. 코딩이나 별도의 인프라가 필요 없습니다. Zapier의 드래그 앤 드롭 편집기에서 연결하고, API 키를 붙여 넣고, Zap을 켜기만 하면 됩니다.

</div>

:::caution Zapier 승인 대기 중
B1.church 앱은 만들어졌고 작동하지만, 아직 Zapier의 검토를 기다리고 있으며 Zap 편집기의 앱 디렉터리에 공개적으로 나타나지 않습니다. 승인 전까지는 초대된 계정만 사용할 수 있습니다. 아래 내용은 승인 후 작동 방식을 설명합니다.
:::

<div class="prereqs">
<h4>시작하기 전에</h4>

- [Zapier](https://zapier.com) 계정(무료 요금제로 Zap 몇 개는 충분함)
- B1Admin에서 **Edit Settings** 권한이 있는 교회 관리자(API 키를 만들어야 함)
- 무엇을 하고 싶은지에 대한 생각. 예: "B1에 사람이 추가되면 Mailchimp 목록에도 추가"

</div>

## 트리거와 작업

| 유형 | 내용 | B1 이벤트 / 엔드포인트 |
|---|---|---|
| **트리거** | New Person | `person.created` |
| **트리거** | Updated Person | `person.updated` |
| **트리거** | New Donation | `donation.created` |
| **트리거** | New Group Member | `group.member.added` |
| **트리거** | New Form Submission | `form.submission.created` |
| **작업** | Create Person | 새 교인을 추가 |
| **작업** | Add Donation | 헌금을 기록 |
| **작업** | Add Group Member | 그룹에 사람을 추가 |
| **작업** | Find Person | id, 이메일 또는 이름으로 교인을 찾음. 일치하는 사람이 없으면 작업이 실패함 |

이것들을 Zapier가 지원하는 7,000개 이상의 앱과 자유롭게 조합할 수 있습니다.

## 설정

### 1. B1 API 키 만들기

1. B1Admin에서 **Settings → Developer → API Keys**로 이동하세요.
2. **New API Key**를 클릭하고 "Zapier" 같은 이름을 준 다음, Zap에 필요한 범위(scope)를 고르세요.
3. **중요:** Zapier 트리거는 Zap을 켤 때 사용자를 대신해 웹훅을 등록하며, 이때 **`settings:write`** 범위가 필요합니다. Zap 중 하나라도 B1 트리거를 사용한다면 항상 `settings:write`를 포함하세요.
4. 작업에 필요한 범위도 부여하세요. 예를 들어 "Add Donation" 작업에는 `donations:write`가, "Create Person"에는 `people:write`가 필요합니다.
5. 저장하세요. 전체 `cak_…` 키는 **한 번만** 표시되므로 복사해 두세요.

### 2. Zapier를 B1에 연결하기

1. Zapier에서 새 Zap을 만드세요.
2. B1 트리거나 작업을 처음 고르면 Zapier가 **Sign in to B1.church**를 요청합니다.
3. 1단계의 API 키를 붙여 넣고 **Yes, Continue**를 클릭하세요. Zapier가 교회에 대해 키를 확인합니다.

연결은 Zapier에 저장되며, 내 계정의 모든 Zap이 함께 사용합니다.

### 3. Zap 만들기

트리거를 고른 다음, 하나 이상의 작업 단계를 추가하세요. 아래에 예시가 있습니다.

## 자주 쓰는 예시

### 새 B1 교인을 Mailchimp에 추가하기

- **트리거** -- B1: New Person
- **작업** -- Mailchimp: Add/Update Subscriber. B1의 `name__first`, `name__last`, `contactInfo__email`을 Mailchimp의 First Name / Last Name / Email 필드에 연결하세요.

### 내장 커넥터보다 풍부한 카드로 헌금을 Slack 채널에 게시하기

- **트리거** -- B1: New Donation
- **작업** -- Slack: Send Channel Message. 내장 [Slack 커넥터](./slack-discord)로는 할 수 없는 버튼, 첨부 등 원하는 모든 레이아웃을 구성하세요.

### 새 그룹 구성원을 Google 그룹에 추가하기

- **트리거** -- B1: New Group Member(특정 `groupId`로 필터링)
- **작업** -- Filter by Zapier: B1 그룹이 관심 있는 그룹일 때만 계속 진행
- **작업** -- B1: Find Person(트리거의 `personId`를 사용해 이메일을 가져옴)
- **작업** -- Google Groups: Add Member

### 양식 제출을 프로젝트 추적 도구로 전달하기

- **트리거** -- B1: New Form Submission
- **작업** -- Notion / Linear / Asana / Trello: 페이지, 이슈, 할 일 만들기

## 트리거의 내부 작동 방식

트리거는 폴링이 아니라 **REST 훅**입니다. Zapier가 15분마다 B1에 묻지 않습니다. Zap을 켜면 Zapier가 B1에 비공개 Zapier URL을 가리키는 웹훅을 등록하라고 요청하며, 이벤트가 발생하면 B1이 Zapier로 데이터를 보내고, 여러분의 Zap은 **몇 초 안에** 실행됩니다. Zap을 끄면 Zapier가 B1에 웹훅 삭제를 요청하므로, 남겨진 구독은 없습니다.

따라서 트리거는 Zap을 켠 **이후에** 발생한 이벤트에만 반응합니다. 과거 데이터를 채우지 않습니다. Zap을 켠다고 어제의 헌금이 다시 실행되지는 않습니다.

## 제한 사항과 참고 사항

- **같은 트리거를 쓰는 여러 Zap**은 각각 자신의 B1 웹훅을 등록합니다. 충돌은 없지만, **Settings → Developer → Webhooks**를 보다가 "Zapier — donation.created" 행이 똑같이 세 개 보인다면 놀랄 수 있으니 참고하세요.
- **Zap 설정의 테스트 데이터** -- Zap을 만들 때 Zapier는 필드를 매핑하기 위해 샘플 데이터를 요청합니다. B1에 일치하는 가장 최근 이벤트가 있으면 그것을 가져오고, 없으면 앱 정의에 있는 가상의 샘플을 사용합니다.
- **작업 실패는 Zap 오류로 표시됩니다** -- Zapier의 작업 기록에 나타납니다. 흔한 원인은 올바른 범위가 없는 API 키입니다(예: "Add Donation" 작업에는 `donations:write`가 필요함). 올바른 범위로 키를 다시 만들고 Zapier에서 다시 연결하세요.
- **외부 API 호출 할당량** -- 작업이 보내는 모든 B1 API 호출은 B1 쪽이 아니라 Zapier 작업 할당량에 포함됩니다.

## 문제 해결

- **연결할 때 "Authentication failed"** -- API 키가 잘못되었거나, 취소되었거나, Zap에 필요한 범위가 없습니다. B1Admin에서 최소 `settings:write`와 Zap이 사용하는 리소스 범위를 포함해 키를 다시 만들고 연결을 업데이트하세요.
- **트리거가 전혀 실행되지 않음** -- 웹훅이 실제로 등록되었는지 확인하세요. B1Admin의 **Settings → Developer → Webhooks**에 "Zapier — &lt;event&gt;"라는 행이 있어야 합니다. 없다면 Zap을 켤 때 API 키에 `settings:write`가 없었을 가능성이 큽니다. 키를 고치고, Zap을 껐다가 다시 켜세요.
- **트리거가 두 번 실행됨** -- Zapier는 확인 응답이 유실되면 가끔 다시 전달합니다. 엄격한 중복 제거가 필요하다면 고유한 id(예: 교인의 `id`)에 대해 "Filter by Zapier" 단계를 사용하세요.

## 함께 보기

- [Make](./make) -- 같은 방식이지만 다른 플랫폼
- [Slack & Discord](./slack-discord) -- Zapier 없이 더 간단한 채팅 알림
- [웹훅(개발자 참고)](/docs/developer/api/webhooks)
