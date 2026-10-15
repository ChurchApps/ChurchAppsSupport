---
title: "Navigare in B1App"
---

# Navigare in B1App

<div class="article-intro">

Il portale dei membri di B1.church è un'app web pensata per il telefono che si trova sotto `/mobile`. Funziona in qualsiasi browser e può essere installata sulla schermata Home. Questa pagina spiega la dashboard Home, la barra delle schede in basso, la pagina Altro e la pagina Io.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Devi aver [effettuato l'accesso](./logging-in.md) per vedere le tue informazioni personali. I visitatori non connessi possono comunque sfogliare i contenuti pubblici e trovano un pulsante **Accedi** dove una funzione richiede un account.

</div>

## Home

Aprendo `https://nomedellatuachiesa.b1.church/mobile` arrivi alla dashboard **Home**, all'indirizzo `/mobile/dashboard`. Home è la pagina di ingresso del portale dei membri. Si apre con un saluto ("Buongiorno", "Buon pomeriggio" o "Buonasera" seguito dal tuo nome) e la data di oggi, seguiti da sezioni che compaiono solo quando sono pertinenti:

- **Ultimo sermone** -- il sermone più recente della tua chiesa, con un collegamento **Tutti i sermoni**
- **Versetto del giorno** -- il versetto di oggi; toccalo per aprire la pagina completa del [Versetto del giorno](../content/verse-of-the-day.md)
- **Stai servendo** -- i tuoi prossimi incarichi di servizio, con un collegamento **Tutti i piani**. Se un incarico richiede ancora la tua risposta, questi vengono mostrati per primi con un'etichetta **Richiede risposta** e i pulsanti **Accetta** / **Rifiuta**, così puoi rispondere direttamente da Home; altrimenti i tuoi prossimi incarichi mostrano un'etichetta **Accettato** o **Confermato**. Tocca un incarico per aprire il suo piano.
- **I tuoi gruppi** -- fino a tre dei tuoi gruppi con orario e luogo di incontro, e un collegamento **Tutti i gruppi**
- **Offerte** -- quanto hai donato quest'anno ("Donato nel" anno in corso), un pulsante **Dona** e un collegamento **Storico** alla tua [cronologia delle donazioni](../giving/donation-history.md)
- **Altro da** *la tua chiesa* -- pulsanti per gli altri strumenti attivati dalla tua chiesa che non sono già nella barra delle schede o mostrati sopra. Quelli che usi di più passano in primo piano.

Le sezioni dei servizi, dei gruppi e delle offerte compaiono solo quando hai effettuato l'accesso, la tua chiesa ha attivato quello strumento e hai qualcosa da mostrare -- ad esempio un incarico imminente o almeno un gruppo. Da computer, Home è disposta su due colonne.

Se non hai effettuato l'accesso, al posto del saluto Home mostra un titolo **Benvenuto** con un breve invito ("Accedi per vedere i tuoi gruppi, le offerte e molto altro.") e un pulsante **Accedi**. La tua chiesa può riformulare questo invito o nasconderlo -- consulta [Impostazioni dell'app mobile](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Quando è nascosto, puoi comunque accedere dalla pagina **Altro** o dalla pagina **Io**.

## La barra delle schede in basso

Sul telefono, una barra delle schede è fissata in fondo allo schermo:

- **Home** -- sempre la prima scheda
- Fino a tre delle schede configurate dalla tua chiesa
- **Altro** -- apre la pagina Altro

I collegamenti a siti web esterni, pagine personalizzate e il Versetto del giorno non ricevono mai una scheda. Se la tua chiesa ha configurato più schede di quante ne entrino, le altre non vanno perse: compaiono nella pagina **Altro** e nella sezione **Altro da** della Home. Gli amministratori della chiesa impostano l'ordine delle schede in B1 Admin, alla voce **Mobile → Navigazione**.

## Da computer

Su uno schermo più largo, come un computer o un tablet grande, la barra delle schede in basso è sostituita da un'intestazione in alto nel colore della tua chiesa. Mostra il nome della chiesa (fai clic per tornare alla Home), **Home**, fino a cinque delle schede configurate dalla tua chiesa e **Altro**, con la campanella e la foto del profilo a destra. Quando apri una schermata di dettaglio, sopra il contenuto della pagina compare un collegamento **Indietro**.

## La pagina Altro

Toccando **Altro** si apre la pagina Altro all'indirizzo `/mobile/more`. Contiene:

- Il tuo nome e la tua foto, con un collegamento **Modifica profilo** -- vedi [Modificare il tuo profilo](./editing-your-profile.md)
- Ogni scheda configurata dalla tua chiesa, nell'ordine, sotto il nome della chiesa. I collegamenti a siti esterni si aprono in una nuova scheda del browser.
- Una sezione **Account** con:
  - **Io** -- la tua pagina personale (solo se hai effettuato l'accesso)
  - **Aspetto** -- passa tra **Modalità chiara** e **Modalità scura**
  - **Portale amministrazione** -- mostrato solo se hai i permessi di amministratore nella tua chiesa; apre B1 Admin in una nuova scheda
  - **Installa app** -- apre le [istruzioni di installazione](./installing-pwa.md) su `/mobile/install` (nascosto una volta installata l'app)
- **Esci**, oppure un pulsante **Accedi** se non hai effettuato l'accesso
- Il nome della tua chiesa e un collegamento all'informativa sulla privacy

## La barra dell'app

Sul telefono, la barra in alto di ogni schermata mostra:

- Il nome della tua chiesa nella Home e nelle altre schermate principali, oppure una freccia indietro quando sei entrato in una schermata di dettaglio. Il titolo della schermata appare in cima alla pagina stessa.
- Un'icona **campanella** per notifiche e messaggi, con un badge per gli elementi non letti -- vedi [Notifiche e messaggi](#notifications-and-messages) più sotto
- La tua **foto del profilo**, che apre il tuo profilo su `/mobile/profileEdit` -- vedi [Modificare il tuo profilo](./editing-your-profile.md)

La campanella e la foto del profilo compaiono solo quando hai effettuato l'accesso.

## Notifiche e messaggi

Toccando la campanella si apre un pannello con due sezioni:

- **Messaggi** -- le tue conversazioni private più recenti, con un collegamento **Nuovo messaggio** per iniziarne una
- **Notifiche** -- le tue notifiche più recenti, con un badge **Nuova** su quelle non lette. Tocca una notifica per andare al gruppo, al piano o alla conversazione da cui proviene.

Ogni sezione mostra quanti elementi non letti contiene. Tocca **Vedi tutte** in fondo per aprire la tua casella completa su `/mobile/notifications`.

## Pagine con sezioni

Le pagine di dettaglio -- un gruppo, un piano, la tua pagina Io, le schermate Piani e Offerte -- sono organizzate come un'unica pagina di sezioni anziché di schede. Ogni sezione mostra una breve anteprima, e un collegamento nell'intestazione della sezione (come **Tutti i membri**, **Tutti gli eventi** o **Ordine di culto completo**) apre l'elenco completo. Un collegamento **Torna a** in cima a quella vista ti riporta alla pagina da cui provenivi.

## La pagina Io

**Io** (`/mobile/me`) è il tuo centro personale. Mostra il tuo nome e la tua foto con i pulsanti **Modifica profilo** e **Impostazioni** ([preferenze di notifica](./notification-preferences.md)), poi ciò che ti aspetta -- incarichi di servizio, iscrizioni agli eventi ed eventi di gruppo -- seguito dal tuo nucleo familiare, dai tuoi gruppi, dalle tue [offerte](../giving/) di quest'anno, dalle tue [iscrizioni](../events/my-registrations.md) e dalle tue notifiche e messaggi recenti. Consulta [La pagina Io](./me-page) per i dettagli.

Se non hai effettuato l'accesso, la pagina Io mostra invece un pulsante **Accedi**.

## Installare sulla schermata Home

Il portale dei membri è una Progressive Web App. Visita `/mobile/install` (oppure scegli **Installa app** nella pagina Altro) per le istruzioni passo-passo per il tuo dispositivo. Una volta installata, si apre a schermo intero dalla schermata Home senza elementi del browser. Consulta [Installare come app (PWA)](./installing-pwa.md).

## Il sito pubblico della tua chiesa

Al di fuori del portale dei membri, il sito pubblico della tua chiesa ha una propria navigazione nell'intestazione, con collegamenti configurati dagli amministratori -- pagine come [sermoni](../content/sermons.md), la [Bibbia](../content/bible.md), la [trasmissione in diretta](../content/live-streaming.md) e un elenco pubblico dei gruppi. Sul telefono, questi collegamenti si trovano dietro l'icona a hamburger in alto a destra dell'intestazione.

:::info
Le schede e gli strumenti che vedi variano da chiesa a chiesa. Gli amministratori controllano quali sezioni sono visibili ai membri tramite B1 Admin, quindi se non vedi una funzione descritta qui, la tua chiesa potrebbe non averla attivata.
:::
