---
title: "Selezionare un servizio"
---

# Selezionare un servizio {#selecting-a-service}

<div class="article-intro">

Il primo passaggio di ogni check-in è scegliere a quale servizio stai partecipando. La schermata dei servizi compare subito dopo il caricamento dell'app e determina quali orari di servizio e gruppi sono disponibili per il resto del flusso di check-in.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- [Accedi](../getting-started/logging-in) all'app B1 Church Checkin e seleziona la tua chiesa
- Assicurati che l'amministratore della chiesa abbia [configurato servizi e orari di servizio](../../b1-admin/attendance/setup.md) in B1 Admin

</div>

## Come funziona {#how-it-works}

1. Dopo l'accesso (oppure dopo l'accesso automatico nelle visite successive), l'app mostra la **schermata dei servizi**.
2. Vedi un elenco di tutti i servizi configurati per la tua chiesa. Ogni servizio compare come una scheda con il nome del servizio (ad esempio "Culto della domenica mattina" o "Mercoledì sera").
3. Tocca il servizio a cui stai partecipando.

L'app carica gli orari di servizio e i gruppi associati a quel servizio, poi ti porta alla [schermata di ricerca dei membri](./looking-up-members).

## Quando il check-in non è aperto {#when-check-in-isnt-open}

Se l'amministratore ha assegnato a un orario di servizio una [pianificazione del check-in](../../b1-admin/attendance/setup#setting-a-check-in-schedule), l'app permette alle famiglie di scegliere quell'orario solo mentre la sua finestra di check-in è aperta. Gli orari di servizio la cui finestra è chiusa in questo momento compaiono comunque nella [schermata del nucleo familiare](./household-review), ma sono contrassegnati come **Chiuso** (ad esempio **Chiuso · apre dom 9:30**) invece di offrire un pulsante per il gruppo.

Se tutti gli orari di servizio del servizio che hai toccato sono chiusi, l'app ti dice quando si apre il check-in, ad esempio **"Il check-in per questo servizio apre dom 9:30."** (Se non è possibile mostrare un orario di apertura, compare il messaggio **"Il check-in per questo servizio non è aperto in questo momento."**) Tocca **Indietro** per tornare all'elenco dei servizi e sceglierne un altro, oppure attendi che la finestra si apra e riprova.

:::info
Le finestre di check-in seguono il fuso orario del campus del servizio. Se quel campus non ha un fuso orario impostato, viene usato il fuso orario della tua chiesa. Se un orario di servizio sembra aprirsi all'ora sbagliata, chiedi all'amministratore di controllare il fuso orario nelle impostazioni del campus o della chiesa. Nella schermata del nucleo familiare il chiosco usa anche l'orologio del tablet per aprire e chiudere gli orari di servizio, quindi assicurati che il tablet sia impostato con l'ora e il fuso orario corretti.
:::

:::info
I servizi vengono configurati dall'amministratore della chiesa in B1 Admin, nella sezione Presenze. Se non vedi il servizio che ti aspetti, chiedi al tuo amministratore di verificare che sia stato creato nella [configurazione delle presenze](../../b1-admin/attendance/setup.md).
:::

## Cosa succede dietro le quinte {#what-happens-behind-the-scenes}

Quando selezioni un servizio, l'app recupera tre elementi dal server:

- Gli **orari di servizio** di quel servizio (ad esempio, un singolo servizio potrebbe avere una fascia alle 9:00 e una alle 11:00).
- I **gruppi** disponibili a ciascun orario di servizio (ad esempio Nido, Prescolare, Elementari).
- I **collegamenti gruppo-orario di servizio** che determinano quali gruppi sono disponibili a quali orari.

Questi dati vengono salvati nella cache locale, così il resto del processo di check-in è rapido e reattivo.

:::tip
Se la tua chiesa ha un solo servizio configurato, devi comunque toccarlo per proseguire. L'app non seleziona automaticamente un servizio singolo.
:::

## Passaggio successivo {#next-step}

Dopo aver selezionato un servizio, [cercherai la tua famiglia](./looking-up-members) per numero di telefono o nome.
