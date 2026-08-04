---
title: "Completare il Check-In"
---

# Completare il Check-In

<div class="article-intro">

Una volta rivista la tua famiglia e fatte le eventuali assegnazioni di gruppo necessarie, sei pronto per finalizzare il check-in. Questo è l'ultimo passaggio nel flusso di lavoro del chiosco -- l'app invia le presenze, stampa le etichette e si resetta per la famiglia successiva.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- [Rivedi la tua famiglia](./household-review) nella schermata di revisione della famiglia
- [Assegna i gruppi](./group-assignment) ai membri della famiglia che devono registrarsi in una classe o programma specifico
- Facoltativamente [aggiungi eventuali ospiti](./adding-guests) che ti stanno visitando insieme alla tua famiglia

</div>

## Come Effettuare il Check-In

1. Dalla **schermata di revisione della famiglia**, tocca il pulsante **Check-in** in fondo allo schermo.
2. L'app invia i dati di presenza al server e mostra una **schermata di successo** con un segno di spunta verde e un messaggio di benvenuto.

Tutto qui. La presenza della tua famiglia è stata registrata.

## Stanze Piene e Rapporti Volontari

Se la tua chiesa ha configurato [limiti di sicurezza](../../b1-admin/attendance/checkin-safety) sulle sue stanze, il server li verifica prima di salvare:

- Se una stanza selezionata è **piena o chiusa**, il check-in non va a buon fine e l'app indica il nome della stanza così puoi sceglierne un'altra.
- Se una stanza per bambini è **a corto di volontari** rispetto al proprio rapporto, l'app mostra un avviso che un membro dello staff può confermare per procedere, oppure blocca del tutto il check-in -- a seconda di come la tua chiesa ha configurato l'applicazione del rapporto.

## Stampa delle Etichette

Se è configurata una stampante di rete, l'app stampa automaticamente le etichette dopo il check-in:

- Le **etichette con il nome** vengono stampate per ogni persona assegnata a un gruppo che ha l'impostazione **Print Nametag** abilitata. Le etichette con il nome includono il nome della persona, la sua assegnazione di gruppo e le informazioni su allergie/note se presenti in archivio.
- I **foglietti di ritiro per i genitori** vengono stampati quando qualcuno tra le persone registrate appartiene a un gruppo con l'impostazione **Parent Pickup** abilitata. Il foglietto di ritiro elenca i bambini, le loro assegnazioni di gruppo e un **codice di sicurezza univoco a 4 caratteri**.

:::info
Lo stesso codice di sicurezza compare sia sull'etichetta con il nome del bambino sia sul foglietto di ritiro del genitore. Al momento del ritiro, i volontari confrontano i codici per verificare che sia l'adulto giusto a ritirare ciascun bambino.
:::

Il codice di sicurezza viene generato ex novo per ogni check-in e utilizza solo consonanti e cifre (le vocali sono escluse per evitare di formare parole inappropriate).

:::warning
Se le etichette non vengono stampate, apri le Impostazioni Admin toccando il **logo della chiesa** sette volte, poi tocca **Cambia Stampante** per verificare la connessione della stampante. Vedi [Configurazione della Stampante](../getting-started/printer-setup) per i passaggi di risoluzione dei problemi.
:::

## Cosa Succede Dopo il Check-In

- Se è configurata una stampante, l'app stampa tutte le etichette e poi torna automaticamente alla **schermata di ricerca**, pronta per la famiglia successiva.
- Se non è configurata alcuna stampante, la schermata di successo viene mostrata per qualche secondo e poi torna automaticamente alla **schermata di ricerca**.

Non serve toccare nulla per tornare alla schermata di ricerca -- l'app gestisce la transizione automaticamente.

:::tip
L'app si resetta completamente dopo ogni check-in, quindi non c'è alcun rischio che una famiglia veda le informazioni di un'altra famiglia.
:::

## Cosa Viene Registrato

Quando tocchi **Check-in**, l'app invia al server i seguenti dati per ogni membro della famiglia che ha un'assegnazione di gruppo:

- La **persona** che sta effettuando il check-in
- Il **servizio** a cui sta partecipando
- L'**orario del servizio** e il **gruppo** a cui è assegnata

Questi dati compaiono in B1 Admin nella sezione Presenze, dove gli amministratori della tua chiesa possono visualizzare e gestire i registri delle presenze. Consulta la [guida all'amministrazione del check-in](../../b1-admin/attendance/check-in.md) per i dettagli.
