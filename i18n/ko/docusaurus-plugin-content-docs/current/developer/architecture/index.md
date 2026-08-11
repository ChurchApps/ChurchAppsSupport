---
title: "아키텍처"
---

# 아키텍처

<div class="article-intro">

이 페이지들은 교차 저장소 시스템 맵입니다: 단일 프로젝트 설정 방법이 아닌 핵심 ChurchApps 시스템이 엔드 투 엔드로 어떻게 작동하는지 문서화합니다 -- 앱, API 모듈 및 공유 라이브러리에 걸쳐. 시스템의 동작을 변경하기 전에 읽으세요. 프로젝트 실행 방법은 [설정](../setup/)을 읽고 엔드포인트 수준 참조는 [API 섹션](../api/)을 읽으세요.

</div>

## 한눈에 보는 생태계

ChurchApps는 약 20개의 독립적인 저장소(모노레포가 아님)입니다. 클라이언트 앱은 HTTPS 및 WebSocket를 통해 작은 백엔드 API 세트와 통신하며, `@churchapps` 범위에서 발행된 npm 패키지를 통해 코드를 공유합니다.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  클라이언트                    │            │  Api -- 핵심 모듈식 모놀리식(AWS Lambda)     │
│                                │            │                                              │
│  B1Admin    직원 대시보드      │   HTTPS    │   membership    attendance    content        │
│  B1App      회원 포털 +        │ ─────────▶ │   giving        messaging     doing          │
│             교회 웹사이트      │            │                                              │
│  B1Checkin  체크인 키오스크   │ ◀───WS───▶ │   모듈당 MySQL 데이터베이스(총 6개)         │
│  B1Mobile   (유지보수 전용)   │            └──────────────────────────────────────────────┘
│  FreePlay   TV 콘텐츠 플레이어 │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi -- Lessons.church 백엔드         │
                │                             └──────────────────────────────────────────────┘
                │  npm을 통한 공유 코드(@churchapps/*)
                ▼
   helpers(교차 앱 인터페이스) · apphelper(React 구성 요소) · apihelper(Express/서버 유틸리티)
```

이 섹션에 문서화된 모든 내용을 형성하는 두 가지 구조 규칙이 있습니다:

1. **모듈은 격리되어 있습니다.** 각 Api 모듈은 해당 데이터베이스 및 테이블을 소유합니다. 다른 모듈 및 앱은 REST 엔드포인트를 통해서만 데이터에 도달합니다. [모듈 구조](../api/module-structure)를 참조하세요.
2. **공유 코드는 npm 패키지로 제공됩니다.** 앱은 서로의 소스를 가져오지 않습니다. 모든 재사용은 `@churchapps/helpers`, `@churchapps/apphelper` 또는 `@churchapps/apihelper`를 통해 저장소 경계를 넘습니다. [공유 라이브러리](../shared-libraries/)를 참조하세요.

## 시스템 맵

| 페이지 | 내용 | 범위 |
|------|-------|-------|
| [알림 및 알림](./notifications) | 무엇이든 사람에게 무언가를 말하는 방법: 두 가지 발송 도어, 채널 에스컬레이션 체인 및 알림 엔진 | Api(메시징), B1Admin, B1App |
| [실시간 아키텍처](../realtime) | 채팅, 현재 상태 및 인앱 전달 뒤의 WebSocket 전달 프레임워크 | Api(메시징), 모든 웹 앱 |
| [웹 푸시 알림](../web-push) | 브라우저 푸시 채널: VAPID 키, 구독 저장소, 전달 | Api(메시징), 모든 웹 앱 |
| [기부금](./giving) | 지불 공급자 및 게이트웨이, 기부 흐름, 자금/배치, 게이트웨이 웹훅 | Api(기부금), apphelper, B1App, B1Admin |
| [이벤트 등록](./registrations) | 등록 상거래 모델: 참석자 유형, 선택, 할인 코드, 기부금 게이트웨이를 통한 결제 및 대기 목록 | Api(콘텐츠 + 기부금), B1App, B1Admin |
| [체크인](./check-ins) | 키오스크 및 자체 체크인, 참석 데이터 모델, 룸 라우팅, 자녀 안전 계층, 레이블 인쇄 | B1Checkin, B1App, B1Admin, Api(참석 + 멤버십) |
| [웹사이트 빌더](./website-builder) | 페이지/섹션/요소 트리, 요소 유형 계약 및 렌더러, 블로그, 액세스 제한 페이지, SEO 및 AI 생성 | Api(콘텐츠), AskApi, helpers/apphelper, B1Admin, B1App |
| [웹사이트 라우팅 및 다중 사이트](./websites) | 요청이 교회 및 특정 사이트로 해결되는 방법, 다중 사이트 `siteId` 데이터 모델 및 Caddy 사용자 정의 도메인 에지 | B1App, Api(멤버십 + 콘텐츠), B1Admin |
| [통합](./integrations) | 확장 표면: OAuth, API 키, 웹훅, 콘텐츠 공급자, MCP | Api, 공유 라이브러리, 외부 앱 |
| [감사 로그 및 실행 취소 가능한 배치](./audit-log) | 컨트롤러 병목의 모든 변경 사항에 기본적으로 감사하고, 가져오기 및 대량 작업을 실행 취소 가능하게 만드는 배치 계층 | Api(모든 모듈), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | 유료 저장소 및 문자 신용 서비스: 공유 JWT 신원, 서비스 키 S2S, 문자 및 저장소 공급자 이음새, Stripe 청구 | MinistryStuffApi, MinistryStuffWeb, Api(콘텐츠 + 메시징), 문자/apihelper 패키지, B1Admin |
| [자신의 저장소 가져오기](./byos-storage) | 교회가 Google Drive, Dropbox, OneDrive 또는 S3 호환 버킷을 무료 100MB를 초과하는 업로드를 위해 연결: OAuth 연결, 공급자별 업로드 모양, 공개 다운로드 리디렉션 | Api(콘텐츠 + 멤버십), helpers/apphelper 패키지, B1Admin, B1App |

:::tip
이 시스템의 동작을 변경할 때 -- 단순히 앱의 페이지 내가 아닌 -- 여기의 일치하는 시스템 맵을 동일한 노력으로 업데이트해야 합니다. 이렇게 하면 이 섹션을 신규 기여자를 위한 첫 번째 정차점으로 신뢰할 수 있게 유지합니다.
:::
