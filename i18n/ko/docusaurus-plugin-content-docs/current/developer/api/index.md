---
title: "API"
---

# API

<div class="article-intro">

ChurchApps API는 **모듈식 모놀리식** -- 각각 자신의 데이터베이스를 가진 6개의 구별되는 모듈을 제공하는 단일 코드 기반입니다. 이 아키텍처는 마이크로 서비스의 조직 이점(명확한 경계, 독립적인 데이터 저장소)과 단일 배포의 운영 단순성을 제공합니다.

</div>

## 모듈

| 모듈 | 목적 |
|--------|---------|
| **회원** | 사람, 그룹, 가정, 권한 |
| **출석** | 예배, 세션, 체크인 기록 |
| **콘텐츠** | 페이지, 섹션, 요소, 스트리밍 |
| **기부금** | 기부금, 기금, 결제 처리 |
| **메시지** | 대화, 알림, 이메일 |
| **수행** | 작업, 계획, 할당 |

## 기술 스택

- **런타임:** Node.js 22.x with TypeScript (ES modules)
- **프레임워크:** Express
- **의존성 주입:** Inversify (decorator-based routing)
- **데이터베이스:** MySQL -- 모듈당 하나의 데이터베이스, 각각 자신의 연결 풀
- **인증:** CustomAuthProvider를 통한 JWT 기반 인증
- **배포:** Serverless Framework v3를 통한 AWS Lambda

## 포트

| 프로토콜 | 포트 | 설명 |
|----------|------|-------------|
| HTTP | `8084` | 주요 REST API |
| WebSocket | `8087` | 실시간 소켓 연결 |

## Lambda 함수

AWS에 배포할 때 API는 네 개의 Lambda 함수로 실행됩니다:

- **`web`** -- 모든 HTTP 요청 처리
- **`socket`** -- WebSocket 연결 관리
- **`timer15Min`** -- 15분마다 이메일 알림 실행
- **`timerMidnight`** -- 매일 다이제스트 이메일 및 유지보수 작업 실행

## 공유 라이브러리

API는 두 개의 공유 ChurchApps 패키지에 따라 다릅니다:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- 기본 유틸리티 (DateHelper, ApiHelper, 등)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Express 서버 유틸리티 인증, 데이터베이스 헬퍼, AWS 통합 포함

:::info
API는 ES 모듈(`package.json`의 `"type": "module"`)을 사용합니다. ES 모듈 구문을 사용하여 import를 확인하세요.
:::

## 이 섹션에서

- **[로컬 설정](./local-setup)** -- API를 로컬로 복제, 구성 및 실행
- **[데이터베이스](./database)** -- 모듈당 데이터베이스 아키텍처, 스키마 스크립트, 데이터 액세스 패턴
- **[모듈 구조](./module-structure)** -- 컨트롤러, 저장소, 모델, 인증
- **[API 키](./api-keys)** -- 스크립트 및 커넥터에 대한 개인 액세스 토큰
- **[연결된 앱 (OAuth)](./connected-apps)** -- 타사 앱을 위한 멀티테넌트 OAuth 흐름
- **[웹훅](./webhooks)** -- 외부 시스템에 대한 푸시 이벤트 알림
- **[MCP 서버](./mcp)** -- AI 어시스턴트에 API를 노출하는 Model Context Protocol 끝점
- **[엔드포인트 참고](./endpoints/)** -- 모든 모듈에 대한 완전한 REST API 설명서
