---
title: "Report Donazioni"
---

# Report Donazioni

<div class="article-intro">

B1 Admin ti offre diversi modi per visualizzare e analizzare i dati di donazioni della tua chiesa. La pagina Riepilogo Donazioni fornisce una panoramica visiva con grafici e filtri, mentre la sezione Report offre un report Riepilogo Donazioni più dettagliato. Utilizza questi strumenti per tracciare i trend di donazioni, prepararti per le riunioni del consiglio, o riconciliare i tuoi record.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le donazioni siano state [registrate in batch](recording-donations.md) o [importate da Stripe](stripe-import.md)
- Verifica che i tuoi [fondi](funds.md) siano configurati correttamente in modo che le donazioni siano correttamente categorizzate

</div>

## Dashboard Donazioni

La **Dashboard Donazioni** è la prima cosa che vedi quando apri la sezione **Donazioni**. Fornisce una visione di alto livello della tua attività di donazioni con indicatori chiave di prestazione.

1. Apri il **menu della sezione** nell'angolo superiore sinistro e scegli **Donazioni** per aprire la dashboard.
2. Nella parte superiore, quattro **schede KPI** visualizzano le tue metriche di donazioni a colpo d'occhio:
   - **Donazioni totali** -- L'importo totale donato nel periodo selezionato.
   - **Donazione media** -- L'importo della donazione media.
   - **Donatori unici** -- Il numero di persone distinte che hanno donato.
   - **Totale donazioni** -- Il numero totale di singole donazioni.
3. Utilizza l'**interruttore di periodo** per passare tra le viste **Settimanale**, **Mensile** e **Trimestrale**.
4. Sotto gli KPI, un grafico visualizza i trend di donazioni per il periodo selezionato.
5. Fai clic su **Scarica** per esportare un file CSV con i totali di donazioni.

Se le donazioni nel periodo sono state effettuate in più di una valuta, i totali KPI vengono convertiti nella valuta della tua chiesa e viene visualizzata una nota **Convertito ai tassi di cambio attuali** sotto le schede. Consulta [Supporto Multi-Valuta](./multi-currency.md#converted-totals) per i dettagli.

## Donatori inattivi

La scheda **Donatori inattivi** accanto alla dashboard elenca le persone che hanno donato durante un periodo ma non da allora. Per impostazione predefinita confronta l'anno solare scorso con quest'anno fino ad oggi; cambia uno qualsiasi degli intervalli di date per ampliare o restringere la ricerca. Ogni riga mostra la persona, la data della sua ultima donazione e il suo totale per il periodo precedente, e **Esporta** scarica l'elenco come CSV per un mailing di follow-up o una lista di chiamate.

## Pagina Riepilogo Donazioni

La pagina **Riepilogo** fornisce dati di donazioni aggregate più dettagliati.

1. Apri il **menu della sezione** nell'angolo superiore sinistro e scegli **Donazioni** per aprire la pagina Riepilogo.
2. Utilizza il **filtro dell'intervallo di date** per selezionare il periodo di tempo che vuoi revisare. Imposta la data precedente in alto e la data più recente in basso.
3. La pagina visualizza un grafico di donazioni settimanale in modo che tu possa vedere i trend a colpo d'occhio.
4. Fai clic su **Scarica** per esportare un file CSV con l'importo totale donato, la settimana in cui è stato donato e il fondo a cui è stato donato.

:::info
La pagina Riepilogo mostra dati di donazioni aggregate. Non include i nomi dei singoli donatori. Per i dettagli a livello di donatore, utilizza la pagina [Batch](batches.md).
:::

## Visualizzazione dei dettagli a livello di donatore

Per una suddivisione di chi ha donato, quanto e a quale fondo:

1. Vai a **Donazioni > Batch**.
2. Fai clic su un **nome del batch** per aprirlo.
3. La pagina dei dettagli del batch elenca ogni donazione con il nome del donatore, l'importo, il fondo, la data e il metodo di pagamento.
4. Fai clic sul **nome di un donatore** per vedere una suddivisione di quante volte hanno donato e quanto ogni volta.
5. Fai clic su un **ID donazione** per aprire un pannello laterale con i dettagli completi per quella singola donazione.
6. Fai clic su **Scarica** per esportare un CSV con tutte le informazioni su donatore e donazione per quel batch.

## Report Riepilogo Donazioni

I report di donazioni sono costruiti direttamente nella sezione Donazioni -- la pagina Riepilogo funge da tuo report di riepilogo donazioni:

1. Apri il **menu della sezione** nell'angolo superiore sinistro e scegli **Donazioni** per aprire la pagina Riepilogo.
2. Utilizza il **filtro dell'intervallo di date** per selezionare il periodo su cui vuoi fare un report.
3. Fai clic su **Scarica** per esportare il report come file CSV.

## Esportazione dati

Puoi esportare dati di donazioni da molteplici posizioni:

- **Pagina Riepilogo** -- scarica un CSV dei totali di donazioni settimanali per fondo
- **Pagina dei dettagli del batch** -- scarica un CSV di singole donazioni con i dettagli del donatore
- **Pagina dei dettagli del fondo** -- scarica la cronologia delle donazioni per un fondo specifico

:::tip
Per il reporting di fine anno, combina l'esportazione della pagina Riepilogo con lo strumento [Dichiarazioni di donazioni](giving-statements.md) per ottenere sia i trend aggregati che le dichiarazioni individuali dei donatori.
:::

## Passaggi successivi

- Genera [Dichiarazioni di donazioni](giving-statements.md) per i tuoi donatori a fine anno
- Rivedi i singoli [batch](batches.md) per verificare i dettagli delle donazioni
- Controlla le pagine dei [dettagli dei fondi](funds.md) per le suddivisioni delle donazioni per categoria
