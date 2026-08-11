---
title: "Live streaming"
---

# Live streaming

<div class="article-intro">

La pagina Orari dello streaming dal vivo ti permette di configurare il programma di streaming della tua chiesa, gestire gli orari di servizio e personalizzare l'esperienza dello spettatore. Configura servizi settimanali ricorrenti o eventi una tantum, configura le impostazioni della chat e dei video e controlla quando il tuo stream trasmette in diretta.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno dell'autorizzazione **contentApi.streamingServices.edit**. Vedi [Ruoli e autorizzazioni](../settings/roles-permissions.md) se non hai accesso.
- Hai il tuo ID canale YouTube pronto se intendi utilizzare lo streaming dal vivo automatizzato
- Aggiungi almeno un [sermone](managing-sermons) o un URL dal vivo permanente per usare come fonte di stream

</div>

La pagina ha due schede principali: **Servizi** per gestire il tuo programma di streaming dal vivo e **Impostazioni** per configurare la tua pagina di streaming.

## Gestione dei servizi

### Aggiunta di un servizio

1. In B1 Admin, apri il **menu sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia) e scegli **Sermoni**, quindi fai clic sulla scheda **Orari dello streaming dal vivo**.
2. Fai clic sul pulsante **Aggiungi servizio** per creare un nuovo servizio programmato.
3. Immetti un **Nome servizio** (ad esempio, "Domenica mattina").
4. Imposta l'**Ora di servizio** -- scegli il giorno e l'ora in cui il tuo servizio inizia.
5. Imposta **Ricorre settimanalmente** a **Sì** per servizi settimanali regolari, o **No** per un evento una tantum.

### Configurazione delle impostazioni della chat e del video

6. Sotto **Impostazioni chat**, imposta quanti minuti prima e dopo il servizio la chat dovrebbe essere abilitata. Questo permette ai visitatori di iniziare a chattare prima che il servizio inizi e continui dopo.
7. Sotto **Impostazioni video**, imposta quanto presto iniziare la trasmissione video per il conto alla rovescia o il contenuto pre-servizio.
8. Seleziona quale sermone riprodurre dal dropdown:
   - **Ultimo sermone** -- Riproduce automaticamente il tuo video aggiunto più di recente.
   - **Servizio dal vivo corrente** -- Riproduce il tuo stream dal vivo corrente da YouTube utilizzando il tuo ID canale.
   - Puoi anche scegliere qualsiasi sermone specifico che hai già salvato.
9. Fai clic su **Salva** per programmare il tuo servizio.

:::info
Il tuo servizio si aggiornerà automaticamente ogni settimana se impostato su ricorrente. Puoi aggiungere tutti i servizi di cui hai bisogno. I visitatori vedranno l'ora del servizio successivo programmato quando visitano la tua pagina di streaming.
:::

## Impostazioni della pagina di streaming

Fai clic sulla scheda **Impostazioni** per personalizzare le schede e i link che appaiono insieme al tuo stream dal vivo.

### Aggiunta di schede

1. Fai clic sul pulsante **Aggiungi** per aggiungere una nuova scheda alla tua pagina di streaming dal vivo.
2. Scegli la scheda pre-progettata **Chat** o aggiungi una scheda personalizzata con un URL esterno.
3. Per la scheda Chat, dai solo un nome nella casella **Testo scheda** e la configurazione è completata.
4. Per una scheda collegata, immetti il nome della scheda, scegli un'icona facendo clic sul pulsante dell'icona e immetti l'URL.
5. Le tue schede configurate appariranno sulla pagina di streaming dal vivo per i visitatori ad accedere a risorse aggiuntive e funzioni interattive.

### Anteprima del tuo stream

Fai clic sul pulsante **Visualizza il tuo stream** per vedere esattamente come la tua pagina di streaming dal vivo apparirà ai visitatori, inclusi il tuo logo, gli orari di servizio e le schede configurate.

## Configurazione del tuo YouTube Live Stream

Per connettere il tuo canale YouTube per lo streaming dal vivo automatizzato:

1. Vai a **Sermoni** e fai clic su **Aggiungi sermone**, quindi seleziona **Aggiungi URL dal vivo permanente**.
2. Il provider video è impostato su **YouTube Live Stream corrente**. Immetti il tuo **ID canale YouTube**.
3. Aggiungi un titolo e una descrizione, quindi fai clic su **Salva**.
4. In **Orari dello streaming dal vivo**, crea un servizio e seleziona il tuo URL dal vivo permanente dal dropdown del sermone.

:::tip
Per trovare il tuo ID canale YouTube, vai alle impostazioni avanzate del tuo canale YouTube e copia il valore ID canale.
:::

## Personalizzazione di colori e logo

La tua pagina di streaming dal vivo usa le impostazioni di [Aspetto](../website/appearance) del tuo sito web:

- Il **colore accento chiaro** con testo scuro viene utilizzato per l'intestazione.
- Il **colore accento scuro** con testo chiaro viene utilizzato per la barra laterale.
- Il tuo **Logo sfondo chiaro** appare sulla pagina di streaming. Usa un'immagine con sfondo trasparente e rapporto di aspetto 4:1.

Per modificare questi, vai a **Sito web** quindi **Aspetto** e aggiorna le tue impostazioni di [Tavolozza colori](../website/appearance#color-palette) e [Logo](../website/appearance#logo-and-branding).

## Aggiunta di host di streaming

Per dare ai componenti del team accesso alla chat solo per i host accanto alla chat pubblica:

1. Apri il **menu sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia), scegli **Impostazioni** e fai clic su **Ruoli**.
2. Fai clic sul pulsante più e seleziona **Aggiungi ruolo personalizzato**.
3. Nomina il ruolo "Host di streaming" e fai clic su **Salva**.
4. Fai clic sul nuovo ruolo, quindi fai clic su **Aggiungi** nella sezione Membri per aggiungere persone.
5. Scorri verso il basso a **Modifica autorizzazioni**, espandi la sezione **Contenuto** e spunta **Host Chat**.

Quando i host accedono alla pagina di streaming dal vivo, una scheda **Host Chat** privata appare accanto alla chat pubblica per la conversazione solo dello staff durante la trasmissione.

:::info
Per più dettagli su creazione di ruoli e gestione delle autorizzazioni, vedi [Ruoli e autorizzazioni](../settings/roles-permissions.md).
:::

## Risoluzione dei problemi

Se il tuo stream dal vivo YouTube automatizzato non visualizza correttamente quando usi l'opzione "YouTube Live Stream corrente" con il tuo ID canale, prova quanto segue:

**Sintomi:**
- L'embed dello stream dal vivo mostra "Video non disponibile"
- La pagina carica ma nessun video appare
- I diretti di YouTube funzionano, ma lo stream dal vivo del canale automatizzato no

**Soluzione:**
Controlla il tuo canale YouTube per gli stream dal vivo programmati vecchi o imminenti e cancellali:

1. Vai al tuo YouTube Studio.
2. Vai a **Contenuto** quindi **Live**.
3. Cerca gli stream dal vivo programmati vecchi o imminenti.
4. Elimina questi vecchi o pianificati voci di stream dal vivo.
5. Prova di nuovo la tua pagina di streaming dal vivo.

:::warning
L'embed dello stream dal vivo del canale automatizzato di YouTube può essere bloccato quando ci sono più voci di stream dal vivo programmati o passati nel tuo canale. La rimozione di questi permette a YouTube di identificare e servire correttamente il tuo stream dal vivo corrente.
:::

**Requisiti aggiuntivi:**
- Il tuo stream dal vivo deve essere impostato a **Pubblico** (non Non elencato o Privato).
- L'embedding deve essere consentito nelle impostazioni del tuo stream YouTube.
- Assicurati di stare usando il provider **YouTube Live Stream corrente** (con ID canale), non il provider **YouTube** (con ID video).

## Prossimi passi

- [Gestione sermoni](managing-sermons) -- Aggiungi sermoni alla tua libreria
- [Playlist](playlists) -- Organizza sermoni in serie
