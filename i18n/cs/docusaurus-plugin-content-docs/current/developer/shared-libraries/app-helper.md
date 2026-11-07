---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Balíček `@churchapps/apphelper` poskytuje sdílené React komponenty a pomocné funkce pro všechny webové aplikace ChurchApps. Je to jediný publikovaný balíček, který zpřístupňuje funkční moduly přes podcesty vstupních bodů -- přihlášení, dary, formuláře, Markdown a funkce webu/CMS -- a vedle nich nabízí základní sadu sdílených komponent a pomocných funkcí.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Nainstalujte **Node.js** a **Git** -- viz [Předpoklady](../setup/prerequisites)
- Seznamte se s nastavením [pracovního prostoru Packages](./index.md) a postupem vydávání

</div>

## Vstupní body

Balíček definuje podcesty exportů ve svém `package.json`, takže každý funkční modul lze importovat samostatně:

| Vstupní bod | Obsah |
|-------------|----------|
| `@churchapps/apphelper` | Základní komponenty, pomocné funkce a hooky |
| `@churchapps/apphelper/login` | Uživatelské rozhraní pro přihlášení a registraci |
| `@churchapps/apphelper/donations` | Komponenty pro dary a příspěvky |
| `@churchapps/apphelper/forms` | Komponenty pro odesílání formulářů |
| `@churchapps/apphelper/markdown` | Editory a renderery pro Markdown a HTML |
| `@churchapps/apphelper/website` | Komponenty tvorby webu a CMS |

## Kdo co používá

Než změníte sdílený export, zkontrolujte, které aplikace jej importují:

| Oblast exportu | Co poskytuje | Používá |
|---|---|---|
| Kořen -- základní komponenty a hooky | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, a dále znovu exportované pomocné funkce z `@churchapps/helpers` (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` atd.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Kořen -- rámec webu | `SiteHeader` (navigace, uživatelská nabídka, oznámení) | B1Admin, B1Transfer, LessonsApp |
| Kořen -- editory obsahu pro administraci | `ImageEditor`, `HelpIcon` | B1Admin |
| Kořen -- infrastruktura v reálném čase | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Kořen -- úložiště chatu a přítomnosti | `ConversationStore`, `PresenceStore` | B1App |
| Kořen -- UI poznámek a zpráv | `Notes` (interní poznámky k osobám a úkolům); `AddNote`, `SubscriptionToggle` (zprávy členům) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Kořen -- specifické pro Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (sdílené); `MarkdownPreview`, `HtmlEditor` (úprava obsahu v administraci) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (sdílené); `FundDonations` (pouze administrace) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (vykresluje `ConversationalForm`, když je `displayMode` formuláře `conversational`) | B1Admin, B1App |
| `./website` | Jádro vykreslování stránek sdílené editorem a rendererem (`Element` a renderery jednotlivých typů určené přes `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); widgety pro celý web (`AnnouncementBanner`, `Launcher` a jejich pomocné funkce `parse*Config`); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` používané pouze veřejným rendererem | B1Admin (editor), B1App (komponenty editoru a renderer) |

Aplikace B1Transfer a LessonsApp používají pouze kořenový vstupní bod a `login` -- podcesty `donations`, `forms` a `website` dnes využívají výhradně B1Admin a B1App.

## Nastavení pro lokální vývoj

Tento balíček je součástí pracovního prostoru [Packages](https://github.com/ChurchApps/Packages) spolu s ostatními sdílenými knihovnami:

1. Naklonujte pracovní prostor:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Nainstalujte závislosti v kořenovém adresáři pracovního prostoru:

   ```bash
   cd Packages && yarn install
   ```

3. Spusťte Vite playground z adresáře balíčku:

   ```bash
   cd apphelper && yarn dev
   ```

   Vývojový server playground se spustí na `http://localhost:3001`. Nejprve zkopírujte `playground/dotenv.sample` do `playground/.env` a vyplňte požadované hodnoty.

Pro sestavení balíčku k použití (kompiluje do `dist/` a kopíruje lokalizační soubory a CSS) spusťte `yarn workspace @churchapps/apphelper build` -- nebo `yarn build` v kořenovém adresáři, které sestaví všechny balíčky v pořadí podle závislostí. Pro testování nepublikovaného sestavení uvnitř aplikace, která balíček používá, použijte dočasný Yarn portal -- viz [Lokální vývoj proti aplikaci, která balíček používá](./index.md#local-development-against-a-consuming-app).

:::tip
Playground je nejrychlejší způsob, jak vyvíjet a testovat komponenty AppHelper. Využívá hot-reload vývojového serveru Vite, takže změny uvidíte v reálném čase.
:::

## Publikování

Vydání probíhají přes changesets: u každé změny spusťte v kořenovém adresáři pracovního prostoru `yarn changeset` a až budete připraveni vydat, spusťte `yarn publish-all`. Úplný postup najdete v [Přehledu sdílených knihoven](./index.md#releasing-with-changesets).

:::warning
Export nikdy neodstraňujte ani nepřejmenovávejte, dokud není nahrazení publikováno a všichni uživatelé přesunuti -- před sloučením odstranění prohledejte všechny repozitáře, které balíček používají (grep).
:::

## Související články

- **[Helpers](./helpers)** -- Základní balíček pomocných funkcí, který se používá spolu s AppHelper
- **[Webové aplikace](../web-apps/)** -- Webové aplikace, které tento balíček používají
- **[Přehled sdílených knihoven](./index.md)** -- Nastavení pracovního prostoru, postup vydání a práce s lokálními odkazy
