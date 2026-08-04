---
title: "모듈 구조"
---

# 모듈 구조

<div class="article-intro">

각 API 모듈은 컨트롤러, 리포지토리, 모델, 헬퍼로 이루어진 일관된 내부 구조를 따릅니다. 이 레이아웃을 이해하면 코드베이스를 탐색하고 어떤 모듈에든 새로운 기능을 추가하는 일이 수월해집니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- API를 로컬로 설정합니다 -- [로컬 API 설정](./local-setup) 참조
- 데이터 접근 계층을 이해하기 위해 [데이터베이스](./database) 아키텍처를 검토합니다

</div>

## 디렉터리 레이아웃

모듈은 `src/modules/{name}/` 아래에 있습니다. 일반적인 모듈은 네 개의 디렉터리를 포함합니다.

```
src/modules/{name}/
├── controllers/    ← Route handlers (Express endpoints)
├── repositories/   ← Data access layer (typed SQL queries)
├── models/         ← TypeScript interfaces and types
└── helpers/        ← Module-specific business logic
```

예를 들어, membership 모듈은 다음과 같습니다.

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepo.ts
│   ├── GroupRepo.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

membership, attendance, content, giving, messaging, doing이라는 6개의 핵심 데이터 모듈은 모두 이 레이아웃을 따릅니다. 몇몇 특수 모듈(예를 들어 자체 데이터를 소유하지 않고 모듈 간 리포트를 제공하는 reporting 모듈)은 `src/modules/` 아래에 나란히 위치합니다.

## 하나의 애플리케이션, 여러 모듈

API는 **모듈형 모놀리스**입니다: 모듈은 별도의 서비스가 아니라 코드 조직과 데이터 소유권의 경계를 표시합니다. 시작 시 모든 모듈의 컨트롤러가 하나의 Express 애플리케이션 뒤에 있는 단일 의존성 주입 컨테이너에 등록되므로, 전체 API는 하나의 단위로 빌드, 실행, 배포됩니다 -- 아래에서 설명하는 배포된 함수들은 모두 이 동일한 애플리케이션으로 들어가는 진입점입니다.

모든 모듈의 라우트는 모듈 이름과 일치하는 URL 접두어 아래에 있습니다.

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

이를 통해 각 모듈의 API 표면은 독립적으로 유지되면서도 클라이언트는 여전히 단일 호스트와 통신합니다.

## 컨트롤러

컨트롤러는 모듈의 API 라우트를 정의합니다. 각 모듈에는 자체 베이스 컨트롤러(예: `MembershipBaseController`)가 있으며, 이는 공유 `BaseController` -- 이 클래스 자체는 `@churchapps/apihelper`의 `CustomBaseController`를 기반으로 만들어짐 -- 를 확장합니다. 라우트는 Inversify 데코레이터로 등록됩니다.

```typescript
import express from "express";
import { controller, httpGet } from "inversify-express-utils";
import { MembershipBaseController } from "./MembershipBaseController.js";
import { Permissions } from "../helpers/index.js";

@controller("/membership/people")
export class PersonController extends MembershipBaseController {

  @httpGet("/recent")
  public async getRecent(req: express.Request, res: express.Response): Promise<any> {
    return this.actionWrapper(req, res, async (au) => {
      // au = authenticated user context
      if (!au.checkAccess(Permissions.people.view)) return this.json({}, 401);
      return this.repos.person.loadRecent(au.churchId);
    });
  }
}
```

`actionWrapper`는 요청을 인증하고, 작업을 실행하기 전에 `this.repos`를 해당 모듈의 리포지토리로 채웁니다.

### 라우트 데코레이터

| 데코레이터 | HTTP 메서드 |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

`@controller("/base")` 데코레이터는 해당 컨트롤러의 모든 라우트에 대한 기본 경로를 설정합니다.

## 리포지토리

리포지토리는 모든 데이터베이스 작업을 처리합니다. ORM은 사용하지 않습니다 -- 쿼리는 해당 모듈의 데이터베이스 스키마에 맞게 타입이 지정된 Kysely 쿼리 빌더로 작성됩니다. 각 모듈의 `db/index.ts`는 해당 모듈의 타입이 지정된 Kysely 인스턴스를 반환하는 `getDb()` 함수를 노출합니다.

```typescript
import { injectable } from "inversify";
import { getDb } from "../db/index.js";

@injectable()
export class PersonRepo {
  public async load(churchId: string, id: string) {
    return getDb().selectFrom("people").selectAll()
      .where("id", "=", id)
      .where("churchId", "=", churchId)
      .executeTakeFirst();
  }
}
```

컨트롤러 내부에서 모듈의 리포지토리는 `this.repos`로 사용할 수 있습니다. 컨트롤러 외부에서는 `RepoManager`를 통해 가져옵니다.

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## 모듈 간 통신

각 모듈은 자체 데이터베이스를 소유하며(([데이터베이스](./database) 참조), 모듈이 다른 모듈의 테이블을 직접 쿼리하는 일은 없습니다. 한 모듈이 다른 모듈이 소유한 데이터를 필요로 할 때 -- 예를 들어 doing 모듈이 membership에서 사람을 조회할 때 -- 는 소유 모듈의 `src/shared/modules/`에 있는 **게이트웨이**를 거칩니다.

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

모든 게이트웨이(`MembershipModuleGateway`, `GivingModuleGateway` 등)는 소유 모듈이 API의 나머지 부분에 정확히 어떤 작업을 노출하는지 정의하는 TypeScript 인터페이스입니다. 인터페이스가 곧 계약입니다: 현재 구현은 소유 모듈의 데이터베이스를 프로세스 내에서 읽지만, 호출자는 인터페이스에만 의존하므로 -- 예를 들어 HTTP 호출을 하는 구현으로 -- 모듈이 별도 서비스로 분리되는 경우에도 구현을 교체할 수 있습니다.

:::info
필요한 데이터가 다른 모듈에 있고 해당 모듈의 게이트웨이가 그 작업을 노출하지 않는다면, 다른 모듈의 리포지토리나 데이터베이스에 직접 접근하지 말고 게이트웨이 인터페이스를 확장하세요.
:::

## 인증 및 권한 부여

### JWT 인증

모든 요청은 `CustomAuthProvider`가 처리하는 JWT 토큰을 통해 인증됩니다. 토큰은 자동으로 검증되며, 인증된 사용자 컨텍스트(`au`)는 모든 컨트롤러 액션에서 사용할 수 있습니다.

### 권한 확인

현재 사용자가 필요한 권한을 가지고 있는지 확인하려면 `au.checkAccess()`를 사용합니다. 권한은 콘텐츠 유형과 액션을 조합한 사전 정의된 상수입니다.

```typescript
au.checkAccess(Permissions.people.view);    // Read access
au.checkAccess(Permissions.people.edit);    // Write access
```

사용자에게 필요한 권한이 없으면 오류 응답이 자동으로 반환됩니다.

:::warning
데이터 작업을 수행하기 전에는 항상 `au.checkAccess()`를 호출하세요. 겉보기에 읽기 전용인 엔드포인트라 해도 권한 확인을 절대 건너뛰지 마세요.
:::

## 환경 구성

`Environment` 클래스는 환경 전반의 구성을 처리합니다.

- **로컬 개발:** 프로젝트 루트의 `.env` 파일에서 읽음
- **배포된 환경:** AWS SSM Parameter Store에서 읽음

```typescript
// Access environment variables
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

이 추상화 덕분에 코드는 구성이 어디에서 오는지 알 필요가 없습니다.

## Lambda 함수

AWS에 배포되면 API는 6개의 Lambda 함수로 실행됩니다.

| 함수 | 목적 |
|----------|---------|
| `web` | 모든 HTTP REST API 요청 처리 |
| `socket` | 실시간 기능을 위한 WebSocket 연결 관리 |
| `timer15Min` | 이메일 알림을 위해 30분마다 예약 실행(이름은 역사적인 이유로 남아있음) |
| `timerMidnight` | 다이제스트 이메일 및 유지보수를 위해 매일 예약 실행 |
| `timerScheduledTasks` | 예정된 자동화 및 지연된 워크플로 처리를 위해 매일 예약 실행 |
| `timerWebhooks` | 대기 중인 아웃바운드 웹훅을 전달하기 위해 매분 예약 실행 |

:::info
로컬에서는 `web` 함수가 포트 8084에서, `socket` 함수가 포트 8087에서 실행됩니다. 타이머 함수는 개발 중에 수동으로 트리거할 수 있습니다.
:::

## 관련 문서

- **[데이터베이스](./database)** -- 연결 문자열, 스키마 스크립트, 데이터 접근 패턴
- **[로컬 API 설정](./local-setup)** -- 전체 단계별 설정 가이드
- **[ApiHelper](../shared-libraries/api-helper)** -- `CustomBaseController`와 인증 미들웨어를 제공하는 공유 라이브러리
