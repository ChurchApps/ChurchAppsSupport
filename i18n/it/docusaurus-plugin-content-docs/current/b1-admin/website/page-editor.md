---
title: "Uso dell'editor di pagine"
description: "Configura una pagina del sito in B1 Admin aggiungendo sezioni ed elementi, applicando stili, visualizzando l'anteprima su dispositivi mobili e pubblicando le bozze. Sono trattati anche annulla e cronologia delle versioni."
---

# Uso dell'editor di pagine

<div class="article-intro">

L'editor di pagine di B1 è un costruttore visivo con trascinamento che ti permette di progettare le pagine del sito della tua chiesa senza scrivere codice. Puoi aggiungere sezioni e blocchi di contenuto, personalizzare gli stili, visualizzare l'anteprima del lavoro e annullare le modifiche, il tutto dal browser.

</div>

## Video di formazione

<YouTube id="m2B_JxmfFm4" title="Modifica di pagine e navigazione in B1" next="Collegamento di un dominio personalizzato in B1" nextUrl="/docs/b1-admin/settings/custom-domain" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Completa la [Configurazione iniziale](./initial-setup.md) per configurare il tuo sito web
- Crea almeno una pagina in [Gestione delle pagine](./managing-pages.md)
- Per accedere all'editor ti serve l'autorizzazione **content.edit**

</div>

## Apertura dell'editor

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Sito web** e fai clic su **Pagine**.
2. Trova la pagina che vuoi modificare nella tabella delle pagine e fai clic su **Modifica contenuto**.

L'editor si apre a schermo intero. Il pannello di sinistra mostra la struttura della pagina e gli elementi di contenuto disponibili; l'area centrale mostra un'anteprima in tempo reale della pagina.

:::info
L'editor viene sempre visualizzato in modalità chiara, indipendentemente dall'impostazione del tema di B1 Admin, e usa i caratteri dei titoli e del testo che hai scelto in [Aspetto](./appearance.md). In questo modo l'anteprima corrisponde fedelmente all'aspetto che la pagina avrà per i visitatori del sito.
:::

## Struttura della pagina: sezioni ed elementi

Ogni pagina è composta da due livelli:

- **Sezioni** -- I contenitori di primo livello che dividono la pagina in fasce orizzontali (ad esempio una sezione di presentazione, un blocco di contenuto o una striscia di piè di pagina). Ogni pagina deve avere almeno una sezione prima che tu possa aggiungere contenuti.
- **Elementi** -- I singoli pezzi di contenuto inseriti all'interno di una sezione, come testo, immagini, pulsanti, schede, moduli e calendari.

### Aggiunta di una sezione

1. Fai clic su **Aggiungi sezione** (oppure sul pulsante **+** in alto nel pannello di sinistra).
2. Scegli come iniziare:
   - **Da un modello** -- sfoglia la galleria dei modelli di sezione, organizzata per categoria (Presentazione, Chi siamo, Servizi, Offerte, ecc.), e fai clic su uno di essi per inserire una sezione già stilizzata e precompilata. Puoi personalizzare tutto dopo averla aggiunta.
   - **Sezione vuota** -- scegli una disposizione in colonne (singola, due colonne, tre colonne, ecc.) e costruisci la sezione da zero.
3. La nuova sezione compare nell'anteprima. Fai clic su di essa per selezionarla e configurarne il colore di sfondo, l'imbottitura e le altre opzioni di stile.

### Cambio della disposizione di una sezione

Hai già creato una sezione ma vuoi una struttura diversa? Usa il selettore di disposizione di quella sezione per sostituire la sua disposizione in colonne con un'altra della galleria, mantenendo al loro posto i contenuti e gli elementi esistenti.

### Aggiunta di elementi a una sezione

1. Fai clic all'interno di una sezione nell'anteprima per selezionarla.
2. Fai clic su **Aggiungi contenuto** e scegli un tipo di elemento dall'elenco:
   - **Testo** -- Titoli, paragrafi e testo formattato
   - **Immagine** -- Carica una foto o collegane una
   - **Pulsante** -- Un collegamento cliccabile per un'azione
   - **Scheda** -- Un'immagine con un titolo e una descrizione
   - **Modulo** -- Inserisci un [modulo](../forms/creating-forms.md) direttamente nella pagina. Se il modulo ha una [foto di intestazione](../forms/creating-forms.md#adding-a-header-photo), questa appare sopra le domande
   - **Calendario** -- Mostra un calendario di eventi
   - **Domande frequenti** -- Blocchi di domande e risposte in stile fisarmonica
   - **Video** -- Inserisci un video tramite URL
   - **Esplora gruppi** -- Un elenco consultabile di tutti i gruppi della chiesa, con ricerca, filtro per categoria e filtro per etichetta facoltativi. Il suo **Layout** può essere **Griglia** (predefinito) oppure **Scorrimento (automatico)** -- vedi [Layout a scorrimento](#scrolling-layouts)
   - **Elenco gruppi** -- Riquadri per i tuoi gruppi pubblici, eventualmente solo quelli con una data etichetta. Il suo **Layout** può essere **Griglia** (predefinito; fino a tre riquadri per riga) oppure **Scorrimento (automatico)** -- vedi [Layout a scorrimento](#scrolling-layouts)
   - **Icona con descrizione** -- Un'icona con un titolo e una breve descrizione, per evidenziare caratteristiche o ministeri
   - **Galleria** -- Una griglia o una disposizione a muratura di più foto
   - **Testimonianza** -- Una o più citazioni con nome dell'autore, ruolo e foto
   - **Icone social** -- Icone collegate ai profili social della chiesa: Facebook, Instagram, WhatsApp, YouTube, X, TikTok, Vimeo e Podcast. Inserisci un collegamento per ciascuna che vuoi mostrare; per **WhatsApp**, usa un collegamento `https://wa.me/` con il tuo numero oppure il link di invito a un gruppo
   - **Conto alla rovescia** -- Un timer che conta alla rovescia fino a una data o a un orario settimanale di culto
   - **Statistiche** -- Una riga di numeri grandi con etichette (membri, anni, sedi)
   - **Avanzamento campagna** -- Una barra di avanzamento in tempo reale per una campagna di offerte, che mostra il totale raccolto rispetto all'obiettivo del fondo
   - **Griglia del personale** -- Schede con foto dei membri di un gruppo; il gruppo deve avere attivata l'opzione di **elenco pubblico**
   - **Orari dei culti** -- Il programma dei culti delle tue sedi, recuperato automaticamente dalla configurazione delle presenze
   - **Predicazioni** -- La tua libreria di predicazioni, come browser completo oppure in layout a griglia, elenco o con l'ultima in evidenza
   - **Mappa** -- Una mappa incorporata centrata sull'indirizzo della chiesa
   - **Tabella** -- Una semplice griglia di righe e colonne per contenuti tabellari
   - **Testo con foto** -- Testo e un'immagine affiancati
   - **Logo** -- Il logo della chiesa, preso da [Aspetto](./appearance.md)
   - **Diretta streaming** -- Il lettore della tua diretta, incorporato direttamente nella pagina
   - **Podcast** -- Un elenco di episodi preso da un URL di feed RSS di un podcast esterno che fornisci, con impostazioni per il numero di episodi da mostrare e per decidere se visualizzare date e descrizioni. Ogni episodio sul sito in linea ha un lettore audio e un collegamento **Scarica** che salva il file audio dell'episodio con il titolo dell'episodio. Questo serve a presentare qualsiasi feed di podcast sul tuo sito; per pubblicare le tue predicazioni come podcast, vedi invece [Gestione delle predicazioni](../sermons/managing-sermons.md#your-podcast-feed)
   - **Donazione** -- Un pulsante per le offerte oppure un modulo di donazione incorporato
   - **HTML** -- Il tuo HTML grezzo, per usi avanzati come l'inserimento di un widget di terze parti (vedi [Uso dell'elemento HTML](#using-the-html-element))
   - **iFrame** -- Incorpora contenuti esterni tramite URL
3. Configura l'elemento usando il pannello delle impostazioni che compare.

### Uso dell'elemento HTML

L'elemento **HTML** ha due caselle:

- **Contenuto HTML** -- Il markup da mostrare nella pagina. Eventuali tag `<script>` che inserisci qui vengono eseguiti sul tuo sito in linea.
- **JavaScript (escludi il tag script)** -- Codice script che viene eseguito al caricamento della pagina. Puoi anche incollare qui lo snippet di incorporamento di un fornitore, comprensivo dei suoi tag `<script>`, e verrà eseguito sul sito in linea.

Se incolli nella casella JavaScript soltanto un indirizzo web (come il link di un'immagine), la casella diventa rossa con l'avviso *"Questo è un indirizzo web, non JavaScript."* Un indirizzo lasciato da solo in quella casella non fa nulla. Per mostrare un'immagine, usa un elemento **Immagine** oppure inserisci `<img src="...">` in **Contenuto HTML**.

### Uso dell'elemento Calendario {#using-the-calendar-element}

L'elemento **Calendario** mostra gli eventi di uno dei tuoi calendari:

1. In **Seleziona**, scegli **Calendario del gruppo** (gli eventi di un singolo gruppo -- l'elenco mostra i gruppi di cui fai parte) oppure **Calendario curato** (un calendario che hai creato in **Calendari**; vedi [Calendario curato](../calendars/curated-calendar.md)).
2. In **Seleziona calendario**, scegli il gruppo o il calendario.
3. In **Visualizzazione**, scegli come mostrarlo:
   - **Calendario mensile** -- Una griglia mensile che i visitatori possono sfogliare. Ogni evento è colorato in base al gruppo a cui appartiene, quindi gli eventi di un gruppo hanno lo stesso colore in ogni calendario. B1 sceglie i colori automaticamente; non c'è nulla da configurare.
   - **Prossimi eventi** -- Una griglia di riquadri per i prossimi 12 eventi, con un evento ricorrente mostrato una sola volta alla sua data successiva. Ogni riquadro mostra la foto dell'evento (oppure il suo titolo sul colore scuro del tema, se non ha una foto), un'etichetta con la data, il giorno e l'ora, e la prima riga della descrizione. Un pulsante **Iscriviti** sopra i riquadri permette ai visitatori di copiare il link ICS del calendario o di scaricarlo. Per questa visualizzazione compare l'impostazione **Layout**: **Griglia** (predefinito) oppure **Scorrimento (automatico)**, che dispone i riquadri su una singola riga che scorre da sola (vedi [Layout a scorrimento](#scrolling-layouts)). Per un **Calendario curato**, attiva l'impostazione **Etichetta del gruppo** per mostrare il nome del gruppo di ogni evento nell'angolo in alto a destra del riquadro, con il colore del calendario di quel gruppo. Gli eventi di gruppi archiviati o riservati non hanno l'etichetta.
4. Per mostrare solo alcuni eventi, scrivi un tag in **Solo eventi con tag** -- ad esempio `giovani`. Compaiono solo gli eventi i cui **Tag** includono quella parola. Lascia il campo vuoto per mostrare tutti gli eventi. I tag si impostano su ciascun evento; vedi [Aggiunta e modifica di eventi](../calendars/creating-calendars.md#adding-and-editing-events).

In entrambe le visualizzazioni, cliccando su un evento si apre la sua pagina dedicata sul tuo sito. La pagina dell'evento mostra la foto, il titolo, la data e l'ora e la descrizione dell'evento, oltre a un riquadro con **Quando** (incluso lo schema di ripetizione per un evento ricorrente) e **Dove** (le sale prenotate per l'evento). Include anche il pulsante **Iscriviti a questo evento**, quando le iscrizioni sono attive, e un collegamento **Aggiungi al mio calendario** che scarica l'evento come file di calendario. La pagina è predisposta affinché i motori di ricerca possano mostrare data e dettagli dell'evento nei risultati. Le pagine degli eventi dei calendari curati visualizzati sulle tue pagine (per gli eventi dei prossimi sei mesi) vengono inoltre elencate nella mappa del sito, così che i motori di ricerca possano trovarle.

### Layout a scorrimento {#scrolling-layouts}

Il layout **Scorrimento (automatico)** di **Esplora gruppi**, **Elenco gruppi** e della visualizzazione **Prossimi eventi** dell'elemento Calendario dispone i riquadri su una sola riga invece che in una griglia. Su un telefono ogni riquadro occupa tutta la riga; su un computer ne entrano due affiancati. Quando i riquadri sono più di quanti ne entrano, la riga:

- Avanza di un riquadro circa ogni quattro secondi, tornando al primo dopo l'ultimo.
- Si ferma quando un visitatore passa sopra, tocca o entra con la tabulazione nel riquadro, e riprende poco dopo.
- Mostra una fila di puntini sotto, uno per riquadro, con il puntino del riquadro corrente pieno. I visitatori possono cliccare su un puntino per passare direttamente a quel riquadro.

Sui dispositivi con la riduzione del movimento attiva, la riga resta ferma e i visitatori la fanno scorrere con lo swipe o con la rotella. Se tutti i riquadri entrano nello spazio disponibile, la riga non si muove e non compaiono puntini.

### Riordino dei contenuti

Trascina le sezioni o gli elementi usando l'icona a maniglia (sei puntini) sul lato sinistro di ciascun elemento per riordinarli. Puoi trascinare gli elementi all'interno di una sezione oppure spostarli da una sezione all'altra.

## Stile della pagina

### Stili delle sezioni

Fai clic su una sezione qualsiasi per aprire il suo pannello degli stili. Puoi impostare:

- **Sfondo** -- Colore pieno, sfumatura oppure immagine. Quando usi un'immagine come sfondo, un selettore **Punto focale** ti permette di fare clic per scegliere quale parte dell'immagine resta al centro mentre la sezione si ridimensiona; l'opzione di colore **Sovrapposizione** ti permette di aggiungere una tinta semitrasparente sopra l'immagine per migliorare la leggibilità del testo.
- **Imbottitura** -- Spaziatura superiore e inferiore all'interno della sezione
- **Larghezza** -- Larghezza piena oppure centrata/contenuta
- **Separatori** -- Separatori decorativi a forma (onda, obliquo, curva, triangolo e altri) sul bordo superiore o inferiore della sezione, con opzioni di colore, altezza e rotazione

### Stili degli elementi

Fai clic su un elemento qualsiasi per aprire il suo pannello degli stili. Tra le opzioni comuni ci sono dimensione del carattere, colore, allineamento, margine e imbottitura. Per le immagini puoi impostare il testo alternativo e la destinazione dei collegamenti.

### CSS personalizzato

Per uno stile più avanzato, ogni sezione e ogni elemento ha un campo **CSS personalizzato** in cui puoi scrivere le tue regole CSS. Queste regole si applicano solo a quell'elemento, quindi non influiscono involontariamente sul resto della pagina.

:::tip
Se ti serve applicare stili a tutto il sito -- ad esempio un carattere personalizzato o un colore globale -- usa le impostazioni di [Aspetto](./appearance.md) invece del CSS personalizzato nelle singole pagine.
:::

## Anteprima della pagina

Usa i comandi di anteprima nella barra degli strumenti per controllare come appare la pagina a diverse dimensioni dello schermo:

- **Desktop** -- Visualizzazione a tutta larghezza del browser
- **Mobile** -- Visualizzazione stretta, delle dimensioni di un telefono

Su un telefono, le colonne di una riga si impilano una sopra l'altra a larghezza piena, a meno che tu non imposti una **Larghezza mobile** per esse nelle impostazioni della riga. Anche gli elenchi di predicazioni e di podcast dispongono il testo di ogni episodio sotto la miniatura, su un telefono.

Per vedere la pagina in linea esattamente come la vedranno i visitatori, torna all'elenco delle pagine e fai clic sul percorso della pagina. Si apre in una nuova scheda del browser.

## Verifica dell'accessibilità

Fai clic sull'icona **Accessibilità** nella barra degli strumenti per eseguire una verifica rapida dei problemi più comuni -- immagini senza testo alternativo, contrasto dei colori insufficiente o titoli non in ordine. Ogni problema rimanda direttamente all'elemento da sistemare, così puoi correggerlo sul posto.

## Annullamento delle modifiche

L'editor tiene automaticamente traccia della cronologia delle modifiche. Usa i pulsanti della barra degli strumenti o le scorciatoie da tastiera per muoverti:

- **Annulla** (Ctrl+Z / Cmd+Z) -- Ripristina l'ultima azione
- **Ripeti** (Ctrl+Maiusc+Z oppure Ctrl+Y / Cmd+Maiusc+Z) -- Riapplica un'azione annullata

Puoi anche ripristinare la pagina a una versione precedente salvata. Fai clic su **Visualizza cronologia** nella barra degli strumenti per vedere l'elenco delle istantanee salvate con le relative descrizioni, quindi fai clic su una voce qualsiasi per tornare a quel punto.

:::warning
Ripristinare un'istantanea sostituisce il contenuto attuale della pagina con la versione salvata. Questa operazione non può essere annullata con il pulsante Annulla standard. Se vuoi poter tornare alla versione attuale, salva un'istantanea dello stato corrente prima di ripristinare una versione precedente.
:::

## Salvataggio e pubblicazione

Le modifiche vengono salvate automaticamente mentre lavori. Un indicatore di stato nella barra degli strumenti mostra se le modifiche sono state salvate.

### Stato di bozza e di pubblicazione

Le pagine possono avere uno stato **pubblicato**, che controlla quando i visitatori vedono le tue modifiche. La barra degli strumenti mostra un'etichetta di stato con lo stato attuale:

- **Online al salvataggio** -- La pagina non usa un flusso di pubblicazione. Ogni modifica salvata va subito online. È l'impostazione predefinita per le nuove pagine.
- **Modifiche non pubblicate** -- La pagina è già stata pubblicata in passato, ma hai apportato modifiche dall'ultima pubblicazione. I visitatori vedono ancora la versione pubblicata in precedenza.
- **Pubblicata** -- La pagina è online e il contenuto salvato corrisponde a ciò che vedono i visitatori.

Per pubblicare le modifiche, fai clic sul pulsante **Pubblica** nella barra degli strumenti. La pagina va subito online.

Per tornare all'ultima versione pubblicata senza influire su ciò che vedono i visitatori, apri il menu di overflow (⋮) e fai clic su **Scarta le modifiche non pubblicate**.

Per smettere di usare il flusso di pubblicazione, apri il menu di overflow e fai clic su **Disattiva la pubblicazione**. Le modifiche tornano così ad andare subito online.

:::tip
Usa il flusso di bozza e pubblicazione quando vuoi preparare una pagina -- ad esempio per un evento imminente -- e renderla visibile solo al momento giusto. Crea e controlla l'anteprima della pagina, quindi fai clic su Pubblica quando sei pronto.
:::

## Articoli correlati

- [Gestione delle pagine](./managing-pages.md) -- Crea pagine, imposta gli URL e gestisci la navigazione del sito
- [Aspetto](./appearance.md) -- Imposta colori, caratteri e identità visiva di tutto il sito
- [File](./files.md) -- Carica immagini e documenti da usare nell'editor
- [Creazione di moduli](../forms/creating-forms.md) -- Crea moduli da incorporare nelle pagine
