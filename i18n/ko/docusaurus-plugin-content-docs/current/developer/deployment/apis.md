---
title: "API 배포"
---

# API 배포

<div class="article-intro">

ChurchApps API는 Serverless Framework를 사용하여 AWS Lambda 함수로 배포됩니다. 이 페이지는 스테이징 및 프로덕션 환경의 빌드, 배포, 구성 워크플로우를 다룹니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- API를 로컬에서 설정 -- [로컬 API 설정](../api/local-setup) 참조
- 머신에서 AWS 자격증명 구성
- 대상 AWS 계정에 액세스 권한 확인

</div>

## 빌드

API는 전용 TypeScript 구성을 사용하여 프로덕션을 위해 빌드됩니다:

```bash
npm run build:prod
```

이는 `tsconfig.prod.json`을 사용하여 Lambda 런타임을 위해 프로젝트를 컴파일합니다.

## 배포

스테이징에 배포:

```bash
npm run deploy-staging
```

프로덕션에 배포:

```bash
npm run deploy-prod
```

## 생성되는 것

각 API 배포는 다음 AWS Lambda 함수를 생성하거나 업데이트합니다:

| 함수 | 목적 |
|----------|---------|
| `web` | API Gateway를 통한 HTTP 요청 핸들러 |
| `socket` | WebSocket 연결 핸들러 |
| `timer15Min` | 15분마다 실행되는 예약된 작업 |
| `timerMidnight` | 매일 자정에 실행되는 예약된 작업 |

## 환경 구성

배포된 환경에서는 `.env` 파일 대신 **AWS SSM 매개변수 저장소**에서 구성을 읽습니다. 이는 배포 패키지에서 보안을 유지하고 재배포 없이 구성 변경을 허용합니다.

:::warning
프로덕션 자격증명을 저장소에 커밋하지 마세요. 모든 민감한 구성은 AWS SSM 매개변수 저장소에 저장되어야 하며 런타임에 액세스됩니다.
:::

:::tip
배포가 프로덕션에 영향을 미치지 않도록 테스트하려면 항상 `npm run deploy-staging`을 사용하여 스테이징에 먼저 배포하고 프로덕션으로 승격하기 전에 변경 사항을 검증하세요.
:::

## 관련 문서

- **[로컬 API 설정](../api/local-setup)** -- 개발을 위한 API 설정
- **[모듈 구조](../api/module-structure)** -- Lambda 함수 아키텍처 이해
- **[웹 앱 배포](./web-apps)** -- 프론트엔드 애플리케이션 배포
