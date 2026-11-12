---
title: "Clearstream"
description: "Zapier를 통해 Clearstream SMS를 B1 Admin에 연결하세요. 새 헌금이나 양식 제출 시 문자를 보내고, 들어온 답장을 사람 기록으로 다시 가져올 수 있습니다."
---

# Clearstream

<div class="article-intro">

새 사람, 새 헌금, 양식 제출, 캘린더 업데이트 등 B1의 모든 이벤트에서 [Clearstream](https://clearstream.io) 문자 메시지를 보내고, 답장을 B1 기록으로 다시 가져올 수 있습니다. Clearstream의 Zapier 앱은 양방향을 모두 지원하므로, 전체 연결은 맞춤 코드가 아니라 활용 예시로 구성할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 최소 하나의 목록과 SMS 할당량이 있는 [Clearstream](https://clearstream.io) 계정
- [Zapier](https://zapier.com) 계정
- **Edit Settings** 권한이 있는 B1Admin 사용자

</div>

## 연결할 수 있는 항목 {#what-you-can-wire-up}

| 방향 | 트리거 | 작업 |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Create/Update Subscriber + Send Text to Number |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Send Text to List (예: 재무팀에 알림) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Send Text to a routing list (예: 기도 제목 팀) |
| Clearstream → B1 | New Incoming Text | B1: Create Person; 보낸 키워드로 태그 지정 |

Clearstream의 Zapier 작업: *Send Text to Number*, *Send Text to List*, *Create/Update Subscriber*, *Add Subscriber to Automated Workflow*, *Add Tag to Subscriber*, *Remove Subscriber From List*.

## 설정 {#setup}

### 1. B1 API 키 만들기 {#1-mint-a-b1-api-key}

**Settings → Developer → API Keys → New API Key**에서 다음을 설정하세요:

- `settings:write` — 키를 Zapier에 연결하고 B1이 트리거 웹훅을 등록하는 데 필요합니다
- `people:read` — 이벤트에서 사람을 찾기 위해 필요합니다(`personId` → 이름/전화번호/이메일)
- (선택 사항) Clearstream 답장으로 B1 연락처를 만들려면 `people:write`

### 2. "새 헌금 시 문자" Zap 만들기 {#2-build-the-text-on-new-gift-zap}

1. **Trigger** — B1.church: New Donation
2. **Action** — B1.church: Find Person(헌금의 `personId`)
3. **Action** — Clearstream: Send Text to Number. 2단계에서 가져온 사람의 전화번호를 수신자로 사용하고, 메시지를 작성하세요(`"Thanks for your gift, {first}! …"`).

Zap을 켜세요. B1은 활성화할 때 헌금 웹훅을 등록하며, **Settings → Developer → Webhooks**에 `Zapier — donation.created` 항목이 나타납니다.

### 3. (선택 사항) 답장을 B1 기록으로 가져오기 {#3-optional-pull-replies-back-as-b1-records}

1. **Trigger** — Clearstream: New Incoming Text
2. **Action** — Zapier 필터: 키워드 기준 — 예: 문자 본문이 `PRAY`로 시작하는 경우에만 계속 진행
3. **Action** — 문자 본문을 팀이 볼 수 있는 곳(Slack, Google 시트 또는 B1 업무)에 저장하세요. B1의 *Find Person*은 id, 이메일 또는 이름으로만 사람을 찾고 전화번호로는 찾지 못하므로, 답장을 B1 사람과 직접 대조하세요(또는 Webhooks by Zapier GET으로 B1의 `/membership/people/search/phone?number=…` 엔드포인트를 추가하세요).

## 자주 쓰는 활용 예시 {#common-recipes}

### 봉사팀 호출 {#volunteer-team-paging}

- **Trigger** — B1.church: New Form Submission(기도 제목 양식 id로 필터링)
- **Action** — Clearstream: Send Text to List. 목록은 당직 목회팀으로 지정하세요. 본문은 `New prayer request: {data.questions.0.answer}`로 작성합니다.

### 첫 방문자 후속 연락 순서 {#first-time-visitor-follow-up-sequence}

- **Trigger** — B1.church: New Person, 사람의 교인 상태(예: *Visitor*)로 필터링
- **Action** — Clearstream: Add Subscriber to Automated Workflow. 워크플로 id를 미리 만들어 둔 7일짜리 문자 발송 일정에 매핑하세요.

### 키워드로 그룹 가입 {#keyword-driven-group-join}

- **Trigger** — Clearstream: New Incoming Text(키워드 `MENS`로 필터링)
- **Action** — B1.church: 문자를 보낸 사람의 이름과 전화번호로 Create Person(B1의 *Find Person*은 전화번호로 사람을 찾을 수 없으므로, 나중에 **People**에서 중복을 확인하세요)
- **Action** — B1.church: Add Group Member를 Men's Ministry 그룹에 추가

## 제한 사항 및 참고 {#limits--notes}

- **Clearstream은 SMS를 메시지 단위로 계산합니다.** 모든 Send Text 작업은 길이와 수신자 수에 따라 하나 이상의 크레딧을 사용하므로, 요금제의 할당량을 확인하세요.
- ***Send Text to Number*에는 전화번호가 E.164 형식**(예: `+15555550199`)이어야 합니다. B1의 사람 기록에는 입력된 그대로 저장되므로, 형식을 보장할 수 없다면 *Formatter by Zapier — Numbers → Format Phone Number* 단계를 사용하세요.
- **B1 쪽에서는 헤더가 필요하지 않습니다** — Clearstream의 인증은 전적으로 Zapier 연결 안에서 처리됩니다.

## 문제 해결 {#troubleshooting}

- **트리거가 전혀 실행되지 않음** — Zap을 켠 뒤 `Settings → Developer → Webhooks`에 `Zapier — <event>` 항목이 나타나야 합니다. 나타나지 않으면 B1 API 키에 `settings:write`가 없는 것입니다. 키를 다시 만들어 다시 연결하세요.
- **Clearstream이 "Invalid phone number"를 반환함** — 수신자 필드가 E.164 형식이 아닙니다. Format Phone Number 단계를 추가하세요.
- **Send Text to List가 `403`으로 실패함** — Clearstream API 사용자에게 해당 목록에 대한 권한이 없거나 목록 id가 잘못되었습니다. 목록 id는 Clearstream의 목록 상세 페이지에서 확인할 수 있습니다.

## 함께 보기 {#see-also}

- [Text In Church](./text-in-church.md) — 비슷한 연결 구조의 대안 SMS 플랫폼
- [Mobile Message](./mobile-message.md) — 미국 외 지역 교회용
- [Zapier(개요)](../zapier.md) — 모든 Zapier 활용 예시의 B1 쪽 설정
- [Clearstream API 문서](https://api-docs.clearstream.io/) — Zapier 앱을 넘어서는 사용자 지정 통합용
