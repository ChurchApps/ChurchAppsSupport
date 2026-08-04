---
title: "데이터베이스"
---

# 데이터베이스

<div class="article-intro">

ChurchApps API는 **모듈별 데이터베이스(database-per-module)** 아키텍처를 사용합니다. 6개의 데이터 모듈은 각각 독립된 연결 풀을 가진 자체 MySQL 데이터베이스를 사용하여, 단일 배포 내에서 명확한 데이터 경계를 유지합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **MySQL 8.0+**를 설치하세요 -- [사전 요구 사항](../setup/prerequisites) 참조
- `.env` 파일에 데이터베이스 연결 문자열을 구성하세요 -- [환경 변수](../setup/environment-variables) 참조

</div>

## 아키텍처 개요

```
Api
├── membership_db   ← 인물, 그룹, 권한
├── attendance_db   ← 예배, 세션, 기록
├── content_db      ← 페이지, 섹션, 요소
├── giving_db       ← 헌금, 기금, 결제
├── messaging_db    ← 대화, 알림
└── doing_db        ← 작업, 플랜, 배정
```

### 주요 설계 결정

- **모듈당 하나의 데이터베이스** -- 각 모듈은 (`KyselyPool`이 관리하는) 전용 연결 풀을 가진 자체 MySQL 데이터베이스를 유지합니다. 이를 통해 모듈 간 결합도를 낮추고 스키마를 독립적으로 발전시킬 수 있습니다.
- **배타적 소유권** -- 특정 모듈의 테이블은 오직 그 모듈 자체의 코드에서만 읽고 씁니다. 다른 모듈이 해당 데이터를 필요로 할 때는 테이블을 직접 조회하는 대신 소유 모듈의 게이트웨이를 호출합니다 -- [모듈 간 통신](./module-structure#cross-module-communication) 참조.
- **ORM 없는 리포지토리 패턴** -- 모든 데이터 접근은 Kysely 쿼리 빌더를 사용해 모듈 스키마에 맞는 타입 지정 SQL을 생성하는 리포지토리 클래스를 통해 이루어집니다. 이를 통해 쿼리 성능과 동작을 완전히 제어할 수 있습니다.
- **설계상 멀티테넌트** -- 모든 쿼리는 `churchId`로 범위가 지정됩니다. 모든 테이블에 `churchId` 열이 포함되며, 리포지토리 계층이 테넌트 격리를 자동으로 강제합니다.

## 연결 문자열

각 모듈의 데이터베이스 연결은 표준 MySQL 연결 문자열 형식으로 `.env`에 구성합니다.

```
mysql://user:password@host:port/database
```

예를 들어 로컬 개발 환경 설정은 다음과 같습니다.

각 모듈은 `<MODULE>_CONNECTION_STRING`이라는 이름의 환경 변수에서 연결 정보를 읽습니다.

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
프로덕션 환경에서는 연결 문자열이 AWS SSM Parameter Store에 저장되며, 시작 시 `Environment` 클래스가 이를 읽어들입니다.
:::

## 스키마 스크립트

테이블 스키마는 `tools/migrations/` 디렉터리 안에 모듈별로 정리된 Kysely 마이그레이션으로 정의됩니다.

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

마이그레이션은 테이블 생성, 인덱스, 스키마 변경 사항을 정의합니다. `tools/dbScripts/` 디렉터리에는 스키마 위에 로드할 수 있는 데모 및 시드 데이터가 들어 있습니다.

## 데이터베이스 초기화

### 모든 데이터베이스 초기화하기

```bash
npm run initdb
```

이 명령은 6개의 데이터베이스를 모두 생성하고 각각에 대한 마이그레이션을 실행합니다.

### 단일 모듈 초기화하기

```bash
npm run initdb -- --module=membership
```

:::tip
특정 모듈을 작업할 때는 다른 모듈에 영향을 주지 않고 해당 모듈의 데이터베이스만 다시 초기화할 수 있습니다.
:::

## 데이터 접근 패턴

리포지토리는 모듈의 `getDb()` 함수로 얻은, 타입이 지정된 모듈의 데이터베이스 스키마를 대상으로 Kysely 쿼리 빌더를 사용해 쿼리를 생성합니다. 일반적인 리포지토리 메서드는 다음과 같습니다.

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

리포지토리는 `RepoManager`를 통해 얻습니다.

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
멀티테넌트 격리를 유지하려면 항상 쿼리에 `churchId`를 포함하세요. 특정하고 승인된 이유가 없는 한 테넌트 간 쿼리는 절대 하지 마세요.
:::

## 모듈 간 참조

각 모듈의 데이터는 별도의 데이터베이스에 존재하므로 모듈 경계를 넘는 외래 키나 SQL 조인은 없습니다. 다른 모듈의 데이터와 관련된 레코드는 해당 레코드의 id를 저장합니다 -- 예를 들어 giving 데이터베이스의 헌금 레코드는 membership 데이터베이스에 있는 인물의 `personId`를 가지며, 모듈 간 데이터 결합은 애플리케이션 코드에서 이루어집니다.

이러한 제약이 모듈 경계를 실질적으로 만들어 줍니다. 각 스키마는 독립적으로 발전할 수 있고, 모듈의 데이터베이스를 자체 서버로 옮길 수 있으며, 공유 테이블이나 모듈 간 쿼리를 정리하지 않고도 모듈을 독립된 서비스로 분리할 수 있습니다.

## 관련 문서

- **[모듈 구조](./module-structure)** -- 각 모듈 내에서 컨트롤러와 리포지토리가 어떻게 구성되는지
- **[로컬 API 설정](./local-setup)** -- 전체 단계별 설정 가이드
