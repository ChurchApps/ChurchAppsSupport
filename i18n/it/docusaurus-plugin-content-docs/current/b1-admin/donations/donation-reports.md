---
title: "Report sulle donazioni"
description: "Esamina i totali delle donazioni, i donatori inattivi e i dettagli a livello di lotto in B1 Admin con la dashboard Riepilogo donazioni, la vista Donatori inattivi ed esportazioni CSV."
---

# Report sulle donazioni

<div class="article-intro">

B1 Admin ti offre diversi modi per visualizzare e analizzare i dati sulle donazioni della tua chiesa. La dashboard delle donazioni nella pagina **Riepilogo** di Donazioni offre una panoramica visiva con grafici e filtri, mentre la sezione Report contiene un report più dettagliato sul riepilogo delle donazioni. Usa questi strumenti per monitorare gli andamenti, preparare le riunioni del consiglio o riconciliare i tuoi registri.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le donazioni siano state [registrate nei lotti](recording-donations.md) oppure [importate da Stripe](stripe-import.md)
- Verifica che i tuoi [fondi](funds.md) siano configurati correttamente, così le donazioni sono classificate nel modo giusto

</div>

## Dashboard delle donazioni {#giving-dashboard}

La dashboard delle donazioni è la vista **Dashboard** della pagina **Riepilogo**, la prima che vedi quando apri la sezione **Donazioni**.

1. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **Donazioni** e fai clic su **Riepilogo**. La pagina **Riepilogo** si apre sulla vista **Dashboard**. L'interruttore **Vista** in alto a destra passa tra **Dashboard** e **Donatori inattivi**.
2. Usa l'interruttore **Settimanale**, **Mensile** e **Trimestrale** sopra il report per scegliere come raggruppare le donazioni.
3. Nel riquadro **Filtra report** imposta la **Data di inizio** e la **Data di fine** (per impostazione predefinita, dall'ultimo anno fino a ieri) e facoltativamente scegli un **Fondo**, poi fai clic su **Esegui report**. Il report si esegue automaticamente con i valori predefiniti quando la pagina si apre.
4. Quattro **schede KPI** mostrano le metriche delle donazioni per l'intervallo selezionato:
   - **Donazioni totali** -- L'importo totale donato.
   - **Offerta media** -- L'importo medio di una donazione.
   - **Donatori unici** -- Il numero di persone distinte che hanno donato.
   - **Donazioni totali** -- Il numero totale di singole donazioni.
5. Sotto i KPI, un grafico a barre mostra le donazioni per settimana, mese o trimestre, suddivise per fondo.
6. Fai clic su **Opzioni di download** e scegli **Riepilogo** per esportare un CSV dei totali per periodo e fondo, oppure fai clic sull'icona di stampa per stampare il report. Il logo della tua chiesa (il **Logo per sfondo chiaro** da [Sito web > Aspetto](../website/appearance.md), se ne hai caricato uno) e il nome compaiono centrati in alto nel report stampato. La stampa usa testo scuro e un grafico chiaro anche se usi B1 Admin in modalità scura.

Se le donazioni del periodo sono state fatte in più di una valuta, i totali dei KPI vengono convertiti nella valuta della tua chiesa e sotto le schede compare una nota **Convertito ai tassi di cambio correnti**. Vedi [Supporto multi-valuta](./multi-currency.md#converted-totals) per i dettagli.

:::info
La dashboard mostra dati aggregati sulle donazioni. Non include i nomi dei singoli donatori. Per i dettagli a livello di donatore, usa la pagina [Lotti](batches.md).
:::

## Donatori inattivi {#lapsed-givers}

Scegli **Donatori inattivi** nell'interruttore **Vista** per elencare le persone che hanno donato in un periodo ma non da allora. Per impostazione predefinita confronta l'anno solare precedente con l'anno in corso fino ad oggi; cambia **Inizio periodo precedente**, **Fine periodo precedente**, **Inizio periodo corrente** o **Fine periodo corrente** nel riquadro **Filtra report** e fai clic su **Esegui report** per allargare o restringere la ricerca. Questa vista richiede il permesso **Visualizza donazioni**. Ogni riga mostra la persona, la data dell'ultima offerta e il suo totale per il periodo precedente, e **Opzioni di download > Riepilogo** scarica l'elenco come CSV per una spedizione o un elenco di chiamate di follow-up.

## Visualizzare i dettagli per donatore {#viewing-donor-level-details}

Per vedere chi ha donato, quanto e a quale fondo:

1. Vai su **Donazioni > Lotti**.
2. Fai clic sul **nome di un lotto** per aprirlo.
3. La pagina di dettaglio del lotto elenca ogni donazione con il suo metodo (e il numero dell'assegno o le ultime cifre della carta), il nome del donatore, la data, le note e l'importo, con un totale in fondo.
4. Fai clic su **Modifica** sulla riga di una donazione per aprire i dettagli completi di quella singola donazione, incluso il suo fondo.
5. Fai clic su **Esporta** sopra l'elenco per scaricare un CSV con tutte le informazioni su donatori e donazioni di quel lotto.

## Report di riepilogo delle donazioni {#donation-summary-report}

Il report sulle donazioni è integrato direttamente nella sezione Donazioni -- la pagina Riepilogo funge da tuo report di riepilogo:

1. Nel menu Jump, scegli **Donazioni > Riepilogo**.
2. Nella vista **Dashboard**, imposta la **Data di inizio** e la **Data di fine** nel riquadro **Filtra report** e fai clic su **Esegui report**.
3. Fai clic su **Opzioni di download** e scegli **Riepilogo** per esportare il report come file CSV.

## Esportare i dati {#exporting-data}

Puoi esportare i dati delle donazioni da più punti:

- **Pagina Riepilogo** -- scarica un CSV dei totali delle donazioni per settimana, mese o trimestre e fondo
- **Pagina di dettaglio del lotto** -- scarica un CSV delle singole donazioni con i dettagli dei donatori
- **Pagina di dettaglio del fondo** -- scarica lo storico delle donazioni di un fondo specifico

:::tip
Per il reporting di fine anno, combina l'esportazione della pagina Riepilogo con lo strumento [Ricevute di donazione](giving-statements.md) per ottenere sia gli andamenti aggregati sia le ricevute dei singoli donatori.
:::

## Prossimi passi {#next-steps}

- Genera le [Ricevute di donazione](giving-statements.md) per i tuoi donatori a fine anno
- Esamina i singoli [lotti](batches.md) per verificare i dettagli delle donazioni
- Controlla le pagine di dettaglio dei [fondi](funds.md) per la suddivisione delle donazioni per categoria
