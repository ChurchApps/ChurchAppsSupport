---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp은 [Lessons.church](https://lessons.church)의 레슨 콘텐츠 관리 애플리케이션입니다. Next.js와 React로 만들어졌으며, 교회 레슨 커리큘럼을 만들고, 정리하고, 게시하기 위한 인터페이스를 제공합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js 22+**와 **Git**을 설치합니다 -- [사전 요구 사항](../setup/prerequisites)을 참조하세요
- API 대상(로컬 LessonsApi)을 구성합니다 -- [환경 변수](../setup/environment-variables)를 참조하세요

</div>

:::warning
LessonsApp은 Node.js 22 이상이 필요합니다. 이전 버전은 지원되지 않습니다.
:::

## 설정

### 1. 저장소 클론하기

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. 종속성 설치하기

```bash
cd LessonsApp
npm install
```

### 3. 환경 변수 구성하기

환경 샘플 파일을 `.env`로 복사하고 API 엔드포인트를 구성합니다.

```bash
cp dotenv.sample.txt .env
```

API 엔드포인트 URL을 로컬 LessonsApi 인스턴스(`http://localhost:8090`)를 가리키도록 업데이트합니다. 스테이징 Lessons API는 폐기되었으므로, 샘플 파일에 남아 있는 `api.staging.lessons.church` URL은 모두 교체하세요.

### 4. 개발 서버 시작하기

```bash
npm run dev
```

Next.js 개발 서버가 [http://localhost:3501](http://localhost:3501)에서 시작됩니다.

## 주요 명령

| 명령 | 설명 |
|---------|-------------|
| `npm run dev` | 포트 3501에서 Next.js 개발 서버 시작 |
| `npm run build` | Next.js를 통한 프로덕션 빌드 |

## 기술 스택

- TypeScript를 사용하는 **Next.js 16**
- UI 구성 요소를 위한 **React 19**
- 공유 구성 요소를 위한 **`@churchapps/apphelper*`** 패키지

:::info
LessonsApp은 기본 ChurchApps Api와는 별개인 **LessonsApi** 백엔드와 통신합니다. 환경이 올바른 Lessons API 엔드포인트로 구성되어 있는지 확인하세요.
:::

## 배포

프로덕션 빌드는 **S3 + CloudFront**에 배포됩니다.

1. `npm run build`가 최적화된 Next.js 빌드를 생성합니다
2. 빌드 결과물이 S3 버킷에 동기화됩니다
3. 새 버전을 제공하도록 CloudFront 무효화가 실행됩니다

:::tip
자세한 배포 지침은 [웹 앱 배포](../deployment/web-apps) 가이드를 참조하세요.
:::
