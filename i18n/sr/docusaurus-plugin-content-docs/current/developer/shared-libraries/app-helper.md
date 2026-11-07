---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Пакет `@churchapps/apphelper` пружа дељене React компоненте и помоћне функције за све ChurchApps веб апликације. То је један објављени пакет који кроз подпутање за улазне тачке излаже функционалне модуле -- пријаву, донације, обрасце, markdown и функционалност веб-сајта/CMS-а -- уз скуп основних дељених компоненти и помоћних функција.

</div>

<div class="prereqs">
<h4>Пре почетка</h4>

- Инсталирајте **Node.js** и **Git** -- погледајте [Предуслови](../setup/prerequisites)
- Упознајте се са подешавањем [радног простора Packages](./index.md) и током објављивања

</div>

## Улазne тачке

Пакет у свом `package.json` фајлу дефинише подпутање за извоз, тако да се сваки функционални модул може увести засебно:

| Улазна тачка | Садржај |
|-------------|----------|
| `@churchapps/apphelper` | Основне компоненте, помоћне функције и hook-ови |
| `@churchapps/apphelper/login` | Кориснички интерфејс за пријаву и регистрацију |
| `@churchapps/apphelper/donations` | Компоненте за давања и донације |
| `@churchapps/apphelper/forms` | Компоненте за слање образаца |
| `@churchapps/apphelper/markdown` | Markdown и HTML уређивачи и приказивачи |
| `@churchapps/apphelper/website` | Компоненте градитеља веб-сајтова и CMS-а |

## Ко шта користи

Пре измене дељеног извоза, проверите које апликације га увозе:

| Област извоза | Шта пружа | Користе |
|---|---|---|
| Root -- основне компоненте и hook-ови | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, као и реекспортоване помоћне функције из `@churchapps/helpers` (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` итд.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root -- chrome сајта | `SiteHeader` (навигација, кориснички мени, обавештења) | B1Admin, B1Transfer, LessonsApp |
| Root -- уређивачи административног садржаја | `ImageEditor`, `HelpIcon` | B1Admin |
| Root -- инфраструктура за реално време | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root -- складишта за ћаскање и присуство | `ConversationStore`, `PresenceStore` | B1App |
| Root -- белешке и интерфејс за поруке | `Notes` (интерне белешке о особама/задацима); `AddNote`, `SubscriptionToggle` (поруке за чланове) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root -- специфично за Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (дељене); `MarkdownPreview`, `HtmlEditor` (уређивање административног садржаја) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (дељене); `FundDonations` (само административно) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (приказује `ConversationalForm` када је `displayMode` обрасца `conversational`) | B1Admin, B1App |
| `./website` | Основа за приказ странica коју деле уређивач и приказивач (`Element` и рендерери по типу које разрешава `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); виџети за цео сајт (`AnnouncementBanner`, `Launcher` и њихови помоћници `parse*Config`); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` које користи само јавни приказивач | B1Admin (уређивач), B1App (компоненте уређивача и приказивач) |

B1Transfer и LessonsApp користе само root и `login` улазне тачке -- подпутање `donations`, `forms` и `website` тренутно користе искључиво B1Admin и B1App.

## Подешавање за локални развој

Овај пакет се налази у [Packages](https://github.com/ChurchApps/Packages) радном простору, заједно са другим дељеним библиотекама:

1. Клонирајте радни простор:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Инсталирајте зависности у корену радног простора:

   ```bash
   cd Packages && yarn install
   ```

3. Покрените Vite playground из директоријума пакета:

   ```bash
   cd apphelper && yarn dev
   ```

   Развојни сервер playground-а се покреће на `http://localhost:3001`. Прво копирајте `playground/dotenv.sample` у `playground/.env` и попуните потребне вредности.

Да бисте изградили пакет за коришћење (компајлира у `dist/` и копира locale/CSS ресурсе), покрените `yarn workspace @churchapps/apphelper build` -- или `yarn build` у корену да бисте изградили све пакете по редоследу зависности. Да бисте тестирали необјављену верзију унутар апликације која га користи, користите привремени Yarn portal -- погледајте [Локални развој против апликације која користи пакет](./index.md#local-development-against-a-consuming-app).

:::tip
Playground је најбржи начин за развој и тестирање AppHelper компоненти. Vite развојни сервер се аутоматски освежава, па промене видите одмах.
:::

## Објављивање

Издања иду кроз changesets: покрените `yarn changeset` у корену радног простора уз сваку измену, а затим `yarn publish-all` када будете спремни за издање. Погледајте [Преглед дељених библиотека](./index.md#releasing-with-changesets) за цео ток.

:::warning
Никада не уклањајте нити преименујте извоз док замена није објављена и док сви корисници нису прешли на њу -- претражите све апликације које користе пакет пре спајања уклањања.
:::

## Повезани чланци

- **[Helpers](./helpers)** -- Основни пакет помоћних функција који се користи уз AppHelper
- **[Web Apps](../web-apps/)** -- Веб апликације које користе овај пакет
- **[Преглед дељених библиотека](./index.md)** -- Подешавање радног простора, ток објављивања и workflow за локално повезивање
