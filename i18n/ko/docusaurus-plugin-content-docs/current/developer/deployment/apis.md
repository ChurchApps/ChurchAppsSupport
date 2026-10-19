---
title: "API 배포"
---

# API 배포

<div class="article-intro">

ChurchApps API는 Serverless Framework를 사용하여 AWS Lambda 함수로 배포됩니다. 이 페이지에서는 데모 및 프로덕션 환경의 빌드, 배포, 구성 작업 흐름을 다룹니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- API를 로컬에 설정합니다 -- [로컬 API 설정](../api/local-setup)을 참조하세요
- 컴퓨터에 AWS 자격 증명을 구성합니다
- 대상 AWS 계정에 접근할 수 있는지 확인합니다

</div>

## 빌드

API는 전용 TypeScript 구성을 사용하여 프로덕션용으로 빌드됩니다.

```bash
npm run build:prod
```

이 명령은 `tsconfig.prod.json`을 사용하여 Lambda 런타임용으로 프로젝트를 컴파일합니다.

## 배포

데모 환경에 배포합니다.

```bash
npm run deploy-demo
```

프로덕션에 배포합니다.

```bash
npm run deploy-prod
```

실제로는 GitHub Actions가 API를 배포합니다. **Deploy Demo**는 `main`에 푸시할 때마다 실행되고, **Deploy Prod**는 수동으로(워크플로 디스패치) 시작합니다. 더 이상 스테이징 환경은 없습니다.

## 데이터베이스 마이그레이션

**Deploy Prod**는 배포의 일부로 대기 중인 데이터베이스 마이그레이션을 적용합니다. 프로덕션 데이터베이스는 VPC 내부의 연결만 허용하므로, `serverless deploy` 직후 워크플로는 `migrate` Lambda(`api-Prod-migrate`)를 호출합니다. 이 Lambda는 모든 모듈의 대기 중인 마이그레이션을 실행하고 `{ ok, environment, modules }`를 반환합니다. 모듈이 실패하거나 거부되면(예를 들어 마이그레이션 기록이 없는 데이터베이스), 작업이 실패하므로 스키마가 코드보다 뒤처지는 상태로 남지 않습니다. **Rollback Prod**는 Lambda 코드만 되돌리며, 마이그레이션은 적용된 상태로 남으므로 마이그레이션은 추가만 하는 방식으로 유지하세요. 상태를 확인하거나 수동으로 마이그레이션을 실행하는 방법은 [서버 관리자 -- 데이터베이스 마이그레이션](../server-admin#database-migrations)을 참조하세요.

## 생성되는 항목

API를 배포할 때마다 다음 AWS Lambda 함수가 생성되거나 업데이트됩니다.

| 함수 | 용도 |
|----------|---------|
| `web` | API Gateway를 통한 HTTP 요청 처리기 |
| `socket` | WebSocket 연결 처리기 |
| `timer15Min` | 30분마다 실행되는 예약 작업(이름은 역사적 이유로 유지됨) |
| `timerMidnight` | 매일 자정에 실행되는 예약 작업 |
| `migrate` | 대기 중인 데이터베이스 마이그레이션을 적용하며, Deploy Prod 워크플로가 호출함 |

## 환경 구성

배포된 환경에서는 구성이 `.env` 파일 대신 **AWS SSM Parameter Store**에서 읽힙니다. 이렇게 하면 비밀 정보가 배포 패키지 밖에 머물고, 다시 배포하지 않고도 구성을 변경할 수 있습니다.

:::warning
운영 자격 증명을 저장소에 절대 커밋하지 마세요. 모든 민감한 구성은 AWS SSM Parameter Store에 저장하고 런타임에 접근해야 합니다.
:::

:::tip
`main`에 병합할 때마다 먼저 데모 환경에 배포됩니다. Deploy Prod를 실행하기 전에 그곳에서 변경 사항을 확인하세요(예: [demo.b1.church](https://demo.b1.church)).
:::

## 관련 문서

- **[로컬 API 설정](../api/local-setup)** -- 개발을 위한 API 설정
- **[모듈 구조](../api/module-structure)** -- Lambda 함수 아키텍처 이해하기
- **[웹 앱 배포](./web-apps)** -- 프론트엔드 애플리케이션 배포하기
