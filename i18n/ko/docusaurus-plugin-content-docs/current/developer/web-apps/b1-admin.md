---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin은 Vite 및 Material-UI로 빌드한 React 단일 페이지 애플리케이션인 교회 관리 대시보드입니다. 교회 직원은 이를 사용하여 사람, 그룹, 참석, 헌금, 컨텐츠 등을 관리합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js 22+** 및 **Git** 설치 -- [필수 조건](../setup/prerequisites) 참조
- API 대상 구성 (스테이징 또는 로컬) -- [환경 변수](../setup/environment-variables) 참조

</div>

## 설정

### 1. 저장소 복제

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. 의존성 설치

```bash
cd B1Admin
npm install
```

### 3. 환경 변수 구성

```bash
cp dotenv.sample.txt .env
```

`.env`를 열고 API 엔드포인트를 구성하세요. 스테이징 API 또는 로컬 API 인스턴스를 가리킬 수 있습니다.

### 4. 개발 서버 시작

```bash
npm start
```

이는 Vite 개발 서버를 시작합니다. 앱은 핫 모듈 교체가 활성화된 브라우저에서 사용 가능해집니다.

## 주요 환경 변수

| 변수 | 설명 |
|----------|-------------|
| `REACT_APP_STAGE` | 환경 이름 (예: `local`, `staging`, `prod`) |
| `PORT` | 개발 서버 포트 (기본값: `3101`) |
| `REACT_APP_*_API` | 각 모듈의 API 엔드포인트 URL |

:::info
`postinstall` 스크립트는 `@churchapps/apphelper`에서 locale 및 CSS 파일을 복사합니다. 컴포넌트가 스타일 없이 보이면 `npm run postinstall`을 수동으로 실행하세요.
:::

## 주요 명령

| 명령 | 설명 |
|---------|-------------|
| `npm start` | Vite 개발 서버 시작 |
| `npm run build` | Vite를 통한 프로덕션 빌드 |
| `npm run test` | Playwright를 사용한 끝에서 끝까지 테스트 실행 |
| `npm run lint` | 자동 수정과 함께 ESLint 실행 |

## 기술 스택

- **React 19** with TypeScript
- **Vite** 빌드 도구 및 개발 서버용
- **Material-UI 7** UI 컴포넌트용
- **React Query 5** 서버 상태용
- **`@churchapps/apphelper*`** 공유 컴포넌트용 패키지

## 배포

프로덕션 빌드는 **S3 + CloudFront**에 배포됩니다:

1. `npm run build`는 static 자산 생성
2. 자산이 S3 버킷에 동기화됨
3. CloudFront 무효화가 트리거되어 새 버전 제공

:::tip
자세한 배포 지침은 [웹 앱 배포](../deployment/web-apps) 가이드를 참조하세요.
:::
