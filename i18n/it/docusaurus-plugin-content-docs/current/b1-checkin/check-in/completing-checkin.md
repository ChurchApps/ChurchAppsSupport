---
title: "Completare il check-in"
---

# Completare il check-in

<div class="article-intro">

Una volta verificato il nucleo familiare e assegnati eventuali gruppi, sei pronto a completare il check-in. Questo è l'ultimo passaggio del flusso del chiosco — l'app invia le presenze, stampa le etichette e si reimposta per la famiglia successiva.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- [Verifica il nucleo familiare](./household-review) nella schermata di revisione del nucleo familiare
- [Assegna i gruppi](./group-assignment) a tutti i familiari che devono registrarsi in una classe o un programma specifico
- Facoltativamente [aggiungi gli ospiti](./adding-guests) che visitano la chiesa con la tua famiglia

</div>

## Come fare il check-in

1. Dalla **schermata di revisione del nucleo familiare**, tocca il pulsante **Check-in** in fondo alla schermata.
2. L'app invia i dati di presenza al server e mostra una **schermata di conferma** con un segno di spunta verde e un messaggio di benvenuto.

Questo è tutto ciò che serve. La presenza della tua famiglia è stata registrata.

## Sale piene e rapporti con i volontari

Se la tua chiesa ha configurato [limiti di sicurezza](../../b1-admin/attendance/checkin-safety) sulle sue sale, il server li verifica prima di salvare:

- Se una sala selezionata è **piena o chiusa**, il check-in non va a buon fine e l'app indica la sala così puoi sceglierne un'altra.
- Se l'orario del servizio ha una [pianificazione del check-in](../../b1-admin/attendance/setup#setting-a-check-in-schedule) e la finestra di check-in non è aperta in questo momento, anche il check-in nelle sale di quell'orario viene rifiutato. La schermata **Impossibile fare il check-in ora** elenca la sala con il motivo "il check-in non è aperto in questo momento"; tocca **Cambia sale** per scegliere un altro orario di servizio o un altro gruppo. (Gli orari di servizio già chiusi quando [selezioni un servizio](./selecting-service#when-check-in-isnt-open) sono nascosti, quindi di solito lo vedrai solo se una finestra si chiude a metà di un check-in.)
- Se una sala per bambini ha **pochi volontari** rispetto al rapporto previsto, l'app mostra un avviso che un membro dello staff può confermare per proseguire, oppure blocca il check-in del tutto — a seconda di come la tua chiesa ha configurato l'applicazione del rapporto.

## Stampa delle etichette

Se è configurata una stampante di rete, l'app stampa automaticamente le etichette dopo il check-in:

- Le **etichette con il nome** vengono stampate per ogni persona assegnata a un gruppo con l'impostazione **Stampa cartellino** attiva. Le etichette includono il nome della persona, l'assegnazione al gruppo e le informazioni su allergie/note, se presenti.
- I **tagliandi di ritiro per i genitori** vengono stampati quando una persona registrata si trova in un gruppo con l'impostazione **Ritiro genitori** attiva. Le persone registrate come **Volontario** vengono saltate, quindi un addetto all'infanzia che presta servizio in una sala Ritiro genitori non riceve un tagliando di ritiro. Il tagliando elenca i bambini, le loro assegnazioni ai gruppi e un **codice di sicurezza di 4 caratteri** univoco.

:::info
Lo stesso codice di sicurezza compare sia sull'etichetta del bambino sia sul tagliando di ritiro del genitore. Al momento del ritiro, i volontari confrontano i codici per verificare che l'adulto giusto stia ritirando ogni bambino.
:::

Il codice di sicurezza viene generato ogni volta da zero per ogni check-in e usa solo consonanti e cifre (le vocali sono escluse per evitare di formare parole inappropriate).

:::warning
Se le etichette non vengono stampate, apri le Impostazioni amministratore toccando il **logo della chiesa** sette volte, poi tocca **Cambia stampante** per verificare la connessione alla stampante. Consulta [Configurazione stampante](../getting-started/printer-setup) per i passaggi di risoluzione dei problemi.
:::

## Cosa succede dopo il check-in

- Se è configurata una stampante, l'app stampa tutte le etichette e poi torna automaticamente alla **schermata di ricerca**, pronta per la famiglia successiva.
- Se non è configurata alcuna stampante, la schermata di conferma resta visibile per alcuni secondi e poi torna automaticamente alla **schermata di ricerca**.

Non devi toccare nulla per tornare alla schermata di ricerca — l'app gestisce il passaggio in automatico.

:::tip
L'app si reimposta completamente dopo ogni check-in, quindi non c'è alcun rischio che una famiglia veda le informazioni di un'altra famiglia.
:::

## Cosa viene registrato

Quando tocchi **Check-in**, l'app invia al server quanto segue per ogni membro del nucleo familiare che ha un'assegnazione a un gruppo:

- La **persona** che sta facendo il check-in
- Il **servizio** a cui partecipa
- L'**orario del servizio** e il **gruppo** a cui è assegnata

Questi dati compaiono in B1 Admin nella sezione Presenze, dove gli amministratori della chiesa possono visualizzare e gestire i record di presenza. Consulta la [guida all'amministrazione del check-in](../../b1-admin/attendance/check-in.md) per i dettagli.
