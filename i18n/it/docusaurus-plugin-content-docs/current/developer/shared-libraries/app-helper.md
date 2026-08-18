---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

Il pacchetto `@churchapps/apphelper` fornisce componenti React condivisi e utilità per tutte le applicazioni web ChurchApps. È un unico pacchetto pubblicato che espone moduli di funzionalità tramite punti di ingresso di sottopercorso -- login, donazioni, moduli, markdown e funzionalità di sito web/CMS -- insieme a un set principale di componenti e helper condivisi.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Installa **Node.js** e **Git** -- vedi [Prerequisiti](../setup/prerequisites)
- Familiarizza te stesso con la configurazione dello [spazio di lavoro Packages](./index.md) e il flusso di rilascio

</div>

## Punti di ingresso

Il pacchetto definisce esportazioni di sottopercorso nel suo `package.json`, quindi ogni modulo di funzionalità è importabile da solo:

| Punto di ingresso | Contenuti |
|-------------|----------|
| `@churchapps/apphelper` | Componenti principali, helper e hook |
| `@churchapps/apphelper/login` | UI di login e registrazione |
| `@churchapps/apphelper/donations` | Componenti di donazione |
| `@churchapps/apphelper/forms` | Componenti di invio del modulo |
| `@churchapps/apphelper/markdown` | Editor e renderer Markdown e HTML |
| `@churchapps/apphelper/website` | Componenti di generatore di siti e CMS |

## Chi consuma cosa

Prima di modificare un'esportazione condivisa, controlla quali app la importano:

| Area di esportazione | Cosa fornisce | Consumato da |
|---|---|---|
| Root -- componenti principali e hook | `DisplayBox`, `InputBox`, `Loading`, `PageHeader`, `PersonAvatar`, `SmallButton`, `ErrorMessages`, `ExportLink`, `useMountedState`, più utilità `@churchapps/helpers` ri-esportate (`ApiHelper`, `DateHelper`, `Locale`, `UserHelper`, ecc.) | B1Admin, B1App, B1Transfer, LessonsApp |
| Root -- chrome del sito | `SiteHeader` (navigazione, menu utente, notifiche) | B1Admin, B1Transfer, LessonsApp |
| Root -- editor di contenuti amministrativi | `ImageEditor`, `HelpIcon` | B1Admin |
| Root -- impianto idraulico realtime | `SocketHelper`, `SubscriptionManager`, `NotificationService` | B1Admin, B1App |
| Root -- negozi di chat/presenza | `ConversationStore`, `PresenceStore` | B1App |
| Root -- note e UI di messaging | `Notes` (note del personale su persone/compiti); `AddNote`, `SubscriptionToggle` (messaging dei membri) | B1Admin (`Notes`), B1App (`AddNote`, `SubscriptionToggle`) |
| Root -- specifico di Lessons | `AnalyticsHelper`, `FloatingSupport`, `SupportModal` | LessonsApp |
| `./login` | `LoginPage`, `LogoutPage` | B1Admin, B1App, B1Transfer, LessonsApp |
| `./markdown` | `MarkdownEditor`, `MarkdownPreviewLight` (condiviso); `MarkdownPreview`, `HtmlEditor` (modifica di contenuti amministrativi) | B1Admin, B1App, LessonsApp |
| `./donations` | `MultiGatewayDonationForm`, `RecurringDonations`, `PaymentMethods`, `StripePaymentMethod`, `DonationHelper`/`getPaymentProvider` (condiviso); `FundDonations` (solo amministrativo) | B1Admin, B1App |
| `./forms` | `FormSubmissionEdit` (renderizza `ConversationalForm` quando il `displayMode` del modulo è `conversational`) | B1Admin, B1App |
| `./website` | Nucleo di rendering della pagina condiviso da editor e renderer (`Element` + i renderer per tipo risolti tramite `ElementRegistry`, `StyleHelper`, `DroppableArea`, `DraggableWrapper`, `Theme`, `YoutubeBackground`, `SectionDivider`/`parseDividerConfig`); widget a livello di sito (`AnnouncementBanner`, `Launcher` + i loro helper `parse*Config`); `Animate`, `ElementBlock`, `NonAuthDonationWrapper`, `SermonElement` usati solo dal renderer pubblico | B1Admin (editor), B1App (componenti editor + renderer) |

B1Transfer e LessonsApp utilizzano solo i punti di ingresso root e `login` -- i sottopercorsi `donations`, `forms` e `website` vengono consumati esclusivamente da B1Admin e B1App oggi.

## Setup per lo sviluppo locale

Questo pacchetto vive nello spazio di lavoro [Packages](https://github.com/ChurchApps/Packages) insieme alle altre librerie condivise:

1. Clona lo spazio di lavoro:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Installa le dipendenze nella radice dello spazio di lavoro:

   ```bash
   cd Packages && yarn install
   ```

3. Avvia il playground Vite dalla directory del pacchetto:

   ```bash
   cd apphelper && yarn dev
   ```

   Il server dev del playground inizia su `http://localhost:3001`. Copia `playground/dotenv.sample` in `playground/.env` e riempi prima i valori richiesti.

Per costruire il pacchetto per il consumo (compila in `dist/` e copia asset locale/CSS), esegui `yarn workspace @churchapps/apphelper build` -- o `yarn build` alla radice per costruire ogni pacchetto in ordine di dipendenza. Per testare una costruzione non pubblicata dentro un'app di consumo, usa un portale Yarn temporaneo -- vedi [Sviluppo locale rispetto a un'app di consumo](./index.md#local-development-against-a-consuming-app).

:::tip
Il playground è il modo più veloce per sviluppare e testare i componenti AppHelper. Ricarica a caldo il server dev Vite in modo da poter vedere i cambiamenti in tempo reale.
:::

## Pubblicazione

I rilasci vanno attraverso i changesets: esegui `yarn changeset` alla radice dello spazio di lavoro con ogni cambiamento, quindi `yarn publish-all` quando sei pronto a rilasciare. Vedi [Panoramica delle librerie condivise](./index.md#releasing-with-changesets) per il flusso completo.

:::warning
Non rimuovere o rinominare mai un'esportazione finché la sostituzione non è pubblicata e ogni consumer non è stato migrato -- grep tutti i repository di consumo prima di unire una rimozione.
:::

## Articoli correlati

- **[Helpers](./helpers)** -- Il pacchetto di utilità di base utilizzato insieme ad AppHelper
- **[App Web](../web-apps/)** -- Le applicazioni web che consumono questo pacchetto
- **[Panoramica delle librerie condivise](./index.md)** -- Setup dello spazio di lavoro, flusso di rilascio e flusso di link locale
