---
title: "Aspetto"
---

# Aspetto

<div class="article-intro">

La pagina Aspetto ti permette di personalizzare l'aspetto generale del tuo sito web della chiesa. Dai colori ai caratteri, dalla spaziatura al CSS personalizzato, puoi controllare ogni aspetto visivo del tuo sito da un unico luogo.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Completa la [Configurazione Iniziale](initial-setup) per il tuo sito web
- Tieni pronto il logo della tua chiesa in formato PNG con sfondo trasparente e un rapporto d'aspetto 4:1
- Conosci i colori del marchio della tua chiesa (valori esadecimali) se hai una guida di stile esistente

</div>

## Accesso alle Impostazioni Aspetto

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) e espandi **Website**.
2. Fai clic su **Appearance**.
3. La pagina Stili del Sito si carica con un'anteprima dal vivo del tuo sito web a sinistra e le opzioni **Impostazioni Stile** a destra.

## Tavolozza Colori

1. Fai clic su **Tavolozza Colori** nel pannello Impostazioni Stile.
2. Vedrai i **Colori Base** (sfumature chiare, di accento e scure) e i **Colori Semantici** (Primario, Secondario, Successo, Avviso e Errore).
3. Fai clic su qualsiasi campione di colore per aprire il selezionatore di colore. Trascina il selettore o inserisci un valore esadecimale per scegliere il tuo colore.
4. L'**Anteprima Combinazioni Colori** mostra come i tuoi colori selezionati funzionano insieme.
5. Usa le **Tavolozze Suggerite** per applicare rapidamente uno schema di colore pre-progettato.
6. Fai clic su **Salva** quando sei soddisfatto.

## Tipografia

1. Fai clic su **Impostazioni Tipografia** nel pannello Impostazioni Stile.
2. Fai clic su **Seleziona un Carattere** per aprire il browser dei caratteri. Puoi cercare per nome o sfogliare categorie come Serif, Sans Serif, Display, Handwriting e Monospace.
3. Imposta i caratteri sia per i titoli che per il testo del corpo.
4. Fai clic su **Scala Tipografica** per regolare la gerarchia della dimensione per Titolo 1 fino a Titolo 4. Utilizza i campi moltiplicatore di scala e dimensione base per un fine-tuning.
5. Fai clic su **Salva** per applicare le tue scelte di carattere.

## Spaziatura

1. Fai clic su **Scala Spaziatura** nel pannello Impostazioni Stile.
2. Regola i valori di spaziatura da Extra Piccolo a Extra Grande. Gli esempi pratici mostrano come ogni valore influisce sul layout.
3. Fai clic su **Salva Spaziatura** per applicare i valori su tutto il tuo sito.

## Logo e Branding

1. Fai clic su **Logo** nel pannello Impostazioni Stile.
2. Carica il tuo **Logo Sfondo Chiaro** e **Logo Sfondo Scuro**. Utilizza immagini con sfondo trasparente e un rapporto d'aspetto 4:1 per i migliori risultati.
3. Carica un'**Immagine Social Media** per le anteprime dei link e una **Favicon** per l'icona della scheda del browser.

:::tip
Per i migliori risultati, usa un logo con sfondo trasparente in formato PNG. Questo assicura che appaia alla grande sia su sfondi chiari che scuri su tutto il tuo sito web e [app mobile](../settings/mobile-app.md).
:::

## Stili Navigazione

Personalizza i colori della barra di navigazione del tuo sito web sia per la modalità solida che trasparente:

1. Scorri fino alla sezione **Stili Navigazione**
2. Fai clic su **Modifica Stili Navigazione**
3. Configura i colori per la navigazione solida (con sfondo) e la navigazione trasparente (modalità overlay)
4. Fai clic su **Salva** per applicare i colori della navigazione

Per istruzioni dettagliate, vedi [Stili Navigazione](./navigation-styles.md).

## Annuncio e Widget

I widget del sito compaiono su ogni pagina del tuo sito, fluttuando sopra il contenuto della pagina:

- **Banner Annuncio** -- Una barra dismissibile in cima al tuo sito per messaggi sensibili al tempo, come un evento imminente o un cambio di servizio.
- **Launcher** -- Un pulsante fluttuante che apre un menu di accesso rapido, ad esempio link per donare, fare check-in o visualizzare il bollettino.

1. Fai clic su **Annuncio e Widget** nel pannello Impostazioni Stile.
2. Attiva i widget che desideri e configura il loro testo, link e colori.
3. Fai clic su **Salva**.

## Reindirizzamenti e Analitiche

Il pannello **Reindirizzamenti e Analitiche** nelle Impostazioni Stile contiene due impostazioni non correlate ma comunemente necessarie:

- **Analitiche** -- Aggiungi il tuo **ID Misura Google Analytics 4** per tracciare il traffico dei visitatori sul tuo sito web.
- **Reindirizzamenti** -- Mappa un vecchio percorso URL a uno nuovo, in modo che i link a una pagina che hai spostato o rinominato continuino a funzionare invece di 404ing. Inserisci il vecchio percorso **Da** e il nuovo percorso **A**, quindi fai clic su **Salva**. Un reindirizzamento ha anche la priorità sulle pagine integrate di B1 (`/sermons`, `/stream`, `/donate`, `/bible` e `/votd`), quindi puoi inviare quell'indirizzo altrove (ad esempio, alla tua pagina dei sermoni o a un canale YouTube). Non sostituisce una pagina che hai creato tu allo stesso indirizzo. Elimina prima quella pagina se vuoi che il reindirizzamento venga applicato.

## CSS e JavaScript Personalizzati

1. Fai clic su **CSS e Javascript** nel pannello Impostazioni Stile.
2. Aggiungi **CSS Personalizzato** per sovrascrivere gli stili predefiniti per una personalizzazione avanzata.
3. Aggiungi **HTML Personalizzato** per codici di tracciamento o altri script.
4. Utilizza la sezione **Esempi Javascript Comuni** per frammenti come l'integrazione di Google Analytics.

:::warning
Il CSS personalizzato è potente ma può rompere il layout del tuo sito se usato in modo scorretto. La maggior parte delle chiese può ottenere l'aspetto che desidera utilizzando i controlli di colore, carattere e spaziatura incorporati. Usa il CSS personalizzato solo se sei a tuo agio con lo sviluppo web.
:::

:::info
Il tuo sito applica una Politica di Sicurezza dei Contenuti che blocca gli script inline da qualsiasi altra fonte. Il campo **JavaScript Personalizzato** è l'unica eccezione affidabile -- il codice che salvi lì viene eseguito così com'è, quindi incolla solo script da fonti di cui ti fidi (tag di analitiche, widget di chat e incorporate simili).
:::

## Temi di Stile

Se desideri un punto di partenza rapido, le **Tavolozze Suggerite** nella sezione Tavolozza Colori offrono temi pre-costruiti che impostano colori coordinati in un clic. Puoi sempre fine-tuning le impostazioni individuali dopo l'applicazione di un tema.

## Prossimi Passaggi

- [Gestione Pagine](managing-pages) -- Costruisci e organizza le pagine del tuo sito web
- [File](files) -- Carica risorse multimediali per il tuo sito
