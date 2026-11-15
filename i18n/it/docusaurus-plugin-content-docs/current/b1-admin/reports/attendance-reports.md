---
title: "Report sulle presenze"
description: "Scopri i tre report sulle presenze di B1 Admin (Andamento presenze, Presenze gruppo, Presenze giornaliere gruppo), cosa mostra ciascuno e come eseguirli ed esportarli."
---

# Report sulle presenze

<div class="article-intro">

B1 Admin ti offre tre report sulle presenze per aiutarti a capire come le persone partecipano ai tuoi servizi e ai tuoi gruppi. Ogni report offre una prospettiva diversa sui dati di presenza, dalle tendenze generali alle suddivisioni giornaliere.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le presenze siano [registrate in modo costante](../attendance/tracking-attendance.md) per i tuoi servizi e i tuoi gruppi
- Verifica che i tuoi [gruppi](../groups/creating-groups.md) e i servizi siano configurati in B1 Admin
- Ti servono le [autorizzazioni](../settings/roles-permissions.md) appropriate per accedere ai report

</div>

## Andamento presenze {#attendance-trend}

Il report Andamento presenze mostra come cambiano le presenze nel tempo per i tuoi servizi.

1. Vai direttamente all'indirizzo **admin.b1.church/reports/attendanceTrend** nel tuo browser (i report non hanno una voce nel menu di navigazione, quindi il modo più semplice per tornarci è salvare l'indirizzo nei preferiti). Lo stesso report è disponibile anche nella pagina Presenze: fai clic su **Tutti gli anni**, quindi scegli la scheda **Andamento presenze**.
2. Se vuoi, seleziona un **Campus**, un **Servizio**, un **Orario servizio** o un **Gruppo** per filtrare i risultati.
3. Imposta la **Data di inizio** e la **Data di fine**. Per impostazione predefinita il report copre l'ultimo anno, da un anno fa fino a oggi, e la data di fine è inclusa per intero. Fai clic su **Esegui report**.
4. Il report mostra un grafico a barre e una tabella con il totale delle presenze per settimana. Ogni settimana è indicata con la data della domenica di quella settimana, e la colonna **Date delle sessioni** della tabella elenca le date effettive di quella settimana in cui sono state registrate presenze (ad esempio, "9/27, 9/30").

Questo report è utile per individuare schemi come cali stagionali, tendenze di crescita o l'impatto di eventi speciali.

:::tip
La vista **Tutti gli anni** della pagina Presenze include anche una scheda **Andamento partecipanti**, collocata tra le altre due, che mostra in un grafico i totali dei partecipanti che inserisci manualmente (invece delle singole registrazioni) per ogni settimana. Ha gli stessi filtri **Campus**, **Servizio**, **Orario servizio** e **Gruppo**.
:::

## Presenze gruppo {#group-attendance}

Il report Presenze gruppo mostra chi ha partecipato a ciascuna sessione di gruppo in un intervallo di date.

1. Vai direttamente all'indirizzo **admin.b1.church/reports/groupAttendance** nel tuo browser, oppure nella pagina Presenze fai clic su **Tutti gli anni** e scegli la scheda **Presenze gruppo**.
2. Se vuoi, seleziona un **Campus** e un **Servizio**.
3. Imposta la **Data di inizio** e la **Data di fine**. Per impostazione predefinita il report copre da domenica scorsa fino a oggi, e la data di fine è inclusa per intero.
4. Fai clic su **Esegui report**.

I risultati sono raggruppati per data della sessione, poi per orario del servizio, poi per gruppo, con le persone che hanno partecipato elencate sotto ciascun gruppo. Orari del servizio, gruppi e nomi sono ordinati alfabeticamente. Accanto al nome di ogni persona, la colonna **Registrato alle** mostra l'orario in cui è stata registrata la presenza (vuota quando non è disponibile un orario), mentre la colonna **Stato di appartenenza** mostra il suo stato, ad esempio Membro o Visitatore. Sono incluse anche le sessioni dei gruppi che non si riuniscono in un orario di servizio; compaiono senza orario del servizio.

Per scaricare un foglio di calcolo, fai clic su **Opzioni di download** e scegli **Riepilogo**. Il file CSV contiene:

- Una riga per ogni membro dei gruppi che si sono riuniti nell'intervallo di date, ordinata per gruppo e poi per nome.
- Il nome della persona e il nome del gruppo nelle prime colonne.
- Una colonna per ogni sessione con data, denominata con il servizio, l'orario del servizio e la data (ad esempio, "Domenica - 9:00 AM (2026-09-27)"), con ogni persona contrassegnata come **presente** o **assente**. Una sessione senza orario del servizio è denominata solo con la data.

Usa questo report per confrontare le presenze tra i gruppi e individuare quali gruppi stanno crescendo o richiedono attenzione.

## Presenze giornaliere gruppo {#daily-group-attendance}

Il report Presenze giornaliere gruppo (intitolato **Presenze gruppo per giorno**) fornisce un conteggio giorno per giorno di quante persone hanno partecipato a un gruppo.

1. Vai direttamente all'indirizzo **admin.b1.church/reports/dailyGroupAttendance** nel tuo browser.
2. Usa i menu a discesa **Campus**, **Servizio** e **Orario servizio** per restringere l'elenco, quindi scegli il **Gruppo** che vuoi esaminare.
3. Esegui il report. Mostra ogni giorno in cui il gruppo si è riunito, dal più vecchio al più recente, con la **Data** e il numero di **Partecipanti** registrati in quel giorno.

Questo report offre un dettaglio granulare, utile per capire le variazioni da una settimana all'altra o per individuare giorni specifici con presenze particolarmente alte o basse.

:::tip
Usa il report Andamento presenze per una panoramica generale e il report Presenze giornaliere gruppo quando hai bisogno di approfondire date specifiche.
:::

## Usi pratici {#practical-uses}

- **Pianificazione** -- Usa gli andamenti delle presenze per pianificare posti a sedere, personale e risorse per i prossimi servizi.
- **Attività di sensibilizzazione** -- Individua precocemente i cali nelle presenze così da poter contattare i membri.
- **Relazioni per il consiglio** -- Includi i dati sulle presenze nelle relazioni periodiche per la leadership, per mostrare la salute del ministero.
- **Valutazione di eventi** -- Confronta le presenze prima e dopo eventi speciali per misurarne l'impatto.

:::warning
I dati sulle presenze vengono registrati attraverso i processi di registrazione di gruppi e servizi. Se le presenze non vengono registrate in modo costante, i report non rifletteranno fedelmente la partecipazione reale. Per le istruzioni di configurazione, consulta [Registrare le presenze](../attendance/tracking-attendance.md).
:::
