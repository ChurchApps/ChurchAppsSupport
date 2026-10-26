---
title: "공유 라이브러리"
---

# 공유 라이브러리

<div class="article-intro">

ChurchApps의 공유 코드는 `@churchapps/*` 범위로 npm에 게시됩니다. 모든 공유 패키지는 하나의 저장소인 [Packages](https://github.com/ChurchApps/Packages)에 있으며, Yarn(Berry) 워크스페이스로 관리되고 [changesets](https://github.com/changesets/changesets)로 버전을 관리합니다.

</div>

## 패키지

| 패키지 | 설명 | 사용처 |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | 기반 계층입니다. 프레임워크에 의존하지 않는 헬퍼 함수와, 앱 간 데이터 계약을 이루는 공유 TypeScript 인터페이스를 제공합니다 | 모든 프로젝트 |
| [`@churchapps/apihelper`](./api-helper) | 서버 측 Express 유틸리티입니다. 인증, 기본 컨트롤러, 데이터베이스 접근, AWS 및 이메일 연동을 제공합니다 | 모든 API |
| [`@churchapps/apphelper`](./app-helper) | 공유 React 컴포넌트와 기능 모듈입니다(로그인, 기부, 양식, 마크다운, 웹사이트) | 모든 웹 앱 |
| `@churchapps/content-providers` | 서드파티 콘텐츠 제공자(Lessons.church, Planning Center, Dropbox 등)를 추상화합니다 | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church 연동을 만들기 위한 도구 모음입니다. 웹훅 검증, 타입이 지정된 REST 클라이언트, OAuth 헬퍼를 제공합니다 | 외부 연동 개발자 |
| `@churchapps/texting` | SMS 제공자 추상화입니다(Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

의존 방향은 엄격하게 아래를 향합니다. 앱은 `apihelper`와 `apphelper`에 의존하고, 이 두 패키지는 `@churchapps/helpers`를 **피어 의존성**으로 선언하여 각 앱이 정확히 한 벌의 복사본만 사용하도록 합니다.

## 워크스페이스 설정

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

이 저장소는 Yarn Berry를 사용하며(루트의 `packageManager` 필드가 기준입니다), 잠금 파일은 하나입니다. `yarn build`는 의존 순서에 따라 모든 패키지를 빌드하고, `yarn test`는 모든 패키지의 테스트를 실행합니다.

## Changesets로 릴리스하기

패키지의 모든 변경은 changeset과 함께 배포됩니다.

1. 워크스페이스 루트에서 `yarn changeset`을 실행합니다. 수정한 패키지를 선택하고, 버전 증가 유형(patch = 수정, minor = 새 내보내기 또는 기능, major = 호환성을 깨는 변경)을 고른 뒤, 한 줄 요약을 작성합니다. 이 요약이 CHANGELOG 항목이 됩니다.
2. 생성된 `.changeset/*.md` 파일을 코드 변경과 함께 커밋합니다. 사전 커밋 훅은 패키지의 소스를 바꾸면서 스테이징된 changeset이 없는 커밋을 차단합니다.
3. 배포할 준비가 되면 루트에서 `yarn publish-all`을 실행합니다. 이 명령은 대기 중인 changeset을 처리하고(버전 올리기, CHANGELOG 작성, 내부 의존성 범위 동기화), 의존 순서에 따라 모두 빌드한 뒤, 버전이 올라간 패키지를 npm에 게시합니다. 그다음 버전 변경 사항을 커밋하고 푸시합니다.

:::warning
단일 패키지 안에서 `npm publish`를 직접 실행하지 마세요. 빌드 순서와 릴리스 스크립트가 처리하는 버전 관리 작업을 건너뛰게 됩니다. 배포하려면 `@churchapps` 범위에 대한 배포 권한이 있는 npm 계정이 필요합니다.
:::

## 연동 앱에서 로컬 개발하기

워크스페이스 안에서는 패키지가 형제 패키지에 직접 연결되어 빌드되므로 별도의 링크가 필요 없습니다. 연동된 앱(B1Admin, B1App 등)에서 아직 배포되지 않은 패키지 빌드를 테스트하려면, 소비 측 프로젝트에 임시 Yarn portal을 추가합니다.

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

먼저 패키지를 빌드하세요(워크스페이스 루트에서 `yarn build`). 소비 측 앱은 소스가 아니라 컴파일된 `dist/` 출력을 읽습니다.

:::warning
`yarn link`는 소비 측의 `package.json`에 portal 해석 정보를 기록합니다. 절대 커밋하지 마세요. 작업이 끝나면 항상 `yarn unlink`를 실행하고 다시 설치하세요.
:::
