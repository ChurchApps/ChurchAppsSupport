---
title: "Gestione Pagine"
---

# Gestione Pagine

<div class="article-intro">

La visualizzazione Pagine Sito Web è il tuo hub centrale per creare, modificare e organizzare tutte le pagine sul sito web della tua chiesa. Puoi gestire sia il contenuto della tua pagina che la navigazione del tuo sito da questa singola schermata.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Completa la [Configurazione Iniziale](initial-setup) per configurare il tuo dominio e le impostazioni di base del sito
- Tieni pronto il tuo contenuto e le tue immagini. Usa il gestore [File](files) per caricare gli asset multimediali per primo.

</div>

:::info
Se la tua chiesa ha più di un sito web (ad esempio, siti separati per campus), utilizza lo strumento di cambio sito in cima alla visualizzazione Pagine Sito Web per passare da un sito all'altro. Ogni sito ha le sue proprie pagine, navigazione e impostazioni di [aspetto](appearance).
:::

## Comprensione dei Tipi di Pagina

La tabella **Pagine** elenca ogni pagina sul tuo sito insieme al suo stato:

- **Generato** -- Pagine create automaticamente dal sistema in base ai dati della tua chiesa (ad esempio, una pagina Gruppi, una pagina Sermoni, o una pagina individuale per ogni sermone nella tua libreria). Queste pagine si aggiornano man mano che i tuoi dati cambiano.
- **Personalizzato** -- Pagine che hai creato tu stesso con il tuo contenuto e layout.

Puoi convertire qualsiasi pagina generata automaticamente in una pagina personalizzata se desideri il pieno controllo sul suo contenuto e design.

## Aggiunta e Modifica Pagine

1. Fai clic sul pulsante **Aggiungi Pagina** nell'angolo in alto a destra della tabella Pagine.
2. Scegli un tipo di pagina (vuoto o un modello) e dagli un nome.
3. Fai clic su **Modifica Contenuto** accanto a qualsiasi pagina per aprire l'[editor di pagine](page-editor), dove puoi aggiungere sezioni, testo, immagini e altri elementi.
4. Fai clic su **Impostazioni Pagina** (l'icona a forma di ingranaggio) per aggiornare il titolo della pagina, il percorso URL e altri metadati.
5. Usa il pulsante **Visualizza pagina dal vivo** per aprire la tua pagina in una nuova finestra e vedi esattamente come apparirà ai visitatori.

:::tip
Per la tua home page, imposta il percorso URL su solo `/`. Per tutte le altre pagine, usa un percorso descrittivo come `/chi-siamo` o `/contatti`.
:::

### Impostazioni Pagina

Apri **Impostazioni Pagina** su qualsiasi pagina per configurare:

- **Titolo e Percorso URL** -- Il nome della pagina e il suo indirizzo sul tuo sito.
- **Visibilità** -- Scegli chi può vedere la pagina: tutti, solo membri, solo staff, o membri di gruppi specifici. Questo è un modo rapido per limitare una pagina privata (come una pagina di risorse per lo staff) senza una password separata.
- **Meta Descrizione** -- Un breve riassunto mostrato nei risultati dei motori di ricerca e nelle anteprime dei link dei social media.
- **Reindirizzamenti** -- Punta un vecchio percorso URL a questa pagina, in modo che i link e i segnalibri a una pagina ritirata continuino a funzionare.

## Gestione Navigazione

La visualizzazione Pagine Sito Web mostra i tuoi link di navigazione. Questi link controllano il menu che i visitatori vedono sul tuo sito web.

1. Fai clic su **Aggiungi** per creare un nuovo link di navigazione. Puoi puntarlo a qualsiasi pagina sul tuo sito o a un URL esterno.
2. Per riordinare i link, trascinali e rilasciali nell'ordine che desideri. Puoi anche annidare i link sotto un elemento padre per creare menu a discesa.
3. Fai clic sull'icona **Modifica** accanto a qualsiasi link per cambiare l'etichetta, l'URL o la posizione.
4. Per rimuovere un link dalla navigazione, fai clic sull'icona **Elimina**.

:::info
Rimuovere un link di navigazione non cancella la pagina stessa. La pagina esiste ancora e può essere accessibile direttamente dal suo URL -- semplicemente non apparirà nel menu.
:::

## Interruttori a Livello di Sito

Sopra **Navigazione Principale** sul lato sinistro della visualizzazione Pagine Sito Web ci sono due interruttori che si applicano all'intero sito web della tua chiesa:

- **Mostra Accesso** -- Mostra un pulsante **Accesso** nella barra di navigazione del tuo sito web.
- **Disabilita Sito Web Pubblico** -- Disattiva il tuo sito web pubblico. Usalo se la tua chiesa usa B1 solo per il suo portale dei membri, le donazioni e le registrazioni, e mantiene il suo sito web principale altrove.

### Cosa Fa la Disabilitazione del Sito Web Pubblico

Quando **Disabilita Sito Web Pubblico** è attivo:

- Ogni pagina pubblica, inclusa la home page e le tue pagine personalizzate, invia i visitatori che non hanno effettuato l'accesso alla schermata di accesso. Dopo aver effettuato l'accesso, tornano alla pagina che hanno richiesto.
- I membri che hanno effettuato l'accesso vedono il sito web completo come al solito, inclusa la tua navigazione e le pagine **Generate** incorporate (come Gruppi e Sermoni). Le pagine generate non appaiono più nella tabella Pagine.
- Ai motori di ricerca viene detto di non indicizzare il sito. La sitemap è vuota e `robots.txt` blocca tutti i crawler.

Questi link continuano a funzionare, quindi i membri e i visitatori possono raggiungerli:

- Accesso e logout
- Il portale dei membri (tutto sotto `/mobile`)
- Link [registrazione evento](../guides/event-registration.md) e registrazione ospiti

Un avviso appare sotto l'interruttore mentre il sito web pubblico è disattivato. Spegni di nuovo l'interruttore per ripristinare le tue pagine. Nulla viene eliminato mentre il sito è disattivato.

:::info
Questa impostazione si applica a tutta la tua chiesa. Se hai più di un sito, disattiva tutti loro, non solo quello selezionato nello strumento di cambio sito.
:::

## Suggerimenti per Organizzare il Tuo Sito

- Mantieni la tua navigazione di livello superiore a cinque o sei elementi in modo che i visitatori possono trovare le cose rapidamente.
- Usa link annidati per sub-pagine correlate (ad esempio, un menu a discesa "Chi Siamo" con "Il Nostro Team", "Credenze" e "Storia").
- Rivedi la tua navigazione su dispositivi mobili facendo clic su **Anteprima Mobile** per assicurarti che funzioni bene su schermi più piccoli.
- Dai alle pagine nomi chiari e descrittivi che aiutino i visitatori a capire cosa troveranno.

:::tip
Puoi aggiungere [moduli](../forms/creating-forms.md) alle tue pagine per raccogliere registrazioni, richieste di preghiera o altre informazioni dai visitatori.
:::

## Inizio da un Modello di Sito

Se stai costruendo il tuo sito da zero, puoi inizializzarlo usando un **Modello di Sito** invece di creare pagine una per una. Un modello di sito crea un insieme di pagine pre-costruite -- home, chi siamo, collegati, dona e altri -- con contenuti segnaposto e link di navigazione già cablati.

1. Nella schermata Pagine, fai clic sul pulsante **Modelli Sito** (accanto al pulsante **Aggiungi Pagina**).
2. Sfoglia i modelli disponibili e fai clic su uno per visualizzare l'anteprima della sua struttura di pagina.
3. Quando ne trovi uno che ti piace, fai clic su **Applica Modello**.
4. Le pagine che non esistono già vengono create e aggiunte alla tua navigazione. Le pagine esistenti rimangono così come sono.

Dopo aver applicato un modello, apri ogni pagina nell'[editor di pagine](page-editor) per sostituire il testo e le immagini segnaposto con il contenuto reale della tua chiesa.

:::info
I modelli di sito creano la struttura della pagina e la navigazione. Non sostituiscono lo schema di colori o i caratteri del tuo sito -- questi sono controllati da [Aspetto](appearance).
:::

## Lightbox Immagine

Quando i visitatori fanno clic su un'immagine sul tuo sito web, si apre in un overlay lightbox a schermo intero. Questo permette alle persone di visualizzare le foto a una dimensione più grande senza lasciare la pagina. Non è richiesta alcuna configurazione -- il lightbox è abilitato automaticamente per le immagini nel contenuto della tua pagina.

## Prossimi Passaggi

- [Configurazione Iniziale](initial-setup) -- Istruzioni di configurazione iniziale
- [Utilizzo dell'Editor di Pagine](page-editor) -- Scopri come costruire e stilizzare il contenuto della pagina
- [Aspetto](appearance) -- Personalizza il tema visivo del tuo sito
- [File](files) -- Carica e gestisci asset multimediali per le tue pagine
