---
title: "연결된 서비스"
description: "Zapier 또는 Make 활용 예시를 사용하여 B1 Admin을 Mailchimp, Donorbox, Subsplash, VOMO, Clearstream 등 다른 도구에 연결하세요. 각 서비스의 설정 안내를 제공합니다."
---

# 연결된 서비스

<div class="article-intro">

B1을 다른 교회 기술 도구에 연결하는 가장 빠른 방법은 대개 Zapier 또는 Make 활용 예시입니다. 새로운 B1 인프라가 필요하지 않으며, 워크플로는 제3자가 호스팅합니다. 이 페이지는 현재 연결이 확인된 서비스를 큐레이션한 목록이며, 각 서비스마다 짧고 복사해서 쓸 수 있는 설정 안내를 제공합니다.

</div>

## 한눈에 보기 {#at-a-glance}

| 서비스 | 분류 | 연결 방식 | 연결할 수 있는 항목 |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | 이메일 | B1에 내장 (Webhooks 탭) | Mailchimp 대상자를 B1 사람, 그룹, 저장된 목록과 동기화 상태로 유지 |
| [Donorbox](./donorbox.md) | 헌금 | Zapier | Donorbox 헌금과 헌금자를 B1으로 보내기 |
| [Subsplash](./subsplash.md) | 앱 / 헌금 | Zapier | Subsplash 헌금과 사람을 B1으로 가져오기 |
| [VOMO](./vomo.md) | 봉사 | Zapier | B1 그룹과 VOMO 프로젝트 사이의 봉사자 신청 동기화 |
| [Clearstream](./clearstream.md) | SMS | Zapier | B1 이벤트에서 Clearstream 문자 보내기; 답장을 B1 기록으로 가져오기 |
| [Text In Church](./text-in-church.md) | SMS / 워크플로 | Zapier | B1에서 Text In Church 워크플로 트리거; Connect Card 데이터 받기 |
| [Mobile Message](./mobile-message.md) | SMS (호주) | Webhooks by Zapier 또는 Make | 모든 B1 이벤트에서 SMS 보내기 |
| [Checkr](./checkr.md) | 신원 조회 | Make | 사람이 봉사팀에 합류하면 신원 조회 시작 |

## 모든 서비스의 공통점 {#what-all-of-these-have-in-common}

1. **B1 쪽 연결은 모두 동일합니다** — **B1Admin → Settings → Developer → API Keys**에서 적절한 권한 범위의 API 키를 만든 다음, 연결 도구가 트리거용 웹훅을 등록하도록 하거나(Zapier / Make는 `settings:write`가 필요하며 자동으로 수행합니다), 다운스트림 작업에서 B1의 REST 엔드포인트를 호출하세요. B1.church Zapier 앱은 연결할 때 모든 키를 B1의 웹훅 목록과 대조하므로, 모든 키에 `settings:write`가 필요합니다. (Mailchimp는 예외입니다. 동기화가 B1에 내장되어 있고 **Webhooks** 탭에서 설정하며, API 키나 연결 도구가 필요하지 않습니다.)
2. **연결 도구 요금은 교회가 부담합니다.** ChurchApps는 무료이며, Zapier와 Make는 모두 몇 가지 활용 예시를 다룰 수 있는 무료 요금제가 있습니다.
3. **실제 운영 전에 연결을 테스트할 수 있습니다.** Zapier에는 "Test step" 버튼이 있어, 활용 예시를 켜기 전에 B1에서 샘플 데이터를 가져와 데이터 형식을 보여 줍니다.

## 연결 도구 선택하기 {#picking-a-bridge}

- **Zapier**가 더 쉽고 앱 목록이 더 큽니다. 비용이 문제가 아니라면 기본으로 사용하세요.
- **Make**는 규모가 커질수록 저렴하고 라우팅/필터 로직이 더 유연합니다. 하나의 워크플로에 여러 갈래, 조건 분기, 많은 단계가 있을 때 사용하세요.
- **Webhooks by Zapier**(Mobile Message 문서에서 사용)는 대상이 기본 Zapier 앱이 아닐 때 Zap에서 어떤 HTTP 엔드포인트로든 POST를 보낼 수 있게 해 주는 범용 어댑터입니다.

이 목록에 없는 것이 필요하다면, B1의 [REST API](/docs/developer/api)와 [웹훅](/docs/developer/api/webhooks)을 사용할 수 있습니다. [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)로 몇 시간 안에 일회성 연결 도구를 만들 수 있습니다.

## 여기에 없는 것과 그 이유 {#whats-not-here-and-why}

Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe 등 널리 쓰이는 교회 기술 도구들은 현재 게시된 Zapier 앱이나 Make 모듈이 없습니다. 이들에게도 자체 API가 있지만, B1과 연결하려면 활용 예시가 아니라 맞춤 코드 작업이 필요하므로 이 목록에 맞지 않습니다. 공급업체가 Zapier 앱이나 Make 모듈을 추가하면 문서를 추가하겠습니다.

또한 Planning Center 서비스 전용 도구(음악, 프레젠테이션), 경쟁 ChMS 제품, 마이그레이션 컨설턴트, PCO 전용 데이터만 정리하는 도구도 의도적으로 제외했습니다. 이들은 B1과 유용하게 연결되는 경로가 없습니다.

## 함께 보기 {#see-also}

- [Zapier(개요)](../zapier.md) — 모든 Zapier 활용 예시의 B1 쪽 설정은 동일하며, 이 문서에서 한 번에 다룹니다
- [Make(개요)](../make.md) — Make 시나리오도 마찬가지입니다
- [Slack & Discord](../slack-discord.md) — 연결 도구 없이 채팅 알림 받기
- [Google Sheets](../google-sheets.md) — 필요할 때 내보내기
- [웹훅(개발자 참고)](/docs/developer/api/webhooks) — 모든 활용 예시가 의존하는 이벤트 카탈로그
