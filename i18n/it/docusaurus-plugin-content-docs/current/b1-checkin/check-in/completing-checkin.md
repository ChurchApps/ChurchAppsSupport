---
title: "Completare il check-in"
---

# Completare il check-in

<div class="article-intro">

Una volta verificato il nucleo familiare e assegnati eventuali gruppi, sei pronto a completare il check-in. Questo è l'ultimo passaggio del flusso del chiosco: l'app invia le presenze, stampa le etichette e si reimposta per la famiglia successiva.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- [Verifica il tuo nucleo familiare](./household-review) nella schermata di verifica del nucleo familiare
- [Assegna i gruppi](./group-assignment) ai membri della famiglia che devono registrarsi a una classe o a un programma specifico
- Facoltativamente, [aggiungi gli ospiti](./adding-guests) che visitano la chiesa insieme alla tua famiglia

</div>

## Come effettuare il check-in

1. Dalla **schermata di verifica del nucleo familiare**, tocca il pulsante **Check-in** in fondo alla schermata.
2. L'app invia i dati di presenza al server e mostra una **schermata di successo** con un segno di spunta verde e un messaggio di benvenuto.

Non serve altro. Le presenze della tua famiglia sono state registrate.

## Sale piene e rapporti con i volontari

Se la tua chiesa ha configurato [limiti di sicurezza](../../b1-admin/attendance/checkin-safety) per le sue sale, il server li verifica prima di salvare:

- Se una sala selezionata è **piena o chiusa**, il check-in non va a buon fine e l'app indica il nome della sala, così puoi sceglierne un'altra.
- Se l'orario di culto ha una [pianificazione del check-in](../../b1-admin/attendance/setup#setting-a-check-in-schedule) e la sua finestra di check-in in questo momento non è aperta, anche il check-in nelle sale di quell'orario di culto viene rifiutato. La schermata **Impossibile effettuare il check-in ora** elenca la sala con il motivo "il check-in non è aperto in questo momento"; tocca **Cambia sale** per scegliere un altro orario di culto o un altro gruppo. (Gli orari di culto già chiusi sono mostrati come **Chiuso** nella [schermata della famiglia](./household-review) e non possono essere scelti, quindi di solito vedrai questo messaggio solo se una finestra si chiude durante un check-in.)
- Un nucleo familiare che ha fatto il check-in per un orario di culto precedente può tornare più tardi e aggiungere un orario di culto aperto, anche dopo la chiusura della finestra precedente. Le presenze già registrate vengono mantenute e non causano il rifiuto del nuovo check-in.
- Se una sala per bambini ha **pochi volontari** rispetto al rapporto previsto, l'app mostra un avviso che un membro del personale può confermare per proseguire, oppure blocca del tutto il check-in, a seconda di come la tua chiesa ha configurato l'applicazione dei rapporti.

## Stampa delle etichette

Se è configurata una stampante di rete, l'app stampa automaticamente le etichette dopo il check-in:

- Le **etichette con il nome** vengono stampate per ogni persona assegnata a un gruppo per cui è attiva l'impostazione **Stampa cartellino**. Le etichette con il nome includono il nome della persona, l'assegnazione al gruppo e le informazioni su allergie e note, se presenti.
- I **foglietti di ritiro per i genitori** vengono stampati quando una persona registrata si trova in un gruppo per cui è attiva l'impostazione **Ritiro genitori**. Le persone registrate come **Volontario** vengono escluse, così un addetto all'infanzia che presta servizio in una sala con Ritiro genitori non riceve un foglietto di ritiro. Il foglietto elenca i bambini, le loro assegnazioni ai gruppi e un **codice di sicurezza di 4 caratteri** univoco.

:::info
Lo stesso codice di sicurezza compare sia sull'etichetta del bambino sia sul foglietto di ritiro del genitore. Al momento del ritiro, i volontari confrontano i codici per verificare che l'adulto giusto stia ritirando ciascun bambino.
:::

Il codice di sicurezza viene generato ogni volta per ogni check-in e usa solo consonanti e cifre (le vocali sono escluse per evitare di formare parole inappropriate).

:::warning
Se le etichette non vengono stampate, apri le Impostazioni amministratore toccando **il logo della chiesa** sette volte, poi tocca **Cambia stampante** per verificare la connessione alla stampante. Vedi [Configurazione della stampante](../getting-started/printer-setup) per i passaggi di risoluzione dei problemi.
:::

## Cosa succede dopo il check-in

- Se è configurata una stampante, l'app stampa tutte le etichette e poi torna automaticamente alla **schermata di ricerca**, pronta per la famiglia successiva.
- Se non è configurata alcuna stampante, l'app torna comunque automaticamente alla **schermata di ricerca**.

In entrambi i casi, la schermata di successo resta visibile per almeno 6 secondi dalla sua comparsa (8 secondi quando celebra il traguardo di presenza di qualcuno), così le famiglie possono vedere che il check-in è riuscito. Se la stampa richiede più tempo, l'app torna circa un secondo e mezzo dopo la fine della stampa.

Non devi toccare nulla per tornare alla schermata di ricerca: l'app gestisce la transizione automaticamente. Quando la schermata è visibile da un po', puoi toccarla per tornare subito indietro; un tocco nel primo secondo e mezzo viene ignorato, quindi un doppio tocco rapido su **Check-in** non salta la schermata.

:::tip
L'app si reimposta completamente dopo ogni check-in, quindi non c'è alcun rischio che una famiglia veda le informazioni di un'altra.
:::

## Cosa viene registrato

Quando tocchi **Check-in**, l'app invia al server le seguenti informazioni per ogni membro del nucleo familiare che ha un'assegnazione a un gruppo:

- La **persona** registrata al check-in
- Il **servizio** a cui partecipa
- L'**orario di culto** e il **gruppo** a cui è assegnata

Questi dati compaiono in B1 Admin, nella sezione Presenze, dove gli amministratori della chiesa possono visualizzare e gestire i registri delle presenze. Vedi la [guida all'amministrazione del check-in](../../b1-admin/attendance/check-in.md) per i dettagli.
