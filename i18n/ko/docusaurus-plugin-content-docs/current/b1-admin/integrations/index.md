---
title: "Integrations"
---

# 연동

<div class="article-intro">

B1은 팀이 이미 사용하는 도구와 연결됩니다. 직원 알림을 위해 Slack이나 Discord를 연결하고, Zapier나 Make로 워크플로를 자동화하거나, Google Sheets로 데이터를 필요할 때 내보낼 수 있습니다. 별도의 연동 플랫폼에 비용을 지불하지 않아도 되며, ChurchApps가 추가로 무언가를 호스팅하지 않습니다. 모든 연동은 제3자의 자체 인프라에서 실행되며, B1의 웹훅 또는 REST API를 통해 교회와 통신합니다.

</div>

## 사용 가능한 연동

| 연동 | 기능 | 방향 | 설정에 걸리는 시간 |
|---|---|---|---|
| **[Slack](./slack-discord)** | Slack 채널에 읽기 쉬운 알림(새 사람, 기부, 등록 등)을 게시합니다 | B1 → Slack | 2분 |
| **[Discord](./slack-discord)** | Discord 채널에 같은 알림을 게시합니다 | B1 → Discord | 2분 |
| **[Zapier](./zapier)** | B1 이벤트를 트리거로 사용하고, Zapier의 7,000개 이상 앱에서 B1 작업을 사용합니다 | 양방향 | Zap당 5~10분 |
| **[Make](./make)** | Zapier와 같은 개념이며, Make의 시각적 시나리오 빌더에서 사용합니다 | 양방향 | 시나리오당 5~10분 |
| **[Google Sheets](./google-sheets)** | 사람 / 기부 / 그룹 / 출석 데이터를 필요할 때 스프레드시트로 내보냅니다 | B1 → Sheet | 5분 |
| **[Claude](./claude)** | Anthropic의 Claude에게 교회 데이터에 대해 질문하며, 사용자 권한 범위 내에서 동작합니다. 무료로 체험할 수 있고 추천합니다 | 양방향 | 3분 미만 |
| **[ChatGPT](./chatgpt)** | OpenAI의 ChatGPT로 같은 기능을 제공합니다(유료 ChatGPT 요금제 필요) | 양방향 | 10분 |
| **[연결된 서비스](./services/)** | Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr용 추천 설정 가이드 | 다양함 | 서비스당 5~10분 |

## 선택 방법

- **채팅에서 알림만 받고 싶으신가요?** **Slack** 또는 **Discord**를 사용하세요. 제3자 계정도, 관리할 Zap도 필요 없습니다. 모든 설정은 B1Admin 안에서 이루어집니다.
- **여러 앱에 걸친 작업을 자동화하고 싶으신가요?** (예: "누군가 헌금하면 Mailchimp 목록에 추가하고 Slack #donations에 알림 보내기") **Zapier** 또는 **Make**를 사용하세요. Zapier는 더 사용하기 쉽고, Make는 규모가 커질수록 저렴하며 더 유연한 로직을 지원합니다.
- **일회성 데이터 추출이나 정기 보고서가 필요하신가요?** **Google Sheets**를 사용하세요. 부가 기능 사이드바에 API 키를 붙여넣고 내보내기를 클릭하면 됩니다.
- **일반 언어로 질문하고 싶으신가요?** (예: "지난 일요일에 처음 방문한 사람은 몇 명이었나요?", "이번 달 헌금을 요약해 주세요") **[Claude](./claude)**부터 시작하세요. 무료로 체험할 수 있으며 3분 이내에 설정됩니다. **[ChatGPT](./chatgpt)**도 유료 요금제로 사용할 수 있습니다. Claude는 B1 계정으로 로그인하여 연결되며, ChatGPT는 B1 API 키를 사용합니다.
- **직접 맞춤형 연동을 만들고 싶으신가요?** 위의 어떤 것도 맞지 않는다면, [API 키](/docs/developer/api/api-keys)를 사용하여 [REST API](/docs/developer/api)와 직접 통신하거나, 직접 운영하는 서버를 [웹훅](/docs/developer/api/webhooks)에 구독시키세요.

## 공통 사항

모든 연동은 **B1 API 키**로 인증합니다. 이 키는 B1Admin의 **Settings → Developer → API Keys**에서 만듭니다. 키의 특징은 다음과 같습니다.

- 교회의 특정 사람에게 연결되며, 그 사람의 권한을 그대로 상속합니다.
- **범위(scope)**로 권한을 제한할 수 있습니다. 예를 들어 Google Sheets 내보내기에는 `settings:write`가 아니라 `people:read`만 필요합니다.
- 언제든지 취소할 수 있으며, 다른 기능에 영향을 주지 않고 해당 연동의 접근만 즉시 차단합니다.

Zapier와 Make는 Zap이나 시나리오를 켤 때 [웹훅](/docs/developer/api/webhooks)을 자동으로 등록하고, Zap을 끄면 웹훅을 삭제합니다. 웹훅 URL을 직접 관리할 필요는 없습니다.

:::tip
Zapier와 Make가 웹훅을 자동으로 등록하려면 API 키에 **`settings:write`** 범위가 필요합니다(연동이 사용하는 리소스 범위도 함께 필요합니다). 읽기 전용 키로도 작업과 내보내기는 가능하지만, 트리거에는 사용할 수 없습니다.
:::

## 비용

ChurchApps는 무료이며 오픈 소스입니다. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), 공식 Zapier / Make / Google Sheets 커넥터도 저희 측에서는 무료입니다. 제3자 플랫폼은 자체 요금제를 부과할 수 있습니다(Zapier와 Make는 모두 넉넉한 무료 요금제가 있으며, Slack, Discord, Google Sheets는 이 용도로 무료입니다).

## 직접 만들기

위의 어떤 것도 맞지 않는다면, B1의 모든 기능은 열려 있습니다.

- **[REST API](/docs/developer/api)** — `Authorization: Bearer cak_…` 헤더를 사용하여 어떤 언어에서든 B1을 호출할 수 있습니다.
- **[웹훅](/docs/developer/api/webhooks)** — 공개 HTTPS 엔드포인트를 하나 이상의 이벤트 유형에 구독시키고, 서명된 JSON 페이로드를 받습니다.
- **[OAuth + 연결된 앱](/docs/developer/api/connected-apps)** — 여러 교회가 사용하는 SaaS 제품을 만들고 있다면 사용하세요.

## 다음 단계

- [Slack & Discord](./slack-discord) — 채팅 알림 게시
- [Zapier](./zapier) — 7,000개 이상의 앱과 연결
- [Make](./make) — 시각적 워크플로 자동화
- [Google Sheets](./google-sheets) — 스프레드시트로 내보내기
- [Claude](./claude) — 교회 데이터에 대해 Anthropic의 Claude에게 질문
- [ChatGPT](./chatgpt) — 교회 데이터에 대해 OpenAI의 ChatGPT에게 질문
- [연결된 서비스](./services/) — 서비스별 추천 설정 (Mailchimp, Donorbox, Clearstream 등)
