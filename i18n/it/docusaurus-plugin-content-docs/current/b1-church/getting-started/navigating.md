---
title: "Navigazione in B1App"
---

# Navigazione in B1App

<div class="article-intro">

Il portale dei membri in B1.church è un'app web mobile-first che si trova sotto `/mobile`. Funziona in qualsiasi browser e può essere installata nella schermata iniziale. Questa pagina spiega il dashboard Home, la barra di schede in basso, il menu Altro e la pagina Me.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Devi essere [registrato](./logging-in.md) per visualizzare le tue informazioni personali. I visitatori non registrati possono comunque sfogliare il contenuto pubblico e gli viene offerto un pulsante Accedi dove una funzione richiede un account.

</div>

## Home

Aprendo `https://nometuachiesa.b1.church/mobile` ti porta al dashboard **Home** a `/mobile/dashboard`. Home è la pagina di destinazione del portale dei membri e mostra:

- Un saluto con il tuo nome
- Il versetto del giorno
- Una scheda in evidenza per tutto ciò che la tua chiesa ha evidenziato
- Una griglia **Esplora** degli strumenti che la tua chiesa ha attivato - gruppi, donazioni, check-in, sermoni, piani e altro

Toccando una scheda in Esplora si apre quello strumento. Se la tua chiesa ha più strumenti di quanti ne possono stare nel dashboard, l'ultima scheda è **Altro**, che apre l'elenco completo a `/mobile/more`.

## La Barra di Schede Inferiore

Su un telefono, una barra di schede è fissa nella parte inferiore dello schermo:

- **Home** - sempre la prima scheda
- Fino a tre delle schede che la tua chiesa ha configurato
- **Altro** - apre il menu di navigazione

Se la tua chiesa ha configurato più di tre schede, il resto non è perso: appaiono nel menu **Altro** e nella griglia Esplora del dashboard. Gli amministratori della chiesa impostano l'ordine delle schede in B1 Admin in **Mobile → Navigazione**.

## Il Menu

Toccando **Altro** si apre il menu di navigazione. Su un tablet o desktop lo stesso menu è sempre visibile lungo il lato sinistro dello schermo. Contiene:

- Il tuo nome e foto, con un collegamento **Modifica Profilo** — vedi [Modifica del Tuo Profilo](./editing-your-profile.md)
- **Home** e **Me**
- **Portale Admin** - mostrato solo se hai permessi di amministratore nella tua chiesa; apre B1 Admin
- Ogni scheda che la tua chiesa ha configurato, in ordine
- **Installa App** - apre le [istruzioni di installazione](./installing-pwa.md) a `/mobile/install`
- Un interruttore modalità chiaro/scuro
- **Accedi** o **Esci**
- Il nome della tua chiesa e un link alla politica sulla privacy

## La Barra dell'App

La barra nella parte superiore di ogni schermo mostra:

- Il titolo dello schermo o il nome della tua chiesa su Home
- Una freccia indietro quando hai fatto clic su una schermata di dettaglio
- Un'icona **campanello** per notifiche e messaggi, con un badge per elementi non letti
- La tua **foto profilo**, che apre il tuo profilo a `/mobile/profileEdit` — vedi [Modifica del Tuo Profilo](./editing-your-profile.md)

## La Pagina Me

**Me** (`/mobile/me`) è il tuo hub personale. Elenca i collegamenti ai tuoi profili, [preferenze di notifica](./notification-preferences.md), messaggi, [donazioni](../giving/), e [registrazioni](../events/my-registrations.md), seguiti da ciò che ti aspetta - incarichi di servizio, registrazioni a eventi e eventi di gruppo - e le tue notifiche più recenti. Vedi [La Pagina Me](./me-page) per i dettagli.

Se sei disconnesso, la pagina Me mostra invece un pulsante **Accedi**.

## Installazione nella Schermata Iniziale

Il portale dei membri è un'app web progressiva. Visita `/mobile/install` (o scegli **Installa App** nel menu) per le istruzioni passo dopo passo per il tuo dispositivo. Una volta installato, si apre a schermo intero dalla tua schermata iniziale senza interfaccia del browser. Vedi [Installazione come App (PWA)](./installing-pwa.md).

## Il Sito Web Pubblico della Tua Chiesa

Fuori dal portale dei membri, il sito web pubblico della tua chiesa ha la sua propria navigazione di intestazione con i link che i tuoi amministratori hanno configurato - pagine come [sermoni](../content/sermons.md), la [Bibbia](../content/bible.md), [streaming live](../content/live-streaming.md) e un elenco di gruppi pubblici. Su un telefono questi link si trovano dietro l'icona hamburger in alto a destra dell'intestazione.

:::info
Le schede e gli strumenti che vedi variano in base alla chiesa. Gli amministratori controllano quali sezioni sono visibili ai membri attraverso B1 Admin, quindi se non vedi una funzione descritta qui, la tua chiesa potrebbe non averla attivata.
:::
