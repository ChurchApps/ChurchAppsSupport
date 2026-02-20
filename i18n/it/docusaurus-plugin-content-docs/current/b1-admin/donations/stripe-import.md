---
title: "Importazione Stripe"
---

# Importazione Stripe

<div class="article-intro">

Se accetti donazioni online tramite Stripe, lo strumento Importazione Stripe ti consente di importare quelle transazioni in B1 Admin in modo che tutti i tuoi dati sulle donazioni siano in un unico posto. Questo è particolarmente utile per recuperare eventuali transazioni che non sono state sincronizzate automaticamente.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Completa la [Configurazione donazioni online](online-giving-setup.md) per collegare il tuo account Stripe a B1 Admin
- Verifica di avere donazioni nella tua dashboard Stripe per l'intervallo di date che desideri importare

</div>

## Come funziona

Il processo di importazione utilizza un flusso di lavoro in due fasi: prima visualizzi l'anteprima di ciò che verrebbe importato, poi confermi l'importazione. Questo approccio di prova ti consente di esaminare tutto prima che vengano creati dati.

## Importare le transazioni

1. In **B1 Admin**, naviga su **Donazioni > Lotti**.
2. Clicca il link **Stripe Import** in fondo alla pagina Lotti.
3. Seleziona un **intervallo di date** per le transazioni che desideri importare.
4. Clicca **Preview** per eseguire un controllo di prova.

## Esaminare l'anteprima

L'anteprima mostra ogni transazione da Stripe insieme a un indicatore di stato:

- **Nuovo** -- questa transazione non è ancora stata importata e verrà inclusa se procedi.
- **Già importato** -- questa transazione esiste già in B1 Admin e verrà saltata.
- **Saltato** -- questa transazione è stata esclusa per un altro motivo (ad es., un rimborso o un addebito fallito).

Una sezione di riepilogo in cima mostra il numero totale di transazioni in ogni categoria e gli importi in dollari coinvolti.

:::info
La fase di anteprima non crea alcun record. È un controllo in sola lettura per verificare cosa accadrà prima di confermare.
:::

## Completare l'importazione

1. Esamina i risultati dell'anteprima e i totali di riepilogo.
2. Clicca **Import Missing** per importare tutte le transazioni contrassegnate come **Nuovo**.
3. Dopo il completamento dell'importazione, i badge di stato accanto a ogni transazione si aggiornano per mostrare il risultato.

## Suggerimenti per l'uso dell'Importazione Stripe

- Esegui l'importazione regolarmente (settimanalmente o mensilmente) per mantenere aggiornati i tuoi registri.
- Se una transazione mostra **Già importato**, significa che B1 Admin ha già un record corrispondente -- non è necessaria alcuna azione.
- Usa il filtro per intervallo di date per concentrarti su un periodo specifico se stai cercando transazioni particolari.

:::tip
Dopo l'importazione, visita la pagina [Lotti](batches.md) per verificare che le donazioni importate appaiano correttamente e che i totali corrispondano a ciò che vedi nella tua dashboard Stripe.
:::

## Prossimi passi

- Controlla i [Report donazioni](donation-reports.md) per esaminare le transazioni importate insieme ai tuoi altri dati sulle donazioni
- Assicurati che le donazioni importate siano assegnate ai [fondi](funds.md) corretti per [dichiarazioni di donazione](giving-statements.md) accurate
