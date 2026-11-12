---
title: "Make"
description: "Make를 B1 Admin에 연결하여 워크플로를 자동화하세요. API 키 만들기, B1.church 트리거 및 작업 설정, 흔한 오류 해결 방법을 안내합니다."
---

# Make

<div class="article-intro">

[Make](https://www.make.com)(이전 명칭 Integromat)은 시각적 워크플로 자동화 플랫폼입니다. Zapier와 취지는 비슷하지만 더 유연한 로직을 제공하며, 규모가 커질수록 비용이 저렴합니다. 공식 B1.church Make 앱을 사용하면 B1 이벤트에 즉시 반응하고 기록을 B1에 다시 쓰는 "시나리오"를 만들 수 있습니다.

</div>

:::caution 아직 사용할 수 없음
B1.church Make 앱은 아직 Make 앱 디렉터리에 게시되지 않았으므로, 지금은 아래의 **B1.church** 모듈을 시나리오에 추가할 수 없습니다. 게시되기 전까지는 [Zapier](./zapier.md)를 사용하거나, Make의 **HTTP — Make a request** 모듈에서 [API 키](/docs/developer/api/api-keys)로 B1의 [REST API](/docs/developer/api)를 호출하세요. 아래 내용은 앱이 출시된 후의 작동 방식을 설명합니다.
:::

<div class="prereqs">
<h4>시작하기 전에</h4>

- [Make](https://www.make.com) 계정(무료 요금제로 소규모 워크플로를 처리할 수 있습니다)
- B1Admin에서 **Edit Settings** 권한이 있는 교회 관리자
- 만들고 싶은 시나리오에 대한 대략적인 구상

</div>

## 모듈 {#modules}

| 유형 | 내용 | B1 이벤트 / 엔드포인트 |
|---|---|---|
| **Instant Trigger** | Watch Events | 구독한 B1 이벤트 (`person.created`, `donation.created` 등) |
| **Action** | Create Person | 새 사람을 추가 |
| **Action** | Add Donation | 헌금을 기록 |
| **Action** | Add Group Member | 사람을 그룹에 추가 |
| **Search** | Search People | 이름이나 이메일로 사람 찾기 |

즉시 트리거를 사용하면 수신할 이벤트를 고를 수 있습니다. 시나리오마다 트리거 모듈은 하나이며, 이벤트별로 설정합니다.

## 설정 {#setup}

### 1. B1 API 키 만들기 {#1-create-a-b1-api-key}

1. B1Admin에서 **Settings → Developer → API Keys**로 이동하세요.
2. **New API Key**를 클릭하고 이름을 "Make"로 지정한 다음 필요한 권한 범위를 부여하세요.
3. 시나리오 중 하나라도 즉시 트리거를 사용한다면 **`settings:write`를 포함하세요**. 시나리오를 켜면 Make가 사용자를 대신해 웹훅을 등록합니다.
4. 작업 모듈에 필요한 권한 범위도 부여하세요(예: Add Donation 모듈에는 `donations:write`).
5. 저장하고 `cak_…` 키를 복사하세요.

### 2. 연결 설정하기 {#2-install-the-connection}

1. Make에서 새 시나리오를 만들고 **B1.church** 트리거 모듈을 캔버스에 놓으세요.
2. 요청이 나오면 **Create a connection**을 클릭하세요. *API Key* 필드에 키를 붙여넣고, *API Base URL*은 `https://api.churchapps.org`로 두세요(스테이징 환경에서 테스트하는 경우는 예외).
3. **Save**를 클릭하세요. Make가 교회 프로필을 읽어 키를 테스트합니다.

연결은 Make 계정에 저장되며 여러 시나리오에서 재사용됩니다.

### 3. 트리거 설정하기 {#3-configure-the-trigger}

1. **Watch Events** 모듈의 설정을 여세요.
2. 원하는 이벤트를 고르세요(예: `donation.created`).
3. 저장하세요. Make가 고유한 웹훅 URL을 생성하고 내부에 저장합니다.

### 4. 후속 모듈 추가하기 {#4-add-downstream-modules}

Make의 수백 개 앱 모듈(Mailchimp, Google Sheets, Slack, HubSpot, 직접 만든 HTTP 엔드포인트 등) 중 원하는 것을 캔버스에 놓으세요. 트리거의 출력(`event`, `churchId`, `data.id`, `data.amount` 등)을 입력 필드에 매핑하세요. Make의 flatten / iterator / router / aggregator 모듈을 사용하면 Zapier에서는 구현하기 어려운 분기 및 병렬 흐름을 만들 수 있습니다.

### 5. 시나리오 켜기 {#5-turn-the-scenario-on}

시나리오 헤더에서 **Active**를 켜세요. Make가 B1의 `POST /membership/webhooks`를 호출하여 URL을 등록합니다. 그 순간부터 일치하는 모든 B1 이벤트가 실시간으로 시나리오를 거칩니다.

시나리오를 끄면 `DELETE /membership/webhooks/{id}`가 호출되어 남은 구독이 없도록 합니다.

## 자주 쓰는 활용 예시 {#common-recipes}

### 재무 검토를 위해 헌금을 Google 시트에 동기화하기 {#sync-donations-to-a-google-sheet-for-finance-review}

- **트리거** — B1: Watch Events (`donation.created`)
- **작업** — Google Sheets: Add a Row. `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId`를 시트의 열에 매핑하세요.

### 헌금 금액에 따른 조건부 Slack 알림 {#conditional-slack-notification-by-donation-amount}

- **트리거** — B1: Watch Events (`donation.created`)
- **Router**:
  - 분기 A — Filter: `data.amount >= 1000` → Slack: `#major-gifts`에 게시
  - 분기 B — 그 외 → Slack: `#donations`에 게시

### 새 사람 → CRM + 환영 이메일 + Slack {#new-person--crm--welcome-email--slack}

- **트리거** — B1: Watch Events (`person.created`)
- **작업** — HubSpot: Create Contact
- **작업** — Mailgun: Send Welcome Email
- **작업** — Slack: `#new-people`에 알림 (병렬 실행 — Make의 router 사용)

## 즉시 트리거의 작동 방식 {#how-the-instant-trigger-works}

즉시 트리거는 폴링이 아니라 웹훅 기반입니다. 활성화되면 Make가 생성한 URL과 선택한 이벤트를 담아 `POST /membership/webhooks`를 호출합니다. B1에서 해당 이벤트가 발생하면 B1이 Make의 URL로 봉투(envelope)를 POST하고, 시나리오가 몇 초 안에 실행됩니다. 시나리오를 비활성화하면 웹훅이 제거됩니다.

트리거는 시나리오가 **활성 상태인 동안** 발생한 이벤트에만 반응합니다. 과거 데이터를 소급해서 처리하지는 않습니다.

## 제한 사항 및 참고 {#limits--notes}

- **Watch Events 모듈당 이벤트 하나.** 여러 이벤트를 수신하려면 이벤트마다 시나리오를 하나씩 만드세요.
- **서명 검증은 제공되지 않습니다** — Make는 `X-B1-Signature`를 시나리오로 전달하지 않습니다. 신뢰 경계는 추측할 수 없는 시나리오별 Make 웹훅 URL입니다. 이는 Make의 일반적인 방식입니다. 명시적인 서명 검사가 필요하다면 [SDK](/docs/developer/api/webhooks#sdk-support)로 사용자 지정 통합을 만드세요.
- **작업 횟수** — 작업 모듈이 호출하는 모든 API 호출은 B1 쪽이 아니라 Make의 작업 횟수 할당량에서 차감됩니다.

## 문제 해결 {#troubleshooting}

- **연결 테스트 실패** — 대부분 API 키의 오타 때문입니다. B1Admin에서 키를 다시 복사하세요(전체 키는 한 번만 표시되며, 잃어버렸다면 새 키를 만드세요).
- **트리거 모듈이 활성화되지 않음** — B1Admin의 **Settings → Developer → Webhooks**를 확인하세요. 시나리오를 활성화한 뒤 "Make — &lt;event&gt;" 행이 보이지 않으면 키에 `settings:write`가 없는 것입니다. 키를 업데이트하고 다시 활성화하세요.
- **작업이 `403 Forbidden`을 반환함** — API 키에 해당 엔드포인트의 권한 범위가 없습니다. 예를 들어 Add Donation에는 `donations:write`가 필요합니다. B1Admin에서 키를 업데이트하고 다시 테스트하세요.

## 모듈이 없나요? {#missing-a-module}

필요한 모듈이 없다면(예: 아직 다루지 않은 엔드포인트용 새 작업), [support@churchapps.org](mailto:support@churchapps.org)로 이메일을 보내 주세요. 그동안은 Make의 **HTTP — Make a request** 모듈로 `Authorization: Bearer cak_…` 헤더를 사용하여 B1의 모든 엔드포인트를 호출할 수 있습니다.

## 함께 보기 {#see-also}

- [Zapier](./zapier.md) — 같은 방식이지만 더 단순한 UI와 더 많은 앱 목록
- [Slack & Discord](./slack-discord.md) — Make 없이 기본 제공되는 채팅 알림
- [웹훅(개발자 참고)](/docs/developer/api/webhooks)
