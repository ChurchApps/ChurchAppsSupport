---
title: "Importazione Stripe"
description: "Importa in B1 Admin le donazioni Stripe con un'importazione che prevede prima l'anteprima, così ogni addebito viene contrassegnato come nuovo, già importato o saltato prima di confermare."
---

# Importazione Stripe

<div class="article-intro">

Se accetti donazioni online tramite Stripe, lo strumento Importazione Stripe ti permette di importare quelle transazioni in B1 Admin, così tutti i tuoi dati sulle donazioni vivono in un unico posto. È particolarmente utile per recuperare eventuali transazioni che non sono state sincronizzate automaticamente.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Completa la [Configurazione delle donazioni online](online-giving-setup.md) per collegare il tuo account Stripe a B1 Admin. La voce di menu **Importazione Stripe** e il pulsante nella pagina Lotti compaiono solo quando il gateway di donazioni della tua chiesa è Stripe, e solo per chi può modificare le donazioni
- Verifica che nella tua dashboard Stripe ci siano donazioni per l'intervallo di date che vuoi importare

</div>

## Come funziona {#how-it-works}

Il processo di importazione segue un flusso in due passaggi: prima visualizzi in anteprima cosa verrebbe importato, poi confermi l'importazione. Questo approccio di prova ti permette di esaminare tutto prima che venga creato qualsiasi dato.

## Importare le transazioni {#importing-transactions}

1. In **B1 Admin**, vai su **Donazioni > Importazione Stripe**. (Puoi anche fare clic su **Importa transazioni Stripe mancanti** in cima alla pagina **Lotti**.)
2. Si apre la pagina **Importa transazioni Stripe**.
3. In **Seleziona intervallo di date**, imposta la **Data di inizio** e la **Data di fine** per le transazioni che vuoi importare. L'intervallo parte dal 1° gennaio di quest'anno fino ad oggi.
4. Fai clic su **Anteprima** per eseguire un controllo di prova. **Importa mancanti** resta disabilitato finché un'anteprima non trova transazioni nuove, e cambiare una delle due date cancella l'anteprima, così devi prima visualizzare in anteprima il nuovo intervallo.

## Esaminare l'anteprima {#reviewing-the-preview}

L'anteprima elenca ogni evento Stripe con il suo **ID evento**, il **Tipo**, l'**Importo**, la **Data** e uno **Stato**:

- **Nuova** -- questa transazione non è ancora stata importata e verrà inclusa se procedi.
- **Già importata** -- questa transazione esiste già in B1 Admin e verrà saltata.
- **Saltata** -- questa transazione è stata esclusa per un altro motivo (ad esempio un rimborso o un addebito non riuscito).

Un riepilogo in alto mostra il numero **Totale** di eventi e quanti sono **Nuovi**, **Già importati** e **Saltati**. Se un evento non può essere letto, compare un conteggio **Errori** e la riga dell'evento mostra il messaggio nella colonna **Note**.

:::info
Il passaggio di anteprima non crea alcun record. È un controllo di sola lettura, così puoi verificare cosa accadrà prima di procedere.
:::

## Completare l'importazione {#completing-the-import}

1. Esamina i risultati dell'anteprima e i totali del riepilogo.
2. Fai clic su **Importa mancanti** per importare tutte le transazioni contrassegnate come **Nuova**.
3. Al termine dell'importazione, l'elenco diventa **Risultati importazione**: ogni transazione aggiunta mostra **Importata**, e il riepilogo aggiunge un conteggio **Importate**.

## Suggerimenti per usare l'importazione Stripe {#tips-for-using-stripe-import}

- Esegui l'importazione regolarmente (settimanalmente o mensilmente) per mantenere aggiornati i tuoi registri.
- Se una transazione compare come **Già importata**, significa che B1 Admin ha già un record corrispondente -- non serve alcuna azione.
- Usa il filtro per intervallo di date per concentrarti su un periodo specifico se cerchi transazioni particolari.

:::tip
Dopo l'importazione, visita la pagina [Lotti](batches.md) per verificare che le donazioni importate compaiano correttamente e che i totali corrispondano a quelli che vedi nella tua dashboard Stripe.
:::

## Prossimi passi {#next-steps}

- Controlla i [Report sulle donazioni](donation-reports.md) per esaminare le transazioni importate insieme al resto dei tuoi dati sulle donazioni
- Assicurati che le donazioni importate siano assegnate ai [fondi](funds.md) corretti per delle [ricevute di donazione](giving-statements.md) accurate
