---
title: "Report sulle donazioni"
---

# Report sulle donazioni

<div class="article-intro">

B1 Admin ti offre diversi modi per visualizzare e analizzare i dati delle donazioni della tua chiesa. La dashboard delle donazioni nella pagina **Riepilogo** della sezione Donazioni offre una panoramica visiva con grafici e filtri, mentre la sezione Report offre un report più dettagliato, il Riepilogo donazioni. Usa questi strumenti per monitorare le tendenze delle donazioni, preparare le riunioni del consiglio o riconciliare i tuoi registri.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le donazioni siano state [registrate nei lotti](recording-donations.md) oppure [importate da Stripe](stripe-import.md)
- Verifica che i tuoi [fondi](funds.md) siano configurati correttamente così le donazioni sono classificate nel modo giusto

</div>

## Dashboard delle donazioni

La dashboard delle donazioni è la vista **Dashboard** della pagina **Riepilogo**, la prima pagina che vedi quando apri la sezione **Donazioni**.

1. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **Donazioni** e fai clic su **Riepilogo**. La pagina **Riepilogo** si apre sulla vista **Dashboard**. Il selettore **Vista** in alto a destra passa tra **Dashboard** e **Donatori inattivi**.
2. Usa il selettore **Settimanale**, **Mensile** e **Trimestrale** sopra il report per scegliere come raggruppare le donazioni.
3. Nel pannello **Filtra report** imposta la **Data di inizio** e la **Data di fine** (per impostazione predefinita, dall'ultimo anno fino a ieri) e facoltativamente scegli un **Fondo**, poi fai clic su **Esegui report**. Il report viene eseguito automaticamente con i valori predefiniti quando la pagina si apre.
4. Quattro **schede KPI** mostrano le tue metriche di donazione per l'intervallo selezionato:
   - **Donazioni totali** -- L'importo totale donato.
   - **Donazione media** -- L'importo medio delle donazioni.
   - **Donatori unici** -- Il numero di persone distinte che hanno donato.
   - **Donazioni totali** -- Il numero totale di singole donazioni.
5. Sotto i KPI, un grafico a barre mostra le donazioni per settimana, mese o trimestre, suddivise per fondo.
6. Fai clic su **Opzioni di download** e scegli **Riepilogo** per esportare un CSV dei totali per periodo e fondo, oppure fai clic sull'icona della stampante per stampare il report. Il logo della tua chiesa (il **Logo per sfondo chiaro** di [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno) e il nome compaiono centrati in cima al report stampato. La stampa usa testo scuro e un grafico chiaro anche se usi B1 Admin in modalità scura.

Se le donazioni del periodo sono state fatte in più di una valuta, i totali dei KPI vengono convertiti nella valuta della tua chiesa e sotto le schede compare una nota **Convertito ai tassi di cambio attuali**. Vedi [Supporto multivaluta](./multi-currency.md#converted-totals) per i dettagli.

:::info
La dashboard mostra dati aggregati delle donazioni. Non include i nomi dei singoli donatori. Per i dettagli per donatore, usa la pagina [Lotti](batches.md).
:::

## Donatori inattivi

Scegli **Donatori inattivi** nel selettore **Vista** per elencare le persone che hanno donato in un periodo ma non da allora. Per impostazione predefinita confronta l'anno solare scorso con l'anno in corso fino ad oggi; cambia uno dei due intervalli di date per allargare o restringere la ricerca. Ogni riga mostra la persona, la data della sua ultima offerta e il suo totale del periodo precedente, e **Opzioni di download > Riepilogo** scarica l'elenco come CSV per una campagna postale o un elenco di chiamate di follow-up.

## Visualizzare i dettagli per donatore

Per vedere nel dettaglio chi ha donato, quanto e a quale fondo:

1. Vai su **Donazioni > Lotti**.
2. Fai clic sul **nome di un lotto** per aprirlo.
3. La pagina di dettaglio del lotto elenca ogni donazione con il suo metodo (e il numero dell'assegno o le ultime cifre della carta), il nome del donatore, la data, le note e l'importo, con un totale in fondo.
4. Fai clic su **Modifica** nella riga di una donazione per aprire i dettagli completi di quella singola donazione, incluso il suo fondo.
5. Fai clic su **Esporta** sopra l'elenco per scaricare un CSV con tutte le informazioni su donatori e donazioni di quel lotto.

## Report riepilogo delle donazioni

La reportistica delle donazioni è integrata direttamente nella sezione Donazioni -- la pagina Riepilogo funge da report riepilogo delle donazioni:

1. Nel menu Jump, scegli **Donazioni > Riepilogo**.
2. Nella vista **Dashboard**, imposta la **Data di inizio** e la **Data di fine** nel pannello **Filtra report** e fai clic su **Esegui report**.
3. Fai clic su **Opzioni di download** e scegli **Riepilogo** per esportare il report come file CSV.

## Esportare i dati

Puoi esportare i dati delle donazioni da più punti:

- **Pagina Riepilogo** -- scarica un CSV dei totali delle donazioni per settimana, mese o trimestre e per fondo
- **Pagina di dettaglio del lotto** -- scarica un CSV delle singole donazioni con i dettagli dei donatori
- **Pagina di dettaglio del fondo** -- scarica lo storico delle donazioni di un fondo specifico

:::tip
Per la rendicontazione di fine anno, combina l'esportazione della pagina Riepilogo con lo strumento [Ricevute di donazione](giving-statements.md) per ottenere sia le tendenze aggregate sia le ricevute dei singoli donatori.
:::

## Prossimi passi

- Genera le [Ricevute di donazione](giving-statements.md) per i tuoi donatori a fine anno
- Rivedi i singoli [lotti](batches.md) per verificare i dettagli delle donazioni
- Controlla le pagine di dettaglio dei [fondi](funds.md) per le suddivisioni delle donazioni per categoria
