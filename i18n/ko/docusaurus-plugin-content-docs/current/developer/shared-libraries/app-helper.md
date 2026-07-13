---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

`@churchapps/apphelper` 패키지는 모든 ChurchApps 웹 애플리케이션을 위한 공유 React 컴포넌트 및 유틸리티를 제공합니다. 이는 로그인, 기부, 양식, 마크다운 및 웹사이트/CMS 기능을 비롯한 기본 컴포넌트 및 헬퍼 세트와 함께 부경로 진입점을 통해 기능 모듈을 노출하는 단일 발행 패키지입니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js** 및 **Git** 설치 -- [전제 조건](../setup/prerequisites) 참조
- [Packages 작업 공간](./index.md) 설정 및 릴리스 흐름에 익숙해짐

</div>

## 진입점

패키지는 `package.json`에서 부경로 내보내기를 정의하므로 각 기능 모듈은 독립적으로 가져올 수 있습니다:

| 진입점 | 내용 |
|-------------|----------|
| `@churchapps/apphelper` | 핵심 컴포넌트, 헬퍼 및 훅 |
| `@churchapps/apphelper/login` | 로그인 및 등록 UI |
| `@churchapps/apphelper/donations` | 기부 및 기부금 컴포넌트 |
| `@churchapps/apphelper/forms` | 양식 제출 컴포넌트 |
| `@churchapps/apphelper/markdown` | 마크다운 및 HTML 에디터 및 렌더러 |
| `@churchapps/apphelper/website` | 웹사이트 빌더 및 CMS 컴포넌트 |

## 누가 무엇을 소비하는가

공유 내보내기를 변경하기 전에 어떤 앱이 이를 가져오는지 확인합니다:

| 내보내기 영역 | 제공 항목 | 소비처 |
|---|---|---|
| 루트 -- 핵심 컴포넌트 및 훅 | `DisplayBox`, `InputBox`, `Loading`, `PageHeader` 등 | B1Admin, B1App, B1Transfer, LessonsApp |
| 루트 -- 사이트 크롬 | `SiteHeader` (네비게이션, 사용자 메뉴, 알림) | B1Admin, B1Transfer, LessonsApp |
| 루트 -- 관리 콘텐츠 편집기 | `ImageEditor`, `HelpIcon` | B1Admin |
| 루트 -- 실시간 배관 | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| 루트 -- 채팅/프레젠스 저장소 | `ConversationStore`, `PresenceStore` | B1App |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods` 등 | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` | B1Admin, B1App |
| `./website` | 페이지 렌더링 핵심 및 요소 렌더러 | B1Admin, B1App |

B1Transfer 및 LessonsApp은 루트 및 `login` 진입점만 사용합니다.

## 로컬 개발 설정

이 패키지는 다른 공유 라이브러리와 함께 [Packages](https://github.com/ChurchApps/Packages) 작업 공간에 있습니다:

1. 작업 공간을 복제합니다:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. 작업 공간 루트에서 의존성을 설치합니다:

   ```bash
   cd Packages && yarn install
   ```

3. 패키지 디렉토리에서 Vite 재생 공간을 시작합니다:

   ```bash
   cd apphelper && yarn dev
   ```

   재생 공간 개발 서버는 `http://localhost:3001`에서 시작됩니다. `playground/dotenv.sample`을 `playground/.env`로 복사하고 먼저 필요한 값을 채웁니다.

소비 앱에서 테스트하려면 임시 Yarn 포털을 사용합니다 -- [소비 앱에 대한 로컬 개발](./index.md#local-development-against-a-consuming-app)을 참조합니다.

:::tip
재생 공간은 AppHelper 컴포넌트를 개발 및 테스트하는 가장 빠른 방법입니다.
:::

## 발행

릴리스는 changesets를 통합니다: 모든 변경사항으로 작업 공간 루트에서 `yarn changeset`을 실행한 다음 릴리스할 준비가 되면 `yarn publish-all`을 실행합니다. [공유 라이브러리 개요](./index.md#releasing-with-changesets)에서 전체 흐름을 참조합니다.

:::warning
내보내기를 제거하거나 이름을 바꾸기 전에 모든 소비자가 마이그레이션될 때까지 잠깐 기다리세요 -- 병합 전에 모든 소비 저장소를 그리핑합니다.
:::

## 관련 문서

- **[Helpers](./helpers)** -- AppHelper와 함께 사용되는 기본 유틸리티 패키지
- **[웹 앱](../web-apps/)** -- 이 패키지를 소비하는 웹 애플리케이션
- **[공유 라이브러리 개요](./index.md)** -- 작업 공간 설정, 릴리스 흐름 및 로컬 링크 워크플로
