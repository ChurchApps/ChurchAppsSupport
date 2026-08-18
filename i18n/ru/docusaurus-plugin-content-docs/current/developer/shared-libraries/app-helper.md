---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Пакет `@churchapps/apphelper` предоставляет общие React компоненты и утилиты для всех веб-приложений ChurchApps. Это один опубликованный пакет, который раскрывает модули функций через точки входа подпути -- логин, пожертвования, формы, markdown и функциональность вебсайта/CMS -- наряду с основным набором общих компонентов и помощников.

</div>

<div class="prereqs">
<h4>Перед началом</h4>

- Установите **Node.js** и **Git** -- смотрите [Prerequisites](../setup/prerequisites)
- Ознакомьтесь с настройкой [Packages workspace](./index.md) и потоком выпуска

</div>

## Точки входа

Пакет определяет экспорты подпути в его `package.json`, поэтому каждый модуль функций импортируется самостоятельно:

| Точка входа | Содержание |
|-------------|----------|
| `@churchapps/apphelper` | Основные компоненты, помощники и крючки |
| `@churchapps/apphelper/login` | Логин и регистрация UI |
| `@churchapps/apphelper/donations` | Дарение и компоненты пожертвований |
| `@churchapps/apphelper/forms` | Компоненты отправки формы |
| `@churchapps/apphelper/markdown` | Редакторы и рендеры Markdown и HTML |
| `@churchapps/apphelper/website` | Компоненты конструктора вебсайта и CMS |

## Кто что потребляет

Перед изменением общего экспорта проверьте, какие приложения его импортируют:

| Область экспорта | Что она предоставляет | Потребляется |
|---|---|---|
| Root -- основные компоненты и крючки | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, плюс повторно экспортированные утилиты `@churchapps/helpers` (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` и т.д.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root -- site chrome | `SiteHeader` (nav, user menu, notifications) | B1Admin, B1Transfer, LessonsApp |
| Root -- admin content editors | `ImageEditor`, `HelpIcon` | B1Admin |
| Root -- realtime plumbing | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root -- chat/presence stores | `ConversationStore`, `PresenceStore` | B1App |
| Root -- notes & messaging UI | `Notes` (staff notes on people/tasks); `AddNote`, `SubscriptionToggle` (member messaging) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root -- Lessons-specific | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (shared); `MarkdownPreview`, `HtmlEditor` (admin content editing) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (shared); `FundDonations` (admin only) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (renders `ConversationalForm` when the form's `displayMode` is `conversational`) | B1Admin, B1App |
| `./website` | Page-rendering core shared by the editor and renderer (`Element` + the per-type renderers resolved via `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); site-wide widgets (`AnnouncementBanner`, `Launcher` + their `parse*Config` helpers); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` used only by the public-facing renderer | B1Admin (editor), B1App (editor components + renderer) |

B1Transfer и LessonsApp используют только корневые и `login` точки входа -- пути `donations`, `forms` и `website` потребляются исключительно B1Admin и B1App сегодня.

## Настройка для локальной разработки

Этот пакет находится в [Packages](https://github.com/ChurchApps/Packages) workspace вместе с другими общими библиотеками:

1. Клонируйте workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Установите зависимости в корне workspace:

   ```bash
   cd Packages && yarn install
   ```

3. Запустите Vite playground из каталога пакета:

   ```bash
   cd apphelper && yarn dev
   ```

   Сервер разработки playground запускается на `http://localhost:3001`. Скопируйте `playground/dotenv.sample` в `playground/.env` и сначала заполните требуемые значения.

Для построения пакета для потребления (компилирует в `dist/` и копирует locale/CSS активы), запустите `yarn workspace @churchapps/apphelper build` -- или `yarn build` в корне для построения каждого пакета в порядке зависимостей. Для тестирования неопубликованного build внутри приложения-потребителя используйте временный Yarn portal -- смотрите [Local Development Against a Consuming App](./index.md#local-development-against-a-consuming-app).

:::tip
Playground - это самый быстрый способ разработать и протестировать AppHelper компоненты. Он с горячей перезагрузкой Vite dev сервер, поэтому вы можете видеть изменения в реальном времени.
:::

## Публикация

Выпуски проходят через changesets: запустите `yarn changeset` в корне workspace с каждым изменением, затем `yarn publish-all`, когда будете готовы к выпуску. Смотрите [Shared Libraries Overview](./index.md#releasing-with-changesets) для полного потока.

:::warning
Никогда не удаляйте и не переименовывайте экспорт до того, как замена опубликована и каждый потребитель был перемещен -- grep все потребляющие репозитории перед слиянием удаления.
:::

## Связанные статьи

- **[Helpers](./helpers)** -- Базовый пакет утилит, используемый наряду с AppHelper
- **[Web Apps](../web-apps/)** -- Веб-приложения, которые потребляют этот пакет
- **[Shared Libraries Overview](./index.md)** -- Настройка workspace, поток выпуска и локальный link workflow
