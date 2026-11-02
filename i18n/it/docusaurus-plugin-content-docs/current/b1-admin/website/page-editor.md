---
title: "Usare l'editor di pagine"
---

# Usare l'editor di pagine

<div class="article-intro">

L'editor di pagine di B1 è un costruttore visivo con trascinamento che ti permette di progettare le pagine del sito web della tua chiesa senza scrivere alcun codice. Puoi aggiungere sezioni e blocchi di contenuto, personalizzare gli stili, visualizzare in anteprima il lavoro e annullare le modifiche, il tutto dal browser.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Completa la [Configurazione iniziale](initial-setup) per configurare il tuo sito web
- Crea almeno una pagina in [Gestire le pagine](managing-pages)
- Ti serve il permesso **content.edit** per accedere all'editor

</div>

## Aprire l'editor

1. In B1 Admin, apri il [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Sito web** e clicca su **Pagine**.
2. Trova la pagina che vuoi modificare nella tabella delle Pagine e clicca su **Modifica contenuto**.

L'editor si apre a schermo intero. Il pannello di sinistra mostra la struttura della pagina e gli elementi di contenuto disponibili; l'area centrale mostra un'anteprima in tempo reale della pagina.

:::info
L'editor viene sempre visualizzato in modalità chiara, indipendentemente dal tema di B1 Admin, e usa i caratteri per i titoli e per il testo che hai scelto in [Aspetto](appearance). Questo garantisce che l'anteprima corrisponda fedelmente a come apparirà la pagina ai visitatori del sito.
:::

## Struttura della pagina: sezioni ed elementi

Ogni pagina è costruita su due livelli:

- **Sezioni** -- I contenitori di primo livello che dividono la pagina in fasce orizzontali (ad esempio una sezione introduttiva, un blocco di contenuto o una striscia di piè di pagina). Ogni pagina deve avere almeno una sezione prima che tu possa aggiungere contenuti.
- **Elementi** -- I singoli pezzi di contenuto inseriti in una sezione, come testi, immagini, pulsanti, schede, moduli e calendari.

### Aggiungere una sezione

1. Clicca su **Aggiungi sezione** (oppure sul pulsante **+** in cima al pannello di sinistra).
2. Scegli come iniziare:
   - **Da un modello** — sfoglia la galleria dei modelli di sezione, organizzata per categoria (Introduzione, Chi siamo, Servizi, Donazioni, ecc.), e clicca su uno per inserirlo come sezione già stilizzata e precompilata. Puoi personalizzare tutto dopo averla aggiunta.
   - **Sezione vuota** — scegli una disposizione a colonne (singola, due colonne, tre colonne, ecc.) e costruisci da zero.
3. La nuova sezione compare nell'anteprima. Cliccaci sopra per selezionarla e configurare il colore di sfondo, l'imbottitura e le altre opzioni di stile.

### Cambiare la disposizione di una sezione

Hai già costruito una sezione ma vuoi una struttura diversa? Usa il selettore di disposizione su quella sezione per sostituire la sua organizzazione a colonne con un'altra della galleria, mantenendo al loro posto i contenuti e gli elementi esistenti.

### Aggiungere elementi a una sezione

1. Clicca all'interno di una sezione nell'anteprima per selezionarla.
2. Clicca su **Aggiungi contenuto** e scegli un tipo di elemento dall'elenco:
   - **Testo** -- Titoli, paragrafi e testo formattato
   - **Immagine** -- Carica o collega una foto
   - **Pulsante** -- Un link cliccabile per un'azione
   - **Scheda** -- Un'immagine con un titolo e una descrizione
   - **Modulo** -- Incorpora un [modulo](../forms/creating-forms) direttamente nella pagina. Se il modulo ha una [foto di intestazione](../forms/creating-forms.md#adding-a-header-photo), questa compare sopra le domande
   - **Calendario** -- Mostra un calendario degli eventi
   - **FAQ** -- Blocchi di domande e risposte in stile fisarmonica
   - **Video** -- Incorpora un video tramite URL
   - **Browser dei gruppi** -- Un elenco filtrabile di tutti i gruppi della chiesa, con ricerca facoltativa, filtro per categoria e filtro per etichetta
   - **Caratteristica con icona** -- Un'icona con un titolo e una breve descrizione, per mettere in evidenza caratteristiche o ministeri
   - **Galleria** -- Una griglia di più foto o una disposizione a mosaico
   - **Testimonianza** -- Una o più citazioni con nome dell'autore, ruolo e foto
   - **Icone social** -- Icone con link ai profili social della chiesa: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo e Podcast. Inserisci un link per ciascuno che vuoi mostrare; per **WhatsApp**, usa un link `https://wa.me/` con il tuo numero oppure un link di invito al gruppo
   - **Conto alla rovescia** -- Un timer che conta fino a una data oppure a un orario settimanale di culto
   - **Statistiche** -- Una riga di numeri grandi con etichette (membri, anni, sedi)
   - **Avanzamento campagna** -- Una barra di avanzamento in tempo reale per una campagna di donazioni, che mostra il totale raccolto verso l'obiettivo di un fondo
   - **Griglia del personale** -- Schede con foto dei membri di un gruppo; il gruppo deve avere attiva l'opzione di **elenco pubblico**
   - **Orari dei culti** -- Il calendario dei culti delle tue sedi, ricavato automaticamente dalla configurazione delle presenze
   - **Sermoni** -- La tua libreria di sermoni, come browser completo oppure in layout a griglia, elenco o con l'ultimo in evidenza
   - **Mappa** -- Una mappa incorporata centrata sull'indirizzo della chiesa
   - **Tabella** -- Una semplice griglia di righe e colonne per contenuti tabellari
   - **Testo con foto** -- Testo e un'immagine affiancati
   - **Logo** -- Il logo della tua chiesa, ricavato da [Aspetto](appearance)
   - **Diretta streaming** -- Il lettore della tua diretta, incorporato direttamente nella pagina
   - **Podcast** -- Un elenco di episodi ricavato dall'URL di un feed RSS di podcast esterno che fornisci, con impostazioni per decidere quanti episodi mostrare e se visualizzare date e descrizioni. Ogni episodio sul sito online ha un lettore audio e un link **Scarica** che salva il file audio dell'episodio con il titolo dell'episodio. Serve per mettere in evidenza un qualsiasi feed di podcast sul tuo sito; per pubblicare i tuoi sermoni come podcast, vedi invece [Gestire i sermoni](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donazione** -- Un pulsante per le offerte oppure un modulo di donazione incorporato
   - **HTML** -- Il tuo HTML grezzo, per usi avanzati come l'incorporamento di un widget di terze parti (vedi [Usare l'elemento HTML](#using-the-html-element))
   - **iFrame** -- Incorpora contenuti esterni tramite URL
3. Configura l'elemento usando il pannello delle impostazioni che compare.

### Usare l'elemento HTML {#using-the-html-element}

L'elemento **HTML** ha due caselle:

- **Contenuto HTML** -- Il markup da mostrare nella pagina. Eventuali tag `<script>` inseriti qui vengono eseguiti sul tuo sito online.
- **JavaScript (escludi il tag script)** -- Codice di script che viene eseguito al caricamento della pagina. Puoi anche incollare qui lo snippet di incorporamento di un fornitore, con i relativi tag `<script>` inclusi, e verrà eseguito sul sito online.

Se incolli nella casella JavaScript solo un indirizzo web (come il link di un'immagine), la casella diventa rossa con l'avviso *"Questo è un indirizzo web, non JavaScript."* Un indirizzo isolato in quella casella non fa nulla. Per mostrare un'immagine, usa un elemento **Immagine** oppure inserisci `<img src="...">` in **Contenuto HTML**.

### Usare l'elemento Calendario {#using-the-calendar-element}

L'elemento **Calendario** mostra gli eventi di uno dei tuoi calendari:

1. Sotto **Seleziona**, scegli **Calendario di gruppo** (gli eventi di un solo gruppo -- l'elenco mostra i gruppi di cui fai parte) oppure **Calendario curato** (un calendario che hai creato in **Calendari**; vedi [Calendario curato](../calendars/curated-calendar)).
2. Sotto **Seleziona calendario**, scegli il gruppo o il calendario.
3. Sotto **Visualizzazione**, scegli come mostrarlo:
   - **Calendario mensile** -- Una griglia mensile che i visitatori possono sfogliare.
   - **Eventi in programma** -- Una griglia di riquadri per i prossimi 12 eventi, con un evento ricorrente mostrato una sola volta nella sua prossima data. Ogni riquadro mostra la foto dell'evento (oppure il titolo sul colore scuro del tema quando non c'è una foto), un distintivo con la data, il giorno e l'ora e la prima riga della descrizione. Un pulsante **Iscriviti** sopra i riquadri permette ai visitatori di copiare il link ICS del calendario oppure di scaricarlo. Per questa visualizzazione compare un'impostazione **Layout**: **Griglia** (predefinito) oppure **Scorrimento (automatico)**, che mette i riquadri su un'unica riga che scorre da sola.
4. Per mostrare solo alcuni eventi, digita un tag in **Solo eventi con tag** -- ad esempio `giovani`. Compaiono solo gli eventi i cui **Tag** includono quella parola. Lascia vuoto per mostrare tutti gli eventi. I tag si impostano su ciascun evento; vedi [Aggiungere e modificare eventi](../calendars/creating-calendars.md#adding-and-editing-events).

In entrambe le visualizzazioni, cliccando su un evento si apre la sua pagina dedicata sul tuo sito. La pagina dell'evento mostra la foto, il titolo, la data e l'ora e la descrizione, oltre a un riquadro con **Quando** (compreso lo schema di ripetizione per un evento ricorrente) e **Dove** (le sale prenotate per l'evento). Ha anche un pulsante **Iscriviti a questo evento** quando l'iscrizione è attiva, e un link **Aggiungi al mio calendario** che scarica l'evento come file di calendario. La pagina è impostata in modo che i motori di ricerca possano mostrare data e dettagli dell'evento nei risultati. Anche le pagine degli eventi dei calendari curati mostrati sulle tue pagine (per gli eventi nei prossimi sei mesi) sono elencate nella mappa del sito, così i motori di ricerca possono trovarle.

### Riordinare i contenuti

Trascina sezioni o elementi usando l'icona a maniglia (sei puntini) sul lato sinistro di ogni voce per riordinarli. Puoi trascinare gli elementi all'interno di una sezione oppure spostarli tra sezioni diverse.

## Stilizzare la pagina

### Stili delle sezioni

Clicca su una sezione qualsiasi per aprire il suo pannello di stile. Puoi impostare:

- **Sfondo** -- Colore pieno, sfumatura o immagine. Quando usi un'immagine di sfondo, un selettore di **Punto focale** ti permette di cliccare per stabilire quale parte dell'immagine resta centrata quando la sezione si ridimensiona, e un'opzione di colore **Velatura** ti permette di aggiungere una tinta semitrasparente sopra l'immagine per migliorare la leggibilità del testo.
- **Imbottitura** -- Spaziatura superiore e inferiore all'interno della sezione
- **Larghezza** -- Tutta la larghezza oppure centrata/contenuta
- **Separatori** -- Separatori decorativi a forma (onda, obliquo, curva, triangolo e altri) sul bordo superiore o inferiore della sezione, con opzioni di colore, altezza e rovesciamento

### Stili degli elementi

Clicca su un elemento qualsiasi per aprire il suo pannello di stile. Tra le opzioni più comuni ci sono dimensione del carattere, colore, allineamento, margine e imbottitura. Per le immagini puoi impostare il testo alternativo e la destinazione dei link.

### CSS personalizzato

Per uno stile avanzato, ogni sezione ed elemento ha un campo **CSS personalizzato** in cui puoi scrivere regole CSS proprie. Sono limitate a quell'elemento, quindi non influenzano involontariamente il resto della pagina.

:::tip
Se ti serve applicare degli stili a tutto il sito -- come un carattere personalizzato o un colore globale -- usa le impostazioni di [Aspetto](appearance) invece del CSS personalizzato sulle singole pagine.
:::

## Visualizzare in anteprima la pagina

Usa i controlli di anteprima nella barra degli strumenti per verificare come appare la pagina a diverse dimensioni di schermo:

- **Desktop** -- Visualizzazione a tutta larghezza del browser
- **Mobile** -- Visualizzazione stretta, delle dimensioni di un telefono

Sui telefoni, le colonne di una riga si impilano una sopra l'altra a piena larghezza, a meno che tu non imposti una **Larghezza mobile** per loro nelle impostazioni della riga. Anche gli elenchi di sermoni e podcast impilano il testo di ogni episodio sotto la sua miniatura sui telefoni.

Per vedere la pagina online esattamente come la vedranno i visitatori, torna all'elenco delle Pagine e clicca sul percorso della pagina. Si apre in una nuova scheda del browser.

## Verificare l'accessibilità

Clicca sull'icona **Accessibilità** nella barra degli strumenti per eseguire un controllo rapido dei problemi più comuni -- immagini senza testo alternativo, contrasto di colore insufficiente o titoli in ordine errato. Ogni problema rimanda direttamente all'elemento che richiede attenzione, così puoi correggerlo sul posto.

## Annullare le modifiche

L'editor tiene automaticamente traccia della cronologia delle modifiche. Usa i pulsanti della barra degli strumenti o le scorciatoie da tastiera per muoverti:

- **Annulla** (Ctrl+Z / Cmd+Z) -- Ripristina l'ultima azione
- **Ripeti** (Ctrl+Maiusc+Z oppure Ctrl+Y / Cmd+Maiusc+Z) -- Riapplica un'azione annullata

Puoi anche ripristinare la pagina a un'istantanea precedente. Clicca su **Visualizza cronologia** nella barra degli strumenti per vedere l'elenco delle istantanee salvate con le loro descrizioni, e clicca su una voce qualsiasi per ripristinare la pagina a quel punto.

:::warning
Ripristinare un'istantanea sostituisce il contenuto attuale della pagina con la versione dell'istantanea. Questo non può essere annullato con il pulsante Annulla standard. Salva un'istantanea dello stato attuale prima di ripristinarne una vecchia, se vuoi mantenere la possibilità di tornare indietro.
:::

## Salvare e pubblicare

Le modifiche vengono salvate automaticamente mentre lavori. Un indicatore di stato nella barra degli strumenti mostra se le modifiche sono state salvate.

### Stato di bozza e di pubblicazione

Le pagine possono avere uno stato **pubblicato**, che controlla quando i visitatori vedono le tue modifiche. La barra degli strumenti mostra un chip di stato con lo stato attuale:

- **Online al salvataggio** -- La pagina non usa un flusso di pubblicazione. Ogni modifica salvata va online immediatamente. È il predefinito per le nuove pagine.
- **Modifiche non pubblicate** -- La pagina è già stata pubblicata in passato, ma hai apportato modifiche dall'ultima pubblicazione. I visitatori vedono ancora la versione pubblicata precedentemente.
- **Pubblicata** -- La pagina è online e il contenuto salvato corrisponde a ciò che vedono i visitatori.

Per pubblicare le modifiche, clicca sul pulsante **Pubblica** nella barra degli strumenti. La pagina va online immediatamente.

Per tornare all'ultima versione pubblicata senza influire su ciò che vedono i visitatori, apri il menu a tre puntini (⋮) e clicca su **Scarta le modifiche non pubblicate**.

Per smettere di usare il flusso di pubblicazione, apri il menu a tre puntini e clicca su **Disattiva la pubblicazione**. Le modifiche tornano così ad andare online immediatamente.

:::tip
Usa il flusso di bozza/pubblicazione quando vuoi preparare una pagina -- ad esempio per un evento imminente -- e renderla online solo nel momento giusto. Costruisci e visualizza in anteprima la pagina, poi clicca su Pubblica quando sei pronto.
:::

## Articoli correlati

- [Gestire le pagine](managing-pages) -- Crea pagine, imposta gli URL e gestisci la navigazione del sito
- [Aspetto](appearance) -- Imposta colori, caratteri e identità visiva dell'intero sito
- [File](files) -- Carica immagini e documenti da usare nell'editor
- [Creare moduli](../forms/creating-forms) -- Crea moduli da incorporare nelle pagine
