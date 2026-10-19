---
title: "로컬 API 설정"
---

# 로컬 API 설정

<div class="article-intro">

이 가이드는 ChurchApps API를 로컬 개발용으로 설정하는 과정을 안내합니다. 저장소를 클론하고, 데이터베이스 연결을 구성하고, 스키마를 초기화한 뒤, 핫 리로드가 되는 개발 서버를 시작하게 됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js 22+**, **Git**, **MySQL 8.0+**를 설치합니다 -- [사전 요구 사항](../setup/prerequisites)을 참조하세요
- 데이터베이스 생성 권한이 있는 MySQL 사용자를 만듭니다
- API 구성에 대한 [환경 변수](../setup/environment-variables) 참조를 검토합니다

</div>

## 단계별 설정

### 1. 저장소 클론하기

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. 종속성 설치하기

이 프로젝트는 Yarn을 사용합니다(가드가 `npm install`을 차단합니다).

```bash
cd Api
yarn install
```

### 3. 환경 변수 구성하기

```bash
cp .env.sample .env
```

`.env`를 열고 MySQL 연결 문자열을 구성합니다. 각 모듈은 다음 형식으로 자체 데이터베이스 연결이 필요합니다.

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
`npm run initdb -- --module=membership`(또는 `attendance`, `content`, `giving`, `messaging`, `doing`)으로 단일 모듈의 데이터베이스만 초기화할 수 있습니다.
:::

### 5. 개발 서버 시작하기

```bash
npm run dev
```

API가 핫 리로드와 함께 [http://localhost:8084](http://localhost:8084)에서 시작됩니다.

## 주요 명령

| 명령 | 설명 |
|---------|-------------|
| `npm run dev` | 핫 리로드가 되는 개발 서버 시작(tsx watch) |
| `npm run build` | 정리, TypeScript 컴파일, 자산 복사 |
| `npm run test` | Jest로 테스트 실행(커버리지 포함) |
| `npm run test:watch` | 감시 모드에서 테스트 실행 |
| `npm run lint` | 자동 수정을 포함하여 ESLint 실행(ESLint가 유일한 포매터) |

## 배포

스테이징 환경은 폐기되었습니다. Api는 `main`에 푸시할 때마다 데모 환경에 배포되며, 수동 **Deploy Prod** 워크플로로 프로덕션에 배포되는데, 이 워크플로는 대기 중인 데이터베이스 마이그레이션도 적용합니다. 자세한 내용은 [API 배포](../deployment/apis)를 참조하세요.

## 로컬 라이브러리 개발

API와 함께 공유 라이브러리(`@churchapps/helpers` 또는 `@churchapps/apihelper`)를 개발해야 한다면, [Packages](https://github.com/ChurchApps/Packages) 워크스페이스에서 빌드하고 API에 임시 Yarn 포털을 추가하세요.

```bash
# In the Packages workspace
yarn build

# In the API directory
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

이렇게 하면 npm에 게시하지 않고도 라이브러리 변경 사항을 API에 대해 테스트할 수 있습니다. 자세한 내용은 [공유 라이브러리](../shared-libraries/#local-development-against-a-consuming-app)를 참조하되, 링크가 `package.json`에 기록하는 포털 해석은 절대 커밋하지 마세요.

## 관련 문서

- **[데이터베이스](./database)** -- 모듈별 데이터베이스 아키텍처 이해하기
- **[모듈 구조](./module-structure)** -- 컨트롤러, 리포지터리, 모델의 구성 방식
- **[공유 라이브러리](../shared-libraries/)** -- `@churchapps/helpers` 및 `@churchapps/apihelper` 사용하기
