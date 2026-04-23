---
title: "로컬 API 설정"
---

# 로컬 API 설정

<div class="article-intro">

이 가이드는 로컬 개발을 위해 ChurchApps API를 설정하는 과정을 안내합니다. 저장소를 복제하고, 데이터베이스 연결을 구성하고, 스키마를 초기화하고, 핫 리로드를 사용하여 개발 서버를 시작합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js 22+**, **Git**, **MySQL 8.0+** 설치 -- [필수 조건](../setup/prerequisites) 참조
- 데이터베이스 생성 권한을 가진 MySQL 사용자 생성
- API 구성을 위해 [환경 변수](../setup/environment-variables) 참조 검토

</div>

## 단계별 설정

### 1. 저장소 복제

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. 의존성 설치

```bash
cd Api
npm install
```

### 3. 환경 변수 구성

```bash
cp .env.sample .env
```

`.env`를 열고 MySQL 연결 문자열을 구성하세요. 각 모듈은 다음 형식의 자신의 데이터베이스 연결이 필요합니다:

```
mysql://root:password@localhost:3306/dbname
```

6개 모듈 데이터베이스(membership, attendance, content, giving, messaging, doing) 모두의 연결 문자열이 필요합니다.

### 4. 데이터베이스 초기화

```bash
npm run initdb
```

이는 6개의 데이터베이스를 모두 자동으로 생성하고 테이블을 만듭니다.

:::tip
`npm run initdb:membership` (또는 `attendance`, `content`, `giving`, `messaging`, `doing`)을 사용하여 단일 모듈의 데이터베이스를 초기화할 수 있습니다.
:::

### 5. 개발 서버 시작

```bash
npm run dev
```

API는 [http://localhost:8084](http://localhost:8084)에서 핫 리로드를 사용하여 시작됩니다.

## 주요 명령

| 명령 | 설명 |
|---------|-------------|
| `npm run dev` | 핫 리로드를 사용하여 개발 서버 시작 (tsx watch) |
| `npm run build` | TypeScript를 정리하고 컴파일하고 자산 복사 |
| `npm run test` | Jest를 사용하여 테스트 실행 (커버리지 포함) |
| `npm run test:watch` | 감시 모드에서 테스트 실행 |
| `npm run lint` | Prettier와 ESLint를 자동 수정과 함께 실행 |

## 스테이징 배포

스테이징 환경에 배포하려면:

```bash
npm run deploy-staging
```

이는 프로덕션 빌드를 실행한 다음 Serverless Framework를 통해 배포합니다.

:::warning
배포 명령을 실행하기 전에 AWS 자격증명이 구성되어 있는지 확인하세요.
:::

## 로컬 라이브러리 개발

API와 함께 공유 라이브러리(`@churchapps/helpers` 또는 `@churchapps/apihelper`)를 개발해야 하는 경우 `npm link`를 사용하세요:

```bash
# 라이브러리 디렉토리에서
cd Helpers
npm run build
npm link

# API 디렉토리에서
cd ../Api
npm link @churchapps/helpers
```

이를 통해 npm에 게시하지 않고도 라이브러리 변경을 API에 대해 테스트할 수 있습니다.

## 관련 문서

- **[데이터베이스](./database)** -- 모듈별 데이터베이스 아키텍처 이해
- **[모듈 구조](./module-structure)** -- 컨트롤러, 저장소, 모델이 어떻게 구성되는지
- **[공유 라이브러리](../shared-libraries/)** -- `@churchapps/helpers` 및 `@churchapps/apihelper` 작업
