---
title: "Uso dell'editor di pagine"
---

# Uso dell'editor di pagine

<div class="article-intro">

L'editor di pagine di B1 è un builder visuale con trascinamento che consente di progettare le pagine del sito della chiesa senza scrivere codice. Puoi aggiungere sezioni e blocchi di contenuto, personalizzare gli stili, visualizzare l'anteprima del lavoro e annullare le modifiche, il tutto dal browser.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Completa la [Configurazione iniziale](initial-setup) per configurare il sito web
- Crea almeno una pagina in [Gestione delle pagine](managing-pages)
- Per accedere all'editor ti serve il permesso **content.edit**

</div>

## Apertura dell'editor

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Sito web** e fai clic su **Pagine**.
2. Trova la pagina che vuoi modificare nella tabella delle pagine e fai clic su **Modifica contenuto**.

L'editor si apre a schermo intero. Il pannello di sinistra mostra la struttura della pagina e gli elementi di contenuto disponibili; l'area centrale mostra un'anteprima dal vivo della pagina.

:::info
L'editor viene sempre visualizzato in modalità chiara, indipendentemente dal tema impostato in B1 Admin, e usa i caratteri dei titoli e del testo scelti in [Aspetto](appearance). In questo modo l'anteprima corrisponde fedelmente a come la pagina apparirà ai visitatori del sito.
:::

## Struttura della pagina: sezioni ed elementi

Ogni pagina è costruita su due livelli:

- **Sezioni** -- I contenitori di primo livello che dividono la pagina in fasce orizzontali (ad esempio una sezione hero, un blocco di contenuto o una striscia per il piè di pagina). Ogni pagina deve avere almeno una sezione prima che tu possa aggiungere contenuti.
- **Elementi** -- I singoli pezzi di contenuto inseriti in una sezione, come testo, immagini, pulsanti, schede, moduli e calendari.

### Aggiunta di una sezione

1. Fai clic su **Aggiungi sezione** (oppure sul pulsante **+** in cima al pannello di sinistra).
2. Scegli come iniziare:
   - **Da un modello** — sfoglia la galleria dei modelli di sezione, organizzati per categoria (Hero, Chi siamo, Servizi, Offerte, ecc.), e fai clic su uno per inserirlo come sezione già stilizzata e precompilata. Puoi personalizzare tutto dopo l'inserimento.
   - **Sezione vuota** — scegli una disposizione a colonne (una colonna, due colonne, tre colonne, ecc.) e costruisci da zero.
3. La nuova sezione compare nell'anteprima. Fai clic su di essa per selezionarla e configurare il colore di sfondo, l'imbottitura e le altre opzioni di stile.

### Cambio della disposizione di una sezione

Hai già costruito una sezione ma vuoi una struttura diversa? Usa il selettore di layout di quella sezione per cambiare la disposizione delle colonne scegliendone un'altra dalla galleria, mantenendo al loro posto i contenuti e gli elementi esistenti.

### Aggiunta di elementi a una sezione

1. Fai clic all'interno di una sezione nell'anteprima per selezionarla.
2. Fai clic su **Aggiungi contenuto** e scegli un tipo di elemento dall'elenco:
   - **Testo** -- Titoli, paragrafi e testo formattato
   - **Immagine** -- Carica o collega una foto
   - **Pulsante** -- Un link cliccabile di invito all'azione
   - **Scheda** -- Un'immagine con un titolo e una descrizione
   - **Modulo** -- Incorpora un [modulo](../forms/creating-forms) direttamente nella pagina
   - **Calendario** -- Mostra un calendario degli eventi
   - **FAQ** -- Blocchi di domande e risposte a fisarmonica
   - **Video** -- Incorpora un video tramite URL
   - **Esplora gruppi** -- Un elenco filtrabile di tutti i gruppi della chiesa, con ricerca facoltativa, filtro per categoria e filtro per etichetta
   - **Icona con descrizione** -- Un'icona con un titolo e una breve descrizione, per mettere in evidenza servizi o ministeri
   - **Galleria** -- Una griglia o un layout a muro di mattoni di più foto
   - **Testimonianza** -- Una o più citazioni con nome dell'autore, ruolo e foto
   - **Icone social** -- Icone con link ai profili social della chiesa
   - **Conto alla rovescia** -- Un timer che conta alla rovescia fino a una data o a un orario di culto settimanale
   - **Statistiche** -- Una riga di numeri grandi con etichette (membri, anni, sedi)
   - **Avanzamento campagna** -- Una barra di avanzamento in tempo reale per una campagna di raccolta fondi, che mostra il totale raccolto rispetto all'obiettivo del fondo
   - **Griglia dello staff** -- Schede con foto per i membri di un gruppo; il gruppo deve avere attiva l'opzione **elenco pubblico**
   - **Orari dei culti** -- Il programma dei culti delle sedi, ricavato automaticamente dalla configurazione delle presenze
   - **Predicazioni** -- La tua libreria di predicazioni, come browser completo oppure come griglia, elenco o layout con la più recente in evidenza
   - **Mappa** -- Una mappa incorporata centrata sull'indirizzo della chiesa
   - **Tabella** -- Una semplice griglia di righe e colonne per contenuti tabulari
   - **Testo con foto** -- Testo e un'immagine affiancati
   - **Logo** -- Il logo della chiesa, ripreso da [Aspetto](appearance)
   - **Diretta streaming** -- Il lettore della diretta, incorporato direttamente nella pagina
   - **Podcast** -- Un elenco di episodi ricavato da un feed RSS di podcast esterno il cui URL fornisci, con impostazioni per il numero di episodi da mostrare e per visualizzare o meno le date e le descrizioni. Serve a far risaltare sul sito un feed di podcast qualsiasi; per pubblicare le tue predicazioni come podcast, consulta invece [Gestione delle predicazioni](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donazione** -- Un pulsante per le offerte o un modulo di donazione incorporato
   - **HTML** -- Il tuo codice HTML grezzo, per usi avanzati come l'incorporamento di un widget di terze parti (vedi [Uso dell'elemento HTML](#using-the-html-element))
   - **iFrame** -- Incorpora contenuti esterni tramite URL
3. Configura l'elemento usando il pannello delle impostazioni che compare.

### Uso dell'elemento HTML {#using-the-html-element}

L'elemento **HTML** ha due campi:

- **Contenuto HTML** -- Il markup da mostrare nella pagina. Eventuali tag `<script>` inseriti qui vengono eseguiti sul sito in produzione.
- **JavaScript (escludi il tag script)** -- Codice script che viene eseguito al caricamento della pagina. Puoi anche incollare qui lo snippet di incorporamento di un fornitore, con i relativi tag `<script>`, e verrà eseguito sul sito in produzione.

Se incolli solo un indirizzo web (ad esempio il link di un'immagine) nel campo JavaScript, il campo diventa rosso con l'avviso *"Questo è un indirizzo web, non JavaScript."* Un indirizzo lasciato da solo in quel campo non fa nulla. Per mostrare un'immagine, usa un elemento **Immagine** oppure inserisci `<img src="...">` in **Contenuto HTML**.

### Uso dell'elemento Calendario {#using-the-calendar-element}

L'elemento **Calendario** mostra gli eventi di uno dei tuoi calendari:

1. In **Seleziona**, scegli **Calendario di gruppo** (gli eventi di un gruppo; l'elenco mostra i gruppi di cui fai parte) oppure **Calendario curato** (un calendario creato in **Calendari**; vedi [Calendario curato](../calendars/curated-calendar)).
2. In **Seleziona calendario**, scegli il gruppo o il calendario.
3. In **Visualizzazione**, scegli come mostrarlo:
   - **Calendario mensile** -- Una griglia mensile che i visitatori possono sfogliare.
   - **Prossimi eventi** -- Una griglia di riquadri per i prossimi 12 eventi, con un evento ricorrente mostrato una sola volta alla sua prossima data. Ogni riquadro mostra la foto dell'evento (oppure il suo titolo sul colore scuro del tema, se non ha una foto), un badge con la data, il giorno e l'orario, e la prima riga della descrizione. Un pulsante **Iscriviti** sopra i riquadri permette ai visitatori di copiare il link ICS del calendario o di scaricarlo.
4. Per mostrare solo alcuni eventi, scrivi un tag in **Solo eventi con tag** -- ad esempio `giovani`. Compaiono solo gli eventi i cui **Tag** includono quella parola. Lascia il campo vuoto per mostrare tutti gli eventi. I tag si impostano su ogni evento; vedi [Aggiunta e modifica di eventi](../calendars/creating-calendars.md#adding-and-editing-events).

In entrambe le visualizzazioni, cliccando su un evento si apre la sua pagina sul sito. La pagina dell'evento mostra la foto, il titolo, la data e l'ora e la descrizione, oltre a un riquadro con **Quando** (incluso lo schema di ripetizione per un evento ricorrente) e **Dove** (le sale prenotate). Compaiono anche il pulsante **Iscriviti a questo evento**, quando le iscrizioni sono attive, e il link **Aggiungi al mio calendario**, che scarica l'evento come file di calendario. La pagina è impostata in modo che i motori di ricerca possano mostrare la data e i dettagli dell'evento nei risultati.

### Riordino dei contenuti

Trascina le sezioni o gli elementi usando l'icona a maniglia (sei puntini) sul lato sinistro di ciascun elemento per riordinarli. Puoi trascinare gli elementi all'interno di una sezione oppure spostarli da una sezione all'altra.

## Personalizzazione dello stile della pagina

### Stili delle sezioni

Fai clic su una sezione qualsiasi per aprire il suo pannello di stile. Puoi impostare:

- **Sfondo** -- Colore pieno, sfumatura o immagine. Quando usi un'immagine di sfondo, un selettore **Punto focale** ti permette di fare clic per stabilire quale parte dell'immagine resta centrata quando la sezione si ridimensiona, e un'opzione di colore **Sovrapposizione** ti permette di aggiungere una tinta semitrasparente sull'immagine per migliorare la leggibilità del testo
- **Imbottitura** -- Spaziatura superiore e inferiore all'interno della sezione
- **Larghezza** -- Larghezza piena oppure centrata/contenuta
- **Separatori** -- Forme decorative di separazione (onda, obliqua, curva, triangolo e altre) sul bordo superiore o inferiore della sezione, con colore, altezza e opzioni di rotazione

### Stili degli elementi

Fai clic su un elemento qualsiasi per aprire il suo pannello di stile. Tra le opzioni comuni ci sono dimensione del carattere, colore, allineamento, margine e imbottitura. Per le immagini puoi impostare il testo alternativo e la destinazione del link.

### CSS personalizzato

Per stili avanzati, ogni sezione ed elemento ha un campo **CSS personalizzato** in cui puoi scrivere le tue regole CSS. Queste regole sono limitate a quell'elemento, quindi non influiscono involontariamente sul resto della pagina.

:::tip
Se devi applicare stili all'intero sito -- ad esempio un carattere personalizzato o un colore globale -- usa le impostazioni di [Aspetto](appearance) invece del CSS personalizzato sulle singole pagine.
:::

## Anteprima della pagina

Usa i controlli di anteprima nella barra degli strumenti per verificare come appare la pagina alle diverse dimensioni dello schermo:

- **Desktop** -- Visualizzazione a larghezza piena del browser
- **Mobile** -- Visualizzazione stretta, delle dimensioni di uno smartphone

Per vedere la pagina dal vivo esattamente come la vedranno i visitatori, torna all'elenco delle pagine e fai clic sul percorso della pagina. Si apre in una nuova scheda del browser.

## Verifica dell'accessibilità

Fai clic sull'icona **Accessibilità** nella barra degli strumenti per eseguire un controllo rapido dei problemi più comuni: immagini senza testo alternativo, contrasto dei colori insufficiente o titoli in ordine errato. Ogni problema rimanda direttamente all'elemento interessato, così puoi correggerlo sul posto.

## Annullamento delle modifiche

L'editor tiene automaticamente traccia della cronologia delle modifiche. Usa i pulsanti della barra degli strumenti o le scorciatoie da tastiera per navigare:

- **Annulla** (Ctrl+Z / Cmd+Z) -- Annulla l'ultima azione
- **Ripeti** (Ctrl+Maiusc+Z oppure Ctrl+Y / Cmd+Maiusc+Z) -- Riapplica un'azione annullata

Puoi anche ripristinare la pagina a una versione precedente. Fai clic su **Visualizza cronologia** nella barra degli strumenti per vedere l'elenco delle versioni salvate con le relative descrizioni, quindi fai clic su una voce qualsiasi per tornare a quel punto.

:::warning
Ripristinare una versione sostituisce il contenuto attuale della pagina con quello della versione salvata. Questa operazione non può essere annullata con il pulsante Annulla standard. Salva una versione dello stato attuale prima di ripristinarne una vecchia, se vuoi poter tornare indietro.
:::

## Salvataggio e pubblicazione

Le modifiche vengono salvate automaticamente mentre lavori. Un indicatore di stato nella barra degli strumenti mostra se le tue modifiche sono state salvate.

### Stato di bozza e di pubblicazione

Le pagine possono avere uno stato **pubblicato**, che controlla quando i visitatori vedono le tue modifiche. La barra degli strumenti mostra un'etichetta di stato con la situazione attuale:

- **Attivo al salvataggio** -- La pagina non usa un flusso di pubblicazione. Ogni modifica salvata va subito online. È il valore predefinito per le nuove pagine.
- **Modifiche non pubblicate** -- La pagina è già stata pubblicata in passato, ma hai apportato modifiche dopo l'ultima pubblicazione. I visitatori vedono ancora la versione pubblicata in precedenza.
- **Pubblicata** -- La pagina è online e il contenuto salvato corrisponde a quello che vedono i visitatori.

Per pubblicare le modifiche, fai clic sul pulsante **Pubblica** nella barra degli strumenti. La pagina va online subito.

Per tornare all'ultima versione pubblicata senza influire su ciò che vedono i visitatori, apri il menu a tre puntini (⋮) e fai clic su **Scarta modifiche non pubblicate**.

Per smettere di usare il flusso di pubblicazione, apri il menu a tre puntini e fai clic su **Disattiva pubblicazione**. Le modifiche torneranno ad andare online immediatamente.

:::tip
Usa il flusso di bozza e pubblicazione quando vuoi preparare una pagina -- ad esempio per un evento imminente -- e renderla visibile solo nel momento giusto. Costruisci e visualizza in anteprima la pagina, poi fai clic su Pubblica quando sei pronto.
:::

## Articoli correlati

- [Gestione delle pagine](managing-pages) -- Crea pagine, imposta gli URL e gestisci la navigazione del sito
- [Aspetto](appearance) -- Imposta colori, caratteri e identità visiva del sito
- [File](files) -- Carica immagini e documenti da usare nell'editor
- [Creazione di moduli](../forms/creating-forms) -- Crea moduli da incorporare nelle pagine
