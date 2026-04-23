---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

`@churchapps/apihelper` 패키지는 모든 ChurchApps Express.js API를 위한 서버 측 유틸리티를 제공합니다. 기본 컨트롤러 클래스, JWT 인증 미들웨어, 데이터베이스 유틸리티, AWS 통합을 포함하며 모든 API 프로젝트가 의존합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js** 및 **Git** 설치 -- [필수 조건](../setup/prerequisites) 참조
- 로컬 개발을 위한 [npm link 워크플로우](./index.md) 숙지
- 이 패키지는 [`@churchapps/helpers`](./helpers)에 의존합니다

</div>

## 포함 내용

- **CustomBaseController** -- API 컨트롤러의 기본 클래스
- **인증 미들웨어** -- `CustomAuthProvider`를 통한 JWT 인증
- **데이터베이스 유틸리티** -- MySQL 연결 관리를 위한 `DB.query`, `EnhancedPoolHelper`
- **AWS 통합** -- S3, SSM 매개변수 저장소, 기타 AWS 서비스용 헬퍼
- **Inversify DI 설정** -- 의존성 주입 컨테이너 구성

## 로컬 개발을 위한 설정

1. 저장소 복제:

   ```bash
   git clone https://github.com/ChurchApps/ApiHelper.git
   ```

2. 의존성 설치:

   ```bash
   cd ApiHelper && npm install
   ```

3. 패키지 빌드 (TypeScript를 `dist/`로 컴파일):

   ```bash
   npm run build
   ```

4. 로컬 링킹 가능하게 만들기:

   ```bash
   npm link
   ```

## 주요 명령

| 명령 | 설명 |
|---------|-------------|
| `npm run build` | TypeScript를 `dist/`로 컴파일 |
| `npm run lint` | ESLint 실행 |
| `npm run lint:fix` | 자동 수정과 함께 ESLint 실행 |
| `npm run format` | Prettier로 코드 포맷 |

:::info
이 패키지는 모든 ChurchApps API의 의존성입니다. 변경을 한 후 게시하기 전에 `npm link`를 사용하여 API에 대해 테스트하세요.
:::

## 관련 문서

- **[Helpers](./helpers)** -- 이 패키지가 의존하는 기본 유틸리티 패키지
- **[모듈 구조](../api/module-structure)** -- 컨트롤러 및 인증 미들웨어가 API 모듈에서 어떻게 사용되는지
- **[로컬 API 설정](../api/local-setup)** -- 로컬 개발용 API 설정
