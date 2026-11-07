---
title: "로컬 API 설정"
description: "ChurchApps API를 로컬에서 설정하세요. 저장소를 클론하고, MySQL 모듈 데이터베이스 여섯 개를 구성하고, 스키마를 초기화한 뒤, 핫 리로드 개발 서버를 시작합니다."
---

# 로컬 API 설정

<div class="article-intro">

이 가이드는 로컬 개발을 위해 ChurchApps API를 설정하는 과정을 안내합니다. 저장소를 복제하고, 데이터베이스 연결을 구성하고, 스키마를 초기화한 뒤, 핫 리로드가 되는 개발 서버를 시작하게 됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js 24+**, **Git**, **MySQL 8.0+**를 설치하세요. [사전 요구 사항](../setup/prerequisites.md)을 참고하세요.
- 데이터베이스 생성 권한이 있는 MySQL 사용자를 만드세요.
- API 구성을 위해 [환경 변수](../setup/environment-variables.md) 참고 문서를 확인하세요.

</div>

## 단계별 설정

### 1. 저장소 복제하기

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. 의존성 설치하기

이 프로젝트는 Yarn을 사용합니다(`npm install`은 가드에 의해 차단됩니다).

```bash
cd Api
yarn install
```

### 3. 환경 변수 구성하기

```bash
cp .env.sample .env
```

`.env`를 열고 MySQL 연결 문자열을 설정하세요. 각 모듈은 다음 형식의 자체 데이터베이스 연결이 필요합니다.

```
mysql://root:password@localhost:3306/dbname
```

여섯 개 모듈 데이터베이스(membership, attendance, content, giving, messaging, doing) 모두에 대한 연결 문자열이 필요합니다.

### 4. 데이터베이스 초기화하기

```bash
npm run initdb
```

이 명령은 여섯 개의 데이터베이스와 그 테이블을 자동으로 만듭니다.

:::tip
`npm run initdb -- --module=membership`(또는 `attendance`, `content`, `giving`, `messaging`, `doing`)으로 특정 모듈의 데이터베이스만 초기화할 수 있습니다.
:::

### 5. 개발 서버 시작하기

```bash
npm run dev
```

API가 핫 리로드와 함께 [http://localhost:8084](http://localhost:8084)에서 시작됩니다.

## 주요 명령어

| 명령어 | 설명 |
|---------|-------------|
| `npm run dev` | 핫 리로드(tsx watch)로 개발 서버 시작 |
| `npm run build` | 정리, TypeScript 컴파일, 자산 복사 |
| `npm run test` | Jest로 테스트 실행(커버리지 포함) |
| `npm run test:watch` | 감시 모드로 테스트 실행 |
| `npm run lint` | 자동 수정 기능과 함께 ESLint 실행(ESLint가 유일한 포매터) |

## 배포

스테이징 환경은 폐기되었습니다. API는 `main`에 푸시될 때마다 데모 환경에 배포되며, 수동 **Deploy Prod** 워크플로를 통해 운영 환경에 배포됩니다. 이 워크플로는 대기 중인 데이터베이스 마이그레이션도 함께 적용합니다. 자세한 내용은 [API 배포](../deployment/apis.md)를 참고하세요.

## 로컬 라이브러리 개발

API와 함께 공유 라이브러리(`@churchapps/helpers` 또는 `@churchapps/apihelper`)를 개발해야 한다면, [Packages](https://github.com/ChurchApps/Packages) 워크스페이스에서 라이브러리를 빌드하고 API에 임시 Yarn 포털을 추가하세요.

```bash
# Packages 워크스페이스에서
yarn build

# API 디렉터리에서
yarn link ../Packages/helpers
# ... 테스트 ...
yarn unlink ../Packages/helpers && yarn install
```

이렇게 하면 npm에 배포하지 않고도 라이브러리 변경 사항을 API에서 테스트할 수 있습니다. 자세한 내용은 [공유 라이브러리](../shared-libraries/index.md#local-development-against-a-consuming-app)를 참고하세요. 링크 작업이 `package.json`에 쓴 포털 설정은 절대로 커밋하지 마세요.

## 관련 문서

- **[데이터베이스](./database.md)** -- 모듈별 데이터베이스 구조 이해하기
- **[모듈 구조](./module-structure.md)** -- 컨트롤러, 리포지토리, 모델의 구성 방식
- **[공유 라이브러리](../shared-libraries/index.md)** -- `@churchapps/helpers`와 `@churchapps/apihelper` 사용하기
