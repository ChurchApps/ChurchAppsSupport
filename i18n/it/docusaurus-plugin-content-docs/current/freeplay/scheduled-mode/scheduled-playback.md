---
title: "Riproduzione programmata sulla TV"
---

# Riproduzione programmata sulla TV

<div class="article-intro">

Una volta che una TV è associata a un calendario, FreePlay la gestisce per te. Scarica la settimana successiva, cambia i contenuti agli orari programmati e continua a riprodurre dalla propria memoria se la connessione internet cade. Un insegnante o un volontario può comunque mettere in pausa, saltare e spostarsi con il telecomando della TV.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- [Associa la TV a un calendario](./pairing-a-screen)
- [Inserisci qualcosa nel calendario](./scheduling-the-calendar), oppure imposta un loop predefinito per il gruppo dello schermo

</div>

## Cosa fa la TV da sola

- **Si apre direttamente sul programma**: quando una TV associata avvia FreePlay, va dritta al lettore programmato
- **Scarica in anticipo**: FreePlay scarica tutti i file programmati per i successivi 7 giorni, più il loop predefinito, e riproduce da quei download
- **Riproduce in base all'orologio**: a ogni orario di inizio programmato lo schermo passa a quel contenuto. Quando non c'è nulla in programma, riproduce il loop predefinito del gruppo
- **Controlla le modifiche**: FreePlay controlla regolarmente FreePlay Admin per le modifiche al calendario e scarica ciò che è nuovo
- **Ripara i file danneggiati**: se un file scaricato non si riproduce, FreePlay lo salta e lo scarica di nuovo

Prima che arrivino i primi file, lo schermo mostra **Caricamento del programma...** oppure **Download di X file su Y**. Se non c'è nulla in programma e il gruppo non ha un loop predefinito, mostra **Non c'è nulla in programma in questo momento**.

## Il pannello informativo

Premi **Seleziona** sul telecomando per aprire il pannello informativo. Si chiude da solo dopo qualche secondo. Il pannello mostra:

- **In alto a destra**: **Pronto fino al** seguito da una data, quando tutto fino a quella data è scaricato, oppure **Download in corso** mentre arrivano ancora file. Sotto, quanti file sono stati scaricati e una barra di avanzamento
- **In basso a sinistra**: il nome di ciò che sta riproducendo (o **Loop predefinito**), quale elemento è sullo schermo e cosa c'è dopo e quando
- **Ultimo controllo**: quando FreePlay ha controllato l'ultima volta le modifiche al programma

Il pannello ha anche tre pulsanti:

- **Fissa questa playlist**: mantiene il contenuto attuale in loop e ignora il calendario. Seleziona **Rimuovi fissaggio** per tornare al programma
- **Sfoglia i contenuti**: esce dal lettore programmato per sfogliare i provider collegati
- **Impostazioni**: apre le impostazioni di FreePlay, dove puoi [scollegare o associare un calendario diverso](./pairing-a-screen#changing-or-unpairing-from-the-tv)

:::tip
Per tornare al programma dopo aver sfogliato, chiudi e riapri FreePlay. Una TV associata si apre sempre sul lettore programmato.
:::

## Comandi del telecomando

| Pulsante del telecomando | Azione |
|---|---|
| **Seleziona** | Apre il pannello informativo |
| **Riproduci/Pausa** | Mette in pausa o riprende. Mentre è in pausa compare un'icona di riproduzione |
| **Freccia destra** | Diapositiva o video successivo |
| **Freccia sinistra** | Diapositiva o video precedente |
| **Freccia su** | Apre la panoramica delle diapositive per saltare a una qualsiasi diapositiva |
| **Avanti veloce** | Salta avanti di 10 secondi in un video |
| **Riavvolgi** | Torna indietro di 10 secondi in un video |
| **Indietro** | Chiude la panoramica delle diapositive o il pannello informativo, oppure apre il pannello informativo |

Successivo e precedente restano all'interno del contenuto in riproduzione. Tornano all'inizio dall'ultimo elemento al primo solo quando il programma è impostato in loop. Avanti veloce e Riavvolgi funzionano solo durante un video: su una diapositiva non fanno nulla.

### Saltare a una diapositiva

Premi **Su** per aprire la panoramica delle diapositive. Mostra ogni elemento della playlist o della lezione corrente. Spostati su quello che vuoi e premi **Seleziona** per saltarci direttamente.

## Lezioni a ritmo dell'insegnante

Quando un programma è impostato su **Ritmo dell'insegnante**, le diapositive con immagini non avanzano da sole. È l'insegnante a passare alla diapositiva successiva con la **freccia destra**. Un video viene riprodotto fino alla fine e poi passa all'elemento successivo.

Una lezione a ritmo dell'insegnante resta sullo schermo oltre il suo orario di fine programmato, finché l'insegnante non raggiunge l'ultima diapositiva e questa finisce. Poi lo schermo passa a ciò che è programmato dopo. Così una classe che va per le lunghe non viene interrotta a metà della lezione.

## Presentare da un browser {#presenting-from-a-browser}

Puoi anche riprodurre il calendario di uno schermo in un browser web. In FreePlay Admin, apri lo schermo dalla pagina **Schermi** e fai clic su **Presenta nel browser**. Il browser segue il calendario dello schermo allo stesso modo della TV, e la barra dei comandi mostra cosa c'è dopo. Usa **Spazio** per mettere in pausa, **←** / **→** per saltare, **F** per il schermo intero ed **Esc** per uscire.

## Articoli correlati

- **[Programmare il calendario](./scheduling-the-calendar)**: decidi cosa riprodurre e cosa succede quando finisce in anticipo
- **[Gestire schermi e gruppi](./managing-screens)**: controlla i download di ogni schermo da FreePlay Admin
- **[Riproduzione dei contenuti](../content-providers/playing-content)**: comandi del lettore quando riproduci tu stesso i contenuti
