---
title: "Completamento del check-in"
---

# Completamento del check-in

<div class="article-intro">

Una volta che hai rivisto il tuo nucleo familiare e hai fatto qualsiasi assegnazione di gruppo necessaria, sei pronto per finalizzare il check-in. Questo è l'ultimo passaggio del flusso di lavoro del chiosco -- l'app sottomette la partecipazione, stampa etichette e si reimposta per la prossima famiglia.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- [Rivedi il tuo nucleo familiare](./household-review) sulla schermata di revisione del nucleo familiare
- [Assegna gruppi](./group-assignment) a qualsiasi membro della famiglia che ha bisogno di arrivare in una classe o programma specifico
- Facoltativamente [aggiungi ospiti](./adding-guests) che visitano con la tua famiglia

</div>

## Come fare il check-in

1. Dalla **schermata di revisione del nucleo familiare**, tocca il pulsante **Check-in** nella parte inferiore dello schermo.
2. L'app sottomette i dati di partecipazione al server e mostra una **schermata di successo** con una spunta verde e un messaggio di benvenuto.

È tutto quello che serve. La partecipazione della tua famiglia è stata registrata.

## Stanze complete e rapporti dei volontari

Se la tua chiesa ha configurato [limiti di sicurezza](../../b1-admin/attendance/checkin-safety) sulle sue stanze, il server li verifica prima di salvare:

- Se una stanza selezionata è **piena o chiusa**, il check-in non va avanti e l'app nomina la stanza in modo che tu possa sceglierne una diversa.
- Se una stanza per bambini è **a corto di volontari** per il suo rapporto, l'app mostra un avviso che un membro dello staff può confermare per procedere, o blocca completamente il check-in -- a seconda di come la tua chiesa ha configurato l'applicazione del rapporto.

## Stampa etichette

Se una stampante di rete è configurata, l'app stampa automaticamente etichette dopo il check-in:

- **Le etichette con i nomi** vengono stampate per ogni persona assegnata a un gruppo che ha l'impostazione **Stampa cartellino** abilitata. Le etichette con i nomi includono il nome della persona, l'assegnazione del gruppo e le informazioni su allergie/note se presenti nel file.
- **I bollettini di ritiro dei genitori** vengono stampati quando qualsiasi persona arrivata ha il check-in in un gruppo che ha l'impostazione **Ritiro genitori** abilitata. Le persone che hanno il check-in come **Volontario** vengono saltate, quindi un assistente all'infanzia che serve in una stanza per il ritiro dei genitori non riceve un bollettino di ritiro. Il bollettino di ritiro elenca i bambini, le loro assegnazioni di gruppo e un **codice di sicurezza univoco di 4 caratteri**.

:::info
Lo stesso codice di sicurezza appare sia sull'etichetta con il nome del bambino che sul bollettino di ritiro dei genitori. Al momento del ritiro, i volontari abbinano i codici per verificare che il giusto adulto stia ritirando ogni bambino.
:::

Il codice di sicurezza viene generato fresco per ogni check-in e utilizza solo consonanti e cifre (le vocali sono escluse per evitare di formare parole inappropriate).

:::warning
Se le etichette non stampano, apri le impostazioni amministratore toccando il **logo della chiesa** sette volte, quindi tocca **Cambia stampante** per verificare la connessione della stampante. Vedi [Configurazione stampante](../getting-started/printer-setup) per i passaggi di risoluzione dei problemi.
:::

## Cosa accade dopo il check-in

- Se una stampante è configurata, l'app stampa tutte le etichette e quindi automaticamente ritorna alla **schermata di ricerca**, pronta per la prossima famiglia.
- Se nessuna stampante è configurata, la schermata di successo viene visualizzata per alcuni secondi e poi automaticamente ritorna alla **schermata di ricerca**.

Non devi toccare nulla per tornare alla schermata di ricerca -- l'app gestisce la transizione automaticamente.

:::tip
L'app si reimposta completamente dopo ogni check-in, quindi non c'è rischio che una famiglia veda le informazioni di un'altra famiglia.
:::

## Cosa viene registrato

Quando tocchi **Check-in**, l'app invia quanto segue al server per ogni membro del nucleo familiare che ha un'assegnazione di gruppo:

- La **persona** che fa il check-in
- Il **servizio** che stanno frequentando
- L'**ora di servizio** e il **gruppo** a cui sono assegnati

Questi dati appaiono in B1 Admin nella sezione Partecipazione, dove gli amministratori della tua chiesa possono visualizzare e gestire i record di partecipazione. Vedi la [guida all'amministrazione del check-in](../../b1-admin/attendance/check-in.md) per i dettagli.
