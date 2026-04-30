---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

`@churchapps/apphelper*` 패키지는 모든 ChurchApps 웹 애플리케이션을 위한 공유 React 컴포넌트 및 유틸리티를 제공합니다. AppHelper는 핵심 컴포넌트, 인증, 헌금, 양식, 마크다운, 웹사이트/CMS 기능을 다루는 6개의 패키지를 포함하는 모노레포 워크스페이스로 구조화됩니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js** 및 **Git** 설치 -- [필수 조건](../setup/prerequisites) 참조
- 로컬 개발을 위한 [npm link 워크플로우](./index.md) 숙지

</div>

## 패키지

| 패키지 | 설명 |
|---------|-------------|
| `@churchapps/apphelper` | 핵심 컴포넌트 및 유틸리티 |
| `@churchapps/apphelper-login` | 로그인 및 등록 UI |
| `@churchapps/apphelper-donations` | 헌금 및 기부 컴포넌트 |
| `@churchapps/apphelper-forms` | 양식 빌더 컴포넌트 |
| `@churchapps/apphelper-markdown` | 마크다운 에디터 및 렌더러 |
| `@churchapps/apphelper-website` | 웹사이트 및 CMS 컴포넌트 |

## 로컬 개발을 위한 설정

1. 저장소 복제:

   ```bash
   git clone https://github.com/ChurchApps/AppHelper.git
   ```

2. 의존성 설치:

   ```bash
   cd AppHelper && npm install
   ```

3. 모든 패키지 빌드 및 Vite 플레이그라운드 시작:

   ```bash
   npm run playground:reload
   ```

   이는 워크스페이스의 모든 패키지를 빌드한 다음 `http://localhost:3001`에서 플레이그라운드 개발 서버를 시작합니다.

:::tip
플레이그라운드는 AppHelper 컴포넌트를 개발 및 테스트하는 가장 빠른 방법입니다. Vite 개발 서버를 핫 리로드하므로 실시간으로 변경 사항을 볼 수 있습니다.
:::

## 게시

단일 패키지 게시:

```bash
npm run publish:apphelper
```

모든 패키지 게시:

```bash
npm run publish:all
```

:::warning
게시할 때 게시 명령을 실행하기 전에 관련 `package.json` 파일의 버전 번호를 업데이트해야 합니다. 변경된 패키지에 의존하는 모든 패키지도 업데이트되어야 합니다.
:::

## 관련 문서

- **[Helpers](./helpers)** -- AppHelper와 함께 사용되는 기본 유틸리티 패키지
- **[웹 앱](../web-apps/)** -- 이 패키지를 소비하는 웹 애플리케이션
- **[공유 라이브러리 개요](./index.md)** -- `npm link` 워크플로우 및 패키지 개요
