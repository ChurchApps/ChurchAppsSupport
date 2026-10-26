---
title: "Aspetto"
---

# Aspetto

<div class="article-intro">

La pagina Aspetto ti permette di personalizzare l'aspetto generale del sito web della tua chiesa. Dai colori e i caratteri fino alla spaziatura e al CSS personalizzato, puoi controllare ogni aspetto visivo del sito da un unico punto.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Completa la [Configurazione iniziale](initial-setup) del tuo sito web
- Prepara il logo della chiesa in formato PNG con sfondo trasparente e rapporto d'aspetto 4:1
- Conosci i colori del marchio della chiesa (valori esadecimali), se hai già una guida di stile

</div>

## Accedere alle impostazioni dell'aspetto

1. In B1 Admin, apri il [menu di accesso rapido](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Sito web**.
2. Fai clic su **Aspetto**.
3. Si carica la pagina **Stili del sito**. La scheda **Tema, caratteri e piè di pagina** mostra l'elenco **Impostazioni stile** a sinistra e un'anteprima di un sito di esempio a destra. Sotto ci sono le schede **Annunci e widget** e **Reindirizzamenti e statistiche**.

## Tavolozza dei colori {#color-palette}

1. Fai clic su **Tavolozza dei colori** nel pannello Impostazioni stile.
2. Vedrai i **Colori di base** (tonalità chiare, di accento e scure) e i **Colori semantici** (Primario, Secondario, Successo, Avviso ed Errore).
3. Fai clic su un campione di colore per aprire il selettore colori. Trascina il cursore oppure inserisci un valore esadecimale per scegliere il colore.
4. L'**Anteprima delle combinazioni di colori** mostra come i colori selezionati funzionano insieme.
5. Usa le **Tavolozze suggerite** per applicare rapidamente uno schema di colori già pronto.
6. Fai clic su **Salva tavolozza** quando sei soddisfatto.

## Tipografia

1. Fai clic su **Caratteri** nel pannello Impostazioni stile.
2. Fai clic sul pulsante **Carattere dei titoli** o **Carattere del testo** per aprire il browser dei caratteri. Puoi cercare per nome oppure sfogliare categorie come Graziato, Senza grazie, Decorativo, Corsivo e Monospazio. Puoi anche scegliere una delle **Combinazioni di caratteri popolari**.
3. Fai clic su **Salva caratteri** per applicare i caratteri scelti.
4. Per regolare la gerarchia delle dimensioni dei titoli da 1 a 4, fai clic su **Scala tipografica** nel pannello Impostazioni stile. Usa i campi **Moltiplicatore di scala**, **Dimensione base** e **Interlinea** per mettere a punto i valori, poi fai clic su **Salva tipografia**.

## Spaziatura

1. Fai clic su **Scala di spaziatura** nel pannello Impostazioni stile.
2. Regola i valori di spaziatura da Extra piccolo a Extra grande. Esempi pratici mostrano come ogni valore influisce sul layout.
3. Fai clic su **Salva spaziatura** per applicare i valori a tutto il sito.

## Logo e marchio {#logo-and-branding}

1. Fai clic su **Logo** nel pannello Impostazioni stile.
2. Carica il **Logo per sfondo chiaro** e il **Logo per sfondo scuro**. Per risultati migliori usa immagini con sfondo trasparente e rapporto d'aspetto 4:1.
3. Carica un **Immagine per i social media** per le anteprime dei link e una **Favicon** per l'icona della scheda del browser.
4. Fai clic su **Salva modifiche**. Le immagini caricate non vengono memorizzate finché non salvi, quindi se provi a chiudere o ricaricare prima la scheda del browser, questo ti avvisa che hai modifiche non salvate.

:::tip
Per ottenere i migliori risultati, usa un logo in formato PNG con sfondo trasparente. Così appare bene sia su sfondi chiari sia su sfondi scuri, sul tuo sito web e nell'[app mobile](../settings/mobile-app.md).
:::

## Stili della navigazione

Personalizza i colori della barra di navigazione del sito, sia in modalità piena sia in modalità trasparente:

1. Fai clic su **Navigazione** nel pannello Impostazioni stile
2. Configura i colori per **Intestazione (piena)** e **Intestazione sopra l'immagine principale (trasparente)**
3. Fai clic su **Salva navigazione** per applicare i colori della navigazione

Per istruzioni dettagliate, vedi [Stili della navigazione](./navigation-styles.md).

## Annunci e widget

I widget del sito compaiono in ogni pagina del sito, sopra il contenuto della pagina:

- **Banner degli annunci** -- Una barra chiudibile in cima al sito per messaggi urgenti, come un evento imminente o una variazione del servizio.
- **Launcher** -- Un pulsante fluttuante che apre un menu di accesso rapido, ad esempio con link per le offerte, il check-in o la consultazione del bollettino.

1. Trova la scheda **Annunci e widget** sotto le Impostazioni stile.
2. Attiva i widget che desideri e configura il loro testo, i link e i colori.
3. Fai clic su **Salva**.

## Reindirizzamenti e statistiche

La scheda **Reindirizzamenti e statistiche** (sotto le Impostazioni stile) contiene due impostazioni diverse tra loro ma spesso necessarie:

- **Statistiche** -- Inserisci il tuo **ID di misurazione GA4** (formato `G-XXXXXXXXXX`) per monitorare il traffico dei visitatori sul tuo sito web. Lo stesso ID registra anche le visualizzazioni di pagina nell'app B1 della tua chiesa (il portale membri su `/mobile`, inclusa l'app installata), con un `display_mode` pari a `installed` o `browser`, così puoi distinguere in Google Analytics le visite dall'app installata da quelle dal browser.
- **Reindirizzamenti** -- Associa un vecchio percorso URL a uno nuovo, così i link a una pagina spostata o rinominata continuano a funzionare invece di mostrare un errore 404. Inserisci il percorso **Da** precedente e il percorso **A** nuovo, poi fai clic su **Salva**. Un reindirizzamento ha anche la precedenza sulle pagine integrate di B1 (`/sermons`, `/stream`, `/donate`, `/bible` e `/votd`), così puoi inviare quell'indirizzo altrove (ad esempio, alla tua pagina di predicazioni o a un canale YouTube). Non sovrascrive una pagina che hai creato tu allo stesso indirizzo: elimina prima quella pagina se vuoi che il reindirizzamento venga applicato.

## CSS e JavaScript personalizzati

1. Fai clic su **CSS e Javascript** nel pannello Impostazioni stile.
2. Aggiungi **CSS personalizzato** per sovrascrivere gli stili predefiniti per una personalizzazione avanzata.
3. Aggiungi **HTML personalizzato** per codici di tracciamento o altri script.
4. Usa la sezione **Esempi comuni di JavaScript** per frammenti come l'integrazione con Google Analytics.

:::warning
Il CSS personalizzato è potente, ma se usato in modo errato può rompere il layout del sito. La maggior parte delle chiese può ottenere l'aspetto desiderato con i controlli integrati di colori, caratteri e spaziatura. Usa il CSS personalizzato solo se hai familiarità con lo sviluppo web.
:::

:::info
Il tuo sito applica una Content Security Policy che blocca gli script inline provenienti da qualsiasi altra fonte. Il campo **HTML personalizzato** qui, e l'[elemento HTML](page-editor#using-the-html-element) nelle singole pagine, sono le eccezioni consentite: il codice salvato lì viene eseguito così com'è, quindi incolla solo script provenienti da fonti di cui ti fidi (tag di analisi, widget di chat e incorporamenti simili).
:::

## Temi di stile

Se vuoi un punto di partenza rapido, le **Tavolozze suggerite** nella sezione Tavolozza dei colori offrono temi predefiniti che impostano colori coordinati con un solo clic. Puoi sempre mettere a punto le singole impostazioni dopo aver applicato un tema.

## Passaggi successivi

- [Gestire le pagine](managing-pages): crea e organizza le pagine del tuo sito web
- [File](files): carica i contenuti multimediali per il tuo sito
