---
title: "모듈 구조"
---

# 모듈 구조

<div class="article-intro">

각 API 모듈은 컨트롤러, 저장소, 모델 및 헬퍼를 포함한 일관된 내부 구조를 따릅니다. 이 레이아웃을 이해하면 코드베이스를 탐색하고 모든 모듈에 새로운 기능을 추가하기가 간단합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- API를 로컬로 설정합니다 -- [로컬 API 설정](./local-setup) 참조
- [데이터베이스](./database) 아키텍처를 검토하여 데이터 액세스 계층을 이해합니다

</div>

## 디렉토리 레이아웃

모듈은 `src/modules/{name}/` 아래에 있습니다. 일반적인 모듈에는 네 개의 디렉토리가 있습니다:

```
src/modules/{name}/
├── controllers/    ← Route handlers (Express endpoints)
├── repositories/   ← Data access layer (typed SQL queries)
├── models/         ← TypeScript interfaces and types
└── helpers/        ← Module-specific business logic
```

예를 들어, 회원 관리 모듈:

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

여섯 개의 핵심 데이터 모듈 -- 회원 관리, 참석, 콘텐츠, 기부, 메시징, 작업 -- 은 모두 이 레이아웃을 따릅니다. 보고 (자신의 데이터를 소유하지 않으면서 교차 모듈 보고서를 제공하는)와 같은 몇 가지 특수한 모듈은 `src/modules/` 아래에 나란히 있습니다.

## 하나의 애플리케이션, 많은 모듈

API는 **모듈식 모놀리식**: 모듈은 코드 조직과 데이터 소유권의 경계를 표시하지만, 별도의 서비스는 아닙니다. 시작 시 모든 모듈의 컨트롤러가 하나의 의존성 주입 컨테이너에 등록되어 하나의 Express 애플리케이션 뒤에 있으므로 전체 API가 구축, 실행 및 한 단위로 배포됩니다 -- 아래에서 설명하는 배포된 함수는 모두 이 동일한 애플리케이션으로의 진입점입니다.

모든 모듈의 경로는 모듈 이름과 일치하는 URL 접두사 아래에 있습니다:

```
/membership/*    /attendance/*    /content/*
/giving/*        /messaging/*     /doing/*
```

이는 각 모듈의 API 표면을 자체 포함되게 유지하면서 클라이언트는 여전히 단일 호스트와 통신합니다.

## 컨트롤러

컨트롤러는 모듈의 API 경로를 정의합니다. 각 모듈에는 자신의 기본 컨트롤러 (예: `MembershipBaseController`)가 있으며, 이는 공유 `BaseController` -- 자체는 `@churchapps/apihelper`에서 `CustomBaseController`로 구축됨 -- 를 확장합니다. 경로는 Inversify 데코레이터로 등록됩니다.

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

`actionWrapper`는 요청을 인증하고 작업을 실행하기 전에 모듈의 저장소로 `this.repos`를 수화합니다.

### Route Decorators

| 데코레이터 | HTTP 방법 |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

`@controller("/base")` 데코레이터는 컨트롤러의 모든 경로에 대한 기본 경로를 설정합니다.

## 저장소

저장소는 모든 데이터베이스 작업을 처리합니다. ORM이 없습니다 -- 쿼리는 Kysely 쿼리 빌더로 작성되며, 모듈의 데이터베이스 스키마에 대해 입력됩니다. 각 모듈의 `db/index.ts`는 모듈의 입력된 Kysely 인스턴스를 반환하는 `getDb()` 함수를 노출합니다.

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

컨트롤러 내부에서 모듈의 저장소는 `this.repos`로 사용 가능합니다. 컨트롤러 외부에서는 `RepoManager`를 통해 얻습니다:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

## 교차 모듈 통신

각 모듈은 자신의 데이터베이스를 소유하며 ([ 데이터베이스](./database) 참조), 모듈은 다른 모듈의 테이블을 직접 쿼리하지 않습니다. 한 모듈이 다른 모듈이 소유한 데이터를 필요로 할 때 -- 예를 들어, 하기 모듈이 회원 관리에서 사람을 해결할 때 -- 소유 모듈의 **게이트웨이**를 `src/shared/modules/`로 이동합니다:

```typescript
import { getMembershipModuleGateway } from "../../../shared/modules/index.js";

const people = await getMembershipModuleGateway().loadPeople(churchId, personIds);
```

모든 게이트웨이 (`MembershipModuleGateway`, `GivingModuleGateway`, 등)는 소유 모듈이 API의 나머지 부분에 정확히 어떤 작업을 노출하는지 정의하는 TypeScript 인터페이스입니다. 인터페이스는 계약입니다: 현재 구현은 소유 모듈의 데이터베이스를 프로세스 내에서 읽지만, 호출자는 인터페이스에만 의존하므로 구현을 스왑할 수 있습니다 -- 예를 들어, HTTP 호출을 하는 것 -- 모듈이 별도의 서비스로 추출되는 경우.

:::info
필요한 데이터가 다른 모듈에 있고 해당 게이트웨이가 작업을 노출하지 않는 경우 다른 모듈의 저장소나 데이터베이스에 도달하지 않고 게이트웨이 인터페이스를 확장합니다.
:::

## 인증 및 권한 부여

### JWT 인증

모든 요청은 `CustomAuthProvider`에 의해 처리된 JWT 토큰을 통해 인증됩니다. 토큰은 자동으로 유효성이 검사되며 인증된 사용자 컨텍스트 (`au`)는 모든 컨트롤러 작업에서 사용 가능합니다.

### 권한 확인

`au.checkAccess()`를 사용하여 현재 사용자가 필요한 권한을 가지고 있는지 확인합니다. 권한은 콘텐츠 유형 및 작업을 결합하는 미리 정의된 상수입니다:

```typescript
au.checkAccess(Permissions.people.view);    // Read access
au.checkAccess(Permissions.people.edit);    // Write access
```

사용자가 필요한 권한이 없으면 오류 응답이 자동으로 반환됩니다.

:::warning
데이터 작업을 수행하기 전에 항상 `au.checkAccess()`를 호출합니다. 읽기 전용 엔드포인트일 수 있는 경우에도 권한 확인을 건너뛰지 않습니다.
:::

## 환경 구성

`Environment` 클래스는 환경 전체 구성을 처리합니다:

- **로컬 개발:** 프로젝트 루트의 `.env` 파일에서 읽음
- **배포된 환경:** AWS SSM 매개변수 저장소에서 읽음

```typescript
// Access environment variables
const jwtSecret = Environment.jwtSecret;
const corsOrigin = Environment.corsOrigin;
```

이 추상화는 코드가 구성이 어디서 오는지 알 필요가 없다는 것을 의미합니다.

## Lambda 함수

AWS에 배포될 때 API는 여섯 개의 Lambda 함수로 실행됩니다:

| 함수 | 용도 |
|----------|---------|
| `web` | 모든 HTTP REST API 요청 처리 |
| `socket` | 실시간 기능을 위한 WebSocket 연결 관리 |
| `timer15Min` | 이메일 알림을 위해 30분마다 예약 (이름은 과거) |
| `timerMidnight` | 다이제스트 이메일 및 유지보수를 위해 매일 예약 |
| `timerScheduledTasks` | 예정된 자동화 및 미처리된 워크플로 처리를 위해 매일 예약 |
| `timerWebhooks` | 대기 중인 아웃바운드 웹훅을 전달하기 위해 매분 예약 |

:::info
로컬에서 `web` 함수는 포트 8084에서 실행되고 `socket` 함수는 포트 8087에서 실행됩니다. 타이머 함수는 개발 중에 수동으로 트리거될 수 있습니다.
:::

## 관련 문서

- **[데이터베이스](./database)** -- 연결 문자열, 스키마 스크립트 및 데이터 액세스 패턴
- **[로컬 API 설정](./local-setup)** -- 전체 단계별 설정 가이드
- **[ApiHelper](../shared-libraries/api-helper)** -- `CustomBaseController` 및 인증 미들웨어를 제공하는 공유 라이브러리
