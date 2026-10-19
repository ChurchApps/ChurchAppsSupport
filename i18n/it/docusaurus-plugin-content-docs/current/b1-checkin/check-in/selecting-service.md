---
title: "Selezione del servizio"
---

# Selezione del servizio

<div class="article-intro">

Il primo passo di ogni check-in è scegliere a quale servizio stai partecipando. La schermata dei servizi appare subito dopo che l'app ha terminato il caricamento e determina quali orari di servizio e quali gruppi sono disponibili per il resto del flusso di check-in.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- [Accedi](../getting-started/logging-in) all'app B1 Church Checkin e seleziona la tua chiesa
- Assicurati che l'amministratore della chiesa abbia [configurato i servizi e gli orari di servizio](../../b1-admin/attendance/setup.md) in B1 Admin

</div>

## Come funziona

1. Dopo l'accesso (o dopo l'accesso automatico nelle visite successive), l'app mostra la **schermata dei servizi**.
2. Vedrai un elenco di tutti i servizi configurati per la tua chiesa. Ogni servizio appare come una scheda con il nome del servizio (ad esempio "Domenica mattina" o "Mercoledì sera").
3. Tocca il servizio a cui stai partecipando.

L'app carica gli orari di servizio e i gruppi associati a quel servizio, poi ti porta alla [schermata di ricerca dei membri](./looking-up-members).

## Quando il check-in non è aperto {#when-check-in-isnt-open}

Se il tuo amministratore ha assegnato a un orario di servizio una [pianificazione del check-in](../../b1-admin/attendance/setup#setting-a-check-in-schedule), l'app propone quell'orario solo mentre la sua finestra di check-in è aperta. Gli orari di servizio la cui finestra è chiusa in questo momento vengono nascosti, così le famiglie non possono sceglierli più avanti nel flusso.

Se tutti gli orari del servizio che hai toccato sono chiusi, l'app mostra il messaggio **"Il check-in non è aperto per questo servizio in questo momento."** Tocca **Indietro** per tornare all'elenco dei servizi e scegliere un servizio diverso, oppure attendi che la finestra si apra e riprova.

:::info
Le finestre di check-in seguono il fuso orario della tua chiesa. Se la chiesa non ha un fuso orario impostato, viene usato invece quello della sede. Se un orario di servizio sembra aprirsi all'ora sbagliata, chiedi al tuo amministratore di verificare il fuso orario nelle impostazioni della chiesa o della sede.
:::

:::info
I servizi sono configurati dall'amministratore della chiesa in B1 Admin, nella sezione Presenze. Se non vedi il servizio che ti aspetti, chiedi al tuo amministratore di verificare che sia stato creato nella [configurazione delle presenze](../../b1-admin/attendance/setup.md).
:::

## Cosa succede dietro le quinte

Quando selezioni un servizio, l'app richiede tre elementi al server:

- Gli **orari di servizio** di quel servizio (ad esempio, un unico servizio potrebbe avere una fascia alle 9:00 e una alle 11:00).
- I **gruppi** disponibili in ciascun orario di servizio (ad esempio, Nido, Prescolare, Elementari).
- I **collegamenti gruppo-orario di servizio** che determinano quali gruppi sono disponibili in quali orari.

Questi dati vengono salvati in cache localmente, così il resto del processo di check-in è rapido e reattivo.

:::tip
Se la tua chiesa ha configurato un solo servizio, devi comunque toccarlo per proseguire. L'app non seleziona automaticamente un singolo servizio.
:::

## Passo successivo

Dopo aver selezionato un servizio, potrai [cercare la tua famiglia](./looking-up-members) tramite numero di telefono o nome.
