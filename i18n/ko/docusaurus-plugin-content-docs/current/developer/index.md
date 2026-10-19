---
title: "개발자 문서"
---

# 개발자 문서

<div class="article-intro">

ChurchApps는 완전한 교회 관리 플랫폼을 함께 제공하는 약 20개의 오픈 소스 프로젝트 모음입니다. 이 프로젝트들은 백엔드 API, 웹 애플리케이션, 모바일 앱, 데스크톱 애플리케이션, 공유 라이브러리에 걸쳐 있으며 모두 TypeScript로 작성되었습니다. 이 섹션에서는 로컬 개발 환경을 설정하고 기여를 시작하는 데 필요한 모든 것을 안내합니다.

</div>

## 아키텍처 개요

이 프로젝트들은 **독립적인 저장소**입니다(모노레포가 아닙니다). 공유 코드는 `@churchapps/*` 범위로 npm에 게시되며 일반 종속성으로 사용됩니다. 따라서 전체 생태계를 클론하지 않고도 단일 프로젝트에서 작업할 수 있습니다.

주요 특징:

- **언어:** 전반적으로 TypeScript 사용
- **백엔드:** Serverless Framework를 통해 AWS Lambda에 배포되는 Node.js / Express API
- **웹:** React 19(Vite 및 Next.js), Material-UI 7
- **모바일:** Expo를 사용하는 React Native
- **데이터베이스:** MySQL 8.0, API 모듈마다 하나의 데이터베이스

## 이 섹션의 내용

- **[설정](setup/)** -- 로컬 개발 환경, 사전 요구 사항 및 구성
  - [사전 요구 사항](setup/prerequisites) -- 필요한 도구 및 소프트웨어
  - [프로젝트 개요](setup/project-overview) -- 모든 프로젝트 한눈에 보기
  - [환경 변수](setup/environment-variables) -- `.env` 파일 구성하기
- **[API](api/)** -- 핵심 API 로컬 설정, 데이터베이스 초기화 및 모듈 구조
- **[웹 앱](web-apps/)** -- B1Admin, B1App 및 LessonsApp을 로컬에서 실행하기
- **[모바일 앱](mobile/)** -- B1Mobile 및 기타 Expo 앱 빌드하기
- **[공유 라이브러리](shared-libraries/)** -- Helpers, ApiHelper 및 AppHelper 사용하기
- **[배포](deployment/)** -- API, 웹 앱 및 모바일 앱 배포하기
- **[FreePlay 콘텐츠 제공자](freeplay-content-provider)** -- 레슨 라이브러리를 FreePlay에 통합하기

## 커뮤니티 및 리소스

| 리소스 | 링크 |
|----------|------|
| GitHub 조직 | [github.com/ChurchApps](https://github.com/ChurchApps) |
| 이슈 트래커 | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack 커뮤니티 | [Join Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
기여를 시작하는 가장 빠른 방법은 웹 앱(예: B1Admin)을 하나 골라 공유 **데모 API**를 가리키도록 설정한 다음 프론트엔드 변경을 시작하는 것입니다. 데이터베이스나 API 설정이 필요하지 않습니다.
:::
