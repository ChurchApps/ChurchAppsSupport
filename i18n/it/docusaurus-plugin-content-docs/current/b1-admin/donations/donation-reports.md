---
title: "Rapporti di Donazione"
---

# Rapporti di Donazione

<div class="article-intro">

B1 Admin ti fornisce diversi modi di visualizzare e analizzare i dati sulle donazioni della tua chiesa. La dashboard di donazioni sulla pagina **Riepilogo** fornisce una panoramica visiva con grafici e filtri, mentre la sezione Rapporti offre un rapporto Riepilogo di Donazione più dettagliato. Usa questi strumenti per tracciare le tendenze di donazione, preparati per le riunioni del consiglio, o riconcilia i tuoi record.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le donazioni siano state [registrate in lotti](recording-donations.md) o [importate da Stripe](stripe-import.md)
- Verifica che i tuoi [fondi](funds.md) siano configurati correttamente così le donazioni siano correttamente categorizzate

</div>

## Dashboard di Donazioni

La dashboard di donazioni è la scheda **Dashboard** della pagina **Riepilogo**, la prima pagina che vedi quando apri la sezione **Donazioni**.

1. Apri il [Menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin), espandi **Donazioni**, e fai clic su **Riepilogo**. La pagina **Riepilogo** si apre sulla scheda **Dashboard**.
2. Usa l'interruttore **Settimanale**, **Mensile**, e **Trimestrale** sopra il rapporto per scegliere come le donazioni sono raggruppate.
3. Nel pannello **Filtra Rapporto**, imposta la **Data di Inizio** e la **Data di Fine** (per impostazione predefinita, l'anno passato fino a ieri) e facoltativamente scegli un **Fondo**, quindi fai clic su **Esegui Rapporto**. Il rapporto viene eseguito automaticamente con i valori predefiniti quando la pagina si apre.
4. Quattro **schede KPI** visualizzano le metriche di donazione per l'intervallo selezionato:
   - **Totale Donazioni** -- L'importo totale donato.
   - **Dono Medio** -- L'importo medio di donazione.
   - **Donatori Unici** -- Il numero di persone distinte che hanno donato.
   - **Totale Donazioni** -- Il numero totale di donazioni individuali.
5. Sotto i KPI, un grafico a barre mostra le donazioni per settimana, mese, o trimestre, suddiviso per fondo.
6. Fai clic su **Opzioni di Download** e scegli **Riepilogo** per esportare un CSV dei totali per periodo e fondo, o fai clic sull'icona di stampa per stampare il rapporto. Il nome della tua chiesa appare nella parte superiore del rapporto stampato.

Se le donazioni nel periodo sono state fatte in più di una valuta, i totali KPI vengono convertiti nella valuta della tua chiesa e una nota **Convertito ai tassi di cambio attuali** appare sotto le schede. Vedi [Supporto Multi-Valuta](./multi-currency.md#converted-totals) per i dettagli.

:::info
La dashboard mostra i dati aggregati sulle donazioni. Non include i nomi dei singoli donatori. Per i dettagli a livello di donatore, usa la pagina [Lotti](batches.md).
:::

## Donatori Inattivi

La scheda **Donatori Inattivi** accanto alla scheda **Dashboard** elenca le persone che hanno donato durante un periodo ma non da allora. Per impostazione predefinita confronta l'anno solare scorso con questo anno fino ad oggi; cambia uno qualsiasi degli intervalli di data per ampliare o restringere la ricerca. Ogni riga mostra la persona, la data del loro ultimo dono e il totale per il periodo precedente, e **Opzioni di Download > Riepilogo** scarica l'elenco come un CSV per una mailing di follow-up o una lista di chiamate.

## Visualizzazione dei Dettagli a Livello di Donatore

Per un breakdown di chi ha donato, quanto, e a quale fondo:

1. Naviga a **Donazioni > Lotti**.
2. Fai clic su un **nome di lotto** per aprirlo.
3. La pagina di dettaglio del lotto elenca ogni donazione con il nome del donatore, l'importo, il fondo, la data, e il metodo di pagamento.
4. Fai clic sul **nome di un donatore** per vedere un breakdown di quante volte hanno donato e quanto ogni volta.
5. Fai clic su un **ID di donazione** per aprire un pannello laterale con i dettagli completi per quella donazione individuale.
6. Fai clic su **Download** per esportare un CSV con tutte le informazioni di donatore e donazione per quel lotto.

## Rapporto Riepilogo di Donazione

I rapporti di donazione sono costruiti direttamente nella sezione Donazioni -- la pagina Riepilogo serve come tuo rapporto di riepilogo di donazione:

1. Nel Menu Jump, scegli **Donazioni > Riepilogo**.
2. Sulla scheda **Dashboard**, imposta la **Data di Inizio** e la **Data di Fine** nel pannello **Filtra Rapporto** e fai clic su **Esegui Rapporto**.
3. Fai clic su **Opzioni di Download** e scegli **Riepilogo** per esportare il rapporto come un file CSV.

## Esportazione dei Dati

Puoi esportare i dati di donazione da più posti:

- **Pagina Riepilogo** -- scarica un CSV dei totali di donazioni per settimana, mese, o trimestre e fondo
- **Pagina di dettaglio del lotto** -- scarica un CSV di donazioni individuali con dettagli di donatori
- **Pagina di dettaglio del fondo** -- scarica la cronologia delle donazioni per uno specifico fondo

:::tip
Per il rapporto di fine anno, combina l'esportazione della pagina Riepilogo con lo strumento [Dichiarazioni di Donazione](giving-statements.md) per ottenere sia le tendenze aggregate che le dichiarazioni dei singoli donatori.
:::

## Passaggi Successivi

- Genera [Dichiarazioni di Donazione](giving-statements.md) per i tuoi donatori a fine anno
- Rivedi i singoli [lotti](batches.md) per verificare i dettagli delle donazioni
- Controlla le pagine di dettaglio del [fondo](funds.md) per i breakdown di donazione per categoria
