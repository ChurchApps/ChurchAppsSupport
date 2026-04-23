---
title: "공유 라이브러리"
---

# 공유 라이브러리

<div class="article-intro">

ChurchApps 공유 코드는 `@churchapps/*` 스코프 아래 npm에 게시됩니다. 이 패키지는 모든 ChurchApps 프로젝트에 의해 일반 npm 의존성으로 소비되는 공통 유틸리티, 서버 측 헬퍼, React 컴포넌트를 제공합니다.

</div>

## 패키지

| 패키지 | 설명 | 사용 |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | 기본 유틸리티 (DateHelper, ApiHelper 등) | 모든 프로젝트 |
| [`@churchapps/apihelper`](./api-helper) | 서버 측 Express.js 유틸리티 | 모든 API |
| [`@churchapps/apphelper`](./app-helper) | 공유 React 컴포넌트 및 유틸리티 | 모든 웹 앱 |

## `npm link`를 사용한 로컬 개발

공유 라이브러리를 소비 프로젝트와 함께 개발할 때, npm에 게시하지 않고도 변경 사항을 테스트하려면 `npm link`를 사용하세요:

```bash
# 라이브러리 빌드 및 링크
cd Helpers && npm run build && npm link

# 소비 프로젝트에 링크
cd ../Api && npm link @churchapps/helpers
```

이는 소비 프로젝트의 `node_modules/@churchapps/helpers`에서 로컬 빌드 출력으로의 심볼릭 링크를 생성하므로 변경 사항이 재빌드 후 즉시 반영됩니다.

:::tip
라이브러리 프로젝트에서 변경을 한 후 `npm run build`를 실행해야 합니다 -- 소비 프로젝트는 컴파일된 `dist/` 폴더에서 읽으며, 소스에서 읽지 않습니다.
:::

:::warning
`npm link` 연결은 소비 프로젝트에서 `npm install`을 실행할 때마다 재설정됩니다. 의존성을 설치한 후 `npm link @churchapps/<package>` 명령을 다시 실행해야 합니다.
:::
