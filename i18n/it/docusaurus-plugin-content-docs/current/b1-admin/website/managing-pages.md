---
title: "Gestire le pagine"
description: "Crea, modifica e organizza pagine e navigazione nella vista Pagine del sito di B1 Admin, incluse impostazioni della pagina, reindirizzamenti e modelli di sito."
---

# Gestire le pagine

<div class="article-intro">

La vista Pagine del sito è il tuo centro di controllo per creare, modificare e organizzare tutte le pagine del sito web della tua chiesa. Da questa unica schermata puoi gestire sia il contenuto delle pagine sia la navigazione del sito.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Completa la [configurazione iniziale](./initial-setup.md) per configurare il dominio e le impostazioni di base del sito
- Tieni pronti contenuti e immagini. Usa prima il gestore dei [File](./files.md) per caricare i contenuti multimediali
- Usa un computer o un tablet. La vista Pagine del sito e l'editor di pagina richiedono uno schermo largo almeno circa 880 pixel; su telefono vedrai un messaggio che ti invita a passare a uno schermo più grande.

</div>

:::info
Se la tua chiesa ha più di un sito web (ad esempio, siti separati per campus), usa il selettore dei siti in cima alla vista Pagine del sito per passare dall'uno all'altro. Ogni sito ha le proprie pagine, la propria navigazione e le proprie impostazioni di [aspetto](./appearance.md). Vedi [Più siti web](#multiple-websites) più sotto.
:::

## Capire i tipi di pagina {#understanding-page-types}

La tabella **Pagine** elenca ogni pagina del sito per **Percorso** e **Titolo**. Esistono due tipi di pagine:

- **Generata** -- Pagine create automaticamente dal sistema in base ai dati della chiesa (ad esempio, una pagina Gruppi, una pagina Prediche, oppure una pagina individuale per ogni predica della libreria). Queste pagine mostrano un distintivo **Generata** e si aggiornano da sole quando cambiano i tuoi dati.
- **Personalizzata** -- Pagine che hai creato tu, con i tuoi contenuti e il tuo layout.

Puoi convertire qualsiasi pagina generata automaticamente in una pagina personalizzata, se vuoi il pieno controllo del suo contenuto e del suo design. Fai clic su **Converti** accanto alla pagina generata e fai clic su **Conferma**. Si apre la finestra **Nuova pagina**: dai alla pagina un titolo e fai clic su **Salva**. La tua nuova pagina personalizzata prende il percorso della pagina generata, e poi puoi costruirla nell'[editor di pagina](./page-editor.md).

## Aggiungere e modificare pagine {#adding-and-editing-pages}

1. Fai clic sul pulsante **Aggiungi pagina** in alto a destra nella vista Pagine del sito.
2. Scegli un tipo di pagina e inserisci un **Titolo della pagina**, poi fai clic su **Salva**. **Vuota** avvia una pagina vuota; **Prediche**, **Chi siamo**, **Dona** e **Posizione** compilano un titolo suggerito per quel tipo di pagina; **IA** crea una prima bozza della pagina a partire da una breve descrizione che digiti. Il percorso della pagina viene ricavato dal suo titolo (ad esempio, "Il nostro team" diventa `/our-team`), e puoi cambiarlo in seguito in **Impostazioni pagina**.
3. Fai clic su **Modifica contenuto** accanto a qualsiasi pagina per aprire l'[editor di pagina](./page-editor.md), dove puoi aggiungere sezioni, testo, immagini e altri elementi.
4. Fai clic su **Impostazioni pagina** accanto a una pagina per aggiornare il titolo, il percorso URL e gli altri metadati.
5. Fai clic sul percorso di una pagina nella colonna **Percorso** per aprire la pagina online in una nuova scheda e vedere esattamente come apparirà ai visitatori.

:::tip
Per la home page, imposta il percorso URL solo su `/`. Per tutte le altre pagine, usa un percorso descrittivo come `/about` oppure `/contact`.
:::

### Impostazioni pagina {#page-settings}

Apri **Impostazioni pagina** su una pagina qualsiasi per configurare:

- **Titolo della pagina** -- Il nome della pagina.
- **Layout** -- **Intestazione e piè di pagina** (la barra di navigazione e il piè di pagina del sito attorno alla pagina, l'impostazione predefinita) oppure **Contenuto pulito centrato** (solo il contenuto della pagina, in una scheda centrata su uno sfondo grigio chiaro, senza barra di navigazione né piè di pagina — utile per una semplice pagina di iscrizione o di atterraggio).
- **Percorso URL** -- L'indirizzo della pagina sul tuo sito. Fai clic sulla matita per cambiarlo, poi fai clic su **Verifica** per assicurarti che il percorso sia valido e non già in uso.
- **Visibilità** -- Scegli chi può vedere la pagina: **Tutti**, **Utenti con accesso**, **Membri e personale**, **Solo personale**, **Membri del team** oppure **Gruppi specifici** (poi seleziona i gruppi). È un modo rapido per limitare una pagina riservata (come una pagina di risorse per lo staff) senza una password separata. I visitatori che non hanno effettuato l'accesso vedono "Questa pagina è riservata ai membri della chiesa" con un pulsante **Accedi**; le persone che hanno effettuato l'accesso ma con cui la pagina non è condivisa vedono "Non hai accesso a questa pagina." Le pagine con accesso limitato vengono escluse dalla tua mappa del sito.
- **Descrizione meta** -- Un breve riepilogo mostrato nei risultati dei motori di ricerca e nelle anteprime dei collegamenti sui social. Punta a circa 155 caratteri, oppure fai clic su **Genera con IA** per creare una bozza a partire dal contenuto della pagina.

La finestra ha anche un pulsante **Duplica**, che crea una copia della pagina con tutto il suo contenuto, e un pulsante **Elimina**, che elimina la pagina in modo permanente.

:::tip
Per inviare un vecchio indirizzo a una pagina (ad esempio, dopo aver rinominato `/about-us` in `/about`), aggiungi un reindirizzamento in **Reindirizzamenti e statistiche** in [Aspetto](./appearance.md#redirects--analytics).
:::

## Gestire la navigazione {#managing-navigation}

Il pannello **Navigazione principale**, sul lato destro della vista Pagine del sito, mostra i tuoi collegamenti di navigazione. Questi collegamenti controllano il menu che i visitatori vedono sul tuo sito.

1. Fai clic su **Aggiungi** per creare un nuovo collegamento di navigazione. Puoi puntarlo a qualsiasi pagina del tuo sito oppure a un URL esterno.
2. Per riordinare i collegamenti, trascinali nell'ordine che desideri. Puoi anche annidare i collegamenti sotto una voce padre per creare menu a discesa.
3. Fai clic su un collegamento qualsiasi per aprire le sue **Impostazioni collegamento**, dove puoi cambiarne il testo, l'URL o la pagina padre.
4. Per rimuovere un collegamento dalla navigazione, apri le sue **Impostazioni collegamento** e fai clic su **Elimina**.

:::info
Rimuovere un collegamento di navigazione non elimina la pagina stessa. La pagina esiste ancora e può essere raggiunta direttamente tramite il suo URL — semplicemente non compare nel menu.
:::

## Interruttori per tutto il sito {#site-wide-switches}

Sotto i collegamenti nel pannello **Navigazione principale** ci sono due interruttori che si applicano a tutto il sito web della chiesa:

- **Mostra accesso** -- Mostra un pulsante **Accedi** nella barra di navigazione del sito web.
- **Disattiva sito pubblico** -- Spegne il tuo sito pubblico. Usalo se la tua chiesa usa B1 solo per il portale membri, le offerte e le iscrizioni, e tiene il sito principale altrove.

### Cosa fa disattivare il sito pubblico {#what-disabling-the-public-website-does}

Quando **Disattiva sito pubblico** è attivo:

- Ogni pagina pubblica, compresa la home page e le tue pagine personalizzate, porta i visitatori che non hanno effettuato l'accesso alla schermata di login. Dopo l'accesso, tornano alla pagina che avevano richiesto.
- I membri che hanno effettuato l'accesso vedono il sito completo come al solito, inclusi la navigazione e le pagine integrate **Generate** (come Gruppi e Prediche). Le pagine generate non compaiono più nella tabella Pagine.
- Ai motori di ricerca viene chiesto di non indicizzare il sito. La mappa del sito è vuota e `robots.txt` blocca ogni scansione.

Questi collegamenti continuano a funzionare, così membri e ospiti possono ancora raggiungerli:

- Accesso e disconnessione
- Il portale membri (tutto ciò che si trova sotto `/mobile`)
- Collegamenti alle [iscrizioni agli eventi](../guides/event-registration.md) e registrazione degli ospiti

Finché il sito pubblico è disattivato, sotto l'interruttore compare un avviso. Riattiva l'interruttore per riportare online le tue pagine. Mentre il sito è disattivato non viene eliminato nulla.

:::info
Questa impostazione si applica a tutta la tua chiesa. Se hai più di un sito, disattiva tutti, non solo quello selezionato nel selettore dei siti.
:::

## Suggerimenti per organizzare il sito {#tips-for-organizing-your-site}

- Mantieni la navigazione di primo livello su cinque o sei voci, così i visitatori trovano rapidamente ciò che cercano.
- Usa collegamenti annidati per le sottopagine correlate (ad esempio, un menu a discesa "Chi siamo" con "Il nostro team", "Credenze" e "Storia").
- Controlla la navigazione da telefono per assicurarti che funzioni bene sugli schermi più piccoli.
- Dai alle pagine nomi chiari e descrittivi, che aiutino i visitatori a capire cosa troveranno.

:::tip
Puoi aggiungere dei [moduli](../forms/creating-forms.md) alle pagine per raccogliere iscrizioni, richieste di preghiera o altre informazioni dai visitatori.
:::

## Partire da un modello di sito {#starting-from-a-site-template}

Se stai costruendo il sito da zero, puoi avviarlo usando un **Modello di sito** invece di creare le pagine una alla volta. Un modello di sito crea un insieme di pagine già pronte — home, chi siamo, connettiti, dona e altre — con contenuti segnaposto e collegamenti di navigazione già configurati.

1. Nella schermata Pagine, fai clic sul pulsante **Parti da un modello** (accanto al pulsante **Aggiungi pagina**).
2. Sfoglia i modelli disponibili (come **Classico**, **Moderno**, **Comunità** e **Orientato ai visitatori**) e fai clic su uno per visualizzare in anteprima le sue pagine e i collegamenti di navigazione che aggiunge.
3. Quando trovi quello che ti piace, fai clic su **Crea sito**.
4. Le pagine che non esistono ancora vengono create e aggiunte alla navigazione. Le pagine che hai già sono contrassegnate come **Già esistente** e restano invariate. Si apre poi la prima nuova pagina così puoi darle un'occhiata.

Dopo aver applicato un modello, apri ciascuna pagina nell'[editor di pagina](./page-editor.md) per sostituire il testo segnaposto e le immagini con i contenuti reali della tua chiesa.

:::info
Un modello imposta colori e caratteri solo su un sito che non ha mai avuto una tavolozza dei colori salvata. Una volta scelta la tua tavolozza, applicare un modello lascia invariati i tuoi colori e i tuoi caratteri: restano gestiti in [Aspetto](./appearance.md).
:::

## Più siti web {#multiple-websites}

Una chiesa può gestire più di un sito web dallo stesso account — ad esempio, uno per campus oppure un sito separato per una scuola.

1. Nella schermata Pagine, apri il selettore dei siti (inizialmente mostra **Sito web principale**) e scegli **Gestisci siti web…**.
2. Nella finestra **Siti web**, inserisci un **Nome** e un **Sottodominio** (solo lettere minuscole e numeri — diventa `{subdomain}.b1.church`) e fai clic su **Aggiungi sito web**.
3. Scegli il nuovo sito nel selettore dei siti per costruire le sue pagine, la sua navigazione, i suoi blocchi e il suo aspetto.

Per rimuovere un sito, apri **Gestisci siti web…** e fai clic su **Elimina** accanto ad esso. Le sue pagine, la sua navigazione e il suo aspetto vengono eliminati in modo permanente, e gli eventuali domini personalizzati che aveva passano al sito principale.

## Visualizzatore di immagini {#image-lightbox}

Quando i visitatori fanno clic su un'immagine del tuo sito, questa si apre in un visualizzatore a schermo intero. Così le persone possono vedere le foto più grandi senza lasciare la pagina. Non serve alcuna configurazione: il visualizzatore è attivato automaticamente per le immagini nei contenuti delle pagine.

## Passaggi successivi {#next-steps}

- [Configurazione iniziale](./initial-setup.md) -- Istruzioni per la prima configurazione
- [Usare l'editor di pagina](./page-editor.md) -- Scopri come costruire e formattare i contenuti delle pagine
- [Aspetto](./appearance.md) -- Personalizza il tema visivo del sito
- [File](./files.md) -- Carica e gestisci i contenuti multimediali per le pagine
