---
title: "Navigare in B1App"
---

# Navigare in B1App

<div class="article-intro">

Il portale dei membri di B1.church è un'app web pensata prima di tutto per il telefono che si trova sotto `/mobile`. Funziona in qualsiasi browser e può essere installata nella schermata Home del dispositivo. Questa pagina spiega la dashboard Home, la barra delle schede in basso, la pagina Altro e la pagina Me.

</div>

## Video tour

<YouTube id="8XKRZvvAbXg" title="A Tour of the B1.church Member App" next="A Tour of B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Devi [aver effettuato l'accesso](./logging-in.md) per vedere le tue informazioni personali. I visitatori non registrati possono comunque consultare i contenuti pubblici e, dove una funzione richiede un account, viene mostrato un pulsante **Accedi**.

</div>

## Home {#home}

Aprendo `https://yourchurchname.b1.church/mobile` si arriva alla dashboard **Home** all'indirizzo `/mobile/dashboard`. Home è la pagina iniziale del portale dei membri. Inizia con un saluto ("Buongiorno", "Buon pomeriggio" o "Buonasera" seguito dal tuo nome) e la data di oggi, seguiti da sezioni che compaiono solo quando sono pertinenti:

- **Riquadri con foto** -- le schede a cui la tua chiesa ha assegnato una foto (incluso il Versetto del giorno) compaiono come riquadri fotografici sotto il nome della chiesa. A seconda della scelta della chiesa, sono disposti in una griglia a due colonne, in una riga da scorrere lateralmente (che può anche muoversi da sola) o in un elenco con una piccola miniatura accanto a ciascun nome — vedi [Riquadri della schermata Home](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Ogni scheda con foto compare qui, anche quella che ha anche uno spazio nella barra delle schede.
- **Ultimo sermone** -- l'ultimo sermone della tua chiesa, con un link **Tutti i sermoni**
- **Versetto del giorno** -- il versetto di oggi; tocca per aprire la pagina completa del [Versetto del giorno](../content/verse-of-the-day.md)
- **Stai servendo** -- i tuoi prossimi incarichi di servizio, con un link **Tutti i piani**. Se un incarico richiede ancora la tua risposta, questi vengono mostrati per primi con un badge **Richiede risposta** e i pulsanti **Accetta** / **Rifiuta**, così puoi rispondere direttamente dalla Home (**Rifiuta** ti chiede prima una conferma); altrimenti i tuoi prossimi incarichi mostrano un badge **Accettato** o **Confermato**. Tocca un incarico per aprire il suo piano.
- **I tuoi gruppi** -- fino a tre dei tuoi gruppi con orario e luogo di incontro, e un link **Tutti i gruppi**
- **Eventi in programma** -- quando hai effettuato l'accesso, i prossimi tre eventi dei gruppi di cui fai parte, ognuno con data e ora (e una miniatura se l'evento ha una foto). Tocca un evento per aprire gli eventi del suo gruppo. Tocca **Tutti gli eventi in programma** per aprire l'elenco completo nella tua [pagina Me](./me-page.md#upcoming), che include anche i tuoi incarichi di servizio e le iscrizioni.
- **Le mie presenze** e **I miei moduli** -- se la tua chiesa li attiva, quante volte hai partecipato negli ultimi 90 giorni con le tue due visite più recenti, e i tuoi due invii di moduli più recenti, con link agli elenchi completi. Questi compaiono sempre nella tua [pagina Me](./me-page.md) in ogni caso — vedi [Sezioni della schermata Home](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Donazioni** -- quanto hai donato quest'anno ("Donato nel" l'anno in corso), un pulsante **Dona** (mostrato solo se la tua chiesa offre donazioni online) e un link **Cronologia** alla tua [cronologia delle donazioni](../giving/donation-history.md). Nascosta se la tua chiesa ha limitato o nascosto la cronologia delle donazioni dei membri a un anno precedente; in tal caso lo strumento di donazione della chiesa compare come pulsante sotto **Altro da**
- **Altro da** *la tua chiesa* -- pulsanti per gli altri strumenti che la tua chiesa ha attivato e che non sono già nella barra delle schede o mostrati sopra. Quelli che usi di più vengono spostati in cima.

Le sezioni di servizio, gruppi, presenze, moduli e donazioni compaiono solo quando hai effettuato l'accesso, la tua chiesa ha attivato quello strumento e hai qualcosa da mostrare — ad esempio un incarico in arrivo o almeno un gruppo. Su computer, Home è disposta su due colonne.

Se non hai effettuato l'accesso, Home mostra un titolo **Benvenuto** al posto del saluto, con un breve invito ("Accedi per vedere i tuoi gruppi, le donazioni e altro.") e un pulsante **Accedi**. L'invito compare anche se la tua chiesa non ha ancora configurato nient'altro per Home. La tua chiesa può riformulare questo invito o nasconderlo — vedi [Impostazioni dell'app mobile](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Quando è nascosto, puoi comunque accedere dalla pagina **Altro** o dalla pagina **Me**.

## La barra delle schede in basso

Su telefono, una barra delle schede è fissata in fondo allo schermo:

- **Home** -- sempre la prima scheda
- Fino a tre delle schede configurate dalla tua chiesa
- **Altro** -- apre la pagina Altro

Le schermate integrate (come Gruppi, Donazioni o Piani) ricevono prima gli spazi della barra delle schede; gli spazi rimasti vanno alle pagine personalizzate della tua chiesa. Solo i link a siti web esterni e il Versetto del giorno non ricevono mai una scheda. Se la tua chiesa ha configurato più schede di quante ne entrino, le altre non vanno perse: compaiono nella pagina **Altro** e nella sezione **Altro da** della Home. Gli amministratori della chiesa impostano l'ordine delle schede in B1 Admin sotto **Mobile → Navigazione**.

## Su computer

Su uno schermo più ampio, come un computer o un tablet grande, la barra delle schede in basso viene sostituita da un'intestazione in alto nel colore della tua chiesa. Mostra il logo della chiesa, o il suo nome se non è impostato un logo (fai clic per tornare alla Home), **Home**, fino a cinque delle schede configurate dalla chiesa, e **Altro**, con la campanella e la foto del profilo a destra. Quando apri una schermata di dettaglio, sopra il contenuto della pagina compare un link **Indietro**.

## La pagina Altro

Toccando **Altro** si apre la pagina Altro all'indirizzo `/mobile/more`. Contiene:

- Il tuo nome e la tua foto, con un link **Modifica profilo** — vedi [Modificare il tuo profilo](./editing-your-profile.md)
- Ogni scheda configurata dalla tua chiesa, nell'ordine stabilito, sotto il nome della chiesa. I link a siti web esterni si aprono in una nuova scheda del browser.
- Una sezione **Account** con:
  - **Me** -- la tua pagina personale (solo se hai effettuato l'accesso)
  - **Aspetto** -- passa tra **Modalità chiara** e **Modalità scura**
  - **Portale amministratore** -- visibile solo se hai i permessi di amministratore nella tua chiesa; apre B1 Admin in una nuova scheda
  - **Installa l'app** -- apre le [istruzioni di installazione](./installing-pwa.md) all'indirizzo `/mobile/install` (nascosto una volta installata l'app)
- **Esci**, oppure un pulsante **Accedi** se non hai effettuato l'accesso
- Il nome della tua chiesa e un link all'informativa sulla privacy

## La barra dell'app

Su telefono, la barra in cima a ogni schermata mostra:

- Il logo della tua chiesa (o il suo nome, se la chiesa non ha caricato un logo) in Home e nelle altre schermate principali, oppure una freccia indietro quando sei entrato in una schermata di dettaglio. Il titolo della schermata compare in cima alla pagina stessa.
- Un'icona a **campanella** per le notifiche e i messaggi, con un badge per gli elementi non letti — vedi [Notifiche e messaggi](#notifications-and-messages) più sotto
- La tua **foto del profilo**, che apre il tuo profilo all'indirizzo `/mobile/profileEdit` — vedi [Modificare il tuo profilo](./editing-your-profile.md)

La campanella e la foto del profilo compaiono solo quando hai effettuato l'accesso.

## Notifiche e messaggi

Toccando la campanella si apre un pannello con due sezioni:

- **Messaggi** -- le tue conversazioni private più recenti, con un link **Nuovo messaggio** per iniziarne una
- **Notifiche** -- le tue notifiche più recenti, con un badge **Nuovo** su quelle non lette. Tocca una notifica per andare al gruppo, al piano o alla conversazione da cui proviene.

Ogni sezione mostra quanti elementi non letti contiene. Tocca **Vedi tutto** in fondo per aprire la tua posta in arrivo completa all'indirizzo `/mobile/notifications`.

## Pagine con sezioni

Le pagine di dettaglio — un gruppo, un piano, la tua pagina Me, le schermate Piani e Donazioni — sono disposte come un'unica pagina di sezioni anziché di schede. Ogni sezione mostra un'anteprima breve, e un link nell'intestazione della sezione (come **Tutti i membri**, **Tutti gli eventi** o **Ordine del servizio completo**) apre l'elenco completo. Un link **Torna a** in cima a questa vista ti riporta alla pagina da cui provieni.

## La pagina Me

**Me** (`/mobile/me`) è il tuo centro personale. Mostra il tuo nome e la tua foto con i pulsanti **Modifica profilo** e **Impostazioni** ([preferenze di notifica](./notification-preferences.md)), poi ciò che ti aspetta -- incarichi di servizio, iscrizioni agli eventi ed eventi di gruppo -- seguiti dal tuo nucleo familiare, dai tuoi gruppi, le tue [donazioni](../giving/) di quest'anno, i moduli che hai inviato, la cronologia delle presenze, le tue [iscrizioni](../events/my-registrations.md) e le notifiche e i messaggi recenti. Vedi [La pagina Me](./me-page) per i dettagli.

Se non hai effettuato l'accesso, la pagina Me mostra invece un pulsante **Accedi**.

## Installare sulla schermata Home

Il portale dei membri è una Progressive Web App. Visita `/mobile/install` (oppure scegli **Installa l'app** nella pagina Altro) per le istruzioni passo passo per il tuo dispositivo. Una volta installata, si apre a schermo intero dalla schermata Home senza la barra del browser. Vedi [Installare come app (PWA)](./installing-pwa.md).

## Il sito pubblico della tua chiesa

Al di fuori del portale dei membri, il sito pubblico della tua chiesa ha una propria navigazione in intestazione con i link configurati dagli amministratori — pagine come [sermoni](../content/sermons.md), la [Bibbia](../content/bible.md), la [trasmissione in diretta](../content/live-streaming.md) e un elenco pubblico dei gruppi. Su telefono questi link si trovano dietro l'icona hamburger in alto a destra dell'intestazione.

:::info
Le schede e gli strumenti che vedi variano da chiesa a chiesa. Gli amministratori controllano quali sezioni sono visibili ai membri tramite B1 Admin, quindi se non vedi una funzione descritta qui, la tua chiesa potrebbe non averla attivata.
:::
