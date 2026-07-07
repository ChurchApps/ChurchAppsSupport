---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Пакет `@churchapps/apphelper` предоставляет общие React-компоненты и утилиты для всех веб-приложений ChurchApps. Это единственный опубликованный пакет, который открывает модули функций через подпути входов — вход, пожертвования, формы, markdown и функциональность сайта/CMS — наряду с основным набором общих компонентов и помощников.

</div>

<div class="prereqs">
<h4>Перед началом работы</h4>

- Установите **Node.js** и **Git** — см. [Предварительные требования](../setup/prerequisites)
- Ознакомьтесь с установкой [рабочего пространства Packages](./index.md) и потоком выпуска

</div>

## Точки входа

Пакет определяет экспорты подпути в своём `package.json`, поэтому каждый модуль функций может быть импортирован отдельно:

| Точка входа | Содержимое |
|-------------|----------|
| `@churchapps/apphelper` | Основные компоненты, помощники и хуки |
| `@churchapps/apphelper/login` | UI входа и регистрации |
| `@churchapps/apphelper/donations` | Компоненты пожертвований и платежей |
| `@churchapps/apphelper/forms` | Компоненты отправки форм |
| `@churchapps/apphelper/markdown` | Редакторы и средства визуализации markdown и HTML |
| `@churchapps/apphelper/website` | Компоненты конструктора сайтов и CMS |

## Кто потребляет что

Перед изменением общего экспорта проверьте, какие приложения его импортируют:

| Область экспорта | Что это предоставляет | Потребляется |
|---|---|---|
| Root — основные компоненты и хуки | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, плюс переэкспортированные утилиты `@churchapps/helpers` (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` и т.д.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root — оформление сайта | `SiteHeader` (навигация, меню пользователя, уведомления) | B1Admin, B1Transfer, LessonsApp |
| Root — редакторы контента администратора | `ImageEditor`, `HelpIcon` | B1Admin |
| Root — инфраструктура реального времени | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root — хранилища чата/присутствия | `ConversationStore`, `PresenceStore` | B1App |
| Root — UI заметок и обмена сообщениями | `Notes` (заметки сотрудников о людях/задачах); `AddNote`, `SubscriptionToggle` (обмен сообщениями членов) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root — специфичный для Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (общий); `MarkdownPreview`, `HtmlEditor` (редактирование контента администратором) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (общий); `FundDonations` (только администратор) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (отображает `ConversationalForm` когда `displayMode` формы — `conversational`) | B1Admin, B1App |
| `./website` | Основное страницы-отображения, общий для редактора и средства визуализации (`Element` + средства визуализации для каждого типа, разрешённые через `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); виджеты на уровне сайта (`AnnouncementBanner`, `Launcher` + их `parse*Config` помощники); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` используется только общедоступным средством визуализации | B1Admin (редактор), B1App (компоненты редактора + средство визуализации) |

B1Transfer и LessonsApp используют только корневые и `login` точки входов — подпути `donations`, `forms` и `website` потребляются исключительно B1Admin и B1App сегодня.

## Настройка для локальной разработки

Этот пакет находится в рабочем пространстве [Packages](https://github.com/ChurchApps/Packages) рядом с другими общими библиотеками:

1. Клонируйте рабочее пространство:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Установите зависимости в корне рабочего пространства:

   ```bash
   cd Packages && yarn install
   ```

3. Запустите игровую площадку Vite из каталога пакета:

   ```bash
   cd apphelper && yarn dev
   ```

   Сервер разработки игровой площадки запускается на **http://localhost:3001**. Сначала скопируйте `playground/dotenv.sample` в `playground/.env` и заполните необходимые значения.

Для сборки пакета для потребления (компилирует в `dist/` и копирует активы локали/CSS) запустите `yarn workspace @churchapps/apphelper build` — или `yarn build` в корне для сборки каждого пакета в порядке зависимостей. Для тестирования несоциированной сборки в потребляющем приложении используйте временный Yarn portal — см. [Локальная разработка в потребляющем приложении](./index.md#local-development-against-a-consuming-app).

:::tip
Игровая площадка — самый быстрый способ разработки и тестирования компонентов AppHelper. Она обеспечивает горячую перезагрузку сервера разработки Vite, позволяя видеть изменения в реальном времени.
:::

## Публикация

Выпуски выполняются через changesets: запустите `yarn changeset` в корне рабочего пространства с каждым изменением, затем `yarn publish-all` когда будете готовы к выпуску. Полный поток см. в [Обзоре общих библиотек](./index.md#releasing-with-changesets).

:::warning
Никогда не удаляйте и не переименовывайте экспорт, пока замена не будет опубликована и каждый потребитель не будет перемещён — проверьте grep все потребляющие репо перед слиянием удаления.
:::

## Связанные статьи

- **[Helpers](./helpers)** — базовый пакет утилит, используемый наряду с AppHelper
- **[Веб-приложения](../web-apps/)** — веб-приложения, потребляющие этот пакет
- **[Обзор общих библиотек](./index.md)** — установка рабочего пространства, поток выпуска и локальный рабочий процесс ссылок
