---
title: "Helpers"
---

# Helpers

<div class="article-intro">

`@churchapps/helpers` 패키지는 모든 ChurchApps 프로젝트(프론트엔드 및 백엔드)에서 사용되는 기본 유틸리티를 제공합니다. 이는 프레임워크에 무관하며 `DateHelper`, `ApiHelper`, `CurrencyHelper` 및 기타 공유 유틸리티와 같은 공통 헬퍼를 포함합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js** 및 **Git** 설치 -- [필수 조건](../setup/prerequisites) 참조
- 로컬 개발을 위한 [npm link 워크플로우](./index.md) 숙지

</div>

## 로컬 개발을 위한 설정

1. 저장소 복제:

   ```bash
   git clone https://github.com/ChurchApps/Helpers.git
   ```

2. 의존성 설치:

   ```bash
   cd Helpers && npm install
   ```

3. 패키지 빌드 (TypeScript를 `dist/`로 컴파일):

   ```bash
   npm run build
   ```

4. 로컬 링킹 가능하게 만들기:

   ```bash
   npm link
   ```

그 다음 모든 소비 프로젝트에 링크할 수 있습니다:

```bash
cd ../YourProject && npm link @churchapps/helpers
```

## 게시

npm에 새 버전을 게시:

1. `package.json`에서 버전 업데이트
2. 게시:

   ```bash
   npm publish --access=public
   ```

:::warning
이 패키지는 모든 ChurchApps 프로젝트에서 사용되므로, 여기서의 변경은 광범위한 영향을 미칩니다. npm에 게시하기 전에 최소한 하나의 소비 API 및 하나의 소비 웹 앱에서 `npm link`로 철저하게 테스트하세요.
:::

## 관련 문서

- **[ApiHelper](./api-helper)** -- 이 패키지에 의존하는 서버 측 유틸리티
- **[AppHelper](./app-helper)** -- 이 패키지에 의존하는 React 컴포넌트
- **[공유 라이브러리 개요](./index.md)** -- `npm link` 워크플로우 및 패키지 개요
