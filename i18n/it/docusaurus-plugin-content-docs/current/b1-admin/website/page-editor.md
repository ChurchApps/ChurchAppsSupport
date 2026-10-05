---
title: "Utilizzo dell'Editor di Pagine"
---

# Utilizzo dell'Editor di Pagine

<div class="article-intro">

L'editor di pagine B1 è un costruttore visuale drag-and-drop che ti permette di progettare le pagine del tuo sito web della chiesa senza scrivere codice. Puoi aggiungere sezioni e blocchi di contenuto, personalizzare gli stili, visualizzare l'anteprima del tuo lavoro e annullare le modifiche -- tutto dal tuo browser.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Completa la [Configurazione Iniziale](initial-setup) per configurare il tuo sito web
- Crea almeno una pagina in [Gestione Pagine](managing-pages)
- Hai bisogno del permesso **content.edit** per accedere all'editor

</div>

## Apertura dell'Editor

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Website** e fai clic su **Pages**.
2. Trova la pagina che desideri modificare nella tabella Pagine e fai clic su **Modifica**.

L'editor si apre in modalità a schermo intero. Il pannello sinistro mostra la struttura della tua pagina e gli elementi di contenuto disponibili; l'area centrale mostra un'anteprima dal vivo della tua pagina.

:::info
L'editor viene sempre visualizzato in modalità chiara, indipendentemente dall'impostazione del tema B1 Admin. Questo assicura che l'anteprima corrisponda accuratamente a come la tua pagina apparirà ai visitatori del sito web.
:::

## Struttura Pagina: Sezioni ed Elementi

Ogni pagina è costruita da due livelli:

- **Sezioni** -- I contenitori di livello superiore che dividono la tua pagina in bande orizzontali (ad esempio, una sezione hero, un blocco di contenuto o una striscia di piè di pagina). Ogni pagina deve avere almeno una sezione prima di poter aggiungere contenuto.
- **Elementi** -- I singoli pezzi di contenuto posizionati all'interno di una sezione, come testo, immagini, pulsanti, schede, moduli e calendari.

### Aggiunta di una Sezione

1. Fai clic su **Aggiungi Sezione** (o il pulsante **+** in cima al pannello sinistro).
2. Scegli come iniziare:
   - **Da un modello** -- sfoglia la galleria di modelli di sezione organizzata per categoria (Hero, Chi Siamo, Servizi, Donazioni, ecc.) e fai clic su uno per inserirlo come una sezione completamente stilizzata e pre-riempita. Puoi personalizzare tutto dopo che è stato aggiunto.
   - **Sezione vuota** -- scegli un layout a colonne (singolo, due colonne, tre colonne, ecc.) e costruisci da zero.
3. La nuova sezione appare nell'anteprima. Fai clic su di essa per selezionarla e configura il suo colore di sfondo, padding e altre opzioni di stile.

### Cambio del Layout di una Sezione

Hai già costruito una sezione ma desideri una struttura diversa? Usa lo strumento di cambio del layout su quella sezione per scambiare il suo arrangiamento delle colonne con uno diverso dalla galleria mantenendo i tuoi elementi e contenuto esistenti in posizione.

### Aggiunta di Elementi a una Sezione

1. Fai clic all'interno di una sezione nell'anteprima per selezionarla.
2. Fai clic su **Aggiungi Contenuto** e scegli un tipo di elemento dall'elenco:
   - **Testo** -- Titoli, paragrafi e testo ricco
   - **Immagine** -- Carica o collega a una foto
   - **Pulsante** -- Un link call-to-action cliccabile
   - **Scheda** -- Un'immagine con titolo e descrizione
   - **Modulo** -- Incorpora un [modulo](../forms/creating-forms) direttamente sulla pagina
   - **Calendario** -- Visualizza un calendario di eventi
   - **FAQ** -- Blocchi di domande e risposte in stile accordion
   - **Video** -- Incorpora un video per URL
   - **Sfogliatore Gruppi** -- Una directory filtrabile di tutti i gruppi della chiesa con ricerca opzionale, filtro categoria e filtro etichetta
   - **Icona Caratteristica** -- Un'icona con titolo e descrizione breve, per evidenziazioni di caratteristiche o ministeri
   - **Galleria** -- Una griglia multi-foto o layout muratura
   - **Testimonianza** -- Una o più citazioni con nome dell'autore, ruolo e foto
   - **Icone Social** -- Icone collegate per i profili dei social media della tua chiesa
   - **Countdown** -- Un timer che fa il conto alla rovescia verso una data o un'ora di servizio settimanale
   - **Statistiche** -- Una riga di numeri grandi con etichette (membri, anni, campus)
   - **Progresso Campagna** -- Una barra di progresso dal vivo per una campagna di donazioni, mostrando il totale raccolto verso un obiettivo di fondo
   - **Griglia Staff** -- Schede foto per i membri di un gruppo; il gruppo deve avere l'opzione **public roster** attivata
   - **Orari Servizio** -- La programmazione dei servizi dei tuoi campus, estratta automaticamente dall'impostazione della frequenza
   - **Sermoni** -- La tua libreria di sermoni, come un browser completo o un layout griglia, elenco o featured-latest
   - **Mappa** -- Una mappa incorporata centrata sull'indirizzo della tua chiesa
   - **Tabella** -- Una semplice griglia di righe e colonne per contenuto tabulare
   - **Testo con Foto** -- Testo e un'immagine affiancati
   - **Logo** -- Il logo della tua chiesa, estratto da [Aspetto](appearance)
   - **Live Stream** -- Il tuo lettore live stream, incorporato direttamente sulla pagina
   - **Podcast** -- Un elenco di episodi estratti da un URL feed RSS podcast esterno che fornisci, con impostazioni per quanti episodi mostrare e se visualizzare date e descrizioni. Questo è per presentare qualsiasi feed podcast sul tuo sito; per pubblicare i tuoi sermoni come podcast, vedi [Gestione Sermoni](../sermons/managing-sermons.md#your-podcast-feed) invece.
   - **Donazione** -- Un pulsante di donazione o un modulo di donazione incorporato
   - **HTML Grezzo** -- Markup HTML personalizzato per casi di utilizzo avanzati
   - **iFrame** -- Incorpora contenuto esterno per URL
3. Configura l'elemento utilizzando il pannello di impostazioni che appare.

### Riordino del Contenuto

Trascina sezioni o elementi utilizzando l'icona di handle (sei punti) sul lato sinistro di ogni elemento per riordinarli. Puoi trascinare elementi all'interno di una sezione o spostarli tra le sezioni.

## Stilizzazione della Tua Pagina

### Stili Sezione

Fai clic su qualsiasi sezione per aprire il suo pannello di stile. Puoi impostare:

- **Sfondo** -- Colore solido, gradiente o immagine. Quando si utilizza uno sfondo immagine, un selezionatore **Punto Focale** ti permette di fare clic per impostare quale parte dell'immagine rimane centrata mentre la sezione si ridimensiona, e un'opzione di colore **Overlay** ti permette di aggiungere una tinta semi-trasparente sull'immagine per migliorare la leggibilità del testo.
- **Padding** -- Spaziatura superiore e inferiore all'interno della sezione
- **Larghezza** -- Full-width o centrato/contenuto
- **Divisori** -- Divisori di forma decorativa (onda, inclinazione, curva, triangolo e altri) sul bordo superiore o inferiore della sezione, con opzioni di colore, altezza e capovolgimento

### Stili Elemento

Fai clic su qualsiasi elemento per aprire il suo pannello di stile. Le opzioni comuni includono dimensione del carattere, colore, allineamento, margine e padding. Per le immagini, puoi impostare il testo alternativo e i target di link.

### CSS Personalizzato

Per uno stile avanzato, ogni sezione e elemento ha un campo **CSS Personalizzato** dove puoi scrivere le tue regole CSS. Questi sono limitati a quell'elemento, quindi non influenzeranno accidentalmente il resto della pagina.

:::tip
Se hai bisogno di applicare stili su tutto il tuo sito -- come un carattere personalizzato o un colore globale -- usa le impostazioni di [Aspetto](appearance) invece del CSS personalizzato su pagine individuali.
:::

## Visualizzazione dell'Anteprima della Tua Pagina

Usa i controlli di anteprima nella barra degli strumenti per verificare come la tua pagina appare a diverse dimensioni dello schermo:

- **Desktop** -- Visualizzazione browser a larghezza intera
- **Mobile** -- Visualizzazione ristretta di dimensioni telefoniche

Fai clic su **Anteprima** per aprire una versione dal vivo della pagina in una nuova scheda del browser, esattamente come la vedranno i visitatori.

## Verifica dell'Accessibilità

Fai clic sull'icona **Accessibilità** nella barra degli strumenti per eseguire un rapido controllo dei problemi comuni -- immagini senza testo alternativo, basso contrasto dei colori o titoli fuori ordine. Ogni problema si collega direttamente all'elemento che ha bisogno di attenzione in modo che tu possa correggerlo in posizione.

## Annullamento Delle Modifiche

L'editor traccia automaticamente la tua cronologia di editing. Usa i pulsanti della barra degli strumenti o i tasti di scelta rapida per navigare:

- **Annulla** (Ctrl+Z / Cmd+Z) -- Ripristina l'ultima azione
- **Ripeti** (Ctrl+Y / Cmd+Y) -- Ri-applica un'azione annullata

Puoi anche ripristinare la pagina a uno snapshot precedente. Fai clic su **Cronologia** nella barra degli strumenti per vedere un elenco di snapshot salvati con descrizioni, e fai clic su qualsiasi voce per ripristinare a quel punto.

:::warning
Ripristinare uno snapshot sostituisce il contenuto della tua pagina corrente con la versione dello snapshot. Questo non può essere annullato con il pulsante undo standard. Salva uno snapshot del tuo stato attuale prima di ripristinare uno vecchio se desideri mantenere l'opzione di tornare.
:::

## Salvataggio e Pubblicazione

Le modifiche vengono salvate automaticamente mentre lavori. Un indicatore di stato nella barra degli strumenti mostra se le tue modifiche sono state salvate.

### Stato bozza e pubblicato

Le pagine possono avere uno stato **pubblicato**, che controlla quando i visitatori vedono le tue modifiche. La barra degli strumenti visualizza un chip di stato che mostra lo stato attuale:

- **Live al Salvataggio** -- La pagina non utilizza un flusso di lavoro di pubblicazione. Ogni modifica salvata viene pubblicata immediatamente. Questo è l'impostazione predefinita per le nuove pagine.
- **Modifiche Non Pubblicate** -- La pagina è stata pubblicata in precedenza, ma hai apportato modifiche dall'ultima pubblicazione. I visitatori vedono ancora la versione precedentemente pubblicata.
- **Pubblicato** -- La pagina è live e il tuo contenuto salvato corrisponde a quello che i visitatori vedono.

Per pubblicare le tue modifiche, fai clic sul pulsante **Pubblica** nella barra degli strumenti. La pagina viene pubblicata immediatamente.

Per tornare all'ultima versione pubblicata senza influire su quello che i visitatori vedono, apri il menu overflow (⋮) e fai clic su **Scarta Modifiche**.

Per disattivare completamente una pagina, apri il menu overflow e fai clic su **Annulla Pubblicazione**. I visitatori non vedranno più quella pagina finché non la pubblichi di nuovo.

:::tip
Usa il flusso di lavoro bozza/pubblicazione quando desideri preparare una pagina -- ad esempio, per un evento imminente -- e fai che sia live solo al momento giusto. Costruisci e visualizza l'anteprima della pagina, poi fai clic su Pubblica quando sei pronto.
:::

## Articoli Correlati

- [Gestione Pagine](managing-pages) -- Crea pagine, imposta URL e gestisci la navigazione del sito
- [Aspetto](appearance) -- Imposta colori, caratteri e branding a livello di sito
- [File](files) -- Carica immagini e documenti da usare nell'editor
- [Creazione di Moduli](../forms/creating-forms) -- Costruisci moduli che puoi incorporare su pagine
