---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Il pacchetto `@churchapps/apphelper` fornisce componenti React e utilità condivise per tutte le applicazioni web di ChurchApps. È un unico pacchetto pubblicato che espone moduli funzionali tramite entry point subpath -- login, donazioni, moduli, markdown e funzionalità sito web/CMS -- insieme a un set di componenti e helper condivisi principali.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Installa **Node.js** e **Git** -- vedi [Prerequisiti](../setup/prerequisites)
- Familiarizza con la configurazione del [workspace Packages](./index.md) e il flusso di rilascio

</div>

## Entry Point

Il pacchetto definisce export subpath nel suo `package.json`, così ogni modulo funzionale è importabile singolarmente:

| Entry point | Contenuto |
|-------------|----------|
| `@churchapps/apphelper` | Componenti, helper e hook principali |
| `@churchapps/apphelper/login` | UI di login e registrazione |
| `@churchapps/apphelper/donations` | Componenti per donazioni e offerte |
| `@churchapps/apphelper/forms` | Componenti per l'invio di moduli |
| `@churchapps/apphelper/markdown` | Editor e renderer markdown e HTML |
| `@churchapps/apphelper/website` | Componenti del website builder e del CMS |

## Chi Consuma Cosa

Prima di modificare un export condiviso, controlla quali app lo importano:

| Area di export | Cosa fornisce | Consumato da |
|---|---|---|
| Root -- componenti e hook principali | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, più le utilità `@churchapps/helpers` ri-esportate (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, ecc.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root -- chrome del sito | `SiteHeader` (navigazione, menu utente, notifiche) | B1Admin, B1Transfer, LessonsApp |
| Root -- editor di contenuti admin | `ImageEditor`, `HelpIcon` | B1Admin |
| Root -- infrastruttura realtime | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root -- store chat/presenza | `ConversationStore`, `PresenceStore` | B1App |
| Root -- UI note e messaggistica | `Notes` (note dello staff su persone/attività); `AddNote`, `SubscriptionToggle` (messaggistica dei membri) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root -- specifico di Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (condivisi); `MarkdownPreview`, `HtmlEditor` (editing di contenuti admin) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (condivisi); `FundDonations` (solo admin) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (renderizza `ConversationalForm` quando il `displayMode` del modulo è `conversational`) | B1Admin, B1App |
| `./website` | Nucleo di rendering delle pagine condiviso dall'editor e dal renderer (`Element` + i renderer per tipo risolti tramite `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); widget a livello di sito (`AnnouncementBanner`, `Launcher` + i loro helper `parse*Config`); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` usati solo dal renderer rivolto al pubblico | B1Admin (editor), B1App (componenti editor + renderer) |

B1Transfer e LessonsApp usano solo gli entry point root e `login` -- i subpath `donations`, `forms` e `website` sono consumati esclusivamente da B1Admin e B1App oggi.

## Configurazione per lo Sviluppo Locale

Questo pacchetto risiede nel workspace [Packages](https://github.com/ChurchApps/Packages) insieme alle altre librerie condivise:

1. Clona il workspace:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installa le dipendenze alla root del workspace:

   ```bash
   cd Packages && yarn install
   ```

3. Avvia il playground Vite dalla directory del pacchetto:

   ```bash
   cd apphelper && yarn dev
   ```

   Il server di sviluppo del playground si avvia su `http://localhost:3001`. Copia prima `playground/dotenv.sample` in `playground/.env` e compila i valori richiesti.

Per compilare il pacchetto per il consumo (compila in `dist/` e copia gli asset locale/CSS), esegui `yarn workspace @churchapps/apphelper build` -- oppure `yarn build` alla root per compilare ogni pacchetto nell'ordine di dipendenza. Per testare una build non pubblicata all'interno di un'app consumatrice, usa un portale Yarn temporaneo -- vedi [Sviluppo Locale contro un'App Consumatrice](./index.md#local-development-against-a-consuming-app).

:::tip
Il playground è il modo più rapido per sviluppare e testare i componenti di AppHelper. Esegue il ricaricamento a caldo del server di sviluppo Vite in modo da poter vedere le modifiche in tempo reale.
:::

## Pubblicazione

I rilasci passano attraverso changesets: esegui `yarn changeset` alla root del workspace ad ogni modifica, poi `yarn publish-all` quando sei pronto per il rilascio. Vedi la [Panoramica delle Librerie Condivise](./index.md#releasing-with-changesets) per il flusso completo.

:::warning
Non rimuovere né rinominare mai un export finché la sostituzione non è pubblicata e ogni consumatore non è stato migrato -- fai un grep di tutti i repository consumatori prima di unire una rimozione.
:::

## Articoli Correlati

- **[Helpers](./helpers)** -- Il pacchetto di utilità base usato insieme ad AppHelper
- **[Applicazioni Web](../web-apps/)** -- Le applicazioni web che consumano questo pacchetto
- **[Panoramica delle Librerie Condivise](./index.md)** -- Configurazione del workspace, flusso di rilascio e workflow di link locale
