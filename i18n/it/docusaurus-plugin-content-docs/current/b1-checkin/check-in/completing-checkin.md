---
title: "Completamento della Registrazione"
---

# Completamento della Registrazione

<div class="article-intro">

Una volta che hai rivisto la tua famiglia e fatto i necessari assegnamenti di gruppo, sei pronto a finalizzare la registrazione. Questo è l'ultimo passaggio nel flusso di lavoro del chiosco -- l'app invia la partecipazione, stampa le etichette e si ripristina per la famiglia successiva.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- [Rivedi la tua famiglia](./household-review) sulla schermata di revisione della famiglia
- [Assegna i gruppi](./group-assignment) ai membri della famiglia che hanno bisogno di registrarsi in una classe o programma specifico
- Facoltativamente [aggiungi ospiti](./adding-guests) che stanno visitando con la tua famiglia

</div>

## Come Registrarsi

1. Dalla **schermata di revisione della famiglia**, tocca il pulsante **Check-in** nella parte inferiore dello schermo.
2. L'app invia i dati di partecipazione al server e mostra una **schermata di successo** con un segno di spunta verde e un messaggio di benvenuto.

È tutto ciò che serve. La partecipazione della tua famiglia è stata registrata.

## Stanze Piene e Rapporti di Volontari

Se la tua chiesa ha configurato [limiti di sicurezza](../../b1-admin/attendance/checkin-safety) sulle sue stanze, il server le controlla prima di salvare:

- Se una stanza selezionata è **piena o chiusa**, la registrazione non va a buon fine e l'app nomina la stanza in modo da poterne scegliere un'altra.
- Se una stanza per bambini è **a corto di volontari** per il suo rapporto, l'app mostra un avviso che un membro dello staff può confermare per procedere, oppure blocca completamente la registrazione -- a seconda di come la tua chiesa ha configurato l'applicazione del rapporto.

## Stampa delle Etichette

Se è configurata una stampante di rete, l'app stampa automaticamente le etichette dopo la registrazione:

- **Etichette con nome** vengono stampate per ogni persona assegnata a un gruppo che ha l'impostazione **Print Nametag** abilitata. Le etichette con nome includono il nome della persona, la sua assegnazione di gruppo e le informazioni su allergie/note se presenti nel sistema.
- **Biglietti di ritiro per i genitori** vengono stampati quando una persona registrata si trova in un gruppo che ha l'impostazione **Parent Pickup** abilitata. Il biglietto di ritiro elenca i bambini, i loro assegnamenti di gruppo e un **codice di sicurezza a 4 caratteri** univoco.

:::info
Lo stesso codice di sicurezza appare sia sull'etichetta del nome del bambino che sul biglietto di ritiro dei genitori. Al momento del ritiro, i volontari abbinano i codici per verificare che l'adulto giusto stia ritirando ogni bambino.
:::

Il codice di sicurezza viene generato di nuovo per ogni registrazione e utilizza solo consonanti e cifre (le vocali vengono escluse per evitare di formare parole inappropriate).

:::warning
Se le etichette non vengono stampate, apri le Impostazioni di Admin toccando il **logo della chiesa** sette volte, quindi tocca **Change Printer** per verificare la connessione della stampante. Vedi [Printer Setup](../getting-started/printer-setup) per i passaggi di risoluzione dei problemi.
:::

## Cosa Succede Dopo la Registrazione

- Se è configurata una stampante, l'app stampa tutte le etichette e quindi ritorna automaticamente alla **schermata di ricerca**, pronta per la famiglia successiva.
- Se non è configurata una stampante, la schermata di successo viene visualizzata per alcuni secondi e quindi ritorna automaticamente alla **schermata di ricerca**.

Non è necessario toccare nulla per tornare alla schermata di ricerca -- l'app gestisce la transizione automaticamente.

:::tip
L'app si ripristina completamente dopo ogni registrazione, quindi non c'è rischio che una famiglia veda le informazioni di un'altra famiglia.
:::

## Cosa Viene Registrato

Quando tocchi **Check-in**, l'app invia quanto segue al server per ogni membro della famiglia che ha un assegnamento di gruppo:

- La **persona** che si sta registrando
- Il **servizio** che stanno frequentando
- L'**ora del servizio** e il **gruppo** a cui sono assegnati

Questi dati appaiono in B1 Admin nella sezione Attendance, dove gli amministratori della chiesa possono visualizzare e gestire i record di partecipazione. Consulta la [guida all'amministrazione della registrazione](../../b1-admin/attendance/check-in.md) per i dettagli.
