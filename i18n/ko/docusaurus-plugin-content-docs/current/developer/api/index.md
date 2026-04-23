---
title: "API"
---

# API

<div class="article-intro">

ChurchApps API는 **모듈형 모놀리스** -- 6개의 서로 다른 모듈을 제공하는 단일 코드베이스이며, 각 모듈은 자신의 데이터베이스를 가지고 있습니다. 이 아키텍처는 마이크로서비스의 조직적 이점(명확한 경계, 독립적 데이터 저장소)을 단일 배포의 운영상 단순성과 결합합니다.

</div>

## 모듈

| 모듈 | 목적 |
|--------|---------|
| **회원** | 사람, 그룹, 가구, 권한 |
| **참석** | 서비스, 세션, 체크인 기록 |
| **컨텐츠** | 페이지, 섹션, 요소, 스트리밍 |
| **헌금** | 기부금, 펀드, 결제 처리 |
| **메시징** | 대화, 알림, 이메일 |
| **할 일** | 작업, 계획, 할당 |

## 기술 스택

- **런타임:** Node.js 22.x with TypeScript (ES modules)
- **프레임워크:** Express
- **의존성 주입:** Inversify (데코레이터 기반 라우팅)
- **데이터베이스:** MySQL -- 모듈별 하나의 데이터베이스, 각각 자신의 연결 풀
- **인증:** JWT 기반 인증 (`CustomAuthProvider` 경유)
- **배포:** Serverless Framework v3를 통한 AWS Lambda

## 포트

| 프로토콜 | 포트 | 설명 |
|----------|------|-------------|
| HTTP | `8084` | 메인 REST API |
| WebSocket | `8087` | 실시간 소켓 연결 |

## Lambda 함수

AWS에 배포될 때 API는 4개의 Lambda 함수로 실행됩니다:

- **`web`** -- 모든 HTTP 요청 처리
- **`socket`** -- WebSocket 연결 관리
- **`timer15Min`** -- 이메일 알림을 위해 15분마다 실행
- **`timerMidnight`** -- 요약 이메일 및 유지 관리 작업을 위해 매일 실행

## 공유 라이브러리

API는 두 개의 공유 ChurchApps 패키지에 의존합니다:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- 기본 유틸리티 (DateHelper, ApiHelper 등)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- 인증, 데이터베이스 헬퍼, AWS 통합을 포함한 Express 서버 유틸리티

:::info
API는 ES 모듈을 사용합니다 (`package.json`의 `"type": "module"`). 임포트에 ES 모듈 구문을 사용하는지 확인하세요.
:::

## 이 섹션에서

- **[로컬 설정](./local-setup)** -- API를 로컬에서 복제, 구성, 실행
- **[데이터베이스](./database)** -- 모듈별 데이터베이스 아키텍처, 스키마 스크립트, 데이터 액세스 패턴
- **[모듈 구조](./module-structure)** -- 컨트롤러, 저장소, 모델, 인증
- **[엔드포인트 참고](./endpoints/)** -- 모든 모듈을 위한 완전한 REST API 문서
