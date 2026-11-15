---
title: "Donorbox"
description: "Zapier로 Donorbox를 B1 Admin에 연결하세요. 온라인 헌금이 헌금 기록과 헌금자 사람 프로필을 자동으로 만들어, 수동 내보내기가 필요하지 않습니다."
---

# Donorbox

<div class="article-intro">

교회가 Donorbox로 헌금을 받고 사람과 명세서는 B1에서 관리한다면, Donorbox의 즉시 Zapier 트리거가 B1에 일치하는 헌금 기록을 만들도록 할 수 있습니다. 헌금자가 아직 없다면 B1 사람으로도 생성됩니다. 수동 대조나 월간 내보내기가 필요 없습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 최소 하나의 캠페인이 있는 [Donorbox](https://donorbox.org) 계정
- [Zapier](https://zapier.com) 계정
- **Edit Settings** 권한이 있는 B1Admin 사용자

</div>

## 연결할 수 있는 항목 {#what-you-can-wire-up}

| 방향 | Donorbox 트리거 | B1 작업 |
|---|---|---|
| Donorbox → B1 | New or Updated Donation (즉시) | Find Person → Add Donation |
| Donorbox → B1 | New or Updated Donor | Create Person |
| Donorbox → B1 | New or Updated Plan (정기) | Find Person → Add Donation (Plan id를 메모로 사용) |

Donorbox는 트리거를 **즉시** 방식으로 제공합니다. 실제 헌금이 들어온 지 몇 초 안에 실행되므로 폴링 지연이 없습니다.

## 설정 {#setup}

### 1. B1 API 키 만들기 {#1-mint-a-b1-api-key}

B1Admin에서: **Settings → Developer → API Keys → New API Key**. 권한 범위:

- `people:read` — 이메일로 헌금자를 찾기 위해
- `people:write` — 새 헌금자를 만들기 위해
- `donations:write` — 헌금을 기록하기 위해

- `settings:write` — Zapier는 연결할 때 모든 B1 키를 B1의 웹훅 목록과 대조하므로, 이 권한이 없으면 연결이 실패합니다(여기서 트리거를 소유하는 것은 B1이 아니라 Donorbox이지만 필요합니다)

### 2. "헌금 기록" Zap 만들기 {#2-build-the-record-a-donation-zap}

1. **Trigger** — Donorbox: New Donation. Donorbox의 API 키(Donorbox: *Account → Profile → API Settings*)로 연결하세요.
2. **Action** — B1.church: Find Person. 트리거의 헌금자 이메일을 *Email* 필드에 매핑하세요.
3. **Action** — B1.church: Add Donation. 다음과 같이 매핑하세요:
   - Person → 2단계의 id
   - Amount → 트리거의 헌금 금액
   - Donation Date → 트리거의 헌금 날짜
   - Fund → Donorbox 캠페인에 대응하는 B1 기금 선택(Zapier는 필터나 Formatter 단계를 기준으로 기금을 바꿀 수 있습니다)
   - Method → "Online"
   - Notes → Donorbox 거래 id(대조할 때 유용합니다)

Zap을 켜세요. Donorbox를 통한 다음 실제 헌금이 자동으로 **B1Admin → Donations**에 들어옵니다.

B1의 *Find Person*은 해당 이메일을 가진 사람이 없으면 "No person found" 오류와 함께 Zap을 중단하므로, 필터 단계로는 분기할 수 없습니다. 첫 헌금자를 처리하려면 Find Person 단계에 Zapier의 오류 처리를 켜고, 오류 경로에서 B1.church: Create Person(이름/성/이메일 매핑)을 실행한 다음, 새 사람의 id로 Add Donation을 실행하세요. 또는 위 표의 *New Donor* → *Create Person* Zap을 실행하여 헌금이 도착하기 전에 헌금자가 B1에 존재하도록 하세요.

## 자주 쓰는 활용 예시 {#common-recipes}

### 기금마다 Zap 하나 {#one-zap-per-fund}

여러 Donorbox 캠페인을 각각 다른 B1 기금에 연결한다면, 가장 깔끔한 구성은 캠페인마다 Zap을 하나씩 두고 맨 위에 Donorbox *campaign* 필터를 두는 것입니다. 그러면 기금 매핑이 고정되어 조회 단계를 생략할 수 있습니다.

### 수정된 헌금은 정정으로 처리하기 {#treat-updated-donations-as-corrections}

Donorbox의 *New or Updated Donation*은 수정 시에도 실행됩니다. Zapier *Path* 단계에서 `event_type`으로 분기하세요. "new" → Add Donation, "updated" → Find Donation + Update로 나눕니다(참고: B1의 Zapier 앱에는 현재 Update Donation 작업이 없으므로, 지금은 "updated" 이벤트를 Slack 채널에 기록하여 수동 검토하세요).

### 정기 헌금 계획 변경을 Slack 채널에 알리기 {#sync-recurring-plan-changes-to-a-slack-channel}

- **Trigger** — Donorbox: New or Updated Plan
- **Action** — Slack: `#donations`에 메시지 보내기(예: "Plan changed — Sarah's monthly gift is now $200")

## 제한 사항 및 참고 {#limits--notes}

- **이메일로 헌금자를 맞추세요.** Donorbox는 B1의 사람 id를 공유하지 않으므로, 유일하게 지속적인 연결 키는 이메일입니다. 다른 이메일로 헌금하는 헌금자는 새 B1 사람으로 생성되므로, 월간 대조에서 이들을 찾아보세요.
- **환불은 별도로 제공되지 않습니다** — Donorbox는 같은 헌금에 상태 업데이트를 보냅니다. B1의 Zapier 앱에는 현재 *Update Donation* 작업이 없으므로, 지금은 환불 이벤트를 별도로 기록하고 헌금을 수동으로 조정하는 것이 안전한 방법입니다.
- **먼저 Donorbox의 샌드박스에서 테스트하세요.** 실제 B1에 가짜 헌금이 생기지 않도록 하기 위해서입니다. Donorbox는 실제 환경과 별도로 테스트 모드 인증 정보를 제공합니다.

## 문제 해결 {#troubleshooting}

- **"No person found" 오류** — 헌금자가 아직 B1에 없거나 다른 이메일로 헌금했습니다. 위에서 설명한 오류 경로를 추가하고, *Create Person*이 실행될 수 있도록 API 키에 `people:write`가 있는지 확인하세요.
- **헌금 금액이 100배 크거나 작게 보임** — Donorbox는 일부 페이로드 형식에서는 센트 단위로, 다른 형식에서는 달러 단위로 보냅니다. 필요하면 *Formatter by Zapier — Numbers* 단계로 100으로 나누세요.
- **한 헌금이 중복으로 기록됨** — Donorbox는 *New Donation*과 *Updated Donation*을 모두 실행합니다. `event_type = "donation.succeeded"`로 필터링하거나, 겹치지 않는 필터를 가진 Zap 두 개를 만드세요.

## 함께 보기 {#see-also}

- [Zapier(개요)](../zapier.md) — 모든 Zapier 활용 예시의 B1 쪽 설정
- [Subsplash](./subsplash.md) — Zapier 앱이 있는 다른 헌금 플랫폼
- [Mailchimp](./mailchimp.md) — "새 헌금"을 이메일 태그로 연결
