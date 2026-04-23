---
title: "모듈 구조"
---

# 모듈 구조

<div class="article-intro">

각 API 모듈은 컨트롤러, 저장소, 모델, 헬퍼와 함께 일관된 내부 구조를 따릅니다. 이 레이아웃을 이해하면 코드베이스를 쉽게 탐색하고 모든 모듈에 새로운 기능을 추가할 수 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- API를 로컬에서 설정 -- [로컬 API 설정](./local-setup) 참조
- [데이터베이스](./database) 아키텍처를 검토하여 데이터 액세스 계층 이해

</div>

## 디렉토리 레이아웃

모든 모듈은 `src/modules/{name}/` 아래에 있으며 4개의 디렉토리를 포함합니다:

```
src/modules/{name}/
├── controllers/    ← 경로 핸들러 (Express 엔드포인트)
├── repositories/   ← 데이터 액세스 계층 (직접 SQL)
├── models/         ← TypeScript 인터페이스 및 타입
└── helpers/        ← 모듈별 비즈니스 로직
```

예를 들어, 회원 모듈:

```
src/modules/membership/
├── controllers/
│   ├── PersonController.ts
│   ├── GroupController.ts
│   └── ...
├── repositories/
│   ├── PersonRepository.ts
│   ├── GroupRepository.ts
│   └── ...
├── models/
│   ├── Person.ts
│   ├── Group.ts
│   └── ...
└── helpers/
    └── ...
```

## 컨트롤러

컨트롤러는 모듈의 API 경로를 정의합니다. 이들은 `@churchapps/apihelper`에서 `CustomBaseController`를 확장하고 경로 등록을 위해 Inversify 데코레이터를 사용합니다.

```typescript
import { controller, httpGet, httpPost } from "inversify-express-utils";
import { CustomBaseController } from "@churchapps/apihelper";

@controller("/people")
export class PersonController extends CustomBaseController {

  @httpGet("/")
  public async loadAll() {
    return this.actionWrapper(async (au) => {
      // au = 인증된 사용자 컨텍스트
      au.checkAccess("People", "View");
      const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
      return repos.person.loadByChurchId(au.churchId);
    });
  }

  @httpPost("/")
  public async save() {
    return this.actionWrapper(async (au) => {
      au.checkAccess("People", "Edit");
      const data = this.request.body;
      // ... 저장 로직
    });
  }
}
```

### 경로 데코레이터

| 데코레이터 | HTTP 메서드 |
|-----------|-------------|
| `@httpGet("/path")` | GET |
| `@httpPost("/path")` | POST |
| `@httpPut("/path")` | PUT |
| `@httpPatch("/path")` | PATCH |
| `@httpDelete("/path")` | DELETE |

`@controller("/base")` 데코레이터는 컨트롤러의 모든 경로의 기본 경로를 설정합니다.

## 저장소

저장소는 `DB.query()`를 사용한 직접 SQL을 통해 모든 데이터베이스 작업을 처리합니다. ORM이 없습니다 -- SQL을 직접 작성합니다.

```typescript
export class PersonRepository {
  public async loadByChurchId(churchId: string) {
    return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
  }

  public async save(person: Person) {
    // INSERT 또는 UPDATE 로직
  }
}
```

`RepositoryManager`를 통해 저장소에 액세스하세요:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

## 인증 및 권한

### JWT 인증

모든 요청은 `CustomAuthProvider`에서 처리하는 JWT 토큰을 통해 인증됩니다. 토큰이 자동으로 검증되고 인증된 사용자 컨텍스트(`au`)가 모든 컨트롤러 액션에서 사용 가능합니다.

### 권한 확인

현재 사용자가 필요한 권한을 가지고 있는지 확인하려면 `au.checkAccess()`를 사용하세요:

```typescript
au.checkAccess("People", "View");    // 읽기 액세스
au.checkAccess("People", "Edit");    // 쓰기 액세스
```

사용자가 필요한 권한을 가지고 있지 않으면 오류 응답이 자동으로 반환됩니다.

:::warning
데이터 작업을 수행하기 전에 항상 `au.checkAccess()`를 호출하세요. 읽기 전용 엔드포인트라도 권한 확인을 건너뛰지 마세요.
:::

## 환경 구성

`Environment` 클래스는 환경 전체의 구성을 처리합니다:

- **로컬 개발:** 프로젝트 루트의 `.env` 파일에서 읽음
- **배포된 환경:** AWS SSM 매개변수 저장소에서 읽음

```typescript
// 환경 변수 액세스
const dbConnection = Environment.membershipDb;
const jwtSecret = Environment.jwtSecret;
```

이 추상화는 코드가 구성이 어디서 오는지 알 필요가 없음을 의미합니다.

## Lambda 함수

AWS에 배포될 때 API는 4개의 Lambda 함수로 실행됩니다:

| 함수 | 목적 |
|----------|---------|
| `web` | 모든 HTTP REST API 요청 처리 |
| `socket` | 실시간 기능을 위한 WebSocket 연결 관리 |
| `timer15Min` | 이메일 알림을 위해 15분마다 예약됨 |
| `timerMidnight` | 요약 이메일 및 유지 관리를 위해 매일 예약됨 |

:::info
로컬에서 `web` 함수는 포트 8084에서 실행되고 `socket` 함수는 포트 8087에서 실행됩니다. 타이머 함수는 개발 중에 수동으로 트리거될 수 있습니다.
:::

## 관련 문서

- **[데이터베이스](./database)** -- 연결 문자열, 스키마 스크립트, 데이터 액세스 패턴
- **[로컬 API 설정](./local-setup)** -- 전체 단계별 설정 가이드
- **[ApiHelper](../shared-libraries/api-helper)** -- `CustomBaseController` 및 인증 미들웨어를 제공하는 공유 라이브러리
