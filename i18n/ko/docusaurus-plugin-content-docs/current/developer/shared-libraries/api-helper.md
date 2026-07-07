---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

`@churchapps/apihelper` 패키지는 모든 ChurchApps Express.js API를 위한 서버 측 유틸리티를 제공합니다. 기본 컨트롤러 클래스, JWT 인증, 데이터베이스 유틸리티 및 모든 API 프로젝트가 의존하는 AWS 통합을 포함합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js** 및 **Git** 설치 -- [전제 조건](../setup/prerequisites) 참조
- [Packages 작업 공간](./index.md) 설정 및 릴리스 흐름에 익숙해짐
- 이 패키지는 [`@churchapps/helpers`](./helpers) (피어 의존성으로)에 의존하고 재내보냄

</div>

## 포함되는 것

- **CustomBaseController** -- API 컨트롤러를 위한 기본 클래스, `inversify-express-utils`에서 구축
- **인증** -- `CustomAuthProvider`, `AuthenticatedUser` 및 `Principal`을 통한 JWT 인증
- **데이터베이스 유틸리티** -- `DB.query` / `DB.queryOne` 및 MySQL 연결 관리를 위한 `Pool` 클래스, 스키마 설정을 위한 `MySqlHelper` 및 `DBCreator`
- **AWS 통합** -- S3 파일 저장소 및 SSM 매개변수 저장소 읽기를 위한 `AwsHelper`
- **이메일** -- SES 및 SMTP 전송을 지원하는 `EmailHelper`
- **구성 로드** -- `EnvironmentBase`는 환경 변수 또는 매개변수 저장소에서 연결 문자열 및 비밀을 읽음
- **기타** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## 로컬 개발 설정

이 패키지는 다른 공유 라이브러리와 함께 [Packages](https://github.com/ChurchApps/Packages) 작업 공간에 있습니다:

1. 작업 공간을 복제합니다:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. 작업 공간 루트에서 의존성을 설치합니다:

   ```bash
   cd Packages && yarn install
   ```

3. 빌드합니다 (TypeScript를 `dist/`로 컴파일):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   또는 `yarn build`를 루트에서 실행하여 모든 패키지를 의존성 순서로 빌드합니다.

소비 API 내에서 변경사항을 테스트하려면 임시 Yarn 포털을 사용합니다 -- [소비 앱에 대한 로컬 개발](./index.md#local-development-against-a-consuming-app)을 참조합니다.

## 발행

릴리스는 changesets를 통합니다: 모든 변경사항으로 작업 공간 루트에서 `yarn changeset`을 실행한 다음 릴리스할 준비가 되면 `yarn publish-all`을 실행합니다. [공유 라이브러리 개요](./index.md#releasing-with-changesets)에서 전체 흐름을 참조합니다.

:::info
이 패키지는 모든 ChurchApps API의 의존성입니다 -- 핵심 Api, AskApi 및 LessonsApi. 변경하기 전에 API에 대해 로컬로 테스트합니다.
:::

## 관련 문서

- **[Helpers](./helpers)** -- 이 패키지가 의존하는 기본 유틸리티 패키지
- **[모듈 구조](../api/module-structure)** -- 컨트롤러 및 인증 미들웨어가 API 모듈에서 어떻게 사용되는지
- **[로컬 API 설정](../api/local-setup)** -- 로컬 개발을 위해 API 설정
