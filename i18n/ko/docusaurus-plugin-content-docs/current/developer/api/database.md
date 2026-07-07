---
title: "데이터베이스"
---

# 데이터베이스

<div class="article-intro">

ChurchApps API는 **모듈당 데이터베이스** 아키텍처를 사용합니다. 6개의 데이터 모듈 각각은 독립적인 연결 풀을 가진 자신의 MySQL 데이터베이스를 가지고 있으며, 명확한 데이터 경계를 제공하면서 모든 것을 단일 배포 내에서 유지합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **MySQL 8.0+** 설치 -- [필수 사항](../setup/prerequisites) 참조
- `.env` 파일에 데이터베이스 연결 문자열 구성 -- [환경 변수](../setup/environment-variables) 참조

</div>

## 아키텍처 개요

```
Api
├── membership_db   ← 사람, 그룹, 권한
├── attendance_db   ← 예배, 세션, 기록
├── content_db      ← 페이지, 섹션, 요소
├── giving_db       ← 기부, 기금, 결제
├── messaging_db    ← 대화, 알림
└── doing_db        ← 작업, 계획, 할당
```

### 주요 설계 결정

- **모듈당 하나의 데이터베이스** -- 각 모듈은 자체 MySQL 데이터베이스를 유지하고 전용 연결 풀을 사용합니다(`KyselyPool`에서 관리). 이렇게 하면 모듈이 분리되고 독립적인 스키마 진화가 가능합니다.
- **배타적 소유권** -- 모듈의 테이블은 해당 모듈의 자신의 코드에서만 읽고 쓰입니다. 다른 모듈이 데이터를 필요로 할 때 테이블 자체를 쿼리하는 대신 소유 모듈의 게이트웨이를 호출합니다. [모듈 간 통신](./module-structure#cross-module-communication) 참조.
- **ORM 없는 저장소 패턴** -- 모든 데이터 액세스는 모듈의 스키마에 대해 Kysely 쿼리 빌더로 유형화된 SQL을 빌드하는 저장소 클래스를 통해 이루어집니다. 이렇게 하면 쿼리 성능과 동작을 완전히 제어할 수 있습니다.
- **설계상 다중 테넌트** -- 모든 쿼리는 `churchId`로 범위가 지정됩니다. 모든 테이블에는 `churchId` 열이 포함되고 저장소 계층은 테넌트 격리를 자동으로 적용합니다.

## 연결 문자열

각 모듈의 데이터베이스 연결은 표준 MySQL 연결 문자열 형식을 사용하여 `.env`에 구성됩니다:

```
mysql://user:password@host:port/database
```

예를 들어 로컬 개발 설정은 다음과 같을 수 있습니다:

각 모듈은 `<MODULE>_CONNECTION_STRING`이라는 환경 변수에서 연결을 읽습니다:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
프로덕션에서는 연결 문자열이 AWS SSM Parameter Store에 저장되고 시작 시 `Environment` 클래스에서 읽습니다.
:::

## 스키마 스크립트

테이블 스키마는 모듈별로 구성된 `tools/migrations/` 디렉토리의 Kysely 마이그레이션으로 정의됩니다:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

마이그레이션은 테이블 생성, 인덱스 및 스키마 변경을 정의합니다. `tools/dbScripts/` 디렉토리에는 스키마 위에 로드할 수 있는 데모 및 시드 데이터가 포함되어 있습니다.

## 데이터베이스 초기화

### 모든 데이터베이스 초기화

```bash
npm run initdb
```

이렇게 하면 모든 6개의 데이터베이스가 생성되고 각각에 대한 마이그레이션이 실행됩니다.

### 단일 모듈 초기화

```bash
npm run initdb -- --module=membership
```

:::tip
특정 모듈에서 작업할 때 다른 모듈에 영향을 주지 않고 해당 모듈의 데이터베이스만 다시 초기화할 수 있습니다.
:::

## 데이터 액세스 패턴

저장소는 모듈의 `getDb()` 함수를 통해 얻은 모듈의 유형화된 데이터베이스 스키마에 대해 Kysely 쿼리 빌더로 쿼리를 빌드합니다. 일반적인 저장소 메서드는 다음과 같습니다:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

저장소는 `RepoManager`를 통해 얻어집니다:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
항상 쿼리에 `churchId`를 포함하여 다중 테넌트 격리를 유지합니다. 특정의 승인된 이유가 있는 경우가 아니면 테넌트 간에 쿼리하지 마세요.
:::

## 모듈 간 참조

각 모듈의 데이터가 별도의 데이터베이스에 있으므로 모듈 경계를 넘는 외래 키나 SQL 조인이 없습니다. 다른 모듈의 데이터와 관련된 기록은 해당 기록의 ID를 저장합니다. 예를 들어 기부 데이터베이스의 기부는 멤버십 데이터베이스의 사람의 `personId`를 수행하고, 모든 모듈 간 구성은 애플리케이션 코드에서 발생합니다.

이 제약은 모듈 경계를 현실로 만드는 것입니다: 각 스키마는 독립적으로 발전할 수 있고, 모듈의 데이터베이스를 자신의 서버로 이동할 수 있으며, 공유 테이블이나 모듈 간 쿼리를 풀어헤치지 않고도 모듈을 독립형 서비스로 추출할 수도 있습니다.

## 관련 기사

- **[모듈 구조](./module-structure)** -- 각 모듈 내에서 컨트롤러 및 저장소가 구성되는 방법
- **[로컬 API 설정](./local-setup)** -- 전체 단계별 설정 안내서
