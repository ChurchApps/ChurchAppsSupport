---
title: "Navigare in B1App"
---

# Navigare in B1App

<div class="article-intro">

Il portale per i membri di B1.church è un'app web pensata per il telefono che si trova sotto `/mobile`. Funziona in qualsiasi browser e può essere installata nella schermata Home del dispositivo. Questa pagina spiega la dashboard Home, la barra delle schede in basso, la pagina Altro e la pagina Io.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Dovete essere [connessi](./logging-in.md) per vedere le vostre informazioni personali. I visitatori non connessi possono comunque consultare i contenuti pubblici e, dove una funzione richiede un account, viene mostrato un pulsante **Accedi**.

</div>

## Home {#home}

Aprendo `https://yourchurchname.b1.church/mobile` si arriva alla dashboard **Home**, all'indirizzo `/mobile/dashboard`. Home è la pagina iniziale del portale per i membri. Inizia con un saluto ("Buongiorno", "Buon pomeriggio" o "Buonasera", seguito dal vostro nome) e con la data di oggi, poi mostra sezioni che compaiono solo quando sono pertinenti:

- **Ultimo sermone** -- il sermone più recente della vostra chiesa, con il link **Tutti i sermoni**
- **Versetto del giorno** -- il versetto di oggi; toccatelo per aprire la pagina completa [Versetto del giorno](../content/verse-of-the-day.md)
- **Servi con noi** -- i vostri prossimi incarichi di servizio, con il link **Tutti i piani**. Se un incarico richiede ancora una vostra risposta, viene mostrato per primo con un badge **Richiede risposta** e i pulsanti **Accetta** / **Rifiuta**, così potete rispondere direttamente da Home (**Rifiuta** vi chiede prima una conferma); altrimenti i prossimi incarichi mostrano un badge **Accettato** o **Confermato**. Toccate un incarico per aprire il suo piano.
- **I tuoi gruppi** -- fino a tre dei vostri gruppi, con orario e luogo di incontro, e il link **Tutti i gruppi**
- **Donazioni** -- quanto avete donato quest'anno ("Donato nel" anno in corso), un pulsante **Dona** e un link **Storico** alla vostra [cronologia delle donazioni](../giving/donation-history.md)
- **Altro da** *la vostra chiesa* -- pulsanti per gli altri strumenti che la vostra chiesa ha attivato e che non sono già nella barra delle schede o mostrati sopra. Quelli che usate di più vengono messi per primi.

Le sezioni Servi con noi, Gruppi e Donazioni compaiono solo quando avete effettuato l'accesso, la vostra chiesa ha attivato lo strumento in questione e c'è qualcosa da mostrare -- per esempio un incarico in programma o almeno un gruppo. Su computer, Home è disposta su due colonne.

Se non avete effettuato l'accesso, Home mostra un titolo **Benvenuto** al posto del saluto, con un breve invito ("Accedi per vedere i tuoi gruppi, le donazioni e altro.") e un pulsante **Accedi**. L'invito compare anche se la vostra chiesa non ha ancora configurato nient'altro per Home. La chiesa può riformularlo o nasconderlo -- vedere [Impostazioni dell'app mobile](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Quando è nascosto, potete comunque accedere dalla pagina **Altro** o dalla pagina **Io**.

## La barra delle schede in basso

Su telefono, una barra delle schede è fissata in fondo allo schermo:

- **Home** -- sempre la prima scheda
- Fino a tre delle schede configurate dalla vostra chiesa
- **Altro** -- apre la pagina Altro

I link a siti esterni, alle pagine personalizzate e al Versetto del giorno non ricevono mai una scheda propria. Se la vostra chiesa ha configurato più schede di quelle che entrano, le altre non vanno perse: compaiono nella pagina **Altro** e nella sezione **Altro da** di Home. Gli amministratori della chiesa impostano l'ordine delle schede in B1 Admin, alla voce **Mobile → Navigazione**.

## Su computer

Su schermi più ampi, come un computer o un tablet grande, la barra delle schede in basso è sostituita da un'intestazione in cima allo schermo, nel colore della vostra chiesa. Mostra il nome della chiesa (cliccandolo si torna a Home), **Home**, fino a cinque delle schede configurate dalla chiesa e **Altro**, con la campanella e la foto del profilo a destra. Quando aprite una schermata di dettaglio, sopra il contenuto della pagina compare un link **Indietro**.

## La pagina Altro {#the-more-page}

Toccando **Altro** si apre la pagina Altro, all'indirizzo `/mobile/more`. Contiene:

- Il vostro nome e la vostra foto, con il link **Modifica profilo** -- vedere [Modificare il proprio profilo](./editing-your-profile.md)
- Tutte le schede configurate dalla vostra chiesa, nell'ordine, sotto il nome della chiesa. I link a siti esterni si aprono in una nuova scheda del browser.
- Una sezione **Account** con:
  - **Io** -- la vostra pagina personale (solo se connessi)
  - **Aspetto** -- passate da **Modalità chiara** a **Modalità scura**
  - **Portale amministratore** -- visibile solo se avete i permessi di amministrazione nella chiesa; apre B1 Admin in una nuova scheda
  - **Installa app** -- apre le [istruzioni di installazione](./installing-pwa.md) all'indirizzo `/mobile/install` (nascosto una volta installata l'app)
- **Esci**, oppure un pulsante **Accedi** se non siete connessi
- Il nome della vostra chiesa e un link all'informativa sulla privacy

## La barra superiore

Su telefono, la barra in cima a ogni schermata mostra:

- Il nome della vostra chiesa in Home e nelle altre schermate principali, oppure una freccia indietro quando siete entrati in una schermata di dettaglio. Il titolo della schermata compare in cima alla pagina stessa.
- Un'icona **campanella** per le notifiche e i messaggi, con un badge per gli elementi non letti -- vedere [Notifiche e messaggi](#notifications-and-messages) più sotto
- La vostra **foto del profilo**, che apre il vostro profilo all'indirizzo `/mobile/profileEdit` -- vedere [Modificare il proprio profilo](./editing-your-profile.md)

La campanella e la foto del profilo compaiono solo quando siete connessi.

## Notifiche e messaggi {#notifications-and-messages}

Toccando la campanella si apre un pannello con due sezioni:

- **Messaggi** -- le vostre conversazioni private più recenti, con il link **Nuovo messaggio** per iniziarne una
- **Notifiche** -- le vostre notifiche più recenti, con un badge **Nuovo** su quelle non lette. Toccate una notifica per andare al gruppo, al piano o alla conversazione da cui proviene.

Ogni sezione mostra quanti elementi non letti contiene. Toccate **Vedi tutto** in fondo per aprire la vostra casella completa all'indirizzo `/mobile/notifications`.

## Pagine con sezioni

Le pagine di dettaglio -- un gruppo, un piano, la vostra pagina Io, le schermate Piani e Donazioni -- sono organizzate in un'unica pagina di sezioni anziché in schede. Ogni sezione mostra una breve anteprima, e un link nell'intestazione della sezione (come **Tutti i membri**, **Tutti gli eventi** o **Ordine completo del servizio**) apre l'elenco completo. Un link **Torna a** in cima a quella vista vi riporta alla pagina da cui siete arrivati.

## La pagina Io

**Io** (`/mobile/me`) è il vostro centro personale. Mostra il vostro nome e la vostra foto, con i pulsanti **Modifica profilo** e **Impostazioni** ([preferenze di notifica](./notification-preferences.md)), poi ciò che vi aspetta -- incarichi di servizio, iscrizioni agli eventi ed eventi di gruppo -- seguito dalla vostra famiglia, dai vostri gruppi, dalle vostre [donazioni](../giving/) di quest'anno, dalle vostre [iscrizioni](../events/my-registrations.md) e dalle notifiche e messaggi recenti. Vedere [La pagina Io](./me-page) per i dettagli.

Se non avete effettuato l'accesso, la pagina Io mostra invece un pulsante **Accedi**.

## Installare sulla schermata Home

Il portale per i membri è una Progressive Web App. Visitate `/mobile/install` (oppure scegliete **Installa app** nella pagina Altro) per le istruzioni passo passo per il vostro dispositivo. Una volta installata, si apre a schermo intero dalla schermata Home, senza elementi del browser. Vedere [Installare come app (PWA)](./installing-pwa.md).

## Il sito pubblico della vostra chiesa

Al di fuori del portale per i membri, il sito pubblico della vostra chiesa ha una propria navigazione nell'intestazione, con i link configurati dagli amministratori -- pagine come [sermoni](../content/sermons.md), [Bibbia](../content/bible.md), [streaming in diretta](../content/live-streaming.md) e un elenco pubblico dei gruppi. Su telefono, questi link si trovano dietro l'icona a hamburger in alto a destra nell'intestazione.

:::info
Le schede e gli strumenti che vedete variano da chiesa a chiesa. Gli amministratori controllano quali sezioni sono visibili ai membri tramite B1 Admin: se non vedete una funzione descritta qui, la vostra chiesa potrebbe non averla attivata.
:::
