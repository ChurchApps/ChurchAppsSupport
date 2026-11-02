---
title: "Importazione Stripe"
---

# Importazione Stripe

<div class="article-intro">

Se accetti donazioni online tramite Stripe, lo strumento Importazione Stripe ti permette di portare quelle transazioni in B1 Admin così tutti i tuoi dati sulle donazioni si trovano in un unico posto. È particolarmente utile per recuperare le transazioni che non sono state sincronizzate automaticamente.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Completa la [Configurazione delle donazioni online](online-giving-setup.md) per collegare il tuo account Stripe a B1 Admin. La voce di menu **Importazione Stripe** e il pulsante nella pagina Lotti compaiono solo quando il gateway di donazioni della tua chiesa è Stripe, e solo per le persone che possono modificare le donazioni
- Verifica di avere delle donazioni nella tua dashboard di Stripe per l'intervallo di date che vuoi importare

</div>

## Come funziona

Il processo di importazione usa un flusso in due passaggi: prima visualizzi in anteprima cosa verrebbe importato, poi confermi l'importazione. Questo approccio a prova (dry-run) ti permette di controllare tutto prima che venga creato qualsiasi dato.

## Importare le transazioni

1. In **B1 Admin**, vai su **Donazioni > Importazione Stripe**. (Puoi anche cliccare su **Importa transazioni Stripe mancanti** in cima alla pagina **Lotti**.)
2. Si apre la pagina **Importazione Stripe**.
3. Seleziona un **intervallo di date** per le transazioni che vuoi importare.
4. Clicca su **Anteprima** per eseguire un controllo a prova (dry-run).

## Controllare l'anteprima

L'anteprima mostra ogni transazione di Stripe con un indicatore di stato:

- **Nuova** -- questa transazione non è ancora stata importata e verrà inclusa se procedi.
- **Già importata** -- questa transazione esiste già in B1 Admin e verrà saltata.
- **Saltata** -- questa transazione è stata esclusa per un altro motivo (ad esempio un rimborso o un addebito fallito).

Una sezione di riepilogo in alto mostra il numero totale di transazioni per ogni categoria e gli importi in dollari coinvolti.

:::info
Il passaggio di anteprima non crea alcun record. È un controllo di sola lettura così puoi verificare cosa accadrà prima di procedere.
:::

## Completare l'importazione

1. Controlla i risultati dell'anteprima e i totali di riepilogo.
2. Clicca su **Importa mancanti** per importare tutte le transazioni contrassegnate come **Nuove**.
3. Al termine dell'importazione, gli indicatori di stato accanto a ogni transazione si aggiornano per mostrare il risultato.

## Suggerimenti per usare Importazione Stripe

- Esegui l'importazione regolarmente (settimanalmente o mensilmente) per mantenere aggiornati i tuoi registri.
- Se una transazione compare come **Già importata**, significa che B1 Admin ha già un record corrispondente -- non è necessaria alcuna azione.
- Usa il filtro dell'intervallo di date per concentrarti su un periodo specifico se cerchi determinate transazioni.

:::tip
Dopo l'importazione, visita la pagina [Lotti](batches.md) per verificare che le donazioni importate compaiano correttamente e che i totali corrispondano a quelli che vedi nella tua dashboard di Stripe.
:::

## Passi successivi

- Consulta i [Report sulle donazioni](donation-reports.md) per rivedere le transazioni importate insieme agli altri dati delle donazioni
- Assicurati che le donazioni importate siano assegnate ai [fondi](funds.md) corretti per [ricevute di donazione](giving-statements.md) accurate
