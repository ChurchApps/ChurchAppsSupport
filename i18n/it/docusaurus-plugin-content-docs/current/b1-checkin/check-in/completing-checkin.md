---
title: "Completare il check-in"
description: "Completa il check-in al chiosco di una famiglia in B1 Checkin, includendo i limiti delle stanze, la stampa delle etichette, i codici di sicurezza per il ritiro e le operazioni successive dell'app."
---

# Completare il check-in

<div class="article-intro">

Dopo aver verificato il tuo nucleo familiare e aver effettuato eventuali assegnazioni ai gruppi necessarie, sei pronto a finalizzare il check-in. Questo è l'ultimo passaggio del flusso di lavoro del chiosco: l'app invia le presenze, stampa le etichette e si reimposta per la famiglia successiva.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- [Verifica il tuo nucleo familiare](./household-review.md) nella schermata di verifica del nucleo familiare
- [Assegna i gruppi](./group-assignment.md) a tutti i membri della famiglia che devono registrarsi per una specifica classe o programma
- Facoltativamente, [aggiungi eventuali ospiti](./adding-guests.md) che accompagnano la tua famiglia

</div>

## Come effettuare il check-in

1. Dalla **schermata di verifica del nucleo familiare**, tocca il pulsante **Check-in** in fondo alla schermata.
2. L'app invia i dati di presenza al server e mostra una **schermata di conferma** con un segno di spunta verde e un messaggio di benvenuto.

Non c'è altro da fare. La presenza della tua famiglia è stata registrata.

Se una delle persone selezionate ha già effettuato il check-in per questa funzione oggi, appare prima una finestra **Già registrato** che le indica per nome. Tocca **Registra di nuovo** per salvare le nuove scelte di gruppo, oppure **Annulla** per tornare alla schermata del nucleo familiare.

## Stanze piene e rapporti con i volontari

Se la tua chiesa ha configurato [limiti di sicurezza](../../b1-admin/attendance/checkin-safety.md) per le sue stanze, il server li verifica prima di salvare:

- Se una stanza selezionata è **piena o chiusa**, il check-in non viene completato e l'app indica la stanza, così puoi sceglierne un'altra.
- Se l'orario di servizio ha una [pianificazione del check-in](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) e la sua finestra di check-in non è aperta in questo momento, anche il check-in nelle stanze di quell'orario di servizio viene rifiutato. La schermata **Impossibile effettuare il check-in ora** elenca la stanza con il motivo "il check-in non è aperto in questo momento"; tocca **Cambia stanze** per scegliere un altro orario di servizio o un altro gruppo. (Gli orari di servizio già chiusi sono indicati come **Chiuso** nella [schermata del nucleo familiare](./household-review.md) e non possono essere selezionati, quindi di solito vedrai questo messaggio solo se una finestra si chiude durante un check-in.)
- Un nucleo familiare che ha effettuato il check-in per un orario di servizio precedente può tornare più tardi e aggiungere un orario di servizio aperto, anche dopo la chiusura della finestra precedente. I check-in già esistenti vengono mantenuti e non causano il rifiuto del nuovo check-in.
- Se una stanza per bambini ha **pochi volontari** rispetto al rapporto previsto, l'app mostra un avviso che un membro dello staff può confermare per procedere, oppure blocca completamente il check-in, a seconda di come la tua chiesa ha configurato l'applicazione del rapporto.

## Stampa delle etichette

Se è configurata una stampante di rete, l'app stampa automaticamente le etichette dopo il check-in:

- Le **etichette con il nome** vengono stampate per ogni persona assegnata a un gruppo con l'impostazione **Stampa cartellino** attiva. Le etichette contengono il nome della persona, l'assegnazione al gruppo e le informazioni su allergie o note, se presenti.
- I **tagliandi per il ritiro dei genitori** vengono stampati quando una persona registrata appartiene a un gruppo con l'impostazione **Ritiro dei genitori** attiva. Le persone registrate come **Volontario** vengono escluse, quindi un addetto all'infanzia che presta servizio in una stanza con Ritiro dei genitori non riceve un tagliando. Il tagliando elenca i bambini, le loro assegnazioni ai gruppi e un **codice di sicurezza univoco di 4 caratteri**.

:::info
Lo stesso codice di sicurezza compare sia sull'etichetta con il nome del bambino sia sul tagliando per il ritiro del genitore. Al momento del ritiro, i volontari confrontano i codici per verificare che l'adulto giusto stia ritirando ciascun bambino.
:::

Il codice di sicurezza viene generato ex novo per ogni check-in e utilizza solo consonanti e cifre (le vocali sono escluse per evitare la formazione di parole inappropriate).

:::warning
Se le etichette non vengono stampate, apri le Impostazioni amministratore toccando il **logo della chiesa** sette volte, quindi tocca **Cambia stampante** per verificare la connessione alla stampante. Consulta [Configurazione della stampante](../getting-started/printer-setup.md) per i passaggi di risoluzione dei problemi.
:::

## Cosa succede dopo il check-in

- Se è configurata una stampante, l'app stampa tutte le etichette e poi torna automaticamente alla **schermata di ricerca**, pronta per la famiglia successiva.
- Se non è configurata alcuna stampante, l'app torna automaticamente anche in questo caso alla **schermata di ricerca**.

In entrambi i casi, la schermata di conferma resta visibile per almeno 6 secondi dal momento in cui appare (8 secondi quando celebra il traguardo di presenze di una persona), così le famiglie possono vedere che il check-in è riuscito. Se la stampa richiede più tempo, l'app torna circa un secondo e mezzo dopo la fine della stampa.

Non devi toccare nulla per tornare alla schermata di ricerca: l'app gestisce la transizione automaticamente. Una volta che la schermata è rimasta visibile per un momento, puoi toccarla per tornare subito indietro; un tocco nel primo secondo e mezzo viene ignorato, quindi un doppio tocco rapido su **Check-in** non salta la schermata.

:::tip
L'app si reimposta completamente dopo ogni check-in, quindi non c'è alcun rischio che una famiglia veda le informazioni di un'altra famiglia.
:::

## Cosa viene registrato

Quando tocchi **Check-in**, l'app invia al server le seguenti informazioni per ogni membro del nucleo familiare che ha un'assegnazione a un gruppo:

- La **persona** che effettua il check-in
- Il **servizio** a cui partecipa
- L'**orario di servizio** e il **gruppo** a cui è assegnata

Questi dati compaiono in B1 Admin, nella sezione Presenze, dove gli amministratori della chiesa possono visualizzare e gestire i registri di presenza. Consulta la [guida all'amministrazione del check-in](../../b1-admin/attendance/check-in.md) per maggiori dettagli.
