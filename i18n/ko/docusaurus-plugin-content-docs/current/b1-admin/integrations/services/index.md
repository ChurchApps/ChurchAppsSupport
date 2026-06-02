---
title: "연결된 서비스"
---

# 연결된 서비스

<div class="article-intro">

B1을 다른 교회 기술 도구에 연결하는 가장 빠른 방법은 일반적으로 Zapier 또는 Make 레시피입니다 — B1 인프라가 필요하지 않으며 제3자가 워크플로우를 호스팅합니다. 이 페이지는 현재 연결 가능한 것으로 확인된 서비스의 선별된 목록이며 각각에 대한 짧은 복사-붙여넣기 설정 가이드입니다.

</div>

## 한눈에 보기

| 서비스 | 카테고리 | 연결 | 연결할 수 있는 것 |
|---|---|---|---|
| [Mailchimp](./mailchimp) | 이메일 | Zapier 또는 Make | 새 B1 사람 / 기부자를 Mailchimp 오디언스로 동기화 |
| [Donorbox](./donorbox) | 기부 | Zapier | Donorbox 기부 및 기부자를 B1로 다시 푸시 |
| [Subsplash](./subsplash) | 앱 / 기부 | Zapier | Subsplash 기부 및 사람을 B1로 끌어오기 |
| [VOMO](./vomo) | 자원봉사 | Zapier | B1 그룹과 VOMO 프로젝트 간 자원봉사 가입 동기화 |
| [Clearstream](./clearstream) | SMS | Zapier | B1 이벤트에서 Clearstream 텍스트 트리거; 회신을 B1 기록으로 수집 |
| [Text In Church](./text-in-church) | SMS / 워크플로우 | Zapier | B1 이벤트에서 Text In Church 워크플로우 트리거; 연결 카드 데이터 수신 |
| [Mobile Message](./mobile-message) | SMS(호주) | Zapier 웹훅 또는 Make | 모든 B1 이벤트에서 SMS 전송 |
| [Checkr](./checkr) | 배경 검사 | Make | 누군가 예배 팀에 가입할 때 배경 검사 시작 |

## 모두 공통점이 있는 것

1. **B1 측은 동일합니다** — **B1Admin → 설정 → 개발자 → API 키**에서 올바른 범위로 API 키를 생성한 후 연결이 트리거용 웹훅을 등록하거나(Zapier / Make는 자동으로 하며 `settings:write` 필요) 다운스트림 작업에서 B1의 REST 엔드포인트를 호출하게 합니다.
2. **연결이 청구하고 우리가 아닙니다.** ChurchApps는 무료입니다. Zapier 및 Make는 모두 소수의 레시피를 포함하는 무료 계층을 가지고 있습니다.
3. **라이브로 가기 전에 연결을 테스트할 수 있습니다.** 양쪽 연결 모두 "테스트 단계" 버튼이 있어 트리거를 한 번 B1에 대해 실행하고 켜기 전에 데이터 형태를 표시합니다.

## 연결 선택

- **Zapier**는 더 친화적이고 더 큰 앱 카탈로그를 가지고 있습니다 — 비용이 문제가 되지 않는 한 기본값으로 사용하세요.
- **Make**는 규모에 따라 더 저렴하고 더 유연한 라우팅/필터 로직이 있습니다 — 단일 워크플로우에 팬아웃, 조건부 또는 많은 단계가 있을 때 사용하세요.
- **Zapier 웹훅**(Mobile Message 문서에서 사용됨)은 대상이 1등급 Zapier 앱이 아닐 때 모든 HTTP 엔드포인트로 Zap에서 POST하는 것을 허용하는 일반 어댑터입니다.

이 목록에 없는 것을 원하는 경우 B1의 [REST API](/docs/developer/api) 및 [웹훅](/docs/developer/api/webhooks)은 열려 있습니다 — 몇 시간 내에 [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk)로 일회성 연결을 빌드할 수 있습니다.

## 여기에 없는 것(그리고 왜)

여러 인기 있는 교회 기술 도구 — Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe — 오늘은 게시된 Zapier 앱이나 Make 모듈이 없습니다. 그들은 자체 API가 있지만 B1에 연결하는 것은 레시피가 아닌 맞춤 코드이므로 이 목록에 맞지 않습니다. 공급자가 Zapier 앱이나 Make 모듈을 추가하면 문서를 추가합니다.

또한 의도적으로 Planning Center-Services 특정 도구(음악, 프레젠테이션), 경쟁하는 ChMS 제품, 마이그레이션 컨설턴트 및 PCO 특정 데이터만 정리하는 도구 — 어느 것도 B1로의 유용한 연결 경로가 없습니다.

## 참고도 보기

- [Zapier(개요)](../zapier) — 모든 Zapier 레시피의 B1 측은 동일합니다. 이 문서는 한 번 다룹니다
- [Make(개요)](../make) — 동일한 Make 시나리오
- [Slack & Discord](../slack-discord) — 연결 없는 채팅 알림
- [Google Sheets](../google-sheets) — 온디맨드 내보내기
- [웹훅(개발자 참조)](/docs/developer/api/webhooks) — 모든 레시피가 의존하는 이벤트 카탈로그
