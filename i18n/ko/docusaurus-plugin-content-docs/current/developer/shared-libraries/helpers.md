---
title: "Helpers"
---

# Helpers

<div class="article-intro">

`@churchapps/helpers` 패키지는 프론트엔드 및 백엔드 모두의 모든 ChurchApps 프로젝트에서 사용하는 기본 유틸리티를 제공합니다. 프레임워크와 무관하며 `DateHelper`, `ApiHelper`, `CurrencyHelper`와 같은 일반적인 헬퍼와 앱과 API 간의 데이터 계약을 형성하는 공유 TypeScript 인터페이스를 포함합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js** 및 **Git** 설치 -- [전제 조건](../setup/prerequisites) 참조
- [Packages 작업 공간](./index.md) 설정 및 릴리스 흐름에 익숙해짐

</div>

## 누가 이것을 소비하는가

모든 ChurchApps API (핵심 Api, AskApi 및 LessonsApi) 및 모든 웹 프론트엔드 (B1Admin, B1App, B1Transfer, LessonsApp)는 이 패키지에 직접 의존합니다. 프론트엔드는 또한 [`@churchapps/apphelper`](./app-helper)를 통해 많은 내보내기 (`ApiHelper`, `DateHelper`, `UserHelper` 및 기타 인터페이스)를 다시 얻습니다. 다른 공유 패키지는 이를 피어 의존성으로 선언하므로 각 앱이 정확히 하나의 사본을 해결합니다.

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
   yarn workspace @churchapps/helpers build
   ```

   또는 `yarn build`를 루트에서 실행하여 모든 패키지를 의존성 순서로 빌드합니다.

소비 프로젝트에서 변경사항을 테스트하려면 임시 Yarn 포털을 사용합니다 -- [소비 앱에 대한 로컬 개발](./index.md#local-development-against-a-consuming-app)을 참조합니다.

## 발행

릴리스는 수동 버전 범프가 아닌 changesets를 통합니다:

1. 작업 공간 루트에서 `yarn changeset`을 실행하고 적절한 범프 타입으로 `@churchapps/helpers`를 선택합니다. 생성된 changeset 파일을 변경사항과 커밋합니다.
2. 릴리스할 준비가 되면 루트에서 `yarn publish-all`을 실행합니다 -- 버전을 범프하고, CHANGELOG를 작성하고, 의존성 순서로 구축하고, npm에 발행합니다.

새로운 공유 인터페이스는 `helpers/src/interfaces/`에 들어가고 패키지 배럴을 통해 다시 내보내집니다.

:::warning
이 패키지는 모든 ChurchApps 프로젝트에서 사용되므로 여기의 변경사항은 광범위한 영향을 미칩니다. `helpers`의 릴리스는 자동으로 `apihelper` 및 `apphelper`를 범프하므로 의존성 범위는 현재 상태로 유지됩니다. 발행하기 전에 소비 API에서 최소 하나와 소비 웹 앱에서 최소 하나의 Yarn 포털로 테스트합니다.
:::

## 관련 문서

- **[ApiHelper](./api-helper)** -- 이 패키지에 의존하는 서버 측 유틸리티
- **[AppHelper](./app-helper)** -- 이 패키지에 의존하는 React 컴포넌트
- **[공유 라이브러리 개요](./index.md)** -- 작업 공간 설정, 릴리스 흐름 및 로컬 링크 워크플로
