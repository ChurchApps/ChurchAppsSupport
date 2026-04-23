---
title: "개발자 문서"
---

# 개발자 문서

<div class="article-intro">

ChurchApps는 완전한 교회 관리 플랫폼을 제공하는 약 20개의 오픈소스 프로젝트 모음입니다. 이 프로젝트들은 백엔드 API, 웹 애플리케이션, 모바일 앱, 데스크톱 애플리케이션, 그리고 공유 라이브러리를 포함하며 모두 TypeScript로 작성되었습니다. 이 섹션에서는 로컬 개발 환경을 설정하고 기여하기 시작하기 위해 필요한 모든 것을 제공합니다.

</div>

## 한눈에 보는 아키텍처

프로젝트들은 **독립적인 저장소**(모노레포가 아님)입니다. 공유 코드는 `@churchapps/*` 스코프 아래 npm에 게시되며 일반적인 의존성으로 소비됩니다. 이는 전체 생태계를 복제하지 않고도 단일 프로젝트에서 작업할 수 있음을 의미합니다.

주요 특성:

- **언어:** 전체 TypeScript
- **백엔드:** Node.js / Express API는 Serverless Framework를 통해 AWS Lambda에 배포됨
- **웹:** React 19 (Vite 및 Next.js), Material-UI 7
- **모바일:** React Native with Expo
- **데이터베이스:** MySQL 8.0, API 모듈별 하나의 데이터베이스

## 이 섹션에서 다루는 내용

- **[설정](setup/)** -- 로컬 개발 환경, 필수 조건, 구성
  - [필수 조건](setup/prerequisites) -- 필수 도구 및 소프트웨어
  - [프로젝트 개요](setup/project-overview) -- 모든 프로젝트 한눈에 보기
  - [환경 변수](setup/environment-variables) -- `.env` 파일 구성
- **[API](api/)** -- 핵심 API 로컬 설정, 데이터베이스 초기화, 모듈 구조
- **[웹 앱](web-apps/)** -- B1Admin, B1App, LessonsApp 로컬 실행
- **[모바일 앱](mobile/)** -- B1Mobile 및 기타 Expo 앱 빌드
- **[공유 라이브러리](shared-libraries/)** -- Helpers, ApiHelper, AppHelper 작업
- **[배포](deployment/)** -- API, 웹 앱, 모바일 앱 배포

## 커뮤니티 및 자료

| 자료 | 링크 |
|----------|------|
| GitHub 조직 | [github.com/ChurchApps](https://github.com/ChurchApps) |
| 문제 추적기 | [ChurchAppsSupport Issues](https://github.com/ChurchApps/ChurchAppsSupport/issues) |
| Slack 커뮤니티 | [Join Slack](https://join.slack.com/t/livechurchsolutions/shared_invite/zt-i88etpo5-ZZhYsQwQLVclW12DKtVflg) |

:::tip
기여하기 시작하는 가장 빠른 방법은 웹 앱(예: B1Admin)을 선택하고 **스테이징 API**를 가리킨 다음 프론트엔드 변경을 시작하는 것입니다. 데이터베이스나 API 설정이 필요하지 않습니다.
:::
