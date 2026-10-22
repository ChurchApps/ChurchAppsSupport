---
title: "Utilizzare l'editor di pagina"
---

# Utilizzare l'editor di pagina {#using-the-page-editor}

<div class="article-intro">

L'editor di pagina di B1 è un builder visuale con trascinamento che ti permette di progettare le pagine del tuo sito web della chiesa senza scrivere codice. Puoi aggiungere sezioni e blocchi di contenuto, personalizzare gli stili, visualizzare l'anteprima del lavoro e annullare le modifiche, il tutto dal browser.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Completa la [Configurazione iniziale](initial-setup) per configurare il tuo sito web
- Crea almeno una pagina in [Gestire le pagine](managing-pages)
- Ti serve il permesso **content.edit** per accedere all'editor

</div>

## Aprire l'editor {#opening-the-editor}

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Sito web** e fai clic su **Pagine**.
2. Trova la pagina che vuoi modificare nella tabella delle Pagine e fai clic su **Modifica contenuto**.

L'editor si apre a schermo intero. Il pannello di sinistra mostra la struttura della pagina e gli elementi di contenuto disponibili; l'area centrale mostra un'anteprima dal vivo della pagina.

:::info
L'editor viene sempre visualizzato in modalità chiara, indipendentemente dall'impostazione del tema di B1 Admin, e utilizza i caratteri dei titoli e del testo scelti in [Aspetto](appearance). In questo modo l'anteprima corrisponde esattamente a come apparirà la pagina ai visitatori del sito.
:::

## Struttura della pagina: sezioni ed elementi {#page-structure-sections-and-elements}

Ogni pagina è costruita su due livelli:

- **Sezioni** -- I contenitori di primo livello che dividono la pagina in fasce orizzontali (ad esempio una sezione hero, un blocco di contenuto o una striscia di piè di pagina). Ogni pagina deve avere almeno una sezione prima che tu possa aggiungere contenuti.
- **Elementi** -- I singoli contenuti inseriti all'interno di una sezione, come testo, immagini, pulsanti, schede, moduli e calendari.

### Aggiungere una sezione {#adding-a-section}

1. Fai clic su **Aggiungi sezione** (oppure sul pulsante **+** in alto nel pannello di sinistra).
2. Scegli come iniziare:
   - **Da un modello** — sfoglia la galleria dei modelli di sezione organizzata per categoria (Hero, Chi siamo, Servizi, Donazioni, ecc.) e fai clic su uno per inserirlo come sezione già stilizzata e precompilata. Puoi personalizzare tutto dopo averla aggiunta.
   - **Sezione vuota** — scegli una disposizione a colonne (singola, due colonne, tre colonne, ecc.) e costruisci da zero.
3. La nuova sezione compare nell'anteprima. Fai clic su di essa per selezionarla e configurarne il colore di sfondo, il padding e le altre opzioni di stile.

### Cambiare la disposizione di una sezione {#switching-a-sections-layout}

Hai già costruito una sezione ma vuoi una struttura diversa? Usa il selettore di layout di quella sezione per cambiarne la disposizione a colonne con un'altra della galleria, mantenendo al loro posto i contenuti e gli elementi esistenti.

### Aggiungere elementi a una sezione {#adding-elements-to-a-section}

1. Fai clic all'interno di una sezione nell'anteprima per selezionarla.
2. Fai clic su **Aggiungi contenuto** e scegli un tipo di elemento dall'elenco:
   - **Testo** -- Titoli, paragrafi e testo formattato
   - **Immagine** -- Carica o collega una foto
   - **Pulsante** -- Un link cliccabile di invito all'azione
   - **Scheda** -- Un'immagine con un titolo e una descrizione
   - **Modulo** -- Inserisci un [modulo](../forms/creating-forms) direttamente nella pagina
   - **Calendario** -- Mostra un calendario degli eventi
   - **FAQ** -- Blocchi di domande e risposte a fisarmonica
   - **Video** -- Incorpora un video tramite URL
   - **Esplora gruppi** -- Un elenco filtrabile di tutti i gruppi della chiesa con ricerca facoltativa, filtro per categoria ed etichetta
   - **Funzione con icona** -- Un'icona con un titolo e una breve descrizione, per evidenziare funzioni o ministeri
   - **Galleria** -- Una griglia o un layout a mosaico di più foto
   - **Testimonianza** -- Una o più citazioni con nome dell'autore, ruolo e foto
   - **Icone social** -- Icone collegate ai profili social media della tua chiesa
   - **Conto alla rovescia** -- Un timer che conta alla rovescia fino a una data o a un orario di culto settimanale
   - **Statistiche** -- Una riga di numeri grandi con etichette (membri, anni, campus)
   - **Avanzamento campagna** -- Una barra di avanzamento dal vivo per una campagna di donazioni, che mostra il totale raccolto verso l'obiettivo di un fondo
   - **Griglia del personale** -- Schede con foto per i membri di un gruppo; il gruppo deve avere attiva l'opzione **elenco pubblico**
   - **Orari dei culti** -- Il programma dei servizi dei tuoi campus, recuperato automaticamente dalla configurazione delle presenze
   - **Prediche** -- La tua libreria di prediche, come browser completo oppure in layout a griglia, elenco o in evidenza con l'ultima
   - **Mappa** -- Una mappa incorporata centrata sull'indirizzo della tua chiesa
   - **Tabella** -- Una semplice griglia di righe e colonne per contenuti tabellari
   - **Testo con foto** -- Testo e un'immagine affiancati
   - **Logo** -- Il logo della tua chiesa, preso da [Aspetto](appearance)
   - **Diretta streaming** -- Il lettore della tua diretta, incorporato direttamente nella pagina
   - **Podcast** -- Un elenco di episodi recuperati da un URL di feed RSS di un podcast esterno che fornisci, con impostazioni per il numero di episodi da mostrare e per visualizzare o meno date e descrizioni. Ogni episodio sul sito pubblicato ha un lettore audio e un link **Scarica** che salva il file audio dell'episodio con il titolo dell'episodio. Serve per presentare un feed podcast qualsiasi sul tuo sito; per pubblicare le tue prediche come podcast, consulta invece [Gestire le prediche](../sermons/managing-sermons.md#your-podcast-feed).
   - **Donazione** -- Un pulsante per le donazioni o un modulo di donazione incorporato
   - **HTML** -- Il tuo HTML grezzo, per usi avanzati come l'incorporamento di un widget di terze parti (vedi [Usare l'elemento HTML](#using-the-html-element))
   - **iFrame** -- Incorpora contenuti esterni tramite URL
3. Configura l'elemento usando il pannello delle impostazioni che compare.

### Usare l'elemento HTML {#using-the-html-element}

L'elemento **HTML** ha due caselle:

- **Contenuto HTML** -- Il markup da mostrare nella pagina. Qualsiasi tag `<script>` che inserisci qui viene eseguito sul tuo sito pubblicato.
- **JavaScript (escludi il tag script)** -- Codice script eseguito al caricamento della pagina. Puoi anche incollare qui lo snippet di incorporamento di un fornitore con i suoi tag `<script>` inclusi, e verrà eseguito sul sito pubblicato.

Se incolli nella casella JavaScript solo un indirizzo web (come un link a un'immagine), la casella diventa rossa con l'avviso *"Questo è un indirizzo web, non JavaScript."* Un semplice indirizzo in quella casella non fa nulla. Per mostrare un'immagine, usa un elemento **Immagine** oppure inserisci `<img src="...">` in **Contenuto HTML**.

### Usare l'elemento Calendario {#using-the-calendar-element}

L'elemento **Calendario** mostra gli eventi di uno dei tuoi calendari:

1. In **Seleziona**, scegli **Calendario del gruppo** (gli eventi di un solo gruppo — l'elenco mostra i gruppi di cui fai parte) oppure **Calendario curato** (un calendario che hai creato in **Calendari**; vedi [Calendario curato](../calendars/curated-calendar)).
2. In **Seleziona calendario**, scegli il gruppo o il calendario.
3. In **Visualizzazione**, scegli come mostrarlo:
   - **Calendario mensile** -- Una griglia mensile che i visitatori possono sfogliare.
   - **Prossimi eventi** -- Una griglia di riquadri per i prossimi 12 eventi, con un evento ricorrente mostrato una sola volta alla sua data successiva. Ogni riquadro mostra la foto dell'evento (oppure il suo titolo sul colore scuro del tuo tema, se non ha una foto), un badge con la data, il giorno e l'orario, e la prima riga della descrizione. Un pulsante **Iscriviti** sopra i riquadri permette ai visitatori di copiare il link ICS del calendario o di scaricarlo.
4. Per mostrare solo alcuni eventi, digita un tag in **Solo eventi con tag** -- ad esempio `giovani`. Compaiono solo gli eventi i cui **Tag** includono quella parola. Lascia vuoto per mostrare tutti gli eventi. I tag si impostano su ciascun evento; vedi [Aggiungere e modificare eventi](../calendars/creating-calendars.md#adding-and-editing-events).

In entrambe le visualizzazioni, cliccando su un evento si apre la sua pagina sul tuo sito web. La pagina dell'evento mostra la foto, il titolo, la data e l'orario e la descrizione, più un riquadro con **Quando** (incluso lo schema di ripetizione per un evento ricorrente) e **Dove** (le sale prenotate per l'evento). Include anche il pulsante **Iscriviti a questo evento**, quando le iscrizioni sono attive, e un link **Aggiungi al mio calendario** che scarica l'evento come file di calendario. La pagina è impostata in modo che i motori di ricerca possano mostrare la data e i dettagli dell'evento nei loro risultati.

### Riordinare i contenuti {#reordering-content}

Trascina sezioni o elementi usando l'icona a maniglia (sei puntini) sul lato sinistro di ogni elemento per riordinarli. Puoi trascinare gli elementi all'interno di una sezione o spostarli tra sezioni diverse.

## Personalizzare la pagina {#styling-your-page}

### Stili delle sezioni {#section-styles}

Fai clic su una sezione qualsiasi per aprire il suo pannello di stile. Puoi impostare:

- **Sfondo** -- Colore pieno, sfumatura o immagine. Quando usi uno sfondo immagine, un selettore del **Punto focale** ti permette di fare clic per stabilire quale parte dell'immagine resta centrata quando la sezione si ridimensiona, e un'opzione di colore **Sovrapposizione** ti permette di aggiungere una tinta semitrasparente sull'immagine per migliorare la leggibilità del testo.
- **Padding** -- Spaziatura superiore e inferiore all'interno della sezione
- **Larghezza** -- Larghezza piena oppure centrata/contenuta
- **Separatori** -- Separatori decorativi a forma (onda, obliquo, curva, triangolo e altri) sul bordo superiore o inferiore della sezione, con opzioni di colore, altezza e rotazione

### Stili degli elementi {#element-styles}

Fai clic su un elemento qualsiasi per aprire il suo pannello di stile. Le opzioni più comuni includono dimensione del carattere, colore, allineamento, margine e padding. Per le immagini, puoi impostare il testo alternativo e le destinazioni dei link.

### CSS personalizzato {#custom-css}

Per uno stile avanzato, ogni sezione e ogni elemento ha un campo **CSS personalizzato** in cui puoi scrivere le tue regole CSS. Queste sono limitate a quell'elemento, quindi non influenzano involontariamente il resto della pagina.

:::tip
Se devi applicare stili a tutto il sito, come un carattere personalizzato o un colore globale, usa le impostazioni [Aspetto](appearance) invece del CSS personalizzato sulle singole pagine.
:::

## Visualizzare l'anteprima della pagina {#previewing-your-page}

Usa i controlli di anteprima nella barra degli strumenti per verificare come appare la pagina con diverse dimensioni dello schermo:

- **Desktop** -- Visualizzazione a larghezza piena del browser
- **Mobile** -- Visualizzazione stretta con le dimensioni di un telefono

Per vedere la pagina pubblicata esattamente come la vedranno i visitatori, torna all'elenco delle Pagine e fai clic sul percorso della pagina. Si apre in una nuova scheda del browser.

## Verificare l'accessibilità {#checking-accessibility}

Fai clic sull'icona **Accessibilità** nella barra degli strumenti per eseguire una verifica rapida dei problemi più comuni: immagini senza testo alternativo, contrasto di colore insufficiente o titoli in ordine errato. Ogni problema rimanda direttamente all'elemento da correggere, così puoi intervenire sul posto.

## Annullare le modifiche {#undoing-changes}

L'editor tiene automaticamente traccia della cronologia delle modifiche. Usa i pulsanti della barra degli strumenti o le scorciatoie da tastiera per muoverti:

- **Annulla** (Ctrl+Z / Cmd+Z) -- Ripristina l'ultima azione
- **Ripeti** (Ctrl+Maiusc+Z oppure Ctrl+Y / Cmd+Maiusc+Z) -- Riapplica un'azione annullata

Puoi anche ripristinare la pagina a una versione precedente. Fai clic su **Visualizza cronologia** nella barra degli strumenti per vedere un elenco di versioni salvate con le relative descrizioni, e fai clic su una voce qualsiasi per tornare a quel punto.

:::warning
Ripristinare una versione sostituisce il contenuto attuale della pagina con quella versione. Questa operazione non può essere annullata con il pulsante standard di annullamento. Salva una versione del tuo stato attuale prima di ripristinarne una vecchia, se vuoi poter tornare indietro.
:::

## Salvare e pubblicare {#saving-and-publishing}

Le modifiche vengono salvate automaticamente mentre lavori. Un indicatore di stato nella barra degli strumenti mostra se le tue modifiche sono state salvate.

### Stato di bozza e pubblicato {#draft-and-published-state}

Le pagine possono avere uno stato **pubblicato**, che controlla quando i visitatori vedono le tue modifiche. La barra degli strumenti mostra un'etichetta di stato con lo stato attuale:

- **Online al salvataggio** -- La pagina non usa un flusso di pubblicazione. Ogni modifica salvata va online immediatamente. È l'impostazione predefinita per le nuove pagine.
- **Modifiche non pubblicate** -- La pagina è già stata pubblicata in passato, ma hai apportato modifiche dall'ultima pubblicazione. I visitatori vedono ancora la versione pubblicata in precedenza.
- **Pubblicata** -- La pagina è online e il contenuto salvato corrisponde a ciò che vedono i visitatori.

Per pubblicare le modifiche, fai clic sul pulsante **Pubblica** nella barra degli strumenti. La pagina diventa subito online.

Per tornare all'ultima versione pubblicata senza influire su ciò che vedono i visitatori, apri il menu a tre puntini (⋮) e fai clic su **Scarta modifiche non pubblicate**.

Per smettere di usare il flusso di pubblicazione, apri il menu a tre puntini e fai clic su **Disattiva la pubblicazione**. Le modifiche tornano così ad andare online immediatamente.

:::tip
Usa il flusso di bozza e pubblicazione quando vuoi preparare una pagina, ad esempio per un evento imminente, e renderla visibile solo nel momento giusto. Costruisci e visualizza in anteprima la pagina, poi fai clic su Pubblica quando sei pronto.
:::

## Articoli correlati {#related-articles}

- [Gestire le pagine](managing-pages) -- Crea pagine, imposta gli URL e gestisci la navigazione del sito
- [Aspetto](appearance) -- Imposta colori, caratteri e branding validi per tutto il sito
- [File](files) -- Carica immagini e documenti da usare nell'editor
- [Creare moduli](../forms/creating-forms) -- Crea moduli da incorporare nelle pagine
