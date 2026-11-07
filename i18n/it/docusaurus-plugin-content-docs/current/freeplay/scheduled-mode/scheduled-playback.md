---
title: "Riproduzione programmata sulla TV"
description: "Una TV associata scarica la settimana successiva e riproduce a orario, anche offline. Pannello info, tasti del telecomando e fissaggio di una playlist."
---

# Riproduzione programmata sulla TV

<div class="article-intro">

Una volta che una TV è abbinata a un calendario, FreePlay la gestisce per te. Scarica la settimana successiva, cambia i contenuti agli orari programmati e continua a riprodurre dalla propria memoria se la connessione internet cade. Un insegnante o un volontario può comunque mettere in pausa, saltare e spostarsi con il telecomando della TV.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- [Abbina la TV a un calendario](./pairing-a-screen.md)
- [Metti qualcosa nel calendario](./scheduling-the-calendar.md), oppure imposta un ciclo predefinito per il gruppo dello schermo

</div>

## Cosa fa la TV da sola

- **Si apre direttamente sul programma** - Quando una TV abbinata avvia FreePlay, va direttamente al lettore programmato
- **Scarica in anticipo** - FreePlay scarica ogni file programmato per i prossimi 7 giorni, più il ciclo predefinito, e riproduce da quei download
- **Riproduce in base all'orologio** - All'orario di inizio di ogni programma, lo schermo passa a quel contenuto. Quando non c'è nulla in programma, riproduce il ciclo predefinito del gruppo
- **Controlla le modifiche** - FreePlay controlla regolarmente FreePlay Admin per verificare le modifiche al calendario e scarica ciò che è nuovo
- **Ripara i file difettosi** - Se un file scaricato non si riproduce, FreePlay lo salta e lo scarica di nuovo

Prima che arrivino i primi file, lo schermo mostra **Caricamento del programma...** oppure **Download di X file su Y**. Se non c'è nulla in programma e il gruppo non ha un ciclo predefinito, mostra **Nulla è in programma in questo momento**.

## Il pannello informativo

Premi **Seleziona** sul telecomando per aprire il pannello informativo. Si chiude da solo dopo qualche secondo. Il pannello mostra:

- **In alto a destra** - **Pronto fino a** seguito da una data quando tutto fino a quella data è scaricato, oppure **Download in corso** mentre i file stanno ancora arrivando. Sotto, quanti file sono stati scaricati e una barra di avanzamento
- **In basso a sinistra** - Il nome di ciò che sta riproducendo (oppure **Ciclo predefinito**), quale elemento è sullo schermo, e cosa viene dopo e quando
- **Ultimo controllo** - Quando FreePlay ha controllato l'ultima volta le modifiche al programma

Il pannello ha anche tre pulsanti:

- **Fissa questa playlist** - Mantiene in loop il contenuto attuale ignorando il calendario. Seleziona **Rimuovi fissaggio playlist** per tornare al programma
- **Sfoglia contenuti** - Esce dal lettore programmato per sfogliare i tuoi fornitori collegati
- **Impostazioni** - Apre le impostazioni di FreePlay, dove puoi [rimuovere l'abbinamento o abbinare a un altro calendario](./pairing-a-screen.md#changing-or-unpairing-from-the-tv)

:::tip
Per tornare al programma dopo aver sfogliato, premi **Indietro** sul telecomando dalla schermata **Fornitori di contenuti**, oppure apri **Impostazioni**, seleziona **Abbina a un calendario** e scegli **Torna al programma**. Una TV abbinata torna anche al lettore programmato ogni volta che FreePlay torna in primo piano, e si apre sempre sul lettore programmato.
:::

## Telecomando

| Pulsante del telecomando | Azione |
|---|---|
| **Seleziona** | Apre il pannello informativo |
| **Riproduci/Pausa** | Mette in pausa o riprende. Mentre è in pausa compare un'icona di riproduzione |
| **Freccia destra** | Diapositiva o video successivo |
| **Freccia sinistra** | Diapositiva o video precedente |
| **Freccia su** | Apre la panoramica delle diapositive per saltare a una qualsiasi |
| **Avanti veloce** | Salta avanti di 10 secondi in un video |
| **Riavvolgi** | Torna indietro di 10 secondi in un video |
| **Indietro** | Chiude la panoramica delle diapositive o il pannello informativo, oppure apre il pannello informativo |

Avanti e indietro restano all'interno del contenuto in riproduzione in quel momento. Passano dall'ultimo elemento al primo solo quando il programma è impostato per il loop. Avanti veloce e Riavvolgi funzionano solo durante un video; non fanno nulla su una diapositiva.

### Saltare a una diapositiva

Premi **Su** per aprire la panoramica delle diapositive. Mostra ogni elemento della playlist o della lezione attuale. Spostati su quello che ti interessa e premi **Seleziona** per saltarci direttamente.

## Lezioni a ritmo dell'insegnante

Quando un programma è impostato su **Ritmo dell'insegnante**, le diapositive immagine non avanzano da sole. È l'insegnante a passare alla successiva con la **Freccia destra**. Un video viene riprodotto fino alla fine e poi passa all'elemento successivo.

Una lezione a ritmo dell'insegnante resta sullo schermo oltre l'orario di fine programmato, finché l'insegnante non arriva all'ultima diapositiva e termina. Poi lo schermo passa a ciò che è programmato dopo. Così una classe che va per le lunghe non viene interrotta a metà della lezione.

## Presentare da un browser {#presenting-from-a-browser}

Puoi anche riprodurre il calendario di uno schermo in un browser web. In FreePlay Admin, apri lo schermo dalla pagina **Schermi** e clicca su **Presenta nel browser**. Il browser segue il calendario di quello schermo nello stesso modo in cui lo fa la TV, e la barra dei comandi mostra cosa viene dopo. Usa **Spazio** per mettere in pausa, **←** / **→** per saltare, **F** per schermo intero ed **Esc** per uscire.

## Articoli correlati

- **[Programmare il calendario](./scheduling-the-calendar.md)** - Decidi cosa viene riprodotto e cosa succede quando finisce in anticipo
- **[Gestire schermi e gruppi](./managing-screens.md)** - Controlla i download di ogni schermo da FreePlay Admin
- **[Riprodurre i contenuti](../content-providers/playing-content.md)** - Controlli del lettore quando riproduci i contenuti tu stesso
