---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp은 [Lessons.church](https://lessons.church)를 위한 수업 컨텐츠 관리 애플리케이션입니다. 교회 수업 교과 과정을 생성, 구성, 게시하기 위한 인터페이스를 제공하며 Next.js 및 React로 빌드되었습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js 22+** 및 **Git** 설치 -- [필수 조건](../setup/prerequisites) 참조
- API 대상 구성 (스테이징 또는 로컬) -- [환경 변수](../setup/environment-variables) 참조

</div>

:::warning
LessonsApp은 Node.js 22 이상이 필요합니다. 이전 버전은 지원되지 않습니다.
:::

## 설정

### 1. 저장소 복제

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. 의존성 설치

```bash
cd LessonsApp
npm install
```

### 3. 환경 변수 구성

환경 샘플 파일을 `.env`로 복사하고 API 엔드포인트를 구성하세요:

```bash
cp dotenv.sample.txt .env
```

API 엔드포인트 URL을 스테이징 API 또는 로컬 API 인스턴스를 가리키도록 업데이트하세요.

### 4. 개발 서버 시작

```bash
npm run dev
```

Next.js 개발 서버는 [http://localhost:3501](http://localhost:3501)에서 시작됩니다.

## 주요 명령

| 명령 | 설명 |
|---------|-------------|
| `npm run dev` | 포트 3501에서 Next.js 개발 서버 시작 |
| `npm run build` | Next.js를 통한 프로덕션 빌드 |

## 기술 스택

- **Next.js 16** with TypeScript
- **React 19** UI 컴포넌트용
- **`@churchapps/apphelper*`** 공유 컴포넌트용 패키지

:::info
LessonsApp은 메인 ChurchApps Api와 별도인 **LessonsApi** 백엔드와 통신합니다. 환경이 올바른 Lessons API 엔드포인트로 구성되었는지 확인하세요.
:::

## 배포

프로덕션 빌드는 **S3 + CloudFront**에 배포됩니다:

1. `npm run build`는 최적화된 Next.js 빌드 생성
2. 빌드 출력이 S3 버킷에 동기화됨
3. CloudFront 무효화가 트리거되어 새 버전 제공

:::tip
자세한 배포 지침은 [웹 앱 배포](../deployment/web-apps) 가이드를 참조하세요.
:::
