---
title: "Helpers"
---

# Helpers

<div class="article-intro">

`@churchapps/helpers` 패키지는 프런트엔드와 백엔드를 막론하고 모든 ChurchApps 프로젝트가 사용하는 기본 유틸리티를 제공합니다. 프레임워크에 종속되지 않으며, `DateHelper`, `ApiHelper`, `CurrencyHelper` 같은 일반적인 헬퍼와, 앱과 API 사이의 데이터 계약을 이루는 공유 TypeScript 인터페이스를 포함합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js**와 **Git**을 설치합니다 -- [전제 조건](../setup/prerequisites) 참조
- [Packages 워크스페이스](./index.md) 설정과 릴리스 흐름을 익혀 둡니다

</div>

## 누가 이것을 사용하는가

모든 ChurchApps API(핵심 Api, AskApi, LessonsApi)와 모든 웹 프런트엔드(B1Admin, B1App, B1Transfer, LessonsApp)가 이 패키지에 직접 의존합니다. 프런트엔드는 또한 [`@churchapps/apphelper`](./app-helper)를 통해 이 패키지의 많은 export(`ApiHelper`, `DateHelper`, `UserHelper` 및 기타 인터페이스)를 재노출받아 사용합니다. 다른 공유 패키지들은 이 패키지를 peer dependency로 선언하므로 각 앱이 정확히 한 개의 사본만 해석하게 됩니다.

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
   yarn workspace @churchapps/helpers build
   ```

   또는 루트에서 `yarn build`를 실행하면 모든 패키지를 의존성 순서대로 빌드합니다.

소비 프로젝트 안에서 변경 사항을 테스트하려면 임시 Yarn 포털을 사용하세요 -- [소비 앱을 대상으로 한 로컬 개발](./index.md#local-development-against-a-consuming-app) 참조.

## 게시

릴리스는 수동 버전 범프가 아니라 changesets를 통해 이루어집니다.

1. 워크스페이스 루트에서 `yarn changeset`을 실행하고 적절한 범프 유형으로 `@churchapps/helpers`를 선택합니다. 생성된 changeset 파일을 변경 사항과 함께 커밋합니다.
2. 릴리스할 준비가 되면 루트에서 `yarn publish-all`을 실행합니다 -- 버전을 범프하고, CHANGELOG를 작성하며, 의존성 순서로 빌드한 후 npm에 게시합니다.

새로운 공유 인터페이스는 `helpers/src/interfaces/`에 추가되며 패키지 배럴을 통해 재노출됩니다. 웹사이트 빌더의 요소 타입 카탈로그(`ElementTypes.ts` -- answers 스키마를 가진 35개 타입)도 여기에 있습니다. 이는 apphelper 렌더러, B1Admin 에디터 양식, AI 생성 프롬프트가 공유하는 계약입니다([웹사이트 빌더 아키텍처](../architecture/website-builder) 참조).

:::warning
이 패키지는 모든 ChurchApps 프로젝트에서 사용되므로 여기서의 변경은 광범위한 영향을 미칩니다. `helpers`를 릴리스하면 `apihelper`와 `apphelper`도 자동으로 범프되어 그 의존성 범위가 최신 상태를 유지합니다. 게시하기 전에 최소한 하나의 소비 API와 하나의 소비 웹 앱에서 Yarn 포털로 테스트하세요.
:::

## 관련 문서

- **[ApiHelper](./api-helper)** -- 이 패키지에 의존하는 서버 측 유틸리티
- **[AppHelper](./app-helper)** -- 이 패키지에 의존하는 React 컴포넌트
- **[공유 라이브러리 개요](./index.md)** -- 워크스페이스 설정, 릴리스 흐름, 로컬 링크 워크플로
