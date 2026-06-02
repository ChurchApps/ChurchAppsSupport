---
title: "Utilizzo dell'Editor di Pagina"
---

# Utilizzo dell'Editor di Pagina

<div class="article-intro">

L'editor di pagina B1 è un generatore visivo drag-and-drop che ti consente di progettare le pagine del tuo sito web della chiesa senza scrivere alcun codice. Puoi aggiungere sezioni e blocchi di contenuto, personalizzare gli stili, visualizzare in anteprima il tuo lavoro e annullare i cambiamenti -- il tutto dal tuo browser.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Completa [Configurazione Iniziale](initial-setup) per ottenere il tuo sito web configurato
- Crea almeno una pagina in [Gestione delle Pagine](managing-pages)
- Hai bisogno dell'autorizzazione **content.edit** per accedere all'editor

</div>

## Apertura dell'Editor

1. In B1 Admin, fai clic su **Sito Web** nel menu a sinistra.
2. Trova la pagina che desideri modificare nella tabella Pagine e fai clic su **Modifica**.

L'editor si apre in modalità a schermo intero. Il pannello sinistro mostra la struttura della tua pagina e gli elementi di contenuto disponibili; l'area centrale mostra un'anteprima dal vivo della tua pagina.

:::info
L'editor viene sempre visualizzato in modalità chiara, indipendentemente dall'impostazione del tema B1 Admin. Questo assicura che l'anteprima corrisponda accuratamente a come apparirà la tua pagina ai visitatori del sito web.
:::

## Struttura della Pagina: Sezioni ed Elementi

Ogni pagina è costruita da due livelli:

- **Sezioni** -- I contenitori di primo livello che dividono la tua pagina in strisce orizzontali (ad esempio, una sezione hero, un blocco di contenuto o una striscia di footer). Ogni pagina deve avere almeno una sezione prima di poter aggiungere contenuto.
- **Elementi** -- I singoli pezzi di contenuto posizionati all'interno di una sezione, come testo, immagini, pulsanti, schede, moduli e calendari.

### Aggiunta di una Sezione

1. Fai clic su **Aggiungi Sezione** (o il pulsante **+** in cima al pannello sinistro).
2. Scegli un layout per la tua sezione -- le opzioni includono colonna singola, due colonne, tre colonne e altro.
3. La nuova sezione appare nell'anteprima. Fai clic su di essa per selezionarla e configura il colore di sfondo, la spaziatura interna e altre opzioni di stile.

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
   - **Video** -- Incorpora un video tramite URL
   - **Groups Browser** -- Una directory filtabile di tutti i gruppi della chiesa con ricerca facoltativa, filtro di categoria e filtro di etichetta
3. Configura l'elemento utilizzando il pannello delle impostazioni che appare.

### Riorganizzazione del Contenuto

Trascina le sezioni o gli elementi utilizzando l'icona della maniglia (sei punti) sul lato sinistro di ogni elemento per riordinarli. Puoi trascinare gli elementi all'interno di una sezione o spostarli tra le sezioni.

## Styling della Tua Pagina

### Stili di Sezione

Fai clic su qualsiasi sezione per aprire il suo pannello di stile. Puoi impostare:

- **Sfondo** -- Colore solido, gradiente o immagine
- **Spaziatura Interna** -- Spaziatura superiore e inferiore all'interno della sezione
- **Larghezza** -- Larghezza intera o centrato/contenuto

### Stili degli Elementi

Fai clic su qualsiasi elemento per aprire il suo pannello di stile. Le opzioni comuni includono dimensione del carattere, colore, allineamento, margine e spaziatura interna. Per le immagini, puoi impostare il testo alt e i target dei link.

### CSS Personalizzato

Per lo styling avanzato, ogni sezione e elemento ha un campo **CSS Personalizzato** in cui puoi scrivere le tue regole CSS. Questi sono limitati a quell'elemento, quindi non influenzeranno involontariamente il resto della pagina.

:::tip
Se hai bisogno di applicare stili su tutto il tuo sito -- come un carattere personalizzato o un colore globale -- usa le impostazioni [Aspetto](appearance) anziché CSS personalizzato su singole pagine.
:::

## Anteprima della Tua Pagina

Usa i controlli di anteprima nella barra degli strumenti per controllare come appare la tua pagina a diverse dimensioni dello schermo:

- **Desktop** -- Visualizzazione del browser a larghezza intera
- **Mobile** -- Visualizzazione di dimensioni telefono strette

Fai clic su **Anteprima** per aprire una versione live della pagina in una nuova scheda del browser, esattamente come la vedranno i visitatori.

## Annullamento dei Cambiamenti

L'editor traccia automaticamente la tua cronologia di modifica. Usa i pulsanti della barra degli strumenti o i tasti di scelta rapida per navigare:

- **Annulla** (Ctrl+Z / Cmd+Z) -- Ripristina la tua ultima azione
- **Ripeti** (Ctrl+Y / Cmd+Y) -- Riapplica un'azione annullata

Puoi anche ripristinare la pagina a un'istantanea precedente. Fai clic su **Cronologia** nella barra degli strumenti per visualizzare un elenco di istantanee salvate con descrizioni e fai clic su qualsiasi voce per ripristinare a quel punto.

:::warning
Il ripristino di un'istantanea sostituisce il contenuto della pagina corrente con la versione dell'istantanea. Ciò non può essere annullato con il pulsante di annullamento standard. Salva un'istantanea dello stato attuale prima di ripristinare uno vecchio se desideri mantenere l'opzione di ritornare.
:::

## Salvataggio del Tuo Lavoro

I cambiamenti vengono salvati automaticamente mentre lavori. Un indicatore di stato nella barra degli strumenti mostra se i tuoi cambiamenti sono stati salvati. Puoi anche fare clic su **Salva** in qualsiasi momento per forzare un salvataggio.

## Articoli Correlati

- [Gestione delle Pagine](managing-pages) -- Crea pagine, imposta URL e gestisci la navigazione del sito
- [Aspetto](appearance) -- Imposta i colori, i caratteri e il branding a livello di sito
- [File](files) -- Carica immagini e documenti per l'uso nell'editor
- [Creazione di Moduli](../forms/creating-forms) -- Crea moduli che puoi incorporare sulle pagine
