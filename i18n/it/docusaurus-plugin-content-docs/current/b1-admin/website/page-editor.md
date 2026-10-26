---
title: "Utilizzo dell'editor di pagine"
---

# Utilizzo dell'editor di pagine

<div class="article-intro">

L'editor di pagine di B1 è un costruttore visuale con trascinamento che ti permette di progettare le pagine del sito web della chiesa senza scrivere codice. Puoi aggiungere sezioni e blocchi di contenuto, personalizzare gli stili, visualizzare l'anteprima del lavoro e annullare le modifiche, il tutto dal browser.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Completa la [Configurazione iniziale](initial-setup) per configurare il tuo sito web
- Crea almeno una pagina in [Gestire le pagine](managing-pages)
- Ti serve l'autorizzazione **content.edit** per accedere all'editor

</div>

## Aprire l'editor

1. In B1 Admin, apri il [menu di accesso rapido](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Sito web** e fai clic su **Pagine**.
2. Trova la pagina che vuoi modificare nella tabella Pagine e fai clic su **Modifica contenuto**.

L'editor si apre a schermo intero. Il pannello di sinistra mostra la struttura della pagina e gli elementi di contenuto disponibili; l'area centrale mostra un'anteprima in tempo reale della pagina.

:::info
L'editor viene sempre visualizzato in modalità chiara, indipendentemente dal tema impostato in B1 Admin, e usa i caratteri dei titoli e del testo che hai scelto in [Aspetto](appearance). Questo garantisce che l'anteprima corrisponda fedelmente a come la pagina apparirà ai visitatori del sito.
:::

## Struttura della pagina: sezioni ed elementi

Ogni pagina è costruita su due livelli:

- **Sezioni** -- I contenitori di primo livello che dividono la pagina in fasce orizzontali (ad esempio, una sezione hero, un blocco di contenuto o una striscia di piè di pagina). Ogni pagina deve avere almeno una sezione prima che tu possa aggiungere contenuti.
- **Elementi** -- I singoli pezzi di contenuto inseriti in una sezione, come testi, immagini, pulsanti, schede, moduli e calendari.

### Aggiungere una sezione

1. Fai clic su **Aggiungi sezione** (o sul pulsante **+** in cima al pannello di sinistra).
2. Scegli come iniziare:
   - **Da un modello** -- sfoglia la galleria dei modelli di sezione organizzata per categoria (Hero, Chi siamo, Servizi, Offerte, ecc.) e fai clic su uno per inserirlo come sezione già stilizzata e precompilata. Puoi personalizzare tutto dopo averla aggiunta.
   - **Sezione vuota** -- scegli una disposizione a colonne (singola, due colonne, tre colonne, ecc.) e costruisci da zero.
3. La nuova sezione compare nell'anteprima. Fai clic su di essa per selezionarla e configurare il colore di sfondo, l'imbottitura e le altre opzioni di stile.

### Cambiare la disposizione di una sezione

Hai già costruito una sezione ma vuoi una struttura diversa? Usa il selettore di disposizione di quella sezione per cambiare la sua disposizione in colonne con un'altra della galleria, mantenendo al loro posto i contenuti e gli elementi esistenti.

### Aggiungere elementi a una sezione

1. Fai clic all'interno di una sezione nell'anteprima per selezionarla.
2. Fai clic su **Aggiungi contenuto** e scegli un tipo di elemento dall'elenco:
   - **Testo** -- Titoli, paragrafi e testo formattato
   - **Immagine** -- Carica o collega una foto
   - **Pulsante** -- Un link cliccabile di invito all'azione
   - **Scheda** -- Un'immagine con un titolo e una descrizione
   - **Modulo** -- Incorpora un [modulo](../forms/creating-forms) direttamente nella pagina. Se il modulo ha una [foto di intestazione](../forms/creating-forms.md#adding-a-header-photo), questa compare sopra le domande
   - **Calendario** -- Mostra un calendario degli eventi
   - **FAQ** -- Blocchi di domande e risposte a fisarmonica
   - **Video** -- Incorpora un video tramite URL
   - **Esplora gruppi** -- Un elenco filtrabile di tutti i gruppi della chiesa, con ricerca facoltativa, filtro per categoria e filtro per etichetta
   - **Icona caratteristica** -- Un'icona con un titolo e una breve descrizione, per evidenziare caratteristiche o ministeri
   - **Galleria** -- Una griglia o un layout a muratura di più foto
   - **Testimonianza** -- Una o più citazioni con nome dell'autore, ruolo e foto
   - **Icone social** -- Icone con link ai profili social media della chiesa: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo e Podcast. Inserisci un link per ciascuna che vuoi mostrare; per **WhatsApp**, usa un link `https://wa.me/` con il tuo numero oppure un link di invito al gruppo
   - **Conto alla rovescia** -- Un timer che conta alla rovescia fino a una data o a un orario di culto settimanale
   - **Statistiche** -- Una riga di numeri grandi con etichette (membri, anni, sedi)
   - **Avanzamento campagna** -- Una barra di avanzamento in tempo reale per una campagna di offerte, che mostra il totale raccolto verso l'obiettivo di un fondo
   - **Griglia del personale** -- Schede con foto dei membri di un gruppo; il gruppo deve avere attiva l'opzione **elenco pubblico**
   - **Orari dei culti** -- Il programma dei culti delle tue sedi, ricavato automaticamente dalla configurazione delle presenze
   - **Predicazioni** -- La tua libreria di predicazioni, come browser completo oppure in una griglia, in un elenco o in un layout con l'ultima in evidenza
   - **Mappa** -- Una mappa incorporata centrata sull'indirizzo della tua chiesa
   - **Tabella** -- Una semplice griglia di righe e colonne per contenuti tabellari
   - **Testo con foto** -- Testo e un'immagine affiancati
   - **Logo** -- Il logo della tua chiesa, ripreso da [Aspetto](appearance)
   - **Diretta streaming** -- Il lettore della tua diretta streaming, incorporato direttamente nella pagina
   - **Podcast** -- Un elenco di episodi ricavato da un URL di un feed RSS di podcast esterno che fornisci, con impostazioni per decidere quanti episodi mostrare e se visualizzare date e descrizioni. Ogni episodio sul sito pubblicato ha un lettore audio e un link **Scarica** che salva il file audio dell'episodio con il titolo dell'episodio. Serve a mettere in evidenza un qualsiasi feed di podcast sul tuo sito; per pubblicare le tue predicazioni come podcast, vedi invece [Gestire le predicazioni](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donazione** -- Un pulsante per le offerte o un modulo di donazione incorporato
   - **HTML** -- HTML personalizzato grezzo, per usi avanzati come l'incorporamento di un widget di terze parti (vedi [Usare l'elemento HTML](#using-the-html-element))
   - **iFrame** -- Incorpora contenuti esterni tramite URL
3. Configura l'elemento usando il pannello delle impostazioni che compare.

### Usare l'elemento HTML

L'elemento **HTML** ha due campi:

- **Contenuto HTML** -- Il markup da mostrare nella pagina. Eventuali tag `<script>` inclusi qui vengono eseguiti sul sito pubblicato.
- **JavaScript (escludi il tag script)** -- Codice di script eseguito al caricamento della pagina. Puoi anche incollare qui lo snippet di incorporamento di un fornitore, con i relativi tag `<script>`, e verrà eseguito sul sito pubblicato.

Se incolli nella casella JavaScript solo un indirizzo web (come il link di un'immagine), la casella diventa rossa con l'avviso *"Questo è un indirizzo web, non JavaScript."* Un indirizzo isolato in quella casella non fa nulla. Per mostrare un'immagine, usa un elemento **Immagine** oppure inserisci `<img src="...">` in **Contenuto HTML**.

### Usare l'elemento Calendario {#using-the-calendar-element}

L'elemento **Calendario** mostra gli eventi di uno dei tuoi calendari:

1. In **Seleziona**, scegli **Calendario del gruppo** (gli eventi di un solo gruppo; l'elenco mostra i gruppi di cui fai parte) oppure **Calendario curato** (un calendario che hai creato in **Calendari**; vedi [Calendario curato](../calendars/curated-calendar)).
2. In **Seleziona calendario**, scegli il gruppo o il calendario.
3. In **Visualizzazione**, scegli come mostrarlo:
   - **Calendario mensile** -- Una griglia del mese che i visitatori possono sfogliare.
   - **Prossimi eventi** -- Una griglia di riquadri per i prossimi 12 eventi, con un evento ricorrente mostrato una sola volta alla sua prossima data. Ogni riquadro mostra la foto dell'evento (o il suo titolo sul colore scuro del tuo tema quando non c'è una foto), un distintivo della data, il giorno e l'ora, e la prima riga della descrizione. Un pulsante **Iscriviti** sopra i riquadri permette ai visitatori di copiare il link ICS del calendario o di scaricarlo.
4. Per mostrare solo alcuni eventi, scrivi un tag in **Solo eventi con tag** -- ad esempio, `giovani`. Compaiono solo gli eventi i cui **Tag** includono quella parola. Lascia il campo vuoto per mostrare tutti gli eventi. I tag si impostano su ciascun evento; vedi [Creare e modificare eventi](../calendars/creating-calendars.md#adding-and-editing-events).

In entrambe le visualizzazioni, cliccando su un evento si apre la sua pagina sul tuo sito web. La pagina dell'evento mostra la foto, il titolo, la data e l'ora e la descrizione, più un riquadro con **Quando** (incluso lo schema di ripetizione per un evento ricorrente) e **Dove** (le sale prenotate per l'evento). Include anche il pulsante **Iscriviti a questo evento**, quando l'iscrizione è attiva, e un link **Aggiungi al mio calendario** che scarica l'evento come file di calendario. La pagina è predisposta affinché i motori di ricerca possano mostrare la data e i dettagli dell'evento nei risultati. Le pagine degli eventi dei calendari curati mostrati nelle tue pagine (per eventi nei successivi sei mesi) sono inoltre elencate nella mappa del sito, così i motori di ricerca possono trovarle.

### Riordinare i contenuti

Trascina le sezioni o gli elementi usando l'icona a maniglia (sei punti) sul lato sinistro di ciascun elemento per riordinarli. Puoi trascinare gli elementi all'interno di una sezione o spostarli tra sezioni diverse.

## Personalizzare la pagina

### Stili di sezione

Fai clic su una sezione qualsiasi per aprire il suo pannello di stile. Puoi impostare:

- **Sfondo** -- Colore pieno, sfumatura o immagine. Quando usi uno sfondo con immagine, un selettore **Punto focale** ti permette di fare clic per impostare quale parte dell'immagine resta al centro quando la sezione si ridimensiona; l'opzione **Sovrapposizione** ti permette di aggiungere una tinta semitrasparente sopra l'immagine per migliorare la leggibilità del testo.
- **Imbottitura** -- Spaziatura superiore e inferiore all'interno della sezione
- **Larghezza** -- Larghezza piena oppure centrata/contenuta
- **Separatori** -- Separatori decorativi a forma (onda, obliquo, curva, triangolo e altri) sul bordo superiore o inferiore della sezione, con opzioni per colore, altezza e rotazione

### Stili degli elementi

Fai clic su un elemento qualsiasi per aprire il suo pannello di stile. Tra le opzioni comuni ci sono dimensione del carattere, colore, allineamento, margine e imbottitura. Per le immagini, puoi impostare il testo alternativo e le destinazioni dei link.

### CSS personalizzato

Per uno stile avanzato, ogni sezione e ogni elemento ha un campo **CSS personalizzato** in cui puoi scrivere le tue regole CSS. Queste regole sono limitate a quell'elemento, quindi non influiscono involontariamente sul resto della pagina.

:::tip
Se devi applicare stili all'intero sito, come un carattere personalizzato o un colore globale, usa le impostazioni [Aspetto](appearance) invece del CSS personalizzato sulle singole pagine.
:::

## Visualizzare l'anteprima della pagina

Usa i controlli di anteprima nella barra degli strumenti per verificare come appare la pagina a diverse dimensioni dello schermo:

- **Desktop** -- Visualizzazione a tutta larghezza del browser
- **Mobile** -- Visualizzazione stretta, delle dimensioni di un telefono

Per vedere la pagina pubblicata esattamente come la vedranno i visitatori, torna all'elenco delle Pagine e fai clic sul percorso della pagina. Si apre in una nuova scheda del browser.

## Verificare l'accessibilità

Fai clic sull'icona **Accessibilità** nella barra degli strumenti per eseguire un controllo rapido dei problemi più comuni: immagini senza testo alternativo, contrasto di colore insufficiente o titoli fuori ordine. Ogni problema rimanda direttamente all'elemento che richiede attenzione, così puoi correggerlo sul posto.

## Annullare le modifiche

L'editor tiene automaticamente traccia della cronologia delle modifiche. Usa i pulsanti della barra degli strumenti o le scorciatoie da tastiera per spostarti:

- **Annulla** (Ctrl+Z / Cmd+Z) -- Ripristina l'ultima azione
- **Ripeti** (Ctrl+Maiusc+Z oppure Ctrl+Y / Cmd+Maiusc+Z) -- Riapplica un'azione annullata

Puoi anche ripristinare la pagina a uno snapshot precedente. Fai clic su **Visualizza cronologia** nella barra degli strumenti per vedere un elenco di snapshot salvati con le relative descrizioni, e fai clic su una voce qualsiasi per tornare a quel punto.

:::warning
Ripristinare uno snapshot sostituisce il contenuto attuale della pagina con la versione dello snapshot. Questa operazione non può essere annullata con il pulsante standard di annullamento. Se vuoi poter tornare indietro, salva uno snapshot dello stato attuale prima di ripristinarne uno vecchio.
:::

## Salvare e pubblicare

Le modifiche vengono salvate automaticamente mentre lavori. Un indicatore di stato nella barra degli strumenti mostra se le tue modifiche sono state salvate.

### Stato di bozza e di pubblicazione

Le pagine possono avere uno stato **pubblicato**, che controlla quando i visitatori vedono le tue modifiche. La barra degli strumenti mostra un'etichetta di stato con lo stato attuale:

- **Attiva al salvataggio** -- La pagina non usa un flusso di pubblicazione. Ogni modifica salvata va subito online. Questo è il valore predefinito per le nuove pagine.
- **Modifiche non pubblicate** -- La pagina è già stata pubblicata in passato, ma hai apportato modifiche dopo l'ultima pubblicazione. I visitatori vedono ancora la versione pubblicata in precedenza.
- **Pubblicata** -- La pagina è online e il contenuto salvato corrisponde a ciò che vedono i visitatori.

Per pubblicare le modifiche, fai clic sul pulsante **Pubblica** nella barra degli strumenti. La pagina diventa attiva immediatamente.

Per tornare all'ultima versione pubblicata senza influire su ciò che vedono i visitatori, apri il menu a tre punti (⋮) e fai clic su **Scarta le modifiche non pubblicate**.

Per smettere di usare il flusso di pubblicazione, apri il menu a tre punti e fai clic su **Disattiva la pubblicazione**. Le modifiche tornano così ad andare subito online.

:::tip
Usa il flusso di bozza e pubblicazione quando vuoi preparare una pagina, ad esempio per un evento imminente, e renderla attiva solo nel momento giusto. Costruisci e visualizza in anteprima la pagina, poi fai clic su Pubblica quando sei pronto.
:::

## Articoli correlati

- [Gestire le pagine](managing-pages): crea pagine, imposta gli URL e gestisci la navigazione del sito
- [Aspetto](appearance): imposta colori, caratteri e branding validi per tutto il sito
- [File](files): carica immagini e documenti da usare nell'editor
- [Creare moduli](../forms/creating-forms): crea moduli che puoi incorporare nelle pagine
