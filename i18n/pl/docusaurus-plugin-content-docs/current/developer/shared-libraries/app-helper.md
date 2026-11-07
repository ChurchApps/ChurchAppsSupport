---
title: "AppHelper"
description: "Dokumentacja pakietu @churchapps/apphelper (workspace Packages): punkty wejścia podścieżek, aplikacje używające eksportów oraz lokalny rozwój i publikacja."
---

# AppHelper

<div class="article-intro">

Pakiet `@churchapps/apphelper` udostępnia współdzielone komponenty React i narzędzia dla wszystkich webowych aplikacji ChurchApps. To jeden opublikowany pakiet, który udostępnia moduły funkcjonalne przez punkty wejścia podścieżek -- logowanie, darowizny, formularze, markdown oraz funkcje witryny/CMS -- a obok nich podstawowy zestaw wspólnych komponentów i pomocniczych funkcji.

</div>

<div class="prereqs">
<h4>Zanim zaczniesz</h4>

- Zainstaluj **Node.js** i **Git** -- zobacz [Wymagania wstępne](../setup/prerequisites.md)
- Zapoznaj się z konfiguracją [obszaru roboczego Packages](./index.md) oraz procesem wydawania wersji

</div>

## Punkty wejścia

Pakiet definiuje eksporty podścieżek w swoim `package.json`, dzięki czemu każdy moduł funkcjonalny można zaimportować osobno:

| Punkt wejścia | Zawartość |
|-------------|----------|
| `@churchapps/apphelper` | Podstawowe komponenty, funkcje pomocnicze i hooki |
| `@churchapps/apphelper/login` | Interfejs logowania i rejestracji |
| `@churchapps/apphelper/donations` | Komponenty darowizn i dawania |
| `@churchapps/apphelper/forms` | Komponenty przesyłania formularzy |
| `@churchapps/apphelper/markdown` | Edytory i renderery Markdown oraz HTML |
| `@churchapps/apphelper/website` | Komponenty kreatora witryn i CMS |

## Kto z czego korzysta

Przed zmianą współdzielonego eksportu sprawdź, które aplikacje go importują:

| Obszar eksportu | Co udostępnia | Używany przez |
|---|---|---|
| Główny -- podstawowe komponenty i hooki | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, a także ponownie eksportowane narzędzia z `@churchapps/helpers` (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` itd.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Główny -- elementy wspólne witryny | `SiteHeader` (nawigacja, menu użytkownika, powiadomienia) | B1Admin, B1Transfer, LessonsApp |
| Główny -- edytory treści administracyjnych | `ImageEditor`, `HelpIcon` | B1Admin |
| Główny -- infrastruktura czasu rzeczywistego | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Główny -- magazyny czatu i obecności | `ConversationStore`, `PresenceStore` | B1App |
| Główny -- interfejs notatek i wiadomości | `Notes` (notatki personelu o osobach/zadaniach); `AddNote`, `SubscriptionToggle` (wiadomości do członków) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Główny -- specyficzne dla Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (wspólne); `MarkdownPreview`, `HtmlEditor` (edycja treści administracyjnych) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (wspólne); `FundDonations` (tylko administracja) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (renderuje `ConversationalForm`, gdy `displayMode` formularza ma wartość `conversational`) | B1Admin, B1App |
| `./website` | Główny kod renderowania stron, wspólny dla edytora i renderera (`Element` oraz renderery poszczególnych typów rozpoznawane przez `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); widżety całej witryny (`AnnouncementBanner`, `Launcher` oraz ich funkcje pomocnicze `parse*Config`); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` używane wyłącznie przez renderer publiczny | B1Admin (edytor), B1App (komponenty edytora + renderer) |

B1Transfer i LessonsApp korzystają wyłącznie z punktów wejścia głównego i `login` -- podścieżki `donations`, `forms` i `website` są obecnie używane wyłącznie przez B1Admin i B1App.

## Konfiguracja lokalnego środowiska programistycznego

Ten pakiet znajduje się w obszarze roboczym [Packages](https://github.com/ChurchApps/Packages), obok innych bibliotek współdzielonych:

1. Sklonuj obszar roboczy:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Zainstaluj zależności w katalogu głównym obszaru roboczego:

   ```bash
   cd Packages && yarn install
   ```

3. Uruchom playground Vite z katalogu pakietu:

   ```bash
   cd apphelper && yarn dev
   ```

   Serwer deweloperski playground startuje pod adresem `http://localhost:3001`. Najpierw skopiuj `playground/dotenv.sample` do `playground/.env` i uzupełnij wymagane wartości.

Aby zbudować pakiet do użycia (kompilacja do `dist/` oraz skopiowanie zasobów locale i CSS), uruchom `yarn workspace @churchapps/apphelper build` -- lub `yarn build` w katalogu głównym, aby zbudować wszystkie pakiety w kolejności zależności. Aby przetestować niepublikowaną wersję wewnątrz aplikacji korzystającej z pakietu, użyj tymczasowego portalu Yarn -- zobacz [Lokalny rozwój względem aplikacji korzystającej z pakietu](./index.md#local-development-against-a-consuming-app).

:::tip
Playground to najszybszy sposób na rozwijanie i testowanie komponentów AppHelper. Serwer deweloperski Vite przeładowuje go na bieżąco, dzięki czemu zmiany widać od razu.
:::

## Publikowanie

Wydania przechodzą przez changesets: przy każdej zmianie uruchom `yarn changeset` w katalogu głównym obszaru roboczego, a gdy będziesz gotowy do wydania, uruchom `yarn publish-all`. Pełny proces opisano w [Przeglądzie bibliotek współdzielonych](./index.md#releasing-with-changesets).

:::warning
Nigdy nie usuwaj ani nie zmieniaj nazwy eksportu, dopóki zamiennik nie zostanie opublikowany, a wszystkie aplikacje korzystające z niego nie zostaną zmigrowane -- przed scaleniem usunięcia przeszukaj wszystkie repozytoria, które go używają.
:::

## Powiązane artykuły

- **[Helpers](./helpers.md)** -- Podstawowy pakiet narzędzi używany razem z AppHelper
- **[Aplikacje webowe](../web-apps/index.md)** -- Aplikacje webowe korzystające z tego pakietu
- **[Przegląd bibliotek współdzielonych](./index.md)** -- Konfiguracja obszaru roboczego, proces wydawania i przepływ pracy z lokalnym linkowaniem
