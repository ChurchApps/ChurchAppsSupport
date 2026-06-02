---
title: "Zapier"
---

# Zapier

<div class="article-intro">

Zapier의 공식 B1.church 앱을 사용하면 Zap이 교회의 이벤트에 반응하고(신규 회원, 새로운 기부금, 새로운 그룹 멤버 등) 기록을 B1에 다시 기록할 수 있습니다. 코딩이나 인프라 없이 Zapier의 드래그 앤 드롭 편집기에서 설정하고, API 키를 붙여넣고, Zap을 켜면 됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- [Zapier](https://zapier.com) 계정 (몇 개의 Zap을 만들기에 충분한 무료 플랜)
- B1Admin의 **설정 편집** 권한이 있는 교회 관리자 (API 키 생성)
- 수행할 작업의 개념 - 예: "B1에서 회원이 추가되면 Mailchimp 목록에 추가"

</div>

## 트리거 및 작업

| 유형 | 설명 | B1 이벤트 / 엔드포인트 |
|---|---|---|
| **Trigger** | 신규 회원 | `person.created` |
| **Trigger** | 업데이트된 회원 | `person.updated` |
| **Trigger** | 새로운 기부금 | `donation.created` |
| **Trigger** | 새로운 그룹 멤버 | `group.member.added` |
| **Trigger** | 새로운 양식 제출 | `form.submission.created` |
| **Action** | 회원 생성 | 새로운 회원 추가 |
| **Action** | 기부금 추가 | 기부금 기록 |
| **Action** | 그룹 멤버 추가 | 회원을 그룹에 추가 |
| **Search** | 회원 찾기 | 이름이나 이메일로 회원 검색 |

이들을 Zapier의 7,000개 이상의 지원 앱과 자유롭게 조합할 수 있습니다.

## 설정

### 1. B1 API 키 생성

1. B1Admin에서 **설정 → 개발자 → API 키**로 이동합니다.
2. **새 API 키**를 클릭하고 "Zapier"와 같은 이름을 지정하고 Zap이 필요로 하는 스코프를 선택합니다.
3. **중요:** Zapier 트리거는 Zap이 켜질 때 귀사를 대신하여 웹훅을 등록하므로 **`settings:write`** 스코프가 필요합니다. B1 트리거를 사용하는 모든 Zap에 `settings:write`를 포함하세요.
4. 또한 작업에 필요한 스코프를 부여합니다 - 예를 들어 "기부금 추가" 작업은 `donations:write`가 필요하고, "회원 생성"은 `people:write`가 필요합니다.
5. 저장합니다. 전체 `cak_…` 키는 **한 번만** 표시됩니다 - 복사하세요.

### 2. Zapier를 B1에 연결

1. Zapier에서 새 Zap을 만듭니다.
2. 처음으로 B1 트리거 또는 작업을 선택할 때 Zapier는 **B1.church에 로그인**하라고 요청합니다.
3. 1단계의 API 키를 붙여넣고 **네, 계속**을 클릭합니다. Zapier는 이를 교회에 대해 검증합니다.

연결은 Zapier에 저장되며 귀 계정의 모든 Zap에서 재사용됩니다.

### 3. Zap 구성

트리거를 선택한 다음 하나 이상의 작업 단계를 추가합니다. 아래의 예를 참조하세요.

## 일반적인 레시피

### 새로운 B1 회원을 Mailchimp에 추가

- **Trigger** — B1: 신규 회원
- **Action** — Mailchimp: 구독자 추가/업데이트. B1의 `name__first`, `name__last`, `contactInfo__email`을 Mailchimp의 이름 / 성 / 이메일 필드에 매핑합니다.

### 기부금을 기본 제공 커넥터보다 풍부한 카드로 Slack 채널에 게시

- **Trigger** — B1: 새로운 기부금
- **Action** — Slack: 채널 메시지 보내기. 기본 제공 [Slack 커넥터](./slack-discord)가 할 수 없는 모든 레이아웃(버튼, 첨부 파일 등)을 작성합니다.

### 새로운 그룹 멤버를 Google 그룹에 추가

- **Trigger** — B1: 새로운 그룹 멤버 (특정 `groupId`로 필터링)
- **Action** — Zapier로 필터링: B1 그룹이 관심 있는 그룹인 경우에만 계속
- **Action** — B1: 회원 찾기 (트리거의 `personId`를 사용하여 이메일을 가져옵니다)
- **Action** — Google 그룹: 멤버 추가

### 양식 제출을 프로젝트 추적 도구로 전달

- **Trigger** — B1: 새로운 양식 제출
- **Action** — Notion / Linear / Asana / Trello: 페이지 / 문제 / 작업 생성

## 트리거가 내부적으로 작동하는 방식

트리거는 폴링이 아닌 **REST 훅**입니다 - Zapier는 15분마다 B1을 핑하지 않습니다. Zap을 켜면 Zapier는 B1에 개인 Zapier URL을 가리키는 웹훅을 등록하도록 요청합니다. 이벤트가 발생하면 B1이 인벨로프를 Zapier로 POST하고 **몇 초 내에** Zap이 시작됩니다. Zap을 끄면 Zapier는 B1에 웹훅을 삭제하도록 요청합니다 - 고아 구독이 없습니다.

이는 트리거가 Zap이 켜진 **후에** 발생하는 이벤트에 대해서만 실행된다는 의미입니다. 역채우기(backfill)가 없습니다 - Zap을 켜도 어제의 기부금을 다시 재생하지 않습니다.

## 제한 사항 및 참고 사항

- **동일한 트리거를 가진 여러 Zap** 각각 자신의 B1 웹훅을 등록합니다 - 충돌은 없지만 **설정 → 개발자 → 웹훅**을 검사하고 동일한 `Zapier — donation.created` 행이 3개 있는 이유를 궁금해할 때 알아둘 가치가 있습니다.
- **Zap 설정의 테스트 데이터** — Zap을 작성할 때 Zapier는 필드를 매핑할 샘플 데이터를 요청합니다. B1에 일치하는 가장 최근 이벤트가 있으면 가져옵니다. 그렇지 않으면 앱 정의의 합성 샘플을 사용합니다.
- **작업 실패는 Zap 오류로 나타납니다** Zapier의 작업 기록에서. 일반적인 원인: 올바른 스코프가 없는 API 키 (예: "기부금 추가" 작업은 `donations:write` 필요). 올바른 스코프로 키를 다시 만들고 Zapier에서 다시 연결합니다.
- **아웃바운드 API 호출 할당량** — 작업의 모든 B1 API 호출은 B1 측의 아무것도가 아닌 Zapier 작업 할당량에 포함됩니다.

## 문제 해결

- **연결할 때 "인증 실패"** — API 키가 잘못되었거나 해지되었거나 Zap이 필요로 하는 스코프가 없습니다. `settings:write` 및 Zap이 건드리는 모든 리소스 스코프로 B1Admin에서 다시 만들고 연결을 업데이트합니다.
- **트리거가 실행되지 않음** — 웹훅이 실제로 등록되었는지 확인합니다: B1Admin에서 **설정 → 개발자 → 웹훅**은 이제 "Zapier — &lt;event&gt;"라는 행을 표시해야 합니다. 거기에 없으면 Zap을 켤 때 API 키에 `settings:write`이 없었을 것입니다. 키를 수정하고 Zap을 껐다가 다시 켜세요.
- **트리거가 두 번 실행됨** — Zapier는 때때로 인정(acknowledgement)이 손실된 경우 재전달합니다. 엄격한 중복 제거가 필요하면 고유 ID (예: 회원의 `id`)에서 "Zapier로 필터링" 단계를 사용하세요.

## 참고 항목

- [Make](./make) — 동일한 패턴, 다른 플랫폼
- [Slack & Discord](./slack-discord) — Zapier 없이 더 간단한 채팅 알림
- [웹훅 (개발자 참고자료)](/docs/developer/api/webhooks)
