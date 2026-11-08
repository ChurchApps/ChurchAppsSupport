---
title: "아키텍처"
description: "B1 Admin, B1.church, Api 전반에서 헌금, 체크인, 알림, 웹사이트가 어떻게 연결되는지 보여주는 저장소 간 시스템 맵입니다. 동작을 변경하기 전에 참고하세요."
---

# 아키텍처

<div class="article-intro">

이 페이지들은 저장소 간 시스템 맵입니다. 개별 프로젝트를 설정하는 방법이 아니라, 핵심 ChurchApps 시스템이 앱, API 모듈, 공유 라이브러리에 걸쳐 처음부터 끝까지 어떻게 동작하는지 설명합니다. 시스템의 동작을 변경하기 전에 읽어 보세요. 프로젝트를 실행하려면 [설정](../setup/index.md)을, 엔드포인트 단위의 참고 자료는 [API 섹션](../api/index.md)을 읽으세요.

</div>

## 생태계 한눈에 보기

ChurchApps는 약 20개의 독립된 저장소로 구성되어 있으며, 모노레포가 아닙니다. 클라이언트 앱은 HTTPS와 WebSocket을 통해 소수의 백엔드 API와 통신하고, `@churchapps` 스코프로 게시된 npm 패키지를 통해 코드를 공유합니다.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│                                │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

이 섹션에서 설명하는 모든 내용은 다음 두 가지 구조 규칙을 바탕으로 합니다.

1. **모듈은 서로 격리되어 있습니다.** 각 Api 모듈은 자체 데이터베이스와 테이블을 소유하며, 다른 모듈과 앱은 해당 모듈의 REST 엔드포인트를 통해서만 데이터에 접근할 수 있습니다. [모듈 구조](../api/module-structure.md)를 참고하세요.
2. **공유 코드는 npm 패키지로 배포됩니다.** 앱은 서로의 소스 코드를 가져오지 않으며, 재사용되는 모든 코드는 `@churchapps/helpers`, `@churchapps/apphelper`, `@churchapps/apihelper`를 통해 저장소 경계를 넘습니다. [공유 라이브러리](../shared-libraries/index.md)를 참고하세요.

## 시스템 맵

| 페이지 | 다루는 내용 | 범위 |
|------|----------------|-------|
| [알림 및 리마인더](./notifications.md) | 사람에게 무언가를 전달하는 방법: 두 가지 발송 경로, 채널 단계적 전환 체인, 리마인더 엔진 | Api(메시징), B1Admin, B1App |
| [실시간 아키텍처](../realtime.md) | 채팅, 접속 상태, 앱 내 전달을 뒷받침하는 WebSocket 전달 프레임워크 | Api(메시징), 모든 웹 앱 |
| [웹 푸시 알림](../web-push.md) | 브라우저 푸시 채널: VAPID 키, 구독 저장, 전달 | Api(메시징), 모든 웹 앱 |
| [헌금](./giving.md) | 결제 제공업체와 게이트웨이, 기부 흐름, 펀드/배치, 게이트웨이 웹훅 | Api(헌금), apphelper, B1App, B1Admin |
| [이벤트 등록](./registrations.md) | 등록 상거래 모델: 참가자 유형, 선택 항목, 할인 코드, 헌금 게이트웨이를 통한 결제, 대기자 명단 | Api(콘텐츠 + 헌금), B1App, B1Admin |
| [체크인](./check-ins.md) | 키오스크 및 셀프 체크인, 출석 데이터 모델, 방 라우팅, 아동 안전 계층, 라벨 인쇄 | B1Checkin, B1App, B1Admin, Api(출석 + 멤버십) |
| [웹사이트 빌더](./website-builder.md) | 페이지/섹션/요소 트리, 요소 유형 계약과 렌더러, 블로그, 접근 제한 페이지, SEO, AI 생성 | Api(콘텐츠), AskApi, helpers/apphelper, B1Admin, B1App |
| [웹사이트 라우팅 및 다중 사이트](./websites.md) | 요청이 교회와 특정 사이트로 해석되는 방식, 다중 사이트 `siteId` 데이터 모델, Caddy 커스텀 도메인 엣지 | B1App, Api(멤버십 + 콘텐츠), B1Admin |
| [연동](./integrations.md) | 확장 영역: OAuth, API 키, 웹훅, 콘텐츠 제공자, MCP | Api, 공유 라이브러리, 외부 앱 |
| [감사 로그 및 실행 취소 가능한 일괄 작업](./audit-log.md) | 컨트롤러 단일 진입점에서 모든 변경 작업을 기본으로 감사하는 기능, 그리고 가져오기와 대량 작업을 실행 취소할 수 있게 하는 일괄 작업 계층 | Api(모든 모듈), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | 유료 스토리지 및 문자 메시지 크레딧 서비스: 공유 JWT 신원, 서비스 키 S2S, 문자 메시지 및 스토리지 제공자 경계, Stripe 결제 | MinistryStuffApi, MinistryStuffWeb, Api(콘텐츠 + 메시징), texting/apihelper 패키지, B1Admin |
| [자체 스토리지 연결(BYOS)](./byos-storage.md) | 교회가 무료 100MB를 넘는 업로드를 위해 Google Drive, Dropbox, OneDrive 또는 S3 호환 버킷을 연결하는 기능: OAuth 연결, 제공자별 업로드 형식, 공개 다운로드 리디렉션 | Api(콘텐츠 + 멤버십), helpers/apphelper 패키지, B1Admin, B1App |
| [콘텐츠 커먼즈](./commons.md) | 제품 간 사용자 생성 콘텐츠를 뒷받침하는 공유 자산/제출 기반, 그리고 B1Admin 서버 관리의 단일 직원 전용 검토 대기열 | Api(commons 모듈), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
이 시스템 중 하나가 단일 앱 내 페이지가 아니라 시스템 자체의 동작 방식을 바꾸는 경우, 해당하는 시스템 맵도 같은 작업에서 함께 업데이트해야 합니다. 그래야 이 섹션이 새로운 기여자가 가장 먼저 참고할 신뢰할 수 있는 자료로 유지됩니다.
:::

## 제안서

이 문서들은 현재 제공되는 제품 동작이 아니라, 검토를 위한 제안된 작업을 설명합니다.

| 제안 | 다루는 내용 |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | 교회 소유 계정, 키, 서비스 및 전화번호; 연동 범위, 동의, 전달, 비용 추정, 출시 점검 |
| [Twilio 교회 온보딩 초안](./twilio-byok-onboarding-draft.md) | 제안된 B1 가입 양식 설정, 교회별 캠페인 예시, 승인 및 운영 체크리스트 |
