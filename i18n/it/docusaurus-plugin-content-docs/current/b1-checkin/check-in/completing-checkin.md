---
title: "Completare il check-in"
---

# Completare il check-in {#completing-check-in}

<div class="article-intro">

Una volta verificato il nucleo familiare e assegnati eventuali gruppi, sei pronto a completare il check-in. Questo è l'ultimo passaggio del flusso del chiosco: l'app invia le presenze, stampa le etichette e si reimposta per la famiglia successiva.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- [Verifica il tuo nucleo familiare](./household-review) nella schermata di verifica del nucleo familiare
- [Assegna i gruppi](./group-assignment) ai membri della famiglia che devono registrarsi in una classe o un programma specifico
- Facoltativamente, [aggiungi eventuali ospiti](./adding-guests) che stanno visitando con la tua famiglia

</div>

## Come effettuare il check-in {#how-to-check-in}

1. Dalla **schermata di verifica del nucleo familiare**, tocca il pulsante **Check-in** in fondo alla schermata.
2. L'app invia i dati di presenza al server e mostra una **schermata di successo** con un segno di spunta verde e un messaggio di benvenuto.

Tutto qui. Le presenze della tua famiglia sono state registrate.

## Stanze piene e rapporti con i volontari {#full-rooms-and-volunteer-ratios}

Se la tua chiesa ha configurato [limiti di sicurezza](../../b1-admin/attendance/checkin-safety) per le sue stanze, il server li verifica prima di salvare:

- Se una stanza selezionata è **piena o chiusa**, il check-in non va a buon fine e l'app indica il nome della stanza, così puoi sceglierne un'altra.
- Se l'orario del servizio ha una [pianificazione del check-in](../../b1-admin/attendance/setup#setting-a-check-in-schedule) e la sua finestra di check-in non è aperta in questo momento, anche il check-in nelle stanze di quell'orario di servizio viene rifiutato. La schermata **Non puoi ancora fare il check-in** elenca la stanza con il motivo "il check-in non è aperto in questo momento"; tocca **Cambia stanze** per scegliere un altro orario di servizio o un altro gruppo. (Gli orari di servizio già chiusi sono mostrati come **Chiuso** nella [schermata della famiglia](./household-review) e non possono essere scelti, quindi di solito vedrai questo messaggio solo se una finestra si chiude durante un check-in.)
- Un nucleo familiare che ha fatto il check-in per un orario di servizio precedente può tornare più tardi e aggiungere un orario di servizio aperto, anche dopo la chiusura della finestra precedente. Le sue presenze già registrate vengono mantenute e non causano il rifiuto del nuovo check-in.
- Se una stanza per bambini ha **pochi volontari** rispetto al rapporto richiesto, l'app mostra un avviso che un membro dello staff può confermare per procedere, oppure blocca del tutto il check-in, a seconda di come la tua chiesa ha configurato l'applicazione del rapporto.

## Stampa delle etichette {#label-printing}

Se è configurata una stampante di rete, l'app stampa automaticamente le etichette dopo il check-in:

- Le **etichette con il nome** vengono stampate per ogni persona assegnata a un gruppo che ha attiva l'impostazione **Stampa cartellino**. Le etichette includono il nome della persona, l'assegnazione al gruppo e le informazioni su allergie o note, se presenti.
- I **talloncini per il ritiro dei genitori** vengono stampati quando una persona registrata appartiene a un gruppo con l'impostazione **Ritiro genitori** attiva. Le persone registrate come **Volontario** vengono escluse, quindi un addetto all'infanzia che presta servizio in una stanza di Ritiro genitori non riceve un talloncino. Il talloncino elenca i bambini, le loro assegnazioni ai gruppi e un **codice di sicurezza di 4 caratteri** univoco.

:::info
Lo stesso codice di sicurezza compare sia sull'etichetta del bambino sia sul talloncino del genitore. Al momento del ritiro, i volontari confrontano i codici per verificare che l'adulto giusto ritiri ogni bambino.
:::

Il codice di sicurezza viene generato di nuovo a ogni check-in e usa solo consonanti e cifre (le vocali sono escluse per evitare la formazione di parole inappropriate).

:::warning
Se le etichette non vengono stampate, apri le Impostazioni amministratore toccando **il logo della chiesa** sette volte, poi tocca **Cambia stampante** per verificare la connessione alla stampante. Consulta [Configurazione della stampante](../getting-started/printer-setup) per i passaggi di risoluzione dei problemi.
:::

## Cosa succede dopo il check-in {#what-happens-after-check-in}

- Se è configurata una stampante, l'app stampa tutte le etichette e poi torna automaticamente alla **schermata di ricerca**, pronta per la famiglia successiva.
- Se non è configurata alcuna stampante, la schermata di successo resta visibile per alcuni secondi e poi torna automaticamente alla **schermata di ricerca**.

Non devi toccare nulla per tornare alla schermata di ricerca: l'app gestisce la transizione in automatico.

:::tip
L'app si reimposta completamente dopo ogni check-in, quindi non c'è alcun rischio che una famiglia veda le informazioni di un'altra famiglia.
:::

## Cosa viene registrato {#what-gets-recorded}

Quando tocchi **Check-in**, l'app invia al server, per ogni membro del nucleo familiare che ha un'assegnazione a un gruppo:

- La **persona** registrata
- Il **servizio** a cui partecipa
- L'**orario di servizio** e il **gruppo** a cui è assegnata

Questi dati compaiono in B1 Admin nella sezione Presenze, dove gli amministratori della chiesa possono visualizzare e gestire i registri di presenza. Consulta la [guida di amministrazione del check-in](../../b1-admin/attendance/check-in.md) per i dettagli.
