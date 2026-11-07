---
title: "AppHelper"
description: "Referință pentru @churchapps/apphelper (Packages): punctele de intrare, aplicațiile care folosesc fiecare export și pașii de dezvoltare locală și publicare."
---

# AppHelper

<div class="article-intro">

Pachetul `@churchapps/apphelper` oferă componente React și utilitare comune pentru toate aplicațiile web ChurchApps. Este un singur pachet publicat, care expune module de funcționalități prin puncte de intrare de tip subcale -- autentificare, donații, formulare, markdown și funcționalitate pentru site-uri web/CMS -- alături de un set de bază de componente și funcții utilitare comune.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Instalați **Node.js** și **Git** -- consultați [Cerințe preliminare](../setup/prerequisites.md)
- Familiarizați-vă cu configurarea [spațiului de lucru Packages](./index.md) și cu fluxul de lansare

</div>

## Puncte de intrare

Pachetul definește exporturi de tip subcale în fișierul său `package.json`, astfel încât fiecare modul de funcționalități poate fi importat independent:

| Punct de intrare | Conținut |
|-------------|----------|
| `@churchapps/apphelper` | Componente, funcții utilitare și hook-uri de bază |
| `@churchapps/apphelper/login` | Interfața de autentificare și înregistrare |
| `@churchapps/apphelper/donations` | Componente pentru ofrande și donații |
| `@churchapps/apphelper/forms` | Componente pentru trimiterea formularelor |
| `@churchapps/apphelper/markdown` | Editoare și redatoare pentru Markdown și HTML |
| `@churchapps/apphelper/website` | Componente pentru constructorul de site-uri și CMS |

## Cine folosește ce

Înainte de a modifica un export comun, verificați ce aplicații îl importă:

| Zona de export | Ce oferă | Folosit de |
|---|---|---|
| Rădăcină -- componente de bază și hook-uri | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, plus utilitarele re-exportate din `@churchapps/helpers` (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper` etc.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Rădăcină -- structura site-ului | `SiteHeader` (navigare, meniu utilizator, notificări) | B1Admin, B1Transfer, LessonsApp |
| Rădăcină -- editoare de conținut pentru administrare | `ImageEditor`, `HelpIcon` | B1Admin |
| Rădăcină -- infrastructura în timp real | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Rădăcină -- depozite de chat/prezență | `ConversationStore`, `PresenceStore` | B1App |
| Rădăcină -- note și interfața de mesagerie | `Notes` (note ale personalului despre persoane/sarcini); `AddNote`, `SubscriptionToggle` (mesagerie pentru membri) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Rădăcină -- specifice Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (comune); `MarkdownPreview`, `HtmlEditor` (editarea conținutului în administrare) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (comune); `FundDonations` (doar pentru administrare) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (afișează `ConversationalForm` atunci când `displayMode` al formularului este `conversational`) | B1Admin, B1App |
| `./website` | Nucleul de randare a paginilor, comun editorului și redatorului (`Element` + redatorii pe tip, rezolvați prin `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); widget-uri la nivel de site (`AnnouncementBanner`, `Launcher` + funcțiile lor de analiză `parse*Config`); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` folosite doar de redatorul public | B1Admin (editor), B1App (componente de editor + redator) |

B1Transfer și LessonsApp folosesc doar punctele de intrare rădăcină și `login` -- subcalele `donations`, `forms` și `website` sunt folosite exclusiv de B1Admin și B1App în prezent.

## Configurarea pentru dezvoltare locală

Acest pachet se află în spațiul de lucru [Packages](https://github.com/ChurchApps/Packages), alături de celelalte biblioteci comune:

1. Clonați spațiul de lucru:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Instalați dependențele în rădăcina spațiului de lucru:

   ```bash
   cd Packages && yarn install
   ```

3. Lansați playground-ul Vite din directorul pachetului:

   ```bash
   cd apphelper && yarn dev
   ```

   Serverul de dezvoltare al playground-ului pornește la adresa `http://localhost:3001`. Copiați mai întâi `playground/dotenv.sample` în `playground/.env` și completați valorile necesare.

Pentru a compila pachetul pentru utilizare (rezultatul se generează în `dist/` și se copiază resursele de localizare și CSS), rulați `yarn workspace @churchapps/apphelper build` -- sau `yarn build` în rădăcină pentru a compila fiecare pachet în ordinea dependențelor. Pentru a testa o versiune nepublicată într-o aplicație care îl folosește, utilizați un portal Yarn temporar -- consultați [Dezvoltarea locală cu o aplicație consumatoare](./index.md#local-development-against-a-consuming-app).

:::tip
Playground-ul este cea mai rapidă cale pentru a dezvolta și testa componentele AppHelper. Serverul de dezvoltare Vite se reîncarcă automat, astfel încât puteți vedea modificările în timp real.
:::

## Publicarea

Lansările se fac prin changesets: rulați `yarn changeset` în rădăcina spațiului de lucru pentru fiecare modificare, apoi `yarn publish-all` atunci când sunteți pregătiți să lansați. Consultați [Prezentarea generală a bibliotecilor comune](./index.md#releasing-with-changesets) pentru fluxul complet.

:::warning
Nu eliminați și nu redenumiți niciodată un export până când înlocuitorul nu este publicat și fiecare consumator nu a fost migrat -- căutați în toate depozitele consumatoare înainte de a îmbina o eliminare.
:::

## Articole înrudite

- **[Helpers](./helpers.md)** -- Pachetul de bază de funcții utilitare folosit alături de AppHelper
- **[Aplicații web](../web-apps/index.md)** -- Aplicațiile web care folosesc acest pachet
- **[Prezentarea generală a bibliotecilor comune](./index.md)** -- Configurarea spațiului de lucru, fluxul de lansare și fluxul de legare locală
