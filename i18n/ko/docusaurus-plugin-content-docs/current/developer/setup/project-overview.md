---
title: "프로젝트 개요"
---

# 프로젝트 개요

<div class="article-intro">

ChurchApps는 [ChurchApps GitHub 조직](https://github.com/ChurchApps) 아래에 발행된 약 20개의 독립적인 저장소로 구성됩니다. 이 페이지는 카테고리별로 조직된 모든 프로젝트의 완전한 인벤토리와 해당 프레임워크, 포트 및 관계를 제공합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 작업할 프로젝트 카테고리에 대한 [전제 조건](./prerequisites) 설치

</div>

## 백엔드 API

모든 API는 Node.js, Express 및 TypeScript로 구축되며 Serverless Framework를 통해 AWS Lambda에 배포됩니다.

| 프로젝트 | 용도 | 개발 포트 | 데이터베이스 |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | 회원 관리, 참석, 콘텐츠, 기부, 메시징 및 작업을 다루는 핵심 모듈식 모놀리식 | 8084 | 모듈당 별도의 MySQL 데이터베이스 (총 6개) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church 백엔드 | -- | 단일 `lessons` MySQL 데이터베이스 |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | OpenAI로 구동되는 AI 쿼리 도구 | -- | -- |

:::info
핵심 **Api** 프로젝트는 모듈식 모놀리식입니다. 각 모듈 (회원 관리, 참석, 콘텐츠, 기부, 메시징, 작업)은 자신의 데이터베이스를 가지고 있으며 `/membership` 또는 `/giving`과 같은 부경로에서 액세스할 수 있습니다. 프로덕션에서는 API Gateway 뒤에서 별도의 Lambda 함수로 노출됩니다.
:::

## 웹 앱

| 프로젝트 | 프레임워크 | 개발 포트 | 용도 |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | 교회 관리 대시보드 |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | 공개 면향 교회 회원 앱 |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church 프론트엔드 |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | 데이터 가져오기/내보내기 유틸리티 |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | 정적 | -- | 정적 교회 소책자 웹사이트 |

## 모바일 앱

모든 모바일 앱은 Expo와 함께 React Native를 사용합니다.

| 프로젝트 | 용도 | 주요 버전 |
|---------|---------|---------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | iOS 및 Android를 위한 교회 회원 앱 | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | 체크인 키오스크 앱 | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV 레슨 디스플레이 | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | 콘텐츠 재생 (TV OS 포함) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | FreeShow를 위한 모바일 원격 제어 | Expo |

## 데스크톱

| 프로젝트 | 스택 | 용도 |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | 프레젠테이션 및 경배 소프트웨어 |

## 공유 라이브러리

공유 코드는 `@churchapps` 범위 아래에 npm에 발행되고 위의 프로젝트에서 일반 npm 의존성으로 사용됩니다. 모든 공유 패키지는 Yarn 작업 공간으로 관리되는 단일 저장소 -- [Packages](https://github.com/ChurchApps/Packages) -- 에 있습니다.

| 패키지 | 용도 | 사용처 |
|---------|---------|---------|
| `@churchapps/helpers` | 기본 유틸리티 및 공유 TypeScript 인터페이스 (DateHelper, ApiHelper, CurrencyHelper, 등) | 모든 프로젝트 |
| `@churchapps/apihelper` | Express 서버 유틸리티 (인증, 기본 컨트롤러, 데이터베이스 액세스, AWS 통합) | 모든 API |
| `@churchapps/apphelper` | 로그인, 기부, 양식, 마크다운 및 웹사이트 구축을 위한 부경로 모듈이 있는 React 컴포넌트 라이브러리 | 모든 웹 앱 |
| `@churchapps/content-providers` | 제3자 콘텐츠 공급자 추상화 (Lessons.church, Planning Center, Dropbox, 기타) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church 통합 툴킷: 웹훅, REST 클라이언트, OAuth | 외부 통합 개발자 |
| `@churchapps/texting` | SMS 공급자 추상화 | Api |

[공유 라이브러리](../shared-libraries/)를 참조하세요 -- 작업 공간 설정 및 릴리스 워크플로.

## 프로젝트 관계

```
프론트엔드 앱          공유 라이브러리       백엔드 API
-----------          --------           ----------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

모든 프론트엔드 앱은 `@churchapps/helpers`에 의존합니다. 웹 앱은 또한 `@churchapps/apphelper` 패키지에 의존합니다. 모든 백엔드 API는 `@churchapps/helpers` 및 `@churchapps/apihelper`에 의존합니다.

## 다음 단계

- **[환경 변수](./environment-variables)** -- API에 연결하도록 `.env` 파일 구성
- **[API 로컬 설정](../api/local-setup)** -- 백엔드 API를 로컬로 설정
