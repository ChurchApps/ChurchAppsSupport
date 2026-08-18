---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

`@churchapps/apphelper` 패키지는 모든 ChurchApps 웹 애플리케이션을 위한 공유 React 컴포넌트 및 유틸리티를 제공합니다. 로그인, 기부, 양식, 마크다운, 웹 사이트/CMS 기능을 포함한 핵심 공유 컴포넌트 및 헬퍼와 함께 부경로 진입점을 통해 기능 모듈을 노출하는 단일 게시 패키지입니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js** 및 **Git** 설치 - [필수 구성 요소](../setup/prerequisites) 참조
- [Packages 작업 공간](./index.md) 설정 및 해제 흐름에 익숙해집니다

</div>

## 진입점

패키지는 `package.json`에서 부경로 내보내기를 정의하므로 각 기능 모듈을 독립적으로 가져올 수 있습니다:

| 진입점 | 내용 |
|-------------|----------|
| `@churchapps/apphelper` | 핵심 컴포넌트, 헬퍼 및 훅 |
| `@churchapps/apphelper/login` | 로그인 및 등록 UI |
| `@churchapps/apphelper/donations` | 기부 및 기부금 컴포넌트 |
| `@churchapps/apphelper/forms` | 양식 제출 컴포넌트 |
| `@churchapps/apphelper/markdown` | 마크다운 및 HTML 편집기 및 렌더러 |
| `@churchapps/apphelper/website` | 웹 사이트 빌더 및 CMS 컴포넌트 |

## 누가 무엇을 소비하는가

공유 내보내기를 변경하기 전에 어떤 앱이 가져오는지 확인합니다:

| 내보내기 영역 | 제공하는 것 | 소비 대상 |
|---|---|---|
| Root - 핵심 컴포넌트 및 훅 | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, plus 다시 내보낸 `@churchapps/helpers` 유틸리티 (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` 등) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root - 사이트 크롬 | `SiteHeader` (탐색, 사용자 메뉴, 알림) | B1Admin, B1Transfer, LessonsApp |
| Root - 관리 콘텐츠 편집기 | `ImageEditor`, `HelpIcon` | B1Admin |
| Root - 실시간 배관 | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root - 채팅/현재 위치 저장소 | `ConversationStore`, `PresenceStore` | B1App |
| Root - 참고 및 메시징 UI | `Notes` (사람/작업에 대한 직원 참고); `AddNote`, `SubscriptionToggle` (회원 메시징) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root - Lessons 특정 | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (공유); `MarkdownPreview`, `HtmlEditor` (관리 콘텐츠 편집) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (공유); `FundDonations` (관리만) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (양식의 `displayMode`가 `conversational`일 때 `ConversationalForm`을 렌더링) | B1Admin, B1App |
| `./website` | 편집기와 렌더러 (`Element` + 형식별 렌더러)에 의해 공유되는 페이지 렌더링 핵심. `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`를 통해 해결됨); 사이트 전체 위젯 (`AnnouncementBanner`, `Launcher` + 그들의 `parse*Config` 헬퍼); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement`는 공개 렌더러에 의해서만 사용됨 | B1Admin (편집기), B1App (편집기 컴포넌트 + 렌더러) |

B1Transfer와 LessonsApp은 root 및 `login` 진입점만 사용합니다. `donations`, `forms`, `website` 부경로는 현재 B1Admin과 B1App에 의해서만 소비됩니다.

## 로컬 개발 설정

이 패키지는 다른 공유 라이브러리와 함께 [Packages](https://github.com/ChurchApps/Packages) 작업 공간에 있습니다:

1. 작업 공간을 복제합니다:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. 작업 공간 루트에서 종속성을 설치합니다:

   ```bash
   cd Packages && yarn install
   ```

3. 패키지 디렉토리에서 Vite 플레이그라운드를 시작합니다:

   ```bash
   cd apphelper && yarn dev
   ```

   플레이그라운드 개발 서버는 `http://localhost:3001`에서 시작합니다. 먼저 `playground/dotenv.sample`을 `playground/.env`로 복사하고 필수 값을 입력합니다.

패키지를 소비를 위해 구축하려면 (dist/로 컴파일하고 locale/CSS 자산 복사), `yarn workspace @churchapps/apphelper build` 또는 모든 패키지를 종속성 순서로 구축하려면 루트에서 `yarn build`를 실행합니다. 소비 앱 내에서 미발표 구축을 테스트하려면 임시 Yarn 포털을 사용합니다. [로컬 개발 대 소비 앱](./index.md#local-development-against-a-consuming-app)을 참조합니다.

:::tip
플레이그라운드는 AppHelper 컴포넌트를 개발하고 테스트하는 가장 빠른 방법입니다. Vite 개발 서버를 핫 리로드하므로 실시간으로 변경사항을 볼 수 있습니다.
:::

## 게시

릴리스는 changesets를 통해 진행됩니다: 모든 변경으로 작업 공간 루트에서 `yarn changeset`을 실행한 후 릴리스할 준비가 되면 `yarn publish-all`을 실행합니다. 전체 흐름은 [공유 라이브러리 개요](./index.md#releasing-with-changesets)를 참조합니다.

:::warning
모든 소비 저장소가 마이그레이션될 때까지 내보내기를 제거하거나 이름을 바꾸지 마십시오. 병합하기 전에 모든 소비 저장소에서 grep을 수행합니다.
:::

## 관련 문서

- **[Helpers](./helpers)** - AppHelper와 함께 사용되는 기본 유틸리티 패키지
- **[웹 앱](../web-apps/)** - 이 패키지를 소비하는 웹 애플리케이션
- **[공유 라이브러리 개요](./index.md)** - 작업 공간 설정, 해제 흐름 및 로컬 링크 워크플로우
