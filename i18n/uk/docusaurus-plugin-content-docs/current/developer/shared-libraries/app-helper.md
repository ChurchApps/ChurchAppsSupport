---
title: "AppHelper"
description: "Довідник пакета @churchapps/apphelper: точки входу підшляхів, які застосунки використовують кожен експорт, локальна розробка та публікація."
---

# AppHelper

<div class="article-intro">

Пакет `@churchapps/apphelper` надає спільні React-компоненти та утиліти для всіх веб-застосунків ChurchApps. Це єдиний опублікований пакет, який відкриває функціональні модулі через субшляхи точок входу: вхід у систему, пожертви, форми, markdown та функції вебсайту/CMS. Крім того, він містить базовий набір спільних компонентів і допоміжних функцій.

</div>

<div class="prereqs">
<h4>Перш ніж почати</h4>

- Встановіть **Node.js** і **Git** — див. [Передумови](../setup/prerequisites.md)
- Ознайомтеся з налаштуванням [робочого простору Packages](./index.md) і процесом випуску

</div>

## Точки входу

Пакет визначає субшляхи експорту у своєму `package.json`, тому кожен функціональний модуль можна імпортувати окремо:

| Точка входу | Вміст |
|-------------|----------|
| `@churchapps/apphelper` | Основні компоненти, допоміжні функції та хуки |
| `@churchapps/apphelper/login` | Інтерфейс входу та реєстрації |
| `@churchapps/apphelper/donations` | Компоненти для пожертв і внесків |
| `@churchapps/apphelper/forms` | Компоненти надсилання форм |
| `@churchapps/apphelper/markdown` | Редактори та рендерери Markdown і HTML |
| `@churchapps/apphelper/website` | Компоненти конструктора сайтів і CMS |

## Хто що використовує

Перш ніж змінювати спільний експорт, перевірте, які застосунки його імпортують:

| Область експорту | Що надає | Використовується в |
|---|---|---|
| Корінь — основні компоненти та хуки | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, а також повторно експортовані утиліти `@churchapps/helpers` (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` тощо) | B1Admin, B1App, B1Transfer, LessonsApp |
| Корінь — елементи сайту | `SiteHeader` (навігація, меню користувача, сповіщення) | B1Admin, B1Transfer, LessonsApp |
| Корінь — редактори контенту адміністратора | `ImageEditor`, `HelpIcon` | B1Admin |
| Корінь — інфраструктура реального часу | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Корінь — сховища чату та присутності | `ConversationStore`, `PresenceStore` | B1App |
| Корінь — інтерфейс нотаток і повідомлень | `Notes` (внутрішні нотатки про людей і завдання); `AddNote`, `SubscriptionToggle` (повідомлення для учасників) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Корінь — специфічне для Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (спільні); `MarkdownPreview`, `HtmlEditor` (редагування контенту адміністратором) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (спільні); `FundDonations` (лише для адміністраторів) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (відображає `ConversationalForm`, коли `displayMode` форми має значення `conversational`) | B1Admin, B1App |
| `./website` | Основа відображення сторінок, спільна для редактора та рендерера (`Element` і рендерери для кожного типу, які визначаються через `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); загальносайтові віджети (`AnnouncementBanner`, `Launcher` та їхні допоміжні функції `parse*Config`); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement`, які використовуються лише рендererом для публічної частини сайту | B1Admin (редактор), B1App (компоненти редактора та рендерер) |

B1Transfer і LessonsApp використовують лише корінь і точку входу `login`. Субшляхи `donations`, `forms` і `website` наразі використовуються виключно в B1Admin і B1App.

## Налаштування для локальної розробки

Цей пакет розташований у [робочому просторі Packages](https://github.com/ChurchApps/Packages) разом з іншими спільними бібліотеками:

1. Клонуйте робочий простір:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Встановіть залежності в корені робочого простору:

   ```bash
   cd Packages && yarn install
   ```

3. Запустіть playground на Vite з каталогу пакета:

   ```bash
   cd apphelper && yarn dev
   ```

   Сервер розробки playground запускається за адресою `http://localhost:3001`. Спочатку скопіюйте `playground/dotenv.sample` до `playground/.env` і заповніть необхідні значення.

Щоб зібрати пакет для використання (результат поміщається в `dist/`, а файли локалізації та CSS копіюються), виконайте `yarn workspace @churchapps/apphelper build` або `yarn build` у корені, щоб зібрати всі пакети в порядку залежностей. Щоб протестувати неопублікований збір у застосунку, що його використовує, скористайтеся тимчасовим порталом Yarn. Див. [Локальна розробка із застосунком-споживачем](./index.md#local-development-against-a-consuming-app).

:::tip
Playground — найшвидший спосіб розробляти й тестувати компоненти AppHelper. Він використовує гаряче оновлення сервера розробки Vite, тож ви бачите зміни в реальному часі.
:::

## Публікація

Випуски проходять через changesets: для кожної зміни запускайте `yarn changeset` у корені робочого простору, а коли будете готові до випуску, — `yarn publish-all`. Повний процес описано в [Огляді спільних бібліотек](./index.md#releasing-with-changesets).

:::warning
Не видаляйте й не перейменовуйте експорт, доки заміна не буде опублікована і всі споживачі не будуть перенесені. Перед злиттям видалення виконайте пошук по всіх репозиторіях, які використовують цей пакет.
:::

## Пов'язані статті

- **[Helpers](./helpers.md)** — базовий пакет утиліт, який використовується разом з AppHelper
- **[Веб-застосунки](../web-apps/index.md)** — веб-застосунки, які використовують цей пакет
- **[Огляд спільних бібліотек](./index.md)** — налаштування робочого простору, процес випуску та робота з локальними посиланнями
