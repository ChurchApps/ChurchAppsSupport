---
title: "Report sulle presenze"
description: "Scopri i tre report sulle presenze di B1 Admin (andamento, presenze per gruppo e presenze giornaliere per gruppo) e come generarli ed esportarli."
---

# Report sulle presenze

<div class="article-intro">

B1 Admin offre tre report sulle presenze per aiutarti a capire come le persone partecipano ai tuoi culti e ai tuoi gruppi. Ogni report offre una prospettiva diversa sui dati di presenza, dalle tendenze generali alle suddivisioni giornaliere.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le presenze vengano [monitorate in modo coerente](../attendance/tracking-attendance.md) per i tuoi culti e gruppi
- Verifica che i tuoi [gruppi](../groups/creating-groups.md) e i culti siano configurati in B1 Admin
- Ti servono i [permessi](../settings/roles-permissions.md) adeguati per accedere ai report

</div>

## Tendenza delle presenze

Il report Tendenza delle presenze mostra come cambiano le presenze nel tempo per i tuoi culti.

1. Vai direttamente su **admin.b1.church/reports/attendanceTrend** nel browser (i report non hanno una voce nel menu di navigazione -- salvare l'indirizzo nei preferiti è il modo più semplice per tornarci). Lo stesso report è anche nella pagina Presenze: clicca su **Tutti gli anni**, poi scegli la scheda **Tendenza delle presenze**.
2. Facoltativamente seleziona una **Sede**, un **Culto**, un **Orario del culto** o un **Gruppo** per filtrare i risultati.
3. Imposta la **Data di inizio** e la **Data di fine**. Per impostazione predefinita il report copre l'ultimo anno, da un anno fa fino a oggi, e la data di fine è inclusa per intero. Clicca su **Esegui report**.
4. Il report mostra un grafico a barre e una tabella con le visite totali per settimana. Ogni settimana è etichettata con la data della domenica di quella settimana, e la colonna **Date delle sessioni** della tabella elenca le date effettive della settimana in cui c'è stata presenza (ad esempio "27/9, 30/9").

Questo report è utile per individuare schemi come cali stagionali, tendenze di crescita o l'impatto di eventi speciali.

## Presenze per gruppo {#group-attendance}

Il report Presenze per gruppo mostra chi ha partecipato a ogni sessione di gruppo in un intervallo di date.

1. Vai direttamente su **admin.b1.church/reports/groupAttendance** nel browser, oppure nella pagina Presenze clicca su **Tutti gli anni** e scegli la scheda **Presenze per gruppo**.
2. Facoltativamente seleziona una **Sede** e un **Culto**.
3. Imposta la **Data di inizio** e la **Data di fine**. Per impostazione predefinita il report copre dall'ultima domenica fino a oggi, e la data di fine è inclusa per intero.
4. Clicca su **Esegui report**.

I risultati sono raggruppati per data della sessione, poi per orario del culto, poi per gruppo, con le persone presenti elencate sotto ciascun gruppo. Gli orari dei culti, i gruppi e i nomi sono ordinati alfabeticamente. Accanto al nome di ciascuna persona, la colonna **Check-in** mostra l'ora in cui è stata registrata la presenza (vuota quando non c'è un orario registrato), e la colonna **Stato di appartenenza** mostra il suo stato, come Membro o Visitatore. Sono incluse anche le sessioni dei gruppi che non si incontrano in un orario di culto; compaiono senza orario di culto.

Per scaricare un foglio di calcolo, clicca su **Opzioni di download** e scegli **Riepilogo**. Il CSV contiene:

- Una riga per ogni membro di ciascun gruppo che si è incontrato nell'intervallo di date, ordinata per gruppo e poi per nome.
- Il nome della persona e il nome del gruppo nelle prime colonne.
- Una colonna per ogni sessione con data, denominata con il culto, l'orario del culto e la data (ad esempio "Domenica - 9:00 (2026-09-27)"), con ogni persona segnata come **presente** o **assente**. Una sessione senza orario di culto viene denominata solo con la data.

Usa questo report per confrontare le presenze tra i gruppi e individuare quali gruppi stanno crescendo o richiedono attenzione.

## Presenze giornaliere per gruppo

Il report Presenze giornaliere per gruppo (intitolato **Presenze del gruppo per giorno**) fornisce il conteggio giorno per giorno di quante persone hanno partecipato a un gruppo.

1. Vai direttamente su **admin.b1.church/reports/dailyGroupAttendance** nel browser.
2. Usa i menu a tendina **Sede**, **Culto** e **Orario del culto** per restringere l'elenco, poi scegli il **Gruppo** che vuoi esaminare.
3. Esegui il report. Elenca ogni giorno in cui il gruppo si è incontrato, dal più vecchio, con la **Data** e il numero di **Partecipanti** registrati quel giorno.

Questo report offre un dettaglio granulare, utile per capire le variazioni da una settimana all'altra o per individuare giorni specifici con presenze insolitamente alte o basse.

:::tip
Usa il report Tendenza delle presenze per una visione d'insieme e il report Presenze giornaliere per gruppo quando devi approfondire date specifiche.
:::

## Usi pratici

- **Pianificazione** -- Usa le tendenze delle presenze per pianificare posti a sedere, personale e risorse per i prossimi culti.
- **Attività di sensibilizzazione** -- Individua tempestivamente i cali nelle presenze così puoi fare follow-up con i membri.
- **Relazioni per il consiglio** -- Includi i dati sulle presenze nelle relazioni periodiche della leadership per mostrare la salute dei ministeri.
- **Valutazione degli eventi** -- Confronta le presenze prima e dopo eventi speciali per misurarne l'impatto.

:::warning
I dati sulle presenze vengono registrati tramite i processi di check-in di gruppi e culti. Se le presenze non vengono monitorate in modo coerente, i report non rifletteranno in modo accurato la partecipazione reale. Per le istruzioni di configurazione, vedi [Monitorare le presenze](../attendance/tracking-attendance.md).
:::
