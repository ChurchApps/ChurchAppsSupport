---
title: "프로젝트 개요"
description: "개발자 설정 문서에서 카테고리별로 모든 ChurchApps 저장소를 정리합니다. 각 저장소의 프레임워크, 개발 포트, 데이터베이스와 공유 @churchapps 패키지가 이들을 연결하는 방식을 설명합니다."
---

# 프로젝트 개요

<div class="article-intro">

ChurchApps는 약 20개의 독립된 저장소로 구성되어 있으며, 각 저장소는 [ChurchApps GitHub 조직](https://github.com/ChurchApps)에서 공개되어 있습니다. 이 페이지에서는 모든 프로젝트를 카테고리별로 정리하고, 각 프로젝트의 프레임워크, 포트, 상호 관계를 보여 줍니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- 작업하려는 프로젝트 카테고리에 필요한 [사전 요구 사항](./prerequisites.md)을 설치하세요

</div>

## 백엔드 API

모든 API는 Node.js, Express, TypeScript로 만들어졌으며, Serverless Framework를 통해 AWS Lambda에 배포됩니다.

| 프로젝트 | 용도 | 개발 포트 | 데이터베이스 |
|---------|---------|----------|----------|
| **[Api](https://github.com/ChurchApps/Api)** | 멤버십, 출석, 콘텐츠, 헌금, 메시징, doing 모듈을 담당하는 핵심 모듈형 모놀리스 | 8084 | 모듈별로 분리된 MySQL 데이터베이스 (총 6개) |
| **[LessonsApi](https://github.com/ChurchApps/LessonsApi)** | Lessons.church 백엔드 | -- | 단일 `lessons` MySQL 데이터베이스 |
| **[AskApi](https://github.com/ChurchApps/AskApi)** | OpenAI 기반 AI 질의 도구 | -- | -- |

:::info
핵심 **Api** 프로젝트는 모듈형 모놀리스입니다. 각 모듈(membership, attendance, content, giving, messaging, doing)은 자체 데이터베이스를 가지며, `/membership`이나 `/giving` 같은 하위 경로로 접근할 수 있습니다. 운영 환경에서는 이 모듈들이 API Gateway 뒤에서 각각 별도의 Lambda 함수로 노출됩니다.
:::

## 웹 앱

| 프로젝트 | 프레임워크 | 개발 포트 | 용도 |
|---------|-----------|----------|---------|
| **[B1Admin](https://github.com/ChurchApps/B1Admin)** | React 19 + Vite + MUI 7 | 3101 | 교회 관리 대시보드 |
| **[B1App](https://github.com/ChurchApps/B1App)** | Next.js 16 + React 19 + MUI 7 | 3301 | 교인을 위한 공개 앱 |
| **[LessonsApp](https://github.com/ChurchApps/LessonsApp)** | Next.js 16 | 3501 | Lessons.church 프런트엔드 |
| **[B1Transfer](https://github.com/ChurchApps/B1Transfer)** | React + Vite | -- | 데이터 가져오기/내보내기 유틸리티 |
| **[BrochureSites](https://github.com/ChurchApps/BrochureSites)** | 정적 사이트 | -- | 정적 교회 안내 웹사이트 |

## 모바일 앱

모든 모바일 앱은 Expo와 함께 React Native를 사용합니다.

| 프로젝트 | 용도 | 주요 버전 |
|---------|--------------|--------------|
| **[B1Checkin](https://github.com/ChurchApps/B1Checkin)** | 체크인 키오스크 앱 | Expo |
| **[LessonsScreen](https://github.com/ChurchApps/LessonsScreen)** | Android TV 수업 화면 | Expo |
| **[FreePlay](https://github.com/ChurchApps/FreePlay)** | 콘텐츠 재생 (TV OS 포함) | Expo |
| **[FreeShowRemote](https://github.com/ChurchApps/FreeShowRemote)** | FreeShow용 모바일 원격 제어 | Expo |

## 데스크톱

| 프로젝트 | 스택 | 용도 |
|---------|-------|---------|
| **[FreeShow](https://github.com/ChurchApps/FreeShow)** | Electron 37 + Svelte 3 + Vite | 프레젠테이션 및 예배 소프트웨어 |

## 공유 라이브러리

공유 코드는 `@churchapps` 범위로 npm에 게시되며, 위에 나열된 프로젝트들이 일반 npm 종속성으로 사용합니다. 모든 공유 패키지는 하나의 저장소인 [Packages](https://github.com/ChurchApps/Packages)에 있으며, Yarn 워크스페이스로 관리되고 changesets로 배포됩니다.

| 패키지 | 용도 | 사용처 |
|---------|---------|---------|
| `@churchapps/helpers` | 기본 유틸리티 및 공유 TypeScript 인터페이스 (DateHelper, ApiHelper, CurrencyHelper 등) | 모든 프로젝트 |
| `@churchapps/apihelper` | Express 서버 유틸리티 (인증, 기본 컨트롤러, 데이터베이스 접근, AWS 연동) | 모든 API |
| `@churchapps/apphelper` | 로그인, 헌금, 양식, 마크다운, 웹사이트 빌더용 하위 모듈을 제공하는 React 컴포넌트 라이브러리 | 모든 웹 앱 |
| `@churchapps/content-providers` | 타사 콘텐츠 제공자 추상화 (Lessons.church, Planning Center, Dropbox 등) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | B1.church 연동 툴킷: 웹훅, REST 클라이언트, OAuth | 외부 연동 개발자 |
| `@churchapps/texting` | SMS 제공자 추상화 | Api |

워크스페이스 설정과 배포 절차는 [공유 라이브러리](../shared-libraries/index.md)를 참고하세요.

## 프로젝트 관계

```
Frontend Apps              Shared Libraries           Backend APIs
--------------             ----------------           ------------
B1Admin      ──────┐
B1App        ──────┤       @churchapps/helpers ◄───── Api
LessonsApp   ──────┼──►    @churchapps/apphelper      LessonsApi
FreeShow     ──────┘                                   AskApi
                           @churchapps/apihelper ◄────┘
```

모든 프런트엔드 앱은 `@churchapps/helpers`에 의존합니다. 웹 앱은 추가로 `@churchapps/apphelper` 패키지에도 의존합니다. 모든 백엔드 API는 `@churchapps/helpers`와 `@churchapps/apihelper`에 모두 의존합니다.

## 다음 단계

- **[환경 변수](./environment-variables.md)** -- `.env` 파일을 설정하여 API에 연결합니다
- **[API 로컬 설정](../api/local-setup.md)** -- 백엔드 API를 로컬 환경에 설정합니다
