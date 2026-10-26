---
title: "Selezionare un servizio"
---

# Selezionare un servizio

<div class="article-intro">

Il primo passo di ogni check-in è scegliere a quale servizio partecipi. La schermata dei servizi compare subito dopo il caricamento dell'app e determina quali orari di culto e quali gruppi sono disponibili per il resto del flusso di check-in.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- [Accedi](../getting-started/logging-in) all'app B1 Church Checkin e seleziona la tua chiesa
- Assicurati che l'amministratore della chiesa abbia [configurato servizi e orari di culto](../../b1-admin/attendance/setup.md) in B1 Admin

</div>

## Come funziona

1. Dopo aver effettuato l'accesso (o dopo l'accesso automatico nelle visite successive), l'app mostra la **schermata dei servizi**.
2. Vedrai un elenco di tutti i servizi configurati per la tua chiesa. Ogni servizio compare come una scheda con il nome del servizio (ad esempio "Culto della domenica mattina" o "Mercoledì sera").
3. Tocca il servizio a cui partecipi.

L'app carica gli orari di culto e i gruppi associati a quel servizio, poi ti porta alla [schermata di ricerca dei membri](./looking-up-members).

## Quando il check-in non è aperto

Se l'amministratore ha assegnato a un orario di culto una [pianificazione del check-in](../../b1-admin/attendance/setup#setting-a-check-in-schedule), l'app permette alle famiglie di scegliere quell'orario di culto solo mentre la sua finestra di check-in è aperta (ad esempio, da 30 minuti prima del culto fino a poco dopo la sua fine). Al di fuori di quella finestra, l'orario di culto viene elencato come **Chiuso**, con l'indicazione di quando riapre, se nota, ad esempio **Chiuso · apre dom 9:30**. Questi orari compaiono comunque nella [schermata della famiglia](./household-review) ma, invece di offrire un pulsante per il gruppo, sono contrassegnati come **Chiuso**.

Se tutti gli orari di culto del servizio che hai toccato sono chiusi, l'app ti dice quando apre il check-in, ad esempio **"Il check-in per questo servizio apre dom 9:30."** (Se non è possibile indicare un orario di apertura, il messaggio dice **"Il check-in per questo servizio non è aperto in questo momento."**) Tocca **Indietro** per tornare all'elenco dei servizi e scegliere un servizio diverso, oppure attendi l'apertura della finestra e riprova.

:::info
Le finestre di check-in seguono il fuso orario della sede del servizio. Se quella sede non ha un fuso orario impostato, viene usato il fuso orario della chiesa. Se un orario di culto sembra aprirsi all'ora sbagliata, chiedi all'amministratore di controllare il fuso orario nelle impostazioni della sede o della chiesa. Nella schermata della famiglia, il chiosco usa anche l'orologio del tablet per aprire e chiudere gli orari di culto, quindi assicurati che il tablet sia impostato sull'ora e sul fuso orario corretti.
:::

:::info
I servizi sono configurati dall'amministratore della chiesa in B1 Admin, nella sezione Presenze. Se non vedi il servizio che ti aspetti, chiedi all'amministratore di verificare che sia stato creato nella [configurazione delle presenze](../../b1-admin/attendance/setup.md).
:::

## Cosa succede dietro le quinte

Quando selezioni un servizio, l'app recupera tre elementi dal server:

- Gli **orari di culto** di quel servizio (ad esempio, un unico servizio potrebbe avere un orario alle 9:00 e uno alle 11:00).
- I **gruppi** disponibili in ogni orario di culto (ad esempio, Nido, Prescolare, Elementari).
- I **collegamenti tra gruppi e orari di culto** che determinano quali gruppi sono disponibili in quali orari.

Questi dati vengono memorizzati localmente nella cache, così il resto del processo di check-in è rapido e reattivo.

:::tip
Se la tua chiesa ha un solo servizio configurato, devi comunque toccarlo per proseguire. L'app non seleziona automaticamente un servizio singolo.
:::

## Passaggio successivo

Dopo aver selezionato un servizio, cercherai la tua famiglia [tramite numero di telefono o nome](./looking-up-members).
