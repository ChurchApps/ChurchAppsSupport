---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App은 Next.js로 만들어진 공개용 교회 구성원 애플리케이션입니다. 프로필, 그룹 디렉터리, 실시간 방송, 헌금 페이지 등 구성원 경험을 제공합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js 22 이상**과 **Git**을 설치하십시오 -- [사전 요구 사항](../setup/prerequisites)을 참조하십시오
- API 대상(데모 또는 로컬)을 설정하십시오 -- [환경 변수](../setup/environment-variables)를 참조하십시오

</div>

:::warning
B1App은 Node.js 22 이상이 필요합니다. 이전 버전은 지원되지 않습니다.
:::

## 설정

### 1. 저장소 복제하기

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. 의존성 설치하기

```bash
cd B1App
npm install
```

### 3. 환경 변수 설정하기

```bash
cp dotenv.sample.txt .env
```

`.env`를 열고 `NEXT_PUBLIC_*_API` 엔드포인트 URL을 설정하십시오. 공유 데모 API(`https://api.demo.churchapps.org`)나 로컬 API 인스턴스를 가리키도록 설정할 수 있습니다. 샘플 파일에는 더 이상 사용되지 않는 스테이징 URL이 아직 남아 있을 수 있으니, 이를 교체하십시오.

### 4. 개발 서버 시작하기

```bash
npm run dev
```

Next.js 개발 서버는 [http://localhost:3301](http://localhost:3301)에서 실행됩니다.

## 주요 명령어

| 명령어 | 설명 |
|---------|-------------|
| `npm run dev` | 포트 3301에서 Next.js 개발 서버 시작 |
| `npm run build` | Next.js를 통한 프로덕션 빌드 |
| `npm run test` | Playwright로 종단 간(end-to-end) 테스트 실행 |
| `npm run lint` | Next.js 린트 실행 |

## 주요 환경 변수

| 변수 | 설명 |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | 각 모듈의 API 엔드포인트 URL |

:::info
`postinstall` 스크립트는 `@churchapps/apphelper`에서 로케일과 CSS 파일을 복사합니다. 설치 후 컴포넌트에 스타일이 적용되지 않으면 `npm run postinstall`을 수동으로 실행하십시오.
:::

## 기술 스택

- TypeScript를 사용하는 **Next.js 16**
- UI 컴포넌트를 위한 **React 19**
- 디자인 시스템을 위한 **Material-UI 7**
- 서버 상태를 위한 **React Query 5**
- 공유 컴포넌트를 위한 **`@churchapps/apphelper*`** 패키지

## 배포

프로덕션 빌드는 **S3 + CloudFront**에 배포됩니다:

1. `npm run build`가 최적화된 Next.js 빌드를 생성합니다
2. 빌드 결과물이 S3 버킷에 동기화됩니다
3. 새 버전을 제공하도록 CloudFront 무효화가 실행됩니다

:::tip
자세한 배포 방법은 [웹 앱 배포](../deployment/web-apps) 가이드를 참조하십시오.
:::
