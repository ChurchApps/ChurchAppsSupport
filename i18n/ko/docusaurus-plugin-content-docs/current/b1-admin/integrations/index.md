---
title: "통합"
description: "B1 Admin을 Slack, Discord, Zapier, Make, Google Sheets, Claude와 같은 AI 어시스턴트에 연결하세요. 각 설정 단계와 필요한 API 키 권한 범위를 확인할 수 있습니다."
---

# 통합

<div class="article-intro">

B1은 팀이 이미 사용하는 도구와 연결됩니다. 직원 알림을 위해 Slack이나 Discord를 연결하고, Zapier나 Make로 작업을 자동화하거나, Google Sheets로 필요할 때 데이터를 내보낼 수 있습니다. 별도의 통합 플랫폼을 구입할 필요도 없고, ChurchApps가 추가로 무언가를 호스팅할 필요도 없습니다. 모든 통합은 제3자의 자체 인프라에서 실행되며, B1의 웹훅이나 REST API를 통해 교회와 통신합니다.

</div>

## 사용 가능한 통합 {#whats-available}

| 통합 | 기능 | 방향 | 설정 소요 시간 |
|---|---|---|---|
| **[Slack](./slack-discord.md)** | 새 사람, 헌금, 등록 등의 알림을 읽기 쉬운 형태로 Slack 채널에 게시 | B1 → Slack | 2분 |
| **[Discord](./slack-discord.md)** | 같은 기능을 Discord 채널에 제공 | B1 → Discord | 2분 |
| **[Zapier](./zapier.md)** | B1 이벤트를 트리거로, B1 작업을 Zapier의 7,000개 이상의 앱에서 사용 (Zapier 승인 대기 중) | 양방향 | Zap당 5–10분 |
| **[Make](./make.md)** | Zapier와 같은 개념이지만 Make의 시각적 시나리오 빌더를 사용 (아직 출시되지 않음) | 양방향 | 시나리오당 5–10분 |
| **[Google Sheets](./google-sheets.md)** | 사람 / 헌금 / 그룹 / 출석 데이터를 필요할 때 스프레드시트로 내보내기 (아직 출시되지 않음) | B1 → 시트 | 5분 |
| **[Claude](./claude.md)** | Anthropic의 Claude에게 권한에 맞는 범위에서 교회 데이터에 대해 질문 — 무료로 시험 가능, 권장 | 양방향 | 3분 이내 |
| **[ChatGPT](./chatgpt.md)** | OpenAI의 ChatGPT로 같은 기능 제공 (유료 ChatGPT 요금제 필요) | 양방향 | 10분 |
| **[Mailchimp](./services/mailchimp.md)** | Mailchimp 대상자를 사람, 그룹, 저장된 목록과 동기화 상태로 유지 — B1에 내장 | B1 → Mailchimp | 5분 |
| **[연결된 서비스](./services/index.md)** | Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr용 맞춤 설정 안내 | 서비스마다 다름 | 서비스당 5–10분 |

## 선택 방법 {#how-to-pick}

- **채팅에서 알림만 받고 싶다면?** **Slack** 또는 **Discord**를 사용하세요. 제3자 계정이나 관리할 Zap이 필요 없으며, 모든 설정은 B1Admin 안에서 이루어집니다.
- **여러 앱에 걸친 작업을 자동화하고 싶다면** (예: "누군가 헌금하면 Mailchimp 목록에 추가하고 Slack #donations에 알림"), **Zapier** 또는 **Make**를 사용하세요. Zapier는 더 쉽고, Make는 규모가 커질수록 비용이 저렴하며 더 유연한 로직을 제공합니다.
- **일회성 데이터 추출이나 정기 보고서가 필요하다면?** **Google Sheets**를 사용하세요. 부가기능 사이드바에 API 키를 붙여넣고 내보내기를 클릭하면 됩니다.
- **일상 언어로 질문하고 싶다면** ("지난 주일에 처음 방문한 손님은 몇 명이었나?", "이번 달 헌금을 요약해 줘"), **[Claude](./claude.md)** 부터 시작하세요. 무료로 시험할 수 있고 3분 이내에 설정됩니다. **[ChatGPT](./chatgpt.md)** 도 유료 요금제로 사용할 수 있습니다. Claude는 B1 계정으로 로그인하여 연결하고, ChatGPT는 B1 API 키를 사용합니다.
- **직접 사용자 지정 통합을 만들고 싶다면?** 위의 어떤 것도 맞지 않는다면, [API 키](/docs/developer/api/api-keys)로 [REST API](/docs/developer/api)를 직접 호출하거나, 직접 운영하는 서버를 [웹훅](/docs/developer/api/webhooks)에 구독시키면 됩니다.

## 공통 사항 {#what-they-have-in-common}

모든 설정은 B1Admin의 **Settings → Developer**에서 이루어지며, 여기에는 **API Keys**, **Webhooks**, **Connected Apps**의 세 탭이 있습니다.

- **Slack, Discord, Mailchimp**는 **Webhooks** 탭에서 직접 만드는 웹훅입니다(일치하는 **Connector Type**을 선택하세요). API 키는 필요하지 않습니다.
- **Claude**(B1 계정으로 로그인하는 방식)는 **Connected Apps** 탭에 표시되며, 여기에서 접근을 취소할 수 있습니다.
- **Zapier, Make, Google Sheets, ChatGPT, 그리고 키를 사용하는 Claude**는 **API Keys** 탭에서 만든 **B1 API 키**로 인증합니다. 이 키는 다음과 같습니다:

  - 만든 사람에게 연결되며, 그 사람의 권한을 그대로 물려받습니다
  - **권한 범위(scopes**)로 제한할 수 있습니다. 예를 들어 Google Sheets 내보내기에는 `settings:write`가 아닌 `people:read`만 필요합니다
  - 언제든지 삭제할 수 있으며, 다른 것에 영향을 주지 않고 해당 통합의 접근만 즉시 차단합니다

일부 커넥터(Zapier, Make)는 Zap이나 시나리오를 켤 때 사용자를 대신해 [웹훅](/docs/developer/api/webhooks)을 등록하고, Zap을 끄면 이를 제거합니다. 웹훅 URL을 직접 관리할 필요는 없습니다.

:::tip
Zapier와 Make가 웹훅을 자동으로 등록하려면 API 키에 **`settings:write`** 권한 범위(및 통합이 사용하는 리소스의 권한 범위)가 필요합니다. 읽기 전용 키는 작업과 내보내기에는 작동하지만 트리거에는 작동하지 않습니다.
:::

## 비용 {#cost}

ChurchApps는 무료이며 오픈소스입니다. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), 그리고 공식 Zapier / Make / Google Sheets 커넥터도 저희 쪽에서는 무료입니다. 제3자는 자체 플랫폼에 요금을 부과할 수 있습니다(Zapier와 Make는 모두 넉넉한 무료 요금제가 있으며, Slack, Discord, Google Sheets는 이 용도로 무료입니다).

## 직접 만들기 {#building-your-own}

위의 어떤 것도 맞지 않는다면, B1의 모든 인터페이스를 사용할 수 있습니다:

- **[REST API](/docs/developer/api)** — `Authorization: Bearer cak_…` 헤더를 사용하여 어떤 언어에서든 B1을 호출
- **[웹훅](/docs/developer/api/webhooks)** — 공개 HTTPS 엔드포인트를 하나 이상의 이벤트 유형에 구독시키고, 서명된 JSON 페이로드를 받기
- **[OAuth + Connected Apps](/docs/developer/api/connected-apps)** — 여러 교회가 사용하는 SaaS 제품을 만들고 있다면

## 다음 단계 {#next-steps}

- [Slack & Discord](./slack-discord.md) — 채팅 알림 게시
- [Zapier](./zapier.md) — 7,000개 이상의 앱에 연결
- [Make](./make.md) — 시각적 워크플로 자동화
- [Google Sheets](./google-sheets.md) — 스프레드시트로 내보내기
- [Claude](./claude.md) — Anthropic의 Claude에게 교회 데이터 질문하기
- [ChatGPT](./chatgpt.md) — OpenAI의 ChatGPT에게 교회 데이터 질문하기
- [연결된 서비스](./services/index.md) — 서비스별 안내(Mailchimp, Donorbox, Clearstream 등)
