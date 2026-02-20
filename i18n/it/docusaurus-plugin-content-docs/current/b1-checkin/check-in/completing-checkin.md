---
title: "Completamento del Check-In"
---

# Completamento del Check-In

<div class="article-intro">

Una volta che hai rivisto il tuo nucleo familiare e fatto le assegnazioni di gruppo necessarie, sei pronto per finalizzare il check-in. Questo è l'ultimo passaggio del flusso di lavoro del kiosk -- l'app invia le presenze, stampa le etichette e si resetta per la famiglia successiva.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- [Rivedi il tuo nucleo familiare](./household-review) sulla schermata di revisione del nucleo familiare
- [Assegna i gruppi](./group-assignment) ai familiari che devono fare il check-in per una classe o programma specifico
- Opzionalmente [aggiungi eventuali ospiti](./adding-guests) che stanno visitando con la tua famiglia

</div>

## Come Fare il Check-In

1. Dalla **schermata di revisione del nucleo familiare**, tocca il pulsante **Check-in** nella parte inferiore dello schermo.
2. L'app invia i dati di presenza al server e mostra una **schermata di successo** con un segno di spunta verde e un messaggio di benvenuto.

Questo è tutto. La presenza della tua famiglia è stata registrata.

## Stampa delle Etichette

Se è configurata una stampante di rete, l'app stampa automaticamente le etichette dopo il check-in:

- Le **etichette con il nome** vengono stampate per ogni persona assegnata a un gruppo che ha l'impostazione **Print Nametag** abilitata. Le etichette con il nome includono il nome della persona, la sua assegnazione di gruppo e le informazioni su allergie/note se presenti nel file.
- Le **ricevute di ritiro per i genitori** vengono stampate quando qualsiasi persona registrata si trova in un gruppo che ha l'impostazione **Parent Pickup** abilitata. La ricevuta di ritiro elenca i bambini, le loro assegnazioni di gruppo e un **codice di sicurezza univoco di 4 caratteri**.

:::info
Lo stesso codice di sicurezza appare sia sull'etichetta con il nome del bambino che sulla ricevuta di ritiro del genitore. Al momento del ritiro, i volontari confrontano i codici per verificare che il giusto adulto stia ritirando ogni bambino.
:::

Il codice di sicurezza viene generato nuovo per ogni check-in e utilizza solo consonanti e cifre (le vocali sono escluse per evitare la formazione di parole inappropriate).

:::warning
Se le etichette non vengono stampate, controlla la barra di stato della stampante nella parte superiore dello schermo. Puoi toccarla per accedere alle impostazioni della stampante e verificare la connessione. Consulta [Configurazione Stampante](../getting-started/printer-setup) per i passaggi di risoluzione dei problemi.
:::

## Cosa Succede Dopo il Check-In

- Se è configurata una stampante, l'app stampa tutte le etichette e poi torna automaticamente alla **schermata di ricerca**, pronta per la famiglia successiva.
- Se nessuna stampante è configurata, la schermata di successo viene visualizzata per alcuni secondi e poi torna automaticamente alla **schermata di ricerca**.

Non è necessario toccare nulla per tornare alla schermata di ricerca -- l'app gestisce la transizione automaticamente.

:::tip
L'app si resetta completamente dopo ogni check-in, quindi non c'è rischio che una famiglia veda le informazioni di un'altra famiglia.
:::

## Cosa Viene Registrato

Quando tocchi **Check-in**, l'app invia al server le seguenti informazioni per ogni membro del nucleo familiare che ha un'assegnazione di gruppo:

- La **persona** che sta facendo il check-in
- Il **servizio** a cui sta partecipando
- L'**orario del servizio** e il **gruppo** a cui è assegnata

Questi dati appaiono in B1 Admin nella sezione Presenze, dove gli amministratori della tua chiesa possono visualizzare e gestire i registri delle presenze. Consulta la [guida all'amministrazione del check-in](../../b1-admin/attendance/check-in.md) per i dettagli.
