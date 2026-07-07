---
title: "API"
---

# API

<div class="article-intro">

ChurchApps API는 **모듈식 모놀리식** -- 여섯 개의 데이터 모듈을 제공하는 단일 코드베이스이며, 각 모듈은 자신의 데이터베이스를 가지고 있습니다. 이 아키텍처는 마이크로서비스의 조직적 이점(명확한 경계, 독립적인 데이터 저장소)과 단일 배포의 운영상 단순성을 제공합니다.

</div>

## 모듈

| 모듈 | 용도 |
|--------|---------|
| **회원 관리** | 사람, 그룹, 가구, 권한 |
| **참석** | 예배, 세션, 체크인 기록 |
| **콘텐츠** | 페이지, 섹션, 요소, 스트리밍 |
| **기부** | 기부금, 기금, 결제 처리 |
| **메시징** | 대화, 알림, 이메일 |
| **작업** | 작업, 계획, 할당 |

## 기술 스택

- **런타임:** Node.js 22.x with TypeScript (ES modules)
- **프레임워크:** Express
- **의존성 주입:** Inversify (decorator-based routing)
- **데이터베이스:** MySQL -- 모듈당 하나의 데이터베이스, 각각 자신의 연결 풀 포함
- **인증:** `CustomAuthProvider`를 통한 JWT 기반 인증
- **배포:** Serverless Framework v3을 통한 AWS Lambda

## 포트

| 프로토콜 | 포트 | 설명 |
|----------|------|---------|
| HTTP | `8084` | 메인 REST API |
| WebSocket | `8087` | 실시간 소켓 연결 |

## Lambda 함수

AWS에 배포될 때 API는 여섯 개의 Lambda 함수로 실행됩니다:

- **`web`** -- 모든 HTTP 요청 처리
- **`socket`** -- WebSocket 연결 관리
- **`timer15Min`** -- 30분마다 실행되며 이메일 알림 처리 (이름은 과거의 유산)
- **`timerMidnight`** -- 일일 실행으로 다이제스트 이메일 및 유지보수 작업 처리
- **`timerScheduledTasks`** -- 일일 실행으로 예정된 자동화 및 미처리된 워크플로 처리
- **`timerWebhooks`** -- 1분마다 실행되며 대기 중인 아웃바운드 웹훅 전달

## 공유 라이브러리

API는 두 개의 공유 ChurchApps 패키지에 의존합니다:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- 기본 유틸리티 (DateHelper, ApiHelper, 등)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Express 서버 유틸리티 (인증, 데이터베이스 헬퍼, AWS 통합 포함)

:::info
API는 ES modules를 사용합니다 (`package.json`의 `"type": "module"`). ES 모듈 구문을 사용한 import를 확인하세요.
:::

## 이 섹션의 내용

- **[로컬 설정](./local-setup)** -- API 복제, 구성 및 로컬 실행
- **[데이터베이스](./database)** -- 모듈당 데이터베이스 아키텍처, 스키마 스크립트 및 데이터 접근 패턴
- **[모듈 구조](./module-structure)** -- 컨트롤러, 저장소, 모델 및 인증
- **[API 키](./api-keys)** -- 스크립트 및 커넥터용 개인 액세스 토큰
- **[연결된 앱 (OAuth)](./connected-apps)** -- 제3자 앱을 위한 다중 테넌트 OAuth 흐름
- **[웹훅](./webhooks)** -- 외부 시스템으로의 푸시 이벤트 알림
- **[MCP 서버](./mcp)** -- AI 어시스턴트에 API를 노출하는 Model Context Protocol 엔드포인트
- **[엔드포인트 참고](./endpoints/)** -- 모든 모듈의 완전한 REST API 문서
