---
title: "AppHelper"
description: "A @churchapps/apphelper megosztott csomag referenciája: alútvonalak, az egyes exportokat használó alkalmazások, helyi fejlesztés és közzététel."
---

# AppHelper

<div class="article-intro">

A `@churchapps/apphelper` csomag megosztott React-komponenseket és segédfunkciókat biztosít minden ChurchApps webalkalmazás számára. Ez egyetlen közzétett csomag, amely az alcsomag-belépési pontokon keresztül teszi elérhetővé a funkciómodulokat – bejelentkezés, adományozás, űrlapok, markdown és webhely/CMS-funkciók –, a magkészlet megosztott komponenseivel és segédfüggvényeivel együtt.

</div>

<div class="prereqs">
<h4>Mielőtt elkezdi</h4>

- Telepítse a **Node.js**-t és a **Git**-et – lásd: [Előfeltételek](../setup/prerequisites.md)
- Ismerkedjen meg a [Packages munkaterület](./index.md) beállításával és a kiadási folyamattal

</div>

## Belépési pontok

A csomag a `package.json` fájljában alcsomag-exportokat határoz meg, így minden funkciómodul önállóan importálható:

| Belépési pont | Tartalom |
|-------------|----------|
| `@churchapps/apphelper` | Alapvető komponensek, segédfüggvények és hook-ok |
| `@churchapps/apphelper/login` | Bejelentkezési és regisztrációs felület |
| `@churchapps/apphelper/donations` | Adakozási és adományozási komponensek |
| `@churchapps/apphelper/forms` | Űrlapbeküldési komponensek |
| `@churchapps/apphelper/markdown` | Markdown- és HTML-szerkesztők és -megjelenítők |
| `@churchapps/apphelper/website` | Webhelyszerkesztő és CMS-komponensek |

## Ki mit használ

Egy megosztott export módosítása előtt ellenőrizze, mely alkalmazások importálják azt:

| Exportterület | Mit biztosít | Használja |
|---|---|---|
| Gyökér – alapvető komponensek és hook-ok | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, valamint a továbbexportált `@churchapps/helpers` segédfüggvények (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` stb.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Gyökér – webhely-keret | `SiteHeader` (navigáció, felhasználói menü, értesítések) | B1Admin, B1Transfer, LessonsApp |
| Gyökér – adminisztrációs tartalomszerkesztők | `ImageEditor`, `HelpIcon` | B1Admin |
| Gyökér – valós idejű infrastruktúra | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Gyökér – csevegési/jelenléti tárolók | `ConversationStore`, `PresenceStore` | B1App |
| Gyökér – jegyzetek és üzenetküldő felület | `Notes` (munkatársi jegyzetek személyekről/feladatokról); `AddNote`, `SubscriptionToggle` (tagok üzenetküldése) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Gyökér – Lessons-specifikus | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (megosztott); `MarkdownPreview`, `HtmlEditor` (adminisztrációs tartalomszerkesztés) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (megosztott); `FundDonations` (csak adminisztrátori) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (a `ConversationalForm`-ot jeleníti meg, ha az űrlap `displayMode` értéke `conversational`) | B1Admin, B1App |
| `./website` | A szerkesztő és a megjelenítő által közösen használt oldalmegjelenítő mag (`Element` + a `ElementRegistry`-n keresztül feloldott típusonkénti megjelenítők, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); webhelyszintű widgetek (`AnnouncementBanner`, `Launcher` és a hozzájuk tartozó `parse*Config` segédfüggvények); az `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` kizárólag a nyilvános megjelenítő használja | B1Admin (szerkesztő), B1App (szerkesztőkomponensek + megjelenítő) |

A B1Transfer és a LessonsApp csak a gyökér- és a `login` belépési pontot használja – a `donations`, `forms` és `website` alcsomagokat jelenleg kizárólag a B1Admin és a B1App használja.

## Helyi fejlesztési környezet beállítása

Ez a csomag a [Packages](https://github.com/ChurchApps/Packages) munkaterületen található a többi megosztott könyvtárral együtt:

1. Klónozza a munkaterületet:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Telepítse a függőségeket a munkaterület gyökerében:

   ```bash
   cd Packages && yarn install
   ```

3. Indítsa el a Vite-játszóteret a csomagkönyvtárból:

   ```bash
   cd apphelper && yarn dev
   ```

   A játszótér fejlesztői kiszolgálója a `http://localhost:3001` címen indul. Először másolja a `playground/dotenv.sample` fájlt `playground/.env` néven, és töltse ki a szükséges értékeket.

A csomag felhasználásra kész buildjének elkészítéséhez (a `dist/` mappába fordít, és másolja a nyelvi és CSS-eszközöket) futtassa a `yarn workspace @churchapps/apphelper build` parancsot – vagy a gyökérben a `yarn build` parancsot, amely függőségi sorrendben minden csomagot felépít. Egy nem közzétett build fogyasztó alkalmazáson belüli teszteléséhez használjon ideiglenes Yarn portált – lásd: [Helyi fejlesztés egy fogyasztó alkalmazással](./index.md#local-development-against-a-consuming-app).

:::tip
A játszótér a leggyorsabb módja az AppHelper-komponensek fejlesztésének és tesztelésének. A Vite fejlesztői szerver élő újratöltést (hot reload) végez, így a változtatásokat valós időben láthatja.
:::

## Közzététel

A kiadások changeset-eken keresztül történnek: minden változtatással futtassa a `yarn changeset` parancsot a munkaterület gyökerében, majd a kiadás előtt a `yarn publish-all` parancsot. A teljes folyamatért lásd: [Megosztott könyvtárak áttekintése](./index.md#releasing-with-changesets).

:::warning
Ne távolítson el és ne nevezzen át exportot addig, amíg a helyettesítő nincs közzétéve, és minden fogyasztó át nem lett állítva – összevonás előtt keressen rá minden fogyasztó repositoryban.
:::

## Kapcsolódó cikkek

- **[Segédfüggvények](./helpers.md)** – Az AppHelperrel együtt használt alapvető segédcsomag
- **[Webalkalmazások](../web-apps/index.md)** – Az ezt a csomagot használó webalkalmazások
- **[Megosztott könyvtárak áttekintése](./index.md)** – Munkaterület-beállítás, kiadási folyamat és a helyi linkelési munkafolyamat
