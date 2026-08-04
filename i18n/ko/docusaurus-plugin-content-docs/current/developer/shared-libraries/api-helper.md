---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

`@churchapps/apihelper` 패키지는 모든 ChurchApps Express.js API를 위한 서버 측 유틸리티를 제공합니다. 여기에는 베이스 컨트롤러 클래스, JWT 인증, 데이터베이스 유틸리티, 그리고 모든 API 프로젝트가 의존하는 AWS 통합이 포함됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js**와 **Git**을 설치합니다 -- [전제 조건](../setup/prerequisites) 참조
- [Packages 워크스페이스](./index.md) 설정과 릴리스 흐름을 익혀 둡니다
- 이 패키지는 [`@churchapps/helpers`](./helpers)에 (peer dependency로) 의존하며 이를 재노출합니다

</div>

## 포함된 내용

- **CustomBaseController** -- `inversify-express-utils` 위에 구축된 API 컨트롤러용 베이스 클래스
- **인증** -- `CustomAuthProvider`, `AuthenticatedUser`, `Principal`을 통한 JWT 인증
- **데이터베이스 유틸리티** -- MySQL 연결 관리를 위한 `DB.query` / `DB.queryOne` 및 `Pool` 클래스, 그리고 스키마 설정을 위한 `MySqlHelper`와 `DBCreator`
- **AWS 통합** -- S3 파일 저장소 및 SSM Parameter Store 읽기를 위한 `AwsHelper`
- **이메일** -- SES와 SMTP 전송을 지원하는 `EmailHelper`
- **구성 로딩** -- `EnvironmentBase`가 환경 변수 또는 Parameter Store에서 연결 문자열과 비밀 값을 읽음
- **기타** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## 로컬 개발 설정

이 패키지는 다른 공유 라이브러리들과 함께 [Packages](https://github.com/ChurchApps/Packages) 워크스페이스에 있습니다.

1. 워크스페이스를 클론합니다.

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. 워크스페이스 루트에서 의존성을 설치합니다.

   ```bash
   cd Packages && yarn install
   ```

3. 빌드합니다(TypeScript를 `dist/`로 컴파일).

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   또는 루트에서 `yarn build`를 실행하면 모든 패키지를 의존성 순서대로 빌드합니다.

소비 API 안에서 변경 사항을 테스트하려면 임시 Yarn 포털을 사용하세요 -- [소비 앱을 대상으로 한 로컬 개발](./index.md#local-development-against-a-consuming-app) 참조.

## 게시

릴리스는 changesets를 통해 이루어집니다: 변경할 때마다 워크스페이스 루트에서 `yarn changeset`을 실행한 다음, 릴리스할 준비가 되면 `yarn publish-all`을 실행하세요. 전체 흐름은 [공유 라이브러리 개요](./index.md#releasing-with-changesets)를 참조하세요.

:::info
이 패키지는 핵심 Api, AskApi, LessonsApi를 포함한 모든 ChurchApps API의 의존성입니다. 변경할 때는 게시하기 전에 반드시 로컬에서 API에 대해 테스트하세요.
:::

## 관련 문서

- **[Helpers](./helpers)** -- 이 패키지가 의존하는 기본 유틸리티 패키지
- **[모듈 구조](../api/module-structure)** -- API 모듈에서 컨트롤러와 인증 미들웨어가 어떻게 사용되는지
- **[로컬 API 설정](../api/local-setup)** -- 로컬 개발을 위한 API 설정
