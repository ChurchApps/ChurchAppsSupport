---
title: "Streaming dal vivo"
---

# Streaming dal vivo

<div class="article-intro">

La pagina Orari streaming dal vivo ti permette di configurare il programma di streaming della tua chiesa, gestire gli orari dei servizi e personalizzare l'esperienza degli spettatori. Imposta servizi settimanali ricorrenti o eventi unici, configura le impostazioni di chat e video, e controlla quando il tuo stream va in diretta.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno del permesso **contentApi.streamingServices.edit**. Vedi [Ruoli e permessi](../settings/roles-permissions.md) se non hai accesso.
- Tieni pronto il tuo YouTube Channel ID se prevedi di usare lo streaming dal vivo automatizzato
- Aggiungi almeno un [sermone](managing-sermons) o un URL live permanente da usare come fonte del tuo stream

</div>

La pagina ha due schede principali: **Services** per gestire il tuo programma di streaming dal vivo e **Settings** per configurare la tua pagina di streaming.

## Gestire i servizi

### Aggiungere un servizio

1. In B1 Admin, clicca **Sermons** nella barra laterale sinistra, poi clicca la scheda **Live Stream Times**.
2. Clicca il pulsante **Add Service** per creare un nuovo servizio programmato.
3. Inserisci un **Service Name** (ad esempio, "Servizio domenicale").
4. Imposta il **Service Time** -- scegli il giorno e l'ora di inizio del tuo servizio.
5. Imposta **Recurs Weekly** su **Yes** per servizi settimanali regolari, o **No** per un evento unico.

### Configurare le impostazioni di chat e video

6. In **Chat Settings**, imposta quanti minuti prima e dopo il servizio la chat deve essere abilitata. Questo permette ai visitatori di iniziare a chattare prima dell'inizio del servizio e continuare dopo.
7. In **Video Settings**, imposta quanto presto avviare lo stream video per il conto alla rovescia o il contenuto pre-servizio.
8. Seleziona quale sermone riprodurre dal menu a tendina:
   - **Latest Sermon** -- Riproduce automaticamente il video aggiunto più di recente.
   - **Current Live Service** -- Riproduce il tuo streaming dal vivo corrente da YouTube usando il tuo Channel ID.
   - Puoi anche scegliere qualsiasi sermone specifico che hai già salvato.
9. Clicca **Save** per programmare il tuo servizio.

:::info
Il tuo servizio si aggiornerà automaticamente ogni settimana se impostato come ricorrente. Puoi aggiungere quanti servizi vuoi. I visitatori vedranno il prossimo orario di servizio programmato quando visitano la tua pagina di streaming.
:::

## Impostazioni della pagina di streaming

Clicca la scheda **Settings** per personalizzare le schede e i link che appaiono insieme al tuo streaming dal vivo.

### Aggiungere schede

1. Clicca il pulsante **Add** per aggiungere una nuova scheda alla tua pagina di streaming dal vivo.
2. Scegli tra schede pre-progettate (**Chat** o **Prayer**) o aggiungi una scheda personalizzata con un URL esterno.
3. Per le schede pre-progettate, dai semplicemente un nome nella casella **Tab Text** e la configurazione è completa.
4. Per una scheda collegata, inserisci il nome della scheda, scegli un'icona cliccando il pulsante icona e inserisci l'URL.
5. Le tue schede configurate appariranno sulla pagina di streaming dal vivo per gli spettatori per accedere a risorse aggiuntive e funzionalità interattive.

### Visualizzare l'anteprima del tuo stream

Clicca il pulsante **View Your Stream** per vedere esattamente come apparirà la tua pagina di streaming dal vivo ai visitatori, incluso il tuo logo, gli orari dei servizi e le schede configurate.

## Configurare il tuo streaming dal vivo YouTube

Per collegare il tuo canale YouTube per lo streaming dal vivo automatico:

1. Vai su **Sermons** e clicca **Add Sermon**, poi seleziona **Add Permanent Live URL**.
2. Il provider video predefinito è **Current YouTube Live Stream**. Inserisci il tuo **YouTube Channel ID**.
3. Aggiungi un titolo e una descrizione, poi clicca **Save**.
4. In **Live Stream Times**, crea un servizio e seleziona il tuo URL live permanente dal menu a tendina dei sermoni.

:::tip
Per trovare il tuo YouTube Channel ID, vai nelle impostazioni avanzate del tuo canale YouTube e copia il valore Channel ID.
:::

## Personalizzare colori e logo

La tua pagina di streaming dal vivo usa le impostazioni [Aspetto](../website/appearance) del tuo sito web:

- Il **colore accent chiaro** con testo scuro è usato per l'intestazione.
- Il **colore accent scuro** con testo chiaro è usato per la barra laterale.
- Il tuo **Logo sfondo chiaro** appare sulla pagina di streaming. Usa un'immagine con sfondo trasparente e un rapporto d'aspetto 4:1.

Per cambiarli, vai su **Website** poi **Appearance** e aggiorna le tue impostazioni [Palette colori](../website/appearance#color-palette) e [Logo](../website/appearance#logo-and-branding).

## Aggiungere host di streaming

Per dare ai membri del team capacità di host (moderazione chat, risposte alle richieste di preghiera):

1. Vai su **Settings** nella barra laterale sinistra e clicca **Roles**.
2. Clicca il pulsante più e seleziona **Add Custom Role**.
3. Nomina il ruolo "Streaming Host" e clicca **Save**.
4. Clicca il nuovo ruolo, poi clicca **Add** nella sezione Members per aggiungere persone.
5. Scorri fino a **Edit Permissions**, espandi la sezione **Content** e spunta **Host Chat**.

Quando gli host accedono alla pagina di streaming dal vivo, avranno capacità speciali inclusa la moderazione della chat e la gestione delle richieste di preghiera.

:::info
Per maggiori dettagli sulla creazione di ruoli e la gestione dei permessi, vedi [Ruoli e permessi](../settings/roles-permissions.md).
:::

## Risoluzione problemi

Se il tuo streaming dal vivo YouTube automatizzato non si visualizza correttamente quando usi l'opzione "Current YouTube Live Stream" con il tuo Channel ID, prova quanto segue:

**Sintomi:**
- L'embed dello streaming dal vivo mostra "Video unavailable"
- La pagina si carica ma nessun video appare
- Gli embed YouTube diretti funzionano, ma lo streaming dal vivo automatizzato del canale no

**Soluzione:**
Controlla il tuo canale YouTube per vecchi streaming dal vivo programmati o imminenti ed eliminali:

1. Vai al tuo YouTube Studio.
2. Naviga su **Content** poi **Live**.
3. Cerca qualsiasi vecchio streaming programmato o streaming imminenti programmati.
4. Elimina queste vecchie voci di streaming dal vivo programmate.
5. Testa di nuovo la tua pagina di streaming dal vivo.

:::warning
L'embed automatizzato dello streaming dal vivo del canale YouTube può essere bloccato quando ci sono multiple voci di streaming programmati o passati nel tuo canale. Rimuoverli permette a YouTube di identificare e servire correttamente il tuo streaming dal vivo corrente.
:::

**Requisiti aggiuntivi:**
- Il tuo streaming dal vivo deve essere impostato su **Public** (non Unlisted o Private).
- L'embedding deve essere consentito nelle impostazioni del tuo stream YouTube.
- Assicurati di usare il provider **Current YouTube Live Stream** (con Channel ID), non il provider **YouTube** (con Video ID).

## Prossimi passi

- [Gestione sermoni](managing-sermons) -- Aggiungi sermoni alla tua libreria
- [Playlist](playlists) -- Organizza i sermoni in serie
