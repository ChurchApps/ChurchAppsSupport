---
title: "Gestione delle Pagine"
---

# Gestione delle Pagine

<div class="article-intro">

La vista Pagine del Sito Web è il tuo hub centrale per creare, modificare e organizzare tutte le pagine sul sito web della tua chiesa. Puoi gestire sia il contenuto della tua pagina che la navigazione del tuo sito da questa singola schermata.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Completa la [Configurazione Iniziale](initial-setup) per configurare il tuo dominio e le impostazioni di base del sito
- Tieni pronto il tuo contenuto e le tue immagini. Usa il gestore [File](files) per caricare prima gli asset multimediali.

</div>

:::info
Se la tua chiesa ha più di un sito web (ad esempio, siti separati per campus), usa il selettore di sito in cima alla vista Pagine del Sito Web per saltare tra loro. Ogni sito ha le sue pagine, navigazione e impostazioni di [aspetto](appearance).
:::

## Comprensione dei Tipi di Pagina

La tabella **Pagine** elenca ogni pagina sul tuo sito insieme al suo stato:

- **Generata** -- Pagine che sono state create automaticamente dal sistema in base ai dati della tua chiesa (ad esempio, una pagina Gruppi, una pagina Sermoni, o una pagina individuale per ogni sermone nella tua libreria). Queste pagine si aggiornano da sole mentre i tuoi dati cambiano.
- **Personalizzata** -- Pagine che hai creato tu stesso con il tuo proprio contenuto e layout.

Puoi convertire qualsiasi pagina generata automaticamente in una pagina personalizzata se desideri il controllo completo del suo contenuto e design.

## Aggiunta e Modifica di Pagine

1. Fai clic sul pulsante **Aggiungi Pagina** nell'angolo in alto a destra della tabella Pagine.
2. Scegli un tipo di pagina (vuoto o un modello) e dagli un nome.
3. Fai clic su **Modifica** accanto a qualsiasi pagina per aprire l'[editor di pagina](page-editor), dove puoi aggiungere sezioni, testo, immagini e altri elementi.
4. Fai clic su **Impostazioni Pagina** per aggiornare il titolo della pagina, il percorso URL e altri metadati.
5. Usa il pulsante **Anteprima** per aprire la tua pagina in una nuova finestra e vedi esattamente come apparirà ai visitatori.

:::tip
Per la tua pagina iniziale, imposta il percorso URL su solo `/`. Per tutte le altre pagine, usa un percorso descrittivo come `/about` o `/contact`.
:::

### Impostazioni Pagina

Apri **Impostazioni Pagina** su qualsiasi pagina per configurare:

- **Titolo e Percorso URL** -- Il nome della pagina e il suo indirizzo sul tuo sito.
- **Visibilità** -- Scegli chi può vedere la pagina: tutti, solo membri, solo staff, o membri di gruppi specifici. Questo è un modo veloce per restringere una pagina privata (come una pagina di risorsa per lo staff) senza una password separata.
- **Meta Descrizione** -- Un breve riassunto mostrato nei risultati dei motori di ricerca e nelle anteprime dei link sui social media.
- **Reindirizzamenti** -- Punta un percorso URL vecchio a questa pagina, in modo che i link e i segnalibri a una pagina ritirata continuino a funzionare.

## Gestione della Navigazione

La vista Pagine del Sito Web mostra i tuoi link di navigazione. Questi link controllano il menu che i visitatori vedono sul tuo sito web.

1. Fai clic su **Aggiungi** per creare un nuovo link di navigazione. Puoi puntarlo a qualsiasi pagina sul tuo sito o a un URL esterno.
2. Per riordinare i link, trascinali e rilasciali nell'ordine che desideri. Puoi anche nidificare i link sotto un elemento genitore per creare menu a discesa.
3. Fai clic sull'icona **Modifica** accanto a qualsiasi link per cambiare la sua etichetta, URL o posizione.
4. Per rimuovere un link dalla navigazione, fai clic sull'icona **Elimina**.

:::info
Rimuovere un link di navigazione non elimina la pagina stessa. La pagina esiste ancora e può essere accessibile direttamente dal suo URL -- semplicemente non apparirà nel menu.
:::

## Suggerimenti per Organizzare il Tuo Sito

- Mantieni la tua navigazione di primo livello a cinque o sei elementi in modo che i visitatori possano trovare le cose rapidamente.
- Usa i link nidificati per le sottopagine correlate (ad esempio, un menu a discesa "About" con "Our Team", "Beliefs", e "History").
- Rivedi la tua navigazione su dispositivi mobili facendo clic su **Anteprima Mobile** per assicurarti che funzioni bene su schermi più piccoli.
- Dai alle pagine nomi chiari e descrittivi che aiutino i visitatori a comprendere cosa troveranno.

:::tip
Puoi aggiungere [moduli](../forms/creating-forms.md) alle tue pagine per raccogliere registrazioni, richieste di preghiera o altre informazioni dai visitatori.
:::

## Inizio da un Modello di Sito

Se stai costruendo il tuo sito da zero, puoi avviarlo usando un **Modello di Sito** invece di creare pagine una alla volta. Un modello di sito crea un set di pagine pre-costruite -- home, about, connect, give e altre -- con contenuto segnaposto e link di navigazione già collegati.

1. Nella schermata Pagine, fai clic sul pulsante **Modelli di Sito** (accanto al pulsante **Aggiungi Pagina**).
2. Sfoglia i modelli disponibili e fai clic su uno per visualizzare l'anteprima della sua struttura di pagine.
3. Quando ne trovi uno che ti piace, fai clic su **Applica Modello**.
4. Le pagine che non esistono già vengono create e aggiunte alla tua navigazione. Le pagine esistenti vengono lasciate così come sono.

Dopo aver applicato un modello, apri ogni pagina nell'[editor di pagina](page-editor) per sostituire il testo e le immagini segnaposto con il contenuto reale della tua chiesa.

:::info
I modelli di sito creano la struttura della pagina e la navigazione. Non sovrascrivono lo schema di colori o i caratteri del tuo sito -- quelli sono controllati da [Aspetto](appearance).
:::

## Lightbox Immagini

Quando i visitatori fanno clic su un'immagine sul tuo sito web, si apre in un overlay lightbox a schermo intero. Questo permette alle persone di visualizzare le foto a una dimensione più grande senza lasciare la pagina. Non è richiesta alcuna configurazione -- il lightbox è abilitato automaticamente per le immagini nel tuo contenuto di pagina.

## Passaggi Successivi

- [Configurazione Iniziale](initial-setup) -- Istruzioni di configurazione per la prima volta
- [Utilizzo dell'Editor di Pagina](page-editor) -- Scopri come costruire e personalizzare il contenuto della pagina
- [Aspetto](appearance) -- Personalizza il tema visivo del tuo sito
- [File](files) -- Carica e gestisci gli asset multimediali per le tue pagine
