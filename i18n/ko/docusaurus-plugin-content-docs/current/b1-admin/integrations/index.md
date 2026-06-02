---
title: "통합"
---

# 통합

<div class="article-intro">

B1은 팀이 이미 사용 중인 도구에 연결됩니다. 직원 알림을 위해 Slack 또는 Discord에 연결하고, Zapier 또는 Make에서 워크플로우를 자동화하거나, Google Sheets로 온디맨드 데이터를 내보냅니다 — 별도의 통합 플랫폼 비용을 지불하지 않고 ChurchApps가 추가 항목을 호스팅하지 않습니다. 모든 통합은 제3자의 자체 인프라에서 실행되며 B1의 웹훅 또는 REST API를 통해 교회와 통신합니다.

</div>

## 사용 가능한 항목

| 통합 | 기능 | 방향 | 설정 노력 |
|---|---|---|---|
| **[Slack](./slack-discord)** | 읽기 쉬운 알림(새 사람, 기부, 가입, …)을 Slack 채널에 게시 | B1 → Slack | 2분 |
| **[Discord](./slack-discord)** | Discord 채널과 동일 | B1 → Discord | 2분 |
| **[Zapier](./zapier)** | B1 이벤트를 트리거로 사용하고 Zapier의 7,000개 이상 앱에서 B1 작업 사용 | 양방향 | 5–10분/Zap |
| **[Make](./make)** | Zapier와 동일한 개념이지만 Make의 시각적 시나리오 빌더 | 양방향 | 5–10분/시나리오 |
| **[Google Sheets](./google-sheets)** | 온디맨드로 사람 / 기부 / 그룹 / 출석을 스프레드시트로 내보내기 | B1 → 시트 | 5분 |
| **[Claude](./claude)** | Anthropic의 Claude에 교회 데이터에 대한 질문을 하세요, 권한에 범위가 제한됨 | 양방향 | 5분 |
| **[ChatGPT](./chatgpt)** | OpenAI의 ChatGPT와 동일한 개념, 맞춤 GPT 또는 MCP 인식 OpenAI 도구 사용 | 양방향 | 10분 |
| **[연결된 서비스](./services/)** | Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr을 위한 선별된 레시피 | 다양함 | 5–10분 각 |

## 선택 방법

- **채팅에서만 알림을 원하시나요?** **Slack** 또는 **Discord**를 사용하세요 — 제3자 계정 없음, 유지할 Zap 없음. B1Admin 내에서 완전히 구성됩니다.
- **앱 간 무언가를 자동화하고 싶으신가요**(예: "누군가 기부하면 Mailchimp 목록에 추가하고 Slack #donations에 알림")? **Zapier** 또는 **Make**를 사용하세요. Zapier가 더 친화적입니다. Make는 규모에 따라 더 저렴하고 더 유연한 로직을 가지고 있습니다.
- **일회성 데이터 끌어오기 또는 예약된 보고서가 필요하신가요?** **Google Sheets**를 사용하세요 — API 키를 애드온의 사이드바에 붙여넣고 내보내기를 클릭하세요.
- **일반 영어로 질문하고 싶으신가요**(예: "지난 일요일 초방문자가 몇 명인가요?", "이번 달 기부를 요약해주세요")? **[Claude](./claude)** 또는 **[ChatGPT](./chatgpt)**를 사용하세요 — 둘 다 단일 API 키로 B1에 연결됩니다.
- **자신의 맞춤 통합을 구축하고 있으신가요?** 위의 항목 중 없음 — [REST API](/docs/developer/api)와 직접 대화하거나 [웹훅](/docs/developer/api/webhooks)을 구독하세요.

## 공통점

모든 통합은 **B1 API 키**로 인증합니다. **설정 → 개발자 → API 키** 아래 B1Admin에서 생성됩니다. 키는:

- 교회의 특정 사람에 바인딩되며 그 사람의 권한을 상속합니다
- **범위**로 좁힐 수 있습니다 — 예를 들어 Google Sheets 내보내기는 `people:read`만 필요하고 `settings:write`는 아닙니다
- 언제든지 취소할 수 있으며, 즉시 통합의 액세스를 차단하고 다른 항목에 영향을 주지 않습니다

몇몇 커넥터(Zapier, Make)는 또한 Zap 또는 시나리오가 켜질 때 [웹훅](/docs/developer/api/webhooks)을 등록하고 꺼질 때 제거합니다 — 웹훅 URL을 직접 관리하지 않습니다.

:::tip
Zapier 및 Make가 웹훅을 자동으로 등록하려면 API 키에는 **`settings:write`** 범위(그리고 통합이 터치하는 항목의 리소스 범위)가 필요합니다. 읽기 전용 키는 작업 및 내보내기에는 작동하지만 트리거에는 작동하지 않습니다.
:::

## 비용

ChurchApps는 무료 오픈소스입니다. Slack/Discord, [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) 및 공식 Zapier / Make / Google Sheets 커넥터도 당사 측에서는 무료입니다. 제3자는 자신의 플랫폼에 대해 청구할 수 있습니다(Zapier와 Make 모두 관대한 무료 계층이 있습니다. Slack, Discord, Google Sheets는 이 목적으로 무료입니다).

## 자신의 것 구축하기

위의 항목 중 어느 것도 맞지 않는 경우 모든 B1 표면이 열려 있습니다:

- **[REST API](/docs/developer/api)** — `Authorization: Bearer cak_…` 헤더가 있는 모든 언어에서 B1 호출
- **[웹훅](/docs/developer/api/webhooks)** — 공개 HTTPS 엔드포인트를 하나 이상의 이벤트 유형에 구독하고 서명된 JSON 페이로드 수신
- **[OAuth + 연결된 앱](/docs/developer/api/connected-apps)** — 많은 교회가 사용하는 SaaS 제품을 구축하는 경우

## 다음 단계

- [Slack 및 Discord](./slack-discord) — 채팅 알림 게시
- [Zapier](./zapier) — 7,000개 이상의 앱에 연결
- [Make](./make) — 시각적 워크플로우 자동화
- [Google Sheets](./google-sheets) — 스프레드시트로 내보내기
- [Claude](./claude) — Anthropic의 Claude에 교회 데이터 물어보기
- [ChatGPT](./chatgpt) — OpenAI의 ChatGPT에 교회 데이터 물어보기
- [연결된 서비스](./services/) — 서비스별 레시피(Mailchimp, Donorbox, Clearstream, …)
