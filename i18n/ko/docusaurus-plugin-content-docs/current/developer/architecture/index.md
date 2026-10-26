---
title: "아키텍처"
---

# 아키텍처

<div class="article-intro">

이 페이지들은 시스템 간을 가로지르는 지도입니다. 앱, API 모듈, 공유 라이브러리를 거쳐 핵심 ChurchApps 시스템이 end-to-end로 어떻게 동작하는지 설명하며, 개별 프로젝트를 어떻게 설정하는지는 다루지 않습니다. 시스템의 동작을 변경하기 전에 읽어 보세요. 프로젝트를 실행하려면 [설정](../setup/)을, 엔드포인트 수준의 참조는 [API 섹션](../api/)을 참고하세요.

</div>

## 생태계 한눈에 보기

ChurchApps는 모노레포가 아닌 약 20개의 독립된 저장소로 구성됩니다. 클라이언트 앱은 HTTPS와 WebSocket을 통해 소수의 백엔드 API와 통신하며, `@churchapps` 범위로 배포되는 npm 패키지를 통해 코드를 공유합니다.

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

이 섹션에 문서화된 모든 내용을 형성하는 두 가지 구조적 규칙이 있습니다.

1. **모듈은 서로 격리됩니다.** 각 Api 모듈은 자신의 데이터베이스와 테이블을 소유하며, 다른 모듈과 앱은 REST 엔드포인트를 통해서만 그 데이터에 접근합니다. [모듈 구조](../api/module-structure)를 참고하세요.
2. **공유 코드는 npm 패키지로 배포됩니다.** 앱끼리 서로의 소스를 가져오지 않으며, 재사용되는 모든 것은 `@churchapps/helpers`, `@churchapps/apphelper`, 또는 `@churchapps/apihelper`를 통해 저장소 경계를 넘습니다. [공유 라이브러리](../shared-libraries/)를 참고하세요.

## 시스템 맵

| 페이지 | 다루는 내용 | 범위 |
|------|----------------|-------|
| [알림 및 리마인더](./notifications) | 사람에게 무언가를 전달하는 방식. 두 개의 발송 통로, 채널 에스컬레이션 체인, 리마인더 엔진 | Api (messaging), B1Admin, B1App |
| [실시간 아키텍처](../realtime) | 채팅, 프레즌스, 인앱 전달을 뒷받침하는 WebSocket 전달 프레임워크 | Api (messaging), 모든 웹 앱 |
| [웹 푸시 알림](../web-push) | 브라우저 푸시 채널. VAPID 키, 구독 저장, 전달 | Api (messaging), 모든 웹 앱 |
| [헌금](./giving) | 결제 제공업체와 게이트웨이, 기부 흐름, 펀드/배치, 게이트웨이 웹훅 | Api (giving), apphelper, B1App, B1Admin |
| [이벤트 등록](./registrations) | 등록 커머스 모델. 참가자 유형, 선택 항목, 할인 코드, 헌금 게이트웨이를 통한 결제, 대기자 명단 | Api (content + giving), B1App, B1Admin |
| [체크인](./check-ins) | 키오스크 및 셀프 체크인, 출석 데이터 모델, 방 라우팅, 아동 안전 계층, 라벨 인쇄 | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [웹사이트 빌더](./website-builder) | 페이지/섹션/요소 트리, 요소 유형 계약과 렌더러, 블로그, 접근 제한 페이지, SEO, AI 생성 | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [웹사이트 라우팅 및 다중 사이트](./websites) | 요청이 교회와 특정 사이트로 해석되는 방식, 다중 사이트 `siteId` 데이터 모델, Caddy 커스텀 도메인 엣지 | B1App, Api (membership + content), B1Admin |
| [통합](./integrations) | 확장 영역. OAuth, API 키, 웹훅, 콘텐츠 제공업체, MCP | Api, 공유 라이브러리, 외부 앱 |
| [감사 로그 및 실행 취소 가능한 배치](./audit-log) | 컨트롤러 단일 지점에서 모든 변경을 기본으로 감사하며, 가져오기와 일괄 작업을 실행 취소할 수 있게 하는 배치 계층 | Api (모든 모듈), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | 유료 저장소 및 문자 크레딧 서비스. 공유 JWT 신원, 서비스 키 S2S, 문자 및 저장소 제공업체 연결 지점, Stripe 청구 | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), texting/apihelper 패키지, B1Admin |
| [자체 보유 저장소(BYOS)](./byos-storage) | 교회가 무료 100MB를 넘는 업로드를 위해 Google Drive, Dropbox, OneDrive 또는 S3 호환 버킷을 연결합니다. OAuth 연결, 제공업체별 업로드 형태, 공개 다운로드 리디렉션 | Api (content + membership), helpers/apphelper 패키지, B1Admin, B1App |
| [콘텐츠 커먼즈](./commons) | 제품 간 사용자 생성 콘텐츠를 위한 공유 자산/제출 기반과, B1Admin Server Admin의 단일 스태프 전용 검토 대기열 | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
이 섹션의 시스템 맵 중 하나가 작동 방식을 바꾸는 변경을 할 때(단순히 한 앱 안의 페이지만이 아니라면), 같은 작업에서 해당 시스템 맵도 함께 업데이트해야 합니다. 그래야 이 섹션이 새 기여자에게 믿을 수 있는 첫 번째 참고 자료로 남습니다.
:::

## 제안서

이 문서들은 현재 제공되는 제품 동작이 아니라, 검토를 위해 제안된 작업을 설명합니다.

| 제안서 | 다루는 내용 |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal) | 교회 소유 계정, 키, 서비스 및 전화번호. 통합 범위, 동의, 전달, 예상치, 출시 점검 |
| [Twilio 교회 온보딩 초안](./twilio-byok-onboarding-draft) | 제안된 B1 가입 양식 설정, 교회별 캠페인 예시, 승인 및 운영 체크리스트 |
