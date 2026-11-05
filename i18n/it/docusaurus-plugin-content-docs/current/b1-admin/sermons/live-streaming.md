---
title: "Trasmissione in diretta"
---

# Trasmissione in diretta

<div class="article-intro">

La pagina Orari della diretta ti permette di configurare il calendario delle trasmissioni della tua chiesa, gestire gli orari dei culti e personalizzare l'esperienza degli spettatori. Imposta culti settimanali ricorrenti o eventi una tantum, configura le impostazioni di chat e video e decidi quando la tua diretta va online.

</div>

## Video di formazione

<YouTube id="tpEY-sEYW6A" title="Configurare la trasmissione in diretta in B1" next="Personalizzare l'app per i membri della tua chiesa in B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve il permesso **contentApi.streamingServices.edit**. Vedi [Ruoli e permessi](../settings/roles-permissions.md) se non hai accesso.
- Tieni pronto il tuo ID canale YouTube se intendi usare la trasmissione in diretta automatica
- Aggiungi almeno un [sermone](managing-sermons) o un URL di diretta permanente da usare come fonte della trasmissione

</div>

La trasmissione in diretta si gestisce da due pagine della sezione **Sermoni** del menu di navigazione rapida: **Orari della diretta** per gestire il calendario delle dirette e **Impostazioni** per configurare le schede della tua pagina di streaming.

## Gestire i culti

### Aggiungere un culto

1. In B1 Admin, apri il [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Sermoni** e clicca su **Orari della diretta**.
2. Clicca sul pulsante **Aggiungi culto** in cima alla pagina per creare un nuovo culto in programma. I culti esistenti sono elencati in una tabella che mostra il nome, l'orario, il fornitore e la durata di ciascun culto; clicca sull'icona di modifica di una riga per cambiarlo.
3. Inserisci un **Nome del culto** (ad esempio "Culto della domenica mattina").
4. Imposta l'**Orario del culto** -- scegli il giorno e l'ora di inizio del culto.
5. Imposta **Si ripete ogni settimana** su **Sì** per i culti settimanali regolari, oppure su **No** per un evento una tantum.

### Configurare le impostazioni di chat e video

6. Nella sezione **Impostazioni chat**, imposta quanti minuti prima e dopo il culto la chat deve essere attiva. Così i visitatori possono iniziare a chattare prima dell'inizio del culto e continuare dopo.
7. Nella sezione **Impostazioni video**, imposta con quanto anticipo avviare il flusso video per il conto alla rovescia o per i contenuti precedenti al culto. La chat si apre quei minuti *prima* dell'inizio anticipato del video, quindi l'orario mostrato accanto all'impostazione dei minuti di chat prima del culto tiene conto di entrambi i valori. Ad esempio, un culto alle 10:00 con 15 minuti di chat prima e un avvio anticipato del video di 5 minuti apre la chat alle 9:40.
8. Seleziona il sermone da riprodurre dal menu a tendina:
   - **Ultimo sermone** -- Riproduce automaticamente il video aggiunto più di recente.
   - **Culto in diretta attuale** -- Riproduce la tua diretta attuale da YouTube usando il tuo ID canale.
   - Puoi anche scegliere un sermone specifico che hai già salvato.
9. Clicca su **Salva** per programmare il culto.

:::info
Se impostato come ricorrente, il culto si aggiorna automaticamente ogni settimana. Resta alla stessa ora locale quando inizia o finisce l'ora legale. Puoi aggiungere tutti i culti che ti servono. I visitatori vedranno il prossimo orario di culto programmato quando visitano la tua pagina di streaming.
:::

## Impostazioni della pagina di streaming

Per personalizzare le schede e i link che compaiono accanto alla tua diretta, apri il menu di navigazione rapida, espandi **Sermoni** e clicca su **Impostazioni**. La pagina **Impostazioni streaming** mostra l'elenco delle tue **Schede di contenuto**.

### Aggiungere schede

1. Clicca sul pulsante **Aggiungi** per aggiungere una nuova scheda alla tua pagina di trasmissione in diretta.
2. Scegli un **Tipo di link**: **URL esterno** per un link personalizzato, oppure una delle schede predefinite **Chat** o **Preghiera**.
3. Per la scheda Chat, basta inserire un nome nella casella **Testo della scheda** e la configurazione è completa.
4. Per una scheda con link, inserisci il nome della scheda, scegli un'icona cliccando sul pulsante icona e inserisci l'URL.
5. Le schede configurate compariranno sulla pagina della trasmissione in diretta, così gli spettatori potranno accedere a risorse aggiuntive e funzioni interattive.

### Visualizzare in anteprima la tua diretta

Nella pagina **Orari della diretta**, clicca su **Visualizza la tua diretta** in cima alla pagina per vedere esattamente come apparirà la tua pagina di trasmissione agli ospiti, con il logo, gli orari dei culti e le schede configurate.

## Configurare la diretta YouTube

Per collegare il tuo canale YouTube per la trasmissione in diretta automatica:

1. Vai su **Sermoni** e clicca su **Aggiungi sermone**, poi seleziona **Aggiungi URL di diretta permanente**.
2. Il fornitore video è impostato di default su **Diretta YouTube attuale**. Inserisci il tuo **ID canale YouTube**.
3. Aggiungi un titolo e una descrizione, poi clicca su **Salva**.
4. In **Orari della diretta**, crea un culto e seleziona il tuo URL di diretta permanente dal menu a tendina dei sermoni.

:::tip
Per trovare il tuo ID canale YouTube, vai nelle impostazioni avanzate del tuo canale YouTube e copia il valore dell'ID canale.
:::

## Personalizzare colori e logo

La tua pagina di trasmissione in diretta usa le impostazioni di [Aspetto](../website/appearance) del tuo sito web:

- Il **colore di accento chiaro** con testo scuro è usato per l'intestazione.
- Il **colore di accento scuro** con testo chiaro è usato per la barra laterale.
- Il tuo **Logo per sfondo chiaro** compare sulla pagina di streaming. Usa un'immagine con sfondo trasparente e proporzioni 4:1.

Per cambiare questi elementi, vai su **Sito web** poi **Aspetto** e aggiorna le impostazioni della tua [Tavolozza dei colori](../website/appearance#color-palette) e del [Logo](../website/appearance#logo-and-branding).

## Aggiungere conduttori dello streaming

Per dare ai membri del team accesso alla chat riservata ai conduttori, accanto alla chat pubblica:

1. Nel menu di navigazione rapida, scegli **Impostazioni > Ruoli**.
2. Clicca sul pulsante più e seleziona **Aggiungi ruolo personalizzato**.
3. Assegna al ruolo il nome "Conduttore dello streaming" e clicca su **Salva**.
4. Clicca sul nuovo ruolo, poi clicca su **Aggiungi** nella sezione Membri per aggiungere persone.
5. Scorri fino a **Modifica permessi**, espandi la sezione **Contenuti** e seleziona **Chat dei conduttori**.

Quando i conduttori accedono alla pagina della trasmissione in diretta, accanto alla chat pubblica compare una scheda privata **Chat dei conduttori** per le conversazioni riservate allo staff durante la trasmissione.

:::info
Per maggiori dettagli sulla creazione dei ruoli e la gestione dei permessi, vedi [Ruoli e permessi](../settings/roles-permissions.md).
:::

## Risoluzione dei problemi

Se la tua diretta YouTube automatica non viene visualizzata correttamente con l'opzione "Diretta YouTube attuale" e il tuo ID canale, prova quanto segue:

**Sintomi:**
- L'incorporamento della diretta mostra "Video non disponibile"
- La pagina si carica ma non compare alcun video
- Gli incorporamenti diretti di YouTube funzionano, ma la diretta automatica del canale no

**Soluzione:**
Controlla il tuo canale YouTube per eventuali dirette vecchie o programmate in futuro ed eliminale:

1. Vai su YouTube Studio.
2. Vai su **Contenuti** poi **Dirette**.
3. Cerca eventuali dirette vecchie o programmate.
4. Elimina queste voci di diretta vecchie o programmate.
5. Verifica di nuovo la tua pagina di trasmissione in diretta.

:::warning
L'incorporamento automatico della diretta del canale YouTube può essere bloccato quando nel canale ci sono più voci di diretta programmate o passate. Eliminarle permette a YouTube di identificare e servire correttamente la tua diretta attuale.
:::

**Requisiti aggiuntivi:**
- La tua diretta deve essere impostata come **Pubblica** (non Non in elenco o Privata).
- Nelle impostazioni di streaming di YouTube deve essere consentito l'incorporamento.
- Assicurati di usare il fornitore **Diretta YouTube attuale** (con ID canale), non il fornitore **YouTube** (con ID video).

## Passi successivi

- [Gestire i sermoni](managing-sermons) -- aggiungi sermoni alla tua libreria
- [Playlist](playlists) -- organizza i sermoni in serie
