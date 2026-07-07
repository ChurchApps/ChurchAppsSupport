---
title: "공유 라이브러리"
---

# 공유 라이브러리

<div class="article-intro">

ChurchApps 공유 코드는 `@churchapps/*` 범위 아래에 npm에 발행됩니다. 모든 공유 패키지는 [Packages](https://github.com/ChurchApps/Packages) 저장소에 있으며 Yarn (Berry) 작업 공간으로 관리되고 [changesets](https://github.com/changesets/changesets)로 버전이 지정됩니다.

</div>

## 패키지

| 패키지 | 설명 | 사용처 |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | 기초 계층: 프레임워크 무료 헬퍼 함수 및 앱 간 데이터 계약을 형성하는 공유 TypeScript 인터페이스 | 모든 프로젝트 |
| [`@churchapps/apihelper`](./api-helper) | 서버 측 Express 유틸리티: 인증, 기본 컨트롤러, 데이터베이스 액세스, AWS 및 이메일 통합 | 모든 API |
| [`@churchapps/apphelper`](./app-helper) | 공유 React 컴포넌트 및 기능 모듈 (로그인, 기부, 양식, 마크다운, 웹사이트) | 모든 웹 앱 |
| `@churchapps/content-providers` | 제3자 콘텐츠 공급자 추상화 (Lessons.church, Planning Center, Dropbox 등) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church 통합 구축 툴킷: 웹훅 확인, 입력된 REST 클라이언트, OAuth 헬퍼 | 외부 통합 개발자 |
| `@churchapps/texting` | SMS 공급자 추상화 (Text In Church, Clearstream, Mutual Ministry) | Api |

의존성 방향은 엄격하게 하향입니다: 앱은 `apihelper` 및 `apphelper`에 의존하며, 이들은 `@churchapps/helpers`를 **피어 의존성**으로 선언하므로 각 앱이 정확히 하나의 사본을 해결합니다.

## 작업 공간 설정

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

저장소는 Yarn Berry를 사용합니다 (루트 `packageManager` 필드는 권위있음) -- 단일 lockfile. `yarn build`는 모든 패키지를 의존성 순서로 구축합니다. `yarn test`는 모든 패키지 테스트를 실행합니다.

## Changesets를 사용하여 릴리스

모든 패키지 변경사항은 changeset과 함께 제공됩니다:

1. 작업 공간 루트에서 `yarn changeset`을 실행합니다. 터치한 패키지, 범프 타입 (patch = 수정, minor = 새로운 내보내기 또는 기능, major = 중단)을 선택하고 한 줄 요약을 작성합니다 -- CHANGELOG 항목이 됩니다.
2. 생성된 `.changeset/*.md` 파일을 코드 변경사항과 함께 커밋합니다. 사전 커밋 훅은 패키지 소스를 변경하지만 스테이징된 changeset이 없는 커밋을 차단합니다.
3. 발행할 준비가 되면 루트에서 `yarn publish-all`을 실행합니다. 이는 대기 중인 changesets를 사용합니다 (버전 범프, CHANGELOG 작성, 내부 의존성 범위 동기화), 의존성 순서로 모든 것을 구축하고, 범프된 패키지를 npm에 발행합니다. 그런 다음 버전 범프를 커밋하고 푸시합니다.

:::warning
단일 패키지 내에서 원본 `npm publish`를 실행하지 마세요 -- 빌드 순서를 건너뜁니다. 발행하려면 `@churchapps` 범위에 발행 권한이 있는 npm 계정이 필요합니다.
:::

## 소비 앱에 대한 로컬 개발

작업 공간 내에서 패키지는 자신의 형제에 대해 직접 구축합니다 -- 링크가 필요 없습니다. 소비 앱 (B1Admin, B1App 등) 내에서 발행되지 않은 패키지 빌드를 테스트하려면 소비자에 임시 Yarn 포털을 추가합니다:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

먼저 패키지를 구축합니다 (`yarn build`를 작업 공간 루트에서) -- 소비자는 소스가 아닌 컴파일된 `dist/` 출력을 읽습니다.

:::warning
`yarn link`는 소비자의 `package.json`에 포털 해결을 작성합니다. 절대 커밋하지 마세요 -- 완료할 때 항상 `yarn unlink` 및 재설치합니다.
:::
