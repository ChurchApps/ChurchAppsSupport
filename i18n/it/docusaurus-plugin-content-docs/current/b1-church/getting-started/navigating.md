---
title: "Navigare in B1App"
---

# Navigare in B1App {#navigating-b1app}

<div class="article-intro">

Il portale dei membri di B1.church è un'app web pensata per il telefono che si trova sotto `/mobile`. Funziona in qualsiasi browser e può essere installata nella schermata Home del dispositivo. Questa pagina spiega la dashboard Home, la barra delle schede in basso, la pagina Altro e la pagina Io.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Devi [aver effettuato l'accesso](./logging-in.md) per vedere le tue informazioni personali. I visitatori non autenticati possono comunque consultare i contenuti pubblici e, dove una funzione richiede un account, viene mostrato un pulsante **Accedi**.

</div>

## Home {#home}

Aprendo `https://nomedellatuachiesa.b1.church/mobile` si arriva alla dashboard **Home** all'indirizzo `/mobile/dashboard`. Home è la pagina iniziale del portale dei membri. Si apre con un saluto ("Buongiorno", "Buon pomeriggio" o "Buonasera" seguito dal tuo nome) e la data di oggi, seguiti da sezioni che compaiono solo quando sono pertinenti:

- **Riquadri con foto** -- le schede a cui la tua chiesa ha assegnato una foto (incluso il Versetto del giorno) compaiono come riquadri con foto sotto il nome della chiesa. A seconda della scelta della chiesa, sono disposti in una griglia a due colonne, in una riga da scorrere lateralmente o in un elenco con una piccola miniatura accanto a ciascun nome -- vedi [Riquadri della schermata Home](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Ogni scheda con foto appare qui, anche quella che ha anche uno spazio nella barra delle schede.
- **Ultimo sermone** -- il sermone più recente della tua chiesa, con il link **Tutti i sermoni**
- **Versetto del giorno** -- il versetto di oggi; toccalo per aprire la pagina completa del [Versetto del giorno](../content/verse-of-the-day.md)
- **Stai servendo** -- i tuoi prossimi incarichi di servizio, con il link **Tutti i piani**. Se un incarico richiede ancora una tua risposta, questi compaiono per primi con l'etichetta **Richiede risposta** e i pulsanti **Accetta** / **Rifiuta**, così puoi rispondere direttamente dalla Home (**Rifiuta** ti chiede prima una conferma); altrimenti i tuoi prossimi incarichi mostrano un'etichetta **Accettato** o **Confermato**. Tocca un incarico per aprire il suo piano.
- **I tuoi gruppi** -- fino a tre dei tuoi gruppi con l'orario e il luogo di incontro, e il link **Tutti i gruppi**
- **Prossimi eventi** -- quando hai effettuato l'accesso, i prossimi tre eventi dei gruppi di cui fai parte, ciascuno con data e ora (e una miniatura se l'evento ha una foto). Tocca un evento per aprire gli eventi del suo gruppo. Tocca **Tutti i prossimi eventi** per aprire l'elenco completo nella tua [pagina Io](./me-page.md#upcoming), che include anche i tuoi incarichi di servizio e le tue iscrizioni.
- **Offerte** -- quanto hai donato quest'anno ("Donato nel" anno in corso), un pulsante **Dona** e un link **Storico** per la tua [cronologia delle donazioni](../giving/donation-history.md). Nascosto se la tua chiesa ha limitato lo storico delle offerte dei membri a un anno precedente o lo ha nascosto; in questo caso, lo strumento per le offerte della chiesa appare come pulsante sotto **Altro da**
- **Altro da** *la tua chiesa* -- pulsanti per gli altri strumenti che la tua chiesa ha attivato e che non sono già nella barra delle schede o mostrati sopra. Quelli che usi più spesso passano in testa.

Le sezioni su servizio, gruppi e offerte compaiono solo quando hai effettuato l'accesso, la chiesa ha attivato quello strumento e hai qualcosa da mostrare -- ad esempio un incarico imminente o almeno un gruppo. Su computer, la Home è disposta su due colonne.

Se non hai effettuato l'accesso, la Home mostra un titolo **Benvenuto** al posto del saluto, con un breve invito ("Accedi per vedere i tuoi gruppi, le offerte e altro.") e un pulsante **Accedi**. L'invito compare anche quando la tua chiesa non ha ancora configurato nient'altro per la Home. La chiesa può riformulare questo invito o nasconderlo -- vedi [Impostazioni dell'app mobile](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Quando è nascosto, puoi comunque accedere dalla pagina **Altro** o dalla pagina **Io**.

## La barra delle schede in basso {#the-bottom-tab-bar}

Sul telefono, una barra delle schede è fissata in fondo allo schermo:

- **Home** -- sempre la prima scheda
- Fino a tre delle schede configurate dalla tua chiesa
- **Altro** -- apre la pagina Altro

Le schermate integrate (come Gruppi, Offerte o Piani) ricevono per prime gli spazi delle schede; gli spazi rimasti liberi vanno alle pagine personalizzate della chiesa. Solo i link a siti web esterni e il Versetto del giorno non ricevono mai una scheda. Se la tua chiesa ha configurato più schede di quante ne entrano, le altre non vanno perse: compaiono nella pagina **Altro** e nella sezione **Altro da** della Home. Gli amministratori della chiesa impostano l'ordine delle schede in B1 Admin, alla voce **Mobile → Navigazione**.

## Su computer {#on-a-computer}

Su uno schermo più grande, come un computer o un tablet di grandi dimensioni, la barra delle schede in basso è sostituita da un'intestazione in alto con il colore della tua chiesa. Mostra il logo della chiesa, o il suo nome se non è impostato alcun logo (cliccalo per tornare alla Home), **Home**, fino a cinque delle schede configurate dalla chiesa e **Altro**, con la campanella e la foto del profilo a destra. Quando apri una schermata di dettaglio, sopra il contenuto della pagina compare un link **Indietro**.

## La pagina Altro {#the-more-page}

Toccando **Altro** si apre la pagina Altro all'indirizzo `/mobile/more`. Contiene:

- Il tuo nome e la tua foto, con il link **Modifica profilo** -- vedi [Modificare il tuo profilo](./editing-your-profile.md)
- Tutte le schede configurate dalla tua chiesa, in ordine, sotto il nome della chiesa. I link a siti esterni si aprono in una nuova scheda del browser.
- Una sezione **Account** con:
  - **Io** -- la tua pagina personale (solo se hai effettuato l'accesso)
  - **Aspetto** -- passa da **Modalità chiara** a **Modalità scura**
  - **Portale amministratore** -- visibile solo se hai i permessi di amministratore nella tua chiesa; apre B1 Admin in una nuova scheda
  - **Installa app** -- apre le [istruzioni di installazione](./installing-pwa.md) all'indirizzo `/mobile/install` (nascosto una volta installata l'app)
- **Esci**, oppure un pulsante **Accedi** se non hai effettuato l'accesso
- Il nome della tua chiesa e un link all'informativa sulla privacy

## La barra dell'app {#the-app-bar}

Sul telefono, la barra in alto di ogni schermata mostra:

- Il logo della tua chiesa (o il suo nome, se la chiesa non ha caricato un logo) nella Home e nelle altre schermate principali, oppure una freccia indietro quando sei entrato in una schermata di dettaglio. Il titolo della schermata appare in cima alla pagina stessa.
- Un'icona **campanella** per notifiche e messaggi, con un contrassegno per gli elementi non letti -- vedi [Notifiche e messaggi](#notifications-and-messages) più sotto
- La tua **foto del profilo**, che apre il tuo profilo all'indirizzo `/mobile/profileEdit` -- vedi [Modificare il tuo profilo](./editing-your-profile.md)

La campanella e la foto del profilo compaiono solo quando hai effettuato l'accesso.

## Notifiche e messaggi {#notifications-and-messages}

Toccando la campanella si apre un pannello con due sezioni:

- **Messaggi** -- le tue conversazioni private più recenti, con il link **Nuovo messaggio** per iniziarne una
- **Notifiche** -- le tue notifiche più recenti, con un contrassegno **Nuovo** su quelle non lette. Tocca una notifica per andare al gruppo, al piano o alla conversazione da cui proviene.

Ogni sezione mostra quanti elementi non letti contiene. Tocca **Vedi tutte** in fondo per aprire la tua posta in arrivo completa all'indirizzo `/mobile/notifications`.

## Pagine con sezioni {#pages-with-sections}

Le pagine di dettaglio -- un gruppo, un piano, la tua pagina Io, le schermate Piani e Offerte -- sono organizzate come un'unica pagina di sezioni invece che di schede. Ogni sezione mostra una breve anteprima, e un link nell'intestazione della sezione (come **Tutti i membri**, **Tutti gli eventi** o **Ordine del culto completo**) apre l'elenco completo. Un link **Torna a** in cima a quella vista ti riporta alla pagina da cui sei arrivato.

## La pagina Io {#the-me-page}

**Io** (`/mobile/me`) è il tuo centro personale. Mostra il tuo nome e la tua foto con i pulsanti **Modifica profilo** e **Impostazioni** ([preferenze di notifica](./notification-preferences.md)), poi ciò che ti aspetta -- incarichi di servizio, iscrizioni agli eventi ed eventi di gruppo -- seguiti dal tuo nucleo familiare, dai tuoi gruppi, dalle tue [offerte](../giving/) di quest'anno, dai moduli inviati, dalla cronologia delle presenze, dalle tue [iscrizioni](../events/my-registrations.md) e dalle notifiche e messaggi recenti. Vedi [La pagina Io](./me-page) per i dettagli.

Se non hai effettuato l'accesso, la pagina Io mostra invece un pulsante **Accedi**.

## Installare nella schermata Home {#installing-to-your-home-screen}

Il portale dei membri è una Progressive Web App. Visita `/mobile/install` (oppure scegli **Installa app** nella pagina Altro) per le istruzioni passo passo per il tuo dispositivo. Una volta installata, si apre a schermo intero dalla schermata Home, senza la barra del browser. Vedi [Installare come app (PWA)](./installing-pwa.md).

## Il sito pubblico della tua chiesa {#your-churchs-public-website}

Al di fuori del portale dei membri, il sito pubblico della tua chiesa ha una propria navigazione nell'intestazione, con link configurati dagli amministratori -- pagine come [sermoni](../content/sermons.md), la [Bibbia](../content/bible.md), le [dirette streaming](../content/live-streaming.md) e un elenco pubblico dei gruppi. Sul telefono, questi link si trovano dietro l'icona a hamburger in alto a destra dell'intestazione.

:::info
Le schede e gli strumenti che vedi variano da chiesa a chiesa. Gli amministratori controllano quali sezioni sono visibili ai membri tramite B1 Admin, quindi se non vedi una funzione descritta qui, la tua chiesa potrebbe non averla attivata.
:::
