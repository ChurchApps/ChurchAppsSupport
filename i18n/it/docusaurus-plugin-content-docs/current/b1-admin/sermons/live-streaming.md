---
title: "Orari delle trasmissioni in diretta e configurazione in B1 Admin"
sidebar_label: "Trasmissione in diretta"
description: "Programma servizi in diretta settimanali o una tantum, imposta i tempi di chat e video anticipato, collega un canale YouTube e risolvi i problemi di incorporamento in B1 Admin."
---

# Trasmissione in diretta

<div class="article-intro">

La pagina Orari trasmissioni in diretta ti permette di configurare il calendario delle dirette della chiesa, gestire gli orari dei servizi e personalizzare l'esperienza degli spettatori. Imposta servizi settimanali ricorrenti o eventi una tantum, configura le impostazioni di chat e video e controlla quando la diretta va online.

</div>

## Video di formazione {#training-video}

<YouTube id="tpEY-sEYW6A" title="Configurare la trasmissione in diretta in B1" next="Personalizzare l'app per i membri della tua chiesa in B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'autorizzazione **Modifica servizi** nella sezione **Contenuti** del tuo ruolo. Vedi [Ruoli e autorizzazioni](../settings/roles-permissions.md) se non hai accesso.
- Tieni pronto il tuo ID del canale YouTube se prevedi di usare la trasmissione in diretta automatica
- Aggiungi almeno una [predica](./managing-sermons.md) o un URL di diretta permanente da usare come sorgente della trasmissione

</div>

La trasmissione in diretta si gestisce da due pagine nella sezione **Prediche** del menu di salto: **Orari trasmissioni in diretta** per gestire il calendario delle dirette e **Impostazioni** per configurare le schede della pagina di trasmissione.

## Gestire i servizi {#managing-services}

### Aggiungere un servizio {#adding-a-service}

1. In B1 Admin, apri il [menu di salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Prediche** e fai clic su **Orari trasmissioni in diretta**.
2. Fai clic sul pulsante **Aggiungi servizio** in cima alla pagina per creare un nuovo servizio programmato. I servizi esistenti sono elencati in una tabella che mostra il nome di ogni servizio (con un'etichetta **Settimanale** per i servizi ricorrenti), l'orario, il fornitore e la durata; passa sopra una riga e fai clic sull'icona di modifica per cambiarla.
3. Inserisci un **Nome servizio** (ad esempio, "Domenica mattina"). I nuovi servizi partono con il nome "Domenica mattina".
4. Imposta l'**Orario servizio** -- scegli la data e l'ora di inizio del servizio. I nuovi servizi partono alle 9:00 della prossima domenica.
5. Imposta **Si ripete ogni settimana** su **Sì** (**Settimanale**) per i servizi settimanali regolari, oppure su **No** (**Una tantum**) per un evento una tantum.

### Configurare le impostazioni di chat e video {#configuring-chat-and-video-settings}

6. Sotto **Impostazioni chat**, imposta **Abilita chat - Minuti prima** e **Abilita chat - Minuti dopo** -- quanti minuti prima e dopo il servizio la chat deve essere abilitata (10 per ciascuno nei nuovi servizi). Così gli spettatori possono iniziare a chattare prima dell'inizio del servizio e continuare dopo. L'orario accanto a ogni casella mostra quando la chat si apre e si chiude.
7. Sotto **Impostazioni video**, imposta **Avvia video in anticipo** -- quanti minuti prima avviare il flusso video, per un conto alla rovescia o contenuti pre-servizio. La chat si apre quel numero di minuti *prima* dell'avvio anticipato del video, quindi l'orario mostrato accanto all'impostazione dei minuti prima della chat tiene conto di entrambi i valori. Ad esempio, con un servizio alle 10:00, 15 minuti di chat prima e un avvio anticipato di 5 minuti, la chat si apre alle 9:40.
8. Seleziona cosa riprodurre dal menu a discesa **Predica**:
   - **Ultima predica** (**Automatico**) -- Riproduce automaticamente il video aggiunto più di recente.
   - I tuoi [URL di diretta permanenti](#setting-up-your-youtube-live-stream), elencati subito dopo -- ognuno riproduce l'attuale diretta del tuo canale da YouTube usando il tuo ID canale. Uno nuovo si chiama **Servizio in diretta attuale** finché non lo rinomini.
   - Sotto di essi, qualsiasi predica specifica che hai già salvato.
9. Fai clic su **Salva** per programmare il servizio, oppure su **Annulla** per chiudere il modulo.

Per rimuovere un servizio, modificalo, fai clic su **Elimina** e conferma.

:::info
Se impostato come ricorrente, il tuo servizio si aggiorna automaticamente ogni settimana. Resta alla stessa ora locale quando inizia o finisce l'ora legale. Puoi aggiungere tutti i servizi che ti servono. I visitatori vedranno il prossimo orario di servizio programmato quando accedono alla tua pagina di trasmissione.
:::

## Impostazioni della pagina di trasmissione {#streaming-page-settings}

Per personalizzare le schede e i collegamenti che compaiono accanto alla tua diretta, apri il menu di salto, espandi **Prediche** e fai clic su **Impostazioni**. La pagina **Impostazioni di trasmissione** mostra l'elenco delle tue **Schede dei contenuti**, nell'ordine in cui gli spettatori le vedono. Le schede con collegamenti esterni aprono il collegamento in una nuova scheda del browser quando vi fai clic.

### Aggiungere schede {#adding-tabs}

1. Fai clic sul pulsante **Aggiungi** per aggiungere una nuova scheda alla tua pagina di trasmissione in diretta. Si apre la finestra **Crea nuova scheda**.
2. Inserisci il nome della scheda nella casella **Testo scheda** e scegli un **Icona** facendo clic sul pulsante dell'icona.
3. Scegli un **Tipo di collegamento**: **URL esterno** per un collegamento personalizzato (impostazione predefinita), oppure una delle schede integrate **Chat** o **Preghiera**.
4. Per una scheda con URL esterno, inserisci l'indirizzo nella casella **URL esterno**. Le schede Chat e Preghiera non richiedono altro.
5. Fai clic su **Salva scheda**. Le nuove schede vengono aggiunte in fondo all'elenco.

Le schede configurate compariranno nella pagina della diretta affinché gli spettatori possano accedere a risorse aggiuntive e funzionalità interattive.

### Modificare, riordinare ed eliminare le schede {#editing-reordering-and-deleting-tabs}

Passa sopra una scheda e usa i suoi pulsanti:

- Frecce **Sposta su** e **Sposta giù** -- Cambiano l'ordine delle schede.
- **Modifica** (matita) -- Cambia il testo, l'icona, il tipo o l'URL della scheda, quindi fai clic su **Salva scheda**. Per rimuovere la scheda, fai clic su **Elimina** e conferma nella finestra **Elimina scheda**.

### Visualizzare in anteprima la diretta {#previewing-your-stream}

Nella pagina **Orari trasmissioni in diretta**, fai clic su **Visualizza la tua diretta** in cima alla pagina per vedere esattamente come apparirà la tua pagina di trasmissione agli spettatori, incluso il logo, gli orari dei servizi e le schede configurate.

## Configurare la diretta YouTube {#setting-up-your-youtube-live-stream}

Per collegare il tuo canale YouTube per la trasmissione in diretta automatica:

1. Vai su **Prediche** e fai clic su **Aggiungi predica**, quindi seleziona **Aggiungi URL di diretta permanente**. Si apre il modulo **Modifica URL di diretta permanente**.
2. Il **Fornitore video** è impostato di default su **Diretta YouTube attuale**. Inserisci il tuo **ID canale YouTube** (non l'URL del tuo canale; fai clic su **Ottieni l'ID del tuo canale** per ricevere aiuto).
3. Il titolo parte come **Servizio in diretta attuale**. Modificalo se vuoi, aggiungi una descrizione, quindi fai clic su **Salva**. Gli URL di diretta permanenti non hanno una playlist né una data di pubblicazione.
4. In **Orari trasmissioni in diretta**, crea un servizio e seleziona il tuo URL di diretta permanente dal menu a discesa **Predica**.

:::tip
Per trovare l'ID del tuo canale YouTube, vai alle impostazioni avanzate del tuo canale YouTube e copia il valore ID canale.
:::

## Personalizzare colori e logo {#customizing-colors-and-logo}

La tua pagina di trasmissione in diretta usa le impostazioni [Aspetto](../website/appearance.md) del tuo sito web:

- Il **colore d'accento chiaro** con testo scuro viene usato per l'intestazione.
- Il **colore d'accento scuro** con testo chiaro viene usato per la barra laterale.
- Il tuo **Logo per sfondo chiaro** compare sulla pagina di trasmissione. Usa un'immagine con sfondo trasparente e proporzioni 4:1.

Per modificare questi elementi, vai su **Sito web** e poi su **Aspetto**, e aggiorna le impostazioni della tua [Tavolozza dei colori](../website/appearance.md#color-palette) e del [Logo](../website/appearance.md#logo-and-branding).

## Aggiungere conduttori della diretta {#adding-streaming-hosts}

Per dare ai membri del team l'accesso alla chat riservata agli host, oltre alla chat pubblica:

1. Nel menu di salto, scegli **Impostazioni > Ruoli**.
2. Fai clic su **Aggiungi ruolo** e seleziona **Aggiungi ruolo personalizzato**.
3. Assegna al ruolo il nome "Conduttore della diretta" e fai clic su **Salva**.
4. Fai clic sul nuovo ruolo, cerca le persone nel suo elenco membri e aggiungile (vedi [Aggiungere utenti a un ruolo](../settings/roles-permissions.md#adding-users-to-a-role)).
5. Scorri fino a **Modifica autorizzazioni**, espandi la sezione **Contenuti** e seleziona **Chat degli host**.

Quando gli host accedono alla pagina della diretta, compare una scheda privata **Chat degli host** accanto alla chat pubblica, per conversazioni riservate allo staff durante la trasmissione.

:::info
Per maggiori dettagli sulla creazione dei ruoli e sulla gestione delle autorizzazioni, vedi [Ruoli e autorizzazioni](../settings/roles-permissions.md).
:::

## Risoluzione dei problemi {#troubleshooting}

Se la tua diretta automatica da YouTube non viene visualizzata correttamente usando l'opzione "Diretta YouTube attuale" con il tuo ID canale, prova quanto segue:

**Sintomi:**
- L'incorporamento della diretta mostra "Video non disponibile"
- La pagina si carica ma non compare alcun video
- Gli incorporamenti diretti di YouTube funzionano, ma la diretta automatica del canale no

**Soluzione:**
Controlla il tuo canale YouTube alla ricerca di dirette vecchie o programmate in futuro, ed eliminale:

1. Vai su YouTube Studio.
2. Passa a **Contenuti** e poi a **Dirette**.
3. Cerca eventuali dirette vecchie programmate o dirette future programmate.
4. Elimina queste voci di diretta vecchie o programmate.
5. Verifica di nuovo la tua pagina di trasmissione in diretta.

:::warning
L'incorporamento automatico della diretta del canale di YouTube può essere bloccato quando nel tuo canale ci sono più voci di diretta programmate o passate. Rimuovendole, YouTube può identificare correttamente e mostrare la tua diretta attuale.
:::

**Requisiti aggiuntivi:**
- La tua diretta deve essere impostata come **Pubblica** (non Non in elenco o Privata).
- Nelle impostazioni della tua diretta su YouTube deve essere consentito l'incorporamento.
- Assicurati di usare il fornitore **Diretta YouTube attuale** (con ID canale), e non il fornitore **YouTube** (con ID video).

## Passaggi successivi {#next-steps}

- [Gestire le prediche](./managing-sermons.md) -- Aggiungi predicazioni alla tua libreria
- [Playlist](./playlists.md) -- Organizza le predicazioni in serie
