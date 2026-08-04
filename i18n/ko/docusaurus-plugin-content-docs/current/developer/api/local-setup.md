---
title: "로컬 API 설정"
---

# 로컬 API 설정

<div class="article-intro">

이 가이드는 로컬 개발을 위해 ChurchApps API를 설정하는 과정을 안내합니다. 저장소를 클론하고, 데이터베이스 연결을 구성하고, 스키마를 초기화하고, 핫 리로드를 사용해 개발 서버를 시작하게 됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js 22+**, **Git**, **MySQL 8.0+**를 설치합니다 -- [전제 조건](../setup/prerequisites) 참조
- 데이터베이스 생성 권한이 있는 MySQL 사용자를 생성합니다
- API 구성을 위해 [환경 변수](../setup/environment-variables) 레퍼런스를 검토합니다

</div>

## 단계별 설정

### 1. 저장소 클론

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. 의존성 설치

프로젝트는 Yarn을 사용합니다(가드가 `npm install`을 차단합니다).

```bash
cd Api
yarn install
```

### 3. 환경 변수 구성

```bash
cp .env.sample .env
```

`.env`를 열고 MySQL 연결 문자열을 구성합니다. 각 모듈은 다음 형식의 자체 데이터베이스 연결이 필요합니다.

```
mysql://root:password@localhost:3306/dbname
```

6개 모듈 데이터베이스(membership, attendance, content, giving, messaging, doing) 모두에 대한 연결 문자열이 필요합니다.

### 4. 데이터베이스 초기화

```bash
npm run initdb
```

이 명령은 6개의 데이터베이스와 해당 테이블을 모두 자동으로 생성합니다.

:::tip
`npm run initdb -- --module=membership`(또는 `attendance`, `content`, `giving`, `messaging`, `doing`)으로 단일 모듈의 데이터베이스만 초기화할 수 있습니다.
:::

### 5. 개발 서버 시작

```bash
npm run dev
```

API가 [http://localhost:8084](http://localhost:8084)에서 핫 리로드와 함께 시작됩니다.

## 주요 명령어

| 명령어 | 설명 |
|---------|-------------|
| `npm run dev` | 핫 리로드로 개발 서버 시작(tsx watch) |
| `npm run build` | 정리, TypeScript 컴파일, 자산 복사 |
| `npm run test` | Jest로 테스트 실행(커버리지 포함) |
| `npm run test:watch` | 감시 모드로 테스트 실행 |
| `npm run lint` | 자동 수정과 함께 ESLint 실행(ESLint가 유일한 포맷터) |

## 스테이징 배포

스테이징 환경에 배포하려면:

```bash
npm run deploy-staging
```

이 명령은 프로덕션 빌드를 실행한 다음 Serverless Framework를 통해 배포합니다.

:::warning
배포 명령을 실행하기 전에 AWS 자격 증명이 구성되어 있는지 확인하세요.
:::

## 로컬 라이브러리 개발

공유 라이브러리(`@churchapps/helpers` 또는 `@churchapps/apihelper`)를 API와 함께 개발해야 하는 경우, [Packages](https://github.com/ChurchApps/Packages) 워크스페이스에서 빌드한 다음 API에 임시 Yarn 포털을 추가하세요.

```bash
# Packages 워크스페이스에서
yarn build

# API 디렉터리에서
yarn link ../Packages/helpers
# ... 테스트 ...
yarn unlink ../Packages/helpers && yarn install
```

이렇게 하면 npm에 게시하지 않고도 라이브러리 변경 사항을 API에 대해 테스트할 수 있습니다. 자세한 내용은 [공유 라이브러리](../shared-libraries/#local-development-against-a-consuming-app)를 참조하세요 -- 그리고 링크가 `package.json`에 기록하는 포털 해석 내용은 절대 커밋하지 마세요.

## 관련 문서

- **[데이터베이스](./database)** -- 모듈별 데이터베이스 아키텍처 이해하기
- **[모듈 구조](./module-structure)** -- 컨트롤러, 리포지토리, 모델이 어떻게 구성되는지
- **[공유 라이브러리](../shared-libraries/)** -- `@churchapps/helpers` 및 `@churchapps/apihelper` 다루기
