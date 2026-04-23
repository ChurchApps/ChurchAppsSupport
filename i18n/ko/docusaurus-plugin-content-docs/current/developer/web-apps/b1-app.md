---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App은 Next.js로 빌드한 public 교회 회원 애플리케이션입니다. 프로필, 그룹 디렉토리, 라이브 스트리밍, 헌금 페이지를 포함한 회원 경험을 제공합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js 22+** 및 **Git** 설치 -- [필수 조건](../setup/prerequisites) 참조
- API 대상 구성 (스테이징 또는 로컬) -- [환경 변수](../setup/environment-variables) 참조

</div>

:::warning
B1App은 Node.js 22 이상이 필요합니다. 이전 버전은 지원되지 않습니다.
:::

## 설정

### 1. 저장소 복제

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. 의존성 설치

```bash
cd B1App
npm install
```

### 3. 환경 변수 구성

```bash
cp dotenv.sample.txt .env
```

`.env`를 열고 `NEXT_PUBLIC_*_API` 엔드포인트 URL을 구성하세요. 스테이징 API 또는 로컬 API 인스턴스를 가리킬 수 있습니다.

### 4. 개발 서버 시작

```bash
npm run dev
```

Next.js 개발 서버는 [http://localhost:3301](http://localhost:3301)에서 시작됩니다.

## 주요 명령

| 명령 | 설명 |
|---------|-------------|
| `npm run dev` | 포트 3301에서 Next.js 개발 서버 시작 |
| `npm run build` | Next.js를 통한 프로덕션 빌드 |
| `npm run test` | Playwright를 사용한 끝에서 끝까지 테스트 실행 |
| `npm run lint` | Next.js lint 실행 |

## 주요 환경 변수

| 변수 | 설명 |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | 각 모듈의 API 엔드포인트 URL |

:::info
`postinstall` 스크립트는 `@churchapps/apphelper`에서 locale 및 CSS 파일을 복사합니다. 설치 후 컴포넌트가 스타일 없이 보이면 `npm run postinstall`을 수동으로 실행하세요.
:::

## 기술 스택

- **Next.js 16** with TypeScript
- **React 19** UI 컴포넌트용
- **Material-UI 7** 디자인 시스템용
- **React Query 5** 서버 상태용
- **`@churchapps/apphelper*`** 공유 컴포넌트용 패키지

## 배포

프로덕션 빌드는 **S3 + CloudFront**에 배포됩니다:

1. `npm run build`는 최적화된 Next.js 빌드 생성
2. 빌드 출력이 S3 버킷에 동기화됨
3. CloudFront 무효화가 트리거되어 새 버전 제공

:::tip
자세한 배포 지침은 [웹 앱 배포](../deployment/web-apps) 가이드를 참조하세요.
:::
