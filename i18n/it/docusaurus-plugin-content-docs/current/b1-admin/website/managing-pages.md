---
title: "Gestione pagine"
---

# Gestione pagine

<div class="article-intro">

La vista Pagine sito Web è il tuo hub centrale per la creazione, la modifica e l'organizzazione di tutte le pagine del tuo sito Web della chiesa. Puoi gestire sia il contenuto della tua pagina che la navigazione del tuo sito da questo singolo schermo.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Completa la [Configurazione iniziale](initial-setup) per configurare il tuo dominio e le impostazioni del sito di base
- Prepara il tuo contenuto e le immagini. Usa il gestore [File](files) per caricare prima gli asset multimediali.

</div>

:::info
Se la tua chiesa ha più di un sito Web (ad esempio, siti separati per campus), utilizza il selettore di sito nella parte superiore della vista Pagine sito Web per passare tra di loro. Ogni sito ha le proprie pagine, navigazione e impostazioni di [aspetto](appearance).
:::

## Comprensione dei tipi di pagina

La tabella **Pagine** elenca ogni pagina del tuo sito insieme al suo stato:

- **Generata** -- Pagine che sono state create automaticamente dal sistema in base ai dati della tua chiesa (ad esempio, una pagina Gruppi, una pagina Sermoni o una pagina individuale per ogni sermone nella tua biblioteca). Queste pagine si aggiornano da sole mentre i tuoi dati cambiano.
- **Personalizzata** -- Pagine che hai creato tu stesso con il tuo contenuto e layout.

Puoi convertire qualsiasi pagina generata automaticamente in una pagina personalizzata se vuoi il controllo completo sul suo contenuto e design.

## Aggiunta e modifica di pagine

1. Fai clic sul pulsante **Aggiungi pagina** nell'angolo in alto a destra della tabella Pagine.
2. Scegli un tipo di pagina (vuoto o un modello) e dagli un nome.
3. Fai clic su **Modifica contenuto** accanto a qualsiasi pagina per aprire l'[editor pagina](page-editor), dove puoi aggiungere sezioni, testo, immagini e altri elementi.
4. Fai clic su **Impostazioni pagina** (l'icona ingranaggio) per aggiornare il titolo della pagina, il percorso URL e altri metadati.
5. Utilizza il pulsante **Visualizza pagina live** per aprire la tua pagina in una nuova finestra e vedere esattamente come apparirà ai visitatori.

:::tip
Per la tua home page, imposta il percorso URL su solo `/`. Per tutte le altre pagine, utilizza un percorso descrittivo come `/about` o `/contact`.
:::

### Impostazioni pagina

Apri **Impostazioni pagina** su qualsiasi pagina per configurare:

- **Titolo e percorso URL** -- Il nome della pagina e il suo indirizzo sul tuo sito.
- **Visibilità** -- Scegli chi può vedere la pagina: tutti, solo membri, solo staff o membri di gruppi specifici. Questo è un modo rapido per controllare una pagina privata (come una pagina di risorse dello staff) senza una password separata.
- **Meta descrizione** -- Un breve riassunto mostrato nei risultati dei motori di ricerca e nelle anteprime dei link dei social media.
- **Reindirizzamenti** -- Punta un vecchio percorso URL a questa pagina, in modo che i link e i segnalibri a una pagina ritirata continuino a funzionare.

## Gestione della navigazione

La vista Pagine sito Web mostra i tuoi link di navigazione. Questi link controllano il menu che i visitatori vedono sul tuo sito Web.

1. Fai clic su **Aggiungi** per creare un nuovo link di navigazione. Puoi puntarlo a qualsiasi pagina del tuo sito o a un URL esterno.
2. Per riordinare i link, trascinali e rilasciali nell'ordine che desideri. Puoi anche annidare i link sotto un elemento padre per creare menu a discesa.
3. Fai clic sull'icona **Modifica** accanto a qualsiasi link per modificare l'etichetta, l'URL o la posizione.
4. Per rimuovere un link dalla navigazione, fai clic sull'icona **Elimina**.

:::info
La rimozione di un link di navigazione non elimina la pagina stessa. La pagina esiste ancora ed è possibile accedervi direttamente tramite il suo URL -- semplicemente non apparirà nel menu.
:::

## Interruttori su tutto il sito

Sopra **Navigazione principale** sul lato sinistro della vista Pagine sito Web ci sono due interruttori che si applicano a tutto il tuo sito Web della chiesa:

- **Mostra login** -- Mostra un pulsante **Login** nella barra di navigazione del tuo sito Web.
- **Disabilita sito Web pubblico** -- Disattiva il tuo sito Web pubblico. Usalo se la tua chiesa usa B1 solo per il suo portale dei membri, donazioni e registrazioni e mantiene il suo sito Web principale altrove.

### Cosa fa disabilitare il sito Web pubblico

Quando **Disabilita sito Web pubblico** è attivo:

- Ogni pagina pubblica, inclusa la home page e le tue pagine personalizzate, invia i visitatori alla schermata di login.
- Le pagine **Generate** incorporate (come Gruppi e Sermoni) non vengono più servite e non appaiono più nella tabella Pagine.
- L'intestazione del sito mostra solo il pulsante **Login**, senza link di navigazione.
- I motori di ricerca vengono informati di non indicizzare il sito. La mappa del sito è vuota e `robots.txt` blocca tutto il crawling.

Questi link continuano a funzionare, in modo che i membri e gli ospiti possono ancora raggiungerli:

- Login e logout
- Il portale dei membri (tutto sotto `/mobile`)
- Link di [registrazione agli eventi](../guides/event-registration.md) e registrazione ospiti

Un avviso appare sotto l'interruttore mentre il sito Web pubblico è spento. Spegni di nuovo l'interruttore per riportare le tue pagine indietro. Niente viene eliminato mentre il sito è disabilitato.

:::info
Questa impostazione si applica a tutta la tua chiesa. Se hai più di un sito, disattiva tutti loro, non solo quello selezionato nel selettore di sito.
:::

## Suggerimenti per organizzare il tuo sito

- Mantieni la navigazione di livello superiore a cinque o sei elementi in modo che i visitatori possano trovare le cose velocemente.
- Utilizza link annidati per le pagine secondarie correlate (ad esempio, un menu a discesa "About" con "Our Team", "Beliefs" e "History").
- Rivedi la tua navigazione su mobile facendo clic su **Mobile Preview** per assicurarti che funzioni bene su schermi più piccoli.
- Dai alle pagine nomi chiari e descrittivi che aiutino i visitatori a capire cosa troveranno.

:::tip
Puoi aggiungere [moduli](../forms/creating-forms.md) alle tue pagine per raccogliere registrazioni, richieste di preghiera o altre informazioni dai visitatori.
:::

## Iniziare da un modello di sito

Se stai costruendo il tuo sito da zero, puoi avviarlo utilizzando un **Modello di sito** invece di creare pagine una per una. Un modello di sito crea una serie di pagine precostruite -- home, about, connect, give e altre -- con contenuto segnaposto e link di navigazione già collegati.

1. Nella schermata Pagine, fai clic sul pulsante **Modelli di sito** (accanto al pulsante **Aggiungi pagina**).
2. Sfoglia i modelli disponibili e fai clic su uno per visualizzare in anteprima la sua struttura di pagine.
3. Quando trovi uno che ti piace, fai clic su **Applica modello**.
4. Le pagine che non esistono già vengono create e aggiunte alla tua navigazione. Le pagine esistenti vengono lasciate così come sono.

Dopo aver applicato un modello, apri ogni pagina nell'[editor pagina](page-editor) per sostituire il testo segnaposto e le immagini con il contenuto reale della tua chiesa.

:::info
I modelli di sito creano la struttura della pagina e la navigazione. Non sostituiscono lo schema colori del tuo sito o i caratteri -- questi sono controllati da [Aspetto](appearance).
:::

## Lightbox immagine

Quando i visitatori fanno clic su un'immagine sul tuo sito Web, si apre in un overlay lightbox a schermo intero. Ciò consente alle persone di visualizzare le foto a una dimensione più grande senza lasciare la pagina. Non è richiesta alcuna configurazione -- la lightbox è abilitata automaticamente per le immagini nel contenuto della tua pagina.

## Passaggi successivi

- [Configurazione iniziale](initial-setup) -- Istruzioni di configurazione per la prima volta
- [Utilizzo dell'editor pagine](page-editor) -- Scopri come creare e stilizzare il contenuto della pagina
- [Aspetto](appearance) -- Personalizza il tema visivo del tuo sito
- [File](files) -- Carica e gestisci asset multimediali per le tue pagine
