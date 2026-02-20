---
title: "Selezione di un Servizio"
---

# Selezione di un Servizio

<div class="article-intro">

Il primo passaggio di ogni check-in è scegliere a quale servizio stai partecipando. La schermata dei servizi appare subito dopo che l'app ha terminato il caricamento e determina quali orari di servizio e gruppi sono disponibili per il resto del flusso di check-in.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- [Accedi](../getting-started/logging-in) all'app B1 Church Checkin e seleziona la tua chiesa
- Assicurati che l'amministratore della tua chiesa abbia [configurato i servizi e gli orari dei servizi](../../b1-admin/attendance/setup.md) in B1 Admin

</div>

## Come Funziona

1. Dopo l'accesso (o dopo il login automatico nelle visite successive), l'app mostra la **schermata dei servizi**.
2. Vedrai un elenco di tutti i servizi configurati per la tua chiesa. Ogni servizio appare come una scheda che mostra il nome del servizio (ad esempio, "Sunday Morning" o "Wednesday Evening").
3. Tocca il servizio a cui stai partecipando.

L'app carica gli orari di servizio e i gruppi associati a quel servizio, poi ti porta alla [schermata di ricerca dei membri](./looking-up-members).

:::info
I servizi sono configurati dall'amministratore della tua chiesa in B1 Admin nella sezione Presenze. Se non vedi il servizio che ti aspetti, chiedi al tuo amministratore di verificare che sia stato creato nella [configurazione delle presenze](../../b1-admin/attendance/setup.md).
:::

## Cosa Succede Dietro le Quinte

Quando selezioni un servizio, l'app recupera tre informazioni dal server:

- Gli **orari di servizio** per quel servizio (ad esempio, un singolo servizio potrebbe avere uno slot alle 9:00 AM e uno alle 11:00 AM).
- I **gruppi** disponibili per ogni orario di servizio (ad esempio, Nursery, Preschool, Elementary).
- I **collegamenti gruppo-orario di servizio** che determinano quali gruppi sono disponibili in quali orari.

Questi dati vengono memorizzati nella cache locale in modo che il resto del processo di check-in sia veloce e reattivo.

:::tip
Se la tua chiesa ha un solo servizio configurato, devi comunque toccarlo per procedere. L'app non seleziona automaticamente un singolo servizio.
:::

## Passaggio Successivo

Dopo aver selezionato un servizio, [cercherai la tua famiglia](./looking-up-members) per numero di telefono o nome.
