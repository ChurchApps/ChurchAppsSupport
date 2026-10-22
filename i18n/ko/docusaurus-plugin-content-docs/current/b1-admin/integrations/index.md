---
title: "통합"
---

# 통합 {#integrations}

<div class="article-intro">

B1은 팀이 이미 사용하는 도구와 연결됩니다. 직원 알림을 위해 Slack이나 Discord를 연결하고, Zapier나 Make로 작업을 자동화하거나, Google 스프레드시트로 필요할 때 데이터를 내보낼 수 있습니다. 별도의 통합 플랫폼에 돈을 낼 필요도, ChurchApps가 추가로 무언가를 호스팅할 필요도 없습니다. 모든 통합은 해당 제3자의 자체 인프라에서 실행되며, B1의 웹훅이나 REST API를 통해 교회와 통신합니다.

</div>

## 사용 가능한 통합 {#whats-available}

| 통합 | 기능 | 방향 | 설정 노력 |
|---|---|---|---|
| **[Slack](./slack-discord)** | 읽기 쉬운 알림(새 사람, 헌금, 등록 등)을 Slack 채널에 게시 | B1 → Slack | 2분 |
| **[Discord](./slack-discord)** | 같은 기능을 Discord 채널에서 | B1 → Discord | 2분 |
| **[Zapier](./zapier)** | B1 이벤트를 트리거로, B1 작업을 Zapier의 7,000여 개 앱에서 사용 | 양방향 | Zap당 5~10분 |
| **[Make](./make)** | Zapier와 같은 개념을 Make의 시각적 시나리오 빌더에서 | 양방향 | 시나리오당 5~10분 |
| **[Google 스프레드시트](./google-sheets)** | 사람 / 헌금 / 그룹 / 출석을 필요할 때 스프레드시트로 내보내기 | B1 → 시트 | 5분 |
| **[Claude](./claude)** | 교회 데이터에 관해 Anthropic의 Claude에게 질문하기(권한 범위 내) | 양방향 | 5분 |
| **[ChatGPT](./chatgpt)** | 같은 개념을 OpenAI의 ChatGPT로, 사용자 지정 GPT 또는 MCP를 지원하는 OpenAI 도구를 통해 | 양방향 | 10분 |
| **[연결된 서비스](./services/)** | Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr용 맞춤 설정 방법 | 다양함 | 각 5~10분 |

## 고르는 방법 {#how-to-pick}

- **채팅에서 알림만 받고 싶다면?** **Slack**이나 **Discord**를 사용하세요. 제3자 계정도, 관리해야 할 Zap도 필요 없습니다. 모두 B1Admin 안에서 설정합니다.
- **여러 앱에 걸친 작업을 자동화하고 싶다면**(예: "누군가 헌금하면 Mailchimp 목록과 Slack #donations에 추가") **Zapier**나 **Make**를 사용하세요. Zapier는 더 친숙하고, Make는 규모가 클 때 더 저렴하며 더 유연한 로직을 제공합니다.
- **일회성 데이터 추출이나 정기 보고서가 필요하다면?** **Google 스프레드시트**를 사용하세요. 부가 기능의 사이드바에 API 키를 붙여 넣고 내보내기를 클릭합니다.
- **평범한 말로 질문하고 싶다면**("지난 주일에 처음 방문한 사람은 몇 명이었나?", "이번 달 헌금을 요약해 줘") **[Claude](./claude)**나 **[ChatGPT](./chatgpt)**를 사용하세요. 두 가지 모두 API 키 하나로 B1에 연결되며, Claude는 claude.ai에서 B1에 로그인하여 연결할 수도 있습니다.
- **직접 사용자 지정 통합을 만들고 싶다면?** 위의 것 중에는 없습니다. [API 키](/docs/developer/api/api-keys)로 [REST API](/docs/developer/api)를 직접 호출하거나, 직접 운영하는 서버를 [웹훅](/docs/developer/api/webhooks)에 구독시키세요.

## 공통점 {#what-they-have-in-common}

모든 통합은 **B1 API 키**로 인증하며, 이 키는 B1Admin의 **설정 → 개발자 → API 키**에서 만듭니다. 이 키는 다음과 같습니다.

- 교회의 특정 사람에 연결되며, 그 사람의 권한을 그대로 물려받습니다
- **범위**로 권한을 좁힐 수 있습니다. 예를 들어 Google 스프레드시트 내보내기에는 `settings:write`가 아니라 `people:read`만 필요합니다
- 언제든지 취소할 수 있으며, 취소하면 다른 것에 영향을 주지 않고 통합의 접근만 즉시 끊깁니다

일부 커넥터(Zapier, Make)는 Zap이나 시나리오를 켤 때 사용자를 대신하여 [웹훅](/docs/developer/api/webhooks)을 등록하고, Zap을 끌 때 이를 제거합니다. 웹훅 URL을 직접 관리할 필요는 없습니다.

:::tip
Zapier와 Make가 웹훅을 자동으로 등록하려면 API 키에 **`settings:write`** 범위(그리고 통합이 사용하는 리소스의 범위)가 필요합니다. 읽기 전용 키는 작업과 내보내기에는 작동하지만 트리거에는 작동하지 않습니다.
:::

## 비용 {#cost}

ChurchApps는 무료이며 오픈 소스입니다. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), 그리고 공식 Zapier / Make / Google 스프레드시트 커넥터도 저희 쪽에서는 무료입니다. 제3자는 자신의 플랫폼에 대해 요금을 부과할 수 있습니다(Zapier와 Make는 모두 넉넉한 무료 요금제를 제공하며, Slack, Discord, Google 스프레드시트는 이 용도로는 무료입니다).

## 직접 만들기 {#building-your-own}

위의 어느 것도 맞지 않는다면, B1의 모든 기능은 열려 있습니다.

- **[REST API](/docs/developer/api)** — `Authorization: Bearer cak_…` 헤더를 사용하여 어떤 언어에서든 B1을 호출할 수 있습니다
- **[웹훅](/docs/developer/api/webhooks)** — 공개 HTTPS 엔드포인트를 하나 이상의 이벤트 유형에 구독시키고 서명된 JSON 페이로드를 받을 수 있습니다
- **[OAuth + 연결된 앱](/docs/developer/api/connected-apps)** — 많은 교회가 사용하는 SaaS 제품을 만드는 경우

## 다음 단계 {#next-steps}

- [Slack & Discord](./slack-discord) — 채팅 알림 게시하기
- [Zapier](./zapier) — 7,000여 개 앱에 연결하기
- [Make](./make) — 시각적 워크플로 자동화
- [Google 스프레드시트](./google-sheets) — 스프레드시트로 내보내기
- [Claude](./claude) — 교회 데이터에 관해 Anthropic의 Claude에게 묻기
- [ChatGPT](./chatgpt) — 교회 데이터에 관해 OpenAI의 ChatGPT에게 묻기
- [연결된 서비스](./services/) — 서비스별 방법(Mailchimp, Donorbox, Clearstream 등)
