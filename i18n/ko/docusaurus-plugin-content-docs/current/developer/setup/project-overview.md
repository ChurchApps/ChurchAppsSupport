---
title: "프로젝트 개요"
---

# 프로젝트 개요

<div class="article-intro">

ChurchApps는 [ChurchApps GitHub 조직](https://github.com/ChurchApps) 아래에 게시된 약 20개의 독립적인 저장소로 구성됩니다. 이 페이지는 카테고리별로 구성된 모든 프로젝트의 완전한 인벤토리를 프레임워크, 포트, 관계와 함께 제공합니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 작업할 프로젝트 카테고리의 [필수 조건](./prerequisites) 설치

</div>

## 백엔드 API

모든 API는 Node.js, Express, TypeScript로 빌드되고 Serverless Framework를 통해 AWS Lambda에 배포됩니다.

| 프로젝트 | 목적 | 개발 포트 | 데이터베이스 |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | 회원, 참석, 컨텐츠, 헌금, 메시징, 할 일을 다루는 핵심 모듈형 모놀리스 | 8084 | 모듈별 개별 MySQL 데이터베이스 (6개 총) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church 백엔드 | -- | 단일 `lessons` MySQL 데이터베이스 |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | OpenAI 기반 AI 쿼리 도구 | -- | -- |

:::info
핵심 **Api** 프로젝트는 모듈형 모놀리스입니다. 각 모듈(회원, 참석, 컨텐츠, 헌금, 메시징, 할 일)은 자신의 데이터베이스를 가지고 있으며 `/membership` 또는 `/giving` 같은 하위 경로에서 액세스 가능합니다. 프로덕션에서는 API Gateway 뒤의 개별 Lambda 함수로 노출됩니다.
:::

## 웹 앱

| 프로젝트 | 프레임워크 | 개발 포트 | 목적 |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 5173 | 교회 관리 대시보드 |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | Public 교회 회원 앱 |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church 프론트엔드 |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | 데이터 임포트/익스포트 유틸리티 |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | Static | -- | 정적 교회 브로셔 웹사이트 |

## 모바일 앱

모든 모바일 앱은 Expo를 사용한 React Native를 사용합니다.

| 프로젝트 | 목적 | 주요 버전 |
|---------|---------|--------------|
| **[B1Mobile](https://github.com/ChurchApps/B1Mobile)** | iOS 및 Android용 교회 회원 앱 | Expo 54, React Native 0.81 |
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | 체크인 키오스크 앱 | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV 수업 표시 | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | 컨텐츠 재생 (TV OS 포함) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | FreeShow의 모바일 원격 제어 | Expo |

## 데스크톱

| 프로젝트 | 스택 | 목적 |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | 프레젠테이션 및 예배 소프트웨어 |

## 공유 라이브러리

공유 코드는 `@churchapps` 스코프 아래 npm에 게시됩니다. 이들은 위 프로젝트들에 의해 일반 npm 의존성으로 소비됩니다.

| 패키지 | npm 이름 | 목적 | 사용 |
|---------|----------|---------|---------|
| **[Helpers](https://github.com/ChurchApps/Helpers)** | `@churchapps/helpers` | 기본 유틸리티 (DateHelper, ApiHelper, CurrencyHelper 등) | 모든 프로젝트 |
| **[ApiHelper](https://github.com/ChurchApps/ApiHelper)** | `@churchapps/apihelper` | Express 서버 유틸리티 (인증 미들웨어, DB 헬퍼, AWS 통합) | 모든 API |
| **[AppHelper](https://github.com/ChurchApps/AppHelper)** | 6개 패키지를 가진 워크스페이스 | React 컴포넌트 라이브러리 | 모든 웹 앱 |
| **[ContentProviderHelper](https://github.com/ChurchApps/ContentProviderHelper)** | `@churchapps/content-provider-helper` | YouTube, Vimeo, 로컬 컨텐츠 공급자 | FreeShow, FreePlay, Api |

### AppHelper 부 패키지

AppHelper 프로젝트는 6개 패키지를 게시하는 모노레포 워크스페이스입니다:

| 패키지 | npm 이름 |
|---------|----------|
| Core | `@churchapps/apphelper` |
| Login | `@churchapps/apphelper-login` |
| Donations | `@churchapps/apphelper-donations` |
| Forms | `@churchapps/apphelper-forms` |
| Markdown | `@churchapps/apphelper-markdown` |
| Website | `@churchapps/apphelper-website` |

## 프로젝트 관계

```
프론트엔드 앱              공유 라이브러리           백엔드 API
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
B1Mobile     ──────┤                                   AskApi
FreeShow     ──────┘       @churchapps/apihelper ◄────┘
```

모든 프론트엔드 앱은 `@churchapps/helpers`에 의존합니다. 웹 앱은 추가로 `@churchapps/apphelper` 패키지에 의존합니다. 모든 백엔드 API는 `@churchapps/helpers` 및 `@churchapps/apihelper` 모두에 의존합니다.

## 다음 단계

- **[환경 변수](./environment-variables)** -- API에 연결하기 위해 `.env` 파일 구성
- **[API 로컬 설정](../api/local-setup)** -- 백엔드 API 로컬 설정
