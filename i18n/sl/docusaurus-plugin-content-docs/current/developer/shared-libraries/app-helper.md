---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Paket `@churchapps/apphelper` vsebuje skupne React komponente in pripomočke za vse spletne aplikacije ChurchApps. Gre za en sam objavljen paket, ki prek podpoti za vstopne točke izpostavlja funkcionalne module -- prijavo, darovanja, obrazce, označevalni jezik (markdown) in funkcionalnost spletišča/CMS -- ter nabor osnovnih skupnih komponent in pripomočkov.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Namestite **Node.js** in **Git** -- glejte [Predpogoji](../setup/prerequisites)
- Seznanite se z nastavitvijo [delovnega prostora Packages](./index.md) in postopkom izdaje

</div>

## Vstopne točke

Paket v svoji datoteki `package.json` določa podpoti za izvoz (subpath exports), zato je vsak funkcionalni modul mogoče uvoziti samostojno:

| Vstopna točka | Vsebina |
|-------------|----------|
| `@churchapps/apphelper` | Osnovne komponente, pripomočki in kljuke (hooks) |
| `@churchapps/apphelper/login` | Uporabniški vmesnik za prijavo in registracijo |
| `@churchapps/apphelper/donations` | Komponente za darovanje in donacije |
| `@churchapps/apphelper/forms` | Komponente za oddajo obrazcev |
| `@churchapps/apphelper/markdown` | Urejevalniki in upodabljalniki za označevalni jezik (markdown) in HTML |
| `@churchapps/apphelper/website` | Komponente za gradnik spletišča in CMS |

## Kdo kaj uporablja

Preden spremenite skupni izvoz, preverite, katere aplikacije ga uvažajo:

| Področje izvoza | Kaj zagotavlja | Uporablja |
|---|---|---|
| Koren -- osnovne komponente in kljuke | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, ter ponovno izvožene pripomočke iz `@churchapps/helpers` (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` itd.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Koren -- glava in sistemska ureditev spletišča | `SiteHeader` (navigacija, uporabniški meni, obvestila) | B1Admin, B1Transfer, LessonsApp |
| Koren -- urejevalniki vsebine za skrbnike | `ImageEditor`, `HelpIcon` | B1Admin |
| Koren -- infrastruktura za sprotne posodobitve | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Koren -- shrambe za klepet in prisotnost | `ConversationStore`, `PresenceStore` | B1App |
| Koren -- uporabniški vmesnik za zapiske in sporočila | `Notes` (interni zapiski o osebah/opravilih); `AddNote`, `SubscriptionToggle` (sporočanje članom) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Koren -- specifično za Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (skupni); `MarkdownPreview`, `HtmlEditor` (urejanje vsebine za skrbnike) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (skupni); `FundDonations` (samo za skrbnike) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (prikaže `ConversationalForm`, kadar je `displayMode` obrazca nastavljen na `conversational`) | B1Admin, B1App |
| `./website` | Jedro za upodabljanje strani, ki ga delita urejevalnik in upodabljalnik (`Element` ter upodabljalniki po vrstah, ki jih razreši `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); pripomočki za celotno spletišče (`AnnouncementBanner`, `Launcher` ter njune pomožne funkcije `parse*Config`); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement`, ki jih uporablja samo upodabljalnik za javnost | B1Admin (urejevalnik), B1App (komponente urejevalnika in upodabljalnik) |

B1Transfer in LessonsApp uporabljata samo vstopni točki za koren in `login` -- podpoti `donations`, `forms` in `website` danes uporabljata izključno B1Admin in B1App.

## Nastavitev za lokalni razvoj

Ta paket se nahaja v [delovnem prostoru Packages](https://github.com/ChurchApps/Packages) skupaj z drugimi skupnimi knjižnicami:

1. Klonirajte delovni prostor:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Namestite odvisnosti v korenu delovnega prostora:

   ```bash
   cd Packages && yarn install
   ```

3. Zaženite peskovnik Vite iz imenika paketa:

   ```bash
   cd apphelper && yarn dev
   ```

   Razvojni strežnik peskovnika se zažene na `http://localhost:3001`. Najprej kopirajte `playground/dotenv.sample` v `playground/.env` in vnesite zahtevane vrednosti.

Za gradnjo paketa za uporabo (prevede v `dist/` in kopira datoteke z jezikovnimi nastavitvami ter CSS) zaženite `yarn workspace @churchapps/apphelper build` -- ali `yarn build` v korenu, da zgradite vse pakete v vrstnem redu odvisnosti. Če želite preizkusiti neobjavljeno gradnjo znotraj uporabljajoče aplikacije, uporabite začasni Yarn portal -- glejte [Lokalni razvoj proti uporabljajoči aplikaciji](./index.md#local-development-against-a-consuming-app).

:::tip
Peskovnik je najhitrejši način za razvoj in preizkušanje komponent AppHelper. Razvojni strežnik Vite samodejno osvežuje stran ob spremembah, zato spremembe vidite takoj.
:::

## Objava

Izdaje potekajo prek changesets: ob vsaki spremembi zaženite `yarn changeset` v korenu delovnega prostora, nato pa, ko ste pripravljeni na izdajo, zaženite `yarn publish-all`. Celoten postopek je opisan v [Pregledu skupnih knjižnic](./index.md#releasing-with-changesets).

:::warning
Izvoza ne odstranjujte in ne preimenujte, dokler zamenjava ni objavljena in vsi uporabniki niso preseljeni -- pred združitvijo odstranitve preverite z iskanjem po vseh uporabljajočih repozitorijih.
:::

## Sorodni članki

- **[Pripomočki](./helpers)** -- Osnovni pripomočki paket, ki se uporablja skupaj z AppHelper
- **[Spletne aplikacije](../web-apps/)** -- Spletne aplikacije, ki uporabljajo ta paket
- **[Pregled skupnih knjižnic](./index.md)** -- Nastavitev delovnega prostora, postopek izdaje in delovni tok lokalnih povezav
