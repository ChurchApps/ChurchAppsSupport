---
title: "Utilizzo dell'Editor di Pagina"
---

# Utilizzo dell'Editor di Pagina

<div class="article-intro">

L'editor di pagina di B1 è un builder visivo drag-and-drop che ti permette di progettare le pagine del sito web della tua chiesa senza scrivere codice. Puoi aggiungere sezioni e blocchi di contenuto, personalizzare gli stili, visualizzare in anteprima il tuo lavoro e annullare le modifiche -- tutto dal tuo browser.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Completa la [Configurazione Iniziale](initial-setup) per configurare il tuo sito web
- Crea almeno una pagina in [Gestione delle Pagine](managing-pages)
- Ti serve il permesso **content.edit** per accedere all'editor

</div>

## Aprire l'Editor

1. In B1 Admin, clicca su **Sito Web** nel menu a sinistra.
2. Trova la pagina che vuoi modificare nella tabella Pagine e clicca su **Modifica**.

L'editor si apre in modalità a schermo intero. Il pannello sinistro mostra la struttura della pagina e gli elementi di contenuto disponibili; l'area centrale mostra un'anteprima dal vivo della tua pagina.

:::info
L'editor viene sempre visualizzato in modalità chiara, indipendentemente dall'impostazione del tema di B1 Admin. Questo garantisce che l'anteprima corrisponda esattamente a come la tua pagina apparirà ai visitatori del sito web.
:::

## Struttura della Pagina: Sezioni ed Elementi

Ogni pagina è costruita su due livelli:

- **Sezioni** -- I contenitori di primo livello che dividono la tua pagina in fasce orizzontali (ad esempio, una sezione hero, un blocco di contenuto o una striscia di piè di pagina). Ogni pagina deve avere almeno una sezione prima di poter aggiungere contenuto.
- **Elementi** -- I singoli pezzi di contenuto inseriti all'interno di una sezione, come testo, immagini, pulsanti, schede, moduli e calendari.

### Aggiungere una Sezione

1. Clicca su **Aggiungi Sezione** (oppure il pulsante **+** in cima al pannello sinistro).
2. Scegli come iniziare:
   - **Da un modello** — sfoglia la galleria dei modelli di sezione organizzata per categoria (Hero, Chi Siamo, Servizi, Donazioni, ecc.) e cliccane uno per inserirlo come sezione completamente stilizzata e precompilata. Puoi personalizzare tutto dopo averla aggiunta.
   - **Sezione vuota** — scegli un layout a colonne (singola, due colonne, tre colonne, ecc.) e costruisci da zero.
3. La nuova sezione compare nell'anteprima. Cliccaci sopra per selezionarla e configurarne il colore di sfondo, il padding e altre opzioni di stile.

### Cambiare il Layout di una Sezione

Hai già costruito una sezione ma vuoi una struttura diversa? Usa il selettore di layout su quella sezione per scambiare la sua disposizione a colonne con un'altra dalla galleria, mantenendo il contenuto e gli elementi esistenti al loro posto.

### Aggiungere Elementi a una Sezione

1. Clicca all'interno di una sezione nell'anteprima per selezionarla.
2. Clicca su **Aggiungi Contenuto** e scegli un tipo di elemento dall'elenco:
   - **Testo** -- Titoli, paragrafi e testo formattato
   - **Immagine** -- Carica o collega una foto
   - **Pulsante** -- Un link cliccabile di invito all'azione
   - **Scheda** -- Un'immagine con titolo e descrizione
   - **Modulo** -- Incorpora un [modulo](../forms/creating-forms) direttamente nella pagina
   - **Calendario** -- Mostra un calendario di eventi
   - **FAQ** -- Blocchi di domande e risposte in stile fisarmonica
   - **Video** -- Incorpora un video tramite URL
   - **Browser Gruppi** -- Una directory filtrabile di tutti i gruppi della chiesa con ricerca opzionale, filtro per categoria e filtro per etichetta
   - **Funzione con Icona** -- Un'icona con titolo e breve descrizione, per evidenziare funzionalità o ministeri
   - **Galleria** -- Una griglia multi-foto o un layout a mosaico
   - **Testimonianza** -- Una o più citazioni con nome dell'autore, ruolo e foto
   - **Icone Social** -- Icone collegate ai profili social della tua chiesa
   - **Countdown** -- Un timer con conto alla rovescia verso una data o un orario di servizio settimanale
   - **Statistiche** -- Una riga di numeri in grande con etichette (membri, anni, campus)
   - **Progresso Campagna** -- Una barra di avanzamento in tempo reale per una campagna di raccolta fondi, che mostra il totale raccolto rispetto a un obiettivo
   - **Griglia Staff** -- Schede fotografiche per i membri di un gruppo; il gruppo deve avere l'opzione **elenco pubblico** attivata
   - **Orari dei Servizi** -- Il calendario dei servizi dei tuoi campus, prelevato automaticamente dalla configurazione delle presenze
   - **Predicazioni** -- La tua libreria di predicazioni, come browser completo o come layout a griglia, elenco o ultima predicazione in evidenza
   - **Mappa** -- Una mappa incorporata centrata sull'indirizzo della tua chiesa
   - **Tabella** -- Una semplice griglia di righe e colonne per contenuti tabellari
   - **Testo con Foto** -- Testo e un'immagine affiancati
   - **Logo** -- Il logo della tua chiesa, prelevato da [Aspetto](appearance)
   - **Live Stream** -- Il tuo player di live streaming, incorporato direttamente nella pagina
   - **Donazione** -- Un pulsante per donare o un modulo di donazione incorporato
   - **HTML Grezzo** -- Markup HTML personalizzato per casi d'uso avanzati
   - **iFrame** -- Incorpora contenuto esterno tramite URL
3. Configura l'elemento usando il pannello delle impostazioni che appare.

### Riordinare il Contenuto

Trascina sezioni o elementi usando l'icona della maniglia (sei puntini) sul lato sinistro di ogni voce per riordinarli. Puoi trascinare gli elementi all'interno di una sezione oppure spostarli tra sezioni diverse.

## Stilizzare la Tua Pagina

### Stili della Sezione

Clicca su qualsiasi sezione per aprire il suo pannello di stile. Puoi impostare:

- **Sfondo** -- Colore solido, sfumatura o immagine. Quando usi un'immagine di sfondo, un selettore di **Punto Focale** ti permette di cliccare per impostare quale parte dell'immagine resta centrata mentre la sezione si ridimensiona, e un'opzione di colore **Sovrapposizione** ti permette di aggiungere una tinta semi-trasparente sopra l'immagine per migliorare la leggibilità del testo.
- **Padding** -- Spaziatura superiore e inferiore all'interno della sezione
- **Larghezza** -- Larghezza piena o centrata/contenuta
- **Divisori** -- Divisori decorativi a forma (onda, obliquo, curva, triangolo e altri) sul bordo superiore o inferiore della sezione, con opzioni di colore, altezza e capovolgimento

### Stili dell'Elemento

Clicca su qualsiasi elemento per aprire il suo pannello di stile. Le opzioni comuni includono dimensione del carattere, colore, allineamento, margine e padding. Per le immagini, puoi impostare il testo alternativo e le destinazioni dei link.

### CSS Personalizzato

Per uno stile avanzato, ogni sezione ed elemento ha un campo **CSS Personalizzato** dove puoi scrivere le tue regole CSS. Queste sono limitate a quell'elemento, quindi non influenzeranno involontariamente il resto della pagina.

:::tip
Se hai bisogno di applicare stili su tutto il tuo sito -- come un font personalizzato o un colore globale -- usa le impostazioni di [Aspetto](appearance) invece del CSS personalizzato sulle singole pagine.
:::

## Visualizzare in Anteprima la Tua Pagina

Usa i controlli di anteprima nella barra degli strumenti per verificare come appare la tua pagina su schermi di dimensioni diverse:

- **Desktop** -- Vista browser a larghezza piena
- **Mobile** -- Vista stretta, formato telefono

Clicca su **Anteprima** per aprire una versione dal vivo della pagina in una nuova scheda del browser, esattamente come la vedranno i visitatori.

## Verificare l'Accessibilità

Clicca sull'icona **Accessibilità** nella barra degli strumenti per eseguire un controllo rapido dei problemi più comuni -- immagini senza testo alternativo, basso contrasto dei colori o titoli fuori ordine. Ogni problema rimanda direttamente all'elemento che richiede attenzione, così puoi correggerlo sul posto.

## Annullare le Modifiche

L'editor tiene traccia automaticamente della cronologia delle tue modifiche. Usa i pulsanti della barra degli strumenti o le scorciatoie da tastiera per navigare:

- **Annulla** (Ctrl+Z / Cmd+Z) -- Annulla la tua ultima azione
- **Ripristina** (Ctrl+Y / Cmd+Y) -- Riapplica un'azione annullata

Puoi anche ripristinare la pagina a un'istantanea precedente. Clicca su **Cronologia** nella barra degli strumenti per vedere un elenco di istantanee salvate con descrizioni, e clicca su qualsiasi voce per ripristinare quel punto.

:::warning
Ripristinare un'istantanea sostituisce il contenuto attuale della pagina con la versione dell'istantanea. Questa operazione non può essere annullata con il pulsante standard di annullamento. Salva un'istantanea del tuo stato attuale prima di ripristinarne una vecchia se vuoi mantenere la possibilità di tornare indietro.
:::

## Salvare e Pubblicare

Le modifiche vengono salvate automaticamente mentre lavori. Un indicatore di stato nella barra degli strumenti mostra se le tue modifiche sono state salvate.

### Stato di bozza e pubblicato

Le pagine possono avere uno stato **pubblicato**, che controlla quando i visitatori vedono le tue modifiche. La barra degli strumenti mostra un chip di stato con la condizione attuale:

- **Attivo al Salvataggio** -- La pagina non usa un flusso di pubblicazione. Ogni modifica salvata diventa attiva immediatamente. Questa è l'impostazione predefinita per le nuove pagine.
- **Modifiche Non Pubblicate** -- La pagina è già stata pubblicata in precedenza, ma hai apportato modifiche dopo l'ultima pubblicazione. I visitatori vedono ancora la versione precedentemente pubblicata.
- **Pubblicata** -- La pagina è attiva e il contenuto salvato corrisponde a ciò che vedono i visitatori.

Per pubblicare le tue modifiche, clicca sul pulsante **Pubblica** nella barra degli strumenti. La pagina diventa attiva immediatamente.

Per tornare all'ultima versione pubblicata senza influire su ciò che vedono i visitatori, apri il menu extra (⋮) e clicca su **Scarta Modifiche**.

Per portare una pagina completamente offline, apri il menu extra e clicca su **Annulla Pubblicazione**. I visitatori non vedranno più quella pagina finché non la pubblichi di nuovo.

:::tip
Usa il flusso bozza/pubblicazione quando vuoi preparare una pagina -- ad esempio, per un evento imminente -- e renderla attiva solo al momento giusto. Costruisci e visualizza in anteprima la pagina, poi clicca su Pubblica quando sei pronto.
:::

## Articoli Correlati

- [Gestione delle Pagine](managing-pages) -- Crea pagine, imposta gli URL e gestisci la navigazione del sito
- [Aspetto](appearance) -- Imposta colori, font e identità visiva a livello di sito
- [File](files) -- Carica immagini e documenti da usare nell'editor
- [Creazione dei Moduli](../forms/creating-forms) -- Costruisci moduli da incorporare nelle pagine
