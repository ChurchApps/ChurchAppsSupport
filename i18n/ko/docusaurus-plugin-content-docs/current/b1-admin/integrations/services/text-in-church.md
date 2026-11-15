---
title: "Text In Church"
description: "Zapier로 B1 Admin과 Text In Church를 연결하세요. API 키를 만들고, 커넥트 카드에서 B1로 가는 Zap을 만들고, 그룹 구성원을 동기화할 수 있습니다."
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com)는 SMS와 드립 워크플로, 커넥트 카드 자동화를 묶어 제공합니다. 이 서비스의 Zapier 앱은 양방향을 지원합니다. B1 이벤트를 Text In Church 워크플로로 보내고, 커넥트 카드나 새 연락처 트리거를 반대 방향으로 가져와 B1에 기록할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- Zapier 연동이 포함된 요금제의 [Text In Church](https://textinchurch.com) 계정
- [Zapier](https://zapier.com) 계정
- **Edit Settings** 권한이 있는 B1Admin 사용자

</div>

## 연결할 수 있는 항목 {#what-you-can-wire-up}

| 방향 | 트리거 | 작업 |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Create/Update Person + Add to Group |
| B1 → Text In Church | B1 `form.submission.created` | 관련 팀을 통해 문자 메시지 보내기 |
| B1 → Text In Church | B1 `group.member.added` | Add to Group(그룹 구성원 자격 미러링) |
| Text In Church → B1 | Connect Card Submitted | B1: Create Person + Add Group Member |
| Text In Church → B1 | Person Created | B1: Create Person |
| Text In Church → B1 | Person Joined Group | B1: Add Group Member |

Text In Church의 작업에는 *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group*, 그리고 그룹 구성원 추가/제거도 포함됩니다.

## 설정 {#setup}

### 1. B1 API 키 만들기 {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — 키를 Zapier에 연결하고, B1이 트리거하는 Zap에 필요합니다
- `people:read`, `people:write` — 사람을 찾거나 만들기 위해
- `groups:write` — 그룹 동기화를 위해
- (선택 사항) 헌금 확인을 TIC에 연결한다면 `donations:write`

### 2. Text In Church를 Zapier에 연결하기 {#2-connect-text-in-church-to-zapier}

[Text In Church의 Zapier 연동 가이드](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration)를 따르세요. TIC 대시보드에서 API 토큰을 생성합니다.

### 3. 커넥트 카드에서 B1로 가는 Zap 만들기 {#3-build-the-connect-card-to-b1-zap}

가장 흔한 방향입니다. TIC에서 발생한 커넥트 카드는 자동으로 새 B1 사람이 됩니다.

1. **Trigger** — Text In Church: Connect Card Submitted.
2. **Action** — B1.church: Find Person(이메일 기준).
3. **Action** — B1.church: Add Group Member. 2단계에서 가져온 사람의 id를 사용해 "New Contact" 그룹에 추가하세요.

B1의 *Find Person*은 일치하는 사람이 없으면 "No person found" 오류와 함께 Zap을 중단하므로, Path로는 분기할 수 없습니다. 새 연락처를 처리하려면 Find Person 단계에 Zapier의 오류 처리를 켜고, 오류 경로에서 B1.church: Create Person을 실행한 다음 Add Group Member를 실행하세요.

Zap을 켜세요. 이후 TIC를 통해 제출된 커넥트 카드는 자동으로 **B1Admin → People**에 들어옵니다.

## 자주 쓰는 활용 예시 {#common-recipes}

### B1 양식에서 커넥트 카드 방식의 워크플로 트리거하기 {#trigger-a-connect-card-style-workflow-from-a-b1-form}

- **Trigger** — B1.church: New Form Submission("I'm new here" 양식 id로 필터링)
- **Action** — Text In Church: Create/Update Person. 양식의 이메일 / 전화번호 / 이름 응답을 매핑하세요.
- **Action** — Text In Church: Add to Group. 해당 그룹에는 미리 만들어 둔 환영 워크플로가 연결되어 있어야 합니다.

### 그룹 구성원 자격 미러링하기 {#mirror-group-membership}

- **Trigger** — B1.church: New Group Member, 특정 `groupId`로 필터링
- **Action** — Text In Church: Add to Group(같은 사람, 미러 그룹). 완전한 동기화를 원한다면 `group.member.removed` Zap과 짝을 이루게 하세요.

### 누군가 합류하면 리더에게 호출 알림 보내기 {#page-a-leader-when-someone-joins}

- **Trigger** — B1.church: New Group Member
- **Action** — Text In Church: Send Text Message. 수신자 = 그룹 리더의 전화번호, 본문 = `"{first} {last} just joined {group}"`

## 제한 사항 및 참고 {#limits--notes}

- **TIC의 Zapier 앱은 요금제 등급에 따라 제한됩니다.** TIC 대시보드에서 Zapier 연동이 비활성화되어 보인다면, TIC 지원팀에 문의해 요금제에서 활성화하세요.
- **그룹 id는 B1이 아니라 TIC의 것입니다.** 미러링할 때는 어딘가에 매핑 표(Zapier *Lookup Table*, 또는 Zap마다 하드코딩)를 유지해야 합니다.
- **Send Text Message는 크레딧을 사용합니다.** *Send Text*를 실행하는 Zap마다 TIC의 SMS 할당량이 차감됩니다.

## 문제 해결 {#troubleshooting}

- **커넥트 카드 트리거가 실행되지 않음** — TIC에서 Zapier 연동 토글이 켜져 있어야 합니다. 또한 테스트에 사용한 양식이 일반 설문이 아니라 "Connect Card"로 설정되어 있는지 확인하세요.
- **B1에서 Create Person이 401로 실패함** — API 키가 잘못되었거나, 취소되었거나, `people:write`가 없습니다. 다시 만드세요.
- **B1 사람이 중복됨** — TIC는 같은 이벤트에 대해 *Person Created*와 *Connect Card Submitted*를 모두 보냅니다. 하나를 기준 원본으로 정하고, 다른 하나에 Zapier Filter를 추가하세요.

## 함께 보기 {#see-also}

- [Clearstream](./clearstream.md) — 비슷한 Zapier 구조의 대안 SMS 플랫폼
- [Zapier(개요)](../zapier.md) — 모든 Zapier 활용 예시의 B1 쪽 설정
- [Text In Church Zapier 가이드](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (TIC 문서)
