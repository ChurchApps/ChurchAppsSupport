---
title: "공유 라이브러리"
---

# 공유 라이브러리

<div class="article-intro">

ChurchApps 공유 코드는 `@churchapps/*` 스코프로 npm에 게시됩니다. 모든 공유 패키지는 단일 저장소인 [Packages](https://github.com/ChurchApps/Packages)에 있으며, Yarn(Berry) 워크스페이스로 관리되고 [changesets](https://github.com/changesets/changesets)로 버전이 관리됩니다.

</div>

## 패키지

| 패키지 | 설명 | 사용처 |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | 기초 계층: 프레임워크에 종속되지 않는 헬퍼 함수와, 앱 간 데이터 계약을 이루는 공유 TypeScript 인터페이스 | 모든 프로젝트 |
| [`@churchapps/apihelper`](./api-helper) | 서버 측 Express 유틸리티: 인증, 베이스 컨트롤러, 데이터베이스 접근, AWS 및 이메일 통합 | 모든 API |
| [`@churchapps/apphelper`](./app-helper) | 공유 React 컴포넌트 및 기능 모듈(로그인, 헌금, 양식, 마크다운, 웹사이트) | 모든 웹 앱 |
| `@churchapps/content-providers` | 서드파티 콘텐츠 제공자에 대한 추상화(Lessons.church, Planning Center, Dropbox 등) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church 통합 구축용 툴킷: 웹훅 검증, 타입이 지정된 REST 클라이언트, OAuth 헬퍼 | 외부 통합 개발자 |
| `@churchapps/texting` | SMS 제공자 추상화(Text In Church, Clearstream, Mutual Ministry) | Api |

의존성 방향은 철저히 하향식입니다: 앱은 `apihelper`와 `apphelper`에 의존하고, 이 둘은 `@churchapps/helpers`를 **peer dependency**로 선언하여 각 앱이 정확히 하나의 사본만 해석하도록 합니다.

## 워크스페이스 설정

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

이 저장소는 Yarn Berry(루트의 `packageManager` 필드가 기준)를 단일 lockfile과 함께 사용합니다. `yarn build`는 모든 패키지를 의존성 순서대로 빌드하고, `yarn test`는 모든 패키지의 테스트를 실행합니다.

## Changesets로 릴리스하기

패키지에 대한 모든 변경 사항은 changeset과 함께 제공됩니다.

1. 워크스페이스 루트에서 `yarn changeset`을 실행합니다. 변경한 패키지(들), 범프 유형(patch = 수정, minor = 새 export나 기능, major = 하위 호환성 깨짐)을 선택하고, 한 줄 요약을 작성합니다 -- 이것이 CHANGELOG 항목이 됩니다.
2. 생성된 `.changeset/*.md` 파일을 코드 변경 사항과 함께 커밋합니다. pre-commit 훅이, 스테이징된 changeset 없이 패키지 소스를 변경하는 커밋을 차단합니다.
3. 게시할 준비가 되면 루트에서 `yarn publish-all`을 실행합니다. 이 명령은 대기 중인 changeset을 소비하며(버전 범프, CHANGELOG 작성, 내부 의존성 범위 동기화), 모든 것을 의존성 순서로 빌드한 다음, 범프된 패키지를 npm에 게시합니다. 이후 버전 범프를 커밋하고 푸시하세요.

:::warning
단일 패키지 안에서 원시 `npm publish`를 직접 실행하지 마세요 -- 이는 빌드 순서와 릴리스 스크립트가 처리하는 버전 관리를 건너뜁니다. 게시하려면 `@churchapps` 스코프에 게시 권한이 있는 npm 계정이 필요합니다.
:::

## 소비 앱을 대상으로 한 로컬 개발

워크스페이스 내부에서는 패키지들이 별도의 링크 없이 형제 패키지에 대해 바로 빌드됩니다. 소비 앱(B1Admin, B1App 등) 안에서 게시되지 않은 패키지 빌드를 테스트하려면, 소비 프로젝트 쪽에 임시 Yarn 포털을 추가하세요.

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

먼저 패키지를 빌드하세요(워크스페이스 루트에서 `yarn build`) -- 소비 프로젝트는 소스가 아니라 컴파일된 `dist/` 출력을 읽습니다.

:::warning
`yarn link`는 소비 프로젝트의 `package.json`에 포털 해석 내용을 기록합니다. 이를 절대 커밋하지 마세요 -- 작업이 끝나면 항상 `yarn unlink` 후 재설치하세요.
:::
