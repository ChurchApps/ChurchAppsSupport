---
title: "Navigare in B1App"
description: "Muoversi nel portale membri B1.church da telefono o computer: la dashboard Home, la barra delle schede in basso, la pagina Altro e la pagina Io."
---

# Navigare in B1App

<div class="article-intro">

Il portale membri di B1.church è un'app web pensata per il telefono che si trova sotto `/mobile`. Funziona in qualsiasi browser e può essere installata nella schermata Home. Questa pagina spiega la dashboard Home, la barra delle schede in basso, la pagina Altro e la pagina Io.

</div>

## Video di presentazione

<YouTube id="8XKRZvvAbXg" title="Un tour dell'app per membri di B1.church" next="Un tour di B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Per vedere le tue informazioni personali devi aver effettuato l'[accesso](./logging-in.md). I visitatori non registrati possono comunque consultare i contenuti pubblici e, quando una funzione richiede un account, viene mostrato il pulsante **Accedi**.

</div>

## Home {#home}

Aprendo `https://yourchurchname.b1.church/mobile` si arriva alla dashboard **Home**, all'indirizzo `/mobile/dashboard`. Home è la pagina iniziale del portale membri. Si apre con un saluto ("Buongiorno", "Buon pomeriggio" o "Buonasera" seguito dal tuo nome) e la data di oggi, seguiti da sezioni che compaiono solo quando sono pertinenti:

- **Riquadri fotografici** -- le schede a cui la tua chiesa ha assegnato una foto (incluso Versetto del giorno) appaiono come riquadri sotto il nome della chiesa. A seconda della scelta della chiesa, sono disposti in una griglia a due colonne, in una riga da far scorrere lateralmente (che può anche avanzare da sola) oppure in un elenco con una piccola miniatura accanto a ogni nome -- vedi [Riquadri della schermata Home](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Quando la riga orizzontale contiene più riquadri di quelli che entrano nello schermo, sotto di essa compare una fila di puntini che indica dove ti trovi; toccando un puntino passi direttamente a quel riquadro. La riga continua a scorrere in avanti e, dopo l'ultimo riquadro, ricomincia dal primo. Qui compaiono tutte le schede con foto, anche quelle che hanno anche uno spazio nella barra delle schede.
- **Ultimo sermone** -- il sermone più recente della tua chiesa, con il link **Tutti i sermoni**
- **Versetto del giorno** -- il versetto di oggi; toccandolo apri la pagina completa del [Versetto del giorno](../content/verse-of-the-day.md)
- **Stai servendo** -- i tuoi prossimi incarichi di servizio, con il link **Tutti i piani**. Se un incarico richiede ancora una tua risposta, viene mostrato per primo con il badge **Risposta richiesta** e i pulsanti **Accetta** / **Rifiuta**, così puoi rispondere direttamente da Home (**Rifiuta** ti chiede prima una conferma); altrimenti i prossimi incarichi mostrano il badge **Accettato** o **Confermato**. Tocca un incarico per aprire il suo piano.
- **I tuoi gruppi** -- fino a tre dei tuoi gruppi, con orario e luogo di incontro, e il link **Tutti i gruppi**
- **Eventi in programma** -- quando hai effettuato l'accesso, i tuoi prossimi tre eventi di gruppo e le tue iscrizioni agli eventi, in ordine di data, ciascuno con data e ora (e una miniatura se l'evento ha una foto). Ogni riga è contrassegnata come **Evento** (un evento di un gruppo di cui fai parte) oppure **Iscrizione** (un evento a cui ti sei [iscritto](../events/registering.md)); un evento a cui sei iscritto compare una sola volta, come iscrizione. Tocca un evento per aprire gli eventi del suo gruppo, oppure un'iscrizione per aprire le tue [iscrizioni](../events/my-registrations.md). Tocca **Tutti gli eventi in programma** per aprire l'elenco completo nella tua [pagina Io](./me-page.md#upcoming), che include anche i tuoi incarichi di servizio e le iscrizioni.
- **La mia presenza** e **I miei moduli** -- se la tua chiesa li attiva, quante volte hai partecipato negli ultimi 90 giorni con le due visite più recenti, e le due compilazioni di modulo più recenti, con i link agli elenchi completi. Compaiono sempre nella tua [pagina Io](./me-page.md) in ogni caso -- vedi [Sezioni della schermata Home](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Donazioni** -- quanto hai donato quest'anno (con la dicitura "Donato nel" e l'anno in corso), un pulsante **Dona** (mostrato solo se la tua chiesa offre le donazioni online) e un link **Cronologia** alla tua [cronologia delle donazioni](../giving/donation-history.md). Questa sezione è nascosta se la tua chiesa ha limitato la cronologia delle donazioni dei membri a un anno precedente oppure l'ha nascosta; in tal caso lo strumento di donazione della chiesa compare come pulsante sotto **Altro da**
- **Altro da** *la tua chiesa* -- pulsanti per gli altri strumenti che la tua chiesa ha attivato e che non sono già nella barra delle schede o mostrati sopra. Quelli che usi di più passano in testa.

Le sezioni su servizio, gruppi, presenze, moduli e donazioni compaiono solo quando hai effettuato l'accesso, la tua chiesa ha attivato quello strumento e c'è qualcosa da mostrare -- per esempio un incarico in programma o almeno un gruppo. Su computer, Home è disposta su due colonne.

Se non hai effettuato l'accesso, Home mostra al posto del saluto un titolo **Benvenuto**, con un breve invito ("Accedi per vedere i tuoi gruppi, le donazioni e altro.") e un pulsante **Accedi**. L'invito compare anche quando la tua chiesa non ha ancora configurato nient'altro per Home. La tua chiesa può riformulare questo invito o nasconderlo -- vedi [Impostazioni dell'app mobile](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Quando è nascosto, puoi comunque accedere dalla pagina **Altro** o dalla pagina **Io**.

## La barra delle schede in basso

Su telefono, una barra delle schede è fissata in fondo allo schermo:

- **Home** -- sempre la prima scheda
- Fino a tre delle schede configurate dalla tua chiesa
- **Altro** -- apre la pagina Altro

Le schermate integrate (come Gruppi, Donazioni o Piani) ricevono per prime gli spazi nella barra; gli spazi rimasti liberi vanno alle pagine personalizzate della chiesa. I link a siti web esterni e il Versetto del giorno non ricevono mai una scheda. Se la tua chiesa ha configurato più schede di quante ne entrino, le altre non vanno perse: compaiono nella pagina **Altro** e nella sezione **Altro da** di Home. Gli amministratori della chiesa impostano l'ordine delle schede in B1 Admin, in **Mobile → Navigazione**.

### Schede cartella {#folder-tabs}

La tua chiesa può raggruppare più schede in una **cartella**. Una cartella appare come qualsiasi altra scheda -- nella barra delle schede, nella pagina **Altro** o come riquadro fotografico in Home -- e toccandola si apre una schermata con il nome della cartella che elenca le schede al suo interno. Se tutte le schede della cartella hanno una foto, vengono mostrate come riquadri fotografici; altrimenti come elenco. I link a siti web esterni in una cartella si aprono in una nuova scheda del browser. Le schede all'interno di una cartella compaiono solo nella schermata della cartella, non nella barra delle schede né nella pagina **Altro**. Una cartella senza nulla di visibile per te viene nascosta.

## Su computer

Su uno schermo più ampio, come un computer o un tablet grande, la barra delle schede in basso è sostituita da un'intestazione in alto, nel colore della tua chiesa. Mostra il logo della chiesa (o il suo nome, se non è impostato alcun logo; cliccandolo torni a Home), **Home**, fino a cinque delle schede configurate dalla chiesa e **Altro**, con la campanella e la foto del profilo a destra. Quando apri una schermata di dettaglio, sopra il contenuto della pagina compare un link **Indietro**.

## La pagina Altro

Toccando **Altro** si apre la pagina Altro, all'indirizzo `/mobile/more`. Contiene:

- Il tuo nome e la tua foto, con un link **Modifica profilo** — vedi [Modificare il tuo profilo](./editing-your-profile.md)
- Tutte le schede configurate dalla tua chiesa, in ordine, sotto il nome della chiesa. I link a siti web esterni si aprono in una nuova scheda del browser.
- Una sezione **Account** con:
  - **Io** -- la tua pagina personale (solo se hai effettuato l'accesso)
  - **Aspetto** -- passa tra **Modalità chiara** e **Modalità scura**
  - **Portale amministratore** -- mostrato solo se hai i permessi di amministratore nella tua chiesa; apre B1 Admin in una nuova scheda
  - **Installa app** -- apre le [istruzioni di installazione](./installing-pwa.md) all'indirizzo `/mobile/install` (nascosto una volta installata l'app)
- **Esci**, oppure un pulsante **Accedi** se non hai effettuato l'accesso
- Il nome della tua chiesa e un link all'informativa sulla privacy

## La barra superiore

Su telefono, la barra in cima a ogni schermata mostra:

- Il logo della tua chiesa (o il suo nome, se la chiesa non ha caricato un logo) in Home e nelle altre schermate principali, oppure una freccia indietro quando sei entrato in una schermata di dettaglio. Il titolo della schermata compare in cima alla pagina stessa.
- Un'icona a **campanella** per notifiche e messaggi, con un badge per gli elementi non letti -- vedi [Notifiche e messaggi](#notifications-and-messages) più sotto
- La tua **foto del profilo**, che apre il tuo profilo all'indirizzo `/mobile/profileEdit` — vedi [Modificare il tuo profilo](./editing-your-profile.md)

La campanella e la foto del profilo compaiono solo quando hai effettuato l'accesso.

## Notifiche e messaggi

Toccando la campanella si apre un pannello con due sezioni:

- **Messaggi** -- le tue conversazioni private più recenti, con un link **Nuovo messaggio** per iniziarne una
- **Notifiche** -- le tue notifiche più recenti, con un badge **Nuova** su quelle non lette. Tocca una notifica per andare al gruppo, al piano o alla conversazione da cui proviene.

Ogni sezione mostra quanti elementi non letti contiene. Tocca **Vedi tutte** in fondo per aprire la tua casella completa all'indirizzo `/mobile/notifications`.

## Pagine a sezioni

Le pagine di dettaglio -- un gruppo, un piano, la tua pagina Io, le schermate Piani e Donazioni -- sono organizzate come un'unica pagina di sezioni anziché come schede. Ogni sezione mostra una breve anteprima, e un link nell'intestazione della sezione (come **Tutti i membri**, **Tutti gli eventi** o **Ordine completo del servizio**) apre l'elenco completo. Un link **Torna a** in cima a questa vista ti riporta alla pagina da cui arrivi.

## La pagina Io

**Io** (`/mobile/me`) è il tuo centro personale. Mostra il tuo nome e la tua foto con i pulsanti **Modifica profilo** e **Impostazioni** ([preferenze di notifica](./notification-preferences.md)), poi ciò che ti aspetta -- incarichi di servizio, iscrizioni agli eventi ed eventi di gruppo -- seguito dalla tua famiglia, dai tuoi gruppi, dalle tue [donazioni](../giving/index.md) di quest'anno, dai moduli che hai inviato, dalla cronologia delle presenze, dalle tue [iscrizioni](../events/my-registrations.md) e dalle notifiche e messaggi recenti. Vedi [La pagina Io](./me-page.md) per i dettagli.

Se non hai effettuato l'accesso, la pagina Io mostra invece un pulsante **Accedi**.

## Installare nella schermata Home

Il portale membri è una Progressive Web App. Visita `/mobile/install` (oppure scegli **Installa app** nella pagina Altro) per le istruzioni passo passo per il tuo dispositivo. Una volta installata, si apre a schermo intero dalla schermata Home, senza elementi del browser. Vedi [Installare come app (PWA)](./installing-pwa.md).

## Il sito pubblico della tua chiesa

Al di fuori del portale membri, il sito pubblico della tua chiesa ha una propria navigazione nell'intestazione, con i link configurati dai tuoi amministratori -- pagine come [sermoni](../content/sermons.md), la [Bibbia](../content/bible.md), la [trasmissione in diretta](../content/live-streaming.md) e un elenco pubblico dei gruppi. Su telefono questi link si trovano dietro l'icona a hamburger in alto a destra dell'intestazione.

:::info
Le schede e gli strumenti che vedi variano da chiesa a chiesa. Gli amministratori controllano quali sezioni sono visibili ai membri tramite B1 Admin, quindi se non vedi una funzione descritta qui, la tua chiesa potrebbe non averla attivata.
:::
