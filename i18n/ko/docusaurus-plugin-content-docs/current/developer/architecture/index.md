---
title: "아키텍처"
---

# 아키텍처

<div class="article-intro">

이 페이지들은 교차 저장소 시스템 맵입니다. 이들은 단일 프로젝트 설정 방법이 아니라 핵심 ChurchApps 시스템이 엔드 투 엔드로 어떻게 작동하는지 문서화합니다. 앱, API 모듈, 공유 라이브러리에 걸쳐. 시스템의 동작을 변경하기 전에 읽으세요. 프로젝트를 실행하려면 [설정](../setup/)을 읽고 엔드포인트 레벨 참조를 위해 [API 섹션](../api/)을 읽으세요.

</div>

## 에코시스템 한눈에

ChurchApps는 약 20개의 독립적인 저장소입니다 (모노레포가 아님). 클라이언트 앱은 HTTPS 및 WebSocket을 통해 소수의 백엔드 API와 대화하고 `@churchapps` 범위 아래 게시된 npm 패키지를 통해 코드를 공유합니다.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│  B1Mobile   (maintenance-only) │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

이 섹션에서 문서화된 모든 것을 형성하는 두 가지 구조적 규칙이 있습니다.

1. **모듈은 격리됩니다.** 각 Api 모듈은 자신의 데이터베이스와 테이블을 소유합니다. 다른 모듈과 앱은 REST 엔드포인트를 통해서만 그 데이터에 도달합니다. [모듈 구조](../api/module-structure)를 참조하세요.
2. **공유 코드는 npm 패키지로 제공됩니다.** 앱은 서로의 소스를 가져오지 않습니다. 재사용되는 모든 것은 `@churchapps/helpers`, `@churchapps/apphelper`, 또는 `@churchapps/apihelper`를 통해 저장소 경계를 넘습니다. [공유 라이브러리](../shared-libraries/)를 참조하세요.

## 시스템 맵

| 페이지 | 포함 내용 | 범위 |
|--------|----------|------|
| [알림 및 미리 알림](./notifications) | 사람에게 무언가를 알려주는 방법: 두 개의 디스패치 문, 채널 에스컬레이션 체인, 미리 알림 엔진 | Api (messaging), B1Admin, B1App |
| [실시간 아키텍처](../realtime) | 채팅, 존재, 앱 내 배달 뒤의 WebSocket 배달 프레임워크 | Api (messaging), all web apps |
| [웹 푸시 알림](../web-push) | 브라우저 푸시 채널: VAPID 키, 구독 저장소, 배달 | Api (messaging), all web apps |
| [기부](./giving) | 결제 제공자 및 게이트웨이, 기부 흐름, 기금/배치, 게이트웨이 웹훅 | Api (giving), apphelper, B1App, B1Admin |
| [이벤트 등록](./registrations) | 등록 상거래 모델: 참석자 유형, 선택, 할인 코드, 기부 게이트웨이를 통한 결제, 대기자 목록 | Api (content + giving), B1App, B1Admin |
| [체크인](./check-ins) | 키오스크 및 셀프 체크인, 참석 데이터 모델, 실 라우팅, 어린이 안전 계층, 라벨 인쇄 | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [웹사이트 빌더](./website-builder) | 페이지/섹션/요소 트리, 요소 타입 계약 및 렌더러, 블로그, 액세스 게이트 페이지, SEO, AI 생성 | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [웹사이트 라우팅 및 멀티 사이트](./websites) | 요청이 교회 및 특정 사이트로 어떻게 해결되는지, 멀티 사이트 `siteId` 데이터 모델, Caddy 사용자 정의 도메인 에지 | B1App, Api (membership + content), B1Admin |
| [통합](./integrations) | 확장 표면: OAuth, API 키, 웹훅, 콘텐츠 제공자, MCP | Api, shared libraries, external apps |
| [감사 로그 및 실행 취소 가능한 배치](./audit-log) | 컨트롤러 제한점에서 모든 변이의 기본 켜짐 감사, 가져오기 및 대량 작업을 실행 취소할 수 있게 하는 배치 계층 | Api (all modules), B1Admin, B1Transfer |

:::tip
변경이 이 시스템 중 하나의 동작을 변경할 때 — 한 앱 내 페이지만이 아니라 — 여기 일치하는 시스템 맵을 같은 노력에서 업데이트해야 합니다. 이는 이 섹션을 새로운 기여자의 첫 번째 중지점으로 신뢰할 수 있도록 유지합니다.
:::
