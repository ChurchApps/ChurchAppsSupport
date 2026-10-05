---
title: "Trasmissione in Diretta"
---

# Trasmissione in Diretta

<div class="article-intro">

La pagina Live Stream Times ti consente di configurare il programma di streaming della tua chiesa, gestire gli orari dei servizi e personalizzare l'esperienza dello spettatore. Configura servizi settimanali ricorrenti o eventi una tantum, configura le impostazioni della chat e del video e controlla quando il tuo flusso va in diretta.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno dell'autorizzazione **contentApi.streamingServices.edit**. Vedi [Ruoli e Autorizzazioni](../settings/roles-permissions.md) se non hai accesso.
- Tieni pronto il tuo YouTube Channel ID se hai intenzione di utilizzare lo streaming live automatico
- Aggiungi almeno un [sermone](managing-sermons) o un URL live permanente da utilizzare come fonte del flusso

</div>

La pagina ha due schede principali: **Services** per gestire il programma dello streaming live e **Settings** per configurare la tua pagina di streaming.

## Gestione dei Servizi

### Aggiunta di un Servizio

1. In B1 Admin, apri il [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Sermons**, e fai clic su **Live Stream Times**.
2. Fai clic sul pulsante **Add Service** per creare un nuovo servizio pianificato.
3. Immetti un **Service Name** (ad esempio, "Sunday Morning").
4. Imposta il **Service Time** -- scegli il giorno e l'ora in cui inizia il tuo servizio.
5. Imposta **Recurs Weekly** su **Yes** per i servizi settimanali regolari, o **No** per un evento una tantum.

### Configurazione delle Impostazioni di Chat e Video

6. Sotto **Chat Settings**, imposta quanti minuti prima e dopo il servizio la chat dovrebbe essere abilitata. Questo consente ai visitatori di iniziare a chattare prima che il servizio inizi e continuare in seguito.
7. Sotto **Video Settings**, imposta quanto tempo prima iniziare il flusso video per il conto alla rovescia o il contenuto pre-servizio.
8. Seleziona quale sermone riprodurre dal menu a discesa:
   - **Latest Sermon** -- Riproduce automaticamente il tuo video aggiunto più di recente.
   - **Current Live Service** -- Riproduce il tuo flusso live attuale da YouTube usando il tuo Channel ID.
   - Puoi anche scegliere qualsiasi sermone specifico che hai già salvato.
9. Fai clic su **Save** per pianificare il tuo servizio.

:::info
Il tuo servizio si aggiornerà automaticamente ogni settimana se impostato su ricorrente. Puoi aggiungere tanti servizi quanti ne hai bisogno. I visitatori vedranno l'orario del servizio pianificato successivo quando visitano la tua pagina di streaming.
:::

## Impostazioni della Pagina di Streaming

Fai clic sulla scheda **Settings** per personalizzare le schede e i link che appaiono accanto al tuo streaming live.

### Aggiunta di Schede

1. Fai clic sul pulsante **Add** per aggiungere una nuova scheda alla tua pagina di streaming live.
2. Scegli la scheda pre-progettata **Chat** o aggiungi una scheda personalizzata con un URL esterno.
3. Per la scheda Chat, basta assegnarle un nome nella casella **Tab Text** e la configurazione è completa.
4. Per una scheda collegata, inserisci il nome della scheda, scegli un'icona facendo clic sul pulsante icona, e inserisci l'URL.
5. Le tue schede configurate appariranno sulla pagina di streaming live per consentire ai visualizzatori di accedere a risorse aggiuntive e funzionalità interattive.

### Anteprima del Tuo Streaming

Fai clic sul pulsante **View Your Stream** per vedere esattamente come apparirà la tua pagina di streaming live ai visitatori, incluso il tuo logo, gli orari dei servizi e le schede configurate.

## Configurazione del Tuo Streaming Live di YouTube

Per collegare il tuo canale YouTube per lo streaming live automatico:

1. Vai a **Sermons** e fai clic su **Add Sermon**, quindi seleziona **Add Permanent Live URL**.
2. Il fornitore video è predefinito su **Current YouTube Live Stream**. Inserisci il tuo **YouTube Channel ID**.
3. Aggiungi un titolo e una descrizione, quindi fai clic su **Save**.
4. In **Live Stream Times**, crea un servizio e seleziona il tuo URL live permanente dal menu a discesa dei sermoni.

:::tip
Per trovare il tuo YouTube Channel ID, vai alle impostazioni avanzate del tuo canale YouTube e copia il valore Channel ID.
:::

## Personalizzazione dei Colori e del Logo

La tua pagina di streaming live utilizza le impostazioni [Appearance](../website/appearance) del tuo sito web:

- Il **colore accento leggero** con testo scuro viene utilizzato per l'intestazione.
- Il **colore accento scuro** con testo leggero viene utilizzato per la barra laterale.
- Il tuo **Light Background Logo** appare sulla pagina di streaming. Usa un'immagine con uno sfondo trasparente e un rapporto di aspetto 4:1.

Per modificare questi, vai a **Website** quindi **Appearance** e aggiorna le impostazioni della [Color Palette](../website/appearance#color-palette) e del [Logo](../website/appearance#logo-and-branding).

## Aggiunta di Host di Streaming

Per dare ai membri del team accesso alla chat solo per host accanto alla chat pubblica:

1. Nel Jump menu, scegli **Settings > Roles**.
2. Fai clic sul pulsante più e seleziona **Add Custom Role**.
3. Nomina il ruolo "Streaming Host" e fai clic su **Save**.
4. Fai clic sul nuovo ruolo, quindi fai clic su **Add** nella sezione Members per aggiungere persone.
5. Scorri verso il basso fino a **Edit Permissions**, espandi la sezione **Content**, e seleziona **Host Chat**.

Quando gli host accedono alla pagina di streaming live, appare una scheda **Host Chat** privata accanto alla chat pubblica per la conversazione solo per lo staff durante la trasmissione.

:::info
Per ulteriori dettagli sulla creazione di ruoli e la gestione delle autorizzazioni, vedi [Ruoli e Autorizzazioni](../settings/roles-permissions.md).
:::

## Risoluzione dei Problemi

Se il tuo streaming live automatico di YouTube non viene visualizzato correttamente quando usi l'opzione "Current YouTube Live Stream" con il tuo Channel ID, prova quanto segue:

**Sintomi:**
- L'embed dello streaming live mostra "Video unavailable"
- La pagina si carica ma non appare alcun video
- Gli embed di YouTube diretti funzionano, ma lo streaming live del canale automatico no

**Soluzione:**
Controlla il tuo canale YouTube per i flussi live pianificati vecchi o imminenti ed eliminali:

1. Vai al tuo YouTube Studio.
2. Naviga a **Content** quindi **Live**.
3. Cerca eventuali life pianificate vecchie o streaming pianificati imminenti.
4. Elimina queste voci di streaming live vecchie o pianificate.
5. Prova di nuovo la tua pagina di streaming live.

:::warning
L'embed dello streaming live del canale automatico di YouTube può essere bloccato quando ci sono più voci di streaming live pianificate o passate nel tuo canale. La rimozione di questi consente a YouTube di identificare e servire correttamente il tuo flusso live attuale.
:::

**Requisiti aggiuntivi:**
- Il tuo streaming live deve essere impostato su **Public** (non Unlisted o Private).
- L'embedding deve essere consentito nelle impostazioni dello streaming di YouTube.
- Assicurati di utilizzare il fornitore **Current YouTube Live Stream** (con Channel ID), non il fornitore **YouTube** (con Video ID).

## Passaggi Successivi

- [Managing Sermons](managing-sermons) -- Aggiungi sermoni alla tua libreria
- [Playlists](playlists) -- Organizza i sermoni in serie
