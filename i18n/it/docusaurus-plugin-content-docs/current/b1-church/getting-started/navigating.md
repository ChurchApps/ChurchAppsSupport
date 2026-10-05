---
title: "Navigazione di B1App"
---

# Navigazione di B1App

<div class="article-intro">

Il portale dei membri in B1.church è un'app web-first per telefoni che si trova sotto `/mobile`. Funziona in qualsiasi browser e può essere installato sulla tua schermata iniziale. Questa pagina spiega la dashboard Home, la barra delle schede in basso, il menu Altro e la pagina Me.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Devi essere [connesso](./logging-in.md) per visualizzare le tue informazioni personali. I visitatori disconnessi possono comunque sfogliare il contenuto pubblico e ricevono un pulsante **Accedi** dove una funzione richiede un account.

</div>

## Home

L'apertura di `https://yourchurchname.b1.church/mobile` ti porta alla dashboard **Home** in `/mobile/dashboard`. Home è la pagina di destinazione del portale dei membri e mostra:

- Un saluto con il tuo nome
- Il versetto del giorno
- Una scheda in primo piano per qualsiasi cosa la tua chiesa abbia evidenziato
- Una griglia **Esplora** degli strumenti che la tua chiesa ha attivato -- gruppi, donazioni, check-in, sermoni, piani e altro

Toccando una scheda in Esplora si apre quello strumento. Se la tua chiesa ha più strumenti di quanti ne rientrino nella dashboard, l'ultima scheda è **Altro**, che apre l'elenco completo in `/mobile/more`.

Se sei disconnesso, Home mostra un titolo **Benvenuto** al posto del saluto, con un breve prompt ("Accedi per vedere i tuoi gruppi, donazioni e altro.") e un pulsante **Accedi**. La tua chiesa può riformulare questo prompt o nasconderlo -- consulta [Impostazioni App Mobile](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Quando è nascosto, puoi comunque accedere dal menu o dalla scheda Me.

## La Barra delle Schede in Basso

Su un telefono, una barra delle schede è fissa nella parte inferiore dello schermo:

- **Home** -- sempre la prima scheda
- Fino a tre delle schede configurate dalla tua chiesa
- **Altro** -- apre il menu di navigazione

Se la tua chiesa ha configurato più di tre schede, il resto non va perso: appaiono nel menu **Altro** e nella griglia Esplora della dashboard. Gli amministratori della chiesa impostano l'ordine delle schede in B1 Admin sotto **Mobile → Navigazione**.

## Il Menu

Toccando **Altro** si apre il menu di navigazione. Su un tablet o desktop lo stesso menu è sempre visibile lungo il lato sinistro dello schermo. Contiene:

- Il tuo nome e foto, con un collegamento rapido **Modifica Profilo** -- consulta [Modifica del Tuo Profilo](./editing-your-profile.md)
- **Home** e **Me**
- **Portale Amministratore** -- mostrato solo se hai autorizzazioni di amministratore presso la tua chiesa; apre B1 Admin
- Ogni scheda che la tua chiesa ha configurato, in ordine
- **Installa App** -- apre le [istruzioni di installazione](./installing-pwa.md) in `/mobile/install`
- Un interruttore della modalità chiara/scura
- **Accedi** o **Esci**
- Il nome della tua chiesa e un collegamento all'informativa sulla privacy

## La Barra delle App

La barra sulla parte superiore di ogni schermata mostra:

- Il titolo della schermata, o il nome della tua chiesa su Home
- Una freccia indietro quando hai approfondito una schermata di dettaglio
- Un'icona **campana** per notifiche e messaggi, con un badge per gli elementi non letti
- La tua **foto del profilo**, che apre il tuo profilo in `/mobile/profileEdit` -- consulta [Modifica del Tuo Profilo](./editing-your-profile.md)

## La Pagina Me

**Me** (`/mobile/me`) è il tuo hub personale. Elenca i collegamenti rapidi al tuo profilo, [preferenze di notifica](./notification-preferences.md), messaggi, [donazioni](../giving/), e [registrazioni](../events/my-registrations.md), seguite da cosa sta arrivando per te -- assegnazioni di servizio, registrazioni di eventi e eventi di gruppo -- e le tue notifiche più recenti. Consulta [La Pagina Me](./me-page) per i dettagli.

Se sei disconnesso, la pagina Me mostra invece un pulsante **Accedi**.

## Installazione sulla Tua Schermata Iniziale

Il portale dei membri è un'App Web Progressiva. Visita `/mobile/install` (o scegli **Installa App** nel menu) per istruzioni passo dopo passo per il tuo dispositivo. Una volta installato, si apre a schermo intero dalla tua schermata iniziale senza il chrome del browser. Consulta [Installazione come App (PWA)](./installing-pwa.md).

## Il Sito Web Pubblico della Tua Chiesa

Al di fuori del portale dei membri, il sito web pubblico della tua chiesa ha la sua propria navigazione dell'intestazione con i collegamenti configurati dagli amministratori -- pagine come [sermoni](../content/sermons.md), la [Bibbia](../content/bible.md), [streaming dal vivo](../content/live-streaming.md) e un elenco di gruppi pubblici. Su un telefono quei collegamenti vivono dietro l'icona dell'hamburger in alto a destra dell'intestazione.

:::info
Le schede e gli strumenti che vedi variano a seconda della chiesa. Gli amministratori controllano quali sezioni sono visibili ai membri tramite B1 Admin, quindi se non vedi una funzione descritta qui, la tua chiesa potrebbe non averla attivata.
:::
