---
title: "Report sulle presenze"
---

# Report sulle presenze

<div class="article-intro">

B1 Admin offre tre report sulle presenze per aiutarti a capire come le persone partecipano ai tuoi culti e ai gruppi. Ogni report offre una prospettiva diversa sui dati di presenza, dalle tendenze generali alle suddivisioni giornaliere.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le presenze vengano [registrate in modo costante](../attendance/tracking-attendance.md) per i tuoi culti e i gruppi
- Verifica che i tuoi [gruppi](../groups/creating-groups.md) e i servizi siano configurati in B1 Admin
- Ti servono i [permessi](../settings/roles-permissions.md) appropriati per accedere ai report

</div>

## Andamento delle presenze

Il report Andamento delle presenze mostra come cambiano le presenze nel tempo per i tuoi servizi.

1. Vai direttamente all'indirizzo **admin.b1.church/reports/attendanceTrend** nel browser (i report non hanno una voce nel menu di navigazione — salvare l'indirizzo nei preferiti è il modo più semplice per tornarci). Lo stesso report è disponibile anche nella pagina Presenze: clicca **Tutti gli anni**, poi scegli la scheda **Andamento delle presenze**.
2. Facoltativamente, seleziona una **Sede**, un **Servizio**, un **Orario del servizio** o un **Gruppo** per filtrare i risultati.
3. Imposta la **Data di inizio** e la **Data di fine**. Per impostazione predefinita il report copre l'ultimo anno, da un anno fa fino a oggi, e la data di fine è inclusa per intero. Clicca **Genera report**.
4. Il report mostra un grafico a barre e una tabella con il totale delle visite per settimana. Ogni settimana è etichettata con la data della domenica di quella settimana, e la colonna **Date delle sessioni** della tabella elenca le date effettive di quella settimana in cui c'erano presenze (ad esempio "9/27, 9/30").

Questo report è utile per individuare schemi come cali stagionali, tendenze di crescita o l'impatto di eventi speciali.

## Presenze per gruppo

Il report Presenze per gruppo mostra chi ha partecipato a ogni sessione di un gruppo in un intervallo di date.

1. Vai direttamente all'indirizzo **admin.b1.church/reports/groupAttendance** nel browser, oppure nella pagina Presenze clicca **Tutti gli anni** e scegli la scheda **Presenze per gruppo**.
2. Facoltativamente, seleziona una **Sede** e un **Servizio**.
3. Imposta la **Data di inizio** e la **Data di fine**. Per impostazione predefinita il report copre dalla domenica scorsa fino a oggi, e la data di fine è inclusa per intero.
4. Clicca **Genera report**.

I risultati sono raggruppati per data della sessione, poi per orario del servizio, poi per gruppo, con le persone presenti elencate sotto ciascun gruppo. Orari del servizio, gruppi e nomi sono ordinati in ordine alfabetico. Accanto al nome di ciascuna persona, la colonna **Registrato** mostra l'ora in cui è stata registrata la presenza (vuota quando non c'è un orario) e la colonna **Stato di appartenenza** mostra il suo stato, come Membro o Visitatore. Sono incluse anche le sessioni dei gruppi che non si riuniscono in un orario di culto; compaiono senza orario del servizio.

Per scaricare un foglio di calcolo, clicca **Opzioni di download** e scegli **Riepilogo**. Il CSV contiene:

- Una riga per ogni membro di ciascun gruppo che si è riunito nell'intervallo di date, ordinate per gruppo e poi per nome.
- Il nome della persona e il nome del gruppo nelle prime colonne.
- Una colonna per ogni sessione datata, denominata con il servizio, l'orario del servizio e la data (ad esempio "Sunday - 9:00 AM (2026-09-27)"), con ciascuna persona contrassegnata come **present** o **absent**. Una sessione senza orario del servizio viene denominata solo con la sua data.

Usa questo report per confrontare le presenze tra i gruppi e individuare quali gruppi stanno crescendo o richiedono attenzione.

## Presenze giornaliere per gruppo

Il report Presenze giornaliere per gruppo (intitolato **Presenze del gruppo per giorno**) fornisce il conteggio giorno per giorno di quante persone hanno partecipato a un gruppo.

1. Vai direttamente all'indirizzo **admin.b1.church/reports/dailyGroupAttendance** nel browser.
2. Usa i menu a tendina **Sede**, **Servizio** e **Orario del servizio** per restringere l'elenco, poi scegli il **Gruppo** che vuoi esaminare.
3. Genera il report. Elenca ogni giorno in cui il gruppo si è riunito, dal più vecchio al più recente, con la **Data** e il numero di **Partecipanti** registrati quel giorno.

Questo report offre un dettaglio granulare, utile per capire le variazioni da una settimana all'altra o per individuare giorni specifici con presenze insolitamente alte o basse.

:::tip
Usa il report Andamento delle presenze per una panoramica generale e il report Presenze giornaliere per gruppo quando devi approfondire date specifiche.
:::

## Usi pratici

- **Pianificazione** -- Usa gli andamenti delle presenze per pianificare posti a sedere, personale e risorse per i prossimi culti.
- **Raggiungimento** -- Individua precocemente i cali nelle presenze così da poter fare follow-up con i membri.
- **Relazioni per il consiglio** -- Includi i dati sulle presenze nelle relazioni periodiche ai responsabili per mostrare la salute del ministero.
- **Valutazione di eventi** -- Confronta le presenze prima e dopo eventi speciali per misurarne l'impatto.

:::warning
I dati sulle presenze vengono registrati attraverso i processi di check-in dei gruppi e dei servizi. Se le presenze non vengono registrate in modo costante, i report non rifletteranno fedelmente la reale partecipazione. Vedi [Tracciare le presenze](../attendance/tracking-attendance.md) per le istruzioni di configurazione.
:::
