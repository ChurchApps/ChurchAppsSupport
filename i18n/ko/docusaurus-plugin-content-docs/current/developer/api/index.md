---
title: "API"
---

# API

<div class="article-intro">

ChurchApps API는 **모듈형 모놀리스**입니다. 하나의 코드베이스가 각각 자체 데이터베이스를 가진 여섯 개의 데이터 모듈을 제공합니다. 이 구조는 마이크로서비스의 조직적 장점(명확한 경계, 독립된 데이터 저장소)을 단일 배포의 운영 단순성과 함께 제공합니다.

</div>

## 모듈

| 모듈 | 목적 |
|--------|---------|
| **Membership** | 사람, 그룹, 가구, 권한 |
| **Attendance** | 예배, 세션, 체크인 기록 |
| **Content** | 페이지, 섹션, 요소, 스트리밍 |
| **Giving** | 헌금, 펀드, 결제 처리 |
| **Messaging** | 대화, 알림, 이메일 |
| **Doing** | 할 일, 계획, 배정 |

## 기술 스택

- **런타임:** TypeScript(ES 모듈)를 사용하는 Node.js 24.x
- **프레임워크:** Express
- **의존성 주입:** Inversify(데코레이터 기반 라우팅)
- **데이터베이스:** MySQL -- 모듈마다 데이터베이스 하나, 각각 자체 연결 풀
- **인증:** `CustomAuthProvider`를 통한 JWT 기반 인증
- **배포:** Serverless Framework v3를 사용하는 AWS Lambda

## 포트

| 프로토콜 | 포트 | 설명 |
|----------|------|-------------|
| HTTP | `8084` | 메인 REST API |
| WebSocket | `8087` | 실시간 소켓 연결 |

## Lambda 함수

AWS에 배포되면 API는 여섯 개의 Lambda 함수로 실행됩니다.

- **`web`** -- 모든 HTTP 요청을 처리합니다.
- **`socket`** -- WebSocket 연결을 관리합니다.
- **`timer15Min`** -- 이메일 알림을 위해 30분마다 실행됩니다(이름은 과거의 흔적입니다).
- **`timerMidnight`** -- 요약 이메일과 유지 관리 작업을 위해 매일 실행됩니다.
- **`timerScheduledTasks`** -- 기한이 된 자동화와 기한이 지난 워크플로 처리를 위해 매일 실행됩니다.
- **`timerWebhooks`** -- 대기 중인 발신 웹훅을 전달하기 위해 매분 실행됩니다.

## 공유 라이브러리

API는 두 개의 ChurchApps 공유 패키지에 의존합니다.

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- 기본 유틸리티(DateHelper, ApiHelper 등)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- 인증, 데이터베이스 헬퍼, AWS 연동을 포함한 Express 서버 유틸리티

:::info
API는 ES 모듈(`package.json`의 `"type": "module"`)을 사용합니다. import가 ES 모듈 문법을 사용하는지 확인하세요.
:::

## 이 섹션의 내용

- **[로컬 설정](./local-setup)** -- API를 복제하고, 구성하고, 로컬에서 실행합니다.
- **[데이터베이스](./database)** -- 모듈별 데이터베이스 구조, 스키마 스크립트, 데이터 접근 패턴
- **[모듈 구조](./module-structure)** -- 컨트롤러, 저장소, 모델, 인증
- **[API 키](./api-keys)** -- 스크립트와 커넥터를 위한 개인 액세스 토큰
- **[연결된 앱(OAuth)](./connected-apps)** -- 제3자 앱을 위한 다중 테넌트 OAuth 흐름
- **[웹훅](./webhooks)** -- 외부 시스템에 이벤트 알림 푸시
- **[MCP 서버](./mcp)** -- API를 AI 어시스턴트에 노출하는 Model Context Protocol 엔드포인트
- **[엔드포인트 참고](./endpoints/)** -- 모든 모듈의 전체 REST API 문서
