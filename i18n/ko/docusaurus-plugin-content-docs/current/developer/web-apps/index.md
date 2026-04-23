---
title: "웹 앱"
---

# 웹 앱

<div class="article-intro">

ChurchApps는 각각 다른 고객과 목적을 제공하는 3개의 웹 애플리케이션을 포함합니다. 이들은 React 19, TypeScript, Material-UI 7의 공통 기술 기초를 공유하지만 빌드 도구 및 배포 대상이 다릅니다.

</div>

## 한눈에 보는 애플리케이션

| 앱 | 목적 | 프레임워크 | 개발 포트 |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | 교회 관리 대시보드 | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Public 교회 회원 앱 | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | 수업 컨텐츠 관리 | Next.js 16 + React 19 | 3501 |

## 공유 기술 스택

모든 3개의 웹 앱은 다음을 사용하여 빌드됩니다:

- **TypeScript** -- 끝에서 끝까지 타입 안전성
- **React 19** -- UI 컴포넌트 라이브러리
- **Material-UI 7** -- 디자인 시스템 및 컴포넌트 도구 키트
- **React Query 5** -- 서버 상태 관리

## 공유 컴포넌트

앱들은 `@churchapps/apphelper*` 패키지 패밀리를 통해 UI 컴포넌트 및 유틸리티를 공유합니다:

| 패키지 | 목적 |
|---------|---------|
| `@churchapps/apphelper` | 핵심 공유 React 컴포넌트 |
| `@churchapps/apphelper-login` | 인증 UI 컴포넌트 |
| `@churchapps/apphelper-donations` | 기부 및 헌금 양식 |
| `@churchapps/apphelper-forms` | 양식 빌더 컴포넌트 |
| `@churchapps/apphelper-markdown` | 마크다운 렌더링 |
| `@churchapps/apphelper-website` | 웹사이트/CMS 컴포넌트 |

:::tip
이 공유 패키지를 로컬에서 개발하는 것에 대한 자세한 내용은 [AppHelper](../shared-libraries/app-helper) 문서를 참조하세요.
:::

## Postinstall 스크립트

각 웹 앱은 `@churchapps/apphelper`에서 locale 파일 및 CSS 자산을 프로젝트로 복사하는 `postinstall` 스크립트를 가집니다. 이것은 `npm install` 후에 자동으로 실행됩니다.

:::info
설치 후 컴포넌트가 스타일 없이 보이면 `postinstall` 스크립트가 제대로 실행되지 않았을 수 있습니다. `npm run postinstall`으로 수동으로 트리거할 수 있습니다.
:::

## 빌드 도구

앱은 2개의 다른 빌드 도구를 사용합니다:

- **B1Admin**은 **Vite**를 사용합니다 -- 단일 페이지 애플리케이션을 위한 빠르고 현대적인 번들러
- **B1App** 및 **LessonsApp**은 **Next.js**를 사용합니다 -- 서버 측 렌더링, 파일 기반 라우팅, 최적화된 프로덕션 빌드를 제공
