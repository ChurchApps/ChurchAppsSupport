---
title: "Usare l'editor di pagina"
description: "Costruisci le pagine del sito nell'editor di pagina di B1 Admin: aggiungi sezioni ed elementi, formattali, visualizzali in anteprima da telefono, pubblica le bozze e usa annulla e cronologia delle modifiche."
---

# Usare l'editor di pagina

<div class="article-intro">

L'editor di pagina di B1 è un costruttore visuale con trascinamento che ti permette di progettare le pagine del sito della tua chiesa senza scrivere codice. Puoi aggiungere sezioni e blocchi di contenuto, personalizzare gli stili, visualizzare in anteprima il tuo lavoro e annullare le modifiche — tutto dal browser.

</div>

## Video di formazione {#training-video}

<YouTube id="m2B_JxmfFm4" title="Modificare pagine e navigazione in B1" next="Collegare un dominio personalizzato in B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Completa la [configurazione iniziale](./initial-setup.md) per configurare il sito web
- Crea almeno una pagina in [Gestire le pagine](./managing-pages.md)
- Ti serve l'autorizzazione **content.edit** per accedere all'editor

</div>

## Aprire l'editor {#opening-the-editor}

1. In B1 Admin, apri il [menu di salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Sito web** e fai clic su **Pagine**.
2. Trova la pagina che vuoi modificare nella tabella Pagine e fai clic su **Modifica contenuto**.

L'editor si apre a schermo intero con un'anteprima in tempo reale della pagina. La barra degli strumenti in alto contiene **Esci**, lo stato di pubblicazione della pagina, **Annulla** e **Ripeti**, lo stato di salvataggio, **Pubblica**, i pulsanti di anteprima desktop e mobile, **Aggiungi contenuto**, il controllo di accessibilità e un menu **Altro** (⋮). Fai clic su **Aggiungi contenuto** per aprire il pannello **Aggiungi elementi** a sinistra; fai clic su una sezione o un elemento per aprirne le impostazioni a destra.

L'editor richiede uno schermo largo almeno circa 880 pixel. Da telefono vedrai un messaggio che ti invita ad aprire la pagina su un tablet o un computer.

:::info
L'editor viene sempre mostrato in modalità chiara, indipendentemente dal tema impostato in B1 Admin, e usa i caratteri dei titoli e del testo che hai scelto in [Aspetto](./appearance.md). Questo garantisce che l'anteprima corrisponda fedelmente a come apparirà la pagina ai visitatori del sito.
:::

## Struttura della pagina: sezioni ed elementi {#page-structure-sections-and-elements}

Ogni pagina è costruita su due livelli:

- **Sezioni** -- I contenitori di primo livello che dividono la pagina in fasce orizzontali (ad esempio, una sezione hero, un blocco di contenuto o una striscia a piè di pagina). Ogni pagina deve avere almeno una sezione prima che tu possa aggiungere contenuti.
- **Elementi** -- I singoli pezzi di contenuto inseriti in una sezione, come testo, immagini, pulsanti, schede, moduli e calendari.

### Aggiungere una sezione {#adding-a-section}

1. Fai clic su **Aggiungi contenuto** e trascina **Sezione** nella pagina. Puoi anche passare il mouse tra due sezioni e fare clic sul pulsante **+** (**Aggiungi sezione**) che compare.
2. Nella finestra **Scegli un layout di sezione**, scegli come iniziare:
   - **Da un modello** — sfoglia i modelli di sezione per categoria (Hero, Chi siamo, Servizi, Persone, Multimedia, Donazioni e Invito all'azione) e fai clic su uno per inserirlo come sezione già stilizzata e precompilata. Puoi personalizzare tutto dopo averla aggiunta.
   - **Sezione vuota** — una sezione vuota da costruire da zero. Per dividerla in colonne, aggiungi al suo interno un elemento **Riga**.
3. La nuova sezione compare nell'anteprima. Fai clic su di essa per selezionarla e configurarne lo sfondo, i colori e le altre opzioni di stile.

Passando il mouse su una sezione compare la sua barra degli strumenti: maniglia di trascinamento, **Impostazioni sezione**, **Sposta sezione su**, **Sposta sezione giù**, **Duplica sezione**, **Prova un altro layout** ed **Elimina sezione**.

### Cambiare il layout di una sezione {#switching-a-sections-layout}

Hai già costruito una sezione ma vuoi una struttura diversa? Fai clic su **Prova un altro layout** nella barra degli strumenti della sezione per sostituirne la disposizione con un'altra dalla galleria, mantenendo al loro posto i contenuti e gli elementi esistenti.

### Aggiungere elementi a una sezione {#adding-elements-to-a-section}

1. Fai clic su **Aggiungi contenuto** per aprire il pannello **Aggiungi elementi**. Usa **Cerca elementi** oppure le schede (**Tutti**, **Comuni**, **Multimedia**, **Chiesa**, **Avanzati** e **Blocchi** dopo che hai creato dei [blocchi riutilizzabili](./blocks.md)) per trovare un elemento.
2. Trascina l'elemento in una sezione nell'anteprima, oppure seleziona un elemento della pagina e poi fai clic su una scheda per aggiungere il nuovo elemento subito dopo di esso. Gli elementi disponibili sono:
   - **Riga** -- Divide una sezione in colonne affiancate
   - **Riquadro** -- Raggruppa gli elementi in un contenitore con stile
   - **Carosello** -- Scorre una serie di diapositive a larghezza piena
   - **Spazio vuoto** -- Aggiunge uno spazio verticale vuoto
   - **Testo** -- Titoli, paragrafi e testo formattato
   - **Immagine** -- Carica una foto oppure collegala
   - **Pulsante collegamento** -- Un pulsante cliccabile di invito all'azione
   - **Scheda** -- Un'immagine con un titolo e una descrizione
   - **Modulo** -- Incorpora un [modulo](../forms/creating-forms.md) direttamente nella pagina. Se il modulo ha una [foto di intestazione](../forms/creating-forms.md#adding-a-header-photo), questa compare sopra le domande
   - **Calendario** -- Mostra un calendario degli eventi
   - **Espandibile** -- Blocchi di domande e risposte in stile fisarmonica
   - **Video** -- Incorpora un video tramite URL
   - **Sfoglia gruppi** -- Un elenco filtrabile di tutti i gruppi della chiesa, con ricerca facoltativa, filtro per categoria e filtro per etichetta. Il suo **Layout** può essere **Griglia** (predefinito) oppure **A scorrimento (automatico)** -- vedi [Layout a scorrimento](#scrolling-layouts)
   - **Elenco gruppi** -- Riquadri per i tuoi gruppi pubblici, facoltativamente solo quelli con una determinata etichetta. Il suo **Layout** può essere **Griglia** (predefinito; fino a tre riquadri per riga) oppure **A scorrimento (automatico)** -- vedi [Layout a scorrimento](#scrolling-layouts)
   - **Caratteristica con icona** -- Un'icona con un titolo e una breve descrizione, per evidenziare caratteristiche o ministeri
   - **Galleria** -- Una griglia di più foto oppure un layout a mosaico
   - **Testimonianza** -- Una o più citazioni con nome dell'autore, ruolo e foto
   - **Icone social** -- Icone con collegamento ai profili social della chiesa: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo e Podcast. Inserisci un collegamento per ciascuno che vuoi mostrare; per **WhatsApp**, usa un collegamento `https://wa.me/` con il tuo numero oppure un link di invito a un gruppo
   - **Conto alla rovescia** -- Un timer che conta alla rovescia fino a una data o a un orario di servizio settimanale
   - **Statistiche** -- Una riga di numeri grandi con etichette (membri, anni, campus)
   - **Avanzamento campagna** -- Una barra di avanzamento in tempo reale per una campagna di donazioni, che mostra il totale raccolto verso l'obiettivo di un fondo
   - **Griglia dello staff** -- Schede con foto dei membri di un gruppo; il gruppo deve avere attiva l'opzione **elenco pubblico**
   - **Orari dei servizi** -- Il calendario dei servizi dei campus della chiesa, ricavato automaticamente dalla configurazione delle presenze
   - **Prediche** -- La tua libreria di prediche, come sfogliatore completo oppure in layout a griglia, elenco o in evidenza con l'ultima predica
   - **Posizione** -- Una mappa incorporata centrata sull'indirizzo della chiesa
   - **Tabella** -- Una semplice griglia di righe e colonne per contenuti tabellari
   - **Testo con foto** -- Testo e immagine affiancati
   - **Logo** -- Il logo della chiesa, ripreso da [Aspetto](./appearance.md)
   - **Diretta** -- Il lettore della tua trasmissione in diretta, incorporato direttamente nella pagina
   - **Podcast** -- Un elenco di episodi ricavato da un URL di feed RSS di un podcast esterno che fornisci, con impostazioni per decidere quanti episodi mostrare e se visualizzare date e descrizioni. Ogni episodio sul sito online ha un lettore audio e un collegamento **Scarica** che salva il file audio dell'episodio con il titolo dell'episodio. Serve a presentare sul tuo sito un feed podcast qualsiasi; per pubblicare le tue prediche come podcast, vedi invece [Gestire le prediche](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donazione** -- Un modulo completo per le donazioni incorporato nella pagina
   - **Collegamento donazioni** -- Un pulsante che apre la tua pagina delle donazioni
   - **HTML** -- Il tuo HTML grezzo, per usi avanzati come l'incorporamento di un widget di terze parti (vedi [Usare l'elemento HTML](#using-the-html-element))
   - **Pagina incorporata** -- Incorpora un'altra pagina web tramite URL in un riquadro
3. Configura l'elemento usando il pannello delle impostazioni che compare.

### Usare l'elemento HTML {#using-the-html-element}

L'elemento **HTML** ha due caselle:

- **Contenuto HTML** -- Il markup da mostrare nella pagina. Eventuali tag `<script>` inclusi qui vengono eseguiti sul sito online.
- **JavaScript (escludi il tag script)** -- Codice di script eseguito al caricamento della pagina. Puoi anche incollare qui lo snippet di incorporamento di un fornitore, con i suoi tag `<script>` inclusi, e verrà eseguito sul sito online.

Se incolli solo un indirizzo web (come un link a un'immagine) nella casella JavaScript, la casella diventa rossa con l'avviso *"Questo è un indirizzo web, non JavaScript."* Un indirizzo nudo in quella casella non fa nulla. Per mostrare un'immagine, usa un elemento **Immagine** oppure inserisci `<img src="...">` in **Contenuto HTML**.

### Usare l'elemento Calendario {#using-the-calendar-element}

L'elemento **Calendario** mostra gli eventi di uno dei tuoi calendari:

1. In **Seleziona**, scegli **Calendario di gruppo** (gli eventi di un solo gruppo -- l'elenco mostra i gruppi di cui fai parte) oppure **Calendario curato** (un calendario che hai creato in **Calendari**; vedi [Calendario curato](../calendars/curated-calendar.md)).
2. In **Seleziona calendario**, scegli il gruppo o il calendario.
3. In **Visualizzazione**, scegli come mostrarlo:
   - **Calendario mensile** -- Una griglia mensile che i visitatori possono sfogliare. Ogni evento è colorato in base al gruppo a cui appartiene, quindi gli eventi di un gruppo hanno lo stesso colore in ogni calendario. B1 sceglie i colori automaticamente; non c'è nulla da configurare.
   - **Prossimi eventi** -- Una griglia di riquadri per i prossimi 12 eventi, con un evento ricorrente mostrato una sola volta alla sua data successiva. Ogni riquadro mostra la foto dell'evento (oppure il suo titolo sullo sfondo scuro del tema quando non c'è una foto), un distintivo con la data, il giorno e l'orario, e la prima riga della descrizione. Un pulsante **Iscriviti** sopra i riquadri permette ai visitatori di copiare il collegamento ICS del calendario oppure di scaricarlo. Per questa visualizzazione compare l'impostazione **Layout**: **Griglia** (predefinito) oppure **A scorrimento (automatico)**, che dispone i riquadri su un'unica riga che scorre da sola (vedi [Layout a scorrimento](#scrolling-layouts)). Per un **Calendario curato**, attiva l'impostazione **Distintivo gruppo** per mostrare il nome del gruppo di ciascun evento nell'angolo in alto a destra del suo riquadro, con il colore del calendario di quel gruppo. Gli eventi di gruppi archiviati o riservati non ricevono un distintivo.
4. Per mostrare solo alcuni eventi, digita un tag in **Solo eventi con tag** -- ad esempio, `youth`. Compaiono solo gli eventi i cui **Tag** includono quella parola. Lascia vuoto per mostrare tutti gli eventi. I tag si impostano su ogni evento; vedi [Aggiungere e modificare eventi](../calendars/creating-calendars.md#adding-and-editing-events).

In entrambe le visualizzazioni, facendo clic su un evento si apre la sua pagina dedicata sul tuo sito. La pagina dell'evento mostra la foto, il titolo, la data e l'orario e la descrizione dell'evento, oltre a un riquadro con **Quando** (incluso lo schema di ripetizione per un evento ricorrente) e **Dove** (le sale prenotate per l'evento). Ha anche il pulsante **Iscriviti a questo evento** quando le iscrizioni sono attive, e un collegamento **Aggiungi al mio calendario** che scarica l'evento come file di calendario. La pagina è predisposta perché i motori di ricerca possano mostrare data e dettagli dell'evento nei loro risultati. Anche le pagine degli eventi dei calendari curati mostrati nelle tue pagine (per gli eventi dei prossimi sei mesi) vengono elencate nella mappa del sito, così i motori di ricerca possono trovarle.

### Layout a scorrimento {#scrolling-layouts}

Il layout **A scorrimento (automatico)** di **Sfoglia gruppi**, **Elenco gruppi** e della visualizzazione **Prossimi eventi** dell'elemento Calendario dispone i riquadri su una sola riga invece che in una griglia. Su telefono ogni riquadro occupa tutta la riga; su computer due riquadri stanno affiancati. Quando i riquadri sono più di quelli che stanno nella riga, la riga:

- Avanza di un riquadro circa ogni quattro secondi, tornando al primo riquadro dopo l'ultimo.
- Si ferma mentre un visitatore passa sopra, tocca o naviga con la tastiera al suo interno, e riprende qualche secondo dopo.
- Mostra sotto di sé una fila di puntini, uno per riquadro, con il puntino del riquadro corrente pieno. I visitatori possono fare clic su un puntino per saltare a quel riquadro.

Sui dispositivi impostati per ridurre le animazioni, la riga resta ferma e i visitatori la scorrono da soli con uno swipe o con la rotella. Se tutti i riquadri stanno nella riga, questa non si muove e non compaiono puntini.

### Riordinare i contenuti {#reordering-content}

Trascina sezioni o elementi usando l'icona a maniglia (sei puntini) sul lato sinistro di ogni elemento per riordinarli. Puoi trascinare gli elementi all'interno di una sezione oppure spostarli tra sezioni diverse.

## Formattare la pagina {#styling-your-page}

### Stili delle sezioni {#section-styles}

Fai clic su una sezione qualsiasi per aprire il suo pannello di stile. Puoi impostare:

- **Colori** -- Nella scheda **Suggeriti**, fai clic su una delle combinazioni di colori della tua tavolozza. Nella scheda **Personalizzati**, imposta il **Tipo di sfondo** (**Colore**, **Immagine** oppure **Video YouTube**) e i colori di titolo, testo e collegamenti. Con uno sfondo immagine, fai clic sull'immagine per impostare il suo punto focale (la parte che resta visibile quando l'immagine viene ritagliata), e usa **Colore di sovrapposizione** e **Opacità dello sfondo** per tingere l'immagine così il testo resta leggibile.
- **Visibilità** -- **Nascondi su desktop** oppure **Nascondi su mobile**
- **Stili** -- Aggiungi singole impostazioni di stile, come il padding superiore e inferiore, per tutti i dispositivi, solo desktop o solo mobile
- **Animazioni** -- Un effetto e una velocità per quando la sezione scorre nella vista
- **Separatori di forma** -- Forme decorative (onda, onde, obliquo, curva, picchi e triangolo) sul bordo superiore o inferiore della sezione, con opzioni di colore, altezza e rotazione

Le impostazioni della sezione hanno anche **Duplica** e **Converti in blocco**, che copia la sezione in un nuovo [blocco riutilizzabile](./blocks.md).

### Stili degli elementi {#element-styles}

Fai clic su un elemento qualsiasi per aprire il suo pannello di stile. Le opzioni comuni includono dimensione del carattere, colore, allineamento, margine e padding. Per le immagini, puoi impostare il testo alternativo e le destinazioni dei collegamenti.

### Stili per una singola sezione o elemento {#styles-for-one-section-or-element}

Per un controllo più fine, apri il pannello **Stili** nelle impostazioni di una sezione o di un elemento e fai clic su **Aggiungi uno stile** sotto **Tutti**, **Solo desktop** oppure **Solo mobile**. Ogni stile si applica solo a quella sezione o a quell'elemento, quindi non influisce sul resto della pagina.

:::tip
Se hai bisogno di applicare stili a tutto il sito — come un carattere personalizzato o un colore globale — usa le impostazioni di [Aspetto](./appearance.md) invece del CSS personalizzato sulle singole pagine.
:::

## Visualizzare in anteprima la pagina {#previewing-your-page}

Usa i controlli di anteprima nella barra degli strumenti per verificare come appare la pagina a diverse dimensioni dello schermo:

- **Desktop** -- Vista a larghezza piena del browser
- **Mobile** -- Vista stretta, delle dimensioni di un telefono

Su telefono, le colonne di una riga si impilano una sopra l'altra a larghezza piena, a meno che tu non imposti una **Larghezza mobile** per esse nelle impostazioni della riga. Anche gli elenchi di prediche e podcast impilano il testo di ogni episodio sotto la sua miniatura sui telefoni.

Per vedere la pagina online esattamente come la vedranno i visitatori, torna all'elenco Pagine e fai clic sul percorso della pagina. Si apre in una nuova scheda del browser.

## Verificare l'accessibilità {#checking-accessibility}

Fai clic sull'icona **Verifica accessibilità** nella barra degli strumenti (mostra un numero quando vengono trovati problemi) per eseguire un controllo rapido dei problemi più comuni — immagini senza testo alternativo, contrasto dei colori insufficiente o titoli in ordine errato. Ogni problema rimanda direttamente all'elemento che richiede attenzione, così puoi correggerlo sul posto.

## Annullare le modifiche {#undoing-changes}

L'editor tiene automaticamente traccia della cronologia delle modifiche. Usa i pulsanti della barra degli strumenti o le scorciatoie da tastiera per muoverti:

- **Annulla** (Ctrl+Z / Cmd+Z) -- Ripristina l'ultima azione
- **Ripeti** (Ctrl+Maiusc+Z oppure Ctrl+Y / Cmd+Maiusc+Z) -- Riapplica un'azione annullata

Puoi anche tornare a un punto precedente. Apri il menu **Altro** (⋮) nella barra degli strumenti e fai clic su **Visualizza cronologia**. La finestra **Cronologia modifiche** elenca ogni modifica con il suo orario, indicando la posizione attuale come **(corrente)**. Fai clic su una voce (oppure sul suo pulsante **Ripristina a questo punto**) per riportare la pagina com'era in quel punto.

:::info
Le modifiche fatte dopo il punto ripristinato restano nella cronologia, così puoi usare **Ripeti** oppure scegliere una voce successiva per andare di nuovo avanti. Quando fai una nuova modifica, quelle voci successive vengono sostituite da essa.
:::

## Salvare e pubblicare {#saving-and-publishing}

Le modifiche vengono salvate automaticamente mentre lavori. Un indicatore di stato nella barra degli strumenti mostra se le tue modifiche sono state salvate.

### Stato di bozza e di pubblicazione {#draft-and-published-state}

Le pagine possono avere uno stato **pubblicato**, che controlla quando i visitatori vedono le tue modifiche. La barra degli strumenti mostra un'etichetta di stato con lo stato attuale:

- **Online al salvataggio** -- La pagina non usa un flusso di pubblicazione. Ogni modifica salvata va subito online. È l'impostazione predefinita per le nuove pagine.
- **Modifiche non pubblicate** -- La pagina è già stata pubblicata in passato, ma hai apportato modifiche dopo l'ultima pubblicazione. I visitatori vedono ancora la versione pubblicata in precedenza.
- **Pubblicata** -- La pagina è online e il contenuto salvato corrisponde a quello che vedono i visitatori.

Per pubblicare le modifiche, fai clic sul pulsante **Pubblica** nella barra degli strumenti. La pagina va subito online.

Per tornare all'ultima versione pubblicata senza influire su ciò che vedono i visitatori, apri il menu a tendina (⋮) e fai clic su **Scarta modifiche non pubblicate**.

Per smettere di usare il flusso di pubblicazione, apri il menu a tendina e fai clic su **Disattiva la pubblicazione**. Le modifiche tornano così ad andare subito online.

:::tip
Usa il flusso bozza/pubblicazione quando vuoi preparare una pagina — ad esempio per un evento imminente — e renderla online solo al momento giusto. Costruisci e visualizza in anteprima la pagina, poi fai clic su Pubblica quando sei pronto.
:::

## Articoli correlati {#related-articles}

- [Gestire le pagine](./managing-pages.md) -- Crea pagine, imposta gli URL e gestisci la navigazione del sito
- [Aspetto](./appearance.md) -- Imposta colori, caratteri e identità visiva dell'intero sito
- [File](./files.md) -- Carica immagini e documenti da usare nell'editor
- [Creare moduli](../forms/creating-forms.md) -- Crea moduli da incorporare nelle pagine
