---
title: "데이터베이스"
---

# 데이터베이스

<div class="article-intro">

ChurchApps API는 **모듈별 데이터베이스** 아키텍처를 사용합니다. 6개 모듈 각각은 독립적인 연결 풀을 가진 자신의 MySQL 데이터베이스를 가지고 있으며, 단일 배포 내에서 명확한 데이터 경계를 유지합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **MySQL 8.0+** 설치 -- [필수 조건](../setup/prerequisites) 참조
- `.env` 파일에서 데이터베이스 연결 문자열 구성 -- [환경 변수](../setup/environment-variables) 참조

</div>

## 아키텍처 개요

```
Api
├── membership_db   ← 사람, 그룹, 권한
├── attendance_db   ← 서비스, 세션, 기록
├── content_db      ← 페이지, 섹션, 요소
├── giving_db       ← 기부금, 펀드, 결제
├── messaging_db    ← 대화, 알림
└── doing_db        ← 작업, 계획, 할당
```

### 주요 설계 결정

- **모듈별 하나의 데이터베이스** -- 각 모듈은 자신의 MySQL 데이터베이스를 전용 연결 풀(`EnhancedPoolHelper`)과 함께 유지합니다. 이는 모듈을 분리하고 독립적인 스키마 진화를 허용합니다.
- **직접 SQL을 사용한 저장소 패턴** -- ORM이 없습니다. 모든 데이터 액세스는 `DB.query()`를 사용하여 SQL을 직접 실행하는 저장소 클래스를 통과합니다. 이는 쿼리 성능과 동작에 대한 완전한 제어를 제공합니다.
- **설계상 다중 테넌트** -- 모든 쿼리는 `churchId`로 범위가 지정됩니다. 모든 테이블은 `churchId` 열을 포함하고 저장소 계층은 테넌트 격리를 자동으로 강제합니다.

## 연결 문자열

각 모듈의 데이터베이스 연결은 표준 MySQL 연결 문자열 형식을 사용하여 `.env`에서 구성됩니다:

```
mysql://user:password@host:port/database
```

예를 들어, 로컬 개발 설정은 다음과 같을 수 있습니다:

```env
MEMBERSHIP_DB=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_DB=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_DB=mysql://root:password@localhost:3306/churchapps_content
GIVING_DB=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_DB=mysql://root:password@localhost:3306/churchapps_messaging
DOING_DB=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
프로덕션에서는 연결 문자열이 AWS SSM 매개변수 저장소에 저장되고 시작 시 `Environment` 클래스에 의해 읽혀집니다.
:::

## 스키마 스크립트

데이터베이스 스키마 스크립트는 `tools/dbScripts/` 디렉토리에 모듈별로 구성되어 있습니다:

```
tools/dbScripts/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

이 스크립트들은 테이블 생성, 인덱스, 필요한 시드 데이터를 정의합니다.

## 데이터베이스 초기화

### 모든 데이터베이스 초기화

```bash
npm run initdb
```

이는 6개의 데이터베이스를 모두 생성하고 각각의 스키마 스크립트를 실행합니다.

### 단일 모듈 초기화

```bash
npm run initdb:membership
npm run initdb:attendance
npm run initdb:content
npm run initdb:giving
npm run initdb:messaging
npm run initdb:doing
```

:::tip
특정 모듈에서 작업 중일 때, 다른 모듈에 영향을 주지 않고 해당 모듈의 데이터베이스만 다시 초기화할 수 있습니다.
:::

## 데이터 액세스 패턴

저장소는 `DB.query()` 메서드를 통해 데이터에 액세스합니다. 전형적인 저장소 메서드는 다음과 같습니다:

```typescript
public async loadByChurchId(churchId: string) {
  return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
}
```

저장소는 `RepositoryManager`를 통해 얻어집니다:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

:::warning
다중 테넌트 격리를 유지하기 위해 항상 쿼리에 `churchId`를 포함하세요. 특정하고 인가된 이유가 없는 한 테넌트 간 쿼리를 하지 마세요.
:::

## 관련 문서

- **[모듈 구조](./module-structure)** -- 각 모듈 내에서 컨트롤러와 저장소가 어떻게 구성되는지
- **[로컬 API 설정](./local-setup)** -- 전체 단계별 설정 가이드
