---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin은 교회 관리 대시보드로, Vite와 Material-UI로 만든 React 단일 페이지 애플리케이션입니다. 교회 직원은 이를 사용하여 사람, 그룹, 출석, 헌금, 콘텐츠 등을 관리합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js 22+**와 **Git**을 설치하세요 -- [사전 요구 사항](../setup/prerequisites)을 참조하세요
- API 대상(데모 또는 로컬)을 설정하세요 -- [환경 변수](../setup/environment-variables)를 참조하세요

</div>

## 설정

### 1. 저장소 복제하기

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. 의존성 설치하기

```bash
cd B1Admin
npm install
```

### 3. 환경 변수 설정하기

```bash
cp dotenv.sample.txt .env
```

`.env`를 열고 API 엔드포인트를 설정하세요. 공유 데모 API(`https://api.demo.churchapps.org`)나 로컬 API 인스턴스를 가리키도록 설정할 수 있습니다. 샘플 파일에는 이미 사용하지 않는 스테이징 URL이 남아 있을 수 있으니 교체하세요.

### 4. 개발 서버 시작하기

```bash
npm start
```

Vite 개발 서버가 시작됩니다. 핫 모듈 교체가 활성화된 상태로 브라우저에서 앱을 사용할 수 있습니다.

## 주요 환경 변수

| 변수 | 설명 |
|------|------|
| `REACT_APP_STAGE` | 환경 이름(예: 샘플 파일의 `demo`, `prod`, 또는 `selfhost`) |
| `PORT` | 개발 서버 포트(기본값: `3101`) |
| `REACT_APP_*_API` | 각 모듈의 API 엔드포인트 URL |

:::info
`postinstall` 스크립트는 `@churchapps/apphelper`에서 로케일 및 CSS 파일을 복사합니다. 컴포넌트에 스타일이 적용되지 않은 것처럼 보이면 `npm run postinstall`을 수동으로 실행하세요.
:::

## 주요 명령어

| 명령어 | 설명 |
|--------|------|
| `npm start` | Vite 개발 서버 시작 |
| `npm run build` | Vite로 프로덕션 빌드 |
| `npm run test` | Playwright로 엔드투엔드 테스트 실행 |
| `npm run lint` | 자동 수정 옵션과 함께 ESLint 실행 |

## 기술 스택

- TypeScript를 사용하는 **React 19**
- 빌드 도구와 개발 서버를 위한 **Vite**
- UI 컴포넌트를 위한 **Material-UI 7**
- 서버 상태를 위한 **React Query 5**
- 공유 컴포넌트를 위한 **`@churchapps/apphelper*`** 패키지

## 배포

프로덕션 빌드는 **S3 + CloudFront**에 배포됩니다.

1. `npm run build`가 정적 자산을 생성합니다
2. 자산을 S3 버킷에 동기화합니다
3. 새 버전을 제공하도록 CloudFront 무효화를 트리거합니다

:::tip
자세한 배포 방법은 [웹 앱 배포](../deployment/web-apps) 가이드를 참조하세요.
:::
