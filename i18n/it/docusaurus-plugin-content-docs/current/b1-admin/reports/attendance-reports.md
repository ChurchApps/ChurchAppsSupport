---
title: "Rapporti di Presenza"
---

# Rapporti di Presenza

<div class="article-intro">

B1 Admin fornisce tre rapporti di presenza per aiutarti a capire come le persone si stanno impegnando con i tuoi servizi e gruppi. Ogni rapporto offre una prospettiva diversa sui tuoi dati di presenza, dalle tendenze ad alto livello ai dettagli giornalieri.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Assicurati che la presenza sia [tracciata in modo coerente](../attendance/tracking-attendance.md) per i tuoi servizi e gruppi
- Assicurati che i tuoi [gruppi](../groups/creating-groups.md) e servizi siano configurati in B1 Admin
- Hai bisogno delle appropriate [autorizzazioni](../settings/roles-permissions.md) per accedere ai rapporti

</div>

## Trend di Presenza

Il rapporto Attendance Trend mostra come la presenza cambia nel tempo per i tuoi servizi.

1. Vai direttamente a **admin.b1.church/reports/attendanceTrend** nel tuo browser (i rapporti non hanno una voce nel menu di navigazione — aggiungere l'indirizzo ai segnalibri è il modo più semplice per tornare indietro). Lo stesso rapporto è anche nella scheda **Attendance Trend** della pagina Attendance.
2. Opzionalmente seleziona un **Campus**, **Service**, **Service Time**, o **Group** per filtrare i risultati.
3. Imposta la **Start Date** e la **End Date**. Per impostazione predefinita il rapporto copre l'anno scorso, da un anno fa ad oggi, e la data di fine è inclusa completamente. Fai clic su **Run Report**.
4. Il rapporto visualizza un grafico a barre e una tabella delle visite totali per settimana. Ogni settimana è etichettata con la data della domenica di quella settimana, e la colonna **Session Dates** della tabella elenca le date effettive in quella settimana che avevano presenza (ad esempio, "9/27, 9/30").

Questo rapporto è utile per individuare modelli come cali stagionali, tendenze di crescita, o l'impatto di eventi speciali.

## Presenza nei Gruppi

Il rapporto Group Attendance mostra chi ha partecipato a ogni sessione di gruppo in un intervallo di date.

1. Vai direttamente a **admin.b1.church/reports/groupAttendance** nel tuo browser, o apri la scheda **Group Attendance** della pagina Attendance.
2. Opzionalmente seleziona un **Campus** e **Service**.
3. Imposta la **Start Date** e la **End Date**. Per impostazione predefinita il rapporto copre l'ultima domenica ad oggi, e la data di fine è inclusa completamente.
4. Fai clic su **Run Report**.

I risultati sono raggruppati per data di sessione, quindi per orario di servizio, quindi per gruppo, con le persone che hanno partecipato elencate sotto ogni gruppo. Gli orari di servizio, i gruppi e i nomi sono ordinati alfabeticamente. Accanto al nome di ogni persona, la colonna **Checked In** mostra l'ora in cui la loro presenza è stata registrata (vuota quando non è presente un'ora) e la colonna **Membership Status** mostra il loro stato, come Membro o Visitatore.

Per scaricare un foglio di calcolo, fai clic su **Download Options** e scegli **Summary**. Il CSV ha:

- Una riga per ogni membro di ogni gruppo che si è riunito nell'intervallo di date, ordinati per gruppo e quindi per nome.
- Il nome della persona e il nome del gruppo nelle prime colonne.
- Una colonna per ogni sessione datata, denominata con il servizio, l'orario di servizio e la data (ad esempio, "Sunday - 9:00 AM (2026-09-27)"), con ogni persona contrassegnata come **present** o **absent**.

Usa questo rapporto per confrontare la presenza tra i gruppi e identificare quali gruppi stanno crescendo o hanno bisogno di attenzione.

## Presenza Giornaliera nei Gruppi

Il rapporto Daily Group Attendance fornisce una ripartizione giorno per giorno dei dati di presenza per i tuoi gruppi.

1. Vai direttamente a **admin.b1.church/reports/dailyGroupAttendance** nel tuo browser.
2. Imposta l'**intervallo di date** per il rapporto.
3. Seleziona il o i **gruppi** che vuoi rivedere.
4. Il rapporto mostra i numeri di presenza per ogni singolo giorno all'interno dell'intervallo.

Questo rapporto ti dà dettagli granulari, che sono utili per capire la variazione da settimana a settimana o per identificare giorni specifici con presenza insolitamente alta o bassa.

:::tip
Usa il rapporto Attendance Trend per una panoramica ad alto livello e il rapporto Daily Group Attendance quando hai bisogno di approfondire date specifiche.
:::

## Usi Pratici

- **Pianificazione** -- Usa le tendenze di presenza per pianificare i posti a sedere, il personale e le risorse per i servizi imminenti.
- **Sensibilizzazione** -- Identifica i modelli di partecipazione in declino in anticipo in modo da poter fare un follow-up con i membri.
- **Rapporti della giunta** -- Includi i dati di presenza nei tuoi rapporti di leadership regolari per mostrare la salute del ministero.
- **Valutazione dell'evento** -- Confronta la presenza prima e dopo gli eventi speciali per misurare il loro impatto.

:::warning
I dati di presenza sono registrati attraverso i tuoi processi di check-in per servizi e gruppi. Se la presenza non viene tracciata in modo coerente, i tuoi rapporti non rifletteranno accuratamente la partecipazione effettiva. Vedi [Tracciamento della Presenza](../attendance/tracking-attendance.md) per le istruzioni di configurazione.
:::
