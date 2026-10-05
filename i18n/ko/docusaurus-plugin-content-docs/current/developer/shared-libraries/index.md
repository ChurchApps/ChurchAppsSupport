---
title: "공유 라이브러리"
---

# 공유 라이브러리

<div class="article-intro">

ChurchApps 공유 코드는 `@churchapps/*` 범위의 npm에 발행됩니다. 모든 공유 패키지는 단일 저장소에 있습니다 -- [Packages](https://github.com/ChurchApps/Packages) -- Yarn (Berry) 작업 공간으로 관리되고 [changesets](https://github.com/changesets/changesets)로 버전이 지정됩니다.

</div>

## 패키지

| 패키지 | 설명 | 사용됨 |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | 기초 계층: 프레임워크 없는 도우미 함수 및 앱 간 데이터 계약을 형성하는 공유 TypeScript 인터페이스 | 모든 프로젝트 |
| [`@churchapps/apihelper`](./api-helper) | 서버 측 Express 유틸리티: 인증, 기본 컨트롤러, 데이터베이스 액세스, AWS 및 이메일 통합 | 모든 API |
| [`@churchapps/apphelper`](./app-helper) | 공유 React 컴포넌트 및 기능 모듈(로그인, 기부금, 양식, 마크다운, 웹사이트) | 모든 웹 앱 |
| `@churchapps/content-providers` | 제3자 콘텐츠 제공자의 추상화(Lessons.church, Planning Center, Dropbox, 및 기타) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church 통합 구축을 위한 툴킷: 웹훅 검증, 유형 REST 클라이언트, OAuth 도우미 | 외부 통합 개발자 |
| `@churchapps/texting` | SMS 제공자 추상화(Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions) | Api |

의존성 방향은 엄격히 아래 방향입니다: 앱은 `apihelper` 및 `apphelper`에 의존하고, 각 앱이 정확히 하나의 복사본을 해석하도록 `@churchapps/helpers`를 **피어 의존성**으로 선언합니다.

## 작업 공간 설정

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

저장소는 Yarn Berry를 사용합니다(루트 `packageManager` 필드가 권위적임) 단일 lockfile. `yarn build`는 의존성 순서로 모든 패키지를 구축합니다; `yarn test`는 모든 패키지 테스트를 실행합니다.

## Changesets로 릴리스

패키지의 모든 변경은 changeset과 함께 배송됩니다:

1. 작업 공간 루트에서 `yarn changeset`를 실행합니다. 터치한 패키지를 선택하고, 범프 유형(patch = fix, minor = 새 내보내기 또는 기능, major = breaking)을 선택하고, 한 줄 요약을 작성합니다 -- 이것이 CHANGELOG 항목이 됩니다.
2. 생성된 `.changeset/*.md` 파일을 코드 변경과 함께 커밋합니다. pre-commit 후크는 changeset 없이 패키지의 소스를 변경하는 커밋을 차단합니다.
3. 발행할 준비가 되면 루트에서 `yarn publish-all`을 실행합니다. 이는 pending changesets를 소비하고(버전 범프, CHANGELOG 작성, 내부 의존성 범위 동기화), 의존성 순서로 모든 것을 구축하고, npm에 범프된 패키지를 발행합니다. 그 다음 버전 범프를 커밋하고 푸시합니다.

:::warning
단일 패키지 내에서 원시 `npm publish`를 절대로 실행하지 마세요 -- 빌드 순서 및 릴리스 스크립트가 처리하는 버전 장부를 건너뜁니다. 발행은 `@churchapps` 범위에 대한 발행 권한이 있는 npm 계정을 필요로 합니다.
:::

## 소비 앱에 대한 로컬 개발

작업 공간 내에서 패키지는 형제에 대해 직접 구축합니다 -- 링킹이 필요하지 않습니다. 소비 앱(B1Admin, B1App 등) 내에서 발행되지 않은 패키지 빌드를 테스트하려면, 소비자에서 임시 Yarn 포탈을 추가합니다:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

먼저 패키지를 구축합니다(`yarn build`를 작업 공간 루트에서) -- 소비자는 소스가 아니라 컴파일된 `dist/` 출력을 읽습니다.

:::warning
`yarn link`는 소비자의 `package.json`에 포탈 해석을 작성합니다. 절대로 커밋하지 마세요 -- 완료했을 때 항상 `yarn unlink`하고 재설치합니다.
:::
