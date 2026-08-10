---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

`@churchapps/apphelper` 패키지는 모든 ChurchApps 웹 애플리케이션을 위한 공유 React 컴포넌트와 유틸리티를 제공합니다. 이는 로그인, 헌금, 양식, 마크다운, 웹사이트/CMS 기능이라는 각 기능 모듈을 하위 경로 진입점을 통해 노출하는 단일 게시 패키지이며, 여기에 핵심 공유 컴포넌트와 헬퍼 세트가 함께 포함되어 있습니다.

</div>

<div class="prereqs">
<h4>시작하기 전에</h4>

- **Node.js**와 **Git**을 설치합니다 -- [전제 조건](../setup/prerequisites) 참조
- [Packages 워크스페이스](./index.md) 설정과 릴리스 흐름을 익혀 둡니다

</div>

## 진입점

패키지는 `package.json`에 하위 경로 export를 정의하므로, 각 기능 모듈을 독립적으로 import할 수 있습니다.

| 진입점 | 내용 |
|-------------|----------|
| `@churchapps/apphelper` | 핵심 컴포넌트, 헬퍼, 훅 |
| `@churchapps/apphelper/login` | 로그인 및 등록 UI |
| `@churchapps/apphelper/donations` | 헌금 및 기부 컴포넌트 |
| `@churchapps/apphelper/forms` | 양식 제출 컴포넌트 |
| `@churchapps/apphelper/markdown` | 마크다운 및 HTML 에디터·렌더러 |
| `@churchapps/apphelper/website` | 웹사이트 빌더 및 CMS 컴포넌트 |

## 누가 무엇을 사용하는가

공유 export를 변경하기 전에 어떤 앱이 그것을 import하는지 확인하세요.

| export 영역 | 제공하는 것 | 사용처 |
|---|---|---|
| 루트 -- 핵심 컴포넌트 및 훅 | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, 그리고 재노출되는 `@churchapps/helpers` 유틸리티(`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` 등) | B1Admin, B1App, B1Transfer, LessonsApp |
| 루트 -- 사이트 크롬 | `SiteHeader`(내비게이션, 사용자 메뉴, 알림) | B1Admin, B1Transfer, LessonsApp |
| 루트 -- 관리자용 콘텐츠 에디터 | `ImageEditor`, `HelpIcon` | B1Admin |
| 루트 -- 실시간 배선(plumbing) | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| 루트 -- 채팅/프레즌스 스토어 | `ConversationStore`, `PresenceStore` | B1App |
| 루트 -- 노트 및 메시징 UI | `Notes`(사람/작업에 대한 직원용 노트); `AddNote`, `SubscriptionToggle`(회원 메시징) | B1Admin(`Notes`), B1App(`AddNote`, `SubscriptionToggle`) |
| 루트 -- Lessons 전용 | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight`(공유); `MarkdownPreview`, `HtmlEditor`(관리자용 콘텐츠 편집) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider`(공유); `FundDonations`(관리자 전용) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit`(양식의 `displayMode`가 `conversational`이면 `ConversationalForm`을 렌더링) | B1Admin, B1App |
| `./website` | 에디터와 렌더러가 공유하는 페이지 렌더링 핵심(`Element` + `ElementRegistry`로 해석되는 타입별 렌더러, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); 사이트 전역 위젯(`AnnouncementBanner`, `Launcher` 및 각 `parse*Config` 헬퍼); 대외용 렌더러에서만 쓰이는 `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` | B1Admin(에디터), B1App(에디터 컴포넌트 + 렌더러) |

B1Transfer와 LessonsApp은 루트와 `login` 진입점만 사용합니다 -- `donations`, `forms`, `website` 하위 경로는 현재 B1Admin과 B1App만 사용합니다.

## 로컬 개발 설정

이 패키지는 다른 공유 라이브러리들과 함께 [Packages](https://github.com/ChurchApps/Packages) 워크스페이스에 있습니다.

1. 워크스페이스를 클론합니다.

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. 워크스페이스 루트에서 의존성을 설치합니다.

   ```bash
   cd Packages && yarn install
   ```

3. 패키지 디렉터리에서 Vite 플레이그라운드를 실행합니다.

   ```bash
   cd apphelper && yarn dev
   ```

   플레이그라운드 개발 서버는 `http://localhost:3001`에서 시작됩니다. 먼저 `playground/dotenv.sample`을 `playground/.env`로 복사하고 필요한 값을 채우세요.

패키지를 소비용으로 빌드하려면(`dist/`로 컴파일하고 로케일/CSS 자산을 복사) `yarn workspace @churchapps/apphelper build`를 실행하세요 -- 또는 루트에서 `yarn build`를 실행하면 모든 패키지를 의존성 순서대로 빌드합니다. 게시되지 않은 빌드를 소비 앱 안에서 테스트하려면 임시 Yarn 포털을 사용하세요 -- [소비 앱을 대상으로 한 로컬 개발](./index.md#local-development-against-a-consuming-app) 참조.

:::tip
플레이그라운드는 AppHelper 컴포넌트를 개발하고 테스트하는 가장 빠른 방법입니다. Vite 개발 서버를 핫 리로드하므로 변경 사항을 실시간으로 확인할 수 있습니다.
:::

## 게시

릴리스는 changesets를 통해 이루어집니다: 변경할 때마다 워크스페이스 루트에서 `yarn changeset`을 실행한 다음, 릴리스할 준비가 되면 `yarn publish-all`을 실행하세요. 전체 흐름은 [공유 라이브러리 개요](./index.md#releasing-with-changesets)를 참조하세요.

:::warning
교체본이 게시되고 모든 소비자가 마이그레이션되기 전까지는 export를 절대 제거하거나 이름을 바꾸지 마세요 -- 제거를 머지하기 전에 모든 소비 저장소를 grep으로 확인하세요.
:::

## 관련 문서

- **[Helpers](./helpers)** -- AppHelper와 함께 사용되는 기본 유틸리티 패키지
- **[웹 앱](../web-apps/)** -- 이 패키지를 사용하는 웹 애플리케이션
- **[공유 라이브러리 개요](./index.md)** -- 워크스페이스 설정, 릴리스 흐름, 로컬 링크 워크플로
